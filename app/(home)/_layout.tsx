import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import { colors } from "@/constants/theme";
import { SubscriptionsProvider } from "@/lib/subscriptions-context";

export default function HomeLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <View style={{ flex: 1, backgroundColor: colors.background }} />;

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SubscriptionsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SubscriptionsProvider>
  );
}
