import DOMString from "./divNames";

class NavSwitcher {
	// ! NOTEBOOK
	notebooksHidden = false;
	notesHidden = "full";

	private notebooks = document.querySelector(DOMString.firstNav.main);
	private notebookHideBtn = document.querySelector(DOMString.firstNav.hideBtn);

	private notebooksShowBtn = document.querySelector(DOMString.global.showNotebooksBtn);

	// ! NOTES
	private notes = document.querySelector(DOMString.secondNav.main);
	private showNotesBtn = document.querySelector(DOMString.firstNav.notesBtn);
	private notesHideBtn = document.querySelector(DOMString.secondNav.hideBtn);

	constructor() {
		this.notebookHideBtn.addEventListener("click", () => {
			this.switchFirst(false);
		});
		this.notebooksShowBtn.addEventListener("click", () => {
			this.switchFirst(true);
		});
		this.notesHideBtn.addEventListener("click", () => {
			this.switchSecond("half");
		});

		this.showNotesBtn.addEventListener("click", () => {
			this.switchSecond("full");
		});

		if (window.innerWidth <= 500) {
			this.switchSecond("hidden");
		}
	}

	switchFirst = (show: boolean) => {
		// CHOWIEMY FIRST NAVA
		if (!show) {
			// ! NA TEL CHYBA

			if (this.notesHidden == "half") {
				this.switchSecond("hidden");
				this.notebooks.classList.add(DOMString.firstNav.mainHidden);
			} else {
				if (this.notesHidden == "hidden") {
					this.notebooks.classList.add(DOMString.firstNav.mainHidden);
					this.toggleShowBtn();

					return;
				}
				this.notebooks.classList.add(DOMString.firstNav.mainHidden);
				this.switchSecond("half");
			}
			this.toggleShowBtn();
			this.notebooksHidden = true;
		}
		// POKAZUJEMY FIRST NAVA
		else {
			if (this.notesHidden == "hidden") {
				this.notebooks.classList.remove(DOMString.firstNav.mainHidden);
				this.toggleShowBtn();
			}

			if (this.notesHidden == "half") {
				this.notebooks.classList.remove(DOMString.firstNav.mainHidden);
				this.toggleShowBtn();
				this.switchSecond("full");
			}
			this.notebooksHidden = false;
		}
	};
	switchSecond = (show: string) => {
		if (show == "half") {
			if (this.notebooksHidden == true) {
				this.switchSecond("hidden");

				return;
			}

			this.notesHidden = "half";
			this.notes.classList.add(DOMString.secondNav.mainHalfHidden);
		}

		if (show == "full") {
			this.notesHidden = "full";
			this.notes.classList.remove(DOMString.secondNav.mainHalfHidden);
			this.notes.classList.remove(DOMString.secondNav.mainHidden);
		}
		if (show == "hidden") {
			this.notesHidden = "hidden";
			this.notes.classList.remove(DOMString.secondNav.mainHalfHidden);
			this.notes.classList.add(DOMString.secondNav.mainHidden);
		}
	};
	toggleShowBtn = () => {
		this.notebooksShowBtn.classList.toggle(DOMString.global.showNotebooksShow);
	};
}

const a = new NavSwitcher();
