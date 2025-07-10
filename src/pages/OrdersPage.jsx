import { 
    CheckCircle, 
    Clock, 
    DollarSign, 
    ShoppingBag, 
    CreditCard,
    Smartphone,
    Receipt,
    AlertTriangle,
    Calendar,
    Filter,
    Search,
    Download,
    Send,
    Printer,
    Eye,
    X
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";

const emiStats = {
    totalEMIsToday: "127",
    overdueEMIs: "43",
    collectedToday: "₹2,45,680",
    totalOutstanding: "₹8,92,340",
    missedPayments: "23",
    collectionRate: "87.5%"
};

const EMIDueList = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [generatedReceipt, setGeneratedReceipt] = useState(null);

    const emiDueData = [
        {
            id: 1,
            customerName: "Rajesh Kumar",
            groupName: "Self Help Group A",
            loanId: "LN001",
            emiAmount: 2500,
            dueDate: "2025-07-10",
            status: "due",
            phoneNumber: "+91 9876543210",
            daysOverdue: 0,
            installmentNumber: "5/12"
        },
        {
            id: 2,
            customerName: "Priya Sharma",
            groupName: "Women Collective B",
            loanId: "LN002",
            emiAmount: 1800,
            dueDate: "2025-07-09",
            status: "overdue",
            phoneNumber: "+91 9876543211",
            daysOverdue: 1,
            installmentNumber: "3/6"
        },
        {
            id: 3,
            customerName: "Amit Patel",
            groupName: "Farmers Group C",
            loanId: "LN003",
            emiAmount: 3200,
            dueDate: "2025-07-08",
            status: "paid",
            phoneNumber: "+91 9876543212",
            daysOverdue: 0,
            installmentNumber: "8/24",
            paidDate: "2025-07-08",
            paymentMethod: "UPI"
        },
        {
            id: 4,
            customerName: "Sunita Devi",
            groupName: "Micro Finance D",
            loanId: "LN004",
            emiAmount: 1500,
            dueDate: "2025-07-07",
            status: "overdue",
            phoneNumber: "+91 9876543213",
            daysOverdue: 3,
            installmentNumber: "2/12"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'overdue': return 'bg-red-100 text-red-800';
            case 'due': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
            case 'due': return <Clock className="h-4 w-4 text-yellow-500" />;
            default: return null;
        }
    };

    const handlePayment = (emi) => {
        setSelectedPayment(emi);
        setPaymentAmount(emi.emiAmount.toString());
        setShowPaymentModal(true);
    };

    const processPayment = () => {
        const receipt = {
            receiptId: `RCP${Date.now()}`,
            customerName: selectedPayment.customerName,
            loanId: selectedPayment.loanId,
            amount: paymentAmount,
            paymentMethod: paymentMethod,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            collectorName: "Admin User"
        };
        
        setGeneratedReceipt(receipt);
        setShowPaymentModal(false);
        setShowReceiptModal(true);
        
        // Update EMI status to paid (in real app, this would be an API call)
        console.log('Payment processed:', receipt);
    };

    const sendSMSReceipt = () => {
        alert(`SMS receipt sent to ${selectedPayment.phoneNumber}`);
    };

    const printReceipt = () => {
        window.print();
    };

    const filteredEMIs = emiDueData.filter(emi => 
        emi.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emi.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emi.groupName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-semibold text-gray-100">EMI Due List & Collection</h2>
                
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    {/* Period Filter */}
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="today">Today</option>
                        <option value="weekly">This Week</option>
                        <option value="monthly">This Month</option>
                    </select>
                    
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search customer, loan ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* EMI List Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Group</th>
                            <th className="px-6 py-3">Loan ID</th>
                            <th className="px-6 py-3">EMI Amount</th>
                            <th className="px-6 py-3">Due Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Installment</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEMIs.map((emi) => (
                            <tr key={emi.id} className="bg-gray-800 border-b border-gray-700">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-gray-100">{emi.customerName}</div>
                                        <div className="text-sm text-gray-400">{emi.phoneNumber}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{emi.groupName}</td>
                                <td className="px-6 py-4 text-gray-300">{emi.loanId}</td>
                                <td className="px-6 py-4 font-medium text-gray-100">₹{emi.emiAmount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-300">{emi.dueDate}</div>
                                    {emi.daysOverdue > 0 && (
                                        <div className="text-red-400 text-xs">{emi.daysOverdue} days overdue</div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(emi.status)}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(emi.status)}`}>
                                            {emi.status.charAt(0).toUpperCase() + emi.status.slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{emi.installmentNumber}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        {emi.status !== 'paid' && (
                                            <button
                                                onClick={() => handlePayment(emi)}
                                                className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                                            >
                                                Collect
                                            </button>
                                        )}
                                        <button className="text-blue-400 hover:text-blue-300 p-1">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-100">Process Payment</h3>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="text-gray-400 hover:text-gray-300"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Customer</label>
                                <p className="text-gray-100">{selectedPayment?.customerName}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">EMI Amount</label>
                                <input
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="cash"
                                            checked={paymentMethod === 'cash'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        <span className="text-gray-300">Cash</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                        <Smartphone className="h-4 w-4 mr-1" />
                                        <span className="text-gray-300">UPI</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex space-x-3 pt-4">
                                <button
                                    onClick={processPayment}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Process Payment
                                </button>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Receipt Modal */}
            {showReceiptModal && generatedReceipt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md text-black">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-bold">Payment Receipt</h3>
                            <p className="text-sm text-gray-600">Receipt ID: {generatedReceipt.receiptId}</p>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Customer:</span>
                                <span className="font-medium">{generatedReceipt.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Loan ID:</span>
                                <span className="font-medium">{generatedReceipt.loanId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount:</span>
                                <span className="font-medium">₹{generatedReceipt.amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment Method:</span>
                                <span className="font-medium">{generatedReceipt.paymentMethod.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Date & Time:</span>
                                <span className="font-medium">{generatedReceipt.date} {generatedReceipt.time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Collected By:</span>
                                <span className="font-medium">{generatedReceipt.collectorName}</span>
                            </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-6">
                            <button
                                onClick={sendSMSReceipt}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Send SMS
                            </button>
                            <button
                                onClick={printReceipt}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                            >
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                            </button>
                            <button
                                onClick={() => setShowReceiptModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const MissedPaymentTracker = () => {
    const missedPayments = [
        {
            id: 1,
            customerName: "Ravi Singh",
            loanId: "LN005",
            missedAmount: 2200,
            daysMissed: 15,
            lastPaymentDate: "2025-06-25",
            phoneNumber: "+91 9876543214",
            totalMissed: 2
        },
        {
            id: 2,
            customerName: "Meera Joshi",
            loanId: "LN006",
            missedAmount: 1800,
            daysMissed: 8,
            lastPaymentDate: "2025-07-02",
            phoneNumber: "+91 9876543215",
            totalMissed: 1
        }
    ];

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-6">Missed Payments Tracker</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Loan ID</th>
                            <th className="px-6 py-3">Missed Amount</th>
                            <th className="px-6 py-3">Days Missed</th>
                            <th className="px-6 py-3">Last Payment</th>
                            <th className="px-6 py-3">Total Missed</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missedPayments.map((payment) => (
                            <tr key={payment.id} className="bg-gray-800 border-b border-gray-700">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-gray-100">{payment.customerName}</div>
                                        <div className="text-sm text-gray-400">{payment.phoneNumber}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{payment.loanId}</td>
                                <td className="px-6 py-4 font-medium text-red-400">₹{payment.missedAmount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-red-400">{payment.daysMissed} days</td>
                                <td className="px-6 py-4 text-gray-300">{payment.lastPaymentDate}</td>
                                <td className="px-6 py-4 text-gray-300">{payment.totalMissed}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors">
                                            Follow Up
                                        </button>
                                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                                            Call
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

const EMICollectionPage = () => {
    return (
        <div className='flex-1 relative z-10 overflow-auto'>
            <Header title={"EMI Collection Management"} />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* ENHANCED EMI STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard 
                        name='EMIs Due Today' 
                        icon={Calendar} 
                        value={emiStats.totalEMIsToday} 
                        color='#6366F1' 
                    />
                    <StatCard 
                        name='Overdue EMIs' 
                        icon={AlertTriangle} 
                        value={emiStats.overdueEMIs} 
                        color='#EF4444' 
                    />
                    <StatCard 
                        name='Collected Today' 
                        icon={DollarSign} 
                        value={emiStats.collectedToday} 
                        color='#10B981' 
                    />
                    <StatCard
                        name='Total Outstanding'
                        icon={CreditCard}
                        value={emiStats.totalOutstanding}
                        color='#F59E0B'
                    />
                    <StatCard
                        name='Missed Payments'
                        icon={X}
                        value={emiStats.missedPayments}
                        color='#EF4444'
                    />
                    <StatCard
                        name='Collection Rate'
                        icon={CheckCircle}
                        value={emiStats.collectionRate}
                        color='#10B981'
                    />
                </motion.div>

                {/* EMI DUE LIST & COLLECTION */}
                <EMIDueList />

                {/* MISSED PAYMENTS TRACKER */}
                <MissedPaymentTracker />

                {/* EXISTING CHARTS */}
                

                
            </main>
        </div>
    );
};

export default EMICollectionPage;
