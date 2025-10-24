import React, { useMemo } from 'react';
// Import only the hooks needed, relying on the parent app for the Router context.
import { useLocation, useNavigate } from "react-router-dom"; 

// Using your existing assets for the footer
import githubIcon from './assets/github.svg';
import linkedinIcon from './assets/linkedin.svg';
import xtwitterIcon from './assets/twitter-x.svg';

// Renamed to App for standard export if this is the final component for the route.
const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely extract state data. Use simple defaults for a quick start.
    const stateData = location.state || {};
    const score = stateData.score || 0;
    const totalQuestions = stateData.totalQuestions || 10; 
    const topicName = stateData.topicName || "Python Quiz"; 

    // Calculate percentage and determine the result message/color
    const percentage = useMemo(() => (totalQuestions > 0 ? (score / totalQuestions) * 100 : 0), [score, totalQuestions]);
    
    const resultMessage = useMemo(() => {
        // Using your custom colors: text-correct, text-primary, and text-wrong
        if (percentage === 100) return { title: "Perfect Score!", colorClass: "text-correct", emoji: "🏆" };
        if (percentage >= 70) return { title: "Great Job!", colorClass: "text-primary", emoji: "✨" };
        if (percentage >= 50) return { title: "Good Attempt", colorClass: "text-yellow-300", emoji: "👍" };
        return { title: "Keep Practicing", colorClass: "text-wrong", emoji: "📚" };
    }, [percentage]);

    const handleRestart = () => {
        // Navigate back to the root (landing) page
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background text-text-primary flex flex-col items-center p-4 pt-10 pb-20">
            
            {/* Title - Consistent with your Landing page design */}
            <h1 className='text-primary-text lg:text-6xl md:text-4xl sm:text-3xl font-bold text-center mb-6'>
                Your <span className='text-yellow-300'>Quiz</span> <span className='text-blue-400'>Results</span>
            </h1>

            {/* Result Card - Uses bg-card-question */}
            <div className="w-full max-w-lg bg-card-question rounded-xl shadow-2xl p-8 border border-border space-y-8">
                
                <div className="text-center">
                    <span className={`text-4xl mx-auto mb-3 ${resultMessage.colorClass}`} role="img" aria-label="result-icon">
                        {resultMessage.emoji}
                    </span>
                    <h2 className="text-4xl font-extrabold text-text-primary mb-2">
                        {resultMessage.title}
                    </h2>
                    <p className="text-text-secondary text-lg">
                        You finished the quiz on <span className="font-semibold text-primary">{topicName}</span>.
                    </p>
                </div>

                {/* Score Display - Uses bg-card-option-default */}
                <div className="text-center bg-card-option-default p-8 rounded-lg border border-border/50">
                    <p className="text-xl font-medium text-text-secondary">Final Score</p>
                    <div className="flex items-center justify-center space-x-4 mt-2">
                        <span className={`text-7xl font-black ${resultMessage.colorClass}`}>
                            {score}
                        </span>
                        <span className="text-6xl font-extralight text-text-secondary/60">
                            /
                        </span>
                        <span className="text-5xl font-extrabold text-text-primary">
                            {totalQuestions}
                        </span>
                    </div>
                    <p className="mt-4 text-2xl font-bold text-text-secondary">
                        {Math.round(percentage)}% Accuracy
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4">
                    {/* Primary Button - Uses bg-primary */}
                    <button
                        onClick={handleRestart}
                        className="w-full flex items-center justify-center px-6 py-4 text-xl font-bold rounded-lg shadow-xl text-text-primary bg-primary hover:bg-blue-600 active:scale-[0.98] transition duration-200"
                    >
                        <span className="mr-3">🔄</span> 
                        Go Back to Topics
                    </button>
                    
                    {/* Secondary Button - Uses bg-card-option-default */}
                    <button
                        onClick={() => navigate('/')} 
                        className="w-full flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg text-primary bg-card-option-default hover:bg-border transition duration-150 ease-in-out"
                    >
                        <span className="mr-2">🏠</span> 
                        Home Screen
                    </button>
                </div>
            </div>

            {/* Footer - Copied directly from your Landing page */}
            <footer className='bg-card-option-default py-4 mt-auto fixed bottom-0 w-full left-0 items-center'>
                <ul className='flex justify-evenly mb-2'>
                    <li><a href="https://www.linkedin.com/in/utkarsh-khajuria-495b8831a" target='_blank'><img className='lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4' src={linkedinIcon} alt="LinkedIn Icon" /></a></li>
                    <li><a href="https://github.com/U-K-06" target='_blank'><img className='lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4' src={githubIcon} alt="GitHub Icon"/></a></li>
                    <li><a href="https://x.com/UK_06__" target='_blank'><img src={xtwitterIcon} className='lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4' alt="X/Twitter Icon" /></a></li>
                </ul>
                <div className="text-center text-sm text-text-secondary">
                    &copy; {new Date().getFullYear()} Utkarsh Khajuria. All rights reserved.
                </div>
            </footer>
        </div>
    );
}


export default App;

