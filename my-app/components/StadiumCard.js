import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/StadiumCard.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const MatchCard = ({
  _id,
  name,
  columns,
  rows,
  clickable=true,
  showEditIcon,
}) => {
  const router = useRouter();

  const props = {
    id: _id,
    name: name,
    columns: columns,
    rows: rows,
  };
  console.log(props);

  const[stadiumDetails, setStadiumDetails] = useState(props);


  const onEdit = () => {
  };


  return (
    <div className={`card ${clickable ? "clickable" : "unclickable"}`}>
      {showEditIcon && (
        <div className="edit-icon-container" onClick={onEdit}>
          <FontAwesomeIcon icon={faEdit} className="editIcon" />
        </div>
      )}
      <a
        href={clickable ? matchPageDetailsUrl : undefined}
        className="match-link"
      >
        
        <h3>
        <strong>Venue:</strong> {name}
        </h3>
        <p>
          <strong>Capacity:</strong> {rows * columns}
        </p>
        
      </a>
    </div>
  );
};

export default MatchCard;
