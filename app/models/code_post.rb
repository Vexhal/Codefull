class CodePost < ActiveRecord::Base

  after_initialize :set_defaults

  private

    def set_defaults
      self.repup ||= 0
      self.repdown ||= 0
    end
end
