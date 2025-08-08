# gym_portal/gym/views.py
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.db.models import Q
from .models import CustomerProfile, DietPlan, WorkoutPlan, ProgressTracking
from .forms import CustomerProfileForm, DietPlanForm, WorkoutPlanForm, ProgressTrackingForm


def home(request):
    total_customers = User.objects.filter(groups__name='Customer').count()
    total_trainers = User.objects.filter(groups__name='Trainer').count()
    total_diet_plans = DietPlan.objects.filter(is_active=True).count()
    context = {
        'total_customers': total_customers,
        'total_trainers': total_trainers,
        'total_diet_plans': total_diet_plans,
    }
    return render(request, 'home.html', context)


@login_required
def customer_dashboard(request):
    if request.user.groups.filter(name='Trainer').exists():
        return redirect('trainer_dashboard')

    profile = request.user.customer_profile
    diet_plans = request.user.diet_plans.filter(is_active=True)
    workout_plans = request.user.workout_plans.filter(is_active=True)
    recent_progress = request.user.progress_records.all()[:5]

    context = {
        'profile': profile,
        'diet_plans': diet_plans,
        'workout_plans': workout_plans,
        'recent_progress': recent_progress,
    }
    return render(request, 'gym/customer_dashboard.html', context)


@login_required
def customer_profile_edit(request):
    if request.user.groups.filter(name='Trainer').exists():
        messages.error(request, 'Trainers cannot edit customer profiles.')
        return redirect('trainer_dashboard')

    profile = request.user.customer_profile
    if request.method == 'POST':
        form = CustomerProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been updated successfully!')
            return redirect('customer_dashboard')
    else:
        form = CustomerProfileForm(instance=profile)
    return render(request, 'gym/customer_profile_edit.html', {'form': form})


@login_required
def add_progress(request):
    if request.user.groups.filter(name='Trainer').exists():
        messages.error(request, 'Only customers can add progress records.')
        return redirect('trainer_dashboard')

    if request.method == 'POST':
        form = ProgressTrackingForm(request.POST, request.FILES)
        if form.is_valid():
            progress = form.save(commit=False)
            progress.customer = request.user
            progress.save()
            messages.success(request, 'Progress record added successfully!')
            return redirect('customer_dashboard')
    else:
        form = ProgressTrackingForm()
    return render(request, 'gym/add_progress.html', {'form': form})


@login_required
def trainer_dashboard(request):
    if not request.user.groups.filter(name='Trainer').exists():
        return redirect('customer_dashboard')

    customers = User.objects.filter(groups__name='Customer').order_by('first_name').distinct()
    recent_customers = customers[:6]
    total_customers = customers.count()
    total_diet_plans = DietPlan.objects.filter(trainer=request.user).count()
    total_workout_plans = WorkoutPlan.objects.filter(trainer=request.user).count()

    context = {
        'customers': recent_customers,
        'total_customers': total_customers,
        'total_diet_plans': total_diet_plans,
        'total_workout_plans': total_workout_plans,
    }
    return render(request, 'gym/trainer_dashboard.html', context)


@login_required
def trainer_customers_list(request):
    if not request.user.groups.filter(name='Trainer').exists():
        return redirect('customer_dashboard')

    search_query = request.GET.get('search', '')
    customers = User.objects.filter(groups__name='Customer').order_by('first_name').distinct()

    if search_query:
        customers = customers.filter(
            Q(username__icontains=search_query) |
            Q(first_name__icontains=search_query) |
            Q(last_name__icontains=search_query)
        )

    return render(request, 'gym/trainer_customers_list.html', {
        'customers': customers,
        'search_query': search_query
    })


@login_required
def trainer_customer_detail(request, user_id):
    if not request.user.groups.filter(name='Trainer').exists():
        return redirect('customer_dashboard')

    customer = get_object_or_404(User, id=user_id, groups__name='Customer')
    profile = customer.customer_profile
    diet_plans = customer.diet_plans.all()
    workout_plans = customer.workout_plans.all()
    progress_records = customer.progress_records.all()[:10]

    context = {
        'customer': customer,
        'profile': profile,
        'diet_plans': diet_plans,
        'workout_plans': workout_plans,
        'progress_records': progress_records,
    }
    return render(request, 'gym/trainer_customer_detail.html', context)


@login_required
def trainer_create_diet_plan(request, user_id):
    if not request.user.groups.filter(name='Trainer').exists():
        return redirect('customer_dashboard')

    customer = get_object_or_404(User, id=user_id, groups__name='Customer')
    if request.method == 'POST':
        form = DietPlanForm(request.POST)
        if form.is_valid():
            diet_plan = form.save(commit=False)
            diet_plan.customer = customer
            diet_plan.trainer = request.user
            diet_plan.save()
            messages.success(request, f'Diet plan created for {customer.first_name} {customer.last_name}!')
            return redirect('trainer_customer_detail', user_id=customer.id)
    else:
        form = DietPlanForm()
    return render(request, 'gym/trainer_create_diet_plan.html', {'form': form, 'customer': customer})


@login_required
def trainer_create_workout_plan(request, user_id):
    if not request.user.groups.filter(name='Trainer').exists():
        return redirect('customer_dashboard')

    customer = get_object_or_404(User, id=user_id, groups__name='Customer')
    if request.method == 'POST':
        form = WorkoutPlanForm(request.POST)
        if form.is_valid():
            workout_plan = form.save(commit=False)
            workout_plan.customer = customer
            workout_plan.trainer = request.user
            workout_plan.save()
            messages.success(request, f'Workout plan created for {customer.first_name} {customer.last_name}!')
            return redirect('trainer_customer_detail', user_id=customer.id)
    else:
        form = WorkoutPlanForm()
    return render(request, 'gym/trainer_create_workout_plan.html', {'form': form, 'customer': customer})


@login_required
def trainer_edit_diet_plan(request, plan_id):
    if not request.user.groups.filter(name='Trainer').exists():
        return redirect('customer_dashboard')

    diet_plan = get_object_or_404(DietPlan, id=plan_id, trainer=request.user)
    if request.method == 'POST':
        form = DietPlanForm(request.POST, instance=diet_plan)
        if form.is_valid():
            form.save()
            messages.success(request, 'Diet plan updated successfully!')
            return redirect('trainer_customer_detail', user_id=diet_plan.customer.id)
    else:
        form = DietPlanForm(instance=diet_plan)
    return render(request, 'gym/trainer_edit_diet_plan.html', {'form': form, 'diet_plan': diet_plan})


@login_required
def trainer_edit_workout_plan(request, plan_id):
    if not request.user.groups.filter(name='Trainer').exists():
        return redirect('customer_dashboard')

    workout_plan = get_object_or_404(WorkoutPlan, id=plan_id, trainer=request.user)
    if request.method == 'POST':
        form = WorkoutPlanForm(request.POST, instance=workout_plan)
        if form.is_valid():
            form.save()
            messages.success(request, 'Workout plan updated successfully!')
            return redirect('trainer_customer_detail', user_id=workout_plan.customer.id)
    else:
        form = WorkoutPlanForm(instance=workout_plan)
    return render(request, 'gym/trainer_edit_workout_plan.html', {'form': form, 'workout_plan': workout_plan})
