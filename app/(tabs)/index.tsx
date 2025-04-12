import {
	GoogleSignin,
	isSuccessResponse,
} from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function HomeScreen() {
	const [error, setError] = useState({})

	let statusCodes

	useEffect(() => {
		GoogleSignin.configure()
	}, [])

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const response = await GoogleSignin.signIn()
			if (isSuccessResponse(response)) {
				setError({ userInfo: response.data })
			} else {
				// sign in was cancelled by user
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<SafeAreaView>
			<Text className='text-right bg-red-600'>HEy</Text>
      <TouchableOpacity onPress={signIn}>
        <Text>Sign In!</Text>
      </TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
})
