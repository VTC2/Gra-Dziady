import { useContext, useEffect } from "react";
import { SceneContext } from "./SceneContext";
import story from "./assets/tekst.js";
export default function Right() {
  const { scene, triggers, playScene } = useContext(SceneContext);

  const choices =
    story[scene].choices?.filter(
      (choice) => !choice.condition || choice.condition(gameState)
    ) || [];

  const image = story[scene].img ? (
  <img src={story[scene].img} alt="scene image" className="mb-4 rounded shadow" />
) : null;

  if (choices.length > 0) {
    return (
      <div className="right">
        {choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => playScene(choice.next, choice.effect)}
            className="px-4 py-2 mb-2 rounded bg-gray-200 shadow"
          >
            {choice.label}
          </button>
        ))}
        {image}
      </div>
    );
  } else
    return (
      <div className="right">
        <button
          onClick={() => playScene(story[scene].next)}
          className="px-4 py-2 mb-2 rounded bg-gray-200 shadow"
        >
          Dalej
        </button>
        {image}
      </div>
    );
}
