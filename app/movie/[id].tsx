import { useLocalSearchParams, useRouter } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

type Params = {
	id: string
}

export default function MovieScreen() {
	const { id } = useLocalSearchParams<Params>()
	const router = useRouter()

	const [showOptions, setShowOptions] = useState(false)

	// Video map — replace these with your actual URLs
	const videoMap: Record<string, string> = {
		'1': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		'2': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		'3': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
	}

	const currentVideo = videoMap[id] || videoMap['1']

	const videoSource = require('../../assets/videos/work.mp4')

	const player = useVideoPlayer(videoSource, player => {
		player.play()
	})

	useEffect(() => {
		if (!player) return

		const onEnd = () => {
			setShowOptions(true)
		}

		player.addListener('playToEnd', onEnd)

		return () => {
			player.removeListener('playToEnd', onEnd)
		}
	}, [player])

	const handleChoice = (nextId: string) => {
		router.push(`/movie/${nextId}`)
	}

	return (
		<View className='flex-1 bg-black justify-center items-center'>
			<View className='relative w-full h-full'>
				<VideoView
					style={{ height: '100%', width: '100%' }}
					player={player}
					allowsFullscreen
					allowsPictureInPicture
				/>

				{showOptions && (
					<View className='absolute bottom-12 left-0 right-0 p-6 gap-x-10 w-full flex-row justify-center'>
						<Pressable
							className='bg-white py-10 px-16 rounded-2xl items-center'
							onPress={() => handleChoice('2')}
						>
							<Text className='text-black text-lg font-semibold'>
								Option A
							</Text>
						</Pressable>

						<Pressable
							className='bg-white py-10 px-16 rounded-2xl items-center'
							onPress={() => handleChoice('3')}
						>
							<Text className='text-black text-lg font-semibold'>
								Option B
							</Text>
						</Pressable>
					</View>
				)}
			</View>
		</View>
	)
}
