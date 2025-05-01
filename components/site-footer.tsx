export default function SiteFooter() {
  return (
    <footer className="py-4 px-4 text-center text-[rgb(var(--dark-text-secondary))] text-xs border-t border-[rgba(var(--dark-border),0.4)] mt-0 bg-[rgb(var(--dark-bg-primary))] relative z-30">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <span>2017 - 2025, xnlbl.top</span>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-[rgb(var(--dark-text-primary))] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-[rgb(var(--dark-text-primary))] transition-colors">
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
