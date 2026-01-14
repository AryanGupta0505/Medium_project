import { useNavigate } from "react-router-dom";
export function Back() {
    const navigate=useNavigate()
    return (
    <button
        onClick={()=>{
            navigate(-1);
        }}
        className="flex items-center gap-0.5 p-2 pr-4 rounded-full bg-white shadow-md 
                    hover:bg-gray-100 text-gray-700 "
        aria-label="Go back"
        >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-base font-medium">Back</span>
    </button>
    )
}