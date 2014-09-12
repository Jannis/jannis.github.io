---
layout: default
title: Jannis Pohlmann
---
<section id="blog">
  {% for post in site.posts %}
    <article>
      <h2>
        <span class="title"><a href="{{post.url}}">{{post.title}}</a></span>
        <span class="date">
          {{post.date | date: '%d %b'}}<br/>
          <span class="year">{{post.date | date: '%Y'}}</span><br/>
          <span class="time">{{post.date | date: '%H:%m'}}</span>
        </span>
      </h2>
      {{post.excerpt}}
      <p><a href="{{post.url}}">Read more</a></p>
    </article>
  {% endfor %}
</section>
