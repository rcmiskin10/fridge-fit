export interface PlanLimit {
  [key: string]: number
}

export interface Plan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly?: number }
  priceId?: string
  yearlyPriceId?: string
  limits: PlanLimit
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingConfig: {
  model: 'freemium' | 'free-trial' | 'paid-only'
  trialDays?: number
  defaultLimits: PlanLimit
  plans: Plan[]
} = {
  model: 'freemium',

  defaultLimits: {
    entities: 10
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Explore recipes with basic dietary filtering',
      price: { monthly: 0 },
      limits: {
        entities: 10
      },
      features: [
        '5 ingredient-based recipe lookups per day',
        'Single dietary restriction filter',
        'Basic nutritional overview (calories & macros)',
        'Save up to 10 favorite recipes',
        'Standard recipe library access'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'FridgeFit Pro',
      description: 'Unlimited recipes, smart meal planning, and waste tracking',
      price: { monthly: 6.99, yearly: 49.99 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        'Unlimited ingredient-based recipe generation',
        'Multiple simultaneous dietary restrictions',
        'Detailed nutritional breakdowns with micronutrients',
        'Weekly AI-generated meal plans',
        'Expiration tracking & food waste dashboard',
        'Smart grocery gap-fill lists',
        'Unlimited saved recipes',
        'Ad-free experience'
      ],
      highlighted: true,
      cta: 'Start 30-Day Free Trial',
    },
    {
      id: 'family',
      name: 'FridgeFit Family',
      description: 'Everything in Pro, built for the whole household',
      price: { monthly: 11.99, yearly: 89.99 },
      priceId: process.env.STRIPE_PRICE_FAMILY,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Pro',
        'Up to 6 household member profiles',
        'Individual dietary settings per member',
        'AI cooking assistant with substitution suggestions',
        'Grocery delivery integration (Instacart, Amazon Fresh)',
        'Priority access to new features & recipe collections',
        'Exportable weekly nutrition & waste reports'
      ],
      cta: 'Start Family Trial',
    }
  ],
}

const planMap = new Map<string, Plan>()
for (const plan of pricingConfig.plans) {
  planMap.set(plan.id, plan)
}

export function getPlan(tier: string): Plan {
  return planMap.get(tier) || pricingConfig.plans[0]
}

export function getPlanByPriceId(priceId: string): string | null {
  for (const plan of pricingConfig.plans) {
    if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
      return plan.id
    }
  }
  return null
}

export function getLimits(tier: string | null): PlanLimit {
  if (!tier) return pricingConfig.defaultLimits
  const plan = planMap.get(tier)
  return plan?.limits || pricingConfig.defaultLimits
}

export function checkLimit(tier: string | null, limitKey: string, currentUsage: number): boolean {
  const limits = getLimits(tier)
  const limit = limits[limitKey]
  if (limit === undefined) return false
  if (limit === -1) return true
  return currentUsage < limit
}

export function isPaidTier(tier: string | null): boolean {
  if (!tier) return false
  const plan = planMap.get(tier)
  return plan ? plan.price.monthly > 0 : false
}

export function getFreePlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.price.monthly === 0)
}

export function getPaidPlans(): Plan[] {
  return pricingConfig.plans.filter((p) => p.price.monthly > 0)
}

export function getHighlightedPlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.highlighted)
}

export function getPlanPrice(tier: string | null): number {
  if (!tier) return 0
  const plan = planMap.get(tier)
  return plan?.price.monthly || 0
}
