class AddCategoryToCodePosts < ActiveRecord::Migration
  def change
    add_column :code_posts, :category, :string
  end
end
