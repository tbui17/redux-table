import { createStore } from "@udecode/zustood"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { createContext, useContext, useRef, useState } from "react"

const exampStoreFactory = () => {
	const store = createStore(Math.random().toString())({
		count: 1,
	}).extendActions((set, get) => ({
		add: () =>
			set.state((s) => {
				s.count += get.count()
			}),
		multiplier: (n: number) => {
			set.state((s) => {
				s.count *= n
			})
		},
	}))
	return store
}

const StoreContext = createContext<ReturnType<typeof exampStoreFactory> | null>(null) // TS requires `null`, but JS doesn't.

const StoreProvider = ({ children }: any) => {
	const storeRef = useRef<ReturnType<typeof exampStoreFactory> | null>(null)
	if (!storeRef.current) {
		storeRef.current = exampStoreFactory()
	}

	return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

const useStoreContext = () => {
	const store = useContext(StoreContext)
	if (!store) {
		throw new Error("Missing StoreProvider")
	}
	return store
}

import { proxy, useSnapshot } from "valtio"

class Store {
	count = 1
	prop2 = 4
	multiplier = 1

	getCountAsMultiplier() {
		return this.count * this.multiplier
	}

	setMultiplier(n: number) {
		this.multiplier = n
	}

	add() {
		this.count++
	}

	decrease() {
		this.count--
	}
}

// const store = proxy(new Store())

class Model {
	count = 1
	prop2 = 4
	multiplier = 1
	internal = {
		count: 3,
	}

	constructor() {
		makeAutoObservable(this)
	}

	getCountAsMultiplier() {
		return this.internal.count * this.multiplier
	}

	setMultiplier(n: number | string) {
		if (typeof n === "string") {
			n = parseInt(n)
		}
		this.multiplier = n
	}

	add() {
		this.internal.count++
	}

	decrease() {
		this.internal.count--
	}
}
const store = new Model()

const useStore = () => {
	const state1 = useState(true)

	return {
		store,
		state1,
	}
}

function Test2() {
	// const snap = useSnapshot(store)
	const {
		state1: [state, setState],
		store,
	} = useStore()

	return (
		<>
			<input
				value={store.multiplier}
				onChange={(event) => {
					setState(() => !state)
					store.multiplier = parseInt(event.target.value)
					// store.setMultiplier(Number(event.target.value))
				}}
			></input>

			<div>{`${state}`}</div>

			<div>{store.count}</div>
			<div>{store.getCountAsMultiplier()}</div>
			<button onClick={() => store.add()}>add</button>
			<>
				<Ctx1Comp />
				<Ctx2Comp />
			</>
		</>
	)
}

function Ctx1Comp() {
	return (
		<StoreProvider>
			<Comp1 />
		</StoreProvider>
	)
}

function Comp1() {
	const store = useStoreContext()
	return (
		<>
			<div>{store.use.count()}</div>
			<button onClick={() => store.set.add()}>add</button>
		</>
	)
}

function Ctx2Comp() {
	return (
		<StoreProvider>
			<Comp1 />
		</StoreProvider>
	)
}

export default observer(Test2)
