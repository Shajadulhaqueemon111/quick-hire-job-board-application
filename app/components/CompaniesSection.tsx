import React from "react";
import Image from "next/image";
import logo1 from "../../public/image/companisImage/vodafone-logo.png";
import logo2 from "../../public/image/companisImage/intel.png";
import logo3 from "../../public/image/companisImage/tesla.png";
import logo4 from "../../public/image/companisImage/amd-logo.png";
import logo5 from "../../public/image/companisImage/talkit.png";

const companislogo = [
  { src: logo1, alt: "Vodafone" },
  { src: logo2, alt: "Intel" },
  { src: logo3, alt: "Tesla" },
  { src: logo4, alt: "AMD" },
  { src: logo5, alt: "Talkit" },
];

const CompaniesSection = () => {
  return (
    <section className="w-full bg-white px-8 md:px-16 py-8 md:py-10 border-t border-b border-gray-100">
      {/* Label */}
      <p className="text-gray-400 text-sm mb-6 md:mb-8">
        Companies we helped grow
      </p>

      {/* ── DESKTOP: single row ── */}
      <div className="hidden md:flex items-center justify-between gap-8">
        {companislogo.map((logo, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={154}
              height={40}
              className="w-[154px] h-[40px] object-contain grayscale opacity-30"
            />
          </div>
        ))}
      </div>

      {/* ── MOBILE: 2-column grid ── */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:hidden">
        {companislogo.map((logo, index) => (
          <div key={index} className="flex items-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={154}
              height={40}
              className="w-[120px] h-[32px] object-contain grayscale opacity-30"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompaniesSection;
