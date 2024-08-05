import 'dotenv/config';
import { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = process.env.APP_ENV || 'development';
  const envFile = `.env.${env}`;
  require('dotenv').config({ path: envFile });

  return {
    ...config,
    name: "House Stock",
    slug: "house-stock-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nicolas.housestockfrontend"
    },
    android: {
      package: "com.nicolas.housestockfrontend",
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "INTERNET"
      ],
      intentFilters: [
        {
          action: "VIEW",
          category: [
            "BROWSABLE",
            "DEFAULT"
          ],
          data: [
            {
              scheme: "housestockfrontend"
            },
            {
              scheme: "com.nicolas.housestockfrontend"
            },
            {
              scheme: "exp+house-stock-frontend"
            }
          ]
        }
      ]
    },
    web: {
      favicon: "./src/assets/favicon.png"
    },
    plugins: [
      "expo-secure-store",
      "expo-router",
      "expo-dev-client",
      ["expo-build-properties", {
        "android": {
          "usesCleartextTraffic": true
        },
        "ios": {}
      }]
    ],
    scheme: "housestockfrontend",
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      eas: {
        projectId: "bb18d40d-f826-45eb-9d05-08cacf67ef19"
      },
      // agrega aquí otras variables de entorno que necesites
    }
  };
};
