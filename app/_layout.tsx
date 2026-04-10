import { ClerkProvider, useAuth } from "@clerk/expo";
import * as SecureStore from "expo-secure-store";
import { SplashScreen, Stack } from "expo-router";
import { Linking, Pressable, Text, View } from "react-native";

import '@/global.css';
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(home)",
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const hasValidPublishableKey =
  typeof publishableKey === "string" &&
  /^pk_(test|live)_/.test(publishableKey) &&
  !publishableKey.includes("REPLACE_ME") &&
  !publishableKey.includes("REPLACE_WITH");

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
};

function InitialLayout() {
  const { isLoaded } = useAuth();
  const [fontsLoaded] = useFonts({
    'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf')
  })

  useEffect(() => {
    if (fontsLoaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoaded])

  if(!fontsLoaded || !isLoaded) {
    return null
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

function ClerkConfigScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-950 px-6">
      <View className="w-full max-w-md rounded-3xl bg-neutral-900 p-6">
        <Text className="text-2xl font-['sans-bold'] text-white">
          Clerk key missing
        </Text>
        <Text className="mt-3 text-base leading-6 text-neutral-300">
          Add a real Clerk publishable key to{" "}
          <Text className="font-['sans-semibold'] text-white">.env</Text> as{" "}
          <Text className="font-['sans-semibold'] text-white">
            EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
          </Text>
          .
        </Text>
        <Text className="mt-3 text-sm leading-6 text-neutral-400">
          The current value is still a placeholder, so authentication is
          disabled until you replace it with a key from the Clerk dashboard.
        </Text>

        <Pressable
          className="mt-6 rounded-2xl bg-rose-500 px-4 py-4"
          onPress={() => Linking.openURL("https://dashboard.clerk.com/last-active?path=api-keys")}
        >
          <Text className="text-center font-['sans-semibold'] text-white">
            Open Clerk API keys
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function RootLayout() {
  if (!hasValidPublishableKey) {
    return <ClerkConfigScreen />;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
