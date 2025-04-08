const OpenTour = require('../models/OpenTour');
const upload = require('../middleware/multerConfig');
// Get all open tours
exports.getTours = async (req, res) => {
  try {
    const tours = await OpenTour.find()
      .populate('packageId creatorId')
      .populate('participants', 'name');  // Populate with 'name' field only
    res.json(tours);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Create a new open tour
exports.createTour = async (req, res) => {
  try {
    console.log('Incoming request to create tour:', req.body, req.files);

    let { packageId, creatorId, travelDates, price, name, description } = req.body;
    travelDates = JSON.parse(travelDates);

    if (!packageId || !creatorId || !travelDates.start || !travelDates.end || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const imagePaths = req.files?.map(file => file.path) || [];

    const newTour = new OpenTour({
      name,
      description,
      packageId,
      creatorId,
      travelDates,
      price,
      images: imagePaths
    });

    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    console.error('Error creating tour:', err);
    res.status(500).send('Server error');
  }
};

// Join an open tour
exports.joinTour = async (req, res) => {
  const tourId = req.params.id;
  const userId = req.body.userId;

  try {
    const tour = await OpenTour.findById(tourId);
    if (!tour) return res.status(404).send('Tour not found');

    // Check if user is already a participant
    if (tour.participants.includes(userId)) {
      return res.status(400).send('You\'ve already joined this tour');
    }

    tour.participants.push(userId);
    await tour.save();
    res.json(tour);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
