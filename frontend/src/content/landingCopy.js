import {
  Mail, Calendar, MessageSquare, Video, Users, Mic, FileText,
  TrendingDown, TrendingUp, Target, Clock, Shield, Star,
  Inbox, Activity, Eye, BarChart3, GitBranch, Zap
} from 'lucide-react';

/* ─── Floating Badges (reused for sphere + scroll-flow) ─── */
export const floatingBadges = [
  { label: 'Tone shift', icon: TrendingDown, color: 'text-amber-400' },
  { label: 'Exec absent', icon: Users, color: 'text-rose-400' },
  { label: 'Reply delay', icon: Clock, color: 'text-orange-400' },
  { label: 'Engagement up', icon: TrendingUp, color: 'text-emerald-400' },
  { label: 'Meeting skipped', icon: Calendar, color: 'text-purple-400' },
  { label: 'Formality shift', icon: FileText, color: 'text-sky-400' },
  { label: 'Sentiment drop', icon: TrendingDown, color: 'text-red-400' },
  { label: 'Response decay', icon: Mail, color: 'text-yellow-400' },
  { label: 'Expansion signal', icon: Zap, color: 'text-green-400' },
  { label: 'Re-engagement', icon: Star, color: 'text-cyan-400' },
  { label: 'Commitment gap', icon: Target, color: 'text-pink-400' },
  { label: 'Health score', icon: Activity, color: 'text-blue-400' },
];

export const convergenceHandoffCopy = Object.freeze({
  prefix: 'Intelligence that',
  emphasis: 'compounds',
});

/* ─── Integration Tools ─── */
export const INTEGRATION_TOOLS = [
  { name: 'Gmail', icon: Mail, color: '#EA4335' },
  { name: 'Outlook', icon: Mail, color: '#0078D4' },
  { name: 'Google Calendar', icon: Calendar, color: '#4285F4' },
  { name: 'Outlook Calendar', icon: Calendar, color: '#0078D4' },
  { name: 'Fathom', icon: Video, color: '#7C3AED' },
  { name: 'Fireflies', icon: Mic, color: '#F97316' },
  { name: 'Teams', icon: MessageSquare, color: '#6264A7', comingSoon: true },
  { name: 'Slack', icon: MessageSquare, color: '#4A154B', comingSoon: true },
];

