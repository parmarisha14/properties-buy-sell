import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import ManageProperty from "./pages/ManageProperty";
import BookingManagement from "./pages/BookingManagement";
import InquiryManagement from "./pages/InquiryManagement";

function App(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/broker-dashboard" element={<Dashboard/>}/>
        <Route path="/add" element={<AddProperty/>}/>
        <Route path="/manage" element={<ManageProperty/>}/>
        <Route path="/booking" element={<BookingManagement/>}/>
        <Route path="/inquiry" element={<InquiryManagement/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
