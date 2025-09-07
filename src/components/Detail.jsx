import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Get anime detail
    axios.get(`https://anime-qww3.onrender.com/api/v1/anime/${id}/`)
      .then(res => setAnime(res.data))
      .catch(err => console.error(err));

    // Get logged in username
    const user = localStorage.getItem("username");
    setUsername(user);
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming token is stored after login
      await axios.delete(`https://anime-qww3.onrender.com/api/v1/anime/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert("Deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  if (!anime) return <p className="text-center mt-10 text-black">Loading...</p>;

  const isOwner = username === anime.username;

  return (
    <div className="p-4 text-white min-h-screen bg-white/80 flex justify-center items-start overflow-hidden">
      <div className="w-full max-w-4xl p-3 relative top-20">
        <div className="bg-white shadow-lg w-full p-4 flex flex-col rounded-2xl">
          <img
            className="rounded-2xl w-full h-auto max-h-[500px] object-cover object-center"
            src={anime.photos}
            alt={anime.title}
          />

          <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
            <h1 className="text-2xl text-black font-bold break-words">{anime.title}</h1>
            <h2 className="text-black text-lg truncate">{anime.username}</h2>
          </div>

          <div className="text-black mt-2 break-words">
            {anime.description}
          </div>

          <p className="text-black mt-4 text-sm">
            {formatDistanceToNow(new Date(anime.created_at), {
              addSuffix: true,
            })}
          </p>

          
        </div>
      </div>
    </div>
  );
};

export default Detail;
