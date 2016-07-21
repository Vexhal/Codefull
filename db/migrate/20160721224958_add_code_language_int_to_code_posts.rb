class AddCodeLanguageIntToCodePosts < ActiveRecord::Migration
  def change
    add_column :code_posts, :code_language, :integer
  end
end
