import React from "react";

const IntroHeader = () => {
    return (
        <div className="grid grid-cols-12 md:mt-12 rounded px-4 lg:px-16">
            <div className="col-span-12">
                <img src="https://untitled-quiz-app-images.s3-eu-west-1.amazonaws.com/QAppDark.png" className="centered" />
            </div>
        </div>
    );
};

export default IntroHeader;
