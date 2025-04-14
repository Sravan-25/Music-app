import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Text,
  InteractionManager,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Colors from '@/data/Colors';

const { width } = Dimensions.get('window');
const DEFAULT_PRIMARY = '#007AFF';
const DEFAULT_INACTIVE = '#666';

const navItems = [
  {
    route: '/pages/Home',
    activeIcon: require('../assets/images/home-active.png'),
    inactiveIcon: require('../assets/images/home.png'),
    label: 'Home',
  },
  {
    route: '/pages/SharedAccess',
    activeIcon: require('../assets/images/access-active.png'),
    inactiveIcon: require('../assets/images/access.png'),
    label: 'Shared Access',
  },
  {
    route: '/pages/Settings',
    activeIcon: require('../assets/images/settings-active.png'),
    inactiveIcon: require('../assets/images/settings.png'),
    label: 'Settings',
  },
];

const FloatingNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const animations = React.useRef(
    navItems.reduce((acc, item) => {
      acc[item.route] = {
        scale: new Animated.Value(1),
        opacity: new Animated.Value(1),
      };
      return acc;
    }, {} as Record<string, { scale: Animated.Value; opacity: Animated.Value }>)
  ).current;

  const handlePress = (route: string) => {
    if (pathname === route) return;

    router.push(route);

    InteractionManager.runAfterInteractions(() => {
      Animated.parallel([
        Animated.spring(animations[route].scale, {
          toValue: 1.3,
          useNativeDriver: true,
        }),
        Animated.timing(animations[route].opacity, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.parallel([
          Animated.spring(animations[route].scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(animations[route].opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={styles.navItem}
              onPress={() => handlePress(item.route)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={{
                  transform: [{ scale: animations[item.route].scale }],
                  opacity: animations[item.route].opacity,
                }}
              >
                <Image
                  source={isActive ? item.activeIcon : item.inactiveIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </Animated.View>
              <Text
                style={[
                  styles.navLabel,
                  {
                    color: isActive
                      ? Colors.PRIMARY || DEFAULT_PRIMARY
                      : DEFAULT_INACTIVE,
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: width - 40,
    borderCurve: 'continuous',
  },
  navItem: {
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default FloatingNavbar;
