import React from "react";
import { Link } from "react-router-dom";
import IntroHeader from "../DisplayComponents/IntroHeader";
import IntroSection from "../DisplayComponents/IntroSection";

const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                        <IntroHeader />
                    </div>
                    <div className="col-span-12">
                        <IntroSection />
                    </div>
                    <div className="col-span-12 md:col-span-6 m-4 overflow-hidden shadow card border-l-8 border-primary rounded p-2">
                        <h3 className="text-primary text-xl font-bold">Quizzes</h3>
                        <p>Play, create, edit. All quizzes are user created with a suite of quiz creation tools to create exactly what you want.</p>
                    </div>
                    <div className="col-span-12 md:col-span-6 m-4 overflow-hidden shadow card border-l-8 border-primary rounded p-2">
                        <h3 className="text-primary text-xl font-bold">Explore</h3>
                        <p>We have several search / recommendation features to find the perfect quiz for you. Use our explore page to find what you want, or take our word for it with QApp recommended quizzes.</p>
                    </div>
                    <div className="col-span-12 md:col-span-6 m-4 overflow-hidden shadow card border-l-8 border-primary rounded p-2">
                        <h3 className="text-primary text-xl font-bold">Leaderboards</h3>
                        <p>Aim for the top with individual quiz leaderboards on quiz pages, also see all your and your friends highest scores on profile pages.</p>
                    </div>
                    <div className="col-span-12 md:col-span-6 m-4 overflow-hidden shadow card border-l-8 border-primary rounded p-2">
                        <h3 className="text-primary text-xl font-bold">Friends</h3>
                        <p>Add friends, see what your friends have created, beat your friends scores, collaborate with friends with collaborative quiz creation. You can also follow users which allows you to see quizzes from your favourite creators on your dashboard.</p>
                    </div>
                    <div className="col-span-12 md:col-span-6 m-4 overflow-hidden shadow card border-l-8 border-primary rounded p-2">
                        <h3 className="text-primary text-xl font-bold">Challenges</h3>
                        <p>Challange your friends to beat your scores, and respond to their challenges to you. Score points by winning the challanges and see your rank on our challenge leaderboard.</p>
                    </div>
                    <div className="col-span-12 md:col-span-6 m-4 overflow-hidden shadow card border-l-8 border-primary rounded p-2">
                        <h3 className="text-primary text-xl font-bold">Events</h3>
                        <p>Compete with others to win limited edition trophies on your profile, periodically events will be added covering some or all categories, complete quizzes in the categories to earn points on the event leaderboard.</p>
                    </div>
                </div>
                <div className="col-span-12 px-4 text-center my-8">
                    <Link className="border border-primary text-primary rounded py-2 font-bold px-4 hover:border-secondary hover:text-secondary hover:opacity-75 shadow text-xl" to={`/register`}>Register now</Link>
                </div>
        </div>
    );
};

export default AboutPage;
