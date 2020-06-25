export default class PreLoader {
    constructor() {
        this.loader = document.getElementById("loader");
        this.showLoader();
        this.events();
    }

    events() {
        //hide the loader on "load"
        window.addEventListener("DOMContentLoaded", () => {
            this.hideLoader();
        });
    }

    showLoader() {
        loader.classList.add("loaderActive");
    }

    hideLoader() {
        loader.classList.remove("loaderActive");
    }
}