const Package = require('../models/Package');

// Get all packages
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


exports.getPackageById = async (req, res) => {
  try {
    const packageId = req.params.packageId; // Get the package ID from the route params
    const packageDetail = await Package.findById(packageId); // Fetch the package by ID

    if (!packageDetail) {
      return res.status(404).json({ msg: 'Package not found' }); // Return 404 if package is not found
    }

    res.json(packageDetail); // Return the package details
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new package
exports.createPackage = async (req, res) => {
  const { name, description, type, destinations, accommodations, activities, creatorId } = req.body;
  try {
    const newPackage = new Package({
      name,
      description,
      type,
      destinations,
      accommodations,
      activities,
      creatorId
    });
    await newPackage.save();
    res.json(newPackage);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
