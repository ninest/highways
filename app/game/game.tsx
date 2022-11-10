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

  const nextRound = () => {
    // Reset
    setSelectedCity(null);

    if (currentQuestion) setDone([...done, currentQuestion]);
    setCurrentQuestion(getRandomHighway());
  };

  const selectAnswer = (option: City) => {
    setSelectedCity(option);
  };

  const submitAnswer = () => {
    if (selectedCity === currentQuestion.city) {
      setScore(score + 1);
    }
    nextRound();
  };

  return {
    roundNum: done.length + 1,
    currentQuestion,
    nextRound,
    selectAnswer,
    selectedCity,
    submitAnswer,
    score,
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
        <div>{score}</div>
      </div>

      <p>Where is this interchange located?</p>

      <div className="rounded-md overflow-hidden">
        <img src={image} />
      </div>

      <ul className="list-disc list-inside">
        {[...wrongOptions, currentQuestion.city].map((option) => (
          <li>
            <button
              className={clsx({
                "font-bold": selectedCity === option,
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
