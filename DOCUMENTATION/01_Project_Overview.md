# 01. Project Overview: CM Kerala Public Grievance Redressal Portal

## 1. Mission & Problem Statement
Citizens often face delays and confusion when routing complaints across multiple government departments. The **CM Kerala Public Grievance Redressal Portal** centralizes grievance submission under the Chief Minister's Office (CMO), utilizing AI-powered triage to automatically classify issues, assign priority, and provide real-time tracking.

## 2. Core Objectives
- **Automated AI Triage:** Instantly analyze incoming complaints to suggest the responsible department, category, priority level, and an executive summary.
- **Transparent Tracking:** Issue a unique Reference ID (`CMO-YYYY-XXXXX`) upon submission so citizens can track status changes and officer remarks in real time.
- **Role-Based Accountability:** Enforce 15-day Service Level Agreements (SLAs) with distinct dashboards for Citizens, CMO Admins, and Department Officers.

## 3. Target User Roles
- **Citizen:** Registers, submits grievances with supporting attachments, and tracks resolution timelines.
- **CMO Admin (`cmo_admin`):** Monitors KPI metrics, filters complaints by district/priority, and forwards cases to departments.
- **Department Officer (`department_officer`):** Reviews assigned complaints, updates progress statuses, and uploads Action-Taken Reports.