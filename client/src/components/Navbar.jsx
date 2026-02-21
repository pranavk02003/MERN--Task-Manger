

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center border-b border-gray-700">
      <h1 className="text-xl font-bold text-purple-400">
        Personal Task Manager 📝
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;