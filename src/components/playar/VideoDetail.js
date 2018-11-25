import React from 'react'

function VideoDetail({video}) {

   
    if (!video) {
        return <div>Loading...</div>;
    }

    const videoId = video.videoId;
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    // https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key={YOUR_API_KEY} 


    
    

    return (
        <div className="video-detail col-md-8">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={url} />
          </div>
          <div className="details">
            <div>{video.title}</div>
            <div>{video.description}</div>
          </div>
        </div>
    );

    
}

export default  VideoDetail

