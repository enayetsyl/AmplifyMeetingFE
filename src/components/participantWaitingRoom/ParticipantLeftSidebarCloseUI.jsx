import { BsChatSquareFill } from "react-icons/bs";
import Button from "../shared/button";
import { LuClipboardSignature } from "react-icons/lu";

const participant = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "John Doe",
  },
  {
    id: 3,
    name: "John Doe",
  },
  {
    id: 4,
    name: "John Doe",
  },
  {
    id: 5,
    name: "John Doe",
  },
]


const ParticipantLeftSidebarCloseUI = () => {
  return (
    <>
      <div className="">
        
        {/* Backroom chat and icon */}
        <div className="flex justify-center items-center pb-4 pt-14 ">
          <BsChatSquareFill className="text-custom-dark-blue-1" />
        </div>

        {/* chat container */}
        <div className="flex flex-col pb-2 pt-4 bg-custom-gray-8 mb-2 rounded-xl overflow-y-auto mx-1 max-h-[50vh]">
          <div className="flex flex-col justify-center items-center gap-2 pb-2 ">
            
          </div>

          {/* participants container */}

          {/* Participant chat */}
          {participant.map((chat) => (
              <div
                key={chat.id}
                className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer relative"
                onClick={() => setSelectedChat(chat)}
              >
               <p className="text-[#1a1a1a] text-sm" >{chat.name}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ParticipantLeftSidebarCloseUI;
