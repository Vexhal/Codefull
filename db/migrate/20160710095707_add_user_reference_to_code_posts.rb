class AddUserReferenceToCodePosts < ActiveRecord::Migration
  def change
    add_reference :code_posts, :user, index: true, foreign_key: true
  end
end
