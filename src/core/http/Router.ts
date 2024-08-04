import { RouteBuilder, RouteNode } from "./Route";
import { HttpMethod, RouteHandler, RouteParams } from "./types";

export class HttpRouter {
  private root: RouteNode;
  static #instance: HttpRouter;

  private constructor() {
    this.root = new RouteNode();
  }

  public static get instance(): HttpRouter {
    if (!HttpRouter.#instance) {
      HttpRouter.#instance = new HttpRouter();
    }

    return HttpRouter.#instance;
  }

  addRoute(path: string, method: HttpMethod, handle: RouteHandler) {
    let currentRouteNode: RouteNode | null = this.root;
    const segments = path.split("/").filter(Boolean);

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const nextRoute: RouteNode | null = currentRouteNode!.find(segment);
      if (!nextRoute) {
        currentRouteNode = currentRouteNode?.addNode(segment);
      } else {
        currentRouteNode = nextRoute;
      }
    }
    currentRouteNode.addMethod(method, handle);
  }

  search(
    path: string,
    method: HttpMethod
  ): { handle: RouteHandler | null; params: RouteParams; found: boolean } {
    let currentRouteNode: RouteNode | null = this.root;
    const segments = path.split("/").filter(Boolean);
    const params: RouteParams = {};

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentRouteNode = currentRouteNode.find(segment);
      if (currentRouteNode?.paramName)
        params[currentRouteNode?.paramName] = segment;
      if (!currentRouteNode) break;
    }
    return {
      handle: currentRouteNode?.handle(method) ?? null,
      params,
      found: !!currentRouteNode,
    };
  }

  route(path: string): RouteBuilder {
    return new RouteBuilder(this, path);
  }
}
