Ext.define('Explorer.view.main.AddFile', {
    extend: 'Ext.window.Window',
    title: 'Add File',
    alias: 'view.popup',
    xtype: 'popup',
    controller: 'explorer',
    width: 300,
    height: 150,
    modal: true,
    layout: 'fit',

    bind: {
        title: 'Add {title}',
    },


    floating: true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        bodyPadding: 10,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'fileName',
            bind: {
                fieldLabel: '{title} Name',
            }
        }],
        buttons: [{
            text: 'Add',
            bind: {
                text: 'Add {title}'
            },
            handler: function () {
                var fileName = this.up('form').getForm().getFieldValues().fileName;
                let selectedNode = Ext.getCmp('expView').getSelection();


                let controller = new Explorer.view.main.ExplorerController();

                if (controller.onSaveClick(fileName, selectedNode)) {



                    var title = this.lookupViewModel().get('title');
                    // console.log('Title:', title);
                    let isLeaf = true;
                    if (title === 'Folder') {
                        // console.log('inside folder')
                        isLeaf = false;
                    }
                    if (selectedNode && selectedNode.length == 1 && fileName) {
                        let newNode = Ext.create('Ext.data.TreeModel', {
                            fileName: fileName,
                            leaf: isLeaf,
                            expanded: true,
                            draggable: true,
                        });

                        if (!selectedNode[0].isLeaf()) {
                            selectedNode[0].appendChild(newNode);
                        } else {
                            selectedNode[0].parentNode.appendChild(newNode);
                        }
                        this.up('window').destroy();
                    } else {
                        // Handle case when no node is selected
                        console.error('Error while adding the file');
                    }
                }
                controller.destroy();
            }
            // handler: function () {
            //     var fileName = this.up('form').getForm().getFieldValues().fileName;
            //     let selectedNode = Ext.getCmp('expView').getSelection();

            //     var title = this.lookupViewModel().get('title');
            //     // console.log('Title:', title);
            //     let isLeaf = true;
            //     if (title === 'Folder') {
            //         // console.log('inside folder')
            //         isLeaf = false;
            //     }
            //     if (selectedNode && selectedNode.length == 1 && fileName) {
            //         let newNode = Ext.create('Ext.data.TreeModel', {
            //             fileName: fileName,
            //             leaf: isLeaf,
            //             expanded: true,
            //             draggable: true,
            //         });

            //         if (!selectedNode[0].isLeaf()) {
            //             selectedNode[0].appendChild(newNode);
            //         } else {
            //             selectedNode[0].parentNode.appendChild(newNode);
            //         }
            //         this.up('window').destroy();
            //     } else {
            //         // Handle case when no node is selected
            //         console.error('Error while adding the file');
            //     }
            // }
        }]
    }]
});
