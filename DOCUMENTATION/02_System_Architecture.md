graph TD
    subgraph Client Tier [Frontend - React.js / Vite]
        A[Public Pages & Citizen Portal] -->|HTTP / REST API| B[CMO & Officer Dashboards]
    end

    subgraph Server Tier [Backend - Node.js & Express]
        C[API Routes & Auth Middleware] --> D[Grievance Controller]
        C --> E[AI Assistant Service]
    end

    subgraph External Services
        E -->|LLM / Prompt API| F[(AI Model API / Groq / OpenAI)]
        G[Multer File Upload] -->|Local / Cloud Storage| H[(Uploads Folder)]
    end

    subgraph Data Tier [Database - MongoDB]
        D --> I[(MongoDB Atlas / Local)]
    end

    B -.->|JWT Bearer Token| C
    A -.->|FormData / JSON| C