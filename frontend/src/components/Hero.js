function Hero() {
    return (
      <div className="bg-cover bg-center h-[80vh]" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold">Discover Your Next Adventure</h1>
          <p className="mt-4 text-lg">Explore activities, book tours, and plan your dream journey.</p>
          <a href="/signup-paths" className="mt-6 px-8 py-3 bg-blue-500 rounded hover:bg-blue-700">
            Get Started
          </a>
        </div>
      </div>
    );
  }
  
  export default Hero;
  