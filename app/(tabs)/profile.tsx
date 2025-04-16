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
		<SafeAreaView className='flex-1 bg-black justify-center items-center'>
			<View className='w-full px-6'>
				<TouchableOpacity
					onPress={handleSignOut}
					className='bg-white p-4 rounded-lg shadow-lg'
				>
					<Text className='text-black text-2xl font-bold text-center'>
						Sign Out
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}
