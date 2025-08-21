import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from "axios";
import {getLocales} from 'expo-localization';
import {I18n} from "i18n-js";

WebBrowser.maybeCompleteAuthSession();

const i18n = new I18n({
    en: {
        no_account: 'Don\'t have an account?',
        no_account_answer: 'Just Log In via social network and you\'ll register a account automatically.',
        politics: 'Privacy policy',
        politics_link: process.env.EXPO_PUBLIC_POLICY_URL_EN,
        login: {
            google: 'Sing In with Google',
            facebook: 'Sing In with Facebook',
            instagram: 'Sing In with Instagram',
        }
    },
    uk: {
        no_account: 'Не маєте облікового запису?',
        no_account_answer: 'Просто авторизуйтесь через одну із соціальних мереж і Ваш аккаунт буде створений автоматично.',
        politics: 'Політика конфіденційності',
        politics_link: process.env.EXPO_PUBLIC_POLICY_URL_UK,
        login: {
            google: 'Увійти через Google',
            facebook: 'Увійти через Facebook',
            instagram: 'Увійти через Instagram',
        }
    },
    ru: {
        no_account: 'Не имеете аккаунта?',
        no_account_answer: 'Просто авторизуйтесь через одну из социальных сетей и Ваш аккаунт будет создан автоматически.',
        politics: 'Политика конфиденциальности',
        politics_link: process.env.EXPO_PUBLIC_POLICY_URL_RU,
        login: {
            google: 'Войти через Google',
            facebook: 'Войти через Facebook',
            instagram: 'Войти через Instagram',
        }
    },
});

export default function App() {

    const [loading, setLoading] = useState(false);
    const [locale, setLocale] = useState(getLocales()[0].languageCode ?? 'en');
    const [userInfo, setUserInfo] = useState(null);

    i18n.locale = locale;

    const [request, response, googleOAuthHandler] = Google.useAuthRequest({
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        scopes: ['profile', 'email'],
    });
    
    useEffect(() => {
        console.log(request);
        console.log(response);
        getLocales().forEach((locale) => {
            console.log(locale.languageCode);
        });
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
                    const apiResponse = await axios.get('http://127.0.0.48/api/user/info', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    setUserInfo(apiResponse.data.data);
                    console.log(JSON.stringify(userInfo));
                    console.log(userInfo);
                    setLoading(false);
                }, (err) => {
                    console.error('Помилка авторизації на сервері:', err.message());
                    Alert.alert('Помилка', 'Не вдалося авторизуватися через сервер.');
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err)
                    Alert.alert('Помилка', 'Не вдалося авторизуватися через сервер.');
                    setLoading(false);
                });
        } else if (response) {
            setLoading(false);
        }
    }, [response]);

    async function logout() {
        setUserInfo(null);
    }

    return (
        <ImageBackground
            source={require('assets/images/dark-material-bg.jpg')}
            style={[styles.background, StyleSheet.absoluteFill]}
            resizeMode="cover"
        >
            <View style={[styles.container]}>
                <Image source={require('assets/images/FS-logo-d.png')} style={styles.logo}/>

                <TouchableOpacity style={[styles.button, styles.google]} onPress={async () => {
                    setLoading(true);
                    await googleOAuthHandler();
                }} disabled={loading}>
                    <Image source={require('assets/images/social-media-logos/google_g.png')} style={styles.buttonLogo}/>
                    {loading ? (
                        <ActivityIndicator size="small" style={styles.buttonLoader}/>
                    ) : (
                        <Text style={styles.buttonText}>{i18n.t('login.google')}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.facebook]} onPress={async () => {
                    setLoading(true);
                    await googleOAuthHandler();
                }} disabled={true}>
                    <Image source={require('assets/images/social-media-logos/facebook_f_w.png')}
                           style={styles.buttonLogo}/>
                    <Text style={[styles.buttonText, styles.facebook]}>{i18n.t('login.facebook')}</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity style={[styles.button, styles.apple]} onPress={async () => {*/}
                {/*    setLoading(true);*/}
                {/*    await googleOAuthHandler();*/}
                {/*}} disabled={true}>*/}
                {/*    <Image source={require('assets/images/social-media-logos/apple_w.png')}*/}
                {/*           style={styles.buttonLogo}/>*/}
                {/*    <Text style={[styles.buttonText, styles.apple]}>Увійти через Apple</Text>*/}
                {/*</TouchableOpacity>*/}

                <Text style={styles.noAccount}>{i18n.t('no_account')}</Text>
                <Text style={styles.info}>{i18n.t('no_account_answer')}</Text>

                <TouchableOpacity onPress={() => Linking.openURL(i18n.t('politics_link'))}>
                    <Text style={styles.privacy}>{i18n.t('politics')}</Text>
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
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 30,
    },
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
    buttonLogo: {
        width: 40,
        height: 40,
        marginLeft: 15,
        marginRight: 15,
    },
    google: {
        backgroundColor: '#ffffff',
        color: '#fff'
    },
    facebook: {
        backgroundColor: '#4267B2',
        color: '#fff',
    },
    apple: {
        backgroundColor: '#000000',
        color: '#ffffff',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        alignItems: "center",
        marginLeft: 0
    },
    buttonLoader: {
        marginLeft: 50
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
