import React from 'react';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';

// styles

const ReviewsVideo = ({ video_reviews }: { video_reviews: any }) => {
  return (
    <div className="reviews-wrapper flex gap-2.5 md:gap-3.5 lg:gap-5">
      {video_reviews.video_urls.map((item: any, index: number) => (
        <div key={index} className="reviews-slide flex-[0_0_320px] rounded-xl overflow-hidden">
          <MediaPlayer className="size-full" src={item.video_url} poster={item.poster} aspectRatio="16 / 9">
            <MediaProvider>
              <Poster src={item.poster} alt="Video Review" />
            </MediaProvider>
            <PlyrLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={plyrLayoutIcons} />
          </MediaPlayer>
        </div>
      ))}
    </div>
  );
};

export default ReviewsVideo;
