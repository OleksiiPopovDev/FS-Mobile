import React, {useState} from 'react';
import {Button, Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import GoogleAuthButton from "@/app/login/google-auth-button";
import {login} from "@/i18n/login";
import {getLocales} from "expo-localization";
import axios from "axios";
import * as FileSystem from 'expo-file-system';

interface LoginProps {
    onLoginSuccess: (userData: any) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [locale, setLocale] = useState(getLocales()[0].languageCode ?? 'en');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    login.locale = locale;

    console.log("🔍 Login компонент ініціалізований, onLoginSuccess:", typeof onLoginSuccess);

    const resetDatabase = async () => {
        const dbName = 'FitnessServer';
        const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

        try {
            await FileSystem.deleteAsync(dbPath);
            console.log(`✅ SQLite база ${dbName} успішно видалена`);
        } catch (error) {
            console.error(`❌ Не вдалося видалити базу ${dbName}`, error);
        }
    };

    const handleToken = async (token: string) => {
        try {
            setIsLoggingIn(true);
            console.log("🔑 handleToken викликано з токеном:", token);
            console.log("🔍 onLoginSuccess доступно?", typeof onLoginSuccess);
            
            // Отримуємо дані користувача з сервера
            const apiResponse = await axios.get('http://127.0.0.48/api/user/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = apiResponse.data.data;
            console.log("👤 Отримано дані користувача:", userData);

            // Додаємо токен до userData для збереження
            const userDataWithToken = {
                ...userData,
                authToken: token // Зберігаємо токен разом з даними користувача
            };

            // КРИТИЧНО ВАЖЛИВО: Викликаємо onLoginSuccess
            console.log("🎉 ВИКЛИКАЄМО onLoginSuccess з userData:", userData.first_name, userData.last_name);
            
            if (typeof onLoginSuccess === 'function') {
                console.log("✅ onLoginSuccess - це функція, викликаємо...");
                onLoginSuccess(userDataWithToken);
                console.log("✅ onLoginSuccess викликано успішно!");
            } else {
                console.error("❌ onLoginSuccess не є функцією:", typeof onLoginSuccess);
            }
            
        } catch (error) {
            console.error("❌ Помилка авторизації:", error);
            Alert.alert(
                'Помилка авторизації',
                'Не вдалося увійти в систему. Перевірте з\'єднання та спробуйте ще раз.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Тестова функція для швидкого тестування
    const testLogin = () => {
        console.log("🧪 Тестуємо логін з фейковими даними");
        const fakeUserData = {
            id: 1,
            email: "test@test.com",
            first_name: "Тест",
            last_name: "Користувач",
            gender: "unknown",
            birthday: "2025-07-01",
            authToken: "fake_token_123"
        };
        
        if (typeof onLoginSuccess === 'function') {
            console.log("🧪 Викликаємо onLoginSuccess з тестовими даними");
            onLoginSuccess(fakeUserData);
        } else {
            console.error("❌ onLoginSuccess не доступний для тестування");
        }
    };

    return (
        <ImageBackground
            source={require('assets/images/dark-material-bg.jpg')}
            style={[styles.background, StyleSheet.absoluteFill]}
            resizeMode="cover"
        >
            <View style={[styles.container]}>
                <Image source={require('assets/images/FS-logo-d.png')} style={styles.logo}/>

                <GoogleAuthButton onToken={handleToken} isLoading={isLoggingIn} />
                
                <Button title="Reset DB" onPress={resetDatabase}/>
                
                {/* Тестова кнопка */}
                <Button title="🧪 Test Login" onPress={testLogin} color="#28a745" />
                
                <Text style={styles.noAccount}>{login.t('no_account')}</Text>
                <Text style={styles.info}>{login.t('no_account_answer')}</Text>

                <TouchableOpacity onPress={() => Linking.openURL(login.t('politics_link'))}>
                    <Text style={styles.privacy}>{login.t('politics')}</Text>
                </TouchableOpacity>

                <View style={styles.flags}>
                    <TouchableOpacity onPress={() => setLocale('uk')}>
                        <Image source={require('assets/images/flags/ua.png')} style={styles.flag}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLocale('en')}>
                        <Image source={require('assets/images/flags/en.png')} style={styles.flag}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLocale('ru')}>
                        <Image source={require('assets/images/flags/ru.png')} style={styles.flag}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 50,
        resizeMode: 'contain',
    },
    noAccount: {
        color: '#fff',
        marginTop: 50,
        fontSize: 16,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        color: '#989898',
        textAlign: 'center',
        marginTop: 6,
    },
    privacy: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 15,
        color: '#03a9f4',
        fontWeight: 'bold',
    },
    flags: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 10,
    },
    flag: {
        width: 32,
        height: 24,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
});
