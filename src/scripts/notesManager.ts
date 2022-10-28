import { ids } from "webpack";
import DOMString from "./divNames";

class NotesList {
	private itemList: Array<any>;
	private listDiv = document.querySelector(DOMString.secondNav.list);
	private savedCountDiv = document.querySelector(DOMString.secondNav.count);
	private topTextDiv = document.querySelector(DOMString.secondNav.actualName);

	public itemIndexes = {
		checkbox: 0,
		text: 1,
		date: 2,
		item: 3,
		id: 4,
	};

	constructor() {
		this.refreshItems();
	}

	addItem(text: string, date: string, id: number) {
		const itemScheme = {
			itemDiv: document.createElement("li"),
			labelDiv: document.createElement("label"),
			checkboxDiv: document.createElement("input"),
			textDiv: document.createElement("div"),
			dateDiv: document.createElement("span"),

			assignClassNames: () => {
				const { checkboxNames, textNames, dateNames, itemNames } = DOMString.secondNav.itemClassNames;

				itemScheme.checkboxDiv.type = "checkbox";

				itemScheme.checkboxDiv.classList.add(...checkboxNames);
				itemScheme.textDiv.classList.add(...textNames);
				itemScheme.dateDiv.classList.add(...dateNames);
				itemScheme.itemDiv.classList.add(...itemNames);
			},

			applyChilds: () => {
				itemScheme.labelDiv.appendChild(itemScheme.checkboxDiv);
				itemScheme.labelDiv.appendChild(itemScheme.textDiv);

				itemScheme.itemDiv.appendChild(itemScheme.labelDiv);
				itemScheme.itemDiv.appendChild(itemScheme.dateDiv);
			},
		};

		itemScheme.assignClassNames();
		itemScheme.applyChilds();

		itemScheme.textDiv.innerText = text;
		itemScheme.dateDiv.innerText = date.toString();

		itemScheme.itemDiv.setAttribute("id", id.toString());

		this.listDiv.appendChild(itemScheme.itemDiv);

		this.refreshItems();
	}

	deleteItem(which: number) {
		const itemGroup = this.itemList[which];
		const item = itemGroup[this.itemIndexes.item];

		item.remove();

		this.refreshItems();
	}

	truncateItemList() {
		for (const itemGroup of this.itemList) {
			const item = itemGroup[this.itemIndexes.item];
			item.remove();
		}

		this.refreshItems();
	}

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
			return [checkBoxes[num], texts[num], editDates[num], item, +item.getAttribute("id")];
		});
	}

	updateText(which: number, text: string) {
		const itemGroup = this.itemList[which];
		const itemText = itemGroup[this.itemIndexes.text];

		itemText.innerText = text;
	}

	updateDate(which: number, date: string) {
		const item = this.itemList[which];
		const itemDateDiv = item[this.itemIndexes.date];

		itemDateDiv.innerText = date;
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
			item.classList.remove(DOMString.secondNav.itemActive);
		});

		this.itemList.forEach((el) => {
			if (el[this.itemIndexes.id] == id) {
				const item = el[this.itemIndexes.item];
				item.classList.add(DOMString.secondNav.itemActive);
			}
		});
	}

	setTopText(text: string) {
		this.topTextDiv.innerHTML = text;
	}
}

export default NotesList;
