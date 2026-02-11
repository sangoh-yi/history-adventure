'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useGamificationStore } from '@/store/gamificationStore';
import curriculumData from '@/data/curriculum.json';
import scriptsData from '@/data/scripts.json';
import quizzesData from '@/data/quizzes.json';
import storyboardsData from '@/data/storyboards.json';
import rhythmGameData from '@/data/rhythmGameData.json';

import CartoonViewer from '@/components/CartoonViewer';
import RhythmGame from '@/components/RhythmGame';
import QuizComponent from '@/components/QuizComponent';

export default function LecturePage({ params }: { params: { id: string } }) {
    const lectureId = parseInt(params.id);
    const lecture = curriculumData.find((l) => l.id === lectureId);
    if (!lecture) return notFound(); // Should be handled by notFound page

    const script = scriptsData.find(s => s.lectureId === lectureId);
    const quiz = quizzesData.find(q => q.lectureId === lectureId); // Or by quizId
    const storyboard = storyboardsData.find(s => s.lectureId === lectureId);
    const rhythmGame = rhythmGameData.find(r => r.lectureId === lectureId);

    const { completeLecture } = useGamificationStore();
    const [activeTab, setActiveTab] = useState<'learn' | 'cartoon' | 'game' | 'quiz'>('learn');

    // Logic to handle completion could be more complex
    const handleQuizComplete = (score: number) => {
        completeLecture(lectureId, score);
        alert(`강의 학습 완료! ${score}점을 획득했습니다!`);
    };

    const handleGameComplete = (score: number) => {
        // Add game score logic
        alert(`게임 종료! 점수: ${score}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-bold">
                        ← 메인으로 돌아가기
                    </Link>
                    <span className="font-bold text-lg truncate">{lecture.title}</span>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 container mx-auto p-4 max-w-4xl">
                {/* Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'learn', label: '1. 배움터' },
                        { id: 'cartoon', label: '2. 이야기' },
                        { id: 'game', label: '3. 리듬게임' },
                        { id: 'quiz', label: '4. 확인퀴즈' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? 'bg-blue-600 text-white font-bold'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === 'learn' && (
                        <section className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
                            <div className="bg-[#2a2a2a] rounded-xl p-8 shadow-inner min-h-[300px] relative overflow-hidden border-4 border-[#8B4513]">
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/blackboard.png')]"></div>

                                {(lecture as any).artBoardSummary ? (
                                    <div className="text-white relative z-10 w-full">
                                        <h3 className="text-3xl font-bold text-center text-yellow-400 mb-8 font-serif border-b-2 border-white/10 pb-4">
                                            ★ {lecture.title} 핵심 정리 ★
                                        </h3>
                                        <div className="grid gap-4">
                                            {(lecture as any).artBoardSummary.map((point: string, idx: number) => (
                                                <div key={idx} className="flex items-start text-xl leading-relaxed text-blue-100">
                                                    <span className="mr-3 text-yellow-400 font-bold">✔</span>
                                                    <span>{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center flex flex-col items-center justify-center h-full text-gray-500">
                                        {lecture.artBoardUrl && (
                                            <>
                                                <p className="mb-2">[이미지 준비 중]</p>
                                                <img src={lecture.artBoardUrl} alt="Art Board" className="max-h-48 opacity-30" />
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="prose max-w-none">
                                <h2 className="text-2xl font-bold mb-4">큰별쌤의 강의 노트</h2>
                                {script ? (
                                    <div className="space-y-4">
                                        {script.script.map((line, idx) => (
                                            <div key={idx} className="bg-blue-50 p-4 rounded-lg flex gap-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-200 flex-shrink-0 flex items-center justify-center font-bold text-blue-800 text-xs">
                                                    {line.speaker}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{line.text}</p>
                                                    {line.action && (
                                                        <span className="text-xs text-blue-500 italic">[{line.action}]</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">아직 강의 대본이 준비되지 않았어요.</p>
                                )}
                            </div>
                        </section>
                    )}

                    {activeTab === 'cartoon' && (
                        <section>
                            {storyboard ? (
                                <CartoonViewer data={storyboard} />
                            ) : (
                                <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
                                    <p className="text-gray-500">이 강의에는 만화가 없어요.</p>
                                </div>
                            )}
                        </section>
                    )}

                    {activeTab === 'game' && (
                        <section>
                            {rhythmGame ? (
                                <RhythmGame data={rhythmGame} onComplete={handleGameComplete} />
                            ) : (
                                <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
                                    <p className="text-gray-500">이 강의에는 리듬 게임이 없어요.</p>
                                </div>
                            )}
                        </section>
                    )}

                    {activeTab === 'quiz' && (
                        <section>
                            {quiz ? (
                                <QuizComponent
                                    data={{
                                        id: quiz.id,
                                        questions: quiz.questions // Assuming simple mapping match
                                    }}
                                    onComplete={handleQuizComplete}
                                />
                            ) : (
                                <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
                                    <p className="text-gray-500">이 강의에는 퀴즈가 없어요.</p>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
