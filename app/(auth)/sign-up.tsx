import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import RecurlyBrand from "@/components/auth/RecurlyBrand";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

const SignUp = () => {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignUpPress = async () => {
    if (!signUp) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await signUp.password({
        emailAddress,
        password,
      });

      if (error) {
          setError(error.longMessage || "Sign up failed. Please check your email and password.");
          return;
      }

      await signUp.verifications.sendEmailCode();
      router.push("/(auth)/verify");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const clerkError = err?.errors?.[0]?.longMessage;
      setError(clerkError || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="auth-safe-area">
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        className="auth-scroll"
        showsVerticalScrollIndicator={false}
      >
        <View className="auth-content justify-center py-10">
          <RecurlyBrand />

          <View className="auth-brand-block mt-8">
            <Text className="auth-title">Create account</Text>
            <Text className="auth-subtitle">Start tracking your smart billing today</Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              <AuthInput
                label="Email"
                placeholder="Enter your email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={emailAddress}
                onChangeText={setEmailAddress}
              />

              <AuthInput
                label="Password"
                placeholder="Create a strong password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {error && <Text className="auth-error text-center mt-2">{error}</Text>}

              <AuthButton title="Get started" onPress={onSignUpPress} loading={loading} />

              <View className="auth-link-row">
                <Text className="auth-link-copy">Already have an account?</Text>
                <Link href="/(auth)/sign-in" asChild>
                  <TouchableOpacity>
                    <Text className="auth-link">Sign in</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
