import { LuFolderSearch } from "react-icons/lu";

const NoSearchResult = () => {
  return (
    <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5 pt-32">
            <LuFolderSearch className="text-[200px]  text-[#f3f4f5]"/>
            <h1 className="text-custom-dark-blue-1 text-4xl font-bold text-center">
            NO RESULTS FOUND
            </h1>
            <p className="text-center text-2xl text-[#031f3a] ">Ooops… We can't find any projects matching your search. <br /> Try searching again.</p>
        </div>
    </div>
  )
}

export default NoSearchResult