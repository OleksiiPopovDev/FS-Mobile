import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import {login} from "@/i18n/login";

export default function GoogleAuthButton({onToken}) {
    const [loading, setLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        scopes: ['profile', 'email'],
    });

    useEffect(() => {
        console.log(request?.redirectUri, Platform.OS);
        if (response?.type === 'success') {
            const {authentication} = response;
            const {code} = response.params;

            if (!code) {
                alert('Authorization code не отримано');
                return;
            }

            const url = `http://127.0.0.48/api/social/callback/ggl-json/${authentication?.accessToken}`;

            axios
                .get(url)
                .then(async (res) => {
                    console.log(res.data.data);
                    onToken(res.data.data);
                })
                .catch(() => {
                    alert('Не вдалося авторизуватись через сервер');
                })
                .finally(() => setLoading(false));

        } else if (response) {
            setLoading(false);
        }
    }, [response]);

    return (
        <TouchableOpacity
            style={[styles.button, styles.google]}
            onPress={async () => {
                setLoading(true);
                await promptAsync();
            }}
            disabled={loading}
        >
            <Image
                source={require('assets/images/social-media-logos/google_g.png')}
                style={styles.buttonLogo}
            />
            {loading ? (
                <ActivityIndicator size="small" style={styles.buttonLoader}/>
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
    },
    buttonLoader: {
        marginLeft: 50,
    },
});
