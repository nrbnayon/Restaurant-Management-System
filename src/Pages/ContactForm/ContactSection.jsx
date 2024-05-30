import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

const personalData = {
  email: "nrbnayon@gmail.com",
  phone: "+8801934025581",
  address: "NotunBazar, Dhaka, Bangladesh",
  github: "https://github.com/nrbnayon",
  linkedIn: "https://www.linkedin.com/in/itsnayon",
  twitter: "https://twitter.com/username",
  stackOverflow: "https://stackoverflow.com/23638067/nayon",
  facebook: "https://facebook.com/nay.o.ii",
};

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24  text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md ">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443] "></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />

        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <MdAlternateEmail
                className="bg-[#8b98a5]  p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={36}
              />
              <span>{personalData.email}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <IoMdCall
                className="bg-[#8b98a5]  p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={36}
              />
              <span>{personalData.phone}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <CiLocationOn
                className="bg-[#8b98a5]  p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={36}
              />
              <span>{personalData.address}</span>
            </p>
          </div>
          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            <Link to={{ pathname: personalData.github }} target="_blank">
              <IoLogoGithub
                className="bg-[#8b98a5]  p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={48}
              />
            </Link>
            <Link to={{ pathname: personalData.linkedIn }} target="_blank">
              <BiLogoLinkedin
                className="bg-[#8b98a5]  p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={48}
              />
            </Link>
            <Link to={{ pathname: personalData.twitter }} target="_blank">
              <FaXTwitter
                className="bg-[#8b98a5]  p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={48}
              />
            </Link>
            <Link to={{ pathname: personalData.stackOverflow }} target="_blank">
              <FaStackOverflow
                className="bg-[#8b98a5]  p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={48}
              />
            </Link>
            <Link to={{ pathname: personalData.facebook }} target="_blank">
              <FaFacebook
                className="bg-[#8b98a5]  p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300  cursor-pointer"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
