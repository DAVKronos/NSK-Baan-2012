class PageSweeper < ActionController::Caching::Sweeper
  observe Page # This sweeper is going to keep an eye on the Product model
 
  # If our sweeper detects that a Page was created call this
  def after_save(page)
    expire_cache_for(page)
  end
  
  def after_destroy(page)
    expire_cache_for(page)
  end
  
  def after_update(page)
    expire_cache_for(page)
  end
 
  private
  def expire_cache_for(page)
    # Expire the index page now that we added a new product
    expire_page(:controller => 'pages', :action => 'show')
    expire_action(:controller => '/pages', :action => 'show')
    
  end
end