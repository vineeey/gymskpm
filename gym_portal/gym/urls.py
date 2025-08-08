# gym_portal/gym/urls.py
from django.urls import path
from .views import (
    customer_dashboard, customer_profile_edit, add_progress,
    trainer_dashboard, trainer_customers_list, trainer_customer_detail,
    trainer_create_diet_plan, trainer_create_workout_plan,
    trainer_edit_diet_plan, trainer_edit_workout_plan
)

urlpatterns = [
    path('customer/dashboard/', customer_dashboard, name='customer_dashboard'),
    path('customer/profile/edit/', customer_profile_edit, name='customer_profile_edit'),
    path('customer/progress/add/', add_progress, name='add_progress'),

    path('trainer/dashboard/', trainer_dashboard, name='trainer_dashboard'),
    path('trainer/customers/', trainer_customers_list, name='trainer_customers_list'),
    path('trainer/customer/<int:user_id>/', trainer_customer_detail, name='trainer_customer_detail'),
    path('trainer/customer/<int:user_id>/diet/create/', trainer_create_diet_plan, name='trainer_create_diet_plan'),
    path('trainer/customer/<int:user_id>/workout/create/', trainer_create_workout_plan,
         name='trainer_create_workout_plan'),
    path('trainer/diet/<int:plan_id>/edit/', trainer_edit_diet_plan, name='trainer_edit_diet_plan'),
    path('trainer/workout/<int:plan_id>/edit/', trainer_edit_workout_plan, name='trainer_edit_workout_plan'),
]
