const routes = [];

(function () {
  // listen for popStateEvent, i.e. when "back" and "forwards" buttons are clicked

  window.addEventListener("popstate", (e) => {
    // Grab the history state id
    if (e.state === null) {
      return;
    }
    let statePath = e.state.path;
    console.clear();
    console.log("The state  path is: " + statePath);
    console.log(routes);
    const currentRoute = routes.find((route) => route.path === statePath);
    Router.prototype.load_content(statePath, currentRoute);
  });
})();

// if it is already registered, don't add event. change the path instead

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
    const path = this.path || this.link.dataset.path;
    const doesRouteExist = routes.find((route) => route.path === path);
    if (!doesRouteExist) {
      console.log(`will push ${path} in the array`);
      routes.push({ path, callback: this.callback });
    }

    this.link.addEventListener("click", (e) => {
      this.onClick(e);
    });
  }

  onClick(e) {
    e.preventDefault();
    console.log("on click invokes");
    this.pushHistory(e);
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

  pushHistory(event) {
    // get id of the active link

    let path = this.path || event.currentTarget.dataset.path;
    this.load_content(path);

    // push state change to the address bar

    const currentState = window.history.state;
    const noStateOrDifferentState =
      !currentState || (currentState && currentState.path !== path);
    // const doesNotAlreadyHaveHistory = historyTrack.find(
    //   (track) => track === path
    // );
    // console.log(doesNotAlreadyHaveHistory);
    if (noStateOrDifferentState) {
      console.log("pushing state in history: ", path);
      window.history.pushState({ path }, `${path}`, `${path}`);
    }
  }
}
