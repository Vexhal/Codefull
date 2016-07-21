class RemoveCodeLanguageFromCodePosts < ActiveRecord::Migration
  def change
    remove_column :code_posts, :code_language, :string
  end
end
