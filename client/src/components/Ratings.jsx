import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
const Ratings = ({ ratings }) => {
  return (
    <>
      {ratings >= 1 ? (
        <span className="text-warning">
          <FaStar />
        </span>
      ) : ratings >= 0.5 ? (
        <span className="text-warning">
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className="text-warning">
          <CiStar />
        </span>
      )}
      {ratings >= 2 ? (
        <span className="text-warning">
          <FaStar />
        </span>
      ) : ratings >= 1.5 ? (
        <span className="text-warning">
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className="text-warning">
          <CiStar />
        </span>
      )}
      {ratings >= 3 ? (
        <span className="text-warning">
          <FaStar />
        </span>
      ) : ratings >= 2.5 ? (
        <span className="text-warning">
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className="text-warning">
          <CiStar />
        </span>
      )}
      {ratings >= 4 ? (
        <span className="text-warning">
          <FaStar />
        </span>
      ) : ratings >= 3.5 ? (
        <span className="text-warning">
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className="text-warning">
          <CiStar />
        </span>
      )}
      {ratings >= 5 ? (
        <span className="text-warning">
          <FaStar />
        </span>
      ) : ratings >= 4.5 ? (
        <span className="text-warning">
          <FaStarHalfAlt />
        </span>
      ) : (
        <span className="text-warning">
          <CiStar />
        </span>
      )}
    </>
  );
};

export default Ratings;
