---
layout: tutorial
title: "Learn React & Flux: Part III"
description: Brought to you by Formidable Labs and SeattleJS, Colin walks us through Facebook's React framework in part three of this three-part series.
video: 6fhTawDEE9k
repo: https://github.com/formidablelabs/recipes-flux
---

##  Welcome

**Colin**: Tonight is really some edge features and actually it's different in the edge features weren't even ready so we can use other edge features. We were going to do Flow and we're going to do Type-Checking and Facebook told us that it's really not even ready to be taught yet. It's changing and it's not done. There are two things that everyone has asked about and we knew we were going to do them anyway and decided to focus the whole night on them. Those two things are: how do I talk to a server in React like a small thing, right? How do I style all of my applications in React? Also a small thing.

Really, there's no solution for either of those things so we're going to solve those problems tonight and first thing we're going to do ... could you put my computer on? Thank you.

## ⚛ Review

The first we're going to do and we did this last time too and everybody was really into it, I'm going to pump up the font size. This is advanced night for the three advanced workshops so we're going to do some crazy things tonight but we're going to go back to basics and I'm going to do a review as well. We're going to get our head back in context so here's a run through of React from first principle just in case you have been following along but it's been a few weeks since the beginning.

We started out last time with a blank file and we know we need React and we know we need to transform JSX which is this markup language that transforms this kind of xml syntax, html-like syntax into a tree of functions. Again, conceptually we know that that tree of functions is going to become a virtual DOM and that virtual DOM is going to get giffed against the previous version of the virtual DOM and the changes only are going to get applied that's why we perform it to re-render the application all of the time based on whatever data is in the app. The concept in React is that your data ... your user interface {% include skipper.html time="00:02:00" %}  is always current up to date with your data.  

Let's look at the whole world. We need a container because we've got to attach the app somewhere so we add a container and then we have our JSX. Our JSX is just returning a div and here's something we talked about before: remember that if you're returning a div, you can only return one root element. You can't have any siblings to that div. You can have as much as you want in here, but it's got to wrapped in one element.

Then we call React.render and we give it a component. This component can have others in it.

When we broke recipe list into recipe form, and then we instantiate those two components inside of the parent component. We say in React speak that the recipe book owns recipe list and recipe form. What that really means, is that recipe book is in charge of the state of recipe list and recipe form. It can pass props down so let's talk about props. What are those?

We can pass data, let's take some data here. We have a syntax in JSX that looks like attributes. It's not attributes, it's actually more like arguments to a function. Add title, Stuffed Chard and instructions to Stuffed Chard. Those are going to be accepted by recipe which is up here and you can see once it's instantiated the title and instructions are going to be available at this.props.title and this.props.instructions. Those are going to get the data is going to be passed down. {% include skipper.html time="00:04:00" %} 

We can do basically the same thing starting at the top level. Start at recipe book, in React.render, and pass in some data we know that recipe data is an arrayed data, we pass in that array, it gets piped down all the way down through to the recipe that needs it and just in the same way, you can then call this.props. In this case, we're going to do a map and map over that array and we're going to return it for each item in the array passing through the data into props.

Then we talked a little bit about state and use that initial state to preserve state of components. Remember, when we're re-rendering the application every time there's new data and the problem with that of course is that let's say you have a sortable list, okay well if you sort the list down to two elements, and then you re-render from the existing data from the store, well of course you just used the order of your list and you're back to reflection of the store. You always want it to be a reflection of the store, you want it to be a reflection of the store where the data is for the app accept when you have a local state in a component like a sorted list.

The state here could have items to show where all items showing equals true, all items showing is false then you go do another check for your item it should show the way you manipulate state is never correctly. You never do this.state.fu=, you only use this.setstate. this.set state will force a render and when you force a re-render it will go make whatever calls it wants to the store to get the data.

We then got into Flux and Flux I want to go grab {% include skipper.html time="00:06:00" %}  hold on just a second ... Can you screen back up for just a second? I just need to go run around and find something really quick. Okay; back up thank you.

Remember that we talked about Flux and in Flux we have components which are from React, we have actions, we have a store, and we are connecting those things together with a library. If you're using Mcfly, actually we've already swapped out Mcfly for something else called Nif so we're going to be working on that tonight and then I had already had a replacement for Reflux so that's like six weeks and three libraries so we're averaging one rewrite every two weeks right now. That's about where the ecosystem is. When you ... how is that in the back? Is that okay? Higher, bigger? That okay? All right.

The recipe component, let's say that a button's clicked. The button's clicked, it fires action and the action may or may not call an API and that's what we're going to talk about tonight actually. The first item of tonight is how do I talk to a server? The second item tonight is how do I style my app? The actions the store subscribes the actions. Actually, all stores receive all actions and that's what you see; you're firing off the actions with data, all of the stores should do a check and say, "hey, do I need this?" The store when it goes ahead and updates itself, does whatever mutation it needs to do, then fires emit change {% include skipper.html time="00:08:00" %}  the recipe's controller or the app itself all of the components will subscribe to changes in the store, that will re-render the application, pass the props down to recipes and voila; your app's current. It's uni-directional; you're not doing this.model.set or this.model.get. You kind of are doing this.model.get. You can do a public getter.

## ⚛ Flux & REST Apis

That's actually what we're going to start talking about tonight. I haven't done any decks the entire time but inevitably this is going to be really helpful. How do you do async in Reactive Flux? The primary question which is being debated online and hopefully this video when we put it out gives something for people to reference. Both of ... Teaching the first one was basically building an app based on what was publically known and available. The second one last week was pretty easy, too because it was a much more complex app but it was all client side which people basically knew. We knew how to handle that. But this lecture installation was really hard because both of these two things are not solving the community at all. Facebook has their own solutions and we're having to ... if we're using Node or using Python the backup that Facebook is using, having to reinvent these patterns ourselves. Hopefully this serves as a reference point for all of you and it's been a bit of a research project on our end. Research project, lib building, talking, bouncing ideas off.

I don't want you to take this as the final word, this is like, "how do you answer these major questions? How did we answer these major questions? In our own apps like this week and probably in two weeks maybe this is already irrelevant". But hopefully we have longer than that but we had to get on the train at some point so where should async live? {% include skipper.html time="00:10:00" %}  The problem with calling the API from the store is that what comes back from the API may need to be digested by more than one store. Also, they're synchronous and they'll blow right by a promise and also the crossstore dependencies issue can get really hairy. Stores leave stores, leave stores; you could end up with a graph back there and you don't really want it. You also don't want them to be components because in general components should be on the receiving end of data. The problem with actions is much, much less so what we're advocating and I'm going to give you a high-level overview of this and then we're going to dig into code that contains this pattern.

What people are doing with Facebook and what we've found is working in our apps we're building, we have four or five React apps that are already going so with the patterns that we're using, that we're doing is async in the actions and we think it belongs to the action creators for the following reasons. I'm going to walk you guy through this series of diagrams. Again, and then we'll get to code.

