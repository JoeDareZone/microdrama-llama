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
	// Categories for movies
	const categories = [
		'Trending Now',
		'Coming Soon', // Adding 'Coming Soon' as a category
	]

	// Movie data for trending, top picks, and action (you can add more for other categories)
	const movieData = [
		{
			id: 1,
			title: 'Love in the Park',
			image: require('../../assets/images/movie1.png'),
		},
	]

	// Placeholder for coming soon movies
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
			<CurrencyBar />
			<ScrollView className='bg-black'>
				{/* Categories Section */}
				{categories.map((category, index) => (
					<View key={index} className='mt-8 px-4'>
						<Text className='text-white text-xl font-semibold'>
							{category}
						</Text>

						{/* Movie Grid */}
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							className='mt-4'
						>
							{/* Conditional rendering for "Coming Soon" */}
							{category === 'Coming Soon'
								? comingSoonData.map(movie => (
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
