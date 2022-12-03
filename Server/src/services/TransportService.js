import db from "../models/index";

const TransportService = {
  CreateTransPort: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const transportData = {};
        // check name
        let transport = await db.TypeOfTransport.findOne({
          where: { nameTransport: data.nameTransport },
        });

        if (!transport) {
          await db.TypeOfTransport.create({
            nameTransport: data.nameTransport,
            image: data.image,
          });
          transportData.errCode = 0;
          transportData.errMessage = "Create Transport successfully !";
        } else {
          transportData.errCode = 1;
          transportData.errMessage =
            "Name of Transport already exists in the system !";
        }
        resolve(transportData);
      } catch (e) {
        reject(e);
      }
    });
  },
  GetAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let allTransport = db.TypeOfTransport.findAll({
          raw: true,
        });
        resolve(allTransport);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default TransportService;
