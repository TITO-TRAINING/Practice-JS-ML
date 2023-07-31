class FormValidator {
  static isValidDate(dateString) {
    // Validate date in the format "dd/mm/yyyy"
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!dateString.match(dateRegex)) {
      return false;
    }

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  }

  static isNumeric(input) {
    // Check if the input is a valid number or contains '/'
    const numericRegex = /^[\d/]+$/;
    return numericRegex.test(input);
  }

  static validateForm(title, author, category, publishedYear) {
    const errors = {};

    if (title.trim() === '') {
      errors.title = 'Title is required.';
    }

    if (author.trim() === '') {
      errors.author = 'Author is required.';
    }

    if (category.trim() === '') {
      errors.category = 'Category is required.';
    }

    if (publishedYear.trim() === '') {
      errors.publishedYear = 'Published Year is required.';
    } else if (!this.isValidDate(publishedYear)) {
      errors.publishedYear =
        'Invalid Published Year. Please use the format dd/mm/yyyy.';
    } else if (!this.isNumeric(publishedYear)) {
      errors.publishedYear = 'Published Year must be a valid number.';
    }

    return errors;
  }
}

export default FormValidator;
