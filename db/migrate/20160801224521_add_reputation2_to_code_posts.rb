class AddReputation2ToCodePosts < ActiveRecord::Migration
  def change
    add_column :code_posts, :reputation, :integer
  end
end
