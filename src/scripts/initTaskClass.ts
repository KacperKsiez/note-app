import NotesList from "./notesManager";
import NotebooksList from "./notebooksManager";
import notes from "./sampleNotes";

class Controller {
	private notesCtrl = new NotesList();
	private notebookCtrl = new NotebooksList();

	private data = notes;

	private IDs = new Map();

	loadIDs() {
		this.IDs.clear();

		notes.forEach((notebook) => {
			const notebookID = notebook.id;
			const notesIDs: number[] = notebook.notesList.map((note) => {
				return note.id;
			});

			this.IDs.set(notebookID, notesIDs);
		});
	}

	constructor() {
		this.loadNotebooks();
		this.notebookCtrl.makeActive(0);

		this.eventsForNotebookListItems();

		this.loadIDs();
		const firstNotebookID = this.IDs.keys().next().value;

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
			});
		});
	}
}
const a = new Controller();

// function notebooksToHTML(data: Array<any>) {
// 	const notebooksCtrl = new NotebooksList();

// 	notebooksCtrl.updateSaveCountDiv(data.length);

// 	data.forEach((notebook) => {
// 		const id = notebook.id;
// 		const length = notebook.notesList.length;
// 		const title = notebook.title;

// 		notebooksCtrl.addItem(title, length, id);
// 	});

// 	notebooksCtrl.makeActive(0);
// }

// function notesToHTML(data: Array<any>, id: number) {
// 	const notesCtrl = new NotesList();
// 	notesCtrl.truncateItemList();

// 	data.forEach((notebook) => {
// 		if (notebook.id == id) {
// 			notesCtrl.updateSaveCountDiv(notebook.notesList.length);

// 			notebook.notesList.forEach((note: any) => {
// 				notesCtrl.addItem(note.title, note.editDate, note.id);
// 			});
// 		}
// 	});
// 	notesCtrl.setTopText(notes[0].title);
// }

// notebooksToHTML(notes);

// notesToHTML(notes, 1);

// addEventToNotebookListItems();
