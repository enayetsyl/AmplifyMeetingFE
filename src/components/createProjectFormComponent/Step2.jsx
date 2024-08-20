import React, { useState, useEffect } from "react";
import HeadingLg from "../shared/HeadingLg";

const Step2 = ({ formData, setFormData, contacts, setContacts, isLoading }) => {

  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleChange = (index, role) => {
    setSelectedRoles((prevSelectedRoles) => ({
      ...prevSelectedRoles,
      [index]: role,
    }));
  };

  const handleAddClick = (index) => {
    const selectedContact = contacts[index];
    const role = selectedRoles[index];
  
    if (role) {
      // Remove the initial empty person object if it exists
      const updatedMembers = formData.members.filter((member) => member.userId);

  
      // Add the selected contact
      updatedMembers.push({
        userId: selectedContact._id,

        role: role,
      });
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        members: updatedMembers,
      }));
  
 
    }
  };
  

  if (isLoading) {
    return <p className="text-center text-5xl text-custom-dark-blue-1 font-bold">Loading... Please wait</p>;
  }

  return (
    <div className="px-5 md:px-0">
      <p className="text-custom-teal text-2xl font-bold text-center">Add People</p>

      {/* participant list div */}
      <div className="pt-3">
        <HeadingLg children="Participant List" />
        <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
          {contacts && contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-lg font-bold text-custom-dark-blue-1">NO PEOPLE FOUND</p>
              <p className="text-center text-sm text-custom-dark-blue-2">Try sharing the project after creating the project.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Name</th>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Role</th>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      <select
                        value={selectedRoles[index] || ""}
                        onChange={(e) => handleRoleChange(index, e.target.value)}
                        className="form-select"
                      >
                        <option value="" disabled>Select a role</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Observer">Observer</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      <button
                        onClick={() => handleAddClick(index)}
                        className="bg-custom-teal text-white px-4 py-2 rounded"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
