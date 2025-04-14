import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
	const { user, signOut } = useAuth()

	const handleSignOut = async () => {
		await signOut()
		router.replace('/welcome')
	}

	return (
		<SafeAreaView>
			<Text className='text-right bg-red-600'>HEy</Text>
			<TouchableOpacity
				onPress={handleSignOut}
				className='bg-red-600 p-4'
			>
				<Text>Sign Out!</Text>
			</TouchableOpacity>
			<View className='p-4'>
				<Text>{user?.user.email}</Text>
				<Text>{user?.user.name}</Text>
				<Text>{user?.user.photo}</Text>
			</View>
			<View>
				{user ? (
					<Text>User is signed in</Text>
				) : (
					<Text>User is not signed in</Text>
				)}
			</View>
		</SafeAreaView>
	)
}
