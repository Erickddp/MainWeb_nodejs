export interface NavItem {
    label: string;
    anchor: string;
}

export interface SiteConfig {
    sectionOrder: string[];
    nav: NavItem[];
    themeDefault: string;
}

export interface HeroContent {
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    intro: string;
    bullets: string[];
    idealFor: string[];
    priceLabel: string;
    ctaLabel: string;
    ctaHref: string;
}

export interface ToolItem {
    title: string;
    desc: string;
    statusLabel?: string;
    ctaLabel: string;
    ctaHref: string;
    terminalLines?: string[];
}

export interface ToolsContent {
    evoapp: ToolItem;
    evotools: ToolItem;
    evolab: ToolItem;
}

export interface TestimonialItem {
    name: string;
    role: string;
    quote: string;
    photo?: string;
    highlight?: string;
}

export interface AchievementItem {
    label: string;
    value: string;
}

export interface AboutContent {
    title: string;
    lead: string;
    paragraphs: string[];
    signatureLine: string;
    achievements: AchievementItem[];
}

export interface LinksContent {
    whatsapp: string;
    linkedin: string;
    github: string;
    portfolio: string;
}

export interface ProblemBullet {
    icon: string;
    title: string;
    desc: string;
}

export interface ProblemContent {
    title: string;
    subtitle: string;
    bullets: ProblemBullet[];
}

export interface MethodStep {
    step: string;
    title: string;
    desc: string;
}

export interface MethodContent {
    title: string;
    subtitle: string;
    steps: MethodStep[];
}

export interface CtaContent {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
}

export interface SiteContent {
    config: SiteConfig;
    hero: HeroContent;
    services: ServiceItem[];
    tools: ToolsContent;
    testimonials: TestimonialItem[];
    about: AboutContent;
    links: LinksContent;
    problem: ProblemContent;
    method: MethodContent;
    cta: CtaContent;
}
