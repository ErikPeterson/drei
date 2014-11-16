class AddSlugToThreeObjects < ActiveRecord::Migration
  def change
    add_column :three_objects, :slug, :string
  end
end
