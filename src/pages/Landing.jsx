import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, FacebookLogoIcon } from "@phosphor-icons/react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import {
  A11y,
  EffectCoverflow,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { MEDIA, postImages } from "../lib/constants";

const Header = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    setScrollHeight(latest);
  });

  return (
    <header className="fixed w-full top-0 z-999 p-2">
      <div
        className={`max-w-2xl bg-primary/20 backdrop-blur-md rounded-full md:max-w-3/5 flex justify-between items-center px-4 md:px-20 py-4 transition-all duration-300 mx-auto`}
      >
        <motion.a
          href=""
          className="flex gap-2 items-center"
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={MEDIA.Logo}
            alt="De-glamour aerobics logo"
            className={`w-12 ${scrollHeight > 788 ? "invert" : ""}`}
          />
          <span
            className={`text-sm leading-none ${scrollHeight > 788 ? "text-black" : "text-white"}`}
          >
            <span className="font-bold">De-glamour</span>
            <br />
            <span>aerobics</span>
          </span>
        </motion.a>

        <motion.nav
          className={`gap-4 items-center scrollFadeInLeft ${isScrolled ? "hidden" : "hidden md:flex"}`}
        >
          <a href="#about" className="navLink">
            About
          </a>
          <a href="#community" className="navLink">
            Community
          </a>
          <a href="#joinus" className="navLink">
            Join us
          </a>
        </motion.nav>

        <a
          href="https://www.facebook.com/profile.php?id=61591570243945"
          target="_blank"
          className={`btn items-center gap-2 text-sm zoomFadeRightIn flex`}
        >
          <FacebookLogoIcon size={15} />
          Follow us
          <ArrowRightIcon size={15} />
        </a>
      </div>
    </header>
  );
};

