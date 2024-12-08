import React from 'react';
import Image from "../pics/pic6.jpg"; // Import the image

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Your one-stop solution for discovering, exploring, and planning unforgettable adventures.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <img
            src="/path-to-your-mission-image.jpg"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We aim to connect travelers, tourists, and explorers with trusted tour guides, curated
              activities, and engaging experiences worldwide. Our platform empowers users to
              discover new places, learn about cultures, and create lasting memories.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src={Image} // Use the imported image here
                alt="Team Member 1"
                className="w-40 h-40 mx-auto rounded-full shadow-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Jota</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="/path-to-team-member-2.jpg"
                alt="Team Member 2"
                className="w-40 h-40 mx-auto rounded-full shadow-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Chief Marketing Officer</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="/path-to-team-member-3.jpg"
                alt="Team Member 3"
                className="w-40 h-40 mx-auto rounded-full shadow-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Mike Johnson</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-800 text-white py-10 px-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Want to Know More?</h2>
          <p className="mb-6">
            Feel free to reach out to us for more information, partnerships, or feedback.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-500 px-6 py-3 rounded text-white font-semibold hover:bg-blue-600"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
