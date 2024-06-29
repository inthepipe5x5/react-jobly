/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function Detail({ items, cantFind, type }) {
  const { id } = useParams();

  let item = items.find((item) => item.id === id);
  if (!item || !["user", "company", "job"].includes(type))
    return <Redirect to={cantFind} />;

  const capitalizeWord = (word) => {
    const firstLetter = word.charAt(0);

    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = word.slice(1);

    const final = firstLetterCap + remainingLetters;
    return final;
  };

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.title}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default Detail;
