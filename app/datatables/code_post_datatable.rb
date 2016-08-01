class CodePostDatatable < AjaxDatatablesRails::Base

  def_delegators :@view, :link_to, :show_code_path

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= [
      'CodePost.title',
      'CodePost.category',
      'CodePost.code_language',
      'CodePost.reputation']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= [
      'CodePost.title',
      'CodePost.category',
      'CodePost.code_language']
  end

  private

  def data
    records.map do |record|
      [
        link_to(record.title, show_code_path(record)),
        record.category,
        record.get_language,
        record.get_reputation_html
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
      ]
    end
  end

  def get_raw_records
    CodePost.all
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
