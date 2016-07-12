class CodePost < ActiveRecord::Base

  validates_uniqueness_of [:title, :code]
  validates_presence_of [:title, :code, :category, :code_language]
  scope :available, -> { where(deleted_at: nil) } # Not deleted CodePost scope
  scope :upvoted, -> { order('upvotes DESC') }

  def get_email
    user = User.find_by(id: self.user_id)
    unless user.nil?
      user.email
    else
      "example@gmail.com"
    end
  end

  # Upvoting
  def do_upvote(id = nil)
    if !id.nil? # Not nil
      unless self.upvotes.include?(id)
        self.downvotes.delete(id)
        self.upvotes << id
        self.save
      end
    end
  end

  # Downvoting
  def do_downvote(id = nil)
    if !id.nil? # Not nil
      unless self.downvotes.include?(id)
        self.upvotes.delete(id)
        self.downvotes << id
        self.save
      end
    end
  end

end
