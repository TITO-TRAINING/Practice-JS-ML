class Toast {
  constructor() {
    this.toastContainer = document.getElementById('toastContainer');
  }

  showToast(message, type = 'info') {
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast', type);
    toastElement.textContent = message;
    this.toastContainer.appendChild(toastElement);

    setTimeout(() => {
      toastElement.remove();
    }, 3000);
  }
}

export default Toast;
