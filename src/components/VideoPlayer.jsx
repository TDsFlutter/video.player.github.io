import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ video, onTimeUpdate, onSkipNext, onSkipPrevious }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && video?.lastTime) {
      videoRef.current.currentTime = video.lastTime;
    }
    if (videoRef.current && video?.url) {
      videoRef.current.load();
    }
  }, [video]);

  const seek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#000' }}>
      <video
        ref={videoRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        controls
        onTimeUpdate={(e) => {
          const current = e.target.currentTime;
          onTimeUpdate(video.name, current);
        }}
      >
        <source src={video.url} />
        {video.subtitle && <track src={video.subtitle} kind="subtitles" label="English" default />}
        Your browser does not support the video tag.
      </video>

      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <button onClick={onSkipPrevious}>⏮ Prev</button>
        <button onClick={() => seek(-10)}>⏪ -10s</button>
        <button onClick={() => seek(10)}>⏩ +10s</button>
        <button onClick={onSkipNext}>⏭ Next</button>
      </div>
    </div>
  );
};

export default VideoPlayer;