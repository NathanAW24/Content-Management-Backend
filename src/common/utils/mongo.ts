import mongoose from 'mongoose';

export const transformArrayToObjectId = async (
  stringArray: string[] | undefined,
) => {
  if (!stringArray) return [];
  const objectArray = stringArray.map(
    (item: string) => new mongoose.Types.ObjectId(item),
  );
  return objectArray;
};

export const transformStringToObjectId = async (
  inputString: string | undefined,
) => {
  if (!inputString) return '';
  const objectString = new mongoose.Types.ObjectId(inputString);
  return objectString;
};
