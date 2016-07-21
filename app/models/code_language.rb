class CodeLanguage

  # Languages getter
  def self.get_languages
    ["C", "C++", "C#", "Java", "Ruby", "Python", "PHP", "JavaScript",
       "Swift", "Objective-C", "Perl", "Ada", "Lisp"]
  end

  def self.get_languages_modes
    ["c_cpp", "c_cpp", "csharp", "java", "ruby", "python", "php", "javascript",
    "swift", "objectivec", "perl", "ada", "lisp"]
  end

  # Languages count getter
  def self.count
    get_languages.count
  end
end
