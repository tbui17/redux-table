import { useState } from "react"

export const useOpen = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState)

	const handleOpen = () => setIsOpen(true)
	const handleClose = () => setIsOpen(false)

	return [isOpen, handleOpen, handleClose] as const
}
