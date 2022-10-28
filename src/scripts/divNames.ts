const DOMString = {
	global: {
		showNotebooksBtn: ".show-notebooks",
		showNotebooksShow: "show-notebooks--show",
		showNotebooksBottom: "show-notebooks--bottom",
	},

	firstNav: {
		main: ".notebooks",
		mainHidden: "notebooks--hidden",
		addBtn: ".notebooks__btn-add",
		searchInput: ".notebooks__search-input",
		list: ".notebooks__list",

		itemActive: "notebooks__list-item--active",

		item: ".notebooks__list-item",
		itemIcon: ".notebooks__list-item-icon",
		itemText: ".notebooks__list-item-text",
		itemLength: ".notebooks__list-item-length",

		notesBtn: ".notebooks__btn-show-notes",
		settingsBtn: ".notebooks__btn-settings",
		hideBtn: ".notebooks__btn-hide",

		count: ".notebooks__bottom-count",

		itemClassNames: {
			itemNames: ["notebooks__list-item"],
			iconNames: ["notebooks__list-item-icon", "icon", "bi", "bi-caret-right-fill"],
			textNames: ["notebooks__list-item-text"],
			lengthNames: ["notebooks__list-item-length", "text-small-gray"],
		},
	},

	secondNav: {
		main: ".notes",
		mainHidden: "notes--hidden",
		mainHalfHidden: "notes--half",

		actualName: ".notes__top-notebook",
		searchInput: ".notes__search-input",

		list: ".notes__list",

		itemActive: "notes__list-item--active",

		item: ".notes__list-item",

		itemClassNames: {
			itemNames: ["notes__list-item"],
			checkboxNames: ["notes__list-item-checkbox"],
			textNames: ["notes__list-item-text"],
			dateNames: ["notes__list-item-edit-date", "text-small-gray", "text-small-gray--dark"],
		},

		itemCheckbox: ".notes__list-item-checkbox",
		itemText: ".notes__list-item-text",
		itemEditDate: ".notes__list-item-edit-date",

		settingsBtn: ".notes__btn-settings",
		hideBtn: ".notes__btn-hide",

		count: ".notes__bottom-count",
	},
};

export default DOMString;
