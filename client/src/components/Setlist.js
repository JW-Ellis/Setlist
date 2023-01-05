import React, { useState } from "react";
import PropTypes from "prop-types";

import { Header, Button } from "semantic-ui-react";
import SetlistTable from "./SetlistTable";

import "./Setlist.css";
// create a table generator

const Setlist = ({ data, setSetlistData }) => {
  const handleGoBack = () => {
    setSetlistData("");
  };

  return (
    <div>
      <Header as={"h1"}>
        <Button basic color="purple" onClick={() => handleGoBack()}>
          Go Home
        </Button>
      </Header>
      <div className="setlist">
        <SetlistTable topTracks={data.data.topTracks} />
      </div>
    </div>
  );
};

Setlist.propTypes = {
  data: PropTypes.object,
  setSetlistData: PropTypes.func,
};

export default Setlist;
