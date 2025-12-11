import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-gray-100 h-screen flex flex-col p-4 space-y-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <Link 
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          href="/"
        >
          <span className="material-icons">home</span>
          Home
        </Link>

        <Link
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          href="profile"
        >
          <span className="material-icons">dashboard</span>
          Profile
        </Link>

        <Link
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          href="/settings"
        >
          <span className="material-icons">people</span>
          Settings
        </Link>
      </nav>

      <button className="mt-auto bg-red-600 p-2 rounded-lg hover:bg-red-500 transition">
        Logout
      </button>
    </div>
  );
}
