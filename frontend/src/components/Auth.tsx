import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "../../../common/src/index";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({type}: {type: "signup" | "signin"}) =>{
    const navigate=useNavigate();
    //@ts-ignore
    const [postInputs,setPostInputs]=useState<SignupInput>({
        //ideally we should have separate state for signin and signup but for now this works , as signin is a subset of signup,better define two separate components later and reuse as many parts as possible
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt=response.data.jwt;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }catch(e){
            alert(`${type==="signup"?"error while signing up":"error while signing in"}`)
        }

    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-4xl font-extrabold">
                            Create an Account
                        </div>
                        <div className="text-slate-500 pl-2">
                            {type==="signin"? "Don't have an account?": "Already have an account?"}
                            <Link className="pl-2 underline" to={type==="signin"? "/signup": "/signin"}>{type==="signin"?"Create one":"Login"}</Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type==="signup"?<LabelledInput label="Name" placeholder="Aryan Gupta..." onChange={(e)=>{
                            setPostInputs(c=>({
                                ...c,
                                name:e.target.value
                            }))
                        }}></LabelledInput>:null}
                        <LabelledInput label="Email" placeholder="aryan@gmail.com" onChange={(e)=>{
                            setPostInputs(c=>({
                                ...c,
                                email:e.target.value
                            }))
                        }}></LabelledInput>
                        <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                            setPostInputs(c=>({
                                ...c,
                                password:e.target.value
                            }))
                        }}></LabelledInput>
                        <button type="button" onClick={sendRequest} className =" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus: outline-none focus: ring-4
                        focus: ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                        dark: focus: ring-gray-700 dark:border-gray-700 cursor-pointer">{type === "signup" ?"Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface LabelledInputType {
    label:string,
    placeholder:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void
    type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return (
        <div>
            <div>
                <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
                <input onChange={onChange} type={type|| "text"}  className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
    )
}