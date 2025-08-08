# gym_portal/gym/admin.py
from django.contrib import admin
from .models import CustomerProfile, DietPlan, WorkoutPlan, ProgressTracking

@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'height_cm', 'weight_kg', 'goal', 'bmi')
    list_filter = ('goal', 'activity_level')
    search_fields = ('user__username', 'user__first_name', 'user__last_name')

@admin.register(DietPlan)
class DietPlanAdmin(admin.ModelAdmin):
    list_display = ('title', 'customer', 'trainer', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'customer__username', 'trainer__username')

@admin.register(WorkoutPlan)
class WorkoutPlanAdmin(admin.ModelAdmin):
    list_display = ('title', 'customer', 'trainer', 'duration_weeks', 'is_active', 'created_at')
    list_filter = ('is_active', 'duration_weeks', 'created_at')

@admin.register(ProgressTracking)
class ProgressTrackingAdmin(admin.ModelAdmin):
    list_display = ('customer', 'weight_kg', 'date')
    list_filter = ('date',)
    search_fields = ('customer__username',)
