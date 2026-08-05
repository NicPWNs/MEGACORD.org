import Image from "next/image";
import TwitchPlayer from "./twitch-player";

export default function Home() {
  return (
    <>
      <a href="/">
        <Image
          src="/mc_transparent.gif"
          alt="MEGACORD Logo"
          width={640}
          height={640}
          className="center"
          style={{ width: "25%", height: "auto" }}
          unoptimized
          priority
        />
      </a>
      <div className="container" id="nav">
        <ul>
          <li>
            <a href="https://github.com/NicPWNs/MEGABOT">MEGABOT</a>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <TwitchPlayer channel="thesaturatedsquid" />
    </>
  );
}
