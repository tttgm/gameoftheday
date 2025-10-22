import React from 'react';
import moment from 'moment-timezone';
import logo from './assets/logo1.png';
// import backnextseason from './assets/back-next-season.png';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

function MainHeader() {
  return (
    <div className="main-header">
      <img src={logo} alt="Game of the Day logo"/>
      <p>your spoiler free guide to league pass</p>
    </div>
  )
}

// function BackNextSeason() {
//   return (
//     <div className="placeholder">
//       <img src={backnextseason} alt="Back next season"/>
//     </div>
//   )
// }

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
    props.data &&
      props.data.sort(
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
    props.data &&
      props.data.map(
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
      error: false,
      date: dateRange[dateRange.length - 1],
      // date: new Date('2020-09-03'),
      dateRange: dateRange,
    };
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
    // fetch(`http://127.0.0.1:8000/gotd/api/nba-games/2023-01-03`)
    fetch(`https://gameoftheday-api.fly.dev/gotd/api/nba-games/${ this.formatDate(date) }`)
      .then(res => res.json())
      .then(data => this.setState({ data: data, isLoading: false, error: false }))
      .catch(err => {
        this.setState({isLoading: false, error: true, data: []});
        console.log(err);
      });
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
          {this.state.isLoading ? 
            <>
              <img className='loader-image' style={{height: "40vh", width: "auto"}} src={require('./assets/bball-spin.gif')} alt="Loading"/>
              <p>Loading...</p>
            </> : 
            <>
              <TierBlock data={this.state.data.filter(game => game.game_tier === 1)} subtitle="Tier 1 - Must watch" />
              <TierBlock data={this.state.data.filter(game => game.game_tier === 2)} subtitle="Tier 2 - Worth a watch"  />
              <TierBlock data={this.state.data.filter(game => game.game_tier === 3)} subtitle="Tier 3 - Can probably skip" />
              <StatusBlock data={this.state.data.filter(game => game.game_tier === "N/A")} subtitle="Waiting on data" />
              <StatusBlock data={this.state.data.filter(game => game.game_tier === undefined)} subtitle="Hasn't started yet" />
              {/* <StatusBlock data={this.state.data.filter(game => game.status === "invalid-data")} subtitle="Oops! Couldn't figure it out" status="invalid-data" /> */}
            </>
          }
          { (!this.state.isLoading)&&(this.state.data.length===0)&&(!this.state.error) ? 
            <p>No games found</p> : '' }
          { (!this.state.isLoading)&&(this.state.error) ? 
            <p>Whoops! Something went wrong :(</p> : '' }
        </div>
        <div style={{fontSize: "smaller", clear: "both"}}>
          © 2025 (all rights reserved)
        </div>
      </div>
    )
  };
}

export default App;
