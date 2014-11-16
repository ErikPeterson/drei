require 'faker'

module Namable

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
	def random_name
		SecureRandom.uuid
	end
  end

end