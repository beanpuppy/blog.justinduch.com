<div class="post">
  <div class="content h-entry">
    <h1 class="p-name">Documenting Website Bloat</h1>

    <div class="space-yo post-info">
      <div>
        <small>
          publié sur <span class="dt-published">2021-06-03</span>
        </small>

        <small class="readtime">3 min de lecture</small>
      </div>

      <div>
        <small class="fw-100">
          <a href="/post">&#9166; retour</a>
        </small>
      </div>
    </div>

    <div class="thumbnail-container">
      <img
        src="https://cdn.halcyonnouveau.xyz/blog/thumbnails/bloat-thumb.png?w=672&h=410"
        alt="thumbnail"
        class="thumbnail"
      />
    </div>

    <div class="e-content">
      <p>
        Websites are getting pretty <strong>chonky</strong> these days, so I thought it would be a
        fun idea to go around all the sites I visit often and see how <strong>thicc</strong> they are.
      </p>
      <p>
        To do this, we're looking at the size of all requests made when a page is loaded. You can
        normally find this in the "Network" tab of the developer console in your browser. If you
        don't know what I'm talking about then... just Google it or something. I'm not your mum, you
        don't need me to explain everything to you.
      </p>
      <p>First up, let's look at YouTube.</p>
      <img src="https://cdn.halcyonnouveau.xyz/blog/img/bloat-youtube.png" />
      <p>
        It might be a little hard to see and you may need to zoom in, but at the very bottom, it
        says "11.4 MB" next to an icon that looks like a weight. That's what we're looking for. On
        the very right it also says it took "2.06s" to load everything, but this isn't <strong
          >as</strong
        > important to us as a metric because it can depend a lot on where you're located in relation
        to where the website is served from.
      </p>
      <p>11 MB is a little fucked IMO, but let's look at the others before we make up our mind.</p>
      <img src="https://cdn.halcyonnouveau.xyz/blog/img/bloat-hn.png" />
      <p>This is news.ycombinator.com, better known as "Hacker News" (HN), and it's very ugly.</p>
      <p>
        But it's only 50.8 KB! If you need a reminder, 1 Megabyte (MB) is 1000 Kilobytes (KB).
        Strangely, while YouTube took 2.06s, HN took 2.17s. I'm guessing this is because there are
        YouTube datacenters in Sydney, but HN is only served from San Fransisco. Really goes to show
        how lantency plays a big part of speed.
      </p>
      <img src="https://cdn.halcyonnouveau.xyz/blog/img/bloat-reddit.png" />
      <p>Next is Reddit (specifically /r/redpandas). It's 5.95 MB.</p>
      <p>
        If you use Reddit, you may have noticed that I'm using the old site design which uses less
        JavaScript. Because I hate myself, I turned on the new design and saw a whopping 14.9 MB.
      </p>
      <p>
        I've said this before and I'll say it again: If Reddit ever removes the ability to use the
        old design, I'm quitting Reddit.
      </p>
      <p>Anyway, finally let's look at this site.</p>
      <img src="https://cdn.halcyonnouveau.xyz/blog/img/bloat-me.png" />
      <p>
        This is the longest post I've ever written and it clocks in at 553.5 KB. Could be a little
        better, considering it's mostly just text, but still decent when compared to everything
        else.
      </p>
      <p>Let's also look at this post for funsies.</p>
      <img src="https://cdn.halcyonnouveau.xyz/blog/img/bloat-me2.png" />
      <p>It's... 2.35 MB?! WHAT? How the feck did that happen? This seems like a big problem.</p>
      <p>
        But it's still better than most websites and I'm <strong>very</strong> lazy, so let's just ignore
        it?
      </p>
      <p>Yeah, cool. See you next time.</p>
    </div>

    <div class="info-line footer">
      <small>
        <a href="https://github.com/beanpuppy/justin.duch.me/src/routes/post/spe_001">
          see a mistake? edit it here.
        </a>
      </small>

      <small>
        <a href="/post">&#9166; retour</a>
      </small>
    </div>
  </div>
</div>

<style>
  .post {
    font-family: Signifier, Georgia, 'Times New Roman', Times, serif;
    font-size: 1.2rem !important;
    background-color: #191919;
    color: #e1e1e1;
    padding-bottom: 5em;
  }

  .content {
    position: relative;
    box-sizing: border-box;
    max-width: 42em;
    padding: 12em 5em 5em 5em;
  }

  .content .info-line {
    display: flex;
    justify-content: space-between;
  }

  .info-line a {
    text-decoration: none;
  }

  .thumbnail-container {
    min-height: 310px;
  }

  .p-name {
    margin: 0;
  }

  .content,
  .post-info {
    padding-bottom: 1em;
  }

  .footer {
    padding-top: 1em;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 0.5em !important;
    font-style: normal !important;
    letter-spacing: 0.1em !important;
    font-weight: 400 !important;
    text-transform: lowercase !important;
  }

  @media screen and (max-width: 648px) {
    .thumbnail-container {
      min-height: 210px;
    }
  }

  @media screen and (max-width: 724px) {
    .content {
      padding: 8em 2em 2em 2em;
    }
  }
</style>
