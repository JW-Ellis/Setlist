import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import {
  VStack,
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Search = () => {
  const [startDate, setStartDate] = useState(new Date());

  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  };

  return (
    <VStack spacing="24px">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <Formik
        initialValues={{ name: "Sasuke" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Box w="40px" h="40px" bg="pink.100">
        3
      </Box>
    </VStack>
  );
};

export default Search;

// date
// zip code
// butto
