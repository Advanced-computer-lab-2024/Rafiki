function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2024 Rafiki. All rights reserved.</p>
        <ul className="flex space-x-4 mt-4 md:mt-0">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About Us</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
