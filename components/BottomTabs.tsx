import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomTabsProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const tabs = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    id: 'training',
    title: 'Тренування',
    icon: 'fitness-outline',
    activeIcon: 'fitness',
  },
  {
    id: 'nutrition',
    title: 'Харчування',
    icon: 'restaurant-outline',
    activeIcon: 'restaurant',
  },
  {
    id: 'dishes',
    title: 'Блюда',
    icon: 'pizza-outline',
    activeIcon: 'pizza',
  },
];

export default function BottomTabs({ activeTab, onTabPress }: BottomTabsProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                <Ionicons
                  name={isActive ? tab.activeIcon as any : tab.icon as any}
                  size={20} // Зменшили розмір іконок
                  color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'} // Білий текст на синьому фоні
                />
              </View>
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4a9eff', // Змінено на синій
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#4a9eff', // Змінено на синій
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#3a8eef', // Трохи темніший синій для бордера
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6, // Зменшили вертикальний padding
    paddingHorizontal: 2, // Зменшили горизонтальний padding
  },
  activeTab: {
    // Додаткові стилі для активної вкладки
  },
  iconContainer: {
    width: 36, // Зменшили розмір іконок
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3, // Зменшили відступ
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)', // Напівпрозорий білий фон для активної іконки
    shadowColor: 'rgba(255,255,255,0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 10, // Зменшили розмір шрифту
    color: 'rgba(255,255,255,0.7)', // Білий текст на синьому фоні
    textAlign: 'center',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff', // Повністю білий для активної вкладки
    fontWeight: '600',
  },
});
