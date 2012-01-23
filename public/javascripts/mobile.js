Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

	
		var fullVersion =	function() {
			var redirect = '?mobile=0'
			window.location = redirect;
		} 
	
	
            Ext.getBody().mask('Loading...', 'x-mask-loading', false);
            Ext.Ajax.request({
                url: '?format=json',
                success: function(response, opts) {
                    Ext.getCmp('page_content').update(response.responseText);
                    Ext.getBody().unmask();
                }
            });

		var panel = new Ext.Panel({
    		fullscreen: true,
			id   : 'page_content', 
    
    		dockedItems: [
        	{
            	dock : 'top',
            	xtype: 'toolbar',
            	title: 'NSK Baan 2012'
        	},
        	{
            	dock : 'top',
            	xtype: 'toolbar',
            	ui   : 'light',
            	items: [
                	{
						ui: 'back',
                    	text: 'Back',
						handler: fullVersion
                	}
            		]
        	}
    			]
	});
    }
});