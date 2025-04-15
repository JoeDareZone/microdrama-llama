import { create } from 'zustand'

type CurrencyStore = {
	coins: number
	addCoins: (amount: number) => void
	spendCoins: (amount: number) => void
	resetCoins: () => void
}

export const useCurrencyStore = create<CurrencyStore>(set => ({
	coins: 100, // starting amount

	addCoins: amount => set(state => ({ coins: state.coins + amount })),

	spendCoins: amount =>
		set(state => {
			console.log('spending coings', state.coins, amount)
			if (state.coins >= amount) {
				return { coins: state.coins - amount }
			}
			return state
		}),

	resetCoins: () => set({ coins: 100 }),
}))
