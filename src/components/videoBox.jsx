/* eslint-disable react/prop-types */

const VideoBox = ({ videoUrl, width, height }) => {
  return (
    <div>
      <video width={width} height={height} controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBox;
