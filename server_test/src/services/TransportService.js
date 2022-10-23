import db from "../models/index";

const TransportService = {
  CreateTransPort: (data, imageData) => {
    return new Promise(async (resolve, rejct) => {
      try {
        const transportData = {};

        // check name
        let transport = await db.TypeOfTransport.findOne({
          where: { nameTransport: data.nameTransport },
        });

        if (!transport) {
          await db.TypeOfTransport.create({
            nameTransport: data.nameTransport,
            image: imageData,
          });
          transportData.errCode = 0;
          transportData.errMessage = "Create Transport successfully !";
        } else {
          transportData.errCode = 1;
          transportData.errMessage =
            "Name of Transport already exists in the system !";
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
        resolve(transportData);
      } catch (e) {
        rejct(e);
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
