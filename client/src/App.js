import React from "react";

import { BrowserRouter } from "react-router-dom";

import Header from "./header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
