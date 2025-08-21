import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StatusBar, setStatusBarBackgroundColor } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.8;

interface AnimatedSideMenuProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const menuItems = [
  { id: 'activity', title: 'Активність', icon: 'trending-up-outline', badge: null },
  { id: 'likes', title: 'Вподобання', icon: 'heart-outline', badge: 3 },
  { id: 'friends', title: 'Друзі', icon: 'people-outline', badge: null },
  { id: 'events', title: 'Події', icon: 'calendar-outline', badge: null },
  { id: 'networks', title: 'Мережі', icon: 'git-network-outline', badge: null },
  { id: 'settings', title: 'Налаштування', icon: 'settings-outline', badge: null },
];

export default function AnimatedSideMenu({ children, user, onLogout }: AnimatedSideMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateX = useRef(new Animated.Value(0)).current;
  const isMountedRef = useRef(true);
  const insets = useSafeAreaInsets();

  // Cleanup при розмонтуванні компонента
  useEffect(() => {
    // Встановлюємо синій колір статус-бару при завантаженні
    if (Platform.OS === 'android') {
      setStatusBarBackgroundColor('#4a9eff', true);
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const openMenu = () => {
    if (!isMountedRef.current) return;
    
    setIsMenuOpen(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateX, {
        toValue: MENU_WIDTH * 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    if (!isMountedRef.current) return;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isMountedRef.current) {
        setIsMenuOpen(false);
      }
    });
  };

  const handleMenuItemPress = (itemId: string) => {
    console.log(`🔗 Menu item pressed: ${itemId}`);
    closeMenu();
    
    // Тут можна додати навігацію
    switch (itemId) {
      case 'activity':
        console.log('📊 Навігація до Активності');
        break;
      case 'likes':
        console.log('❤️ Навігація до Вподобань');
        break;
      case 'friends':
        console.log('👥 Навігація до Друзів');
        break;
      case 'events':
        console.log('📅 Навігація до Подій');
        break;
      case 'networks':
        console.log('🌐 Навігація до Мереж');
        break;
      case 'settings':
        console.log('⚙️ Навігація до Налаштувань');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logout initiated from menu');
    
    // Закриваємо меню спочатку
    closeMenu();
    
    // Викликаємо logout після закриття меню
    setTimeout(() => {
      if (isMountedRef.current) {
        console.log('🚪 Calling onLogout...');
        onLogout();
      }
    }, 350); // Трохи більше часу для завершення анімації
  };

  const renderMenuItem = (item: any, index: number) => {
    const animatedStyle = {
      opacity: slideAnim.interpolate({
        inputRange: [-MENU_WIDTH, -MENU_WIDTH * 0.5, 0],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateX: slideAnim.interpolate({
            inputRange: [-MENU_WIDTH, 0],
            outputRange: [-50, 0],
            extrapolate: 'clamp',
          }),
        },
        {
          translateY: slideAnim.interpolate({
            inputRange: [-MENU_WIDTH, 0],
            outputRange: [index * 10, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    return (
      <Animated.View key={item.id} style={animatedStyle}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemIcon}>
            <Ionicons name={item.icon as any} size={24} color="#fff" />
          </View>
          <Text style={styles.menuItemText}>{item.title}</Text>
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#4a9eff" translucent={false} />
      
      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX: contentTranslateX }],
          },
        ]}
      >
        {/* Menu Button */}
        <TouchableOpacity
          style={[
            styles.menuButton,
            {
              top: insets.top + 10, // Використовуємо безпечну зону + невеликий відступ
            },
          ]}
          onPress={openMenu}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        
        {children}
      </Animated.View>

      {/* Overlay */}
      {isMenuOpen && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={closeMenu}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* Side Menu */}
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.menuContent}>
          {/* User Profile Header */}
          <Animated.View
            style={[
              styles.userHeader,
              {
                opacity: slideAnim.interpolate({
                  inputRange: [-MENU_WIDTH, -MENU_WIDTH * 0.7, 0],
                  outputRange: [0, 0.3, 1],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
              </Text>
            </View>
            <Text style={styles.userName}>
              {user?.first_name} {user?.last_name}
            </Text>
          </Animated.View>

          {/* Search Bar */}
          <Animated.View
            style={[
              styles.searchContainer,
              {
                opacity: slideAnim.interpolate({
                  inputRange: [-MENU_WIDTH, -MENU_WIDTH * 0.6, 0],
                  outputRange: [0, 0.5, 1],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <Ionicons name="search" size={20} color="#666" />
            <Text style={styles.searchText}>Пошук</Text>
          </Animated.View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </View>

          {/* Sign Out */}
          <Animated.View
            style={[
              styles.signOutContainer,
              {
                opacity: slideAnim.interpolate({
                  inputRange: [-MENU_WIDTH, -MENU_WIDTH * 0.3, 0],
                  outputRange: [0, 0.5, 1],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={24} color="#ff6b6b" />
              <Text style={styles.signOutText}>Вихід</Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  menuButton: {
    position: 'absolute',
    // top тепер динамічний через insets.top + 10
    left: 20,
    zIndex: 1000,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 998,
  },
  overlayTouchable: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: '#2a2a2a',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
  },
  userHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
    marginHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4a9eff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#3a3a3a',
    borderRadius: 25,
  },
  searchText: {
    color: '#666',
    marginLeft: 10,
    fontSize: 16,
  },
  menuItems: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 2,
  },
  menuItemIcon: {
    width: 40,
    alignItems: 'center',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  badge: {
    backgroundColor: '#4a9eff',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  signOutContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  signOutText: {
    color: '#ff6b6b',
    fontSize: 16,
    marginLeft: 15,
  },
});
