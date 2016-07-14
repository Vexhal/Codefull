module ApplicationHelper

  def get_database_count
    CodePost.available.count
  end

end
