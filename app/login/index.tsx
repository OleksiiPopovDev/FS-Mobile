import React, {useState} from 'react';
import {Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import GoogleAuthButton from "@/app/login/google-auth-button";
import {login} from "@/i18n/login";
import {getLocales} from "expo-localization";
import axios from "axios";


export default function Login() {
    const [locale, setLocale] = useState(getLocales()[0].languageCode ?? 'en');
    const [userInfo, setUserInfo] = useState(null);

    login.locale = locale;

    const handleToken = async (token: string) => {
        console.log("Отримано токен від дочірнього компонента:", token);
        const apiResponse = await axios.get('http://127.0.0.48/api/user/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setUserInfo(apiResponse.data.data);
        console.log(userInfo);
    };

    return (
        <ImageBackground
            source={require('assets/images/dark-material-bg.jpg')}
            style={[styles.background, StyleSheet.absoluteFill]}
            resizeMode="cover"
        >
            <View style={[styles.container]}>
                <Image source={require('assets/images/FS-logo-d.png')} style={styles.logo}/>

                <GoogleAuthButton onToken={handleToken}/>

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
