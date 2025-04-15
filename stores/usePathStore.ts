import { create } from 'zustand'

type PathState = {
	path: string[]
	addToPath: (id: string) => void
	clearPath: () => void
}

export const usePathStore = create<PathState>(set => ({
	path: [],
	addToPath: id => set(state => ({ path: [...state.path, id] })),
	clearPath: () => set({ path: [] }),
}))
