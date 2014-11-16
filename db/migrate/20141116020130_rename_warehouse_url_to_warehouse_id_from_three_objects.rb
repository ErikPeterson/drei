class RenameWarehouseUrlToWarehouseIdFromThreeObjects < ActiveRecord::Migration
  def change
  	rename_column :three_objects, :warehouse_url, :warehouse_id
  end
end
