/**
 * Native version: uses the reanimated `entering` prop which fires when the
 * component mounts (React Native's standard approach for native scroll views).
 */
import React from 'react';
import Animated, {
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  delay?: number;
  from?: 'up' | 'down' | 'left' | 'right';
  style?: any;
}

export function AnimateOnScroll({ children, delay = 0, from = 'up', style }: Props) {
  const anim = { up: FadeInUp, down: FadeInDown, left: FadeInLeft, right: FadeInRight }[from];
  return (
    <Animated.View entering={(anim as any).delay(delay).duration(600)} style={style}>
      {children}
    </Animated.View>
  );
}
