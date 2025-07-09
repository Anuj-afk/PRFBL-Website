import React from "react";
import Placeholder from "../../assets/Placeholder.png";


function String({imageSrc}) {
    console.log(imageSrc)
    return (
        <div className={`items-center flex justify-center`}>
            <svg viewBox="0 0 900 600" width="900" height="600" className="">
                <defs>
                    <clipPath id="blobClip">
                        <path
                            d="M190.3 104.4C137 202.2 -91.3 193.4 -152.2 91.2C-213.1 -10.9 -106.6 -206.5 7.6 -202.1C121.8 -197.7 243.6 6.6 190.3 104.4"
                            transform="translate(422.5 310.65)"
                        />
                    </clipPath>
                </defs>
                {/* <path
                            d="M260,304 C100,47 500,5 550,200"
                            stroke="#c5c5ff"
                            strokeWidth="2"
                            fill="none"
                        /> */}
                {/* <path
                            d="M260,304 C200,47 720,5 600,304"
                            stroke="#a0a0ff"
                            strokeWidth="2"
                            fill="none"
                        /> */}
                {/* <path
                            d="M260,304 C250,100 540,-140 600,304"
                            stroke="#a0a0ff"
                            strokeWidth="2"
                            fill="none"
                        /> */}
                {/* <path
                            d="M300,270 C200,-70 800,80 550,400"
                            stroke="#c5c5ff"
                            strokeWidth="2"
                            fill="none"
                        /> */}
                {/* <path
                            d="M300,270 C250,-80 900,200 550,400"
                            stroke="#c5c5ff"
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            d="M259,300 C290,-0 800,-100 550,400"
                            stroke="#c5c5ff"
                            strokeWidth="2"
                            fill="none"
                        /> */}

                <path fill="none" stroke="#ffd393" strokeWidth="2">
                    <animate
                        attributeName="d"
                        dur="6s"
                        repeatCount="indefinite"
                        values="
            M300,270 C200,-70 800,80 550,400;
            M300,270 C250,-80 900,200 550,400;
            M259,300 C290,-0 800,-100 550,400;
            M300,270 C200,-70 800,80 550,400"
                    />
                </path>
                <path fill="none" stroke="#6c6cff" strokeWidth="2">
                    <animate
                        attributeName="d"
                        dur="6s"
                        repeatCount="indefinite"
                        values="
            M260,304 C100,47 500,5 550,200;
            M260,304 C200,47 720,5 600,304;
            M260,304 C250,100 540,-140 600,304;
            M260,304 C100,47 500,5 550,200"
                    />
                </path>
                <image
                    href={imageSrc}
                    clipPath="url(#blobClip)"
                    x="200"
                    y="100"
                    width="500"
                    height="400"
                    
                    preserveAspectRatio="xMidYMid meet"
                />
            </svg>
        </div>
    );
}

export default String;
