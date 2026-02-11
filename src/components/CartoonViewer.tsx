'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Panel {
    order: number;
    character: string; // 'tanjiro' | 'zenitsu' | 'inosuke'
    imageUrl: string;
    description: string;
    dialogue: string;
}

interface CartoonData {
    lectureId: number;
    title: string;
    panels: Panel[];
}

interface CartoonViewerProps {
    data: CartoonData;
}

// Character specific styles and configurations
const CHARACTER_CONFIG: Record<string, any> = {
    tanjiro: {
        name: "탄지로",
        bgPattern: "bg-[url('https://www.transparenttextures.com/patterns/checkerboard-cross.png')]", // Checkerboard-ish
        bgColor: "bg-green-600",
        textColor: "text-green-900",
        bubbleColor: "bg-green-100",
        icon: "🌊"
    },
    zenitsu: {
        name: "젠이츠",
        bgPattern: "bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]", // Triangles-ish
        bgColor: "bg-yellow-400",
        textColor: "text-yellow-900",
        bubbleColor: "bg-yellow-100",
        icon: "⚡"
    },
    inosuke: {
        name: "이노스케",
        bgPattern: "bg-blue-600",
        bgColor: "bg-blue-600",
        textColor: "text-blue-900",
        bubbleColor: "bg-blue-100",
        icon: "🐗"
    },
    default: {
        name: "해설",
        bgPattern: "bg-gray-200",
        bgColor: "bg-gray-400",
        textColor: "text-gray-800",
        bubbleColor: "bg-white",
        icon: "📜"
    }
};

const CartoonViewer: React.FC<CartoonViewerProps> = ({ data }) => {
    const [currentPanel, setCurrentPanel] = useState(0);

    const nextPanel = () => {
        if (currentPanel < data.panels.length - 1) {
            setCurrentPanel(currentPanel + 1);
        }
    };

    const prevPanel = () => {
        if (currentPanel > 0) {
            setCurrentPanel(currentPanel - 1);
        }
    };

    const activePanel = data.panels[currentPanel];
    const character = CHARACTER_CONFIG[activePanel.character] || CHARACTER_CONFIG.default;

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center font-serif text-gray-800 border-b-2 border-red-800 pb-2 inline-block relative left-1/2 transform -translate-x-1/2">
                👹 {data.title}
            </h2>

            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
                {/* Dynamic Background based on Character */}
                <div className={`absolute inset-0 opacity-20 ${character.bgPattern} animate-pulse`}></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPanel}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex flex-col items-center justify-between p-8 relative z-10"
                    >
                        {/* Upper Section: Scene Description */}
                        <div className="bg-black/60 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/20">
                            Scene {activePanel.order}: {activePanel.description}
                        </div>

                        {/* Middle Section: Character Avatar Representation */}
                        <div className="flex-1 flex items-center justify-center">
                            {/* We use CSS/Emoji avatars since we don't have images */}
                            <div className={`w-48 h-48 rounded-full ${character.bgColor} border-4 border-white shadow-lg flex items-center justify-center text-8xl animate-bounce`}>
                                {character.icon}
                            </div>
                        </div>

                        {/* Lower Section: Dialogue Box (Visual Novel Style) */}
                        <div className={`w-full ${character.bubbleColor} p-6 rounded-xl border-l-8 ${character.textColor.replace('text', 'border')} shadow-lg relative mt-4`}>
                            {/* Speaker Name Tag */}
                            <div className={`absolute -top-4 left-4 ${character.bgColor} text-white px-4 py-1 rounded-lg font-bold shadow-md`}>
                                {character.name}
                            </div>

                            <p className={`text-xl font-bold ${character.textColor} leading-relaxed`}>
                                "{activePanel.dialogue}"
                            </p>

                            <div className="absolute right-4 bottom-4 text-xs opacity-50">
                                ▶ 클릭하여 계속
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Areas (Invisible but clickable) */}
                <div className="absolute inset-y-0 left-0 w-1/4 cursor-pointer hover:bg-black/5 transaction-colors" onClick={prevPanel} title="이전"></div>
                <div className="absolute inset-y-0 right-0 w-1/4 cursor-pointer hover:bg-black/5 transaction-colors" onClick={nextPanel} title="다음"></div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 gap-3">
                {data.panels.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPanel(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPanel === idx ? 'bg-red-600 w-8' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CartoonViewer;
