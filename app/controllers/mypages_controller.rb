class MypagesController < ApplicationController
  @user_mypage = Rails.root
  add_breadcrumb 'メルカリ', '/'
  before_action :add_mypage_breadcrumb

  def show
  end

  def edit
    add_breadcrumb 'プロフィール'
  end

  def card
    add_breadcrumb '支払い方法'
    render "credit-card"
  end

  def logout
    add_breadcrumb 'ログアウト'
    render "logout"
  end


  private
  def add_mypage_breadcrumb
      add_breadcrumb "マイページ", view_context.user_mypages_path(1)
  end
end
