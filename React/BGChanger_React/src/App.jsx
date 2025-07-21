import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("olive");

  return (
    <>
      <div
        className="w-screen h-screen duration-200"
        style={{ backgroundColor: color }}
      >
        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-black px-3 py-2 rounded-3xl">
            <button onClick={() => setColor("red")}
            className="outline-none px-4 py-1"
            style= {{backgroundColor: "red"}}>Red
            </button>
            <button onClick={() => setColor("blue")}
             className="outline-none px-4 py-1"
            style= {{backgroundColor: "blue"}}>Blue
            </button>
            <button onClick={() => setColor("green")}
            className="outline-none px-4 py-1"
            style= {{backgroundColor: "green"}}>Green
            </button>
            <button onClick={() => setColor("orange")}
            className="outline-none px-4 py-1"
            style= {{backgroundColor: "orange"}}>Orange
            </button>
            <button onClick={() => setColor("pink")}
             className="outline-none px-4 py-1"
            style= {{backgroundColor: "pink"}}>Pink
            </button>
            <button onClick={() => setColor("aqua")}
            className="outline-none px-4 py-1"
            style= {{backgroundColor: "aqua"}}>Aqua
            </button>
            <button onClick={() => setColor("purple")}
            className="outline-none px-4 py-1"
            style= {{backgroundColor: "purple"}}>Purple
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
