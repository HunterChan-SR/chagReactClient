import React from 'react';
import './App.css';

import CLayout from "./clayout/CLayout";
import SubMenu from "antd/lib/menu/SubMenu";
import SubCodeModal from "./views/subviews/SubCodeModal";

function App() {
  return (
      <div >
        <CLayout></CLayout>
      </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
