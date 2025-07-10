import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { AlertTriangle, DollarSign, Package, AudioLines, Users, UserPlus, Settings, CheckCircle, Plus } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import { useState } from "react";
import EMITable from "../components/overview/EMITable;";

const GroupManagementPage = () => {
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	const [showAddMemberModal, setShowAddMemberModal] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(null);

	const handleCreateGroup = () => {
		setShowCreateGroupModal(true);
	};

	const handleAddMember = (groupId) => {
		setSelectedGroup(groupId);
		setShowAddMemberModal(true);
	};

	const handleEditGroup = (groupId) => {
		// Edit group functionality
		console.log("Edit group:", groupId);
	};

	const handleSubmitForApproval = (groupId) => {
		// Submit group for approval
		console.log("Submit for approval:", groupId);
	};

	const handleViewStatus = (groupId) => {
		// View group status
		console.log("View status:", groupId);
	};

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Group Management' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Groups' icon={Package} value={45} color='#6366F1' />
					<StatCard name='Active Groups' icon={AudioLines} value={38} color='#10B981' />
					<StatCard name='Pending Approval' icon={AlertTriangle} value={7} color='#F59E0B' />
					<StatCard name='Total Members' icon={Users} value={542} color='#EF4444' />
				</motion.div>

				{/* GROUP MANAGEMENT ACTIONS */}
				<motion.div
					className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
							<Settings size={24} />
							Quick Actions
						</h2>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						{/* Create New Group */}
						<motion.button
							onClick={handleCreateGroup}
							className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Plus size={24} />
							<span className="text-sm font-medium">Create New Group</span>
						</motion.button>

						{/* Add/Remove Members */}
						<motion.button
							onClick={() => handleAddMember(null)}
							className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<UserPlus size={24} />
							<span className="text-sm font-medium">Add/Remove Members</span>
						</motion.button>

						{/* View Group Status */}
						<motion.button
							onClick={() => handleViewStatus(null)}
							className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<AlertTriangle size={24} />
							<span className="text-sm font-medium">View Group Status</span>
						</motion.button>

						{/* Edit Group Name/Leader */}
						<motion.button
							onClick={() => handleEditGroup(null)}
							className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Settings size={24} />
							<span className="text-sm font-medium">Edit Group/Leader</span>
						</motion.button>

						{/* Submit for Approval */}
						<motion.button
							onClick={() => handleSubmitForApproval(null)}
							className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<CheckCircle size={24} />
							<span className="text-sm font-medium">Submit for Approval</span>
						</motion.button>
					</div>
				</motion.div>

				{/* EMI GROUPS TABLE */}
				<EMITable/>

				{/* CREATE GROUP MODAL */}
				{showCreateGroupModal && (
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<motion.div
							className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
						>
							<h3 className="text-xl font-semibold text-gray-100 mb-4">Create New Group</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">Group Name</label>
									<input
										type="text"
										className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Enter group name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">Group Leader</label>
									<input
										type="text"
										className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Enter leader name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">EMI Amount</label>
									<input
										type="number"
										className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Enter EMI amount"
									/>
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<button
									onClick={() => setShowCreateGroupModal(false)}
									className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										// Handle create group logic
										setShowCreateGroupModal(false);
									}}
									className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
								>
									Create Group
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}

				{/* ADD MEMBER MODAL */}
				{showAddMemberModal && (
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<motion.div
							className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
						>
							<h3 className="text-xl font-semibold text-gray-100 mb-4">Add Member to Group</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">Select Group</label>
									<select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
										<option>Group Alpha</option>
										<option>Group Beta</option>
										<option>Group Gamma</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">Member Name</label>
									<input
										type="text"
										className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
										placeholder="Enter member name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
									<input
										type="tel"
										className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
										placeholder="Enter phone number"
									/>
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<button
									onClick={() => setShowAddMemberModal(false)}
									className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										// Handle add member logic
										setShowAddMemberModal(false);
									}}
									className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
								>
									Add Member
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8 mt-8'>
					{/* <SalesTrendChart />
					<CategoryDistributionChart /> */}
				</div>
			</main>
		</div>
	);
};

export default GroupManagementPage;
