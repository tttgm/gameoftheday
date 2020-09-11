import React from 'react';
import logo from './assets/logo1.png';
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
  return (
    <div className="game-block">
      <TeamBlock teamName={props.teamName1} teamLogo={props.teamLogo1} />
      <p>at</p>
      <TeamBlock teamName={props.teamName2} teamLogo={props.teamLogo2} />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    // Get today's date
    var today = new Date();
    var dd = String(today.getUTCDate() - 1).padStart(2, '0'); // Need to fix to get US timezone
    var mm = String(today.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getUTCFullYear();
    let todayFormatted = yyyy + '-' + mm + '-' + dd;
    console.log(todayFormatted);

    fetch(`http://127.0.0.1:5000/gotd/api/nba-games/${todayFormatted}`)
      .then(res => res.json())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(err => console.log(err));
  }

  render() {
    const { todaysGames } = this.state.data;

    return (
    <div className="App">
      <MainHeader />
      {/* <DatePicker /> */}

      <SectionHeader title="NBA" />
      <div>
        {this.state.isLoading ? "Loading..." :  this.state.data.map(
          game =>
            <GameBlock 
              teamName1={game.MATCHUP.slice(0, 3)}
              teamLogo1={game.MATCHUP.slice(0, 3)}
              teamName2={game.MATCHUP.slice(-3)}
              teamLogo2={game.MATCHUP.slice(-3)}
            />
        )}
      </div>
      
      {/* <SectionSubHeader  subtitle="Tier 1 - Must Watch" />
      <GameBlock 
        teamName1="Miluakee Bucks"
        teamLogo1="MIL"
        teamName2="Boston Celtics"
        teamLogo2="BOS"
      />
      <SectionSubHeader subtitle="Tier 2 - Worth a Watch" />
      <GameBlock 
        teamName1="Atlanta Hawks"
        teamLogo1="ATL"
        teamName2="Phoenix Suns"
        teamLogo2="PHX"
      />
      <GameBlock 
        teamName1="Oklahoma City Thunder"
        teamLogo1="OKC"
        teamName2="Denver Nuggets"
        teamLogo2="DEN"
      /> */}
    </div>
  )};
}

export default App;
