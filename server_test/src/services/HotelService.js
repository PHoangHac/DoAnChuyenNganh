import db from "../models/index";

const HotelService = {
  CreateHotel: (data) => {
    return new Promise(async (resolve, rejct) => {
      try {
        const hotelData = {};

        // check name
        let transport = await db.Hotel.findOne({
          where: { NameHotel: data.NameHotel },
        });

        if (!transport) {
          await db.Hotel.create({
            NameHotel: data.NameHotel,
            images: data.images,
          });
          hotelData.errCode = 0;
          hotelData.errMessage = "Create hotel successfully !";
        } else {
          hotelData.errCode = 1;
          hotelData.errMessage = "Name of Hotel already exists in the system !";
        }
        resolve(hotelData);
      } catch (e) {
        rejct(e);
      }
    });
  },
  GetAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let allHotel = db.Hotel.findAll({
          raw: true,
        });
        resolve(allHotel);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default HotelService;
