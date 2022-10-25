import DOMString from "./divNames";

class NotebooksList {
	private itemList: Array<any>;

	private itemIndexes = {
		icon: 0,
		text: 1,
		length: 2,
		item: 3,
	};

	constructor() {}

	makeActive(which: number) {
		const activeClassName = DOMString.firstNav.itemActive;

		const item = this.itemList[which];
		const itemDiv = item[this.itemIndexes.item];

		this.itemList.forEach((itemGroup) => {
			const item = itemGroup[this.itemIndexes.item];

			item.classList.remove(activeClassName);
		});

		itemDiv.classList.add(activeClassName);
	}

	updateText(which: number, text: string) {
		let item = this.itemList[which];
		let itemTextDiv = item[this.itemIndexes.text];

		itemTextDiv.innerText = text;
	}

	updateLength(which: number, length: number) {
		let item = this.itemList[which];
		let itemLengthDiv = item[this.itemIndexes.length];

		itemLengthDiv.innerText = length;
	}

	refreshItems() {
		const { item, itemIcon, itemText, itemLength } = DOMString.firstNav;

		const items = Array.from(document.querySelectorAll(item));
		const icons = document.querySelectorAll(itemIcon);
		const texts = document.querySelectorAll(itemText);
		const lengths = document.querySelectorAll(itemLength);

		this.itemList = items.map((item, num) => {
			return [icons[num], texts[num], lengths[num], item];
		});
	}
}

let a = new NotebooksList();
a.refreshItems();
a.makeActive(2);
