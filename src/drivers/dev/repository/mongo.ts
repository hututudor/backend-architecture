import mongo from 'mongodb';
import { GenericRepository } from '../../../interfaces/repository';

let db: mongo.Db;

export const initDatabase = async (callback: () => void = () => {}) => {
  const res = await mongo.MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db = res.db(process.env.MONGO_DB);

  callback();
};

export const mongoGenericRepository: GenericRepository = {
  retrieveOne: (collection: string) => async (id: string) => {
    return mapDocumentToReturnValue(
      await db.collection(collection).findOne({ id })
    );
  },

  retrieveAll: (collection: string) => async () => {
    return (
      await db
        .collection(collection)
        .find({})
        .toArray()
    ).map(mapDocumentToReturnValue);
  },

  saveOne: (collection: string) => async ({ id, ...rest }: any) => {
    if (id && (await mongoGenericRepository.retrieveOne(collection)(id))) {
      await db.collection(collection).updateOne({ id }, { $set: rest });
    } else {
      await db.collection(collection).insertOne({ id, ...rest });
    }

    return mapDocumentToReturnValue({ id, ...rest });
  },

  removeOne: (collection: string) => async (id: string) => {
    await db.collection(collection).deleteOne({ id });
  }
};

const mapDocumentToReturnValue = (document: any) => {
  if (document && document._id) delete document._id;

  return document;
};
