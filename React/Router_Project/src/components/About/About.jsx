import React from 'react'

export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                            alt="About illustration"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12 text-left">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            About This Project
                        </h2>
                        <p className="mt-6 text-gray-600">
                            This is a multi-page React app built to practise React Router. The header
                            and footer stay the same on every page, and only the content in between
                            changes when you navigate.
                        </p>
                        <p className="mt-4 text-gray-600">
                            It uses nested routes, a shared layout with <code>Outlet</code>, active
                            links with <code>NavLink</code>, and a page that loads live data from the
                            GitHub API.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
