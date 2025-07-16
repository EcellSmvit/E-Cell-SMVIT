import { School, X } from "lucide-react";
import { useState } from "react";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [educations, setEducations] = useState(userData.education || []);
	const [newEducation, setNewEducation] = useState({
		school: "",
		fieldOfStudy: "",
		startYear: "",
		endYear: "",
	});

	const handleAddEducation = () => {
		if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
			setEducations([...educations, newEducation]);
			setNewEducation({
				school: "",
				fieldOfStudy: "",
				startYear: "",
				endYear: "",
			});
		}
	};

	const handleDeleteEducation = (id) => {
		setEducations(educations.filter((edu) => edu._id !== id));
	};

	const handleSave = () => {
		onSave({ education: educations });
		setIsEditing(false);
	};

	return (
		<div className="bg-white/70 rounded-2xl shadow-md p-6 mb-8 border border-white/30">
			<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
				<School size={28} className="text-blue-600" />
				Education
			</h2>
			<div className="space-y-4 mb-6">
				{educations.map((edu) => (
					<div
						key={edu._id}
						className="flex items-start justify-between bg-gray-50 rounded-md p-4 border border-gray-200"
					>
						<div className="flex items-center gap-4">
							<School size={20} className="text-blue-500 flex-shrink-0" />
							<div>
								<h3 className="text-lg font-semibold text-gray-800">{edu.fieldOfStudy}</h3>
								<p className="text-gray-600">{edu.school}</p>
								<p className="text-gray-500 text-sm">
									{edu.startYear} - {edu.endYear || "Present"}
								</p>
							</div>
						</div>
						{isEditing && (
							<button
								onClick={() => handleDeleteEducation(edu._id)}
								className="ml-4 p-1 rounded hover:bg-red-100 transition"
								aria-label="Delete education"
							>
								<X size={20} className="text-red-500" />
							</button>
						)}
					</div>
				))}
			</div>
			{isEditing && (
				<div className="bg-gray-50 rounded-md p-4 mb-6 border border-gray-200">
					<div className="flex flex-col md:flex-row gap-4 mb-4">
						<input
							type="text"
							placeholder="School"
							value={newEducation.school}
							onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
							className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
						<input
							type="text"
							placeholder="Field of Study"
							value={newEducation.fieldOfStudy}
							onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
							className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>
					<div className="flex flex-col md:flex-row gap-4 mb-4">
						<input
							type="number"
							placeholder="Start Year"
							value={newEducation.startYear}
							onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
							className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
						<input
							type="number"
							placeholder="End Year"
							value={newEducation.endYear}
							onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
							className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>
					<button
						onClick={handleAddEducation}
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
					>
						Add Education
					</button>
				</div>
			)}

			{isOwnProfile && (
				<div className="flex gap-4">
					{isEditing ? (
						<button
							onClick={handleSave}
							className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold"
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
						>
							Edit Education
						</button>
					)}
				</div>
			)}
		</div>
	);
};
export default EducationSection;