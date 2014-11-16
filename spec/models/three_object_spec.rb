require 'rails_helper'
require 'spec_helper'

RSpec.describe ThreeObject, :type => :model do
  it "can be instantiated with a url, and a name" do
  	uri = 'https://3dwarehouse.sketchup.com/model.html?id=u72f5e284-1b02-4e5d-9678-a643cbd05ef6'

  	three = ThreeObject.from_url(uri, {:name=> "Test Model"});

  	expect(three).to be_an_instance_of(ThreeObject)
  	expect(three.anme).to equal "Test Model"
  	expect(three.save).to be_ok
  end
end
