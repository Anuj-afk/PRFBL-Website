import React from "react";

function CompanySection() {
    const images = [
        {
            image: "/PRFBL-Website/CompanyLogo/logo1.png",
        },
        {
            image: "/PRFBL-Website/CompanyLogo/logo2.png",
        },
        {
            image: "/PRFBL-Website/CompanyLogo/logo3.png",
        },
        {
            image: "/PRFBL-Website/CompanyLogo/logo4.png",
        },
        {
            image: "/PRFBL-Website/CompanyLogo/logo5.png",
        },
        {
            image: "/PRFBL-Website/CompanyLogo/logo6.png",
        },
        {
            image: "/PRFBL-Website/CompanyLogo/logo7.png",
        },
        {
            image: "/PRFBL-Website/CompanyLogo/logo8.png",
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-4 overflow-hidden justify-center items-center">
                <span className="before after pl-6 relative w-fit ">
                    BRAND WE WORK WITH
                </span>
                <span className=" text-4xl font-semibold ">
                    Trusted by thousands Business
                </span>
            </div>
            <div className="overflow-hidden w-full h-fit flex bg-gray-50 mt-12">
                <div className="flex animate-marquee w-[200%]">
                    <div className="flex w-1/2 gap-16">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="w-[300px] h-[175px] flex justify-center p-8  group"
                            >
                                <img
                                    src={img.image}
                                    alt=""
                                    className=" group-hover:[filter:grayscale(70%)] "
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex w-1/2 gap-16">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="w-[300px] h-[175px] flex justify-center p-8  group"
                            >
                                <img
                                    src={img.image}
                                    alt=""
                                    className=" group-hover:[filter:grayscale(70%)] "
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="overflow-hidden w-full h-fit flex bg-gray-50">
                <div className="flex animate-marquee_reverse w-[200%]">
                    <div className="flex w-1/2 gap-16">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="w-[300px] h-[175px] flex justify-center p-8  group"
                            >
                                <img
                                    src={img.image}
                                    alt=""
                                    className=" group-hover:[filter:grayscale(70%)] "
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex w-1/2 gap-16">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="w-[300px] h-[175px] flex justify-center p-8  group"
                            >
                                <img
                                    src={img.image}
                                    alt=""
                                    className=" group-hover:[filter:grayscale(70%)] "
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanySection;
