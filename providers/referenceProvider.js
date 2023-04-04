import * as vscode from "vscode";

export class CarbonReferenceProvider {
  provideReferences(document, position, context) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);

    // Search for references of the current word in the entire workspace
    const locations = [];

    vscode.workspace.findFiles("**/*.carbon").then((uris) => {
      for (const uri of uris) {
        vscode.workspace.openTextDocument(uri).then((document) => {
          const pattern = new RegExp(`\\b${word}\\b`, "g");
          let match;
          let line = 0;

          while ((match = pattern.exec(document.getText()))) {
            const pos = document.positionAt(match.index);
            const range = document.getWordRangeAtPosition(pos);
            locations.push(new vscode.Location(uri, range));
            line = range.start.line;
          }

          if (locations.length > 0) {
            // Show references in the "References" view
            vscode.commands.executeCommand(
              "editor.action.showReferences",
              uri,
              line,
              word
            );
          }
        });
      }
    });

    return locations;
  }
}
