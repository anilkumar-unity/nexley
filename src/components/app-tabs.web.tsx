import { useRouter } from 'expo-router';
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { contactRef } from '@/app/index';

// ── Brand colors (fixed dark, no theme switching for the marketing navbar)
const NAV_BG      = '#0C1628';
const NAV_BORDER  = 'rgba(255,255,255,0.07)';
const NAV_TEXT    = '#8898B5';
const NAV_ACTIVE  = '#FFFFFF';
const NAV_ACCENT  = '#4A7CFC';

export default function AppTabs() {
  const router = useRouter();
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <NavBar
          contactSlot={
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => {
                if (contactRef.current) {
                  (contactRef.current as any).scrollIntoView({ behavior: 'smooth' });
                } else {
                  router.push('/' as any);
                }
              }}
            >
              <Text style={styles.navLink}>Contact</Text>
            </Pressable>
          }
        >
          <TabTrigger name="home" href="/" asChild>
            <NavLink label="Services" />
          </TabTrigger>
          <TabTrigger name="pricing" href="/pricing" asChild>
            <NavLink label="Pricing" />
          </TabTrigger>
        </NavBar>
      </TabList>
    </Tabs>
  );
}

export function NavLink({ children, label, isFocused, ...props }: TabTriggerSlotProps & { label?: string }) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <Text style={[styles.navLink, isFocused && styles.navLinkActive]}>
        {label ?? children}
      </Text>
    </Pressable>
  );
}

export function NavBar(props: TabListProps & { contactSlot?: React.ReactNode }) {
  return (
    <Animated.View entering={FadeInDown.delay(0).duration(500)} style={styles.navbarOuter}>
      <View style={styles.navbarInner}>
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.brandDot} />
          <Text style={styles.brandName}>nexley.</Text>
        </View>

        {/* Nav links */}
        <View style={styles.navLinks}>
          {props.children}
          {props.contactSlot}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  navbarOuter: {
    position: 'absolute',
    width: '100%',
    top: 0,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    zIndex: 100,
    alignItems: 'center',
  },
  navbarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAV_BG,
    borderWidth: 1,
    borderColor: NAV_BORDER,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: Spacing.four,
    maxWidth: MaxContentWidth + 200,
    width: '100%',
    gap: Spacing.two,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 'auto',
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: NAV_ACCENT,
  },
  brandName: {
    color: NAV_ACTIVE,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginRight: Spacing.three,
  },
  navLink: {
    color: NAV_TEXT,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  navLinkActive: {
    color: NAV_ACTIVE,
  },
  pressed: {
    opacity: 0.7,
  },
});
