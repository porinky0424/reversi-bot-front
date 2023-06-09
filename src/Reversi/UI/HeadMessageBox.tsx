import React, { useMemo } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, IconButton, Typography } from "@mui/material";
import { GameState, Result } from "../types";
import { GAME_STATE } from "../constants";
import { COLOR, WinPrediction } from "../../pkg/reversi_bot";

function HeadMessageBox({
  winPrediction,
  gameState,
  setGameState,
  result,
  playerColor,
}: {
  winPrediction: WinPrediction;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  result: Result | null;
  playerColor: COLOR | null;
}) {
  if (gameState === GAME_STATE.SHOW_RESULT && !result) {
    throw new Error("result is null");
  }

  if (
    ![
      GAME_STATE.CHECK,
      GAME_STATE.PASS,
      GAME_STATE.WAIT_FOR_PLAYER,
      GAME_STATE.THINK,
      GAME_STATE.REVERSE_ANIMATION,
      GAME_STATE.SHOW_RESULT,
    ].includes(gameState)
  ) {
    return null;
  }

  return useMemo(
    () => (
      <Box
        sx={{
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "60px",
          backgroundColor: "#fff",
          border: "2px solid blue",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {gameState === GAME_STATE.PASS && (
          <>
            <Typography
              variant="h1"
              sx={{
                fontSize: "2rem",
                fontWeight: "600",
                marginLeft: "2rem",
                "@media screen and (max-width: 600px)": {
                  fontSize: "1.5rem",
                  marginLeft: "1rem",
                },
              }}
            >
              PASS!
            </Typography>
            <IconButton onClick={() => setGameState(GAME_STATE.CHECK)}>
              <NavigateNextIcon
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
            </IconButton>
          </>
        )}
        {gameState === GAME_STATE.WAIT_FOR_PLAYER && (
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "600",
              marginLeft: "2rem",
              "@media screen and (max-width: 600px)": {
                fontSize: "1.5rem",
                marginLeft: "1rem",
              },
            }}
          >
            YOUR TURN!{" "}
            {winPrediction === WinPrediction.LOSE
              ? "YOU WILL WIN!"
              : winPrediction === WinPrediction.WIN
              ? "YOU WILL LOSE..."
              : winPrediction === WinPrediction.DRAW
              ? "WILL BE DRAW."
              : ""}
          </Typography>
        )}
        {gameState === GAME_STATE.THINK && (
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "600",
              marginLeft: "2rem",
              "@media screen and (max-width: 600px)": {
                fontSize: "1.5rem",
                marginLeft: "1rem",
              },
            }}
          >
            NOW THINKING...
          </Typography>
        )}
        {gameState === GAME_STATE.SHOW_RESULT && result && (
          <>
            <Typography
              variant="h1"
              sx={{
                fontSize: "2rem",
                fontWeight: "600",
                marginLeft: "2rem",
                "@media screen and (max-width: 600px)": {
                  fontSize: "1.5rem",
                  marginLeft: "1rem",
                },
              }}
            >
              GAME SET!{" "}
              {result.winner === "draw"
                ? "DRAW."
                : result.winner === playerColor
                ? "YOU WIN!"
                : "YOU LOSE..."}{" "}
              (BLACK: {result.black}, WHITE: {result.white})
            </Typography>
            <IconButton onClick={() => setGameState(GAME_STATE.CHOOSE_COLOR)}>
              <ReplayIcon
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
            </IconButton>
          </>
        )}
      </Box>
    ),
    [gameState, setGameState, result, playerColor]
  );
}

export default HeadMessageBox;
