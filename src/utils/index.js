import React, { useState } from 'react'
import apiClient from '../services/api';

// export const [loggedIn, setLoggedIn] = React.useState(
//             sessionStorage.getItem('loggedIn') === 'true' || false
//         );

// export const login = () => {
//             //setLoggedIn(true);
//             sessionStorage.setItem('loggedIn', true);
//         };

// export const logout = () => {
//     apiClient.post('/api/auth/logout').then(response => {
//       if (response.status === 200) {
//                 //setLoggedIn(false);
//                 sessionStorage.setItem('loggedIn', false);
//                 sessionStorage.setItem('userObject', '');
//             }
//         })
//     };

// export const isLogin = () => {
//     return sessionStorage.getItem('loggedIn') === 'true' || false
// }