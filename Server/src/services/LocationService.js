import db from "../models/index";

const LocationService = {
  CreateLocation: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const locationData = {};

        let location = await db.Location.create({
          country: data.country,
          placeName: data.placeName,
          descLocation: data.descLocation,
        });

        locationData.errCode = 0;
        locationData.location = location;
        locationData.errMessage = "Create Location successfully !";

        resolve(locationData);
      } catch (e) {
        reject(e);
      }
    });
  },
  GetAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let allLocation = db.Location.findAll({
          raw: true,
        });
        resolve(allLocation);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default LocationService;
