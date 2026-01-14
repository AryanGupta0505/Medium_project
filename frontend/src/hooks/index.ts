import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
export interface Blog{
    id: string;
    title:string;
    content:string;
    createdAt:string;
    author:{
        name:string;
        id:string;
    }
}
export interface ProfileType {
    name: string;
    email: string;
    password: string;
}
export interface UserProfileType{
    name: string;
    email: string;
}
export const useBlog = ({id}:{id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const [val,setVal]=useState(true);


    useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).
    then( response => {
        setBlog(response.data.post);
        setVal(response.data.value);
        setLoading(false);
    })
    }, [id]);

    return { loading, blog ,val};
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).
    then( response => {
        setBlogs (response.data.posts);
        setLoading(false);
    })
    }, []);

    return { loading, blogs };
}
export const useProfileBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [profileBlogs, setProfileBlogs] = useState<Blog[]>([]);
    const fetchBlogs=()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
            setProfileBlogs(response.data.posts);
            setLoading(false);
        })
    }
    useEffect(()=>{
        fetchBlogs()
    },[]);
    return {loading,profileBlogs,refetch:fetchBlogs};
}
export const useProfile = () => {
    const [profile,setProfile]=useState<ProfileType>({
        name: "",
        email: "",
        password: ""
    });
    const[profileLoading,setProfileLoading]=useState(true);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/user/me`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
            if(response.data.user.name===null){
                response.data.user.name="Anonymous"
            }
            setProfile(response.data.user);
            setProfileLoading(false)
        })
    },[]);
    return {profile,profileLoading};
}
export const useUserBlogs=({userId}:{userId:string})=>{
    const [loading, setLoading] = useState(true);
    const [userBlogs,setUserBlogs]=useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/userBlogs/${userId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
            setUserBlogs(response.data.userPosts)
            setLoading(false)
        })
    },[])
    return {loading,userBlogs}
}
export const useUserProfile=({userId}:{userId:string})=>{
    const[userProfile,setUserProfile]=useState<UserProfileType>({
        name:"",
        email:""
    })
    const [userProfileLoading,setUserProfileLoading]=useState(true);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/user/userProfile/${userId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
            if(response.data.userProfile.name===null){
                response.data.userProfile.name="Anonymous"
            }
            setUserProfile(response.data.userProfile);
            setUserProfileLoading(false)
        })
    },[]);
    return {userProfile,userProfileLoading};
}