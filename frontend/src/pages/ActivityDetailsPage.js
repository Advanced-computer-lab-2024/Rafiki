import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the ID from the URL
import ActivityDetails from "../components/ActivityDetails";

const ActivityDetailsPage = () => {
  const { activityId } = useParams(); // Extracts the ID from the URL
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (activityId) {
      // Update the fetch URL to match your route structure
      fetch(`http://localhost:3000/api/activityRoute/${activityId}`) // Replace with your server's port
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => setActivity(data))
        .catch((error) => console.error("Failed to fetch data:", error));
    }
  }, [activityId]);

  return (
    <div>
      {activity ? (
        <ActivityDetails activity={activity} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ActivityDetailsPage;
