import React, {useState} from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import AnimatedSideMenu from '@/components/AnimatedSideMenu';
import BottomTabs from '@/components/BottomTabs';
import useHideSystemUI from '@/hooks/useHideSystemUI';

interface DashboardProps {
    user: any;
    onLogout: () => void;
}

export default function Dashboard({user, onLogout}: DashboardProps) {
    console.log("📱 Dashboard рендериться для користувача:", user?.first_name, user?.last_name);
    const [activeTab, setActiveTab] = useState('dashboard'); // Змінили на dashboard як активну вкладку за замовчуванням

    // Приховуємо системні елементи
    useHideSystemUI();

    const handleTabPress = (tab: string) => {
        console.log(`🔄 Перехід на вкладку: ${tab}`);
        setActiveTab(tab);

        // Тут можна додати логіку навігації
        switch (tab) {
            case 'dashboard':
                console.log('🏠 Відкриваємо розділ Dashboard');
                break;
            case 'training':
                console.log('🏋️ Відкриваємо розділ Тренування');
                break;
            case 'nutrition':
                console.log('🥗 Відкриваємо розділ Харчування');
                break;
            case 'dishes':
                console.log('🍽️ Відкриваємо розділ Блюда');
                break;
            default:
                break;
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboardContent();
            case 'training':
                return renderTrainingContent();
            case 'nutrition':
                return renderNutritionContent();
            case 'dishes':
                return renderDishesContent();
            default:
                return renderDashboardContent();
        }
    };

    const renderDashboardContent = () => (
        <SafeAreaView style={[styles.container, {backgroundColor: '#4a9eff'}]}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Fitness Server</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <View style={styles.profileAvatar}>
                        <Text style={styles.profileAvatarText}>
                            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Швидкі дії</Text>
                    <View style={styles.quickActions}>
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => setActiveTab('training')} // Перехід на вкладку Тренування
                        >
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>🏋️</Text>
                            </View>
                            <Text style={styles.actionTitle}>Тренування</Text>
                            <Text style={styles.actionSubtitle}>Створити програму</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => setActiveTab('nutrition')} // Перехід на вкладку Харчування
                        >
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>🥗</Text>
                            </View>
                            <Text style={styles.actionTitle}>Харчування</Text>
                            <Text style={styles.actionSubtitle}>Планувати раціон</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Progress Cards */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Прогрес</Text>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressCard}>
                            <Text style={styles.progressNumber}>75%</Text>
                            <Text style={styles.progressLabel}>Тижневі цілі</Text>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, {width: '75%'}]}/>
                            </View>
                        </View>

                        <View style={styles.progressCard}>
                            <Text style={styles.progressNumber}>12</Text>
                            <Text style={styles.progressLabel}>Тренувань цього місяця</Text>
                            <Text style={styles.progressSubtext}>+3 від минулого місяця</Text>
                        </View>
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

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Остання активність</Text>
                    <View style={styles.activityCard}>
                        <View style={styles.activityIcon}>
                            <Text style={styles.activityEmoji}>🎉</Text>
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityText}>
                                Ви тільки що приєдналися до Fitness Server!
                            </Text>
                            <Text style={styles.activitySubtext}>
                                Розпочніть своє фітнес-подорож прямо зараз
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Add some bottom padding */}
                <View style={{height: 60}}/>

            </ScrollView>
        </SafeAreaView>
    );

    const renderTrainingContent = () => (
        <SafeAreaView style={[styles.container, {backgroundColor: '#4a9eff'}]}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Тренування</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <View style={styles.profileAvatar}>
                        <Text style={styles.profileAvatarText}>
                            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* Today's Workout */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Сьогоднішнє тренування</Text>
                    <View style={styles.todayWorkoutCard}>
                        <View style={styles.workoutHeader}>
                            <View style={styles.workoutIconContainer}>
                                <Text style={styles.workoutIcon}>💪</Text>
                            </View>
                            <View style={styles.workoutInfo}>
                                <Text style={styles.workoutTitle}>Силове тренування</Text>
                                <Text style={styles.workoutSubtitle}>Груди, трицепс • 45 хв</Text>
                            </View>
                            <View style={styles.workoutStatus}>
                                <Text style={styles.workoutTime}>14:30</Text>
                            </View>
                        </View>
                        <View style={styles.workoutProgress}>
                            <View style={styles.progressInfo}>
                                <Text style={styles.progressText}>Прогрес: 3/6 вправ</Text>
                                <Text style={styles.progressPercent}>50%</Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.workoutProgressBar, {width: '50%'}]}/>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.continueButton}>
                            <Text style={styles.continueButtonText}>Продовжити тренування</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Швидкі дії</Text>
                    <View style={styles.trainingActions}>
                        <TouchableOpacity style={styles.trainingActionCard}>
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>➕</Text>
                            </View>
                            <Text style={styles.actionTitle}>Нове тренування</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.trainingActionCard}>
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>📋</Text>
                            </View>
                            <Text style={styles.actionTitle}>Мої програми</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.trainingActionCard}>
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>🎯</Text>
                            </View>
                            <Text style={styles.actionTitle}>Готові програми</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Weekly Schedule */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Тижневий розклад</Text>
                    <View style={styles.weeklySchedule}>
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day, index) => {
                            const isToday = index === 2; // Середа як приклад
                            const hasWorkout = index !== 6; // Неділя - вихідний

                            return (
                                <TouchableOpacity
                                    key={day}
                                    style={[
                                        styles.dayCard,
                                        isToday && styles.todayCard,
                                        !hasWorkout && styles.restDayCard
                                    ]}
                                >
                                    <Text style={[
                                        styles.dayText,
                                        isToday && styles.todayText,
                                        !hasWorkout && styles.restDayText
                                    ]}>
                                        {day}
                                    </Text>
                                    <View style={[
                                        styles.workoutDot,
                                        isToday && styles.todayDot,
                                        !hasWorkout && styles.restDot
                                    ]}/>
                                    <Text style={[
                                        styles.workoutType,
                                        isToday && styles.todayWorkoutType,
                                        !hasWorkout && styles.restDayText
                                    ]}>
                                        {hasWorkout ? (index % 2 === 0 ? 'Сила' : 'Кардіо') : 'Відпочинок'}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Recent Workouts */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Останні тренування</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Всі</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.recentWorkouts}>
                        <TouchableOpacity style={styles.recentWorkoutCard}>
                            <View style={styles.recentWorkoutInfo}>
                                <View style={styles.recentWorkoutHeader}>
                                    <Text style={styles.recentWorkoutTitle}>Силове тренування</Text>
                                    <Text style={styles.recentWorkoutDate}>Вчора</Text>
                                </View>
                                <Text style={styles.recentWorkoutDetails}>Груди, трицепс • 42 хв</Text>
                                <View style={styles.recentWorkoutStats}>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>6</Text>
                                        <Text style={styles.statLabel}>вправ</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>245</Text>
                                        <Text style={styles.statLabel}>ккал</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>42</Text>
                                        <Text style={styles.statLabel}>хв</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.completionBadge}>
                                <Text style={styles.completionText}>✓</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.recentWorkoutCard}>
                            <View style={styles.recentWorkoutInfo}>
                                <View style={styles.recentWorkoutHeader}>
                                    <Text style={styles.recentWorkoutTitle}>Кардіо тренування</Text>
                                    <Text style={styles.recentWorkoutDate}>2 дні назад</Text>
                                </View>
                                <Text style={styles.recentWorkoutDetails}>Біг, велосипед • 35 хв</Text>
                                <View style={styles.recentWorkoutStats}>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>4</Text>
                                        <Text style={styles.statLabel}>вправ</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>320</Text>
                                        <Text style={styles.statLabel}>ккал</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>35</Text>
                                        <Text style={styles.statLabel}>хв</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.completionBadge}>
                                <Text style={styles.completionText}>✓</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Statistics */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Статистика тижня</Text>
                    <View style={styles.weeklyStats}>
                        <View style={styles.weeklyStatCard}>
                            <Text style={styles.weeklyStatNumber}>4</Text>
                            <Text style={styles.weeklyStatLabel}>тренування</Text>
                            <Text style={styles.weeklyStatChange}>+1 від минулого</Text>
                        </View>

                        <View style={styles.weeklyStatCard}>
                            <Text style={styles.weeklyStatNumber}>2:45</Text>
                            <Text style={styles.weeklyStatLabel}>загальний час</Text>
                            <Text style={styles.weeklyStatChange}>+15хв від минулого</Text>
                        </View>

                        <View style={styles.weeklyStatCard}>
                            <Text style={styles.weeklyStatNumber}>890</Text>
                            <Text style={styles.weeklyStatLabel}>ккал спалено</Text>
                            <Text style={styles.weeklyStatChange}>+120 від минулого</Text>
                        </View>
                    </View>
                </View>

                <View style={{height: 60}}/>

            </ScrollView>
        </SafeAreaView>
    );

    const renderNutritionContent = () => (
        <SafeAreaView style={[styles.container, {backgroundColor: '#4a9eff'}]}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Харчування</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <View style={styles.profileAvatar}>
                        <Text style={styles.profileAvatarText}>
                            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* Nutrition Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Програми харчування</Text>
                    <View style={styles.quickActions}>
                        <TouchableOpacity style={styles.actionCard}>
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>📊</Text>
                            </View>
                            <Text style={styles.actionTitle}>Створити програму</Text>
                            <Text style={styles.actionSubtitle}>Індивідуальний план</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionCard}>
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>📋</Text>
                            </View>
                            <Text style={styles.actionTitle}>Готові програми</Text>
                            <Text style={styles.actionSubtitle}>Підібрати готову</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Nutrition Stats */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Сьогоднішня статистика</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>ккал спожито</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Білки (г)</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Вуглеводи (г)</Text>
                        </View>
                    </View>
                </View>

                <View style={{height: 60}}/>

            </ScrollView>
        </SafeAreaView>
    );

    const renderDishesContent = () => (
        <SafeAreaView style={[styles.container, {backgroundColor: '#4a9eff'}]}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Блюда</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <View style={styles.profileAvatar}>
                        <Text style={styles.profileAvatarText}>
                            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* Dishes Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Керування стравами</Text>
                    <View style={styles.quickActions}>
                        <TouchableOpacity style={styles.actionCard}>
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>➕</Text>
                            </View>
                            <Text style={styles.actionTitle}>Додати страву</Text>
                            <Text style={styles.actionSubtitle}>Новий рецепт</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionCard}>
                            <View style={styles.actionIconContainer}>
                                <Text style={styles.actionIcon}>🔍</Text>
                            </View>
                            <Text style={styles.actionTitle}>Переглянути страви</Text>
                            <Text style={styles.actionSubtitle}>База рецептів</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Категорії страв</Text>
                    <View style={styles.progressContainer}>
                        <TouchableOpacity style={styles.progressCard}>
                            <Text style={styles.progressNumber}>🥗</Text>
                            <Text style={styles.progressLabel}>Салати</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.progressCard}>
                            <Text style={styles.progressNumber}>🍖</Text>
                            <Text style={styles.progressLabel}>М'ясні страви</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.progressCard}>
                            <Text style={styles.progressNumber}>🍲</Text>
                            <Text style={styles.progressLabel}>Супи</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{height: 60}}/>

            </ScrollView>
        </SafeAreaView>
    );

    const DashboardContent = () => (
        <View style={styles.container}>
            {renderTabContent()}
            <BottomTabs activeTab={activeTab} onTabPress={handleTabPress}/>
        </View>
    );

    return (
        <AnimatedSideMenu user={user} onLogout={onLogout}>
            <DashboardContent/>
        </AnimatedSideMenu>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        paddingBottom: Platform.OS === 'ios' ? 10 : 0, // Додаємо відступ для home indicator на iOS
    },
    containerWithHeader: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 80, // More space for menu button
        paddingVertical: 15,
        backgroundColor: '#4a9eff', // Синій фон header
        borderBottomWidth: 1,
        borderBottomColor: '#3a8eef', // Трохи темніший синій для бордера
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileButton: {
        padding: 5,
    },
    profileAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: 'rgba(255,255,255,0.2)', // Напівпрозорий білий на синьому фоні
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatarText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        paddingBottom: 180, // Додали ще 20px (було 180)
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
        borderRadius: 16,
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3a3a3a',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionIcon: {
        fontSize: 24,
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
    progressContainer: {
        gap: 15,
    },
    progressCard: {
        backgroundColor: '#2a2a2a',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    progressNumber: {
        color: '#4a9eff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    progressLabel: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    progressSubtext: {
        color: '#4CAF50',
        fontSize: 14,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#3a3a3a',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4a9eff',
        borderRadius: 2,
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
    activityCard: {
        flexDirection: 'row',
        backgroundColor: '#2a2a2a',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    activityIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#3a3a3a',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    activityEmoji: {
        fontSize: 24,
    },
    activityContent: {
        flex: 1,
    },
    activityText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    activitySubtext: {
        color: '#888',
        fontSize: 14,
    },

    // Training Page Styles
    todayWorkoutCard: {
        backgroundColor: '#2a2a2a',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    workoutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    workoutIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4a9eff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    workoutIcon: {
        fontSize: 24,
    },
    workoutInfo: {
        flex: 1,
    },
    workoutTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    workoutSubtitle: {
        color: '#888',
        fontSize: 14,
    },
    workoutStatus: {
        alignItems: 'flex-end',
    },
    workoutTime: {
        color: '#4a9eff',
        fontSize: 16,
        fontWeight: '600',
    },
    workoutProgress: {
        marginBottom: 15,
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        color: '#fff',
        fontSize: 14,
    },
    progressPercent: {
        color: '#4a9eff',
        fontSize: 14,
        fontWeight: '600',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#3a3a3a',
        borderRadius: 3,
        overflow: 'hidden',
    },
    workoutProgressBar: {
        height: '100%',
        backgroundColor: '#4a9eff',
        borderRadius: 3,
    },
    continueButton: {
        backgroundColor: '#4a9eff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    trainingActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trainingActionCard: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 3,
    },
    weeklySchedule: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayCard: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        padding: 8,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 2,
    },
    todayCard: {
        backgroundColor: '#4a9eff',
    },
    restDayCard: {
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#3a3a3a',
    },
    dayText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    todayText: {
        color: '#fff',
    },
    restDayText: {
        color: '#666',
    },
    workoutDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4a9eff',
        marginBottom: 4,
    },
    todayDot: {
        backgroundColor: '#fff',
    },
    restDot: {
        backgroundColor: '#666',
    },
    workoutType: {
        color: '#888',
        fontSize: 10,
        textAlign: 'center',
    },
    todayWorkoutType: {
        color: '#fff',
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    seeAllText: {
        color: '#4a9eff',
        fontSize: 14,
        fontWeight: '600',
    },
    recentWorkouts: {
        gap: 12,
    },
    recentWorkoutCard: {
        flexDirection: 'row',
        backgroundColor: '#2a2a2a',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    recentWorkoutInfo: {
        flex: 1,
    },
    recentWorkoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    recentWorkoutTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    recentWorkoutDate: {
        color: '#888',
        fontSize: 12,
    },
    recentWorkoutDetails: {
        color: '#888',
        fontSize: 14,
        marginBottom: 8,
    },
    recentWorkoutStats: {
        flexDirection: 'row',
        gap: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        color: '#4a9eff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completionBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    completionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    weeklyStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    weeklyStatCard: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    weeklyStatNumber: {
        color: '#4a9eff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    weeklyStatLabel: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 4,
    },
    weeklyStatChange: {
        color: '#4CAF50',
        fontSize: 10,
        textAlign: 'center',
    },
});
