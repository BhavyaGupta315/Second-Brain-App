// Extending this because of Other Props
interface InputBox extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({label, placeholder, onChange, ...otherProps} : InputBox)=>{
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" {...otherProps}/>
    </div>
}