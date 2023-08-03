class FormValidator {
  static isValidDate(dateString) {
    const date = Date.parse(dateString);
    return !isNaN(date);
  }

  static isNumeric(input) {
    const numericRegex = /^[\d/]+$/;
    return numericRegex.test(input);
  }

  static validateForm(title, author, category, publishedYear) {
    const errors = {};

    if (title.trim() === '') {
      errors.title = 'Title is required.';
    } else if (title.trim().length < 3 || title.trim().length > 100) {
      errors.title = 'Title must be between 3 and 100 characters.';
    }

    if (author.trim() === '') {
      errors.author = 'Author is required.';
    } else if (author.trim().length < 3 || author.trim().length > 100) {
      errors.author = 'Author must be between 3 and 100 characters.';
    }

    if (category.trim() === '') {
      errors.category = 'Category is required.';
    } else if (category.trim().length < 3 || category.trim().length > 50) {
      errors.category = 'Category must be between 3 and 50 characters.';
    }

    if (publishedYear.trim() === '') {
      errors.publishedYear = 'Published Year is required.';
    } else if (!this.isValidDate(publishedYear)) {
      errors.publishedYear =
        'Invalid Published Year. Please use a valid date format.';
    } else if (!this.isNumeric(publishedYear)) {
      errors.publishedYear = 'Published Year must be a valid number.';
    } else {
      const year = parseInt(publishedYear, 10);
      const currentYear = new Date().getFullYear();
      if (year < 1800 || year > currentYear) {
        errors.publishedYear =
          'Published Year must be between 1800 and the current year.';
      }
    }

    return errors;
  }
}

export default FormValidator;
