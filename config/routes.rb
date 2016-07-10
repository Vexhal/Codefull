Rails.application.routes.draw do

  devise_for :users

  # CodePosts
  get 'code/new', to: 'code_posts#new', as: 'new_code'
  get 'code/published', to: 'code_posts#published', as: 'published_code'
  get 'code/edit/:id', to: 'code_posts#edit', as: 'edit_code'
  get 'code/:id', to: 'code_posts#show', as: 'show_code'
  get 'code/', to: 'code_posts#index', as: 'code'

  root 'static_pages#home'
  get '*path', to: 'static_pages#home' # If page not found
  
end
