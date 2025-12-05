import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Feed.css";
import { Link } from "react-router-dom";
import { value_converter } from "../../data";

const Feed = ({ category, searchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (searchQuery && searchQuery.trim() !== "") {
        // Fetch search results
        url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(
          searchQuery
        )}&key=${import.meta.env.VITE_API_KEY}&type=video`;
        const res = await fetch(url);
        const result = await res.json();
        setData(result.items || []);
      } else {
        // Default: fetch most popular videos by category
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${
          import.meta.env.VITE_API_KEY
        }`;
        const res = await fetch(url);
        const result = await res.json();
        setData(result.items || []);
      }
    };
    fetchData();
  }, [category, searchQuery]);

  

  return (
    <>
      <div className="feed">
        
        {data.map((item, index) => {
          const videoId = item.id.videoId || item.id;
          const snippet = item.snippet;
          const statistics = item.statistics || {};
          return (
            <Link
              to={`/video/${snippet.categoryId || category}/${videoId}`}
              className="card"
              key={videoId + index}
            >
              <img src={snippet.thumbnails.medium.url} alt="" />
              <h2>{snippet.title}</h2>
              <h3>{snippet.channelTitle}</h3>
              <p>
                {statistics.viewCount
                  ? value_converter(statistics.viewCount) + " views &bull; "
                  : ""}
                {moment(snippet.publishedAt).fromNow()}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Feed;
