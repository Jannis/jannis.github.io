---
layout:     post
title:      Early experiences with the JavaScript world
date:       2014-09-14 03:41:00
categories:
---

Over the past 4-5 weeks, I have done a fair amount of explorative
hybrid mobile development. Among other things, I have written

* a web application and complete RESTful web API serving a dozen
  resources/models using [Clojure] and [MongoDB], utilising frameworks
  such as [Leiningen], [Ring] [Compojure], [Enlive], [Monger] and
  [Liberator], as well as a custom written convenience DSL for MongoDB
  collections, all running on [Heroku],
* Clojure scripts to populate the database with test data parsed from
  YAML as well as being randomly generated,
* a simple native Android app that takes photos using the camera,
* a few small hybrid test apps for Android using [PhoneGap] and its
  developer app,
* a few small hybrid test apps for Android using [Cordova] and a few of
  its plugins (toasts, status notifications, camera etc.),
* a prototype for an app with various sequential and nested views, an
  input wizard to create objects, nested list browsing and web API
  integration (see the first item) using [Ionic], [Angular] and
  [ngCordova],
* the same prototype again using [Ember] and a custom CSS UI toolkit
  written from scratch by a friend (inspired by Google's awesome
  [Material Design]; we first tried [jQuery Mobile], but more on that
  later), with added support for the [Ripple] emulator and
  [livereload]&#8212;pretty awesome for debugging.

The latter we wrote from scratch on a long weekend, with me handling the
logic (Ember routes, models, controllers, templates, web API
synchronisation etc.) and my friend handling the UI design and CSS
framework. We then showed it to a potential customer and got them
excited.

At times, during these weeks, I felt like the teenage programmer I once
was, inexperienced and lost, blindly digging around in a complex world
with endless choices and possibilities, with days and days of trial and
error but nothing that just worked. I guess coming to JavaScript from the
desktop and embedded world takes some time to adjust.

I wanted to share our findings so far, perhaps they will help some of
you to find your way around the technologies involved in hybrid mobile
development. Perhaps recapping helps me understand better what I have
been looking at so far.

## Experiences

Note: These are very opinionated. Some may be unjust. Some may be wrong
or unfair simply because my knowledge and experience with JavaScript
communities and frameworks is limited. (And, of course, all the numbers
are plucked out of thin air for extra drama.) So please correct anything
that you feel is presented wrongly or badly.

### General

The JavaScript world is incredibly fragmented, more so than any other
language world that I have seen (like Ruby or Clojure for instance).
What I mean by this is that there are at least a dozen JS libraries out
there for any particular problem or topic, two thirds of them will not
work and hardly any of them are stable.

