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
            <div className="w-[1200px] h-[350px] flex flex-wrap ">
                {images.map((img, idx) => (
                    <div key={idx} className="w-[299px] h-[175px] flex justify-center p-8 border group">
                        <img
                            src={img.image}
                            alt=""
                            className=" group-hover:[filter:grayscale(70%)] "
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default CompanySection;
