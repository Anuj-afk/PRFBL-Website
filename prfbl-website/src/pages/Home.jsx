import React, { useEffect, useState } from "react";

import Waves from "../componets/Ui/waves";
import String from "../componets/Ui/Image";
import Navbar from "../componets/Ui/Navbar";
import ServicesCard from "../componets/ServicesCard";
import ProjectSection from "../componets/ProjectSection";
import CompanySection from "../componets/CompanySection";
import Logo from "../assets/WhiteLogo.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Loader from "../componets/Ui/Loader";

let slides = [];
let services = [];
let projects = []

function Home() {
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const getContent = async () => {
        setLoading(true);
        await axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/pages/home")
            .then((request) => {
                console.log(request);
                for (let i = 0; i < request.data.sections.length; i++) {
                    if (
                        request.data.sections[i].order == 0 &&
                        request.data.sections[i].type == "hero"
                    ) {
                        slides = request.data.sections[i].content.slides;
                    }
                    if (
                        request.data.sections[i].order == 1 &&
                        request.data.sections[i].type == "services"
                    ) {
                        services = request.data.sections[i].content.items;
                    }
                    if (
                        request.data.sections[i].order == 2 &&
                        request.data.sections[i].type == "project"
                    ) {
                        projects = request.data.sections[i].content.images;
                    }
                }
            });
        setLoading(false);
    };
    useEffect(() => {
        getContent();
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden">
            {loading ? (
                <Loader></Loader>
            ) : (
                <>
                    <div className="h-[70%]">
                        <div
                            className="absolute inset-0 -z-20"
                            style={{
                                background:
                                    "linear-gradient(to top right, #FFF7EE 0%, #FFF7EE 70%, #FFD6A1 100%)",
                            }}
                        />
                        <Navbar></Navbar>
                    </div>
                    <section className="w-screen h-[700px] relative flex items-center z-10 overflow-hidden">
                        {slides.map((slide, i) => (
                            <div
                                key={i}
                                className={`absolute top-0 left-0 ml-28 w-full h-full flex items-center transition-all duration-1000 ease-in-out
        ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                            >
                                {/* Left text content */}
                                <div className="w-1/2 h-full flex flex-col justify-center gap-6 px-16">
                                    <div>
                                        <span className="relative pl-6 text-sm  uppercase tracking-wide before after ">
                                            Welcome To PRFBL
                                        </span>
                                    </div>
                                    <div className="font-semibold text-left">
                                        <h2 className="text-5xl md:text-6xl leading-tight">
                                            {slide.text}
                                            <br></br>
                                            {slide.br}
                                            <span className="text-purple-500">
                                                {slide.highlight}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="mt-6">
                                        <button className="bg-purple-500 hover:bg-black transition-all duration-500 text-white px-8 py-4 rounded-full text-sm font-semibold">
                                            Discover More
                                        </button>
                                    </div>
                                </div>

                                {/* Right blob image */}
                                <div className="w-1/2 h-full flex items-center justify-center">
                                    <String imageSrc={slides[index].image} />
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="w-screen">
                        <Waves></Waves>
                    </section>
                    <section className="bg-[#fff2e0] h-fit z-10 pb-20 flex flex-col gap-36">
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <span className="before after text-sm font-[500] relative w-fit pl-6">
                                OUR SERVICES
                            </span>
                            <span className="text-4xl w-fit h-fit px-1 font-semibold">
                                Service We Provide
                            </span>
                            <span className="text-[#7c7e87]">
                                ux/ui design / mobile app / branding /
                                development / digital marketing
                            </span>
                            <div className="overflow-hidden w-full h-fit">
                                <div className="flex animate-marquee w-[200%]">
                                    <div className="flex w-1/2 gap-16">
                                        {services.map((service, i) => (
                                            <ServicesCard
                                                service={service}
                                            ></ServicesCard>
                                        ))}
                                    </div>

                                    <div className="flex w-1/2 gap-16">
                                        {services.map((service, i) => (
                                            <ServicesCard
                                                service={service}
                                            ></ServicesCard>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center px-32">
                            <span className="before after text-sm font-[500] relative w-fit pl-6">
                                What We Do
                            </span>
                            <span className="text-4xl w-fit h-fit px-1 font-semibold">
                                PRFBL Technologies
                            </span>
                            <div className=" flex w-full justify-around mt-4">
                                <span className="text-[#7c7e87] w-[40%] text-center">
                                    We are a tech-creative digital growth
                                    marketing agency, made up of talented growth
                                    hackers, CRO experts, engineers, digital
                                    marketing and advertising strategists who
                                    are dedicated to change this industry, and
                                    helping businesses convert leads into sales
                                    through the most innovative techniques
                                    available today.
                                </span>
                                <span className="text-[#7c7e87] w-[40%] text-center">
                                    Our team is constantly learning, in search
                                    of big ideas and never resting on what’s
                                    been done in the past. We seek out
                                    creativity and innovation.
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="w-full h-48 bg-[#A855F7] flex justify-around items-center">
                        <div className="text-white flex flex-col gap-6">
                            <span className="text-4xl">
                                Let’s talk about it
                            </span>
                            <span className="text-sm text-[#FFF7EE]">
                                We will collaborate to find the right solution
                                and drive progress for your business and the
                                world.
                            </span>
                        </div>
                        <div>
                            <button className="bg-[#FFAF47] rounded-full w-fit px-8 h-fit py-4 text-white font-sans font-semibold text-sm hover:bg-black duration-500">
                                Get In Touch
                            </button>
                        </div>
                    </section>
                    <ProjectSection  projects={projects}></ProjectSection>
                    <section className="flex flex-col items-center w-full h-fit overflow-hidden my-8">
                        <CompanySection></CompanySection>
                    </section>
                    <section className="h-fit w-full bg-black mt-24">
                        <div className="flex justify-center items-center gap-56 h-fit p-12 w-full text-white border-b border-gray-500">
                            <div className="h-full w-fit flex flex-col gap-8 items-center justify-center">
                                <span className="font-medium mb-2 text-left text-lg">
                                    Lets Connect And Create
                                </span>
                                <img src={Logo} alt="" className="w-64" />
                                <div className="flex gap-6 w-fit h-fit justify-center items-center">
                                    <i className="fi fi-brands-facebook hover:text-blue-500 hover:bg-white text-2xl bg-gray-500 w-10 h-10 items-center rounded-full flex justify-center"></i>
                                    <i className="fi fi-brands-instagram hover:text-blue-500 hover:bg-white text-2xl bg-gray-500 w-10 h-10 items-center rounded-full flex justify-center "></i>
                                    <i className="fi fi-brands-twitter-alt hover:text-blue-500 hover:bg-white text-2xl bg-gray-500 w-10 h-10 items-center rounded-full flex justify-center"></i>
                                </div>
                            </div>
                            <div className="h-full w-fit flex flex-col gap-8  justify-center text-left">
                                <span className="font-medium mb-2 text-left text-2xl">
                                    Link
                                </span>
                                <div className=" flex flex-col gap-2">
                                    <Link className="text-gray-400 hover:text-white">
                                        Home
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        About Us
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        Our Portfolio
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        Services
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                            <div className="h-full w-fit flex flex-col gap-8  justify-center text-left">
                                <span className="font-medium mb-2 text-left text-2xl">
                                    Explore
                                </span>
                                <div className=" flex flex-col gap-2">
                                    <Link className="text-gray-400 hover:text-white">
                                        What we Offer
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        Offer
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        Our Story
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        Latest Posts
                                    </Link>
                                    <Link className="text-gray-400 hover:text-white">
                                        Help Center
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="h-[205px] w-full text-white flex justify-center border-b border-gray-500">
                            <div className="flex gap-4 items-center justify-center border-r h-full border-gray-500 p-16">
                                <div>
                                    <i className="fi fi-ts-marker text-4xl bg-gray-500 w-20 h-20 items-center rounded-full flex justify-center"></i>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="font-medium">
                                        Location
                                    </span>
                                    <span className="text-gray-400">
                                        A-24/9, <br /> Mohan Co-operative
                                        Industrial Estate,
                                        <br></br>
                                        New Delhi - 110044
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center justify-center border-r h-full border-gray-500 p-16">
                                <div>
                                    <i className="fi fi-rr-clock text-4xl bg-gray-500 w-20 h-20 items-center rounded-full flex justify-center"></i>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="font-medium">
                                        Working Hours
                                    </span>
                                    <span className="text-gray-400">
                                        Weekdays 8am-22pm <br />
                                        Weekend 10am -12pm
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center justify-center p-16">
                                <div>
                                    <i className="fi fi-rr-phone-call text-4xl bg-gray-500 w-20 h-20 items-center rounded-full flex justify-center"></i>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="font-medium">
                                        Contact Us
                                    </span>
                                    <span className="text-gray-400">
                                        info@prfbl.com <br />
                                        8287459985
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit p-4 w-full text-gray-400 flex justify-center items-center">
                            <span>
                                © Copyright 2025 PRFBL Technologies Pvt. Ltd.
                                All Rights Reserved.
                            </span>
                        </div>
                    </section>
                    <div className="w-20 h-8 bg-[#FFA733] right-0 top-1/2 fixed z-20 flex items-center justify-start p-2 cursor-pointer hover:w-32 duration-200">
                        <span className="text-white font-medium">Enquiry</span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
