let form = document.getElementById('book-form');
let bookList = document.getElementById('book-list');

bookList.addEventListener('click', removeBook);
form.addEventListener('submit', newBook);


class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}




class UI {

    static addToBookList(book) {
        let list = document.getElementById('book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a>`
        list.appendChild(row);
    }
    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let formmm = document.getElementById('book-form');
        container.insertBefore(div, formmm);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000)
    }
    static deleteBook(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            this.showAlert('Book Removed!', 'success');
        }
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;

    }
    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }

    static displayBooks() {
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addToBookList(book)
        })
    }
    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books));

    }
}
document.addEventListener('DOMContentLoaded', Store.displayBooks());


function newBook(e) {
    let title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Fill up all the fields!', 'error');
    }
    else {

        let book = new Book(title, author, isbn);
        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert('Book Added!', 'success');
        Store.addBook(book);
    }
    e.preventDefault();
}
function removeBook(e) {

    UI.deleteBook(e.target);
    e.preventDefault();
}