<script>
  import storyState from '$lib/stores/spe_001/state';

  const changePage = (p) => {
    if (p === 'credits' && !$storyState.showCredits) return;

    storyState.update((s) => {
      s.msgPage = p;
      return s;
    });
  };
</script>

<div class="msg">
  <div class="channel-bar">
    <h2 class="title">AARO.chat</h2>
    <small class="user">Logged in as: undefined</small>
    <h3>Your Rooms</h3>
    <p
      on:click={() => changePage('introductions')}
      class:active={$storyState.msgPage === 'introductions'}
    >
      welcome
    </p>
    <p
      on:click={() => changePage('watercooler')}
      class:active={$storyState.msgPage === 'watercooler'}
    >
      watercooler_talk
    </p>
    <p on:click={() => changePage('ent344')} class:active={$storyState.msgPage === 'ent344'}>
      ent#344_discussion
    </p>
    <p
      on:click={() => changePage('credits')}
      class:active={$storyState.msgPage === 'credits'}
      class:disabled={!$storyState.showCredits}
      class:color-red={$storyState.showCredits}
    >
      {#if !$storyState.showCredits}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="height: 1em;"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      {/if}
      credits
    </p>
    <h3>Private Messages</h3>
    <small class="disabled">None</small>
  </div>
  <div class="msg-view">
    <div class="msg-box">
      {#if $storyState.msgPage === 'introductions'}
        <div class="message">
          <p class="disabled">You've reached the beginning of the chat logs.</p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:14:46+10:00</small>
          </div>
          <p>
            Hi researchers, welcome to the new AARO chat. We've migrated to our own IRC like
            protocol because it seems like every other chat application sucked. This also gives us
            an opportunity to test out ENT#98's networking abilities.
          </p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:15:20+10:00</small>
          </div>
          <p>
            Reminder that this is a *confidential* chat service. Nobody (including your fellow AAROs
            without proper clearance) are allowed to know this site even exists.
          </p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:15:25+10:00</small>
          </div>
          <p>Any questions?</p>
        </div>

        <div class="message">
          <div>
            <h4>vulta</h4>
            <small>2018-05-21T15:16:49+10:00</small>
          </div>
          <p>Yea how do i get my name to become red like yours?</p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:17:17+10:00</small>
          </div>
          <p>Spend the worst 14 years of your life working up to become board member ;)</p>
        </div>

        <div class="message">
          <div>
            <h4>DogKicker2003</h4>
            <small>2018-05-21T15:20:21+10:00</small>
          </div>
          <p>https://xkcd.com/927/</p>
        </div>

        <div class="message">
          <div>
            <h4>milli</h4>
            <small>2018-05-21T15:20:40+10:00</small>
          </div>
          <p>@DogKicker2003 LUL I just thinking about that xkcd</p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:22:09+10:00</small>
          </div>
          <p>
            Yes, there's a relevant xkcd for eveything... And @DogKicker2003, can you change your
            nick? Kinda inapproriate mate. The taxpayers don't pay us to kick dogs.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>DogKicker2003</h4>
            <small>2018-05-21T15:22:35+10:00</small>
          </div>
          <p>I don't know how</p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:22:41+10:00</small>
          </div>
          <p>/nick [new name]</p>
        </div>

        <div class="message">
          <p class="disabled">DogKicker2003 is now adobe_after_effects</p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:23:46+10:00</small>
          </div>
          <p>...thanks.</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_after_effects</h4>
            <small>2018-05-21T15:24:19+10:00</small>
          </div>
          <p>np. Anything for you boss man! :)</p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2018-05-21T15:25:30+10:00</small>
          </div>
          <p>
            No but seriously, why have we moved AGAIN? What was wrong with Matrix? Do our sysadmins
            really need to justify their jobs or somehting? THERE WAS NOTHING WRONG WITH MATRIX!
            Plenty of other governments use Matrix, it's well supported, why on earth did we need to
            MAKE OUR OWN ONE?
          </p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">Mattster_BM</h4>
            <small>2018-05-21T15:26:53+10:00</small>
          </div>
          <p>
            Look, I understand your concerns @baguette_fan but we needed a completely new protocol
            in order to use the security that ENT#98 could bring to our network. Please don't
            disrespect our sysadmins like that, they know what they're doing. And it's a little
            disengenuous to say "plently of other governments use Matrix" when AFAIK it's only
            France (now that we're not anymore) and they only started last month.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>godofcows</h4>
            <small>2018-05-21T15:31:44+10:00</small>
          </div>
          <p>but IRC isnt even that secure though? its not end 2 end encrypted????</p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">Mattster_BM</h4>
            <small>2018-05-21T15:32:01+10:00</small>
          </div>
          <p>
            It's an IRC *like* protocol. And we're theorising that with ENT#98, we won't even need
            E2EE.
          </p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:32:21+10:00</small>
          </div>
          <p>And Matrix doesnt't have E2EE as well. Not even sure if they're planning for it.</p>
        </div>

        <div class="message">
          <div>
            <h4>ESD_Wyrk</h4>
            <small>2018-05-21T15:32:35+10:00</small>
          </div>
          <p class="disabled">
            &gt; And we're theorising that with ENT#98, we won't even need E2EE.
          </p>
          <p>youre putting a lot at risk on something that's just a theory...</p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2018-05-21T15:33:20+10:00</small>
          </div>
          <p>
            That's a fair point @ESD_Wyrk, but I agree with Matthieu when he says to trust in our
            sysadmins, they are some of the best in the world.
          </p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>
      {:else if $storyState.msgPage === 'watercooler'}
        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>goodboye54</h4>
            <small>2019-09-02T09:54:01+10:00</small>
          </div>
          <p>
            HEY EVERYONE!! I got assigned to ENT#1117 recently and finally got my security level so
            I can now access this *secret* chat! Super excited to be talking to you all!
          </p>
        </div>
        <div class="message">
          <div>
            <h4>Kai_Bach</h4>
            <small>2019-09-02T09:54:29+10:00</small>
          </div>
          <p>Oh God and their nick is "goodboye", they always start so innocent</p>
        </div>
        <div class="message">
          <div>
            <h4>__TeslaRoadster__</h4>
            <small>2019-09-02T09:55:02+10:00</small>
          </div>
          <p>i'm sorry for your future loss @goodboye54, you won't be a good boy for very long.</p>
        </div>
        <div class="message">
          <div>
            <h4>goodboye54</h4>
            <small>2019-09-02T09:55:09+10:00</small>
          </div>
          <p>
            I'm actually a woman. And you guys don't need to worry about me, I'm sure I can hold my
            own here :)
          </p>
        </div>
        <div class="message">
          <div>
            <h4>kawaii_hawaii</h4>
            <small>2019-09-02T09:55:54+10:00</small>
          </div>
          <p class="disabled">&gt; I'm actually a woman.</p>
          <p>...good luck out there @goodboye54 o7. We'll be rooting for you</p>
        </div>
        <div class="message">
          <div>
            <h4 class="color-red">danieBM</h4>
            <small>2019-09-02T09:56:31+10:00</small>
          </div>
          <p>
            Everyone please stop trying to scare the newbie. There's nothing that bad about our
            chat.
          </p>
        </div>
        <div class="message">
          <div>
            <h4>__TeslaRoadster__</h4>
            <small>2019-09-02T09:57:08+10:00</small>
          </div>
          <p>
            @kawaii_hawaii was literally talking about doing "things" to full sized anime body
            pillows 30 mins ago
          </p>
        </div>
        <div class="message">
          <div>
            <h4>kawaii_hawaii</h4>
            <small>2019-09-02T09:57:56+10:00</small>
          </div>
          <p>
            NO I WAS TALKING ABOUT HOW WE COULD USE ENT#416 TO MAKE THEM REAL!! STOP SNITCHING YOU
            FUCK
          </p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>BitStream</h4>
            <small>2020-01-13T23:45:30+08:00</small>
          </div>
          <p>Why do I feel like everyone ignores me?</p>
        </div>

        <div class="message">
          <div>
            <h4>TheOldSter_</h4>
            <small>2020-01-14T01:47:52+10:00</small>
          </div>
          <p>
            Cus you're from Perth. I think you're like the only person in this chat who lives there.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>BitStream</h4>
            <small>2020-01-13T23:48:11+08:00</small>
          </div>
          <p>What? How do you know?</p>
        </div>

        <div class="message">
          <div>
            <h4>TheOldster_</h4>
            <small>2020-01-14T01:48:28+10:00</small>
          </div>
          <p>The timestamps on the chat logs are in your local timezone</p>
        </div>

        <div class="message">
          <div>
            <h4>BitStream</h4>
            <small>2020-01-13T23:48:34+08:00</small>
          </div>
          <p>ah fuck</p>
        </div>

        <div class="message">
          <div>
            <h4>vulta</h4>
            <small>2020-01-14T01:48:53+10:00</small>
          </div>
          <p>Just move to Melbourne, problem solved.</p>
        </div>

        <div class="message">
          <div>
            <h4>BitStream</h4>
            <small>2020-01-13T23:49:16+08:00</small>
          </div>
          <p>No thanks. I like being able to afford a house.</p>
        </div>

        <div class="message">
          <div>
            <h4>vulta</h4>
            <small>2020-01-14T01:49:28+10:00</small>
          </div>
          <p>Canberra? It's where most AAROs live.</p>
        </div>

        <div class="message">
          <div>
            <h4>BitStream</h4>
            <small>2020-01-13T23:49:16+08:00</small>
          </div>
          <p>
            CANBERRA? LOL. Look, you guys just need to accept that Perth is the better city, I'm not
            moving.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>Moofer</h4>
            <small>2020-01-14T01:49:44+10:00</small>
          </div>
          <p>wHY DoEs evErYonE IGnorE mE?</p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>milli</h4>
            <small>2020-02-25T09:11:31+10:00</small>
          </div>
          <p>@D4 be nice to @fyso today.</p>
        </div>

        <div class="message">
          <div>
            <h4>D4</h4>
            <small>2020-02-25T09:11:52+10:00</small>
          </div>
          <p>I am alwys nice to fyso. i don't like what youre implying</p>
        </div>
        <div class="message">
          <div>
            <h4>D4</h4>
            <small>2020-02-25T09:11:59+10:00</small>
          </div>
          <p>I am nice to everyone</p>
        </div>
        <div class="message">
          <div>
            <h4>D4</h4>
            <small>2020-02-25T09:12:05+10:00</small>
          </div>
          <p>always</p>
        </div>
        <div class="message">
          <div>
            <h4>D4</h4>
            <small>2020-02-25T09:12:12+10:00</small>
          </div>
          <p>so shut the fuck up</p>
        </div>
        <div class="message">
          <div>
            <h4>D4</h4>
            <small>2020-02-25T09:12:16+10:00</small>
          </div>
          <p>cunt</p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>Zaphod</h4>
            <small>2020-05-14T17:20:11+10:00</small>
          </div>
          <p>
            My Swedish language teacher keeps giving me Swedish childrens shows to watch. Any one
            know why, does he just think I'm a child?
          </p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">MYUKKE_bm</h4>
            <small>2020-05-14T17:21:14+10:00</small>
          </div>
          <p>
            It's actually a pretty common thing for new language learners. Childrens shows teach you
            the basic stuff like shapes, colours, things in general, etc.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>sioux</h4>
            <small>2020-05-14T17:21:58+10:00</small>
          </div>
          <p>
            Damn that makes alot of sense, any one know if there are any childrens shows in Rust?
          </p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>godofcows</h4>
            <small>2020-09-12T20:16:40+10:00</small>
          </div>
          <p>
            HOLY SHIT SERRIOUSLY ENT#801 WHAT THE FUCK IS A "PIKACHU"?! SHUT THE HELL UP I DONT CARE
            HOW CUTE YOU THINK IT IS FUUUCKKKK
          </p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>kawaii_hawaii</h4>
            <small>2020-09-13T22:53:01+10:00</small>
          </div>
          <p>my dick is so big it reaches from A-Z on a keyboard</p>
        </div>

        <div class="message">
          <div>
            <h4>Jeremy985</h4>
            <small>2020-09-13T22:53:10+10:00</small>
          </div>
          <p>O_____O u sure?</p>
        </div>

        <div class="message">
          <div>
            <h4>kawaii_hawaii</h4>
            <small>2020-09-13T22:53:16+10:00</small>
          </div>
          <p>wait no</p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_premier</h4>
            <small>2020-12-24T13:46:19+10:00</small>
          </div>
          <p>so these two juniors got assigned to ENT#297 with me right?</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_premier</h4>
            <small>2020-12-24T13:46:30+10:00</small>
          </div>
          <p>and they start arguing over somehting. It's getting pretty heated</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_premier</h4>
            <small>2020-12-24T13:46:36+10:00</small>
          </div>
          <p>and one of them is like "you wanna fight or something?"</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_premier</h4>
            <small>2020-12-24T13:46:43+10:00</small>
          </div>
          <p>and the other is like "fucking sure ill take you down where at?"</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_premier</h4>
            <small>2020-12-24T13:46:49+10:00</small>
          </div>
          <p>and the first guy says "Hearthstone"</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_premier</h4>
            <small>2020-12-24T13:46:55+10:00</small>
          </div>
          <p>"oh you play hearthstone?" "yeah lets fucking go"</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_premier</h4>
            <small>2020-12-24T13:47:07+10:00</small>
          </div>
          <p>i think there's something wrong with the kids these days</p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>IceWizard</h4>
            <small>2021-03-21T05:21:22+10:00</small>
          </div>
          <p>Holy fuck this chat does not work not mobile. The layout is completely broken wtf.</p>
        </div>

        <div class="message">
          <div>
            <h4>Kai_Bach</h4>
            <small>2021-03-21T05:25:53+10:00</small>
          </div>
          <p>
            Uhh.. didn't you get the memo? you aren't supposed to use a phone with this, ENT#98
            doesn't work with consumer hardware yet. Bad security or something
          </p>
        </div>

        <div class="message">
          <div>
            <h4>IceWizard</h4>
            <small>2021-03-21T05:26:09+10:00</small>
          </div>
          <p>shit</p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>
      {:else if $storyState.msgPage === 'ent344'}
        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2019-02-08T14:43:20+10:00</small>
          </div>
          <p>
            Hey @QWERTYfish, just letting you know I'll be assigned to ENT#344 with you starting
            tomorrow.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>QWERTYfish</h4>
            <small>2019-02-08T14:45:12+10:00</small>
          </div>
          <p>Thanks for the heads up. But were you assigned because of... you know?</p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2019-02-08T14:45:55+10:00</small>
          </div>
          <p>
            fuck I hope not. I dont even like baguettes that much, i just thought it would be a
            funny nick.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>QWERTYfish</h4>
            <small>2019-02-08T14:46:29+10:00</small>
          </div>
          <p>
            Fair enough. @ESD_Wyrk got assigned to ENT#344 a few months ago as well. I'm really
            curious as to why the board has assigned three senior researchers to what looks like a
            joke anomaly.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2019-02-08T14:47:41+10:00</small>
          </div>
          <p>
            I dunno, but didn't you have to upgrade it to Bippa class a while back? IMO every
            anomaly with reality restructuring capabilities should be AT LEAST Bippa class.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>QWERTYfish</h4>
            <small>2019-02-08T14:48:02+10:00</small>
          </div>
          <p>Yeah, maybe.</p>
        </div>

        <div class="message">
          <div>
            <h4>partyman</h4>
            <small>2019-02-08T14:48:07+10:00</small>
          </div>
          <p>
            You kidding me daniel!? Not true mate I see you eat something with a baguette for lunch
            at least twice a week.
          </p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>adobe_after_effects</h4>
            <small>2019-07-10T09:21:54+10:00</small>
          </div>
          <p>what happens if there's a tie?</p>
        </div>

        <div class="message">
          <div>
            <h4>ESD_Wyrk</h4>
            <small>2019-07-10T09:22:43+10:00</small>
          </div>
          <p>Huh, good question. never tried it. BRB</p>
        </div>

        <div class="message">
          <div>
            <h4>ESD_Wyrk</h4>
            <small>2019-07-10T10:02:13+10:00</small>
          </div>
          <p>
            Okay so nothing happens, guess it doesn't count even if the sport rules say there can't
            be tied victors and the french win on some technicality.
          </p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>

        <div class="message">
          <div>
            <h4>CactusJac</h4>
            <small>2020-11-28T11:31:14+10:00</small>
          </div>
          <p>Ok I don't get it. How do I get the reality restructuring event to happen?</p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2020-11-28T11:33:50+10:00</small>
          </div>
          <p>Dude... RTFM, it's literally spelled out for you.</p>
        </div>

        <div class="message">
          <div>
            <h4>CactusJac</h4>
            <small>2020-11-28T11:42:44+10:00</small>
          </div>
          <p class="disabled">
            &gt; Instead, submitting something to make the French "near-total" domination into
            "total" domination will cause a Reality Restructuring event that implements the idea.
          </p>
          <p>
            So, I have a season where an American won. I just submit somthing to make them lose?
          </p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2020-11-28T11:33:50+10:00</small>
          </div>
          <p>Yes, and a French person has to win.</p>
        </div>

        <div class="message">
          <div>
            <h4>CactusJac</h4>
            <small>2020-11-28T11:45:49+10:00</small>
          </div>
          <p>Nice, ok that's done. Hope something cool happens, this is such a weird anomaly.</p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2020-11-28T11:47:28+10:00</small>
          </div>
          <p>by weird, i hope you mean *stupid*. This is a *stupid* anomaly.</p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2020-11-28T11:49:52+10:00</small>
          </div>
          <p>
            I mean like yeah sure, a restructuring event giving the French total domination over a
            sport sure can lead to some WACKY scenarios just by virtue of the butterfly effect. But
            what are we even learning from this? Honestly, we're not getting any new information
            from these types of experiments, we're just fucking up some para-reality for no reason.
          </p>
        </div>

        <div class="message">
          <div>
            <h4>baguette_fan</h4>
            <small>2020-11-28T11:51:22+10:00</small>
          </div>
          <p>
            Fuck this is dumb. I've wasted a year of my life on this shit. We STILL don't know where
            ENT#344 came from. We STILL don't know why it can cause a RRE. But we DID create a
            preset for para-realites to help us run this dogshit test that helps NOBODY. What kind
            of troglodyte neanderthal ass motherfucker thinks this is such important work that we
            need FOUR researchers on it.
          </p>
        </div>

        <div class="message">
          <div>
            <h4 class="color-red">Mattster_BM</h4>
            <small>2020-11-28T11:53:01+10:00</small>
          </div>
          <p>
            @baguette_fan, please stop with the mindless ranting. You need to be a good influence on
            your junior, we don't want to reprimand you again.
          </p>
        </div>

        <div class="message">
          <p class="disabled">Error: chat logs missing</p>
        </div>
      {:else if $storyState.msgPage === 'credits'}
        <div class="message">
          <div>
            <h4>beanpup_py</h4>
            <small>2021-03-24T00:33:50+10:00</small>
          </div>
          <p>Thanks to:</p>
          <p>- Marjolaine Potura</p>
          <p>- Abigail Cassandra</p>
          <p>And:</p>
          <p>- GPT-2</p>
          <p>- Red pandas (all of them)</p>
          <p>
            - Everyone who's ever written a SCP (especially whoever wrote the one that gave me
            nightmares as a kid)
          </p>
          <p>- Kalle Rovanperä</p>
          <p>- Les chansons de geste (but mainly Astolfo)</p>
          <p>- Karl Marx</p>
          <p>
            - All the IRC channels that taught me about the bad words (and more) during my critical
            development years
          </p>
          <p>- The FIA</p>
          <p>- My crippling anxiety</p>
          <p>
            - That one video of that cat with a lazy eye who's trying to get to the bottom of a bag
            of chips but they just can't quite seem to get the last chip.
          </p>
          <p>- The Fate anime (but mainly Astolfo)</p>
          <p>- Rich Harris</p>
          <p>- The people at the cafe I go to who know my order so I don't have to talk to them</p>
          <p>- Getting blocked by Hideki Kamiya on Twitter</p>
          <p>- Income taxes</p>
        </div>
        <div class="message">
          <p class="disabled">You have been kicked from this chat room.</p>
        </div>
      {/if}
    </div>
    <div class="input-box">
      <p class="disabled">You do not have permission to send messages in this room.</p>
    </div>
  </div>
