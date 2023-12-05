// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import PhotoList from './PhotoList';
//
// function App() {
//   return (
//     <div className="App">
//         <PhotoList/>
//     </div>
//   );
// }
//
// export default App;
//
//


// src/App.tsx

import React from "react";
import PhotoList from "./PhotoList";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="text-3xl font-semibold mb-4">Photo Gallery</h1>
                <PhotoList />
            </header>
        </div>
    );
};

export default App;
