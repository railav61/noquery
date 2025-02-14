import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p className="text-sm">
              We are a leading query resolving platform offering a wide range of
              solutions to wide range of problems.
            </p>
          </div>
          {/* <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/grocery">Grocery</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
            </ul>
          </div> */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p className="text-sm">
              Migsun Wynn
              <br />
              Eta 2, Greater Noida 201310
              <br />
              <a href="tel:+919555967823">Phone: (+91) 95559 67823</a>
              <br />
              <a href="mailto:mritunjayrai102004@gmail.com">
                Email: mritunjayrai102004@gmail.com
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61554556457200"
                target="_blank"
                className="text-white hover:text-gray-400"
              >
                Facebook
              </a>
              <a
                href="https://x.com/rai_6161"
                target="_blank"
                className="text-white hover:text-gray-400"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com/rai_saheb_6161/"
                target="_blank"
                className="text-white hover:text-gray-400"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; 2023 Noquery. All rights reserved. <br />
          *It's a Beta Version
        </div>
      </div>
    </footer>
  );
}

export default Footer;
