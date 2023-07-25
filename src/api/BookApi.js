import BookServer from './server/BookServer';

class BookService {
  getAllBooks() {
    return BookServer.get('');
  }

  getBookById(bookId) {
    return BookServer.get(`/${bookId}`);
  }

  addBook(book) {
    return BookServer.post('', book);
  }

  updateBook(bookId, updatedBook) {
    return BookServer.put(`/${bookId}`, updatedBook);
  }

  deleteBook(bookId) {
    return BookServer.delete(`/${bookId}`);
  }
}

export default BookService;
