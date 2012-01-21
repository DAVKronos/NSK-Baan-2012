class TwitterSearchController < ApplicationController
  caches_action :show
  require "twitter"
  def show
    @result = Twitter.user_timeline("nskbaan2012").first
    
    render :json => @result
  end

end
