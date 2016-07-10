class AddDownvotesToCodePosts < ActiveRecord::Migration
  def change
    add_column :code_posts, :downvotes, :integer, array:true, default: []
  end
end
