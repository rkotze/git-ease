import "./dark.css";
import "./light.css";
import App from "./App.svelte";

declare var acquireVsCodeApi: any;

const vscode = acquireVsCodeApi();

new App({
  target: document.getElementById("git-ease-app"),
  props: {
    vscode,
  },
});
