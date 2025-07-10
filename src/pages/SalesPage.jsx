import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { 
    CreditCard, 
    DollarSign, 
    Users, 
    TrendingUp, 
    Calculator,
    Calendar,
    FileText,
    PenTool,
    Send,
    Download,
    CheckCircle,
    Clock,
    XCircle,
    Plus,
    Minus
} from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";

const loanStats = {
    totalLoansApplied: "1,247",
    totalLoanAmount: "$2,456,789",
    approvalRate: "97.5%",
    averageEMI: "$245.60",
    pendingApplications: "156",
    approvedLoans: "892",
    rejectedLoans: "43",
};

const GroupLoanApplication = () => {
    const [groupMembers, setGroupMembers] = useState([
        { id: 1, name: '', phone: '', aadhaar: '', role: 'Leader' }
    ]);
    const [loanDetails, setLoanDetails] = useState({
        loanAmount: '',
        loanTerm: '12',
        interestRate: 12,
        purpose: ''
    });
    const [emiCalculation, setEmiCalculation] = useState(null);
    const [consentSigned, setConsentSigned] = useState(false);
    const signatureRef = useRef(null);

    const addGroupMember = () => {
        const newMember = {
            id: groupMembers.length + 1,
            name: '',
            phone: '',
            aadhaar: '',
            role: 'Member'
        };
        setGroupMembers([...groupMembers, newMember]);
    };

    const removeGroupMember = (id) => {
        if (groupMembers.length > 1) {
            setGroupMembers(groupMembers.filter(member => member.id !== id));
        }
    };

    const updateGroupMember = (id, field, value) => {
        setGroupMembers(groupMembers.map(member => 
            member.id === id ? { ...member, [field]: value } : member
        ));
    };

    const calculateEMI = () => {
        const principal = parseFloat(loanDetails.loanAmount);
        const rate = loanDetails.interestRate / 100 / 12;
        const time = parseInt(loanDetails.loanTerm);
        
        if (principal && rate && time) {
            const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
            const totalAmount = emi * time;
            const totalInterest = totalAmount - principal;
            
            setEmiCalculation({
                emi: emi.toFixed(2),
                totalAmount: totalAmount.toFixed(2),
                totalInterest: totalInterest.toFixed(2)
            });
        }
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">Group Loan Application</h2>
            
            {/* Group Members Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">Group Members</h3>
                    <button
                        onClick={addGroupMember}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                    </button>
                </div>
                
                <div className="space-y-4">
                    {groupMembers.map((member, index) => (
                        <div key={member.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-700 rounded-lg">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => updateGroupMember(member.id, 'name', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={member.phone}
                                    onChange={(e) => updateGroupMember(member.id, 'phone', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter phone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Aadhaar</label>
                                <input
                                    type="text"
                                    value={member.aadhaar}
                                    onChange={(e) => updateGroupMember(member.id, 'aadhaar', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter Aadhaar"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                                <select
                                    value={member.role}
                                    onChange={(e) => updateGroupMember(member.id, 'role', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Leader">Leader</option>
                                    <option value="Member">Member</option>
                                    <option value="Co-Leader">Co-Leader</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                {groupMembers.length > 1 && (
                                    <button
                                        onClick={() => removeGroupMember(member.id)}
                                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Loan Details Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Loan Amount (₹)</label>
                        <input
                            type="number"
                            value={loanDetails.loanAmount}
                            onChange={(e) => setLoanDetails({...loanDetails, loanAmount: e.target.value})}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Loan Term (Months)</label>
                        <select
                            value={loanDetails.loanTerm}
                            onChange={(e) => setLoanDetails({...loanDetails, loanTerm: e.target.value})}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                            <option value="18">18 Months</option>
                            <option value="24">24 Months</option>
                            <option value="36">36 Months</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Interest Rate (%)</label>
                        <input
                            type="number"
                            value={loanDetails.interestRate}
                            onChange={(e) => setLoanDetails({...loanDetails, interestRate: parseFloat(e.target.value)})}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            step="0.1"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={calculateEMI}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                            <Calculator className="h-4 w-4 mr-2" />
                            Calculate EMI
                        </button>
                    </div>
                </div>
                
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Loan Purpose</label>
                    <textarea
                        value={loanDetails.purpose}
                        onChange={(e) => setLoanDetails({...loanDetails, purpose: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        rows="3"
                        placeholder="Describe the purpose of the loan"
                    />
                </div>
            </div>

            {/* EMI Calculator Results */}
            {emiCalculation && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">EMI Calculation Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg border border-blue-500">
                            <div className="text-blue-400 text-sm font-medium">Monthly EMI</div>
                            <div className="text-2xl font-bold text-white">₹{emiCalculation.emi}</div>
                        </div>
                        <div className="bg-green-600 bg-opacity-20 p-4 rounded-lg border border-green-500">
                            <div className="text-green-400 text-sm font-medium">Total Amount</div>
                            <div className="text-2xl font-bold text-white">₹{emiCalculation.totalAmount}</div>
                        </div>
                        <div className="bg-yellow-600 bg-opacity-20 p-4 rounded-lg border border-yellow-500">
                            <div className="text-yellow-400 text-sm font-medium">Total Interest</div>
                            <div className="text-2xl font-bold text-white">₹{emiCalculation.totalInterest}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Consent Form Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Consent Form & Digital Signature</h3>
                <div className="bg-gray-700 p-6 rounded-lg mb-4">
                    <h4 className="text-md font-semibold text-gray-100 mb-3">Loan Agreement Terms</h4>
                    <div className="text-sm text-gray-300 space-y-2">
                        <p>• I/We hereby apply for a group loan and agree to the terms and conditions.</p>
                        <p>• All group members are jointly and severally liable for the loan repayment.</p>
                        <p>• The loan will be disbursed upon approval and completion of all documentation.</p>
                        <p>• EMI payments must be made on time to avoid penalties and legal action.</p>
                        <p>• The lender reserves the right to modify terms subject to regulatory guidelines.</p>
                    </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <div className="flex justify-center space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Upload Sign 
                        </button>
                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                            Clear
                        </button>
                    </div>
                </div>
                
                <div className="mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={consentSigned}
                            onChange={(e) => setConsentSigned(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-gray-300">I agree to the terms and conditions and confirm my digital signature</span>
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <button
                    disabled={!consentSigned}
                    className={`px-8 py-3 rounded-lg font-medium flex items-center ${
                        consentSigned 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    } transition-colors`}
                >
                    <Send className="h-5 w-5 mr-2" />
                    Submit Application for Admin Approval
                </button>
            </div>
        </motion.div>
    );
};

const LoanStatusTracker = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    
    const loanApplications = [
        { 
            id: 1, 
            groupName: 'Women Self Help Group A', 
            amount: '₹50,000', 
            status: 'approved', 
            appliedDate: '2024-01-15',
            members: 5,
            canDownloadNOC: true
        },
        { 
            id: 2, 
            groupName: 'Farmers Collective B', 
            amount: '₹75,000', 
            status: 'pending', 
            appliedDate: '2024-01-16',
            members: 8,
            canDownloadNOC: false
        },
        { 
            id: 3, 
            groupName: 'Artisan Group C', 
            amount: '₹30,000', 
            status: 'rejected', 
            appliedDate: '2024-01-14',
            members: 6,
            canDownloadNOC: false
        },
        { 
            id: 4, 
            groupName: 'Micro Business Group D', 
            amount: '₹1,00,000', 
            status: 'closed', 
            appliedDate: '2024-01-10',
            members: 10,
            canDownloadNOC: true
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
            case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'closed': return <CheckCircle className="h-5 w-5 text-blue-500" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'closed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredApplications = selectedStatus === 'all' 
        ? loanApplications 
        : loanApplications.filter(app => app.status === selectedStatus);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Loan Application Status & NOC Downloads</h2>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Group Name</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Members</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Applied Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map((application) => (
                            <tr key={application.id} className="bg-gray-800 border-b border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-100">{application.groupName}</td>
                                <td className="px-6 py-4 text-gray-300">{application.amount}</td>
                                <td className="px-6 py-4 text-gray-300">{application.members}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(application.status)}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{application.appliedDate}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-400 hover:text-blue-300 p-1">
                                            <FileText className="h-4 w-4" />
                                        </button>
                                        {application.canDownloadNOC && (
                                            <button className="text-green-400 hover:text-green-300 p-1">
                                                <Download className="h-4 w-4" />
                                            </button>
                                        )}
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

const LoanApplicationPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Loan Application Management' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* ENHANCED LOAN STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard 
                        name='Total Applications' 
                        icon={FileText} 
                        value={loanStats.totalLoansApplied} 
                        color='#6366F1' 
                    />
                    <StatCard 
                        name='Total Loan Amount' 
                        icon={DollarSign} 
                        value={loanStats.totalLoanAmount} 
                        color='#10B981' 
                    />
                    <StatCard
                        name='Approval Rate'
                        icon={TrendingUp}
                        value={loanStats.approvalRate}
                        color='#F59E0B'
                    />
                    {/* <StatCard 
                        name='Average EMI' 
                        icon={CreditCard} 
                        value={loanStats.averageEMI} 
                        color='#EF4444' 
                    /> */}
                    <StatCard
                        name='Pending'
                        icon={Clock}
                        value={loanStats.pendingApplications}
                        color='#F59E0B'
                    />
                    <StatCard
                        name='Approved'
                        icon={CheckCircle}
                        value={loanStats.approvedLoans}
                        color='#10B981'
                    />
                    <StatCard
                        name='Rejected'
                        icon={XCircle}
                        value={loanStats.rejectedLoans}
                        color='#EF4444'
                    />
                </motion.div>

                
                <GroupLoanApplication />

                {/* LOAN STATUS TRACKER */}
                <LoanStatusTracker />

                {/* EXISTING CHARTS */}
                {/* <SalesOverviewChart /> */}

                {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <SalesByCategoryChart />
                    <DailySalesTrend />
                </div> */}
            </main>
        </div>
    );
};

export default LoanApplicationPage;
