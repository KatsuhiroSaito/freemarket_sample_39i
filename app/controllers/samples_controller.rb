class SamplesController < ApplicationController
  def index
    render 'sample'
  end
  def show
    render 'login'
  end
  def new
    render 'credit-card'
  end

  def confirm
  end
end
