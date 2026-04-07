import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import { clsx } from "clsx";

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const AuthInput = ({ label, error, ...props }: AuthInputProps) => {
  return (
    <View className="auth-field">
      <Text className="auth-label">{label}</Text>
      <TextInput
        className={clsx("auth-input", error && "auth-input-error")}
        placeholderTextColor="#666666"
        {...props}
      />
      {error && <Text className="auth-error">{error}</Text>}
    </View>
  );
};

export default AuthInput;
