// server.js
import express from "express";

const app = express();

app.use(express.static(__dirname + './../'));
app.use(express.static(__dirname + './../../data'));

app.get("*", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(`
  <html>
   <head>
    <title>App</title>
   </head>
   <body>
    <div id="content"></div>
    <script src="./../bundle.js"></script>
   </body>
  </html>
 `);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
