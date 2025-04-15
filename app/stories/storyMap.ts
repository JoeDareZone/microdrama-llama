export type StoryNode = {
	id: string
	videoUrl: string
	title: string
	options: { label: string; nextId: string; cost?: number }[]
}

export const storyMap: Record<string, StoryNode> = {
	'1': {
		id: '1',
		videoUrl: require('@/assets/videos/work.mp4'),
		title: 'Working at home',
		options: [
			{ label: 'Play basketball', nextId: '2', cost: 10 },
			{ label: 'Stay at home', nextId: '8' },
		],
	},
	'2': {
		id: '2',
		videoUrl: require('@/assets/videos/basketball.mp4'),
		title: 'Basketball',
		options: [
			{ label: 'Go to the park', nextId: '3', cost: 10 },
			{ label: 'Go for a drive', nextId: '6' },
		],
	},
	'3': {
		id: '3',
		videoUrl: require('@/assets/videos/girl-park-meet.mp4'),
		title: 'Girl Park Meet',
		options: [
			{ label: 'Chill in the park with her', nextId: '4', cost: 10 },
			{ label: 'Watch the sunset with her', nextId: '5', cost: 10 },
		],
	},
	'4': {
		id: '4',
		videoUrl: require('@/assets/videos/girl-park-chill.mp4'),
		title: 'Girl Park Chill',
		options: [
			{ label: 'Drive home alone', nextId: '6' },
			{ label: 'Take her home', nextId: '7', cost: 50 },
		],
	},
	'5': {
		id: '5',
		videoUrl: require('@/assets/videos/girl-sunset-chill.mp4'),
		title: 'Girl Sunset Chill',
		options: [
			{ label: 'Drive home alone', nextId: '6' },
			{ label: 'Take her home', nextId: '7', cost: 50 },
		],
	},
	'6': {
		id: '6',
		videoUrl: require('@/assets/videos/drive-home.mp4'),
		title: 'Drive Home',
		options: [],
	},
	'7': {
		id: '7',
		videoUrl: require('@/assets/videos/kiss.mp4'),
		title: 'Kiss',
		options: [],
	},
	'8': {
		id: '8',
		videoUrl: require('@/assets/videos/stay-at-home.mp4'),
		title: 'Stay at home',
		options: [],
	},
}

export const getStoryNode = (id: string): StoryNode => storyMap[id]
