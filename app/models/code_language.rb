class CodeLanguage

  def self.generate_languages(count = 1)
    Faker::Lorem.words(count, true)
  end
end
