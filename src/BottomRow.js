import React, {useState, useEffect} from "react";
import "./App.css";


  
function BottomRow() {
  const [quarter,setQuarter] = useState(1); 
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(10);
  const [ballOn, setBallOn] = useState(20);
  
  const firstDown = e => {
    setDown(1);
    setToGo(10);
  }
  const moveBall = e => {
    setBallOn(Math.floor(Math.random()*100)+1);
  }
  const nextQuarter = e => {
    if (quarter == 4) setQuarter(0);
    setQuarter(quarter+1);
  }

  useEffect(() => {
    firstDown();
  }, [down, toGo]);
  useEffect(() => {
    moveBall();
  }, [ballOn]);
  // useEffect(() => {
  //   nextQuarter();
  // }, [quarter]);
  
  
  return (
    <div className="bottomRow">
      <div className="down">
        <h3 className="down__title">Down</h3>
        <div className="down__value">{down}</div>
      </div>
      <div className="toGo">
        <h3 className="toGo__title">To Go</h3>
        <div className="toGo__value">{toGo}</div>
      </div>
      <div className="ballOn">
        <h3 className="ballOn__title">Ball on</h3>
        <div className="ballOn__value">{ballOn}</div>
      </div>
      <div className="quarter">
        <h3 className="quarter__title">Quarter</h3>
        <div className="quarter__value">{quarter}</div>
      </div>
    </div>
  );
};

export default BottomRow;
