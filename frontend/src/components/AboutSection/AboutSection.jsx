import { useState } from "react";

const AboutSection =({userData,isOwnProfile,onSave}) => {
    const[isEditing,setIsEditing] = useState(false);
    const[about,setAbout] = useState(userData.about || "");

    console.log(userData);

    const handleSave = () =>{
        setIsEditing(false);
        onSave({ about })
    };
    return(
        <div>
            <h2>About</h2>
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            />
                            <button onClick={handleSave}>
                                Save
                            </button>
                        </>
                    ):(
                        <>
                            <p>{userData.about}</p>
                            <button onClick={() => setIsEditing(true)}>
                                Edit
                            </button>
                        </>
                    )}
                </>
            )}
            {!isOwnProfile && <p>{userData.about}</p>}
        </div>
    )
}

export default AboutSection