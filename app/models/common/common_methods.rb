require 'faker'
require 'warehaus'
require 'slugify'

module CommonMethods
	def random_name
		Faker::Name.name
	end
	
	def unbox(uri, root_path, name)
		connection = Warehaus::Getter.new(uri, root_path, name)
		begin
			connection.unbox
		rescue Exception => e
			errors.add e
		end	
	end

	def slugify(input)
		input.slugify_trim
	end
end