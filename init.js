atom.contextMenu.itemSets[35].items[5].command = 'permanent-delete:delete';
atom.contextMenu.itemSets[41].items[0].command = 'permanent-delete:delete';

atom.commands.add('atom-text-editor', {
    'custom:get-path': () => {
        let editor = atom.workspace.getActiveTextEditor();

        let path = editor.buffer.file.path;
        let projects = atom.project.getPaths();
        for (let project of projects) {
            path = path.replace(project, '');
        }

        path = path.replace(/\\/g, '/');
        let path_chunks = path = path.split('/');

        let is_vue = false;
        let is_php = false;

        if (path_chunks[path_chunks.length - 1].match(/\.vue/)) {
            is_vue = true;
        }
        if (path_chunks[path_chunks.length - 1].match(/\.php/)) {
            is_php = true;
        }

        path_chunks.shift();
        path_chunks.pop();

        if (is_vue) {
            path_chunks.shift();
            path = '@/' + path_chunks.join('/') + '/';
        } else if (is_php) {
            path = path_chunks.join('\\\\');
        } else {
            path = '/' + path_chunks.join('/');
        }

        let snippet = atom.packages.activePackages.snippets.mainModule;
        snippet.insert(path);
    },
});
