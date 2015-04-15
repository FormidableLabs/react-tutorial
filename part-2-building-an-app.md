---
layout: tutorial
title: "Learn React, Flux, and Flow: Part II"
description: Brought to you by Formidable Labs and SeattleJS, Colin Megill walks us through Facebook's React framework in part two of this three-part series.
video: iR22EWW-CVc
repo: https://github.com/formidablelabs/recipes-flux
---

Colin: Okay, we're going to start out with a brief review. Thank you for packing the room a second time. Also, I'll say this is the first thing, you cannot believe how exciting the last one is going to be, and I don't say that sarcastically, the last one is going to blow your mind. Don't miss it. You'll have been in the room when we announce something really big, so get ready.

We're going to talk a whole bunch more about Flux. When we talked last time, we talked about components. We talked about React, we talked about rendering, diffing, passing data around and we just left off at the end with Flux, but we didn't talk about React router. We're going to start with that tonight. We didn't talk about Web Pack for build and we didn't talk about Flux in the contents of a major project. Major as in non-trivial, not like just a todo [ 00:01:11]. That's tonight.

Tonight is going to be a little bit more open-ended, because of that it will probably last ... Last time we were actually an hour and a half sharp, and tonight it will probably go two hours. Because we've got a little bit more open-ended collaborate stuff. We're going to enable a feature, you guys are going to pair up, and implement features on your own. Without further ado, let's do some work.

Okay. react-flux-concepts[ 00:01:43] ***LINK*********. If you could go ahead and open up the repo that you have from last time, which is Reacts Flux Concepts, and oh, maybe there are some of you who do not have that. If you don't have it it's here, reacts-flux-concepts [00:02:00]. It's Formidible Labs, same place you just went to for the other one, Formidible Labs React Flux Concepts. We're just going to walk briefly through what we did last time just to wake our brains up. We started out, I'm going to make the text way bigger. Okay, we started out in an empty project. Everyone in the back is this big enough?

Students: Yeah.

Colin: Cool. All right. We started out in an empty project, and then we get a hello world going by instantiating a class, right. React.createClass and passing in a bunch of methods, the most important of which was render because that returned some JSX. That JSX was parsed and became just basically a function, right. Then render returns this HTML, it's basically a tree of functions that represent the DOM and that gets passed into react and goes through the diffing engine under the hood. Then we call react.render we pass in our component and we pass in an element and this is the basics of a hello world.

Then we talked about nesting components and when we nested components we instantiated RecipeList and RecipeForm and we would define them. Then we would instantiate them inside of another component. RecipeBook then becomes a controller view, and the controller view is responsible for the data of his children. So you're passing data down from RecipeBook into RecipeList and RecipeForm.

Then we talked about that. How do you pass data from a parent into a child [00:04:00] and so we'll look at recipe book and that instantiates RecipeBooks to RecipeForm. RecipeList instantiates two Recipes, so now we're nesting triply, right. We pass in title and instructions as they look like HTML attributes, but they're not. They actually more like arguments to functions. They're available on an object this.props and you get a correspondence here between in Recipe. You can see this.props.title and this.props.instuctions are available in the child component. We talk about the RecipeList as the owner of those two recipe children.

Okay, so then we abstracted that so it was into an array and we took the Windows.recipeData and now rather than storing the data in those HTML attributes, which looking like looking things right in props. Of course we're not going to have data like that, we're going to have data coming back from an API. We looked at what it would look like to map over an array.

Let's follow this through. Once again, same thing in RecipeBook, we instantiated two components and RecipeList we passed in this.props.data. You can see we passed in to our controller view, our very top level view. We passed in Window.RecipeData, then data = Windows.RecipeData. Then this.props.data is going to be available, right. This.props.data will pass that though to its child, so the controllerView, which is going and getting data, is passing the data into all of its children. Remember that we talked about this as tree of functions. This is basically just arguments. You're passing data down through arguments, or down through a tree of functions as arguments.

Then if we look [00:06:00] in RecipeList, RecipeNodes is this.props.data. So same thing this.props.data we have access to that. Which came from the parent components in the tree, its a tree of components. We're going to do a map, the native [00:06:18] array method over that array that is coming down. We're going for each item in that array. We're going to instantiate Recipe, right. We're going to pass it props. Recipe.title, Recipe.instructions, and the this.props.title. This.props.instructions is going to spit them out on the page.

I think I can open this in browser and show you what that looks like. Yeah, here you go. We've now created a list out of an array. That is a basic collection rendering. Then we moved on to state. State is, let's see, let's go to the drop down. Yeah, here we go.

The ideal would be that you don't have any state your components. The components are stateless and they are always rendering from a source of data and they are just a reflection of that. That's not always realistic, because obviously your drop down menu is going to stay open or maybe there are lists that are subsetted. Even if there updating from data, you need to make sure that they're in sync. Sorry, so that the list items that are subsetted are persistent, even though other parts of the app are going to rerender.

We talked about state, and so I'll show you what this one looks like and then I'll talk about it. Super simple, you click it, you get a drop down, you click it, you get a drop down, right. We made that work by using getInitialState [00:08:00] and we made the component stateful. This state will perpetuate between renders, so that you're not nuking [00:08:13] all state every time you're rendering, although you are receiving new props every time the component renders. Let's see. This ternary [00:08:00] right here is this.state.drop is swapping them. Every time it's clicked, it does this.setState and that's how we interact with state. You don't want to interact with state, you can read state, but you don't want to mutate state unless you're calling this.setState.

Then we got in the Flux, into the basis of Flux. We use the McFly library which is a little factory generator, very small on top of flux that just gives us some convenience methods that are nice for the meet up. Makes it a little bit faster than working with the raw dispatcher, but that's fine too if you want to just require into your project Facebook Flux and roll your own. This is a hard topic to talk about right now, because the ecosystem is changing very very rapidly. Even between the last meet up and this one, I've had conversations and read things that have said, oh maybe I can do it that way. There are just a ton of right answers, because it's a very minimal pattern.

We're going to dive in tonight and I'm going to show you what I did. I'm going to show you what I did in an app. I've talked to a couple framework creators and got their perspectives on it. [00:10:00] talked to some people at Facebook about how they were doing it, kind of got a perspective and this was the app that I built. We're going to go over it. Just know that you're going to read articles that are going to say really different things and that's where the ecosystem is right now. I'll try to give you an overview of what some of the different ways that you could go are.

Let's take a brief look at Flux before we dive into the router, and talk just briefly about the homework. An overview of Flux. Let me grab, actually let me start with this because this will be ... We'll do it visually first, then we'll do it in code. Okay, so remember that we have a RecipesController view and the RecipesController passes props down to it' children. You have this tree of components, which is this tree of functions that all return representations of the DOM written in JSX, that then build your HTML. When the user does something in the app it's going to fire an action, this is the basis of Flux. It's going to fire and action, and that action is going to trigger a change in the store. All of the stores are subscribing to actions. We're going to see this in code. I'll show you this again in code in just a moment.

