import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity } from 'react-native'

export default function WelcomeScreen() {
	const { user, signIn } = useAuth()
	const router = useRouter()

	// This effect will trigger when 'user' state changes
	useEffect(() => {
		if (user) {
			// If a user is logged in, redirect to the tabs
			router.replace('/(tabs)')
		}
	}, [user, router]) // Depend on user state for re-run

	const handleSignIn = async () => {
		// Sign-in and update user state
		await signIn()
	}

	return (
		<SafeAreaView className='flex-1 bg-white justify-center items-center px-6'>
			<Image
				source={require('../assets/images/logo.png')}
				className='w-40 h-40 mb-6'
				resizeMode='contain'
			/>
			<Text className='text-4xl font-extrabold text-center text-black mb-2'>
				Micro Drama Llama
			</Text>
			<Text className='text-lg text-gray-600 text-center mb-10'>
				Tiny dramas. Big choices.
			</Text>

			<TouchableOpacity
				onPress={handleSignIn}
				className='bg-black rounded-xl px-6 py-3'
			>
				<Text className='text-white text-lg font-medium'>
					Sign in with Google
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
