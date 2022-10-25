import DOMString from "./divNames";

class NavSwitcher {
	// NAVS
	private firstNav = document.querySelector(DOMString.firstNav.main);
	private secondNav = document.querySelector(DOMString.secondNav.main);
	// BUTTONS
	private showFirstNavBtn = document.querySelector(DOMString.global.showNotebooksBtn);
	private hideFirstNavBtn = document.querySelector(DOMString.firstNav.hideBtn);
	private hideSecondNavBtn = document.querySelector(DOMString.secondNav.hideBtn);
	private showSecondNavBtn = document.querySelector(DOMString.firstNav.notesBtn);
	// STATUS
	private statFirst = "show";
	private statSecond = "show";

	constructor() {
		this.hideFirstNavBtn.addEventListener("click", this.recognizeHideFirst);
		this.showFirstNavBtn.addEventListener("click", this.recognizeShowFirst);

		this.hideSecondNavBtn.addEventListener("click", this.recognizeHideSecond);
		this.showSecondNavBtn.addEventListener("click", this.showSecondNav);
	}

	recognizeHideFirst = () => {
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

	recognizeHideSecond = () => {
		const { statFirst, statSecond } = this;
		if (statFirst == "hidden") {
			this.hideSecondNav();
		}
		if (statFirst == "show") {
			this.halfHideSecondNav();
		}
	};

	recognizeShowFirst = () => {
		const { statFirst, statSecond } = this;
		console.log("huj");

		if (statFirst == "hidden" && statSecond == "hidden") {
			this.showFirstNav();
		}
		if (statFirst == "hidden" && statSecond == "half hidden") {
			this.showSecondNav();
			this.showFirstNav();
			console.log("DUPA");
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

	toggleShowFirst = () => this.showFirstNavBtn.classList.toggle(DOMString.global.showNotebooksShow);
}

const a = new NavSwitcher();
