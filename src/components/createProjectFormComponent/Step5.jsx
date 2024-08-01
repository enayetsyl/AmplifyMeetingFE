import React, { useState } from "react";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import { GoPlus } from "react-icons/go";
import Button from "../shared/Button";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import HeadingLg from "../shared/HeadingLg";
import ParagraphLg from "../shared/ParagraphLg";
import PoolModal from "../singleComponent/PoolModal";
import FormDropdownLabel from "../shared/FormDropdownLabel";

const Step5 = ({ formData, setFormData }) => {
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(true);

  const handleOpenPoolModal = () => {
    setIsPoolModalOpen(true);
  };
  const handleClosePoolModal = () => {
    setIsPoolModalOpen(false);
  };

  const removePool = (index) => {
    const updatedPool = formData.pools.filter((_, i) => i !== index);
    setFormData({ ...formData, pools: updatedPool });
  };

  const editPool = (index) => {
    // Write edit logic here
  };

  const activePoolsCount =
    formData?.pools?.filter((pool) => pool.active).length ?? 0;

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
            onClick={handleOpenPoolModal}
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
      {formData?.pools?.map((pool, index) => (
        <div key={index} className="py-3">
          <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
            <ParagraphLg className="w-[25%]">{pool.name}</ParagraphLg>
            <ParagraphLg className="w-[20%]">{`${pool.questions.length} ${
              pool.questions.length > 1 ? "Questions" : "Question"
            }`}</ParagraphLg>

            <ParagraphLg className="w-[20%]">{pool.creator}</ParagraphLg>
            <ParagraphLg className="w-[30%]">
              {pool.active ? <span>Active</span> : <span>Inctive</span>}
            </ParagraphLg>
            <div className="flex justify-end space-x-2 className='w-[5%]'">
              <button onClick={() => editPool(index)}>
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
          onClose={handleClosePoolModal}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Step5;
