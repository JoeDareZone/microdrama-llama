import CurrencyBar from '@/components/CurrencyBar'
import { router } from 'expo-router'
import {
	Image,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export default function HomeScreen() {
	const categories = ['Trending Now', 'Coming Soon']

	const movieData = [
		{
			id: 1,
			title: 'Love in the Park',
			image: require('../../assets/images/movie1.png'),
		},
	]

	const comingSoonData = [
		{
			id: 2,
			title: 'Movie 2 (Coming Soon)',
			image: require('../../assets/images/movie2.png'),
		},
		{
			id: 3,
			title: 'Movie 3 (Coming Soon)',
			image: require('../../assets/images/movie3.png'),
		},
		{
			id: 4,
			title: 'Movie 4 (Coming Soon)',
			image: require('../../assets/images/movie4.png'),
		},
	]

	const handleMoviePress = (movieId: number) =>
		router.push(`/movie/${movieId}`)

	return (
		<SafeAreaView className='flex-1 bg-black'>
			<ScrollView className='bg-black py-4'>
				<View className='flex-row justify-between items-center pr-3'>
					<Text className='text-white text-3xl font-semibold  ml-4'>
						Movies
					</Text>
					<CurrencyBar />
				</View>

				{categories.map((category, index) => (
					<View key={index} className='mt-4 ml-4'>
						<Text className='text-white text-xl font-semibold'>
							{category}
						</Text>

						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							className='mt-4'
						>
							{category === 'Coming Soon'
								? comingSoonData.map(movie => (
										<TouchableOpacity
											key={movie.id}
											className='mr-4'
											onPress={() =>
												handleMoviePress(movie.id)
											}
											disabled
										>
											<Image
												source={movie.image}
												className='w-40 h-60 rounded-md'
											/>
											<Text className='text-white text-sm mt-2'>
												{movie.title}
											</Text>
										</TouchableOpacity>
								  ))
								: movieData.map(movie => (
										<TouchableOpacity
											key={movie.id}
											className='mr-4'
											onPress={() =>
												handleMoviePress(movie.id)
											}
										>
											<Image
												source={movie.image}
												className='w-40 h-60 rounded-md'
											/>
											<Text className='text-white text-sm mt-2'>
												{movie.title}
											</Text>
										</TouchableOpacity>
								  ))}
						</ScrollView>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}
