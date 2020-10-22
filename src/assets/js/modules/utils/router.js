const routes = [];

(function () {
  // listen for popStateEvent, i.e. when "back" and "forwards" buttons are clicked

  window.addEventListener("popstate", (e) => {
    // Grab the history state id
    if (e.state === null) {
      return;
    }
    let statePath = e.state.path;
    console.log("The state  path is: " + statePath);
    console.log(routes);
    const currentRoute = routes.find((route) => route.path === statePath);
    Router.prototype.load_content(statePath, currentRoute);
  });
})();

export default class Router {
  constructor({ link, callback, path }) {
    this.link = link;
    this.path = path;
    this.callback = callback;
    this.init();
  }

  // methods

  init() {
    // Add history "push()" when links are clicked
    const { path } = this.link.dataset;
    routes.push({ path, callback: this.callback });
    this.link.addEventListener("click", (e) => {
      e.preventDefault();
      this.push(e);
    });
  }

  static getRoutes() {
    return routes;
  }

  load_content(path, currentRoute) {
    console.log(`The path is now ${path}`);
    if (this.callback) {
      return this.callback();
    }
    currentRoute.callback();
  }

  push(event) {
    // get id of the active link

    let path = this.path || event.currentTarget.dataset.path;
    this.load_content(path);

    // push state change to the address bar

    window.history.pushState({ path }, `${path}`, `${path}`);
  }
}
