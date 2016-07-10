class CodeLanguage

  # Languages getter
  def self.get_languages
    ["C", "C++", "C#", "Java", "Ruby", "Python", "PHP", "JavaScript",
       "Swift", "Objective-C", "Perl", "Ada", "Lisp", "Visual Basic .NET"]
  end

  # Languages count getter
  def self.count
    get_languages.count
  end
end
