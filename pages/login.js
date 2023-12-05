import {React, useEffect} from 'react'
import netlifyIdentity from 'netlify-identity-widget'

export default function Login() {

  useEffect(()=> {
    netlifyIdentity.init({
        locale:'en'
    })
    netlifyIdentity.open('login');
    // netlifyIdentity.on('login', user => console.log('login', user));
    // netlifyIdentity.on('logout', () => console.log('Logged out'));
    // netlifyIdentity.on('error', err => console.error('Error', err));
    // netlifyIdentity.on('open', () => console.log('Widget opened'));
    // netlifyIdentity.on('close', () => console.log('Widget closed'));

  },[])

  return (
    <>
    </>
  )
}
