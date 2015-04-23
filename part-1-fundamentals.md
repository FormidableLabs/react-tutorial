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

**Colin**:  Thanks everyone, that's true actually, I have been busting my butt. It's intimidating to present someone else's technology that they built at their place, right? I'm not a Facebook developer, some of you know me through a startup and some of you know me through as being a dev in the community. There were a couple of questions on the ... On the comments, on the meet-up group, and inevitably someone brought up other frameworks and Angular, and I think that I'll dovetail on what kicked us off tonight, by adding on to what Ryan had brought up.

## "The Problem with Angular"

[I did a look today, this is interest over time for Angular](https://www.google.com/trends/explore#q=backbonejs%2C%20reactjs%2C%20emberjs%2C%20angularjs&cmpt=q&tz=), and this is comparing it to Backbone, which is basically a non-event compared to that and as well as Ember. React is just taking off, and there is only, there is only the US, right? Whereas Angular is dominant abroad and popular in the US; React is, really it hasn't started to spread yet, it's really early days for React, but it's really exciting. I wanted to just read, there were a couple of people who had mentioned things in the comments, and I'll leave you with this. We’ll use it as a way to segue into a discussion about two-way data binding versus unidirectional data flow.

This is a quote {% include skipper.html time="00:01:47" %} by someone who is much smarter than me, you guys probably know quirksmode {% include skipper.html time="00:01:51" %} in the community. He wrote [this article](http://www.quirksmode.org/blog/archives/2015/01/the_problem_wit.html) a little while back, it said this, "In the last six months or so I talked to several prospective clients that had a problem finding front-end consultants {% include skipper.html time="00:02:00" %} in order to help their dev teams get a grip on their Angular projects. Although the front-enders are enthusiastic about Angular, I have a feeling that their numbers are surprisingly low for major framework. Expected Angular to gain more traction than it has.

"Angular is aimed at corporate IT departments rather than front-enders, many of whom are turned off by its peculiar coding style, emulation of an HTML templating system that belongs on the server instead of the browser, and serious and fundamental performance issues." It's that perf issue that we're going to talk about throughout the night, and I wanted to bring it down to just this quote, which ... Let's see.
This was not something that Google was touting very loudly at the outset, but now that they're having to switch to a completely different syntax, they're talking a little bit more about it, which is that, when Angular was first created almost five years ago, it was *not originally intended for developers*, which is a mind blowing statement, because obviously like it was touted as the new MVC framework. But it was full targeted more at designers who needed to quickly {% include skipper.html time="00:02:56" %} build persistent HTML forms.

Those who have picked up, those organizations that have picked up Angular have run into persistent perf issues, and that is one of the issues we're going to talk about tonight, front-end perf. How is front-end perf different between Angular or Ember and React? Why? How? At a granular level, why is this different? What's the advancement?

## The benefits of React

I've been working with React for a couple of months now. I'm still beginning myself, but I'm far enough through to help you guys through first principles. That's where we're going to start now. If you haven't cloned down the repo yet, we're going to be in a repo which is react-flux-concepts {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="React Flux Concepts" %}. Let's see if we can … I got to be online here. Let me just zoom in on that and make sure everyone has got that, because this is like our whole night here {% include skipper.html time="00:04:00" %}. We're going to be working through a series of progressively more complex examples.

What do we need in a framework? Why do we use frameworks? Big team projects, we need convention, we need patterns, maintainability, performance, client-side state, complex and growingly complex client-side state. Demands for increasingly complex client-side features, something that senior dev's love, something that senior devs can get behind, something the dev teams can get behind over the long-term, stability in the code base, and good backing.

React is, the fact that React has hit all of those, I think it's something that I've seen, I've seen a reaction to it in the community and its evidenced by what we're seeing here tonight. We've never had a turnout like this for Seattle, Seattle JS meet-up. We've had 430 people respond, and we've had 130 people on the wait list, 300 accepted. It's the largest event in our history as a meet-up and I think what's wonderful about tonight and I was reflecting on this in the way in, is that the community comes together to learn, and it's a really great thing. We're all still growing together.

All right, so without further ado, let's work through some examples.

## Hello World: the how and why of JSX

If you've used React at all, you know that you need a JSX transformer, and so next meet-up we'll be working with a build, we'll be looking at a webpack build. But for tonight we're going to do this JSX transformation in browser. Let's look at the hello world example, and let's talk through what's going on. {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="002" %} {% include skipper.html time="00:06:00" %} This is JSX, it looks like HTML, it's not HTML. It is a markup syntax that you can use effectively to sugar functions. What's going on in React is this. You start with a … Oh, by the way, each one of these images, if you'd like to pop in and have it locally is on the top here, so you can open that up if you'd like to. This class here, recipe book …

**Speaker 1**:  Can you bump up the font size please? It’s small.

**Colin**:  Sorry about that, that's my bad. Is that big enough? Better back there in the back? Good, great, okay, sorry about that. This class, recipe book, this is called a component, and there is some new vocabulary tonight, and component is the first word. A component is a, it's a React class and you're going to be able to define methods on it, and you're going to be able to return a tree of, basically a tree of functions that construct a DOM {% include skipper.html time="00:07:43" %}.

What React is going to do under the hood, is it's going to take the JSX and we're going to do the browser transform here, and it's going to turn it into JS, and if you look at this on the React site {% include skipper.html time="00:08:00" %} If you look at the Facebook React examples, they have a little in browser transformer where you can … Bigger?

**Speaker 2**: Font size.

Colin: Font size, here you go. Where you can see what JSX turns into, but it basically turns into, it turns into a function with arguments, so that div, when you write div is JSX, it's turning into a function underneath the hood. It parses the UI as a tree of functions and passes it to the virtual DOM, and effectively it takes how the DOM looks and the new state of the DOM, diffs them and only repaints what's needed.

This is the fundamental advancement here. We don't have to repaint strategically, we repaint all the time. What that means is that our user interface is a constant reflection of the state of our application of the data state, and that's, that re-rendering constantly allows us to use a one-way directional flow versus a two-way directional flow.

Let's talk about this in context of a backbone app. Let's say you have a view, and this view is listening to a model, changes on a model, and it's setting the model, and it's getting things from the model, so they're manipulating each other. The model, the model manipulates the view by omitting events, the view manipulates the model with getters and setters, and then you have another view over here. This view changes the model, the model could then update and then changes view over here, right?

This is like the fundamentals of two way data modeling, yes, right, we're all on the same page? This is normal, {% include skipper.html time="00:10:00" %} so what's not normal is to say, every single view in our entire application is going to be downstream of our data. We're never going to set data, we're only going to get. We're going to re-render the entire user interface every single time, everything changes. Someone presses F into a form input, we're re-rendering the entire application. We're not actually re-rendering, what we're actually doing is we're diffing the previous DOM against the new DOM and just changing the elements that need to be changed.

That's the innovation under the hood here. The fact that Facebook built that means that we get to work at a level of abstraction where we can basically assume that our DOM is re-rendering every time, even though it's being re-rendered intelligently under the hood. That is effectively, that's at a high level that's the fundamental difference here. It makes for more simple reasoning about our applications.

## Nesting components

Let's take a look at nesting, so we ... On each one of these now we're going to start to have some little assignments for you and you can try these out, give you a couple of minutes to do this. Let's take a look at RecipeBook. RecipeBook is acting as a kind of controller view now, in this is 003-nesting.html {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="003" %} Now RecipeBook is acting as a kind of controller view, and we're going to nest RecipeList and RecipeForm inside of it.

This is a hello world still but we're creating three components: RecipeForm, RecipeList and RecipeBook, and we're nesting RecipeList and RecipeForm inside of RecipeBook. This looks like {% include skipper.html time="00:12:00" %} magic, right? This is not familiar, this is a variable name. We have access to this because we declared it as a class. But this is not a variable name, so let's look at what JSX is doing here.

If you put a couple of curly braces here, JSX is going to look for a variable. It's going to evaluate things, you can do a ternary {% include skipper.html time="00:12:36" %} in here, you can do maps {% include skipper.html time="00:12:38" %} and whatever else you want. I will say that the first twenty minutes or so, there was outright revulsion and panic, and then after that it was like okay, and then after a few hours I really didn't even notice anymore, so if you're feeling revulsion and panic, welcome.That's okay, give it five minutes.

We have nested components inside of other components. What's important to note is that this, these two components we said that they're owned by RecipeBook. What that means is that RecipeBook is going to manage the state of RecipeList and RecipeForm, and we'll see that in just a moment. But for now, go ahead and try this on your own, create a new class, put some HTML in there and let me open this up in browser so you can see.

When we render this, we find that we have our top level component, we have our controller view, and then we have the HTML that was returned by the functions that were nested inside of that. I'm going to go back and forth between calling these functions and calling the components because really the insight here is that you're creating a user interface as a tree of functions, {% include skipper.html time="00:14:00" %} and if you can wrap your brain around that tonight, then you've really got the first principles of React.

We're creating a whole user interface as a tree of functions and we're going to be passing data down through that tree as arguments. For now go ahead and give this a shot, you have created another component and nest it inside the existing component and render something to the screen. You're going to return, you're going to have it return some HTML, you're going to have it return an a tag, have it return a p tag, really adventurous you can do like a form, have it return something. Give you a couple of minutes here.

Everyone got me? If you have internet, if you get online, if you finished this and this was super easy, go ahead and go to the Facebook React guide. {% include skipper.html time="00:16:00" %} It's React dot, I think it's the GitHub page at GitHub.io, maybe, and look at the JSX transform, look at what JSX becomes, and I'm going to show you up here in just a moment when we get that going.

{% include skipper.html time="00:16:36" %}. Here you go. Under the hood it’s doing React.createElement and applying these, what look like attributes, but they're custom attributes, they're custom tags and custom attributes, and applying them as objects in, as another argument {% include skipper.html time="00:17:50" %} to the function.

## Props

We're going to keep going. Next let's take a look at props {% include skipper.html time="00:18:00" %}. We know we're in a function, so now we're going to think about arguments. When we define a component class, we'll start at the top, we'll start with RecipeBook, and when we define RecipeBook, we nest RecipeList and RecipeForm, so we've defined a new class now, and this new class is called Recipe. Recipe returns HTML that is set dynamically with data.

This should look familiar to everyone who has used template and handlebars, yes, right? This is not a stunner that we're setting HTML dynamically, but what is a bit of a surprise is that when you look at where this is coming from. This is actually coming down in custom, what look like custom HTML attributes. Title equals stuffed chard in the component, which is the child component, we have this.props.title, so we have passed props down into two sub-components.

Let's go ahead and open that up in browser and you can see that we've rendered an H2 and a paragraph tag with the data that we passed in from the parent component. Now this is actually not that hard to reason about, because it's just functions, it's just functions. If we're thinking about this as a tree of function, and we're thinking about passing arguments down through the tree of functions as well, we have a function inside of a function, pass an argument down it through, pass an argument, {% include skipper.html time="00:20:00" %} keep passing down, keep passing it down.

It can go as far as we want to, and the render method here of the child simply evaluates, this.prop.title, inserts it and returns that to the corresponding JSX. For this one, go ahead and check out what this dot props looks like in console. We are console logging it when ... There you go so you can see object, right? We have this.props.

This dot props is an object that the child receives, and again if you just think about this as functions, you can see past the JSX, because it looks like HTML but it's functions. The attributes, what look like HTML attributes are actually basically they're key value pairs that are getting passed down to the child.

This syntax helps us reason about it a little bit easier, we can feel like we're writing HTML. Go ahead and do the next assignment if you can, if you feel comfortable you can add another property, so maybe I'll add, I'll do it up here, I'll say foo equals bar, and I'll save that, and I will refresh this and I will get foo bar in the child there. Go ahead and try that, and try to get something on, take it one more step for yourself and try to get something on screen. {% include skipper.html time="00:22:00" %}

You guys are being really, really good about the no questions thing. Anyone want to throw out a question? Yeah?

**Speaker 3**:  Is there a way to use the autocompletion on this template? 00:22:43]?

**Colin**: Like autocomplete, like an eclipse, like so you know what you …

**Speaker 3**: [inaudible 00:22:47], I can use shorthand.

**Colin**: Yeah, yeah, sublime has a JSX plugin.

**Speaker 3**: Okay cool.

**Colin**: Yeah, others?

**Speaker 4**: How can I do conditional logic based on value properties?

Colin:  Sure, so you can write right here you can do, if ... this.props.foo, foo, oops, bar. You can do ternary in there, you can do anything you want in there. You can do ifs, you can do functions, you can declare, you could declare a thirty line block of {% include skipper.html time="00:23:26" %} code and have it execute. It's just got to be inside one of those. It's not best practice, you should put it into a method. Does that answer your question?

**Speaker 4**:  How to like alter what tag, maybe it's an h3 or an h4{% include skipper.html time="00:23:36" %}?

**Colin**:  Based on this? That's a good question. I suppose I would just make it a method. Make this a method, right, like ... methodName and then up here, or {% include skipper.html time="00:24:00" %} this.three and then, sorry that's funny but really confusing. Start headingGenerator, there we go, that's properly abstract. Great question by the way, and then you can just do if this.props. whatever and then … Does that make sense? Yeah? Great. Yep?

**Speaker 5**:  One other thing one of those [inaudible 00:24:39].

**Colin**:  Good question. So here?

**Speaker 5**:  Yeah. Like if it was foo equals five.

**Colin**:  Like this for instance?

**Speaker 5**:  Like that.

**Colin**:  Just how it's [JS 00:25:01]?

**Speaker 5**:  [inaudible 00:25:02]

**Colin**:  You can do the same for a raise. As a matter of fact, you can use [ES express 00:25:08] and you can say, you can pass all of the props down to the child, which is super handy. That is using the router extensively.

**Speaker 5**:  [inaudible 00:25:20]

**Colin**:  If, all the way back.

**Speaker 6**:  Are those writable?

**Colin**:  Are they changing?

**Speaker 6**:  Any [inaudible 00:25:28] to change the entire tree, the entire model?

**Colin**:  I'm sorry I can't hear you.

**Speaker 6**:  Is it any component to change the entire model? Are those, with a reference to those, that model, can you write to that model?

## The briefest introduction to Flux

**Colin**:  Stay tuned, stay tuned, great question. So the question was can any component change any, and the model, right? No components change the model. Unidirectional data flow. The high level answer to that is that here is how Flux works, any component can say hey something happened, {% include skipper.html time="00:26:00" %} right? I'll give you guys a very brief overview and then we'll move to the next one and we'll get there.

Any component could say, hey something happened, that fire is what's called, and yeah, this is a little bit of a proprietary terminology here, but there's not that much, fire is an action, it’s basically a callback. You fire the action, it has an action type, which is like a name, so say like add recipe, edit as a payload of whatever data changed, send that over.

The store, which is basically the model, it gets that and says, okay, well, it's this data and it's this. It subscribes to changes. It gets the data, it gets the type and then it does whatever it needs to internally to manipulate its own data because if you think about it it's like a closure scope, it's a scope, right? It's {% include skipper.html time="00:26:46" %} going to return public getters, but not setters because it's one way, not two-way and then it emits change. And when it emits change, the components that are listing for that changes say, oh okay I’ve got new data and then you render everything, and that's the one way flow.

You re-render everything, every time, every time you fire an action, store changes, everything listens to it re-render the whole thing, so one-way not two-way. That's flux in a nutshell, have a goodnight, see you tomorrow.

## Collection rendering

We're going to go the next one, which is collection rendering. Obviously it's not great, it's not great to declare our data in our mark-up, that's not realistic. We're not going to store or state our DOM, we're not going back to jQuery here. What's that? We're not barbaric. That's right, we're civilized JavaScript developers, that's ...

Let's go down to the bottom, we’ve got window.recipeData, and we're going to look at this as if it is, again, a tree of functions rather than the markup you're seeing, and we're going to pass in window.recipeData, which is just defined right above. Of course, all of the components have access to this. {% include skipper.html time="00:28:00" %} We're going to pretend it's modularized and when we have a full repo that we're dealing with next week, this will be fully modularized, and we won't have to pretend that every, all the components can't see window.recipeData.

So window.recipeData now has the data that we previously had written declaratively on the component themselves, on those pseudo attributes. When we call React.render, which is our root, our kind of, RecipeBook is our controller view slash entry point to this tree of functions and tree of DOM nodes {% include skipper.html time="00:28:33" %} that's being generated. We say that we're going to pass in data as window.recipeData, so let's follow it through.

Let's go back to our image here, nesting, so props, sorry, I had an image I didn't even use it. We have our data and our data is now broken out and RecipeBook is going to receive that data, and it's going to pass it down. Now, RecipeForm does not, this match directly to the names that are in that file by the way, so you can go back and forth.

RecipeForm doesn't need this data, RecipeList does need the data, so we're going to pass the props down from our controller view, which is RecipeBook down into RecipeList and then we're going to do a map on that data. Then we're going to create, for each item in our Recipe's array we're going to create a new component passing in the props, so passing in the data as the value.

We're also going to pass it index as key, and I'm going to tell you about that in a moment, let's stay tuned. Key is a magic word in React, and it's important for diffing. Recipe, then we have two recipes, each one has received its own data, its own props, {% include skipper.html time="00:30:00" %} so let's take a look at what that looks like in code.

We have RecipeBook and we have, RecipeBook is our controller view. We do not pass the data to RecipeForm it doesn't need it. Would you pass it to RecipeList, so let's go up to RecipeList, RecipeList iterates over the data that's received. RecipeNodes equals, it creates the nodes, this.props.data.map, and it returns a component, which itself will return, itself will return HTML, again just think about like we've got a tree of functions and each thing is going to return computed tree of elements.

We can then say that the title is recipe.title and instructions is recipe.intructions, so we've now abstracted that, and we're mapping over the data, and then we simply insert it like that. We grab the nodes, we've set a variable, recipeNodes, we simply put it in curly braces, so that we tell it to look for JS. This will actually write out recipeNodes, right? It's not JS, if it's in curly braces it is JS.

Let's take a look at what this looks like in the browser. We have exactly the same thing, unexciting, but it didn't break, so that's good. Stuffed chard, eggplant and polenta, this is, we now have data which is coming from a, we'll call it a, it's like a global truth, here we've got a data store. Sorry, we'll use the React lingo.

There is, there is no assignment on this one. Basically this shouldn't be too much of a conceptual jump, this shouldn't be too much of a conceptual jump {% include skipper.html time="00:32:00" %} from the previous one. We are simply rather than passing it down from RecipeBook down to RecipeList, we are abstracting it in the data and passing it down through arbitrarily many functions.

How many people here have been in a large backbone projects? I have been in large backbone projects, I can say that, this sounds familiar. I think we're going to need a new view. It's like okay because what we just did is we just increased the graph, right? We have a new view we can listen, we can, arbitrarily many models could be, arbitrarily many other things could be affected by this. Views are not free if you're going two way because you were dealing with a graph, but here we're dealing with a tree, which is nice because user free.

Having talked to some of the guys in Facebook, they are telling me that they're pushing like ten thousand components, they're pushing ten thousand views because everything can just be modularized, so you just keep passing data down and it keeps being okay because it’s just passing args through a function, through functions, they're not mutated. That's good news for long-term maintainability.

It would seem crazy to fire that many functions every time. However, if you look through some of the React talks, the engineers at Facebook are talking about RAM versus computation on phones. For mobile, if we're going to do rendering, if we're going to be rendering all of these DOM {% include skipper.html time="00:33:34" %} nodes over and over again, well, okay yeah, we got to fire the functions but we have like quad core phones now. What we don't have on the phones is a ton of RAM.

If we're going to have mobile applications that have a ton of listeners, and that listener array is just going to grow and grow and grow, then we're taking up more and more RAM and we have to hold that state and that's RAM intensive. That's the argument that I've heard, some of the engineers, make in a couple of videos that I watched which was useful for me to help to reason about it. {% include skipper.html time="00:34:00" %}

We're going to move on from this to state but before I do I'll take maybe three questions anyone want to, yeah, Ryan?

**Ryan**: What do you put, what goes in render? What can and can't I do inside the render function?

**Colin**: Inside this?

**Ryan**: Inside your component?

**Colin**: Oh yeah, okay, that's kind of abstract.

**Ryan**: What if I could, maybe I'm just suppose to return nodes, am I supposed to transform data {% include skipper.html time="00:34:35" %}?

**Colin**:  You've got to return, actually there is a really, really, critical point here, is that you have to return a root node. You cannot have, the root that you return cannot have a sibling. This will fail. We would need to wrap that. What else? We would need to wrap this in a parent div. Oh my god. Please write me a better sublime, JSX, whatever it you wanted the sublime JSX transformer, I want a better one.

**Speaker 5**: This is killing my velocity, that's why.

**Colin**: Totally, so we've got to wrap that, we've got to wrap this if we're going to do siblings, we have to wrap that in a parent. You got out, you got a return on node, yeah. Renders got to return a root node. If you return a single other component then that single other component has to return a node, a root node, that makes sense. I'll answer two more questions before we move on. Yeah?

**Speaker 6**:  Giving that key is an attribute …

**Colin**:  Thank you.

**Speaker 6**:  What is that?

**Colin**:  Thank you, thank you, yes. I forgot I said that I was going to come back to that and forgot.

**Speaker 6**:  Oh no, I know it's a protective reacts attribute.

**Colin**:  It is, yes. {% include skipper.html time="00:36:00" %}

**Speaker 6**:  If that changes, is it going to re-render that portion of the DOM {% include skipper.html time="00:36:03" %}?

**Colin**:  Let's go to, this is a really great post. If you've not read it, it's called Reconciliation and it is. There it is. Let’s read this free flow together, it’s a super important concept. React's key design decision is to make the API seem like it re-renders the whole app on every update. This makes writing applications a lot easier but is also an incredible challenge to make it tractable. Article explains how with heuristics we managed to turn a O(n3) to a O(n).

As you can probably guess where this is going, we make some assumptions, right, and it is possible to provide a unique key for elements that is stable across different renders. That’s one of the assumptions that they took O(n) instead of n3. The key can be index, it could be a {% include skipper.html time="00:37:02" %} it could like be, underscore idea like a mongo ID. It could be something that you hash in the function itself and just create, it will be consistent, it doesn’t matter. All that matters is that it’s consistent across renders but other than that, it doesn’t matter.

Another important thing to note is that if you are using, you are not getting all the performance benefits unless you use the React’s pure render mixing, which basically says, yes, I’m following these two rules. By default, React assume that you are not following its two rules, which makes it not fast, so you have to do that yourself. I’ve seen illusions that they’d like flip that over and say like and warn you if you are not doing those two things. So that if super performing out of the box, but if you look at the pure, pure render mixing. {% include skipper.html time="00:38:00" %} If your React components render function with pure, in other words, it renders the same result, given the same processing state, you can use this mixing for a performance boost.

This is, I won’t read this to you but reconciliation will explain keys.

## State

Let’s move on to the concept of state {% include skipper.html time="00:38:25" %}. Let’s talk about the difference between application state and component state. If you are taking notes, this is definitely one of them. Application state we could think of as like the store. We’ve got a data store, which our basically model, which our application is going to reference all the time.

But that doesn’t help us if we, for instance, have a counter of going, or like a timer of going. If we re-render everything, we’d just re-render that a new, new to the value and its back to zero. Or if we have a dropdown, and that dropdown is open and it should stay open in between renders and we just nuked it and now it’s closed again. I typed F and like it dropped down for closing, no good.

We’ve got to have components state as well as application state. The ideal is that there is no component state, is that you are not using this at all, but of course you are all the time because you are using, you are doing things in your application like timers and dropdowns and sorts {% include skipper.html time="00:39:34" %}. When you type, you subset a list, you want the list to say, subset it, even though you are going between renders, you don’t want it to, you don’t want the list to reflect the app truth, you want it to reflect the component truth, which may be an input someone is typing in.

So we need state. {% include skipper.html time="00:39:50" %} Let’s just take a look at this. This is not coming from props, this is a hello world of in state, this is not coming from props, {% include skipper.html time="00:40:00" %} this is coming from right here, getInitialState. We could do something like, for instance, let’s say that we have dropdownIsOpen and we say false, right. We can return initial component state here, and this gives us a kind of local state {% include skipper.html time="00:40:27" %} that is persistent between renders.

I’ll say that one more time. When a component, and this is getting, there is a component lifecycle like when it gets put into the DOM and when it’s taken down, when the component {% include skipper.html time="00:40:40" %} mounts when it goes in, right, the DOM getInitialState is [e00:40:44] called and then when it comes out its torn down. getInitialState is called once and then every time after that if we want to change state, we need to call this dot setState with a new information. If someone clicks a button and it goes dropdown, we are then calling this dot setState, dropdown is open, true, and then between renders that will just stay through until we say otherwise.

Let’s go to the next one, and we’ll see this one is, we’ll linger on this one a little bit longer. This is exactly what I was describing. Let’s open it in browser, and let’s say, Click me, so check it out. I’ve got a makings of a beautiful dropdown. Let’s take a look at {% include skipper.html time="00:42:00" %} this component. For simplicity, there is only one component here, and the component is recipe. When it gets put into the, when it mounts, getInitialState is called and the state is set to dropdown is open and it’s false. Whenever a click, whenever this callback is fired, we reverse it, this starts setState and we reverse whatever the state is. We toggle it.

Let’s take a look at what this is doing. There is no need for JQuery because React has it in that system. Let’s take a brief look at the page that you’ll need to go to later to, let’s see, here it is. You are going to head here. It is in Facebook.github.io, it’s in that system, you can see the path here. If you want to know where that on-click is coming from and how that works, this is the article to read. We can put an on-click on to our component, but remember that’s one of these magical pseudo attributes, right.

We are passing it down as a prop, we are passing it as an argument. In fact we are passing in a callback into a function as an arg {% include skipper.html time="00:43:37" %} not so mysterious. Looks weird in JSX, but not so mysterious when we map it. When the click is fired, it does this.handleClick, and handleClick toggles the state. {% include skipper.html time="00:44:00" %} Then, let’s see, this function here, this.state.dropDownIsOpen, right, if it’s true or this.render. If it is not there render it, if it is there don’t.

Go ahead and there are some instructions here. Add a hover event and when hover is true, so like on hover in, and hover out, right. Add a hover event. When hover, set that state when hover is true and then set state when hover is false. Change something in the DOM, change background color or something like that. Yes?

Speaker 6:  If you have external library and it relied on jQuery {% include skipper.html time="00:44:46" %} can you use it with React {% include skipper.html time="00:44:48" %}?

Colin:  Could you be more specific?

Speaker 6:  I can’t think of a specific example, but you actually, it has its own event system in it, so you don’t need jQuery {% include skipper.html time="00:45:00" %} but let’s say you have third-party library {% include skipper.html time="00:45:02" %} that’s dependent upon jQuery {% include skipper.html time="00:45:05" %} could you still use it use it?

Colin:  We are probably about to rewrite everything in components. It will be fast. You could also, a simpler version of this. If you want something that only takes a minute, console log, change this.state on hover and console log this.state, {% include skipper.html time="00:46:00" %} and just see what comes up in the console. See, if you are changing state and toggling it back and forth.

Speaker 7: How is event bubbling happening? {% include skipper.html time="00:46:14" %}.

Colin: Man, that’s a great question. Can someone from Facebook handle that? Is there anyone in the room from Facebook who can handle how bubbling is done in React, because I do not know. I’m just going to put that out there. I can absolutely come back to you with that in the next meet-up but I don’t know. I’m going to take a note. I have a feel like that’s a research project for me, and I’m excited to do it, like how it would contrast just in general, so what we’ve used to do in other systems, but I've kind of just done it and it’s just worked up until this point.

Speaker 8:  Does the event return through if handled? Is there a true false thing that handles bubbling?

Colin:  I don't know. It’s a good question. It’s a good question, I do not know how bubbling, how the event system in handled on the hood. It is …

Ryan Eastridge:  Chat room says no bubbles.

Colin:  What’s that?

Ryan Eastridge:  Chat room says no bubbles.

Colin:  No bubbles. {% include skipper.html time="00:47:34" %}. No bubbles. Chat room says no bubbles, no bubbles. A cross browser wrapper around the browser’s native {% include skipper.html time="00:47:43" %} event. The event handlers below are triggered by an event in the bubbling phase. To register an event handler {% include skipper.html time="00:48:00" %} for the capture phase, append Capture to the event name. All right, I think it’s a research project to compare and contrast with jQuery {% include skipper.html time="00:48:07" %} sorry.

Speaker 8:  Well there's a boolean in there {% include skipper.html time="00:48:12" %} for bubble's in there, the attribute [inaudible 00:48:14] whether or not it happens in the bubble page.

Colin:  Yeah. Is that what you're pointing towards {% include skipper.html time="00:48:26" %}.

Speaker 8: [inaudible 00:48:30].

Colin: Oh, aha, yeah, there you go.

Speaker 8: But it sounds like if you wanted to do Capture phase you have to do a little more work.

Colin: Cool. Give me maybe a minute and half, two minutes more on this one. See if you can console log out state. See if you can change state given an event. Thanks. {% include skipper.html time="00:50:00" %} Thank you {% include skipper.html time="00:50:11" %} for first PR. Please feel free to PR corrections, improvements, other ideas, other steps, intermediate steps, all welcome. This is a public repo, so if you think you’ve got a great idea for an intermediate step, PR.

Speaker 9:  Like no hard {% include skipper.html time="00:50:32" %} tabs.

Colin:  What’s that?

Speaker 9:  Like no mixed {% include skipper.html time="00:50:34" %} tabs.

Colin:  No mixed tabs, thank you. I may have finished it at 4am {% include skipper.html time="00:50:41" %}. Before we go on to flux and application state, let’s take a breather for a couple of minutes here. Look up, any high level {% include skipper.html time="00:51:10" %} questions before we move on. Yeah?

Speaker 10: {% include skipper.html time="00:51:20" %}. The key users {% include skipper.html time="00:51:29" %}

Colin:  Yeah, not the best key.

Speaker 10: Exactly.

Colin:  If you are guaranteed that you are only going to be pushing, if you are only pushing on to your array in your store, you could assume, I’d use a Guid {% include skipper.html time="00:51:49" %}. Yep?
Speaker 11: If you have a list of items or every item is selectable.

Colin:  Is what?

Speaker 11: Selectable. There is a checkbox and you can [inaudible 00:52:00]. {% include skipper.html time="00:52:00" %} Where would you [inaudible 00:52:03] on the list, or on the item?

Colin:  Great question. You passed, so if you need …

Speaker 12: Can you repeat the question?

Colin:  I’ll say it again. If you have a list, UI with a bunch of li in it, and every single one of those is selectable, where do you keep the state? It’s going to be in the li. At first, like I said, I don't know another way to do it, because each li is going to have to handle its own state. That’s like a lowest level of concern. Cool. By the way, if I’m egregiously wrong about anything, I absolutely will find out because I’m in front of 300 {% include skipper.html time="00:52:55" %} people. And guess what, I’ll let you know.

## Flux

Let’s move on to Flux. At a high level, this is going to be a bit of a ride for those of you who have only done maybe OO. You’ve never done functional. The concept of  immutable data is frustrating because pretty much every time you are going to want it, like touch the data and do the thing. You are just like it's right there {% include skipper.html time="00:53:29" %} that data is right there, it’s an object, I just want, push it, move it and manipulate it, and you can’t. The reason you can’t is because the data is immutable.

One of the things that this gets us is, is that we are guaranteed there are UI is current because the data is always just. If we have that, we know nothing has changed, and if we have the guarantee that nothing has changed it, we just re-render the UI based on that data. Nothing is hiding anywhere else. I’m going to talk about it {% include skipper.html time="00:54:00" %} at a high level verbally, I’m going to walk through an image and then we are going to walk through a file.

At a high level, there are some new vocabulary words, which are this component, and then action. An action is fired by a component. Flux could have been probably better named a bunch of callbacks with some organization and subscription pattern. That would be my longer name for it {% include skipper.html time="00:54:28" %}. It’s not actually that much. We fire a method on our component, and it fires action, and that action has a type, and that type is a string like ADD_RECIPE, for instance.

Then we have a string and we have a payload, and that payload is just JSON {% include skipper.html time="00:54:53" %} arbitrarily large amount of JSON {% include skipper.html time="00:54:58" %}. That is going to be passed to all of the stores that are listening, and the stores, actually the stores are listening to all actions. Any time an action fires all the stores get it and they run a bunch of ifs, it’s just like, do I have it? Do I need to know about this? If they know about it, then they run some logic internally, manipulate their state and say, hey I changed. At which point, a change is emitted.

The controller view is listening for application state and says, a change was detected. It uses a getter, the public getter on the store to say, okay, what is it now? It goes and gets the data, and it then passes that through props down to all of its children. We just pass all that data down through the tree. Again, if a store is changing, every time every letter someone is typing, that doesn’t mean we are doing an AJAX call, it does means the tree of function is firing.

Every letter someone types and the store is changing, every letter someone is types, {% include skipper.html time="00:56:00" %} we are then re-rendering, in fact that we are re-rendering our view. We are passing that data down through props. Anybody who needs to be concerned with it every time there is an event.

At first glance this seems inefficient but it’s the diffing engine that saves us. Let’s take a look at a diagram. We have, let me go down to the bottom here. Let’s say we are handling that, that typing event. We have an on key up event in recipes, and on key up, we are going to fire an event that’s like Recipe input modified. It fires an action that has the new data, whatever the text was, whatever the content and that form input was. It says, hey, here is an action of this type and then action of this type is fired, and who is listening?

All the stores are listening, the stores are listening, RecipeStore is listening. The store gets that data and gets that action type. It does whatever, fires whatever {% include skipper.html time="00:57:08" %} methods internally that it is to, to manipulate the data. Then it fires in the change, and that’s actually because we are using a little wrapper on. It’s basically a flux factory, it’s like a little generator called McFly, which was written by Ken Wheeler.

In that change is fired, and the recipe controller subscribes to that. Now the recipe controller fires its method. It’s like, hey, then there is one more line here between recipe controller and the public getter of the store itself. In this case Recipe’s controller, which is like our RecipeBook, our top level component. It’s going to call a public method on the store saying, what’s your data now? Then it’s going to re-render {% include skipper.html time="00:58:00" %} the entire tree of functions, passing all that data down wherever it needs to go as props to recipes, which then re-renders, and now the data is on the screen.

That is, so we’ve got to go through a lot of steps just to get like a single character on the screen. However, we know that’s consistent with our data, so that decreases complexity in the long run, but certainly at first glance, it’s like whoa, that’s a lot of steps, that’s a lot of steps per user action.

What actually, and I should clarify, what I’m talking about in that case is that controlled input {% include skipper.html time="00:58:35" %}. We are going to look at that, control input is when you are setting the value of an input programmatically from your data, which you don’t have to do but you can. The first example of Flux does not do that, subsequent examples of Flux do that, and then your homework for the whole event does that.

We’ve got 45 minutes just to talk this through. Let’s start with Flux, and let’s take a look {% include skipper.html time="00:58:57" %}. I’m going to open this in browser, this is 006-flux {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="006" %}, and I’m going to add a recipe. I add a recipe and there it goes.

Now that we’ve talked it through at a high level, we’ve looked at image, I’m going to talk through all of this stuff and reference actual methods. Here we go, we are going to going through the actual code {% include skipper.html time="00:59:17" %}. Let’s start with what we know. We have a Recipe to component, and we have a method on that Recipe’s component called addRecipe. When that’s called, we are going to fire an action called addRecipe, and here is the data that we are going to send. We are just going to send an ID, a randomly generated ID.

Render is itself going to return a map of existing ingredients, I’m sorry, a map of existing recipes and the button. On click we are going to just add a new recipe, right. It is a trivial feature, we can’t edit, we can’t {% include skipper.html time="01:00:00" %} delete, we are just going to create a recipe and what a recipe is a random number, which is basically just like a, we are just going to generate a GUID for it {% include skipper.html time="01:00:07" %}. This is like our, just our most basic todo of flux just to show data going through the system.

Let’s going through, we on-click this.addRecipe, so this.addRecipe fires, RecipeActions.addRecipe. Wait, what is that? All right. Up here in the top {% include skipper.html time="01:00:24" %} let’s take a look at flux. We’ve instantiated flux, we have then used flux to, Flux.createActions, the little factory here, right, the action creator. Here is our first one, is addRecipe, and takes text and it returns action type, addRecipe and text, text. That is what our store is going to see. In our store, the store, when you do flux dot create store, underneath the hood McFly is automatically fusing these things together.

You can look at a number of different implementations of Flux, the core similarity is that they use something that Facebook released called the Dispatcher, which is a registry for callbacks. But that’s under the hood for us here. I think, Ken told me he wrote this in a day, and I imagine that for most serious teams that are, you guys can, you guys will have your pick of flux implmentations {% include skipper.html time="01:01:29" %} there are like eight now, this will {% include skipper.html time="01:01:32" %} just grow and grow, there is not much to it, so you might even consider building your own wrappers to make it behave the way you want.

We pass in a, let’s see, a callback, and this is our registry, right. This is our registry, so anytime any action is fired, {% include skipper.html time="01:02:00" %} this callback is also going to fire. The payload is going to be passed in, which is our action type and is our data. If the action type is addRecipe, then we are going to fire addRecipe payload.text and we are going to emitChange and say hey we changed.

What is addRecipe? addRecipe is simply recipes.push(text), and this guy right here that’s the store right there. It’s a private variable, which is an empty array {% include skipper.html time="01:02:37" %}. That's the store. It could be a model I suppose, it’s a collection basically. If you had a {% include skipper.html time="01:02:46" %} suppose that if you had a config maybe you would be an object and you’d just have different underscore or lodash methods that are going to manipulate it, but I guess I've only seen them as arrays {% include skipper.html time="01:02:59" %}. It's just data.

Let’s talk through how we might approach the assignment and then I’ll go through this in a couple of different ways. We are going to add a new button that has a new callback that fires a new action. We are going to update the store with the new data and then we are going to log out the value from the component's render method to make sure that the data made the trip back to the component. Let’s go through that and it’s basically takes you through the entire flux flow. We are going to add a new button.

Our button was down here on-click, maybe this one is a button on on-click equals this.NewMethod, right, so you are going to define a new Method here, New Method. That’s going to fire New Method, right. {% include skipper.html time="01:04:00" %} That’s going to fire Some New Action and it’s going to send some text so it could just be a string, right. It could do like RecipeActions dot some new recipe action, kittens, right. Launch the kittens around flux. Then we’ll need to create that action, so in addition to addRecipe, we’ll have to add a new action.

Again, this text here is just, it’s just proxying through, right. You are just proxying through whatever, whatever that method in the component fired, you are proxying that straight through to the store. Just text becomes text. Add a new action, and then in the store, listen to that, and then maybe it’s a, you can implement a delete {% include skipper.html time="01:05:05" %} If you click it on the button, it deletes everything. You could do something like, if payload.actionType = NUKE_STORE, then you’ve got deleteRecipes, and deleteRecipes could be a method that just like set the store back to an empty array, then you could just, you get, that would be an easy button to implement.

Then let’s take a look at our controller view. How does our controller view that the store changed? Well, we include RecipeStore.mixin in the controller view and that sets up through the dispatcher the component to listen for any store changes. Again, that’s under {% include skipper.html time="01:06:00" %} the hood. We are just focusing on data flow here and we won’t go down to that next level of abstraction.

It would be good to talk about what the mixin is and what … Basically Facebook seems to consider it an anti-pattern, the people I've talked to {% include skipper.html time="01:06:16" %} consider an anti-pattern because you could just define additional functionality. Basically it’s just going to put additional methods on the component. You are going to get, you could define a module that had a bunch of cross-cutting methods, and those cross-cutting methods could, you could just have a mixing that is applied to multiple components that need those cross-cutting methods. They are just applied to this object. This object, we are passing in an object when we create class, and that object has, is able to pass that another key value pair of that functions.

This mixing sets up the listener, the controller view will listen to the store, and that is... that's the ballgame. {% include skipper.html time="01:07:12" %} Once it knows that it changed, and once it knows the store change, once it get that event, the whole thing re-renders and with new data is passed down and the diff sees what’s new, renders what’s new and the data is on screen.

That was a lot. If you feel like … How many people feel like they could tackle this right now and might be okay? Do it, awesome.

## Q&A

I’ll take, I’m going to give you a minute or two of silence here and then I’ll take a few more questions. That’s great. Well done everyone {% include skipper.html time="01:07:45" %}.

{% include skipper.html time="01:13:28" %} I’m going to take a few questions now that you've had a second to look at this and catch-up and I’ll go over some of these basic flux concepts over the next 20 minutes or so, and then I’ll leave you with flux enlightenment as your koan until we meet again?

Speaker: Why do you like McFly over other flux implementations?

[Edit 4/21: Flux implementations have continued to proliferate, but some important influencers are pointing to [Flummox](http://acdlite.github.io/flummox)]

Colin:  I didn’t initially, I really liked reflux and I talked to, I asked {% include skipper.html time="01:14:00" %} {% include skipper.html time="01:14:00" %} Bill Fisher, and he was like, that’s not a flux app. I was like okay, using McFly. Basically Bill Fisher blessed McFly {% include skipper.html time="01:14:08" %} and I was like, well, if we are going to have this on video, we are going to do it do it at the meetups {% include skipper.html time="01:14:13" %}... We used the one that he likes. It only took Ken build McFly and I was like, hey, could you port {% include skipper.html time="01:14:20" %} this for me from reflux. It took them like 40 minutes to port it from, from reflux to McFly. I think that we are going to see a lot more come out that sugar these various and these various ways of moving data around.

Hold on, let me show you something. I’ll show you something that, let’s see. Fluxxor is another one which is out there, let’s see. Documentation... {% include skipper.html time="01:14:53" %}, I’m not, let’s see. QuickStart... I found this one a little bit verbose {% include skipper.html time="01:15:13" %} but it’s really personal preference. I think that McFly is nice, it’s minimal, there isn’t much to flux and there isn’t much to McFly either. It’s clean, it’s clean. Reflux was … I thought that reflux was, reflux couples things had been more tightly, makes things a little more automatic, and I think for small apps, like for small apps it might be the faster to write, but then when I got into McFly, it was like eh, we really wasn’t that much slower.

[Edit from Colin: though I did this port at the last minute without thinking it through, Bill Fisher was totally right. Here's why: In reflux, the store knows what data it needs to send to the components. That's all wrong, and it's not flux. It couples the stores too tightly to the components. It _did_ help me learn quickly by decreasing initial complexity, for what that's worth.]

It’s really early days, and I’ll say this too. Facebook just had {% include skipper.html time="01:16:00" %} React Conference and there were a whole bunch of presentations there about what’s to come. One of the things that I just don’t know enough about it, becuase they haven't released it yet, is relay and graphql. But they released, you can watch the talk on relay and graphql from React conference. You are interested in some of the, in what they are planning on releasing, and I can’t speak to it because it’s not released yet. But there is more coming there.

I don't know how portable Relay is going to be from what what Facebook's stack {% include skipper.html time="01:16:38" %} was to the web. I’m sure they are conscious of that and working on that, but the concept behind Relay is that the components declaratively say, this is the data that I need, and then it just, and then behind the scenes that data comes to them without passing or without relying so much on props. The logic being there that you’re actually leaking implementation details to the parent with prop, leaks and implementation detail to the parent. The parent needs to know the child needs that data. It doesn’t bother me so much but although if you have 10,000 components that it would.

Cool. Other questions? Let’s take a look at the other one. I have Kitten 1, Kitten 2, and I can delete them. Now we’ve bumped up to CRUD functionality. Actually there is no update, I’m sorry, there is no update, it’s create, read and delete, and then {% include skipper.html time="01:18:00" %} you can clear all of them.

I’m actually going to give you guys a moment. Just take a look at this one. Take a look at flux form, take a look at the, pay specific attention to deleteRecipe. See if it's like what you were thinking. {% include skipper.html time="01:18:19" %}. By the way just as an aside, how many of you got that data going around? Nice, good. Maybe half, cool. Take a look at the different action types. Now rather than, now the recipe store is listening to multiple action types. Component is firing, multiple action types. Compare this with your implementation. See how it compares.

You’ve got another button firing another method, which fires another action with a different payload. The store listens to that, listens for a clear Recipe’s action, and then mutates its data. This private, which is again just like before window dot data wasn’t private, eventually underscore recipes would be modularized, and certainly not returned for anyone else manipulate.

But we have to pretend that everyone else can't see it right now. The methods in the store like addRecipes and clearRecipes and deleteRecipe, manipulate the data in the store, and then emitChange. That change goes through RecipeBook because the Recipes are basically it is there. You can see, getInitialState. {% include skipper.html time="01:20:00" %} getInitialState calls getRecipes.

What does getRecipes do? That is our getRecipes is our public getter on the store. RecipeStore.getRecipes just returns underscore Recipes. It just returns that that array, returns the collection, and we can get the data. There is no problem with getting the data. The problem is mutating the data from the component. That’s what we don’t do.

Again, just to reiterate this, that’s what you were going to want to do all of the time. What I wanted to do all of the time when I got this because it was like I have jQuery {% include skipper.html time="01:20:36" %}, so I’ll just go over and hit a brick wall {% include skipper.html time="01:20:39" %} because I can't touch that, let’s figure out a way around that. We can’t mutate the data unless we fire an action.

Let’s see. Once again, you have couples of buttons here, so that compares your implementation. You’ve got another button by another method which fires another action, another payload, goes around in the store, which is listening. Store mutates itself, fires an event changed, comes back to the component that, the component the controller view is listening, re-renders and passes its prop down. Now let’s break that. Now if we go to 006.2 {% include hublink.html link="https://github.com/FormidableLabs/react-flux-concepts" text="006.2" %} and we look at that one, we can no longer type. Take a look and see if you can figure out and raise your hand why we can’t type.

Speaker 13: It's rerendering {% include skipper.html time="01:21:51" %}?

Colin: Well... That’s not the answer. It is yes, it is re-rendering but that’s not why {% include skipper.html time="01:22:00" %} we … Yes, that’s the right direction though. Yeah?

Speaker 13: You don't send the action on keyup [inaudible 01:22:06].

Colin:  On here. Right. Yes. Let me give you, I’ll give you a couple. Yes, that’s true, we are not doing that. That’s not the specific reason that we don’t see anything and nothing changes though. Yes? The value is set to empty string. That's right. If we set the value to kittens, we are going to get kittens. Let’s see, let’s go down here to input and we find that input value is kittens. We save that, we refresh it, we cannot get those kitten out of there, no matter how hard we try, and they're so adorable.

That is homework. I’d say this was the moment when I really understood what was going on here. Wait a second, why can’t we type? We are setting value programmatically. Oh, we are setting value programmatically when there is a key event, we set an action and we are actually re-rendering that much. Yes, actually that much. It’s going to send that P or that F or that K around into the store, update the data, helpful to think about creating things implicitly. We’ve done that implicitely create. If someone shows up on New Recipe, you create a recipe model, like basically a blank one right when they show up. It’s helpful to think about that to this program. Yeah?

Speaker 14: [inaudible 01:23:37].

Colin:  Nope. Nope, it’s because we are setting value and we are, we need to be setting value to … What we need to be setting value to?

Speaker 15: State {% include skipper.html time="01:23:51" %}.

Colin:  What’s that?

Speaker 15: State {% include skipper.html time="01:23:53" %}.

Colin:  Yep, you could set the value to state. That's right. [Edit: or, really, props] Your homework before, between now and the next class {% include skipper.html time="01:24:00" %} is to try to solve this little problem here, which is fix the form functionality, right. Make the inputs a subcomponent. This is in 006.3 flux enlightenment. Fix the form functionality, make the input a subcomponent, pass it a method from the parent that fires an action with the form  instance data. The form is going to have data, and like we’re going to able to get the data out of the form, but when you are, let me show you, sorry.

Let me show you DOM, that’s what this looks like. this.refs, we’ll talk about refs in like 30 seconds after I give you homework. this.refs.inv.getDOMNode.value, that’s like in ref inv, that’s how you, this is going to return a reference to the actual DOM Node, so that’s how you. That’s like, this would be like your $("#someId), like let me write it out for you. If you are looking, when you see ref think this like or .text, right. When you want to do that, you should head towards refs. Let’s go back to step 3 {% include skipper.html time="01:25:25" %} here.

Re-render the input every time the store data updates with the new value from the props, we are going to have to pass through the, we have to pass the value through the store. Now everything in the UI is a reflection of the store. [UI is data and data is UI](http://appamada.pbworks.com/f/Heart%20Sutra-Red%20Pine.pdf) That’s like, that’s homework. This is the bridge between all of these examples and the full repo. We are going to be in a full repo with a server and API calls and more flux and a webpack build and all the rest of that.

I’ll point you specifically to the place in the recipe app that we’ll be going over all of next week. We’ll be diving into it, and we’ll do a review of all of this and then dive into that app. I’ll point towards {% include hublink.html link="https://github.com/FormidableLabs/recipes-flux/blob/master/client/components/ingredient-form.jsx#L27" text="the place in the app where the switch happens" %}, and where you see this happen. Angela is hard at work cleaning this up so thank you, Angela.

For extra credit, there is a problem, and that problem is that when you re-render a form input and you press backspace. You are in the … Let’s say, you are in the text area, and you were rendering that text area every time, and it’s great. You can type, but the users, see something in the middle and they go back and they’ll say, “Okay, I want to edit this part of the paragraph.” They start hitting backspace, they hit backspace once. Where does the cursor go? It goes back to the end because it’s new again.

For extra credit {% include skipper.html time="01:27:27" %} fix that too. It’s, there is again how the issue on React, it tells you how. I guess, I somewhere had asked about [Wyatt 01:27:37], I’m guessing that’s why it’s 100k. 100k isn’t a ton, but Riot {% include skipper.html time="01:27:41" %} is like, “We are 5k.” It may have everything in there, but I’ll bet you there are a bunch of edge cases like this that Riot {% include skipper.html time="01:27:48" %} doesn’t cover yet. I’m guessing, I don't actually know that but this edge case is handled in React.

With that, we are actually going to be there. We are going to start, we are going to … If you want to on your own, you can look at the router, actually, that’s enough for tonight, we are not going to go into the router, but we’ll look at 10 and 10.1 one starting next time. At this point I’ll take questions and say, thank you.
