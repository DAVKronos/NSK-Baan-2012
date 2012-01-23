Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
	
		Ext.regModel('Page', {
		    fields: ['content']
		});
		
		//The Store contains the AjaxProxy as an inline configuration
		var store = new Ext.data.Store({
		    proxy: {
				model: 'Page',
		        type: 'ajax',
		        url : '?format=json'
		    }
		});

		store.load(function(records, operation, success) {
		    Ext.getCmp('page_content').update("haha");
		});

		var panel = new Ext.Panel({
    		fullscreen: true,
			id   : 'page_content', 
    
    		dockedItems: [
        	{
            	dock : 'top',
            	xtype: 'toolbar',
            	title: 'Standard Titlebar'
        	},
        	{
            	dock : 'top',
            	xtype: 'toolbar',
            	ui   : 'light',
            	items: [
                	{
                    	text: 'Test Button'
                	}
            		]
        	}
    			]
	});
    }
});