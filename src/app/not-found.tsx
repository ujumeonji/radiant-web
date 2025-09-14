"use client";

import Container from "@/components/ui/Container";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main role="main" aria-labelledby="error-title">
      <Container>
        <section className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <header className="mb-8">
              <h1
                id="error-title"
                className="text-9xl font-bold text-gray-200 mb-4"
                aria-label="404 페이지 오류"
              >
                404
              </h1>
              <div
                className="w-24 h-1 bg-slate-800 mx-auto mb-6"
                role="presentation"
              ></div>
            </header>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                페이지를 찾을 수 없습니다
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              </p>
              <p className="text-gray-500">
                URL을 다시 확인하시거나 아래 버튼을 통해 다른 페이지로 이동해
                주세요.
              </p>
            </section>

            <nav aria-label="오류 페이지 내비게이션" className="mb-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2"
                  aria-label="홈페이지로 돌아가기"
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  홈으로 돌아가기
                </Link>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-foreground h-10 px-4 py-2 border-slate-800 text-slate-800 hover:bg-slate-50 bg-transparent flex items-center gap-2"
                  aria-label="이전 페이지로 돌아가기"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  이전 페이지로
                </button>
              </div>
            </nav>

            <aside
              className="border-t border-gray-200 pt-12"
              aria-labelledby="suggestions-title"
            >
              <h3
                id="suggestions-title"
                className="text-xl font-semibold text-gray-900 mb-6"
              >
                이런 페이지는 어떠세요?
              </h3>
              <nav
                aria-label="추천 페이지"
                className="grid sm:grid-cols-2 gap-6"
              >
                <Link
                  href="/"
                  className="group p-6 border border-gray-200 rounded-lg hover:border-slate-800 hover:shadow-md transition-all"
                  aria-label="최신 글 보기 페이지로 이동"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-slate-800">
                      최신 글 보기
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    최신 번역 글과 트렌딩 콘텐츠를 확인해보세요.
                  </p>
                </Link>

                <div
                  className="group p-6 border border-gray-200 rounded-lg hover:border-slate-800 hover:shadow-md transition-all cursor-not-allowed opacity-75"
                  role="button"
                  aria-disabled="true"
                  aria-label="검색 기능 (준비 중)"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-slate-800">
                      검색하기
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    원하는 주제의 글을 검색으로 찾아보세요. (준비 중)
                  </p>
                </div>
              </nav>
            </aside>
          </div>
        </section>
      </Container>
    </main>
  );
}
