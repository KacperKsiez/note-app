import DOMString from "./divNames";

class noteControl {
	private noteDiv = document.querySelector(DOMString.note.text);
	private titleDiv = document.querySelector(DOMString.note.title);

	writeNote(text: string, title: string) {
		this.noteDiv.innerHTML = text;
		this.titleDiv.innerHTML = title;
	}
}

export default noteControl;
