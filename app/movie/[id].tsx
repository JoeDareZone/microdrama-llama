import CurrencyBar from '@/components/CurrencyBar'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useAuth } from '@/context/AuthContext'
import { addUserCoins, spendUserCoins } from '@/services/currencyService'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { usePathStore } from '@/stores/usePathStore'
import { getStoryNode } from '@/stories/storyMap'
import { Colors } from '@/utils/constants'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated'

type Params = { id: string }

export default function MovieScreen() {
	const { id } = useLocalSearchParams<Params>()
	const { addToPath } = usePathStore()
	const router = useRouter()
	const [showOptions, setShowOptions] = useState(false)
	const canAfford = (cost: number) =>
		useCurrencyStore.getState().coins >= cost
	const user = useAuth().user

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

		if (cost) spendUserCoins(user?.uid ?? '', cost)

		setShowOptions(false)
		router.push(`/movie/${nextId}`)
	}

	useEffect(() => {
		if (!player) return

		const onEnd = () => {
			setShowOptions(true)
			if (storyNode.isEnd) {
				addUserCoins(user?.uid ?? '', 10)
			}
		}

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
											color={Colors.gold}
										/>
									</View>
								)}
							</Pressable>
						))}
					</View>
				) : showOptions && storyNode.isEnd ? (
					<View className='absolute bottom-12 left-0 right-0 p-6 w-full items-center justify-center'>
						<Text className='text-white text-3xl font-bold mb-4'>
							The End 🎬
						</Text>

						<Animated.View
							entering={FadeInDown.duration(600)}
							className={`bg-[${Colors.gold}] rounded-xl px-4 py-2 mb-6 flex-row items-center space-x-2 gap-x-1`}
						>
							<Animated.View entering={ZoomIn.duration(400)}>
								<IconSymbol
									name='dollarsign.circle'
									size={24}
									color={Colors.black}
								/>
							</Animated.View>
							<Text className='text-black text-base font-medium'>
								+10 Coins
							</Text>
						</Animated.View>

						<Pressable
							className='bg-white py-4 px-20 rounded-2xl shadow-lg'
							onPress={() => router.push('/')}
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
