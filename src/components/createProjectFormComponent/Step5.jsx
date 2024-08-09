import React, { useState, useEffect } from "react";
import axios from "axios";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import { GoPlus } from "react-icons/go";
import Button from "../shared/Button";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import HeadingLg from "../shared/HeadingLg";
import ParagraphLg from "../shared/ParagraphLg";
import EditPoolModal from "../singleComponent/EditPoolModal"; // Import the new modal component
import FormDropdownLabel from "../shared/FormDropdownLabel";
import PoolModal from "../singleComponent/PoolModal";

const Step5 = ({ formData, setFormData }) => {
  const [pools, setPools] = useState([]);
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
  const [isEditPoolModalOpen, setIsEditPoolModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPool, setCurrentPool] = useState(null); // State to store the pool being edited

  // Fetch polls from the API
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8008/api/get-all/poll",
          {
            params: { page: 1, limit: 10 }, // Adjust page and limit as needed
          }
        );
        setPools(response.data.polls);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleOpenPoolModal = () => {
    setIsPoolModalOpen(true);
  };

  const handleOpenEditPoolModal = (pool) => {
    setCurrentPool(pool);
    setIsEditPoolModalOpen(true);
  };

  const handleCloseEditPoolModal = () => {
    setIsEditPoolModalOpen(false);
    setCurrentPool(null); // Clear current pool data when modal is closed
  };

  const deletePoll = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8008/api/delete/poll/${id}`);

      if (response.status !== 200) {
        throw new Error('Failed to delete poll');
      }

      console.log(response.data.message);
      return true;
    } catch (error) {
      console.error('Error deleting poll:', error);
      return false;
    }
  };

  const removePool = async (index) => {
    const poolId = pools[index]._id; // Assuming each pool has a unique ID

    try {
      const success = await deletePoll(poolId);

      if (success) {
        const updatedPools = pools.filter((_, i) => i !== index);
        setPools(updatedPools);
      }
    } catch (error) {
      console.error('Failed to delete pool:', error);
    }
  };

  const handleSaveEditPool = (event) => {
    event.preventDefault();
    // Handle saving the edited pool data
    handleCloseEditPoolModal();
  };

  const activePoolsCount = pools.filter((pool) => pool.isActive).length ?? 0;

  return (
    <div>
      <HeadingBlue25px children="Polls" />
      <div className="flex justify-between items-center py-5">
        <FormDropdownLabel
          children={`You have ${activePoolsCount} active poll${
            activePoolsCount !== 1 ? "s" : ""
          } for this meeting.`}
          className="text-custom-dark-blue-1"
        />

        <div>
          <Button
            type="button"
            variant="save"
            children="Add New"
            className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
            icon={<GoPlus />}
            onClick={handleOpenPoolModal} // Open modal for creating a new pool
          />
        </div>
      </div>
      <div className="flex justify-start items-center px-3">
        <div className="w-[25%]">
          <HeadingLg children="Name" />
        </div>
        <div className="w-[20%]">
          <HeadingLg children="Total Questions" />
        </div>
        <div className="w-[20%]">
          <HeadingLg children="Creator" />
        </div>
        <div className="w-[35%]">
          <HeadingLg children="Status" />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading &&
        !error &&
        pools.map((pool, index) => (
          <div key={index} className="py-3">
            <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
              <ParagraphLg className="w-[25%]">{pool.pollName}</ParagraphLg>
              <ParagraphLg className="w-[20%]">{`${pool.questions.length} ${
                pool.questions.length > 1 ? "Questions" : "Question"
              }`}</ParagraphLg>

              <ParagraphLg className="w-[20%]">{pool.creator}</ParagraphLg>
              <ParagraphLg className="w-[30%]">
                {pool.isActive ? <span>Active</span> : <span>Inactive</span>}
              </ParagraphLg>
              <div className="flex justify-end space-x-2">
                <button onClick={() => handleOpenEditPoolModal(pool._id)}>
                  <RiPencilFill className="bg-custom-teal text-white p-2 text-3xl rounded-xl cursor-pointer" />
                </button>
                <button onClick={() => removePool(index)}>
                  <IoTrashSharp className="bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        ))}

      {isPoolModalOpen && (
        <PoolModal
          isOpen={isPoolModalOpen}
          onClose={handleCloseEditPoolModal}
          pool={currentPool}
          onSave={handleSaveEditPool}
        />
      )}
      {isEditPoolModalOpen && (
        <EditPoolModal
          isOpen={isEditPoolModalOpen}
          onClose={handleCloseEditPoolModal}
          pools={currentPool}
          onSave={handleSaveEditPool}
        />
      )}
    </div>
  );
};

export default Step5;
