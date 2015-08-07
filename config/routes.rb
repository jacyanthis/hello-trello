Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :boards, only: [:create, :index, :show, :destroy, :update] do
      resources :lists, only: [:create, :update, :destroy] do
        resources :cards, only: [:create, :update, :destroy] do
          resources :items, only: [:index, :create, :update, :destroy]
        end
      end
    end
  end

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new]

  root to: "static_pages#main"
end
