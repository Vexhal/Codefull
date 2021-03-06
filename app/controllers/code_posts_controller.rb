class CodePostsController < ApplicationController

  helper_method :is_owner? # Helper method for views
  before_action :authenticate_user!, only: [:new, :edit, :published, :upvote, :downvote]
  before_action :set_code_post, only: [:destroy, :show, :edit, :update, :upvote, :downvote]
  before_action :set_votes, only: [:upvote, :downvote, :show] # Get Vote Values

  def index
    @code_posts = CodePost.available.upvoted.all # Get all non deleted Code posts
  end

  def datatable_ajax
    render json: CodePostDatatable.new(view_context)
  end

  def upvote
    @code_post.do_upvote(current_user.id)
    respond_to do |format|
      format.js
    end
  end

  def downvote
    @code_post.do_downvote(current_user.id)
    respond_to do |format|
      format.js
    end
  end

  def published
    # Get all non deleted and published by owner Code Posts
    @code_posts = CodePost.available.where(user_id: current_user).all
    render 'index' # Render default view
  end

  def show
    # TODO
  end

  def new
    @code_post = CodePost.new # New Code Post
  end

  def edit
    redirect_to root_path unless is_owner?(@code_post)
  end

  def create
    @code_post = CodePost.new(code_post_params)
    @code_post.user_id = current_user.id # Setting whom will belong to
    @code_post.upvotes << current_user.id # Add upvote after creation

    respond_to do |format|
      if @code_post.save
        format.html { redirect_to show_code_path(@code_post), notice: "Code created successfully!"}
        format.json { render :show, status: created, location: @code_post }
      else
        format.html { render :new }
        format.json { render json: @code_post.errors, status: :unproccesable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @code_post.update(code_post_params)
        format.html { redirect_to show_code_path(@code_post), notice: "Code updated successfully!"}
        format.json { render :show, status: created, location: @code_post }
      else
        format.html { render :edit }
        format.json { render json: @code_post.errors, status: :unproccesable_entity }
      end
    end
  end

  def destroy
    if is_owner?(@code_post) || current_user.is_admin?
      #@code_post.deleted_at = DateTime.now
      #@code_post.save
      @code_post.destroy
      respond_to do |format|
        format.html { redirect_to code_path, notice: "Code deleted successfully!"}
        format.json { head :no_content }
      end
    else
      redirect_to root_path
    end
  end

  private

    # Set votes
    def set_votes
      @upvotes = @code_post.upvotes.count
      @downvotes = @code_post.downvotes.count
    end

    # Owner of chosen CodePost?
    def is_owner?(code_post)
      code_post.user_id == current_user.id unless current_user.nil?
    end

    # Setting code_post before action
    def set_code_post
      @code_post = CodePost.find(params[:id])
    end

    # Strong params
    def code_post_params
      params.require(:code_post).permit(:title, :code,
      :category, :code_language)
    end
end
