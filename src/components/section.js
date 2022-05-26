import { Box } from "@mui/system";
import Seat from "./seat";

const Section = ({
  sectionName,
  sectionData,
  addSeat,
  getSeat,
  deleteSeat,
  map,
}) => {
  return (
    <Box>
      <Box
        width="100%"
        height="40px"
        display="flex"
        border="1px solid gray"
        margin={1}
        justifyContent="center"
        alignItems="center"
      >
        <h3>{sectionName}</h3>
      </Box>
      {sectionData.map((data, index) => (
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" color="#BEBEBE">
            {data.row}
          </Box>
          <Box>
            {[...Array(data.seats)].map((__seat, index) => (
              <Seat
                seat={index + data.startingSeat}
                addSeat={addSeat}
                getSeat={getSeat}
                deleteSeat={deleteSeat}
                row={data.row}
                map={map}
              />
            ))}
          </Box>
          <Box display="flex" alignItems="center" color="#BEBEBE">
            {data.row}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Section;
