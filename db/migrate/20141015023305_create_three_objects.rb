class CreateThreeObjects < ActiveRecord::Migration
  def change
    create_table :three_objects do |t|
      t.string :name
      t.string :asset_url

      t.timestamps
    end
  end
end
