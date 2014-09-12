---
layout: default
title: Jannis Pohlmann
---
<section id="blog">
  <article>
    <h2>Posts</h2>
    <ul class="posts">
      {% for post in site.posts %}
        <li>{{post.date | date: '%Y-%m-%d'}} &raquo; <a href="{{post.url}}">{{post.title}}</a></li>
      {% endfor %}
    </ul>
  </article>
</section>
