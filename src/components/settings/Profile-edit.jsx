import React from "react";

const EditProfileSection = () => {
  return (
    <div className="p-6 md:p-10 bg-[#0F172A] text-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-full h-full rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l9.707-9.707a1 1 0 000-1.414l-4.586-4.586a1 1 0 00-1.414 0L3 15v6z" />
            </svg>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Zhenya Rynzhuk"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="zhenyarynzhuk@gmail.com"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            placeholder="587-556-998-02"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">City</label>
          <input
            type="text"
            placeholder="Shanghai"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">State</label>
          <input
            type="text"
            placeholder="Hallen"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Zip Code</label>
          <input
            type="text"
            placeholder="7789"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">Country</label>
          <input
            type="text"
            placeholder="China"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-6 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition">
          Back To Home
        </button>
        <button className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileSection;
