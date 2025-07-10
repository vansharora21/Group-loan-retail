import { motion } from "framer-motion";
import { Edit, Search, Trash2, Store, MapPin, Users, Calendar, Plus, UserPlus, IndianRupee } from "lucide-react";
import { useState } from "react";

const EMI_GROUPS_DATA = [
  { 
    id: 1, 
    groupName: "Group Alpha", 
    memberCount: 12, 
    emiDate: "2025-07-11", 
    emiAmount: 2000, 
    status: "Pending",
    totalCollected: 18000,
    leader: "Rajesh Kumar"
  },
  { 
    id: 2, 
    groupName: "Group Beta", 
    memberCount: 10, 
    emiDate: "2025-07-13", 
    emiAmount: 1500, 
    status: "Paid",
    totalCollected: 15000,
    leader: "Priya Sharma"
  },
  { 
    id: 3, 
    groupName: "Group Gamma", 
    memberCount: 15, 
    emiDate: "2025-07-15", 
    emiAmount: 2200, 
    status: "Pending",
    totalCollected: 26400,
    leader: "Amit Patel"
  },
  { 
    id: 4, 
    groupName: "Group Delta", 
    memberCount: 8, 
    emiDate: "2025-07-18", 
    emiAmount: 1800, 
    status: "Paid",
    totalCollected: 14400,
    leader: "Sunita Verma"
  },
  { 
    id: 5, 
    groupName: "Group Epsilon", 
    memberCount: 11, 
    emiDate: "2025-07-20", 
    emiAmount: 1700, 
    status: "Pending",
    totalCollected: 17000,
    leader: "Vikram Singh"
  },
];

const EMI_MEMBERS_DATA = [
  { 
    id: 1, 
    name: "Rajesh Kumar", 
    groupName: "Group Alpha",
    phone: "+91-9876543210",
    emiAmount: 2000,
    lastPayment: "2025-06-11",
    status: "Active",
    totalPaid: 12000
  },
  { 
    id: 2, 
    name: "Priya Sharma", 
    groupName: "Group Beta",
    phone: "+91-9876543211",
    emiAmount: 1500,
    lastPayment: "2025-06-13",
    status: "Active",
    totalPaid: 9000
  },
  { 
    id: 3, 
    name: "Amit Patel", 
    groupName: "Group Gamma",
    phone: "+91-9876543212",
    emiAmount: 2200,
    lastPayment: "2025-06-15",
    status: "Active",
    totalPaid: 13200
  },
  { 
    id: 4, 
    name: "Sunita Verma", 
    groupName: "Group Delta",
    phone: "+91-9876543213",
    emiAmount: 1800,
    lastPayment: "2025-06-18",
    status: "Inactive",
    totalPaid: 10800
  },
  { 
    id: 5, 
    name: "Vikram Singh", 
    groupName: "Group Epsilon",
    phone: "+91-9876543214",
    emiAmount: 1700,
    lastPayment: "2025-06-20",
    status: "Active",
    totalPaid: 10200
  },
];

const EMI_TRANSACTIONS_DATA = [
  {
    id: 1,
    groupName: "Group Alpha",
    memberName: "Rajesh Kumar",
    amount: 2000,
    paymentDate: "2025-06-11",
    paymentMethod: "UPI",
    transactionId: "TXN001234567",
    status: "Completed"
  },
  {
    id: 2,
    groupName: "Group Beta",
    memberName: "Priya Sharma",
    amount: 1500,
    paymentDate: "2025-06-13",
    paymentMethod: "Cash",
    transactionId: "TXN001234568",
    status: "Completed"
  },
  {
    id: 3,
    groupName: "Group Gamma",
    memberName: "Amit Patel",
    amount: 2200,
    paymentDate: "2025-06-15",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN001234569",
    status: "Completed"
  },
  {
    id: 4,
    groupName: "Group Delta",
    memberName: "Sunita Verma",
    amount: 1800,
    paymentDate: "2025-06-18",
    paymentMethod: "UPI",
    transactionId: "TXN001234570",
    status: "Failed"
  },
  {
    id: 5,
    groupName: "Group Epsilon",
    memberName: "Vikram Singh",
    amount: 1700,
    paymentDate: "2025-06-20",
    paymentMethod: "Cash",
    transactionId: "TXN001234571",
    status: "Completed"
  },
];

