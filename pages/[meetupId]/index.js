import { ObjectId } from "mongodb";
import Head from "next/head";
import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { connectToDatabase } from "../../db/mongoDB";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.selectedMeetup.title}</title>
        <meta name="description" content={props.selectedMeetup.description} />
    </Head>
    <MeetupDetail
      title={props.selectedMeetup.title}
      image={props.selectedMeetup.image}
      address={props.selectedMeetup.address}
      description={props.selectedMeetup.description}
    />
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await connectToDatabase();
  const meetupsCollection = await client.db().collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  // console.log("selectedMeetup: ", selectedMeetup);

  return {
    props: {
      selectedMeetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const client = await connectToDatabase();
  const meetupsCollection = await client.db().collection("meetups");
  const meetup = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: meetup.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // false にすると、違うパスの時に404pageを返す
    fallback: 'blocking',
  };
};

export default MeetupDetails;
