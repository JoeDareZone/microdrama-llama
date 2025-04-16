import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function WelcomeScreen() {
	const { user, signIn } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (user) {
			router.replace('/(tabs)')
		}
	}, [user, router])

	const handleSignIn = async () => {
		await signIn()
	}

	return (
		<View className='flex-1 bg-black justify-center items-center px-6'>
			<Image
				source={require('../assets/images/logo.png')}
				className='w-40 h-40 mb-6'
				resizeMode='contain'
			/>
			<Text className='text-4xl font-extrabold text-center text-white mb-2'>
				Micro Drama Llama
			</Text>
			<Text className='text-lg text-gray-400 text-center mb-10'>
				Tiny dramas. Big choices.
			</Text>

			<TouchableOpacity
				onPress={handleSignIn}
				className='bg-white rounded-xl px-6 py-3'
			>
				<Text className='text-black text-lg font-medium'>
					Sign in with Google
				</Text>
			</TouchableOpacity>
		</View>
	)
}
