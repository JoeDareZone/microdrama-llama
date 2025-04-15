import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

SplashScreen.preventAutoHideAsync()

import SafeAreaWrapper from '@/components/SafeAreaWrapper'
import { StatusBar } from 'react-native'
import '../global.css'

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) return null

	return (
		<SafeAreaWrapper>
			<StatusBar
				barStyle='light-content'
				backgroundColor='black'
				translucent={false}
			/>
			<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='welcome' options={{ headerShown: false }} />
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen
					name='movie/[id]'
					options={{ headerShown: false }}
				/>
				<Stack.Screen name='+not-found' />
			</Stack>
		</SafeAreaWrapper>
	)
}
