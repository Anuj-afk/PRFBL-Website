import React from "react";

import Waves from "../componets/Ui/waves";
import String from "../componets/Ui/Image";
import Navbar from "../componets/Ui/Navbar";
import ServicesCard from "../componets/ServicesCard";
import ProjectSection from "../componets/ProjectSection";
import CompanySection from "../componets/CompanySection";

function Home() {
    return (
        <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden">
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
            <section className="w-screen h-full flex items-center z-10">
                <div className=" w-[50%] h-full items-end flex justify-center flex-col gap-4">
                    <div className="w-full pl-[40%] text-left">
                        <span className="relative pl-6 before after">
                            Welcome To PRFBL
                        </span>
                    </div>
                    <div className="flex flex-col w-full pl-[40%] text-left font-semibold">
                        <span className="text-6xl">Where Ideas </span>
                        <span className="text-6xl flex flex-row gap-4">
                            {" "}
                            Become{" "}
                            <span className="text-purple-500"> Interfaces</span>
                        </span>
                    </div>
                    <div className="w-full pl-[40%] flex items-center mt-8">
                        <button className="bg-purple-500 rounded-full w-fit px-8 h-fit py-4 text-white font-sans font-semibold text-sm hover:bg-black duration-500">
                            Discover More
                        </button>
                    </div>
                </div>
                <String></String>
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
                        ux/ui design / mobile app / branding / development /
                        digital marketing
                    </span>
                    <div className="flex flex-row h-fit w-full items-center justify-center mt-16 gap-12">
                        <ServicesCard></ServicesCard>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center px-32">
                    <span className="before after text-sm font-[500] relative w-fit pl-6">
                        What We Do
                    </span>
                    <span className="text-4xl w-fit h-fit px-1 font-semibold">
                        PRFBL Technologies
                    </span>
                    <span className="text-[#7c7e87] w-[40%] text-center">
                        We are a tech-creative digital growth marketing agency,
                        made up of talented growth hackers, CRO experts,
                        engineers, digital marketing and advertising strategists
                        who are dedicated to change this industry, and helping
                        businesses convert leads into sales through the most
                        innovative techniques available today.
                    </span>
                    <span className="text-[#7c7e87] w-[40%] text-center">
                        Our team is constantly learning, in search of big ideas
                        and never resting on what’s been done in the past. We
                        seek out creativity and innovation.
                    </span>
                </div>
            </section>
            <section className="w-full h-48 bg-[#A855F7] flex justify-around items-center">
                <div className="text-white flex flex-col gap-6">
                    <span className="text-4xl">Let’s talk about it</span>
                    <span className="text-sm text-[#FFF7EE]">
                        We will collaborate to find the right solution and drive
                        progress for your business and the world.
                    </span>
                </div>
                <div>
                    <button className="bg-[#FFAF47] rounded-full w-fit px-8 h-fit py-4 text-white font-sans font-semibold text-sm hover:bg-black duration-500">
                        Get In Touch
                    </button>
                </div>
            </section>
            <ProjectSection></ProjectSection>
            <section className="flex flex-col items-center w-full h-fit gap-12 overflow-hidden my-8">
                <CompanySection></CompanySection>
            </section>
            <section className="h-[735px] w-full bg-black mt-24">
                <div>

                </div>
                <div>

                </div>
            </section>
        </div>
    );
}

export default Home;
