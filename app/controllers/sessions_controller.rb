class SessionsController < ApplicationController
  before_action :require_no_user, only: [:create, :new]
  before_action :require_user, only: [:destroy]

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user.nil?
      flash.now[:errors] = ["Invalid login credentials"]
      render :new
    else
      login_user!(@user)
      redirect_to root_url
    end
  end

  def destroy
    logout_user!
    redirect_to new_session_url
  end

  def new
    render :new
  end
end
