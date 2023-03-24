import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
config.autoAddCss = false; // Disable the automatic insertion of CSS by FontAwesome

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}




export default MyApp;

