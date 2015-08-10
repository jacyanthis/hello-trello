class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :logged_in?

  private

  def require_no_user
    redirect_to root_url if logged_in?
  end

  def require_user
    redirect_to new_session_url unless logged_in?
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login_user!(user)
    session[:session_token] = user.reset_token!
  end

  def logout_user!
    current_user.reset_token!
    session[:session_token] = nil
  end
end