The user does something, that fire in the component in a form on a button or whatever, let's say it's a button. They fire that and it says action type button flicked and the stores are all listening. Every store is listening to every action [00:12:00]. If the store cares about that it's like, oh I care about button flicked, so I'm going to take in some data, change my state and once I've successfully changed state, I'm going to call emitChange. Once I call emitChange any of the components which need to know about a change in that store, will then rerender with new props and pass those props down to their children. Then that circle continues.

What does this not do? Well, if you are used to backbone or two-way data binding in general, what will look unfamiliar is that your RecipesController and you Recipes they can get but they cannot set data. You never call this.model.set some data. You are never changing the data from your view. The view just says something happened and here's the data associated with it. He doesn't know if there's one store out there or if there's sixty stores out there. It doesn't know and it doesn't care. Similarly when the store mutates all it knows is, I took data in and it was of this actions type and I fired these functions and mutate my state. I am now done, I emit change. It doesn't know whether there's one component that wants to do that or sixty, it just fires in it's change and then all of the components update themselves.

That can be as granular as every time someone hits a button into a form. That whole loop could occur and the idea being that your user interface is always a representation of your data. You don't have parts of your app that are in a different state that are holding their own state and then that state is going to be passed up to parents, which are they are going to pass it to other children. Which is if you did backbone, that's the way you do it.

Lets' take a look at that in code now. We instantiate the Flux factory. Under the hood, this is using Facebook's [00:14:00] dispatcher. Under the hood McFly is using Facebook's dispatcher and wiring up the stores and the actions and the components when you pass the mixins into the components. The RecipeStore is just data, it could be an object, it could be an array, it's typically a collection, right? It could be an object. Function addRecipes is a little utility that is going to push a new string into our Recipes array. I'm going to open this really quick and show you what this does, because it's not a whole lot, right. That's all this does. It pushes a random number into a list. That's all it does.

We use our little McFly as our Flux factory. We use the Flux factor to create a store and the store has a single method, which is getRecipes, which it's going to return to the component and it's listing for an action. Which is an action type addRecipe, and so we define that action here. RecipeActions and there's a single, there's just proxies text through and actionType is addRecipe, right. Then we're going to fire that from our RecipesController. OnChange we're going to setState to getRecipes. Here is our public getter. It is up here. It's returned from the store which is in one file. Soon this will be modularized and you'll actually have to return these things, but since this is all basically global since this is an HTML file we don't see that right now. [00:16:00]

Let's take a look at this. RecipeActions.addRecipe this is the part that I really want you to focus on now, because this will help make sense of everything you are about to see when we get into the bigger repo. When we get into the RecipesFlux repo. This is the moment when data enters the system. I find this to be a really helpful place to focus on, because the moment the data enters the system is the moment you have to start handling it right.

So button.onClick, remember when I clicked the button we're putting a random number into the list, so what's the data flow. So onClick this.addRecipe and this is in the component. This is in the Recipes component. What does addRecipe do? AddRecipe fires an action, right. RecipeActions.addRecipe so when we click the button we fire a method on the component. The component fires an action, and that action sends data. See addRecipe, it sends an id which is a random number. That's all it does.

Now we've got new data in the system. What is that action? Let's go back up to that action. The action, so now remember we've got a random number as the text, right. The random number is now going to be able find the action. The random number is going to go, first it's going to be absent as an arg, right. It's going to get assigned to text and the action is going to become two things, data and a type. The type is ADD_RECIPE and the text is just text. The text is just the data that we passed in. Now let's look at the store. In payload.actionType [00:18:00] what you pass it in, remember all the stores are listening to all of the actions. Any time an action is fired all of the stores callbacks are going to fire, and the payload is going to get passed in, and we're going to see payload.actionType, right. That's down here, that's addRecipes so it's going to return true and addRecipe it will now will call our addRecipe. That's our method that's going to mutate our store. addRecipe(payload.text) that's our random number and then we emitChange.

When we emitChange the RecipeStore.mixin is going to, getRecipes let's see, there you go so. When emitChange is fired the RecipesController is, basically the components which need to know that their stores have changed are going to update. Go back to the image. That is Flux in a nutshell. Keep in mind that was a whirlwind tour of what we talked about over a half an hour last night, but that's where we are going to spend the rest of the night. We're going to spend the rest of the night looking at that flow, a less trivial example than that one, and talking through this in depth. If that just blew past you, don't freak out, that's like the rest of the night.

How many people feel like they're with me? Phenomenal, it's going to be a great night. I didn't whether there was going to be two. I was afraid there was going to be two people and it was everyone. That's phenomenal. Obviously you guys are doing your homework. How many people got the homework? How many people reached React and Enlightenment? Nice, less but still a bunch. Okay, we're going to talk about Flux and Enlightenment tonight. [00:20:00]

Let's go thought that again on the image now. We start down here. This is where the button was clicked. When the button was clicked it fired an action. The action had data and a type. The store subscribed to that. The store updated itself and emitChange. When it emitChange the RecipesController was subscribing to the store and it then passed props down to children which updates the view.

What this means is that the store has no idea how many components are listening to it out there. It doesn't know and the components don't know how many stores need the data that it's sending, right. They are blind to each other and that keeps the circle going, right. Send data out to the store and then we send data into the components. When we send data into the components, the data passes down the entire tree of functions, we rerender the entire app which just means that we are producing another version of the DOM. Which is diffed against the previous version of the DOM, and then we only paint and repaint the parts that actually changed and that's why it's fast. That's react in a nutshell. Once again, have a good night.

Okay, let's go back to where we left off [ 00:21:14]. Let's take a moment to talk about the router, because it's super simple and we can knock that out. Let's take a look. We go down to the router. If you guys want to know where this is, you can Google react router ***LINK*********. If you Google react router you will find github documentation [ 00:21:41] with some very helpful overview documentation. I recommend you read it and we can use their docs as an example. Basically [00:22:00] you're going to define, when you define routes, sorry let me go back to mine because this is really small. When you define routes, you're going to define a root route to handle path. Then you can define any amount of nested siblings and nested siblings and children.

Here we have Recipes home, and we click back and forth between them. Notice the, let me zoom this in. Notice the change up here in the corner on the hash change. When we click Recipes home Recipes right, we change the route, we render a different component. That's really the only thing to know about react router. That's the critical thing to know. When we're rendering routes, sorry. When we are hitting different routes we are rendering different components. If you are nesting them arbitrarily deep, if you hit one that is rested arbitrarily deep it will render that one, not it's siblings, but all of its parents. Not the siblings of its parents and render what it's inside of, so you can create these nested representations of your app in the router. If you hit a nested route it will render all the components up the tree.

It's basically a representation of that tree. Otherwise it would be difficult to do things like, to say that a nav bar, and you'll see this in the full recipes repo. It's typical to say that a nav bar is across every repo, right. Sorry, every component in your full repo. That would be a huge pain. If you have ten siblings and they all need some header, then you have to find that header in all of them. With this you don't, you just basically say that it is a parent or the parent has that and then it will be rendered automatically. I'll show you what that looks like.

