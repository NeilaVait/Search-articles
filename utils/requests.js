import axios from 'axios';

export const addNewKeywords = async (dataToSend) => {
  try {
    const ats = await axios.post('http://localhost:4000/api/keywords/new', dataToSend);
    console.log(ats);
    return ats.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addClickedArticleDetails = async (dataToSend) => {
  try {
    const ats = await axios.post('http://localhost:4000/api/articleDetails/new', dataToSend);
    console.log(ats);
    return ats.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
