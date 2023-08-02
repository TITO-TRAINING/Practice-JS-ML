// Table.js
class Table {
  static generateBookRow(book) {
    const { id, title, author, category, publishedYear } = book;

    return `
      <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${category}</td>
        <td>${publishedYear}</td>
        <td>
          <button class="editButton" data-id="${id}">Edit</button>
          <button class="deleteButton" data-id="${id}">Delete</button>
        </td>
      </tr>
    `;
  }

  static generateTable(books) {
    const bookRows = books.map(Table.generateBookRow).join('');
    return `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Published Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${bookRows}
        </tbody>
      </table>
    `;
  }
}

export default Table;
