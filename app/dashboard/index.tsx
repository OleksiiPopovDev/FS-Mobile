import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  console.log("📱 Dashboard рендериться для користувача:", user?.first_name, user?.last_name);
  console.log("📱 onLogout function:", typeof onLogout);

  const handleLogout = async () => {
    try {
      console.log("🚪 handleLogout викликано");
      console.log("🚪 onLogout доступний?", typeof onLogout);
      
      // Пропускаємо очищення бази даних, щоб уникнути проблем з чергою
      console.log("🚪 Пропускаємо очищення бази даних (через проблеми з queue)");
      
      console.log("🚪 Викликаємо onLogout...");
      if (typeof onLogout === 'function') {
        onLogout();
        console.log("✅ onLogout викликано успішно!");
      } else {
        console.error("❌ onLogout не є функцією!");
      }
      
    } catch (error) {
      console.error('❌ Помилка виходу:', error);
      Alert.alert('Помилка', 'Не вдалося вийти з системи');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('assets/images/FS-logo-d.png')} style={styles.headerLogo} />
          <Text style={styles.headerTitle}>Fitness Server</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Вихід</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>
          Привіт, {user?.first_name} {user?.last_name}! 👋
        </Text>
        <Text style={styles.welcomeSubtext}>
          Готовий до нових досягнень?
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Швидкі дії</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionIcon}>🏋️</Text>
              <Text style={styles.actionTitle}>Тренування</Text>
              <Text style={styles.actionSubtitle}>Створити програму</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionIcon}>🥗</Text>
              <Text style={styles.actionTitle}>Харчування</Text>
              <Text style={styles.actionSubtitle}>Планувати раціон</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Статистика</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Тренувань</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Програм харчування</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Днів активності</Text>
            </View>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Інформація про користувача</Text>
          <View style={styles.userInfoCard}>
            <Text style={styles.userInfoText}>Email: {user?.email}</Text>
            <Text style={styles.userInfoText}>Ім'я: {user?.first_name}</Text>
            <Text style={styles.userInfoText}>Прізвище: {user?.last_name}</Text>
            <Text style={styles.userInfoText}>Стать: {user?.gender || 'Не вказано'}</Text>
            <Text style={styles.userInfoText}>ID: {user?.id}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#dc3545',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#2a2a2a',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  welcomeSubtext: {
    color: '#888',
    fontSize: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  section: {
    margin: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionSubtitle: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  statNumber: {
    color: '#03a9f4',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  userInfoCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
  },
  userInfoText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
});
