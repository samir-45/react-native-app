import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React from "react";
import { clsx } from "clsx";

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const AuthButton = ({ title, onPress, loading, disabled }: AuthButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={loading || disabled}
      className={clsx("auth-button", (loading || disabled) && "auth-button-disabled")}
    >
      {loading ? (
        <ActivityIndicator color="#081126" />
      ) : (
        <Text className="auth-button-text">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AuthButton;
