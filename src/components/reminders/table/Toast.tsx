import { Toast, type ToastMessage } from "primereact/toast"
import { type RefObject, createContext, useRef, useContext } from "react"

const toastContext = createContext<RefObject<Toast> | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const toastRef = useRef<Toast>(null)

	return (
		<>
			<toastContext.Provider value={toastRef}>
				<Toast ref={toastRef} />
				{children}
			</toastContext.Provider>
		</>
	)
}

export const withToastProvider = (Component: React.ComponentType<any>) => {
	return function WithToastProvider(props: any) {
		return (
			<ToastProvider>
				<Component {...props} />
			</ToastProvider>
		)
	}
}

export const useToast = () => {
	const toast = useContext(toastContext)
	if (!toast) {
		throw new Error("useToast must be used within a ToastProvider")
	}
	const { current } = toast
	if (!current) {
		throw new Error("useToast must be used within a ToastProvider")
	}

	const show = (content: ToastMessage) => {
		current.show(content)
	}
	const clear = () => {
		current.clear()
	}

	return {
		show,
		clear,
	}
}
