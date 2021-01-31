import "./dark.css";
import "./light.css";
import App from "./App.svelte";
import { CommandNames } from "../command-names";

declare var acquireVsCodeApi: any;

const vscode = acquireVsCodeApi();

vscode.postMessage({ command: CommandNames.PANEL_READY });

new App({
  target: document.getElementById("app"),
  props: {
    vscode,
  },
});
