# 05. AI Integration Guide

## 1. Overview
The portal uses **Groq Cloud** (`llama-3.3-70b-versatile`) in `backend/services/aiService.js` to automate initial complaint triage without human bottlenecks.

## 2. Structured JSON Enforcement
To guarantee deterministic database writes, the API call sets `response_format: { type: 'json_object' }` and `temperature: 0.2`. The prompt constrains the model to output strictly four keys:
- `department`: Mapped to official Kerala government departments (PWD, Health, Revenue, Home, KSEB, KWA, LSGD, Education, Transport).
- `category`: A concise 2–3 word issue label.
- `priority`: Strictly `"Low"`, `"Medium"`, or `"High"` based on urgency and public safety impact.
- `cmoSummary`: A 2-sentence objective brief for CMO administrators.

## 3. Fallback Mechanism
If the Groq API key is missing, rate-limited, or encounters a network timeout, `analyzeGrievanceWithAI()` catches the exception and returns a safe default object (`Local Self Government (LSGD)`, `Medium` priority) so citizen submissions never fail.