import { usePathStore } from '@/stores/usePathStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { getStoryNode } from '../stories/storyMap'

type Params = {
	id: string
}

export default function MovieScreen() {
	const { id } = useLocalSearchParams<Params>()
	const { addToPath } = usePathStore()
	const router = useRouter()
	const [showOptions, setShowOptions] = useState(false)

	useEffect(() => {
		if (id) addToPath(id)
	}, [id])

	const storyNode = getStoryNode(id)
	const player = useVideoPlayer(storyNode.videoUrl, player => player.play())

	const handleChoice = (nextId: string) => router.push(`/movie/${nextId}`)

	useEffect(() => {
		if (!player) return

		const onEnd = () => setShowOptions(true)

		player.addListener('playToEnd', onEnd)

		return () => {
			player.removeListener('playToEnd', onEnd)
		}
	}, [player])

	return (
		<View className='flex-1 bg-black justify-center items-center'>
			<View className='relative w-full h-full'>
				<VideoView
					style={{ height: '100%', width: '100%' }}
					player={player}
					allowsFullscreen
					allowsPictureInPicture
				/>

				{showOptions && storyNode.options.length > 0 ? (
					<View className='absolute bottom-12 left-0 right-0 p-6 gap-x-10 w-full flex-row justify-center'>
						<Pressable
							className='bg-white py-10 px-10 rounded-2xl items-center justify-center'
							onPress={() =>
								handleChoice(storyNode.options[0].nextId)
							}
						>
							<Text className='text-black text-lg font-semibold'>
								{storyNode.options[0].label}
							</Text>
						</Pressable>

						<Pressable
							className='bg-white py-10 px-10 rounded-2xl items-center justify-center'
							onPress={() =>
								handleChoice(storyNode.options[1].nextId)
							}
						>
							<Text className='text-black text-lg font-semibold'>
								{storyNode.options[1].label}
							</Text>
						</Pressable>
					</View>
				) : showOptions ? (
					<View className='absolute bottom-12 left-0 right-0 p-6 gap-x-10 w-full flex-row justify-center'>
						<Text className='text-white text-2xl font-bold text-center'>
							The End
						</Text>
						<Pressable
							className='bg-white py-4 px-8 rounded-xl mt-4'
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
