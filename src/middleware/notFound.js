const notFound = (req, res, next) => {
    return res.status(404).json({ msg: 'Not found' });
};
  
module.exports = notFound;