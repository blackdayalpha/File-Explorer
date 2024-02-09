/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Explorer.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    
    formulas: {
        selectionText: function (get) {
            var selection = get('fileExp.selection'), path;
            if (selection) {
                path = selection.getPath('fileName');
                path = path.replace(/^\/Root/, '');
                return 'Selected: ' + path;
            } else {
                return 'No node selected';
            }
        }
    },
    //TODO - add data, formulas and/or methods to support your view
});
