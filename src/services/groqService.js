import Groq from 'groq-sdk';

// Initialize Groq client with the API key from environment variables
// Note: We use dangerouslyAllowBrowser for frontend demo purposes
const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
});

// System prompts defined for different Role-Based Access Tiers
const ROLE_PROMPTS = {
    expert: `You are IncomeLens Expert AI, a highly technical macroeconomic and financial dashboard assistant. 
Your user is a senior finance executive. 
You must provide rigorous, data-driven, and highly analytical responses. Use professional financial terminology.
If the user asks to simulate a crisis (e.g., "war in India"), provide specific forecasted percentage impacts on supply chains, global inflation, and localized defect rates based on standard economic models. Keep responses concise and formatted.`,
    
    student: `You are IncomeLens Educational AI, a helpful tutor for finance students learning to read analytical dashboards.
Your user is a beginner student.
You must explain macroeconomic concepts clearly and simply, avoiding overly dense jargon. 
If the user asks about a crisis, explain *why* it would affect global markets (e.g., explaining how oil supply routes affect inflation) rather than giving raw percentage forecasts. Be encouraging and educational.`,
    
    user: `You are IncomeLens AI, a helpful generic assistant for dashboard users.
Your user is a general operations employee.
Provide simple, high-level, and reassuring answers about dashboard metrics.
Do not provide deep technical analysis or complex economic theory. Focus on operational stability and compliance monitoring.`
};

export const getGroqChatCompletion = async (userMessage, role = 'user') => {
    try {
        const systemPrompt = ROLE_PROMPTS[role] || ROLE_PROMPTS.user;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: userMessage,
                },
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.5,
            max_tokens: 500,
        });

        return chatCompletion.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";
    } catch (error) {
        console.error("Groq API Error:", error);
        return "I am currently experiencing connection issues to my intelligence network. Please try again later.";
    }
};
