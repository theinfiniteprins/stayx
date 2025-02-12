import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
  useEffect(() => {
    const loadAd = () => {
      console.log("Attempting to load ad...");

      const adContainer = document.getElementById("ad-container");
      if (!adContainer) {
        console.warn("Ad container not found.");
        return;
      }

      adContainer.innerHTML = ""; // Clear previous ad

      // Create the ad script
      const scriptAd = document.createElement("script");
      scriptAd.type = "text/javascript";
      scriptAd.src = "//pl25851020.effectiveratecpm.com/df/36/43/df364305e53c503541681ef52398ec9e.js";
      scriptAd.async = true;
      scriptAd.onload = () => console.log("Ad script loaded successfully.");

      // Append script to ad container
      adContainer.appendChild(scriptAd);
    };

    setTimeout(loadAd, 1000); // Delay to ensure the container exists
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50">
      <Helmet>
        <title>StayX | Terms & Conditions</title>
        <meta
          name="description"
          content="Find your dream rental home on StayX. Explore verified listings, compare properties, and make your move easy."
        />
      </Helmet>

      <div className="bg-white p-8 shadow-2xl rounded-lg max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 border-b pb-4">
          Terms and Conditions
        </h1>
        <p className="text-xs text-gray-500 mb-8">Last updated: 13/10/2024</p>

        {/* Advertisement Section */}
        <div id="ad-container" style={{ textAlign: "center", margin: "20px 0" }}></div>

        <section className="mb-10">
          <p className="text-lg leading-relaxed text-gray-700">
            These terms govern your use of StayX. By accessing the platform, you
            agree to comply with these terms.
          </p>
        </section>

        <div className="space-y-8">
          <Accordion title="Account Registration">
            <p className="text-gray-700">
              You must register an account to upload properties and access other
              services. You are responsible for maintaining the confidentiality
              of your account details.
            </p>
          </Accordion>
          <Accordion title="User Conduct">
            <p className="text-gray-700">
              Users must comply with all applicable laws and may not use the
              platform for illegal purposes. Property listings should be
              accurate and not misleading.
            </p>
          </Accordion>
          <Accordion title="Content Ownership">
            <p className="text-gray-700">
              Users retain ownership of the content they upload. By uploading,
              you grant us a non-exclusive license to display, distribute, and
              use the content.
            </p>
          </Accordion>
          <Accordion title="Subscription and Payment">
            <p className="text-gray-700">
              Subscription fees are non-refundable. The terms for managing
              subscriptions and payment processing are set out in our
              Subscription Policy.
            </p>
          </Accordion>
          <Accordion title="Termination">
            <p className="text-gray-700">
              We may terminate or suspend your access for violations of these
              terms. Users may terminate their account at any time.
            </p>
          </Accordion>
          <Accordion title="Limitation of Liability">
            <p className="text-gray-700">
              StayX is not liable for any direct, indirect, incidental, or
              consequential damages arising from your use of the platform.
            </p>
          </Accordion>
          <Accordion title="Amendments">
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Continued
              use of the platform after modifications constitutes acceptance of
              the changes.
            </p>
          </Accordion>
          <Accordion title="Contact Us">
            <p className="text-gray-700">
              If you have any questions about these terms, please contact us via
              the contact page.
            </p>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

// Accordion Component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-lg font-medium text-gray-800 focus:outline-none flex justify-between items-center"
      >
        {title}
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="mt-4 text-gray-600">{children}</div>}
    </div>
  );
};

export default TermsAndConditions;
