import notes from "./sampleNotes";
import NotebooksList from "./notebooksManager";

function notebooksToHTML(data: Array<any>, notebooksCtrl: NotebooksList) {
	data.forEach((notebook) => {
		const length = notebook.notesList.length;
		const title = notebook.title;

		notebooksCtrl.addItem(title, length);
	});
}

function notesToHTML(data: Array<any>) {}

notebooksToHTML(notes, new NotebooksList());
