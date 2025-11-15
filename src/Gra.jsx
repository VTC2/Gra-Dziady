import Left from "./Left.jsx";
import Right from "./Right.jsx";
import './App.css';
import story from './assets/tekst.js'
import { useState } from "react";
import { SceneContext  } from "./SceneContext"

export default function Gra() {

    const [scene, setScene] = useState("prolog");
    const [triggers,setTriggers]=useState({duch:0,rew:0})
  
  function playScene(nextScene,effect){
    if (effect){
      setTriggers((prev) =>effect(prev));
    }
    setScene(nextScene);

  }
  return (
    <div className="gra">
    <SceneContext.Provider value={{scene, triggers,playScene}}>
      <Left/>
      <Right />
      </SceneContext.Provider>
    </div>
  );
}

