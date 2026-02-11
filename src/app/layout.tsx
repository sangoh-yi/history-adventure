import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '별별 히스토리 어드벤처',
    description: '큰별쌤과 함께하는 초등 한국사 대모험!',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={clsx(inter.className, "min-h-screen bg-gray-50")}>
                <main className="flex flex-col min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
