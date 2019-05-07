const getEditorType = type => {
    const itsCodeEditor = () => 'It is a code editor';
    const itsIDE = () => 'It is an IDE';

    const editors = {
        atom: itsCodeEditor,
        sublime: itsCodeEditor,
        vscode: itsCodeEditor,
        webstorm: itsIDE,
        pycharm: itsIDE,
        default: () => 'unknown'
    };

    return (editors[type] || editors.default)();
};

const vscodeType = getEditorType('vscode'); // Returns 'It is a code editor'
