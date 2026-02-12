'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
    rank: string;
    score: number;
}

export default function ShareButton({ rank, score }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const text = `🏆 [별별 히스토리 어드벤처]\n\n제 신분은 "${rank}"이고, 점수는 ${score}점입니다!\n저와 함께 역사 여행을 떠나보세요!\n\n👉 접속하기: https://history-adventure.vercel.app`;

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleShare}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all shadow-md ${copied ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
        >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            {copied ? '복사됨!' : '자랑하기'}
        </button>
    );
}
