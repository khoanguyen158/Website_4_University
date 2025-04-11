# [University Student, Faculty & Admin Management System](https://fir-d023a.web.app/)

## Project Overview
This project is a **web-based University Management System** developed using **HTML, CSS, JavaScript, and Firebase**. It enables students to register for courses and check their grades, faculty members to manage academic records, and administrators to oversee the entire system, including course registration periods and user management.

![Overview](/img/Doc/Overview.png)
---

## Key Features

### 🔹 For Students
- **Course Registration:** Browse and enroll in available courses during open registration periods.
- **Class Participation:** Access enrolled courses and interact with faculty.
- **Grade Viewing:** Securely check academic performance in real-time.
- **Profile Management:** Update personal information (e.g., contact details).

### 🔹 For Faculty
- **Course Selection:** Choose subjects they are eligible to teach.
- **Grade Management:** Update and manage student grades in real-time.
- **Profile Management:** Edit personal details and professional information.

### 🔹 For Administrators
- **Manage Course Registration Periods:** Open and close course registration for students.
- **User Management:** Edit student and faculty information.
- **Course Management:** Modify course details, including descriptions and assigned instructors.

---

## Technologies Used
- **Frontend:** HTML, CSS (Bootstrap), JavaScript
- **Backend & Database:** Firebase Firestore for storing student, faculty, admin, and course data
- **Authentication:** Firebase Authentication for secure login and role-based access control
- **Hosting & Deployment:** Firebase Hosting for live access

---
## Install

### Prerequisites
- Node.js (v20 or higher)
- Git
- Firebase CLI
- Web browser (Chrome, Firefox, etc.)

### Clone Repository
```bash
git clone https://github.com/khoanguyen158/Website_4_University.git
cd Website_4_University
```

### Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```
3. Login to Firebase:
```bash
firebase login
```
4. Initialize Firebase in your project:
```bash
firebase init
```

### Configuration
1. Navigate to your Firebase project settings
2. Copy your Firebase configuration
3. Create a file `firebase-config.js` in the project root
4. Paste your Firebase configuration

### Running Locally
1. Start the development server:
```bash
firebase serve
```
2. Open your browser and navigate to `http://localhost:5000`

### Deployment
Deploy to Firebase Hosting:
```bash
firebase deploy
``` 

### Deployment Link
Access the deployed project here: [Click here](https://fir-d023a.web.app/)

---