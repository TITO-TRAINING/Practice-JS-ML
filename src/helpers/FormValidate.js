import messages from '../constants/message';

class FormValidator {
  static isValidDate(dateString) {
    return !isNaN(Date.parse(dateString));
  }

  static isNumeric(input) {
    return /^\d+$/.test(input);
  }

  static validateForm(title, author, category, publishedYear) {
    const errors = {};

    if (!title.trim()) {
      errors.title = messages.titleRequired;
    } else if (!/^.{3,100}$/.test(title.trim())) {
      errors.title = messages.titleLength;
    }

    if (!author.trim()) {
      errors.author = messages.authorRequired;
    } else if (!/^.{3,100}$/.test(author.trim())) {
      errors.author = messages.authorLength;
    }

    if (!category.trim()) {
      errors.category = messages.categoryRequired;
    } else if (!/^.{3,50}$/.test(category.trim())) {
      errors.category = messages.categoryLength;
    }

    if (!publishedYear.trim()) {
      errors.publishedYear = messages.publishedYearRequired;
    } else if (!this.isValidDate(publishedYear)) {
      errors.publishedYear = messages.invalidPublishedYear;
    } else if (!/^\d+$/.test(publishedYear)) {
      errors.publishedYear = messages.publishedYearNumeric;
    } else {
      const year = parseInt(publishedYear, 10);
      const currentYear = new Date().getFullYear();
      if (year < 1800 || year > currentYear) {
        errors.publishedYear = messages.publishedYearRange;
      }
    }

    return errors;
  }
}

export default FormValidator;
