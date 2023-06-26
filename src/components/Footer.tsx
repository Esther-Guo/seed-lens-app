import Link from "next/link";
import Image from "next/image";
import { socialLinks } from "~/constant/social";

function Footer() {
  return (
    <div className="z-10 flex flex-col">
      {/* 
      <div className="flex flex-row items-center justify-center gap-x-[58px]">
        <Link href={socialLinks.twitter} target="_blank">
          <Image
            src="/footer/twitter.svg"
            alt="twitter link"
            width={47.59}
            height={38.96}
          />
        </Link>
        <Link href={socialLinks.discord} target="_blank">
          <Image
            src="/footer/discord.svg"
            alt="discord link"
            width={43.83}
            height={33.13}
          />
        </Link>
      </div> */}
      {/* text */}
      <div className="my-[33px] flex w-full justify-center">
        <div className=" text-center font-second text-[28px] text-primary">
          PFP-DAO © 2023, All rights reserved |{" "}
          <Link target="_blank" href={socialLinks.gitbook}>
            GitBook
          </Link>{" "}
          |{" "}
          <Link target="_blank" href={socialLinks.rssBlog}>
            Blog
          </Link>{" "}
          | Privacy Concerns | Terms & Conditions
        </div>
      </div>
    </div>
  );
}

export default Footer;