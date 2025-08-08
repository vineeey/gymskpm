# gym_portal/accounts/urls.py
from django.urls import path
from .views import signup_customer, signup_trainer, login_view, logout_view, dashboard_redirect

urlpatterns = [
    path('signup/customer/', signup_customer, name='signup_customer'),
    path('signup/trainer/', signup_trainer, name='signup_trainer'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('dashboard/', dashboard_redirect, name='dashboard'),
]
