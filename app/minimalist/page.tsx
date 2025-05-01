import MinimalistNavbar from "@/components/minimalist-navbar"
import MinimalistHero from "@/components/minimalist-hero"
import MinimalistPrinciples from "@/components/minimalist-principles"
import MinimalistColorPalette from "@/components/minimalist-color-palette"
import MinimalistContentCards from "@/components/minimalist-content-cards"
import MinimalistForm from "@/components/minimalist-form"
import MinimalistFooter from "@/components/minimalist-footer"

export default function MinimalistPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MinimalistNavbar />
      <MinimalistHero />
      <MinimalistPrinciples />
      <MinimalistColorPalette />
      <MinimalistContentCards />
      <MinimalistForm />
      <MinimalistFooter />
    </div>
  )
}
