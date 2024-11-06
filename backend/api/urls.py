from django.urls import path
from . import views

urlpatterns = [
    path('configurations/submit', views.submit_configuration, name='submit_configuration'),
]