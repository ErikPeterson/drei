class ThreeObject < ActiveRecord::Base
	include Fetchable
	include Namable

	has_and_belongs_to_many :tags, :join_table => :three_object_tags

	validates :asset_key, :presence => true , :uniqueness => true
	validates :warehouse_id, :presence => true, :uniqueness => true
	validates :slug, :presence => true, :uniqueness => true
	validates :full_name, :presence => true


	def name=(input)
		self.full_name=input
		self.slug = ThreeObject.get_unique_slug(input)
	end

	def meta_data=(meta_data)
		self.name = meta_data[:title]
		self.warehouse_id = meta_data[:id]
		self.description = meta_data[:description]
		if meta_data.keys.include?(:tags)
			self.tags.push(meta_data[:tags])
		end
		if meta_data.keys.include?(:illustration_url)
			self.illustration_url = meta_data[:illustration_url]
		end
	end

	def self.from_url(uri)
		root_path= Rails.application.secrets.tmp_dir
		name = self.random_name
		obj_hash = self.unbox(uri, root_path, name)
		binding.pry
		ThreeObject.create(  )
	end

	def self.get_unique_slug(input)
		slug = input
				.strip
				.gsub(/['`]/,"")
				.gsub(/\s*@\s*/, " at ")
				.gsub(/\s*&\s*/, " and ")
				.gsub(/\s*[^A-Za-z0-9\.\_]\s*/,"-")
				.gsub(/-+/, "-")
				.gsub(/\A[_\.]+|[_\.]+\z/, "")
		objs = self.arel_tabel
		query = "%#{slug}%"
		matches = ThreeObject.where(objs[:slug].matches(query))

		slug = slug + "_#{matches.length}" if matches.length > 0

		slug
	end

end
