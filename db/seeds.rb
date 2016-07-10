# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

100.times do |i|
  CodePost.create(
  title: Faker::Company.name,
  code: Faker::Lorem.paragraph(10),
  category: Category.get_categories[rand(0..(Category.count - 1))],
  code_language: CodeLanguage.get_languages[rand(0..(CodeLanguage.count - 1))],
  user_id: 1)
end
