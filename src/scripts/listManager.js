import DOMString from "./divNames";

class NotebooksList {
	constructor() {
		this.itemList = [];
	}

	makeActive(which) {
		const itemIndex = 3;
		const activeClassName = DOMString.firstNav.itemActive;

		this.itemList.forEach((itemGroup) => {
			const item = itemGroup[itemIndex];

			item.classList.remove(activeClassName);
		});

		const item = this.itemList[which][itemIndex];

		item.classList.add(activeClassName);
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
a.makeActive(0);
a.makeActive(1);
a.makeActive(2);
