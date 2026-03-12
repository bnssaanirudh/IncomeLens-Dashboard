/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useCallback } from 'react';

const ScenarioContext = createContext();

export const useScenario = () => useContext(ScenarioContext);

export const ScenarioProvider = ({ children }) => {
    // "normal" | "crisis"
    const [scenarioRisk, setScenarioRisk] = useState("normal");
    const [riskDetails, setRiskDetails] = useState(null);

    const processNLPInput = useCallback((text, userRole = 'user') => {
        if (!text) return { isRisk: false, message: null };
        const lowerText = text.toLowerCase();
        console.log("Chatbot NLP Processing:", lowerText, "Role:", userRole);

        const hasRiskKeyword = /war|conflict|crisis|attack|invasion/i.test(lowerText);
        const hasRegion = /india|iran|middle east|asia/i.test(lowerText);

        // EXPERT ROLE: Allowed to trigger dashboard data simulations and gets highly technical readouts
        if (userRole === 'expert') {
            if (hasRiskKeyword && hasRegion) {
                setScenarioRisk("crisis");
                setRiskDetails({
                    event: "Geopolitical Conflict",
                    regions: ["India", "Iran"],
                    severity: "High",
                    economicImpact: "Supply chain disruption, inflation spike, massive market volatility."
                });
                return { isRisk: true, message: "CRITICAL ALERT: Analyzing projected impact of conflict between India and Iran. Adjusting dashboard macroeconomic variables for extreme volatility scenario. Expected deviation: +14% variance on baseline inflation metrics." };
            } else if (lowerText.includes("reset") || lowerText.includes("normal") || lowerText.includes("clear")) {
                setScenarioRisk("normal");
                setRiskDetails(null);
                return { isRisk: false, message: "Dashboard simulation parameters reset to current baseline moving averages." };
            }
            const isAskingAboutRisk = /what|how|why|when|risk|impact|show/i.test(lowerText);
            if (isAskingAboutRisk && !hasRegion) {
                return { isRisk: false, message: "I can forecast specific macro-level disruptions. Try asking me about 'war in the Middle East' or 'conflict in India/Iran' to run a dashboard simulation." };
            }
        } 
        // STUDENT ROLE: Gets educational, beginner-friendly explanations, no dashboard overrides
        else if (userRole === 'student') {
            if (hasRiskKeyword && hasRegion) {
                return { isRisk: false, message: "A conflict between India and Iran would likely disrupt middle-eastern oil supply lines and cause global inflation. Notice how the 'Defect Rate' and 'Audit Status' metrics could be affected by geopolitical instability." };
            }
            const isAskingAboutRisk = /what|how|why|when|risk|impact|show/i.test(lowerText);
            if (isAskingAboutRisk && !hasRegion) {
                return { isRisk: false, message: "Welcome to your Finance Studies! Try asking me a question like 'How does a war in the Middle East affect the dashboard data?' to see an example of macroeconomic impact." };
            }
        } 
        // GENERAL USER ROLE: Gets simple, high level answers
        else {
            if (hasRiskKeyword && hasRegion) {
                return { isRisk: false, message: "A conflict in that region would introduce market volatility. We monitor these external risks to ensure your compliance records remain secure." };
            }
            const isAskingAboutRisk = /what|how|why|when|risk|impact|show/i.test(lowerText);
            if (isAskingAboutRisk && !hasRegion) {
                return { isRisk: false, message: "I am here to help you understand your dashboard. Try asking me what happens during a conflict in Asia, and I will explain the risk!" };
            }
        }

        // Default safe NLP action
        return { isRisk: false, message: null };
    }, []);

    const resetScenario = useCallback(() => {
        setScenarioRisk("normal");
        setRiskDetails(null);
    }, []);

    return (
        <ScenarioContext.Provider value={{ scenarioRisk, riskDetails, processNLPInput, resetScenario }}>
            {children}
        </ScenarioContext.Provider>
    );
};
