class CodePost < ActiveRecord::Base

  after_initialize :set_defaults
  scope :available, -> { where(deleted_at: nil) } # Not deleted CodePost scope

  private
    def set_defaults
      self.repup ||= 0
      self.repdown ||= 0
    end
end
