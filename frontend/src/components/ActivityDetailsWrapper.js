import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetails from './ActivityDetails';

const ActivityDetailsWrapper = () => {
  const { id } = useParams(); // Get the activity ID from the URL
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetch(`/api/activities/${id}`) // Fetch activity based on ID from the URL
      .then(response => response.json())
      .then(data => setActivity(data))
      .catch(error => console.error("Error fetching activity:", error));
  }, [id]);

  if (!activity) return <p>Loading...</p>; // Show loading state until activity data is available

  return <ActivityDetails activity={activity} />;
};

export default ActivityDetailsWrapper;
