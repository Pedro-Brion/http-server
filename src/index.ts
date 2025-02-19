import { HttpServer } from "./core/http/Server";

const port = 3000;
const http = new HttpServer(port);

http.route("/").get((_req, _res) => _res.status("200").send("Ok, server funcionando"));

http.route("/echo/:str").get((_req, _res) => {
  const { params } = _req;
  _res.status("200").send(params.str);
});

http.init(() => console.log("Server started on port " + port));
