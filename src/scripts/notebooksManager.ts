import DOMString from "./divNames";

class NotebooksList {
	private itemList: Array<any>;
	private listDiv = document.querySelector(DOMString.firstNav.list);

	private activeId: number;

	private itemIndexes = {
		icon: 0,
		text: 1,
		length: 2,
		item: 3,
	};

	constructor() {
		this.refreshItems();
	}

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
		const item = this.itemList[which];
		const itemTextDiv = item[this.itemIndexes.text];

		itemTextDiv.innerText = text;
	}

	updateLength(which: number, length: number) {
		const item = this.itemList[which];
		const itemLengthDiv = item[this.itemIndexes.length];

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

	deleteItem(which: number) {
		const itemGroup = this.itemList[which];
		const item = itemGroup[this.itemIndexes.item];

		item.remove();

		this.refreshItems();
	}

	addItem(text: string, length: number) {
		const itemScheme = {
			iconDiv: document.createElement("i"),
			textDiv: document.createElement("span"),
			lengthDiv: document.createElement("span"),

			assignClassNames: () => {
				const { iconNames, textNames, lengthNames } = DOMString.firstNav.itemClassNames;

				itemScheme.iconDiv.classList.add(...iconNames);
				itemScheme.textDiv.classList.add(...textNames);
				itemScheme.lengthDiv.classList.add(...lengthNames);
			},
		};
		itemScheme.assignClassNames();

		const item = document.createElement("li");

		itemScheme.textDiv.innerText = text;
		itemScheme.lengthDiv.innerText = length.toString();

		item.appendChild(itemScheme.iconDiv);
		item.appendChild(itemScheme.textDiv);
		item.appendChild(itemScheme.lengthDiv);
		item.classList.add(...DOMString.firstNav.itemClassNames.itemNames);

		this.listDiv.appendChild(item);

		this.refreshItems();
	}
}

export default NotebooksList;
