'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Note {
    time: number;
    lane: number;
    keyword: string;
}

interface RhythmGameData {
    lectureId: number;
    title: string;
    bpm: number;
    duration: number;
    notes: Note[];
}

interface RhythmGameProps {
    data: RhythmGameData;
    onComplete: (score: number) => void;
}

const RhythmGame: React.FC<RhythmGameProps> = ({ data, onComplete }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const lanes = [1, 2, 3, 4];
    const audioRef = useRef<HTMLAudioElement | null>(null); // Placeholder for audio

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= data.duration) {
                        setIsPlaying(false);
                        onComplete(score);
                        return prev;
                    }
                    return prev + 0.1; // 100ms update
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, data.duration, onComplete, score]);

    const handleLaneClick = (laneIds: number) => {
        if (!isPlaying) return;

        // Check for hit
        // Simple logic: find note in lane that is close to currentTime
        const hitWindow = 0.5; // seconds
        const hitNoteIndex = data.notes.findIndex(
            (n) => n.lane === laneIds && Math.abs(n.time - currentTime) < hitWindow
        );

        if (hitNoteIndex !== -1) {
            // Hit!
            setScore((prev) => prev + 100);
            // Visual feedback could be added here
            console.log("성공!", data.notes[hitNoteIndex].keyword);
        } else {
            // Miss logic if needed
        }
    };

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setCurrentTime(0);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-xl shadow-lg relative overflow-hidden h-[500px]">
            <div className="absolute top-4 left-4 z-10">
                <h2 className="text-xl font-bold">{data.title}</h2>
                <p>점수: {score}</p>
                <p>시간: {currentTime.toFixed(1)}초</p>
            </div>

            {!isPlaying && currentTime === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
                    <button
                        onClick={startGame}
                        className="px-8 py-4 bg-pink-500 rounded-full text-2xl font-bold hover:scale-110 transition-transform"
                    >
                        게임 시작!
                    </button>
                </div>
            )}

            {/* Lanes */}
            <div className="flex h-full pt-20">
                {lanes.map((lane) => (
                    <div key={lane} className="flex-1 border-r border-gray-700 relative group">
                        <div className="absolute bottom-10 w-full h-2 bg-white/20" /> {/* Hit Line */}

                        {/* Click Handler Overlay */}
                        <div
                            className="absolute inset-0 cursor-pointer active:bg-white/10"
                            onMouseDown={() => handleLaneClick(lane)}
                        />

                        {/* Falling Notes */}
                        {data.notes.filter(n => n.lane === lane && n.time > currentTime && n.time < currentTime + 4).map((note, idx) => {
                            // Calculate position based on time difference (approaching bottom)
                            // 4 seconds visible window
                            const progress = 1 - (note.time - currentTime) / 4;
                            // 0 = top, 1 = bottom (hit line is near bottom)
                            if (progress < 0) return null;

                            return (
                                <motion.div
                                    key={idx}
                                    className="absolute w-4/5 mx-auto left-0 right-0 h-12 bg-blue-500 rounded-md flex items-center justify-center text-xs font-bold"
                                    style={{ top: `${progress * 80}%` }} // Simplified visual mapping
                                >
                                    {note.keyword}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RhythmGame;
