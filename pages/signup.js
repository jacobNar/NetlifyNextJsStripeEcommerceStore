import {React, useEffect} from 'react'
const netlifyIdentity = require('netlify-identity-widget')

export default function Signup() {

  useEffect(()=> {
    netlifyIdentity.init({
        locale:'en'
    })
    netlifyIdentity.open('signup');
    netlifyIdentity.on('login', user => console.log('login', user));
    netlifyIdentity.on('logout', () => console.log('Logged out'));
    netlifyIdentity.on('error', err => console.error('Error', err));
    netlifyIdentity.on('open', () => console.log('Widget opened'));
    netlifyIdentity.on('close', () => console.log('Widget closed'));

  },[])

  return (
    <>
    </>
  )
}
