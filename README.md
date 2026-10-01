

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
│
├── database/
│   └── ems_schema.sql                 # MySQL database bootstrap script
│
├── Ems-Backend/
│   ├── pom.xml                        # Maven configuration
│   ├── mvnw / mvnw.cmd                # Maven Wrapper
│   └── src/
│       ├── main/java/net/javaguides/Ems/
│       │   ├── config/                # CORS, Swagger and data seeding
│       │   ├── controller/            # REST API controllers
│       │   ├── dto/                   # Request/response DTOs
│       │   ├── entity/                # JPA entities and enums
│       │   ├── exception/             # Custom exceptions and handlers
│       │   ├── mapper/                # Entity/DTO mapping
│       │   ├── repository/             # Spring Data repositories
│       │   └── service/               # Business logic
│       │       └── impl/
│       ├── main/resources/
│       │   └── application.properties # Backend configuration
│       └── test/                       # Backend tests
│
└── Ems-Frontend/
    ├── package.json                   # NPM configuration
    ├── vite.config.js                 # Vite configuration
    ├── .env                           # Frontend environment configuration
    └── src/
        ├── api/                       # Axios API service modules
        ├── components/                # Reusable UI components
        ├── context/                   # Authentication context
        ├── pages/                     # Application pages
        ├── utils/                     # Constants and formatters
        ├── App.jsx                    # Application routes
        └── main.jsx                   # React entry point


## 🛠️ Tech Stack

|-----------------------|-------------------------------|
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
|-----------------------|-------------------------------|


## ⚡ Quick Start
1. Database Setup (MySQL)
mysql -u root -p < database/ems_db

2. Backend Setup (Spring Boot)
cd Ems-Backend
# Update database credentials in src/main/resources/application.properties
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

| Method | Endpoint              | Description       |
|--------|-----------------------|-------------------|
| POST   | /auth/login    | User login        |
| POST   | /auth/verify-otp | User registration |
| POST   | /auth/resend-otp?email={email}    |
| GET    | /auth/me?email={email}                        |
| POST   | /auth/profile-photo                  |
| POST   | /auth/logout             |
| POST   | /auth/change-password/initiate                   |
| POST   | /auth/change-password/verify   |
| POST   | /auth/change-password/resend-otp?email={email}        |
|-----------------------|-------------------------------|









## Prerequisites

- Java 17+
- Node.js 18+ and npm
- MySQL 8 running locally (or update the connection URL to point elsewhere)

## 1. Backend Setup

```bash
cd Ems-Backend
```

Open `src/main/resources/application.properties` and update the MySQL credentials if needed:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

The database `ems_db` is created automatically on first run (`createDatabaseIfNotExist=true`), and tables are
created/updated automatically via `spring.jpa.hibernate.ddl-auto=update`. If your MySQL user can't create
databases, run `database/ems_schema.sql` manually first.

Run the API:

```bash
./mvnw spring-boot:run
```

The backend starts on **http://localhost:8080**. On first run it seeds 5 departments and 10 sample employees.

- REST API base URL: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

## 2. Frontend Setup

```bash
cd Ems-Frontend
npm install
npm run dev
```

The app starts on **http://localhost:3000** (configured in `vite.config.js`) and talks to the API at the URL
in `.env` (`VITE_API_BASE_URL`, defaults to `http://localhost:8080/api`).

## API Overview

| Method | Endpoint                    | Description                                   |
|--------|------------------------------|------------------------------------------------|
| GET    | `/api/employees`             | Paginated list — supports `pageNo`, `pageSize`, `sortBy`, `sortDir`, `keyword`, `departmentId`, `status` |
| GET    | `/api/employees/{id}`        | Get one employee |
| POST   | `/api/employees`             | Create an employee |
| PUT    | `/api/employees/{id}`        | Update an employee |
| DELETE | `/api/employees/{id}`        | Delete an employee |
| GET    | `/api/departments`           | List all departments (with employee counts) |
| POST   | `/api/departments`           | Create a department |
| PUT    | `/api/departments/{id}`      | Update a department |
| DELETE | `/api/departments/{id}`      | Delete a department (fails if it still has employees) |
| GET    | `/api/dashboard/stats`       | Aggregated stats for the dashboard |

## Troubleshooting

- **Frontend shows "Could not reach the server"**: make sure the backend is running on port 8080 and that
  `Ems-Frontend/.env` points to the right URL.
- **CORS errors**: confirm `app.cors.allowed-origins` in `application.properties` includes the frontend's
  origin (`http://localhost:3000` by default here).
- **springdoc-openapi dependency fails to resolve**: bump the `springdoc.version` property in `pom.xml` to
  the latest 2.x release from Maven Central, or remove the dependency block if you don't need Swagger UI.
- **MySQL access denied**: double check the username/password in `application.properties` match your local
  MySQL setup, and that the MySQL server is running.

## Possible Future Enhancements

- Authentication/authorization (Spring Security + JWT) with role-based access
- Employee profile photo upload
- CSV/Excel export of employee lists
- Audit log of changes
