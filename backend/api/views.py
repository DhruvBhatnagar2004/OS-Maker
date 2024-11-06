import json
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import OSConfiguration
from .serializers import OSConfigurationSerializer
from .services import ConfigurationService

@api_view(['POST'])
def submit_configuration(request):
    try:
        if request.content_type == 'multipart/form-data':
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
            print(os_type, configuration.get('type'))
            packages = ConfigurationService.predefined_service(
                os_type, 
                configuration.get('type')
            )
        else:
            packages = ConfigurationService.customized_service(
                configuration.get('packages', [])
            )

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
            serializer.save()
            response_data = {
                'operating_system': os_type,
                'config_type': config_type,
                'configuration': {
                    'type': configuration.get('type'),
                    'packages': packages,
                    'has_custom_wallpaper': configuration.get('has_custom_wallpaper', False)
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
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
