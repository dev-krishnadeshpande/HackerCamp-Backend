const submissionQueueProducer = require('../producers/submissionQueueProducer');
const { fetchProblemDetails } = require('../apis/problemAdminApi');

class SubmissionService {
  constructor(repo) {
    this.repo = repo;
  }

  async createSubmission(submissionDetails) {
    const problemId = submissionDetails.problemId;
    const userId = submissionDetails.userId;

    const problemAdminApiResponse = await fetchProblemDetails(problemId);
    if (!problemAdminApiResponse) {
      throw new internalServerError('fail to create a submission');
    }

    const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submissionDetails.language.toLowerCase());

    submissionDetails.code = languageCodeStub.startSnippet + "\n\n" + submissionDetails.code + "\n\n" + languageCodeStub.endSnippet;

    const submission = await this.repo.createSubmission(submissionDetails);
    if (!submission) {
      throw new internalServerError("failed to add submission, Try again later");
    }

    const submissinPayload = {
      [String(submission._id)]: {
        code: submission.code,
        language: submission.language,
        testCases: problemAdminApiResponse.data.testCases,
        userId,
        submissionId: submission.id
      }
    }

    const response = await submissionQueueProducer('SubmissionJob', submissinPayload);

    return { queueResponse: response, submission };
  }
}

module.exports = SubmissionService;