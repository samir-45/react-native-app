import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import { colors } from "@/constants/theme";

export default function HomeLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <View style={{ flex: 1, backgroundColor: colors.background }} />;

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
