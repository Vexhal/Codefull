class AddDeletedAtToCodePosts < ActiveRecord::Migration
  def change
    add_column :code_posts, :deleted_at, :datetime
  end
end
