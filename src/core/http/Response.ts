import * as net from "net";

const ReasonPhrase: Record<string, string> = {
  "200": "OK",
  "404": "Not Found",
  "405": "Method Not Allowed",
};

export class HttpResponse {
  private p_statusCode: string = "404";

  constructor(private p_socket: net.Socket) {}

  status(number: string): HttpResponse {
    this.p_statusCode = number;
    return this;
  }

  send(response?: string) {
    this.p_socket.write(
      `HTTP/1.1 ${
        this.p_statusCode
      } ${this.reason()}\r\nContent-Type: text/plain\r\nContent-Length:${
        response?.length || 0
      }\r\n\r\n${response} `
    );
  }

  private reason(): string {
    return ReasonPhrase[this.p_statusCode];
  }
}
