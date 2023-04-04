import * as vscode from "vscode";
// import { CarbonSignatureHelpProvider } from "./providers/signatureProvider.js";
import { CarbonDefinitionProvider } from "./providers/definitionProvider.js";
import { CarbonCompletionProvider } from "./providers/completionProvider.js";
import { CarbonReferenceProvider } from "./providers/referenceProvider.js";
import { CarbonRenameProvider } from "./providers/renameProvider.js";
import { CarbonHoverProvider } from "./providers/hoverProvider.js";

const languageConfig = {
  comments: {
    lineComment: "//",
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"', notIn: ["string"] },
    { open: "'", close: "'", notIn: ["string"] },
  ],
  surroundingPairs: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    ["'", "'"],
    ['"', '"'],
    ["`", "`"],
  ],
};

const CARBON = { language: "carbon", scheme: "file" };

function activate(context) {
  console.log('Congratulations, your extension "carbon-lang" is now active!');
  let disposable = vscode.commands.registerCommand(
    "carbon-lang.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from Carbon Lang!");
    }
  );

  context.subscriptions.push(
    // @ts-ignore
    vscode.languages.setLanguageConfiguration(CARBON.language, languageConfig)
  );
  context.subscriptions.push(disposable);
  context.subscriptions.push(
    vscode.languages.registerRenameProvider(CARBON, new CarbonRenameProvider())
  );
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(CARBON, new CarbonHoverProvider())
  );
  // context.subscriptions.push(
  //   vscode.languages.registerSignatureHelpProvider(CARBON,new CarbonSignatureHelpProvider(),"(")
  // );
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      CARBON,
      new CarbonDefinitionProvider()
    )
  );
  context.subscriptions.push(
    vscode.languages.registerReferenceProvider(
      CARBON,
      new CarbonReferenceProvider()
    )
  );
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      CARBON,
      new CarbonCompletionProvider(),
      "."
    )
  );
}

// This method is called when your extension is deactivated
function deactivate() {}

export default {
  activate,
  deactivate,
};
