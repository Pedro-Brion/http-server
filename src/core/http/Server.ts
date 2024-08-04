import * as net from "net";
import { HttpRouter } from "./Router";
import { HttpResponse } from "./Response";
import { HttpRequest } from "./Request";
import { RouteBuilder } from "./Route";

export class HttpServer {
  private p_server: net.Server;
  private p_port: number;
  private p_router: HttpRouter;

  constructor(port: number) {
    this.p_router = HttpRouter.instance;
    this.p_port = port;

    this.p_server = net.createServer((socket) => {
      const response = new HttpResponse(socket);
      socket.on("data", (_data) => {
        const request = new HttpRequest(_data.toString());
        const route = this.p_router.search(request.path, request.method);
        request.params = route.params;

        if (!route.found) response.status("404").send();
        else if (!route.handle) response.status("405").send();
        else route.handle(request, response);
        socket.end();
      });

      socket.on("close", () => {
        console.log("Closing!");
        socket.end();
      });
    });
  }

  init(cb?: () => void) {
    this.p_server.listen(this.p_port, "localhost", cb);
  }

  route(route: string): RouteBuilder {
    return this.p_router.route(route);
  }
}
