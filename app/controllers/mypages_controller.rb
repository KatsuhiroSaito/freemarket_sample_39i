class MypagesController < ApplicationController
  def show
  end

  def edit
  end

  def card
    render "credit-card"
  end

  def logout
    render "logout"
  end
end
