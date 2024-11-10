import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the ID from the URL
import MuseumDetails from "../components/museumDetails";

const MuseumDetailsPage = () => {
  const { museumId } = useParams(); // Extracts the ID from the URL
  const [museum, setMuseums] = useState(null);

  useEffect(() => {
    if (museumId) {
      // Update the fetch URL to match your route structure
      fetch(`http://localhost:3000/api/museumRoute/${museumId}`) // Replace with your server's port
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => setMuseums(data))
        .catch((error) => console.error("Failed to fetch data:", error));
    }
  }, [museumId]);

  return (
    <div>
      {museum ? (
        <MuseumDetails museum={museum} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MuseumDetailsPage;
