import Link from 'next/link';
import Header from '../components/Header';
import { useEffect } from 'react';

import GoTrue from 'gotrue-js';

const auth = new GoTrue({
  APIUrl: 'https://ecomtemplate1.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});

export default function Index() {

  useEffect(() => {
    var currentUrl = window.location.href;
    var regex = /confirmation_token=([^&]+)/;
    var match = regex.exec(currentUrl);
    var confirmationToken = match ? match[1] : null;
    console.log(confirmationToken)

    if(confirmationToken != null){
       auth.confirm(confirmationToken, true).then((response) => {
        console.log('Confirmation email sent', JSON.stringify({ response }));
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <>
      <Header  style={1}/>
      <h1>Home</h1>
    </>
  );
}