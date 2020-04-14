const axios = require('axios');

const { express, logger } = require('./context');
const { Router } = express;
const qs = require('querystring');
const multer = require('multer');
const middleware = multer();

const router = new Router();

router.use(middleware.none());

router.route('/forms').post(async (req, res, next) => {
  const sourceOrigin = req.query.__amp_source_origin;
  const origin = req.header('origin') || '*';

  if(!sourceOrigin) return next();
  
  const { action, ...form } = req.body;

  try {
    const options = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    };

    const { data } = await axios.post(action, qs.stringify(form), options);

    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
    res.set('AMP-Access-Control-Allow-Source-Origin', sourceOrigin);

    res.json({ data });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