Actually I can right now. See how hello world on a RecipeBook [00:24:00] is rendered and how the lengths themselves are rendered. They stay even though RecipeList and Home change. Let's look at how the code corresponds to that. Let's see. Notice that we have, let's see, RecipeBook, Home and RecipeForm, RecipeList, yeah, there we go. So when we click Recipes, that's right because it's default route. Okay, so can also, how's that happening? Because it's default route. You can define a default route, and default route will, if you have a bunch of siblings then without any further data, since we matched slash, this was the one that got returned. We see Home. Home is a component. Let's go up and look it what Home does. It just renders a string. Home render, there's some welcome text. There you go, there's your welcome text.

If you click in Recipes it goes to slash Recipes. What is slash recipes? Well slash Recipes is RecipeList. Let's look at RecipeList, and they should look familiar we were just there. RecipeList is our map that's getting data. It's instantiating Recipe sub-components. Then it's putting that onto the screen, so we have different components mounting and unmounting here. Let's take a look at params. This is our last thing before we move on to the full repo, and I'll take a few questions before we do.

Now we're going to add in params. You can see here var params = state.params. You do this in router.run and then you [00:26:00] pass that into the handler in React.render. From then on you have access to the params in the tree of components, so as long as you are still passing it down in this.props.params. Let me show you up here what they looks like. See how it says RouteHandler this.props, that syntax will continue to pass your param data down. For instance if you have a splat or you have an id, you'll have access to that data down in your app. If you wanted to do something like this. If your route looked like, for instance, foo/:id and let's say it was `foo/:_id`, you would have access to something like ... Hold on let me zoom in further. You would have access to params, `params._id`, `this.props.params._id`. If you do this in your router then you have access to the id on your object down in the component.

I'll show you that extensively throughout the full repo when we get into that.

Let's see if I can log that out for you. This is going to be RecipeDetails, yeah there you go, okay. If you click on RecipeDetails ... you can see Recipes here and RecipeDetails. If I can see more then I can see the data for an individual item. I'm going to logout [00:28:00] in RecipeDetails. Let's see, RecipeDetails in the render, render so let's see, console.log, params and this.props.params.id. Yeah, so there you go. You've got, and there it is, so it was YYY was the id as you can see back in the data. Which you can get use react Router. There you go, there's `_id`.

You can use react router to get access to all of the information that is happening up in your params. Just needed to go over that with you first, because you are going to see that used extensively throughout the app. Whenever you see this.props.params know that they way that that is getting down to the component is that that starts up here in your router. It's going to be module, it's going to be in different files so it's going to be harder to find then. It's going to start in your router, then it's going to get passed down each subsequent component with a RouteHandler this.props. That's the story.

With that I'm going to take a few questions and I'm going to switch over to the full repo and we are going to dig into it. Yep.

Speaker 3:  Is there some way to represent application state [00:29:30] above and beyond object id, let's say you have a drop down open, do you have to use support query parameters or something else? [00:29:40].

Colin: Yeah, that's a great question. I'm going to get you to the place that will answer that question very thoroughly.

There's a list that shows you how to do this splat and they have documentation on how their splats work, and how, let's see. If anybody finds it do let me know. It's actually pretty important. Location, it wasn't there. Default route. Path batching guide, there it is, bam. Okay. There you go. If you go to docsguidespath-matching.markdown ***LINK******, I'm going to put this in the gitter right now. Yep, thanks. You can all take a look at that.

This will show you all of the things that you can do with react router and how you can match query params [00:31:58] params. You will have access to that [00:32:00] inside of, I think that would be inside of splat. This.props.params.splat. And you'd do star matching everything else. You can do literally whatever you want. You could put a novel in there and catch it. Others, yeah in the back.

Speaker 6:  What happened to 404 etc?

Colin: Oh to 404?

Speaker 6: Yeah.

Colin: Yeah, great question. In ReactRouter there are a couple, let's see, let's just take the base case. You can transition, so you can do transition to. Let's see, yeah here you go. If you need to do something manual, like if you get something back from your server and it's something crazy and you need to redirect to some custom page based on that, you could even have anything call of function which navigates the user and send transition to this place. Basically it's arbitrarily flexible, right. But, what is nice is that there is also a not found route. A not found route is active when the beginning of the parent's path matches the URL, but none of its siblings do. Could be found in any level of your hierarchy allowing you to have context to where not found datas.

Speaker 6:  I went there and I didn't see a ... I was confused, but then I went there and I got blank as opposed to something useful. It told me it was a real 404 [00:33:37].

Colin: Totally, totally. Yeah, anyways. Those are the two things that I'd tell you. You can do transition to if you need to do something custom you can do that from anywhere. You can add a not found route. Others, before we move on a go deep.

Speaker 7:  You mentioned you were [00:34:00] gonna go over the homework. [00:34:00]

Colin: Yeah, thank you. Cool. Before I do that, because that will actually transition me right into, that was great T-ing up the whole rest of the night. Yes?

Speaker 8: How do you to http? [00:34:13]

Colin: Good question. That's actually probably a good hour of the third we know. We're not doing any http tonight. There's no API. Long story short is that the pattern we are recommending that use, you have the store, [inaudible 00:34:45] the I module that uses super eight to talk to your server. That's the long and short of it. There's a lot there. We're going to be doing http and remote APIs next week.

Speaker 8: During route transitions [00:35:02].

Colin: During route transitions, yeah, yeah, yeah. That's a good question. [00:35:06]  I'm not sure. The route transition should happen instantaneously unless it needs to go for, you're talking about going for remote data, right? So I mean I think it's under that circumstance that you would flash it. But yes, you could flash something.

[Edit: Use state loading true, and have ]

Colin: Yeah, I will make sure we have an example of it. You're talking basically about a spinner example, right? I will make sure, I'm actually going to make a to-do right now. I will, let's see, thank you. I did, you knew that was important. [00:36:00] I will have a working spinner example, a minimalist spinner example in one of the repos for next time. Thanks, that was a great idea.

[Paula compliments Colin on having remembered to close Slack, as she accidentally messages him.] It was very responsible, wasn't it Paula.

Let's talk about the homework. The homework was 006.3 flux enlightenment, and the homework was this, to fix the form functionality. Here we go, what's wrong?

The idea is to rerender the input every time a new value comes in. The form broken was, I'm typing right now though you can't see that. You can't it because my hands are behind my laptop, and you also can't see it because there's nothing it going in.

Can someone tell me why isn't there in this, it's a controlled input right, why if you have a controlled input, what's wrong? Why can't you see what I'm typing? Yeah, go for it.

Speaker 9:  When you type you stated that it deviates from the state of the applications, so it rerenders without the text.

