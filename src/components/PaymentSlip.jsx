
const PaymentSlip = ({ slip }) => {
    if (!slip) {
        return (
            <div className="container mx-auto p-4 text-center text-gray-700">
                <p>No payment slip data available.</p>
            </div>
        );
    }

    // Destructure data for easier access
    const {
        paymentId,
        amount,
        razorpay_payment_id,
        user,
        mentor,
        slot,
        status,
    } = slip;

    // Format the date and time for better readability
    const formattedSlotDate = new Date(slot).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedSlotTime = new Date(slot).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    // Determine status color
    const getStatusColorClass = (currentStatus) => {
        switch (currentStatus.toLowerCase()) {
            case 'scheduled':
                return 'text-green-600 bg-green-100';
            case 'completed':
                return 'text-blue-600 bg-blue-100';
            case 'failed':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-5  px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden md:p-10 p-6">
                <header className="text-center mb-8 border-b pb-6 border-gray-200">
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Payment Receipt</h1>
                    <p className={`text-lg font-semibold px-3 py-1 rounded-full inline-block ${getStatusColorClass(status)}`}>
                        Status: {status}
                    </p>
                </header>

                {/* Payment Details Section */}
                <section className="mb-8 pb-6 border-b border-dashed border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-5 relative pl-4 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-full after:w-1.5 after:bg-blue-600 after:rounded-full">
                        Payment Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-lg">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 md:border-b-0">
                            <span className="text-md text-gray-600">Payment ID:</span>
                            <span className="text-gray-800 text-sm break-all">{paymentId}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 md:border-b-0">
                            <span className="text-md text-gray-600">Amount Paid:</span>
                            <span className="text-gray-800 font-bold text-xl">₹ {amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 md:border-b-0 col-span-full">
                            <span className="text-md text-gray-600">Transaction ID (Razorpay):</span>
                            <span className="text-gray-800 font-mono text-sm break-all">{razorpay_payment_id}</span>
                        </div>
                    </div>
                </section>

                {/* Appointment Details Section */}
                <section className="mb-8 pb-6 border-b border-dashed border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-5 relative pl-4 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-full after:w-1.5 after:bg-blue-600 after:rounded-full">
                        Appointment Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-lg">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 md:border-b-0">
                            <span className="text-md text-gray-600">Date:</span>
                            <span className="text-gray-800 text-sm font-semibold">{formattedSlotDate}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 md:border-b-0">
                            <span className="text-md text-gray-600">Time:</span>
                            <span className="text-gray-800 text-sm font-semibold">{formattedSlotTime}</span>
                        </div>
                    </div>
                </section>

                {/* User Information Section */}
                <section className="mb-8 pb-6 border-b border-dashed border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-5 relative pl-4 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-full after:w-1.5 after:bg-blue-600 after:rounded-full">
                        User Information
                    </h2>
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
                        <img
                            src={user.profilePic}
                            alt={user.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-400 mr-5 shadow-md"
                        />
                        <div>
                            <p className="text-xl font-bold text-gray-900">{user.name}</p>
                        </div>
                    </div>
                </section>

                {/* Mentor Information Section */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-800 mb-5 relative pl-4 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-full after:w-1.5 after:bg-blue-600 after:rounded-full">
                        Mentor Information
                    </h2>
                    <div className="flex items-center bg-purple-50 p-4 rounded-lg shadow-sm">
                        <img
                            src={mentor.profilePic}
                            alt={mentor.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-purple-400 mr-5 shadow-md"
                        />
                        <div>
                            <p className="text-xl font-bold text-gray-900">{mentor.name}</p>
                            <p className="text-sm text-gray-600 mt-1">{mentor.title}</p>
                        </div>
                    </div>
                </section>

                {/* Footer and Print Button */}
                <footer className="text-center pt-6 border-t border-gray-200">
                    <p className="text-lg text-gray-700 mb-6">Thank you for your payment!</p>
                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
                    >
                        Print Receipt
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PaymentSlip;