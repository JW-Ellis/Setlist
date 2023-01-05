import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";

import "./SetlistTable.css";

const SetlistTable = ({ topTracks }) => {
  return (
    <div className="setlist-table">
      <Table unstackable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Track</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Artist</Table.HeaderCell>
          </Table.Row>
          {topTracks.map(({ trackID, artist, trackName }) => (
            <Table.Row key={trackID} textAlign="center">
              <Table.Cell>{trackName}</Table.Cell>
              <Table.Cell>{artist}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Header>
      </Table>
    </div>
  );
};

SetlistTable.propTypes = {
  topTracks: PropTypes.array,
};

export default SetlistTable;
