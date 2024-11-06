# backend/api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('configurations/submit', views.submit_configuration, name='submit_configuration'),
    path('configurations/<int:config_id>/download_iso/', views.download_iso, name='download_iso'),  # New endpoint
]