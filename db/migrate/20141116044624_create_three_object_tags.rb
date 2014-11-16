class CreateThreeObjectTags < ActiveRecord::Migration
  def change
    create_table :three_object_tags, id: false do |t|
    	t.integer :three_object_id
    	t.integer :tag_id
    end
  end
end
