import React from 'react';
import logo from './assets/logo1.png';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

const DUMMY_NBA_GAMES_DATA = [
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900103","MATCHUP":"MIL @ ORL","GAME_SCORE":"2","GAME_TIER":"2"},
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900133","MATCHUP":"IND @ MIA","GAME_SCORE":"4","GAME_TIER":"1"},
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900173","MATCHUP":"HOU @ OKC","GAME_SCORE":"0","GAME_TIER":"3"},
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900143","MATCHUP":"LAL @ POR","GAME_SCORE":"1","GAME_TIER":"2"}
]

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
  let teamName1 = props.gameData.MATCHUP.slice(0,3)
  let teamName2 = props.gameData.MATCHUP.slice(-3)

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
      game => game.GAME_TIER == props.tier
    ).length == 0 ? "" : props.data.filter(
      game => game.GAME_TIER == props.tier
    ).map(game => 
      <>
        <SectionSubHeader subtitle={ props.subtitle }/>
        <GameBlock key={ game.GAME_ID } gameData={ game }/>
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

    fetch(`http://127.0.0.1:5000/gotd/api/games-ranked/${ this.formatDate(date) }`)
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
