import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, AlertTriangle, Maximize2, Minimize2 } from 'lucide-react';
import { useScenario } from '../../context/ScenarioContext';
import { useAuth } from '../../context/AuthContext';
import { getGroqChatCompletion } from '../../services/groqService';

// Format message text with better styling
const formatMessage = (text) => {
    if (!text) return null;
    
    // Split by double newlines for paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
        // Check if it's a bullet point list
        const lines = paragraph.split('\n');
        const isList = lines.some(line => line.trim().match(/^[-•*]\s/));
        
        if (isList) {
            return (
                <ul key={pIndex} className="space-y-1.5 my-2 pl-4">
                    {lines.map((line, lIndex) => {
                        const cleanLine = line.trim().replace(/^[-•*]\s/, '');
                        if (!cleanLine) return null;
                        return (
                            <li key={lIndex} className="flex items-start gap-2">
                                <span className="text-blue-400 mt-1">•</span>
                                <span className="flex-1">{cleanLine}</span>
                            </li>
                        );
                    })}
                </ul>
            );
        }
        
        // Check if it's a numbered list
        const isNumberedList = lines.some(line => line.trim().match(/^\d+\.\s/));
        if (isNumberedList) {
            return (
                <ol key={pIndex} className="space-y-1.5 my-2 pl-4 list-decimal list-inside">
                    {lines.map((line, lIndex) => {
                        const cleanLine = line.trim().replace(/^\d+\.\s/, '');
                        if (!cleanLine) return null;
                        return (
                            <li key={lIndex} className="ml-2">
                                {cleanLine}
                            </li>
                        );
                    })}
                </ol>
            );
        }
        
        // Regular paragraph with bold text support
        const formattedParagraph = paragraph.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-bold text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
        
        return (
            <p key={pIndex} className={pIndex > 0 ? 'mt-3' : ''}>
                {formattedParagraph}
            </p>
        );
    });
};

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { processNLPInput, scenarioRisk } = useScenario();
    const { user } = useAuth();
    const userRole = user?.role || 'user';

    const getInitialMessage = () => {
        if (userRole === 'expert') return "Hello Expert! I am IncomeLens AI. Try typing 'india and iran are in war' to run a dashboard impact simulation.";
        if (userRole === 'student') return "Hello Student! I am IncomeLens Educational AI. Feel free to ask me how different scenarios impact financial metrics.";
        return "Hello! I am IncomeLens AI. Ask me questions about your dashboard or hypothetical risks.";
    };

    const [messages, setMessages] = useState([
        { id: 1, text: getInitialMessage(), sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isExpanded]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // 1. Process message for internal dashboard triggers
        const riskResponse = processNLPInput(userMsg.text, userRole);
        
        // Show loading indicator
        const loadingId = Date.now() + 1;
        setMessages(prev => [...prev, { id: loadingId, text: "Analyzing global data...", sender: 'bot', isLoading: true }]);

        try {
            // 2. Fetch live intelligent response natively from Groq LLM
            const botReply = await getGroqChatCompletion(userMsg.text, userRole);
            
            // Remove loading and append real reply
            setMessages(prev => prev.filter(msg => msg.id !== loadingId));
            setMessages(prev => [...prev, { id: Date.now() + 2, text: botReply, sender: 'bot', isAlert: riskResponse?.isRisk }]);
            
        } catch (error) {
            setMessages(prev => prev.filter(msg => msg.id !== loadingId));
            setMessages(prev => [...prev, { id: Date.now() + 2, text: "I'm having trouble connecting to my AI core. Please try again.", sender: 'bot' }]);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed flex flex-col z-50 bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden
                            ${isExpanded 
                                ? 'inset-4 sm:inset-10 rounded-[2rem]' 
                                : 'bottom-20 right-4 sm:right-6 w-[380px] h-[550px] rounded-3xl'}`}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                                    <MessageSquare size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">IncomeLens Intelligence</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                        <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">{userRole} LLM Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (isExpanded) setTimeout(() => setIsExpanded(false), 300); // reset expansion after closing animation
                                    }}
                                    className="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-sm' : msg.isAlert ? 'bg-red-500/20 border border-red-500/30 text-red-100 rounded-tl-sm' : 'bg-white/10 border border-white/5 text-white rounded-tl-sm'}`}>
                                        {msg.isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                                <span className="text-white/70">{msg.text}</span>
                                            </div>
                                        ) : (
                                            <div className="whitespace-pre-wrap break-words">
                                                {formatMessage(msg.text)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/10 bg-black/20">
                            <form onSubmit={handleSend} className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a scenario (e.g. war in...)"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-primary/50"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white disabled:opacity-50 hover:bg-primary/90 transition-colors"
                                >
                                    <Send size={16} className="ml-1" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-colors ${scenarioRisk === 'crisis' ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse' : 'bg-primary hover:bg-primary/90'}`}
            >
                {isOpen ? <X size={24} className="text-white" /> : <MessageSquare size={24} className="text-white" />}
            </motion.button>
        </>
    );
};

export default ChatbotWidget;