Colin: Yeah, absolutely. It rerenders without the text. You're setting the value of the form programmatically with value. If we look at the form broken here you will see value=, so value= empty string, and value always equals empty string because that's what the value equals. We didn't tell it anything else. We controlled the input. This is really nice. You don't have to do it this way, but if you do you can all [00:38:00] sorts of really smart in-line form validation. It's nice to do it this way. It's also more of the pattern. Even what is being typed into your form inputs are going to be data that is reflected from the store.

How many people in here know what an upsert is? Okay, all right so that's like maybe a third. Okay, so if I, and for those of you who know about an upsert, you know what I meant when I said implicitly creating a model when someone hits a form. We're going to have to probably go over that a little bit, because roughly two-thirds. Let's go over this. Let's say that a user comes to a, this is related to flux and enlightenment in the homework, form and let's say that the form is going to create a new instance, or if an instance already exists it's going to allow you to edit it. We'll uses Recipes because that's what you're about to see. If you don't have the id, if no id is returned we're just going to create an empty instance. If there is an id then it's going to populate the form fields with everything we already have.

The way that that relates to upsert is that basically an upsert says, it's an update of an insert. If it doesn't exist put it there, if it does exist then make it. Then I'm sorry, then change it, right. An update insert. It's an update or an insert [00:39:41]. Basically do the thing, make this data be there one way or the other. We are going to be following that upset pattern and I've found it very natural to do an upsert pattern with Flux because we're basically creating an empty record. The second someone hits it [00:40:00] and your editing that record all the time. You're never putting data into a react component and then just grabbing it by id and serializing it and then putting it into a model. That's not really how the whole pattern encourage you to think. Though you can actually do that with reps, it's not great.

What's better is to, the person types 'F' right. They type 'F' into or '7' or 'H' into a form field. You fire and action that says, hey input has got to be value. Then the store sees that. Says, okay the text value of my record is now this new thing that I got from the input. It emitsChange and the component, the entire app rerenders. Which is insane if you've ever done backbone, because you would never thing that way. That's the enlightenment. Why would you rerender you whole app because someone pressed 'F'. Obviously since we're diffing we're intelligently repainting, so it's okay. We're firing a whole tree of functions and that's not so bad. That's milliseconds [00:41:28], right.

Let's take a look at this. If you could all at this point go ahead and open up Recipes flux. Hopefully you've npm installed [00:41:38] all and we're not going to hit a big bottleneck. I'm going to give you a little tour of Recipes flux first. There are some anti-patterns in here that we'll talk about. This repo is not canonical [00:42:00]. There are some anti-patterns that I put in intentionally to look at. There's also some rough edges because I basically built it for this meet up. Let me spread this out a little bit.

It's going to be your command. Your command is going to be gulp dev. That's going to initiate the web pack build. If you've used require than you've used AMD. If you've used browserify [ 00:42:50] then you used common JS module. If you've used Node you've used common JS modules. Web pack is a bundler that has both. You can do AMD or common with the same bundler, which is nice. It has some other advantages too, like JSX hot loading. Let's see JSX hot loader. For those of you who don't know, who haven't seen this yet, you can do live editing in the brower. It's not a refresh, it's actually live editing the browser. Live editing without any refresh. That's super nice and if you use web pack you can do that. You should check out.[00:44:00]

This does not have that, but bonus points for a PR. If anyone PRs the hot loader to the Recipes, extra points. Everyone's got ...

Speaker 10: gulp what? [00:44:17]

Colin: What's that?

Speaker 10: [00:44:18] what was the command?

Colin: What was the command?

Speaker 11: Gulp dev.

Colin: Gulp dev. Sorry about that. Gulp dev.

Colin: This is why I said this. This is going to be a little bit more free form than the last one was, because this into the app. It's a big interconnected machine, right. I'm just going to walk you through it. I could start in a lot of different places, so if you want feel free to ask questions, but I'm going to walk you through what it does. Hit localhost:3000, that will open it up. It's almost completely un-styled because we are going to talk about how to do styles in react next week. That's what's going to pretty much blow your minds about how ridiculously powerful everything just got. If you click on Recipes, let's click on stuffed chard leaves, you can see there's a ... We'll look at the UI and then we'll look at the data. Then we will look at the build and then we'll look at the app.

Let's start with the UI. What does it do? This is still pretty raw. This is a servings thing here, but it does work. You can out in like '3' and it will change. These are actually converted to unicode. There's this NPM module called vulgarity, which you'll see. That actually take a fraction and returns the unicode symbol, so that this one-third is actually a unicode symbol. That's kind of fun. You can take a look at that code, but it will also do things like this. [00:46:00] Hold on, there you go. If you put in an odd fraction it doesn't have a unicode for it will blow up. Anyway, rough edges. You can delete them, right. We've got CRUD on the recipes themselves. Then if you refresh, it'll just come back from the data. Then you can delete ingredients. That will be, like two kittens halved and peeled [00:46:28]. Sorry okay, there you go. Then, let's see.

That is reflected in the data. You'll notice one of the things that you'll notice is that as I type this, I just hit new Recipe. So I'm going to click new recipe. We'll look at some of the mysterious functionality. I'm going to click fooRecipe, then I got back to Recipes. I didn't save anything, but it's there. I click new Recipes and I say that, [inaudible 00:47:04] and then fooIngredient onelots first. Then we go to SeattleJS [ 00:47:16] and we can see that it's there. We can edit it the same way. We can put like one thousand or one hundred or add another ingredient.

Again, just giving you a tour of what we're going to be looking at under the hood. Then we can see that that updated, but there's no saving. The reason is that this is always a reflection of the store. Everything that you are seeing is data all the time. When you see it in a form field, when you see a new Recipe, this is already data. This is the upsert logic. A record didn't exist so we created one with default data. That's why if you click newRecipe a whole bunch of times it's just going to, if that case isn't handled intentionally so you can see [00:48:00] as I keep going back and forth between newRecipes and data, you can see the upsert in action. It's just continually appending new records, right. It's creating a random GUID for each one. Now we're off the screen.

A good next step for this repo might be to handle the case where someone doesn't edit the default data. So that you know that that person hasn't taken care of that, and you're not just creating lots of records. Okay, we looked at the UI and I told you we would look at the data behind this and then the build. Let's look at the data. If you go to Recipes flux, client, and then mock db, you will see that there are lots and lots of, actually there's only seven, Recipes. Basically it's a big JSON file. This will be moved over to the server next time, next meet up. We will do this over in API. For now, the store is requiring this directly. Each one has a GUI. That's important because we are going to be using that throughout the app to edit and to delete Recipes, it's title, portions, TimeInMinutes. Then this is also the important part to know about the structure of the data, is that we have an array of ingredients that ingredients itself is a collection.

I was working with this example, but one of the things that really bothers me todo MVC is it doesn't have, it has collection rendering, but really where everything blows up ... You can do collection, you can do product collections in backbone and it doesn't really show how absolutely ugly it is, and I say that lovingly. It is a catastrophe once you're in to, the full catastrophe of backbone is apparent once you're into nested collection CRUD. The delete on nested collections is just really like this is all over the place. I think this example isn't nested collection [00:50:00] CRUD and that's what you're seeing. We have collections of recipes and every recipe has a collection of ingredients and that's what we're going to be working with, both in form data, creation and deletion, all the rest of it.

