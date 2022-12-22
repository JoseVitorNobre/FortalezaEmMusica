import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MapPage from './pages/map/MapPage';
import ListMarkerData from './pages/markers/ListMarkerData';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MapPage />}/>
        <Route path="seeMarkers/:id" element={<ListMarkerData />}/>
      </Routes>
    </div>

  );
}

export default App;
