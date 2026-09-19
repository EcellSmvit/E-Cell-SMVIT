import React from "react";

const LOGO_URL =
  "https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039";

const ThreeScene = () => {
  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#0B0818]
        text-white
      "
    >


      <div className="pointer-events-none absolute inset-0">
        {/* Main gradient */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_45%,#2A1D61_0%,#120D2A_38%,#0B0818_75%)]
          "
        />

        {/* Center purple glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[420px]
            w-[420px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#6D4CFF]/15
            blur-[120px]
            animate-pulse
          "
        />

        {/* Top glow */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[280px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-[#6D4CFF]/5
            blur-[100px]
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />
      </div>

      {/* ================= OUTER BORDER ================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-5
          rounded-[30px]
          border
          border-white/[0.08]
          md:inset-8
          md:rounded-[36px]
        "
      />

      {/* ================= TOP LEFT BRAND ================= */}

      <div
        className="
          absolute
          left-8
          top-8
          z-30
          flex
          items-center
          gap-3
          md:left-14
          md:top-12
        "
      >
        {/* Logo */}
        <div
          className="
            group
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            shadow-[0_10px_30px_rgba(109,76,254,0.25)]
            transition-all
            duration-500
            hover:scale-110
            hover:rotate-3
            hover:shadow-[0_15px_45px_rgba(109,76,254,0.45)]
          "
        >
          <img
            src={LOGO_URL}
            alt="E-Cell SMVIT"
            className="
              relative
              z-10
              h-8
              w-8
              object-contain
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:-rotate-6
            "
          />

          {/* Shine */}
          <div
            className="
              pointer-events-none
              absolute
              -left-10
              top-0
              h-full
              w-8
              rotate-12
              bg-white/30
              blur-md
              transition-all
              duration-700
              group-hover:left-14
            "
          />
        </div>

        {/* Brand */}
        <div>
          <div
            className="
              text-[15px]
              font-black
              tracking-[-0.02em]
              text-white
            "
          >
            E-CELL
          </div>

          <div
            className="
              mt-0.5
              text-[9px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-white/40
            "
          >
            SMVIT
          </div>
        </div>
      </div>

      {/* ================= TOP RIGHT ================= */}

      <div
        className="
          absolute
          right-8
          top-10
          z-20
          hidden
          text-right
          md:right-14
          md:top-14
          md:block
        "
      >
        <p
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.35em]
            text-white/30
          "
        >
          Entrepreneurship Cell
        </p>

        <p
          className="
            mt-1
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-[#8E7CFF]
          "
        >
          2026 · 2027
        </p>
      </div>

      {/* ================= SIDE TEXT ================= */}

      <div
        className="
          absolute
          left-10
          top-1/2
          z-20
          hidden
          -translate-y-1/2
          -rotate-90
          origin-left
          text-[8px]
          uppercase
          tracking-[0.45em]
          text-white/20
          md:block
        "
      >
        BUILDING THE NEXT GENERATION
      </div>

      {/* ================= HERO ================= */}

      <section
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          px-5
          pb-10
          pt-28
        "
      >
        {/* ================= CENTER LOGO ================= */}

        <div
          className="
            relative
            flex
            h-[250px]
            w-[250px]
            items-center
            justify-center
            sm:h-[300px]
            sm:w-[300px]
            md:h-[360px]
            md:w-[360px]
          "
        >
          {/* Outer animated ring */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[220px]
              w-[220px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#6D4CFF]/15
              animate-[spin_18s_linear_infinite]
              sm:h-[270px]
              sm:w-[270px]
              md:h-[320px]
              md:w-[320px]
            "
          />

          {/* Second ring */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[175px]
              w-[175px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-white/[0.06]
              sm:h-[215px]
              sm:w-[215px]
              md:h-[260px]
              md:w-[260px]
            "
          />

          {/* Logo glow */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[150px]
              w-[150px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#6D4CFF]/20
              blur-[70px]
              animate-pulse
            "
          />

          {/* WHITE LOGO */}
          <img
            src={LOGO_URL}
            alt="E-Cell SMVIT Logo"
            className="
              relative
              z-10
              h-[135px]
              w-[135px]
              object-contain
              drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]
              transition-transform
              duration-500
              hover:scale-105
              sm:h-[165px]
              sm:w-[165px]
              md:h-[200px]
              md:w-[200px]
            "
          />
        </div>

        {/* ================= TEXT ================= */}

        <div
          className="
            -mt-2
            flex
            flex-col
            items-center
            text-center
            sm:-mt-6
            md:-mt-10
          "
        >
          {/* Location */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.4em]
              text-[#9A89FF]
            "
          >
            <span className="h-px w-8 bg-[#6D4CFF]/40" />

            SMVIT · BENGALURU

            <span className="h-px w-8 bg-[#6D4CFF]/40" />
          </div>

          {/* Heading */}

          <h1
            className="
              max-w-5xl
              text-4xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.045em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-[82px]
            "
          >
            WHERE ASPIRATION
            <br />

            <span className="text-white/35">
              MEETS OPPORTUNITY
            </span>
          </h1>

          {/* Bottom statement */}

          <div
            className="
              mt-7
              flex
              items-center
              gap-3
              text-[9px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-white/30
            "
          >
            <span className="h-1 w-1 rounded-full bg-[#6D4CFF]" />

            THINK

            <span>•</span>

            CREATE

            <span>•</span>

            LEAD

            <span className="h-1 w-1 rounded-full bg-[#6D4CFF]" />
          </div>
        </div>
      </section>

      {/* ================= BOTTOM LEFT ================= */}

      <div
        className="
          absolute
          bottom-10
          left-12
          z-20
          hidden
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-white/20
          md:block
        "
      >
        EST. 2017
      </div>

      {/* ================= BOTTOM RIGHT ================= */}

      <div
        className="
          absolute
          bottom-10
          right-12
          z-20
          hidden
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-white/20
          md:block
        "
      >
        ENTREPRENEURSHIP · INNOVATION
      </div>

      {/* ================= MOBILE ================= */}

      <div
        className="
          absolute
          bottom-8
          left-1/2
          z-20
          -translate-x-1/2
          whitespace-nowrap
          text-[8px]
          uppercase
          tracking-[0.3em]
          text-white/20
          md:hidden
        "
      >
        E-CELL · SMVIT
      </div>
    </main>
  );
};

export default ThreeScene;