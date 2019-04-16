Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'products#index'
  resource :products, only: [:index, :show]
  # 本来は"resources"とすべきだが、現時点ではproductsテーブルを作成してないため、あえて"resource"を使用。productsテーブルを作ったら修正する必要あり。

  resources :users, only: [:index, :new] do
    resource :mypages do
      collection do
        get 'card'
        get 'logout'
      end
    end
  end
end
