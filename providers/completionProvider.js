import { CompletionItemKind } from 'vscode';

const keywords = ['if', 'else', 'while', 'for', 'return'];
const types = ['i', 'u', 'double', 'bool', 'char'];
const functions = ['Print', 'scanf', 'sqrt', 'pow', 'abs'];

export class CarbonCompletionProvider {
    provideCompletionItems(document, position) {
        const line = document.lineAt(position.line);
        const text = line.text.substr(0, position.character);
        const prevChar = text.length > 0 ? text[text.length - 1] : '';
        const prevWord = text.split(/\s+/).pop() || '';

        const completions = [];

        // Add keyword completions
        if (!prevWord || prevWord === ' ') {
            for (const keyword of keywords) {
                completions.push({
                    label: keyword,
                    kind: CompletionItemKind.Keyword,
                    detail: 'Carbon keyword'
                });
            }
        }

        // Add type completions
        if (prevWord === 'int' || prevWord === 'float' || prevWord === 'double' || prevWord === 'bool' || prevWord === 'char') {
            for (const type of types) {
                completions.push({
                    label: type,
                    kind: CompletionItemKind.TypeParameter,
                    detail: 'Carbon type'
                });
            }
        }

        // Add function completions
        if (prevChar === '.' || prevChar === '(') {
            for (const func of functions) {
                completions.push({
                    label: func,
                    kind: CompletionItemKind.Function,
                    detail: 'Carbon function'
                });
            }
        }

        return completions;
    }
}
