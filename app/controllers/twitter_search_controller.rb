class TwitterSearchController < ApplicationController
  caches_action :show, :expires => 1.minute
  require "twitter"
  def show
    # @result = Twitter.user_timeline("NOS")[0...5]
    @result = Twitter.user_timeline("nskbaan2012")[0...5]
    
    render :json => @result
  end

end
