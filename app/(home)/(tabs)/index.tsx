import "@/global.css"
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { FlatList, Image, Text, View } from "react-native";
import { useUser } from "@clerk/expo";
import images from "@/constants/images";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";

export default function App() {
  const { user } = useUser();
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 bg-background p-5">


        {/* <View className="flex-1"> */}


        <FlatList
          ListHeaderComponent={() => (
            <>
              {/* Home Header */}
              <View className="home-header">
                <View className="home-user">
                  <Image source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar} className="home-avatar"></Image>
                  <Text className="home-user-name">{user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || HOME_USER.name}</Text>
                </View>
                <Image source={icons.add} className="home-add-icon"></Image>
              </View>

              {/* Home Balance Card */}
              <View className="home-balance-card">
                <Text className="home-balance-label">Balance</Text>
                <View className="home-balance-row">
                  <Text className="home-balance-amount">{formatCurrency(HOME_BALANCE.amount)}</Text>
                  <Text className="home-balance-date">{dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}</Text>
                </View>
              </View>

              <View className="mb-2">
                <ListHeading title="Upcoming Subscriptions"></ListHeading>
                {/* <UpcomingSubscriptionCard data={UPCOMING_SUBSCRIPTIONS[0]}></UpcomingSubscriptionCard> */}
                <FlatList
                  data={UPCOMING_SUBSCRIPTIONS}
                  renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
                  keyExtractor={(item) => item.name}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={<Text className="home-empty-state">No Upcoming Renewals Yet</Text>}
                />
              </View>

              <ListHeading title="All Subscriptions"></ListHeading>
            </>
          )}
          data={HOME_SUBSCRIPTIONS}
          renderItem={({ item }) => (
            <SubscriptionCard
              {...item}
              expanded={expandedSubscriptionId === item.id}
              onPress={() => setExpandedSubscriptionId((currentId) => currentId === item.id ? null : item.id)}
            />
          )}
          extraData={expandedSubscriptionId}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-4"></View>}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text className="home-empty-state">No Subscriptions Yet</Text>}
          contentContainerClassName="pb-30"
        />
        {/* </View> */}

      </View>
    </SafeAreaView>
  );
}
