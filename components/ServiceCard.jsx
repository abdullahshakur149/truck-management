import React from "react";

const ServiceCard = ({ icon, title, description, cta, href, id }) => (
  <section
    id={id}
    className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 transition hover:shadow-2xl"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-blue-700">{title}</h3>
    <p className="text-gray-600 mb-6 text-center">{description}</p>
    <a
      href={href}
      className="px-6 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition"
    >
      {cta}
    </a>
  </section>
);

export default ServiceCard;
