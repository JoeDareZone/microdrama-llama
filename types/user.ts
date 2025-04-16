import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type UserData = {
	// email: string
	// name: string
	coins: number
	achievements: string[]
	// lastLogin: FirebaseFirestoreTypes.Timestamp
	// profilePicture: string
	dailyRewardClaimed: boolean
	createdAt: FirebaseFirestoreTypes.Timestamp
}
