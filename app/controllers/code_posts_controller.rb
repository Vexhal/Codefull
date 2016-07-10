class CodePostsController < ApplicationController

  before_action :authenticate_user!, only: [:new, :edit, :published]
  before_action :set_code_posts, only: [:show, :edit]

  def index
    @code_posts = CodePost.all
  end

  def published
    @code_posts = CodePost.where(user_id: current_user).all
    render 'index'
  end

  def show
  end


  def new
    @code_post = CodePost.new
  end

  def edit
  end

  def create
    @code_post = CodePost.new(code_post_params)
    @code_posts.user_id = current_user # Setting whom will belong to

    respond_to do |format|
      if @code_post.save
        format.html { redirect_to @task, notice: "Code created successfully!"}
        format.json { render :show, status: created, location: @code_post }
      else
        format.html { render :new }
        format.json { render json: @code_post.errors, status: :unproccesable_entity }
      end
    end
  end

  def update
    @code_posts.user_id = current_user # Setting whom will belong to

    respond_to do |format|
      if @code_post.update(code_post_params)
        format.html { redirect_to @task, notice: "Code updated successfully!"}
        format.json { render :show, status: created, location: @code_post }
      else
        format.html { render :edit }
        format.json { render json: @code_post.errors, status: :unproccesable_entity }
      end
    end
  end

  def destroy
    # TODO not destroy but update deleted_at
    @code_post.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: "Code deleted successfully!"}
      format.json { head :no_content }
    end
  end

  private

    def set_code_posts
      @code_post = CodePost.find(params[:id])
    end

    def code_post_params
      params.require(:code_posts).permit(:title, :code, :repup, :repdown,
      :category, :code_language, :user_id)
    end
end
