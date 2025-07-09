import React from "react";

function Waves() {
    return (
        <div className="relative w-full">
            <svg
                id="visual"
                viewBox="0 300 900 200"
                className=""
                version="1.1"
            >
                <path
                    d="M0 434L22.8 418.8C45.7 403.7 91.3 373.3 137 375C182.7 376.7 228.3 410.3 274 433.3C319.7 456.3 365.3 468.7 411.2 451.3C457 434 503 387 548.8 367.5C594.7 348 640.3 356 686 371.5C731.7 387 777.3 410 823 410.5C868.7 411 914.3 389 937.2 378L960 367"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    stroke="#a855f7"
                    strokeWidth="3"
                ></path>
            </svg>
            <svg
                id="visual"
                viewBox="0 300 900 218"
                className="absolute top-0 left-0 w-full h-auto -z-10 bg-[#FFF7EE]"
                version="1.1"
            >
                <path
                    d="M0 372L22.8 378.7C45.7 385.3 91.3 398.7 137 400.5C182.7 402.3 228.3 392.7 274 380.7C319.7 368.7 365.3 354.3 411.2 368.5C457 382.7 503 425.3 548.8 436.5C594.7 447.7 640.3 427.3 686 428C731.7 428.7 777.3 450.3 823 449.8C868.7 449.3 914.3 426.7 937.2 415.3L960 404L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
                    stroke="#FFD6A1"
                    fill="#fff2e0"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                ></path>
            </svg>
        </div>
    );
}

export default Waves;
