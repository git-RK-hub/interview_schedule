import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Interview from "./container/Interview";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Interview />
      <Footer />
    </div>
  );
};

export default App;
