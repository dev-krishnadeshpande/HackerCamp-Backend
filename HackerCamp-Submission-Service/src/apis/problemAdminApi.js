const axiosInstance = require('../config/axiosInstance');

const { PROBLEM_ADMIN_SERVICE_URL } = require('../config/serverConfig');

const PROBLEM_ADMIN_SERVICE = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;

async function fetchProblemDetails(problemId) {
  try {
    const uri = PROBLEM_ADMIN_SERVICE + `/problems/${problemId}`;
    const response = await axiosInstance.get(uri);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  fetchProblemDetails
};