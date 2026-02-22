'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black/90 text-white py-4 border-b border-purple-900/50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold neon-purple">
          TrapRoyalties Pro
        </Link>
        <nav className="space-x-6">
          <Link href="#features" className="hover:text-purple-400 transition">
            Features
          </Link>
          <Link href="/free-audit" className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full text-sm font-semibold transition">
            Start Free Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
