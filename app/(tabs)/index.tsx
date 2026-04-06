import "@/global.css"
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { FlatList, Image, Text, View } from "react-native";
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

  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 bg-background p-5">
        {/* Home Header */}
        <View className="home-header">
          <View className="home-user">
            <Image source={images.avatar} className="home-avatar"></Image>
            <Text className="home-user-name">{HOME_USER.name}</Text>
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

        <View>
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

        <View>
          <ListHeading title="All Subscriptions"></ListHeading>
          <SubscriptionCard
            {...HOME_SUBSCRIPTIONS[0]}
            expanded={expandedSubscriptionId === HOME_SUBSCRIPTIONS[0].id}
            onPress={() => setExpandedSubscriptionId((currentId) => currentId === HOME_SUBSCRIPTIONS[0].id ? null : HOME_SUBSCRIPTIONS[0].id)}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}
