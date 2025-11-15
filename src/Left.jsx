import { useContext } from "react";
import { SceneContext } from "./SceneContext";
import { useState } from "react";
import story from "./assets/tekst.js";
export default function Left() {
  const { scene, triggers } = useContext(SceneContext);
  const sceneData = story[scene];

  const text =
    typeof sceneData.text === "function"
      ? sceneData.text(triggers)
      : sceneData.text;

  return (
    <div className="left">
      {text.map((line, index) => (
        <p key={index}> {line}</p>
      ))}
    </div>
  );
}
/*
  const [index, setIndex] = useState(0);
function nastepny() {
    if (index < scene.length - 1) {
      setIndex(index + 1);
    }
  }
  function poprzedni() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  return (
    <div className="left">
      <div className="text-lg mb-4">{scene[index]}</div>
      <button
        onClick={nastepny}
        className="px-4 py-2 rounded-2xl shadow bg-gray-200"
      >
        Następny
      </button>
       <button
        onClick={poprzedni}
        className="px-4 py-2 rounded-2xl shadow bg-gray-200"
      >
        poprzedni
      </button>
      
    </div>
  );*/
