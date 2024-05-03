import SearchBar from "@/Components/Feed/SearchBar/Searchbar";
import Status from "@/Components/Feed/SearchBar/Status";
import JobListContainer from "@/Components/Jobs/JobsContainer";
import { Navbar } from "@/layout";
import React from "react";

function Feed() {
    return (
      <>
        {' '}
        <div className="">
          <Navbar />
        </div>
        <div className="Container py-2">
          <SearchBar />
        </div>
        <div className="grid gap-4 grid-cols-2 p-5">
        <Status />
          <JobListContainer />
        </div>
      </>
    );
    }
    export default Feed;