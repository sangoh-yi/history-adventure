'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Question {
    id: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}

interface QuizData {
    id: string;
    questions: Question[];
}

interface QuizComponentProps {
    data: QuizData;
    onComplete: (score: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ data, onComplete }) => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const currentQ = data.questions[currentQIndex];

    const handleOptionClick = (option: string) => {
        if (showExplanation || isDone) return;
        setSelectedOption(option);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;

        if (selectedOption === currentQ.answer) {
            setScore(prev => prev + 10); // 10 points per question
        }
        setShowExplanation(true);
    };

    const handleNext = () => {
        if (currentQIndex < data.questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setIsDone(true);
            onComplete(score);
        }
    };

    if (isDone) {
        return (
            <div className="text-center p-8 bg-green-50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">퀴즈 완료!</h3>
                <p className="text-xl">점수: {score}점</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-400">문제 {currentQIndex + 1} / {data.questions.length}</span>
                <span className="font-bold text-blue-600">점수: {score}</span>
            </div>

            <h3 className="text-lg font-bold mb-6">{currentQ.question}</h3>

            <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-lg text-left transition-colors border-2 ${selectedOption === option
                                ? showExplanation
                                    ? option === currentQ.answer
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-red-500 bg-red-50'
                                    : 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {showExplanation && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 p-4 rounded-lg mb-6"
                >
                    <p className="font-bold mb-1">
                        {selectedOption === currentQ.answer ? '정답입니다!' : '오답입니다.'}
                    </p>
                    <p className="text-sm text-gray-700">{currentQ.explanation}</p>
                </motion.div>
            )}

            <div className="text-right">
                {!showExplanation ? (
                    <button
                        onClick={handleCheckAnswer}
                        disabled={!selectedOption}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
                    >
                        정답 확인
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        {currentQIndex < data.questions.length - 1 ? '다음 문제' : '퀴즈 종료'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizComponent;
