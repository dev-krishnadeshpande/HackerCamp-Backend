async function createSubmission(req, res) {
  const { service } = this;
  const response = await service.createSubmission(req.body);

  if (response) {
    return res.status(200).send({ success: true, message: 'Submitted successfully!', error: {}, data: response });
  }
}

module.exports = createSubmission;
