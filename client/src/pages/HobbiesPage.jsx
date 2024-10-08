import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axois";
import toast from "react-hot-toast";

const HobbiesPage = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [hobbies, setHobbies] = useState(userData.hobbie || []);
	const [newHobbie, setNewHobbie] = useState("");

	const handleAddHobbie = () => {
		if (newHobbie && !hobbies.includes(newHobbie)) {
			setHobbies([...hobbies, newHobbie]);
			setNewHobbie("");
		}
	};
    useEffect(() => {
        if (userData && userData.hobbies) {
            setHobbies(userData.hobbies);
        }
      }, [userData]);
	const handleDeleteHobbie = (hobbie) => {
		setHobbies(hobbies.filter((s) => s !== hobbie));
	};

	const handleSave = async () => {
        try {
            await axiosInstance.put(`/users/profile`, { hobbies });
            toast.success('Hobbies updated successfully');
            setIsEditing(false); // Exit editing mode after saving
        } catch (error) {
            console.error('Failed to update hobbies:', error);
            toast.error('Error updating hobbies');
        }
    };
    


	return (
		<div className='bg-white shadow rounded-lg p-6'>
			<h2 className='text-xl font-semibold mb-4'>Hobbies</h2>
			<div className='flex flex-wrap'>
				{hobbies.map((Hobbie, index) => (
					<span
						key={index}
						className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'
					>
						{Hobbie}
						{isEditing && (
							<button onClick={() => handleDeleteHobbie(Hobbie)} className='ml-2 text-red-500'>
								<X size={14} />
							</button>
						)}
					</span>
				))}
			</div>

			{isEditing && (
				<div className='mt-4 flex'>
					<input
						type='text'
						placeholder='New Skill'
						value={newHobbie}
						onChange={(e) => setNewHobbie(e.target.value)}
						className='flex-grow p-2 border rounded-l'
					/>
					<button
						onClick={handleAddHobbie}
						className='bg-primary text-white py-2 px-4 rounded-r hover:bg-primary-dark transition duration-300'
					>
						Add Hobbies
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-4 text-primary hover:text-primary-dark transition duration-300'
						>
							Edit Hobbies
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default HobbiesPage;