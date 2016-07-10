class CreateCodePosts < ActiveRecord::Migration
  def change
    create_table :code_posts do |t|
      t.string :title
      t.text :code
      t.integer :repup
      t.integer :repdown
      t.timestamps null: false
    end
  end
end