We could have modularized this more on the data side. We could have made a store for ingredients as well. I think there could be some really compelling reasons to do that. We didn't to keep it simple, it's just a single store. Let's go from the data now. We've looked at this, we see there's nested collections. We're going to go to the build and then we are going to start with the router. Okay, so the build what are we doing? Basically this is, have you've used gulp [00:50:45] before? Oh man, it's so nice. All right. How many people in here have never used a build system before in job descript? Cool, okay welcome.

This basically just starting a little server. The only really interesting thing in here that would be different from other projects that you may have seen is that if you haven't used webpack. This webpack.com thing and buildCfg and buildDevCfg are getting passed into a gulp task. You can see your required webpack here. This is not a gulp webpack task, it's just a different build system. You've got some JSON config in webpack, and your requiring webpack plugins and things like that. I'm not going to teach you webpack, except to say that you should use it. There's plenty of tutorials online for that. It's pretty defined problem, not so systemic. Then webpack is going to build using the Config. You can take a look at that later on your own if you want. Something to reference while you're doing your own build, just so you that basically a functionally [00:52:00] gulp is consuming the config which is over here. That's the only thing I wanted to point out.

Next, let's look at the router. That will give us the structure of our app. Now this router is a bit more complicated then our trivial example, but it's still not that bad. Once again, notice that you have a name, so like nameRecipes on line twenty here, there's no path. If there is no path specified, path takes name. That it will just inherent from that. Obviously that's not really feasible with line 21 because we need to take in some information from the params. Then the handler is the component that is going to be returned. Remember you're still requiring a tree of functions, and would be nested. Rather than nesting in the ... Sorry, give me ten seconds to think of a really elegant way to say this. Okay.  

Back in the very early example of reacts flux concepts, we saw nesting like this. We nested components inside of other components. That is still what you're going to do, unless [00:54:00] one of these is a route. If it's a route, then you are not nesting it manually like this inside of another component. You're nesting it inside of the router here, and I'll give you a good example. Let's see, so recipe, oh. I drew a picture for this. Isn't it perfectly clear? Sorry. Let's take the simple ones first, because the simple ones are basically everything except the nesting crud. That's simple, right? This is also basically the routes, right? The top level ones here are the routes. The places that you can go to are home Recipes. Home just says, hey you're home. Let's look at these side by side.

***IMAGE***

You go home. It says home rendered. You go to Recipes, you see a list of all the recipes. You go to new Recipes, that's slash create, and you go to this and it's Recipe, which shows you the detail for that individual Recipe. Let's look at this tree. This is a tree of all the components, and okay. Home, no children, Recipes, it's just a list. A list of the Recipes, no children, right? NotFound, obviously no children. RecipeDetails does have a child component, because when you're rendering a Recipe, unlike the RecipesList which doesn't render a component, you do have render the sub-component of the ingredient. Each Recipe in RecipeDetails has ingredients. That is also [00:56:00] a pretty trivial view.

Obviously the view that is not trivial is, and let me actually get all of this stuff out of the way. I made two of these. The view that is not trivial is RecipeForm. RecipeForm is actually, it's going to do a whole bunch of things. RecipeForm has the following functionality, and I'm going to when the, this is pretty much all still background to show you what is happening with flux. Within fifteen minutes or so we should have a full circuit of this app explained. Then you will be diving in and doing hands on stuff for the rest of the night. Sorry for the lengthy explanation, but there is a lot here.

We have a button, and the button is added ingredient. The RecipeForm feature has basically three sections. One section is the addIngredient section. One is the, I'm going to show you this in the actual app, this is the RecipeForm. Let's look at the Recipe, so this is it. The first, oh you know what? Okay, I'm going to point at things. This, no other way. No, no, no. Okay. There we go. All right. That is one level, these guys are another level, and this is, these are all sections, right. These are all sections of this component. Only the RecipeForm as a whole gets a route. Like this button does not need its own route. It is nested inside of the component, [00:58:00] just plainly nested. Does that make sense? Yeah, good. I got a lot of nods.

We just nest this component inside of its parent, but if it gets a route then you don't want to just nest it inside another component because it's going to be matched. You put that in a router, and I'll walk you through this again at the end.

Basically this is a section, Brown Rice and the other ingredient, the new empty ingredient. This is a section of the app. This is out ingredients collection. This up here, if you look at the data, that's that first section of the data. It's the title, the portions, the totalTimeInMinutes, and the instructions. Those just happen once. That's not a collection. That's just four things and they are actually explicit. They're still form field. That's it, that's our three sections.

Let's go back to our drawing and look at those three sections. There's your button, right. Section one, let me actually bring that back. Add another ingredient is, there you go, button add and ingredient, that's the first section. The second section is IngredientFormInput which has four inputs, that's this top part here. Then the last section here is, and by the way this is actually a representation of the files. This is what files, and I'm going to out this, I'm going to don this right now. Sorry, I should have done this at the beginning. I'm going to share this through gitter, so incoming. Let's see, and [01:00:00] okay there you go. Now you can click into those if you'd like to. Nice, okay.

The one that has all of them, this is actually a representation of the app. Has anyone used lab view?

Students: Yes [01:00:25]

Colin: yeah, yeah. I was actually thinking because we have the guarantee now that you are working with a tree, you can basically make visual app editor. We're almost to the dream of the '90s. We're closer now than ever really. Anyway, it's my dream still. I won't impose it on you. Visual app editor, okay, I'm going to. The first step would be just print it out, right. Like log out, visualize the whole app. Someone has got to do this. Visualize the app, and just spit out the tree of components and all of the children, and the next is a delete or a read. It's just interacts with your files and you can build it in Node. This just totally has to exist. We're pretty much there now. Okay.

Anyway, this our IngredientForm, each button, each on of the has to be deleted. Each row, like each total ingredient can be deleted, but then each ingredient also have four inputs for the four different aspects of the data. Now, if this were prettier it would be easier to see, but they are all switched together because there is no CSS. Each on of these has an input, which is it's own component.

Let's take a look at how we're moving data through the system. Now this is where is starts to get complicated. That was the simple part, right? Okay. All right. Let me close these out. [01:02:00] all right. Okay. Let's start with the smallest input we can. Let's start at the bottom. Let's look at input. What does input do? Input is blind. It is totally blind, and you can tell that it's totally blind because it takes ... Everything you are seeing in this input is props, right. The input takes in a callback and the input takes in lots of props from the component. Someone else is managing state for this component. If it weren't then it wouldn't be reusable, so that is why we can use the input component here and here and the input component here.

We have completely different values that are getting passed in, but the component still functions the same way. It takes in a callback and handleInputChange fires a function that its parent passes into it, and it takes in a id that its parent send to it, and it takes in a value that its parent send to it.

