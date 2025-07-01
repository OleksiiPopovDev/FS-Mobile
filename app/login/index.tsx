import React, {useState} from 'react';
import {Button, Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import GoogleAuthButton from "@/app/login/google-auth-button";
import {login} from "@/i18n/login";
import {getLocales} from "expo-localization";
import axios from "axios";
import {UserRepository} from "@/app/database/repository/user.repository";
import User from "@/app/database/model/users.model";
import * as FileSystem from 'expo-file-system';


export default function Login() {
    const [locale, setLocale] = useState(getLocales()[0].languageCode ?? 'en');
    const [userInfo, setUserInfo] = useState(null);

    login.locale = locale;

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
        console.log("Отримано токен від дочірнього компонента:", token);
        const apiResponse = await axios.get('http://127.0.0.48/api/user/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(apiResponse.data.data);
        const userRepository = new UserRepository();
        await userRepository.createUser({
            token: token,
            userId: apiResponse.data.data.id ?? 0,
            email: apiResponse.data.data.email,
            firstName: apiResponse.data.data.first_name,
            lastName: apiResponse.data.data.last_name,
            gender: apiResponse.data.data.gender,
            birthday: apiResponse.data.data.birthday,
        } as User)

        const users = await userRepository.getAllUsers();

        console.log(users.length);
        users.forEach((user: User) => {
            console.log(user);
        })
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
                <Button title="Reset DB" onPress={resetDatabase}/>
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
