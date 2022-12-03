import db from "../models/index";

const HotelService = {
  CreateHotel: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const hotelData = {};

        await db.Hotel.create({
          NameHotel: data.NameHotel,
          images: data.images,
        });
        hotelData.errCode = 0;
        hotelData.errMessage = "Create hotel successfully !";

        resolve(hotelData);
      } catch (e) {
        reject(e);
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
