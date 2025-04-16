// SafeAreaWrapper.tsx
import React, { ReactNode } from 'react'
import { Platform, SafeAreaView, StyleSheet } from 'react-native'

interface SafeAreaWrapperProps {
	children: ReactNode
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children }) => {
	return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: 'black',
		paddingTop: Platform.OS === 'android' ? 25 : 0,
	},
})

export default SafeAreaWrapper
