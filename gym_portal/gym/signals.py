# gym_portal/gym/signals.py
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomerProfile

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        CustomerProfile.objects.get_or_create(user=instance)
        Group.objects.get_or_create(name='Customer')
        Group.objects.get_or_create(name='Trainer')
