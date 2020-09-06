import React from 'react';
import logo from './assets/logo1.svg';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

function MainHeader() {
  return (
    <div>
      <img src={logo} />
      <p>your spoiler free guide to League Pass</p>
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
    <h4>{props.subtitle}</h4>
  )
}

function SingleDate() {
  return (
    <div className="single-date">
      <p>Mon</p>
      <p>19</p>
    </div>
  )
}

function DatePicker() {
  return (
    <div className="date-picker">
      <h3>January</h3>
      <SingleDate />
      <SingleDate />
      <SingleDate />
      <SingleDate />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <MainHeader />
      <DatePicker />
      <SectionHeader title="NBA" />
      <SectionSubHeader subtitle="Tier 1 - Must Watch" />
      <div></div>
      <SectionSubHeader subtitle="Tier 2 - Worth a Watch" />
    </div>
  );
}

export default App;
