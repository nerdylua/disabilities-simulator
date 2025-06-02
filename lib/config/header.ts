export interface HeaderConfig {
  brand: {
    title: string
    icon: string
  }
  navigationLinks: {
    label: string
    href: string
  }[]
}

export const headerConfig: HeaderConfig = {
  brand: {
    title: "DisabilityLens",
    icon: "/icon.svg" // We'll create this or use a lucide icon
  },
  navigationLinks: [
    { label: "Home", href: "/" },
    { label: "Visual", href: "/visual" },
    { label: "Hearing", href: "/hearing" },
    { label: "Motor", href: "/motor" },
    { label: "Cognitive", href: "/cognitive" },
    { label: "Guidelines", href: "/guidelines" },
    { label: "Tools", href: "/tools" },
    { label: "Resources", href: "/resources" },
  ]
} 