//TODO: STEP 1 - Import the useState hook.
import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [timer, setTimer] = useState(25);
  
  let homeTeamName = "Lions";
  let awayTeamName = "Tigers";
  const touchdownHome = e => {
    setHomeScore(homeScore+7);
  }
  const fieldGoalHome = e => {
    setHomeScore(homeScore+3);
  }
  const touchdownAway = e => {
    setAwayScore(awayScore+7);
  }
  const fieldGoalAway = e => {
    setAwayScore(awayScore+3);
  }
  const resetGame = e => {
    setAwayScore(0);
    setHomeScore(0);
    setTimer(25);
  }
  const firstDown = e => {
    setDown(1);
    setToGo(10);

  }
  const moveBall = e => {
    setBallOn(Math.floor(Math.random()*100))
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">{homeTeamName}</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{timer}</div>
          <div className="away">
            <h2 className="away__name">{awayTeamName}</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}

          <button className="homeButtons__touchdown" onClick = {touchdownHome}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={fieldGoalHome}>Home Field Goal</button>
        </div>
        <div className="other-buttons">
          <button className="resetButton" onClick={resetGame}>Reset Game</button> 
          <button className="firstDown" onClick={firstDown}>First Down</button> 
          <button className="moveBall" onClick={moveBall}>Move Ball</button> 
          <button className="setQuarter" onClick={setQuarter}>Change Quarter</button> 
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={touchdownAway}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={fieldGoalAway}>Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
