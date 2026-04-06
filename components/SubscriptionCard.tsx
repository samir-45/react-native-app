import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { formatCurrency, formatSubscriptionDateTime } from '@/lib/utils'
import { clsx } from 'clsx'

const SubscriptionCard = ({name, price, currency, billing, icon, color, category, plan, renewalDate, onPress, expanded, paymentMethod}: SubscriptionCardProps) => {
  return (
    <Pressable onPress={onPress} className={clsx('sub-card',expanded? 'sub-card-expanded' : 'bg-card')} style={ !expanded && color? {backgroundColor: color} : undefined}>
      <View className='sub-head'>
        <View className='sub-main'>
            <Image source={icon} className='sub-icon'></Image>
            <View className='sub-copy'>
                <Text className='sub-title' numberOfLines={1}>{name}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' className='sub-meta'>
                    {category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}
                </Text>
            </View>
        </View>
        <View className='sub-price-box'>
            <Text className='sub-price'>{formatCurrency(price, currency)}</Text>
            <Text className='sub-billing'>{billing}</Text>
        </View>
      </View>

      {expanded && (
        <View className='sub-bdy'>
            <View className='sub-details'>
                <View className='sub-row'>
                    <View className='sub-row-copy'>
                        <Text className='sub-lable'>Payment:</Text>
                        <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>{paymentMethod?.trim() || 'Not specified'}</Text>
                    </View>
                </View>
            </View>
        </View>
      )}


    </Pressable>
  )
}

export default SubscriptionCard