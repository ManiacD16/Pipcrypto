import React from "react";

const GradientLine = () => (
  <div className="h-[1px] w-full bg-gradient-to-r from-[#665DCD] via-[#5FA4E6] to-[#D2AB67]" />
);

const VerticalGradientLine = () => (
  <div className="w-[1px] h-full bg-gradient-to-b from-[#665DCD] via-[#5FA4E6] to-[#D2AB67]" />
);

const AboutSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 text-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          About Pipcrypto Team
        </h2>

        {/* Subheading */}
        <p className="text-gray-300 text-center max-w-2xl mx-auto text-lg mb-16">
          At Pipcrypto Team, we are on the mission to balance the supply and
          demand across crypto markets worldwide. We are a crypto native market
          maker founded by traders, developers, and innovators who are strong
          believers and supporters of the future of decentralization and digital
          assets.
        </p>

        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 relative">
          {/* Top Border */}
          {/* <div className="absolute top-0 left-0 w-full">
            <GradientLine />
          </div> */}

          {/* Bottom Border */}
          <div className="absolute bottom-0 left-0 w-full">
            <GradientLine />
          </div>

          {/* Vertical Borders */}
          <div className="absolute left-1/4 top-0 bottom-0 hidden md:block">
            <VerticalGradientLine />
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 ">
            <VerticalGradientLine />
          </div>
          <div className="absolute left-3/4 top-0 bottom-0 hidden md:block">
            <VerticalGradientLine />
          </div>

          {/* Horizontal Gradient Line Between Two Rows (only on small screens) */}
          <div className="absolute top-1/2 left-0 w-full block md:hidden">
            <GradientLine />
          </div>

          {/* Content Blocks */}
          {[
            {
              title: "~$100 billion",
              subtitle: (
                <>
                  cumulative trading <br /> volume to date
                </>
              ),
              gradient: true,
            },
            {
              title: "0.8%",
              subtitle: (
                <>
                  of the global crypto <br /> spot trading volume
                </>
              ),
              gradient: true,
            },
            {
              title: "~30",
              subtitle: (
                <>
                  Pipcrypto Teammates <br /> (& growing)
                </>
              ),
              gradient: true,
            },
            {
              title: "25+",
              subtitle: (
                <>
                  leading global and <br /> local crypto exchanges
                </>
              ),
              gradient: true,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 text-center flex flex-col justify-center transition-all duration-300 ${
                item.gradient
                  ? "group hover:bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67]"
                  : ""
              }`}
            >
              <h3 className="text-2xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm mt-2 leading-tight text-white">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 relative mt-[-1px]">
          {/* Bottom Borders */}
          {/* <div className="absolute bottom-0 left-0 w-full">
            <GradientLine />
          </div> */}

          {/* Vertical Borders */}
          <div className="absolute left-1/4 top-0 bottom-0 hidden md:block">
            <VerticalGradientLine />
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 ">
            <VerticalGradientLine />
          </div>
          <div className="absolute left-3/4 top-0 bottom-0 hidden md:block">
            <VerticalGradientLine />
          </div>

          {/* Horizontal Gradient Line Between Two Rows (only on small screens) */}
          <div className="absolute top-1/2 left-0 w-full block md:hidden">
            <GradientLine />
          </div>

          {[
            { title: "2017", subtitle: "start, crypto-natives" },
            { title: "1,200+", subtitle: "crypto-asset pairs" },
            { title: "24/7", subtitle: "liquidity" },
            { title: "5 billion+", subtitle: "trades done to date" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group p-6 text-center flex flex-col justify-center transition-all duration-300 hover:bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67]"
            >
              <h3 className="text-2xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm mt-2 leading-tight text-white">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
