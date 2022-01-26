import WebSocket, { WebSocketServer } from "ws";
import fs from "fs";

const filename = "log.json";

const server = new WebSocketServer({ port: process.env.PORT || 5000 });
server.on("connection", (socket) => {
  console.log("connection");

  socket.on("message", (message) => {
    console.log(ab2str(message));

    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      try {
        const content = JSON.parse(data);
        const newData = JSON.parse(ab2str(message));
        const key = Object.keys(newData)[0];
        console.log(key);
        content.logs[key] = newData[key];
      } catch (error) {
        console.log(error);
        return;
      }
      const content = JSON.parse(data);
      const newData = JSON.parse(ab2str(message))["data"];
      const key = Object.keys(newData)[0];
      console.log(key);
      content.logs[key] = newData[key];

      const writeStream = fs.createWriteStream(filename, { flags: "w" });
      writeStream.write(JSON.stringify(content));
      writeStream.end();
    });
    socket.send("roger that");
  });
});

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
