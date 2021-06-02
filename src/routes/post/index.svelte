<script context="module">
  export const hydrate = false;

  export const load = async ({ fetch }) => {
    const res = await fetch('/post.json');
    if (res.ok) {
      const posts = await res.json();
      return {
        props: { posts }
      };
    }
  };
</script>

<script>
  import { Interval, DateTime } from 'luxon';

  export let posts;

  const current_build = DateTime.now().setZone('Australia/Sydney');

  const distanceFromPrev = (post) => {
    const index = posts.map((p) => p.date).indexOf(post.date);
    const prev_post = posts[index - 1];

    let end;
    const start = DateTime.fromISO(post.date).setZone('Australia/Sydney');

    if (prev_post === undefined) {
      end = current_build;
    } else {
      end = DateTime.fromISO(prev_post.date).setZone('Australia/Sydney');
    }

    return Math.ceil(Interval.fromDateTimes(start, end).length('days') / 2);
  };

  const isSPE = (post) => post.slug.startsWith('spe_');
</script>

<svelte:head>
  <title>chronologie</title>
</svelte:head>

<div class="space-yo">
  <h1>chronologie</h1>
  <small><a href="/">&#9166; retour</a></small>
</div>

<code>dernière compile: {current_build}</code>

{#each posts as post}
  <div style="max-width: 100%; height: {distanceFromPrev(post)}em; padding: 1em 0.5em 1em 4em;">
    <div class="divider" />
  </div>

  <div class="post">
    <div style="display: inherit;">
      <a href="/post/{post.slug}" class="no-underline" class:spe={isSPE(post)}>
        <p class:glitch={isSPE(post)} title={post.title}>
          {post.title}
        </p>
      </a>
    </div>

    {#if !isSPE(post)}
      <div class="bottom-border">
        <div
          style="border-bottom: 0.5em solid rgba(255, 255, 255, 0.2); max-width: 100%; width: {post.readtime}em;"
        />
      </div>

      <div class="post-info">
        <small>publié sur {post.date}</small>
        <small class="readtime">{post.readtime} min de lecture</small>
      </div>
    {/if}
  </div>
{/each}

<style>
  .divider {
    height: 100%;
    border-left: 2px dotted rgba(255, 255, 255, 0.2);
  }

  .bottom-border {
    margin-top: 0.2em;
    width: 100%;
  }

  .post {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  .post > div > a > p {
    padding-bottom: 0;
    margin: 0;
    display: inline-block;
  }

  a {
    font-weight: 300;
    text-transform: lowercase;
  }

  code {
    font-size: 0.7rem !important;
  }

  .glitch {
    animation: glitch 1s linear infinite;
  }

  @keyframes glitch {
    2%,
    64% {
      transform: translate(1px, 0) skew(0deg);
    }
    4%,
    60% {
      transform: translate(-2px, 0) skew(0deg);
    }
    62% {
      transform: translate(-4px, 0) skew(-5deg);
    }
  }

  .glitch:before,
  .glitch:after {
    content: attr(title);
    position: absolute;
    left: 0;
  }

  .glitch:before {
    top: 0;
    animation: glitchTop 0.8s linear infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }

  @keyframes glitchTop {
    2%,
    64% {
      transform: translate(-2px, 0);
    }
    4%,
    60% {
      transform: translate(22px, 0);
    }
    62% {
      transform: translate(-1px, -1px) skew(-13deg);
    }
    8%,
    94% {
      transform: translate(-4px, -1px) skew(13deg);
    }
  }

  .glitch:after {
    height: 1em;
    top: 0;
    animation: glitchBotom 1.5s linear infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }

  @keyframes glitchBotom {
    2%,
    64% {
      transform: translate(2px, -1px) skew(-13deg);
    }
    4%,
    60% {
      transform: translate(-2px, 0);
    }
    62% {
      transform: translate(-22px, 0);
    }
  }

  .spe {
    text-transform: initial;
  }
</style>
