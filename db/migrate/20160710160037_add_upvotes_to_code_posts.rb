class AddUpvotesToCodePosts < ActiveRecord::Migration
  def change
    add_column :code_posts, :upvotes, :integer, array:true, default: []
  end
end
