import React, { useState, useEffect } from "react";
import { School, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { axiosInstance } from "../lib/axois";
import mongoose from "mongoose";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({
    school: "",
    fieldofstudy: "",
    startYear: "",
    endYear: "",
    grade:""
  });

  useEffect(() => {
    if (userData && Array.isArray(userData.education)) {
      setEducations(userData.education);
    }
  }, [userData]);

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.fieldofstudy && newEducation.startYear) {
      setEducations([...educations, { ...newEducation,  _id: new mongoose.Types.ObjectId().toString(), }]);
      setNewEducation({
        school: "",
        fieldofstudy: "",
        startYear: "",
        endYear: "",
        grade:""
      });
    }
  };

  const handleDeleteEducation = (id) => {
    setEducations(educations.filter((edu) => edu._id !== id));
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put("/users/profile", { education: educations });
      if (response.data) {
        onSave({ education: educations });
        setIsEditing(false);
        toast.success("Education updated successfully!");
      }
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error("Failed to update education. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow rounded p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      {educations.map((edu) => (
        <div key={edu._id} className="mb-4 flex justify-between items-start">
          <div className="flex items-start">
            <School className="mr-2 mt-1" size={20} />
            <div>
              <p className=" font-semibold">{edu.school}</p>
              <h3 className="text-gray-600">Branch {edu.fieldofstudy}</h3>
              <h3 className="text-gray-600">Grade {edu.grade}</h3>
              <p className="text-gray-500 text-sm">
                {edu.startYear} - {edu.endYear || "Present"} 
              </p>
            </div>
          </div>
          {isEditing && (
            <button onClick={() => handleDeleteEducation(edu._id)} className="text-red-500">
              <X size={20} />
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="School"
            value={newEducation.school}
            onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Field Of Study"
            value={newEducation.fieldofstudy}
            onChange={(e) => setNewEducation({ ...newEducation, fieldofstudy: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Start Year"
            value={newEducation.startYear}
            onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="End Year"
            value={newEducation.endYear}
            onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
           <input
            type="text"
            placeholder="Grade or Percentage"
            value={newEducation.grade}
            onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleAddEducation}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-2"
          >
            Add Education
          </button>
        </div>
      )}
      {isOwnProfile && (
        <>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 text-primary hover:text-primary-dark transition duration-300"
            >
              Edit Education
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EducationSection;