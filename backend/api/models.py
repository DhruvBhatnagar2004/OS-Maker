from django.db import models

class OSConfiguration(models.Model):
    operating_system = models.CharField(max_length=100)
    config_type = models.CharField(max_length=100)
    configuration_type = models.CharField(max_length=100)
    packages = models.JSONField(default=list)
    has_custom_wallpaper = models.BooleanField(default=False)
    wallpaper = models.ImageField(upload_to='wallpapers/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.operating_system} - {self.config_type} - {self.configuration_type}"
