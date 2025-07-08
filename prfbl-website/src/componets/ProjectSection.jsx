import { useEffect, useRef, useState } from "react";

const CARD_WIDTH = 435 + 16; // width + margin-right
const VISIBLE_COUNT = 4;

const images = [
    {
        image: "/PRFBL-Website/Background/bg1.png",
        title: "Web Portal",
    },
    {
        image: "/PRFBL-Website/Background/bg2.png",
        title: "Web Portal",
    },
    {
        image: "/PRFBL-Website/Background/bg3.png",
        title: "Product Gallery",
    },
    {
        image: "/PRFBL-Website/Background/bg4.png",
        title: "Product Gallery",
    },
    {
        image: "/PRFBL-Website/Background/bg5.png",
        title: "Medical Website",
    },
    {
        image: "/PRFBL-Website/Background/bg6.png",
        title: "Medical Website",
    },
    {
        image: "/PRFBL-Website/Background/bg7.png",
        title: "CMS Based",
    },
    {
        image: "/PRFBL-Website/Background/bg8.png",
        title: "CMS Based",
    },
];


const getClonedImages = () => {
    return [
        ...images.slice(-VISIBLE_COUNT), // last 4
        ...images,
        ...images.slice(0, VISIBLE_COUNT), // first 4
    ];
};

const ProjectSection = () => {
    const [index, setIndex] = useState(VISIBLE_COUNT); // Start at first real image
    const [isTransitioning, setIsTransitioning] = useState(true);
    const sliderRef = useRef(null);
    const total = images.length;
    const clonedImages = getClonedImages();

    const handleNext = () => {
        if (index < total + VISIBLE_COUNT) {
            setIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        slider.style.transition = isTransitioning
            ? "transform 0.5s ease-in-out"
            : "none";
        slider.style.transform = `translateX(-${index * CARD_WIDTH}px)`;

        // Reset to real first slide after reaching clone at end
        if (index === total + VISIBLE_COUNT) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(VISIBLE_COUNT);
            }, 500);
        }

        // Reset to real last slide after reaching clone at start
        if (index === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(total);
            }, 500);
        }

        return () => {
            setIsTransitioning(true);
        };
    }, [index]);

    return (
        <section className="w-full bg-white  flex flex-col overflow-hidden h-fit pb-8 mt-12">
            <div className="flex justify-around items-center mt-8 px-6">
                <div className="flex flex-col gap-6">
                    <span className="w-fit h-fit pl-6 relative font-medium before">
                        Quick Projects
                    </span>
                    <span className="text-4xl font-semibold">
                        Our Successful Projects
                    </span>
                </div>
                <div className="flex gap-6">
                    <button
                        onClick={handlePrev}
                        className="flex gap-2 justify-around items-center bg-purple-500 rounded-full px-8 py-4 text-white font-sans font-semibold text-md hover:bg-black duration-500"
                    >
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                        </svg>
                        PREV
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex gap-2 justify-around items-center bg-purple-500 rounded-full px-8 py-4 text-white font-sans font-semibold text-md hover:bg-black duration-500"
                    >
                        NEXT
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="mt-12 px-6 w-full max-w-[1804px] mx-auto overflow-hidden">
                <div className="flex gap-8" ref={sliderRef}>
                    {clonedImages.map((src, idx) => (
                        <div
                            key={idx}
                            className="bg-cover bg-center rounded-xl h-[500px] w-[435px] shrink-0 border p-6 group"
                            style={{ backgroundImage: `url(${src.image})` }}
                        >
                            <div className="bg-[#A855F7] h-[450px] w-[385px] rounded-xl absolute opacity-0 bg-opacity-0 transform scale-125 group-hover:scale-100 group-hover:bg-opacity-80  group-hover:opacity-100 transition-all duration-[900ms]">
                                <div className="bg-white size-12 rounded-full mx-auto mt-[60%] flex items-center cursor-pointer justify-center group-hover:grid transform scale-0 group-hover:scale-100 transition-all duration-[900ms] translate-y-12 group-hover:-translate-y-12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                        className="size-6 hover:text-blue-500 relative  "
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-8 mt-28 relative bg-opacity-0 group-hover:grid transform scale-0 group-hover:scale-100 group-hover:bg-opacity-80 transition-all duration-[900ms]">
                                    <span className="text-2xl font-medium text-white hover:text-black duration-500 cursor-pointer">
                                        {src.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
