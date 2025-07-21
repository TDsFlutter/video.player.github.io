import React from 'react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
};

const VideoList = ({ videos, onSelect }) => {
  return (
    <div>
      <h2>Video Files</h2>
      {videos.map((video, i) => (
        <div
          key={i}
          onClick={() => onSelect(video)}
          style={{
            cursor: 'pointer',
            marginBottom: 15,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 8,
          }}
        >
          <strong>{video.name}</strong>
          <div style={{ fontSize: 12, color: '#555' }}>
            Last Played: {video.lastTime ? formatTime(video.lastTime) : 'Not played'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
