import { useAuth } from '@/hooks/useAuth'
import { getUserCoins, handleDailyReward } from '@/services/currencyService'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
	const router = useRouter()
	const { user, loading } = useAuth()

	useEffect(() => {
		if (!loading) {
			if (user) {
				getUserCoins(user.uid)
				handleDailyReward(user?.uid ?? '', 10)
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
