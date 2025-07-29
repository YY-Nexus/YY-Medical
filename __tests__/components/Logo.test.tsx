import { render, screen } from "@testing-library/react"
import { Logo } from "@/components/brand/logo"

describe("Logo Component", () => {
  it("renders logo with default props", () => {
    render(<Logo />)

    const logoImage = screen.getByAltText("言语云³ YanYu Cloud")
    expect(logoImage).toBeInTheDocument()

    const chineseText = screen.getByText("言语云³")
    expect(chineseText).toBeInTheDocument()

    const englishText = screen.getByText("YanYu Cloud")
    expect(englishText).toBeInTheDocument()
  })

  it("renders logo without text when showText is false", () => {
    render(<Logo showText={false} />)

    const logoImage = screen.getByAltText("言语云³ YanYu Cloud")
    expect(logoImage).toBeInTheDocument()

    const chineseText = screen.queryByText("言语云³")
    expect(chineseText).not.toBeInTheDocument()
  })

  it("applies correct size classes", () => {
    const { container } = render(<Logo size="lg" />)

    const logoContainer = container.querySelector(".h-16.w-16")
    expect(logoContainer).toBeInTheDocument()
  })

  it("renders as link when href is provided", () => {
    render(<Logo href="/dashboard" />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/dashboard")
  })

  it("applies animation classes when animated is true", () => {
    const { container } = render(<Logo animated={true} />)

    const animatedElement = container.querySelector(".hover\\:scale-105")
    expect(animatedElement).toBeInTheDocument()
  })
})
