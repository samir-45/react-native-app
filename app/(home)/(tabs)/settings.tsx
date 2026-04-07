import { useClerk, useUser } from '@clerk/expo'
import { Ionicons } from '@expo/vector-icons'
import { styled } from 'nativewind'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

const SafeAreaView = styled(RNSafeAreaView)

const SettingRow = ({ icon, title, value, onPress, isLast = false, color = "text-primary" }: any) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-border/50' : ''}`}
  >
    <View className="flex-row items-center gap-3">
      <View className="size-10 items-center justify-center rounded-xl bg-accent/10">
        {icon}
      </View>
      <Text className={`text-base font-sans-semibold ${color}`}>{title}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      {value && <Text className="text-sm font-sans-medium text-muted-foreground">{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color="#081126" opacity={0.3} />
    </View>
  </TouchableOpacity>
)

const Settings = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const userEmail = user?.emailAddresses[0].emailAddress;
  const userName = user?.fullName || user?.firstName || 'User';

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4 pb-8">
          <Text className="text-4xl font-sans-extrabold text-primary">Settings</Text>
          
          {/* Profile Header */}
          <View className="mt-8 flex-row items-center gap-4 bg-card p-5 rounded-3xl border border-border">
            <Image 
              source={{ uri: user?.imageUrl }} 
              className="size-20 rounded-2xl bg-muted"
            />
            <View className="flex-1">
              <Text className="text-2xl font-sans-bold text-primary" numberOfLines={1}>{userName}</Text>
              <Text className="text-sm font-sans-medium text-muted-foreground mt-0.5" numberOfLines={1}>{userEmail}</Text>
              <TouchableOpacity className="mt-2.5 bg-accent/10 self-start px-3 py-1 rounded-full border border-accent/20">
                <Text className="text-xs font-sans-bold text-accent">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Section */}
          <View className="mt-8">
            <Text className="text-xs font-sans-extrabold text-muted-foreground uppercase tracking-[1.5px] mb-3 ml-1">Account</Text>
            <View className="bg-card rounded-3xl border border-border px-5">
              <SettingRow 
                icon={<Ionicons name="card-outline" size={20} color="#ea7a53" />} 
                title="Subscription" 
                value="Premium Plan"
                onPress={() => {}}
              />
              <SettingRow 
                icon={<Ionicons name="receipt-outline" size={20} color="#ea7a53" />} 
                title="Billing History" 
                onPress={() => {}}
              />
              <SettingRow 
                icon={<Ionicons name="notifications-outline" size={20} color="#ea7a53" />} 
                title="Notifications" 
                onPress={() => {}}
                isLast
              />
            </View>
          </View>

          {/* Preferences Section */}
          <View className="mt-8">
            <Text className="text-xs font-sans-extrabold text-muted-foreground uppercase tracking-[1.5px] mb-3 ml-1">General</Text>
            <View className="bg-card rounded-3xl border border-border px-5">
              <SettingRow 
                icon={<Ionicons name="color-palette-outline" size={20} color="#ea7a53" />} 
                title="Theme" 
                value="System Default"
                onPress={() => {}}
              />
              <SettingRow 
                icon={<Ionicons name="shield-checkmark-outline" size={20} color="#ea7a53" />} 
                title="Security" 
                onPress={() => {}}
              />
              <SettingRow 
                icon={<Ionicons name="language-outline" size={20} color="#ea7a53" />} 
                title="Language" 
                value="English"
                onPress={() => {}}
                isLast
              />
            </View>
          </View>

          {/* Support Section */}
          <View className="mt-8">
            <Text className="text-xs font-sans-extrabold text-muted-foreground uppercase tracking-[1.5px] mb-3 ml-1">Support</Text>
            <View className="bg-card rounded-3xl border border-border px-5">
              <SettingRow 
                icon={<Ionicons name="help-buoy-outline" size={20} color="#ea7a53" />} 
                title="Help Center" 
                onPress={() => {}}
              />
              <SettingRow 
                icon={<Ionicons name="information-circle-outline" size={20} color="#ea7a53" />} 
                title="Terms & Privacy" 
                onPress={() => {}}
                isLast
              />
            </View>
          </View>

          {/* Sign Out Section */}
          <View className="mt-10">
             <TouchableOpacity 
              onPress={() => signOut()}
              className="flex-row items-center justify-center gap-3 bg-card border border-destructive/20 py-5 rounded-3xl"
            >
              <Ionicons name="log-out-outline" size={22} color="#dc2626" />
              <Text className="text-lg font-sans-bold text-destructive">Sign Out</Text>
            </TouchableOpacity>
            
            <Text className="text-center text-xs font-sans-medium text-muted-foreground mt-6">
              Version 1.0.4 (Build 42)
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings;