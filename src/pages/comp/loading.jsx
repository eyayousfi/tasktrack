import Header from './header' 
import Footer from './footer'
import "./loading.css";
const Loading = () => {
  return (
    <div>
    <Header />
    <main>

      <div className='loading'></div>
    
    </main>

    <Footer />
  </div>
  );
}

export default Loading;
