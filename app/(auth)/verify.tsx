import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import RecurlyBrand from "@/components/auth/RecurlyBrand";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

const Verify = () => {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onVerifyPress = async () => {
    if (!signUp) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await signUp.verifications.verifyEmailCode({
        code,
      });

      if (error) {
        setError(error.longMessage || "Verification failed");
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl("/");
            router.replace(url as Href);
          },
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError("Invalid verification code.");
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
            <Text className="auth-title">Check your email</Text>
            <Text className="auth-subtitle">We&apos;ve sent a verification code to your inbox</Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              <AuthInput
                label="Verification Code"
                placeholder="Enter 6-digit code"
                keyboardType="numeric"
                value={code}
                onChangeText={setCode}
              />

              {error && <Text className="auth-error text-center mt-2">{error}</Text>}

              <AuthButton title="Verify account" onPress={onVerifyPress} loading={loading} />

              <TouchableOpacity
                onPress={() => signUp?.verifications.sendEmailCode()}
                className="mt-4 items-center"
              >
                <Text className="auth-link">Resend code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Verify;
