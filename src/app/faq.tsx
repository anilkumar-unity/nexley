import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FaqScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.center}>
        <Text style={styles.label}>FAQ'S</Text>
        <Text style={styles.heading}>Got Questions?</Text>
        <Text style={styles.sub}>Frequently asked questions coming soon.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#060D1F' },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingTop: 120 },
  center: { alignItems: 'center', gap: 12 },
  label: { color: '#4A7CFC', fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  heading: { color: '#fff', fontSize: 40, fontWeight: '800' },
  sub: { color: '#8898B5', fontSize: 16 },
});
