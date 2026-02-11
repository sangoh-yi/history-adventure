'use client';

import Link from 'next/link';
import { useGamificationStore } from '@/store/gamificationStore';
import curriculumData from '@/data/curriculum.json';

const getRankName = (rank: string) => {
    switch (rank) {
        case 'King': return '왕';
        case 'Official': return '관료';
        case 'Scholar': return '선비';
        default: return '평민';
    }
};

export default function Home() {
    const { rank, score, progress, completedLectures } = useGamificationStore();

    return (
        <div className="container mx-auto p-4 max-w-4xl space-y-8">
            {/* Header / Dashboard */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-2">역사를 만들어라!</h1>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xl">신분: <span className="font-bold text-yellow-300">{getRankName(rank)}</span></p>
                        <p className="text-sm opacity-90">진도율: {progress}%</p>
                        <div className="w-full bg-blue-900 h-2 rounded-full mt-1 overflow-hidden">
                            <div
                                className="bg-yellow-400 h-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">총점</p>
                        <p className="text-4xl font-bold">{score}점</p>
                    </div>
                </div>
            </header>

            {/* Lecture List */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculumData.map((lecture) => {
                    const isCompleted = completedLectures.includes(lecture.id);

                    return (
                        <Link
                            href={`/lecture/${lecture.id}`}
                            key={lecture.id}
                            className={`block p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white relative overflow-hidden group`}
                        >
                            {isCompleted && (
                                <div className="absolute top-2 right-2 text-green-500 font-bold bg-green-100 px-2 py-1 rounded-full text-xs">
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
                    );
                })}
            </section>
        </div>
    );
}
