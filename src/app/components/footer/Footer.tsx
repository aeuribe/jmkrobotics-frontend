import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-[500px] py-20 bg-[#1A2330]">
      <div className="h-[300px] grid grid-cols-4 gap-10">
        {/* Logo */}
        <div className=" flex flex-col gap-4 items-start text-left mx-auto">
          <Image
            src="/JMKRobotics.png"
            alt="Icon"
            width={120}
            height={55}
            className="object-contain pt-5"
            priority
          />
        </div>

        {/* Products */}
        <div className="flex flex-col gap-4 items-start text-left mx-auto">
          <h3 className="text-white font-bold font-main">Products</h3>
          <Link className="text-[#6E7784] text-xs" href="/">
            Capping Machine
          </Link>
          <Link className="text-[#6E7784] text-xs" href="/">
            Sealing Machine
          </Link>
          <Link className="text-[#6E7784] text-xs" href="/">
            Filling Machine
          </Link>
          <Link className="text-[#6E7784] text-xs" href="/">
            Labeling Machine
          </Link>
          <Link className="text-[#6E7784] text-xs" href="/">
            Wrapping Machine
          </Link>
          <Link className="text-[#6E7784] text-xs" href="/">
            Metal Detector
          </Link>
        </div>

        {/* Solutions */}
        <div className=" flex flex-col gap-4 items-start text-left mx-auto">
          <h3 className="text-white font-bold font-main">Solutions</h3>
          <Link
            className="block w-full text-[#6E7784] text-xs text-left"
            href="/"
          >
            Packaging
          </Link>
          <Link
            className="block w-full text-[#6E7784] text-xs text-left"
            href="/"
          >
            Manufacturing
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4 items-start text-left mx-auto">
          <h3 className="text-white font-bold font-main">Support</h3>
          <Link
            className="block w-full text-[#6E7784] text-xs text-left"
            href="/"
          >
            Find a Dealer
          </Link>
          <Link
            className="block w-full text-[#6E7784] text-xs text-left"
            href="/"
          >
            FAQs
          </Link>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="w-[1280px] mx-auto border-t-2 border-[#2B3441] h-20 flex items-center justify-center">
        <p className="text-[#6E7784] font-main text-xs">© 2025 JMK Robotics. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
