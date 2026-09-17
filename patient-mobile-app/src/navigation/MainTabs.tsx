import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, fontFamily, shadow } from '../theme';
import HomeScreen from '../screens/home/HomeScreen';
import MedicationsScreen from '../screens/medications/MedicationsScreen';
import FindDoctorScreen from '../screens/doctors/FindDoctorScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ['home', 'home-outline'],
  Medications: ['medkit', 'medkit-outline'],
  Doctors: ['people', 'people-outline'],
  Profile: ['person-circle', 'person-circle-outline'],
};

const LABELS: Record<keyof MainTabParamList, string> = {
  Home: 'Home',
  Medications: 'Medications',
  Doctors: 'Doctors',
  Profile: 'Profile',
};

// A fully custom tab bar. We used to hand `tabBarStyle` (a fixed `height` +
// padding) to @react-navigation/bottom-tabs and let it position the icon +
// label itself — on web that internal sizing math squeezes the label into a
// box a few pixels tall (it gets visually clipped, showing only the very top
// sliver of each word) once the bar's height is overridden away from the
// library's native defaults. Laying out icon + label ourselves sidesteps
// that entirely: every row gets exactly the height its content needs, and
// `insets.bottom` (the iOS home-indicator / gesture-bar safe area, read from
// `viewport-fit=cover` on web) is added on top rather than baked into a
// fixed number, so the bar never sits under — or gets covered by — the
// device's own bottom chrome.
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const routeName = route.name as keyof MainTabParamList;
        const focused = state.index === index;
        const label = (options.title as string) ?? LABELS[routeName] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            style={styles.tab}
            hitSlop={6}
          >
            <Ionicons
              name={focused ? ICONS[routeName][0] : ICONS[routeName][1]}
              size={24}
              color={focused ? colors.tealDark : colors.mist}
            />
            <Text
              numberOfLines={1}
              style={[styles.label, { color: focused ? colors.tealDark : colors.mist }]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medications" component={MedicationsScreen} />
      <Tab.Screen name="Doctors" component={FindDoctorScreen} options={{ title: 'Doctors' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSoft,
    paddingTop: 8,
    // paddingBottom is set inline above (safe-area aware)
    ...shadow.card,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
    minHeight: 44,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamily.bodyMedium,
  },
});
