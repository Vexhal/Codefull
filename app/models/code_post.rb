class CodePost < ActiveRecord::Base

  validates_presence_of [:title, :code, :category, :code_language]
  scope :available, -> { where(deleted_at: nil) } # Not deleted CodePost scope

end
