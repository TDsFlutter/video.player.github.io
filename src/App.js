import React, { useState, useEffect } from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [layoutMode, setLayoutMode] = useState('bottom'); // 'right' or 'bottom'

  useEffect(() => {
    const stored = localStorage.getItem('videoMeta');
    if (stored) {
      setVideos(JSON.parse(stored));
    }
  }, []);

  const handleFolderChange = (e) => {
  let files = Array.from(e.target.files);

  // ✅ Sort by file name (or use .lastModified if needed)
  files.sort((a, b) => a.name.localeCompare(b.name));

  // ✅ Filter only video files using file extension (since .type may be missing)
  const videoExtensions = ['.mp4', '.mov', '.webm', '.mkv', '.avi'];
  files = files.filter(file =>
    videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
  );

  const urls = files.map(file => {
    const storedMeta = videos.find(v => v.name === file.name);
    return {
      url: URL.createObjectURL(file),
      name: file.name,
      lastTime: storedMeta?.lastTime || 0,
      subtitle: undefined
    };
  });

  console.log("Selected Videos", urls);

  setVideos(urls);
  localStorage.setItem('videoMeta', JSON.stringify(urls));
};


  const handleTimeUpdate = (videoName, time) => {
    const updated = videos.map(v =>
      v.name === videoName ? { ...v, lastTime: time } : v
    );
    setVideos(updated);
    localStorage.setItem('videoMeta', JSON.stringify(updated));
  };

  const handleSelect = (video) => {
    setSelectedVideo({ ...video }); // Ensure new reference for reload
  };

  const handleSkipNext = () => {
    if (!selectedVideo) return;
    const idx = videos.findIndex(v => v.name === selectedVideo.name);
    if (idx < videos.length - 1) {
      setSelectedVideo({ ...videos[idx + 1] });
    }
  };

  const handleSkipPrevious = () => {
    if (!selectedVideo) return;
    const idx = videos.findIndex(v => v.name === selectedVideo.name);
    if (idx > 0) {
      setSelectedVideo({ ...videos[idx - 1] });
    }
  };

  const layoutStyles = layoutMode === 'right'
    ? { display: 'flex', flexDirection: 'row' }
    : { display: 'flex', flexDirection: 'column' };

  return (
    <div style={{ padding: 0 }}>
      <div style={{ padding: 20 }}>


      <div style={layoutStyles}>
        <div style={{ flex: 3 }}>
          {selectedVideo && (
            <VideoPlayer
              video={selectedVideo}
              onTimeUpdate={handleTimeUpdate}
              onSkipNext={handleSkipNext}
              onSkipPrevious={handleSkipPrevious}
            />
          )}
        </div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '50px 20px' }}>
  <input
    type="file"
    webkitdirectory=""
    directory=""
    multiple
    onChange={handleFolderChange}
  />
  <div>
    <label>
      Layout Mode:&nbsp;
      <select value={layoutMode} onChange={(e) => setLayoutMode(e.target.value)}>
        <option value="bottom">Bottom List</option>
        <option value="right">Right List</option>
      </select>
    </label>
  </div>
</div>
      </div>

        <div style={{ flex: 1, padding: 20 }}>
          <VideoList videos={videos} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
};

export default App;