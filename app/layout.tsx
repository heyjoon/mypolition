import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Public Office Watch",
  description: "선출직 공직자의 공개 발언과 공식 행동을 근거 기반으로 추적하는 시민용 기록 대시보드"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-civic-panel text-civic-ink antialiased">
        <header className="border-b border-civic-line bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link href="/" className="text-lg font-bold tracking-[0] text-civic-blue">
              Public Office Watch
            </Link>
            <nav className="flex gap-4 text-sm font-medium text-civic-muted">
              <Link className="focus-ring rounded px-1 py-1 hover:text-civic-ink" href="/members">
                국회의원
              </Link>
              <Link className="focus-ring rounded px-1 py-1 hover:text-civic-ink" href="/assembly">
                실제 국회
              </Link>
              <Link className="focus-ring rounded px-1 py-1 hover:text-civic-ink" href="/compare">
                비교
              </Link>
              <Link className="focus-ring rounded px-1 py-1 hover:text-civic-ink" href="/issues">
                의제
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
      </body>
    </html>
  );
}
