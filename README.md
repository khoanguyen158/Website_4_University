# University Student, Faculty & Admin Management System

## Project Overview
This project is a **web-based University Management System** developed using **HTML, CSS, JavaScript, and Firebase**. It enables students to register for courses and check their grades, faculty members to manage academic records, and administrators to oversee the entire system, including course registration periods and user management.

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
- **Frontend:** HTML, CSS (Bootstrap/Tailwind), JavaScript
- **Backend & Database:** Firebase Firestore for storing student, faculty, admin, and course data
- **Authentication:** Firebase Authentication for secure login and role-based access control
- **Hosting & Deployment:** Firebase Hosting for live access

---

## Outcome & Impact
This system streamlines **university administration**, allowing for efficient **course management**, **student enrollment**, and **grade tracking**. The Firebase-powered backend ensures **secure data storage**, **real-time updates**, and **role-based access control**, providing a **scalable and efficient** academic management solution.


# Deploying to Firebase

To upload and deploy your project to Firebase, use the following command:

```sh
firebase deploy
```

## Prerequisites
- Ensure you have Firebase CLI installed.
- Authenticate by running:
  ```sh
  firebase login
  ```
- Navigate to your project directory and initialize Firebase if not already done:
  ```sh
  firebase init
  ```

## Deployment Steps
1. Navigate to your project folder.
2. Run `firebase deploy` to upload and deploy the latest changes.
3. Upon successful deployment, Firebase will provide a hosting URL for your project.

For more details, visit the [Firebase documentation](https://firebase.google.com/docs/cli).
