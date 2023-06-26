const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllDocs = (Model, customFilter = null, populateOptions = []) =>
  catchAsync(async (req, res, next) => {
    let filter = {};

    // Apply custom filter if provided
    if (customFilter) {
      filter = customFilter(req);
    }

    let query = Model.find(filter);

    // Apply populate options if provided
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      data: docs,
    });
  });

exports.getDoc = (Model, populateOptions = []) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id.trim());
    // Apply populate options if provided
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOneAsUser = (Model, customCreate = null) =>
  catchAsync(async (req, res, next) => {
    let data = req.body;

    if (customCreate) {
      const additionalData = customCreate(req);
      data = { ...data, ...additionalData };
    }

    const newDoc = await Model.create(data);

    // If the document has a createdBy field, set it to the current user's ID
    if (newDoc.createdBy) {
      newDoc.createdBy = req.user.id;
      await newDoc.save();
    }

    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });

exports.deleteOneAsUser = (Model, deactivateUser = false) =>
  catchAsync(async (req, res, next) => {
    let doc;

    if (deactivateUser) {
      doc = await Model.findByIdAndUpdate(req.user.id, { active: false });
    } else {
      doc = await Model.findByIdAndDelete(req.params.id);
    }

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    if (doc._id.toString() !== req.user.id.toString()) {
      return next(
        new AppError('You are not the creator of this document', 403)
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// Factory function to update a document
// Model: The Mongoose model for the document to be updated
// allowedFields: An array of field names that are allowed to be updated (default: [])
// Add the filterObj function here

exports.updateOneAsUser = (Model, allowedFields = []) =>
  catchAsync(async (req, res, next) => {
    // If allowedFields is provided, filter the request body to only include the allowed fields
    let updateData = req.body;
    if (allowedFields.length > 0) {
      updateData = filterObj(req.body, ...allowedFields);
    }

    // If isUserUpdate is true, handle the user update logic

    // Update the document
    const doc = await Model.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    // If no document is found with the given ID
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    // If the document's ID doesn't match the current user's ID (only for user updates)
    if (doc._id.toString() !== req.user.id.toString()) {
      return next(
        new AppError('You can only update your own information', 403)
      );
    }

    // Send a success response with the updated document
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// ADMIN HANDLING_FACTORY

exports.updateOneAsAdmin = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.deleteOneAsAdmin = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(4).json({
      status: 'success',
      data: null,
    });
  });

// exports.createOneAsAdmin = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.create(req.body);

//     resSuccess(res, 201, { data: { doc } });
//   }); // TODO : See how to do that clearly because risky
