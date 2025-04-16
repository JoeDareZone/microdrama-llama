import { Tabs } from 'expo-router'
import React from 'react'

import { IconSymbol } from '@/components/ui/IconSymbol'

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: 'black',
					borderTopWidth: 1,
					borderTopColor: '#222',
				},
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'gray',
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '500',
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name='house.fill' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='rewards'
				options={{
					title: 'Rewards',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name='star.fill' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name='person.fill'
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
