import * as vscode from "vscode";

export class CarbonRenameProvider {
  async provideRenameEdits(document, position, newName, token) {
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange) {
      return null;
    }
    const currentWord = document.getText(wordRange);
    if (currentWord !== "oldVariableName") {
      return null;
    }
    const edit = new vscode.WorkspaceEdit();
    edit.replace(document.uri, wordRange, newName);
    return edit;
  }
}
