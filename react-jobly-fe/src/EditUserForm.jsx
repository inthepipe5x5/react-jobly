import React, { useState, useEffect } from "react";
import { useUserContext } from "./useUserContext";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api.js";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { removeFalsyObjValues } from "./helper.js";

const EditUserForm = () => {
  const { currentUser, userDetails, fetchUserDetails } = useUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (!userDetails) {
      fetchUserDetails();
    } else {
      setFormData({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        password: ""
      });
    }
  }, [userDetails, currentUser, fetchUserDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = removeFalsyObjValues(formData);
    const {username} = currentUser
    try {
      await JoblyApi.editUser(username, cleanedData);
      fetchUserDetails();
      navigate(`/users/${currentUser.username}`);
    } catch (err) {
      console.error("Failed to update user details", err);
    }
  };

  // if (!userDetails) return (<LoadingSpinner />);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" color="primary">Save Changes</Button>
      <Button type="button" color="warning" onClick={() => navigate('/profile')}>
        Cancel
      </Button>
    </Form>
  );
};

export default EditUserForm;
