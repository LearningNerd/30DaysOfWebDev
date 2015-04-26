---
layout: default
title: Day 25 - Using Jekyll
---

Today I learned how to set up a local isntallation of [Jekyll](http://jekyllrb.com/), the static site generator that's built into [GitHub Pages](https://pages.github.com/). It was not especially easily! Thankfully, a few resources helped:

- [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/) - a great guide by [@juthilo](https://twitter.com/juthilo)
- [GitHub's Guide to Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/)
- [Some Things I Learned While Buildling a Site on GitHub Pages](http://ilovesymposia.com/2015/01/04/some-things-i-learned-while-building-a-site-on-github-pages/) by [@jnuneziglesias](https://twitter.com/jnuneziglesias)

I even learned how to set up [Pygments](http://pygments.org/), a syntax highlighter that makes code snippets look nice. For example, this is what I typed into the command line to generate the stylesheet for syntax highlighting:

{% highlight console %}
$ cd GitHub-Pages-Folder
$ pygmentize -S default -f html > pygments.css
{% endhighlight %}
