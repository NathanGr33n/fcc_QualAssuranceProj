'use strict';

const mongoose = require('mongoose');

// Define Issue Schema
const issueSchema = new mongoose.Schema({
  project: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: '' },
  status_text: { type: String, default: '' },
  open: { type: Boolean, default: true },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    // GET request - View issues
    .get(async function (req, res) {
      const project = req.params.project;
      const filters = { project };

      // Add query parameters as filters
      if (req.query.issue_title) filters.issue_title = req.query.issue_title;
      if (req.query.issue_text) filters.issue_text = req.query.issue_text;
      if (req.query.created_by) filters.created_by = req.query.created_by;
      if (req.query.assigned_to) filters.assigned_to = req.query.assigned_to;
      if (req.query.status_text) filters.status_text = req.query.status_text;
      if (req.query.open !== undefined) {
        filters.open = req.query.open === 'true';
      }
      if (req.query._id) filters._id = req.query._id;

      try {
        const issues = await Issue.find(filters).select('-project -__v');
        res.json(issues);
      } catch (err) {
        res.json({ error: 'could not retrieve issues' });
      }
    })
    
    // POST request - Create issue
    .post(async function (req, res) {
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      // Check required fields
      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      try {
        const newIssue = new Issue({
          project,
          issue_title,
          issue_text,
          created_by,
          assigned_to: assigned_to || '',
          status_text: status_text || '',
          open: true,
          created_on: new Date(),
          updated_on: new Date()
        });

        const savedIssue = await newIssue.save();
        
        // Return issue without project and __v fields
        res.json({
          _id: savedIssue._id,
          issue_title: savedIssue.issue_title,
          issue_text: savedIssue.issue_text,
          created_by: savedIssue.created_by,
          assigned_to: savedIssue.assigned_to,
          status_text: savedIssue.status_text,
          created_on: savedIssue.created_on,
          updated_on: savedIssue.updated_on,
          open: savedIssue.open
        });
      } catch (err) {
        res.json({ error: 'could not create issue' });
      }
    })
    
    // PUT request - Update issue
    .put(async function (req, res) {
      const project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body;

      // Check if _id is provided
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      // Check if there are fields to update
      const updateFields = {};
      if (issue_title !== undefined) updateFields.issue_title = issue_title;
      if (issue_text !== undefined) updateFields.issue_text = issue_text;
      if (created_by !== undefined) updateFields.created_by = created_by;
      if (assigned_to !== undefined) updateFields.assigned_to = assigned_to;
      if (status_text !== undefined) updateFields.status_text = status_text;
      if (open !== undefined) updateFields.open = open;

      if (Object.keys(updateFields).length === 0) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }

      // Update the updated_on field
      updateFields.updated_on = new Date();

      try {
        // Validate _id format
        if (!mongoose.Types.ObjectId.isValid(_id)) {
          return res.json({ error: 'could not update', '_id': _id });
        }

        const updatedIssue = await Issue.findByIdAndUpdate(
          _id,
          updateFields,
          { new: true }
        );

        if (!updatedIssue) {
          return res.json({ error: 'could not update', '_id': _id });
        }

        res.json({ result: 'successfully updated', '_id': _id });
      } catch (err) {
        res.json({ error: 'could not update', '_id': _id });
      }
    })
    
    // DELETE request - Delete issue
    .delete(async function (req, res) {
      const project = req.params.project;
      const { _id } = req.body;

      // Check if _id is provided
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        // Validate _id format
        if (!mongoose.Types.ObjectId.isValid(_id)) {
          return res.json({ error: 'could not delete', '_id': _id });
        }

        const deletedIssue = await Issue.findByIdAndDelete(_id);

        if (!deletedIssue) {
          return res.json({ error: 'could not delete', '_id': _id });
        }

        res.json({ result: 'successfully deleted', '_id': _id });
      } catch (err) {
        res.json({ error: 'could not delete', '_id': _id });
      }
    });
};
