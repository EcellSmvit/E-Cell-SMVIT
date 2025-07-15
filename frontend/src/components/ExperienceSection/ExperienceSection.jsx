import { Briefcase,X } from "lucide-react";
import { useState } from "react";
import{formatDate} from "../../utils/dateUtils.js"


const ExperienceSection = ({userData,isOwnProfile,onSave}) => {
    const[isEditing,setIsEditing] = useState(false);
    const[experiences,setExperiences] = useState(userData.experiences || []);
    const [newExperience,setNewExperience] = useState({
        title:"",
        company:"",
        startDate:"",
        endDate:"",
        description:"",
        currentlyWorking:false,
    });

    const handleAddExperience = () => {
        if(newExperience.title && newExperience.company && newExperience.startDate){
            setExperiences([...experiences,newExperience]);

            setNewExperience({
                title:"",
                company:"",
                startDate:"",
                endDate:"",
                description:"",
                currentlyWorking:false,
            });
        }
    };

    const handleDeleteExperience = (id) => {
        setExperiences(experiences.filter((exp) => exp._id !== id));
    };

    const handleSave = () => {
        onSave({experiences:experiences});
        setIsEditing(false);
    };

    const handleCurrentlyWorkingChange = (e) =>{
        setNewExperience({
            ...newExperience,
            currentlyWorking:e.target.checked,
            endDate: e.target.checked ? "" : newExperience.endDate,
        });
    };
    <div>
        <h2>Experience</h2>
        {experiences.map((exp) =>(
            <div key={exp.id}>
                <div>
                    <Briefcase/>
                    <div>
                        <h3>{exp.title}</h3>
                        <p>{exp.company}</p>
                        <p>
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) :"present"}
                        </p>
                        <p>{exp.description}</p>
                    </div>
                </div>
                {isEditing && (
                    <button onClick={() => handleDeleteExperience(exp._id)}>
                        <X size={20} />
                    </button>
                )}
            </div>
        ))}
        {isEditing && (
            <div>
                <input 
                    type="text"
                    placeholder="Title"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience({ ...newExperience,title:e.target.value})}
                />
                <input 
                    type="text" 
                    placeholder="Company"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                />
                <input 
                    type="date"
                    placeholder="Start Date"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}

                />
                <div>
                    <input 
                        type="checkbox"
                        id="currentlyWorking"
                        checked={newExperience.currentlyWorking}
                        onChange={handleCurrentlyWorkingChange}
                    />
                    <label htmlFor="currentlyWorking">I currently work here</label>
                </div>
                {!newExperience.currentlyWorking && (
                    <input
                        type='date'
                        placeholder='End Date'
                        value={newExperience.endDate}
                        onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                        />
                    )}
                    <textarea
                        placeholder='Description'
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    />
                    <button
                        onClick={handleAddExperience}
                    >
                        Add Experience
                    </button>
            </div>
        )}
        {isOwnProfile && (
            <>
                {isEditing ? (
                    <button onClick={handleSave} >
                        Save Changes
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>
                        Edit Experiences
                    </button>
                )}
            </>
            )}
    </div>
}

export default ExperienceSection;