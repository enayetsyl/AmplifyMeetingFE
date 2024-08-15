import React, { useState, useEffect } from "react";
import HeadingLg from "../shared/HeadingLg";

const Step2 = ({ formData, setFormData, contacts, setContacts, isLoading }) => {
 

  const handleRoleChange = (index, role) => {
    const updatedContacts = [...contacts];
    const contactRoles = updatedContacts[index].roles;

    if (contactRoles.includes(role)) {
      // Remove the role if it is already selected
      updatedContacts[index].roles = contactRoles.filter(r => r !== role);
    } else {
      // Add the role if it is not already selected
      updatedContacts[index].roles.push(role);
    }

    setContacts(updatedContacts);

    // Update the formData in the parent component
    const updatedPeople = [...formData.people];
    updatedPeople[index] = {
      ...updatedContacts[index],
      roles: updatedContacts[index].roles,
    };
    setFormData(prevFormData => ({
      ...prevFormData,
      people: updatedPeople
    }));
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
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Admin</th>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Moderator</th>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Observer</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      <input
                        type="checkbox"
                        checked={contact.roles.includes('Admin')}
                        onChange={() => handleRoleChange(index, 'Admin')}
                        className="form-checkbox"
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      <input
                        type="checkbox"
                        checked={contact.roles.includes('Moderator')}
                        onChange={() => handleRoleChange(index, 'Moderator')}
                        className="form-checkbox"
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      <input
                        type="checkbox"
                        checked={contact.roles.includes('Observer')}
                        onChange={() => handleRoleChange(index, 'Observer')}
                        className="form-checkbox"
                      />
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
