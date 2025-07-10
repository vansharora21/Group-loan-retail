import { motion } from "framer-motion";
import { Edit, Search, Trash2, Store, MapPin, Users, Calendar, IndianRupee, Phone, Mail } from "lucide-react";
import { useState } from "react";

const EMI_USERS_DATA = [
  { 
    id: 1, 
    name: "Rajesh Kumar", 
    phone: "+91-9876543210",
    email: "rajesh.kumar@email.com",
    emiAmount: 2500, 
    dueDate: "2025-07-15",
    status: "Paid",
    totalEMIs: 12,
    completedEMIs: 8,
    remainingAmount: 10000,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
  },
  { 
    id: 2, 
    name: "Priya Sharma", 
    phone: "+91-9876543211",
    email: "priya.sharma@email.com",
    emiAmount: 1800, 
    dueDate: "2025-07-12",
    status: "Pending",
    totalEMIs: 10,
    completedEMIs: 6,
    remainingAmount: 7200,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center"
  },
  { 
    id: 3, 
    name: "Amit Patel", 
    phone: "+91-9876543212",
    email: "amit.patel@email.com",
    emiAmount: 3200, 
    dueDate: "2025-07-20",
    status: "Overdue",
    totalEMIs: 15,
    completedEMIs: 10,
    remainingAmount: 16000,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
  },
  { 
    id: 4, 
    name: "Sunita Verma", 
    phone: "+91-9876543213",
    email: "sunita.verma@email.com",
    emiAmount: 2200, 
    dueDate: "2025-07-18",
    status: "Paid",
    totalEMIs: 8,
    completedEMIs: 5,
    remainingAmount: 6600,
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
  },
  { 
    id: 5, 
    name: "Vikram Singh", 
    phone: "+91-9876543214",
    email: "vikram.singh@email.com",
    emiAmount: 2800, 
    dueDate: "2025-07-25",
    status: "Pending",
    totalEMIs: 12,
    completedEMIs: 7,
    remainingAmount: 14000,
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center"
  },
];

const EMI_GROUPS_DATA = [
  { 
    id: 1, 
    groupName: "Group Alpha", 
    leader: "Rajesh Kumar",
    memberCount: 12, 
    totalAmount: 150000,
    collectedAmount: 120000,
    nextDueDate: "2025-07-15",
    status: "Active",
    groupImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=center"
  },
  { 
    id: 2, 
    groupName: "Group Beta", 
    leader: "Priya Sharma",
    memberCount: 10, 
    totalAmount: 120000,
    collectedAmount: 90000,
    nextDueDate: "2025-07-12",
    status: "Active",
    groupImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=100&fit=crop&crop=center"
  },
  { 
    id: 3, 
    groupName: "Group Gamma", 
    leader: "Amit Patel",
    memberCount: 15, 
    totalAmount: 200000,
    collectedAmount: 140000,
    nextDueDate: "2025-07-20",
    status: "Pending",
    groupImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop&crop=center"
  },
  { 
    id: 4, 
    groupName: "Group Delta", 
    leader: "Sunita Verma",
    memberCount: 8, 
    totalAmount: 100000,
    collectedAmount: 75000,
    nextDueDate: "2025-07-18",
    status: "Active",
    groupImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center"
  },
];

const EMI_TRANSACTIONS_DATA = [
  {
    id: 1,
    userName: "Rajesh Kumar",
    groupName: "Group Alpha",
    amount: 2500,
    paymentDate: "2025-06-15",
    paymentMethod: "UPI",
    transactionId: "TXN001234567",
    status: "Completed",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 2,
    userName: "Priya Sharma",
    groupName: "Group Beta",
    amount: 1800,
    paymentDate: "2025-06-12",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN001234568",
    status: "Completed",
    userImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 3,
    userName: "Amit Patel",
    groupName: "Group Gamma",
    amount: 3200,
    paymentDate: "2025-06-20",
    paymentMethod: "Cash",
    transactionId: "TXN001234569",
    status: "Failed",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 4,
    userName: "Sunita Verma",
    groupName: "Group Delta",
    amount: 2200,
    paymentDate: "2025-06-18",
    paymentMethod: "UPI",
    transactionId: "TXN001234570",
    status: "Completed",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 5,
    userName: "Vikram Singh",
    groupName: "Group Epsilon",
    amount: 2800,
    paymentDate: "2025-06-25",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN001234571",
    status: "Pending",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center"
  },
];

