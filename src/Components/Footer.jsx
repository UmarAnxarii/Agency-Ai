import React from 'react'
import { Link } from 'react-router-dom'
import Facebook from "../assets/facebook_icon.svg";
import Twitter from "../assets/twitter_icon.svg";
import Instagram from "../assets/instagram_icon.svg";
import Linkedin from "../assets/linkedin_icon.svg";

const Footer = () => {
  return (
    <footer className="bg-white py-14 px-4 sm:px-6 md:px-8 lg:px-10 border-t">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* left */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              AgencyAI
            </h2>

            <p className="text-slate-600 mb-6 max-w-md">
              We create innovative digital solutions that help businesses grow.
              From AI tools to modern web applications, we deliver excellence.
            </p>

            <ul className="flex flex-wrap gap-6 text-slate-600">
              <li>
                <Link to="/" className="hover:text-slate-900 cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-900 cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-slate-900 cursor-pointer">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-900 cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* right */}
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Subscribe to Newsletter
            </h3>

            <p className="text-slate-600 mb-6">
              Stay updated with our latest news and projects.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
              />

              <button className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* bottom */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-slate-500 text-sm">
            © 2026 AgencyAI. All rights reserved.
          </p>

          <div className="flex gap-4">
            <img className="w-5 h-5 cursor-pointer" src={Facebook} alt="Facebook" />
            <img className="w-5 h-5 cursor-pointer" src={Twitter} alt="Twitter" />
            <img className="w-5 h-5 cursor-pointer" src={Instagram} alt="Instagram" />
            <img className="w-5 h-5 cursor-pointer" src={Linkedin} alt="Linkedin" />
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer;