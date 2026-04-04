import "@/global.css"
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
 
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-xl font-bold text-success">
          Welcome to Nativewind!
        </Text>
        <Link href="/onBoarding" className='mt-4 w-full rounded bg-primary p-4 text-white'>Go to Onboarding</Link>
        <Link href="/(auth)/signIn" className='mt-4 w-full rounded bg-primary p-4 text-white'>Go to Sign In</Link>
        <Link href="/(auth)/signUp" className='mt-4 w-full rounded bg-primary p-4 text-white'>Go to Sign Up</Link>

        <Link href={{
          pathname: "/subscriptions/[id]",
          params: { id: "spotify" },
        }} className='mt-4 w-full rounded bg-primary p-4 text-white'>Spotify Subscriptions</Link>
        
        <Link href={{
          pathname: "/subscriptions/[id]",
          params: { id: "claude" },
        }} className='mt-4 w-full rounded bg-primary p-4 text-white'>claude Max Subscriptions</Link>
      </View>
    </SafeAreaView>
  );
}
