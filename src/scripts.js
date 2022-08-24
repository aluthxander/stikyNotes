const noteContainer = document.getElementsByTagName("main")[0];
const addButton = document.querySelector("nav .add")
const STORAGEKEY = "stickynotes-notes"



// fungsi untuk menyimpan note ke local storage
function saveNotes(notes) {
    localStorage.setItem(STORAGEKEY, JSON.stringify(notes))
}

// menambahkan note baru
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNote(noteObject.id, noteObject.content);
    noteContainer.appendChild(noteElement);

    notes.push(noteObject);
    saveNotes(notes);

}
// fungsi untuk menghapus note
function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    noteContainer.removeChild(element);
}
// fungsi untuk melakukan update note
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}


// memasukkan element ke container
getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.content);
    noteContainer.appendChild(noteElement);
});

// ketika button di klik maka akan mengaktifkan fungsi addNote
addButton.addEventListener("click", () => addNote())
// fungsi untuk mengambil Item pada local storage
function getNotes() {
    return JSON.parse(localStorage.getItem(STORAGEKEY) || "[]");
}

// fungsi untuk membuat note
function createNote(id, content) {
    const card = document.createElement("div");
    const textArea = document.createElement("textarea");
    const span = document.createElement("span");

    card.classList.add("card");
    span.textContent = "x";
    card.appendChild(span);

    textArea.classList.add("note");
    textArea.value = content;
    textArea.placeholder = "Catatan masih kosong ...";
    card.appendChild(textArea);

    // ketika element mengalami perubahan maka akan menjalankan fungsi updateNote()
    textArea.addEventListener("change", () => {
        updateNote(id, textArea.value);
    });
    // ketika element di klik dua kali maka akan menjalankan fungsi deleteNote()
    span.addEventListener("click", () => {
        const doDelete = confirm("Apakah kamu ingin menghapus catatan ini?");
        if (doDelete) {
            deleteNote(id, card);
        }
    });

    return card;
}