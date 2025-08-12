import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig"; 

const LocalContext = createContext();

export const LocalProvider = ({ children }) => {
  const [currentTFN, setCurrentTFN] = useState({ intlFormat: "", localFormat: "" });
  const [webinfo,setwebinfo] = useState({
    name: "Weboku",
    phone: "",
    phonecall: "",
    logo:"https://res.cloudinary.com/dqdngisww/image/upload/v1754982587/WhatsApp_Image_2025-08-12_at_11.53.57_df911e48-removebg-preview_uq7bg8.png",
    email:"webokudigital@gmail.com",
    address:"Purani Bazar, Bhadi, Landmark: Near Kalawati Hospital, Shahganj, Jaunpur, Uttar Pradesh 223101, India",
    addressCity:"Purani Bazar, Uttar Pradesh"
});


  // Fetch TFN from Firebase
  useEffect(() => {
    const fetchTFN = async () => {
      try {
        const docRef = doc(db, "siteNumbers", "weboku.com");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          

          setCurrentTFN({
            intlFormat: data.numberIntl || "",
            localFormat: data.numberLocal || "",
          });
        } else {
          console.log("No such document!");
          setCurrentTFN({ intlFormat: "", localFormat: "" });
        }
      } catch (error) {
        console.error("Error fetching TFN: ", error);
      }
    };

    fetchTFN();
  }, []);

  
  useEffect(() => {
    setwebinfo((prevWebinfo) => ({
      ...prevWebinfo,
      phone: currentTFN.localFormat,
      phonecall: currentTFN.intlFormat,
    }));
  }, [currentTFN]);

  return (
    <LocalContext.Provider value={{ webinfo, setwebinfo }}>
      {children}
    </LocalContext.Provider>
  );
};

export const useLocalContext = () => useContext(LocalContext);
