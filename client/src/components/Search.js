import React, { useState } from "react";

// import createPlaylist from "../util/createPlaylist";
import DatePicker from "react-datepicker";
import { Button, Form } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";

const Search = () => {
  const [date, setDate] = useState(new Date());
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const zipCodeValidation = (zipCode) => /^([0-9]{5})$/.test(zipCode);

  const zipCodeHandler = (zipCode) => {
    setZipCode(zipCode);

    if (!zipCodeValidation(zipCode) && zipCodeError === null) {
      setButtonDisabled(true);
      setZipCodeError("Please enter a valid zip code");
    } else if (!zipCodeValidation(zipCode)) {
      return;
    } else if (zipCodeError !== null) {
      setButtonDisabled(false);
      setZipCodeError(null);
    }
  };

  const addDays = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date;
  };

  const handleSubmit = async () => {
    // set an isLoading

    try {
      const response = await fetch(
        `http://localhost:8000/playlist?zipCode=${encodeURIComponent(
          zipCode
        )}&date=${encodeURIComponent(date)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("REsuL: ", response);

      // const result = await response.json();
    } catch (error) {
      console.error("error: ", error);
    }

    if (!zipCodeError) {
      console.log("SUBMITTED: ");
      console.log("DATE: ", date);
      console.log("ZIP: ", zipCode);
    }
  };

  return (
    <Form>
      <Form.Group className="input-form">
        <Form.Field>
          <label>Select a Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            maxDate={addDays(60)}
          />
        </Form.Field>
        <Form.Input
          error={zipCodeError}
          label="Zip Code"
          placeholder="Zip Code"
          name="zipCode"
          value={zipCode}
          onChange={(event) => zipCodeHandler(event.target.value)}
        />
        <Button
          disabled={buttonDisabled}
          size="medium"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Search;
