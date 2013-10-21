class Podcast < ActiveRecord::Base
  attr_accessible :description, :image, :name, :url_itunes, :url_rss, :url_web

  def self.parse_feed(feed_url)
    Feedzirra::Feed.fetch_and_parse(feed_url)
  end

  def self.search_itunes(query)
    ITunesSearchAPI.search(:term => query, :country => "US", :media => "podcast", :attribute => "descriptionTerm")
  end

end
