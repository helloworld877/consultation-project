import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/StadiumCard.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const StadiumCard = ({
  _id,
  name,
  columns,
  rows,
  city,
  address,
  clickable = true,
  showEditIcon,
}) => {
  const router = useRouter();

  const props = {
    id: _id,
    name: name,
    columns: columns,
    rows: rows,
    city: city,
    address: address,
  };
  console.log(props);

  const [stadiumDetails, setStadiumDetails] = useState(props);

  const onEdit = () => {};

  return (
    <div className="card">
      {showEditIcon && (
        <div className="edit-icon-container" onClick={onEdit}>
          <FontAwesomeIcon icon={faEdit} className="editIcon" />
        </div>
      )}

      <h3>
        <strong>Venue:</strong> {name}
      </h3>
      <p>
        <strong>Capacity:</strong> {rows * columns}
      </p>
      <p>
        <strong>Location:</strong> {city}, {address}
      </p>
    </div>
  );
};

export default StadiumCard;
