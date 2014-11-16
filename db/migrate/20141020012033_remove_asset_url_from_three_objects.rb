class RemoveAssetUrlFromThreeObjects < ActiveRecord::Migration
  def change
  	remove_column :three_objects, :asset_url
  end
end
