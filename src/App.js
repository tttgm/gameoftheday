import React from 'react';
import logo from './assets/logo1.svg';
import chevrons from './assets/chevrons-down.svg';
import './App.css';

function SectionHeader(props) {
  return (
    <>
      <img src={chevrons} />
      <h2>{props.title}</h2>
    </>
  )
}

function SectionSubHeader(props) {
  return (
    <h4>{props.subtitle}</h4>
  )
}

function SingleDate() {
  return (
    <>
      <p>Mon</p>
      <p>19</p>
    </>
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
      <img src={logo} />
      <p>your spoiler free guide to on-demand sports</p>
      <DatePicker />
      <SectionHeader title="NBA" />
      <SectionSubHeader subtitle="Tier 1 - Must Watch" />
      <div></div>
      <SectionSubHeader subtitle="Tier 2 - Worth a Watch" />
    </div>
  );
}

export default App;
