import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import './Adbanner.css'; // Create a CSS file for this banner if needed

const AdBanner = () => {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch('http://localhost:5000/buyer/video'); // Replace with your actual API endpoint
                const data = await response.json();
                setVideoUrl(data[0]?.url); // Assuming the backend returns an array of video objects
            } catch (error) {
                console.error('Error fetching the ad video:', error);
            }
        };

        fetchVideo();
    }, []);

    return (
        <div className="ad-banner">
            {videoUrl && (
                <video 
                    src={videoUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="auto"  // Preload video without displaying a loading spinner
                    className="ad-video" 
                />
            )}
        </div>
    );
};

export default AdBanner;
