module ApplicationHelper

  def get_database_count
    CodePost.available.count
  end

  def is_devise_controller?
    params[:controller].include?("devise");
  end

  def get_logo_text
    ("<b>CODE</b>FULL").html_safe
  end

  def get_logo_text_small
    ("<b>C</b>FL").html_safe
  end
end
