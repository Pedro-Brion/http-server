import { HttpMethod, RouteParams } from "./types";
type HttpHeaders = Record<string, string>;
export class HttpRequest {
  method: HttpMethod;
  path: string;
  params: RouteParams = {};
  headers: HttpHeaders = {};
  body: string = "";

  constructor(req: string) {
    const requestLines = req.split("\r\n");
    const reqStartLine = requestLines[0];

    this.method = reqStartLine.split(" ")[0] as HttpMethod;
    this.path = reqStartLine.split(" ")[1];

    let previousLine = "";
    for (let i = 1; i <= requestLines.length; i++) {
      const line = requestLines[i];
      if ((previousLine === "\r\n" && line === "\r\n") || !line.includes(":"))
        break;

      const parts = line.split(": ");

      this.headers[parts[0]] = parts[1];
    }
    this.body = requestLines[requestLines.length - 1];

    console.log("PARSED REQUEST::::::");
    console.log(this)
  }
}
