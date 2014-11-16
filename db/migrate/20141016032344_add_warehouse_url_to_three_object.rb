class AddWarehouseUrlToThreeObject < ActiveRecord::Migration
  def change
    add_column :three_objects, :warehouse_url, :string
  end
end
