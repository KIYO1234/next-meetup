import { connectToDatabase } from "../../db/mongoDB"

const handler = async (req, res) => {
  // console.log('req', req)
  try {
    const client = await connectToDatabase();
    const meetupsCollection = await client.db().collection('meetups')
    const allMeetups = await meetupsCollection.find()
    return allMeetups
    
  } catch (error) {
    res.status(404).json({
      message: 'Not found...'
    })
  }
  res.status(200).json({
    message: 'Successfully fetched all meetups!'
  })
}

export default handler;