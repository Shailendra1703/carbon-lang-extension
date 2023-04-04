import { Hover } from 'vscode';

export class CarbonHoverProvider {
    provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position);
        const word = document.getText(wordRange);

        switch (word) {
            case 'if':
                return new Hover('Conditionally execute a block of code.');
            case 'else':
                return new Hover('Execute a block of code if the preceding `if` statement is false.');
            case 'while':
                return new Hover('Execute a block of code while a specified condition is true.');
            case 'for':
                return new Hover('Execute a block of code for a specified number of times.');
            case 'int':
                return new Hover('A data type that represents an integer value.');
            case 'float':
                return new Hover('A data type that represents a floating-point number.');
            case 'string':
                return new Hover('A data type that represents a sequence of characters.');
            case 'bool':
                return new Hover('A data type that represents a Boolean value (`true` or `false`).');
            case 'void':
                return new Hover('A data type that represents the absence of a value.');
            case 'var':
                return new Hover('A keyword used to declare a variable.');
            case 'func':
                return new Hover('A keyword used to declare a function.');
            default:
                return new Hover('');
        }
    }
}
