const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeGrievanceWithAI = async (subject, description, district) => {
  try {
    const prompt = `
      You are an AI triage officer for the Chief Minister's Office (CMO) Public Grievance Redressal Portal in Kerala.
      Analyze the following grievance and return ONLY valid JSON with these exact keys:
      - "department": Choose the most relevant Kerala government department from: ["Public Works (PWD)", "Health & Family Welfare", "Revenue & Disaster Management", "Home & Police", "Electricity (KSEB)", "Water Authority (KWA)", "Local Self Government (LSGD)", "Education", "Transport"].
      - "category": A short 2-3 word issue category (e.g., "Road Repair", "Water Supply", "Medical Negligence").
      - "priority": Must be strictly one of "Low", "Medium", or "High" (High for life safety, medical emergencies, disaster, corruption, or severe infrastructure failure).
      - "cmoSummary": A crisp, objective 2-sentence executive summary for the Chief Minister's Office.

      District: ${district}
      Subject: ${subject}
      Description: ${description}
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('AI Triage Error:', error.message);
    // Fallback if AI fails or API key is missing
    return {
      department: 'Local Self Government (LSGD)',
      category: 'General Grievance',
      priority: 'Medium',
      cmoSummary: `${subject} reported from ${district}. Requires administrative review.`
    };
  }
};

module.exports = { analyzeGrievanceWithAI };