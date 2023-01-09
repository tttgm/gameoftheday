import React from 'react';
import moment from 'moment-timezone';
import logo from './assets/logo1.png';
import backnextseason from './assets/back-next-season.png';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

const DUMMY_NBA_GAMES_DATA = [
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900103","MATCHUP":"MIL @ ORL","GAME_SCORE":"2","GAME_TIER":"2"},
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900133","MATCHUP":"IND @ MIA","GAME_SCORE":"4","GAME_TIER":"1"},
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900173","MATCHUP":"HOU @ OKC","GAME_SCORE":"0","GAME_TIER":"3"},
  {"GAME_DATE":"2020-12-16","GAME_ID":"0041900143","MATCHUP":"LAL @ POR","GAME_SCORE":"1","GAME_TIER":"2"}
]

const DUMMY_DATA_FASTAPI = [
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200580",
  "game_status_id": 3,
  "home_team_id": 1610612754,
  "visitor_team_id": 1610612757,
  "live_period": 4,
  "home_team": "IND",
  "visitor_team": "POR",
  "game_score": 8,
  "game_tier": 1
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200581",
  "game_status_id": 3,
  "home_team_id": 1610612755,
  "visitor_team_id": 1610612741,
  "live_period": 4,
  "home_team": "PHI",
  "visitor_team": "CHI",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200582",
  "game_status_id": 3,
  "home_team_id": 1610612761,
  "visitor_team_id": 1610612752,
  "live_period": 4,
  "home_team": "TOR",
  "visitor_team": "NYK",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200586",
  "game_status_id": 3,
  "home_team_id": 1610612740,
  "visitor_team_id": 1610612751,
  "live_period": 4,
  "home_team": "NOP",
  "visitor_team": "BKN",
  "game_score": 9,
  "game_tier": 1
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200583",
  "game_status_id": 3,
  "home_team_id": 1610612749,
  "visitor_team_id": 1610612766,
  "live_period": 4,
  "home_team": "MIL",
  "visitor_team": "CHA",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200584",
  "game_status_id": 3,
  "home_team_id": 1610612760,
  "visitor_team_id": 1610612764,
  "live_period": 4,
  "home_team": "OKC",
  "visitor_team": "WAS",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200585",
  "game_status_id": 3,
  "home_team_id": 1610612759,
  "visitor_team_id": 1610612765,
  "live_period": 4,
  "home_team": "SAS",
  "visitor_team": "DET",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200587",
  "game_status_id": 3,
  "home_team_id": 1610612750,
  "visitor_team_id": 1610612746,
  "live_period": 4,
  "home_team": "MIN",
  "visitor_team": "LAC",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200588",
  "game_status_id": 3,
  "home_team_id": 1610612743,
  "visitor_team_id": 1610612739,
  "live_period": 4,
  "home_team": "DEN",
  "visitor_team": "CLE",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200589",
  "game_status_id": 3,
  "home_team_id": 1610612756,
  "visitor_team_id": 1610612748,
  "live_period": 4,
  "home_team": "PHX",
  "visitor_team": "MIA",
  "game_score": 0,
  "game_tier": 3
  },
  {
  "game_date_est": "2023-01-06T00:00:00",
  "game_id": "0022200590",
  "game_status_id": 3,
  "home_team_id": 1610612747,
  "visitor_team_id": 1610612737,
  "live_period": 4,
  "home_team": "LAL",
  "visitor_team": "ATL",
  "game_score": 0,
  "game_tier": 3
  }
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

function BackNextSeason() {
  return (
    <div className="placeholder">
      <img src={backnextseason} alt="Back next season"/>
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
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]

  return (
    <div className="date-picker">
      <h3 id="date-picker-title">{ months[props.dateRange[4].month()] }</h3>
      <div className="date-items">
        {props.dateRange.map(
          d =>
          <SingleDate 
            key={d}
            day={weekdays[d.day()]} 
            date={d.date()} 
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
      {props.teamLogo && <img src={require('./assets/nba-logos/' + props.teamLogo + '.gif')} alt="Team Logo"/>}
      <p>{props.teamName}</p>
    </div>
  )
}

function GameBlock(props) {
  let teamName1 = props.gameData.visitor_team
  let teamName2 = props.gameData.home_team

  return (
    <div className="game-block">
      <TeamBlock teamName={teamName1} teamLogo={teamName1} />
      <p className="game-at-sign">at</p>
      <TeamBlock teamName={teamName2} teamLogo={teamName2} />
    </div>
  )
}

function TierBlock(props) {
  return (
    props.data.filter(
      game => game.game_tier === props.tier
    ).length === 0 ? "" : props.data.sort(
      (a,b) => (a.game_score < b.game_score) ? 1 : -1
    ).map((game, idx) => 
      <>
        <SectionSubHeader subtitle={ idx===0 ? props.subtitle : ""}/>
        <GameBlock key={ game.home_team } gameData={ game }/>
      </>
    )
  )
}

function StatusBlock(props) {
  return (
    props.data.filter(
      game => game.status === props.status
    ).length === 0 ? "" : props.data.map(
      (game, idx) => 
      <>
        <SectionSubHeader subtitle={ idx===0 ? props.subtitle : ""}/>
        <GameBlock key={ game.home_team } gameData={ game }/>
      </>
    )
  )
}

class App extends React.Component {
  
  constructor(props) {
    super(props)
    // Create array of last 5 days
    let dateRange = [];
    var i = 0;
    for (i; i<5; i++) {
      var date = new Date(new Date().setDate(new Date().getDate() - i));
      var date_ny = moment(date).tz('America/New_York')
      dateRange.push(date_ny);
    };
    // reverse the array to sort the dates in ascending order
    dateRange.reverse();
    // console.log(dateRange);

    this.state = {
      data: [],
      // data: DUMMY_DATA_FASTAPI,
      isLoading: false,
      date: dateRange[dateRange.length - 1],
      // date: new Date('2020-09-03'),
      dateRange: dateRange,
    };
    console.log(this.state.data);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  formatDate(dateObj) {
    return dateObj.format('YYYY-MM-DD');
  }

  fetchDaysGames(date) {
    // set initial state
    this.setState({ isLoading: true });
    
    // fetch(`http://127.0.0.1:8000/gotd/api/nba-games/${ this.formatDate(date) }`)
    // fetch(`http://127.0.0.1:8000/gotd/api/nba-games/2023-01-02`)
    fetch(`https://gameoftheday-api.fly.dev/gotd/api/nba-games/${ this.formatDate(date) }`)
      .then(res => res.json())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchDaysGames(this.state.date);
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
              <TierBlock data={this.state.data.filter(game => game.game_tier === 1)} subtitle="Tier 1 - Must watch" tier={1} />
              <TierBlock data={this.state.data.filter(game => game.game_tier === 2)} subtitle="Tier 2 - Worth a watch" tier={2}  />
              <TierBlock data={this.state.data.filter(game => game.game_tier === 3)} subtitle="Tier 3 - Can probably skip" tier={3} />
              <StatusBlock data={this.state.data.filter(game => game.status === "na")} subtitle="Waiting on game data" status="na" />
              <StatusBlock data={this.state.data.filter(game => game.status === "invalid-data")} subtitle="Oops! Couldn't figure it out" status="invalid-data" />
            </>
          }
          { (!this.state.isLoading)&&(this.state.data.length===0) ? 'No games found' : '' }
        </div>
      </div>
    )
  };
}

export default App;
