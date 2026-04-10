import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import RecurlyBrand from "@/components/auth/RecurlyBrand";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

const SignIn = () => {
  const { signIn } = useSignIn();
  const router = useRouter();
  const homeRoute = "/(home)/(tabs)";

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignInPress = async () => {
    if (!signIn) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn.password({
        identifier: emailAddress,
        password,
      });

      if (error) {
        setError(error.longMessage || "Sign in failed");
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ decorateUrl }) => {
            decorateUrl(homeRoute);
            router.replace(homeRoute as Href);
          },
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError("An error occurred during sign in.");
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
          {/* Logo & Brand */}
          <RecurlyBrand />

          <View className="auth-brand-block mt-8">
            <Text className="auth-title">Welcome back</Text>
            <Text className="auth-subtitle">Sign in to continue managing your subscriptions</Text>
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
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {error && <Text className="auth-error text-center mt-2">{error}</Text>}

              <AuthButton title="Sign in" onPress={onSignInPress} loading={loading} />

              <View className="auth-link-row">
                <Text className="auth-link-copy">New to Recurly?</Text>
                <Link href="/(auth)/sign-up" asChild>
                  <TouchableOpacity>
                    <Text className="auth-link">Create an account</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
