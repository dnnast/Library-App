const myLibrary = [];

const booksGrid = document.getElementById("books-grid");
const addNewBookBtn = document.getElementById("add-book-btn");

const nbDialog = document.getElementById("new-book-dialog");
const confirmBtn = document.getElementById("confirm-btn");
const closeBtn = document.getElementById("close-btn");

const nbAuthor = document.getElementById("nb-author");
const nbTitle = document.getElementById("nb-title");
const nbNrPages = document.getElementById("nb-pages");
const nbRead = document.getElementById("nb-read");

let isDialogOpen = false; // to track the dialog window

function Book(title, author, nrPages, read) {
    this.author = author;
    this.title = title;
    this.nrPages = nrPages;
    this.read = read;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayLibrary(library) {
    booksGrid.innerHTML = ``;

    library.forEach((element, index) => {
        createBookCard(element, index);
    });
}

function createBookCard(book, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-item");
    bookCard.setAttribute("data-bookNr", index);
    bookCard.innerHTML = `
        <div class="title book-info">
            <p>Title: </p>
            <div>${book.title}</div>
        </div>

        <div class="author book-info">
            <p>Author: </p>
            <div>${book.author}</div>
        </div>

        <div class="page-num book-info">
            <p>Pages: </p>
            <div>${book.nrPages}</div>
        </div>

        <div class="read book-info">
            <p>Read: </p>
            <input class="read-checkbox" type="checkbox" ${book.read ? "checked" : ""}>  
        </div>

        <button class='delete-btn'>Delete</button>
    `;
    booksGrid.appendChild(bookCard);
}

function clearDialogWindow() {
    nbTitle.value = "";
    nbAuthor.value = "";
    nbNrPages.value = "";
    nbRead.checked = false;
}

// LISTENERS
// show dialog
addNewBookBtn.addEventListener("click", () => {
    nbDialog.showModal();
    isDialogOpen = true;
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && isDialogOpen) {
        e.preventDefault();
        confirmBtn.click();
    }
});

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !isDialogOpen) {
        e.preventDefault(); // Prevent any default action
    }
});
// 'close' btn
closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearDialogWindow();
    nbDialog.close();
    isDialogOpen = false;
});

// 'confirm' btn
confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const book = new Book(nbTitle.value, nbAuthor.value, nbNrPages.value, nbRead.checked);
    addBookToLibrary(book);
    displayLibrary(myLibrary);

    clearDialogWindow();

    nbDialog.close();
    isDialogOpen = false;
});

booksGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const bookItem = e.target.closest(".book-item");
        const bookIndex = bookItem.getAttribute("data-bookNr");
        // Remove the book from the library
        myLibrary.splice(bookIndex, 1);
        displayLibrary(myLibrary); // Refresh the display
    }

    if (e.target.classList.contains("read-checkbox")) {
        const bookItem = e.target.closest(".book-item");
        const bookIndex = bookItem.getAttribute("data-bookNr");
        const bookRead = e.target.closest(".read-checkbox").checked;

        myLibrary[bookIndex].read = bookRead;
        console.log(myLibrary);
    }
});
