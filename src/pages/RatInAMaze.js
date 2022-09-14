import { useEffect, useState } from "react";

function RatInAMaze() {
  const initialMaze = [
    [" ", " ", " ", " ", "🪨"],
    ["🪨", " ", " ", " ", "🪨"],
    [" ", "🪨", " ", "🪨", " "],
    [" ", " ", " ", " ", " "],
    ["🪨", " ", " ", "🪨", "🚪"],
  ];
  const [maze, setMaze] = useState(initialMaze);

  let k = 1;

  const rim = (vis, r, c) => {
    if (
      r >= 0 &&
      c >= 0 &&
      r < maze.length &&
      c < maze[0]?.length &&
      !vis[r][c]
    ) {
      vis[r][c] = true;
      k++;
      setTimeout(() => {
        let currentMaze = JSON.parse(JSON.stringify(initialMaze));
        if (currentMaze[r][c] !== "🪨") {
          currentMaze[r][c] = "🐀";
          setMaze(currentMaze);
        }
      }, k * 1000);
      if (maze[r][c] !== " ") {
        return maze[r][c] === "🚪";
      }
      return (
        rim(vis, r - 1, c) ||
        rim(vis, r, c + 1) ||
        rim(vis, r + 1, c) ||
        rim(vis, r, c - 1)
      );
    }
    return false;
  };

  useEffect(() => {
    const vis = [];
    maze.map((row) => {
      const visrow = [];
      row.map(() => visrow.push(false));
      vis.push(visrow);
    });

    rim(vis, 0, 0);
  }, []);

  return (
    <div className="rat-in-maze">
      {maze.map((row, key) => (
        <div key={key} className="rat-in-maze__row">
          {row.map((cell, key) => (
            <span key={key} className="rat-in-maze__cell">
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RatInAMaze;
