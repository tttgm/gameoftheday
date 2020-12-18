import React from 'react';
import logo from './assets/logo1.png';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

const DUMMY_NBA_GAMES_DATA = [
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900103","MATCHUP":"MIL @ ORL","GAME_SCORE":"2","GAME_TIER":"2"},
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900133","MATCHUP":"IND @ MIA","GAME_SCORE":"4","GAME_TIER":"1"},
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900173","MATCHUP":"HOU @ OKC","GAME_SCORE":"0","GAME_TIER":"3"},
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900143","MATCHUP":"LAL @ POR","GAME_SCORE":"1","GAME_TIER":"2"}
]

const TEAM_NAME_ABBREV = {
  "ATLANTA_HAWKS": "ATL",
  "BROOKLYN_NETS": "BKN",
  "BOSTON_CELTICS": "BOS",
  "CHARLOTTE_HORNETS": "CHA",
  "CHICAGO_BULLS": "CHI",
  "CLEVELAND_CAVALIERS": "CLE",
  "DALLAS_MAVERICKS": "DAL",
  "DENVER_NUGGETS": "DEN",
  "DETROIT_PISTONS": "DET",
  "GOLDEN_STATE_WARRIORS": "GSW",
  "HOUSTON_ROCKETS": "HOU",
  "INDIANA_PACERS": "IND",
  "LOS_ANGELES_CLIPPERS": "LAC",
  "LOS_ANGELES_LAKERS": "LAL",
  "MEMPHIS_GRIZZLIES": "MEM",
  "MIAMI_HEAT": "MIA",
  "MILWAUKEE_BUCKS": "MIL",
  "MINNESOTA_TIMBERWOLVES": "MIN",
  "NEW_ORLEANS_PELICANS": "NOR",
  "NEW_YORK_KNICKS": "NYK",
  "OKLAHOMA_CITY_THUNDER": "OKC",
  "ORLANDO_MAGIC": "ORL",
  "PHILADELPHIA_76ERS": "PHI",
  "PHOENIX_SUNS": "PHX",
  "PORTLAND_TRAIL_BLAZERS": "POR",
  "SACRAMENTO_KINGS": "SAC",
  "SAN_ANTONIO_SPURS": "SAS",
  "TORONTO_RAPTORS": "TOR",
  "UTAH_JAZZ": "UTA",
  "WASHINGTON_WIZARDS": "WAS"
}

function MainHeader() {
  return (
    <div className="main-header">
      <img src={logo} alt="Game of the Day logo"/>
      <p>your spoiler free guide to league pass</p>
    </div>
  )
}

function SectionHeader(props) {
  return (
    <div className="section-header">
      <img src={chevrons} alt="Arrows"/>
      <h2>{props.title}</h2>
    </div>
  )
}

function SectionSubHeader(props) {
  return (
    <div className="section-sub-header" >
      <h3>{props.subtitle}</h3>
    </div>
  )
}

function SingleDate(props) {
  return (
    <button className={props.isSelected ? "selected-date" : "single-date"} onClick={props.onClick}>
      <p>{props.day}</p>
      <p>{props.date}</p>
    </button>
  )
}

function DatePicker(props) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const weekdays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]

  return (
    <div className="date-picker">
      <h3 id="date-picker-title">{ months[props.dateRange[0].getMonth()] }</h3>
      <div className="date-items">
        {props.dateRange.map(
          d =>
          <SingleDate 
            key={d.getTime()}
            day={weekdays[d.getDay()]} 
            date={d.getDate()} 
            isSelected={d === props.dateSelected ? true : false}
            onClick={() => props.onClick(d)}
          />
        )}
      </div>
    </div>
  )
}

function TeamBlock(props) {
  return (
    <div className="team-block">
      <img src={require('./assets/nba-logos/' + props.teamLogo + '.gif')} alt="Team Logo"/>
      <p>{props.teamName}</p>
    </div>
  )
}

function GameBlock(props) {
  let teamName1 = TEAM_NAME_ABBREV[props.gameData.away_team]
  let teamName2 = TEAM_NAME_ABBREV[props.gameData.home_team]

  return (
    <div className="game-block">
      <TeamBlock teamName={teamName1} teamLogo={teamName1} />
      <p class="game-at-sign">at</p>
      <TeamBlock teamName={teamName2} teamLogo={teamName2} />
    </div>
  )
}

function TierBlock(props) {
  return (
    props.data.filter(
      game => game.game_tier == props.tier
    ).length == 0 ? "" : props.data.filter(
      game => game.game_tier == props.tier
    ).map(game => 
      <>
        <SectionSubHeader subtitle={ props.subtitle }/>
        <GameBlock key={ game.home_team } gameData={ game }/>
      </>
    )
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // Create array of last 5 days
    let dateRange = [];
    var i = 0;
    for (i; i<5; i++) {
      var date = new Date(new Date().setDate(new Date().getDate() - i));
      dateRange.push(date);
    };
    // reverse the array to sort the dates in ascending order
    dateRange.reverse();

    this.state = {
      data: [],
      // data: DUMMY_NBA_GAMES_DATA,
      isLoading: false,
      date: dateRange[dateRange.length - 1],
      // date: new Date('2020-09-03'),
      dateRange: dateRange,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  formatDate(dateObj) {
    let [dd, mm, yyyy] = dateObj.toLocaleDateString(
      'en-AU', 
      { timeZone: 'America/New_York' }
    ).split('/');
    return `${yyyy}-${mm}-${dd}`
  }

  fetchDaysGames(date) {
    // set initial state
    this.setState({ isLoading: true });

    fetch(`http://127.0.0.1:5000/gotd/api/nba-games/${ this.formatDate(date) }`)
      .then(res => res.json())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchDaysGames(this.state.date);
  }

  componentDidUpdate() {
    console.log('component did update');
  }

  handleClick(d) {
    this.setState({date: d});
    this.fetchDaysGames(d);
  }

  render() {
    return (
      <div className="App">
        <MainHeader />
        <DatePicker 
          dateRange={this.state.dateRange}
          dateSelected={this.state.date}
          onClick={this.handleClick}
        />

        <SectionHeader title="NBA" />
        <div>
          {this.state.isLoading ? "Loading..." : 
            <>
              <TierBlock data={this.state.data} subtitle="Tier 1 - Must watch" tier="1" />
              <TierBlock data={this.state.data} subtitle="Tier 2 - Worth a watch" tier="2" />
              <TierBlock data={this.state.data} subtitle="Tier 3 - Can probably skip" tier="3" />
            </>
          }
          { (!this.state.isLoading)&&(this.state.data.length===0) ? 'No games found' : '' }
        </div>
      </div>
    )
  };
}

export default App;
