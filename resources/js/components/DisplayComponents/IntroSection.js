import React from "react";

const IntroSection = ({ message }) => {
    return (
        <div className="grid grid-cols-12 md:mt-24 px-4 lg:px-32">
            <div className="col-span-12">
                <img src="https://untitled-quiz-app-images.s3-eu-west-1.amazonaws.com/QAppDark.png" className="centered" />
            </div>
            <div className="col-span-12 my-4">
                <p className="font-bold text-lg text-primary">QuizApp is a social quiz site that lets you create, and play quizzes, challenge others to beat your scores, make friends, see what others are creating, and collaborate with friends</p>
            </div>
            <div className="col-span-12">
                <ul className="list-disc font-bold text-lg text-primary pl-6">
                    <li>Intuitive creation tools</li>
                    <li>Extensive search</li>
                    <li>Recommended quizzes</li>
                    <li>Feedback tools &#40;Likes and comments&#41;</li>
                    <li>More</li>
                </ul>
            </div>
        </div>
    );
};

export default IntroSection;
