class CodePost < ActiveRecord::Base

  validates_presence_of [:title, :code, :category, :code_language]

  after_initialize :set_defaults # Set defaults after creation
  scope :available, -> { where(deleted_at: nil) } # Not deleted CodePost scope

  private
    def set_defaults
      self.repup ||= 0
      self.repdown ||= 0
    end
end
