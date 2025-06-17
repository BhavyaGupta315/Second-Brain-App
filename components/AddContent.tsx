"use client"
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { DialogClose } from "@/components/ui/dialog";

// const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1";

export default function AddContent({onContentAdded} : {onContentAdded : () => void}) {
  const [formData, setFormData] = useState({
    link: "",
    type: "youtube",
    title: "",
    tags: [""],
  });
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === "tags" && typeof index === "number"){
      const newTags = [...formData.tags];
      newTags[index] = value;
      setFormData({ ...formData, tags: newTags });
    }else{
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTag = () => setFormData({ ...formData, tags: [...formData.tags, ""] });

  const removeTag = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const handleOnClick = async () => {
        if(formData.link == "" || formData.title == "" || formData.tags.length == 0){
            alert("Please fill all the fields and atleast 1 tag");
            return;
        }
        const token = localStorage.getItem('token');
        await axios.post(`/api/v1/content`, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        })
        const success = true;

        if (success && closeRef.current) {
          closeRef.current.click(); 
          onContentAdded();
        }
  }

  return (
    <>
      <div className="p-2">
        <label className="block text-sm font-medium text-gray-700">Link</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="p-2">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="youtube">Youtube</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">Linkedin</option>
          <option value="link">Link</option>
        </select>
      </div>

      <div className="p-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="p-2">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex items-center space-x-2 mt-1">
            <input
              type="text"
              name="tags"
              value={tag}
              onChange={(e) => handleChange(e, index)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-red-400 hover:text-red-700 hover:cursor-pointer "
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTag}
          className="mt-2 text-blue-600 hover:underline hover:cursor-pointer text-sm p-1"
        >
          + Add Tag
        </button>
      </div>

      <Button
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={handleOnClick}
      >
        Submit
      </Button>
      <DialogClose asChild>
        <button
          type="button"
          ref={closeRef}
          className="hidden"
        />
      </DialogClose>
    </>
  );
}
