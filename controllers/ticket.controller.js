import { inngest } from "./../inngest/client.js";
import Ticket from "../models/ticket.models.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const newTicket = Ticket.create({
      title,
      description,
      createdBy: req.user._id.toString(),
    });

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: (await newTicket)._id.toString(),
        title,
        description,
        createdBy: req.user._id.toString(),
      },
    });
    return res.status(201).json({
      message: "Ticket created and processing started",
      ticket: newTicket,
    });
  } catch (error) {
    console.log("Error creating ticket", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];
    if (user.role !== "user") {
      tickets = Ticket.find({})
        .populate("assignedTo", ["email", "_id"]) //populate is a mongodb method , it looks for assignedTO and set the data of email and id of user in the field assignedTO
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select("Title description status createdAt")
        .sort({ createdAt: -1 });
    }
    return res.status(200).json(tickets);
  } catch (error) {
    console.log("Error fetching tickets", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    let ticket;
    if (user.role !== "user") {
      const ticket = Ticket.findById(req.params._id).populate("assignedTo", [
        "email",
        "_id",
      ]);
    } else {
      ticket = Ticket.findOne({
        createdBy: user._id,
        _id: req.params.id,
      }).select("title description status createdAt");
    }

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json({ ticket });
  } catch (error) {
    console.log("Error fetching ticket", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
