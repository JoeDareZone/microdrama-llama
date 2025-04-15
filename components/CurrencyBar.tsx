import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { IconSymbol } from './ui/IconSymbol'

export default function CurrencyBar() {
	const coins = useCurrencyStore(state => state.coins)
	const spendCoins = useCurrencyStore(state => state.spendCoins)

	return (
		<TouchableOpacity
			className='absolute top-0 right-0 flex-row mr-4 mt-4'
			onPress={() => router.push('/profile')}
		>
			<View className='flex-row items-center bg-black/80 rounded-full border border-yellow-500'>
				<IconSymbol
					name='dollarsign.circle'
					size={24}
					color='#FFD700'
				/>
				<Text className='text-white font-bold text-lg'>{coins}</Text>
			</View>
		</TouchableOpacity>
	)
}
