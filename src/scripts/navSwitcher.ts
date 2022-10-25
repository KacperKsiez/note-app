import DOMString from "./divNames";

class NavSwitcher {
	// NAVS
	private firstNav = document.querySelector(DOMString.firstNav.main);
	private secondNav = document.querySelector(DOMString.secondNav.main);

	// BUTTONS
	private btnShowFirstNav = document.querySelector(DOMString.global.showNotebooksBtn);
	private btnHideFirstNav = document.querySelector(DOMString.firstNav.hideBtn);

	private btnShowSecondNav = document.querySelector(DOMString.firstNav.notesBtn);
	private btnHideSecondNav = document.querySelector(DOMString.secondNav.hideBtn);

	// STATUS
	private statFirst = "show";
	private statSecond = "show";

	constructor() {
		this.btnHideFirstNav.addEventListener("click", this.performHideFirst);
		this.btnShowFirstNav.addEventListener("click", this.performShowFirst);

		this.btnHideSecondNav.addEventListener("click", this.performHideSecond);
		this.btnShowSecondNav.addEventListener("click", this.showSecondNav);
	}

	performHideFirst = () => {
		const { statFirst, statSecond } = this;

		if (statFirst == "show" && statSecond == "show") {
			this.halfHideSecondNav();
			this.hideFirstNav();
		}
		if (statFirst == "show" && statSecond == "half hidden") {
			this.hideSecondNav();
			this.hideFirstNav();
		}
		if (statFirst == "show" && statSecond == "hidden") {
			this.hideFirstNav();
		}
	};

	performHideSecond = () => {
		const { statFirst, statSecond } = this;

		if (statFirst == "hidden") {
			this.hideSecondNav();
		}
		if (statFirst == "show") {
			this.halfHideSecondNav();
		}
	};

	performShowFirst = () => {
		const { statFirst, statSecond } = this;

		if (statFirst == "hidden" && statSecond == "hidden") {
			this.showFirstNav();
		}
		if (statFirst == "hidden" && statSecond == "half hidden") {
			this.showSecondNav();
			this.showFirstNav();
		}
	};

	hideFirstNav = () => {
		this.statFirst = "hidden";

		this.firstNav.classList.add(DOMString.firstNav.mainHidden);
		this.toggleShowFirst();
	};

	showFirstNav = () => {
		this.statFirst = "show";

		this.firstNav.classList.remove(DOMString.firstNav.mainHidden);
		this.toggleShowFirst();
	};

	hideSecondNav = () => {
		this.statSecond = "hidden";

		this.secondNav.classList.remove(DOMString.secondNav.mainHalfHidden);
		this.secondNav.classList.add(DOMString.secondNav.mainHidden);
	};

	halfHideSecondNav = () => {
		this.statSecond = "half hidden";

		this.secondNav.classList.remove(DOMString.secondNav.mainHidden);
		this.secondNav.classList.add(DOMString.secondNav.mainHalfHidden);
	};

	showSecondNav = () => {
		this.statSecond = "show";

		this.secondNav.classList.remove(DOMString.secondNav.mainHidden);
		this.secondNav.classList.remove(DOMString.secondNav.mainHalfHidden);
	};

	toggleShowFirst = () => this.btnShowFirstNav.classList.toggle(DOMString.global.showNotebooksShow);
}

const a = new NavSwitcher();