This is really the homework. What you weren't seeing in the homework was this flow where the value is this.props.value. The input value is being passed down to it from the parent and it's firing an inputCallback. Let's look at something that is actually firing this, so ingredientForm is firing this. Let's see, if we instantiated an input, of it's IngredientFormInput, okay. There you go. [01:04:00]

When we instantiate the input, we're passing props to it and we're this.handleChange. Well what is the inputCallback that we are looking at, this callback that the input is going to fire when it changes. Because remember anytime the input changes, this is like someone types a single character into it, it fires this. On change the input is going to what? The input is going to fire this.handleChange. What's that do? It fires an action, and there we are. That's the pattern in effect. When the input changes at anytime it fires an action that says, hey here's your data, hey here's your data, hey here's your data, hey here's your data, and the store or any number or store update themselves. Once they do they say emitChange, they get new props and then how does the input know what the value is? Because it's setting the value of itself to this.props.value. Where's that coming from? Well, let's look.

Value is value, which is coming from props, and if we go up the chain once more we can see, let's see, IngredientRecipeForm. If we go up the chain enough we get to out upsert. So go ahead and go to RecipeForm. Basically if you look at getInitialState, we're setting states either if we have an id, we set it to the id. If we don't have an id, then we implicitly create a new Recipe and that right there, that's the upsert. That allows us to be editing a new entry even if [01:06:00] the person just clicked new, we're still editing data. Here's what we're not doing, we're not waiting for the user to put a bunch of stuff into a form, and then grab the form elements by id with jQuery, put it into an object and then send that somewhere. Which is what's normal. We're holding that intermediary state. I'm going to pause here and take maybe three or four questions, and then we'll continue. We'll go forth.

Speaker 13: You choose to, every time the input is made through it should have a function that goes to the parent. The parent-

Colin: It doesn't go to its parent. It was passed down from the parent in props and it fires that function, yeah.

Speaker 13: Right, so the [inaudible 01:06:40].

Colin: Yeah.

Speaker 13: Why choose this over [inaudible 01:06:45].

Colin: Good question, because the input would be less reusable. You're passing data down to the input. If you want to reuse that input everywhere, then the more that it's blind the implementation details of its parent, the more reusable that component is. Componentization [01:07:08] in a word. Yeah, in the back.

Speaker 14: Oh yeah, right [01:07:15] how do you know to use this.props.value [01:07:16]

Colin: What are we using? This.props.state, is there state in there [01:07:22]

Speaker 14: [inaudible 01:07:23]

Colin: Oh yeah, right. Okay. Great question.

Speaker 15: Can you repeat the question?

Colin: Yeah, I will repeat the question. Absolutely. So the question is, why on earth when you do handleInputChange, so this.props.value is what came in for the parent, but this is the function that is firing the action. The parent is going to determine which actions. Actually the parent determines what happens in that function because the parent is passing that function down, right. handleInput is [01:08:00] getting passed down to it. What this is actually doing is it's, you can see ref = inputValue, that's right here. A ref works like this. A ref is like, well literally here's what it's doing, it's getting a reference to the actual dom node. That's what's actually touching the DOM and getting the data out. Where you can't do that because you're ... what's that?

Speaker 15: I think it requires [01:08:30] value [01:08:31].

Colin: Return, hold on. We're up here, there's two places. Value down here is what's getting rendered. That's what's going to be on screen, but up here in handleInputChange it's this.refs.inputvalue.getDOMNode.value because you are pulling the letters out of the DOM out of the actual input. Does that make sense or does that not answer your question?

Speaker 15: It makes sense, but when I was typing it worked [01:09:02].

Colin: What worked?

Speaker 15: Instead of saying this.refs, I said this.props  [01:09:09]

Colin: Oh, it worked. Hold on.
Colin: Did you save?
Colin: I would bet you that wouldn't work.

Speaker 15: Maybe I didn't [01:09:19]

Colin: That's okay. I think we probably learned something. All right, others? Yeah.

Speaker 16: So, [inaudible 01:09:30] if you're passing [inaudible 01:09:32]

Colin: Yep.

Speaker 16: [inaudible 01:09:38]

Colin: ingredientFormInput?

Speaker 16: [inaudible 01:09:42]

Colin: Yep.

Speaker 16: [inaudible 01:09:44] change over there. You're completing the value again [inaudible 01:09:50]

Colin: Yep.

Speaker 16: [inaudible 01:09:52]

Colin: Yep, so handle change actually take arg [01:10:00]

Speaker 17: I have a question about the [inaudible 01:10:18] thing.

Colin: Yep.

Speaker 17: Is it preferable to go and get the DOM node [01:10:24] taking [inaudible 01:10:26] object that comes in. Just grabbing the.

Colin: Say that one more time.

Speaker 17: The manual input [inaudible 01:10:32].

Colin: Let's get there first. Yep. So here?

Speaker 17: [inaudible 01:10:36] input change. [inaudible 01:10:38] the actual [inaudible 01:10:39] we pass [inaudible 01:10:42].

Colin: Like on change?

Speaker 17: Yeah.

Colin: Okay.

Speaker 17: Those actually have the text on it. Is it preferable to go back to DOM and get Node for some reason or [inaudible 01:10:53].

Colin: That would be even more generalizeable , wouldn't it? I think.

Speaker 17: [inaudible 01:11:01]

Colin: Yeah, yeah. Yep. If you can do that I think it would be more generalizeable. I'm not sure that would work in very circumstance, but if you could yep.

Speaker 17: It worked in this one [inaudible 01:11:10].

Colin: Cool. Others? Yep.

Speaker 18: Do you prefer to pass these callbacks as props or have you ever used the context to delegate a callback?

Colin: Props.

Speaker 18: Props.

Colin: Mm-hmm (affirmative). Yep. Others? Yeah.

Speaker 19: is it possible to pass custom props to RecipeForm

Colin: That's a great question. We're in righter right?

Speaker 19: Yeah.

Colin: On we're on line maybe nineteen.

Speaker 19: Yeah.

Colin: Let's actually take move that isn't default route. Let's take a complicated one. Let's take this one.

Speaker 19: Yeah.

Colin: Is it possible to pass custom, what was this?

Speaker 19: Custom props. [01:12:00]

Colin: Custom props.

Speaker 19: [inaudible 01:12:03]

Colin: Yeah, it is. Yes, yes it is. That's a great question. It's a really really good question and I'm going to show you how to do it right now. The question is, can you pass custom props to the RecipeFormHandler, what's going on there. Here's how you do it. App, check this out, so RouteHandler. This is above it's child, right. If you want something custom you can do foo="bar" right there. That will be available in the children. You can pass it ...

Speaker 19: [inaudible 01:12:43]

Colin: It'll be available as this.props.params.foo or this.props.foo. You'll have to check me. It's going to get fired down the chain.

Speaker 19: [inaudible 01:12:55]

