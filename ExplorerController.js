Ext.define('Explorer.view.main.ExplorerController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.explorer',
    onExpandAllClick: function () {
        this.getView().expandAll();
    },
    pvtExpandSelected: function () {
        var LSelectedEl = Ext.getCmp('expView').getSelection()[0];
        if (LSelectedEl.isLeaf()) { return; }
        console.log('expanded')
        LSelectedEl.expand();

    },
    pvtCollapseSelected: function () {
        var LSelectedEl = Ext.getCmp('expView').getSelection()[0];
        if (LSelectedEl.isLeaf()) { return; }
        console.log('expanded')
        LSelectedEl.collapse();

    },
    onCollapseAllClick: function () {
        this.getView().collapseAll()
    },
    onAddFileClick: function () {
        this.getViewModel().set('title', 'File');
        var selectedEl = Ext.getCmp('expView').getSelection();
        Ext.create('view.popup').show();
    },
    onAddFolderClick: function () {
        this.getViewModel().set('title', 'Folder');
        var selectedEl = Ext.getCmp('expView').getSelection();
        Ext.create('view.popup').show();
    },
    onRefreshClick: function () {
        // console.log(Ext.getStore('dataStore'))
        // Ext.getStore('dataStore').reload();
        // // Ext.up('Panel').destroy();
        // // Ext.create('view.treePanel');
        var dataStore = Ext.getStore('dataStore');

        // Check if the store is already loaded
        if (!dataStore.isLoaded()) {
            // If not loaded, load the store
            dataStore.load({
                callback: function (records, operation, success) {
                    if (success) {
                        // Handle successful load
                        console.log('Store reloaded successfully');
                    } else {
                        // Handle load failure
                        console.error('Failed to reload store');
                    }
                }
            });
        } else {
            // If already loaded, simply reload
            dataStore.reload({
                callback: function (records, operation, success) {
                    if (success) {
                        // Handle successful reload
                        console.log(Ext.getStore('dataStore'));
                        console.log('Store reloaded successfully');
                    } else {
                        // Handle reload failure
                        console.error('Failed to reload store');
                    }
                }
            });
        }
    },
    onDeleteClick: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure you want to delete this item?', function (btn) {
            if (btn === 'yes') {
                var selected = Ext.getCmp('expView').getSelection();
                for (n of selected) {
                    par = n.parentNode;
                    par.removeChild(n);
                }
            } else {
                console.log('User canceled deletion');
            }
        });
    },
    onMoveUpClick: function () {
        var LTreePanel = Ext.getCmp('expView');
        var LSelectedNode = LTreePanel.getSelection()[0];
        if (LSelectedNode) {
            var LParentNode = LSelectedNode.parentNode;
            var index = LParentNode.indexOf(LSelectedNode);
            if (index > 0) {
                LParentNode.insertChild(index - 1, LSelectedNode); 
            }
        } else {
            console.error('Select appropriate node')
        }
    },
    onMoveDownClick: function () {
        var LTreePanel = Ext.getCmp('expView');
        var LSelectedNode = LTreePanel.getSelection()[0];
        if (LSelectedNode) {
            var LParentNode = LSelectedNode.parentNode;
            var index = LParentNode.indexOf(LSelectedNode);
            if (index < LParentNode.childNodes.length - 1) {
                LParentNode.insertChild(index + 2, LSelectedNode);
            }
        } else {
            console.error('Select appropriate node')
        }
    },
    pvtCreateCustomContextMenu: function (view, record, item, index, e) {
        e.stopEvent();
        var Lmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Move Up',
                handler: 'onMoveUpClick',
                iconCls: 'fa fa-arrow-up'
            }, {
                text: 'Move Down',
                handler: 'onMoveDownClick',
                iconCls: 'fa fa-arrow-down'
            }, {
                text: 'Collapse',
                handler: 'pvtCollapseSelected',
                iconCls: 'fas fa-compress-alt'
            }, {
                text: 'Expand',
                handler: 'pvtExpandSelected',
                iconCls: 'fas fa-expand'
            }],
        });
        Lmenu.showAt(e.getXY());
    }
})
