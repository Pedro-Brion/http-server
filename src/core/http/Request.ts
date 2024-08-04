import { HttpMethod, RouteParams } from "./types";

export class HttpRequest {
  method: HttpMethod;
  path: string;
  params: RouteParams = {};

  constructor(req: string) {
    const reqStartLine = req.split("\r\n")[0];

    const method = reqStartLine.split(" ")[0] as HttpMethod;
    const path = reqStartLine.split(" ")[1];

    this.method = method;
    this.path = path;
  }
}
