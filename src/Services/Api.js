import axios from 'axios';


const fetchPhotos = (query, page, pageSize = 12) => {
  const apiKey = "18864763-1ad3d49af940e9eb25fd728e0";
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${pageSize}`;
  return axios.get(url).then((res) => res.data.hits);
};

export default fetchPhotos;