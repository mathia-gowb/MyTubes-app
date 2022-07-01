import React from 'react'
import backgroundVideo from '../assets/videos/background-video.mp4';
const axios = require('axios').default;
axios.defaults.withCredentials = true
function Videos() {
  return (
    <main id="main-content-wrapper">
    <section className="currently-playing">
        <div id="now-playing">
            <div className="video-player">
                <video src={backgroundVideo} >
                  
                </video>
                <div className="media-control"> 
                    <div className="video-progress">
                        <div></div>
                    </div>
                    <div id="playback-buttons">
                        <div className="play-pause">
                            <i className="fa-solid fa-circle-play fa-2x"></i>
                            {/* <i className="fa-solid fa-circle-pause fa-2x"></i> */}
                        </div>
                        <div className="volume-control">
                            <i className="fa-solid fa-volume-high "></i>
                            {/* <i className="fa-solid fa-volume-low "></i> */}
                            {/* <i className="fa-solid fa-volume-xmark "></i> */}
                            <input type="range" name="volume" id="volume"/>
                        </div>
                    </div>
                </div>

            </div>
            <h1 className="video-name">10 Reasons why trailer</h1>
            <p className="upload-time">Uploaded 300 days ago</p>
        </div>
    </section> 

    <section className="videos-list-wrapper">
        <div className="videos-list">
            <h2>Your videos</h2>
            <br/>
            <div className="videos">
                <div className="video-wrapper">
                    <div className="video">
                        <video  src={backgroundVideo} mute loop></video>
                        <button className="video-timeframe">15:20</button>
                    </div>
                    <div className="video-details">
                        <h3 className="video-name">How to eat food that doesn't smell bad</h3>
                        <p className="upload-time">10 days ago</p>
                    </div>
                </div>
                <div className="video-wrapper">
                    <div className="video">
                        <video  src={backgroundVideo} mute loop></video>
                        <button className="video-timeframe">15:20</button>
                    </div>
                    <div className="video-details">
                        <h3 className="video-name">How to eat food that doesn't smell bad</h3>
                        <p className="upload-time">10 days ago</p>
                    </div>
                </div>
                <div className="video-wrapper">
                    <div className="video">
                        <video  src={backgroundVideo} mute loop></video>
                        <button className="video-timeframe">15:20</button>
                    </div>
                    <div className="video-details">
                        <h3 className="video-name">How to eat food that doesn't smell bad</h3>
                        <p className="upload-time">10 days ago</p>
                    </div>
                </div>
                <div className="video-wrapper">
                    <div className="video">
                        <video  src={backgroundVideo} mute loop></video>
                        <button className="video-timeframe">15:20</button>
                    </div>
                    <div className="video-details">
                        <h3 className="video-name">How to eat food that doesn't smell bad</h3>
                        <p className="upload-time">10 days ago</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="file-uploader">
            <i className="fa-solid fa-angle-down"></i>
            <div className="video preview video">
                <video  src={backgroundVideo} mute loop></video>
                <button className="video-timeframe">15:20</button>
            </div>
            {/* <input type="file" name="video" id="upload-video"/> */}
            <input type="text" name = "video-name" placeholder="Video Title"/>
            <button id="save-button"><i className="fa-solid fa-cloud-arrow-up"></i> Save to cloud</button>
        </div>
        <div className="upload-button-wrapper">
            <input type="file" name="video-uploader" id="video-uploader"/>
            <button className="upload-button"><i className="fa-solid fa-upload"></i> upload videos</button>
        </div>

    </section>
</main>
  )
}

export default Videos