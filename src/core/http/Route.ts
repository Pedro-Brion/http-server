import { HttpRouter } from "./Router";
import { HttpMethod, RouteHandler } from "./types";

export class RouteNode {
  private p_methods: Map<HttpMethod, RouteHandler>;
  private p_children: Map<string, RouteNode>;
  paramName: string | null = null;

  constructor() {
    this.p_methods = new Map();
    this.p_children = new Map();
  }

  addNode(path: string): RouteNode {
    const node = new RouteNode();
    if (path.startsWith(":")) {
      node.paramName = path.substring(1);
      this.p_children.set("*", node);
    } else {
      this.p_children.set(path, node);
    }
    return node;
  }

  find(path: string): RouteNode | null {
    let node = this.p_children.get(path);
    if (!node) {
      node = this.p_children.get("*");
    }
    return node || null;
  }

  addMethod(method: HttpMethod, handler: RouteHandler) {
    this.p_methods.set(method, handler);
  }

  handle(method: HttpMethod) {
    return this.p_methods.get(method);
  }
}
export class RouteBuilder {
  private router: HttpRouter;
  private path: string;

  constructor(router: HttpRouter, path: string) {
    this.router = router;
    this.path = path;
  }

  get(handler: RouteHandler) {
    this.router.addRoute(this.path, "GET", handler);
    return this;
  }

  post(handler: RouteHandler) {
    this.router.addRoute(this.path, "GET", handler);
    return this;
  }
}
