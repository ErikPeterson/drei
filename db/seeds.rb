# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

[
'bf819621e74b0519b79e99a4e49de900',
'bb5c23c0e72e1745719b4a60dd8a29a',
'f7ce3523dccd929312e36e1b4554403',
'2a7d62b731a04f5fa54b9afa882a89ed'
].each do |uri|
	ThreeObject.from_url(uri)
end