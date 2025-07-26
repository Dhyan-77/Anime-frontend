import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const Main = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get("https://anime-qww3.onrender.com/api/v1/all/");
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  return (
    <div className="flex h-full w-full bg-white/80 overflow-auto p-5">
      
      <div className="grid gap-5 px-2 sm:px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full justify-items-center relative top-20">
        {post.map((post) => (
         <Link to = {`detail/${post.id}`}> <div
            className="bg-white/80 shadow-lg p-4 rounded-xl h-[290px] w-full sm:w-[300px] md:w-[350px] flex flex-col"
            key={post.id}
          >
            <img
              className="w-full h-48 object-cover rounded-md"
              src={`https://anime-qww3.onrender.com${post.photos}`}
              alt="img"
            />
            <h1 className="font-semibold mt-2 line-clamp-2">{post.title}</h1>
            <div className="flex justify-between text-sm text-gray-600 mt-auto">
              <p>{post.username}</p>
              <p>
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
};

export default Main;
