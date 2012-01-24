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
		
		var backTap = function() {
			panel.hide();
			nestedList.show();
		}
		var onNavPanelItemTap = function() {
			
			nestedList.hide();
			panel.show();
			
		}
		
		Ext.regModel('Page', {
			fields: [{name: 'url', type: 'string'},
					 {name: 'title', type: 'string'}]
		});
		
		var menuStore = new Ext.data.TreeStore({
			model: 'Page',
			proxy: {
				type: 'ajax',
				url : '?format=json',
				reader: {
					type: 'tree',
					root: 'pages'
				}
			}
		});
		
		var nestedList = new Ext.NestedList({
		    fullscreen: true,
		    title: 'NSK Baan 2012',
		    displayField: 'title',
		    store: menuStore,
			listeners: {
                leafitemtap: onNavPanelItemTap
            }
		});
	
	
         
		var panel = new Ext.Panel({
    		fullscreen: true,
			id   : 'page_content',
			hidden: 'true',
    
    		dockedItems: [
        	{
            	dock : 'top',
            	xtype: 'toolbar',
            	ui   : 'light',
				title: 'NSK Baan 2012',
            	items: [
                	{
						ui: 'back',
                    	text: 'Back',
						handler: backTap
                	}
            		]
        	}
    			]
	});

    }
});