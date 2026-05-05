import React from "react";
import social from "../assets/social_icon.svg";
import ads from "../assets/ads_icon.svg";
import content from "../assets/content_icon.svg";
const Services = () => {
  return (
    <div className="py-20 px-6 bg-gradient-to-b from-white to-gray-100">
      {/* Heading */}{" "}
      <div className="text-center mb-14">
        {" "}
        <h2 className="text-4xl font-bold mb-4"> How can we help? </h2>{" "}
        <p className="text-gray-600 max-w-2xl mx-auto">
          {" "}
          We provide professional digital marketing services to help your
          business grow faster, reach more customers and build a strong online
          presence.{" "}
        </p>{" "}
      </div>{" "}
      {/* Services */}{" "}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {" "}
        {/* Card 1 */}{" "}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition duration-300">
          {" "}
          <img src={social} alt="" className="w-16 h-16" />{" "}
          <div>
            {" "}
            <h3 className="text-xl font-semibold mb-2">
              {" "}
              Social Media Marketing{" "}
            </h3>{" "}
            <p className="text-gray-600">
              {" "}
              Grow your brand with powerful social media strategies and audience
              engagement.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Card 2 */}{" "}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition duration-300">
          {" "}
          <img src={ads} alt="" className="w-16 h-16" />{" "}
          <div>
            {" "}
            <h3 className="text-xl font-semibold mb-2">
              {" "}
              Paid Advertisement{" "}
            </h3>{" "}
            <p className="text-gray-600">
              {" "}
              Reach the right audience with optimized ad campaigns and better
              conversions.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Card 3 */}{" "}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition duration-300">
          {" "}
          <img src={content} alt="" className="w-16 h-16" />{" "}
          <div>
            {" "}
            <h3 className="text-xl font-semibold mb-2">
              {" "}
              Content Creation{" "}
            </h3>{" "}
            <p className="text-gray-600">
              {" "}
              High-quality content to engage your audience and build trust
              online.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Services;
