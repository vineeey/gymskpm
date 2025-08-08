# gym_portal/gym/forms.py
from django import forms
from .models import CustomerProfile, DietPlan, WorkoutPlan, ProgressTracking

class CustomerProfileForm(forms.ModelForm):
    class Meta:
        model = CustomerProfile
        fields = ['age', 'height_cm', 'weight_kg', 'diseases', 'goal', 'activity_level', 'phone', 'emergency_contact']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control'})

class DietPlanForm(forms.ModelForm):
    class Meta:
        model = DietPlan
        fields = ['title', 'description', 'breakfast', 'lunch', 'dinner', 'snacks', 'water_intake', 'supplements', 'notes', 'calories_target', 'protein_target', 'is_active']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            if field in ['breakfast', 'lunch', 'dinner', 'snacks', 'supplements', 'notes', 'description']:
                self.fields[field].widget = forms.Textarea(attrs={'class': 'form-control', 'rows': 4})
            else:
                self.fields[field].widget.attrs.update({'class': 'form-control'})

class WorkoutPlanForm(forms.ModelForm):
    class Meta:
        model = WorkoutPlan
        fields = ['title', 'description', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'duration_weeks', 'is_active']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            if field in ['description', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']:
                self.fields[field].widget = forms.Textarea(attrs={'class': 'form-control', 'rows': 3})
            else:
                self.fields[field].widget.attrs.update({'class': 'form-control'})

class ProgressTrackingForm(forms.ModelForm):
    class Meta:
        model = ProgressTracking
        fields = ['weight_kg', 'date', 'notes', 'photo']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            if field == 'notes':
                self.fields[field].widget = forms.Textarea(attrs={'class': 'form-control', 'rows': 3})
            elif field == 'date':
                self.fields[field].widget = forms.DateInput(attrs={'class': 'form-control', 'type': 'date'})
            else:
                self.fields[field].widget.attrs.update({'class': 'form-control'})
