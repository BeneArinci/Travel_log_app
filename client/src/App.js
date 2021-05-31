import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API'

const App = () => {
    const [logEntries, setLogEntries] = useState([]);

    const [showPopup, setShowPopup] = useState({});

    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 51.5387,
        longitude: 0.0166,
        zoom: 6
    });

    const getLogs = async () =>{
        const logEntries = await listLogEntries()
        setLogEntries(logEntries)
    }
    
    useEffect(()=> {
        getLogs()
    }, [])

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/benearinci/ckpco19f575pn18rxsgliqagr'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            
        >
            {
                logEntries.map((entry) => {
                    return (
                        <>
                            <Marker 
                                key = {entry._id}
                                latitude={entry.latitude}
                                longitude={entry.longitude} 
                                offsetLeft={-24} 
                                offsetTop={-12}
                                onClick = { () => setShowPopup({
                                    ...showPopup,
                                    [entry._id]: true,
                                })}>
                                    <svg 
                                        className='marker' 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        fill="none" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        style={{
                                            width: `24px`,
                                            height: `24px`,
                                        }}>
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                            </Marker>
                            {
                                showPopup[entry._id] ? (
                                    <Popup
                                    className='popup'
                                    latitude={entry.latitude}
                                    longitude={entry.longitude} 
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={()=>{
                                        setShowPopup({
                                            ...showPopup,
                                            [entry._id]: false
                                        })
                                    }}
                                    offsetLeft={-12} 
                                    offsetTop={12}
                                    anchor="bottom" >
                                    <div>
                                        <h3>{entry.title}</h3>
                                        <p>{entry.comments}</p>
                                        <p>rating {entry.rating}</p>
                                        <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()} </small>
                                    </div>
                                </Popup> 
                                ) : null
                            }
                           

                        </>
                       
                    )
                })
            }
         
        </ReactMapGL>
      );
}

export default App;
