import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://kyosuke:s02oadLRWKgfWhCy@cluster0.gfyzj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  // console.log('👓 client: ', client);

  return client;
};
