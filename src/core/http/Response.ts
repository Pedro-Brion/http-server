import * as net from "net";
import { byteSize } from "./utils";

const ReasonPhrase: Record<string, string> = {
  "200": "OK",
  "404": "Not Found",
  "405": "Method Not Allowed",
};
type HttpHeaders = Record<string, string>;

export class HttpResponse {
  private p_statusCode: string = "404";
  headers: HttpHeaders = {
    "Content-type": "text/plain",
  };

  constructor(private p_socket: net.Socket) {}

  status(number: string): HttpResponse {
    this.p_statusCode = number;
    return this;
  }

  send(response?: string) {
    const contentLength = byteSize(response ?? "");
    let httpResponse = `HTTP/1.1 ${this.p_statusCode}\r\nContent-Length:${contentLength}`;

    for (let header in this.headers) {
      httpResponse = httpResponse + `\r\n${header}:${this.headers[header]}`;
    }
    httpResponse = httpResponse + `\r\n\r\n${response}`;

    this.p_socket.write(httpResponse);
  }

  private reason(): string {
    return ReasonPhrase[this.p_statusCode];
  }
}
