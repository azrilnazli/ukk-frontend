import axios from 'axios';

// axios create
const apiClient = axios.create({

    // token
    //baseURL: 'http://laravel8.test',
    baseURL: 'http://admin.test',

    // cookie CSRF
    //baseURL: 'http://localhost:8000',
    //withCredentials: true, // disable this if using token

});


// intercept every request
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token'); // get the token set by login()
        config.headers.Authorization =  `Bearer ${token}`; // set the header according to Sanctum format
        return config; // return back config()
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  
export default apiClient;