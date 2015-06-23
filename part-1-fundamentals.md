---
layout: tutorial
title: "Learn React & Flux: Part I"
description: Brought to you by Formidable Labs and SeattleJS, Colin Megill walks us through Facebook's React framework in part one of this three-part series.
video: Pd6Ub7Ju2RM
repo: https://github.com/formidablelabs/recipes-flux
resources:
  -
    title: "Thinking in React"
    url: "http://facebook.github.io/react/docs/thinking-in-react.html"
  -
    title: "Removing User Interface Complexity, or Why React is Awesome"
    url: "http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome"
    author: "James Long"
    author_url: "http://jlongster.com/"
    date: "May 13, 2014"
---

## Welcome

**Colin**:  It's intimidating to present someone else's technology that they built at their place, right? I'm not a Facebook developer; some of you know me through a startup, and some of you know me as being a dev in the community. There were a couple of questions in the comments on the meetup group, and inevitably someone brought up other frameworks and Angular, and I think I'll dovetail from that into what kicked us off tonight.

## "The Problem with Angular"

I took a look today: [this is interest over time for Angular](https://www.google.com/trends/explore#q=backbonejs%2C%20reactjs%2C%20emberjs%2C%20angularjs&cmpt=q&tz=), and this is comparing it to Backbone, which is basically a non-event compared to both Angular and Ember. React is just taking off, and this is only the US, right? Whereas Angular is dominant abroad and popular in the US, React hasn't started to spread yet&mdash;it's really early days for React, but it's really exciting.

I'll leave you with this quote, and we’ll use it as a way to segue into a discussion about two-way data binding versus unidirectional data flow. This is a quote {% include skipper.html time="00:01:47" %} from someone who's much smarter than me&mdash;you guys probably know quirksmode {% include skipper.html time="00:01:51" %} in the community.

He wrote [this article](http://www.quirksmode.org/blog/archives/2015/01/the_problem_wit.html) a little while back, and it said this: *"In the last six months or so I talked to several prospective clients that had a problem finding front-end consultants {% include skipper.html time="00:02:00" %} in order to help their dev teams get a grip on their Angular projects. Although there are front-enders that are enthusiastic about Angular, I have the feeling that their number is surprisingly low for a major framework. I expected Angular to gain more traction than it has. Angular is aimed at corporate IT departments rather than front-enders, many of whom are turned off by its peculiar coding style, its emulation of an HTML templating system that belongs on the server instead of in the browser, and its serious and fundamental performance issues."* It's that perf issue that we're going to talk about throughout the night.

This was not something that Google was touting very loudly at the outset, but now that they're having to switch to a completely different syntax, they're talking about it a little bit more: when Angular was first created almost five years ago, it was *not originally intended for developers*, which is a mind-blowing statement, because obviously it was touted as the new MVC framework. But it was targeted more at designers who needed to quickly {% include skipper.html time="00:02:56" %} build persistent HTML forms.

Those organizations that have picked up Angular have run into persistent perf issues. How is front-end perf different between Angular or Ember and React? Why? At a granular level, why is this different? What's the advancement?

## The benefits of React

I've been working with React for a couple of months now. I'm still beginning myself, but I'm far enough through to help you guys through first principles. That's where we're going to start. If you haven't cloned it down yet, we're going to be in the repo "react-flux-concepts" {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="React Flux Concepts" %}. Let me just zoom in on this and make sure everyone has it, because this is, like, our whole night here {% include skipper.html time="00:04:00" %}. We're going to be working through a series of progressively more complex examples.

What do we need in a framework? Why do we use frameworks? In big team projects, we need convention, patterns, maintainability, performance, and more and more complex client-side state. We need increasingly complex client-side features, something that senior devs can get behind, something whole dev teams can get behind over the long term, stability in the code base, and good backing.

React has hit all those, and I've seen a reaction to it in the community. It's evidenced by what we're seeing here tonight. We've never had a turnout like this for a SeattleJS meetup: we've had 430 people respond, 130 people on the waitlist, 300 accepted. It's the largest event in our history as a meetup, and I think what's wonderful about tonight is that this community comes together to learn, and that's a really great thing. We're all still growing together.

All right, so without further ado, let's work through some examples.

## Hello World: the how and why of JSX

If you've used React at all, you know you need a JSX transformer, and so next meetup we'll be working with a webpack build. But for tonight, we're going to do this JSX transformation in-browser. Let's look at the "hello world" example, and let's talk through what's going on. {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="002" %} {% include skipper.html time="00:06:00" %} This is JSX. It looks like HTML, but it's not HTML. It's a markup syntax that you can use to sugar functions. What's going on in React is this. You start with a …

**Speaker 1**:  Can you bump up the font size, please?

**Colin**:  Sorry about that, that's my bad. Is that big enough? Better back there in the back? Good, okay, sorry about that. This class, RecipeBook, this is called a component, and there is some new vocabulary tonight, and component is the first word. **A component is a React class, and you can define methods on it and use it to return a tree of functions that construct a DOM**. {% include skipper.html time="00:07:43" %}

What React is going to do under the hood is take the JSX and turn it into JS... if you look at this on the React site {% include skipper.html time="00:08:00" %}, at the Facebook React examples, they have a little in-browser JSX transformer where you can… Bigger?

**Speaker 2**: Font size.

**Colin**: Font size, here you go. Where you can see what JSX turns into. Basically, it turns into a function with arguments&mdash;that div, it's turning into a function underneath the hood. React parses the UI as a tree of functions and passes it to the virtual DOM, which takes how the DOM looks and the new state, diffs them, and only repaints what's needed.

This is the fundamental advancement here. We don't have to repaint strategically; we can repaint all the time. What that means is that our user interface is a constant reflection of the state of our application, of the data state, and that re-rendering allows us to use a one-directional flow versus a two-directional flow.

Let's talk about this in context of a Backbone app. Let's say you have a view, and this view is listening to changes on a model, and it's setting the model, and it's getting things from the model, and they're manipulating each other. The model manipulates the view by emitting events, the view manipulates the model with getters and setters, and then you have another view over here. This view changes the model, and the model could then update and change the view over here, right?

This is, like, the fundamentals of two-way data modeling, right? We're all on the same page? This is normal, {% include skipper.html time="00:10:00" %} so what's not normal is to say, **every single view in our entire application is going to be downstream of our data**. We're never going to set data; we're only going to get it. We're going to re-render the entire user interface every single time something changes. Someone presses "F" into a form input, we're re-rendering the entire application. Of course, we're not actually re-rendering; what we're actually doing is diffing the previous DOM against the new DOM and just changing the elements that need to be changed.

That's the innovation under the hood here. The fact that Facebook built that means that we get to work at a level of abstraction where we can basically assume that our DOM is re-rendering every time, even though it's being re-rendered intelligently under the hood. That is, at a high level, the fundamental difference here. It makes for simpler reasoning about our applications.

## Nesting components

Let's take a look at nesting. On each one of these topics now, we're going to start to have some little assignments for you, and you can try these out for a couple minutes. Let's take a look at RecipeBook. RecipeBook is acting as a kind of controller view&mdash;this is 003-nesting.html {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="003" %}&mdash;it's acting as a kind of controller view, and we're going to nest RecipeList and RecipeForm inside it.

This is a "hello world" still. We're creating three components: RecipeForm, RecipeList, and RecipeBook, and we're nesting RecipeList and RecipeForm inside RecipeBook. This looks like {% include skipper.html time="00:12:00" %} magic, right? This is not familiar markup; this looks like a variable name. We have access to it because we declared it as a class. But this is not a variable name, so let's look at what JSX is doing here.

If you put a couple of curly braces here, JSX is going to look for a variable. It's going to evaluate things&mdash;you can do a ternary {% include skipper.html time="00:12:36" %}, you can do maps {% include skipper.html time="00:12:38" %} and whatever else you want. I will say that the first twenty minutes or so for me, there was outright revulsion and panic, and then after that it was like okay, and then after a few hours I really didn't even notice anymore, so if you're feeling revulsion and panic, welcome. That's okay, give it five minutes.

So we have nested components inside other components. What's important to note is, these two components, they're *owned* by RecipeBook. What that means is that RecipeBook is going to manage their state, and we'll see that in just a moment. But for now, go ahead and try this on your own, create a new class, put some HTML in there and let me open this up in browser so you can see.

When we render this, we find that we have our top-level component, our controller view, and then we have the HTML that was returned by the functions that were nested inside. I'm going to go back and forth between calling these functions and calling them components, because really the insight here is that you're creating a user interface as a tree of functions, {% include skipper.html time="00:14:00" %} and if you can wrap your brain around that tonight, then you've really got the first principles of React.

We're creating a whole user interface as a tree of functions, and we're going to be passing data down through that tree as arguments. For now, go ahead and give this a shot: create another component, nest it inside the existing component, and render something to the screen. You're going to have it return some HTML: an a tag, a p tag; if you're really adventurous you can do, like, a form. Give you a couple of minutes here.

Everyone got me? If you have internet, if you finished this and it was super easy, go ahead and go to the Facebook React guide. {% include skipper.html time="00:16:00" %} Look at the JSX transform, look at what JSX becomes, and I'm going to show you up here in just a moment when we get that going.

{% include skipper.html time="00:16:36" %}. Here you go. Under the hood it’s doing React.createElement and applying these attributes&mdash;they look like attributes, but they're custom tags and custom attributes&mdash;and applying them as objects as another argument {% include skipper.html time="00:17:50" %} to the function.

## Props

We're going to keep going. Next let's take a look at props {% include skipper.html time="00:18:00" %}. We know we're in a function, so now we're going to think about arguments. When we define a component class, we start at the top, so we'll start with RecipeBook. When we define RecipeBook, we nest RecipeList and RecipeForm, so we've defined a new class now, and this new class is called Recipe. Recipe returns HTML that is set dynamically with data.

This should look familiar to everyone who has used templating and Handlebars, yes, right? This is not a stunner that we're setting HTML dynamically, but what is a bit of a surprise is when you look at where this is coming from. This is actually coming down in what look like custom HTML attributes. Title equals "stuffed chard" in the component: we have this.props.title, so we've passed props down into two sub-components.

Let's go ahead and open that up in browser&mdash;you can see we've rendered an H2 and a paragraph tag with the data that we passed in from the parent component. Now this is actually not that hard to reason about, because it's just functions. If we're thinking about this as a tree of functions, and we're thinking about passing arguments down through the tree of functions as well, we have a function inside a function, pass an argument down it through, pass an argument, {% include skipper.html time="00:20:00" %} keep passing down, keep passing down.

It can go as far down as we want, and the render method of the child here simply evaluates this.props.title, inserts it, and returns that to the corresponding JSX. For this one, go ahead and check out what this.props looks like in console.

this.props is an object that the child receives, and again, if you just think about this as functions, you can see past the JSX, because it looks like HTML but it's functions. The attributes&mdash;what look like HTML attributes&mdash;are basically key-value pairs getting passed down to the child.

This syntax helps us reason about it a little bit more easily: we can feel like we're writing HTML. Go ahead and do the next assignment if you feel comfortable... Maybe I'll say foo equals bar, and I'll save that, and I'll refresh this, and I'll get foo: bar in the child. Go ahead and try that, and try to take one more step for yourself and get something on screen. {% include skipper.html time="00:22:00" %}

You guys are being really, really good about the no-questions thing. Anyone want to throw out a question? Yeah?

**Speaker 3**:  Is there a way to use the autocompletion on this template? [00:22:43]?

**Colin**: Like in Eclipse, so you know what you …

**Speaker 3**: [inaudible 00:22:47], I can use shorthand.

**Colin**: Yeah, yeah, Sublime has a JSX plugin.

**Speaker 3**: Okay, cool.

**Colin**: Yeah, others?

**Speaker 4**: How can I do conditional logic based on value properties?

**Colin**:  Sure, so you can do a ternary in there, you can do anything you want in there. You can do ifs, you can do functions, you could declare a thirty-line block of {% include skipper.html time="00:23:26" %} code and have it execute. It's just got to be inside one of those curly braces. It's not best practice, though&mdash;you should put it into a method. Does that answer your question?

**Speaker 4**:  How to, like, alter what tag is rendered? Maybe it's an h3 or an h4 {% include skipper.html time="00:23:36" %}?

**Colin**:  Based on this? That's a good question. I suppose I would just make it a method, right, like methodName or {% include skipper.html time="00:24:00" %} this.three and then&mdash;sorry, that's funny, but it's really confusing. headingGenerator, there we go, that's properly abstract. Great question by the way, and then you can just do if this.props.whatever and then… Does that make sense? Great. Yeah?

**Speaker 5**:  [inaudible 00:24:39].

**Colin**:  Good question. You can do the same for arrays. As a matter of fact, you can pass all the props down to the child, which is super handy. That is used in the router extensively.

**Speaker 5**:  [inaudible 00:25:20]

**Colin**:  Yeah, all the way in the back.

**Speaker 6**:  Is there any way to change the entire model? With a reference to that model, can you write to it?

## The briefest introduction to Flux

**Colin**:  Stay tuned, great question. So the question was, can any component change the model, right? No components change the model. Unidirectional data flow. The high-level answer to that is that here is how Flux works: any component can say, "Hey, something happened," right? {% include skipper.html time="00:26:00" %} I'll give you guys a very brief overview, and then we'll move to the next one.

Any component could say, "Hey, something happened," and that fires what's called&mdash;this is a little bit of a proprietary terminology here&mdash;it fires an **action**, which is basically a callback. You fire the action, which has an action type (which is like a name: so, say, "add recipe") and a payload of whatever data changed, and you send that over.

The store&mdash;which is basically the model&mdash;gets the data, gets the type, and then does whatever it needs internally to manipulate its own data... it's like closure scope, right? It's {% include skipper.html time="00:26:46" %} going to return public getters but not setters, because it's one way, not two-way, and then it's going to emit a change. And when it emits a change, the components that are listing for that say, "Oh, okay, I’ve got new data," and then you render everything, and that's the one-way flow.

You re-render everything, every time. Every time you fire an action, the store changes, and everything listening to it re-renders. That's flux in a nutshell, have a good night, see you tomorrow. ;)

## Collection rendering

We're going to go the next one, which is collection rendering. Obviously it's not great to declare our data in our markup; that's not realistic. We're not going to store our state in our DOM; we're not going back to jQuery here. We're not barbaric. We're civilized JavaScript developers.

Let's go down to the bottom: we're going to look at this as if it is, again, a *tree of functions* rather than the markup you're seeing, and we're going to pass in window.recipeData, which is defined right above. Of course, all the components have access to this. {% include skipper.html time="00:28:00" %} We're just going to pretend it's modularized. (When we have a full repo, like we're dealing with next week, this *will* be fully modularized, and we won't have to pretend that all the components can't see window.recipeData.)

So window.recipeData now has the data that we previously had written declaratively on the components themselves, on those pseudo-attributes. When we call React.render, which is our root, RecipeBook is our controller view / entry point to this tree of functions and tree of DOM nodes {% include skipper.html time="00:28:33" %} that's being generated. We say that we're going to pass in data as window.recipeData, so let's follow it through.

Let's go back to our image here. We have our data, and our data is now broken out, and RecipeBook is going to receive that data and pass it down. This matches directly to the names that are in that files, by the way, so you can go back and forth.

RecipeForm doesn't need this data, but RecipeList *does* need the data, so we're going to pass the props down from RecipeBook into RecipeList, and then we're going to do a map over that data. For each item in our Recipes array, we're going to create a new component, passing in the props: passing in the data as the value.

We're also going to pass it the index as key, and I'm going to tell you about that in a moment, so let's stay tuned. Key is a magic word in React, and it's important for diffing. So then we have two recipes, and each has received its own data, its own props. {% include skipper.html time="00:30:00" %} Let's take a look at what that looks like in code.

We have RecipeBook, our controller view. We don't pass the data to RecipeForm&mdash;it doesn't need it. We do pass it to RecipeList, which iterates over the data that's received. RecipeNodes creates the nodes with this.props.data.map, and it returns a component, which itself will return HTML&mdash;again, just think about it like we've got a tree of functions, and each one is going to return a computed tree of elements.

We can then say that the title is recipe.title and the instructions are recipe.intructions, so we simply insert it like that. We grab the nodes: we've set a variable, recipeNodes, and we simply put it in curly braces, so that we tell React to look for JS. This [without curly braces] will actually write out recipeNodes, right? It's not JS; if it's in curly braces, it is JS.

Let's take a look at what this looks like in the browser. We have exactly the same thing&mdash;unexciting&mdash;but it didn't break, so that's good. Stuffed chard, eggplant, and polenta: we now have data which is coming from, we'll call it a a "global truth." Sorry, we'll use the React lingo: we've got a data store.

There's no assignment on this one. Basically, this shouldn't be too much of a conceptual jump {% include skipper.html time="00:32:00" %} from the previous one. Rather than passing just from RecipeBook down to RecipeList, we're abstracting the data and passing it down through arbitrarily many functions.

How many people here have been in a large Backbone project? I have been in large Backbone projects. I can say that this sounds familiar: "I think we're going to need a new view." What we just did is we just increased the graph, right? We have a new view; arbitrarily many other things could be affected by this. Views are not free if you're going two-way because you're dealing with a graph, but here we're dealing with a tree.

I've talked to some of the guys at Facebook, and they're telling me they're pushing like *ten thousand* components, they're pushing *ten thousand* views because everything can just be modularized, so you just keep passing data down and it keeps being okay because it’s just passing args through functions and they're not mutated. That's good news for long-term maintainability.

It would seem crazy to fire that many functions every time. However, if you look through some of the React talks, the engineers at Facebook are talking about RAM versus computation on phones. For mobile, if we're going to be rendering all these DOM {% include skipper.html time="00:33:34" %} nodes over and over again, well, yeah, we've got to fire the functions, but we have like quad-core phones now. What we don't have on phones is a ton of RAM.

If we're going to have mobile applications that have a ton of listeners, and that listener array is just going to grow and grow and grow, then we're taking up more and more RAM and we have to hold that state and that's RAM-intensive. That's the argument that I've heard some of the engineers make in a couple of videos, which was useful for me to help reason about it. {% include skipper.html time="00:34:00" %}

We're going to move on from this to state, but before I do, I'll take maybe three questions. Yeah, Ryan?

**Ryan**: What goes in render? What can and can't I do inside the render function?

**Colin**: Hmm, that's kind of abstract.

**Ryan**: Maybe I'm just supposed to return nodes&mdash;am I supposed to transform data {% include skipper.html time="00:34:35" %}?

**Colin**:  Actually, there is a really, really, critical point here: **you have to return a root node**. The root that you return cannot have a sibling. This will fail. We would need to wrap that in a parent div. And if you return a single other component, then that single other component has to return a root node, if that makes sense. I'll answer two more questions before we move on. Yeah?

**Speaker 6**:  Giving that key as an attribute …

**Colin**:  Thank you.

**Speaker 6**:  What is that?

**Colin**:  Thank you, thank you, yes. I forgot I said that I was going to come back to that.

**Speaker 6**:  I know it's a protected React attribute.

**Colin**:  It is, yes. {% include skipper.html time="00:36:00" %}

**Speaker 6**:  If that changes, is it going to re-render that portion of the DOM? {% include skipper.html time="00:36:03" %}

**Colin**:  Let's go to this really great post: [https://facebook.github.io/react/docs/reconciliation.html](https://facebook.github.io/react/docs/reconciliation.html). If you've not read it, it's called Reconciliation. Let’s read this together; it’s a super-important concept. "**React's key design decision is to make the API seem like it re-renders the whole app on every update**. This makes writing applications a lot easier but is also an incredible challenge to make it tractable. This article explains how with powerful heuristics we managed to turn a O(n3) problem into a O(n) one."

You can probably guess where this is going: we make some assumptions, right, and one is that it's possible to provide a unique key for elements that's stable across different renders. That’s one of the assumptions that took it to O(n) from O(n3). The key can be the index, or it could be an {% include skipper.html time="00:37:02" %} Underscore ID, or, like, a MongoDB ID. It could be something that you hash in the function itself and just create: if it will be consistent, it doesn’t matter. All that matters is that it’s consistent across renders.

Another important thing to note is that you're not getting all the performance benefits unless you use React’s PureRenderMixin, which basically says, "Yes, I’m following these two rules." By default, React assumes that you're not following its rules, which makes it not fast, so you have to do that yourself. (I’ve seen allusions to their wanting to flip that and warn you if you're not doing those two things, so it's super-performant out of the box.) If your React component's render function is pure&mdash;in other words, if it renders the same result given the same processing state&mdash;you can use this mixin for a performance boost.

I won’t read this whole thing to you, but Reconciliation will explain keys.

## State

Let’s move on to the concept of state {% include skipper.html time="00:38:25" %}. Let’s talk about the difference between application state and component state. If you're taking notes, this is definitely one of them. Application state we could think of as, like, the store. We’ve got a data store, which is basically our model, which our application is going to reference all the time.

But that doesn’t help us if, for instance, we have a counter going, or a timer going. If we re-rendered everything, we’d just re-render that with a new value, and it's back to zero. Or if we have a dropdown, and that dropdown is open and it should stay open in between renders and we just nuked it and now it’s closed again. I typed "F" and, like, it closed&mdash;no good.

So we’ve got to have **component state as well as application state**. The ideal is that there *is* no component state, that you're not using this at all, but of course you are&mdash;all the time&mdash;because you're doing things like timers and dropdowns and sorts {% include skipper.html time="00:39:34" %}. When you type, you subset a list, and you want the list to remain subsetted between renders. You don’t want the list to reflect the app truth; you want it to reflect the component truth, which may be an input someone is typing in.

So we need state. {% include skipper.html time="00:39:50" %} Let’s take a look at this. This is not coming from props: this is a "hello world" in state, and it's coming from right here, in getInitialState. {% include skipper.html time="00:40:00" %} We could do something like, for instance, let’s say that we have dropdownIsOpen and we say false, right. We can return initial component state here, and this gives us a kind of local state {% include skipper.html time="00:40:27" %} that is persistent between renders.

I’ll say that one more time. There is a component lifecycle, like when it gets put into the DOM and when it’s taken down. When the component mounts {% include skipper.html time="00:40:40" %}&mdash;when it goes in the DOM, right&mdash;getInitialState is {% include skipper.html time="00:40:44" %} called, and then when it comes out, it's torn down. getInitialState is called once, and then every time after that, if we want to change state, we need to call this.setState with new information. If someone clicks a button and it opens a dropdown, we are then calling this.setState({ dropdownIsOpen: true }), and then between renders it will stay that way until we say otherwise.

Let’s go to the next one&mdash;we’ll linger on this one a little bit longer. Let’s open it in browser: I’ve got a makings of a beautiful dropdown. Now let’s take a look at {% include skipper.html time="00:42:00" %} this component. For simplicity, there is only one component here, and the component is recipe. When it gets put into the DOM, when it mounts, getInitialState is called, and the state is set to dropdownIsOpen: false. Whenever this callback is fired on click, we reverse it and set state. We toggle it.

Let’s take a look at what this is doing. Let’s take a brief look at the page you’ll need to go to later&mdash;it's on Facebook.github.io; you can see the path here. If you want to know where that onClick is coming from and how that works, this is the article to read. We can put an onClick onto our component, but remember that’s one of these magical pseudo attributes, right?

We're passing it down as a prop, as an argument. In fact, **we're passing a callback into a function as an arg**: {% include skipper.html time="00:43:37" %} not so mysterious. Looks weird in JSX, but not so mysterious when we map it like that. When the click is fired, it does this.handleClick, and handleClick toggles the state. {% include skipper.html time="00:44:00" %} Then, in this function here, this.state.dropDownIsOpen: if it's not there, render it; if it is, don’t.

Go ahead, there are some instructions here. Add a hover event, and when hover is true, change something in the DOM&mdash;background color or something like that. Yes?

**Speaker 6**:  If you have an external library and it relies on jQuery {% include skipper.html time="00:44:46" %}, can you use it with React? {% include skipper.html time="00:44:48" %}

**Colin**:  Could you be more specific?

**Speaker 6**:  Let’s say you have a third-party library {% include skipper.html time="00:45:02" %} that’s dependent upon jQuery: {% include skipper.html time="00:45:05" %} could you still use it?

**Colin**:  Yeah, well, so... We're probably about to rewrite everything in components. [Laughs] Hey, it'll be fast...

You could also, a simpler version of this. If you want something that only takes a minute, change this.state on hover and console log this.state {% include skipper.html time="00:46:00" %} and just see what comes up in the console. See, you're changing state and toggling it back and forth.

**Speaker 7**: How is event bubbling happening? {% include skipper.html time="00:46:14" %}

**Colin**: Man, that’s a great question. Can someone from Facebook handle that? Is there anyone in the room from Facebook who can handle how bubbling is done in React? Because I do not know. I’m just going to put that out there. I can absolutely come back to you with that in the next meetup, but I don’t know. I’m going to take a note. I have a feeling that that’s a research project for me, like how it would contrast with what we’re used to doing in other systems. But I've kind of just done it, and it’s just worked up until this point.

**Speaker 8**:  Does the event return through if handled? Is there a true/false thing that handles bubbling?

**Colin**:  I don't know. It’s a good question.

**Ryan**:  Chat room says no bubbles.

**Colin**:  Chat room says no bubbles. {% include skipper.html time="00:47:34" %} This is a cross-browser wrapper around the browser’s native {% include skipper.html time="00:47:43" %} event. The event handlers below are triggered by an event in the bubbling phase. To register an event handler {% include skipper.html time="00:48:00" %} for the capture phase, append "capture" to the event name. All right, I think it’s a research project to compare and contrast with jQuery&mdash;sorry. {% include skipper.html time="00:48:07" %}

**Speaker 8**:  Well there's a boolean in there {% include skipper.html time="00:48:12" %} for "bubbles," [inaudible 00:48:14] whether or not it happens in the bubble page.

**Colin**:  Is that what you're pointing towards? {% include skipper.html time="00:48:26" %}

**Speaker 8**: [inaudible 00:48:30].

**Colin**: Oh, aha, yeah, there you go.

**Speaker 8**: But it sounds like if you wanted to do capture phase, you have to do a little more work.

**Colin**: Cool. Give me maybe a minute and half, two minutes more on this one. See if you can console.log out state given an event. Thanks. {% include skipper.html time="00:50:00" %} Thank you {% include skipper.html time="00:50:11" %} for the first PR. Please feel free to PR corrections, improvements, other ideas, other steps, intermediate steps, all welcome. This is a public repo, so if you think you’ve got a great idea for an intermediate step, PR.

**Speaker 9**:  Like no hard {% include skipper.html time="00:50:32" %} tabs.

**Colin**:  What’s that?

**Speaker 9**:  Like no mixed {% include skipper.html time="00:50:34" %} tabs.

**Colin**:  No mixed tabs, thank you. I may have finished it at 4 am {% include skipper.html time="00:50:41" %}. Before we go on to Flux and application state, let’s take a breather for a couple of minutes here. Address any high-level {% include skipper.html time="00:51:10" %} questions before we move on. Yeah?

**Speaker 10**: {% include skipper.html time="00:51:20" %}. The key uses [inaudible] {% include skipper.html time="00:51:29" %}

**Colin**:  Yeah, not the best key.

**Speaker 10**: Exactly.

**Colin**:  If you're guaranteed that you're only going to be pushing onto the array in your store, I’d use a GUID {% include skipper.html time="00:51:49" %}. Yep?

**Speaker 11**: ...if you have a list of items or every item is selectable.

**Colin**:  Is what?

**Speaker 11**: Selectable. There is a checkbox and you can [inaudible 00:52:00]. {% include skipper.html time="00:52:00" %} Where would you [inaudible 00:52:03] on the list, or on the item?

**Colin**:  Great question. You passed, so if you need …

**Speaker 12**: Can you repeat the question?

**Colin**:  Yeah, if you have a list&mdash;UI with a bunch of lis in it&mdash;and every single one of them is selectable, where do you keep the state? It’s going to be in the li. I don't know another way to do it, because each li is going to have to handle its own state. That’s like a lowest level of concern. Cool. By the way, if I’m egregiously wrong about anything, I absolutely will find out because I’m in front of 300 {% include skipper.html time="00:52:55" %} people. And guess what, I’ll let you know.

## Flux

Let’s move on to Flux. At a high level, this is going to be a bit of a ride for those of you who have only done object-oriented programming and have never done functional. The concept of  immutable data is frustrating because pretty much every time, you're going to want to, like, touch the data and do the thing. You're just like, "It's right there, {% include skipper.html time="00:53:29" %} that data is right there, it’s an object, I just want to push it, move it, and manipulate it," and you can’t. The reason you can’t is because the data is immutable.

One of the things this gets us is a guarantee that our UI is current, because the data is always current. If we have that guarantee, if we know nothing has changed, we just re-render the UI based on that data. Nothing is hiding anywhere else. I’m going to talk about it {% include skipper.html time="00:54:00" %} at a high level verbally, I’m going to walk through an image, and then we're going to walk through a file.

At a high level, there are some new vocabulary words, which are *component* and *action*. An action is fired by a component. Flux could have probably been better named "a bunch of callbacks with some organization and a subscription pattern." That would be my longer name for it. {% include skipper.html time="00:54:28" %} It’s not actually that much. We fire a method on our component, and it fires an action, and that action has a type, and that type is a string like ADD_RECIPE, for instance.

Then we have a string and we have a payload, and that payload is just JSON&mdash; {% include skipper.html time="00:54:53" %} arbitrarily large amounts of JSON {% include skipper.html time="00:54:58" %}. That's passed to all the stores that are listening, and the stores&mdash;actually, the stores are listening to *all* actions. Anytime an action fires, all the stores get it and they run a bunch of ifs, like, "Do I have it?" "Do I need to know about this?" If they need to know about it, then they run some logic internally, manipulate their state, and say, "Hey, I changed." At which point a change is emitted.

The controller view is listening for application state and says, "A change was detected." It uses a getter&mdash;the public getter on the store&mdash;to say, okay, what is it now? It goes and gets the data, and then it passes that through props down to all its children. We just pass all that data down through the tree. Again, if a store is changing on every letter someone is typing, that doesn’t mean we're doing an AJAX call; it *does* mean the tree of functions is firing.

Every letter someone types, the store is changing; every letter someone types, {% include skipper.html time="00:56:00" %} we're then re-rendering our view. We're passing that data down through props.

At first glance, this seems inefficient, but it’s the diffing engine that saves us. Let’s take a look at a diagram. Let’s say we're handling that typing event. We have an onKeyUp event in recipes, and on key up, we're going to fire an event that’s, like, "Recipe input modified." It fires an action that has the new data: whatever the text was, whatever the content in that form input was. It says, "Hey, here's an action of this type," and then an action of this type is fired, and who's listening?

All the stores are listening; RecipeStore is listening. The store gets that data and gets that action type. It fires whichever internal  methods {% include skipper.html time="00:57:08" %} that it has to to manipulate the data. Then it fires the change, and that’s actually because we're using a little wrapper. It’s basically a flux factory: it’s a little generator called McFly, which was written by Ken Wheeler.

That change is fired, and the recipe controller subscribes to that. Now the recipe controller fires its method. Then there's one more line here between the recipe controller and the public getter of the store itself. It’s going to call a public method on the store saying, "What’s your data now?" Then it’s going to re-render {% include skipper.html time="00:58:00" %} the entire tree of functions, passing all that data down wherever it needs to go as props to Recipes, which then re-renders, and now the data is on the screen.

We’ve got to go through a lot of steps just to get, like, a single character on the screen. However, we know that it’s consistent with our data, so that decreases complexity in the long run. But certainly, at first glance, it’s like "Whoa, that’s a lot of steps per user action."

I should clarify, what I’m talking about in that case is that controlled input {% include skipper.html time="00:58:35" %}. A controlled input is when you're setting the value of an input programmatically from your data, which you don’t have to do but you can do. The first example of Flux does not do that, subsequent examples of Flux do that, and then your homework for the whole event does that.

We’ve got 45 minutes just to talk this through. Let’s start with Flux, and let’s take a look. {% include skipper.html time="00:58:57" %} I’m going to open this in browser&mdash;this is 006-flux {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="006" %}&mdash;and I’m going to add a recipe. I add a recipe and there it goes.

Now that we’ve talked it through at a high level, I’m going to go through the actual code {% include skipper.html time="00:59:17" %} and reference actual methods. Let’s start with what we know. We have a Recipe component, and we have a method on it called addRecipe. When that’s called, we're going to fire an action called addRecipe, and here is the data that we're going to send. We're just going to send a randomly generated ID.

Render is itself going to return a map of existing ingredients and the button. On click, we're going to just add a new recipe. It's a trivial feature&mdash;we can’t edit, we can’t {% include skipper.html time="01:00:00" %} delete. We're just going to create a recipe and generate a GUID for it. {% include skipper.html time="01:00:07" %} This is, like, our most basic flux todo, just to show data going through the system.

So, going through: we click this.addRecipe, and this.addRecipe fires RecipeActions.addRecipe. Wait, what's that? All right. Up here at the top, {% include skipper.html time="01:00:24" %} let’s take a look at flux. We’ve instantiated flux, and we've then used Flux.createActions, the little factory here. Here is our first one, addRecipe, and it takes text and returns action type, addRecipe and text, text. That is what our store is going to see. In our store, when you do flux.createStore, under the hood McFly is automatically fusing these things together.

You can look at a number of different implementations of Flux&mdash;the core similarity is that they use something that Facebook released called the Dispatcher, which is a registry for callbacks. But that’s under the hood for us here. Ken told me he wrote this in a day. You guys will have your pick of flux implmentations: {% include skipper.html time="01:01:29" %} there are like eight now, this will {% include skipper.html time="01:01:32" %} just grow and grow, there's not much to it, so you might even consider building your own wrappers to make it behave the way you want.

We pass in a callback. This is our registry, so anytime any action is fired, {% include skipper.html time="01:02:00" %} this callback is also going to fire. The action type is going to be passed in, and so is our payload, which is our data. If the action type is addRecipe, then we're going to fire addRecipe: payload.text and we're going to emitChange and say, "Hey, we changed."

What is addRecipe? addRecipe is simply recipes.push(text), and this guy right here, that’s the store. It’s a private variable, which is an empty array. {% include skipper.html time="01:02:37" %} It could be a model, I suppose; it’s a collection, basically. I suppose if you had a config, {% include skipper.html time="01:02:46" %} maybe you would have an object and you’d just use different underscore or lodash methods to manipulate it, but I guess I've only seen them as arrays. {% include skipper.html time="01:02:59" %} It's just data.

Let’s talk through how we might approach the assignment and then I’ll go through this in a couple of different ways. We're going to add a new button that has a new callback that fires a new action. We're going to update the store with the new data, and then we're going to log out the value from the component's render method to make sure the data made the trip back to the component. Let’s go through that, which basically takes you through the entire flux flow. 

So, our button was down here; maybe this new one is a button that, on click, fires this.NewMethod. You're going to define a new Method here. That’s going to fire newMethod, right, {% include skipper.html time="01:04:00" %} and that’s going to fire "SOME NEW ACTION" and it’s going to send some text&mdash;it could just be a string, right. It could do like RecipeActions.someNewRecipeAction("kittens"), right. Launch the kittens around flux. Then we’ll need to create that action, so in addition to addRecipe, we’ll have to add a new action.

Again, this text here is just proxying through, right. Whatever that method on the component fired, you're proxying that straight through to the store. Just text becoming text. Add a new action, and then listen to that in the store, and then maybe you can implement, say, a delete. {% include skipper.html time="01:05:05" %} If you click on the button, it deletes everything. You could do something like, if payload.actionType === "NUKE_STORE," then you’ve got deleteRecipes, and deleteRecipes could be a method that just, like, sets the store back to an empty array. That would be an easy button to implement.

Then let’s take a look at our controller view. How does our controller view know that the store changed? Well, we include RecipeStore.mixin in the controller view, and that&mdash;through the dispatcher&mdash;sets the component up to listen for any store changes. Again, that’s under the hood. {% include skipper.html time="01:06:00" %} We're just focusing on data flow here, and we won’t go down to that next level of abstraction.

It would be good to talk about what a mixin is. Facebook seems to consider it an anti-pattern&mdash;the people I've talked to {% include skipper.html time="01:06:16" %} consider it an anti-pattern&mdash;because you can just define additional functionality. Basically a mixin just puts additional methods on the component. You could define a module that had a bunch of cross-cutting methods, and you could have a mixin that's applied to multiple components that need those cross-cutting methods. They're just applied to this object. We're passing in an object when we create the class, and, through a mixin, that object can have another key-value pair [method name / function].

This mixin sets up the listener, the controller view will listen to the store, and that's the ballgame. {% include skipper.html time="01:07:12" %} Once it knows the store changed, the whole thing re-renders with new data passed down and the diff sees what’s new, renders what’s new, and the data is on screen.

That was a lot. How many people feel like they could tackle this right now and they might be okay? Do it, awesome.

## Q&A

I’m going to give you a minute or two of silence here, and then I’ll take a few more questions. That’s great. Well done, everyone {% include skipper.html time="01:07:45" %}.

{% include skipper.html time="01:13:28" %} I’m going to take a few questions now that you've had a second to look at this and catch up, and I’ll go over some of these basic flux concepts over the next 20 minutes or so, and then I’ll leave you with flux enlightenment as your koan until we meet again.

**Speaker 13**: Why do you like McFly over other flux implementations?

[Edit 4/21: Flux implementations have continued to proliferate, but some important influencers are pointing to [Flummox](http://acdlite.github.io/flummox)]

**Colin**:  I didn’t initially; I really liked reflux and I talked to {% include skipper.html time="01:14:00" %} {% include skipper.html time="01:14:00" %} Bill Fisher, and he was like, that’s not a flux app. I was like okay, we'll do McFly. Basically, Bill Fisher blessed McFly {% include skipper.html time="01:14:08" %} and I was like, well, if we're going to have this on video, we'll use the one that he likes. Ken Wheeler, who built McFly&mdash;I was like, "Hey, could you port this [demo app] for me from reflux?," {% include skipper.html time="01:14:20" %}, and it took him like 40 minutes. I think we're going to see a lot more come out that sugar these ways of moving data around.

Hold on, let me show you something. Fluxxor is another one implementation. Let’s see, documentation... {% include skipper.html time="01:14:53" %} I found this one a little bit verbose, {% include skipper.html time="01:15:13" %} but it’s really personal preference. I think that McFly is nice, it’s minimal, there isn’t much to flux and there isn’t much to McFly either. It’s clean. I thought that reflex couples things more tightly, makes things a little more automatic, and I think for small apps it might be the faster to write, but then when I got into McFly, it was like "Eh, well really that wasn’t that much slower."

[Edit from Colin: though I did this port at the last minute without thinking it through, Bill Fisher was totally right. Here's why: In reflux, the store knows what data it needs to send to the components. That's all wrong, and it's not flux. It couples the stores too tightly to the components. It _did_ help me learn quickly by decreasing initial complexity, for what that's worth.]

It’s really early days, and I’ll say this too. Facebook just had its {% include skipper.html time="01:16:00" %} React Conference, and there were a whole bunch of presentations about what’s to come. One of the things that I just don’t know enough about yet, because they haven't released it yet, is Relay and GraphQL. But they did release the talk on it. I can’t speak to it because it’s not released yet, but there's more coming.

I don't know how portable Relay is going to be from Facebook's stack. {% include skipper.html time="01:16:38" %} I’m sure they're conscious of that and working on it. The concept behind Relay is that the components declaratively say, "This is the data I need," and then behind the scenes that data comes to them without passing, without relying so much on props. The logic there being that you’re actually leaking implementation details to the parent with props. The parent needs to know that the child needs that data. It doesn’t bother me so much, but if you have 10,000 components then I can see how it would.

Cool. Other questions? Let’s take a look at the other one. I have Kitten 1, Kitten 2, and I can delete them. Now we’ve bumped up to CRUD functionality. Actually there is no update&mdash;it’s just create, read, and delete&mdash;and then {% include skipper.html time="01:18:00" %} you can clear them all.

I’m actually going to give you guys a moment. Just take a look at this one. Take a look at flux form, and pay specific attention to deleteRecipe. See if it's like what you were thinking. {% include skipper.html time="01:18:19" %} By the way, just as an aside, how many of you got that data going around? Nice, maybe half, cool. Let's take a look at the different action types. Now the recipe store is listening to multiple action types. The component is firing multiple action types. Compare this with your implementation.

You’ve got another button firing another method, which fires another action with a different payload. The store listens to that, listens for a clearRecipes action, and then mutates its data. Again, just like before: window.data wasn’t private, and eventually _recipes would be modularized and not returned for anyone else manipulate.

But in the meantime, we have to pretend everyone else can't see it. The methods in the store, like addRecipes, clearRecipes, and deleteRecipe, manipulate the data in the store and then emitChange. That change goes through RecipeBook, where getInitialState {% include skipper.html time="01:20:00" %} calls getRecipes.

What does getRecipes do? getRecipes is our public getter on the store. RecipeStore.getRecipes just returns _recipes. It just returns that array and we can get the data. There's no problem with getting the data. The problem is mutating the data from the component. That’s what we don’t do.

Again, just to reiterate, that’s what you're going to want to do *all the time*. It's what I wanted to do all the time when I got this. It was like, {% include skipper.html time="01:20:36" %}, "I’ll just go over and hit a brick wall because I can't touch that." {% include skipper.html time="01:20:39" %} We can’t mutate the data unless we fire an action.

Let’s see. Once again, you have a couple of buttons here, so we can see how that compares to your implementation. You’ve got another button that fires another action with another payload. The store mutates itself, fires a change event, and the controller view (which is listening) re-renders and passes its props down. Now let’s break that. Now, if we look at 006.2, {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="006.2" %} we can no longer type. Take a look and see if you can figure out why.

**Speaker 14**: It's re-rendering? {% include skipper.html time="01:21:51" %}

**Colin**: Well... That’s not the answer. It's the right direction though. Yeah?

**Speaker 14**: You don't send the action on keyup [inaudible 01:22:06].

**Colin**:  Yes, that’s true; we're not doing that. That’s not the specific reason we don’t see anything and nothing changes, though. Yes? **The value is set to an empty string**. That's right. If we set the value to "kittens," we're going to get "kittens." Let’s go down here to the input and set that input value to "kittens." We save that, we refresh it, and we cannot get those kitten out of there no matter how hard we try, and they're so adorable.

That is homework. I’d say this was the moment when I really understood what was going on here. Wait a second, why can’t we type? We're setting value programmatically. Oh, we're setting value programmatically when there's a key event, we set an action and we're actually re-rendering. It’s going to send that "P" or that "F" or that "K" around into the store and update the data. It's helpful to think about creating things implicitly: if someone shows up on New Recipe, you create a recipe model, basically a blank one right when they show up. It’s helpful to think about that here. Yeah?

**Speaker 15**: [inaudible 01:23:37].

**Colin**:  Nope. Nope, it’s because we're setting value and… What do we need to be setting value to?

**Speaker 16**: State. {% include skipper.html time="01:23:51" %}

**Colin**:  Yep, you could set the value to state. That's right. [Edit: or, really, props.] Your homework between now and the next class {% include skipper.html time="01:24:00" %} is to try to solve this little problem here, try to fix the form functionality. Make the inputs a subcomponent. This is in 006.3, "flux enlightenment." Fix the form functionality, make the input a subcomponent, and pass it a method from the parent that fires an action with the form instance data. The form is going to have data, and we’re going to want to get the data out of the form.

Let me show you the DOM, that’s what this is. this.refs: we’ll talk about refs in like 30 seconds after I give you homework. this.refs.inv.getDOMNode.value is going to return a reference to the actual DOM node and its value, so this would be like your $("#someId"). If you're looking, when you see ref, think this use case&mdash;or text, right. When you want to do that, you should head toward refs. Let’s go back to step 3 {% include skipper.html time="01:25:25" %} here.

We want to re-render the input every time the store data updates with the new value from the props. We're going to have to pass the value through the store. Now everything in the UI is a reflection of the store. [UI is data and data is UI.](http://appamada.pbworks.com/f/Heart%20Sutra-Red%20Pine.pdf) That’s homework. That's the bridge between all these examples and the full repo. Next time, we're going to be in a full repo with a server and API calls and more flux and a webpack build and all the rest.

I’ll point you specifically to the place in the recipe app that we’ll be going over all of next week. We’ll do a review of all this, and then dive into that app. I’ll point toward {% include hublink.html link="https://github.com/FormidableLabs/recipes-flux/blob/master/client/components/ingredient-form.jsx#L27" text="the place in the app where the switch happens" %}, and where you see this happen. Angela is hard at work cleaning this up, so thank you, Angela.

For extra credit, there's a problem, and that problem is when you re-render a form input and you press backspace. Let’s say you're in the text area, and you're rendering that text area every time, and it’s great... but a user sees something in the middle and they go back and they say, “Okay, I want to edit this part of the paragraph.” They start hitting backspace, they hit backspace once. Where does the cursor go? It goes back to the end because it’s new again.

So for extra credit, {% include skipper.html time="01:27:27" %} fix that too. There's an issue on the React repo that tells you how. Somewhere had asked about why it's 100k {% include skipper.html time="01:27:37" %}&mdash;I’m guessing that’s why React is 100k. 100k isn’t a ton, but Riot {% include skipper.html time="01:27:41" %} is like, “We're 5k.” It may have everything in there, but I’ll bet you there are a bunch of edge cases like this that Riot {% include skipper.html time="01:27:48" %} doesn’t cover yet. I’m guessing, I don't actually know that, but this edge case is handled in React.

With that, we're going to start… If you want to on your own, you can look at the router. Actually, that’s enough for tonight, we're not going to go into the router, but we’ll look at 10 and 10.1 starting next time. At this point I’ll take questions and say, "Thank you."