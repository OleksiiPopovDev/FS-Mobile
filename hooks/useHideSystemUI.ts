import React, { useEffect } from 'react';
import { Platform } from 'react-native';

// Хук для управління системним UI
export const useHideSystemUI = () => {
  useEffect(() => {
    const setupSystemUI = async () => {
      if (Platform.OS === 'android') {
        // На Android можемо спробувати приховати navigation bar через системні засоби
        console.log('📱 Android: Налаштування системного UI');
        // Тут можна додати логіку для Android, коли встановимо потрібний пакет
      }
      
      if (Platform.OS === 'ios') {
        // На iOS home indicator - це системний елемент
        // Apple рекомендує НЕ приховувати його в звичайних додатках
        console.log('🍎 iOS: Home indicator залишається видимим (рекомендація Apple)');
      }
    };

    setupSystemUI();
  }, []);
};

export default useHideSystemUI;
