"use client"

import Link from "next/link"

export default function MinimalistFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "首页", href: "#" },
    { name: "关于", href: "#" },
    { name: "服务", href: "#" },
    { name: "博客", href: "#" },
    { name: "联系", href: "#" },
    { name: "隐私政策", href: "#" },
  ]

  return (
    <footer className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="#" className="text-xl font-light text-gray-900">
              MINIMALIST
            </Link>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="text-sm text-gray-500">© {currentYear} Minimalist. 保留所有权利。</div>
        </div>
      </div>
    </footer>
  )
}
