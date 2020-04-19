import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./semantic/dist/semantic.min.css";
import * as serviceWorker from "./serviceWorker";

console.log("main",new Date().getTime())
window.addEventListener("appinstalled",()=>console.log("appinstalled",new Date().getTime()))
window.addEventListener("load",()=>console.log("load",new Date().getTime()))
window.addEventListener("beforeinstallprompt",(e)=>{
  e.prompt();
  console.log("beforeinstallprompt",new Date().getTime());
})

ReactDOM.render(
  <App />,
  document.getElementById("root") // eslint-disable-line no-undef
);

serviceWorker.register();
