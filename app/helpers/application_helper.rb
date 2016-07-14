module ApplicationHelper

  def get_database_count
    CodePost.available.count
  end

  def is_devise_controller?
    params[:controller].include?("devise");
  end

end