const Hero = () => {
  const videoScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: videoScrollRef,
    offset: ["start end", "end start"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile
      ? ["90vw", "96vw", "90vw"] // mobile: small growth range, stays within screen bounds
      : ["48rem", "80vw", "48rem"], // desktop: your original values
  );
  return (
    <section className="relative hero">
      <div className="overlay bg-primary/50 absolute w-full h-full top-0"></div>
      <div className="relative py-32 px-8 md:px-20 z-10">
        <div className="relative max-w-3xl mx-auto text-center z-20">
          <h1 className="text-white text-5xl md:text-8xl leading-10 md:leading-18 tracking-tighter font-semibold scrollFadeInUp">
            Move your Body, Lift Your Mood
          </h1>
          <p className="my-4 text-white scrollFadeInUpDelay">
            De-glamour aerobics is a supportive fitness and one big family where
            we encourage a healthy lifestyle through working out and having fun.
          </p>
        </div>

        {/* scroll-tracking wrapper — gives room for the grow/shrink journey */}
        <div
          ref={videoScrollRef}
          className="relative flex items-center justify-center mt-16"
        >
          <motion.div
            style={{ width, aspectRatio: "16 / 9" }}
            className="relative rounded-2xl overflow-hidden bg-blue-100 group mx-auto z-10"
          >
            <div className="absolute w-full h-full top-0 z-30 bg-black/0 group-hover:bg-black/50 cursor-pointer flex">
              <a href="" className="text-white m-auto hover:text-primary">
                <FacebookLogoIcon size={100} />
              </a>
            </div>
            <video
              src={MEDIA.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="relative">
      <div className="overflow-hidden flex items-center">
        <div className="pt-12 px-4 md:px-20 w-full items-center">
          <div className=" text-center">
            <h2 className="font-bold text-3xl md:text-5xl text-primary">
              Find Your Rythm
            </h2>
            <p className="mt-2 text-sm md:text-base max-w-lg mx-auto">
              From high-energy aerobics to full-body workouts, our sessions are
              designed to keep you moving, motivated and feeling great.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61591570243945"
              target="_blank"
              className="btn inline-flex text-xs md:text-sm font-semibold items-center gap-2 mt-4 zoomFadeInUpDelay"
            >
              Follow us on Facebook
              <ArrowRightIcon />
            </a>
          </div>

          <div className="relative mt-12">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <Swiper
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  EffectCoverflow,
                  FreeMode,
                ]}
                spaceBetween={4}
                slidesPerGroup={1}
                slidesOffsetBefore={10}
                slidesOffsetAfter={4}
                initialSlide={1}
                centeredSlides={true}
                roundLengths={true}
                loop={true}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 30,
                  depth: 30,
                  modifier: 2,
                }}
                freeMode={{
                  enabled: true,
                  sticky: true,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1.4, // shows a peek of the next slide — common mobile carousel pattern
                    coverflowEffect: { rotate: 15, depth: 15, modifier: 1 }, // tone down the 3D effect on small screens
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                    coverflowEffect: {
                      rotate: 30,
                      depth: 30,
                      modifier: 2,
                    },
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
              >
                {postImages.map((img) => (
                  <SwiperSlide key={img.id}>
                    <motion.div
                      className="rounded-2xl w-96 h-72 shrink-0 cursor-grab"
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.5 }} // re-triggers each time 50% is visible
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <img src={img.src} className="w-full h-full" />
                    </motion.div>
                  </SwiperSlide>
                ))}
                {/* {Array.from({ length: 6 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <motion.div
                      className="bg-black/20 rounded-2xl w-80 h-96 shrink-0 cursor-grab"
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.5 }} // re-triggers each time 50% is visible
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <img src={MEDIA.aboutTwo} className="w-full h-full" />
                    </motion.div>
                  </SwiperSlide>
                ))} */}
              </Swiper>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  const parent = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.5 },
    },
  };

  const slideUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const zoomIn = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const container = {
    hidden: {},
    visible: {},
  };

  const tiltRight = {
    hidden: { rotate: -12, opacity: 0 },
    visible: {
      rotate: 12,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const tiltLeft = {
    hidden: { rotate: 12, opacity: 0 },
    visible: {
      rotate: -12,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="community">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={parent}
        className="text-center pt-24 pb-12 px-8 md:px-16"
      >
        <div className="">
          <motion.h2
            variants={slideUp} // reuse the shared variant instead of a literal object
            className="font-extrabold text-3xl md:text-6xl text-primary tracking-tighter leading-7 lg:leading-14"
          >
            Meet the Community
          </motion.h2>

          <motion.p variants={slideUp} className="mt-2 max-w-xl mx-auto">
            Our community is what makes De-glamour special. It's a place to feel
            supported, encouraged and inspired to live a better and healthier
            life.
          </motion.p>
        </div>

        <motion.div
          className="relative max-w-2xl mx-auto mt-8"
          variants={container} // no initial/whileInView needed — inherits from the outer parent now
        >
          <motion.div
            variants={tiltRight}
            className="absolute w-36 border-4 border-white rounded-2xl overflow-hidden bottom-10 -right-5 z-10"
          >
            <img src={MEDIA.communityMan} className="w-full h-full" />
          </motion.div>

          <motion.div
            variants={tiltLeft}
            className="absolute w-36 border-4 border-white rounded-2xl overflow-hidden top-10 -left-5 z-10"
          >
            <img src={MEDIA.people} className="w-full h-full" />
          </motion.div>

          <motion.div variants={zoomIn} className="rounded-4xl overflow-hidden">
            <img src={MEDIA.communityImg} className="w-full h-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CTA = () => {
  return (
    <section>
      <div className="pt-24 pb-12 px-8 md:px-16 flex flex-col bg-[#eee]">
        <div className="mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl text-primary">
            Be a part of something good
          </h2>
          <p className="max-w-xl mt-2">
            We're not just about fitness - we're about creating a space where
            people feel seen, supported, empowered to live healthier, happier
            lives and have fun😁.
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=61591570243945"
            target="_blank"
            className={`btn inline-flex items-center gap-2 text-sm mt-4`}
          >
            <FacebookLogoIcon size={15} />
            Follow us
            <ArrowRightIcon size={15} />
          </a>
        </div>

        <div className="flex items-center justify-center mt-12 flex-wrap">
          <div className="w-64 -rotate-6 border-6 border-white rounded-2xl">
            <img src={MEDIA.communityMan} className="w-full h-full" />
          </div>
          <div className="w-64 rotate-6 border-6 border-white rounded-2xl -ml-4 mt-3">
            <img src={MEDIA.aboutTwo} className="w-full h-full" />
          </div>
          <div className="flex p-4 w-64 h-64 -rotate-6 bg-green-light rounded-2xl">
            <p className="font-caveat text-5xl text-primary m-auto">
              Big community, One family!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FindUs = () => {
  return (
    <section>
      <div className="pt-24 pb-12 px-8 md:px-16">
        <div className="mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl text-primary">
            Our Location
          </h2>
          <p className="max-w-xl mx-auto mt-2">
            Interested in finding us? Here's our address. Alternatively, you
            could call us on this line:
            <a
              href="tel:08033453412"
              className="font-medium text-green-light underline"
            >
              08033453412
            </a>
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=61591570243945"
            target="_blank"
            className="inline-flex text-xl mt-4 font-medium hover:text-green-light hover:underline"
          >
            Old NNPC Guest House Opposite Gym N. Suleja, Nigeria
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="py-8 px-8 lg:pb-12 lg:pt-24 lg:px-16 bg-[#eee]">
        <div className="flex flex-col gap-4 lg:flex-row justify-between">
          <a href="" className="flex gap-2 items-center">
            <img
              src={MEDIA.Logo}
              alt="De-glamour aerobics logo"
              className="w-16 invert"
            />
            <span className="leading-none">
              <span className="font-bold">De-glamour</span>
              <br />
              <span>aerobics</span>
            </span>
          </a>

          <div className="">
            <p>Have questions or feedback? Reach out to our team at</p>
            <a
              href="mailto:osasgallanta@yahoo.com"
              className="text-3xl lg:text-5xl font-medium hover:text-green-light hover:underline"
            >
              osasgallanta@yahoo.com
            </a>
          </div>

          <div className="">
            <p>Give us as call at</p>
            <a
              href="tel:08033453412"
              className="text-3xl lg:text-5xl font-medium hover:text-green-light hover:underline"
            >
              08033453412
            </a>
          </div>
        </div>

        <nav className="gap-4 items-center flex py-2 mt-4">
          <a href="#about" className="">
            About
          </a>
          <a href="#community" className="">
            Community
          </a>
          <a href="#joinus" className="">
            Join us
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Community />
      <CTA />
      <FindUs />
      <Footer />
    </>
  );
}
