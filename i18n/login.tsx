import {I18n} from "i18n-js";
import {getLocales} from 'expo-localization';

export const login = new I18n({
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

login.defaultLocale = 'en';
login.locale = getLocales()[0].languageCode ?? 'en';
