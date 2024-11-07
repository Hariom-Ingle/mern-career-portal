 
import React, { useEffect, useRef, useState } from 'react';

const HeroCompaniesSection = () => {
    const [bannerOpen, setBannerOpen] = useState(true);
    const logosRef = useRef(null);

    useEffect(() => {
        if (logosRef.current) {
            const ul = logosRef.current;
            const clonedUl = ul.cloneNode(true);
            clonedUl.setAttribute('aria-hidden', 'true');
            ul.parentNode.appendChild(clonedUl);
        }
    }, []);

    return (
        <div className="relative font-inter antialiased">
            <main className="relative min-h-screen flex flex-col justify-center  overflow-hidden">
                <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-24">
                    <div className="text-center">
                        {/* Logo Carousel animation */}
                        <div className="w-full inline-flex flex-nowrap overflow-hidden  ">
                            <ul ref={logosRef} className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg" alt="Facebook" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/disney.svg" alt="Disney" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg" alt="Airbnb" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/apple.svg" alt="Apple" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/spark.svg" alt="Spark" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg" alt="Samsung" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/quora.svg" alt="Quora" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/sass.svg" alt="Sass" />
                                </li>
                            </ul>
                        </div>
                        {/* End: Logo Carousel animation */}
                    </div>
                </div>
            </main>

            {/* Page footer */}
            <footer className="absolute left-6 right-6 md:left-12 md:right-auto bottom-4 md:bottom-8 text-center md:text-left">
                <a className="text-xs text-slate-500 hover:underline" href="https://cruip.com">
                    &copy;Cruip - Tailwind CSS templates
                </a>
            </footer>

            {/* Banner with links */}
            <div className={`fixed bottom-0 right-0 w-full md:bottom-6 md:right-12 md:w-auto z-50 ${bannerOpen ? '' : 'hidden'}`}>
                <div className="bg-slate-800 text-sm p-3 md:rounded shadow flex justify-between">
                    <div className="text-slate-500 inline-flex">
                        <a className="font-medium hover:underline text-slate-300" href="https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/" target="_blank" rel="noreferrer">
                            Read Tutorial
                        </a>
                        <span className="italic px-1.5">or</span>
                        <a className="font-medium hover:underline text-indigo-500 flex items-center" href="https://github.com/cruip/cruip-tutorials/blob/main/logo-carousel/index.html" target="_blank" rel="noreferrer">
                            <span>Download</span>
                            <svg className="fill-indigo-400 ml-1" xmlns="http://www.w3.org/2000/svg" width="9" height="9">
                                <path d="m1.649 8.514-.91-.915 5.514-5.523H2.027l.01-1.258h6.388v6.394H7.158l.01-4.226z" />
                            </svg>
                        </a>
                    </div>
                    <button className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-slate-700" onClick={() => setBannerOpen(false)}>
                        <span className="sr-only">Close</span>
                        <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 16 16">
                            <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroCompaniesSection;
