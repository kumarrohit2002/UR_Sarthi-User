import { FaAmazon } from "react-icons/fa";
import { SiFlipkart, SiWalmart } from "react-icons/si";
import { FaLinkedin, FaCcPaypal, FaMicrosoft } from "react-icons/fa";
import Header from "../components/Header";

export const AboutSection = () => {
    const companies = [
        { name: 'Amazon', icon: <FaAmazon size={40} /> },
        { name: 'Flipkart', icon: <SiFlipkart size={40} /> },
        { name: 'Walmart', icon: <SiWalmart size={40} /> },
        { name: 'LinkedIn', icon: <FaLinkedin size={40} /> },
        { name: 'PayPal', icon: <FaCcPaypal size={40} /> },
        { name: 'Microsoft', icon: <FaMicrosoft size={40} /> }
    ];

    return (
        <div>
            <Header />
            <div className="min-h-screen mt-20 bg-white">
                <main className="text-center mt-20">
                    <h1 className="text-5xl font-bold mb-4">
                        Personalized <span className="text-blue-500">Mentorship</span>
                    </h1>
                    <h2 className="text-4xl font-bold mb-8">Every Step of the Way!</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Connect with experienced buddies for guidance and mock interviews,
                        empowering you to excel in your academic and professional endeavors.
                    </p>
                    <button className="bg-blue-900 text-white px-6 py-3 rounded-md text-lg">
                        Browse all buddies
                    </button>
                </main>

                <footer className="mt-20">
                    <p className="text-center text-gray-600 mb-4">Our Mentors come from</p>
                    <div className="flex justify-center items-center space-x-8">
                        {companies.map((company) => (
                            <div key={company.name} className="w-24 h-12 bg-gray-200 flex items-center justify-center rounded">
                                {company.icon}
                            </div>
                        ))}
                    </div>
                </footer>

                {/* New Section */}
                <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center p-4 mt-20">
                    <div className="bg-white bg-opacity-10 rounded-3xl p-8 flex flex-col md:flex-row items-center max-w-6xl">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <div className="bg-white rounded-2xl shadow-lg p-6 transform -rotate-3">
                                <div className="flex items-center mb-4">
                                    <img
                                        src="https://media.istockphoto.com/id/1317804584/photo/one-businesswoman-studio-portrait-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=Tx3nGQfxaI781gi97Siw7DIEBbKg1oBxl8n0JEwMQ6s="
                                        alt="Upasana Singh"
                                        width={50}
                                        height={50}
                                        className="rounded-full mr-4"
                                    />
                                    <div>
                                        <h3 className="font-bold">Upasana Singh</h3>
                                        <p className="text-sm text-gray-600">SDE @Flipkart</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {['Mentorship', 'Mock Interview', 'Resume Review'].map((item) => (
                                        <button
                                            key={item}
                                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 md:pl-8">
                            <h2 className="text-4xl font-bold text-white mb-4">Your buddy at your fingertips.</h2>
                            <p className="text-white mb-6">
                                Discover and schedule sessions with experienced mentors for personalized guidance and mock interviews.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {[
                                    '1-on-1 calls',
                                    'Schedule effortlessly',
                                    'Hundreds of buddies available',
                                    'Connect with your alumni',
                                    'Get personalized guidance',
                                    'High satisfaction rate'
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center">
                                        <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-white">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
                                Find your buddy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="bg-gray-100 text-gray-600 py-4 text-center mt-0">
                    <p>© 2024 Ur Sarthi. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutSection