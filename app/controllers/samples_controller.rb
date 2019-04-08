class SamplesController < ApplicationController
  def index
    render 'sample'
  end
  def show
    render 'login'
  end
  def new
    render 'signup'
  end
end
