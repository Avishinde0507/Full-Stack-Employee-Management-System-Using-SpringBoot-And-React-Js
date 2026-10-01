![Uploading image.png…]()

# Employee Management System (EMS)

A full-stack Employee Management System built with **Spring Boot (REST API)**, **React**, and **MySQL**.

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React.js (Vite), Bootstrap 5, Bootstrap Icons, Recharts, Axios, React Router |
| Backend   | Java 17, Spring Boot 3.3, Spring Data JPA, Spring Validation, springdoc-openapi |
| Database  | MySQL 8 |

## Features

- **Employees**: create, view, edit, delete; search by name/email/designation; filter by department and status; sortable, paginated table
- **Departments**: create, view, edit, delete (a department with employees still assigned cannot be deleted)
- **Dashboard**: total/active/inactive employee counts, department headcount chart, recently joined list
- Clean validation with field-level error messages (both client-side and server-side)
- Centralized error handling on the backend (404 / 409 / 400 / 500 all return consistent JSON)
- CORS pre-configured for the Vite dev server
- Sample data is seeded automatically on first run so the app isn't empty
- Interactive API docs via Swagger UI

## Project Structure

```
Full_Stack_EMS/
├── Ems-Backend/     Spring Boot REST API (Java)
├── Ems-Frontend/    React + Vite single-page app
└── database/        Optional manual SQL script
```

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
