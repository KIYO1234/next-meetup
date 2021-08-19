import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { connectToDatabase } from "../db/mongoDB";
import Head from "next/head";

const Home = (props) => {
  // console.log("🤝 props.meetups: ", props.meetups);

  if (props.meetups) {
    return (
      <Fragment>
        <Head>
          <title>React Meetups</title>
          <meta
            name="description"
            content="Browse a huge list of highly active React meetups!"
          />
        </Head>
        <MeetupList meetups={props.meetups}></MeetupList>
      </Fragment>
    );
  } else {
    return <p>No meetups...</p>;
  }
};

export const getStaticProps = async () => {
  const client = await connectToDatabase();
  const meetupsCollection = await client.db().collection("meetups");
  const allMeetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: allMeetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 600,
  };
};

export default Home;
