import DOMString from "./divNames";

class NotebooksList {
	constructor() {
		this.itemList = [];
	}

	makeActive(which) {
		const activeName = DOMString.firstNav.itemActive;

		this.itemList.forEach((item) => {
			item = item[3];
			item.classList.remove(activeName);
		});

		const item = this.itemList[which][3];

		item.classList.add(activeName);
	}

	updateItems() {
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
a.updateItems();
