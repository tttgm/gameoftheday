import React from 'react';
import logo from './assets/logo1.png';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

function MainHeader() {
  return (
    <div className="main-header">
      <img src={logo} />
      <p>your spoiler free guide to league pass</p>
    </div>
  )
}

function SectionHeader(props) {
  return (
    <div className="section-header">
      <img src={chevrons} />
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
      <img src={require('./assets/nba-logos/' + props.teamLogo + '.gif')} />
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

function App() {
  return (
    <div className="App">
      <MainHeader />
      <DatePicker />

      <SectionHeader title="NBA" />
      <SectionSubHeader  subtitle="Tier 1 - Must Watch" />
      <GameBlock 
        teamName1="Miluakee Bucks"
        teamLogo1="bucks"
        teamName2="Boston Celtics"
        teamLogo2="celtics"
      />
      <SectionSubHeader subtitle="Tier 2 - Worth a Watch" />
      <GameBlock 
        teamName1="Atlanta Hawks"
        teamLogo1="hawks"
        teamName2="Phoenix Suns"
        teamLogo2="suns"
      />
      <GameBlock 
        teamName1="Oklahoma City Thunder"
        teamLogo1="thunder"
        teamName2="Denver Nuggets"
        teamLogo2="nuggets"
      />
    </div>
  );
}

export default App;
