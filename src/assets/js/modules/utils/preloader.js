export default class PreLoader {
  constructor() {
    this.loader = document.getElementById("loader");
    this.showLoader();
    this.events();
  }

  events() {
    // hide the loader on "load"
    window.addEventListener("DOMContentLoaded", () => {
      this.hideLoader();
    });
  }

  showLoader() {
    loader.classList.add("loaderActive");
    console.log("showing loader");
  }

  hideLoader() {
    loader.classList.remove("loaderActive");
    console.log("hiding loader");
  }
}