const EMITable = () => {
  const [emiGroups, setEmiGroups] = useState(EMI_GROUPS_DATA);
  const [emiMembers, setEmiMembers] = useState(EMI_MEMBERS_DATA);
  const [emiTransactions, setEmiTransactions] = useState(EMI_TRANSACTIONS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [transactionSearchTerm, setTransactionSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleMemberSearch = (e) => {
    setMemberSearchTerm(e.target.value.toLowerCase());
  };

  const handleTransactionSearch = (e) => {
    setTransactionSearchTerm(e.target.value.toLowerCase());
  };

  const handleCreateGroup = () => {
    const groupName = prompt("Enter new group name:");
    if (!groupName) return;
    const newGroup = {
      id: emiGroups.length + 1,
      groupName,
      memberCount: 0,
      emiDate: new Date().toISOString().split('T')[0],
      emiAmount: 0,
      status: "Pending",
      totalCollected: 0,
      leader: "TBD"
    };
    setEmiGroups([...emiGroups, newGroup]);
  };

  const handleAddMember = (groupId) => {
    const memberName = prompt("Enter member name:");
    if (!memberName) return;
    const group = emiGroups.find(g => g.id === groupId);
    const newMember = {
      id: emiMembers.length + 1,
      name: memberName,
      groupName: group.groupName,
      phone: "+91-0000000000",
      emiAmount: group.emiAmount,
      lastPayment: "",
      status: "Active",
      totalPaid: 0
    };
    setEmiMembers([...emiMembers, newMember]);
    setEmiGroups(prev => prev.map(g => 
      g.id === groupId ? { ...g, memberCount: g.memberCount + 1 } : g
    ));
  };

  const handleCollectEMI = (groupId) => {
    const confirmCollect = confirm("Mark EMI as collected for this group?");
    if (confirmCollect) {
      setEmiGroups(prev => prev.map(group => 
        group.id === groupId ? { ...group, status: "Paid" } : group
      ));
    }
  };

  const handleEdit = (groupId) => {
    const newGroupName = prompt("Enter new group name:");
    if (!newGroupName) return;
    setEmiGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, groupName: newGroupName } : group
      )
    );
  };

  const handleDelete = (groupId) => {
    const confirmDelete = confirm("Are you sure you want to delete this group?");
    if (confirmDelete) {
      setEmiGroups((prev) => prev.filter((group) => group.id !== groupId));
    }
  };

  const filteredGroups = emiGroups.filter(
    (group) =>
      group.groupName.toLowerCase().includes(searchTerm) ||
      group.leader.toLowerCase().includes(searchTerm) ||
      group.status.toLowerCase().includes(searchTerm)
  );

  const filteredMembers = emiMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearchTerm) ||
      member.groupName.toLowerCase().includes(memberSearchTerm) ||
      member.status.toLowerCase().includes(memberSearchTerm)
  );

  const filteredTransactions = emiTransactions.filter(
    (transaction) =>
      transaction.groupName.toLowerCase().includes(transactionSearchTerm) ||
      transaction.memberName.toLowerCase().includes(transactionSearchTerm) ||
      transaction.paymentMethod.toLowerCase().includes(transactionSearchTerm) ||
      transaction.status.toLowerCase().includes(transactionSearchTerm)
  );

  return (
    <div className="space-y-8">
      {/* EMI Groups Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <Users size={24} />
            EMI Groups Management
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCreateGroup}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Create Group
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search groups..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Members</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">EMI Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">EMI Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Leader</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quick Actions</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {group.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        {group.memberCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(group.emiDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <IndianRupee size={16} />
                        {group.emiAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        group.status === 'Paid' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {group.leader}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-green-400 hover:text-green-300 p-1 rounded"
                          onClick={() => handleAddMember(group.id)}
                          title="Add Member"
                        >
                          <UserPlus size={16} />
                        </button>
                        <button
                          className="text-blue-400 hover:text-blue-300 p-1 rounded"
                          onClick={() => handleCollectEMI(group.id)}
                          title="Collect EMI"
                        >
                          <IndianRupee size={16} />
                        </button>
                        <button
                          className="text-indigo-400 hover:text-indigo-300 p-1 rounded"
                          onClick={() => handleEdit(group.id)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300 p-1 rounded"
                          onClick={() => handleDelete(group.id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* EMI Members Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <Store size={24} />
            EMI Members Overview
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search members..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleMemberSearch}
              value={memberSearchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Member Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">EMI Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-400 py-4">No members found.</td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {member.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {member.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ₹{member.emiAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {member.lastPayment ? new Date(member.lastPayment).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ₹{member.totalPaid.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === 'Active' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {member.status}
                      </span>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Member</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {transaction.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ₹{transaction.amount.toLocaleString()}
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
