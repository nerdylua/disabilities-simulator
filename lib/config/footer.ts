export interface FooterConfig {
  brand: {
    title: string
    logoSrc?: string
    description: string
  }
  sections: {
    title: string
    links: {
      label: string
      href: string
      icon?: string
    }[]
  }[]
  socialLinks?: {
    label: string
    href: string
    icon: string
  }[]
  copyright: string
}

export const footerConfig: FooterConfig = {
  brand: {
    title: "DisabilityLens",
    description: "Creating a more inclusive digital world, one experience at a time."
  },
  sections: [],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/nerdylua/disabilities-simulator", icon: "Github" },
    { label: "Twitter", href: "https://x.com/nerdylua", icon: "Twitter" },
    { label: "Email", href: "mailto:nihaalsp7@gmail.com", icon: "Mail" },
  ],
  copyright: `© ${new Date().getFullYear()} DisabilityLens. Built with accessibility in mind.`
} 