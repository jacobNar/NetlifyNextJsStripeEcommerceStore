import '../styles/globals.css';
import { ConfigProvider } from 'antd';
import ShoppingCartProvider from '../components/contexts/ShoppingCartProvider'



function MyApp({ Component, pageProps }) {
  return (
    <>
    <ShoppingCartProvider>  
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#455a45',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#fff',
        },
      }}>
        <Component {...pageProps} />
      </ConfigProvider>
      </ShoppingCartProvider>
      
    </>
  );
}

export default MyApp;
