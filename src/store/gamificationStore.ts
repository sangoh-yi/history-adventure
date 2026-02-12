import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GamificationStore {
    exp: number;
    rank: string;
    completedLectures: number[];
    isPremium: boolean;
    score: number;
    progress: number;
    addExp: (amount: number) => void;
    completeLecture: (lectureId: number, scoreEarned: number) => void; // Fixed signature to match usage
    unlockPremium: () => void;
    resetProgress: () => void;
}

export const useGamificationStore = create<GamificationStore>()(
    persist(
        (set, get) => ({
            exp: 0,
            score: 0,
            progress: 0,
            rank: '역사 평민',
            completedLectures: [],
            isPremium: false,
            addExp: (amount) => {
                const newExp = get().exp + amount;
                let newRank = get().rank;

                if (newExp >= 1000) newRank = '역사 왕';
                else if (newExp >= 500) newRank = '역사 장군';
                else if (newExp >= 200) newRank = '역사 박사';
                else if (newExp >= 100) newRank = '역사 선비';

                set({ exp: newExp, rank: newRank });
            },
            completeLecture: (lectureId, scoreEarned) => {
                const { completedLectures, score } = get();
                if (!completedLectures.includes(lectureId)) {
                    const newCompleted = [...completedLectures, lectureId];
                    const newProgress = Math.min(100, Math.round((newCompleted.length / 20) * 100));

                    set({
                        completedLectures: newCompleted,
                        score: score + scoreEarned,
                        progress: newProgress
                    });
                    get().addExp(50);
                }
            },
            unlockPremium: () => set({ isPremium: true }),
            resetProgress: () => set({ exp: 0, score: 0, progress: 0, rank: '역사 평민', completedLectures: [], isPremium: false }),
        }),
        {
            name: 'history-adventure-storage',
        }
    )
);
