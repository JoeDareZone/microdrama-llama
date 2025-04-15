import CurrencyBar from '@/components/CurrencyBar'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { usePathStore } from '@/stores/usePathStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated'
import { getStoryNode } from '../stories/storyMap'
type Params = { id: string }

export default function MovieScreen() {
	const { id } = useLocalSearchParams<Params>()
	const { addToPath } = usePathStore()
	const router = useRouter()
	const [showOptions, setShowOptions] = useState(false)
	const spendCoins = useCurrencyStore(state => state.spendCoins)
	const addCoins = useCurrencyStore(state => state.addCoins)
	const canAfford = (cost: number) =>
		useCurrencyStore.getState().coins >= cost

	useEffect(() => {
		if (id) addToPath(id)
	}, [id])

	const storyNode = getStoryNode(id)
	const player = useVideoPlayer(storyNode.videoUrl, player => player.play())

	const handleChoice = (nextId: string, cost?: number) => {
		if (cost && !canAfford(cost)) {
			alert('Not enough coins!')
			return
		}

		if (cost) spendCoins(cost)

		setShowOptions(false)
		router.push(`/movie/${nextId}`)
	}

	const handleEndMovie = () => {
		addCoins(10)
		router.push('/')
	}

	useEffect(() => {
		if (!player) return
		const onEnd = () => setShowOptions(true)
		player.addListener('playToEnd', onEnd)

		return () => player.removeListener('playToEnd', onEnd)
	}, [player])

	return (
		<View className='flex-1 bg-black justify-center items-center'>
			<View className='relative w-full h-full'>
				<VideoView
					style={{ height: '100%', width: '100%' }}
					contentFit='fill'
					player={player}
				/>

				<CurrencyBar />

				{showOptions && storyNode.options.length > 0 ? (
					<View className='absolute bottom-12 left-0 right-0 p-6 gap-x-10 w-full flex-row justify-center'>
						{storyNode.options.map(option => (
							<Pressable
								key={option.label}
								className='bg-white py-10 px-10 rounded-2xl items-center justify-center'
								onPress={() =>
									handleChoice(option.nextId, option.cost)
								}
							>
								<Text className='text-black text-lg font-semibold'>
									{option.label}
								</Text>
								{option.cost && (
									<View className='flex-row items-center gap-x-2 mt-2'>
										<Text className='text-black text-sm font-semibold'>
											{option.cost}
										</Text>
										<IconSymbol
											name='dollarsign.circle'
											size={24}
											color='#FFD700'
										/>
									</View>
								)}
							</Pressable>
						))}
					</View>
				) : showOptions ? (
					<View className='absolute bottom-12 left-0 right-0 p-6 w-full items-center justify-center'>
						<Text className='text-white text-3xl font-bold mb-4'>
							The End 🎬
						</Text>

						<Animated.View
							entering={FadeInDown.duration(600)}
							className='bg-yellow-400 rounded-2xl px-6 py-4 mb-6 flex-row items-center space-x-3'
						>
							<Animated.View entering={ZoomIn.duration(400)}>
								<IconSymbol
									name='dollarsign.circle'
									size={28}
									color='#000'
								/>
							</Animated.View>
							<Text className='text-black text-xl font-semibold'>
								+10 Coins
							</Text>
						</Animated.View>

						<Pressable
							className='bg-white py-4 px-8 rounded-2xl shadow-lg'
							onPress={handleEndMovie}
						>
							<Text className='text-black text-lg font-semibold'>
								Start Over
							</Text>
						</Pressable>
					</View>
				) : null}
			</View>
		</View>
	)
}
