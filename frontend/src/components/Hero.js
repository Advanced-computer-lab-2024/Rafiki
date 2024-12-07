function Hero() {
  return (
    <div className="relative w-full h-[80vh]">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={require('../videos/vid.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content over the video */}
      <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center text-center text-white relative z-10">
        <h1 className="text-4xl font-bold">Wonder With Aim</h1>
        <p className="mt-4 text-lg">
          Explore activities, book tours, and plan your dream journey.
        </p>
        <div className="mt-6 space-x-4">
          <a
            href="/guestDashboard"
            className="px-8 py-3 bg-blue-500 rounded hover:bg-blue-700"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-8 py-3 bg-green-500 rounded hover:bg-green-700"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
