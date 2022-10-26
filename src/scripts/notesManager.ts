import DOMString from "./divNames";

class NotesList {
	private itemList: Array<any>;
	private listDiv = document.querySelector(DOMString.secondNav.list);

	private activeId: number;

	private itemIndexes = {
		checkbox: 0,
		text: 1,
		date: 2,
		item: 3,
	};

	constructor() {
		this.refreshItems();
	}

	addItem() {}

	deleteItem() {}

	makeActive(which: number) {
		const itemGroup = this.itemList[which];
		const item = itemGroup[this.itemIndexes.item];

		this.itemList.forEach((itemGroup) => {
			const item = itemGroup[this.itemIndexes.item];
			item.classList.remove(DOMString.secondNav.itemActive);
		});

		item.classList.add(DOMString.secondNav.itemActive);
	}

	refreshItems() {
		const { itemCheckbox, itemText, itemEditDate, item } = DOMString.secondNav;

		const items = Array.from(document.querySelectorAll(item));
		const checkBoxes = document.querySelectorAll(itemCheckbox);
		const texts = document.querySelectorAll(itemText);
		const editDates = document.querySelectorAll(itemEditDate);

		this.itemList = items.map((item, num) => {
			return [checkBoxes[num], texts[num], editDates[num], item];
		});
		console.log(this.itemList);
	}

	updateText() {}

	updateDate() {}
}

let a = new NotesList();
a.refreshItems();
