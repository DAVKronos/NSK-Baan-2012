class ApplicationController < ActionController::Base
  helper :all
  helper_method :mobile_device?
  protect_from_forgery
  before_filter :prepare_for_mobile
  layout :set_layout
  
    def mobile_device?
      if session[:mobile_param]
        session[:mobile_param] == "1"
      else
        false
        # Uncomment the next line for automatic detection
        # request.user_agent =~ /Mobile|webOS/
     end
    end
 
    private
 
    def prepare_for_mobile
      session[:mobile_param] = params[:mobile] if params[:mobile]
      request.format = :mobile if mobile_device? && request.format == :html
    end
    
    def set_layout
      if request.headers['X-PJAX']
        "pjax"
      else
        "application"
      end
    end
end
