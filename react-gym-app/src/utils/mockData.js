// Mock data generation and management utilities

// Generate mock stats for home page
export const getHomeStats = () => {
  const users = JSON.parse(localStorage.getItem('gymUsers') || '[]');
  const customers = users.filter(u => u.userType === 'customer');
  const trainers = users.filter(u => u.userType === 'trainer');
  const dietPlans = JSON.parse(localStorage.getItem('gymDietPlans') || '[]');
  
  return {
    totalCustomers: customers.length || 150, // Default numbers if no users
    totalTrainers: trainers.length || 12,
    totalDietPlans: dietPlans.length || 85
  };
};

// BMI calculation and categorization
export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM ** 2)) * 100) / 100;
};

export const getBMICategory = (bmi) => {
  if (!bmi) return 'Unknown';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const getBMIColor = (category) => {
  const colors = {
    'Underweight': 'underweight',
    'Normal weight': 'normalweight', 
    'Overweight': 'overweight',
    'Obese': 'obese'
  };
  return colors[category] || '';
};

// Goal and activity level options
export const GOAL_CHOICES = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'gain_muscle', label: 'Gain Muscle' },
  { value: 'maintain', label: 'Maintain Weight' },
  { value: 'endurance', label: 'Build Endurance' },
  { value: 'strength', label: 'Build Strength' }
];

export const ACTIVITY_LEVEL_CHOICES = [
  { value: 'sedentary', label: 'Sedentary (little to no exercise)' },
  { value: 'lightly_active', label: 'Lightly Active (light exercise 1-3 days/week)' },
  { value: 'moderately_active', label: 'Moderately Active (moderate exercise 3-5 days/week)' },
  { value: 'very_active', label: 'Very Active (hard exercise 6-7 days/week)' },
  { value: 'extremely_active', label: 'Extremely Active (very hard exercise, physical job)' }
];

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get user profile
export const getUserProfile = (userId) => {
  const profiles = JSON.parse(localStorage.getItem('gymProfiles') || '[]');
  return profiles.find(p => p.userId === userId);
};

// Save user profile
export const saveUserProfile = (profile) => {
  const profiles = JSON.parse(localStorage.getItem('gymProfiles') || '[]');
  const existingIndex = profiles.findIndex(p => p.userId === profile.userId);
  
  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  
  localStorage.setItem('gymProfiles', JSON.stringify(profiles));
};

// Initialize mock data if not exists
export const initializeMockData = () => {
  // Check if data already exists
  if (localStorage.getItem('gymMockInitialized')) return;

  // Mock users
  const mockUsers = [
    {
      id: 'trainer1',
      username: 'john_trainer',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@gym.com',
      userType: 'trainer'
    },
    {
      id: 'trainer2', 
      username: 'sarah_trainer',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@gym.com',
      userType: 'trainer'
    },
    {
      id: 'customer1',
      username: 'mike_customer',
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'mike@email.com',
      userType: 'customer'
    }
  ];

  // Mock profiles
  const mockProfiles = [
    {
      userId: 'customer1',
      age: 28,
      heightCm: 175,
      weightKg: 80,
      diseases: 'None',
      goal: 'gain_muscle',
      activityLevel: 'moderately_active',
      phone: '+1234567890',
      emergencyContact: 'Jane Wilson +1234567891'
    }
  ];

  // Mock diet plans
  const mockDietPlans = [
    {
      id: 'diet1',
      customerId: 'customer1',
      trainerId: 'trainer1',
      title: 'Muscle Building Diet Plan',
      description: 'High protein diet for muscle gain',
      breakfast: 'Oatmeal with banana and protein powder, 2 eggs',
      lunch: 'Grilled chicken breast with quinoa and vegetables',
      dinner: 'Salmon with sweet potato and broccoli',
      snacks: 'Greek yogurt, nuts, protein shake',
      waterIntake: '3-4 liters',
      supplements: 'Whey protein, Creatine, Multivitamin',
      notes: 'Eat every 3-4 hours, focus on lean proteins',
      caloriesTarget: 2800,
      proteinTarget: 150,
      createdAt: new Date().toISOString(),
      isActive: true
    }
  ];

  // Mock progress records
  const mockProgress = [
    {
      id: 'progress1',
      customerId: 'customer1',
      weightKg: 80,
      date: new Date().toISOString().split('T')[0],
      notes: 'Feeling strong, good energy levels',
      photo: null
    },
    {
      id: 'progress2',
      customerId: 'customer1',
      weightKg: 79.5,
      date: new Date(Date.now() - 7*24*60*60*1000).toISOString().split('T')[0],
      notes: 'Lost some weight, need to increase calories',
      photo: null
    }
  ];

  // Save to localStorage
  localStorage.setItem('gymUsers', JSON.stringify(mockUsers));
  localStorage.setItem('gymProfiles', JSON.stringify(mockProfiles));
  localStorage.setItem('gymDietPlans', JSON.stringify(mockDietPlans));
  localStorage.setItem('gymProgress', JSON.stringify(mockProgress));
  localStorage.setItem('gymMockInitialized', 'true');
};