import React from 'react';
import logo from './assets/logo1.png';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

// Date picker from react-dates (ref: https://github.com/airbnb/react-dates)
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


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

function DatePicker() {
  return (
    <div className="date-picker">
      <h3 id="date-picker-title">January</h3>
      <div className="date-items">
        <SingleDate day="Mon" date={19} />
        <SingleDate day="Tue" date={20} />
        <SingleDate day="Wed" date={21} />
        <SingleDate day="Thu" date={22} />
        <SingleDate day="Fri" date={23} />
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

    this.state = {
      data: [],
      isLoading: false,
      date: moment().subtract(1, 'days'), // initialize with the previous days date
    };
  }

  fetchDaysGames() {
    var dateSelected = this.state.date.format("YYYY-MM-DD");
    // console.log(dateSelected);
    
    fetch(`http://127.0.0.1:5000/gotd/api/nba-games/${ dateSelected }`)
      .then(res => res.json())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    // set initial state
    this.setState({ isLoading: true });

    fetch(`http://127.0.0.1:5000/gotd/api/nba-games/${ this.state.date }`)
      .then(res => res.json())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    console.log('running');
    this.fetchDaysGames();
  }

  render() {
    const { todaysGames } = this.state.data;
    const defaultDateProps = {
      small: true,
      numberOfMonths: 1,
      keepOpenOnDateSelect: false,
      isOutsideRange: () => false,
    }

    return (
      <div className="App">
        <MainHeader />
        {/* <DatePicker /> */}
        <SingleDatePicker
          id="date-picker"
          {...defaultDateProps}
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => this.setState({ date })}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
        />

      <h3>Date: { this.state.date ? this.state.date.format("YYYY-MM-DD") : ''}</h3>

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
