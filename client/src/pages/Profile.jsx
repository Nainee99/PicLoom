export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full">
              {/* Profile image will be added here */}
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Name</h1>
              <p className="text-gray-600">@username</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="font-bold">0</div>
              <div className="text-gray-600">Pins</div>
            </div>
            <div>
              <div className="font-bold">0</div>
              <div className="text-gray-600">Followers</div>
            </div>
            <div>
              <div className="font-bold">0</div>
              <div className="text-gray-600">Following</div>
            </div>
          </div>
          <p className="text-gray-700">No bio added yet.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User's pins will be displayed here */}
          <div className="text-center text-gray-500">
            No pins created yet.
          </div>
        </div>
      </div>
    </div>
  );
}