Colin: I don't know about that. I don't think so. If you're all siblings then you have the same parent RouteHandler and I don't know that you do it for just one of them. But you can get it to all of them. David, are you in the room? Yeah. Do you know about that? Is there a way to use RouteHandler to target one of the siblings rather than all of them? If you want to pass custom props down, I don't think you can.

Speaker 20: What do you think its target was [inaudible 01:13:31].

Colin: What's that?

Speaker 20: [inaudible 01:13:34]

David:  What do you mean by target [inaudible 01:13:37]

Colin: Yeah, run up for a second if you want. Hey Dan, can you hand David a mic?

Speaker 20: I was just ...

Colin: Just yell, just yell.

Speaker 20: [inaudible 01:13:48]

Colin: No worries, no worries. So, they question was basically, if you're in-

David: [inaudible 01:13:52] I can show you here.

Colin: That's right, that's right. I'm just like you need to come over here and look at my computer... David... Why are you staying over there? [01:14:00] The router, let's say that you wanted to pass custom props, right, to one of the siblings, right. You would do that this.props. You could do that here.

David:  It would be available in its children.

Colin: Would it-

David:  You could just keep doing that, because let's say RecipeDetails is going to have, let's say RecipeForm, is maybe going to have a RouteHandler and just keep passing it down.

Colin: You're going to keep passing it down, keep passing it down, but what about if you only wanted to target one of the children of all the siblings, I don't think you can do that, can you? Like only one of these siblings out of the box, I don't think you can.

David:  From the parent?

Colin: Yeah, nope. You're just going to pass it down to all the children, right?

David:  [inaudible 01:14:55]

Colin: Because it's actually a more general question. Like if you wanted to pass props down just to child components.

David:  You can do it if you are instantiating each one of them in the component manually. Then you have control over the instantiation button.

Speaker 20: [inaudible 01:15:12].

Colin: Right. Yeah exactly. But you are abstracting that with react router. Have you used react router yet? You haven't yet, okay. [inaudible 01:15:23] it's all good.

Speaker 20: [inaudible 01:15:25]

Colin: Okay.

Speaker 20: [inaudible 01:15:30]

Colin: No.

Speaker 22: So, [inaudible 01:15:43]

Colin: Correct.

Speaker 22: [inaudible 01:15:55]

Colin: It's firing action that-

Speaker 22: [inaudible 01:15:57] [01:16:00]

Colin: Yeah, he was asking that. I'm not sure why that works. It's a great question I'm sure that I wrote that at 3 AM and it worked. I actually have to look at that again now. Yeah, I'm pretty sure he's right that I shouldn't be doing that, and I need to look at that again. Yes, thank you. I think actually what you should do if you are interested in that is you should console.log inside of that function and see what this.props is and see if this.props is the child element is the input or if it's the parent.

Speaker 22: [inaudible 01:16:35]

Colin: What is this? It might be the this of the child, and if that's true, that's why I did that a 3 AM. If it's not then I have no idea why it works. Are there others before we keep going? These are great questions, really really great questions. Yeah.

Speaker 23: Is there any danger to always passing dot dot dot this props

Colin: Yeah, you could do that all the time couldn't you? Then everyone would know about everything. I guess, no. If you want to be able to console.log out this.props and know what that component should have I think it would be more useful certainly to have intentionally only pass down really what the component needs. Yeah, you could use the [inaudible 01:17:24] spread to paint it on every component everywhere.

Speaker 23: [inaudible 01:17:28]

Colin: Yeah.

Speaker 23: [inaudible 01:17:30]

Colin: I just imagine for a huge app, that would be a lot of ... You would be passing a lot of JSON [01:17:37] down. Anyway, for what it's worth. Okay, so we're almost to the point ... We're pretty much to the point now where we're going to look at where that action went. Then I'm going to turn it back to you guys and we're going to spend the last forty or thirty-five minutes implementing a little feature. One more question before moving on. Did I see a hand? [01:18:00]

Let's look at where this actions goes. We fire an action from RecipeActions and RecipeActions is going to trigger an inputChange. Let's go look at RecipeActions. There are a whole bunch of different actions here. One of them is INPUT_CHANGED, and INPUT_CHANGED is just going to, once again, take whatever data we out in which is that object. It's going to pass it through, and with this type. Now let's look at store, and the store is listening for that type. It's like, okay there's an INPUT_CHANGED. So what's it going to do? It's going to say, okay RecipeStore which is basically like this, .updateRecipe and it's going to pass in the data. Once again, proxying that through.

It's unpacking it, right. It's saying `payload.data._id`. It's basically proxying it through and unpacking it a little bit. Once updateRecipe changes, then RecipeStore.emitChange is going to fire and that's going to let the components know, hey there's new data. They're like, oh I get new props and then they rerender. That's the loop. Once again, that's the whole loop. Something changed in the user input, a change was fired with data, the data went into the store, the store said, oh I know that action type here is the function that I fire when inputChange I call updateRecipe when the input changes. This should really be less general than inputChange, it should be RecipeInputChange. No, actually seriously that should be more general. INPUT_CHANGED is not general enough. It should be RecipeInputChange, but it's not.

UpdateRecipe fires and that goes up here, which is updatRecipe. Let's see, here you go. Which [01:20:00] goes and gets a Recipe, and it either digs into the object and changes the value. Once it's done, it says, okay I'm done. At that point, it does emitChange. EmitChange is, if you go back to the picture, that last loop here. Then the components subscribe. Typically ControllerViews subscribe, right. Most of the components in your app are not going to be subscribing to the store. They're just going to take props in whenever they get it. How the components know to update is they are subscribing to the store. We're using McFly because Mcfly makes that easy. It just automatically handles those subscriptions under the hood. Yeah, go ahead.

Speaker:  So is relay going to be part of how that data bubbles from the ViewController down and back?

Colin: That's a great question. I have a guess, and I wasn't ... Who saw Relay? Who knows Relay from the React conference? Okay, so let me recap the question. So relay is how Facebook is using react. It basically replaces Flux, and it think it is very likely that Mere Mortals [01:21:38] will not be using it anytime soon at all. That was my initial assumption from seeing it and that is definitely, definitely further confirmed by talking to Facebook people. It does seem like they want it to be really general and they are going to release it. It's basically ORMish [01:21:55]. Basically here's what the component does, the component has a shape of JSON, it's got. [01:22:00] It's like, here's what I need, the component then sens that shape to the server. The server receives that and is like, okay, and constructs that behind the scenes and then gives it back.

That's really sweet, but if you have tons of really smart backend people to make that fast, but that's really ORMish and making that work for any data shape is not quick. I don't think that's a simple problem for lots of people. That was initial assumption watching [inaudible 01:22:23] and I think that and talking to Facebookers, I think even more so. I don't have high hopes for Relay in the short-term. I think people should dig into flux and just get in the pattern and probably roll their own flux implementation. I think right now pretty much everybody should be rolling their own flux implementation working from dispatcher, because there's nothing to it. You can do it in a couple hours and then you really understand it from the bottom up. Everyone is going to have different opinions. There's a fly, also.

