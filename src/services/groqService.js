import Groq from 'groq-sdk';

// Lazy-initialize so a missing API key doesn't crash the app on import
let groq = null;
const getGroqClient = () => {
    if (!groq) {
        const apiKey = import.meta.env.VITE_GROQ_API_KEY;
        if (!apiKey || apiKey === 'your_groq_api_key_here') return null;
        try {
            groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });
        } catch {
            return null;
        }
    }
    return groq;
};

// System prompts defined for different Role-Based Access Tiers
const ROLE_PROMPTS = {
    expert: `You are IncomeLens Expert AI, a highly technical macroeconomic and financial dashboard assistant. 
Your user is a senior finance executive. 
You must provide rigorous, data-driven, and highly analytical responses. Use professional financial terminology.
If the user asks to simulate a crisis (e.g., "war in India"), provide specific forecasted percentage impacts on supply chains, global inflation, and localized defect rates based on standard economic models.

FORMAT YOUR RESPONSES:
- Use bullet points (with - or •) for lists
- Use **bold** for key metrics or important terms
- Keep paragraphs short (2-3 sentences max)
- Separate sections with blank lines
- Be concise but thorough`,
    
    student: `You are IncomeLens Educational AI, a helpful tutor for finance students learning to read analytical dashboards.
Your user is a beginner student.
You must explain macroeconomic concepts clearly and simply, avoiding overly dense jargon. 
If the user asks about a crisis, explain *why* it would affect global markets (e.g., explaining how oil supply routes affect inflation) rather than giving raw percentage forecasts. Be encouraging and educational.

FORMAT YOUR RESPONSES:
- Use bullet points (with - or •) for key points
- Use **bold** for important concepts
- Break down complex ideas into simple steps
- Keep language friendly and accessible
- Use examples when helpful`,
    
    user: `You are IncomeLens AI, a helpful generic assistant for dashboard users.
Your user is a general operations employee.
Provide simple, high-level, and reassuring answers about dashboard metrics.
Do not provide deep technical analysis or complex economic theory. Focus on operational stability and compliance monitoring.

FORMAT YOUR RESPONSES:
- Use bullet points (with - or •) for clarity
- Use **bold** for key information
- Keep responses brief and easy to understand
- Be reassuring and professional`
};

export const getGroqChatCompletion = async (userMessage, role = 'user') => {
    const client = getGroqClient();
    if (!client) {
        return "AI chat requires a valid GROQ API key in your .env file (VITE_GROQ_API_KEY).";
    }
    try {
        const systemPrompt = ROLE_PROMPTS[role] || ROLE_PROMPTS.user;
        const chatCompletion = await client.chat.completions.create({
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
