import { useContext } from 'react';
import { UserProfileContext } from '../context/UserProfileContext';
import Header from './Header';
import ButtonGradient from '../assets/svg/ButtonGradient';

const EditUserProfile = () => {
  const {
    userData,
    editMode,
    handleSubmit,
    handleProfilePicChange,
    handleEdit,
    toggleEditMode,
    addSkill,
    removeSkill,
    handleSkillChange,
  } = useContext(UserProfileContext);

  return (
    <div>
      <Header />
      <div className="flex h-[670px] mt-16">
        <div className="w-[20%] px-2 bg-[#020617] border-r-[1px] border-gray-800">
          <div className="flex justify-center mt-10">
            <img className="rounded-full w-32 h-32" src={userData.profilePicUrl} alt="ProfilePic" />
          </div>
          <div className="mt-4 flex justify-center">
            <label className="block">
              <input
                type="file"
                onChange={handleProfilePicChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
          </div>
          <div className="mt-4">
            <h1 className="text-center font-semibold text-3xl">{userData.name}</h1>
            <p className="text-center">{userData.address}</p>
            <div className="mt-4">
              <h3 className="text-md font-semibold">About:</h3>
              <p className="text-sm">{userData.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#020617] w-[80%] pt-5 flex flex-col items-center">
          <h1 className="text-3xl font-bold">Profile Details</h1>
          <div className="flex mt-10 w-[80%] flex-col bg-[#0F172A] p-6 rounded-lg shadow-lg">
            {Object.keys(userData).map((field) => (
              field !== 'profilePicUrl' && field !== 'skills' && (
                <div key={field} className="mb-4 flex items-center">
                  <div className="w-[80%]">
                    <label className="block text-white text-sm font-bold mb-2 capitalize">
                      {field}:
                    </label>
                    {editMode[field] ? (
                      field === 'description' ? (
                        <textarea
                          required
                          value={userData[field]}
                          onChange={(e) => handleEdit(field, e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          value={userData[field]}
                          required
                          onChange={(e) => handleEdit(field, e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                      )
                    ) : (
                      <p className="text-sm text-white">{userData[field]}</p>
                    )}
                  </div>
                  <div className="w-[20%] text-right">
                    <button
                      onClick={() => toggleEditMode(field)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {editMode[field] ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
              )
            ))}
            {editMode.skills && (
              <div className="bg-red-300 p-2 m-2">
                <p>Skills</p>
                <div className="grid grid-cols-5 gap-2">
                  {userData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      {editMode.skills ? (
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        <p className="text-sm text-gray-800">{skill}</p>
                      )}
                      {editMode.skills && (
                        <button
                          onClick={() => removeSkill(index)}
                          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {editMode.skills && (
                  <button
                    onClick={addSkill}
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Skill
                  </button>
                )}
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
