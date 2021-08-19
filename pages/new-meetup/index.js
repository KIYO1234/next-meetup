import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    // console.log("enteredMeetupData: ", enteredMeetupData);

    const response = await fetch("/api/addMeetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log("data: ", data);
    router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
