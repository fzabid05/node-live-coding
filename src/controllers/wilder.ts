import { Request, Response } from "express";
const WilderModel = require("../models/Wilder");

export default {
  get: async (req: Request, res: Response) => {
    const wilders = await WilderModel.find({});
    res.json({ wilders });
  },
  create: async (req: Request, res: Response) => {
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.status(201).json({ result });
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WilderModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.json({ result });
  },
  delete: async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await WilderModel.findByIdAndDelete(id);
    res.json({ result });
  },
};
