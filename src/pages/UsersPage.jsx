import { 
    UserCheck, 
    UserPlus, 
    UsersIcon, 
    UserX, 
    Upload, 
    Camera, 
    CreditCard, 
    CheckCircle, 
    XCircle, 
    Clock,
    Eye,
    Download
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";

const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
    pendingKYC: 1247,
    approvedKYC: 89653,
    rejectedKYC: 892,
};

const KYCUploadSection = () => {
    const [uploadedFiles, setUploadedFiles] = useState({
        aadhaar: null,
        pan: null,
        photo: null,
        livePhoto: null
    });
    const [bankDetails, setBankDetails] = useState({
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        accountHolderName: ''
    });
    const [showCamera, setShowCamera] = useState(false);

    const handleFileUpload = (type, file) => {
        setUploadedFiles(prev => ({ ...prev, [type]: file }));
    };

    const handleBankDetailsChange = (field, value) => {
        setBankDetails(prev => ({ ...prev, [field]: value }));
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-6">KYC Document Upload</h2>
            
            {/* Document Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Aadhaar Upload */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Aadhaar Card</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload('aadhaar', e.target.files[0])}
                            className="hidden"
                            id="aadhaar-upload"
                        />
                        <label htmlFor="aadhaar-upload" className="cursor-pointer">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">
                                {uploadedFiles.aadhaar ? uploadedFiles.aadhaar.name : 'Click to upload Aadhaar'}
                            </p>
                        </label>
                    </div>
                </div>

                {/* PAN Upload */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">PAN Card</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload('pan', e.target.files[0])}
                            className="hidden"
                            id="pan-upload"
                        />
                        <label htmlFor="pan-upload" className="cursor-pointer">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">
                                {uploadedFiles.pan ? uploadedFiles.pan.name : 'Click to upload PAN'}
                            </p>
                        </label>
                    </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Profile Photo</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload('photo', e.target.files[0])}
                            className="hidden"
                            id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">
                                {uploadedFiles.photo ? uploadedFiles.photo.name : 'Click to upload Photo'}
                            </p>
                        </label>
                    </div>
                </div>
            </div>

            {/* Live Photo Capture */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">Live Photo Capture (Optional)</label>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setShowCamera(!showCamera)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Camera className="h-4 w-4 mr-2" />
                        {showCamera ? 'Close Camera' : 'Capture Live Photo'}
                    </button>
                    {uploadedFiles.livePhoto && (
                        <span className="text-sm text-green-400">✓ Live photo captured</span>
                    )}
                </div>
                {showCamera && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                        <div className="bg-gray-600 h-48 rounded-lg flex items-center justify-center">
                            <p className="text-gray-400">Camera preview would appear here</p>
                        </div>
                        <button
                            onClick={() => {
                                setUploadedFiles(prev => ({ ...prev, livePhoto: 'captured' }));
                                setShowCamera(false);
                            }}
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Capture Photo
                        </button>
                    </div>
                )}
            </div>

            {/* Bank Details Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Bank Details for Disbursal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
                        <input
                            type="text"
                            value={bankDetails.accountNumber}
                            onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Enter account number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">IFSC Code</label>
                        <input
                            type="text"
                            value={bankDetails.ifscCode}
                            onChange={(e) => handleBankDetailsChange('ifscCode', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Enter IFSC code"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
                        <input
                            type="text"
                            value={bankDetails.bankName}
                            onChange={(e) => handleBankDetailsChange('bankName', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Enter bank name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Account Holder Name</label>
                        <input
                            type="text"
                            value={bankDetails.accountHolderName}
                            onChange={(e) => handleBankDetailsChange('accountHolderName', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Enter account holder name"
                        />
                    </div>
                </div>
            </div>

            <button className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Submit KYC Documents
            </button>
        </motion.div>
    );
};

const KYCStatusTracker = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    
    const kycApplications = [
        { id: 1, name: 'John Doe', status: 'approved', submittedAt: '2024-01-15', documents: ['aadhaar', 'pan', 'photo'] },
        { id: 2, name: 'Jane Smith', status: 'pending', submittedAt: '2024-01-16', documents: ['aadhaar', 'pan'] },
        { id: 3, name: 'Mike Johnson', status: 'rejected', submittedAt: '2024-01-14', documents: ['aadhaar', 'pan', 'photo'], reason: 'Blurry documents' },
        { id: 4, name: 'Sarah Wilson', status: 'approved', submittedAt: '2024-01-13', documents: ['aadhaar', 'pan', 'photo', 'bank'] },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
            case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredApplications = selectedStatus === 'all' 
        ? kycApplications 
        : kycApplications.filter(app => app.status === selectedStatus);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">KYC Status Tracker</h2>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Submitted</th>
                            <th className="px-6 py-3">Documents</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map((application) => (
                            <tr key={application.id} className="bg-gray-800 border-b border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-100">{application.name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(application.status)}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{application.submittedAt}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-1">
                                        {application.documents.map((doc, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                                                {doc}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-400 hover:text-blue-300">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="text-green-400 hover:text-green-300">
                                            <Download className="h-4 w-4" />
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

const UsersPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Member KYC Management' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* ENHANCED STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name='Total Users'
                        icon={UsersIcon}
                        value={userStats.totalUsers.toLocaleString()}
                        color='#6366F1'
                    />
                    <StatCard 
                        name='New Users Today' 
                        icon={UserPlus} 
                        value={userStats.newUsersToday} 
                        color='#10B981' 
                    />
                    <StatCard
                        name='Active Users'
                        icon={UserCheck}
                        value={userStats.activeUsers.toLocaleString()}
                        color='#F59E0B'
                    />
                    
                    <StatCard
                        name='Pending KYC'
                        icon={Clock}
                        value={userStats.pendingKYC.toLocaleString()}
                        color='#F59E0B'
                    />
                    <StatCard
                        name='Approved KYC'
                        icon={CheckCircle}
                        value={userStats.approvedKYC.toLocaleString()}
                        color='#10B981'
                    />
                    <StatCard
                        name='Rejected KYC'
                        icon={XCircle}
                        value={userStats.rejectedKYC.toLocaleString()}
                        color='#EF4444'
                    />
                </motion.div>

                {/* KYC UPLOAD SECTION */}
                <KYCUploadSection />

                {/* KYC STATUS TRACKER */}
                <KYCStatusTracker />

                {/* EXISTING USERS TABLE */}
                <UsersTable />

                {/* USER CHARTS */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
                    <UserGrowthChart />
                    <UserActivityHeatmap />
                    <UserDemographicsChart />
                </div>
            </main>
        </div>
    );
};

export default UsersPage;
