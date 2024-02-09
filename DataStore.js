Ext.define('Explorer.store.DataStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Explorer.model.DataModel',

    alias: 'store.data',
    storeId: 'dataStore',
    reference: 'dataStore',
    controller: 'explorer',


    root: {
        // id: 1,
        fileName: 'Docs',
        // date: new Date(),
        // fType : 'root',
        expanded: true,
        children: [{
            // id: 2,
            fileName: 'Extra',
            expanded: true,
            children: [{
                // id: 3,
                fileName: 'random.txt',
                leaf: true,
                draggable: true,
            }, {
                // id: 4,
                fileName: 'random2.txt',
                draggable: true,
                leaf: true,
            }]
        }, {
            // id: 5,
            fileName: 'Apple',
            fType: 'folder',
            expanded: true,
            children: [{
                // id: 6,
                fileName: 'random2.txt',
                leaf: true,
                draggable: true,
            }, {
                // id: 7,
                fileName: 'random.txt',
                draggable: true,
                leaf: true,
            }]
        }]
    }
})
