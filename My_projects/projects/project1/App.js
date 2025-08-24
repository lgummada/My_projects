import React from "react";
import Quiz from "./Quiz";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-6">React Quiz</h1>
      </div>
      <Quiz />
    </div>
  );
}

export default App;

