import React from "react";
import Image from "next/image";
import dashboardImg from "../../public/image/job-post-banner/dashboard-banner.png";

const JobBanner = () => {
  return (
    <section className="w-full bg-white py-10 md:py-16 flex justify-center px-4 md:px-16">
      {/* ── DESKTOP layout ── */}
      <div
        className="hidden md:block relative w-full max-w-[1300px] overflow-hidden"
        style={{
          clipPath: "polygon(6% 0, 100% 0, 100% 80%, 96% 100%, 0 100%, 0 15%)",
          borderRadius: "12px",
          minHeight: "360px",
        }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-indigo-600 z-0" />

        <div className="relative z-10 flex flex-row items-center h-full">
          {/* Left Content */}
          <div className="flex-1 px-20 py-16">
            <h2 className="text-[48px] font-black text-white leading-[1.1] mb-6 max-w-sm">
              Start posting jobs today
            </h2>
            <p className="text-indigo-200 text-lg mb-8">
              Start posting jobs for only $10.
            </p>
            <button className="bg-white text-indigo-600 font-bold text-base px-8 py-4 rounded-md shadow-md hover:bg-indigo-50 transition-all duration-200">
              Sign Up For Free
            </button>
          </div>

          {/* Right Dashboard Image */}
          <div className="flex-1 flex justify-end items-end self-end">
            <Image
              src={dashboardImg}
              alt="dashboard preview"
              width={750}
              height={500}
              className="relative right-[30px] bottom-0 drop-shadow-2xl w-[95%] h-auto"
              priority
            />
          </div>
        </div>

        {/* Bottom Right Cut Shape */}
        <div
          className="absolute bottom-0 right-0 w-28 h-28 bg-indigo-800 opacity-70"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
      </div>

      {/* ── MOBILE layout ── */}
      <div className="flex md:hidden flex-col w-full overflow-hidden rounded-2xl">
        {/* Top blue section — text + button */}
        <div className="bg-indigo-600 px-8 pt-12 pb-10 text-center">
          <h2 className="text-[2rem] font-black text-white leading-[1.15] mb-4">
            Start posting jobs today
          </h2>
          <p className="text-indigo-200 text-base mb-7">
            Start posting jobs for only $10.
          </p>
          <button className="w-full bg-white text-indigo-600 font-bold text-base py-4 rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-200">
            Sign Up For Free
          </button>
        </div>

        {/* Bottom white section — dashboard image */}
        <div className="bg-white px-4 pt-4 pb-2 flex justify-center items-start">
          <Image
            src={dashboardImg}
            alt="dashboard preview"
            width={600}
            height={400}
            className="w-full h-auto object-contain drop-shadow-lg rounded-lg"
            priority
          />
        </div>

        {/* Bottom-right dark cut */}
        <div className="bg-indigo-600 h-14 relative overflow-hidden">
          <div
            className="absolute bottom-0 right-0 w-20 h-14 bg-indigo-800"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default JobBanner;
