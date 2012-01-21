class TwitterSearchController < ApplicationController
  caches_page :show
  require "twitter"
  def show
    @result = Twitter.user_timeline("nskbaan2012").first
    
    render :json => @result
  end

end
