class FormRenderer {
  static render(book = {}, mode = 'add') {
    const { title = '', author = '', category = '', publishedYear = '' } = book;

    return `
      <form id="bookForm" data-mode="${mode}">
        <div class="form-group">
          <label for="titleInput">Title:</label>
          <input type="text" id="titleInput" placeholder="Title" value="${title}" >
        </div>
        <div class="form-group">
          <label for="authorInput">Author:</label>
          <input type="text" id="authorInput" placeholder="Author" value="${author}" >
        </div>
        <div class="form-group">
          <label for="category">Category:</label>
          <input type="text" id="category" placeholder="Category" value="${category}" >
        </div>
        <div class="form-group">
          <label for="publishedYearInput">Published Year:</label>
          <input type="text" id="publishedYearInput" placeholder="Published Year" value="${publishedYear}" >
        </div>
        <div class="form-group">
          <button type="submit">${mode === 'edit' ? 'Update' : 'Add'}</button>
          <button type="button" id="cancelButton">Cancel</button>
        </div>
      </form>
    `;
  }
}

export default FormRenderer;
