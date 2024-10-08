import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axois";
import ProfileHeader from "./ProfileHeader";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkilledSection from "./SkilledSection";
import HobbiesPage from "./HobbiesPage";

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  
  const { data: authUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["authUser"],
  });

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/users/${username}`).then(res => res.data),
    enabled: !!username,
  });
  
  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
     const response= await axiosInstance.put("/users/profile", updatedData);
     console.log('Updating with data:', updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", username]);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  if (isAuthLoading || isUserProfileLoading) return <div>Loading...</div>;
  
  const isOwnProfile = authUser?.username === userProfile?.username;
  const userData = isOwnProfile ? authUser : userProfile;

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <AboutSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <ExperienceSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <EducationSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <SkilledSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <HobbiesPage
       userData={userData}
       isOwnProfile={isOwnProfile}
       onSave={handleSave}
      />

    </div>
  );
};

export default ProfilePage;