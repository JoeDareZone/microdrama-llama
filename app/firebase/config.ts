import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'

const firebaseConfig = {
	appId: '1:1061764827233:ios:1650cc06ea865f79940220',
	projectId: 'microdrama-llama',
}

export default function initializeFirebase() {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig)
	}
}

export { auth, firebase }
