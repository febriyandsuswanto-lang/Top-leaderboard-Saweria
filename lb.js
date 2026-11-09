module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const period = ['all', 'year', 'month', 'week'].includes(req.query.period) ? req.query.period : 'all';
  const key = req.query.stream_key || '';
  try {
    const r = await fetch('https://backend.saweria.co/widgets/leaderboard/' + period + '?stream_key=' + encodeURIComponent(key));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=20');
    res.status(r.status).send(await r.text());
  } catch (e) {
    res.status(502).json({ error: String(e && e.message || e) });
  }
};