I encourage people especially, Facebook hasn't really said anything yet, so I don't know. I anticipate that it's going to be a really long time before they release it. I might be wrong, but I think there's some big problems. Anyway. Really quick, yes.

Speaker 8:  [inaudible 01:23:08]

Colin: Next week, yes. This week is just one score. At this point, what I'm going to do is I'm going to take questions about the data flow, and I'm going to let you guys move on to your assignment. What I'd like you to do is pair up in two's. Pretty much no more than two. If you have to do three, do three, but two is really good. What I'd like you to do is, I would like you to implement a new feature that completes the loop. These is the suggested feature, you may deviate with your partner if you would like. Here is the one that I think would be good, new route, new view and it's a series of dates, each date can have a Recipe. So you're planning a week. You have, maybe it's like seven days you can structure. It could be like, let's say [01:24:00] seven days, each day can have a Recipe. You can select a Recipe for a day, and then they are all aware of each other so that when you select one Recipe from a list then it's not available for the others, something like that.

If you're good with this, which I think a lot of you are already, that's probably like a half an hour thing. If you have no idea how to get started with that, then I'm just going to keep talking through it and ask me questions. How many people feel like they're most of the way there to feeling like they could probably do that? Yeah. We've got like over half the room, so that's good.

Let's walk though real quick in the abstract how you approach this problem. The first thing I would do is create a new component, and I would call it Date Picker. Let's say we have new component which is called Date Picker, and we're going to subscribe that to a store. You can create a new store, and the store would be a date store. There's some flexibility in how you structure that. You'll have a new actions and it will be date actions, and it will be like date selected or date removed or things like that. You can do the same kind of crud on a date that you can do on a Recipe. You can add a Recipe to a date. There are exactly seven recipes in there. You can plan a week of meals.

What you will want to do in the router is just add a new route that's like slash date picker. Then just display that and you can use, it has bootstrap already, so you can just add bootstrap drop down if you want. Or just make it enter work from an id or something right now. [01:26:00] That's if you're feeling really good and you feel like you could just dive in right now, then feel free to grab a partner and try it, go for it. If you're not then let's just start asking questions. I will be up here talking, so this is now permission to ignore me if you want to with your partner. If you want to keep listening, what I'm going to do next, and that's optional right now.

You can either just go into your own world and try to make that happen, or you can keep listening to me and I'm going to walk you through how I implemented all of the ingredientForm stuff. We'll take a two minute break for you guys to get started and then we'll dive back in. Thanks for listening. Great first hour and a half, that was intense. Yes.

Colin: Check, check, check, check, okay I'm back on. Okay that was a few minutes. Everyone got pizza and got [inaudible 01:27:04] again. How many people are diving into the feature? How many people are diving into work? Good. Okay that's a really good ... How many people are interested in my just continuing talking about this? Okay, cool. That's pretty small. All right. I'm going to talk through some more of the example, and we'll just keep looking at it.

For those of you who are watching and ... Angela, you look really happy. Did you get something?

Angela: Duke just won. Sorry.

Colin: It's all good. I was curious, I was like man she looks way happier than...

Let's talk about [01:28:00] the flow again for those of you who are listening. We're going to start with RecipeForm, and RecipeForm is this, let's look here, complex feature that you can add an ingredients and each ingredient can be deleted. The ingredientForm actually has four sub-inputs for the ingredient itself, the amount, the quantity, like teaspoon, and the modifier, like chopped or fresh, things like that. The ingredientForm input is actually called directly as well because there are four singleton pieces of data in the [inaudible 01:28:58] we're working with. Here we go, title, portions, and totalTimeInMinutes is going to happen from the top leverl view. That's like you can see here it is, RecipeForm. Yeah, here you go.

Each one of these ingredientForm inputs is instantiated directly with the label placeholder, value and it's, let's see. These are instantiated directly, whereas the ingredientFormNodes, let's look at how those are instantiated. ingredientFormNodes is a map over this.state.ingredients, so we grab the ingredients from either from the recipeStore. [01:30:00] This is a public getter on the RecipeStore, right here, we're going to go out and get it and then bring it back. Let's see, RecipeStore.getRecipes just returns this.Recipes. That's the public getter is just give me everything in the underscore Recipes and the private store variable. There were a bunch of people over here who raised a hand, so can I take questions from people over her just generally on stuff tonight, anything. Yeah.

Speaker 26: What about the style stuff [inaudible 01:30:50]

Colin: The style stuff is next time. That's related to ... I'll give you guys a brief preview of what will be mind blowing next week. It's this. I'll say nothing more. I'll tell you I don't think anyone is every going back, but it's pretty big. Style is next week and it's going to be pretty good. Other over here? Okay, so we're going to give everybody about ten fifteen minutes here and ten to fifteen minutes of digging in. Then we'll come back together and I'll answer a whole other round of questions of challenges you ran into. Go ahead and we'll get back together around 8:50. [01:32:00]

Okay, so as you may have guess this is homework. I'm happy to go over this with you guys at [inaudible 01:32:10] office next Tuesday if you are in the middle of working on it. This is a great goal to accomplish for the next one. I will say, this is the goal. When you come in next time, you will have created a new store, new actions for that store and new components with child components that take data from the store. You can follow the pattern of the other inputs. That's got to be the next way point. You can do that with date or if you get clever and have an idea you can do that with something else. We'll go over a couple of them next time. Next time we are going to be fast and furious. We're going to be doing API.

I showed you just briefly, but this like ... Be here next time it's going to be super fun. It's going to be super fun. The last thing that we'll do, and it will just take, I'll take any questions that you have about the homework, about this uni-directional data flow. Which is different from backbone. Ways in which you are approaching the homework and try to answer those before we take off. Anyone want to start? Or you're all good. Yeah, go ahead.

Colin: Oh. Yes. I'm going to point you to a few places. Look at this guy, React Tween State, and look at him on twitter. Everything he is doing, at Facebook. He's really really bright. Cheng Lou I think his name is. He's building tween state. This is still pretty early. There's also a reacts animations, a data visualization. Oh, Awesome React, this is a great community resource in general. Animation, yeah there's not ... You can see React Animation, State Animation, React Animation, so there's not, there's only three in all of Awesome React. There's only three [inaudible 01:35:40] for animation. It's really early days. Of course you can still use CSS, just put it in a style sheet like you would normally. Put a class on an element. Anything else that, go ahead.

Speaker 30: Isomorphic? [01:35:54].

Colin: Yes, we are going to talk about isomorphic [ 01:35:53] next time. We're going to talk about API and isomorphic. [Edit: We ...didn't end up talking about it. There are too many unsolved problems, just like with flow. They need more time in the oven.] [01:36:00] that's actually pretty much it. It's going to be CSS, how to do styles and APIs. That's going to be a lot. In the contents of talking about API we're going to be talking about isomorphic. Thank you everyone. We'll call it a night. Thanks so much for your attention. Everybody was great. Thank you.
