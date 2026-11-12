# 04. REST API Documentation

**Base URL:** `http://localhost:5000/api`

## 1. Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | `{ name, email, mobileNumber, password, role }` | `201 Created` + JWT |
| `POST` | `/login` | Public | `{ email, password }` | `200 OK` + JWT |
| `GET` | `/profile` | Protected | Header: `Bearer <token>` | `200 OK` (User JSON) |

## 2. Grievance Routes (`/api/grievances`)
| Method | Endpoint | Access | Payload / Params | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | `citizen` | `FormData`: `subject`, `description`, `district`, `attachment` | `201 Created` (Grievance) |
| `GET` | `/` | Protected | Query: `?status=&priority=&district=&department=` | `200 OK` (Array) |
| `GET` | `/track/:referenceId` | Public | URL Param: `referenceId` | `200 OK` (`{ grievance, history }`) |
| `GET` | `/stats/kpi` | `cmo_admin` | Header: `Bearer <token>` | `200 OK` (`{ total, pending, resolved, overdue }`) |
| `PUT` | `/:id/assign` | `cmo_admin` | `{ departmentId, officerId, priority, remarks }` | `200 OK` (Updated Grievance) |
| `PUT` | `/:id/status` | `cmo_admin`, `department_officer` | `FormData`: `status`, `remarks`, `actionReport` | `200 OK` (Updated Grievance) |

## 3. Public Routes (`/api/public`)
| Method | Endpoint | Access | Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/departments` | Public | None | `200 OK` (Departments List) |
| `POST` | `/departments/seed` | Public | None | `200 OK` (Seeds default depts) |
| `POST` | `/contact` | Public | `{ name, email, subject, message }` | `201 Created` |