import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { Colors } from '@/utils/constants'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { IconSymbol } from './ui/IconSymbol'

export default function CurrencyBar() {
	const coins = useCurrencyStore(state => state.coins)

	return (
		<View className=''>
			<TouchableOpacity
				className='flex-row items-center bg-black/80 rounded-full border border-yellow-500 p-3'
				onPress={() => router.push('/profile')}
			>
				<IconSymbol
					name='dollarsign.circle'
					size={24}
					color={Colors.gold}
				/>
				<Text className='text-white font-bold text-lg'>{coins}</Text>
			</TouchableOpacity>
		</View>
	)
}
