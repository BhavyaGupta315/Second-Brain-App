"use client"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heading } from "./ui/Heading";
import { SubHeading } from "./ui/SubHeading";
import { InputBox } from "./ui/InputBox";
import { Button } from "./ui/button";
import { BottomWarning } from "./ui/BottomWarning";

export default function SigninForm(){
    const [formData, setFormData] = useState({
        username : "",
        password : ""
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSignin = async () => {
        try {
            const response = await axios.post("/api/v1/signin", formData);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                router.push("/");
            }else{
                console.log(response.data.message);
            }
        }catch(error){
            const err = error as AxiosError<{ message?: string }>;
            if (err.response) {
                if (err.response.status === 404) {
                    alert("User not found!");
                }else{
                    console.log("Signin failed:", err.response.data);
                    alert(`Error: ${err.response.data.message || "Something went wrong!"}`);
                }
            }else{
                console.error("Network or server error:", err.message);
                alert("Network error. Please try again later.");
            }
        }
    }
    return <>
        <Heading label = "Sign In"/>
        <SubHeading label = "Enter your Credentials" />

        <InputBox label="Username" placeholder="Enter your Username" onChange={handleChange} name="username" />
        <InputBox label="Password" placeholder="Enter your Password" onChange={handleChange}  type="password" name="password" />

        <div className="pt-4">
            <Button onClick={handleSignin}> Sign in</Button>
        </div>

        <BottomWarning label="Don't have an account?" buttonText="Signup" to="/signup" />
    </>
}