/* ─── Landing Page Copy ─── */
export const LANDING_COPY = {
  nav: {
    links: ['Features', 'How It Works', 'Pricing', 'FAQ'],
    cta: 'Get Early Access',
    signIn: 'Sign in',
  },

  hero: {
    badge: 'Post-Sales Relationship Intelligence',
    headlineLead: 'You Read Every Email. Can You See Every',
    headlinePrimary: 'Pattern',
    headlineScrollTarget: 'Signal',
    subheadline: 'insig8 reads the patterns building across your client portfolio. Automatically. Across every email, meeting, and calendar event.',
    cta: 'Get Early Access',
    ctaSub: 'Free for 14 days',
    trustLine: 'No CRM required · No configuration · Up and running in 20 min',
    signalCard: {
      company: 'Meridian Technologies',
      healthScore: 47,
      healthScoreStart: 68,
      trend: 'down',
      signals: [
        { type: 'tone_shift_detected', label: 'Tone shift detected in last 3 emails', severity: 'amber' },
        { type: 'executive_disengaged', label: 'Exec sponsor absent from last 2 calls', severity: 'rose' },
        { type: 'meeting_cadence_drop', label: 'Meeting cadence dropped 40% this month', severity: 'amber' },
      ],
      badge: '3 signals detected',
    },
  },

  integrations: {
    eyebrow: 'Built from real conversations with CS teams',
    headline: 'Connects to what you already use',
    body: 'insig8 was built after 60+ conversations with CS leads, founders doing their own CS, and delivery managers across B2B SaaS and professional services.',
  },

  problem: {
    eyebrow: 'The Problem',
    headline: "You've been here before.",
    subheadline: "Client relationships don't fail in a single email. They fail in patterns. And patterns take time to see.",
    cards: [
      {
        icon: '⚠',
        color: 'text-amber-400',
        title: 'The account that seemed fine.',
        body: 'Replies arriving. Box ticked. But emails getting shorter. Tone slightly more formal. The executive who used to join calls had quietly stopped. Each signal explainable. Together, undeniable.',
        tags: ['tone_shift_detected', 'executive_disengaged', 'meeting_cadence_drop'],
      },
      {
        icon: '⚡',
        color: 'text-rose-400',
        title: "The feeling you couldn't act on.",
        body: "You felt it. The emails were slightly different. But the feeling was too soft to act on. The window closed quietly.",
        tags: ['response_length_decay', 'formality_shift', 'engagement_drop'],
      },
      {
        icon: '↑',
        color: 'text-emerald-400',
        title: "The upsell moment you didn't see.",
        body: 'More questions. Faster replies. The executive rejoining calls. Every signal of a relationship ready to expand. You were looking elsewhere.',
        tags: ['engagement_increasing', 'exec_re-engagement', 'expansion_signal'],
      },
    ],
  },

  reframe: {
    pullQuote: "Relationships don't fail in a single email. They fail in patterns. And patterns need to be seen across your whole portfolio at once.",
    closer: "insig8 is the pattern recognition layer. Not a dashboard. Not a reminder. The thing that holds your whole portfolio in view.",
    closerHighlight: 'pattern recognition layer',
  },

  howItWorks: {
    eyebrow: 'How It Works',
    headline: 'Set up in 20 minutes. Insights before end of day.',
    steps: [
      {
        num: '01',
        icon: Inbox,
        title: 'Connect what you already use',
        body: 'Link Gmail or Outlook, your calendar, and your AI notetaker. No CRM. No manual entry. 20 minutes.',
        gradient: 'from-blue-500/20 to-cyan-500/10',
        border: 'border-blue-500/20',
        iconColor: 'text-brand-primary',
      },
      {
        num: '02',
        icon: Activity,
        title: "insig8 reads the patterns you can't",
        body: "insig8 builds a live picture of sentiment, engagement, and health for every account. Simultaneously. Without being asked.",
        gradient: 'from-purple-500/20 to-violet-500/10',
        border: 'border-purple-500/20',
        iconColor: 'text-brand-secondary',
      },
      {
        num: '03',
        icon: Eye,
        title: 'You see what matters, when it matters',
        body: 'One view. Which accounts need attention. Which are ready to expand. Which commitments are overdue. You decide what to do.',
        gradient: 'from-teal-500/20 to-emerald-500/10',
        border: 'border-teal-500/20',
        iconColor: 'text-brand-tertiary',
      },
    ],
  },

  outcomes: {
    eyebrow: "What You'll Know",
    headline: "What you'll know that you don't know now.",
    cards: [
      {
        icon: TrendingDown,
        color: 'text-amber-400',
        title: 'Know when a relationship is cooling',
        body: 'Slower replies. Shorter emails. Rescheduled meetings not rescheduled back. insig8 shows you the trajectory.',
        tags: ['sentiment_trajectory', 'response_decay'],
      },
      {
        icon: TrendingUp,
        color: 'text-emerald-400',
        title: 'Catch the right moment to expand',
        body: 'Faster replies, more questions, senior stakeholders back on calls. insig8 shows you which accounts are ready.',
        tags: ['expansion_signal', 'exec_re-engagement'],
      },
      {
        icon: Shield,
        color: 'text-sky-400',
        title: 'Never lose context when someone leaves',
        body: 'Full relationship history preserved. New hire onboarding takes hours, not months.',
        tags: ['context_preserved', 'handoff_ready'],
      },
      {
        icon: Target,
        color: 'text-amber-400',
        title: 'Track every commitment',
        body: "Pulled from your meeting notes. Flagged when overdue. The things you promised that quietly slipped.",
        tags: ['commitment_extracted', 'fulfillment_tracked'],
      },
      {
        icon: BarChart3,
        color: 'text-sky-400',
        title: 'Health scores from real signals',
        body: 'Not a manual RAG status. Built from tone, response patterns, engagement depth. Automatic.',
        tags: ['health_score', 'signal_based'],
        featured: true,
      },
      {
        icon: Star,
        color: 'text-emerald-400',
        title: 'Capture success stories',
        body: "A client says something great — insig8 captures it before it disappears into a sent folder.",
        tags: ['success_captured', 'value_documented'],
      },
    ],
  },

  stats: [
    { id: 'weeks', value: '3-6', unit: 'weeks', desc: 'Average lead time insig8 surfaces churn risk before a renewal decision is made' },
    { id: 'minutes', value: '18', unit: 'min', desc: 'Average time from account connection to first portfolio insight' },
    { id: 'signals', value: '40+', unit: '', desc: 'Relationship signals tracked per account, automatically, without manual input' },
    { id: 'entry', value: '0', unit: '', desc: 'Manual data entry required to get started. Connect and go.' },
  ],

  founderNote: {
    eyebrow: 'From the Founders',
    headline: 'The problem we kept seeing.',
    body: '60 seconds. No slides. Here\'s why we\'re building insig8.',
  },

  cta: {
    headline: 'Your portfolio is already telling a story.',
    headlineAccent: 'Start reading it.',
    body: 'Connect your inbox. See your first client health insights today.',
    buttonText: 'Get Early Access',
    buttonSub: "It's free",
    microcopy: "Joins the inbox and calendar you already use. Cancel any time.",
  },

  pricing: {
    eyebrow: 'Pricing',
    headline: 'Start seeing what you\'ve been missing.',
    plans: [
      {
        name: 'Starter',
        price: 'Free',
        period: '14-day trial',
        description: 'Get started and see your first signals.',
        features: ['Up to 5 accounts', 'Gmail or Outlook', 'Basic health scores', 'Signal alerts'],
        cta: 'Start Free Trial',
        highlighted: false,
      },
      {
        name: 'Growth',
        price: '$49',
        period: '/user/mo',
        description: 'Full portfolio intelligence for growing teams.',
        features: ['Unlimited accounts', 'All integrations', 'Advanced analytics', 'Commitment tracking', 'Team dashboards', 'Priority support'],
        cta: 'Get Early Access',
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For teams that need scale and security.',
        features: ['Everything in Growth', 'SSO & SAML', 'Custom integrations', 'Dedicated CSM', 'SLA guarantee', 'Data residency options'],
        cta: 'Contact Sales',
        highlighted: false,
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    headline: 'Common questions.',
    items: [
      {
        q: 'What data does insig8 access?',
        a: 'insig8 connects to your email (Gmail or Outlook), calendar, and AI meeting notes (Fathom, Fireflies). We analyze communication patterns — not content. We never store email bodies.',
      },
      {
        q: 'How long does setup take?',
        a: 'About 20 minutes. Connect your accounts, and insig8 begins building relationship insights immediately. Most teams see their first actionable signals within the first day.',
      },
      {
        q: 'Do I need a CRM?',
        a: 'No. insig8 works independently. It reads your communication channels directly. If you do use a CRM, insig8 enriches it — but it\'s not required.',
      },
      {
        q: 'What makes this different from a CRM health score?',
        a: 'CRM health scores are manually updated (or based on activity logs). insig8 scores are built from live communication signals — tone, response patterns, stakeholder engagement — automatically.',
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. We use bank-level encryption, SOC 2 compliance, and never store raw email content. Your data stays yours.',
      },
    ],
  },

  footer: {
    tagline: 'The post-sales intelligence layer.',
    bottomLine: 'Built for the CS team doing it properly, without the stack.',
    columns: {
      product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
      company: ['About', 'Blog', 'Contact'],
      legal: ['Privacy Policy', 'Terms of Service', 'Security'],
    },
  },
};
