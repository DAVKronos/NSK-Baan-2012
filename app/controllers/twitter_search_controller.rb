class TwitterSearchController < ApplicationController
  caches_action :show, :expires => 1.minute
  require "twitter"
  def show
    @result = Twitter.user_timeline("nskbaan2012").first
    
    render :json => @result
  end

end
