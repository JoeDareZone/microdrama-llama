import { useEvent } from 'expo'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect, useState } from 'react'
import { Button, Pressable, Text, View } from 'react-native'

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

	const videoSource =
		'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

	const player = useVideoPlayer(videoSource, player => {
		player.play()
	})

	// Listen for video end
	useEvent(player, 'playToEnd')

	// Add an effect to watch   for status changes to detect end of playback
	useEffect(() => {
		const checkStatus = () => {
			// Check if video has finished
			if (
				player &&
				player.currentTime >= player.duration &&
				player.duration > 0
			) {
				setShowOptions(true)
			}
		}

		// Set up interval to check video status
		const intervalId = setInterval(checkStatus, 1000)
		return () => clearInterval(intervalId)
	}, [player])

	const { isPlaying } = useEvent(player, 'playingChange', {
		isPlaying: player.playing,
	})

	const handleChoice = (nextId: string) => {
		router.push(`/movie/${nextId}`)
	}

	return (
		<View className='flex-1 bg-black justify-center items-center'>
			<VideoView
				style={{ height: '100%', width: '100%' }}
				player={player}
				allowsFullscreen
				allowsPictureInPicture
			/>
			<View className='p-6 space-y-4 w-full'>
				<Button
					title={isPlaying ? 'Pause' : 'Play'}
					onPress={() => {
						if (isPlaying) {
							player.pause()
						} else {
							player.play()
						}
					}}
				/>
			</View>
			{showOptions && (
				<View className='p-6 space-y-4 w-full'>
					<Pressable
						className='bg-white py-4 rounded-2xl items-center'
						onPress={() => handleChoice('2')}
					>
						<Text className='text-black text-lg font-semibold'>
							Option A
						</Text>
					</Pressable>

					<Pressable
						className='bg-white py-4 rounded-2xl items-center'
						onPress={() => handleChoice('3')}
					>
						<Text className='text-black text-lg font-semibold'>
							Option B
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	)
}
