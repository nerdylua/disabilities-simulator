"use client"

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "./theme-switcher"
import { usePathname } from "next/navigation"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavigationMobile } from "./header-mobile"
import { motion, LayoutGroup } from "framer-motion"
import { HeaderConfig } from "@/lib/config/header"

interface HeaderProps {
  config: HeaderConfig
}

export function Header({ config }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className="m-10" />

      <motion.header
        className="fixed left-0 right-0 top-0 z-40"
      >
        <motion.div
          initial={{
            maxWidth: "100%",
            margin: "0 auto",
            borderRadius: "0",
          }}
          animate={{
            maxWidth: isScrolled ? "68rem" : "100%",
            margin: isScrolled ? "1rem auto" : "0 auto",
            borderRadius: isScrolled ? "9999px" : "0",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "bg-background/70 border backdrop-blur-3xl transition-all duration-500",
            isScrolled 
              ? "bg-background/70 mx-4 md:mx-auto shadow-lg " 
              : "shadow-sm "
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={cn(
              "flex items-center justify-between",
              isScrolled 
                ? "h-16" 
                : "h-20"
            )}>
              <Link href="/" className="group relative flex items-center gap-3">
                <Eye className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold tracking-tight">{config.brand.title}</span>
              </Link>

              <nav className="relative hidden md:block">
                <LayoutGroup>
                  <motion.ul className="flex items-center gap-1">
                    {config.navigationLinks.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                      return (
                        <motion.li key={item.href} className="relative flex items-center justify-center">
                          <Link
                            href={item.href}
                            className={cn(
                              "relative flex items-center justify-center rounded-full px-4 py-2 text-sm transition-colors duration-200",
                              isActive ? "text-white font-medium" : "text-gray-500 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400"
                            )}
                          >
                            {item.label}
                          </Link>
                          {isActive && (
                            <motion.div
                              layoutId="blob"
                              className="absolute inset-0 -z-10 rounded-full bg-sky-500"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                mass: 1,
                              }}
                            />
                          )}
                        </motion.li>
                      )
                    })}
                  </motion.ul>
                </LayoutGroup>
              </nav>

              <div className="flex items-center gap-2">
                <div className="md:hidden">
                  <NavigationMobile navigationLinks={config.navigationLinks} />
                </div>
                <ModeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
} 