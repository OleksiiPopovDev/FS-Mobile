import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Login from "@/app/login";
import Dashboard from "@/app/dashboard";
import { UserRepository } from "@/app/database/repository/user.repository";

// Простий in-memory storage (буде очищатися при перезапуску)
let savedUserData: any = null;
let savedToken: string | null = null;

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    console.log("🏁 App компонент рендериться з станом:", {
        isLoading,
        isAuthenticated,
        hasUser: !!currentUser,
        userName: currentUser?.first_name
    });

    // Перевірка збереженого користувача при запуску
    useEffect(() => {
        checkSavedUser();
    }, []);

    const checkSavedUser = async () => {
        try {
            console.log("🚀 checkSavedUser: початок перевірки");
            setIsLoading(true);
            
            // Додаємо діагностику БД
            const userRepository = new UserRepository();
            await userRepository.getDatabaseInfo();
            
            // Перевіряємо БД на наявність користувачів
            const dbUsers = await userRepository.getAllUsers();
            console.log("🗄️ Користувачі в БД:", dbUsers.length);
            
            if (dbUsers.length > 0) {
                const dbUser = dbUsers[0];
                console.log("✅ Знайдено користувача в БД:", dbUser.firstName, dbUser.lastName);
                
                // Перетворюємо з БД формату в звичайний формат
                const userData = {
                    id: dbUser.userId,
                    email: dbUser.email,
                    first_name: dbUser.firstName,
                    last_name: dbUser.lastName,
                    gender: dbUser.gender,
                    birthday: dbUser.birthday,
                    authToken: dbUser.token
                };
                
                setCurrentUser(userData);
                setIsAuthenticated(true);
                console.log("✅ Автоматичний вхід з БД виконано!");
            } else {
                // Перевіряємо in-memory storage
                console.log("💾 Збережені дані в пам'яті:", {
                    hasUserData: !!savedUserData,
                    hasToken: !!savedToken
                });
                
                if (savedUserData && savedToken) {
                    console.log("✅ Знайдено збереженого користувача в пам'яті:", savedUserData.first_name, savedUserData.last_name);
                    
                    setCurrentUser(savedUserData);
                    setIsAuthenticated(true);
                    console.log("✅ Автоматичний вхід з пам'яті виконано!");
                } else {
                    console.log("🔍 Збережених даних не знайдено, показуємо логін");
                    setIsAuthenticated(false);
                }
            }
        } catch (error) {
            console.error("❌ Помилка перевірки збережених даних:", error);
            setIsAuthenticated(false);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                console.log("✅ Перевірка збережених даних завершена");
            }, 1000);
        }
    };

    // Функція для успішного логіну
    const handleLoginSuccess = async (userData) => {
        try {
            console.log("🎉🎉🎉 handleLoginSuccess ВИКЛИКАНО!");
            console.log("📝 Отримані дані користувача:", {
                name: userData?.first_name + ' ' + userData?.last_name,
                email: userData?.email,
                id: userData?.id
            });
            
            // Зберігаємо в БД
            try {
                const userRepository = new UserRepository();
                await userRepository.clearAll(); // Очищаємо старі дані
                
                await userRepository.createUser({
                    token: userData.authToken || 'no_token',
                    userId: userData.id ?? 0,
                    email: userData.email,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    gender: userData.gender,
                    birthday: userData.birthday,
                });
                
                console.log("💾 Дані збережено в БД");
                
                // Перевіряємо що збереглося
                await userRepository.getDatabaseInfo();
            } catch (dbError) {
                console.warn("⚠️ Помилка збереження в БД:", dbError);
            }
            
            // Також зберігаємо в in-memory storage як backup
            savedUserData = userData;
            savedToken = userData.authToken || 'temp_token';
            console.log("💾 Дані збережено в пам'яті");
            
            console.log("🔄 Оновлюємо стан...");
            setCurrentUser(userData);
            setIsAuthenticated(true);
            
            console.log("✅ Стан оновлено!");
        } catch (error) {
            console.error("❌ Помилка збереження даних:", error);
            // Все одно продовжуємо з логіном
            setCurrentUser(userData);
            setIsAuthenticated(true);
        }
    };

    // Функція для виходу
    const handleLogout = async () => {
        try {
            console.log("🚪 handleLogout викликано");
            
            // Очищаємо БД
            try {
                const userRepository = new UserRepository();
                await userRepository.clearAll();
                console.log("💾 БД очищено");
            } catch (dbError) {
                console.warn("⚠️ Помилка очищення БД:", dbError);
            }
            
            // Очищаємо in-memory storage
            savedUserData = null;
            savedToken = null;
            console.log("💾 Пам'ять очищено");
            
            setCurrentUser(null);
            setIsAuthenticated(false);
            console.log("✅ Користувач вийшов з системи");
        } catch (error) {
            console.error("❌ Помилка очищення даних:", error);
            // Все одно виходимо
            setCurrentUser(null);
            setIsAuthenticated(false);
        }
    };

    // Функція для діагностики БД
    const checkDatabase = async () => {
        const userRepository = new UserRepository();
        await userRepository.getDatabaseInfo();
    };

    // Показуємо індикатор завантаження під час перевірки
    if (isLoading) {
        console.log("⏳ Показуємо екран завантаження");
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#03a9f4" />
                <Text style={styles.loadingText}>Перевірка даних...</Text>
                <TouchableOpacity style={styles.debugButton} onPress={checkDatabase}>
                    <Text style={styles.debugButtonText}>🔍 Перевірити БД</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Показуємо Dashboard або Login в залежності від стану авторизації
    if (isAuthenticated && currentUser) {
        console.log("✅ Умова виконана: показуємо Dashboard для", currentUser.first_name);
        return <Dashboard user={currentUser} onLogout={handleLogout} />;
    } else {
        console.log("🔐 Показуємо Login екран");
        console.log("🔧 Передаємо handleLoginSuccess:", typeof handleLoginSuccess);
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 20,
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
    },
    debugButton: {
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#28a745',
        borderRadius: 6,
    },
    debugButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});
