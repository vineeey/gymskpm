# gym_portal/gym/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

GOAL_CHOICES = [
    ('lose_weight', 'Lose Weight'),
    ('gain_muscle', 'Gain Muscle'),
    ('maintain', 'Maintain Weight'),
    ('endurance', 'Build Endurance'),
    ('strength', 'Build Strength'),
]

ACTIVITY_LEVEL_CHOICES = [
    ('sedentary', 'Sedentary (little to no exercise)'),
    ('lightly_active', 'Lightly Active (light exercise 1-3 days/week)'),
    ('moderately_active', 'Moderately Active (moderate exercise 3-5 days/week)'),
    ('very_active', 'Very Active (hard exercise 6-7 days/week)'),
    ('extremely_active', 'Extremely Active (very hard exercise, physical job)'),
]

class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer_profile')
    age = models.PositiveIntegerField(null=True, blank=True)
    height_cm = models.FloatField(null=True, blank=True, help_text="Height in centimeters")
    weight_kg = models.FloatField(null=True, blank=True, help_text="Weight in kilograms")
    diseases = models.TextField(blank=True, help_text="Any medical conditions or allergies")
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES, blank=True)
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVEL_CHOICES, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    emergency_contact = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"CustomerProfile({self.user.username})"

    @property
    def bmi(self):
        if self.weight_kg and self.height_cm:
            height_m = self.height_cm / 100
            return round(self.weight_kg / (height_m ** 2), 2)
        return None

    @property
    def bmi_category(self):
        bmi = self.bmi
        if bmi:
            if bmi < 18.5:
                return "Underweight"
            elif bmi < 25:
                return "Normal weight"
            elif bmi < 30:
                return "Overweight"
            else:
                return "Obese"
        return "Unknown"

class DietPlan(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='diet_plans')
    trainer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_diet_plans')
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    breakfast = models.TextField(blank=True)
    lunch = models.TextField(blank=True)
    dinner = models.TextField(blank=True)
    snacks = models.TextField(blank=True)
    water_intake = models.CharField(max_length=50, blank=True, help_text="e.g., 3-4 liters")
    supplements = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    calories_target = models.PositiveIntegerField(null=True, blank=True)
    protein_target = models.PositiveIntegerField(null=True, blank=True, help_text="in grams")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"DietPlan({self.title}) for {self.customer.username}"

class WorkoutPlan(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workout_plans')
    trainer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_workout_plans')
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    monday = models.TextField(blank=True)
    tuesday = models.TextField(blank=True)
    wednesday = models.TextField(blank=True)
    thursday = models.TextField(blank=True)
    friday = models.TextField(blank=True)
    saturday = models.TextField(blank=True)
    sunday = models.TextField(blank=True)
    duration_weeks = models.PositiveIntegerField(default=4)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"WorkoutPlan({self.title}) for {self.customer.username}"

class ProgressTracking(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress_records')
    weight_kg = models.FloatField()
    date = models.DateField(default=timezone.now)
    notes = models.TextField(blank=True)
    photo = models.ImageField(upload_to='progress_photos/', blank=True, null=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"Progress({self.customer.username}) - {self.date}"
