import {
	GoogleSignin,
	isSuccessResponse,
	User,
} from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
	const [error, setError] = useState({})
	const [user, setUser] = useState<User | null>(null)
	let statusCodes

	useEffect(() => {
		GoogleSignin.configure()
	}, [])

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const response = await GoogleSignin.signIn()
			if (isSuccessResponse(response)) {
				setUser(response.data)
			} else {
				console.log('sign in was cancelled by user')
				// sign in was cancelled by user
			}
		} catch (error) {
			console.log(error)
		}
	}

	const signOut = async () => {
		try {
			await GoogleSignin.signOut()
			setUser(null)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<SafeAreaView>
			<Text className='text-right bg-red-600'>HEy</Text>
			<TouchableOpacity onPress={signIn} className='bg-green-600 p-4'>
				<Text>Sign In!</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={signOut} className='bg-red-600 p-4'>
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
