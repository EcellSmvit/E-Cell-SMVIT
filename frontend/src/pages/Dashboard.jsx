import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<h2>Dashboard</h2>

			<div>
				<h3>Profile Information</h3>
				<p>Name: {user.name}</p>
				<p>Email: {user.email}</p>

				<h3>Account Activity</h3>
				<p>
					<span>Joined: </span>
					{new Date(user.createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
				<p>
					<span>Last Login: </span>
					{formatDate(user.lastLogin)}
				</p>
			</div>

			<button onClick={handleLogout}>Logout</button>
		</>
	);
};

export default DashboardPage;
