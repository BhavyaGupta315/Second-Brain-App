"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heading } from "./ui/Heading";
import { SubHeading } from "./ui/SubHeading";
import { InputBox } from "./ui/InputBox";
import { Button } from "./ui/button";
import { BottomWarning } from "./ui/BottomWarning";
import { ZodIssue } from "zod";

export default function SignupForm(){
    const [loading, setLoading] = useState(false);
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

    const handleSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/v1/signup", formData);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                router.push("/");
            }else{
                console.log(response.data.message);
            }
        }catch (err) {
        if (axios.isAxiosError(err)) {
            
            const errorData = err.response?.data;
            if (errorData?.error === "zod Error") {
                // Display Zod validation errors
                console.error("Zod validation errors:", errorData.message);
                alert(
                    (errorData.message as ZodIssue[])
                        .map((e) => `${e.path.join(".")} - ${e.message}`)
                        .join("\n")
                );
            } else {
                console.error("Signup error:", errorData?.message || err.message);
                alert("Signup failed: " + (errorData?.message || err.message));
            }
        } else {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred.");
        }
    }finally{
        setLoading(false);
    }
    }
    return <>
        <Heading label = "Sign Up"/>
        <SubHeading label = "Enter your Information to create an account" />

        <InputBox label="Username" placeholder="Enter your Username" onChange={handleChange} name="username"/>
        <InputBox label="Password" placeholder="Enter your Password" onChange={handleChange}  type="password" name="password"/>

        <div className="pt-4">
            <Button onClick={handleSignup}>{loading ? "Signing up..." : "Sign up"}</Button>
        </div>

        <BottomWarning label="Already have an account?" buttonText="Signin" to="/signin" />
    </>
}