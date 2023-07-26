// views/Toast.js
class Toast {
  constructor() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.classList.add('toast-container');
    document.body.appendChild(this.toastContainer);
  }

  show(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.classList.add('toast', type);
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000); // Remove the toast after 3 seconds
  }
}

export default Toast;
