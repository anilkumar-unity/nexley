/**
 * Web version: fires the animation only when the element first enters the
 * viewport using IntersectionObserver.  Starts invisible (opacity 0,
 * translated) and slides/fades in once ≥12 % of the element is visible.
 */
import React, { useEffect, useRef } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  delay?: number;
  from?: 'up' | 'down' | 'left' | 'right';
  style?: any;
}

export function AnimateOnScroll({ children, delay = 0, from = 'up', style }: Props) {
  const opacity  = useSharedValue(0);
  const ty = useSharedValue(from === 'up' ? 40 : from === 'down' ? -40 : 0);
  const tx = useSharedValue(from === 'left' ? -40 : from === 'right' ? 40 : 0);
  const hasRun = useRef(false);
  const ref = useRef<any>(null);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: ty.value }, { translateX: tx.value }],
  }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // In React Native Web, ref.current on a host component IS the DOM element.
    const node = typeof (el as any).getBoundingClientRect === 'function' ? el : null;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
          ty.value      = withDelay(delay, withTiming(0, { duration: 600 }));
          tx.value      = withDelay(delay, withTiming(0, { duration: 600 }));
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node as Element);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View ref={ref} style={[animStyle, style]}>
      {children}
    </Animated.View>
  );
}
