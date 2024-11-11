import os
import json
import requests
from pathlib import Path
from django.http import FileResponse, HttpResponse
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.urls import reverse
from .models import OSConfiguration
from .serializers import OSConfigurationSerializer
from .services import ConfigurationService

# Correct ISO path constant
BASE_DIR = Path(settings.BASE_DIR)  # Changed from parent.parent to parent
PREDEFINED_ISO_PATH = BASE_DIR / "project" / "iso" / "iso.txt"  # Added "OS_Maker" to the path

def serve_iso_file(iso_path):
    """Helper function to serve ISO file"""
    try:
        iso_path_str = str(iso_path.resolve())
        print(f"Attempting to serve ISO from: {iso_path_str}")
        print(f"File exists: {iso_path.exists()}")
        print(f"Is file: {iso_path.is_file()}")

        if iso_path.exists() and iso_path.is_file():
            return FileResponse(
                open(iso_path, 'rb'),
                as_attachment=True,
                filename='iso.txt'  # You can set a more appropriate filename if needed
            )
        else:
            print(f"ISO file not found at: {iso_path_str}")
            return None
    except Exception as e:
        print(f"Error serving ISO file: {str(e)}")
        return None

@api_view(['POST'])
def submit_configuration(request):
    try:
        if request.content_type.startswith('multipart/form-data'):
            config_data = json.loads(request.data.get('config'))
            wallpaper = request.FILES.get('wallpaper')
        else:
            config_data = request.data
            wallpaper = None

        # Extract configuration details
        os_type = config_data.get('operating_system')
        config_type = config_data.get('config_type')
        configuration = config_data.get('configuration', {})

        # Process packages based on configuration type
        if config_type == 'Predefined':
            packages = ConfigurationService.predefined_service(
                os_type, 
                configuration.get('type')
            )
        else:
            packages = ConfigurationService.customized_service(
                configuration.get('packages', [])
            )

        # Convert packages list to string (one package per line)
        packages_str = '\n'.join(packages)

        # Define the path for packages.txt
        packages_file_path = BASE_DIR / "project" / "packages.txt"

        # Write the packages to packages.txt
        with open(packages_file_path, 'w') as f:
            f.write(packages_str)
        print(f"Packages written to {packages_file_path}")

        # Upload packages.txt to Flask server
        flask_url = f"http://{settings.FLASK_SERVER_IP}:{settings.FLASK_SERVER_PORT}/upload-package"
        with open(packages_file_path, 'rb') as f:
            files = {'file': f}
            response = requests.post(flask_url, files=files)
        
        if response.status_code != 200:
            return Response(
                {'error': 'Failed to upload packages to Flask server'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        # Execute run-script on Flask server based on operating_system
        if os_type.lower() == 'ubuntu':
            generate_iso_url = f"http://{settings.FLASK_SERVER_IP}:{settings.FLASK_SERVER_PORT}/generate-iso/ubuntu"
            default_output_name = 'custom-ubuntu.iso'
        elif os_type.lower() == 'arch':
            generate_iso_url = f"http://{settings.FLASK_SERVER_IP}:{settings.FLASK_SERVER_PORT}/generate-iso/arch"
            default_output_name = 'custom-arch.iso'
        else:
            return Response(
                {'error': 'Unsupported operating system for ISO generation'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Prepare payload for ISO generation
        payload = {
            'output_name': default_output_name,
            'wallpaper_path': config_data.get('wallpaper_path')
        }

        # Send request to Flask server to generate ISO
        iso_response = requests.post(generate_iso_url, json=payload)

        if iso_response.status_code != 200:
            return Response(
                {'error': f"Failed to generate ISO: {iso_response.json().get('error', 'Unknown error')}" },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        iso_message = iso_response.json().get('message', '')
        print(f"ISO Generation Response: {iso_message}")

        # Prepare data for saving
        save_data = {
            'operating_system': os_type,
            'config_type': config_type,
            'configuration_type': configuration.get('type'),
            'packages': packages,
            'has_custom_wallpaper': configuration.get('has_custom_wallpaper', False)
        }

        if wallpaper:
            save_data['wallpaper'] = wallpaper

        serializer = OSConfigurationSerializer(data=save_data)
        if serializer.is_valid():
            instance = serializer.save()
            
            response_data = {
                'operating_system': os_type,
                'config_type': config_type,
                'configuration': {
                    'type': configuration.get('type'),
                    'packages': packages,
                    'has_custom_wallpaper': configuration.get('has_custom_wallpaper', False)
                },
                'iso_generation': iso_message
            }
            
            if config_type == 'Predefined':
                # Generate download URL
                download_url = request.build_absolute_uri(
                    reverse('download_iso', args=[instance.id])
                )
                response_data['download_iso_url'] = download_url

            return Response(response_data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f"Exception in submit_configuration: {str(e)}")
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def download_iso(request, config_id):
    """Endpoint to download ISO file for a given configuration."""
    try:
        configuration = OSConfiguration.objects.get(id=config_id)
        if configuration.config_type != 'Predefined':
            return Response(
                {'error': 'ISO download is only available for Predefined configurations.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        iso_response = serve_iso_file(PREDEFINED_ISO_PATH)
        if iso_response:
            return iso_response
        else:
            return Response(
                {'error': 'ISO file not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
    except OSConfiguration.DoesNotExist:
        return Response(
            {'error': 'Configuration not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print(f"Error in download_iso: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def home_view(request):
    return Response({
        'message': 'Welcome to OS Maker API',
        'endpoints': {
            'configurations': '/api/configurations/submit'
        }
    })

# Create your views here.
