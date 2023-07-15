class BookListView {
  constructor() {
    this.bookList = document.getElementById("book-list");
  }

  displayBooks(books) {
    this.bookList.innerHTML = "";
    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book-item");
      bookItem.textContent = `${book.title} - ${book.author}`;
      this.bookList.appendChild(bookItem);
    });
  }
}
export default BookListView;
