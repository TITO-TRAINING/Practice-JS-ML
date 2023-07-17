// class BookService {
//   constructor() {}

//   async getBooks() {
//     try {
//       const response = await fetch("http://localhost:3000/books");
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error getting books:", error);
//       return [];
//     }
//   }

//   async createBook(book) {
//     try {
//       const response = await fetch("http://localhost:3000/books", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(book),
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error creating book:", error);
//       return null;
//     }
//   }
// }

// export default BookService;
