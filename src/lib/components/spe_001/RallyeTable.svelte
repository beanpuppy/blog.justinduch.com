<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { decodeAsync } from '@msgpack/msgpack';
  import storyState from '$lib/stores/spe_001/state';

  let rallyeData = {};
  let loading = true;

  onMount(async () => {
    const res = await fetch('/resources/spe_001/rallye_data.msgpack');
    rallyeData = await decodeAsync(res.body);

    loading = false;
  });

  const pointSystems = {
    'WRC 2010': [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
    'WRC 2003': [10, 8, 6, 5, 4, 3, 2, 1],
    'WRC 1997': [10, 6, 4, 3, 2, 1],
    'WRC 1995': [25, 20, 17, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  };

  const powerStageSystems = {
    'WRC 2017': [5, 4, 3, 2, 1],
    'WRC 2011': [3, 2, 1]
  };

  let rallyeTableSettings = {
    season: '2015',
    rallyeIndex: 0,
    stageIndex: 0,
    detailed: false,
    detailedTime: false,
    overall: false,
    showTable: false,
    useCustomScoring: false,
    scoring: {
      2015: {
        ignoreRallyes: ['', '', ''],
        pointSystem: 'WRC 2010',
        powerStageSystem: 'WRC 2011',
        premierStageSystem: ''
      },
      2016: {
        ignoreRallyes: ['', '', ''],
        pointSystem: 'WRC 2010',
        powerStageSystem: 'WRC 2011',
        premierStageSystem: ''
      },
      2017: {
        ignoreRallyes: ['', '', ''],
        pointSystem: 'WRC 2010',
        powerStageSystem: 'WRC 2017',
        premierStageSystem: ''
      },
      2018: {
        ignoreRallyes: ['', '', ''],
        pointSystem: 'WRC 2010',
        powerStageSystem: 'WRC 2017',
        premierStageSystem: ''
      },
      2019: {
        ignoreRallyes: ['', '', ''],
        pointSystem: 'WRC 2010',
        powerStageSystem: 'WRC 2017',
        premierStageSystem: ''
      },
      2020: {
        ignoreRallyes: ['', '', ''],
        pointSystem: 'WRC 2010',
        powerStageSystem: 'WRC 2017',
        premierStageSystem: ''
      }
    }
  };

  const resetScoring = () => {
    rallyeTableSettings.scoring[rallyeTableSettings.season] = {
      ignoreRallyes: ['', '', ''],
      pointSystem: 'WRC 2010',
      powerStageSystem: 'WRC ' + (rallyeTableSettings.season >= '2017' ? '2017' : '2011'),
      premierStageSystem: ''
    };
  };

  const changeRallyeSeason = (season) => {
    rallyeTableSettings.season = season;
    rallyeTableSettings.rallyeIndex = 0;
    rallyeTableSettings.stageIndex = 0;
  };

  const changeRallyeStage = (i) => {
    rallyeTableSettings.overall = false;
    rallyeTableSettings.stageIndex = i;
  };

  const printBonus = (time) => {
    let s = '';

    if (time.premier) s += `[${time.premier}]`;
    if (time.premier && time.power) s += ' ';
    if (time.power) s += `(${time.power})`;

    return s;
  };

  const getSystem = (s) => rallyeTableSettings.scoring[rallyeTableSettings.season][s];

  const calcSeasonResults = (s) => {
    let season = rallyeData[s];

    const pointSystem = getSystem('pointSystem');
    const powerSystem = getSystem('powerStageSystem');
    const premierSystem = getSystem('premierStageSystem');

    for (let rallye of season) {
      if (currentScoring.ignoreRallyes.indexOf(rallye.title) !== -1) {
        continue;
      }

      let premierStage = rallye.stages[0];
      let powerStage = rallye.stages[rallye.stages.length - 2];
      let overall = rallye.stages[rallye.stages.length - 1];

      for (let [index, time] of overall.times.entries()) {
        time.points = 0;
        time.power = 0;
        time.premier = 0;

        if (!time.position) {
          // No position means retirement and no points
          continue;
        }

        if (parseInt(time.position) <= pointSystems[currentScoring.pointSystem].length) {
          // Outside top positions means no points
          time.points += pointSystems[pointSystem][index] || 0;
        }

        if (premierSystem) {
          let premierStageIndex = premierStage.times.map((e) => e.driver).indexOf(time.driver);

          if (premierStageIndex !== -1) {
            time.premier += powerStageSystems[premierSystem][premierStageIndex] || 0;
          }
        }

        if (s === '2020' && rallye.title === 'Rally Mexico') {
          // 2020 Rally Mexico's Power Stage was cancelled
          continue;
        }

        if (powerSystem) {
          let powerStageIndex = powerStage.times.map((e) => e.driver).indexOf(time.driver);

          if (powerStageIndex !== -1) {
            time.power += powerStageSystems[powerSystem][powerStageIndex] || 0;
          }
        }
      }
    }
  };

  const getSeasonDrivers = (season) => {
    let drivers = [];

    for (let rallye of season) {
      let overall = rallye.stages[rallye.stages.length - 1];

      for (let time of overall.times) {
        let driverIndex = drivers.map((e) => e[0]).indexOf(time.driver);
        if (driverIndex === -1) {
          drivers.push([time.driver, time['co-driver']]);
        }
      }
    }

    return drivers;
  };

  const dispSeasonResults = (s) => {
    const season = rallyeData[s];

    let headers = rallyeTableSettings.detailed
      ? season
          .filter((e) => currentScoring.ignoreRallyes.indexOf(e.title) === -1)
          .map((r) => {
            let s = r.title.split(' ');

            switch (s[1]) {
              case 'Monza':
                return 'MNZ';
              case 'Germany':
                return 'DEU';
              case 'Wales':
                return 'GBR';
            }

            if (s.length === 2) return s[1].slice(0, 3).toUpperCase();
            if (s[1].length < 3) return s[2].slice(0, 3).toUpperCase();
            if (s[2].length < 3) return s[1].slice(0, 3).toUpperCase();
            return s[1].slice(0, 3).toUpperCase();
          })
      : [];

    let drivers = getSeasonDrivers(season);
    let rows = [];

    for (let [driver, coDriver] of drivers) {
      let driverRow = { driver: driver, 'co-driver': coDriver, times: [], total: 0 };

      for (let rallye of season) {
        if (currentScoring.ignoreRallyes.indexOf(rallye.title) !== -1) {
          continue;
        }

        let overall = rallye.stages[rallye.stages.length - 1];

        let driverTimeIndex = overall.times.map((t) => t.driver).indexOf(driver);

        if (driverTimeIndex === -1) {
          driverRow.times.push({ points: 0, power: 0, premier: 0 });
          continue;
        }

        let { points, power, premier } = overall.times[driverTimeIndex];
        driverRow.total += points + power + premier;
        driverRow.times.push({ points, power, premier });
      }

      rows.push(driverRow);
    }

    let sorted = rows.sort((a, b) => b.total - a.total);

    headers.unshift('Pos', 'Driver/Co-Driver');
    headers.push('Total');

    return [headers, rows];
  };

  const checkStandings = () => {
    const [_, rows] = dispSeasonResults(rallyeTableSettings.season);
    const first = rows[0];
    const second = rows[1];
    submitPressed = true;

    if (first.total === second.total) {
      // No ties
      return;
    }

    if (rallyeTableSettings.season === '2019' && first.driver === 'Sébastien Ogier') {
      storyState.update((s) => {
        s.startTransition = true;
        /* s.pageNotifications.msg = true; */
        /* s.showCredits = true; */
        return s;
      });

      setTimeout(() => window.scrollTo({ top: 0 }));
    }
  };

  let rallyeSeasons,
    currentRallyes,
    currentRallye,
    currentRallyeStages,
    currentRallyeStage,
    currentRallyeTimes,
    currentScoring,
    currentRallyesFiltered,
    submitPressed;

  $: if (!loading) {
    rallyeSeasons = Object.keys(rallyeData);
    currentRallyes = rallyeData[rallyeTableSettings.season];
    currentRallye = currentRallyes[rallyeTableSettings.rallyeIndex];
    currentRallyeStages = currentRallye.stages;
    currentRallyeStage = currentRallye.stages[rallyeTableSettings.stageIndex];
    currentRallyeTimes = currentRallyeStage.times;
    currentScoring = rallyeTableSettings.scoring[rallyeTableSettings.season];
    currentRallyesFiltered = currentRallyes.filter(
      (e) => currentScoring.ignoreRallyes.indexOf(e.title) === -1
    );
    calcSeasonResults(rallyeTableSettings.season);
    submitPressed = false;
  }
</script>

{#if loading}
  <div class="load-container">
    <p style="text-align: center; margin: 4em 0 0 0;">Loading Table</p>
    <div>
      <div class="loader" />
    </div>
  </div>
{:else}
  <h3 style="margin-bottom: 0.4em">The 2015-2020 WRC Championship Redo</h3>
  <div class="rallye-form">
    <div class="rallye-scoring">
      <div class="rallye-season-tab">
        {#each rallyeSeasons as season}
          <span
            on:click={() => changeRallyeSeason(season)}
            class:active-tab={rallyeTableSettings.season === season}>{season}</span
          >
        {/each}
      </div>

      <div style="display: flex; justify-content: space-between; margin: 1em 0 0.5em 0;">
        <h3>Scoring Settings</h3>
        <button style="width: 12em; margin-top: 0.4em; height: 1.6em;" on:click={resetScoring}>
          Reset
        </button>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div style="display: flex;">
          <div class="label">Point System:</div>
          <select
            bind:value={rallyeTableSettings.scoring[rallyeTableSettings.season].pointSystem}
            on:change={() => calcSeasonResults(rallyeTableSettings.season)}
          >
            {#each Object.keys(pointSystems) as year}
              <option value={year}>{year}</option>
            {/each}
          </select>
        </div>

        <div style="display: flex;">
          <div class="label">Remove Rally:</div>
          <select
            bind:value={rallyeTableSettings.scoring[rallyeTableSettings.season].ignoreRallyes[0]}
            on:change={() => calcSeasonResults(rallyeTableSettings.season)}
          >
            <option value={''}>None</option>
            {#each currentRallyes as rallye}
              <option value={rallye.title}>{rallye.title}</option>
            {/each}
          </select>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <div style="display: flex;">
          <div class="label">Power Stage System:</div>
          <select
            bind:value={rallyeTableSettings.scoring[rallyeTableSettings.season].powerStageSystem}
            on:change={() => calcSeasonResults(rallyeTableSettings.season)}
          >
            {#each Object.keys(powerStageSystems) as year}
              <option value={year}>{year}</option>
            {/each}
            <option value={''}>None</option>
          </select>
        </div>
        <div style="display: flex;">
          <div class="label">Remove Rally:</div>
          <select
            bind:value={rallyeTableSettings.scoring[rallyeTableSettings.season].ignoreRallyes[1]}
            on:change={() => calcSeasonResults(rallyeTableSettings.season)}
          >
            <option value={''}>None</option>
            {#each currentRallyes as rallye}
              <option value={rallye.title}>{rallye.title}</option>
            {/each}
          </select>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <div style="display: flex;">
          <div class="label">Premier Stage System:</div>
          <select
            bind:value={rallyeTableSettings.scoring[rallyeTableSettings.season].premierStageSystem}
            on:change={() => calcSeasonResults(rallyeTableSettings.season)}
          >
            {#each Object.keys(powerStageSystems) as year}
              <option value={year}>{year}</option>
            {/each}
            <option value={''}>None</option>
          </select>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin: 1em 0 0.5em 0;">
        <h3>Season Results</h3>
        <button
          style="width: 12em; margin-top: 0.4em; height: 1.6em;"
          on:click={() => (rallyeTableSettings.detailed = !rallyeTableSettings.detailed)}
        >
          {!rallyeTableSettings.detailed ? 'Show More Detail' : 'Show Less Detail'}
        </button>
      </div>

      <div class="rallye-stage-times">
        <table>
          <thead>
            <tr>
              {#each dispSeasonResults(rallyeTableSettings.season)[0] as header}
                <th>{header}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each dispSeasonResults(rallyeTableSettings.season)[1] as row, i}
              <tr>
                <td style="text-align: center">{i + 1}</td>
                <td class="multi-row driver">
                  <p>{row.driver}</p>
                  <p>{row['co-driver']}</p>
                </td>
                {#if rallyeTableSettings.detailed}
                  {#each row.times as time}
                    <td style="min-width: 3em;" class="multi-row">
                      <p style="text-align: center;">{time.points || ''}</p>
                      <p />
                      <p style="text-align: center;">{printBonus(time)}</p>
                    </td>
                  {/each}
                {/if}
                <td style="text-align: center">{row.total}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <div style="width: 100%; display: flex; justify-content: center; margin: 1em 0;">
      <a
        href="javascript:void(0);"
        on:click={() => (rallyeTableSettings.showTable = !rallyeTableSettings.showTable)}
      >
        {!rallyeTableSettings.showTable ? 'Show Rally Timesheets' : 'Hide Rally Timesheets'}
        {#if rallyeTableSettings.showTable}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="height: 0.8em; width: 0.8em;"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="height: 0.8em; width: 0.8em;"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        {/if}
      </a>
    </div>

    {#if rallyeTableSettings.showTable}
      <div class="rallye-table" transition:slide>
        <div style="margin-bottom: 0.5em">
          <h3 style="margin: 1em 0 0.1em 0;">
            WRC {rallyeTableSettings.season}
            {currentRallye.title} | {currentRallyeStage.stage}
          </h3>
          <small
            >Premier stage points signified by square brackets [], power stage by parentheses ()</small
          >
        </div>
        <div class="rallye-options">
          <div style="display: flex;">
            <div class="label">Rallye:</div>
            <select
              bind:value={rallyeTableSettings.rallyeIndex}
              on:change={() => (rallyeTableSettings.stageIndex = 0)}
            >
              {#each currentRallyesFiltered as rallye, i}
                <option value={i}>{rallye.title}</option>
              {/each}
            </select>
          </div>
          <button
            style="width: 12em;"
            on:click={() => (rallyeTableSettings.detailedTime = !rallyeTableSettings.detailedTime)}
          >
            {!rallyeTableSettings.detailedTime ? 'Show More Detail' : 'Show Less Detail'}
          </button>
        </div>

        <div class="rallye-stages-list">
          {#each currentRallyeStages as stage, i}
            <span
              on:click={() => changeRallyeStage(i)}
              class:active-stage={rallyeTableSettings.stageIndex == i}>{stage.stage}</span
            >
          {/each}
        </div>

        <div class="rallye-stage-times">
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver/Co-Driver</th>
                <th>Team/Car</th>
                <th>Time</th>
                {#if rallyeTableSettings.detailedTime}
                  <th>Gap</th>
                  <th>Interval</th>
                  <th>Penalties</th>
                {/if}
                {#if currentRallyeStage.stage == 'Overall'}
                  <th>Points</th>
                {/if}
              </tr>
            </thead>
            <tbody>
              {#each currentRallyeStage.times as time}
                <tr>
                  <td style="text-align: center;">{time.position}</td>
                  <td class="multi-row driver">
                    <p>{time.driver}</p>
                    <p>{time['co-driver']}</p>
                  </td>
                  <td>{time['team/car']}</td>
                  <td>{time.time}</td>
                  {#if rallyeTableSettings.detailedTime}
                    <td>{time.gap_1st}</td>
                    <td>{time.interval}</td>
                    <td>{time.penalties}</td>
                  {/if}
                  {#if currentRallyeStage.stage == 'Overall'}
                    <td class="multi-row">
                      <p style="text-align: center;">{time.points || ''}</p>
                      <p />
                      <p style="text-align: center;">{printBonus(time)}</p>
                    </td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}

    <div style="width: 100%; display: flex; justify-content: flex-end; margin: 1em 0;">
      <div style="display: flex; flex-direction: column; align-items: flex-end;">
        <button style="width: 12em;" on:click={checkStandings}>Submit</button>
        {#if submitPressed}
          <small style="color: rgb(5, 150, 105)">Submitted! Good job!</small>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .center-all > tr > td {
    text-align: center;
  }

  .label {
    margin-right: 0.3em;
  }

  .rallye-season-tab {
    display: flex;
    margin-bottom: 1em;
    width: 100%;
  }

  .rallye-season-tab > span {
    cursor: pointer;
    padding: 0 0.5em;
    color: #ffffff;
    background-color: rgb(55, 65, 81);
    width: 20%;
    display: flex;
    justify-content: center;
  }

  .rallye-season-tab > span.active-tab {
    background-color: rgb(229, 231, 235);
    color: initial;
  }

  .rallye-season-tab > span:not(.active-tab):hover {
    background-color: rgb(100, 113, 134);
  }

  .rallye-options {
    display: flex;
    margin-bottom: 0.5em;
    justify-content: space-between;
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

  .rallye-stages-list {
    display: flex;
    overflow: auto;
    margin-bottom: 0.4em;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .rallye-stages-list::-webkit-scrollbar {
    display: none;
  }

  .rallye-stages-list > span {
    cursor: pointer;
    margin-right: 0.5em;
    padding: 0 0.5em;
    color: #ffffff;
    background-color: rgb(55, 65, 81);
    flex: 0 0 3em;
    display: flex;
    justify-content: center;
  }

  .rallye-stages-list > span.active-stage {
    background-color: rgb(229, 231, 235);
    color: initial;
  }

  .rallye-stages-list > span:not(.active-stage):hover {
    background-color: rgb(100, 113, 134);
  }

  .rallye-stage-times {
    height: 24em;
    overflow-y: auto;
  }

  .multi-row > p {
    margin: 0;
  }

  .multi-row.driver {
    min-width: 10em;
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

  .load-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 10em;
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 5em;
    height: 5em;
  }

  .loader {
    margin: 40px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 0.5em solid rgba(55, 65, 81, 0.2);
    border-right: 0.5em solid rgba(55, 65, 81, 0.2);
    border-bottom: 0.5em solid rgba(55, 65, 81, 0.2);
    border-left: 0.5em solid rgb(55, 65, 81);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  a {
    color: #2f7de1;
    text-decoration: underline;
  }

  a:hover {
    color: #98b6db;
  }
</style>
