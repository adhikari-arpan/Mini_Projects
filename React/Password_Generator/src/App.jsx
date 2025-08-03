import { useState, useCallback, useEffect, useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

   const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*/?><";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-xl mx-auto rounded-xl shadow-2xl px-6 py-8 my-10 bg-gray-800 text-orange-400">
        <h2 className="text-white text-4xl font-extrabold text-center mb-8">Password Generator</h2>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Your Secure Password"
            readOnly
            ref = {passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="bg-blue-600 text-white px-6 py-3 text-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 ease-in-out">Copy</button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-base sm:text-lg gap-4 sm:gap-x-8">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer h-2 w-28 sm:w-36 accent-blue-500"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white font-medium whitespace-nowrap">Length : <span className="font-bold text-orange-400">{length}</span></label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numbers}
              id="numberInput"
              className="cursor-pointer w-5 h-5 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white font-medium">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numbers}
              id="characterInput"
              className="cursor-pointer w-5 h-5 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-white font-medium">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;