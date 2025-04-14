import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ProfileScreen() {
	const { user, signOut } = useAuth()

	const handleSignOut = async () => {
		await signOut()
		router.replace('/welcome')
	}

	return (
		<View className='flex-1 bg-black'>
			<View className='absolute top-4 right-4 z-10'>
				<TouchableOpacity onPress={handleSignOut}>
					<Text className='text-white text-lg font-semibold'>
						Sign Out
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
