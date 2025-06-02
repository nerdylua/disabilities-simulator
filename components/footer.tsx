import { cn } from "@/lib/utils"
import Link from 'next/link'
import { Eye, Github, Twitter, Ear, Hand, Brain, Info, Lightbulb, Mail, BookOpen, CheckCircle, FileText } from "lucide-react"
import { FooterConfig } from "@/lib/config/footer"

interface FooterProps {
    className?: string
    config: FooterConfig
}

// Icon mapping for the icons we use
const iconMap = {
    Eye,
    Github, 
    Twitter,
    Ear,
    Hand,
    Brain,
    Info,
    Lightbulb,
    Mail,
    BookOpen,
    CheckCircle,
    FileText,
} as const

// Helper to get icon component from string name
const IconComponent = ({ name }: { name: string }) => {
    const LucideIcon = iconMap[name as keyof typeof iconMap]
    if (!LucideIcon) return null
    return <LucideIcon size={16} className="mr-2 flex-shrink-0" />
}

export function Footer({ className, config }: FooterProps) {
    return (
        <footer className={cn("w-full border-t border-border bg-background", className)}>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-4">
                    {/* Brand section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-3">
                            <Eye className="h-8 w-8 text-primary" />
                            <span className="text-lg font-semibold">{config.brand.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-lg">
                            {config.brand.description}
                        </p>
                        {/* Social Links Section */} 
                        {config.socialLinks && config.socialLinks.length > 0 && (
                            <div className="flex justify-center space-x-4 pt-3">
                                {config.socialLinks.map((link) => (
                                    <Link 
                                        key={link.label} 
                                        href={link.href} 
                                        className="text-muted-foreground hover:text-foreground transition-colors" 
                                        aria-label={link.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IconComponent name={link.icon} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 border-t border-border/40 pt-4">
                    <p className="text-center text-sm text-muted-foreground">
                        {config.copyright}
                    </p>
                </div>
            </div>
        </footer>
    )
} 