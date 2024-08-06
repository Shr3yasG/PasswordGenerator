import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // hooks
  const [length, setlength] = useState(0);
  const [numallowed, setnunmallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallowed) str += "0123456789";
    if (charallowed) str += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numallowed, charallowed, setpassword]);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Copied");
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numallowed, charallowed, passGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800">
        <h1 className=" text-white text-center my-3">PASSWORD GENERATOR</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={12}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>lenght:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numallowed}
              id="numInput"
              onChange={() => {
                setnunmallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charInput"
              onChange={() => {
                setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
