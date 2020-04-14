export const log = (req, res) => {
  res.download('./src/access.log');
};