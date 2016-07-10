class CodeLanguage

  def self.generate_languages(count = 1)
    Faker::Lorem.words(count, true)
  end

  def self.get_languages
    %w[c c++ c# java ruby python php javascript swift objective-c]
  end

  def self.count
    10
  end
end
