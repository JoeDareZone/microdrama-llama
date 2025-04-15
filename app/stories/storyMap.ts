export type StoryNode = {
	id: string
	videoUrl: string
	title: string
	options: { label: string; nextId: string }[]
}

export const storyMap: Record<string, StoryNode> = {
	'1': {
		id: '1',
		videoUrl: require('@/assets/videos/work.mp4'),
		title: 'Wake Up Scene',
		options: [
			{ label: 'Go outside', nextId: '2' },
			{ label: 'Stay in bed', nextId: '3' },
		],
	},
	'2': {
		id: '2',
		videoUrl: require('@/assets/videos/basketball.mp4'),
		title: 'Park Walk',
		options: [
			{ label: 'Feed the ducks', nextId: '4' },
			{ label: 'Call a friend', nextId: '5' },
		],
	},
	// etc.
}
