"use client"
import Link from "next/link"

interface BottomWarningProps {
    label: string;
    buttonText: string;
    to: string;
}

export const BottomWarning = ({label, buttonText, to} : BottomWarningProps) => {
    return <div>
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link className="pointer underline pl-1 cursor-pointer" href={to}>
                {buttonText}
            </Link>
        </div>
    </div>
}