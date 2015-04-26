---
layout: default
title: Day 25 - Using Jekyll
---

#Using Jekyll

Today I learned how to set up a local installation of [Jekyll](http://jekyllrb.com/), the static site generator built into [GitHub Pages](https://pages.github.com/). It was not especially easily! Thankfully, a few resources helped:

- [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/) - a great guide by [@juthilo](https://twitter.com/juthilo)
- [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/) - from GitHub.com
- [Some Things I Learned While Buildling a Site on GitHub Pages](http://ilovesymposia.com/2015/01/04/some-things-i-learned-while-building-a-site-on-github-pages/) - by [@jnuneziglesias](https://twitter.com/jnuneziglesias)

After banging my head on my desk for a little while, I now have it working smoothly. Woohoo! I even learned how to set up [Pygments](http://pygments.org/), a syntax highlighter that makes code snippets look nice. For example, this is what I typed into the command line to generate the stylesheet for syntax highlighting:

{% highlight console %}
$ cd GitHub-Pages-Folder
$ pygmentize -S default -f html > pygments.css
{% endhighlight %}

And this page was written in [Markdown](https://help.github.com/articles/markdown-basics/) instead of HTML! [See the code here.](https://github.com/LearningNerd/30DaysOfWebDev/tree/gh-pages/day25) So I may not have been very creative today, but it does feel good to finally be more comfortable with using the command line and getting a sense for how all these tools work together.