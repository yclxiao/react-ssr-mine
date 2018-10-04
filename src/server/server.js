import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import express from "express";
import "isomorphic-fetch";

import createStore from "../client/users/store";
import App from "../client/App.js";

const app = express();

app.use(express.static(__dirname + "/../"));
app.use(express.static(__dirname + "/../../data"));

app.get("*", (req, res) => {
  //服务端渲染的方式
  const store = createStore();
  const unsubscribe = store.subscribe(() => {
    const users = store.getState().users;

    if (users !== null && users.length > 0) {
      unsubscribe();

      res.set("Content-Type", "text/html");
      res.send(`
        <html>
          <head>
            <title>App</title>
            <style>
              body {
                font-size: 18px;
                font-family: Verdana;
              }
            </style>
          </head>
          <body>
            <div id="content">${ReactDOMServer.renderToString(
              <Provider store={store}>
                <App />
              </Provider>
            )}</div>
            <script src="/bundle.js"></script>
            <script>
              window.__APP_STATE = ${JSON.stringify(store.getState())};
            </script>
          </body>
        </html>
      `);
    }
  });

  ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // 客户端渲染方式
  /* res.set("Content-Type", "text/html");
  res.send(`
        <html>
          <head>
            <title>App</title>
            <style>
              body {
                font-size: 18px;
                font-family: Verdana;
              }
            </style>
          </head>
          <body>
            <div id="content"></div>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `); */
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
