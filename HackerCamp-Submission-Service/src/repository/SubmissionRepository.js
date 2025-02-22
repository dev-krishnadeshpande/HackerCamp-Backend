const Submission = require('../models/submissionModel');

class SubmissionRepository {
  async createSubmission(submissionDetails) {
    try {
      const submission = await Submission.create(submissionDetails);
      return submission;
    }
    catch (error) {
      throw error;
    }
  }

  async updateSubmission(evaluationResponse) {
    const status = 'Success';
    try {
      const submission = await Submission.findByIdAndUpdate(evaluationResponse.submissionId, { status }, {
        returnDocument: "after",
      });
      return submission;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = SubmissionRepository;
