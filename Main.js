/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

Ext.define('Explorer.view.main.Main', {
    extend: 'Ext.tree.Panel',
    title: 'File Explorer',
    controller: 'explorer',
    id: 'expView',
    requires: [
        'Explorer.store.DataStore',
    ],
    plugins: {
        gridfilters: true // Enable grid filters plugin
    },
    viewModel: {
        type: 'main'
    },

    reference: 'fileExp',

    store: {
        type: 'data',
        folderSort: true,
        sorters: [{
            property: 'text',
            direction: 'ASC'
        }],
        // filters: [{
        //     property: 'fileName',
        //     value: '',
        //     anyMatch: true,
        //     caseSensitive: false
        // }]
        filter: {
            type: 'string', // Specify the filter type (string, number, date, etc.)
            operator: 'like' // Specify the filter operator (like, =, <, >, etc.)
        }
    },
    alias: 'view.treePanel',
    xtype: 'view.treePanel',
    header: true,
    dataIndex: 'file',

    ui: 'navigation',
    reserveScrollbar: true,
    multiSelect: true,
    folderSort: true,
    lines: true,
    columns: [{
        xtype: 'treecolumn',
        text: 'This PC',
        dataIndex: 'fileName',
        flex: 1,
        sortable: true, editor: 'textfield',
        filter: {
            type: 'string',
            operator: '/=' // RegExp.test() operator
        }
    }],


    useArrows: true,


    tbar: {
        reference: 'tbar',
        items: [{
            text: 'Expand All',
            handler: 'onExpandAllClick'
            ,
            iconCls: "fas fa-expand"
        }, {
            text: 'Collapse All',
            handler: 'onCollapseAllClick'
            ,
            iconCls: "fas fa-compress-alt"
        }, {
            text: 'Add File',
            handler: 'onAddFileClick'
            ,
            iconCls: "fa fa-file"
        }, {
            text: 'Add Folder',
            handler: 'onAddFolderClick'
            ,
            iconCls: "fas fa-folder-plus"
        }, {
            text: 'Refresh',
            handler: 'onRefreshClick',
            iconCls: 'fas fa-sync-alt'
        }, {
            text: 'Delete',
            handler: 'onDeleteClick',
            iconCls: 'fa fa-trash'
        }, {
            text: 'Move Up',
            handler: 'onMoveUpClick',
            iconCls: 'fa fa-arrow-up'
        }, {
            text: 'Move Down',
            handler: 'onMoveDownClick',
            iconCls: 'fa fa-arrow-down'
        }]
    },
    bbar: [{
        xtype: 'displayfield',
        fieldLabel: 'Path',
        itemId: 'file-path',
        inputAttrTpl: 'style="font-size: 26px;"',

        bind: {
            html: '{selectionText}'
        },
        padding: '10 0 10 10 ',
        style: {
            width: '400px',
            height: '50px',
            fontSize: '20px',
            itemAlign: 'center'
        },
    }],


    viewConfig: {

        plugins: {
            ptype: 'treeviewdragdrop',
            containerScroll: true
        },
    },
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],

    listeners: {

        itemcontextmenu: 'pvtCreateCustomContextMenu'
        // plugins: {
        //     gridfilterbar: true
        // },
    }

    // store: store

});
