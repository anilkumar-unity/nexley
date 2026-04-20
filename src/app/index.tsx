import { AnimateOnScroll } from '@/components/animate-on-scroll';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg:          '#060D1F',
  bgCard:      '#0C1628',
  bgCardAlt:   '#0F1A32',
  bgCardInner: '#13203C',
  accent:      '#4A7CFC',
  accentDark:  '#2855C0',
  text:        '#FFFFFF',
  textSub:     '#8898B5',
  textMuted:   '#4A5A72',
  border:      'rgba(255,255,255,0.07)',
  green:       '#22C55E',
  purple:      '#8B5CF6',
  orange:      '#F97316',
  pink:        '#EC4899',
  whatsapp:    '#25D366',
};
const isWeb = Platform.OS === 'web';
const GUTTER = isWeb ? 80 : 24;
const MAX_W  = 1180;

// Ref used by the "View Our Work" button to scroll to the portfolio section
const projectsRef = React.createRef<View>();
// Ref used by the "Chat on WhatsApp" hero button to scroll to the contact section
export const contactRef = React.createRef<View>();

// ─── Shared ───────────────────────────────────────────────────────────────────
function Eyebrow({ text }: { text: string }) {
  return <Text style={s.eyebrow}>{text}</Text>;
}
function SectionHead({ text }: { text: string }) {
  return <Text style={s.sectionHead}>{text}</Text>;
}
function SectionSub({ text }: { text: string }) {
  return <Text style={s.sectionSub}>{text}</Text>;
}

// ─── Fade-In wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  from = 'up',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: 'up' | 'down' | 'left' | 'right';
  style?: any;
}) {
  const anim = { up: FadeInUp, down: FadeInDown, left: FadeInLeft, right: FadeInRight }[from];
  return (
    <Animated.View entering={(anim as any).delay(delay).duration(560)} style={style}>
      {children}
    </Animated.View>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.6, { duration: 1400 }), -1, true);
  }, []);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 2 - pulse.value,
  }));
  return (
    <View style={s.heroWrap}>
      <View style={[s.blob, { left: -120, top: -80,   backgroundColor: 'rgba(74,124,252,0.10)' }]} />
      <View style={[s.blob, { right: -80, bottom: -60, backgroundColor: 'rgba(139,92,246,0.08)' }]} />
      <View style={s.heroInner}>
        <View style={s.heroLeft}>
          <FadeIn delay={0} from="down" style={s.heroBadge}>
            <Animated.View style={[s.heroBadgeDot, pulseStyle]} />
            <Text style={s.heroBadgeText}>Digital Agency · Est. 2024</Text>
          </FadeIn>
          <FadeIn delay={120} from="down">
            <Text style={s.heroHeadline}>
              {'We Build\nDigital Products\nThat '}
              <Text style={{ color: C.accent }}>Convert.</Text>
            </Text>
          </FadeIn>
          <FadeIn delay={240} from="down">
            <Text style={s.heroSubtext}>
              From stunning websites to powerful mobile apps and e-commerce stores — we craft digital
              experiences that grow your business.
            </Text>
          </FadeIn>
          <FadeIn delay={360} from="down" style={s.heroCtas}>
            <Pressable
              style={({ pressed }) => [s.ctaPrimary, pressed && { opacity: 0.85 }]}
              onPress={() => (contactRef.current as any)?.scrollIntoView?.({ behavior: 'smooth' })}
            >
              <Text style={s.ctaPrimaryText}>💬  Chat on WhatsApp</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [s.ctaSecondary, pressed && { opacity: 0.85 }]}
              onPress={() => (projectsRef.current as any)?.scrollIntoView?.({ behavior: 'smooth' })}
            >
              <Text style={s.ctaSecondaryText}>View Our Work  →</Text>
            </Pressable>
          </FadeIn>
          <FadeIn delay={480} from="down" style={s.stats}>
            {[
              { val: '50+', label: 'Projects Delivered' },
              { val: '30+', label: 'Happy Clients' },
              { val: '3+',  label: 'Years Experience' },
            ].map((st, i) => (
              <View key={i} style={[s.stat, i > 0 && s.statBorder]}>
                <Text style={s.statVal}>{st.val}</Text>
                <Text style={s.statLabel}>{st.label}</Text>
              </View>
            ))}
          </FadeIn>
        </View>
        {isWeb && (
          <FadeIn delay={300} from="right" style={s.heroRight}>
            <HeroMockup />
          </FadeIn>
        )}
      </View>
    </View>
  );
}

