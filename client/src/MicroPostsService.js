import axios from 'axios'

const url = 'http://localhost:8081/micro-posts/'

class MicroPostsService {
  static getMicroPosts () {
    return new Promise(async (resolve, reject) => {
      try {
        const serverResponse = await axios.get(url)
        const unparsedData = serverResponse.data
        resolve(unparsedData.map(microPost => ({
          ...microPost,
          createdAt: new Date(microPost.createdAt)
        })))
      } catch (error) {
        reject(error)
      }
    })
  }

  static insertMicroPost (text) {
    return axios.post(url, {
      text
    })
  }
}

export default MicroPostsService
