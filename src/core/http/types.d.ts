import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";

export type RouteHandler = (req: HttpRequest, res: HttpResponse) => void;
export type RouteParams = { [key: string]: string };
export type HttpMethod = "GET" | "POST";
