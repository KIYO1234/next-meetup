import { connectToDatabase } from "../../db/mongoDB";

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return; 
  }
  try {
    // console.log('req.body', req.body);
    const client = await connectToDatabase();
    const meetupsCollection = await client.db().collection("meetups");
    meetupsCollection.insertOne(req.body);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to add a new meetup...'
    })
  }
  res.status(201).json({
    message: 'Successfully added a new meetup!'
  })
}

export default handler;