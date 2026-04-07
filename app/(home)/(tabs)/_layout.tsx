import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import { Image, View } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

const TabLayout = () => {

    const insets = useSafeAreaInsets();


    const TabIcon = ({ icon, focused }: TabIconProps) => {
        return (
            <View
                style={{
                    width: tabBar.iconFrame,
                    height: tabBar.iconFrame,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        width: tabBar.iconFrame,
                        height: tabBar.iconFrame,
                        borderRadius: tabBar.iconFrame / 2,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: focused ? colors.accent : "transparent",
                    }}
                >
                    <Image
                        source={icon}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                    />
                </View>
            </View>
        );
    };

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                    height: tabBar.height,
                    marginHorizontal: tabBar.horizontalInset,
                    borderRadius: tabBar.radius,
                    backgroundColor: colors.primary,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarItemStyle: {
                    paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
                },
                tabBarIconStyle: {
                    width: tabBar.iconFrame,
                    height: tabBar.iconFrame,
                    alignItems: "center",
                },
        }}>
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon icon={tab.icon} focused={focused} />
                        ),
                    }}
                />
            ))}

            <Tabs.Screen
                name="subscriptions/[id]"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
