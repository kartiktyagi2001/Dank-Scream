import { useState } from "react";
import axios from "axios";

export default function Auth(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [state, setState] = useState('signin');
    const [user, setUser] = useState(null);
    const [showAuth, setShowAuth] = useState(true);
    const [error, setError] = useState(null);

    const handleAuth = async(event)=>{

        console.log("check handler is fired")

        event.preventDefault();

        if (!email || !password) {
            console.error('Email and password are required');
            return;
        }
    
        if (state === 'signup' && (!firstName || !lastName)) {
            console.error('All fields are required for signup');
            return;
        }

        try {
            const {data} = await axios.post(`http://localhost:3000/user/${state}`, {
                email,
                password,
                ...(state === 'signup' && {firstName, lastName})
            });

            console.log("Response data:", data);


            if(data.success){
                setUser(data.user);
                setShowAuth(false);
            } else{
                setError(data.message || "Authentication failed!")
            }
        } catch(error){
            const errmsg = error.response?.data?.message || error.message || "Network error!"

            setError(errmsg);
        }
    };

    //Resets form fields when switching state
    const switchState = (mode) => {
        setState(mode);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    };

    if (!showAuth) return null; //outer div onclick will not work because the div won't be able to know if the state is updated
    
    return(
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-transparent backdrop-blur-xs' onClick={()=>setShowAuth(false)}>
            <form onSubmit={handleAuth} onClick={(e) => e.stopPropagation()} className="bg-slate-300 p-6 rounded-lg w-[80%] max-w-sm shadow-2xl space-y-4">
                <p className="flex gap-1 justify-center text-slate-900 text-lg mb-6">
                    <span>User</span> {state === 'signin'? 'Signin' : "Signup"}
                </p>

                {state === 'signup' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-900">First Name</label>
                            <input type="text" value={firstName} placeholder="Kartik" onChange={(e)=> setFirstName(e.target.value)} className="w-full border px-2 py-1 rounded-sm mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-900">Last Name</label>
                            <input type="text" value={lastName} placeholder="Tyagi" onChange={(e)=> setLastName(e.target.value)} className="w-full border px-2 py-1 rounded-sm mt-1 " />
                        </div>
                    </div>
                )}

                <div>
                    <p className="block text-sm font-medium text-slate-900">Email</p>
                    <input type="email" value={email} placeholder="kartik@mail.com" onChange={(e)=> setEmail(e.target.value)} className="w-full border px-2 py-1 rounded-sm mt-1" />
                </div>

                <div>
                    <p className="block text-sm font-medium text-slate-900">Password</p>
                    <input type="password" value={password} placeholder="123@pwd" onChange={(e) => setPassword(e.target.value)} className="w-full border px-2 py-1 rounded-sm mt-1" />
                </div>

                {state === 'signin' ? (
                    <p >
                        New User? <span onClick={()=>switchState("signup")} className="cursor-pointer underline text-slate-600">Signup here</span>
                    </p>
                ): (
                    <p className="text-slate-900">
                        Existing User? <span onClick={()=>switchState("signin")} className="cursor-pointer text-slate-600 underline">Signin here</span>
                    </p>
                )}

                <button type="submit" 
                className='w-full bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-md mt-2 transform active:scale-95 transition duration-150 ease-in-out'>
                    {state === "signup" ? "Create Account" : "Signin"}
                </button>
            </form>
        </div>
    )
}


