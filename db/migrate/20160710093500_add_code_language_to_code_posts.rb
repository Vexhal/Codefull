class AddCodeLanguageToCodePosts < ActiveRecord::Migration
  def change
    add_column :code_posts, :code_language, :string
  end
end
