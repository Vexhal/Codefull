class RemoveRepdownFromCodePosts < ActiveRecord::Migration
  def change
    remove_column :code_posts, :repdown, :integer
  end
end
