class Tag < ActiveRecord::Base
	has_and_belongs_to_many :three_objects, :join_table => :three_object_tags

	validates :name, :presence => true, :uniqueness => true
end