For example, there are hundreds of JS/CSS UI frameworks out there. Half
of them are modeled around Bootstrap but aren't nearly as useful or
clean (if you can say that about Bootstrap, I'm not sure). 80% of them
all are crap anyway, meaning that there are very few out there that are
useful for building mobile apps.

### Communication

In JavaScript, communication appears to work differently than in, say,
the Linux world. It isn't very surprising but it's worth mentioning
anyway. I'd like to give two particular examples: Ionic and Ember.

Yes, they have IRC channels (like, for instance, the Fedora Project or
the Xfce desktop environments do). There are about 50-60 and 360-370
users in the `#ionic` and `#emberjs` channels on FreeNode, respectively.
But during the 1-2 weeks I spent eyeing the channel logs in either room,
99% percent of what I saw were: join/leave messages and unanswered
questions. To the few questions I had, only 1-2 guys ever replied and
tried to be helpful. One told me I was doing it wrong but couldn't
really explain *how* I was doing it wrong. But he tried to help and
sometimes that's all that counts. He was probably right as well.
Anyway, my conclusion from this is that, in the JS world, people use
other ways of communicating. You just need to find them. With Ionic it
looked like there was plenty going on in [their
forums](http://forum.ionicframework.com) and on GitHub. Ember may be the
same.

### Stability and documentation

Right, documentation. Everyone's old friend who stayed at home, was left
behind and never saw the world. I have nothing against APIs that change,
frameworks that move on. And I know that hardly anyone enjoys writing
documentation or keeping it up to date. When I was actively contributing
to [Xfce](http://xfce.org) we sucked at documentation. Most people do.

But then again, the desktop world isn't moving anywhere near as fast as,
for instance, the Ruby world or, even more so, the JavaScript world. If
you want to have the slightest chance of understanding the gazillions of
JS libraries out there, you rely on documentation (and reading code).
With both [Ionic](http://ionicframework.com/docs/) and [Ember] it took
me days to realize that the documentation was not up to date.

Two examples: Ionic has a concept of animations for transitioning
between views. When I looked at the [docs and example
apps](http://ionicframework.com/docs/api/directive/ionNavView/), they
were all using an HTML `animation` attribute, e.g.

{% highlight html %}
<some-element animation="slide-left-right-ios7">
{% endhighlight %}

It took me some time and running my app against Ionic with a few
iterations of `git bisect` to find out that [the `animation` attribute
had already been
removed](https://github.com/driftyco/ionic/commit/d4b9ed44fa613893f955f2d91aac246ff34d81cb)
and it was all CSS classes now. In Ember, you first have to find a
[certain file in
GitHub](https://github.com/emberjs/data/blob/master/TRANSITION.md) to
understand why all your data modeling, REST integration and JSON
serialization isn't working. Oops, many of the examples out there are
useless because the Ember Data API changed completely from 0.13 to 1.0.
Ember Data alone is highly complex (about 13000 lines of code involving
async operations, promises etc.)&#8212;there is no way you're going to
find the cause of your issues by looking at the code quickly.

Both Ionic and Ember have very useful and complete documentation, which
is hard enough to achieve. But this is just something to be aware of. In
a fast-moving world, documentation will be outdated.

### Package and dependency management

The two central tools for managing packages and project dependencies in
JavaScript are NPM (the Node.js package manager) and Bower. When you
come from the Linux package management world (whichever one, source or
binary, it doesn't matter), they will be confusing. Even if you know
RubyGems you may at first trip over NPM and Bower, because unlike Linux
packages and gems, most of the NPM and Bower packages are installed
locally, into your project directory. Weird, huh?

In essence, NPM and Bower are both tools to spin up a JS development and
runtime environment for your project regardless of what distribution or
OS you are using. I'm still not 100% percent sure about the difference
between the two but my impression is that NPM is mostly used for build
tools, shell utilities, generators, converters, anything that you would
need to launch your project (e.g. in your browser), whereas Bower is
used to install JS libraries needed by your project at runtime. The
truth is probably somewhere inbetween.

I've found Bower to particularly cool. It's just so easy to run

{% highlight bash %}
bower install --save ember
{% endhighlight %}

and have Ember pulled in and dropped in your project, ready to be
included in your HTML5 app and (thanks to `--save`) remembered for
the future. Now all you need to do is add `bower.json` to version
control and everyone in your project can spin up their environment with
1-2 commands, e.g.

{% highlight bash %}
npm install
bower install
{% endhighlight %}

Done. Bower can pull straight from GitHub tags (it picks the latest
release tag by default) or commits (it falls back to the latest commit
if there are no release tags), which is pretty cool.

Other related tools include [Broccoli], [Grunt] and [Gulp], which are
the JS equivalents of Ruby's Rake, basically. For some reason people
seem unable to decide on one and so there's at least three instead (did
I talk about fragmentation already?).

### Mobile web apps and frameworks

Despite what the industry may claim (and has probably claimed for a few
years by now), the whole HTML5 apps on phones story seems to be young.
The UI frameworks that I have seen and tried all seem to be under
fairly heavy development, with frequent breaking changes and basic
features still being under major discussion.

In the hybrid world, [Cordova] seems to have established itself as the
underlying technology to bring HTML/JS/CSS to Android, iOS and more. For
the UI there's a relativel complete UI framework with [Ionic], which has
a lot of appeal. There is also some initial work on integrating [Meteor]
and [Cordova], which could become interesting in the future.

For our final prototype we decided against [Ionic] for two reasons:
They've implemented delays and premature cancellation into their visual
feedback for touch events [as described
here](http://forum.ionicframework.com/t/unresponsive-laggy-ui-on-android-and-on-linux-compared-to-the-ionic-docs/8977/9),
which essentially means that if you tap fast, UI elements will not
appear pressed visually. I think that's a problem. The other reason
against Ionic was the interaction between Ionic views and [Angular UI
router](https://github.com/angular-ui). What a nightmare. Perhaps I'm
just plain incompetent but the way you have to nest router templates,
`ion-views` and `ion-nav-views` and link routes to views breaks
forward/backward navigation, route transitions and animations between
views in more ways than I can describe. Surely, there must be people out
there who find this intuitive and can explain it to me?

If you have a very simple app this may be fine. However, I wouldn't be
at all surprised if things start breaking as soon as you add, let's say,
tabs and subviews. One thing I really liked, however, was the very clear
definition of SASS variables for colors, fonts etc., which were
extremely easy to override and customize.

There are other UI frameworks out there apart from Ionic, such as
Sensha, Kendo UI and jQuery Mobile, all of which can be used with
Cordova. We've only tried Ionic and jQuery Mobile. And however much I
like jQuery, jQuery Mobile is a fucking mess. If you've got a prototype
to write in only a few days and you want it to look decent / modern /
roughly on par with what's out there... don't go with jQM, unless all
you need to customize is colors. The rest of its CSS is highly
convoluted, hard to override selectively and way too complex to be any
good.

### Angular vs. Ember and a hint at Web Components

I'll keep this short. I liked [Angular
directives](https://docs.angularjs.org/guide/directive) because they
make it easy to bundle some HTML and JavaScript together, with support
for data bindings (so e.g. a canvas element with JS for drawing and a
binding to a variable holding a vector representation of the drawing
itself). I didn't like Angular scopes and I felt they were much more
clear in Ember with its models, controllers, item controllers.

I liked Ember for its predictable naming conventions used in resolving
objects such as routes, models, controllers, templates and more. It's
very easy to override and extend stuff in Ember. I also liked Ember Data
for its easy way to define models, attributes, relationships, especially
since the latter are resolved in the background automatically. Instead
of e.g. an array of object IDs, you get an array of resolved objects.
Well, as soon as the promises for those objects are resolved. That's
where Ember can get confusing: async model relationships can result in
confusion about when those relationships are actually ready.
Serialization and deserialization of JSON data can be tricky if the web
API doesn't match what Ember expects. Did I mention issues with
duplicates in the local store cache when saving records with
relationships to other objects? Fun.

Apart from that, Ember feels pretty intuitive to me. The reason I will
be evaluating other solutions before fully committing to Ember, however,
is that it is a complex framework. If you've ever dived into
`DS.Model.save()` with a debugger step by step, you'll know what I mean.
I am concerned about loosing control.

[Web Components](http://webcomponents.org/) (see also [this talk
here](https://www.youtube.com/watch?v=OoaUd5NxiYk) look like a promising
alternative to Angular directives that could also work with Ember at
some point. Besides Web Components looking like a lot of fun, there are
apparently plans to support them in both frameworks already. I'm not sure
how much fun it is going to be to work with a mix of in-component JS and
application logic written in e.g. Ember, especially when it comes to
routing, transitioning, data binding, off- and online syncing etc. but
as self-contained and -styled elements that you can pass data bindings
into from e.g. Ember I imagine they could be pretty cool. Ember
components feel a little cumbersome and all over the place to me so
far, with their separate templates, `Ember.Component` subclasses and
global CSS.

### Integration of Ember and jQuery

Allow me one short note about Ember and jQuery. Ember loads its views,
templates and components into the DOM on demand, e.g. when transitioning
from one route to another. This means that you can't naively perform
global `$(document).ready()`-style jQuery magic upfront. You'll have to
listen to such events as `Ember.View.didInsertElement` to apply jQuery
to newly inserted elements on demand. And even if you do, calling jQuery
on the inserted elements straight away may not work, thanks to race
condititions.

### Animated view transitions in Ember

During our long prototyping weekend, we spent nearly a day trying to get
transitions between Ember routes to be animated (ideally with a slide
effect). My personal conclusion is that there's no point in trying to
get any of the numerous JS libraries for this to work if you don't
have an in-depth understanding of CSS transitions, hardware-accelerated
CSS, Ember routing behind the scenes, and JS browser frames. Frankly, we
tried so many things, it's impossible to recall their names.

The thing that nearly worked was [Liquid
Fire](https://github.com/ef4/liquid-fire). Sadly though, it messed with
any CSS layouts that we gave it by applying undesirable translation and
scaling to the HTML elements. In the end we decided to focus on
functionality instead and defer animations to some point in the future.

### Conclusion

Right, so, basically, the JavaScript world (and particularly its mobile
side) is complex, fragmented, moving fast and often unstable, such that
it is often hard to know what the right way forward is or what is really
going on. But it is also challenging and fun. I hope that some of the
above proves useful to someone at some point. Again, please feel free
to correct me. And if you'd like to get a discussion going, feel free to
do that as well!

[Angular]: http://angularjs.org
[Broccoli]: https://github.com/broccolijs/broccoli
[Clojure]: http://clojure.org
[Compojure]: https://github.com/weavejester/compojure
[Cordova]: http://cordova.apache.org
[Ember]: http://emberjs.com
[Enlive]: https://github.com/cgrand/enlive
[Grunt]: http://gruntjs.com/
[Gulp]: http://gulpjs.com/
[Heroku]: http://heroku.com
[Ionic]: http://ionicframework.com
[jQuery Mobile]: http://jquerymobile.com
[Leiningen]: http://leiningen.org
[Liberator]: http://clojure-liberator.github.io/liberator/
[Livereload]: http://livereload.com/
[Material Design]: www.google.com/design/spec/material-design/
[Meteor]: https://www.meteor.com/
[Monger]: http://clojuremongodb.info
[MongoDB]: http://mongodb.org
[ngCordova]: http://ngcordova.com
[PhoneGap]: http://phonegap.com
[Ring]: https://github.com/ring-clojure/ring
[Ripple]: http://ripple.incubator.apache.org/
