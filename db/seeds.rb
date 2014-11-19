# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

[
'u10261d5f-9e52-4b13-b80d-6263c66396c8',
'd7d5556f4ea5bb9251990397636975f',
'f30a8d5dcaf895eb9d2ae525b1212ae1',
'e4f25e864d558ea4e52f21563f95df48'
].each do |uri|
	ThreeObject.from_url(uri)
end