const EMITable = () => {
  const [emiUsers, setEmiUsers] = useState(EMI_USERS_DATA);
  const [emiGroups, setEmiGroups] = useState(EMI_GROUPS_DATA);
  const [emiTransactions, setEmiTransactions] = useState(EMI_TRANSACTIONS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupSearchTerm, setGroupSearchTerm] = useState("");
  const [transactionSearchTerm, setTransactionSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleGroupSearch = (e) => {
    setGroupSearchTerm(e.target.value.toLowerCase());
  };

  const handleTransactionSearch = (e) => {
    setTransactionSearchTerm(e.target.value.toLowerCase());
  };

  const handleEdit = (userId) => {
    const newUserName = prompt("Enter new user name:");
    if (!newUserName) return;
    setEmiUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, name: newUserName } : user
      )
    );
  };

  const handleDelete = (userId) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setEmiUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const handleGroupEdit = (groupId) => {
    const newGroupName = prompt("Enter new group name:");
    if (!newGroupName) return;
    setEmiGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, groupName: newGroupName } : group
      )
    );
  };

  const handleGroupDelete = (groupId) => {
    const confirmDelete = confirm("Are you sure you want to delete this group?");
    if (confirmDelete) {
      setEmiGroups((prev) => prev.filter((group) => group.id !== groupId));
    }
  };

  const filteredUsers = emiUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.status.toLowerCase().includes(searchTerm)
  );

  const filteredGroups = emiGroups.filter(
    (group) =>
      group.groupName.toLowerCase().includes(groupSearchTerm) ||
      group.leader.toLowerCase().includes(groupSearchTerm) ||
      group.status.toLowerCase().includes(groupSearchTerm)
  );

  const filteredTransactions = emiTransactions.filter(
    (transaction) =>
      transaction.userName.toLowerCase().includes(transactionSearchTerm) ||
      transaction.groupName.toLowerCase().includes(transactionSearchTerm) ||
      transaction.paymentMethod.toLowerCase().includes(transactionSearchTerm) ||
      transaction.status.toLowerCase().includes(transactionSearchTerm)
  );

  return (
    <div className="space-y-8">
      {/* EMI Users Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <Users size={24} />
            EMI Users Management
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">EMI Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-gray-400 py-4">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-3 items-center">
                      <img
                        src={user.profileImage}
                        alt={`${user.name} profile`}
                        className="size-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1 mb-1">
                        <Phone size={14} />
                        <span className="text-xs">{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        <span className="text-xs">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <IndianRupee size={16} />
                        <span className="font-medium">{user.emiAmount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(user.dueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="text-xs text-gray-400 mb-1">
                        {user.completedEMIs}/{user.totalEMIs} EMIs
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(user.completedEMIs / user.totalEMIs) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ₹{user.remainingAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Paid' 
                          ? 'bg-green-900 text-green-300' 
                          : user.status === 'Pending'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                        onClick={() => handleEdit(user.id)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* EMI Groups Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <Store size={24} />
            EMI Groups Overview
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search groups..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleGroupSearch}
              value={groupSearchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Leader</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Members</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Collection Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Next Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-400 py-4">No groups found.</td>
                </tr>
              ) : (
                filteredGroups.map((group) => (
                  <motion.tr
                    key={group.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-3 items-center">
                      <img
                        src={group.groupImage}
                        alt={`${group.groupName} image`}
                        className="size-10 rounded-full object-cover"
                      />
                      {group.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {group.leader}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{group.memberCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="text-xs text-gray-400 mb-1">
                        ₹{group.collectedAmount.toLocaleString()} / ₹{group.totalAmount.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(group.collectedAmount / group.totalAmount) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(group.nextDueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        group.status === 'Active' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                        onClick={() => handleGroupEdit(group.id)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleGroupDelete(group.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* EMI Transactions Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <MapPin size={24} />
            EMI Transaction History
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleTransactionSearch}
              value={transactionSearchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-400 py-4">No transactions found.</td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-3 items-center">
                      <img
                        src={transaction.userImage}
                        alt={`${transaction.userName} profile`}
                        className="size-8 rounded-full object-cover"
                      />
                      {transaction.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <IndianRupee size={16} />
                        <span className="font-medium">{transaction.amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(transaction.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {transaction.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                      {transaction.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-900 text-green-300' 
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default EMITable;
