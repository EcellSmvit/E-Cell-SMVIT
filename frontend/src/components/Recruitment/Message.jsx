import React from "react";
import { Link } from "react-router-dom";

function Message() {
  const messages = [
    { text: "For Recruitment", link: "/recruitment", label: "Click Here" },
    { text: "We are Hiring!", link: "/recruitment", label: "Apply Now" },
    { text: "Join Our Team", link: "/recruitment", label: "Explore Careers" },
  ];

  const renderItems = () =>
    messages.map((msg, index) => (
      <span key={index} className="flex gap-2 items-center px-4">
        {msg.text}{" "}
        <Link
          to={msg.link}
          className="underline transition hover:text-gray-200"
        >
          {msg.label}
        </Link>
      </span>
    ));

  return (
    <div className="w-screen h-10 bg-[#6D4DFE] overflow-hidden flex items-center">
      <div className="flex relative w-full h-full">
        {/* First track */}
        <div className="flex items-center h-full text-white whitespace-nowrap animate-marquee">
          {renderItems()}
          {renderItems()} {/* duplicate inside the same track */}
        </div>

        {/* Second track (follows the first) */}
        <div className="flex absolute top-0 items-center h-full text-white whitespace-nowrap animate-marquee2">
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    </div>
  );
}

export default Message;
