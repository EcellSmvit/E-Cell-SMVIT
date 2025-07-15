import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo,useState } from "react";
import { toast } from "react-toastify";
import { Camera,Clock,MapPin,UserCheck,UserPlus,X } from "lucide-react";
import axios from "axios";

const ProfileHeader = ({userData, onSave , isOwnProfile}) =>{
    axios.defaults.withCredentials = true
    const backendUrl = import.meta.VITE_BACKEND_URL;
    const [isEditing,setIsEditing] = useState(false);
    const [editedData,setEditedData] = useState({});

    const {data : authUser } = useQuery({queryKey:["authUser"]});
    
}