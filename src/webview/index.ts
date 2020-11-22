import "./dark.css";
import "./light.css";
declare var acquireVsCodeApi: any;

const vscode = acquireVsCodeApi();

window.addEventListener("message", (event) => {
  const message = event.data;
  console.log("message as sent.", message.command);

  switch (message.command) {
    case "commitList":
      console.log(message.data);
      break;
  }
});

vscode.postMessage({ command: "commitList" });

const app = document.getElementById("app");
if (app) {
  app.innerHTML = "JS wave hello";
}
