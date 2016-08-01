class RemoveReputationFromCodePosts < ActiveRecord::Migration
  def change
    remove_column :code_posts, :reputation, :integer
  end
end
