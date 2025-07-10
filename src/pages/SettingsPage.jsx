import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
    Bell, 
    MessageSquare, 
    HelpCircle, 
    User, 
    Shield, 
    CreditCard,
    Calendar,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Phone,
    Mail,
    Send,
    Search,
    ChevronDown,
    ChevronRight,
    Plus,
    Clock,
    FileText
} from "lucide-react";
import EditProfileSection from "../components/settings/Profile-edit";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("notifications");
    const [notificationSettings, setNotificationSettings] = useState({
        loanApproval: true,
        loanRejection: true,
        emiReminders: true,
        overdueAlerts: true,
        systemUpdates: false,
        promotions: false
    });
    const [supportTicket, setSupportTicket] = useState({
        subject: '',
        category: '',
        priority: 'medium',
        description: ''
    });
    const [searchFAQ, setSearchFAQ] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const tabs = [
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "support", label: "Support Tickets", icon: MessageSquare },
        { id: "faq", label: "FAQs", icon: HelpCircle },
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Shield }
    ];

    // Recent Notifications Data
    const recentNotifications = [
        {
            id: 1,
            type: "approval",
            title: "Loan Application Approved",
            message: "Your loan application LN001 for ₹50,000 has been approved",
            timestamp: "2025-07-10 14:30",
            read: false
        },
        {
            id: 2,
            type: "emi_reminder",
            title: "EMI Due Tomorrow",
            message: "Your EMI of ₹3,000 is due on July 11, 2025",
            timestamp: "2025-07-10 09:00",
            read: true
        },
        {
            id: 3,
            type: "rejection",
            title: "Loan Application Rejected",
            message: "Your loan application LN002 has been rejected. Reason: Insufficient documentation",
            timestamp: "2025-07-09 16:45",
            read: true
        },
        {
            id: 4,
            type: "overdue",
            title: "EMI Overdue Alert",
            message: "Your EMI payment is 5 days overdue. Please pay immediately to avoid penalties",
            timestamp: "2025-07-08 10:00",
            read: false
        }
    ];

    // Support Tickets Data
    const supportTickets = [
        {
            id: "TKT001",
            subject: "Unable to make EMI payment",
            category: "Payment Issues",
            priority: "high",
            status: "Open",
            createdDate: "2025-07-10",
            lastUpdate: "2025-07-10",
            assignedTo: "Support Agent 1"
        },
        {
            id: "TKT002",
            subject: "Loan disbursement delay",
            category: "Loan Issues",
            priority: "medium",
            status: "In Progress",
            createdDate: "2025-07-09",
            lastUpdate: "2025-07-10",
            assignedTo: "Support Agent 2"
        },
        {
            id: "TKT003",
            subject: "Account access issues",
            category: "Technical",
            priority: "low",
            status: "Resolved",
            createdDate: "2025-07-08",
            lastUpdate: "2025-07-09",
            assignedTo: "Support Agent 3"
        }
    ];

    // FAQ Data
    const faqData = [
        {
            id: 1,
            category: "Loan Application",
            question: "How long does loan approval take?",
            answer: "Loan approval typically takes 2-5 business days after submitting all required documents. You'll receive notifications about the status updates."
        },
        {
            id: 2,
            category: "EMI Payments",
            question: "What happens if I miss an EMI payment?",
            answer: "Missing an EMI payment will result in late fees and penalties. Your credit score may also be affected. Contact support immediately if you're facing payment difficulties."
        },
        {
            id: 3,
            category: "Documentation",
            question: "What documents are required for loan application?",
            answer: "Required documents include: Aadhaar card, PAN card, bank statements, salary slips, and address proof. Additional documents may be required based on loan type."
        },
        {
            id: 4,
            category: "Interest Rates",
            question: "How are interest rates calculated?",
            answer: "Interest rates are calculated based on your credit profile, loan amount, tenure, and current market rates. Rates typically range from 12% to 24% per annum."
        },
        {
            id: 5,
            category: "Account Management",
            question: "How can I update my personal information?",
            answer: "You can update your personal information in the Profile section of Settings. Some changes may require document verification."
        },
        {
            id: 6,
            category: "Technical Support",
            question: "I'm having trouble accessing my account",
            answer: "If you're having login issues, try resetting your password. If the problem persists, contact our technical support team through the support ticket system."
        }
    ];

    const handleNotificationToggle = (setting) => {
        setNotificationSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handleSupportTicketSubmit = () => {
        if (!supportTicket.subject || !supportTicket.category || !supportTicket.description) {
            alert("Please fill in all required fields");
            return;
        }
        alert("Support ticket submitted successfully! You'll receive updates via email and notifications.");
        setSupportTicket({
            subject: '',
            category: '',
            priority: 'medium',
            description: ''
        });
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'approval': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'rejection': return <XCircle className="h-5 w-5 text-red-500" />;
            case 'emi_reminder': return <Calendar className="h-5 w-5 text-blue-500" />;
            case 'overdue': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
            default: return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-red-900 text-red-300';
            case 'In Progress': return 'bg-yellow-900 text-yellow-300';
            case 'Resolved': return 'bg-green-900 text-green-300';
            default: return 'bg-gray-900 text-gray-300';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-900 text-red-300';
            case 'medium': return 'bg-yellow-900 text-yellow-300';
            case 'low': return 'bg-green-900 text-green-300';
            default: return 'bg-gray-900 text-gray-300';
        }
    };

    const filteredFAQs = faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchFAQ.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchFAQ.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchFAQ.toLowerCase())
    );

    const renderContent = () => {
        switch (activeTab) {
            case "notifications":
                return (
                    <div className="space-y-6">
                        {/* Notification Settings */}
                        <motion.div
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-100 mb-6">Notification Preferences</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="text-gray-100 font-medium">Loan Approval Notices</p>
                                            <p className="text-sm text-gray-400">Get notified when your loan is approved</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings.loanApproval}
                                            onChange={() => handleNotificationToggle('loanApproval')}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <XCircle className="h-5 w-5 text-red-500" />
                                        <div>
                                            <p className="text-gray-100 font-medium">Loan Rejection Notices</p>
                                            <p className="text-sm text-gray-400">Get notified when your loan is rejected</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings.loanRejection}
                                            onChange={() => handleNotificationToggle('loanRejection')}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="text-gray-100 font-medium">EMI Due Reminders</p>
                                            <p className="text-sm text-gray-400">Get reminded before EMI due dates</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings.emiReminders}
                                            onChange={() => handleNotificationToggle('emiReminders')}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                                        <div>
                                            <p className="text-gray-100 font-medium">Overdue Alerts</p>
                                            <p className="text-sm text-gray-400">Get alerted about overdue payments</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings.overdueAlerts}
                                            onChange={() => handleNotificationToggle('overdueAlerts')}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Notifications */}
                        <motion.div
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-100 mb-6">Recent Notifications</h3>
                            
                            <div className="space-y-4">
                                {recentNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 rounded-lg border-l-4 ${
                                            notification.read ? 'bg-gray-700 bg-opacity-30 border-gray-500' : 'bg-blue-600 bg-opacity-10 border-blue-500'
                                        }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            {getNotificationIcon(notification.type)}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-gray-100 font-medium">{notification.title}</h4>
                                                    <span className="text-xs text-gray-400">{notification.timestamp}</span>
                                                </div>
                                                <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );

            case "support":
                return (
                    <div className="space-y-6">
                        {/* Create Support Ticket */}
                        <motion.div
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-100 mb-6">Raise Support Ticket</h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                                        <input
                                            type="text"
                                            value={supportTicket.subject}
                                            onChange={(e) => setSupportTicket({...supportTicket, subject: e.target.value})}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            placeholder="Brief description of your issue"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                                        <select
                                            value={supportTicket.category}
                                            onChange={(e) => setSupportTicket({...supportTicket, category: e.target.value})}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Payment Issues">Payment Issues</option>
                                            <option value="Loan Issues">Loan Issues</option>
                                            <option value="Technical">Technical Support</option>
                                            <option value="Account">Account Management</option>
                                            <option value="Documentation">Documentation</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                                    <select
                                        value={supportTicket.priority}
                                        onChange={(e) => setSupportTicket({...supportTicket, priority: e.target.value})}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                                    <textarea
                                        value={supportTicket.description}
                                        onChange={(e) => setSupportTicket({...supportTicket, description: e.target.value})}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        rows="4"
                                        placeholder="Provide detailed information about your issue..."
                                    />
                                </div>
                                
                                <button
                                    onClick={handleSupportTicketSubmit}
                                    className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <Send size={16} />
                                    Submit Ticket
                                </button>
                            </div>
                        </motion.div>

                        {/* Support Tickets History */}
                        <motion.div
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-100 mb-6">Your Support Tickets</h3>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">Ticket ID</th>
                                            <th className="px-6 py-3">Subject</th>
                                            <th className="px-6 py-3">Category</th>
                                            <th className="px-6 py-3">Priority</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Created</th>
                                            <th className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supportTickets.map((ticket) => (
                                            <tr key={ticket.id} className="bg-gray-800 border-b border-gray-700">
                                                <td className="px-6 py-4 font-medium text-gray-100">{ticket.id}</td>
                                                <td className="px-6 py-4 text-gray-300">{ticket.subject}</td>
                                                <td className="px-6 py-4 text-gray-300">{ticket.category}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">{ticket.createdDate}</td>
                                                <td className="px-6 py-4">
                                                    <button className="text-blue-400 hover:text-blue-300 mr-3">
                                                        <FileText size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-100 mb-6">Contact Support</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                    <Phone className="h-6 w-6 text-blue-500" />
                                    <div>
                                        <p className="text-gray-100 font-medium">Phone Support</p>
                                        <p className="text-sm text-gray-400">+91-1800-123-4567</p>
                                        <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                                    <Mail className="h-6 w-6 text-green-500" />
                                    <div>
                                        <p className="text-gray-100 font-medium">Email Support</p>
                                        <p className="text-sm text-gray-400">support@loanapp.com</p>
                                        <p className="text-xs text-gray-500">Response within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                );

            case "faq":
                return (
                    <div className="space-y-6">
                        {/* FAQ Search */}
                        <motion.div
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-100 mb-6">Frequently Asked Questions</h3>
                            
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search FAQs..."
                                    value={searchFAQ}
                                    onChange={(e) => setSearchFAQ(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </motion.div>

                        {/* FAQ List */}
                        <motion.div
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="space-y-4">
                                {filteredFAQs.map((faq) => (
                                    <div key={faq.id} className="border border-gray-700 rounded-lg">
                                        <button
                                            onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                                            className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-700 hover:bg-opacity-50 transition-colors"
                                        >
                                            <div>
                                                <span className="text-xs text-blue-400 font-medium">{faq.category}</span>
                                                <h4 className="text-gray-100 font-medium">{faq.question}</h4>
                                            </div>
                                            {expandedFAQ === faq.id ? (
                                                <ChevronDown className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                        
                                        {expandedFAQ === faq.id && (
                                            <div className="px-4 pb-4">
                                                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {filteredFAQs.length === 0 && (
                                <div className="text-center py-8">
                                    <HelpCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-400">No FAQs found matching your search.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                );

            case "profile":
                return (
                    <motion.div
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-100 mb-6">Profile Settings</h3>
                        {/* <p className="text-gray-400">Profile management features will be implemented here.</p> */}
						<EditProfileSection/>
                    </motion.div>
                );

            case "security":
                return (
                    <motion.div
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-100 mb-6">Security Settings</h3>
                        {/* <p className="text-gray-400">Security management features will be implemented here.</p> */}
						
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            <Header title='Settings & Support' />
            
            <main className='max-w-6xl mx-auto py-6 px-4 lg:px-8'>
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

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    );
};

export default SettingsPage;
