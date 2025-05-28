import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import { useRef } from 'react';

const AboutPlayer = () => {
  return (
    <div className="relative video-container">
      <MediaPlayer
        src="youtube/_cMxraX_5RE"
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        playsInline
        poster="https://files.vidstack.io/sprite-fight/poster.webp"
      >
        <MediaProvider>
          <Poster className="vds-poster" />
        </MediaProvider>

        <DefaultVideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
};

export default AboutPlayer;
