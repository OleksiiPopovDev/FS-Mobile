import React, {useEffect, useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from "axios";
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '24231477460-sjpo6naep0bdg418vurk5ei34gfkj4s8.apps.googleusercontent.com',
        androidClientId: '24231477460-pa0pc1ontiffp97tpdfljl9c4ceh656q.apps.googleusercontent.com',
        webClientId: '24231477460-tjd33be9s06vauu53jpmuq1mj4e3jd8b.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const {authentication} = response;
            const {code} = response.params;
            console.log(code);
            console.log(authentication);

            if (!code) {
                Alert.alert('Помилка', 'Authorization code не отримано');
                return;
            }
            const url = `http://127.0.0.48/api/social/callback/ggl-json/${authentication?.accessToken}`
            console.log('FS Request: ', url);
            axios.get(url)
                .then(async (res) => {
                    const token = res.data.data;
                    console.log('Token: ', token);
                    const userInfo = await axios.get('http://127.0.0.48/api/user/info', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    setUserInfo(userInfo.data.data)
                    console.log(JSON.stringify(userInfo));

                }, (err) => {
                    console.error('Помилка авторизації на сервері:', err.message());
                    Alert.alert('Помилка', 'Не вдалося авторизуватися через сервер.');
                }).catch((err) => console.log(err));
        }
    }, [response]);

    async function logout() {
        setUserInfo(null);
    }

    async function test() {
        const url = 'http://127.0.0.48/api/social/links';
        // const url = 'http://10.0.2.2/api/social/links';
        // const url = 'https://api.fitness-server.local.com/api/social/links';
        // const url = 'https://server.fitness/api/social/links';
        console.log('FS Request: ', url);
        try {
            axios.get(url)
                .then((res) => console.log(JSON.stringify(res)))
                .catch((err) => console.error(err));
        } catch (error) {
            console.error('Помилка авторизації на сервері:', error.message());
            Alert.alert('Помилка', 'Не вдалося авторизуватися через сервер.');
        }
    }


    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {userInfo ? (
                <View>
                    <Text>Welcome, {userInfo.first_name} {userInfo.last_name}!</Text>
                    <Text>Activity: {userInfo.activity}!</Text>
                    <Text>Role: {userInfo.role}!</Text>
                    <Text>Email: {userInfo.email}</Text>
                </View>
            ) : (
                <Button

                    disabled={!request}
                    title="Sign in with Google"
                    onPress={() => promptAsync()}
                />
            )}
            <Button title="Test" onPress={() => test()}/>
            <Button title="Log Out!" onPress={() => logout()}/>
        </View>
    );
}
