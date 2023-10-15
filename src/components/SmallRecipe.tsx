import React, { useEffect, useState } from "react";
import fs from "fs";

interface SmallRecipeProps {
  key: string;
  content: string;
  setSpotlightId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

type RecipeData = Record<
  string,
  {
    ingredients: string[];
    instructions: string;
    picture_link: string;
  }
>;

const SmallRecipe: React.FC<SmallRecipeProps> = ({
  key,
  content,
  setSpotlightId,
}) => {
  const [data, setData] = useState<RecipeData | undefined>();

  useEffect(() => {
    async function getData() {
      const response = await fetch("/util/recipe_to_ingredients.json");
      const tempData: unknown = await response.json();
      setData(tempData as RecipeData);
    }
    void getData();
  }, []);

  if (data === undefined) return <div></div>;

  // Assuming 'data' contains the JSON data
  return (
    <div className="flex h-[10%] w-full items-center justify-center">
      <button onClick={() => setSpotlightId(Number(key))}>
        <h1>{data[content]?.picture_link}</h1>
      </button>
    </div>
  );
};

export default SmallRecipe;
