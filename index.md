---
layout: default
title: Jannis Pohlmann
---
<section id="blog">
  {% for post in site.posts %}
    <article>
      <div class="date">
        {{post.date | date: '%d %b'}}<br/>
        <span class="year">{{post.date | date: '%Y'}}</span><br/>
        <span class="time">{{post.date | date: '%H:%m'}}</span>
      </div>
      <h2>
        <span class="title"><a href="{{post.url}}">{{post.title}}</a></span>
      </h2>
      {{post.excerpt}}
      <p><a href="{{post.url}}">Read more</a> <a class="comment-count" href="{{post.url}}#disqus_thread"></a></p>
    </article>
  {% endfor %}
</section>
<script type="text/javascript">
  /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
  var disqus_shortname = 'gezeiten'; // required: replace example with your forum shortname
  
  /* * * DON'T EDIT BELOW THIS LINE * * */
  (function () {
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
  }());
</script>
