import { useAuth } from '@/hooks/useAuth'
import { getUserCoins } from '@/services/currencyService'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, LogBox, View } from 'react-native'

declare global {
	var RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS: boolean
}

export default function Index() {
	const router = useRouter()
	const { user, loading } = useAuth()

	globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true

	LogBox.ignoreLogs([
		'AudioSessionGetProperty',
		'AVKit',
		'VisionKitCore',
		'TranslationUI',
	])

	useEffect(() => {
		if (!loading) {
			if (user) {
				getUserCoins(user.uid)
				router.replace('/(tabs)')
			} else {
				router.replace('/welcome')
			}
		}
	}, [user, loading])

	if (loading) {
		return (
			<View className='flex-1 justify-center items-center'>
				<ActivityIndicator size='large' />
			</View>
		)
	}

	return null
}