function HeroMockup() {
  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(withTiming(-8, { duration: 2000 }), -1, true);
  }, []);
  const bobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));
  return (
    <View style={s.mockupOuter}>
      {/* Browser chrome */}
      <View style={s.browserBar}>
        <View style={[s.browserDot, { backgroundColor: '#FF5F57' }]} />
        <View style={[s.browserDot, { backgroundColor: '#FFBD2E' }]} />
        <View style={[s.browserDot, { backgroundColor: '#28C840' }]} />
        <View style={s.browserUrl}>
          <Text style={s.browserUrlText}>https://urbannest.com</Text>
        </View>
      </View>

      <View style={s.mockPage}>
        {/* Navbar */}
        <View style={s.mkNav}>
          <View style={s.mkNavLogo}>
            <View style={[s.mkNavDot, { backgroundColor: C.accent }]} />
            <Text style={s.mkNavLogoText}>UrbanNest</Text>
          </View>
          <View style={s.mkNavLinks}>
            {['Listings', 'Agents', 'Blog'].map((lnk) => (
              <Text key={lnk} style={s.mkNavLinkText}>{lnk}</Text>
            ))}
            <View style={s.mkNavCta}>
              <Text style={s.mkNavCtaText}>Get Started</Text>
            </View>
          </View>
        </View>

        {/* Hero band */}
        <View style={s.mkHeroBand}>
          <View style={s.mkHeroLeft}>
            <View style={s.mkTag}>
              <Text style={s.mkTagText}>#1 Realty in the City</Text>
            </View>
            <Text style={s.mkHeadline}>{'Find Your\nDream Home.'}</Text>
            <Text style={s.mkSub}>500+ premium listings across downtown, suburbs & waterfront.</Text>
            <View style={s.mkBtns}>
              <View style={s.mkBtnPrimary}><Text style={s.mkBtnPrimaryText}>View Listings</Text></View>
              <View style={s.mkBtnSecondary}><Text style={s.mkBtnSecondaryText}>Contact Agent</Text></View>
            </View>
          </View>
          <View style={s.mkHeroImg}>
            <View style={s.mkImgBg} />
            <View style={s.mkImgOverlay} />
            <View style={s.mkImgTag}>
              <Text style={s.mkImgTagText}>📍 Downtown</Text>
            </View>
          </View>
        </View>

        {/* Stats row */}
        <View style={s.mkStats}>
          {[
            { val: '500+', lbl: 'Listings' },
            { val: '98%',  lbl: 'Satisfaction' },
            { val: '12yr', lbl: 'Experience' },
          ].map((st, i) => (
            <View key={i} style={[s.mkStat, i > 0 && { borderLeftWidth: 1, borderLeftColor: C.border }]}>
              <Text style={s.mkStatVal}>{st.val}</Text>
              <Text style={s.mkStatLbl}>{st.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Property cards */}
        <View style={s.mkCards}>
          {[
            { price: '$485K', name: 'Maple Ridge Villa', beds: '4 bd · 3 ba', col: C.accent },
            { price: '$320K', name: 'Sunset Condo #12',  beds: '2 bd · 2 ba', col: C.purple },
            { price: '$750K', name: 'Lakefront Estate',  beds: '5 bd · 4 ba', col: C.green },
          ].map((p, i) => (
            <View key={i} style={s.mkCard}>
              <View style={[s.mkCardImg, { backgroundColor: p.col + '22', borderBottomColor: p.col + '55' }]}>
                <Text style={[s.mkCardImgIcon, { color: p.col }]}>🏠</Text>
              </View>
              <View style={s.mkCardBody}>
                <Text style={s.mkCardPrice}>{p.price}</Text>
                <Text style={s.mkCardName}>{p.name}</Text>
                <Text style={s.mkCardBeds}>{p.beds}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Floating badge */}
      <Animated.View style={[s.mockBadge, bobStyle]}>
        <Text style={s.mockBadgeIcon}>✓</Text>
        <View>
          <Text style={s.mockBadgeTitle}>Project Delivered</Text>
          <Text style={s.mockBadgeSub}>On time · On budget</Text>
        </View>
      </Animated.View>
    </View>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: '🌐', color: C.accent, title: 'Website Development',
    desc: 'Fast, modern, SEO-optimised websites built with React / Next.js. Landing pages to full corporate sites.',
    features: ['Responsive design', 'SEO optimised', 'CMS integration', 'Analytics setup'],
  },
  {
    icon: '📱', color: C.purple, title: 'App Development',
    desc: 'Cross-platform iOS & Android apps using React Native & Expo — one codebase, native performance.',
    features: ['iOS & Android', 'Offline support', 'Push notifications', 'App Store publishing'],
  },
  {
    icon: '🛒', color: C.green, title: 'E-commerce Websites',
    desc: 'Full-featured online stores with product management, secure payments, and conversion-focused design.',
    features: ['Stripe / PayPal', 'Inventory management', 'Discount & coupons', 'Order tracking'],
  },
];

function ServicesSection() {
  return (
    <View style={s.section}>
      <AnimateOnScroll from="up" style={s.sectionHeader}>
        <Eyebrow text="WHAT WE BUILD" />
        <SectionHead text="Our Services" />
        <SectionSub text="Everything you need to establish and grow your digital presence — under one roof." />
      </AnimateOnScroll>
      <View style={s.servicesGrid}>
        {SERVICES.map((svc, i) => (
          <AnimateOnScroll key={i} delay={i * 150} from="up" style={[s.serviceCard, { borderTopColor: svc.color }]}>
            <View style={[s.serviceIconBox, { backgroundColor: svc.color + '18' }]}>
              <Text style={s.serviceIcon}>{svc.icon}</Text>
            </View>
            <Text style={s.serviceTitle}>{svc.title}</Text>
            <Text style={s.serviceDesc}>{svc.desc}</Text>
            <View style={s.serviceDivider} />
            {svc.features.map((f, fi) => (
              <View key={fi} style={s.serviceFeatureRow}>
                <Text style={[s.serviceFeatureCheck, { color: svc.color }]}>✓</Text>
                <Text style={s.serviceFeatureText}>{f}</Text>
              </View>
            ))}
            <Pressable
              style={({ pressed }) => [s.serviceBtn, { borderColor: svc.color + '55' }, pressed && { opacity: 0.8 }]}
              onPress={() =>
                Linking.openURL(
                  'https://wa.me/+17802580666?text=Hi%2C+I+want+to+know+more+about+' +
                    encodeURIComponent(svc.title),
                )
              }
            >
              <Text style={[s.serviceBtnText, { color: svc.color }]}>Get a Free Quote  →</Text>
            </Pressable>
          </AnimateOnScroll>
        ))}
      </View>
    </View>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    tag: 'Security Company', color: C.accent,
    title: 'GuardPro — Local Security Services',
    desc: 'Professional website for a residential & commercial security firm with service listings, quote request form, 24/7 contact widget, and a client portal login.',
    tech: ['React', 'Next.js', 'Sanity CMS', 'Vercel'],
    bars: [C.accent, C.purple, C.green],
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=320&fit=crop&auto=format',
  },
  {
    tag: 'Grocery Store', color: C.green,
    title: 'FreshMart — Online Grocery Shop',
    desc: 'Mobile app for a local grocery chain with product catalogue, cart, same-day delivery scheduling, loyalty points system, and WhatsApp order notifications.',
    tech: ['React Native', 'Expo', 'Stripe', 'Firebase'],
    bars: [C.green, C.accent, C.orange],
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=320&fit=crop&auto=format',
  },
  {
    tag: 'Restaurant', color: C.orange,
    title: 'La Bella — Restaurant & Reservations',
    desc: 'Elegant website for an Italian restaurant featuring an online menu, table reservation system, photo gallery, Google Maps embed, and Instagram feed integration.',
    tech: ['React', 'Tailwind', 'Supabase', 'Vercel'],
    bars: [C.orange, C.pink, C.accent],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=320&fit=crop&auto=format',
  },
];

function ProjectsSection() {
  return (
    <View ref={projectsRef} style={s.projectsBg}>
      <AnimateOnScroll from="up" style={s.sectionHeader}>
        <Eyebrow text="PORTFOLIO" />
        <SectionHead text="Our Work" />
        <SectionSub text="A look at the kind of work we deliver. Every project is custom-built to the client's goals." />
      </AnimateOnScroll>
      <View style={s.projectsGrid}>
        {PROJECTS.map((p, i) => (
          <AnimateOnScroll key={i} delay={i * 200} from="up" style={s.projectCard}>
            <View style={s.projectScreen}>
              <Image source={{ uri: p.imageUrl }} style={s.projectImage} resizeMode="cover" />
              <View style={[s.projectImageOverlay, { borderBottomColor: p.color }]} />
            </View>
            <View style={s.projectInfo}>
              <View style={[s.projectTag, { backgroundColor: p.color + '1A' }]}>
                <Text style={[s.projectTagText, { color: p.color }]}>{p.tag}</Text>
              </View>
              <Text style={s.projectTitle}>{p.title}</Text>
              <Text style={s.projectDesc}>{p.desc}</Text>
              <View style={s.projectTechs}>
                {p.tech.map((t, ti) => (
                  <View key={ti} style={s.projectTechPill}>
                    <Text style={s.projectTechText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </AnimateOnScroll>
        ))}
      </View>
    </View>
  );
}

// ─── WHY US ───────────────────────────────────────────────────────────────────
const WHY = [
  { icon: '⚡', title: 'Fast Delivery',        desc: 'Most projects go live within 2–4 weeks. We respect your timeline.' },
  { icon: '💎', title: 'Premium Quality',      desc: 'Clean code, pixel-perfect design, and thorough testing on every build.' },
  { icon: '📞', title: 'Dedicated Support',    desc: '30 days of free post-launch support included with every project.' },
  { icon: '💰', title: 'Transparent Pricing',  desc: 'Fixed-price quotes. No hidden fees, no surprises at the end.' },
];

function WhyUsSection() {
  return (
    <View style={s.section}>
      <AnimateOnScroll from="up" style={s.sectionHeader}>
        <Eyebrow text="WHY CHOOSE US" />
        <SectionHead text="The Nexley Advantage" />
      </AnimateOnScroll>
      <View style={s.whyGrid}>
        {WHY.map((w, i) => (
          <AnimateOnScroll key={i} delay={i * 120} from="up" style={s.whyCard}>
            <Text style={s.whyIcon}>{w.icon}</Text>
            <Text style={s.whyTitle}>{w.title}</Text>
            <Text style={s.whyDesc}>{w.desc}</Text>
          </AnimateOnScroll>
        ))}
      </View>
    </View>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function ContactSection() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [sent,    setSent]    = useState(false);

  function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const text =
      `Hi, I'm ${name} (${email}).\n\nService: ${service || 'Not specified'}\n\n${message}`;
    Linking.openURL('https://wa.me/+17802580666?text=' + encodeURIComponent(text));
    setSent(true);
  }

  return (
    <View ref={contactRef} style={s.section}>
      <View style={s.contactGrid}>
        {/* Left info panel */}
        <AnimateOnScroll from="left" delay={100} style={s.contactLeft}>
          <Eyebrow text="GET IN TOUCH" />
          <Text style={s.contactHeading}>{"Let's Build\nSomething Great."}</Text>
          <Text style={s.contactSubtext}>
            Tell us about your project and we'll get back to you within 24 hours with a free quote.
          </Text>
          <Pressable
            style={({ pressed }) => [s.waBtn, pressed && { opacity: 0.88 }]}
            onPress={() =>
              Linking.openURL('https://wa.me/+17802580666?text=Hi%2C+I+want+to+discuss+a+project')
            }
          >
            <Text style={s.waBtnText}>💬  Message us on WhatsApp</Text>
          </Pressable>
          <View style={s.contactInfoRows}>
            {[
              { icon: '📧', label: 'Email',    val: 'nexlydigitalsolution@gmail.com' },
              { icon: '📍', label: 'Location', val: 'Remote · Worldwide' },
              { icon: '⏰', label: 'Response', val: 'Within 24 hours' },
            ].map((row, i) => (
              <View key={i} style={s.contactInfoRow}>
                <Text style={s.contactInfoIcon}>{row.icon}</Text>
                <View>
                  <Text style={s.contactInfoLabel}>{row.label}</Text>
                  <Text style={s.contactInfoVal}>{row.val}</Text>
                </View>
              </View>
            ))}
          </View>
        </AnimateOnScroll>

        {/* Right form */}
        <AnimateOnScroll from="right" delay={200} style={s.contactRight}>
          {sent ? (
            <View style={s.sentBox}>
              <Text style={s.sentIcon}>🎉</Text>
              <Text style={s.sentTitle}>WhatsApp Opened!</Text>
              <Text style={s.sentSub}>
                Your message is ready to send. We'll reply within 24 hours.
              </Text>
            </View>
          ) : (
            <View style={s.formCard}>
              <Text style={s.formTitle}>Send us a Message</Text>
              <View style={s.formRow}>
                <View style={s.formGroup}>
                  <Text style={s.formLabel}>Your Name *</Text>
                  <TextInput
                    style={s.input}
                    placeholder="John Smith"
                    placeholderTextColor={C.textMuted}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <View style={s.formGroup}>
                  <Text style={s.formLabel}>Email Address *</Text>
                  <TextInput
                    style={s.input}
                    placeholder="john@company.com"
                    placeholderTextColor={C.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View style={s.formGroup}>
                <Text style={s.formLabel}>Service Needed</Text>
                <View style={s.selectRow}>
                  {['Website', 'Mobile App', 'E-commerce', 'Other'].map((opt) => (
                    <Pressable
                      key={opt}
                      style={[s.selectPill, service === opt && s.selectPillActive]}
                      onPress={() => setService(opt)}
                    >
                      <Text style={[s.selectPillText, service === opt && s.selectPillTextActive]}>
                        {opt}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <View style={s.formGroup}>
                <Text style={s.formLabel}>Tell us about your project *</Text>
                <TextInput
                  style={[s.input, s.textarea]}
                  placeholder="Describe your project, goals, timeline..."
                  placeholderTextColor={C.textMuted}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={message}
                  onChangeText={setMessage}
                />
              </View>
              <Pressable
                style={({ pressed }) => [s.submitBtn, pressed && { opacity: 0.85 }]}
                onPress={handleSend}
              >
                <Text style={s.submitBtnText}>Send via WhatsApp  💬</Text>
              </Pressable>
              <Text style={s.formNote}>
                Clicking "Send" will open WhatsApp with your message pre-filled.
              </Text>
            </View>
          )}
        </AnimateOnScroll>
      </View>
    </View>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <View style={s.footer}>
      <View style={s.footerTop}>
        <View style={s.footerBrand}>
          <View style={s.footerDot} />
          <Text style={s.footerBrandName}>nexley.</Text>
        </View>
        <Text style={s.footerTagline}>Building digital products that grow your business.</Text>
      </View>
      <View style={s.footerBottom}>
        <Text style={s.footerCopy}>© 2025 Nexley Digital. All rights reserved.</Text>
        <Pressable
          style={({ pressed }) => [s.footerWa, pressed && { opacity: 0.8 }]}
          onPress={() => Linking.openURL('https://wa.me/+17802580666')}
        >
          <Text style={s.footerWaText}>💬  WhatsApp Us</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.bg }}
      contentContainerStyle={{ paddingTop: isWeb ? 72 : insets.top }}
    >
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </ScrollView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Shared
  eyebrow: { color: C.accent, fontSize: 11, fontWeight: '700', letterSpacing: 3 },
  sectionHead: { color: C.text, fontSize: isWeb ? 42 : 30, fontWeight: '800', textAlign: 'center', lineHeight: isWeb ? 52 : 38 },
  sectionSub: { color: C.textSub, fontSize: 15, lineHeight: 26, textAlign: 'center', maxWidth: 560 },
  section: {
    paddingHorizontal: GUTTER,
    paddingVertical: isWeb ? 100 : 60,
    maxWidth: MAX_W,
    alignSelf: 'center',
    width: '100%',
  },
  sectionHeader: { alignItems: 'center', gap: 14, marginBottom: 56 },

  // Hero
  heroWrap: {
    paddingHorizontal: GUTTER,
    paddingTop: isWeb ? 90 : 52,
    paddingBottom: isWeb ? 100 : 60,
    overflow: 'hidden',
  },
  blob: { position: 'absolute', width: 600, height: 600, borderRadius: 300 },
  heroInner: {
    maxWidth: MAX_W,
    alignSelf: 'center',
    width: '100%',
    flexDirection: isWeb ? 'row' : 'column',
    alignItems: 'center',
    gap: isWeb ? 64 : 48,
  },
  heroLeft: { flex: 1, gap: 22 },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.accent + '18',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: C.accent + '35',
  },
  heroBadgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.accent },
  heroBadgeText: { color: C.accent, fontSize: 12, fontWeight: '600' },
  heroHeadline: { color: C.text, fontSize: isWeb ? 62 : 40, fontWeight: '800', lineHeight: isWeb ? 74 : 50, letterSpacing: -1 },
  heroSubtext: { color: C.textSub, fontSize: 17, lineHeight: 28, maxWidth: 440 },
  heroCtas: { flexDirection: isWeb ? 'row' : 'column', gap: 12, marginTop: 8 },
  ctaPrimary: { backgroundColor: C.whatsapp, paddingVertical: 15, paddingHorizontal: 26, borderRadius: 11, alignSelf: isWeb ? 'flex-start' : 'stretch' },
  ctaPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700', textAlign: 'center' },
  ctaSecondary: { borderWidth: 1, borderColor: C.border, paddingVertical: 15, paddingHorizontal: 26, borderRadius: 11, alignSelf: isWeb ? 'flex-start' : 'stretch' },
  ctaSecondaryText: { color: C.text, fontSize: 15, fontWeight: '600', textAlign: 'center' },
  stats: { flexDirection: 'row', marginTop: 8, alignSelf: 'flex-start' },
  stat: { paddingHorizontal: isWeb ? 24 : 16, paddingVertical: 8, gap: 2, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderColor: C.border },
  statVal: { color: C.text, fontSize: 26, fontWeight: '800' },
  statLabel: { color: C.textSub, fontSize: 12 },
  heroRight: { flex: isWeb ? 0.9 : undefined, width: isWeb ? undefined : '100%' },

  // Browser mockup
  mockupOuter: { backgroundColor: '#0C1628', borderRadius: 16, borderWidth: 1, borderColor: C.border, overflow: 'visible' },
  browserBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#0F1A32',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderColor: C.border,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  browserDot: { width: 11, height: 11, borderRadius: 6 },
  browserUrl: { flex: 1, backgroundColor: '#13203C', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 5, marginLeft: 8 },
  browserUrlText: { color: C.textMuted, fontSize: 11 },
  mockPage: { padding: 16, gap: 12 },
  mockNav: { height: 10, backgroundColor: '#13203C', borderRadius: 5, width: '60%' },
  mockHero: { backgroundColor: '#13203C', borderRadius: 10, padding: 16, gap: 8, height: isWeb ? 100 : 80, justifyContent: 'center' },
  mockHeroText1: { height: 10, width: '80%', backgroundColor: C.textMuted, borderRadius: 5 },
  mockHeroText2: { height: 7, width: '50%', backgroundColor: C.textMuted + '66', borderRadius: 5 },
  mockHeroBtn: { height: 22, width: '30%', backgroundColor: C.accent + '88', borderRadius: 5, marginTop: 4 },
  mockCards: { flexDirection: 'row', gap: 8 },
  mockCard: { flex: 1, height: 60, backgroundColor: '#13203C', borderRadius: 8, borderTopWidth: 3 },
  mockBadge: {
    position: 'absolute',
    bottom: -18,
    right: isWeb ? -18 : 8,
    backgroundColor: '#0F1A32',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: C.accent + '40',
  },
  mockBadgeIcon: { fontSize: 18, color: C.green },
  mockBadgeTitle: { color: C.text, fontSize: 13, fontWeight: '700' },
  mockBadgeSub: { color: C.textSub, fontSize: 11 },

  // Mockup — realistic client site
  mkNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  mkNavLogo: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  mkNavDot: { width: 8, height: 8, borderRadius: 4 },
  mkNavLogoText: { color: C.text, fontSize: 9, fontWeight: '800' },
  mkNavLinks: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mkNavLinkText: { color: C.textSub, fontSize: 7 },
  mkNavCta: { backgroundColor: C.accent, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  mkNavCtaText: { color: '#fff', fontSize: 7, fontWeight: '700' },
  mkHeroBand: { flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'center' },
  mkHeroLeft: { flex: 1, gap: 5 },
  mkTag: { backgroundColor: C.accent + '22', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2, alignSelf: 'flex-start' },
  mkTagText: { color: C.accent, fontSize: 6, fontWeight: '700' },
  mkHeadline: { color: C.text, fontSize: isWeb ? 14 : 11, fontWeight: '800', lineHeight: isWeb ? 18 : 14 },
  mkSub: { color: C.textSub, fontSize: 7, lineHeight: 10 },
  mkBtns: { flexDirection: 'row', gap: 5, marginTop: 2 },
  mkBtnPrimary: { backgroundColor: C.accent, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  mkBtnPrimaryText: { color: '#fff', fontSize: 7, fontWeight: '700' },
  mkBtnSecondary: { borderWidth: 1, borderColor: C.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  mkBtnSecondaryText: { color: C.textSub, fontSize: 7 },
  mkHeroImg: { width: isWeb ? 150 : 100, borderRadius: 10, overflow: 'hidden' },
  mkImgBg: { width: '100%', height: isWeb ? 110 : 88, backgroundColor: '#1A2A46', borderRadius: 10 },
  mkImgOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: C.accent + '18', borderRadius: 10 },
  mkImgTag: { position: 'absolute', bottom: 6, left: 6, backgroundColor: 'rgba(6,13,31,0.80)', borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2 },
  mkImgTagText: { color: C.text, fontSize: 7, fontWeight: '600' },
  mkStats: { flexDirection: 'row', backgroundColor: '#13203C', borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
  mkStat: { flex: 1, alignItems: 'center', paddingVertical: 7 },
  mkStatVal: { color: C.text, fontSize: 11, fontWeight: '800' },
  mkStatLbl: { color: C.textSub, fontSize: 6 },
  mkCards: { flexDirection: 'row', gap: 6 },
  mkCard: { flex: 1, backgroundColor: '#13203C', borderRadius: 8, overflow: 'hidden' },
  mkCardImg: { height: 36, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1 },
  mkCardImgIcon: { fontSize: 14 },
  mkCardBody: { padding: 6, gap: 2 },
  mkCardPrice: { color: C.accent, fontSize: 9, fontWeight: '800' },
  mkCardName: { color: C.text, fontSize: 7, fontWeight: '600' },
  mkCardBeds: { color: C.textSub, fontSize: 6 },

  // Services
  servicesGrid: { flexDirection: isWeb ? 'row' : 'column', gap: 24, alignItems: 'stretch' },
  serviceCard: { flex: 1, backgroundColor: '#0C1628', borderRadius: 18, padding: 28, borderWidth: 1, borderColor: C.border, borderTopWidth: 3, gap: 10 },
  serviceIconBox: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  serviceIcon: { fontSize: 24 },
  serviceTitle: { color: C.text, fontSize: 20, fontWeight: '800' },
  serviceDesc: { color: C.textSub, fontSize: 14, lineHeight: 22 },
  serviceDivider: { height: 1, backgroundColor: C.border, marginVertical: 6 },
  serviceFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  serviceFeatureCheck: { fontSize: 13, fontWeight: '700' },
  serviceFeatureText: { color: C.textSub, fontSize: 13 },
  serviceBtn: { marginTop: 10, borderWidth: 1, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  serviceBtnText: { fontSize: 13, fontWeight: '700' },

  // Projects section wrapper (full-width bg)
  projectsBg: {
    backgroundColor: '#0F1A32',
    paddingHorizontal: GUTTER,
    paddingVertical: isWeb ? 100 : 60,
    width: '100%',
    alignSelf: 'stretch',
  },
  projectsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: isWeb ? 'wrap' : undefined,
    gap: 28,
    maxWidth: MAX_W,
    alignSelf: 'center',
    width: '100%',
  },
  projectCard: {
    backgroundColor: '#0C1628',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border,
    flexBasis: isWeb ? '30%' : undefined,
    flexGrow: isWeb ? 1 : undefined,
    minWidth: isWeb ? 300 : undefined,
    width: isWeb ? undefined : '100%',
  },
  projectScreen: {
    height: 200,
    borderBottomWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  projectImage: { width: '100%', height: '100%' },
  projectImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6,13,31,0.35)',
    borderBottomWidth: 3,
  },
  projectInfo: { padding: 22, gap: 10 },
  projectTag: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  projectTagText: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  projectTitle: { color: C.text, fontSize: 17, fontWeight: '800', lineHeight: 24 },
  projectDesc: { color: C.textSub, fontSize: 13, lineHeight: 21 },
  projectTechs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  projectTechPill: { backgroundColor: '#13203C', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  projectTechText: { color: C.textSub, fontSize: 11, fontWeight: '600' },

  // Why Us
  whyGrid: { flexDirection: isWeb ? 'row' : 'column', flexWrap: 'wrap', gap: 24 },
  whyCard: {
    backgroundColor: '#0C1628',
    borderRadius: 16,
    padding: 28,
    gap: 12,
    borderWidth: 1,
    borderColor: C.border,
    flexBasis: isWeb ? '45%' : undefined,
    flexGrow: isWeb ? 1 : undefined,
    width: isWeb ? undefined : '100%',
  },
  whyIcon: { fontSize: 28 },
  whyTitle: { color: C.text, fontSize: 18, fontWeight: '800' },
  whyDesc: { color: C.textSub, fontSize: 14, lineHeight: 22 },

  // Contact
  contactGrid: { flexDirection: isWeb ? 'row' : 'column', gap: isWeb ? 80 : 48, alignItems: 'flex-start' },
  contactLeft: { flex: 1, gap: 20 },
  contactHeading: { color: C.text, fontSize: isWeb ? 46 : 32, fontWeight: '800', lineHeight: isWeb ? 56 : 42, letterSpacing: -0.5 },
  contactSubtext: { color: C.textSub, fontSize: 15, lineHeight: 26, maxWidth: 380 },
  waBtn: { backgroundColor: C.whatsapp, paddingVertical: 15, paddingHorizontal: 24, borderRadius: 11, alignSelf: 'flex-start' },
  waBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  contactInfoRows: { gap: 18, marginTop: 8 },
  contactInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  contactInfoIcon: { fontSize: 20, width: 36, textAlign: 'center' },
  contactInfoLabel: { color: C.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  contactInfoVal: { color: C.text, fontSize: 14, fontWeight: '600', marginTop: 1 },
  contactRight: { flex: 1.2, width: isWeb ? undefined : '100%' },

  // Form
  formCard: { backgroundColor: '#0C1628', borderRadius: 18, padding: 32, borderWidth: 1, borderColor: C.border, gap: 18 },
  formTitle: { color: C.text, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  formRow: { flexDirection: isWeb ? 'row' : 'column', gap: 16 },
  formGroup: { flex: 1, gap: 7 },
  formLabel: { color: C.textSub, fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#13203C',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: C.text,
    fontSize: 14,
  },
  textarea: { minHeight: 120, paddingTop: 13 },
  selectRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  selectPill: { backgroundColor: '#13203C', borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  selectPillActive: { backgroundColor: C.accent + '22', borderColor: C.accent },
  selectPillText: { color: C.textSub, fontSize: 13, fontWeight: '500' },
  selectPillTextActive: { color: C.accent, fontWeight: '700' },
  submitBtn: { backgroundColor: C.whatsapp, paddingVertical: 15, borderRadius: 11, alignItems: 'center', marginTop: 6 },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  formNote: { color: C.textMuted, fontSize: 11, textAlign: 'center' },

  // Sent state
  sentBox: { backgroundColor: '#0C1628', borderRadius: 18, padding: 48, alignItems: 'center', gap: 16, borderWidth: 1, borderColor: C.green + '44' },
  sentIcon: { fontSize: 48 },
  sentTitle: { color: C.text, fontSize: 22, fontWeight: '800' },
  sentSub: { color: C.textSub, fontSize: 14, textAlign: 'center', lineHeight: 22 },

  // Footer
  footer: { borderTopWidth: 1, borderColor: C.border, paddingHorizontal: GUTTER, paddingVertical: 48, gap: 32 },
  footerTop: { flexDirection: isWeb ? 'row' : 'column', alignItems: isWeb ? 'center' : 'flex-start', gap: isWeb ? 0 : 20 },
  footerBrand: { flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: isWeb ? 24 : 0 },
  footerDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.accent },
  footerBrandName: { color: C.text, fontSize: 20, fontWeight: '800' },
  footerTagline: { color: C.textSub, fontSize: 13, flex: isWeb ? 1 : undefined },
  footerLinks: { flexDirection: 'row', gap: isWeb ? 24 : 16, flexWrap: 'wrap' },
  footerLink: { color: C.textSub, fontSize: 13, fontWeight: '500' },
  footerBottom: { flexDirection: isWeb ? 'row' : 'column', justifyContent: 'space-between', alignItems: isWeb ? 'center' : 'flex-start', gap: 12, paddingTop: 24, borderTopWidth: 1, borderColor: C.border },
  footerCopy: { color: C.textMuted, fontSize: 12 },
  footerWa: { backgroundColor: C.whatsapp + '22', borderWidth: 1, borderColor: C.whatsapp + '55', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  footerWaText: { color: C.whatsapp, fontSize: 13, fontWeight: '700' },
});
