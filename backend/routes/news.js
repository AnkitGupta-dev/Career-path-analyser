const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Fetch top stories IDs
    const topStoriesRes = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
    const topIds = topStoriesRes.data.slice(0, 20); // Fetching top 20 then we will extract top 5

    // Fetch details for each story
    const storyPromises = topIds.map(id => 
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );

    const storiesRes = await Promise.all(storyPromises);

    const news = storiesRes.map(response => {
      const story = response.data;
      return {
        title: story.title,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        score: story.score,
        time: story.time,
        by: story.by
      };
    })
    .filter(story => story.title && story.url)
    .slice(0, 5); // Extracting top 5

    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
