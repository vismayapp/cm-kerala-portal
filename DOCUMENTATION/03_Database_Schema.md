erDiagram
    USER {
        ObjectId _id PK
        string name
        string email
        string mobileNumber
        string password
        string role "Citizen, CMO_Admin, Department_Officer"
        date createdAt
    }

    DEPARTMENT {
        ObjectId _id PK
        string name
        string description
    }

    GRIEVANCE {
        ObjectId _id PK
        string referenceId UK
        ObjectId user FK
        string subject
        string department
        string district
        string description
        string priority "Low, Medium, High"
        string status "Submitted, Under Review, In Progress, Resolved, Reopened"
        string aiSummary
        string attachment
        date createdAt
    }

    GRIEVANCE_HISTORY {
        ObjectId _id PK
        ObjectId grievanceId FK
        string status
        string remarks
        ObjectId updatedBy FK
        date timestamp
    }

    CONTACT_ENQUIRY {
        ObjectId _id PK
        string name
        string email
        string subject
        string message
        date createdAt
    }

    USER ||--o{ GRIEVANCE : submits
    DEPARTMENT ||--o{ GRIEVANCE : handles
    GRIEVANCE ||--o{ GRIEVANCE_HISTORY : tracks_history