class RemoveRepupFromCodePosts < ActiveRecord::Migration
  def change
    remove_column :code_posts, :repup, :integer
  end
end
