

# Employee Management System (EMS)

A full-stack Employee Management System for managing employees, departments, administrative authentication, dashboard statistics, and employee records through a modern React frontend and Spring Boot REST API.


## About

The Employee Management System (EMS) is a web-based admin application designed to simplify employee and department management. It provides an administrator with a centralized dashboard to create, view, update, search, filter, and delete employee records, while also managing departments and account security.

The application follows a three-tier architecture:

Frontend: React.js + Vite + Bootstrap 5
Backend: Java + Spring Boot REST API
Database: MySQL with Spring Data JPA / Hibernate


## Key Features

🔐 Admin Authentication & Security
📊 Dashboard
👨‍💼 Employee Management
🏢 Department Management
📧 Email & OTP


## 📁 Project Structure

Full_Stack_EMS/                                                                                                                                                          
├── database/             → ems_schema.sql                                                                                                                               
├── Ems-Backend/          → Java Spring Boot Backend                                                                                                                     
├── Ems-Frontend/         → React.js & Vite configuration(with Bootstrap)                                                                                                
└── README.md             → This file                                                                                                                                         
    

## 🛠️ Tech Stack

| Layer                 | Technology                    |
|-----------------------|-------------------------------|
| Frontend              | React 19                      |
| Frontend Build Tool   | Vite 7                        |
| UI Framework          | Bootstrap 5.3                 |
| Icons                 | Bootstrap Icons               |
| Routing               | React Router DOM 6            |
| HTTP Client           | Axios                         |
| Backend               | Java 17                       |
| Framework             | Spring Boot 3.3.5             |
| REST API              | Spring Web                    |
| ORM                   | Spring Data JPA / Hibernate   |
| Validation            | Spring Boot Validation        |
| Database              | MySQL                         |
| Email                 | Spring Mail / Gmail SMTP      |         
| Build Tool            | Maven                         |
| Code Simplification   | Lombok                        |


## ⚡ Quick Start

1. Database Setup (MySQL)
 mysql -u root -p < database/ems_db

2. Backend Setup (Spring Boot)
 cd Ems-Backend

 Update database credentials in src/main/resources/application.properties

 mvn clean install
 mvn spring-boot:run

 Backend runs at: http://localhost:8080

3. Frontend Setup (React)
   
 cd Ems-Frontend
 npm install
 npm run dev

 Frontend runs at: http://localhost:3000


## 🔌 REST API Endpoints

Base URL:http://localhost:8080/api

## 🔐 Authentication APIs

| Method | Endpoint                                       | Description                                      |
|--------|------------------------------------------------|--------------------------------------------------|
| POST   | /auth/login                                    | Initiate admin login and send OTP                |
| POST   | /auth/verify-otp                               | Verify login OTP and return authentication token |
| POST   | /auth/resend-otp?email={email}                 | Resend login OTP                                 |
| GET    | /auth/me?email={email}                         | Get admin profile                                |
| POST   | /auth/profile-photo                            | Update/remove admin profile photo                |
| POST   | /auth/logout                                   | Logout admin session                             |
| POST   | /auth/change-password/initiate                 | Validate current password and send OTP           |
| POST   | /auth/change-password/verify                   | Verify OTP and change password                   |
| POST   | /auth/change-password/resend-otp?email={email} | Resend password-change OTP                       |  


## 📊 Dashboard API

| Method | Endpoint           | Description                                       |
|--------|--------------------|---------------------------------------------------|
| GET   | /dashboard/stats    | Get dashboard statistics and recent employee data | 


## 👨‍💼 Employee APIs

| Method | Endpoint              | Description                                  |
|--------|-----------------------|----------------------------------------------|
| POST   | /employees            | Create employee                              |
| GET    | /employees/{id}       | Get employee by ID                           |
| GET    | /employees            | Get paginated, sorted and filtered employees |
| PUT    | /employees/{id}       | Update employee                              |
| DELETE | /employees/{id}       | Delete employee                              |
  

## 🏢 Department APIs

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | /departments       | Create department      |
| GET    | /departments       | Get all departments    |
| GET    | /departments/{id}  | Get department by ID   |
| PUT    | /departments/{id}  | Update department      |
| DELETE | /departments/{id}  | Delete department      |
  

## 🔄 Application Flow                            

                    ┌──────────────────────┐
                    │   React Frontend     │
                    │ React + Vite +       │
                    │ Bootstrap + Axios    │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │ Controllers          │
                    │ Services             │
                    │ Repositories         │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │       MySQL          │
                    │ Employees            │
                    │ Departments          │
                    │ Admins               │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Gmail SMTP         │
                    │ Login / Password     │
                    │ OTP Emails           │
                    └──────────────────────┘
📄 License

This project is intended for educational, portfolio, and development purposes. Add an appropriate open-source license file if you plan to distribute the project publicly.
