import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { LEFT, CENTER, RIGHT } from "../common/arrangement";
import Seat from "../components/seat";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../util/firebase.config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Section from "../components/section";
import DataBox from "../components/data-box";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchData = async () => {
  return await getDocs(collection(db, "seats"));
};

const Main = () => {
  const [map, setMap] = useState({});

  const addSeat = async (row, seat, name, email) => {
    try {
      const docRef = await setDoc(doc(db, "seats", row + seat), {
        name: name,
        email: email,
        row: row,
        seat: seat,
      });
      const newMap = { ...map };
      newMap[row + seat] = { name: name, email: email, row: row, seat: seat };
      setMap(newMap);
    } catch (err) {
      console.log(err);
    }
  };

  const getSeat = (row, seat) => {
    return map[row + seat];
  };

  const deleteSeat = async (row, seat) => {
    try {
      await deleteDoc(doc(db, "seats", row + seat));
      const newMap = { ...map };
      delete newMap[row + seat];
      setMap(newMap);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData().then((res) => {
      res.forEach((doc) => {
        const newMap = map;
        newMap[doc.data().row + doc.data().seat] = {
          name: doc.data().name,
          email: doc.data().email,
          row: doc.data().row,
          seat: doc.data().seat,
        };
        setMap({ ...newMap });
      });
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <DataBox map={map} />
      <Box
        display="flex"
        justifyContent="space-between"
        fontFamily="'Lato', sans-serif;"
      >
        <Section
          sectionName="Pit Left"
          sectionData={LEFT}
          addSeat={addSeat}
          getSeat={getSeat}
          deleteSeat={deleteSeat}
          map={map}
        />
        <Section
          sectionName="Pit Centre"
          sectionData={CENTER}
          addSeat={addSeat}
          getSeat={getSeat}
          deleteSeat={deleteSeat}
          map={map}
        />
        <Section
          sectionName="Pit Right"
          sectionData={RIGHT}
          addSeat={addSeat}
          getSeat={getSeat}
          deleteSeat={deleteSeat}
          map={map}
        />
      </Box>
      <Box
        border="1px solid gray"
        marginX={35}
        marginY={6}
        padding={6}
        display="flex"
        justifyContent="center"
        fontFamily="'Lato', sans-serif;"
      >
        <h3>Stage</h3>
      </Box>
    </Container>
  );
};

export default Main;
