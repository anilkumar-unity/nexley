import { AnimateOnScroll } from '@/components/animate-on-scroll';
import React, { useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const C = {
  bg:          '#060D1F',
  bgCard:      '#0C1628',
  bgCardAlt:   '#0F1A32',
  bgCardInner: '#13203C',
  accent:      '#4A7CFC',
  text:        '#FFFFFF',
  textSub:     '#8898B5',
  textMuted:   '#4A5A72',
  border:      'rgba(255,255,255,0.07)',
  green:       '#22C55E',
  purple:      '#8B5CF6',
  orange:      '#F97316',
  whatsapp:    '#25D366',
};

const isWeb = Platform.OS === 'web';
const GUTTER = isWeb ? 80 : 24;
const MAX_W  = 1100;

// ─── Data ──────────────────────────────────────────────────────────────────────

type BillingCycle = 'monthly' | 'yearly' | 'once';

const WEBSITE_PLANS = [
  {
    name: 'Starter',
    badge: null,
    color: C.accent,
    monthly: 49,
    yearly:  39,
    once:    null,
    desc: 'Perfect for freelancers & personal brands getting online.',
    features: [
      '1-page landing site',
      'Mobile responsive',
      'Contact form',
      'Basic SEO setup',
      '1 revision round',
      '3 months hosting included',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Business',
    badge: 'Most Popular',
    color: C.accent,
    monthly: 129,
    yearly:  99,
    once:    null,
    desc: 'Ideal for small businesses that need a full web presence.',
    features: [
      'Up to 8 pages',
      'Custom design',
      'CMS (edit content yourself)',
      'SEO optimised',
      'Google Analytics',
      '3 revision rounds',
      '6 months support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'E-commerce',
    badge: null,
    color: C.green,
    monthly: 249,
    yearly:  199,
    once:    null,
    desc: 'Full online store with payments, inventory & orders.',
    features: [
      'Unlimited products',
      'Stripe & PayPal integration',
      'Order management dashboard',
      'Discount & coupon engine',
      'Mobile-first checkout',
      '12 months support',
    ],
    cta: 'Get Started',
  },
];

const APP_PLANS = [
  {
    name: 'MVP App',
    badge: null,
    color: C.purple,
    monthly: null,
    yearly:  null,
    once:    1499,
    desc: 'Launch fast with a focused, production-ready mobile app.',
    features: [
      'iOS & Android (React Native)',
      'Up to 5 screens',
      'Firebase backend',
      'Push notifications',
      'App Store submission',
      '30 days post-launch support',
    ],
    cta: 'Request a Quote',
  },
  {
    name: 'Growth App',
    badge: 'Best Value',
    color: C.purple,
    monthly: null,
    yearly:  null,
    once:    3499,
    desc: 'A fully featured app ready to scale with your business.',
    features: [
      'iOS & Android',
      'Unlimited screens',
      'Custom API / backend',
      'Auth (social login)',
      'In-app purchases',
      'Analytics integration',
      '90 days post-launch support',
    ],
    cta: 'Request a Quote',
  },
  {
    name: 'Enterprise',
    badge: null,
    color: C.orange,
    monthly: null,
    yearly:  null,
    once:    0, // custom
    desc: 'Bespoke solution for large-scale or complex requirements.',
    features: [
      'Everything in Growth App',
      'Dedicated project manager',
      'Custom integrations & APIs',
      'White-label option',
      'SLA agreement',
      'Ongoing retainer available',
      'Priority 24/7 support',
    ],
    cta: 'Talk to Us',
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Eyebrow({ text }: { text: string }) {
  return <Text style={s.eyebrow}>{text}</Text>;
}

function PricingCard({
  plan,
  cycle,
  highlight,
  delay = 0,
}: {
  plan: (typeof WEBSITE_PLANS)[0] | (typeof APP_PLANS)[0];
  cycle: BillingCycle;
  highlight?: boolean;
  delay?: number;
}) {
  const isCustom = plan.once === 0;
  const price =
    plan.once !== null
      ? plan.once === 0
        ? null
        : plan.once
      : cycle === 'yearly'
      ? plan.yearly
      : plan.monthly;

  function handleCta() {
    const msg = `Hi, I'm interested in the ${plan.name} plan. Can you give me more details?`;
    Linking.openURL('https://wa.me/+1234567890?text=' + encodeURIComponent(msg));
  }

  return (
    <AnimateOnScroll delay={delay} from="up" style={[s.card, highlight && s.cardHighlight, { borderTopColor: plan.color }]}>
      {plan.badge && (
        <View style={[s.badge, { backgroundColor: plan.color + '22', borderColor: plan.color + '55' }]}>
          <Text style={[s.badgeText, { color: plan.color }]}>{plan.badge}</Text>
        </View>
      )}

      <Text style={s.planName}>{plan.name}</Text>
      <Text style={s.planDesc}>{plan.desc}</Text>

      <View style={s.priceRow}>
        {isCustom ? (
          <Text style={s.priceCustom}>Custom</Text>
        ) : (
          <>
            <Text style={s.priceCurrency}>$</Text>
            <Text style={s.priceAmt}>{price}</Text>
            {plan.once === null && (
              <Text style={s.pricePer}>/{cycle === 'yearly' ? 'mo' : 'mo'}</Text>
            )}
            {plan.once !== null && plan.once > 0 && (
              <Text style={s.pricePer}> one-time</Text>
            )}
          </>
        )}
      </View>

      {cycle === 'yearly' && plan.monthly !== null && (
        <Text style={s.savingsBadge}>
          Save ${((plan.monthly! - plan.yearly!) * 12).toFixed(0)}/yr
        </Text>
      )}

      <View style={s.divider} />

      {plan.features.map((f, i) => (
        <View key={i} style={s.featureRow}>
          <Text style={[s.featureCheck, { color: plan.color }]}>✓</Text>
          <Text style={s.featureText}>{f}</Text>
        </View>
      ))}

      <Pressable
        style={({ pressed }) => [
          s.cta,
          highlight ? s.ctaAccent : s.ctaOutline,
          { borderColor: plan.color + '66' },
          pressed && { opacity: 0.85 },
        ]}
        onPress={handleCta}
      >
        <Text style={[s.ctaText, highlight && { color: '#fff' }]}>{plan.cta}</Text>
      </Pressable>
    </AnimateOnScroll>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingScreen() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');

  return (
    <ScrollView style={s.root} contentContainerStyle={s.root2}>
      {/* Header */}
      <View style={s.hero}>
        <View style={[s.blob, { left: -100, top: -60, backgroundColor: 'rgba(74,124,252,0.09)' }]} />
        <View style={[s.blob, { right: -80, bottom: -40, backgroundColor: 'rgba(139,92,246,0.07)' }]} />
        <AnimateOnScroll from="down" delay={0} style={{ alignItems: 'center', gap: 16 }}>
          <Eyebrow text="PRICING" />
          <Text style={s.heading}>Simple, Transparent Pricing</Text>
          <Text style={s.sub}>
            No hidden fees. No surprises. Pick the plan that fits your goals — or{' '}
            <Text
              style={{ color: C.accent }}
              onPress={() =>
                Linking.openURL('https://wa.me/+1234567890?text=Hi%2C+I+want+a+custom+quote')
              }
            >
              contact us
            </Text>{' '}
            for a custom quote.
          </Text>
        </AnimateOnScroll>
        <View style={s.toggle}>
          {(['monthly', 'yearly'] as BillingCycle[]).map((c) => (
            <Pressable
              key={c}
              style={[s.toggleBtn, cycle === c && s.toggleBtnActive]}
              onPress={() => setCycle(c)}
            >
              <Text style={[s.toggleBtnText, cycle === c && s.toggleBtnTextActive]}>
                {c === 'monthly' ? 'Monthly' : 'Yearly  🏷️ -20%'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Website / Subscription plans */}
      <View style={s.section}>
        <Text style={s.sectionLabel}>🌐  Website Plans · Subscription</Text>
        <View style={s.grid}>
          {WEBSITE_PLANS.map((plan, i) => (
            <PricingCard key={i} plan={plan} cycle={cycle} highlight={plan.badge === 'Most Popular'} delay={i * 150} />
          ))}
        </View>
      </View>

      {/* App / One-time plans */}
      <View style={[s.section, s.sectionAlt]}>
        <Text style={s.sectionLabel}>📱  App Development · One-Time</Text>
        <View style={s.grid}>
          {APP_PLANS.map((plan, i) => (
            <PricingCard key={i} plan={plan} cycle="once" highlight={plan.badge === 'Best Value'} delay={i * 150} />
          ))}
        </View>
      </View>

      {/* FAQ teaser / CTA */}
      <View style={s.ctaBanner}>
        <Text style={s.ctaBannerTitle}>Not sure which plan is right for you?</Text>
        <Text style={s.ctaBannerSub}>
          Chat with us — we'll help you pick the best option for your budget and goals.
        </Text>
        <Pressable
          style={({ pressed }) => [s.ctaBannerBtn, pressed && { opacity: 0.85 }]}
          onPress={() =>
            Linking.openURL('https://wa.me/+1234567890?text=Hi%2C+I+need+help+choosing+a+plan')
          }
        >
          <Text style={s.ctaBannerBtnText}>💬  Chat on WhatsApp</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root:  { flex: 1, backgroundColor: C.bg },
  root2: { paddingTop: isWeb ? 88 : 0, paddingBottom: 60 },

  // Hero header
  hero: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: GUTTER,
    paddingVertical: isWeb ? 80 : 56,
    overflow: 'hidden',
  },
  blob: { position: 'absolute', width: 500, height: 500, borderRadius: 250 },
  eyebrow: { color: C.accent, fontSize: 11, fontWeight: '700', letterSpacing: 3 },
  heading: { color: C.text, fontSize: isWeb ? 46 : 32, fontWeight: '800', textAlign: 'center', lineHeight: isWeb ? 56 : 42 },
  sub: { color: C.textSub, fontSize: 15, lineHeight: 26, textAlign: 'center', maxWidth: 520 },

  // Billing toggle
  toggle: {
    flexDirection: 'row',
    backgroundColor: C.bgCardInner,
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
    borderWidth: 1,
    borderColor: C.border,
  },
  toggleBtn: { paddingHorizontal: 20, paddingVertical: 9, borderRadius: 10 },
  toggleBtnActive: { backgroundColor: C.accent },
  toggleBtnText: { color: C.textSub, fontSize: 13, fontWeight: '600' },
  toggleBtnTextActive: { color: '#fff', fontWeight: '700' },

  // Sections
  section: {
    paddingHorizontal: GUTTER,
    paddingVertical: isWeb ? 64 : 48,
    maxWidth: MAX_W,
    alignSelf: 'center',
    width: '100%',
  },
  sectionAlt: {
    backgroundColor: C.bgCardAlt,
    maxWidth: '100%',
    paddingHorizontal: GUTTER,
  },
  sectionLabel: {
    color: C.textSub,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 28,
  },

  // Grid
  grid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 22,
    alignItems: 'stretch',
    maxWidth: MAX_W,
    alignSelf: 'center',
    width: '100%',
  },

  // Card
  card: {
    flex: 1,
    backgroundColor: C.bgCard,
    borderRadius: 18,
    padding: 26,
    borderWidth: 1,
    borderColor: C.border,
    borderTopWidth: 3,
    gap: 9,
  },
  cardHighlight: {
    borderColor: C.accent + '77',
    borderWidth: 1.5,
    borderTopWidth: 3,
  },

  // Badge
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },

  // Plan meta
  planName: { color: C.text, fontSize: 20, fontWeight: '800' },
  planDesc: { color: C.textSub, fontSize: 13, lineHeight: 20, marginBottom: 4 },

  // Price
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 4 },
  priceCurrency: { color: C.textSub, fontSize: 18, fontWeight: '700', paddingBottom: 5 },
  priceAmt: { color: C.text, fontSize: 46, fontWeight: '800', lineHeight: 52 },
  pricePer: { color: C.textSub, fontSize: 14, paddingBottom: 6 },
  priceCustom: { color: C.text, fontSize: 38, fontWeight: '800' },
  savingsBadge: { color: C.green, fontSize: 12, fontWeight: '700', marginTop: -4 },

  // Features
  divider: { height: 1, backgroundColor: C.border, marginVertical: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureCheck: { fontSize: 12, fontWeight: '700', width: 16 },
  featureText: { color: C.textSub, fontSize: 13, flex: 1 },

  // CTA button
  cta: {
    marginTop: 14,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  ctaAccent: { backgroundColor: C.accent, borderColor: C.accent },
  ctaOutline: { backgroundColor: 'transparent' },
  ctaText: { color: C.textSub, fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },

  // Bottom CTA banner
  ctaBanner: {
    marginHorizontal: GUTTER,
    marginTop: isWeb ? 64 : 40,
    backgroundColor: C.bgCard,
    borderRadius: 20,
    padding: isWeb ? 48 : 32,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: C.accent + '33',
    maxWidth: MAX_W,
    alignSelf: 'center',
    width: isWeb ? undefined : 'auto',
  },
  ctaBannerTitle: { color: C.text, fontSize: isWeb ? 26 : 22, fontWeight: '800', textAlign: 'center' },
  ctaBannerSub: { color: C.textSub, fontSize: 14, lineHeight: 22, textAlign: 'center', maxWidth: 440 },
  ctaBannerBtn: { backgroundColor: C.whatsapp, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 11, marginTop: 6 },
  ctaBannerBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
