import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="flex justify-evenly flex-wrap gap-8 px-6">
        <div>
          <h2 className="text-2xl font-bold">Eventok</h2>
          <p className="mt-3 text-gray-400">
            Bringing people together through unforgettable experiences.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 text-center text-gray-400 pt-6">
        <p>&copy; {new Date().getFullYear()} Eventok. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
