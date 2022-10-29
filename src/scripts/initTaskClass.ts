import NotesList from "./notesManager";
import NotebooksList from "./notebooksManager";
import notes from "./sampleNotes";

import noteControl from "./writeNote";

class Controller {
	private notesCtrl = new NotesList();
	private notebookCtrl = new NotebooksList();
	private noteCtrl = new noteControl();

	private data = notes;

	private IDs = new Map();
	private firstNotebookID: number;

	private activeNotebookID: number;

	loadIDs() {
		this.IDs.clear();

		this.data.forEach((notebook) => {
			const notebookID = notebook.id;
			const notesIDs: number[] = notebook.notesList.map((note) => {
				return note.id;
			});

			this.IDs.set(notebookID, notesIDs);
			this.firstNotebookID = this.IDs.entries().next().value;
		});
	}

	constructor() {
		this.loadNotebooks();
		this.notebookCtrl.makeActive(0);

		this.loadIDs();
		this.eventsForNotebookListItems();

		const firstNotebookID = this.IDs.keys().next().value;
		this.activeNotebookID = firstNotebookID;

		this.loadNotes(firstNotebookID);
	}

	loadNotes(id: number) {
		const data = this.data;

		this.notesCtrl.truncateItemList();

		data.forEach((notebook) => {
			if (notebook.id == id) {
				this.notesCtrl.updateSaveCountDiv(notebook.notesList.length);

				notebook.notesList.forEach((note: any) => {
					this.notesCtrl.addItem(note.title, note.editDate, note.id);
				});
			}
		});
		this.notesCtrl.setTopText(notes[0].title);
	}

	loadNotebooks() {
		const data = this.data;

		this.notebookCtrl.updateSaveCountDiv(data.length);

		data.forEach((notebook) => {
			const id = notebook.id;
			const length = notebook.notesList.length;
			const title = notebook.title;

			this.notebookCtrl.addItem(title, length, id);
		});
		// this.activeNotebook = id;
	}

	findIndexOfNote(notebookIDtoFind: number, noteIDtoFind: number) {
		let resolvedNotebookIndex = 0;
		let resolvedNoteIndex = 0;

		for (const [indexNotebook, notebook] of this.data.entries()) {
			if (notebook.id == notebookIDtoFind) {
				resolvedNotebookIndex = indexNotebook;

				for (const [noteIndex, note] of notebook.notesList.entries()) {
					if (note.id == noteIDtoFind) {
						resolvedNoteIndex = noteIndex;
						break;
					}
				}
				break;
			}
		}
		return [resolvedNotebookIndex, resolvedNoteIndex];
	}

	loadNoteText(id: number) {
		const [notebookID, noteID] = this.findIndexOfNote(this.activeNotebookID, id);

		const text = this.data[notebookID].notesList[noteID].text;
		const title = this.data[notebookID].notesList[noteID].title;

		this.noteCtrl.writeNote(text, title);
	}

	eventsForNotesListItems() {
		const firstNoteID = this.IDs.get(0);
		const [notebookID, noteID] = this.findIndexOfNote(this.activeNotebookID, firstNoteID);

		const text = this.data[notebookID].notesList[noteID].text;
		const title = this.data[notebookID].notesList[noteID].title;

		this.noteCtrl.writeNote(text, title);

		this.notesCtrl.refreshItems();

		const notesItemList = this.notesCtrl.getList();
		const itemsGroup = notesItemList.map((noteItem) => {
			const itemDiv = noteItem[this.notesCtrl.itemIndexes.item];
			const id = noteItem[this.notesCtrl.itemIndexes.id];

			itemDiv.addEventListener("click", () => {
				this.loadNoteText(id);
			});
		});
	}

	eventsForNotebookListItems() {
		const notebooksCtrl = new NotebooksList();
		const notesCtrl = new NotesList();
		notebooksCtrl.refreshItems();

		const list = notebooksCtrl.getList();

		list.forEach((itemGroup, num) => {
			const item = itemGroup[notebooksCtrl.itemIndexes.item];
			const id = itemGroup[notebooksCtrl.itemIndexes.id];

			item.addEventListener("click", () => {
				this.loadNotes(id);
				notebooksCtrl.makeActiveById(id);
				notesCtrl.setTopText(notes[num].title);
				this.activeNotebookID = id;

				this.eventsForNotesListItems();
			});
		});
	}
}
const a = new Controller();
a.eventsForNotesListItems();

a.loadNoteText(1);