This is a read so the component uses a public getter ... this is what we did last week for anybody who wasn't here last time. The component uses a public getter and it goes up and it talks to the store. The store then returns the data and then we can see our little happy, yay I got that arrow and it gives the data back to the store. No http; just local. That's what we did last week; we were using public getters from the store.

If you want to do an async read it's pretty much the same thing. Your component calls the public getter on the store, the store says, "hey do I have anyone with this ID?" {% include skipper.html time="00:12:00" %} If it does it just returns it; no need to go to the API. If it doesn't, it goes to the API and if it doesn't have it, it 404s, the API returns a promise to the store, this fired back to the component and everything's fine. If the store returns a promise or however you want to do that, in the public getter you could fire like a you could say this.state or setState as a {loading: true}. This where you would do your loading true back here. You fire off that read from the component and then when you fire it off you say this.state.loadingtrue and when it comes back you could this.state.loadingfalse and that's one way to handle a spinner. Someone was asking last time about a spinner and they were like, "well how would you do a spinner?" It actually was like a two week research project. Basically, this is how you do a spinner so that's where your false set state.

Great so we got to the spinner question. But the spinner question is deeper, right? Because how does the component know that there's more data coming? The nice thing about this is that if recipes makes a call to the API ... oh my goodness! Async in React and Flux Google Slides. Wow! I don't know what just happened. But okay.

Apparently, we're [inaudible 00:13:35] so the store they can return promises all the way down the line and the API, the last store can return a promise. The API comes back and it's successful, it's a two hundred and we go back the other way, the API passes the data back through the promises all the way to the component {% include skipper.html time="00:14:00" %}  and we have no actions in the way. This is the way that Facebook is doing Flux. This is the way that they're doing Flux reads.

Flux ... well let's put it into it gets a little more complicated. Here's the core problem: the core problem is the component in this case, is not allowed to talk to the store. It's just allowed to fire an action. Again, we're going to go through this at a high level and then we're going to go into code. We're going to go through all of this again so don't worry if you don't quite grasp it now but it's a high level. The components going to fire an action. These are all actions: start, success, failure and the next step is that the action creator are actually going to go ... you know what I'm going to do? Sorry. I should've done this in the first place. I apologize; hold on. We're going to copy the link and we're going to put it in gitter so if you go to Recipes Flux, Formidable Labs, Recipes Flux and then scroll down here and go to join chat, there are Facebook engineers in here to help you and I forgot to tell you this; I'm sorry. Hey, there's lots of you in here; great!

