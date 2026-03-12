import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Send } from 'lucide-react';

const FeedbackPage = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send data to an API
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFeedback('');
        setRating(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    Your Feedback
                    <MessageSquare className="text-primary" size={28} />
                </h2>
                <p className="text-text-secondary mt-2">Help us improve the IncomeLens platform by sharing your thoughts.</p>
            </div>

            <div className="glass-panel p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

                {isSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-16 text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Star className="text-emerald-500" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                        <p className="text-text-secondary">Your feedback has been successfully submitted and helps us build a better tool.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-white mb-4">How would you rate your experience?</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                    >
                                        <Star
                                            size={36}
                                            fill={(hoverRating || rating) >= star ? '#3b82f6' : 'transparent'}
                                            className={`${(hoverRating || rating) >= star ? 'text-primary' : 'text-gray-500'} transition-colors`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Detailed Comments</label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={5}
                                placeholder="What did you like? What can we improve?"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!rating || !feedback.trim()}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                            >
                                Submit Feedback
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                )}
            </div>

        </motion.div>
    );
};

export default FeedbackPage;
