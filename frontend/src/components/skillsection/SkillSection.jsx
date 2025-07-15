import { useState } from "react";
import { X } from "lucide-react";

const SkillSection = ({userData,isOwnProfile,onSave}) => {
    const [isEditing,setIsEditing] = useState(false);
    const [skills,setSkills] = useState(userData.skills || []);
    const [newSkill,setNewSkill] = useState("");

    const handleAddSkill = () =>{
        if(newSkill && !skills.includes(newSkill)){
            setSkills([...skills,newSkill]);
            setNewSkill("")
        }
    };
    const handleDeleteSkill = (skill) =>{
        setSkills(skills.filter((s) => s !== skill));
    };

    const handleSave = () =>{
        onSave({skills});
        setIsEditing(false);
    };

    return(
        <div>
            <h2>Skills</h2>
            <div>
                {skills.map((skill,index) =>(
                    <span key={index}>
                        {skill}
                        {isEditing && (
                            <button onClick={() => handleDeleteSkill(skill)}>
                                <X size={14}/>
                            </button>
                        )}
                    </span>
                ))}
            </div>
            {isEditing &&(
                <div>
                    <input 
                        type="text"
                        placeholder="New Skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button onClick={handleAddSkill}>
                        Add Skill
                    </button>
                </div>
            )}
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <button onClick={handleSave}>
                            Save Change
                        </button>
                        
                    ):(
                        <button onClick={() => setIsEditing(true)}>
                            Edit Skills
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default SkillSection