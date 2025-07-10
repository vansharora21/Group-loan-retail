import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Download, FileText, Calendar, AlertTriangle, DollarSign } from "lucide-react";

const overdueEmiData = [
	{ 
		id: "EMI001", 
		customer: "John Doe", 
		loanAmount: 50000, 
		emiAmount: 2500, 
		dueDate: "2023-06-15", 
		overdueDays: 25, 
		status: "Overdue", 
		phone: "+1-555-0123",
		totalOutstanding: 47500
	},
	{ 
		id: "EMI002", 
		customer: "Jane Smith", 
		loanAmount: 75000, 
		emiAmount: 3750, 
		dueDate: "2023-06-20", 
		overdueDays: 20, 
		status: "Critical", 
		phone: "+1-555-0456",
		totalOutstanding: 71250
	},
	{ 
		id: "EMI003", 
		customer: "Bob Johnson", 
		loanAmount: 30000, 
		emiAmount: 1500, 
		dueDate: "2023-06-25", 
		overdueDays: 15, 
		status: "Overdue", 
		phone: "+1-555-0789",
		totalOutstanding: 28500
	},
	{ 
		id: "EMI004", 
		customer: "Alice Brown", 
		loanAmount: 100000, 
		emiAmount: 5000, 
		dueDate: "2023-06-10", 
		overdueDays: 30, 
		status: "Critical", 
		phone: "+1-555-0321",
		totalOutstanding: 95000
	},
	{ 
		id: "EMI005", 
		customer: "Charlie Wilson", 
		loanAmount: 25000, 
		emiAmount: 1250, 
		dueDate: "2023-06-28", 
		overdueDays: 12, 
		status: "Overdue", 
		phone: "+1-555-0654",
		totalOutstanding: 23750
	},
];

const collectionData = [
	{ 
		id: "COL001", 
		customer: "Eva Martinez", 
		collectedAmount: 3200, 
		collectionDate: "2023-07-01", 
		method: "Bank Transfer", 
		status: "Collected", 
		collectorName: "Agent Smith",
		remarks: "Full payment received"
	},
	{ 
		id: "COL002", 
		customer: "David Lee", 
		collectedAmount: 1800, 
		collectionDate: "2023-07-02", 
		method: "Cash", 
		status: "Collected", 
		collectorName: "Agent Johnson",
		remarks: "Partial payment"
	},
	{ 
		id: "COL003", 
		customer: "Grace Taylor", 
		collectedAmount: 2500, 
		collectionDate: "2023-07-03", 
		method: "Cheque", 
		status: "Pending", 
		collectorName: "Agent Brown",
		remarks: "Cheque under clearance"
	},
	{ 
		id: "COL004", 
		customer: "Michael Davis", 
		collectedAmount: 4200, 
		collectionDate: "2023-07-04", 
		method: "UPI", 
		status: "Collected", 
		collectorName: "Agent Wilson",
		remarks: "Online payment successful"
	},
	{ 
		id: "COL005", 
		customer: "Sarah Connor", 
		collectedAmount: 1500, 
		collectionDate: "2023-07-05", 
		method: "Bank Transfer", 
		status: "Failed", 
		collectorName: "Agent Davis",
		remarks: "Payment bounced"
	},
];

const EmiCollectionReports = () => {
	const [emiSearchTerm, setEmiSearchTerm] = useState("");
	const [collectionSearchTerm, setCollectionSearchTerm] = useState("");
	const [filteredEmiData, setFilteredEmiData] = useState(overdueEmiData);
	const [filteredCollectionData, setFilteredCollectionData] = useState(collectionData);

	const handleEmiSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setEmiSearchTerm(term);
		const filtered = overdueEmiData.filter(
			(emi) => emi.id.toLowerCase().includes(term) || emi.customer.toLowerCase().includes(term)
		);
		setFilteredEmiData(filtered);
	};

	const handleCollectionSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setCollectionSearchTerm(term);
		const filtered = collectionData.filter(
			(collection) => collection.id.toLowerCase().includes(term) || collection.customer.toLowerCase().includes(term)
		);
		setFilteredCollectionData(filtered);
	};

	const handleExportExcel = (type) => {
		// Excel export logic would go here
		alert(`Exporting ${type} report to Excel...`);
	};

	const handleExportPDF = (type) => {
		// PDF export logic would go here
		alert(`Exporting ${type} report to PDF...`);
	};

	return (
		<div className="space-y-8">
			{/* Overdue EMI Reports Table */}
			<motion.div
				className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
						<AlertTriangle className="text-red-400" size={24} />
						Overdue EMI Reports
					</h2>
					<div className="flex items-center gap-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Search EMI records..."
								className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={emiSearchTerm}
								onChange={handleEmiSearch}
							/>
							<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => handleExportExcel('EMI')}
								className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
							>
								<Download size={16} />
								Excel
							</button>
							<button
								onClick={() => handleExportPDF('EMI')}
								className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
							>
								<FileText size={16} />
								PDF
							</button>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-700">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									EMI ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Customer
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Loan Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									EMI Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Due Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Overdue Days
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Outstanding
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-700">
							{filteredEmiData.map((emi) => (
								<motion.tr
									key={emi.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
										{emi.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
										<div>
											<div>{emi.customer}</div>
											<div className="text-xs text-gray-400">{emi.phone}</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										${emi.loanAmount.toLocaleString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										${emi.emiAmount.toLocaleString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										{emi.dueDate}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<span className={`px-2 py-1 rounded-full text-xs font-medium ${
											emi.overdueDays > 30 ? 'bg-red-900 text-red-300' :
											emi.overdueDays > 15 ? 'bg-orange-900 text-orange-300' :
											'bg-yellow-900 text-yellow-300'
										}`}>
											{emi.overdueDays} days
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										${emi.totalOutstanding.toLocaleString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<span className={`px-2 py-1 rounded-full text-xs font-medium ${
											emi.status === "Critical" 
												? "bg-red-900 text-red-300" 
												: "bg-orange-900 text-orange-300"
										}`}>
											{emi.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<button className="text-indigo-400 hover:text-indigo-300 mr-2">
											<Eye size={18} />
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>

			{/* Collection Reports Table */}
			<motion.div
				className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
						<DollarSign className="text-green-400" size={24} />
						Collection Reports
					</h2>
					<div className="flex items-center gap-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Search collections..."
								className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={collectionSearchTerm}
								onChange={handleCollectionSearch}
							/>
							<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => handleExportExcel('Collection')}
								className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
							>
								<Download size={16} />
								Excel
							</button>
							<button
								onClick={() => handleExportPDF('Collection')}
								className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
							>
								<FileText size={16} />
								PDF
							</button>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-700">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Collection ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Customer
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Collection Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Method
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Collector
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Remarks
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-700">
							{filteredCollectionData.map((collection) => (
								<motion.tr
									key={collection.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
										{collection.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
										{collection.customer}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										${collection.collectedAmount.toLocaleString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										{collection.collectionDate}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">
											{collection.method}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										{collection.collectorName}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<span className={`px-2 py-1 rounded-full text-xs font-medium ${
											collection.status === "Collected" 
												? "bg-green-900 text-green-300" 
												: collection.status === "Pending"
												? "bg-yellow-900 text-yellow-300"
												: "bg-red-900 text-red-300"
										}`}>
											{collection.status}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
										<div className="truncate" title={collection.remarks}>
											{collection.remarks}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<button className="text-indigo-400 hover:text-indigo-300 mr-2">
											<Eye size={18} />
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	);
};

export default EmiCollectionReports;
	