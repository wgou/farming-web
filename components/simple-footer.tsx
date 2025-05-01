import Link from "next/link"

export default function SimpleFooter() {
  return (
    <div className="py-4 px-4 text-center text-[rgb(var(--dark-text-secondary))] text-xs border-t border-[rgba(var(--dark-border),0.4)] bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-center items-center gap-4">
          <span>2017 - 2025, xnlbl.top</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[rgb(var(--dark-text-primary))] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[rgb(var(--dark-text-primary))] transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
