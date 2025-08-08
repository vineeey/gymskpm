# gym_portal/accounts/views.py
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group, User
from django.shortcuts import redirect, render
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomerSignUpForm, TrainerSignUpForm


def signup_customer(request):
    if request.method == 'POST':
        form = CustomerSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            customer_group, _ = Group.objects.get_or_create(name='Customer')
            user.groups.add(customer_group)
            messages.success(request, f'Welcome {user.first_name}! Your account has been created. Please log in.')
            return redirect('login')
    else:
        form = CustomerSignUpForm()
    return render(request, 'accounts/signup_customer.html', {'form': form})


def signup_trainer(request):
    if request.method == 'POST':
        form = TrainerSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            trainer_group, _ = Group.objects.get_or_create(name='Trainer')
            user.groups.add(trainer_group)
            messages.success(request,
                             f'Welcome Trainer {user.first_name}! Your account has been created. Please log in.')
            return redirect('login')
    else:
        form = TrainerSignUpForm()
    return render(request, 'accounts/signup_trainer.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    form = AuthenticationForm(request, data=request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f'Welcome back, {user.first_name}!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid credentials. Please check your username and password.')
    return render(request, 'accounts/login.html', {'form': form})


@login_required
def logout_view(request):
    user_name = request.user.first_name
    logout(request)
    messages.info(request, f'Goodbye {user_name}! You have been logged out.')
    return redirect('home')


@login_required
def dashboard_redirect(request):
    if request.user.groups.filter(name='Trainer').exists():
        return redirect('trainer_dashboard')
    else:
        return redirect('customer_dashboard')
