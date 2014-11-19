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
			self.add_tags_from_names(meta_data[:tags])
		end
		if meta_data.keys.include?(:illustration_url)
			self.illustration_url = meta_data[:illustration_url]
		end
	end

	def add_tags_from_names(tag_names)
		tag_names.each do |tag_name|
			self.tags.find_or_initialize_by(:name => tag_name)
		end
	end

	def self.from_url(uri)
		root_path = Rails.application.secrets.tmp_dir
		asset_key = self.random_name
		obj_hash = self.unbox(uri, root_path, asset_key)
		three = ThreeObject.create(obj_hash)
		three
	end

	def update_meta_data
		data = ThreeObject.get_meta_data(self.warehouse_id)
		self.update(:meta_data => data)
	end

	def asset_path
		protocol = '//'
		bucket_name = Rails.application.secrets.aws_bucket
		prefix = '.s3.amazonaws.com/'
		folder = asset_key + '/assets/'
		protocol + bucket_name + prefix + folder
	end

	def json_path
		prefix = "//s3-" + Rails.application.secrets.aws_region + '.amazonaws.com/'
		bucket_name = Rails.application.secrets.aws_bucket + '/'
		folder = asset_key + '/'
		filename = asset_key + '.js'
		prefix + bucket_name + folder + filename
	end

	def tag_names
		self.tags.collect(&:name)
	end


	def as_json(options={})
    	super(options.merge(:methods => [:asset_path, :json_path, :tag_names]) )
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
		objs = self.arel_table
		query = "%#{slug}%"
		matches = ThreeObject.where(objs[:slug].matches(query))

		slug = slug + "_#{matches.length}" if matches.length > 0

		slug
	end

	def self.find_by_slug_or_id(slug_or_id)
		reg = /^\d+$/i
		if slug_or_id =~ reg
			find(slug_or_id)
		else
			find_by(:slug => slug_or_id)
		end
	end

end
