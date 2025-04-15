import { create } from 'zustand'

type CurrencyStore = {
	coins: number
	setCoins: (amount: number) => void
	addCoins: (amount: number) => void
	spendCoins: (amount: number) => void
	resetCoins: () => void
}

export const useCurrencyStore = create<CurrencyStore>(set => ({
	coins: 0,

	setCoins: amount => set({ coins: amount }),

	addCoins: amount => set(state => ({ coins: state.coins + amount })),

	spendCoins: amount =>
		set(state => {
			if (state.coins >= amount) {
				return { coins: state.coins - amount }
			}
			return state
		}),

	resetCoins: () => set({ coins: 0 }),
}))
