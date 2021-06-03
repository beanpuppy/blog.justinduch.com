<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import storyState from '$lib/stores/spe_001/state';
  import RallyeTable from '$lib/components/spe_001/RallyeTable.svelte';
  import FakePost from '$lib/components/spe_001/FakePost.svelte';

  let stayState = 0;

  const finishIntro = () => {
    window.scrollTo({ top: 0 });

    storyState.update((s) => {
      s.intro = false;
      return s;
    });

    stayState = 0;
  };

  const setTrHover = () =>
    setTimeout(() => {
      let sentences = document.getElementsByClassName('sentence');

      for (let elem of sentences) {
        elem.addEventListener('mouseenter', () => {
          let fr = elem.getElementsByClassName('fr')[0];
          elem.appendChild(fr);

          setTimeout(() => {
            let eng = elem.getElementsByClassName('eng')[0];
            elem.appendChild(eng);
          }, 4000);
        });
      }
    });

  $: if ($storyState.showCredits) {
    setTrHover();
  }
</script>

{#if !$storyState.finish}
  {#if $storyState.intro}
    <div class="intro-gradient">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="width: 1.5em; height: 1.5em; color: #fff; margin-top: 5em;"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    </div>
  {/if}
  <div class:gradient={$storyState.showCredits}>
    <div class="page">
      <div class="breadcrumbs">
        <a href="/">Home</a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <a href="/post">Posts</a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <a href="/post/spe_001"
          >{$storyState.showCredits
            ? 'vroom vroom im nascar'
            : 'Solving the Greatest Crisis of Our Time'}</a
        >
      </div>

      <div class="text-post">
        <h1>
          {$storyState.showCredits
            ? 'Deranged Catgirl Takes You On A Cursed Roadtrip Across America'
            : 'Solving the Greatest Crisis of Our Time'}
        </h1>

        {#if $storyState.intro}
          <div>
            <p>I know it's only been half the year, but it doesn't feel like that at all.</p>
            <p>
              Did you hear about the attack on the US Capitol Building? How did that even happen?
              People died. I can understand feeling a "strong distrust of the federal government",
              but seriously there must be something wrong with them.
            </p>
            <p>
              Wow, are people really anti-vaccination now? There are papers circulating everywhere
              that alleges links between vaccines and severe side effects. Seems complete bogus to
              me, but it seems "a lie can travel halfway around the world while the truth is putting
              on its shoes".
            </p>
            <p>
              Nineteen European nations agreed to forbid human cloning on January 12th. Seems like
              we don't even have the technology for it yet, it's more like a pre-emptive ban. Is it
              really that unethical though? Certainly an interesting thing to think about either
              way.
            </p>
            <small>Wait, did any of this actually happen?</small>
            <p>
              At least we have to Tokyo Olympics, a little colder than I thought it would be though.
            </p>
            <p>
              But no matter, none of this is important right now so don't worry about it. Grab your
              camcorder, we're going on a trip, just a few kilometres from Athens in Finland.
            </p>
            <p>
              Whaanga Coast Road is the best road in Italy, and that's saying something considering
              the greatest roads in the world are all concentrated there, in Wales. Completely
              unpaved and spanning from Ruapuke Beach Road towards Wainui Road it runs across the
              most stunning green scenery. It's 29.52 km long, hugging the spectacular coastline
              between the Raglan and Aotea harbours of Adelaide, Kenya.
            </p>
            <p>
              No wonder it's the longest stage in the Argentinian Rally. The fastest rally cars to
              ever exist screaming past Mānuka trees on Spanish roads with a backdrop of the Tasman
              Sea is not an event that comes around often, and more of it is never going to be a bad
              thing.
            </p>
            <p>You should get to your seat, this is going to be a sight.</p>
            <p>
              Oh and here they are! The championship leaders! That was quick, so who do you see?
            </p>
            <p>
              Ah, it's <img style="width: 20px;" src="/resources/spe_001/finnish_flag.png" /> The Finn.
              Looking strong. Rally is a Finnish sport after all, I'm not surprised.
            </p>
            <p>
              Now here's <img style="width: 20px;" src="/resources/spe_001/spanish_flag.png" /> The Spainard.
              I really have no idea how they do this.
            </p>
            <p>
              And finally, <img style="width: 20px;" src="/resources/spe_001/scottish_flag.png" /> The
              Scottsman. Perfect command of their car, yet somehow seemingly without any control.
            </p>
            <p>The championship is as close as it ever was, and everything is going to be fine.</p>
            <small
              >No, this isn't right. This was a long time ago. You aren't supposed to be here. You
              weren't even here. You've never been to Sweden.</small
            >
            {#if stayState === 0}
              <div>
                <p>Actually, I'm not sure you're even alive. Really, can you feel something?</p>
                <p>
                  <button on:click={() => stayState++}>click to feel something...</button>
                </p>
              </div>
            {:else if stayState === 1}
              <div in:fade>
                <p>You feel neurons being fired.</p>
                <p>
                  Ah, so you have a brain, how grand! Your neurons are starting to fire now... No,
                  that's wrong, they've been firing the entire time. You just haven't noticed.
                </p>
                <p>
                  <button on:click={() => stayState++}>click to fire more neurons</button>
                </p>
              </div>
            {:else if stayState === 2}
              <div in:fade>
                <p>You feel more neurons being fired.</p>
                <p>
                  A lot is going on, it should be completely overwhelming for you, but you haven't
                  noticed.
                </p>
                <p>
                  <button on:click={() => stayState++}>click to fire more neurons</button>
                </p>
              </div>
            {:else if stayState === 3}
              <div in:fade>
                <p>You feel more neurons being fired.</p>
                <p>
                  You are regaining some of your senses. It appears you have a body and limbs as
                  well, but you haven't noticed.
                </p>
                <p>
                  <button on:click={() => stayState++}>click to fire more neurons</button>
                </p>
              </div>
            {:else if stayState === 4}
              <div in:fade>
                <p>You feel more neurons being fired.</p>
                <p>
                  A connected set of nuclei right above your spinal cord is responsible for
                  everything you sense. It's trying to tell you something, and you have to notice.
                </p>
                <p>
                  <button on:click={finishIntro}>click here to wake up</button>
                </p>
              </div>
            {/if}
          </div>
        {:else if !$storyState.showCredits}
          <div in:fade>
            <p>
              It's <strike>1998</strike> 2021 and the World Rally Championship (WRC) is going to Croatia
              for the first time. A completely new rally for every driver, filled with an amount of fast
              and windy asphalt roads that are almost in a perfect ratio with the amount of slow and
              technical ones, it's looking like an exciting challenge.
            </p>
            <p>
              Unfortunately, it's 2021, and the world is <strong>deathly</strong> afraid of some germs
              with the same name as a brand of beer, so you can't go there to watch in person.
            </p>
            <p>
              Fortunately, it's 2021, and the marvels of modern technology allow you to watch the
              rally through a rectangle that sends the lights of thousands of little coloured
              squares into your retina.
            </p>
            <p>
              After some time, it's now the final stage of the rally, and it's been quite
              interesting. Although, you did lost some of your excitement after <img
                style="width: 20px;"
                src="/resources/spe_001/finnish_flag.png"
              /> The Young Finn you've been rooting for crashed out in the first stage. But it's alright,
              not the end of the world or anything, what do you see now?
            </p>
            <p>
              Is it <img style="width: 20px;" src="/resources/spe_001/estonian_flag.png" /> The Estonian?
              No, they've been too slow the entire rally.
            </p>
            <p>
              Is it <img style="width: 20px;" src="/resources/spe_001/welsh_flag.png" /> The Welshman?
              No, they've made one too many mistakes.
            </p>
            <p>
              Is it <img style="width: 20px;" src="/resources/spe_001/belgian_flag.png" /> The Belgian?
              No, a poor strategy early on has taken them out of victory contention.
            </p>
            <p>Oh it's what I think it is, isn't it?</p>
            <p>
              You see the same sight you've seen for the past fifteen years. In fact, you might have
              never even seen a different sight before. You('ve) see(n) something truly horrible.
            </p>
            <p>
              You see <img style="width: 20px;" src="/resources/spe_001/france_flag.png" /> The French.
            </p>
            <p>
              Humanity is facing a disaster like no other. A spectre is haunting the world, one that
              if left unchecked will hamper the development of our species until the heat death of
              the universe. To put it bluntly, <img
                style="width: 20px;"
                src="/resources/spe_001/france_flag.png"
              /> The French are too dominant in the WRC.
            </p>
            <p>
              Please look at this table from Wikipedia which shows the previous years' WRC
              champions.
            </p>
            <div style="width: 100%; text-align: center">
              <img style="width: 50%" src="/resources/spe_001/wrc_table.png" />
            </div>
            <p>This is a complete catastrophe.</p>
            <p>
              I didn't want to have to do this. I thought it would have ended with <img
                style="width: 20px;"
                src="/resources/spe_001/estonian_flag.png"
              /> The Estonian, but it seems I haven't been left a choice.
            </p>
            <p>
              Today, we're going solve the greatest crisis of our time. That's right: <strong
                >us</strong
              >. You're going to help me with this, I just need a bit of your time and we'll be back
              to the golden age of rally (and thus, the golden age of human civilisation) before we
              even know it.
            </p>
            <p>How are we going to do it? By breaking the rules.</p>
            <p>
              Because of their general nature, most motorsports have somewhat complicated point
              systems (at least compared to other sports), and rally is no exception. WRC follows
              the Formula 1 point system which gives points to the top ten drivers as so.
            </p>
            <ul>
              <li><strong>First place:</strong> 25 points</li>
              <li><strong>Second place:</strong> 18 points</li>
              <li><strong>Third place:</strong> 15 points</li>
              <li><strong>Fourth place:</strong> 12 points</li>
              <li><strong>Fifth place:</strong> 10 points</li>
              <li><strong>Sixth place:</strong> 8 points</li>
              <li><strong>Seventh place:</strong> 6 points</li>
              <li><strong>Eigth place:</strong> 4 points</li>
              <li><strong>Ninth place:</strong> 2 points</li>
              <li><strong>Tenth place:</strong> 1 points</li>
            </ul>
            <p>
              This system was put in place in 2010 to help standardise point systems across the
              different motorsports organised under the Fédération Internationale de l'Automobile
              (FIA). Of course, that means there have been different systems across the years. Here
              are a few of them.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Points in 2003</th>
                  <th>Points in 1997</th>
                  <th>Points in 1995</th>
                </tr>
              </thead>
              <tbody class="center-all">
                <tr>
                  <td>1</td>
                  <td>10</td>
                  <td>10</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>8</td>
                  <td>6</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>6</td>
                  <td>4</td>
                  <td>17</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>5</td>
                  <td>3</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>4</td>
                  <td>2</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>3</td>
                  <td>1</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>2</td>
                  <td />
                  <td>9</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>1</td>
                  <td />
                  <td>8</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td />
                  <td />
                  <td>7</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td />
                  <td />
                  <td>6</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td />
                  <td />
                  <td>5</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td />
                  <td />
                  <td>4</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td />
                  <td />
                  <td>3</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td />
                  <td />
                  <td>2</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td />
                  <td />
                  <td>1</td>
                </tr>
              </tbody>
            </table>

            <p>
              As you can see, there have been some pretty big changes in the "curve" of the points
              given to each position. So what would happen if we used an older point system today?
              Would <img style="width: 20px;" src="/resources/spe_001/france_flag.png" /> The French
              still be winning?
            </p>

            <p>
              Before we find out, you should also know about "Power Stages". In the current era of
              the WRC each rally usually consists of between fifteen and thirty stages, where your
              time is added up between all of them to determine your final position. The "Power
              Stage" is the last stage of the rally and gives additional championship points to the
              five fastest drivers in that stage.
            </p>

            <p>
              So currently, if your total rally time puts you third you get 15 points. But if you
              had a good Power Stage and came in first, you get an additional 5, meaning you get a
              total of 20 points from the rally.
            </p>

            <p>
              Power Stages were introduced in 2011 and changed in 2017, here's how they're scored:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Points in 2017</th>
                  <th>Points in 2011</th>
                </tr>
              </thead>
              <tbody class="center-all">
                <tr>
                  <td>1</td>
                  <td>5</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>4</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>3</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>2</td>
                  <td />
                </tr>
                <tr>
                  <td>5</td>
                  <td>1</td>
                  <td />
                </tr>
              </tbody>
            </table>

            <p>
              Now finally, with all that information, let's attempt to use the different point
              systems throughout the years to see if there's some combination to get a different
              drivers champion.
            </p>

            <p>
              We're going to be looking at the 2020 season for this example, because that was the
              closest championship by far in recent memory, where <img
                style="width: 20px;"
                src="/resources/spe_001/france_flag.png"
              />
              Sébastien Ogier (122 points) led
              <img style="width: 20px;" src="/resources/spe_001/welsh_flag.png" /> Elfyn Evans (115 points)
              by 7 points.
            </p>

            <p>
              I've created a handy table, with the necessary data shamelessly scraped from
              www.autosport.com, which will let us change the point systems and see how it affects
              the championship.
            </p>

            <p>For reference, here it is without any changes.</p>

            <div style="width: 100%; text-align: center">
              <img style="width: 70%" src="/resources/spe_001/2020_table.png" />
            </div>

            <p>
              Looking at that we can see that our two championship contenders have the same amount
              of wins (2), so I'm not sure how much of a difference changing the scoring "curve"
              will do.
            </p>

            <p>
              But <img style="width: 20px;" src="/resources/spe_001/france_flag.png" />
              Ogier has more Power Stage points (the numbers between the parentheses), so let's see what
              happends if we change the system back to 2011 which had a smaller curve for winning.
            </p>

            <div style="width: 100%; text-align: center">
              <img style="width: 70%" src="/resources/spe_001/2020_table_1.png" />
            </div>

            <p>
              Oh it's worse now. The gap has moved up from 7 points to 8. Alright, this isn't going
              to work. We need to think of something out of the box...
            </p>
            <p>Maybe instead of just changing rules, we add some.</p>
            <p>
              The Power Stage system encourages a flat-out attack approach to the final stage of the
              rally, where you completely use up your remaning tyres, engine, and skill once you're
              completely familiar with the rally having already done hundreds of kilometres. So,
              what if we have a "Power Stage" for the first stage? We'll get to see who's the
              fastest on a new rally that they have yet to settle into.
            </p>
            <p>
              Might be interesting. Let's call it the "Premier Stage" and give it the same points as
              the Power Stage.
            </p>

            <div style="width: 100%; text-align: center">
              <img style="width: 70%" src="/resources/spe_001/2020_table_2.png" />
            </div>

            <p>
              Awesome... awesome pawesome. That completely backfired and it's now as worse as ever!
            </p>

            <p>
              Arrrghhh I guess it's going have to come to this then. Do you see the last rally on
              that table: Rally Monza (MNZ)? Notice how one driver got 25 points but the other only
              got 3 points from the Power Stage (ignore the Premier Stage in square brackets). What
              happens if we just... remove it?
            </p>

            <div style="width: 100%; text-align: center" id="scroll-target">
              <img style="width: 70%" src="/resources/spe_001/2020_table_3.png" />
            </div>

            <p>
              AND WE'VE DONE IT! <img
                style="width: 20px;"
                src="/resources/spe_001/france_flag.png"
              />
              THE FRENCH ARE NO MORE AND WORLD PEACE IS UPON US!
            </p>

            <p>
              Yes, I understand that removing an entire rally is <i>kind of</i> cheating, but desperate
              times call for desperate measures. What was I supposed to do?
            </p>

            <p>
              We're not done yet however. I've only done one season (2020), and a point lead of 15
              isn't as big as I'd like. So this is where you come in. Right below is the table that
              I used to calculate every thing but with the 2015-2020 seasons (2015 was a far back as
              I could get the data I needed for).
            </p>
            <p>
              I've given you all the tools I used, and I'd like you to pick a season (any season is
              fine) and determine the correct combination for a different WRC drivers champion,
              winning by as big a margin as possible. To make it easier, you also get an extra rally
              to remove. You're welcome.
            </p>
            <p>
              If you have a good understanding of the WRC and the WRC point system, there is also a
              button on the bottom to check the indivdual timing sheets for each rally, so you can
              double check the math of the table :)
            </p>
            <p>
              Once you're happy with your new champion who isn't <img
                style="width: 20px;"
                src="/resources/spe_001/france_flag.png"
              /> The French, press the submit button to send it to me and I might give you a special
              prize. Maybe. Either way, you can be proud of yourself for helping all of humanity in our
              great time of need.
            </p>
          </div>

          <RallyeTable />
        {:else}
          <div class="ending" in:fade={{ duration: 500 }}>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >Quand le monde était une chaîne infinie, je pouvais lui donner l'apparence que je
                  voulais.</span
                >
                <span class="tr eng"
                  >When the world was an infinite string, I could make it look like anything I
                  wanted.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr">Le monde était une ardoise vierge.</span>
                <span class="tr eng">The world was a blank slate.</span>
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Je pouvais m'en sortir avec quelque chose de plus, mais je ne le voulais pas.</span
                >
                <span class="tr eng"
                  >I could get away with something more, but I didn't want to.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Peut-être si je le voulais, mais que pourrais-tu me donner de plus ?</span
                >
                <span class="tr eng">Maybe if I wanted to, but what more could you give me?</span>
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Est-ce que ça continuerait sans fin parce qu'il n'y a rien que je puisse te
                  donner ?</span
                >
                <span class="tr eng"
                  >Would it go on endlessly because there was nothing I can give you?</span
                >
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr">Bien sûr...</span>
                <span class="tr eng">Of course...</span>
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >Nous sommes nés, donc quand nous avons trouvé la bonne personne autour de nous,
                  nous l'avons trouvée.</span
                >
                <span class="tr eng"
                  >We were born, so when we've found the right person around us, we've found them.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Nous sommes nés dans une société qui est différente de celle dans laquelle nous
                  sommes nés.</span
                >
                <span class="tr eng"
                  >We are born into a society that is different from that which we were born into.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr">Cette société est celle d'où viennent nos ancêtres.</span>
                <span class="tr eng">This society is where our ancestors first came from.</span>
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >Nous ne sommes pas les descendants de vos ancêtres, vous leur avez été enlevés et
                  vous avez votre propre existence, où vous êtes votre propre égal et vos propres
                  égaux.</span
                >
                <span class="tr eng">
                  We're not descended from your ancestors, you were taken from them and have an
                  existence of your own, where you are your own equal and your own equals.</span
                >
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >Le monde dans lequel nous vivons est ce dans quoi nous sommes nés.</span
                >
                <span class="tr eng">The world we inhabit is what we were born into.</span>
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Si nous ne le savons pas, alors ce n'est plus notre réalité.</span
                >
                <span class="tr eng">If we don't know this then this is no longer our reality.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr">Nous le savons tous.</span>
                <span class="tr eng">We all have that much knowledge.</span>
              </span>
              <span class="sentence">
                <span class="tr fr">C'est une énorme partie de notre vie, et bien plus encore.</span
                >
                <span class="tr eng">This is a huge part of our life, and much more. </span>
              </span>
            </p>
            <p style="text-align: center">*</p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >Oh tu vas être sursaturé d’anxiété maintenant, n'est-ce pas ?</span
                >
                <span class="tr eng"
                  >Oh you're going to be oversaturated with redoubled anxiety right now, arent't
                  you?</span
                >
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >"Je n'arrive pas à croire que tu sois là ! Qu'est-ce que... c'est comme si
                  j'avais perdu la tête !"</span
                >
                <span class="tr eng"
                  >"I can't believe you're even here! What the... it's like I lost my mind!"</span
                >
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >Vous savez de quoi je parle. Ça c’est réel. Ça c'est réel. Ça, ça ne l'est pas.</span
                >
                <span class="tr eng"
                  >You know what I'm talking about. This is real. This is real. This is not.</span
                >
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >Vous n'avez littéralement aucune idée de la raison pour laquelle vous êtes ici,
                  et ce n'est pas parce que vous ne ressentez plus le besoin d'expliquer à quelqu'un
                  exactement comment sera votre vie si vous continuez à tomber malade.</span
                >
                <span class="tr eng"
                  >You have literally no idea why you're here, and it isn't because you any longer
                  feel the need to explain to someone exactly how your life will be if you keep
                  getting sick.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Vous avez tout : la technologie, l'argent, le statut, toutes ces choses combinées
                  pour faire de vous quelqu’un de JUSTE, de BON.</span
                >
                <span class="tr eng"
                  >You have it all: technology, money, status, all of these things combined to make
                  you JUST, GOOD</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Vous n'avez probablement jamais vécu quelque chose comme ça avant, alors
                  maintenant ça tombe bien (en supposant que ce soit même possible) parce que vous
                  avez besoin d'une excursion réparatrice.</span
                >
                <span class="tr eng"
                  >You've probably never experienced something like this before, so now it's only
                  good timing (assuming that's even possible) because you need a fix-it excursion.</span
                >
              </span>
            </p>
            <p style="text-align: center">*</p>
            <p>
              <span class="sentence">
                <span class="tr fr">Les humains sont des sims, après tout.</span>
                <span class="tr eng">Humans are sims, after all.</span>
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >La plupart d'entre nous sommes d'accord pour dire que les voitures que nous
                  conduisons sont ce qu'il y a de plus intéressant à propos de nous, alors nous
                  voulons trouver des moyens pour nous faire nous sentir mieux à propos des choses.</span
                >
                <span class="tr eng"
                  >Most of us can agree that the cars we drive are the most interesting thing about
                  us, so we want to find ways to make ourselves feel better about things.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >La conduite est, je trouve, une expérience douloureuse, intéressante et assez
                  agréable, qui me laisse plus ou moins convaincu que nous avons évolué vers des
                  opinions beaucoup plus nuancées, bien que relativement abstraites au sujet du
                  monde matériel.</span
                >
                <span class="tr eng"
                  >Driving, I find, is a painful, interesting, and somewhat enjoyable experience,
                  one that leaves me somewhat convinced that we have evolved much more nuanced, if
                  somewhat intangible, opinions on the physical world.</span
                >
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >D'une certaine manière, c'est la première vérité de la simulation.</span
                >
                <span class="tr eng">In some ways, this is the first truth of the simulation.</span>
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Je suis enclin à être d'accord avec la plupart d'entre elles.</span
                >
                <span class="tr eng">I’m inclined to agree with most of it.</span>
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >Mais pour que je puisse avoir ces opinions, il faut que j'accepte certains des
                  points de vue les plus extrêmes de la droite la plus extrême, ce qui a conduit à
                  de la misère et de la souffrance sociale dans des proportions colossales.</span
                >
                <span class="tr eng"
                  >But for me to hold these views requires me to accept some of the more extreme
                  views of the more extreme right, which has led to enormous societal misery and
                  suffering.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr"
                  >C'est un travail nécessaire pour un être humain que d'avoir les moyens de
                  fabriquer des marques et des styles, de fabriquer des vêtements et des voitures et
                  des choses faites à partir de choses faites à partir de choses.</span
                >
                <span class="tr eng"
                  >It’s necessary work for a human being to have the means to make makes and styles,
                  to make clothes and cars and things made from things made from things.</span
                >
              </span>
              <span class="sentence">
                <span class="tr fr">Ça fait partie de mon identité.</span>
                <span class="tr eng">It’s part of my identity.</span>
              </span>
            </p>
            <p>
              <span class="sentence">
                <span class="tr fr"
                  >À tous ceux qui ont eu tendance à se soucier de la condition humaine, pourquoi
                  cela vaut-il la peine d'être humain ?</span
                >
                <span class="tr eng"
                  >To anyone whose tended to care about the human condition, why is it worth to be
                  human?</span
                >
              </span>
            </p>
            <p style="text-align: center">*</p>
            <p style="text-align: center">À bientôt.</p>
          </div>
        {/if}
      </div>
    </div>
    <div id="finish-scroll-target" />
  </div>
{/if}

{#if $storyState.showCredits}
  <FakePost />
{/if}

<style>
  .ending {
    display: block;
    margin-top: 0.7em;
    height: 1000em;
  }

  .gradient {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(25, 25, 25, 1) 85%,
      rgba(25, 25, 25, 1) 100%
    );
  }

  .intro-gradient {
    display: flex;
    justify-content: center;
    height: 200em;
    background: linear-gradient(
      180deg,
      rgba(25, 25, 25, 1) 0%,
      rgba(25, 25, 25, 1) 30%,
      rgba(255, 255, 255, 1) 95%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  .paragraph {
    margin-left: -0.1em;
    margin-bottom: 1em;
    display: inline-block;
    word-wrap: break-word;
  }

  .tr:last-child {
    visibility: hidden;
    opacity: 0;
    position: absolute;
  }

  .tr {
    transition: opacity 1000ms, visibility 1000ms;
    opacity: 1;
    padding: 0.1em;
  }

  .fr {
    font-family: Signifier, Georgia, 'Times New Roman', Times, serif;
    color: #e1e1e1;
    background-color: #191919;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0.3em;
  }

  .page {
    display: block;
    padding: 5px 20px 20px 20px;
    max-width: 620px;
    margin: 0 auto;
    font-size: 1.1rem !important;
  }

  .text-post {
    line-height: 1.4;
  }

  .center-all > tr > td {
    text-align: center;
  }

  button {
    background-color: rgb(55, 65, 81);
    color: #ffffff;
    border: 0;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(229, 231, 235);
    color: initial;
  }

  table {
    width: 100%;
  }

  th {
    top: 0;
    position: sticky;
    background-color: #fff;
    border-bottom: 1px solid rgb(55, 65, 81);
    padding: 0 0.2em;
    font-weight: normal;
  }

  tbody {
    overflow-y: auto;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
  }

  .breadcrumbs > svg {
    width: 1em;
    height: 1em;
  }

  a {
    color: #2f7de1;
    text-decoration: underline;
  }

  a:hover {
    color: #98b6db;
  }
</style>
