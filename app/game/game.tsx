"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { randomFromList, randomInt } from "../../utils/random";

interface City {
  city: string;
  state: string;
}

interface HighwayRecords extends City {
  numImages: number;
}

interface Question {
  city: City;
  imageId: string;
}

const highways: HighwayRecords[] = [
  { city: "Boston", state: "MA", numImages: 1 },
  { city: "Atlanta", state: "GA", numImages: 1 },
  { city: "San Francisco", state: "CA", numImages: 1 },
  { city: "Houston", state: "TX", numImages: 1 },
  { city: "Dallas", state: "TX", numImages: 1 },
  { city: "Cincinnati", state: "OH", numImages: 1 },
  { city: "Louisville", state: "KY", numImages: 1 },
];

const getRandomHighway = (): Question => {
  const city = randomFromList(highways);
  const id = randomInt(1, city.numImages);

  return { city: city as City, imageId: `${id}` };
};

// Get 3 wrong options
const getWrongOptions = (question: Question): City[] => {
  const options = [];
  for (const highwayRecord of highways) {
    if (
      highwayRecord.city == question.city.city &&
      highwayRecord.state == question.city.state
    ) {
    } else {
      options.push(highwayRecord);
      if (options.length == 3) {
        break;
      }
    }
  }
  return options;
};

const useGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(null!);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  // Questions done already
  const [done, setDone] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  const [roundEnd, setRoundEnded] = useState(false);

  const nextRound = () => {
    // Reset
    setSelectedCity(null);
    setRoundEnded(false);

    let newQuestion = getRandomHighway();
    setCurrentQuestion(newQuestion);

    console.log("left");

    setDone([...done, newQuestion]);
  };

  const selectAnswer = (option: City) => {
    setSelectedCity(option);
  };

  const submitAnswer = () => {
    if (selectedCity === currentQuestion.city) {
      setScore(score + 1);
    }
    setRoundEnded(true);
    // Set rounded ended to false in a few seconds, and go to next round
    setTimeout(() => nextRound(), 1000);
  };

  return {
    roundNum: done.length + 1,
    currentQuestion,
    nextRound,
    selectAnswer,
    selectedCity,
    submitAnswer,
    score,
    roundEnd,
  };
};

export const Game = () => {
  const {
    roundNum,
    currentQuestion,
    nextRound,
    selectAnswer,
    selectedCity,
    submitAnswer,
    score,
    roundEnd,
  } = useGame();

  useEffect(() => {
    if (!currentQuestion) nextRound();
  }, []);

  if (!currentQuestion) return <></>;

  const cityState = `${currentQuestion.city.city
    .toLowerCase()
    .replaceAll(" ", "-")}-${currentQuestion.city.state.toLowerCase()}`;
  const image = `/highways/${cityState}/${currentQuestion?.imageId}.png`;
  const wrongOptions = getWrongOptions(currentQuestion);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="font-bold">Round {roundNum}</div>
        <div>Score {score}</div>
      </div>

      <p>Where is this interchange located?</p>

      <div className="rounded-md overflow-hidden">
        <img src={image} />
      </div>

      <ul className="list-disc list-inside">
        {[...wrongOptions, currentQuestion.city].map((option) => (
          <li key={option.city + option.state}>
            <button
              className={clsx({
                "font-bold": selectedCity === option,
                "text-green-600": roundEnd && option == currentQuestion.city,
                "text-red-500":
                  roundEnd &&
                  option == selectedCity &&
                  selectedCity != currentQuestion.city,
              })}
              onClick={() => selectAnswer(option)}
            >
              {option.city}, {option.state}
            </button>
          </li>
        ))}
      </ul>

      <button className="underline" onClick={submitAnswer}>
        Submit
      </button>
    </div>
  );
};
