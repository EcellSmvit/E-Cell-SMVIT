import { Link } from "react-router-dom";
import { Home, UserPlus, Bell } from "lucide-react";

export default function Sidebar({ user }) {
  if (!user) return null; // Optional: prevents error when user is undefined

  return (
    <div
      style={{
        width: "250px",
        background: "#fff",
        borderRight: "1px solid #e5e5e5",
        paddingBottom: "1rem",
        minHeight: "100vh",
      }}
    >
      {/* Banner Image */}
      <div
        style={{
          height: "64px",
          backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Profile Image */}
      <div style={{ textAlign: "center", marginTop: "-40px" }}>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "3px solid white",
            }}
          />
          <h2 style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
            {user.name}
          </h2>
        </Link>
        <p style={{ fontSize: "0.9rem", color: "#555" }}>{user.headline}</p>
        <p style={{ fontSize: "0.85rem", color: "#777" }}>
          {user.connections?.length || 0} connections
        </p>
      </div>

      {/* Navigation Links */}
      <nav style={{ marginTop: "1.5rem" }}>
        <ul style={{ listStyle: "none", padding: "0" }}>
          <li style={{ padding: "0.5rem 1rem" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#333" }}>
              <Home size={20} /> Home
            </Link>
          </li>
          <li style={{ padding: "0.5rem 1rem" }}>
            <Link to="/network" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#333" }}>
              <UserPlus size={20} /> My Network
            </Link>
          </li>
          <li style={{ padding: "0.5rem 1rem" }}>
            <Link to="/notifications" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#333" }}>
              <Bell size={20} /> Notifications
            </Link>
          </li>
        </ul>
      </nav>

      {/* Profile Footer */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link
          to={`/profile/${user.username}`}
          style={{ fontSize: "0.9rem", textDecoration: "underline", color: "#4E46E4" }}
        >
          Visit your profile
        </Link>
      </div>
    </div>
  );
}
