const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.analyzeGrievance = async (title, description) => {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.startsWith('gsk_xVoOXRBfMv')) {
      // Fallback if API key is placeholder or missing
      return { department: 'General Administration', priority: 'Medium', sentiment: 'Neutral' };
    }

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192', // or your preferred model
      messages: [
        {
          role: 'system',
          content: 'Analyze the following citizen grievance and return a JSON object with keys: department (e.g. Water Authority, KSEB, Public Works, Revenue, Health), priority (High, Medium, Low), and summary.',
        },
        {
          role: 'user',
          content: `Title: ${title}\nDescription: ${description}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('AI Analysis Warning (Falling back to default):', error.message);
    // Return a safe fallback so submission never breaks
    return {
      department: 'General Administration',
      priority: 'Medium',
      summary: description.substring(0, 100),
    };
  }
};