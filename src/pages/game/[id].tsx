import React from "react";
import { useRouter } from "next/router";
import GamePage from "@/Components/gamePage/gamePage"

const Game = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <GamePage id={id}/>
  )
}

export default Game;