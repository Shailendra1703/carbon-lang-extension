import * as vscode from "vscode";

export class CarbonDefinitionProvider {
  async provideDefinition(document, position, token) {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);

    // Call a command to retrieve the definition location
    const uri = await vscode.commands.executeCommand("carbon-lang.selectFile");

    if (uri) {
      const targetDocument = await vscode.workspace.openTextDocument(uri);
      const regex = new RegExp(`\\b${word}\\b`);
      const match = targetDocument.getText().match(regex);

      if (match) {
        const targetPosition = targetDocument.positionAt(match.index);
        // @ts-ignore
        return new vscode.Location(uri, targetPosition);
      }
    }

    return undefined;
  }
}
