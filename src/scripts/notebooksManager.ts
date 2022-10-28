import DOMString from "./divNames";

class NotebooksList {
	private itemList: Array<any>;
	private listDiv = document.querySelector(DOMString.firstNav.list);
	private savedCountDiv = document.querySelector(DOMString.firstNav.count);

	public itemIndexes = {
		icon: 0,
		text: 1,
		length: 2,
		item: 3,
		id: 4,
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
			return [icons[num], texts[num], lengths[num], item, +item.getAttribute("id")];
		});
	}

	deleteItem(which: number) {
		const itemGroup = this.itemList[which];
		const item = itemGroup[this.itemIndexes.item];

		item.remove();

		this.refreshItems();
	}

	addItem(text: string, length: number, id: number) {
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
		item.setAttribute("id", id.toString());

		this.listDiv.appendChild(item);

		this.refreshItems();
	}

	updateSaveCountDiv(number: number) {
		this.savedCountDiv.innerHTML = `Saved ${number}`;
	}

	getList() {
		return this.itemList;
	}

	makeActiveById(id: number) {
		this.itemList.forEach((itemGroup) => {
			const item = itemGroup[this.itemIndexes.item];
			item.classList.remove(DOMString.firstNav.itemActive);
		});

		this.itemList.forEach((el) => {
			if (el[this.itemIndexes.id] == id) {
				const item = el[this.itemIndexes.item];
				item.classList.add(DOMString.firstNav.itemActive);
			}
		});
	}
}

export default NotebooksList;
