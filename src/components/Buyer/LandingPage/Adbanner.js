import React, { useEffect, useState } from 'react';
import './Adbanner.css'; // Ensure the CSS file exists

const AdBanner = () => {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/buyer/video'); // Replace with your actual API endpoint
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
            {videoUrl ? (
                <video src={videoUrl} autoPlay loop muted playsInline className="ad-video" />
            ) : (
                <p>Loading...</p> // Optional: Show a loading message or spinner
            )}
        </div>
    );
};

export default AdBanner;
