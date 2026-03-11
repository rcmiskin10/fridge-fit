import { Refrigerator, Shield, BarChart, Zap, ShoppingCart, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'FridgeFit',
  tagline: 'Turn your fridge into a personalized meal plan',
  description: 'Generate personalized recipes from your fridge ingredients, filtered by dietary restrictions with full nutritional breakdowns.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'FridgeFit',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'FAQ', href: '/#faq' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Recipes', href: '/dashboard/entities' },
    { title: 'Meal Plans', href: '/dashboard/meal-plans' },
    { title: 'My Pantry', href: '/dashboard/pantry' }
  ],

  hero: {
    badge: 'Stop wasting food. Start cooking smarter.',
    headline: 'Personalized Recipes from',
    headlineHighlight: 'What\'s Already in Your Fridge',
    subheadline: 'Tell FridgeFit what ingredients you have and your dietary restrictions — keto, vegan, gluten-free, or any combination — and get instant, delicious recipe suggestions with detailed nutritional breakdowns. Reduce food waste, save money, and never wonder "what\'s for dinner" again.',
    primaryCta: { text: 'Get Started Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Loved by 12,000+ home cooks', rating: '4.8/5' },
  },

  features: [
    {
      icon: Refrigerator,
      title: 'Fridge-First Recipe Engine',
      description: 'Input your available ingredients and instantly get recipes that use what you already have — no more wasted food or unnecessary grocery runs.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Shield,
      title: 'Multi-Diet Filtering',
      description: 'Filter by keto, vegan, gluten-free, dairy-free, nut-free, and more — even combine multiple restrictions simultaneously for safe, accurate results.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: BarChart,
      title: 'Detailed Nutritional Breakdowns',
      description: 'Every recipe includes calories, macros, and key nutrients so you can stay on track with your health goals without a separate tracking app.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'AI-Powered Suggestions',
      description: 'Our AI learns your taste preferences and dietary needs to surface smarter, more personalized recipe recommendations over time.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: ShoppingCart,
      title: 'Smart Grocery Gap-Fill',
      description: 'See which 1-2 missing ingredients would unlock dozens of new recipes — buy less, cook more, and maximize what you already own.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Leaf,
      title: 'Food Waste Dashboard',
      description: 'Track your food waste reduction, see estimated money saved, and get nudges to use ingredients before they expire.',
      gradient: 'from-green-500 to-emerald-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'OpenAI', color: 'bg-gray-800 text-white' },
    { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Recipe Library', href: '/recipes' },
        { title: 'Changelog', href: '/changelog' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' },
        { title: 'Careers', href: '/careers' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Cookie Policy', href: '/cookies' }
      ],
    }
  ],

  footerCopyright: '2026 FridgeFit. All rights reserved.',

  social: {
    twitter: 'https://twitter.com/fridgefit',
    discord: 'https://discord.gg/fridgefit'
  },
}
