"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { navItems } from "@/config/navigation"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 border-b border-medical-100">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldLogo size="sm" showText={true} />
        </Link>
        <MedicalButton variant="ghost" size="icon" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </MedicalButton>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-[64px] z-50 bg-white p-4 overflow-y-auto">
          <nav className="space-y-6">
            {navItems.map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="font-medium text-lg text-medical-800">{item.title}</div>
                {item.children ? (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block py-2 text-medical-600 hover:text-medical-900",
                          pathname === child.href && "text-medical-900 font-medium",
                        )}
                        onClick={toggleMenu}
                      >
                        <div className="flex items-center gap-2">
                          <child.icon className="h-4 w-4" />
                          <span>{child.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-medical-600 hover:text-medical-900",
                      pathname === item.href && "text-medical-900 font-medium",
                    )}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
