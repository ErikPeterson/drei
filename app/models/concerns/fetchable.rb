require 'warehaus'
require 'slugify'
require 'pry'

module Fetchable

	def self.included(base)
		base.extend(ClassMethods)
	end

	module ClassMethods

		def get_meta_data(uri)
			connection = Warehaus::Getter.new(uri)
			entity = connection.fetch_entity
			meta_data = parse_meta_data(entity)
		end

	
		def unbox(uri, root_path, name)
			connection = Warehaus::Getter.new(uri, root_path, name)

			begin	
				entity = connection.fetch_entity
				meta_data = parse_meta_data(entity)
				tmp_path = connection.unbox
			rescue Exception => e
			binding.pry
				return false;
			end	
			return false unless tmp_path 
				

			success = system("#{Rails.application.secrets.blender_path} -b #{Rails.application.secrets.blender_dummy_path} -P #{Rails.application.secrets.dae_to_json_path} -- #{tmp_path}/#{name}.dae")
			return false unless success

			begin
				upload_assets(tmp_path, name)
			rescue Exception => e
				binding.pry
				return false
			end

			connection.cleanup

			{:asset_key => name, :meta_data => meta_data}
		end

		def upload_assets(root_path, name)
			@s3 ||= AWS::S3.new
			bucket = @s3.buckets[Rails.application.secrets[:aws_bucket]]
			upload_textures(root_path, name, bucket)
			upload_json(root_path, name, bucket)
		end

		def upload_textures(root_path, name, bucket)
			paths = Dir.glob(root_path + "untitled/*")
			return false unless paths.length > 0

			paths.each do |path|
				File.open(path, 'rb') do |file|
					aws_key = name + "/assets/" + path.split('/').last
					obj = bucket.objects[aws_key]
					obj.write(file)
				end
			end

		end

		def upload_json(root_path, name, bucket)
			File.open(root_path + "/#{name}.js") do |file|
				aws_key = name + "/#{name}.js"
				obj = bucket.objects[aws_key]
				obj.write(file)
			end
		end

		def parse_meta_data(data)
			meta_data = {:id=> data[:id],:title => data[:title], :tags=> data[:tags], :description => data[:description]}
			if data.keys.include?(:binaries) && data[:binaries].keys.include?(:bot_lt)
				meta_data[:illustration_url] = data[:binaries][:bot_lt][:contentUrl]
			end
			meta_data
		end

		def slugify(input)
			input.slugify_trim
		end

	end

end
