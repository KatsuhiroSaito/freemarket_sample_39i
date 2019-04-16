Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'products#index'
  get "/confirm" => "samples#confirm"
  resources :users, only: [:index, :new] do
    resource :mypages do
      collection do
        get 'card'
      end
    end
  end
end
