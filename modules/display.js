import Book from './book.js';
import BookForm from './bookForm.js';

class Display {
  books = [];

  workForm = '';

  constructor() {
    if (localStorage.getItem('book')) {
      this.books = JSON.parse(localStorage.getItem('book')).map((book) => new Book(book.title, book.author, book.index));
    }
    this.setCurrentForm();
  }

  setCurrentForm = (name = 'bookForm') => {
    this.workForm = new BookForm(name);
    this.workForm.form.onsubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    this.addBook(this.workForm.form.title.value, this.workForm.form.author.value, this.books.length + 1);
    this.workForm.form.reset();
  }

  addBook = (title, author, index) => {
    const book = new Book(title, author, index);
    this.books.push(book);
    this.render();
    this.saveBooks();
  }

  removebook = (index) => {
    // this.books = [];
    this.books = this.books.filter((book) => book.index !== index);
    for (let i = 0; i < this.books.length; i += 1) {
      this.books[i].id = i + 1;
    }
    this.render();
    this.saveBooks();
  }

  render = () => {
    const bookContainer = document.getElementById('books-cont');
    bookContainer.innerHTML = '';
    if (this.books.length === 0) {
      bookContainer.innerHTML = '<h3>There are no books.</h3>';
    } else {
      this.books.forEach((book) => {
        const { Node, btn, index } = book.createNode();
        bookContainer.append(Node);
        btn.onclick = () => this.removebook(index);
      });
    }
  }

  saveBooks = () => {
    localStorage.setItem('book', JSON.stringify(this.books));
  }
}

export default new Display();