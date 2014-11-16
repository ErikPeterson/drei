class AddAttributesToThreeObjects < ActiveRecord::Migration
  def change
    add_column :three_objects, :asset_key, :text
    add_column :three_objects, :illustration_url, :text
    add_column :three_objects, :description, :text
  end
end
