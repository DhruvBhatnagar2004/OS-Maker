from rest_framework import serializers
from .models import OSConfiguration

class OSConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OSConfiguration
        fields = '__all__'