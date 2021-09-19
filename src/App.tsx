import React from "react";
import "./App.css";

import Header from "./pages/header";
import Conway from "./pages/conway";
import Bottom from "./pages/bottom";

function App() {
  return (
    <div className="App">
      <Header />
      <Conway />
      <Bottom />
    </div>
  );
}

export default App;
