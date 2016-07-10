# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

categories = Category.generate_categories(10)
code_languages = CodeLanguage.generate_languages(10)

20.times do |i|
  CodePost.create(title: Faker::Company.name,
                   code: Faker::Lorem.paragraph(10),
                   category: categories[rand(0..10)],
                   code_language: code_languages[rand(0..10)],
                   user_id: 1)
end
