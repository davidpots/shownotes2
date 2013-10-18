class Podcast < ActiveRecord::Base
  attr_accessible :description, :image, :name, :url_itunes, :url_rss, :url_web

  def self.update_from_feed(feed_url)
    feed = Feedzirra::Feed.fetch_and_parse(feed_url)
    create!(
      :name         => feed.title,
      :description  => feed.description,
      :image        => feed.itunes_image,
      :url_web      => feed.url,
      :url_rss      => feed.feed_url
    )
  end

end
