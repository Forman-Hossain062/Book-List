
let form = document.querySelector('#book-form');
let bList = document.querySelector('#book-list');


form.addEventListener('submit', newBook);
bList.addEventListener('click', removeBook)
document.addEventListener('DOMContentLoaded', getBooks);

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {

    static addToBookList(book) {
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        bList.appendChild(row)
        // console.log(row);
    }
    static clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
    static showAlert(message, className) {
        let div = document.createElement("div")
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container')
        let form = document.querySelector('#book-form')
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000)
    }
    static removeFromBookList(target) {
        if (target.hasAttribute('href')) {
            if (confirm("Are You sure?")) {
                let ele = target.parentElement.parentElement;
                ele.remove();
                removeBookFromLS(target.parentElement.previousElementSibling.textContent.trim());

                UI.showAlert("Book Removed!!", "success");

                removeBookFromLS(ele);
            }
        }
    }
}

function newBook(e) {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('isbn').value;


    if (title === '' || author === '' || isbn === "") {
        UI.showAlert("Please fill up all the fileds!!", "error");
    }
    else {
        let book = new Book(title, author, isbn)

        UI.addToBookList(book)
        UI.clearFields();
        UI.showAlert("Book Added", "success");

        storeInLocalStorage(book);
    }


    e.preventDefault();
}
function removeBook(e) {

    UI.removeFromBookList(e.target);

    e.preventDefault();
}


//Store in local Storage
function storeInLocalStorage(book) {
    let bookList;
    if (localStorage.getItem('bookList') === null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem('bookList'))
    }
    bookList.push(book);

    localStorage.setItem('bookList', JSON.stringify(bookList));
}
//get books from local storage

function getBooks(e) {
    let bookList;
    if (localStorage.getItem('bookList') === null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem('bookList'))
    }
    bookList.forEach(singleBook => {
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>${singleBook.title}</td>
        <td>${singleBook.author}</td>
        <td>${singleBook.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        bList.appendChild(row)
        console.log(singleBook);
    })
}

//remove books from local storage

function removeBookFromLS(vook) {
    let bookList;
    if (localStorage.getItem('bookList') === null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem('bookList'))
    }
    let item = vook;


    bookList.forEach((task, index) => {
        if (task.isbn === item) {
            bookList.splice(index, 1)
        }
    })
    localStorage.setItem('bookList', JSON.stringify(bookList))

}