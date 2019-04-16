class UsersController < ApplicationController
  def index
    render "login"
  end

  def new
    render "signup"
  end
end
