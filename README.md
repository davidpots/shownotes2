== Search iTunes Podcasts

That, and only that, is what this app is for. At the core it uses the *Feedzirra* gem, which when given an RSS URL will parse it. Example usage from console:

    Feedzirra::Feed.fetch_and_parse("http://feeds.feedburner.com/SlateCultureGabfest")

Using the command above, you might do something like

    feed = Feedzirra::Feed.fetch_and_parse("http://feeds.5by5.tv/amplified")

Which then lets you access nodes about that feed:

    feed.title              # the podcast's title
    feed.url                # the podcast's RSS URL
    feed.description        # the podcast's description
                            # etc

Then, if you want to access each of the entries, you'd do something like this:

    feed.entries.each do |entry|

      entry.published             # the episode's publish date/time
      entry.title                 # the episode's title
      entry.itunes_duration       # the episode's length
                                  # etc
    end

I plan on writing up a blog post tutorial on using all this later. But for now, check this out for more reference: https://github.com/pauldix/feedzirra

* * *

Here are other notes I took on Feedzirra, FWIW:

# Start with this, after you have Feedzirra installed
feed = Feedzirra::Feed.fetch_and_parse("http://mysteriousuniverse.org/feed/podcast")

# Adding an XML element to Feedzirra...
Feedzirra::Feed.add_common_feed_element('itunes:summary', :as => :itunessummary)

# Adding an XML element that has sub-nodes...
Feedzirra::Feed.add_common_feed_element('atom:link', :value => :href, :as => :atom_href)