</div>

<style>
  .msg {
    font-family: 'Source Sans Pro', sans-serif;
    width: 100%;
    background-color: #0d1117;
    height: calc(100vh - 2.4em);
    color: #fff;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr;
  }

  .message > div > h4 {
    font-weight: bold !important;
  }

  .disabled {
    color: #84838b;
  }

  .channel-bar {
    padding: 3em 1.5em;
    background-color: #1b1e21;
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    border-radius: 0 1em 1em 0;
  }

  .channel-bar > .title {
    border-bottom: 3px solid #fff;
  }

  .channel-bar > p {
    margin: 0;
    margin-bottom: 0.5em;
    cursor: pointer;
  }

  .channel-bar > p:not(.disabled):hover {
    color: #366f93;
  }

  .channel-bar > h3 {
    margin: 1em 0 !important;
    color: #84838b;
  }

  .msg-view {
    padding: 2em;
    grid-column: auto / span 10;
    display: grid;
    grid-gap: 1em;
    grid-template-rows: repeat(12, 1fr);
    overflow-y: auto;
  }

  .msg-box {
    grid-row: 1 / span 11;
    padding: 1em;
    background-color: #1b1e21;
    border-radius: 0.5em;
    overflow-y: scroll;
  }

  .input-box {
    grid-row: auto / span 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1b1e21;
    border-radius: 0.5em;
    width: 100%;
  }

  .input-box > p {
    margin: 0;
  }

  .message {
    margin-top: 1em;
  }

  .message > div {
    display: flex;
    align-items: flex-end;
  }

  .message > div > small {
    margin-left: 1em;
  }

  .message > p {
    margin: 0;
  }

  .color-red {
    color: rgb(246, 64, 69);
  }

  .active {
    text-decoration: underline;
  }

  .message {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.8rem;
  }
</style>
