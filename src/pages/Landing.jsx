import { Fragment, useEffect, useRef, useState } from "react";
import { charityEvents, MEDIA, outDoors } from "../lib/constants";
import {
  Pause,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  SpeakerLowIcon,
  SpeakerNoneIcon,
} from "@phosphor-icons/react";

const facebook = "https://www.facebook.com/profile.php?id=61591570243945";
const activities = [
  {
    title: "Move",
    text: "From high-energy aerobics to full-body workouts, our sessions are designed to keep you moving, motivated and feeling great.",
    styles:
      "bg-primary text-primary-foreground rounded-xl p-8 transition hover:-translate-y-2 ",
  },
  {
    title: "Explore",
    text: "We trade the floor for the outdoors — group hikes that test your legs and bond the crew.",
    styles:
      "bg-secondary text-secondary-foreground rounded-xl p-8 transition hover:-translate-y-2 md:translate-y-10",
  },
  {
    title: "Give",
    text: "Outreach and support for those who need it. Strong bodies, bigger hearts.",
    styles:
      "bg-accent text-accent-foreground rounded-xl p-8 transition hover:-translate-y-2 ",
  },
];
const words = ["SWEAT", "HIKE", "GIVE BACK", "DANCE", "FAMILY", "REPEAT"];

function Marquee({ reverse = false }) {
  const items = [...words, ...words, ...words];
  return (
    <div
      className={`relative overflow-hidden py-4 bg-primary text-primary-foreground z-10 ${reverse ? "marquee--reverse" : ""}`}
      aria-hidden="true"
    >
      <div className="marquee__track flex w-max animate-marquee gap-10 whitespace-nowrap font-anton text-3xl md:text-5xl">
        {items.map((word, index) => (
          <span key={`${word}-${index}`}>
            {word}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeOutdoor, setActiveOutdoor] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCharity, setActiveCharity] = useState(0);
  const [charityPaused, setCharityPaused] = useState(false);
  const charityRefs = useRef([]);

  const nextCharity = () =>
    setActiveCharity((prev) => (prev + 1) % charityEvents.length);

  // When the active slide changes: restart it, pause all the others
  useEffect(() => {
    charityRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeCharity) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeCharity]);

  // Hover pauses and resumes the active slide only
  useEffect(() => {
    const video = charityRefs.current[activeCharity];
    if (!video) return;
    if (charityPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [charityPaused]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <main className="relative font-bricolage-grotesque">
      <header className="flex items-center justify-between py-4 px-8 fixed top-0 w-full z-50">
        <a className="font-anton text-white text-2xl uppercase" href="#top">
          De-glamour<span>.</span>
        </a>

        <a
          className="rounded-full bg-primary px-5 py-2 text-sm font-extrabold uppercase text-primary-foreground font-bricolage-grotesque transition hover:scale-105"
          href={facebook}
        >
          Join us
        </a>
      </header>

      <section
        className="hero relative flex items-end max-h-262.5 min-[790px] h-svh overflow-hidden"
        id="top"
      >
        <img
          className="hero__image absolute inset-0 w-full h-full"
          src={MEDIA.hero}
          alt="The De-glamour family moving together at sunset"
        />
        <div className="hero__shade absolute inset-0 w-full h-full" />
        <div className="hero__content">
          <p className="mb-4 inline-block -rotate-2 rounded-full bg-secondary px-4 py-1 text-sm font-extrabold uppercase text-secondary-foreground">
            Suleja's loudest fitness family
          </p>
          <h1 className="font-anton text-white text-[18vw] uppercase leading-[0.85] md:text-[11vw]">
            We are
            <br />
            <span className="text-primary">them.</span>
          </h1>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between font-bricolage-grotesque">
            <p className="max-w-md text-lg text-muted-foreground">
              Not a gym. Not a class. A family that sweats together, moves
              together and shows up for the community — every single time!
            </p>
            <a
              className="w-fit rounded-full bg-primary px-8 py-4 text-lg font-extrabold uppercase text-primary-foreground shadow-[0_0_40px_-5px_#bdf520)] transition hover:scale-105"
              href={facebook}
            >
              Come move with us <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <span className="hero__index">SULEJA · NIGERIA / 01</span>
      </section>

      <Marquee />

      <section
        className="grid gap-px bg-border md:grid-cols-3"
        id="crew"
        aria-label="Our community"
      >
        {[
          ["20+", "Family members"],
          ["3×", "Sessions weekly"],
          ["∞", "Good vibes"],
        ].map(([number, label]) => (
          <div className="bg-background p-8 md:p-12 flex flex-col" key={label}>
            <strong className="font-anton text-6xl tracking-wide text-primary md:text-7xl">
              {number}
            </strong>
            <span className="mt-2 font-semibold uppercase text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </section>

      <section className="px-5 py-24 md:px-10">
        <div className="font-anton text-white mb-4">01 / WHAT WE’RE ABOUT</div>
        <h2 className="font-anton text-white text-6xl uppercase leading-none md:text-8xl">
          More than
          <br />
          <span className="text-outline">fitness.</span>
        </h2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {activities.map((activity, index) => (
            <article
              className={`flex flex-col ${activity.styles}`}
              key={activity.title}
            >
              <span className="font-anton">0{index + 1}</span>
              <div className="mt-16">
                <h3 className="font-anton text-5xl uppercase">
                  {activity.title}
                </h3>
                <p className="mt-3 font-semibold">{activity.text}</p>
              </div>
              <span
                className="flex ml-auto font-bold text-2xl"
                aria-hidden="true"
              >
                ✳
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="relative" id="hikes">
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
        <div className="relative py-25 px-8 gap-8 grid lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="font-semibold uppercase tracking-widest text-secondary mt-8">
              02 / Experiences
            </p>
            <h2 className="mt-3 font-anton text-6xl text-white uppercase leading-none md:text-8xl">
              Outdoors
              <br />
              are our
              <br />
              <span className="text-primary">gym too.</span>
            </h2>
            <p className="mt-6 text-lg text-foreground/85">
              Every once in a while, we lace up, pack the water and hit the
              trails around Suleja and beyond. Rocky climbs, sunrise summits,
              group photos at the top and plenty of jokes on the way down.
              Beginners welcome — nobody gets left behind; we climb at the pace
              of the family.
            </p>
            <a
              className="mt-8 inline-flex rounded-full border-2 border-primary px-7 py-3 font-extrabold uppercase text-primary transition hover:bg-primary hover:text-primary-foreground"
              href={facebook}
              target="_blank"
              rel="noreferrer"
            >
              Join us <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-4 items-start mb-8 gap-4">
              {outDoors.map((activity) => (
                <video
                  key={activity.id}
                  onClick={() => setActiveOutdoor(activity.id)}
                  className={`rounded-xl border-4 duration-300 transition-all hover:border-primary cursor-pointer ${activity.id === activeOutdoor ? "border-primary" : "border-transparent"}`}
                  src={activity.src}
                  muted
                />
              ))}
            </div>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute left-0 top-0 w-full p-4 flex gap-4 items-center">
                <button
                  onClick={togglePlay}
                  className="bg-secondary rounded-full flex font-medium items-center p-3 transition-all duration-300 hover:bg-white hover:text-secondary cursor-pointer"
                >
                  {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-secondary rounded-full flex font-medium items-center p-3 transition-all duration-300 hover:bg-white hover:text-secondary cursor-pointer"
                >
                  {isMuted ? (
                    <SpeakerNoneIcon size={24} />
                  ) : (
                    <SpeakerHighIcon size={24} />
                  )}
                </button>
              </div>

              {outDoors.map(
                (activity) =>
                  activity.id === activeOutdoor && (
                    <Fragment key={activity.id}>
                      <video
                        ref={videoRef}
                        className="w-full"
                        src={activity.src}
                        muted={isMuted}
                        autoPlay
                        loop
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                      <p className="absolute bottom-4 left-4 px-4 border-l-8 border-primary font-anton text-2xl w-full text-white">
                        {activity.title}
                      </p>
                    </Fragment>
                  ),
              )}
            </div>
          </div>
        </div>
      </section>

      <Marquee reverse />

      <section
        className="grid items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10"
        id="charity"
      >
        <div className="relative">
          <div
            className="relative aspect-square w-full -rotate-2 overflow-hidden rounded-2xl"
            onMouseEnter={() => setCharityPaused(true)}
            onMouseLeave={() => setCharityPaused(false)}
          >
            {charityEvents.map((event, i) => (
              <video
                key={event.id}
                ref={(el) => (charityRefs.current[i] = el)}
                src={event.src}
                muted
                playsInline
                autoPlay={i === 0}
                onEnded={nextCharity}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  i === activeCharity ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <div className="absolute bottom-4 left-0 flex w-full justify-center gap-2">
              {charityEvents.map((event, i) => (
                <button
                  key={event.id}
                  onClick={() => setActiveCharity(i)}
                  aria-label={`Show charity clip ${i + 1}`}
                  className={`h-4 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeCharity
                      ? "w-8 bg-primary"
                      : "w-4 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-6 -right-2 rotate-3 rounded-2xl bg-primary px-6 py-4 font-anton text-2xl uppercase text-primary-foreground md:-right-6">
            Big community.
            <br />
            One family.
          </div>
        </div>

        <div className="charity__copy">
          <p className="font-semibold uppercase tracking-widest text-accent">
            Charity & Community
          </p>
          <h2 className="mt-3 font-anton text-white text-6xl uppercase leading-none md:text-7xl">
            We give
            <br />
            <span className="text-secondary">back.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            From food drives to supporting local families, De-glamour shows up
            beyond the workout. Our outreaches bring the same energy we bring to
            every session — because a healthy community is one that looks out
            for each other.
          </p>
          <ul className="mt-8 space-y-3 font-semibold">
            {[
              "Food & essentials distribution",
              "Community health walks",
              "Support for families in need",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-white font-bold"
              >
                <span className="h-3 w-3 rounded-full bg-secondary"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="mx-5 mb-10 rounded-[3rem] bg-primary px-6 py-20 text-primary-foreground md:mx-10 md:px-16"
        id="join"
      >
        <h2 className="font-anton text-[14vw] uppercase leading-[0.85] md:text-[8vw]">
          Pull up.
          <br />
          Get in.
        </h2>
        <div className="mt-10 grid gap-8 font-semibold md:grid-cols-3">
          <div>
            <div className="text-sm uppercase opacity-70">Where</div>
            <p className="mt-1 text-xl">
              Old NNPC Guest House, Opposite Gym N, Suleja, Nigeria
            </p>
          </div>
          <div>
            <div className="text-sm uppercase opacity-70">Call</div>
            <a href="tel:08033453412" className="mt-1 block text-xl underline">
              0803 345 3412
            </a>
          </div>
          <div>
            <div className="text-sm uppercase opacity-70">Email</div>
            <a
              href="mailto:osasgallanta@yahoo.com"
              className="mt-1 block text-xl underline"
            >
              osasgallanta@yahoo.com
            </a>
          </div>
        </div>
        <a
          href={facebook}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-block rounded-full bg-primary-foreground px-8 py-4 font-extrabold uppercase text-primary transition hover:scale-105"
        >
          Follow us on Facebook →
        </a>
      </section>

      <footer className="flex flex-col justify-between gap-2 px-5 pb-10 text-sm text-muted-foreground md:flex-row md:px-10">
        <span className="font-display text-lg uppercase text-foreground">
          De-glamour Aerobics
        </span>
        <span>Move your body. Lift your mood. © 2026</span>
      </footer>
    </main>
  );
}
