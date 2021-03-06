Rails.application.routes.draw do

  # Devise, User
  devise_for :users

  # CodePosts
  resources :code_posts # For EDIT
  get 'code/datatable_ajax', to: 'code_posts#datatable_ajax'
  get 'code/new', to: 'code_posts#new', as: 'new_code'
  get 'code/published', to: 'code_posts#published', as: 'published_code'
  get 'code/edit/:id', to: 'code_posts#edit', as: 'edit_code'

  # Voting
  get 'code/:id/upvote', to: 'code_posts#upvote', as: 'upvote_code'
  get 'code/:id/downvote', to: 'code_posts#downvote', as: 'downvote_code'

  get 'code/:id/delete', to: 'code_posts#destroy', as: 'delete_code'
  get 'code/:id', to: 'code_posts#show', as: 'show_code'
  get 'code/', to: 'code_posts#index', as: 'code'

  root 'code_posts#index' # ROOT
  get '*path', to: 'static_pages#home' # If page not found

end
