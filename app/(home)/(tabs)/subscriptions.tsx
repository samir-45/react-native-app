import SubscriptionCard from "@/components/SubscriptionCard";
import { colors } from "@/constants/theme";
import { useSubscriptions } from "@/lib/subscriptions-context";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Subscriptions = () => {
  const { subscriptions } = useSubscriptions();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    if (!normalizedQuery) return true;

    const searchableParts = [
      subscription.name,
      subscription.plan,
      subscription.category,
      subscription.status,
      subscription.billing,
    ];

    return searchableParts.some((value) => value?.toLowerCase().includes(normalizedQuery));
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 bg-background p-5">
        <FlatList
          data={filteredSubscriptions}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-30"
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListHeaderComponent={
            <View className="subscriptions-header">
              <Text className="subscriptions-title">Subscriptions</Text>
              <Text className="subscriptions-subtitle">
                Search through your active, paused, and cancelled plans.
              </Text>

              <View className="subscriptions-search-row">
                <View className="subscriptions-search-input-wrap">
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search by name, category, plan..."
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="subscriptions-search-input"
                  />
                </View>

                {searchQuery ? (
                  <Pressable onPress={() => setSearchQuery("")} className="subscriptions-clear-button">
                    <Text className="subscriptions-clear-text">Clear</Text>
                  </Pressable>
                ) : null}
              </View>

              <Text className="subscriptions-results">
                {filteredSubscriptions.length} subscription{filteredSubscriptions.length === 1 ? "" : "s"}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <SubscriptionCard
              {...item}
              expanded={expandedSubscriptionId === item.id}
              onPress={() =>
                setExpandedSubscriptionId((currentId) => (currentId === item.id ? null : item.id))
              }
            />
          )}
          extraData={expandedSubscriptionId}
          ListEmptyComponent={
            <View className="subscriptions-empty-state">
              <Text className="subscriptions-empty-title">No subscriptions found</Text>
              <Text className="subscriptions-empty-copy">
                Try a different keyword to find one of your saved subscriptions.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Subscriptions;
