import React, {useState, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";
// import { publicEncrypt } from "crypto";

function App() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [ballOn, setBallOn] = useState(20);
  const [quarter,setQuarter] = useState(1); 
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(10);
  

  const homeTeamName = "Lions";
  const awayTeamName = "Tigers";
  const homePos = `${homeTeamName} 0`;
  const awayPos = `${awayTeamName} 0`;
  

  const [hasBall, setHasBall] = useState(homeTeamName);

  // useEffect(() => {
  // }, [hasBall, ballOn, quarter, down, toGo, timer, awayScore, homeScore]);

  const decreaseTimer = e => {
    if(timer >0) setTimer(timer-1);
    else {
      setTimer(10);
      nextQuarter();
    }
  }
  const touchdownHome = e => {
    setHomeScore(homeScore+7);
    decreaseTimer();
  }
  const fieldGoalHome = e => {
    setHomeScore(homeScore+3);
    decreaseTimer();
  }
  const touchdownAway = e => {
    setAwayScore(awayScore+7);
    decreaseTimer();
  }
  const fieldGoalAway = e => {
    setAwayScore(awayScore+3);
    decreaseTimer();
  }
  const resetGame = e => {
    setAwayScore(0);
    setHomeScore(0);
    setDown(1);
    setQuarter(1);
    setBallOn(20);
    setToGo(10);
    setTimer(10);
  }

  const kickOff = e => {
    changePossession();
    setDown(1);
    setBallOn(20);
    setToGo(10);
  }

  const changePossession = (amount) => {
    firstDown();
    let num = 0;
    if(amount) num=amount
    setBallOn(100-num-ballOn);
    if(hasBall===homeTeamName) {
      setHasBall(awayTeamName);
      alert(`${awayTeamName} now have the ball.`);
    } 
    else {
      setHasBall(homeTeamName);
      alert(`${homeTeamName} now have the ball.`);
    }
    
  }
  
  const fieldGoal = e => {
    alert('Field Goal is Good!');
    if(hasBall===homeTeamName) setHomeScore(homeScore+3);
    else setAwayScore(awayScore+3);
    kickOff();
  }

  const touchdown = e => {
    if(hasBall===homeTeamName) {
      setHomeScore(homeScore+7);
      alert(`Touchdown ${homeTeamName}!`);
    }
    else {
      setAwayScore(awayScore+7);
      alert(`Touchdown ${awayTeamName}!`);
    }
    kickOff();
  }

  const touchback = e => {
    alert('Touch Back!');
    if(hasBall===homeTeamName) setAwayScore(awayScore+2);
    else setHomeScore(homeScore+2);
    kickOff();
  }

  const punt = e => {
    alert('Punt');
    const num = ballOn+(Math.floor(Math.random()*21)+15);
    changePossession(num);
  }

  const moveBall = e => {
    e.preventDefault();
    if(down===4 && ballOn > 69) fieldGoal();
    else if(down===4 && toGo>3) punt();
    else{
      let num = 0;
      const amount = prompt('How many yards were gained or lost? (use negative for lost yardage)');
      if (!isNaN(amount)) num = parseInt(amount);  
      setBallOn(ballOn + num);
      if(ballOn+num >99) touchdown();
      else if(ballOn+num <1) touchback();
      else{
        if( toGo-num <1 ) firstDown();
        else {
          setToGo(toGo - num);
          nextDown();
        }
      }
    }
    decreaseTimer();
  }

  const firstDown = e => {
    setDown(1);
    setToGo(10);
  }

  const nextDown = e => {
    if(down===4) {
      setDown(1);
      changePossession();
    }
    else setDown(down+1);
  }

  const nextQuarter = e => {
    if(quarter===4) gameEnd();
    else {
      if (quarter===2) kickOff();
      setQuarter(quarter+1);
      setTimer(10);
    }
  }

  const gameEnd = e => {
    if(homeScore>awayScore) alert(`The ${homeTeamName} win!`);
    else if (awayScore > homeScore) alert(`The ${awayTeamName} win!`);
    else alert(`The Game is over.  It's a tie!`);
    resetGame()
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">{hasBall=== homeTeamName ? homePos : homeTeamName}</h2>
            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{timer}</div>
          <div className="away">
            <h2 className="away__name">{hasBall=== awayTeamName ? awayPos : awayTeamName}</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow 
          ballOn={ ballOn } 
          down={ down } 
          quarter={ quarter } 
          toGo={ toGo } 
        />
      </section>
      <section className="buttons">
        {/* <div className="homeButtons">
          <button className="homeButtons__touchdown" onClick = {touchdownHome}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={fieldGoalHome}>Home Field Goal</button>
        </div> */}
        <div className="other-buttons">
          <button className="moveBall" onClick={moveBall}>Move Ball</button> 
          <button className="resetButton" onClick={resetGame}>Reset Game</button> 
        </div>
        {/* <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={touchdownAway}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={fieldGoalAway}>Away Field Goal</button>
        </div> */}
      </section>
    </div>
  );
}

export default App;
