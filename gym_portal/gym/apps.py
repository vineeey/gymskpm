# gym_portal/gym/apps.py
from django.apps import AppConfig

class GymConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gym'

    def ready(self):
        import gym.signals
