import React from 'react';
import logo from './assets/logo1.png';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

// Datetime library
import moment from 'moment';

// Date picker from react-dates (ref: https://github.com/airbnb/react-dates)
// import 'react-dates/initialize';
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

const DUMMY_NBA_GAMES_DATA = [
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900103","MATCHUP":"MIL @ ORL"},
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900133","MATCHUP":"IND @ MIA"},
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900173","MATCHUP":"HOU @ OKC"},
  {"GAME_DATE":"2020-08-22","GAME_ID":"0041900143","MATCHUP":"LAL @ POR"}
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
    <div className="single-date">
        <p>{props.day}</p>
        <p>{props.date}</p>
    </div>
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

  return (
    <div className="date-picker">
      <h3 id="date-picker-title">{ months[props.dateRange[0].getMonth()] }</h3>
      <div className="date-items">
        {props.dateRange.reverse().map(
          d =>
          <SingleDate day={d.toDateString().split(' ')[0]} date={d.toDateString().split(' ')[2]} />
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
      <p>at</p>
      <TeamBlock teamName={teamName2} teamLogo={teamName2} />
    </div>
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

    this.state = {
      // data: [],
      data: DUMMY_NBA_GAMES_DATA,
      isLoading: false,
      date: dateRange[0],
      dateRange: dateRange,
    };
  }

  // componentDidMount() {
  //   // set initial state
  //   this.setState({ isLoading: true });

  //   fetch(`http://127.0.0.1:5000/gotd/api/nba-games/${ this.state.date }`)
  //     .then(res => res.json())
  //     .then(data => this.setState({ data: data, isLoading: false }))
  //     .catch(err => console.log(err));
  // }

  componentDidUpdate() {
    console.log('running');
    // this.fetchDaysGames();
  }

  render() {
    const { todaysGames } = this.state.data;

    return (
      <div className="App">
        <MainHeader />
        <DatePicker dateRange={this.state.dateRange} />

      <h3>Selected: { this.state.date ? this.state.date.toDateString() : ''}</h3>

      <SectionHeader title="NBA" />
      <div>
        {this.state.isLoading ? "Loading..." :  this.state.data.map(
          game =>
            <GameBlock 
              key={ game.GAME_ID }
              gameData={ game }
            />
        )}
      </div>
    </div>
  )};
}

export default App;
