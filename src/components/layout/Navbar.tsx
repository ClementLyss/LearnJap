"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/alphabets", label: "Alphabets" },
  { href: "/kanji", label: "Kanji" },
  { href: "/vocabulary", label: "Vocabulaire" },
  { href: "/games", label: "Jeux" },
  { href: "/installer", label: "📲 Installer" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-xl font-bold text-zinc-900 dark:text-white">
              <span className="text-red-600">学</span> LearnJap
            </Link>
            <div className="hidden md:flex md:gap-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <span className="hidden text-sm text-zinc-600 dark:text-zinc-400 sm:block">
                  {session.user.name || session.user.email}
                </span>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
