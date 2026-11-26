/**
 * Reproducer: on Android, the `underlineColorAndroid` color filter of a
 * TextInput also applies to its `boxShadow`. The default value is
 * `transparent`, so the shadow disappears whenever the filter is applied
 * after the shadow drawables were created.
 *
 * @format
 */

import { useState } from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const UNDERLINE_COLORS = [
  'transparent',
  'rgba(255, 255, 255, 0)',
  'red',
] as const;

function App() {
  const [underlineColor, setUnderlineColor] =
    useState<(typeof UNDERLINE_COLORS)[number]>('transparent');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>View (expected look)</Text>
          <View style={styles.field} />

          <Text style={styles.title}>
            TextInput, underlineColorAndroid="{underlineColor}"
          </Text>
          <TextInput
            style={styles.field}
            underlineColorAndroid={underlineColor}
            placeholder="Type here"
          />

          {UNDERLINE_COLORS.map(color => (
            <Button
              key={color}
              title={`Set underlineColorAndroid="${color}"`}
              onPress={() => setUnderlineColor(color)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    marginTop: 16,
    fontSize: 14,
    color: '#333',
  },
  field: {
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.4)',
  },
});

export default App;
