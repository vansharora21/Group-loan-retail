import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { 
    Wallet, 
    Download, 
    Calendar, 
    TrendingUp, 
    CreditCard, 
    Plus,
    Search,
    Filter,
    Eye,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    Banknote,
    RefreshCw,
    CheckCircle,
    Clock,
    AlertTriangle,
    Building2,
    Smartphone
} from "lucide-react";
import { useState } from "react";

const WalletCommission = () => {
    const [activeTab, setActiveTab] = useState("earnings");
    const [dateRange, setDateRange] = useState("last7days");
    const [showTopupModal, setShowTopupModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [topupAmount, setTopupAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const tabs = [
        { id: "earnings", label: "Transaction Earnings", icon: TrendingUp },
        { id: "topup", label: "Wallet Top-up", icon: Plus },
        { id: "commission", label: "Commission History", icon: DollarSign },
        { id: "withdraw", label: "Bank Withdrawals", icon: Building2 }
    ];

    // Wallet Statistics
    const walletStats = {
        currentBalance: 45680,
        totalEarnings: 125340,
        pendingCommission: 8750,
        totalWithdrawn: 89500,
        todayEarnings: 2340,
        monthlyEarnings: 18750
    };

    // Transaction Earnings Data
    const earningsData = [
        {
            id: "TXN001",
            transactionType: "EMI Collection",
            customerName: "Rajesh Kumar",
            amount: 3000,
            commission: 150,
            commissionRate: "5%",
            date: "2025-07-10",
            time: "14:30",
            status: "Completed",
            groupName: "Self Help Group A"
        },
        {
            id: "TXN002",
            transactionType: "Loan Disbursement",
            customerName: "Priya Sharma",
            amount: 50000,
            commission: 2500,
            commissionRate: "5%",
            date: "2025-07-10",
            time: "12:15",
            status: "Completed",
            groupName: "Women Collective B"
        },
        {
            id: "TXN003",
            transactionType: "EMI Collection",
            customerName: "Amit Patel",
            amount: 4500,
            commission: 225,
            commissionRate: "5%",
            date: "2025-07-09",
            time: "16:45",
            status: "Completed",
            groupName: "Farmers Group C"
        },
        {
            id: "TXN004",
            transactionType: "Late Fee Collection",
            customerName: "Sunita Devi",
            amount: 500,
            commission: 50,
            commissionRate: "10%",
            date: "2025-07-09",
            time: "11:20",
            status: "Pending",
            groupName: "Micro Finance D"
        }
    ];

    // Commission History Data
    const commissionHistory = [
        {
            id: "COM001",
            period: "July 2025 - Week 2",
            totalTransactions: 45,
            totalAmount: 187500,
            commissionEarned: 9375,
            status: "Paid",
            paidDate: "2025-07-08",
            paymentMethod: "Bank Transfer"
        },
        {
            id: "COM002",
            period: "July 2025 - Week 1",
            totalTransactions: 38,
            totalAmount: 156000,
            commissionEarned: 7800,
            status: "Paid",
            paidDate: "2025-07-01",
            paymentMethod: "Bank Transfer"
        },
        {
            id: "COM003",
            period: "June 2025 - Week 4",
            totalTransactions: 52,
            totalAmount: 234000,
            commissionEarned: 11700,
            status: "Paid",
            paidDate: "2025-06-24",
            paymentMethod: "Bank Transfer"
        },
        {
            id: "COM004",
            period: "June 2025 - Week 3",
            totalTransactions: 41,
            totalAmount: 178500,
            commissionEarned: 8925,
            status: "Processing",
            paidDate: null,
            paymentMethod: null
        }
    ];

    // Withdrawal History Data
    const withdrawalHistory = [
        {
            id: "WTH001",
            amount: 15000,
            bankAccount: "HDFC Bank - ****4567",
            requestDate: "2025-07-08",
            processedDate: "2025-07-09",
            status: "Completed",
            transactionId: "TXN789456123",
            charges: 25
        },
        {
            id: "WTH002",
            amount: 20000,
            bankAccount: "SBI Bank - ****8901",
            requestDate: "2025-07-05",
            processedDate: "2025-07-06",
            status: "Completed",
            transactionId: "TXN456789012",
            charges: 25
        },
        {
            id: "WTH003",
            amount: 12500,
            bankAccount: "HDFC Bank - ****4567",
            requestDate: "2025-07-10",
            processedDate: null,
            status: "Processing",
            transactionId: null,
            charges: 25
        }
    ];

    const handleTopupRequest = () => {
        alert(`Wallet top-up request of ₹${topupAmount} submitted successfully!`);
        setShowTopupModal(false);
        setTopupAmount('');
    };

    const handleWithdrawRequest = () => {
        alert(`Withdrawal request of ₹${withdrawAmount} submitted successfully!`);
        setShowWithdrawModal(false);
        setWithdrawAmount('');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': case 'Paid': return 'bg-green-900 text-green-300';
            case 'Processing': case 'Pending': return 'bg-yellow-900 text-yellow-300';
            case 'Failed': case 'Rejected': return 'bg-red-900 text-red-300';
            default: return 'bg-gray-900 text-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': case 'Paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'Processing': case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'Failed': case 'Rejected': return <AlertTriangle className="h-4 w-4 text-red-500" />;
            default: return null;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "earnings":
                return (
                    <div className="max-w-6xl mx-auto py-6 px-4">
                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                <Download size={16} />
                                Export Earnings
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                                <Search size={16} />
                                Search Transactions
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                                <Filter size={16} />
                                Filter by Type
                            </button>
                        </div>

                        {/* Earnings Table */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-100">Transaction Earnings</h3>
                                <p className="text-sm text-gray-400">View your earnings from each transaction</p>
                            </div>
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Transaction Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Commission
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {earningsData.map((earning) => (
                                        <tr key={earning.id} className="hover:bg-gray-700/50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-100">{earning.transactionType}</div>
                                                    <div className="text-xs text-gray-400">{earning.id}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-100">{earning.customerName}</div>
                                                    <div className="text-xs text-gray-400">{earning.groupName}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                                ₹{earning.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-green-400">₹{earning.commission}</div>
                                                <div className="text-xs text-gray-400">{earning.commissionRate}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300">{earning.date}</div>
                                                <div className="text-xs text-gray-400">{earning.time}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(earning.status)}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(earning.status)}`}>
                                                        {earning.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <button className="text-blue-400 hover:text-blue-300 mr-3">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="text-green-400 hover:text-green-300">
                                                    <Download size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case "topup":
                return (
                    <div className="max-w-4xl mx-auto py-6 px-4">
                        {/* Wallet Top-up Section */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 p-6 mb-6">
                            <h3 className="text-xl font-semibold text-gray-100 mb-4">Request Wallet Top-up</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Top-up Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                                            <input
                                                type="number"
                                                value={topupAmount}
                                                onChange={(e) => setTopupAmount(e.target.value)}
                                                className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                                placeholder="Enter amount"
                                                min="100"
                                                max="100000"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Minimum: ₹100, Maximum: ₹1,00,000</p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                                        <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                                            <option value="upi">UPI Payment</option>
                                            <option value="netbanking">Net Banking</option>
                                            <option value="card">Debit/Credit Card</option>
                                            <option value="wallet">Digital Wallet</option>
                                        </select>
                                    </div>
                                    
                                    <button
                                        onClick={() => setShowTopupModal(true)}
                                        disabled={!topupAmount || parseFloat(topupAmount) < 100}
                                        className={`w-full py-3 rounded-lg font-medium transition-colors ${
                                            topupAmount && parseFloat(topupAmount) >= 100
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Request Top-up
                                    </button>
                                </div>
                                
                                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                                    <h4 className="text-lg font-medium text-gray-100 mb-3">Top-up Benefits</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            Instant wallet credit
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            No processing fees
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            Secure payment gateway
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            24/7 customer support
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Recent Top-up Requests */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-100">Recent Top-up Requests</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-600 rounded-full">
                                                <Plus size={16} className="text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-100">₹5,000 Top-up</div>
                                                <div className="text-xs text-gray-400">July 8, 2025 - UPI Payment</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300">
                                            Completed
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-yellow-600 rounded-full">
                                                <Clock size={16} className="text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-100">₹3,000 Top-up</div>
                                                <div className="text-xs text-gray-400">July 10, 2025 - Net Banking</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                                            Processing
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "commission":
                return (
                    <div className="max-w-6xl mx-auto py-6 px-4">
                        {/* Commission Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100">Total Commission Earned</p>
                                        <p className="text-2xl font-bold">₹{walletStats.totalEarnings.toLocaleString()}</p>
                                    </div>
                                    <TrendingUp size={32} />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100">This Month</p>
                                        <p className="text-2xl font-bold">₹{walletStats.monthlyEarnings.toLocaleString()}</p>
                                    </div>
                                    <Calendar size={32} />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-100">Pending Commission</p>
                                        <p className="text-2xl font-bold">₹{walletStats.pendingCommission.toLocaleString()}</p>
                                    </div>
                                    <Clock size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Commission History Table */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-100">Commission History</h3>
                                <p className="text-sm text-gray-400">Track your commission payments and earnings</p>
                            </div>
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Period
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Transactions
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Total Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Commission Earned
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Payment Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {commissionHistory.map((commission) => (
                                        <tr key={commission.id} className="hover:bg-gray-700/50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-100">{commission.period}</div>
                                                <div className="text-xs text-gray-400">{commission.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {commission.totalTransactions}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                                ₹{commission.totalAmount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">
                                                ₹{commission.commissionEarned.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300">{commission.paidDate || 'Pending'}</div>
                                                {commission.paymentMethod && (
                                                    <div className="text-xs text-gray-400">{commission.paymentMethod}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(commission.status)}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                                                        {commission.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <button className="text-blue-400 hover:text-blue-300 mr-3">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="text-green-400 hover:text-green-300">
                                                    <Download size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case "withdraw":
                return (
                    <div className="max-w-6xl mx-auto py-6 px-4">
                        {/* Withdrawal Request Section */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 p-6 mb-6">
                            <h3 className="text-xl font-semibold text-gray-100 mb-4">Withdraw to Bank Account</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                                            <input
                                                type="number"
                                                value={withdrawAmount}
                                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                                className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                                placeholder="Enter amount"
                                                min="500"
                                                max={walletStats.currentBalance}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Available Balance: ₹{walletStats.currentBalance.toLocaleString()}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Bank Account</label>
                                        <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                                            <option value="hdfc4567">HDFC Bank - ****4567 (Primary)</option>
                                            <option value="sbi8901">SBI Bank - ****8901</option>
                                            <option value="add_new">+ Add New Bank Account</option>
                                        </select>
                                    </div>
                                    
                                    <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300">Withdrawal Amount:</span>
                                            <span className="text-gray-100">₹{withdrawAmount || '0'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-gray-300">Processing Fee:</span>
                                            <span className="text-gray-100">₹25</span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1 pt-2 border-t border-gray-600">
                                            <span className="text-gray-100 font-medium">Net Amount:</span>
                                            <span className="text-green-400 font-medium">
                                                ₹{withdrawAmount ? (parseFloat(withdrawAmount) - 25).toLocaleString() : '0'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => setShowWithdrawModal(true)}
                                        disabled={!withdrawAmount || parseFloat(withdrawAmount) < 500 || parseFloat(withdrawAmount) > walletStats.currentBalance}
                                        className={`w-full py-3 rounded-lg font-medium transition-colors ${
                                            withdrawAmount && parseFloat(withdrawAmount) >= 500 && parseFloat(withdrawAmount) <= walletStats.currentBalance
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Request Withdrawal
                                    </button>
                                </div>
                                
                                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                                    <h4 className="text-lg font-medium text-gray-100 mb-3">Withdrawal Information</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            Minimum withdrawal: ₹500
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            Processing time: 1-2 business days
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            Processing fee: ₹25 per transaction
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-400" />
                                            Secure bank transfer
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Withdrawal History Table */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-100">Withdrawal History</h3>
                                <p className="text-sm text-gray-400">Track your bank withdrawal requests</p>
                            </div>
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Withdrawal ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Bank Account
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Request Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Processed Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {withdrawalHistory.map((withdrawal) => (
                                        <tr key={withdrawal.id} className="hover:bg-gray-700/50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-100">{withdrawal.id}</div>
                                                {withdrawal.transactionId && (
                                                    <div className="text-xs text-gray-400">{withdrawal.transactionId}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-100">₹{withdrawal.amount.toLocaleString()}</div>
                                                <div className="text-xs text-gray-400">Fee: ₹{withdrawal.charges}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {withdrawal.bankAccount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {withdrawal.requestDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {withdrawal.processedDate || 'Pending'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(withdrawal.status)}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                                                        {withdrawal.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <button className="text-blue-400 hover:text-blue-300 mr-3">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="text-green-400 hover:text-green-300">
                                                    <Download size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            <Header title="Wallet & Commission Management" />

            {/* Wallet Balance Header */}
            <div className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Wallet Balance</h1>
                            <p className="text-3xl font-bold">₹{walletStats.currentBalance.toLocaleString()}</p>
                            <p className="text-blue-100 mt-1">Available for withdrawal</p>
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowTopupModal(true)}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors backdrop-blur-sm"
                            >
                                <Plus size={16} />
                                Top-up
                            </button>
                            <button
                                onClick={() => setShowWithdrawModal(true)}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors backdrop-blur-sm"
                            >
                                <ArrowUpRight size={16} />
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-600 rounded-lg">
                                <TrendingUp size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Today's Earnings</p>
                                <p className="text-lg font-semibold text-gray-100">₹{walletStats.todayEarnings.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <DollarSign size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Earnings</p>
                                <p className="text-lg font-semibold text-gray-100">₹{walletStats.totalEarnings.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-600 rounded-lg">
                                <Clock size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Pending Commission</p>
                                <p className="text-lg font-semibold text-gray-100">₹{walletStats.pendingCommission.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-600 rounded-lg">
                                <ArrowUpRight size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Withdrawn</p>
                                <p className="text-lg font-semibold text-gray-100">₹{walletStats.totalWithdrawn.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-2 border border-gray-700 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                    }`}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>

            {/* Top-up Modal */}
            {showTopupModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-100 mb-4">Confirm Top-up Request</h3>
                        <p className="text-gray-300 mb-4">
                            You are requesting a wallet top-up of <span className="font-semibold text-green-400">₹{topupAmount}</span>
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleTopupRequest}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowTopupModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-100 mb-4">Confirm Withdrawal Request</h3>
                        <p className="text-gray-300 mb-4">
                            You are requesting a withdrawal of <span className="font-semibold text-green-400">₹{withdrawAmount}</span>
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                            Processing fee of ₹25 will be deducted. Net amount: ₹{withdrawAmount ? (parseFloat(withdrawAmount) - 25).toLocaleString() : '0'}
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleWithdrawRequest}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WalletCommission;
