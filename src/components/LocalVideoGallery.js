import React, { useState } from 'react';

function LocalVideoGallery() {
  const [videoURLs, setVideoURLs] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideoURLs(urls);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Local Videos</h2>
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={handleFileChange}
      />

      <div style={{ marginTop: '20px' }}>
        {videoURLs.map((video, index) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h4>{video.name}</h4>
            <video width="640" controls>
              <source src={video.url} />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocalVideoGallery;
