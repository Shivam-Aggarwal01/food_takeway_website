import React from "react";
import { assets } from "../new assests/frontend_assets/assets";

const Header = () => {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-text {
          animation: fadeInUp 0.8s ease forwards;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div
        className="
          relative
          w-[90%]
          mx-auto
          h-[300px]
          sm:h-[350px]
          md:h-[400px]
          lg:h-[450px]
          my-8
          rounded-2xl
          overflow-hidden
          flex
          items-center
          justify-start
          bg-cover
          bg-center
          bg-no-repeat
          shadow-lg
          transition-transform
          hover:scale-105
          hover:shadow-xl
          hover:opacity-90
        "
        style={{
          backgroundImage: `url(${assets.header_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.1)", // Makes image brighter
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div
          className="
            relative
            z-10
            flex
            flex-col
            items-start
            justify-center
            gap-4
            max-w-xl
            px-4
            sm:px-6
            md:px-10
            py-4
            fade-in-text
          "
        >
          <h2
            className="
              text-white
              font-extrabold
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              leading-tight
              drop-shadow-[1px_2px_2px_black]
            "
          >
            Order your <br /> favourite food here
          </h2>
          <p
            className="
              text-white
              text-base
              sm:text-lg
              md:text-xl
              max-w-[90%]
              drop-shadow-[1px_2px_2px_black]
            "
          >
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.
          </p>
          <a href="#explore-menu">
            <button
              className="
                bg-white
                text-black
                font-semibold
                px-5
                py-2.5
                rounded-full
                text-sm
                sm:text-base
                shadow
                hover:bg-orange-50
                transition
                hover:shadow-lg 
                hover:opacity-90
              hover:scale-105
              "
            >
              View Menu
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
