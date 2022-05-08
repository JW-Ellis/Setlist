const encodeBody = body => {
  return Object.keys(body)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&');
};

module.exports = encodeBody;
