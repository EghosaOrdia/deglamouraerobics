import hero from "../assets/hero.jpg";
import hikeImg from "../assets/hikeFlyer.jpeg";
import { MEDIA } from "../lib/constants";

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
          src={hero}
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
        <div className="max-w-2xl lg:max-w-full mx-auto relative py-25 px-8">
          <img
            src={hikeImg}
            alt="The De-glamour crew hiking together on a rocky trail"
            loading="lazy"
            className="align-middle"
          />
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
            Every once in a while, we lace up, pack the water and hit the trails
            around Suleja and beyond. Rocky climbs, sunrise summits, group
            photos at the top and plenty of jokes on the way down. Beginners
            welcome — nobody gets left behind; we climb at the pace of the
            family.
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
      </section>

      <Marquee reverse />

      <section
        className="grid items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10"
        id="charity"
      >
        <div className="relative">
          <video
            src={MEDIA.charity}
            muted
            autoPlay
            loop
            className="aspect-square w-full -rotate-2 rounded-2xl object-cover"
          />

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
        <div class="mt-10 grid gap-8 font-semibold md:grid-cols-3">
          <div>
            <div class="text-sm uppercase opacity-70">Where</div>
            <p class="mt-1 text-xl">
              Old NNPC Guest House, Opposite Gym N, Suleja, Nigeria
            </p>
          </div>
          <div>
            <div class="text-sm uppercase opacity-70">Call</div>
            <a href="tel:08033453412" class="mt-1 block text-xl underline">
              0803 345 3412
            </a>
          </div>
          <div>
            <div class="text-sm uppercase opacity-70">Email</div>
            <a
              href="mailto:osasgallanta@yahoo.com"
              class="mt-1 block text-xl underline"
            >
              osasgallanta@yahoo.com
            </a>
          </div>
        </div>
        <a
          href={facebook}
          target="_blank"
          rel="noreferrer"
          class="mt-12 inline-block rounded-full bg-primary-foreground px-8 py-4 font-extrabold uppercase text-primary transition hover:scale-105"
        >
          Follow us on Facebook →
        </a>
      </section>

      <footer class="flex flex-col justify-between gap-2 px-5 pb-10 text-sm text-muted-foreground md:flex-row md:px-10">
        <span class="font-display text-lg uppercase text-foreground">
          De-glamour Aerobics
        </span>
        <span>Move your body. Lift your mood. © 2026</span>
      </footer>
    </main>
  );
}
