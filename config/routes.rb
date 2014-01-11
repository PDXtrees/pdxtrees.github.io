Sequoia::Application.routes.draw do
  root 'static_pages#home'

  match '/about',     to: 'static_pages#about',     via: 'get'
  match '/rankings',     to: 'static_pages#rankings',     via: 'get'
  match '/trees',     to: 'static_pages#trees',     via: 'get'
  match '/contact',   to: 'static_pages#contact',   via: 'get'
end
