import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import {login} from "@/i18n/login";
import * as AuthSession from 'expo-auth-session';

interface GoogleAuthButtonProps {
    onToken: (token: string) => void;
    isLoading?: boolean;
}

export default function GoogleAuthButton({ onToken, isLoading = false }: GoogleAuthButtonProps) {
    const [loading, setLoading] = useState(false);
    const redirectUri = AuthSession.makeRedirectUri();

    console.log("🔗 GoogleAuthButton ініціалізовано");
    console.log("🔗 onToken function:", typeof onToken);
    console.log("🔗 Redirect URI:", redirectUri, "Platform:", Platform.OS);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        scopes: ['profile', 'email'],
        redirectUri: redirectUri
    });

    useEffect(() => {
        console.log("🔍 Request redirect URI:", request?.redirectUri, "Platform:", Platform.OS);
        
        if (response?.type === 'success') {
            console.log("✅ Google Auth response success, обробляємо...");
            handleAuthSuccess(response);
        } else if (response?.type === 'error') {
            console.error("❌ Google Auth Error:", response.error);
            setLoading(false);
            Alert.alert(
                'Помилка авторизації',
                'Не вдалося авторизуватися через Google. Спробуйте ще раз.',
                [{ text: 'OK' }]
            );
        } else if (response?.type === 'cancel') {
            console.log("🚫 Google Auth скасовано користувачем");
            setLoading(false);
        }
    }, [response]);

    const handleAuthSuccess = async (authResponse: any) => {
        try {
            console.log("🔄 handleAuthSuccess почато");
            const { authentication } = authResponse;

            if (!authentication?.accessToken) {
                throw new Error('Access token не отримано від Google');
            }

            console.log("✅ Google Auth Success, отримано Access Token");

            // Відправляємо access token на наш сервер
            const apiUrl = `http://127.0.0.48/api/social/callback/ggl-json/${authentication.accessToken}`;
            console.log(`🚀 FS Request: ${apiUrl}`);

            const response = await axios.get(apiUrl, {
                timeout: 10000, // 10 секунд timeout
            });

            if (response.data && response.data.data) {
                const token = response.data.data;
                console.log("🎉 JWT Token отримано від сервера:", token);
                
                // КРИТИЧНО: Передаємо токен батьківському компоненту
                console.log("🎯 Викликаємо onToken з JWT токеном");
                console.log("🎯 onToken function перед викликом:", typeof onToken);
                
                if (typeof onToken === 'function') {
                    console.log("✅ onToken є функцією, викликаємо...");
                    onToken(token);
                    console.log("✅ onToken викликано успішно!");
                } else {
                    console.error("❌ onToken не є функцією:", typeof onToken);
                }
            } else {
                throw new Error('Невалідна відповідь від сервера');
            }
        } catch (error) {
            console.error("❌ Помилка обробки Google Auth:", error);
            
            let errorMessage = 'Не вдалося авторизуватися через сервер';
            
            if (error.code === 'ECONNABORTED') {
                errorMessage = 'Тайм-аут підключення до сервера';
            } else if (error.response?.status === 404) {
                errorMessage = 'Сервер недоступний (404)';
            } else if (error.response?.status >= 500) {
                errorMessage = 'Помилка сервера';
            }

            Alert.alert('Помилка авторизації', errorMessage, [{ text: 'OK' }]);
        } finally {
            setLoading(false);
        }
    };

    const handlePress = async () => {
        try {
            setLoading(true);
            console.log("🔄 Запуск Google Auth...");
            await promptAsync();
        } catch (error) {
            console.error("❌ Помилка запуску Google Auth:", error);
            setLoading(false);
            Alert.alert(
                'Помилка',
                'Не вдалося запустити авторизацію через Google',
                [{ text: 'OK' }]
            );
        }
    };

    const isButtonDisabled = loading || isLoading || !request;

    return (
        <TouchableOpacity
            style={[
                styles.button, 
                styles.google,
                isButtonDisabled && styles.disabled
            ]}
            onPress={handlePress}
            disabled={isButtonDisabled}
        >
            <Image
                source={require('assets/images/social-media-logos/google_g.png')}
                style={styles.buttonLogo}
            />
            {loading || isLoading ? (
                <ActivityIndicator size="small" color="#666" style={styles.buttonLoader} />
            ) : (
                <Text style={styles.buttonText}>{login.t('login.google')}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 260,
        paddingVertical: 7,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    google: {
        backgroundColor: '#ffffff',
        color: '#fff',
    },
    disabled: {
        opacity: 0.6,
    },
    buttonLogo: {
        width: 40,
        height: 40,
        marginLeft: 15,
        marginRight: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        alignItems: 'center',
        marginLeft: 0,
        color: '#333',
    },
    buttonLoader: {
        marginLeft: 50,
    },
});
