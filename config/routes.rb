Rails.application.routes.draw do

  devise_for :users

  # CodePosts
  get 'code/new', to: 'code_posts#new', as: 'new_code'
  get 'code/edit/:id', to: 'code_posts#edit', as: 'edit_code'
  get 'code/:id', to: 'code_posts#show', as: 'show_code'

  root 'static_pages#home'
  get '*path', to: 'static_pages#home' # If page not found
end
