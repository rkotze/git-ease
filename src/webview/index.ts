import "./dark.css";
import "./light.css";
import App from "./App.svelte";

declare var acquireVsCodeApi: any;

const vscode = acquireVsCodeApi();

vscode.postMessage({ command: "commitList" });

new App({
  target: document.getElementById("app"),
});
