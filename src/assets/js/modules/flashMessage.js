export default class FlashMessage {
  constructor() {
    this.messageElement = document.querySelector(".flashMessage__message");
    this.clickListenerBind = this.hide.bind(this);
  }

  // events
  events() {
    document.addEventListener("click", this.clickListenerBind);
  }

  // methods
  error(message) {
    this.messageElement.innerHTML = message;
    this.messageElement.classList.add("flashMessage--error");
    this.show();
  }

  warning(message) {
    this.messageElement.innerHTML = message;
    this.messageElement.classList.add("flashMessage--warning");
    this.show();
  }

  success(message) {
    this.messageElement.innerHTML = message;
    this.messageElement.classList.add("flashMessage--success");
    this.show();
  }

  show() {
    this.messageElement.classList.add("flashMessage--active");

    setTimeout(() => this.events(), 3000);
  }

  hide(e) {
    console.log(e.target);
    if (e.target !== this.messageElement) {
      this.messageElement.textContent = "";
      this.messageElement.removeAttribute("class");
      this.removeClickListener(document);
    }
  }

  removeClickListener(element) {
    console.log("Removing click listener...");
    element.removeEventListener("click", this.clickListenerBind);
  }
}
