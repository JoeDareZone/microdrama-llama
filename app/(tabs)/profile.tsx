import { useAuth } from '@/context/AuthContext'
import { router } from 'expo-router'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function ProfileScreen() {
	const { signOut } = useAuth()

	const handleSignOut = async () => {
		await signOut()
		router.replace('/welcome')
	}

	return (
		<SafeAreaView className='flex-1 bg-black mt-12'>
			<View className='absolute top-4 right-4 z-10'>
				<TouchableOpacity onPress={handleSignOut}>
					<Text className='text-white text-lg font-semibold'>
						Sign Out
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}
