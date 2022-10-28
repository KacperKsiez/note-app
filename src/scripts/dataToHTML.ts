import notes from "./sampleNotes";
import NotebooksList from "./notebooksManager";
import NotesList from "./notesManager";

function addEventToNotebookListItems() {
	const notebooksCtrl = new NotebooksList();
	const notesCtrl = new NotesList();
	notebooksCtrl.refreshItems();

	const list = notebooksCtrl.getList();

	list.forEach((itemGroup, num) => {
		const item = itemGroup[notebooksCtrl.itemIndexes.item];
		const id = itemGroup[notebooksCtrl.itemIndexes.id];

		item.addEventListener("click", () => {
			notesToHTML(notes, id);
			notebooksCtrl.makeActiveById(id);
			notesCtrl.setTopText(notes[num].title);
		});
	});
}

function notebooksToHTML(data: Array<any>) {
	const notebooksCtrl = new NotebooksList();

	notebooksCtrl.updateSaveCountDiv(data.length);

	data.forEach((notebook) => {
		const id = notebook.id;
		const length = notebook.notesList.length;
		const title = notebook.title;

		notebooksCtrl.addItem(title, length, id);
	});

	notebooksCtrl.makeActive(0);
}

function notesToHTML(data: Array<any>, id: number) {
	const notesCtrl = new NotesList();
	notesCtrl.truncateItemList();

	data.forEach((notebook) => {
		if (notebook.id == id) {
			notesCtrl.updateSaveCountDiv(notebook.notesList.length);

			notebook.notesList.forEach((note: any) => {
				notesCtrl.addItem(note.title, note.editDate, note.id);
			});
		}
	});
	notesCtrl.setTopText(notes[0].title);
}

notebooksToHTML(notes);

notesToHTML(notes, 1);

addEventToNotebookListItems();
