import db from "../models/index";

const HotelService = {
  CreateHotel: (data, imageData) => {
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
            images: imageData,
          });
          hotelData.errCode = 0;
          hotelData.errMessage = "Create hotel successfully !";
        } else {
          hotelData.errCode = 1;
          hotelData.errMessage = "Name of Hotel already exists in the system !";
        }
        // let check = await checkNameTransPort(name);
        // if (check == true) {
        //   userData.errCode = 1;
        //   userData.errMessage = "Da Ton Tai TransPort Nay!!!";
        // } else {
        //   let User = await db.TypeOfTransport.create({
        //     nameTransport: name,
        //     imageTransport: image,
        //   });
        //   userData.errCode = 0;
        //   userData.errMessage = "Add Succerss!!!";
        // }
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
