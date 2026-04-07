import { View, Text } from "react-native";
import React from "react";

const RecurlyBrand = () => {
  return (
    <View className="auth-brand-block">
      <View className="auth-logo-wrap">
        <View className="auth-logo-mark">
          <Text className="auth-logo-mark-text">R</Text>
        </View>
        <View>
          <Text className="auth-wordmark">Recurly</Text>
          <Text className="auth-wordmark-sub">SMART BILLING</Text>
        </View>
      </View>
    </View>
  );
};

export default RecurlyBrand;
