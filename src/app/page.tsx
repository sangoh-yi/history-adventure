'use client';

import Link from 'next/link';
import { useGamificationStore } from '@/store/gamificationStore';
import curriculumData from '@/data/curriculum.json';
import ShareButton from '@/components/ShareButton';

const getRankName = (rank: string) => {
    switch (rank) {
        case 'King': return '왕';
        case 'Official': return '관료';
        case 'Scholar': return '선비';
        default: return '평민';
    }
};

export default function Home() {
    const { rank, score, progress, completedLectures, isPremium, unlockPremium } = useGamificationStore();

    return (
        <div className="container mx-auto p-4 max-w-4xl space-y-8">
            {/* Header / Dashboard */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">역사를 만들어라!</h1>
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <p className="text-xl">신분: <span className="font-bold text-yellow-300">{getRankName(rank)}</span></p>
                            <p className="text-sm opacity-90">진도율: {progress}%</p>
                            <div className="w-full bg-blue-900 h-2 rounded-full mt-1 overflow-hidden">
                                <div
                                    className="bg-yellow-400 h-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                            <div>
                                <p className="text-sm">총점</p>
                                <p className="text-4xl font-bold">{score}점</p>
                            </div>
                            <ShareButton rank={getRankName(rank)} score={score} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Banner */}
            {!isPremium && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-lg text-white flex justify-between items-center animate-pulse">
                    <div>
                        <h2 className="text-2xl font-bold">🔒 프리미엄 회원 되기</h2>
                        <p>단돈 3,000원으로 모든 역사 강의를 무제한 시청하세요!</p>
                    </div>
                    <button
                        onClick={unlockPremium}
                        className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
                    >
                        지금 구매하기
                    </button>
                </div>
            )}

            {/* Lecture List */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculumData.map((lecture) => {
                    const isCompleted = completedLectures.includes(lecture.id);
                    const isLocked = !isPremium && lecture.id >= 4; // Lock lectures 4+ if not premium

                    return (
                        <div key={lecture.id} className="relative group">
                            <Link
                                href={isLocked ? '#' : `/lecture/${lecture.id}`}
                                onClick={(e) => isLocked && e.preventDefault()}
                                className={`block p-6 rounded-xl border border-gray-200 shadow-sm transition-all bg-white relative overflow-hidden ${isLocked ? 'grayscale opacity-75 cursor-not-allowed hover:shadow-none' : 'hover:shadow-md hover:-translate-y-1'
                                    }`}
                            >
                                {isCompleted && (
                                    <div className="absolute top-2 right-2 text-green-500 font-bold bg-green-100 px-2 py-1 rounded-full text-xs z-10">
                                        완료함
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {lecture.id}강: {lecture.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">{lecture.summary}</p>
                                <div className="flex flex-wrap gap-2">
                                    {lecture.keywords.map((kw, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                            #{kw}
                                        </span>
                                    ))}
                                </div>
                            </Link>

                            {/* Lock Overlay */}
                            {isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 backdrop-blur-[1px] rounded-xl z-20 pointer-events-none">
                                    <div className="bg-white p-3 rounded-full shadow-lg">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
