import CurrencyBar from '@/components/CurrencyBar'
import { useAuth } from '@/context/AuthContext'
import { claimReward } from '@/services/currencyService'
import { DAILY_REWARD_COINS } from '@/utils/constants'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function RewardsTab() {
	const { user } = useAuth()
	const dailyRewardClaimed = user?.dailyRewardClaimed

	const handleClaimReward = async (rewardCoins: number) => {
		if (user && !dailyRewardClaimed) {
			await claimReward(user.uid, rewardCoins)
		}
	}

	return (
		<ScrollView className='bg-black px-6 py-4'>
			<CurrencyBar />
			<Text className='text-white text-3xl font-semibold mb-4'>
				Rewards
			</Text>

			<View className='bg-white p-6 rounded-lg shadow-lg mb-6'>
				<Text className='text-lg text-gray-700 '>Daily Reward:</Text>
				<Text className='text-xl font-semibold text-yellow-500'>
					{DAILY_REWARD_COINS} Coins
				</Text>

				<TouchableOpacity
					className='bg-yellow-500 p-3 rounded-lg mt-4'
					onPress={() => handleClaimReward(DAILY_REWARD_COINS)}
					disabled={dailyRewardClaimed}
				>
					<Text className='text-white font-semibold text-center'>
						{dailyRewardClaimed ? 'Reward Claimed' : 'Claim Reward'}
					</Text>
				</TouchableOpacity>
			</View>

			<Text className='text-white text-xl font-semibold mb-2'>
				Achievements:
			</Text>
			{user?.achievements?.map((achievement: string, index: number) => (
				<View key={index} className='bg-gray-800 p-4 rounded-lg mb-2'>
					<Text className='text-white'>{achievement}</Text>
				</View>
			))}
		</ScrollView>
	)
}
