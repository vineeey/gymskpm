<div align="center">

<img src="https://img.shields.io/badge/GymSKPM-Fitness%20Management%20Portal-red?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0yMC41NyA3LjQxTDE5IDZsLTEuNDEgMS40MUwxNiA2bC0xLjQxIDEuNDFMMTMgNmwtMyAzIDEuNDEgMS40MUwxMCAxMWwxLjQxIDEuNDFMMTAgMTRsMyAzIDEuNDEtMS40MUwxNiAxN2wxLjQxLTEuNDFMMTkgMTdsMS41Ny0xLjU3QTIgMiAwIDAgMCAyMSAxNFYxMGEyIDIgMCAwIDAtLjQzLTEuMTZ6TTggN0w2LjU5IDUuNTlMNSA3IDMuNDMgNS40MyAyIDYuODZsMS41NyAxLjU3QTIgMiAwIDAgMCAzIDEwdjRhMiAyIDAgMCAwIC40MyAxLjE2TDUgMTdsMS40MS0xLjQxTDggMTdsMS40MS0xLjQxTDExIDE3bDMtMy0xLjQxLTEuNDFMMTQgMTFsLTEuNDEtMS40MUwxNCAxMGwtMy0zeiIvPjwvc3ZnPg==" alt="GymSKPM Badge"/>

# 💪 GymSKPM — Gym Management Portal

**A full-stack fitness management platform that connects trainers and customers for a smarter, healthier journey.**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-5.2-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org)
[![PythonAnywhere](https://img.shields.io/badge/Deployed%20on-PythonAnywhere-1F8ACB?style=flat-square)](https://bodygraphicskpm.pythonanywhere.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🚀 Live Demo](https://bodygraphicskpm.pythonanywhere.com) · [🐛 Report a Bug](../../issues) · [✨ Request a Feature](../../issues)

---

</div>

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
- [🔑 User Roles](#-user-roles)
- [📊 Data Models](#-data-models)
- [🖥️ Screenshots](#️-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🏋️ About the Project

**GymSKPM** is a modern, role-based gym management system built to streamline the relationship between fitness trainers and their customers. Whether you're a certified personal trainer managing dozens of clients or a member looking to track your fitness journey — GymSKPM has you covered.

> _"Your body can stand almost anything. It's your mind that you have to convince."_

From creating personalised **diet & workout plans** to tracking **weight progress with photos**, GymSKPM brings all the tools of a professional gym into one elegant web portal.

---

## ✨ Features

### 👤 Customer Features
- 📝 **Profile Management** — Log age, height, weight, fitness goals, activity level, and medical conditions
- 📐 **Automatic BMI Calculator** — Instantly see your BMI and health category
- 🥗 **Diet Plans** — View personalised meal plans (breakfast, lunch, dinner, snacks, supplements)
- 🏃 **Workout Plans** — Follow a day-by-day weekly training schedule assigned by your trainer
- 📈 **Progress Tracking** — Log weight over time and attach progress photos

### 🎽 Trainer Features
- 📋 **Customer Management** — Search and browse all registered customers
- 📊 **Customer Detail View** — See each customer's full profile, BMI, plans, and progress history
- ✍️ **Create & Edit Diet Plans** — Build detailed nutrition plans with calorie and protein targets
- 💪 **Create & Edit Workout Plans** — Design flexible, multi-week weekly programmes

### 🔒 Security & Auth
- Role-based access control (Customers vs. Trainers)
- Secure login / logout with Django authentication
- CSRF protection and password strength validation

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Django 5.2, Python 3.11+ |
| **Frontend (React)** | React 19, React Router 7, Vite |
| **Database** | SQLite (dev) |
| **Styling** | CSS3, Django Templates (Bootstrap-ready) |
| **Image Handling** | Pillow |
| **Deployment** | PythonAnywhere |

---

## 📁 Project Structure

```
gymskpm/
├── gym_portal/                  # Django backend
│   ├── gym_portal/              # Project config (settings, urls, wsgi)
│   ├── accounts/                # Auth: signup, login, logout, role routing
│   │   ├── models.py
│   │   ├── views.py
│   │   └── forms.py
│   ├── gym/                     # Core app: profiles, plans, progress
│   │   ├── models.py            # CustomerProfile, DietPlan, WorkoutPlan, ProgressTracking
│   │   ├── views.py
│   │   └── forms.py
│   ├── templates/               # Django HTML templates
│   ├── static/                  # CSS, JS, images
│   └── manage.py
│
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── vite.config.js
│   └── package.json
│
├── react-gym-app/               # Standalone React CRA app
│   └── src/
│
└── requirements.txt             # Python dependencies
```

---

## ⚡ Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- pip & npm

---

### Backend Setup (Django)

```bash
# 1. Clone the repository
git clone https://github.com/vineeey/gymskpm.git
cd gymskpm

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Navigate to the Django project
cd gym_portal

# 5. Apply database migrations
python manage.py migrate

# 6. Create a superuser (admin)
python manage.py createsuperuser

# 7. Run the development server
python manage.py runserver
```

Visit **http://127.0.0.1:8000** in your browser. 🎉

---

### Frontend Setup (React + Vite)

```bash
# From the repo root
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The Vite dev server will be available at **http://localhost:5173**.

---

### (Optional) React CRA App

```bash
cd react-gym-app
npm install
npm start
```

---

## 🔑 User Roles

| Role | Access |
|---|---|
| **Customer** | Dashboard, personal profile, diet & workout plans, progress tracking |
| **Trainer** | Customer list, customer profiles & plans, create/edit diet & workout plans |
| **Admin** | Full Django admin panel access |

> Roles are assigned automatically at sign-up via Django Groups.

---

## 📊 Data Models

```
CustomerProfile
 ├── user (OneToOne → User)
 ├── age, height_cm, weight_kg
 ├── goal (lose_weight / gain_muscle / maintain / endurance / strength)
 ├── activity_level
 ├── diseases (medical notes)
 ├── phone, emergency_contact
 └── [computed] bmi, bmi_category

DietPlan
 ├── customer, trainer (→ User)
 ├── breakfast, lunch, dinner, snacks, supplements
 ├── water_intake, calories_target, protein_target
 └── is_active

WorkoutPlan
 ├── customer, trainer (→ User)
 ├── monday … sunday (daily workout description)
 ├── duration_weeks
 └── is_active

ProgressTracking
 ├── customer (→ User)
 ├── weight_kg, date, notes
 └── photo (ImageField)
```

---

## 🖥️ Screenshots

> 📸 _Screenshots coming soon — contributions welcome!_

| Page | Description |
|---|---|
| 🏠 Home | Public landing page with live platform stats |
| 📊 Customer Dashboard | Diet plans, workout plans, recent progress |
| 🎽 Trainer Dashboard | Customer overview, plan counts |
| 👥 Customer List | Searchable list of all customers |
| 📝 Customer Detail | Full profile, BMI, all plans & progress |
| ✏️ Create Diet Plan | Rich form for personalised nutrition plans |
| 💪 Create Workout Plan | Weekly training schedule builder |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn and grow. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please make sure your code follows the existing style and passes all tests before submitting.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Made with ❤️ and 💪 by the GymSKPM team

⭐ **Star this repo** if GymSKPM helped you — it keeps us motivated!

</div>
