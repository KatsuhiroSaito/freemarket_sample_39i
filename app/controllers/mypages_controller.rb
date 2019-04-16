class MypagesController < ApplicationController
  def card
    render "credit-card"
  end

  def logout
    render "logout"
  end
end
