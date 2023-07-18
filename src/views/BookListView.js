class BookListView {
  constructor(BookController, BookFormView) {
    this.bookList = document.querySelector('#book-list');
    this.booksData = [];
    this.controller = BookController;
    this.bookFormView = BookFormView;
  }

  displayBooks(books) {
    this.booksData = books;
    this.bookList.innerHTML = '';

    // Tạo bảng
    const table = document.createElement('table');
    table.classList.add('book-table');

    // Tạo header của bảng
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Title', 'Author', 'Action'];

    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Tạo body của bảng
    const tbody = document.createElement('tbody');
    books.forEach((book) => {
      const bookRow = document.createElement('tr');
      const data = [book.id, book.title, book.author, ''];

      data.forEach((value, index) => {
        const td = document.createElement('td');
        if (index === data.length - 1) {
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.classList.add('edit-btn');
          editButton.addEventListener('click', () =>
            this.handleEditBook(book.id),
          );

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.classList.add('delete-btn');
          deleteButton.addEventListener('click', () =>
            this.handleDeleteBook(book.id),
          );

          td.appendChild(editButton);
          td.appendChild(deleteButton);
        } else {
          td.textContent = value;
        }
        bookRow.appendChild(td);
      });

      tbody.appendChild(bookRow);
    });

    table.appendChild(tbody);

    this.bookList.appendChild(table);
  }
  handleEditBook(id) {
    const bookToEdit = this.booksData.find((book) => book.id === id);
    if (bookToEdit) {
      this.bookFormView.fillForm(bookToEdit);
      this.bookFormView.bindSubmitForm((formData) => {
        this.controller.editBook(id, formData);
      });
    } else {
      console.error(`Book with ID ${id} not found.`);
    }
  }

  handleDeleteBook(id) {
    const bookToDelete = this.booksData.find((book) => book.id === id);
    if (bookToDelete) {
      this.controller.deleteBook(id);
    } else {
      console.error(`Book with ID ${id} not found.`);
    }
  }
}

export default BookListView;
