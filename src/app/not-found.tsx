import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - 페이지를 찾을 수 없어요!</h2>
            <p className="text-xl text-gray-600 mb-8">역사 속으로 사라진 페이지인 것 같아요.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition"
            >
                홈으로 돌아가기
            </Link>
        </div>
    );
}
