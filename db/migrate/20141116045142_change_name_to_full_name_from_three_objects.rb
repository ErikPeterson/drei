class ChangeNameToFullNameFromThreeObjects < ActiveRecord::Migration
  def change
  	rename_column :three_objects, :name, :full_name
  end
end
