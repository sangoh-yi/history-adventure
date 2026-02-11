import { create } from 'zustand';

type Rank = 'Commoner' | 'Scholar' | 'Official' | 'King';

interface GamificationState {
    progress: number; // 0 to 100
    score: number;
    rank: Rank;
    completedLectures: number[]; // Array of lecture IDs

    // Actions
    completeLecture: (lectureId: number, scoreEarned: number) => void;
    resetProgress: () => void;
}

const calculateRank = (progress: number): Rank => {
    if (progress >= 76) return 'King';
    if (progress >= 51) return 'Official';
    if (progress >= 26) return 'Scholar';
    return 'Commoner';
};

export const useGamificationStore = create<GamificationState>((set) => ({
    progress: 0,
    score: 0,
    rank: 'Commoner',
    completedLectures: [],

    completeLecture: (lectureId, scoreEarned) => set((state) => {
        if (state.completedLectures.includes(lectureId)) {
            // Already completed, maybe just update score if higher? 
            // For now, adding score only once per lecture completion logic should be handled in component
            return state;
        }

        const newCompleted = [...state.completedLectures, lectureId];
        // Simple progress calculation: (completed / total lectures) * 100
        // Assuming 20 lectures total found in curriculum
        const totalLectures = 20;
        const newProgress = Math.min(100, Math.round((newCompleted.length / totalLectures) * 100));

        return {
            completedLectures: newCompleted,
            score: state.score + scoreEarned,
            progress: newProgress,
            rank: calculateRank(newProgress),
        };
    }),

    resetProgress: () => set({
        progress: 0,
        score: 0,
        rank: 'Commoner',
        completedLectures: [],
    }),
}));
