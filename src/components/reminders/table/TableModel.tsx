import { makeAutoObservable } from "mobx"
import { mockData } from "../../../../tests/resources/mockData"
import { type GetReminderOutputNotNull } from "../../../types/router"

class TableState {
	products: GetReminderOutputNotNull[] = []
	productDialog = false
	deleteProductDialog = false
	deleteProductsDialog = false
	product: GetReminderOutputNotNull = mockData
	selectedProducts: GetReminderOutputNotNull[] = []
	submitted = false
	globalFilter = ""

	constructor() {
		makeAutoObservable(this)
	}

	openNew() {
		this.product = mockData
		this.submitted = false
		this.productDialog = true
	}

	hideDialog() {
		this.submitted = false
		this.productDialog = false
	}

	hideDeleteProductDialog() {
		this.deleteProductDialog = false
	}

	hideDeleteProductsDialog() {
		this.deleteProductsDialog = false
	}
}
