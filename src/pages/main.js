import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { LEFT, CENTER, RIGHT } from "../common/arrangement";
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
import * as Excel from "exceljs";
import * as FileSaver from "file-saver";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchData = async () => {
  return await getDocs(collection(db, "seats"));
};

const Main = () => {
  const [map, setMap] = useState({});

  const addSeat = async (row, seat, section, name, email) => {
    try {
      const docRef = await setDoc(doc(db, "seats", row + seat), {
        name: name,
        email: email,
        section: section,
        row: row,
        seat: seat,
      });
      const newMap = { ...map };
      newMap[row + seat] = {
        name: name,
        email: email,
        section: section,
        row: row,
        seat: seat,
      };
      setMap(newMap);
    } catch (err) {
      console.error(err);
    }

    console.log(map);
  };

  const getSeat = (row, seat) => {
    return map[row + seat];
  };

  const handleDownload = async () => {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Data");
    worksheet.columns = [
      { header: "Control", key: "id" },
      { header: "Row", key: "row" },
      { header: "Seat", key: "seat" },
      { header: "Section", key: "section" },
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
    ];

    let control = 1;
    for (const key in map) {
      worksheet.addRow({
        id: control++,
        row: map[key].row,
        seat: map[key].seat,
        section: map[key].section,
        name: map[key].name,
        email: map[key].email,
      });
    }

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "" });
      FileSaver.saveAs(blob, "output.xlsx");
    });
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
          section: doc.data().section,
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
      <Button onClick={handleDownload}>Export to Excel</Button>
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
