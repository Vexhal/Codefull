class Category

  def self.generate_categories(count = 1)
    Faker::Lorem.words(count, true)
  end
end
