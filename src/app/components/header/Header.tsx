import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-20 mx-20 ">
      <div className="flex-1">
        <p className="font-jakarta text-white font-bold text-lg">
          <span className="font-bold text-[#E4173C]">JMK</span> ROBOTICS
        </p>
      </div>
      <div className="flex-1 items-center justify-center">
        <div className="flex gap-10 justify-center text-white text-[14px] font-main font-light tracking-wider">
          <Link href="/">Home</Link>
          <Link href="/">Products</Link>
          <Link href="/">Solutions</Link>
          <Link href="/">Distributors</Link>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 flex-1">
        <Image
          src="/search_icon.svg"
          alt="Search Icon"
          width={28}
          height={28}
          className="pb-1"
        />
        <Image
          src="/language_icon.svg"
          alt="Language Icon"
          width={32}
          height={32}
        />
        <button className="flex items-center gap-2 bg-[#E4173C] text-[14px] text-[#020C18] rounded-md px-3 py-1 font-medium hover:bg-[#c91534] transition-colors">
          <Image
            src="/location_on.svg"
            alt="Location Icon"
            width={20}
            height={20}
          />
          Find a Dealer
        </button>
      </div>
    </header>
  );
};

export default Header;
