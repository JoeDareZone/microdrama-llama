import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function RewardsTab() {
	const [userData, setUserData] = useState<any>(null)
	const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false)
	const [rewardCoins, setRewardCoins] = useState(10)
	const user = useAuth().user
	

	return (
		<ScrollView className='bg-black px-6 py-4'>
			<Text className='text-white text-3xl font-semibold mb-4'>
				Rewards
			</Text>

			<View className='bg-white p-6 rounded-lg shadow-lg mb-6'>
				<Text className='text-lg text-gray-700'>
					Your Current Coins:
				</Text>
				<Text className='text-3xl font-bold text-yellow-500'>
					{user?.coins || 0}
				</Text>

				<Text className='text-lg text-gray-700 mt-4'>
					Daily Reward:
				</Text>
				<Text className='text-xl font-semibold text-yellow-500'>
					{rewardCoins} Coins
				</Text>

				{dailyRewardClaimed ? (
					<Text className='text-green-600 mt-4'>
						Today's reward already claimed!
					</Text>
				) : (
					<TouchableOpacity
						className='bg-yellow-500 p-3 rounded-lg mt-4'
						onPress={() => {}}
					>
						<Text className='text-white font-semibold text-center'>
							Claim Reward
						</Text>
					</TouchableOpacity>
				)}
			</View>

			<Text className='text-white text-xl font-semibold mb-2'>
				Achievements:
			</Text>
			{userData?.achievements?.map(
				(achievement: string, index: number) => (
					<View
						key={index}
						className='bg-gray-800 p-4 rounded-lg mb-2'
					>
						<Text className='text-white'>{achievement}</Text>
					</View>
				)
			)}
		</ScrollView>
	)
}
