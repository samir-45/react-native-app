import { icons } from "@/constants/icons";
import dayjs from "dayjs";
import { clsx } from "clsx";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateSubscription: (subscription: Subscription) => void;
}

type BillingFrequency = "Monthly" | "Yearly";

const CATEGORY_OPTIONS = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

const CATEGORY_COLORS: Record<(typeof CATEGORY_OPTIONS)[number], string> = {
  Entertainment: "#f5c542",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#b8e8d0",
  Productivity: "#ffd8a8",
  Cloud: "#c6dafc",
  Music: "#f6c4d8",
  Other: "#ddd6c5",
};

const DEFAULT_CATEGORY = "Entertainment";

const CreateSubscriptionModal = ({
  visible,
  onClose,
  onCreateSubscription,
}: CreateSubscriptionModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<BillingFrequency>("Monthly");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>(DEFAULT_CATEGORY);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  const parsedPrice = useMemo(() => Number(price), [price]);
  const canSubmit = name.trim().length > 0 && Number.isFinite(parsedPrice) && parsedPrice > 0;

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory(DEFAULT_CATEGORY);
    setNameError("");
    setPriceError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const nextNameError = trimmedName ? "" : "Name is required";
    const nextPriceError =
      Number.isFinite(parsedPrice) && parsedPrice > 0 ? "" : "Enter a valid positive price";

    setNameError(nextNameError);
    setPriceError(nextPriceError);

    if (nextNameError || nextPriceError) {
      return;
    }

    const startDate = dayjs();
    const renewalDate =
      frequency === "Yearly" ? startDate.add(1, "year") : startDate.add(1, "month");

    const newSubscription: Subscription = {
      id: `${trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: trimmedName,
      price: parsedPrice,
      currency: "USD",
      frequency,
      category,
      status: "active",
      startDate: startDate.toISOString(),
      renewalDate: renewalDate.toISOString(),
      icon: icons.wallet,
      billing: frequency,
      color: CATEGORY_COLORS[category],
    };

    onCreateSubscription(newSubscription);
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="modal-overlay">
          <Pressable className="flex-1" onPress={handleClose} />

          <View className="modal-container">
            <View className="modal-header">
              <Text className="modal-title">New Subscription</Text>

              <Pressable onPress={handleClose} className="modal-close">
                <Text className="modal-close-text">x</Text>
              </Pressable>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View className="modal-body">
                <View className="auth-field">
                  <Text className="auth-label">Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={(value) => {
                      setName(value);
                      if (nameError && value.trim()) setNameError("");
                    }}
                    placeholder="Netflix"
                    placeholderTextColor="#666666"
                    autoCapitalize="words"
                    className={clsx("auth-input", nameError && "auth-input-error")}
                  />
                  {nameError ? <Text className="auth-error">{nameError}</Text> : null}
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Price</Text>
                  <TextInput
                    value={price}
                    onChangeText={(value) => {
                      setPrice(value);
                      if (priceError && Number(value) > 0) setPriceError("");
                    }}
                    placeholder="9.99"
                    placeholderTextColor="#666666"
                    keyboardType="decimal-pad"
                    className={clsx("auth-input", priceError && "auth-input-error")}
                  />
                  {priceError ? <Text className="auth-error">{priceError}</Text> : null}
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Frequency</Text>
                  <View className="picker-row">
                    {(["Monthly", "Yearly"] as BillingFrequency[]).map((option) => {
                      const isActive = frequency === option;

                      return (
                        <Pressable
                          key={option}
                          onPress={() => setFrequency(option)}
                          className={clsx("picker-option", isActive && "picker-option-active")}
                        >
                          <Text
                            className={clsx(
                              "picker-option-text",
                              isActive && "picker-option-text-active"
                            )}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Category</Text>
                  <View className="category-scroll">
                    {CATEGORY_OPTIONS.map((option) => {
                      const isActive = category === option;

                      return (
                        <Pressable
                          key={option}
                          onPress={() => setCategory(option)}
                          className={clsx("category-chip", isActive && "category-chip-active")}
                        >
                          <Text
                            className={clsx(
                              "category-chip-text",
                              isActive && "category-chip-text-active"
                            )}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <Pressable
                  onPress={handleSubmit}
                  className={clsx("auth-button", !canSubmit && "auth-button-disabled")}
                >
                  <Text className="auth-button-text">Create Subscription</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateSubscriptionModal;
