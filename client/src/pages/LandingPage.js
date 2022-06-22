import React from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from '../assets/videos/background-video.mp4'

function LandingPage() {
  return (
    <main class="Landing-page full-screen-div">
    <video id="background-video"  src={backgroundVideo}  autoPlay loop muted  type="video/mp4">
    </video>
    <div class="overlay"></div>
    <div class="hero-content">
        <h1 class="hero-heading">SAVE AND VIEW YOUR FAVOURITE VIDEOS ONLINE</h1>
        <div class="auth-buttons">
            <Link to={'/login'}>
                <button class="login-button">Login</button>
            </Link>
            <Link to={'/signup'}>
                <button class="create-account-button">Create Account</button>
            </Link>
           
        </div>
    </div>
    </main>
  )
}

export default LandingPage