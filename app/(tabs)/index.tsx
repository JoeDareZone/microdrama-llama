import CurrencyBar from '@/components/CurrencyBar'
import { router } from 'expo-router'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
	const categories = [
		'Trending Now',
		'Top Picks for You',
		'Action',
		'Comedy',
		'Romance',
		'Horror',
		'Documentaries',
	]

	const movieData = [
		{
			id: 1,
			title: 'Movie 1',
			image: require('../../assets/images/girl2.png'),
		},
		{
			id: 2,
			title: 'Movie 2',
			image: 'https://images.unsplash.com/photo-1602107124398-d2f0ffdbbeea',
		},
		{
			id: 3,
			title: 'Movie 3',
			image: 'https://images.unsplash.com/photo-1516972810927-2dbd3e6e02c4',
		},
	]

	const handleMoviePress = (movieId: number) =>
		router.push(`/movie/${movieId}`)

	return (
		<ScrollView className='bg-black'>
			<CurrencyBar />

			{/* Top Banner */}
			{/* <View className='relative h-56'>
				<Image
					source={{ uri: 'https://via.placeholder.com/500x300' }}
					className='w-full h-full object-cover'
				/>
				<View className='absolute bottom-4 left-4'>
					<Text className='text-white text-3xl font-bold'>
						Featured Movie
					</Text>
				</View>
			</View> */}

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
						{movieData.map(movie => (
							<TouchableOpacity
								key={movie.id}
								className='mr-4'
								onPress={() => handleMoviePress(movie.id)}
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
	)
}
