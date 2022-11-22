// import service
import db from "../models/index";

const FavoriteController = {
  CreateFavorite: async (req, res) => {
    try {
      const data = req.body;
      const Favorite = await db.Favorite.create({
        Status: data.Status,
        idUser: data.idUser,
        idTourInfo: data.idTourInfo,
      });
      return res.status(200).json(Favorite);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllFavorite: async (req, res) => {
    try {
      const Favorites = await db.Favorite.findAll({
        raw: true,
      });
      return res.status(200).json(Favorites);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetOneFavorite: async (req, res) => {
    const { id } = req.params;
    try {
      const favorites = await db.Favorite.findOne({
        where: { id: id },
        include: [
          { model: db.User, attributes: ["id", "name", "phone"] },
          {
            model: db.TourInfo,
            attributes: ["id", "NameTour"],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetOneByTour: async (req, res) => {
    const { id, idTour } = req.params;
    try {
      const favorites = await db.Favorite.findOne({
        where: { idUser: id, idTourInfo: idTour },
        include: [
          { model: db.User, attributes: ["id", "name", "phone"] },
          {
            model: db.TourInfo,
            attributes: ["id", "NameTour"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (favorites) {
        return res.status(200).json(favorites);
      } else {
        return res.status(404).json({ msg: "Can't see anything !" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  UpDateFavorite: async (req, res) => {
    const { id, idTour } = req.params;
    try {
      const favorites = await db.Favorite.findOne({
        where: { idUser: id, idTourInfo: idTour },
      });
      if (favorites) {
        favorites.Status = req.body.Status;
        await favorites.save();
        return res.status(200).json(favorites);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllFavoriteByUser: async (req, res) => {
    const { id } = req.params;
    try {
      const favorites = await db.Favorite.findAll({
        where: { idUser: id, Status: true },
        include: [
          {
            model: db.TourInfo,
            attributes: ["id", "NameTour", "PricePerson", "images"],
          },
        ],
      });
      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //   CheckUserReview: async (req, res) => {
  //     const data = req.body;
  //     try {
  //       const CantReview = await db.CantReview.create({
  //         Status: data.Status,
  //         idUser: data.idUser,
  //         idTourInfo: data.idTourInfo,
  //       });
  //       return res.status(200).json(CantReview);
  //     } catch (error) {
  //       return res.status(500).json(error);
  //     }
  //   },
  //   GetOneCheck: async (req, res) => {
  //     const { id } = req.params;
  //     try {
  //       const reviews = await db.CantReview.findOne({
  //         where: { id: id },
  //         include: [
  //           { model: db.User, attributes: ["id", "name", "phone"] },
  //           {
  //             model: db.TourInfo,
  //             attributes: ["id", "NameTour"],
  //           },
  //         ],
  //         raw: true,
  //         nest: true,
  //       });
  //       return res.status(200).json(reviews);
  //     } catch (error) {
  //       return res.status(500).json(error);
  //     }
  //   },
  //   StopUserReview: async (req, res) => {
  //     const { id } = req.params;
  //     try {
  //       const reviews = await db.CantReview.findOne({
  //         where: { id: id },
  //       });
  //       if (reviews) {
  //         reviews.Status = req.body.Status;
  //         await reviews.save();
  //         return res.status(200).json(reviews);
  //       }
  //     } catch (error) {
  //       return res.status(500).json(error);
  //     }
  //   },
};

export default FavoriteController;
