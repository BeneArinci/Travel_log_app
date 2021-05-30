import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
    const [viewport, setViewport] = useState({
        width: 1200,
        height: 600,
        latitude: 51.5387,
        longitude: 0.0166,
        zoom: 8
      });
     
    
      return (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={nextViewport => setViewport(nextViewport)}
        />
      );
}

export default App;
