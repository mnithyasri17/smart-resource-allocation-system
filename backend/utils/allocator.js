const Resource = require("../models/Resource");
const Booking = require("../models/Booking");

const allocateResource = async (request) => {
  const { resourceId, priority } = request;

  const resource = await Resource.findById(resourceId).populate("currentBooking");

  // If resource is free
  if (resource.status === "available") {
    const booking = await Booking.create(request);

    resource.status = "booked";
    resource.currentBooking = booking._id;
    await resource.save();

    return { message: "Resource allocated", booking };
  }

  // If already booked → check priority
  const existingBooking = resource.currentBooking;

  if (priority > existingBooking.priority) {
    // Override booking
    existingBooking.status = "waitlisted";
    await existingBooking.save();

    const newBooking = await Booking.create(request);

    resource.currentBooking = newBooking._id;
    await resource.save();

    return {
  message: "Overridden based on priority",
  newBooking,
  overriddenBooking: existingBooking
};
  }

  // Otherwise → waitlist
  const waitBooking = await Booking.create({
    ...request,
    status: "waitlisted"
  });

  return { message: "Added to waitlist", booking: waitBooking };
};

module.exports = allocateResource;