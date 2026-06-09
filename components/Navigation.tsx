"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const links = [
    { href: "/", label: "홈" },
    { href: "/blog", label: "블로그" },
    { href: "/categories", label: "카테고리" },
  ];

  return (
    <nav className="flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors ${
            isActive(link.href)
              ? "text-blue-600"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