Here you go: [ASYNC IN REACT & FLUX DECK](https://docs.google.com/presentation/d/1RQ7mrRUkga5J1wm8dvr_asZF-1bhJkHGuH-NLTdQhFs/edit?usp=sharing) there it is and so you should be able to come in there and delete everything. Hopefully that's read only. Great; okay. Let's ... there we go; nice everyone's coming in. Let's take a look at ... we've fired our action, let's say delete recipe. So when we say delete recipe, the first thing it's going to do is fire off ... the action creator is going to fire off a call to the API and it's going to fire off an action which is start. When it fires off start the store knows that, the stores are listening to that and the store says, "okay; hey he's loading it's true", right? There's something going on in the API {% include skipper.html time="00:16:00" %}  and so we can then pass that down to the components and then the components can start a spinner. We've answered the question for the delete as well so we would then setState somewhere down the props is loading is true and some store we can then setState on the component and then start a spinner off. Now we're out of the API.

Let's say that we had a failure, well once the API comes back, the data comes back from the API, goes to failure, then goes and the store catches the subscription and then passes everything down into the components that are listening. Same thing with success. If it comes back as a success then it's going to go to the store and it can be passed down. The store will do whatever it needs to do. If a store needs to update; it'll update itself and then fire emitChange down to recipes. This is an overview how to talk to an API with Flux. Have a good night.

Anyway, let's look at that in code because obviously I'm not getting off that easy. If you haven't yet, I'll give you a minute and a half, two minutes to do this and then I'll take questions during that time. Go ahead and clone down ... if you haven't cloned down recipes Flux, do that, if you have cloned it down do get role and get the latest stuff. The latest stuff is Recipes Flux now contains all of its async logic and a server.

## ⚛ Q&A: Sockets & Stores Listening to Stores

Before I take questions, I'm going to give you a brief overview of how this server works, it's super-basic. It uses something called [LowDB](https://www.npmjs.com/package/lowdb). Which if you haven't used it, I highly recommend it. It's really neat. Basically what it is ... everyone know Lodash? Or Underscore?{% include skipper.html time="00:18:00" %}  All right; so Lodash and Underscore it's basically a database that ... it's an object it's like a NoSQL database that you've query using Lodash. It's fast and it writes either in memory or writes to a flat file so that's what's back there if you're wondering. The plan with this and I'm pretty excited about this is to use Dropbox as the distributed ... if you don't want anyone to have anyone else's data, here's where their own recipes, then you can just write to a flat file with Dropbox.js, have people connect to your Dropbox and then just write it into a flat file and then we can distribute it with no SQL database without any backend. Pretty cool, right?

Anyway, that's what you got going on there. Can I take some questions before we dig into this?

**Speaker 2**:  Can you show us how to [inaudible 00:18:58]?

**Colin**: That's like maybe twenty-five minutes later. Yeah so the revolutionary thing that we talked about last time has been getting a lot of love. Anyone know what Radium is already?

**Speaker 2**:  Yeah

**Colin**: Yeah, yeah so we built up over the past month or so and release it and it got some pretty good press and we're really excited about it. That's how Facebook's doing styles. It's pretty mind blowing there is no CSS anymore in their apps at all which is pretty mind blowing [Edit: ...at all... ...probably... ...in react... Ok I'm actually not as sure as I was.]. We're going to go over how to build an app without any CSS whatsoever. The answer sneak preview: is {% include skipper.html time="00:20:00" %}  inline styles. We're going to teach you inline styles tonight.

  Any other questions?

  Okay; cool.

**Speaker 3**:  [inaudible 00:19:45] API called a photograph?

**Colin**: Like load events like ... well load events you would use your actions for that.

**Speaker 3**:  Sure, but also {% include skipper.html time="00:20:00" %}  when you want to [inaudible 00:20:04]

**Colin**: Can you give me an example?

**Speaker 3**:  Streams.

**Colin**: Streams like socket.io {% include skipper.html time="00:20:10" %} you're on your own; sorry. I actually don't know probably research on that I am not sure how to use socket.io in React {% include skipper.html time="00:20:17" %} I imagine that you could set that up ... David are you here? Where did David go? David, what do you think about socket.io {% include skipper.html time="00:20:25" %} ? I don't know how I would do it.

I mean, what would you ... let's say theoretically you do it from the store and you use storage in ...

I mean, that's the only way I can think of. Like doing it from the store and keeping the store in sync with the server and then just basically jettisoning ... David, right? And you'd kind of have to deal with complexity growing in stores that way. Yeah, so you would just stream back and forth to the store and then just make sure that your store was current with your ... and then whatever the socket event hits you should update your store and that will cause other problems in your app. You will basically when you want to have different stores, when the store grow, when the number stores grow, in between stores like that's just a Flux you're going to have to handle.

Okay so let's take a look at the actual code to make this work.

What we're going to do is we are going to walk through the code base and we're going to walk through the code base and this diagram at the same time. Let me get this ... okay. Let me get this going.

Let's start out in recipe form. Recipe form is going to fire a {% include skipper.html time="00:22:00" %} create action so let's start there. This is line seventy-four of recipe-form.jsx. The first thing that we do is we fire ... the command to get this going if you don't have it going yet is gulp dev.

Let's take a look at what this does if you were here last time you've seen it. It's a recipe app, it displays a list of recipes, you can click on each one you can get an item view. If you click on edit, that's what we're going to be looking at right now so you change these and they will now persist to the database. If I refresh, that's now persistent. If you delete all the recipes, they're gone, by the way because it's talking to a flat file so it's not refresh to get your state back like it was last time, these are persistent. If you do that, by the way, there is a db.json.bak for backup so if you delete all of your ... if you delete everything out of that flat file and you want it back then that's where you go.

Let's start out in recipe form down here line seventy-four. We're going to say "recipe created" and {% include skipper.html time="00:24:00" %}  it's going fire an action. It's going to say "ingredientcreated `_id: this.state._id`". That is going to ... let's look in action, that's going to fire an action. If you look in actions, in recipe actions you can see "ingredient_created". So there it is. It is dispatching it's calling this.dispatch so this is the slight change from last week. If you look through the McFly code, you know that the McFly code was just returning ... it was basically proxying data through the action into the store. This time, you're calling this.dispatch explicitly. The reason you're calling this.dispatch explicitly is because you now have control over when you call this.dispatcher and talk to the store.

If you look up here, up top at a slightly more complex example: portions changed, input changed, ingredient deleted. These just call dispatch straightaway but, up here in "recipe created" it's actually using the request module from ... if you've used node you're familiar with that or you can use superagent or whatever you like. It's going to do a POST and it's going to send the data over and then when on end, when it comes back, it's then going to do this.dispatch with the action type "recipe created" and data. That way you're delaying talking to the store. What you've done there, in this line, this is lines ten through nineteen of "recipe actions" so once again, to make sure we're all on the same place, it's line ten through nineteen of "recipe actions" {% include skipper.html time="00:26:00" %} . Those lines right there are how you delay calling the dispatcher until you're acing call returned. Does this generally make sense? To do that? You guys kind of with me?

That's like tentatively half. Let's keep going through the loop and then we'll come back up to the high level. We're in our actions and our actions are ... at this point, we've fired an action and we've fired "start" and "start" has hit the store and we've fired up all the API and then once it comes back, then we're going to fire success or failure. How do we know whether to fire success or failure? Well, like if error right; check for error, if it exists then send error and the data with it.

In the store, let's look at stores "recipes stored" and let's look at "recipe created". At the top, again, the store is just an empty array or it could be an object it's just an in memory database like a collection in Backbone. The way that we're interfacing with it here ... if payload.actionType and again, let me go back here; how do we know it's payload.actionType? We define that here: action type: recipe_create. {% include skipper.html time="00:28:00" %}  All of these we covered last time but I'll say this again just for clarity: every single store listens to every single action. What you're doing in these instatements is just checking if the type of the action that was fired corresponds to what the store is interested in knowing about. This is a recipe store, it's interested in recipe create events so it's going to fire this.recipe.data with data, create recipe is going to just push onto that array and then that's done, that operation being done, it's going to do an emit change.

At that point, we're here, right? We've done the start event we've let it know that it's going, we've gotten a two hundred back from the API and the action created fires a success, the store subscribes to that, does whatever mutation with the new data that it needs to do and then it will emit change. Once it emit changes it is then letting the rest of the app know, "hey, there's new data you need to look at". That's the overall flow. Before I move on from there, any questions on that overall flow? Just dispatching an action immediately and then waiting until the API returns to fire off a subsequent action with the new data? Does the pattern generally make sense?

**Speaker 4**:  Question. Why do you fire the API from the action creator, why not from the stores? Isn't the action a proxy for [inaudible 00:29:54]?

*[Edit: tldr; answer is that multiple stores may want the results. Stores just emit change events, they do not send data with that change event. Actions send the data with the success event.]*

**Colin**: That's a great question. So for a get, to go back to a previous example, for a get, that's perfectly fine {% include skipper.html time="00:30:00" %}.

But here's where you run into trouble: if you're doing a get then the store may use the public getter of another store, they use the public getter of another store, will go to an API that doesn't have it. That goes all the way through the back. That is the case if you're doing a get. But if you're doing like a delete or an update, then if the store does that itself ... let's say the component the user updates something and we have I know some of the more complex React apps have sixty to eighty stores, and so you have to assume that there's a dependency graph that stores need data from others and so we don't know in that case if the store mutates itself based on data because it's talking to the API itself, it would absolutely work if you have one, or two, or three stores that are all completely self-contained. They also work if you have sixty stores if you absolutely know that only this one store needs the data. I'd hate to talk to the API itself and no one else needs to be involved.

That's fine, where the problem runs into is if when the API returns, ten different stores need to know about the data that came then you have the stores talking to each other and they really shouldn't know about each other.

That's a problem.

Does that make sense?

**Speaker 4**: Sort of.

**Colin**: If you want to ask a follow-up question feel free.

**Speaker 4**:  Just wondering the API doesn't exist on the back [inaudible 00:31:37] the best way database why can't proxy represent [inaudible 00:31:48]

**Colin**: The store ... so David, I would say the stores would listen to each other right? They should have like listening for the {% include skipper.html time="00:32:00" %}  ... like listening for the changes on their stores; would you agree with that? if they want to receive data from them automatically like they need data?

David:  Yeah so we have a concept of a store depending on another store.

**Colin**: Potentially use a getter.

David:  Yeah.

**Colin**: Yes.

**Speaker 4**: In that case doesn't it make sense to have a proxy and the backend still be like [inaudible 00:32:31]?

**Colin**: That's interesting model; David what do you think of that?

David:  I don't know.

**Colin**: I'd have to think about it. You could definitely start an argument. There's a lot of ... Today, there's a chat-room called React to Flux I don't know if anybody ... reactaslack which is a slack channel for people who want it. Today there was just this epic conversation; basically, a lot of questions like that. There are maybe twenty, thirty Flux applications at this point with different opinions. It actually, if it works for your app, do it. I think at this point, what I'm seeing is that Flux is small enough, the dispatcher is small enough that you could pretty much roll your own implementation of flux per project. It may make sense to do so given data constraints. This is the one that works for n number of stores and we know it does. But I think that's an interesting idea. In a way-

**Speaker 4**:  I have done this with a RESTful API

**Colin**: With react? Yeah. Works fine? Yeah; great.

**Speaker 4**:  Mine is a small test application {% include skipper.html time="00:36:00" %}  {% include skipper.html time="00:36:00" %}  {% include skipper.html time="00:46:00" %}  [inaudible 00:33:47]

**Colin**: Sure, sure, sure. You bring up a good point because what is going on here if not in effect the action creator is acting as {% include skipper.html time="00:34:00" %}  a dispatcher for an event. It effectively is exactly what you're talking about. It's saying, "hey I've changed; you need to get data from here" and it's sending the data over. The only thing that's different and this is actually quite a big difference, is that, if this were to happen in the store, the store would say, "hey, I've changed but I know what I need and so I'm going to go use the public getters to go get it". But here, this store is a kind of special type of store where it doesn't have any needs, it just sendings data. When it emits an event, no one is reaching into it to get the data, it actually, the data comes with it.

**Speaker 4**: In a way the action creator is the story proxy that I'm talking about.

**Colin**: It is really, yes, it is a store proxy. I think that's the difference though, when the other stores update, they do not send any data with them. That's the big difference. When you have sixty stores and they say, "hey, I've changed"; anybody who's interested can come listen to it. But that's not the case if you have an API. If you haven't actually come back with an API, it comes back with the response body and so the response body is then passed on to any store who wants it rather than the API saying, "hey, I've changed" and then all of the stores making API calls. That would not be good.

...

I'm sure you've all cloned down and we're probably about ready to move on {% include skipper.html time="00:36:16" %}  let's take a look just one more time at this flow because this is pretty important, generally. I'll see if I can explain it a different way; I'll use a different set of examples this time and if you haven't gotten it, hopefully this is the time.

Once again, just to go back to basics, this is what we did last week. Component fires and uses a public getter so recipe says, "hey, I need to know what the recipes are". Get some stuff out of the store, the store gives the data back. OK to use a public getter because we're not going to mutate the data. We don't want to mutate in the store from the component. The component doesn't know how many stores there are, it just knows that it's getting data. It knows what it needs, and it knows what it gets.

Also, if you need to go through an API, it's the same thing. You can have as many stores as you want, they can all return promises, the data comes back and the component gets it. It's where we need to do it on optimistic update, for instance. Let's talk about the update piece, not the create case this time. We fire, the component says, "hey," ... let's say bananas, that should be easy to find. That is now consistent and let's make sure that's back there in the db. Yeah, there it is, okay so that made it to our db. That write went all the way through. {% include skipper.html time="00:38:00" %} 

Where it becomes necessary to dispatch two separate events is when we want to do an optimistic update in the user interface. We want to say, "well we know the store is changing, we want the user interface to reflect that without any latency whatsoever". We want that start event to go through and maybe that event carries data with it. It triggers a change in the store and that change goes all the way through to recipes. It may be the case that when an API comes back that it stays successfully nothing changed, then the user wouldn't even know. It would just look like it happened with zero latency. But it could be saved.

It's kind of like that Google Docs effect when you're typing and it's just saving in the background, you don't really have any latency on the client's side. Actually, it is exactly that but it's really easy to implement at this time.

Let's take about ten minutes here. What I'd like you to try to do is I'd like you to try to write something to the db. I'd like you to do the following; let's walk through it together: so write something to the DB from the UI. We will ... and I promise after this we're going to do something insanely fun, this is not so fun but necessary and then after this we will do a lot of fun stuff.

The first thing we need to is we need to create a new handler in index.js and that's going to be in server. There's express back there so first thing you could do is create a new handler in server {% include skipper.html time="00:40:00" %}  for a new recipe route and then create ... and then basically follow the pattern of what files that would be. That would be recipe ... client, components, client actions, recipe, recipe actions and no need to create new actions files or new storage. You can use recipe actions and recipe stores that way you don't have to worry about inquiring into files, that's prone to typos. Then client stores and recipe, recipe store and then arbitrary component fires an action. Here's what's going to happen: arbitrary component fires an action with arbitrary data. We send that data to the server and save it to disk using load db. If you want load db, lowddb is here, you can do npm, npm lowddb. There you go okay, npm lowddb, this is the API for that.

Then we will save that to disc and then we will return a success {% include skipper.html time="00:42:00" %}  and then fire the body to the store, update the store, and then emit change. Listen for and recipestore.mixin. There's a little bit of magic to connect the store to the component and that's in recipestore.mixin. Listen for a change on the store, six: re-render and I'm going to leave that up here. I'm going to give you guys maybe ten minutes to work through this and hopefully at the end of ten minutes ... even if we're not all the way there, you'll have worked through it enough that we'll have some question that you can dig in and then we will move on to the really exciting stuff. All right talk to you in maybe ten minutes. Feel free to work in pairs on this as well.

Okay everyone; I'll take some questions now. I'll take some questions now.

Hopefully this has been thorough enough this was a huge, {% include skipper.html time="00:44:00" %}  upsetting question in the community and I wanted to make sure that you all go back with this. We've got some working code here and we've got some working examples to take home as well. Anybody get it working; was that enough time? No. Not at all. Did you get it? Anyone want to ... any questions to follow up on that once you dug in? Any generated questions?

Let's switch to the fun stuff. It is 8 pm we are going to talk about Radium for about half an hour and then we're going to have everyone spend about a half an hour doing the craziest things you can think of with it and then we're going to do show and tell. That's where we're going now. Let me save that.

Another thing to show your boss if you want to write lots more React. One more company just did a code only rewrite of a non-trivial production enterprise application in React because it's cheaper and more maintainable to do that in the long run than to keep the graph of angular/ backbone logic that we have now. Pretty exciting to watch everybody {% include skipper.html time="00:46:00" %} continue to rewrite everything like air b&b did.

**Speaker 6**:  Wired.com

**Colin**: Wired, BBC, HipChat now, Netflix yeah lots of great ones.

## ⚛ Radium

Okay, so if you would point your web browser to [the following address](http://projects.formidablelabs.com/radium/) I'm going to walk you through what Radium is, what problems it solves and then we're going to play with it a whole bunch. We've been incredibly excited about this in our shop because we have run into a lot of the problems that Christopher Chedeau ran into when he was talking about doing inline styles so I want to run you through this presentation very briefly if you've seen it. You can just Google CSS and JS not going to read the whole thing.

Basically the overview was, "hey, there are lots of problems with large CSS code bases". For instance, so Bootstrap introduces about six hundred globals and these are practices that we don't follow in JS, we would never accept six hundred globals in JS but somehow we approve of CSS such a practice, there's no modularization and there's no great way to share constants. For instance, it's not really possible to isolate.

I was talking to someone on a very large project and they were describing CSS recently. It was when we were just beginning to evaluate the solution versus what we had and he said, "well, what I kind of do is like {% include skipper.html time="00:48:00" %}  it's kind of like there's all these layers of what people have done before and then there's like your button and you have to make sure your code is in the way of all their code." I was like, "all right well then" we probably replicate all of the problems that Facebook has here because you've got waves and waves of these it's cascade, right? The cascade is a whole bunch of globals and your globals haave to be in front of their globals and that's what cascade it. It's terrible!

The result of this exploration that Facebook went through was to do everything in line styles. Specifically, do everything in in line styles it's in JS, it's modularized, and then you make an object and then you apply that object to make in line styles. This solution, however, when we began to build with it it's not complete.

Can anyone think of some of the cases that are not covered? What kind of problems would you run into? What kind of things would we become used to doing in CSS that you would not be able to do?

**Speaker 7**:  Hover.

**Colin**: Hover, yeah hold and hover that's great. Any pseudo state: action, focus, blur all of that yeah what else?

**Speaker 8**:  Media queries.

**Colin**: Media queries, yes absolutely so media queries are a great example because it's basically like an if statement.

Oh, here's a really good one this is pretty funny. This is CSS ... this is pretty funny on a number of levels. Has anyone seen the spec for in range? Anyone seen this? In range? It's like media queries but how much logic can we pull into CSS? This is not tenable in the long term because you know we're going to touch it with JS anyway {% include skipper.html time="00:50:00" %} . We're going to get in there, we're going to rip it out and we're going to put some other value back in for max because there's some Edge case and anyway. We're going touch this anyway, right? We're not going to leave this alone not any more but having in range in the CSS means even more traversal of the CSS of the DOM so the more logic we pull into CSS the slower it gets because there's lots of DOM traversal.

Media queries were a great example of that. They're basically they're if blocks. It's like this. It's window ... hold on, let me zoom in so it's window.interwidth. There you go, 1886; it's an if block. It's an if block given that condition. This in JS is trivial but in CSS this is like reams and reams of blog. This is ... it's not better, it's just what we were used to in CSS.

This is pretty funny: Dionne Almer tweeted out about this when React first went up and this is my favorite response. This is Alex Russell who is on the standards committee and if you're watching I am so sorry we went full bore in destruction. He's on W3 standards committee so building CSS4. Anyway, one of my favorite reactions ladies and gentleman the community reaction was really good because there are a whole bunch of problems.

Check this out: {% include skipper.html time="00:52:00" %}  that's really smooth! Check it out: this.state.ww divided by ten that's computation. Computation in styles because it's just JavaScript. You could do ternary operators, functions, you can modularize all of the objects. You can do everything you did in JS and what Radium's doing is handling all of the states that are ... so go to the Formidable Labs blog post [Launching Radium](http://formidablelabs.com/blog/2015/03/01/launching-radium/) you can see this and it's not Radium yet. We're maintaining Radium we hope it's the one it is come about with conversations with Christopher Chedeau who wrote CSS and JS he's coming up with a lot of the Facebook methodology and a few other people at Facebook as well so we're trying to handle all of the Edge spaces that you're going to run into inline styles. It covers, it focuse and hover, check it out it's actually way more performing to do in line styles because React is diving them for you.

If you only change one thing in line styles you can put thousands of buttons on and change things on JavaScript events even while those events are still super performant and you can recompute a ranDOM background any button on hover that you want; it's instantaneous. It's wildly performing and we're going to have ... in two weeks we have a blog that's coming out with tons of graphs about just how performant this is over CSS as well [Edit: Ok it took way longer and we're still working on it]. Anyway and that is not the case that it competes with CSS if you're not doing tons of computation. Again, this is like given the fact that we're using modern web apps and we'd like to be doing tons of complex computation all the time it would be better to do this with Radium but obviously if it's just a head to head comparison of like using JS and doing it with CSS, CSS gives you extremely performant in itself. It's just over computational edge space that we want to do all the time that are really not.

Let's go through some of the basics. First off, you can modularize it. You can take all of your {% include skipper.html time="00:54:00" %}  styles put them in an object, put them elsewhere in your app. You can ... here's an example of this part right here just takes care of getting the text in and these just set the value of the counter so don't worry about that part but what we'll look at is right here so the background color is a function of state. As we change the counter, we're re-computing the color every time and we're also as we change the state, we're re-computing the padding every time. That means that we can do with two lines we can do this: we can change the text and we can change the styles and it's all re-computed on the fly every time the state changes.

Just think about all of your style sheets being re-computed. Think about this: think about re-computing ... think about having an I-frame, a widget, an I-frame widget inside of your site, that you post message into. Communicate into the I-frame and when you communicate into the iFrame you send an object in. It receives that object and applies it as a style guide and re-computes the entire app based on that object. That's like pretty much trivial because it's just an object and you're styling the app it's could be this.styles.blue or this.styles.buttonColor so you can just restyle the entire app and from like asynchronously you require an object, bring it back re-compute the entire app based on that. Things that were pretty inconceivable are possible.

One of the other things that Radium handles is ... or I should say, that you could do with in line styles with some code that Radium can make even easier for you to {% include skipper.html time="00:56:00" %}  make it more accessible for you that's more accurate. All this stuff you can do on your own if you want to obviously, you can read the Radium source but these are some helpers. The Radium button time equals warning let's try time equals primary and when we re-compute that it's just going to change it to blue and we're using props there to do explicit modifiers.

Anyone ... if you all know like Bootstrap alerts where it's like where class equals alert, alert-danger, right? Class equals alert, alert-primary. It's not necessarily clear in your CSS especially as your code base grows that alert-primary and alert-danger shouldn't be applied to the same element. Block out a modifier with basically this is done semantically like Ben, you guys have naming it, you use naming conventions for this now. There's no way to explicitly say that this it should be alert or default or warning or success those aren't explicit the way that that's done is with naming conventions. But here, you can do explicit modifiers so you can say time equals primary and primary does down to Radium and it will apply that one which means you can modify the state of a button programmatically as well.

It also handles all of the events in CSS. This is done with JS it's just done with the JS event listener. It's just on hover again, we've got something coming up in two weeks on the exact performance of this graph but it's totally performing to do this. It's totally performing to have thousands of things {% include skipper.html time="00:58:00" %}  on page with JS listeners it's fine. Then you can do ... for progressive enhancement, check it out: what is your CSS? Well, it's a turner rig like modernize it like box so does that exist?

True or false if it does then display Flex, if it doesn't display what? Then you can even go a step further and just have entirely different styles. If Modernizing.FlexBox doesn't exist then you would use like a legacy grid. If FlexBox does exist then you use the latest grid and just use the latest stuff. Basically that's like the bottom line here. What you get with in line styles is you get computations and you get really, really, really powerful logic. All the logic you're used to using in your normal app.  This is really a game changer so check out this would seem very scary because we are used to modularizing our CSS. There's all these best practices around modularizing your styles.

But in fact, this isn't all that different. The problem way back in the '90s was that the styles were actually in line but we all know we're not going to do that. It's not like you're going to have all of the styles actually on the elements, we're already, even here even in these examples I'm showing that I'm extracting into an object ... you're going to require them just like anything else so like having them externally, you still have them externally. It's still separation concerned, it's still modularized. It's just that you get computations. Anyway, this one thing right? Here's setting font size, no line whatsoever, setting font size is a function of window width so you're changing your styles. {% include skipper.html time="01:00:00" %} Otherwise you would have to go into CSS and change the CSS value.

Actually, let me put it to the crowd: how would you do this? How would you do this in CSS? What would you do? If you wanted to do it?

**Speaker 9**:  Use viewport width

**Colin**: Viewport width.

**Speaker 9**:  A VW instead of pixel.

**Colin**: Yeah exactly, yeah. I think that's in the same pattern of bringing all of the values, and all of the globals and all of the logic into the style sheet, like media queries, being ifs and other things like that. We need the spec too, the spec is the slow train that's following behind us and fortunately now it's like we don't have to wait for the spec to give us things like that we want, we can just use logic. There's another example I'll throw this up in the chat and you can try this locally. It's a chat now.

This is an animations on letters, per letter animation. There are entire libraries dedicated to jig rig plugins this logic isn't a four hundred line jig rig plugin? This is all it takes to do that. Some of the equivalent stuff for that is lettering JS, for instance and lettering JS is ... it's helping you do things like herding but it has to go down to the letter but {% include skipper.html time="01:02:00" %} finding great control over letters is also performant over letters also possible.

People asked a few really good questions when we first released this and then we can start playing with it. One of them was: if you're using in line styles let's say that you have ... here's one of the things that no one brought up that you can't do: you can't do it with in line styles let's say I have a div and I have an ID of foo and I have fifteen paragraph tags littered at some level of nesting and I don't know where they are but I need all of the paragraph tags inside of me to be styled like this. That's why we have all these complex selectors in CSS. So how do you replicate that?

Well, most of the time ... as we started working with this, we realized a few things. One was that we could modularize our styles and require them in subcomponents so if you have access to the element you can just apply a different in line style to it. For instance, if you are creating a list item, let's say you are creating ten list items into each. As you iterate it over the each, you would simply apply styles computed or not or static to those list items that you created. That's scenario number one.

Scenario number two is that you don't have any access. Maybe you're loading html asynchronously or you're not going to be able to get them. The fix for that, is using a style tag. You can programmatically inject style tags into the DOM. Like in the head that you would use like style and you would have a whole bunch of CSS in there, you could programmatically inject a style tag into the DOM. Put a whole bunch CSS in it like a key frame navigation and then a reference tag in line {% include skipper.html time="01:04:00" %} style.

The CSS then just becomes an annotation it's like a little extra when you need it rather than ... and that even having a style sheet like it, I don't see any reason you couldn't continue to use a style sheet but this might reduce ninety percent of the need for it. If there are some things that you cannot do under any circumstance, then okay use a style sheet. But here's the thing: even this, even using style tags inside of the DOM, because it's done programmatically, allows you to reference specifically what React elements you want and so you can do specific selectors with CSS that won't bleed into other DOM elements. It's scoped to React components.

We're working on server side rendering right now, I'm going to give you guys something to fork and we can start playing and so we'll do two things simultaneously. I'm going to give you the place to start playing which is, here's how you do it: go to this blog post and I'll send this blog post out in the chat. Scroll down and fork any of the in line styles that you want.

[Here are a couple things meetup attendees built in just a few minutes](https://twitter.com/coli/status/573385816107458563).

Come up with a crazy idea. We're going to share them at the end, I hope we have maybe four, five, six people able to share ideas that they have. Compute something, create like what would mean to do responsive but with this. What would it be to change all of your styles programmatically? To change all of your text sizes on ... I create little games like this too, I mean much better for game {% include skipper.html time="01:06:00" %}. Anyway, no.

I'll leave it up to you what you do with it but first I'll take questions and then we'll move on. But I can't emphasize the place, as crazy as this is, and this is a lot. This is actually how Facebook.com is being built. You can go see, listen Christoper Chedeau talk about the way in which they [inaudible 01:06:31].

David, I know not everything on Facebook is done like this, but do you know what Christopher had been able to?

David:  My guess is React Native stuff {% include skipper.html time="01:06:42" %}

**Colin**: React Native stuff, yeah.

David: I'm not sure how far away from the core React team it's gotten {% include skipper.html time="01:06:46" %}

**Colin**: So anyway questions, comments, pitchforks? Go ahead.

**Speaker 10**: Single elements like before and after will you actually use those with this?

**Colin**: Yes because you're doing a few things. Let's just say you could programmatically insert an element. Because you have JS you could just insert like a span and then style it. So there's one. You could just do that from the component. Another ... let's take ... is nth child is that like comparable? Or first/last. Let's say you're rendering and you have first/last. Well how do you get first/last ... if you're rendering first and last simply become just like logic. What's the issue to find the last element of the array and then ... I think that's like .... these things become ... like the media queries become pretty trivial if you're computing based on the inter-web, you could do all these globals and I think in a similar way, a lot {% include skipper.html time="01:08:00" %} of the things that were hard about CSS with logic like nth child, it's like, "well whatever the nth child is, just get it". That would generally be my answer.

If you found something, it'd be interesting please contact me if you think of something that breaks that, because again we're using style tags I'm trying to compile all of the instances of when you're really going to want it but if you have something that breaks that, please tell me because we're thinking through this now it's pretty green fields for us right now.

**Speaker 11**: Two questions: How do combine [inaudible 01:08:35] design?

**Colin**: That's up to you because anywhere in JS because again it's merging objects. Like it's not only can you combine two classes together, you can do whatever you want at any time.

**Speaker 11**: Second: how would you go about theming I want to change all the divs and then write inside of my page to [inaudible 01:09:00]

**Colin**: The question was: how do you theme your page? What you would do is you would have a module of this big object that would style globals and you would have everything inherit from those properties. You would have style globals.main color, style globals.secondary color and you could just swap it out for different colors and your app would just recompute. You could actually do that live in browser; you could just actually manipulate the styles object and emit events and then your components would re-render or recompute everything. One of the things one of our guys is building right now is an in-browser redesigner. Where it's a re-compute. You can just change this to blue and change that. It's like a site editor but like ... you could basically on it's own sort of like the crazy go through a website like site editors but like pretty trivially because you can change stuff in the browser itself from form fields. Set the styles programmatically the color of an input, the color factor input. {% include skipper.html time="01:10:00" %}

In other words, let me say this slower: put a hex code into the input, make that your sidebar. The value can now come from anywhere so-

**Speaker 11**: Global variable object?

**Colin**: Sure maybe global variables like a global variable object that is just required as a node module into only the files that you want it to be required into and that global ... if you haven't required that global into a component and that component loads on the page, that button will be fresh.

That is a html button with nothing on it. You have no more globals and you have no more ... in other words, when you need to customize bootstrap, it is just terrible because if you want to do anything custom you're then fighting it. In this case, if you started with a component that didn't require the like the bootstrap module for that, it would simply be completely unstyled and you could start from scratch and then you could slowly ween your app off of something like that-

**Speaker 11**: [inaudible 01:10:59] not to force itself onto anything require.

**Colin**: Has not been [inaudible 01:11:02] no, well, there's no cascade. There's no cascade and there's no style sheets.

**Speaker 12**: Three things: one is with CSS like bootstrap for example, that over six hundred globals that you talked about, that's an example of an entire bootstrap [inaudible 01:11:20] downloaded from bootstrap but they have the customized code they'd gone through and select any information you want. Not necessarily [inaudible 01:11:29] but then also to say that the lack of name spacing you've got an example of bad CSS. Like earlier, the person who was fighting with CSS.

**Colin**: The point I was making was the lack of name spacing is the default in CSS. There's no name spacing is done semantically. You do it by saying, "button-danger-alternate". {% include skipper.html time="01:12:00" %} You use semantic, you use naming to define the scope of what ... it's really your only option.

**Speaker 12**: You could do that but you could also say if you have a widget a class high widget, you can say mywidgetspace whatever elements are setup the specs in the space [inaudible 01:12:24] of that class. So what you're talking about with the JavaScript stuff essentially is that the client's scoping for anything inside of that particular setting.

**Colin**: Well yes as a byproduct you get that for free because it's JavaScript. Yes, you do, but that's not what this is about. This is about ... I can't argue about the ... I couldn't argue for this for a static website. This is not a modularization this is about computation line. This is about recomputing the styles, this is about saying that this ... the width of this sidebar should be a function of the text inside of it. That's something that I ... how hard that's very hard. These are things that are very hard to do with CSS but it's the stuff you want to do in modern web apps that's based on computation that this is an argument for. This is not an argument ... [inaudible 01:13:17] like web apps and it's really for style content so I would argue with that just on the basis of modularization but you do get that for free.

**Speaker 12**: The last one was: do you think CSS4 will catch up?

**Colin**: No. There is no way for CSS to catch up ever and the reason is that the spec will never ... in pulling things like colon in-range into CSS the problem with that is of course is that like where does that end? You're pulling more and more of this ... you're trying to make it declarative. You're trying to make more and more of the layout declarative but it's not expressive enough because it's declarative. It's never ... CSS is no way never going to be expressive enough to {% include skipper.html time="01:14:00" %} say something like ... take a modernizer sample.

[Disco Stalin ]Nice; I think! Well that's a valid reaction too. It's a little bit cranky but valid. By the way, speaking of a little bit cranky but valid, this is what the programming gods bestowed upon me at my office the morning after I released this: that was a guy chainsawing down a tree right outside my window. I knew immediately that this was trouble. Came in the next morning and my quiet time was disrupted.

What's that?

**Speaker 13**: Are you sure that wasn't Paul Irish?

[Edit: https://twitter.com/coli/status/583761681261596673]

**Colin**: Honestly, I am probably not prepared for the hate that's about to come down but yes, I'm saying that CSS is bad, CSS is never catching up and that it's over. That's what I'm saying.

**Speaker 14**: Do you think you'll use this in combination with stylesheets.

**Colin**: I think that everyone will probably still use style sheets. I think [inaudible 01:15:08] animations are great you've hardware accelerated CSS3 transitions, it's good. There's good stuff about that and there's good stuff that you can do with selectors, I just think this is going to get rid of ninety-five percent of the need for it and that's a good thing.

**Speaker 15**: My first question is where are you drawing the line in the sand? If you are still using CSS [inaudible 01:15:33] content this is the best thing ever?

**Colin**: It is for dynamic not necessarily for-

**Speaker 15**: Are you generally using a beta style sheet or are you just putting that on there somewhere [inaudible 01:15:45]?

**Colin**: No actually we have two apps going that have zero style sheets. It's all like this. It's just everything's swappable.

**Speaker 15**: How do you create structure? {% include skipper.html time="01:16:00" %} Is there some base object that defines the global theme or where?

**Colin**: You could. You could do whatever you want. I would have ... I would modularize it like you modularize Sass. Do fonts you know? I mean ... Sass ... one great thing that came out of Sass was that because you could do import you could import, you could do variables. Copy your Sass files. Take what you have in Sass with all the variables and all that logic and all that stuff but rather than compiling the Sass down to something static and declarative just keep it in logic and then you can continue to change those variable. It's like that, right? It's like you kept Sass on the client you could just keep changing out the variables whenever you wanted to.

We all want it. We all really ... we can't admit that we want it yet now I have it now we can, right.

**Speaker 16**: This might be trivial just general web application development but, for instance, you guys worked on Walmart at Formidable Labs. Say a product detail page. There's lots of mini web applications within a page like that with individual components. But a site still needs to be highly SEO searchable, all this. Are you delivering up ... are you implementing these in like enterprise clients? What are you delivering up as content for search engines?

**Colin**: You're talking about having a page server side rendering generally like a [inaudible 01:17:30] case?

**Speaker 16**: Yeah.

**Colin**: Can we take that as a specific example? One of the things that we're going to be ... one of the things we're working at right now, it might actually already be done, I'm not sure. Is you can compile the app on the server side how to inject the in line styles and then send that over in React, render the string and then all of you app is just there. But, if you do that, then your media queries {% include skipper.html time="01:18:00" %} don't work and your JavaScript states don't work and so your app is hydrated with JavaScript right? That's a problem that we're solving right now. That's something we're in the middle of.

**Speaker 16**: Are you basically sorting out like a backend server robot. Are you serving up the static content in its initial or something to that?

**Colin**: I should add that while Facebook is doing this, this it took us two months just to write Radium. We have not yet converted. We have enterprise clients that we're starting to do projects on with this but we have not ... it's not like we've converted every old project to it not yet. What was the question just for clarity?

**Speaker 16**: Not even so much related to CSS styling but more just in general what are you serving up to a robot that's crawling pages like this?

**Colin**: You're serving up React to render the string and it will render your entire application. We use Reactor router and then React router will match a route and then it will call to render the string.

**Speaker 16**: I'm sure there are a lot of articles covering this.

**Colin**: It's a good question. Especially because of what we were talking about today with the async stuff. You can call render a string and serve up the static page.  

One of the things we're working on is it looks like the way to do this is to take all the in line styles and compile those to one major style sheet in the head that would then go away when the app actually loads up the JavaScript and that would just get all the in line styles to compute it. Does that make sense? You would just compile all the styles to CSS. It's basically like you just rendered one state. {% include skipper.html time="01:20:00" %} The first state's done like that then every subsequent state is done recomputed.

**Speaker 16**: [inaudible 01:20:08] all the JS states accessibility?

**Colin**: Good question. Can you actually go to Radium and open a ticket with that question and accessibility? Both of those? I want to make sure we get back to you in a thorough way.

**Speaker 17**: Can you talk a little bit about perf [inaudible 01:20:34]?

**Colin**: No but when we ... so what we are doing is we're generating tens of thousands of elements and then we're using dentals on a fifteen inch retina Mac and so we'll release the device it was done on, the browsers that it was done in and the times for all of those and graphs of all those and how many buttons it was. The idea that I think was going to end up happening for this is that we're going to actually write a small app that's going to allow you to do these yourself.



**Speaker 17**: [inaudible 01:21:13]

**Colin**: How long it took the scripts to run for instance? How much RAM consumption?

**Speaker 17**: [inaudible 01:21:29]

**Colin**: In two weeks we'll have covered all of that but we haven't covered it yet. Can you open a ticket on Radium for that? Please open a thorough, perf ticket it would be a huge benefit just complete every hole that you can poke in it that you would want to see in that post, dump it in there and we'll try to answer every one.{% include skipper.html time="01:22:00" %}

**Speaker 17**: [inaudible 01:22:07]

**Colin**: It definitely is.

**Speaker 17**: [inaudible 01:22:14]

**Colin**: Short side rendering won't be in line styles, it will be probably ... we're still attacking this but it looks like a single tag, a single style tag in the head of the html that will be rendered. It will be computed and then put in the head and then sent over as CSS.

**Speaker 17**: [inaudible 01:22:38]

**Colin**: That's a good question. Server side rendering with focus and blur and all that stuff we're attacking now. We're going to get, we've got to get it but it's going to take four more weeks probably.

**Speaker 18**: [inaudible 01:23:02]

**Colin**: Yeah that's what we're same as you. I would say that we're probably going to have to release a blog post one blog post I'm going to add that to my to do list now. We'll release a post also on specifically server side. It's not done yet. We're not quite done with the hard problems on server side yet but we're going to get there.

Go ahead.

**Speaker 19**: Just out of curiosity [inaudible 01:23:55] when you're writing the CSS and JavaScript you get [inaudible 01:23:58]

**Colin**: What do {% include skipper.html time="01:24:00" %} you mean?

**Speaker 19**: If you were to type a property and you didn't know the span of all the values it can give [inaudible 01:24:08]

**Colin**: Oh yeah right.

**Speaker 19**: How would you find out ... is it known, is it hidden or is it transparent?

**Colin**: I'm sure someone has written some line plugin but no, no there's none.

**Speaker 19**: [inaudible 01:24:19]

**Colin**: Vendor prefixing is also an open ticket on Radium. We're also working on solving that. There aren't a ton of problems left and it's been only like a month and a half that Alex has been ... I should mention this explicitly: Alex Lande [inaudible 01:24:43] following on Twitter is a brilliant developer and he just did all of the CSS for a very, very large site that you guys [inaudible 01:24:50] work on and he wrote multiraneal and it's really brilliant. It's brilliant interface and we're pretty [inaudible 01:25:05] he's really only had a month and a half with this problem and there are some big problems left to solve.

**Speaker 20**: [inaudible 01:25:12]

**Colin**: Yeah I mean Alex just ... where's Ryan? Is he still here? Or did he just take off?

Okay that works.

Alex just did the [inaudible 01:25:33] Alex Lande just did all of the CSS styles for the new Walmart.com and you go to the new one it's beautiful, it's super-slick it was a massive, massive, massive project. He ran into all the same problems Christopher Chedeau did it and so we got excited about this about a month and a half ago. We looked at this and we're like, "man! There is no going back". It's like padding, turnering, like {% include skipper.html time="01:26:00" %} padding and function you've never ... how could you ever go back? Once you have that kind of logic in your web app. Again, not essential if you're displaying an item page maybe if it's just a template. If it's a template, it's a template; you just put a style sheet and a template. It's hardly ever actually like that.

**Speaker 21**: What about a hardware like bootstrap where you can use that project to project is this reusable across projects?

**Colin**: Looking for contributors we're re-implementing all of bootstrap in Radium and it will be themable in that way and yes I mean because you can just use objects you can. Yes, because you can use objects you could just create any number of combination of those objects that you want and reuse them from project to project. Require them to be on npm, require on npm someone's theme use it on your site it's a whole bunch of colors. npm install like freestyles and then just like grab some colors from a designer, use their stuff, use the buttons, use the padding, yeah. Or like npm installed some button and just grab the styles with that button require it in, put it on the button, style it. Done.

**Speaker 22**: Just curious how this works in Spec Elements?

**Colin**: In Spec Element? Great question; what about it?

**Speaker 22**: With CSS source maps, will it work with that?

**Colin**: Yeah absolutely so if you're ... let's take the first case, it's actually going to blow up if there's something invalid, it will blow up either tin build styles which is where you're taking that object {% include skipper.html time="01:28:00" %} and you're putting it on that element and let's look briefly at the interface while we're talking about this. Where are the opportunities for this to blow up? It could ... you're requiring a big object here let's say the object was actually in you CSS file and it was not modularized so if it blew it would blow up just in JS. Let's say this function blew up it would just say "this.state.ww is not find". That would be that. It would just be which would blow up in your JS. I guess that if you gave React something, if you gave the style tag something that it didn't know what to do with, then React would blow up and say "hey you need to [inaudible 01:28:54] casing properly so yeah I don't know what to do with this". That's another place it would blow up. Otherwise you could set a break point in the middle of your files if you wanted to.

**Speaker 23**: [inaudible 01:29:08]

**Colin**: Like setting width? Yeah absolutely you can.

**Speaker 23**: [inaudible 01:29:19]

**Colin**: Actually can someone do that right now while I'm talking? Can someone make-

**Speaker 23**: [inaudible 01:29:25]

**Colin**: Here's the text size. Try this one with an image. There you go; you can dynamically resize an image based on it's container. That's-

**Speaker 23**: Then make it stop when it hit a max or something?

**Colin**: Absolutely. [inaudible 01:29:51]

**Speaker 24**: [inaudible 01:29:55]what {% include skipper.html time="01:30:00" %} bower?

**Colin**: What's bower it's a package manager. What is it? What is npm? What is package management? What's brew?

Someone make an example of this and then you can send it back to me, send the clip for the code pen, click fork, and then send it back to me over getter and I will put it up and show everyone.

**Speaker 25**: [inaudible 01:30:35]

**Colin**: For testing?

**Speaker 25**: Yes.

**Colin**: Testing what? Testing React in general?

**Speaker 25**: [inaudible 01:30:45]

**Colin**: Testing with styles. What do you want to do?

**Speaker 25**: [inaudible 01:30:49]

**Colin**: Testing CSS right now is hell, can we think of strategies for testing CSS now? Yeah, I guess we could, couldn't we? I hadn't thought a whole ton about that before you mentioned that but as you mention that I suppose that you could do all sorts of things. You could validate a value what's above or below a certain amount. You could check properties of objects. I imagine that could valuable. Especially if you're themeing and swapping things out or if something computes a value that's higher than it should be you could test to make sure that wasn't the case. I'm thinking about checks in the application itself as well. Like logical checks to make sure that something isn't above a certain width. You could really have any types of logic to check the style that you wanted.

Others?

Okay I'm going to give you maybe like five minutes just to play and build something crazy if you can think of it. Then send all of {% include skipper.html time="01:32:00" %} the crazy things that you built to me on Gitter and in the last five minutes we'll go through some things if build. Like animations on letters and individual things.

If there's a really good one we'll put it on our blog. If you're going now, thank you, have a good night. Before we do that since people are going to start to go, thank you.

Thank you guys, thank you for being here for three years. That's a lot of community time, that a lot of learning and it's a lot of time together and it's really exciting to have a community that's willing to do that and I really, really had a great experience for me to have all of your questions it's improved my own learning of React to prepare for these and also the edge space that I've had to consider because of all the apps you're building. Thank you. Ten more minutes and build something cool and we'll look at what other people built in the last few minutes.
