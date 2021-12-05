import express from "express";
import ip from "ip";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;
const filename = "log.json";

app.get("/", (request, response) => {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      onsole.log(err);
      return;
    }

    const content = JSON.parse(data);
    if (request.query.data) {
      console.log(request.query.data);
      const newData = JSON.parse(request.query.data);
      const key = Object.keys(newData)[0];
      console.log(key);
      content.logs[key] = newData[key];
    }
    const writeStream = fs.createWriteStream(filename, { flags: "w" });
    writeStream.write(JSON.stringify(content));
    writeStream.end();

    response.send("Hello World!");
  });
});

app.listen(port, () => {
  console.log(`Logger listening at http://${ip.address()}:${port}`);
});
