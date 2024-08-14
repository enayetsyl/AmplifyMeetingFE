import React, { useState } from "react";
import InputField from "../shared/InputField";
import Button from "../shared/Button";
import { useGlobalContext } from "@/context/GlobalContext";

const AddContactModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [roles, setRoles] = useState({
    Admin: false,
    Moderator: false,
    Observer: false,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const {user } = useGlobalContext()
console.log(user)
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRoles((prevRoles) => ({
      ...prevRoles,
      [name]: checked,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedRoles = Object.keys(roles).filter((role) => roles[role]);
    console.log(firstName, lastName, email, companyName, selectedRoles)

    try {
      const response = await fetch(
        "http://localhost:8008/api/create/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            companyName,
            roles: selectedRoles,
            createdBy: user._id
          }),
        }
      );


    // Optionally, log the response status and statusText
    console.log('Status Text:', response.statusText);

    // If the response has a body, you can log that as well
    const responseData = await response.json();
    console.log('Response Data:', responseData);


      if (response.ok) {
        setSuccessMessage("Contact created successfully.");
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        setSuccessMessage(null);
      }
    } catch (error) {
      console.log(error)
      setError(error.message);
      setSuccessMessage(null);
    } finally {
      console.log(error)
      onClose()
    }
  };

  const handleCloseErrorModal = () => {
    setError(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">
          Add New Contact
        </h2>

        {error && (
          <div className="text-red-500 mb-4">
            {error} <button onClick={handleCloseErrorModal}>Close</button>
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-3">
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Company Name"
            type="text"
            name="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          {/* Role Checkboxes */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">Role</label>
            <div className="flex flex-col mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="Admin"
                  checked={roles.admin}
                  onChange={handleCheckboxChange}
                  className="form-checkbox cursor-pointer"
                />
                <span className="ml-2">Admin</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name="Moderator"
                  checked={roles.moderator}
                  onChange={handleCheckboxChange}
                  className="form-checkbox cursor-pointer"
                />
                <span className="ml-2">Moderator</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name="Observer"
                  checked={roles.observer}
                  onChange={handleCheckboxChange}
                  className="form-checkbox cursor-pointer"
                />
                <span className="ml-2">Observer</span>
              </label>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="submit"
              variant="save"
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#09828F69]"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
