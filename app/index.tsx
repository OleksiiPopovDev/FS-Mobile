import React, {useEffect} from "react";
import Gradient from "../assets/Icons/Gradient";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import {Button, ButtonText} from "@/components/ui/button";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {makeRedirectUri} from "expo-auth-session";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '24231477460-tjd33be9s06vauu53jpmuq1mj4e3jd8b.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: makeRedirectUri(),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      (async () => {
        try {
          // Приклад: надсилаємо accessToken на бекенд для обробки (можна змінити URL та формат запиту)
          const res = await axios.post('https://api.fitness-server.local.com/api/social/callback/google', {
            provider: 'google',
            access_token: authentication?.accessToken,
          });
          // Зберігаємо виданий бекендом токен (якщо він повертається)
          await AsyncStorage.setItem('authToken', res.data.token);
          // Тут можна виконати навігацію до головного екрана застосунку
          // Наприклад: router.push('/home') або інша логіка
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [response]);

  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box className="absolute h-[500px] w-[500px] lg:w-[700px] lg:h-[700px]">
          <Gradient />
        </Box>
        <Box className="flex flex-1 items-center my-16 mx-5 lg:my-24 lg:mx-32">
          <Box className="gap-10 base:flex-col sm:flex-row justify-between sm:w-[80%] md:flex-1">
            <Button
                onPress={() => promptAsync({ useProxy: true })}
                disabled={!request}
            >
              <ButtonText>Авторизуватися через Google</ButtonText>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
