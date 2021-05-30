<script>
  import { onMount } from 'svelte';
  import { PostPage, EntPage, MsgPage } from '$lib/components/spe_001';
  import { fade } from 'svelte/transition';
  import storyState, { resetStoryState } from '$lib/stores/spe_001/state';

  let scrollTop;

  let scrollHeights = {
    post: null,
    ent: null,
    msg: null
  };

  onMount(() => {
    storyState.useSessionStorage();

    window.addEventListener(
      'scroll',
      (event) => {
        scrollTop =
          window.pageYOffset ||
          (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (!$storyState.showTabBar) {
          let target = document.getElementById('scroll-target');

          if (target && scrollTop > target.offsetTop + target.offsetHeight) {
            storyState.update((s) => {
              s.showTabBar = true;
              return s;
            });
          }
        }

        if ($storyState.page === 'post' && $storyState.showTabBar && !$storyState.finish) {
          let target = document.getElementById('finish-scroll-target');

          if (target && scrollTop > target.offsetTop + target.offsetHeight) {
            storyState.update((s) => {
              s.showTabBar = false;
              s.finish = true;
              return s;
            });

            setTimeout(() => window.scrollTo({ top: 0 }));
          }
        }
      },
      false
    );
  });

  const changeTab = (t) => {
    if ($storyState.page === t) return;

    scrollHeights[$storyState.page] = scrollTop;

    storyState.update((s) => {
      if (s.pageNotifications[t]) {
        s.pageNotifications[t] = false;
      }

      s.page = t;
      return s;
    });

    if (scrollHeights[t]) {
      setTimeout(() => window.scrollTo({ top: scrollHeights[t] }));
    } else {
      setTimeout(() => window.scrollTo({ top: 0 }));
    }
  };

  const getTitle = () => {
    if ($storyState.finish) return 'Documenting Website Bloat';
    return $storyState.showCredits
      ? 'Waking up one hour earlier can lower chance of major depression'
      : 'Solving the Greatest Crisis of Our Time';
  };
</script>

<svelte:head>
  <title>{getTitle()}</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if $storyState.showTabBar}
  <div class="tab-bar" in:fade={{ duration: 500 }}>
    <small>[KIB]</small>
    <div class="tab" class:active={$storyState.page === 'post'} on:click={() => changeTab('post')}>
      <p>
        {$storyState.showCredits
          ? 'Waking up one hour earlier can lower chance of major depression'
          : 'Solving the Greatest Crisis of Our Time'}
      </p>
    </div>
    <div
      class="tab"
      class:notify={$storyState.pageNotifications.ent}
      class:active={$storyState.page === 'ent'}
      on:click={() => changeTab('ent')}
    >
      <p>Anomaly: ENT#344 | Australian Anomaly Research Organisation</p>
    </div>
    <div
      class="tab"
      class:notify={$storyState.pageNotifications.msg}
      class:active={$storyState.page === 'msg'}
      on:click={() => changeTab('msg')}
    >
      <p>AARO.chat</p>
    </div>
  </div>
{/if}

<div
  class="page post-page"
  class:show-page={$storyState.page === 'post'}
  class:margin-top={!$storyState.finish && !$storyState.intro}
>
  <PostPage />
</div>

<div class="page ent-page margin-top" class:show-page={$storyState.page === 'ent'}>
  <EntPage />
</div>

<div class="page msg-page margin-top" class:show-page={$storyState.page === 'msg'}>
  <MsgPage />
</div>

<style>
  .margin-top {
    margin-top: 2.43em;
  }

  .page {
    display: none;
  }

  .show-page {
    display: block;
  }

  .tab-bar {
    top: 0;
    width: 100%;
    height: 2.4em;
    background-color: rgb(243, 244, 246);
    position: fixed;
    z-index: 10;
    display: flex;
    padding-left: 0.5em;
    overflow-y: scroll;
    align-items: center;
  }

  @media screen and (max-width: 648px) {
    .tab-bar {
      padding-left: 0.2em;
    }
  }

  .tab {
    display: flex;
    align-items: center;
    width: 12em;
    height: 1.5em;
    margin: 0.3em;
    border-radius: 0.2em;
    cursor: pointer;
    padding: 0 5px;
  }

  .tab.active {
    background-color: #fff;
    box-shadow: 0 0 8px 5px rgba(194, 194, 194, 0.7);
  }

  .tab:not(.active):hover {
    background-color: rgb(209, 213, 219);
  }

  .tab > p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 500;
    font-size: 0.7rem;
    margin: 0;
  }

  .tab.notify {
    animation: fadeb 800ms ease-out infinite alternate;
  }

  @keyframes fadeb {
    0% {
      border: 2px solid rgb(243, 244, 246);
    }
    100% {
      border: 2px solid rgb(123, 193, 247);
    }
  }
</style>
