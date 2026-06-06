---
title: UC Berkeley CS61A SICP Python Transcripts
layout: print
categories: Texts
subclass: Programming
---

## 1. Part p01 - Lecture 1 - Welcome

Hi, folks. My name is John DeNero. I'm teaching one of the two offerings of 61A, along with Professor Rao, teaching the other one. But we want to stay closely synchronized. We're using the same assignments. We'll have the same exams. And so we want to make sure that you hear the same thing in lecture as well. The way we're going to do that is by releasing lecture videos, like this one, which will be shared across the two offerings of the course.

And then in live lecture, each of us is going to explore a little bit more deeply some examples and talk about what you should think about when you're solving problems. But really, the core content from lecture is going to come through these videos, which will cover all of the material that you need to know for the course. You're meant to watch these videos before coming to live lecture. Now, obviously, for this first lecture, it doesn't matter because we're just getting started. But in the future, just watch the video, then come to lecture, and you'll be all set to keep up with the course.

The videos for each day are a playlist on YouTube. The first video will be some announcements, kind of like this one. And then the rest of them will go into the content of the course. Each video tends to be pretty short, five or ten minutes. But sometimes there are several of them for a day's lecture. And you'll notice that they weren't all recorded this year. Instead, they've been recorded in the past. And every time we update the content of the course, then I re-record some of the videos. So if you notice me looking younger in some of the videos that I am now, well, that's why. Today, there's only one content video that will follow this one in the playlist. And then in the future, there will be four or five, typically. I hope you enjoy the course.

And I think that even though we have two offerings instead of one, that really just means there's twice as many faculty involved. And that should give you a good experience for the semester. Okay, on to course content. We're going to talk about expressions. An expression describes a computation and evaluates to a value. Now, expressions are not something particular to computer science. Mathematicians have been describing how to compose different numbers together for a long time. They invented lots of different ways of describing computations using an expressions. In order to add two numbers together, you express that by adding this plus sign in between two numbers. Division is completely different. You put one number over the other.

In order to express a square root, you put a number in a little house. To take the sign of an angle, you write sin. Not sign. Sign takes too long to write. Just sin. And there are all these other ways of expressing how to combine together different values. It turns out that one of these is a generalization over all of the others, and it's all we need. And that's function call notation, f of x, or f of x comma y, etc.

So, as computer scientists, instead of expressing computation using all of these different forms with the subscripts and the superscripts and the vertical bars, we'll just write down everything using function call notation. Okay, so here's my claim is that all expressions can use function call notation. And for that, I'll just fire up Python and show you. I start Python by typing Python 3, which gives me a very recent version of the programming language interpreter. Now, an interpreter provides a prompt where it waits for me to type an expression and then displays its value. So, the expression that I type here, 2000 plus 15, now includes two different values combined together by addition. And the value that's displayed is what I get by adding these two numbers together. And Python is quite a powerful calculator. I can multiply multiple numbers together. I can even nest things with parentheses. I can divide. There's special notation for raising something to the third power if I want to add stuff together at the end. It's just going to compute that for me very quickly. This is an expression. This is its value.

Okay, what about call expressions? Well, call expressions have a special form where you name a function that you want to call, in this case the max function, and then you write down expressions that give you the values to which max will be applied. What's the max of two and four? It's four. What's the min of negative two and 50,500? Let's not get crazy. Okay, so negative two. So, these are called call expressions. When you see some function and then some parentheses, and you see these other expressions separated by commas, that is a call expression. Now, I claimed that everything could be expressed using a call expression.

That's including multiplication and division and addition, etc. So, in addition to the plus, which is used between two expressions to add them together, there's also a function called add. Add. Now, it's not available all the time. I have to write this import statement in order to get access to add and mul. That's only a minor inconvenience. I just do it once and now I can add together two and three using a call expression. I can multiply together two and three in order to get six.

Now, call expressions are really wonderful things. For instance, they can combine multiple values together just by using lots of commas. What's the max of one, two, three, four, and five? Well, that's five. They can also be nested within one another. I can multiply the result of adding four and six. Okay, I've added two to what I get by multiplying four and six, but I said I was going to multiply that by something. Well, how about the result of adding three and five? And that gives me 208.

Now, in call expressions, you don't need to memorize the order of operations. Just the nesting structure of the expression itself tells you exactly what gets multiplied before it gets added. So you have to multiply four and six in order to add it to two. Life is not so simple when you use these infix operators between different values because you have to know that multiplication comes before addition in order to understand how the expression gets evaluated. So we're very pro-call expression in this course. We want to understand exactly how it works. So first, let's talk about the structure or anatomy of a call expression.

There are always parentheses. The whole thing is a call expression which has within it other expressions. Everything that comes before the opening parenthesis is called the operator sub-expression. And by sub-expression, I just mean it's an expression within an expression. The operands are separated by commas within parentheses. Operators and operands are also expressions. Now, these are very simple expressions. The number two, the number three, and the name add.

They evaluate to values. The number two, the number three, the function that adds two numbers together. The way in which call expressions are evaluated is always the same. It's an evaluation procedure. Now, the way that programming languages work is that they interpret your expressions by applying evaluation procedures. And they just apply those same procedures over and over again procedurally. The one for call expressions goes like this. You evaluate the operator and then the operand sub-expressions in that order.

Then, you get a function from the operator and arguments from the operands. So, first you evaluate all the sub-expressions and then you apply a function. All that in order to add two and three together. Well, the reason why we go through this in such detail is to observe that the same evaluation procedure can be used many times over in order to evaluate much more complicated nested expressions.

So, here's that nested call expression that we tried before in the interpreter. Now, Python just said 208, like magic. It evaluated the whole thing. Well, how did it do it? It just applied that evaluation procedure. It said, oh, this is a call expression. I see parentheses. Therefore, I must evaluate the operator. That's the function that multiplies. I must evaluate the first operand, which is another call expression. And so, it applies the same procedure again.

The same procedure says, I'm going to evaluate the operator. That's the add function. I'm going to evaluate the operand two, which is just the number two. Then, I'll evaluate mul four six, which is another call expression. Fortunately, I have a procedure for evaluating call expressions. It goes like this. I evaluate the operator and operand sub-expressions to get the function that multiplies the number four and the number six. Since I now have all of the operands evaluated, I can apply multiply to four and six to get 24. This is the value of that expression.

Now, I've actually evaluated all of the operands from this sub-expression, which means I can apply the function add to two and four in order to get 26. So far, I've evaluated one operand. I've evaluated the operator, but I still need to evaluate the last operand before I get to multiply anything. That means I have to figure out what add three, five is. That's another call expression. I find the operand and operators evaluate to the add function three and five. Adding three and five gives me eight. Multiplying 26 times eight gives me 208. This diagram is called an expression tree. It's an illustration of everything that happens within the computer as it evaluates this nested call expression.

So the important thing to observe here is that the order in which the expression is evaluated provides the right information at the right time. You have to have figured out that this thing is equal to 26 before, and this thing's equal to eight before you know what to multiply together in order to finish the computation. It's also just an illustration of the same process being applied over and over again. The procedure for evaluating call expressions. So this whole thing is an expression tree. That's called an operand sub-expression. This is the value of that very sub-expression. So I just copied this thing down here, and then I went through the procedure to compute its value 26. This is also the first argument to the mul. An argument is always a value, and this value 26 is multiplied by 8 to give me 208, the value of the whole expression.

## 2. Part p02 - Lecture 2 - Functions

These are the videos for 61A Lecture Number 2. You're meant to watch them before coming to Lecture 2 so that you're ready to learn about these topics in more detail when you arrive in lecture. But before we dive in, I have some announcements. Homework 1 will be posted sometime this Friday, the 25th of August, and it'll be due next Thursday. And the reason that we have homework early is so that you can get started learning.

Practicing using what you learn in lecture to solve problems is really the heart of this course, and so you might as well get some practice as soon as possible. I recommend taking a look at the homework when it's released and trying to solve what you can. If you get stuck, that's okay, and in fact, that's quite normal. You can come in next week and get some drop-in help in office hours, or you can post on Ed, and we'll try to help you there.

Or you can form a study group and work with friends to talk about the problems. But all of that stuff takes time, so the earlier you start, the more time you have before the deadline, and the better job you're doing keeping up with the course. Today we're going to talk about names and how they work. So let me show you a quick demonstration to get us started.

I'll start up Python. If I ever press Control-L, it clears the screen, but I'm still in the same Python session. Now, I showed you last time that Python can be used as a calculator. That means it should know about important constants, like pi. Oh, name pi is not defined. Well, it's not that Python has no idea what pi is. It's just that most names aren't available unless you import them.

From math, import pi is a statement that says make the name pi available. And now it is. I can use it in combination with other values however I want. An import statement can also be used in order to get access to other functions, such as the sine function. So sine is a built-in function that takes the sine of an angle. So if I take the sine of pi over 2, I get 1.

Oh, it works. Now, these are built-in functions and built-in names. I didn't say what pi was. I just looked it up. But I can define my own names using an assignment statement. An assignment statement has a name on the left-hand side. It can be any name that you invent. On the right-hand side, you put any expression that you want. And Python will evaluate that expression and bind it to the name.

So now radius is bound to the value 10. 2 times radius is 20. I can use that name when I bind other names to other values. And in fact, it's possible to bind multiple names to values in one single statement. So if I say the area and circumference of a circle are pi times the radius, times the radius, and 2 times pi times the radius, respectively.

Now I've defined the area and the circumference of a circle with radius 10. Now what happens is that these names are bound to these values. They don't actually remember where those values came from. So if I change radius to 20 and I check the area, the area is still 314, 10 times 10 times pi. So these things are out of sync. And that's how assignment works.

We are evaluating this expression to get a single value, 314. And that's what gets bound to area. It doesn't remember that area was once defined in terms of a radius. Assignment statements can also be used to give names to functions. Remember the max function? It's built-in. Well, if I say f equals max, now f is the built-in max function. What's exactly going on here?

f is a name, max is also a name, and there's this thing called a function, which actually does stuff. It takes the max of different arguments. And that now has two names. f and max are both names for the same function, which means I can write f123 in order to apply this idea of maxing to the arguments 1, 2, and 3. I can also change what the name max means.

Max is now 7. I haven't broken the original max function, which is currently named f. I've just made max mean something different. So if I take the f of 1, 2, and max, I'll get 7, because max is just the number 7. Now I haven't actually gotten into too much trouble. If I want max to go back to being the max function, fortunately I have a name for that, f.

And so evaluating f gave me the built-in max function, which is now rebound to max, and I can take max of 1, 2, and 3 and get the right answer again. Last time I told you that there are function names for common infix operators, such as plus the time sign. And they live in the operator module. So if I write this, now I have access to the names add and mall.

So we know that one way to bind names to values is with an import statement, but they have to be names that are built in. A second way is with an assignment statement that lets us give a value to a new name, or to change the value bound to a name. Well, there's a third way to bind names to values, and that's with a def statement.

A def statement lets us create our own functions. So if I say def square x, indent the next line, and then write return the result of multiplying x and x together, I've now defined a new function called square. And the square function takes in some number and squares it by multiplying it by itself. I can square the result of adding together 3 and 4.

I can even square the result of squaring 3. So I can use this function which I created exactly as I would a built-in function. I can even define a new function, sum squares, which sums the squares of x and y, by writing a return statement where I actually use the square function that I just defined. Now I could put a plus sign here, or I could use the add function.

They both do the same thing. If I write sum squares 3 and 4, it will sum 9 and 16 together to get 25. Now remember when we had radius, which was 20, and area, which was not the area of a circle with radius 20. Because these are out of sync, how might we keep them in sync? Well, a function can do that for us.

If instead of defining area like this, instead I say area is a function which always returns pi times radius times radius, well then area is a function which I can call by putting it in a call expression. This is a call expression that just doesn't have any operands. Now area here, when called, is 1256. What's that? Well, that's 20 times 20 times pi.

If I change radius back to 10 and I call area again, area is updated. It's now 314. If I change radius to 1, then what's area now, well it's just pi. So a function differs from just a name in that its return expression here gets re-evaluated every time it's called, meaning every time that it appears in the call expression. So let's switch back to slides and just review what we've seen so far.

We're interested in expressions and how they evaluate to values. The primitive expressions we've seen so far are the number or numeral, a name, and a string. Strings I showed you last time, they represent text. We'll talk about them later in the course. Call expressions look like this. They have an operator, some parentheses, and then separated by commas, some operands. We just saw that you can have no operands at all and still have a valid call expression.

You can also have nested call expressions and operand can also be a call expression. We're really interested now in how names work. So let's go through a tricky case and see if you can figure out what happens. What is the value of the final expression in the following sequence? F equals min, F equals max, G comma H equals min comma max, then max equals G.

Then I compute the max of F of 2, G of H of 1 and 5, G is also applied to 3, and max is also applied to 4. Think about it for a while. The answer is either 1, 2, 3, 4, or 5. You should pause the video now and try to work out what the real answer is. Defining functions, one of the most important things you will do in this class.

Before I talk about the details of defining functions, let's just take a moment to appreciate this moment. So I told you on the first day that this course is all about abstraction. And today we're learning tools for abstraction. So assignment is a simple means of abstraction because you can bind names to values. And of course abstraction is the process of taking something complex, giving it a name, and treating it as a whole without worrying about all of its details.

So the functions we'll define today are very simple, but they'll get more complicated soon. The way we define a function is with a def statement, which looks like this. So this is a generic version. You write def, that's a keyword in Python. Then you give the function a name, and you list its formal parameters, which are going to be names that refer to the argument values passed into the function.

Then, a colon, indent the next line, and write the body of the function, which in its simplest case is just return, and then a return expression that gets evaluated every time the function is called. This top line between the def and the colon is called the function signature. And its most important role is that it tells you how many arguments a function takes by listing out the formal parameters, each of which will get bound to an argument value.

We'll see exactly how that works in a minute. And then the function body is everything that's indented after the first line, and that defines what the function does. So in its simplest form, it's just a return keyword followed by a return expression. And an expression describes a computational process, which will get evaluated every time the function is called. Okay, so this def statement is a two-line statement that defines a new function.

There is a procedure for evaluating a def statement. So here's the execution procedure. First thing is that every time there's a def statement, we create a new function. And that function has the signature given on the first line. The second thing is that we set the body of that function, which is the code that actually gets executed, to be everything indented after the first line.

Finally, we bind the name given to the function to that new function we created in the current frame of our environment. Remember those frames? We'll be talking a lot about those. Okay, so here's the execution procedure for def statements. It's always the same. The most important piece is here. Number two says that we set the body of the function to be everything indented after the first line.

It does not say that we actually execute that body. So that means when the def statement is executed for def square x return mol xx, no multiplying actually happens. The body just gets squirreled away as part of the function without actually getting executed until the function is called. Squirreled means to hide in a safe place. It's also the longest word in the English language that has only one syllable. Squirreled. Okay.

Now, functions are only useful because we can call them. In addition to having an execution procedure for a def statement that creates the function, we also have a procedure for evaluating a call expression that uses a user defined function. So here's the procedure for calling or applying a user defined function. We add a local frame forming a new environment. We bind the function's formal parameters to its arguments in that frame.

And finally, we execute the body of the function in that new environment. Let's see that in action before I confuse you anymore. From operator we import mol, define square x to be return mol xx, and then we'll square negative 2. So we have a def statement, and then we have a call expression that uses our user defined function. The first thing that happens is that we bind mol to the built-in function.

Then we define square, which does all three things I said. It creates a new function, where the signature is the one that I wrote down in the def statement. It scrolls away the body of that function as part of the function that we created. So we don't show it in the environment diagram, but it's there. Every time we call this function, we're going to execute that body.

But we haven't multiplied anything together yet. We haven't executed the body yet. Because the next line to execute will finally be the call expression that actually uses this thing. But we did bind the name square to the function that we created in the current environment. That's part of what happens when you def square x. Finally, we're going to square negative 2. So we evaluate square, that is that function.

We evaluate negative 2 is negative 2. And then we apply this function to the argument value negative 2. Which means we follow the next three-step procedure, which is introduce a new frame, bind the formal parameters to the argument values in that new frame, and then execute the body of the function in this new environment, where x means negative 2. Square still means the square function, and mul still means multiply.

So the next line to execute will be the return statement of this function. When we execute that, we find that the return value of the function is 4, which is what happens when you multiply negative 2 and negative 2. And then we're done. Back to the slides. What exactly happened there? So here's a screenshot of exactly what you just saw. And I'm just going to annotate some parts that are important.

So we have a built-in function. We have a user-defined function. They look basically the same, except for in the user-defined function, we actually see the formal parameter, x, because we're going to need to use it. We have a local frame that was introduced in the first step of the procedure above. The original name of the function is used to label that local frame, just so we can keep track.

This label isn't really that important. What is important is that we have a binding between the formal parameter x, which is the name of the argument, to the value of the argument, the argument value is negative 2. And then we also show return values in these frames, just so we can see what happened in the process of evaluating this function. So the return value is 4.

So this is not a standard name value binding. This is just an annotation in the environment diagram that tells us what happened. Okay.

So that's everything in the picture. Now I mentioned that a function signature is important. It's important because it contains all of the information needed to create this local frame that we built right here. So the signatures between the def and the colon in the def statement first line, we copy it over here when we create the function, because the square here lets us name the local frame, and the x is the name that we bind to the argument value of the function.

So that's why the function signature is important, as it tells us how to construct this frame every time we call square. We now know most of the story for user defined functions. But there's one more big piece, and that's looking up names in environments. So every expression that we evaluate is evaluated in the context of an environment. Why is that? The current environment so far is really just either one global frame or, now that we have user defined functions, it could be a local frame followed by the global frame.

So these are the only two possibilities so far. It is a one frame environment or a two frame environment. Notice the word followed indicates that there's an order here. So here's the two most important things I will say all day. One, an environment is a sequence of frames. A frame is a binding between names and values, one of the boxes in the environment diagram.

An environment is a sequence of these, which could be the local frame followed by the global frame. A name, when evaluated, evaluates to the value bound to that name in the earliest frame of the current environment in which that name is found. So if an environment consists of a sequence of frames, and I want to look up what does a name mean in that environment, I check each frame in turn.

For example, to look up some name in the body of the square function, we look for that name in the local frame first. If it's there, we know its value. Otherwise, then we look for it in the global frame, because that's the next frame in the environment. And built-in names like max are in the global frame too, even if we don't show them.

We just don't show them because we want to keep our environment diagrams simple. Okay.

I'll start up Python. I'll define, well first I'm going to from operator import mul, I can multiply stuff. I'm now going to define the square function. I already used x, so why don't I use something else? Like square returns the multiplication of square and square. What have I done? I've used the name square. So square refers to some function called square, where squaring has a formal parameter square.

What happens when I actually try to square something? Well, it works just fine. Why did that work? Let's take a look. So here's from operator import mul, def square square, return mul square square, square negative two. Let's visualize. The first line's okay. The second line defines a function called square with formal parameter square. Nothing has been multiplied yet, so no disasters have occurred.

When I actually call the square function, I look up this function. I name it the local frame square. Then I bind the argument negative two to the name square, which is the formal parameter. Then I return mul square square. Well, mul is mul. The important thing is that square in this environment means something different than it used to. Now it means negative two, because the first thing I do is I look up square here.

And I found it, so I never actually look up square in the global frame. Next we'll talk about environment diagrams. So environment diagrams are a way for us to keep track of what's going on within the Python interpreter when it executes a program that we typed in. Environments are real things. They're the way in which an interpreter for programming language keeps track of what names mean.

So it's sort of memory that keeps track of the bindings between names and values. So we're going to draw pictures of what they look like. And this will help you become a better computer scientist. Lots of what computer scientists do is draw pictures that involve boxes and arrows pointing to other boxes. It's just a huge part of the discipline, so you might as well start now.

Okay, so an environment diagram is there to visualize the interpreter's process so that we can really understand how programs get executed. And they look like this. So you have some code on the left, and then you have some frames on the right. And the code is just regular Python code with some arrows to indicate where we are in the process of execution.

And the frames keep track of the bindings between names and values. Okay, so the code's on the left, the frames are on the right. Within the code, there are statements and expressions. So we see an import statement and an assignment statement here. The arrows indicate the evaluation order. So the gray one says, this was just executed. And the red one says, this is next to execute.

It hasn't happened yet. Okay, frames on the right show bindings between names, pi as a name, and values. There's a name, there's a value. Within a frame, this is hugely important, this is part of the Python process. In a frame, a name cannot be repeated. It has to be bound to at most one value. We saw the consequences of this when we rebound the name max to a new number instead of the original function.

The old binding was lost. Okay, so those are code on the left, frames on the right, and environment diagram. These are going to get more complicated, but also more necessary. Because when there are lots of names, repeated in various ways, we'll need to be able to keep track of what they really mean. These things get drawn for you automatically. So here's the web interface, what's called the online Python tutor.

So here's the code that we type in from math import pi, you can edit this, and then you click visualize execution. And you get your code on your left, and your frames on the right. And as you walk through each line of code by pressing forward, you see the consequences of executing. Once this import statement bound the name pi to its value, and the next thing that happened is that the assignment statement bound the name tau to 2 times pi.

And here's the result at the end of the day. So when you're confused about what a program does, paste it into the online Python tutor, and it will show you exactly what happens throughout the course of execution. That's the whole point. Okay, so that's what an environment diagram looks like. Now we can talk about exactly what assignment statements do. They change the bindings between names and values in frames.

So here is an environment diagram for three lines of code. Just executed was b equals 2. Next to execute is this larger assignment statement that has two names on the left. and two expressions on the right. Now there is an execution rule for assignment statements that you need to understand because Python always does the same thing over and over again. And here's what it does for assignment statements.

It evaluates all of the expressions to the right of equals from left to right. Then, after evaluating all those expressions, it binds all the names to the left of equals to the resulting values. So in this case, here are all the expressions to the right of equals, we get a plus b, which evaluates to 1 plus 2 is 3, so this evaluates to 3, b evaluates to 2, and then second step, find all names to the left of equals to the resulting values.

So b will be bound to 3, and a will be bound to 2, the value of that expression. Okay.

So if we hit forward in the environment diagram generator, the just executed arrow will now b on line 3, and the global frame will have a bound to 2, and b bound to 3. Okay.

So now we can do the complicated case that I asked you to solve by ourselves. Let's just do it live in the Python tutor. Okay.

So here was the question. What happens if I say f equals min, then f equals max, then g h equals min max, then max equals g, then this large nested call expression? Well, let's watch and see what happens. So the first thing that happens is that f is bound to min. This is the min function, a representation in the environment diagram that's similar to the angled bracket thing that you saw when Python printed it out.

Then we bind f to max. Now remember the rule that a name can be bound to at most one value in a frame. So since we've rebound f to max, we've lost the binding between f and min. That's just gone. Okay.

Now we say g and h are bound to min and max. We evaluate min. That's the min function. We evaluate max. That's the max function. And we bind g and h to min and max. Notice there's only one min function. There's only one max function. But the max function now has two names, f and h. The min function has the name g.

Now there's also the name max for the max function and the name min for the min function. Those are built in and they're part of the global frame, but we don't write them down because if we had to write down all the built-in names, then that would take up too much space. We only write them down when they change, which is about to be what happens.

So we next say max equals g. Using the execution rule for assignment statements, we first evaluate g. g evaluates to the min function. Then we bind the name max to that value. So now max means min. Jeepers. That is complicated, isn't it? Okay.

So then we say max of f of 2, g of h of 1 and 5, 3 and 4. And that involves evaluating all of these different operand expressions in turn. Before I hit forward, let's just watch how that goes. So we can draw an expression tree that evaluates the operator and operand of the call expressions and the operand sub-expressions within them. So remember the rule for evaluating a call expression.

First you evaluate the operator, which in this case is max the name refers to the function which minimizes. When we evaluate the operands, the first operand looks like that. And we have to apply our rule for evaluating call expressions again. Evaluate the operator. Evaluate the operands. This operand is complex. So we evaluate it. g refers to the min. We see that here in the environment diagram.

h1 and 5 is another call expression. We evaluate that by first evaluating the operator. h is the max function. 1 and 5 are 1 and 5. And so the max of 1 and 5 is 5. Now we take the min of 5 and 3 and we get 3. Now we're going to take the max of 2 and 3 and we'll get 3.

And then we'll take the min of 3 and 4 and we will get 3, which is the value of the whole thing. Congratulations if you picked 3. print and none. So as you know, if I type an expression into the interactive Python interpreter, it will then display the value of that expression. It's also the case that if I call print on the value negative 2, I'll see the same output.

But two different things have happened here. Let's try to understand the difference. Okay.

So if I type go bears, I see go bears is the same as exactly the expression that I typed in because this is a string literal and so we see the string value. If on the other hand, I print go bears, I see almost the same thing but no quotation marks. So there must be a difference between printing and just evaluating something.

We can see more of this difference when we look at the special value called none. None represents nothing. If I just evaluate it, I see nothing. If I print it out, I actually see none. So what's going on here is that Python has rules for automatically displaying the value of any expression you type in. So it automatically displays this negative 2 or this go bears.

None is a special case where nothing gets displayed automatically. But if I print it, I can make it appear. Okay.

What else can print do? Well, print can print multiple values separated by spaces. And it can print none. So I could print none and then none again. Here's an interesting case. What happens if I nest calls to print? I'll spend a moment thinking about what will happen and then I'll show you in 3, 2, 1. 1, 2, none, none. Let's understand exactly what happened there.

First, what is none? Well, none indicates that nothing has been returned from some function. So the special value none is just there to represent nothing. In Python, it's called none in other languages. It has other names. A function that does not explicitly return a value will in fact return none. None is not displayed by the interpreter automatically as the value of an expression.

If I try to define a function, does not square x, which just computes x times x but doesn't return it, then I've created a function that returns nothing because there's no return there. So when I call does not square 4, I don't get 16 back. Instead I get none. However, according to this third rule, none is not displayed by the interpreter as the value of an expression.

So here's a call expression. If I evaluate it, 4 does get multiplied by 4 but it doesn't get returned. What gets returned is none and none doesn't appear at all. Okay.

Next, I could say 16 equals does not square 4. What's going to happen here is we'll compute the value of this call expression. It will evaluate to none, which will be bound to the name 16. So the name 16 is now bound to the value none. If I just type in 16, nothing will be displayed. If I type in 16 plus 4, I will not get 20.

I will get a type error that says unsupported upper end types for plus, none type and int. What does that mean? Well, this plus is the same as that plus. What it's saying is that I tried to add together a none and an int. That stands for integer. For is an integer. So this kind of error might arise when we've tried to add something to nothing, which you cannot do. Okay.

Back to print. Well, it turns out there are two kinds of functions. Pure functions that just return values. Non-pure functions that have side effects. A pure function is something like abs, which computes the absolute value of its argument. The absolute value of negative 2 is 2. And the only thing that abs does is return the number 2 whenever you call it on negative 2.

That's the argument. That's the return value. Here's a picture of a pure function. It's a closed pipe that goes from inputs to outputs. Pow is another pure function. I pass in two arguments, I get out one return value. Now, non-pure functions are completely different. They take in some input. They also have some output. In this case, print has the output none, or the return value of none.

But in addition, instead of being a closed system, it also has a side effect. That's what's coming out of here. Is that in addition to returning none, print displays whatever was passed into it. So in this case, we passed in negative 2 as an argument. It displays the output negative 2. The return value is none. The side effect isn't a value at all.

It's just something that happens. It's behavior that's a consequence of calling the function. Print is a different thing than abs or pow because it has side effects. That's why we get such interesting behavior when we nest print calls within each other. Let's look at that print, print 1, print 2 nested expression again where what we saw afterwards was 1, 2, and then none, none.

We can understand what's going on here. We can do it using an expression tree. In order to get the value of this nested call expression, we first evaluate the operator, which is a function that prints. The first operand is another call expression, which we evaluate by evaluating its operator and its operand. Now we have the function print applied to 1. When we actually apply print to the number 1, we have a side effect of displaying 1.

That's where this first 1 came from. It was while we were evaluating this operand sub-expression, we got a 1 displayed, but it's not the value of anything. It just appeared there because that's what print does is it makes things appear. Now we got a value for this expression as well, which was none, because that's what print always returns. Next, we evaluate this operand, which is itself a call expression.

And applying print to the number 2 displays the number 2, which we see here. And the value of that sub-expression is none. So now we have print applied to none and none. When we apply print to none and none, a side effect of that is to display none, none, which we see on this line. And eventually, we get the value for the whole thing, which is none, output here.

That none doesn't get displayed because the interactive interpreter for Python doesn't automatically display none when it's the value of an expression typed at the prompt.

## 3. Part p03 - Lecture 3 - Control

When Python executes a program, different expressions can be evaluated in different environments. So there can actually be multiple environments in the same environment diagram. We're going to look at one of the examples that I showed you last time in detail with diagrams so that we know exactly what's going on. But first, let's review everything that I told you before about user-defined functions, here on one slide in summary form with all the vocabulary that you need.

So first, we have a def statement. A def statement is what creates functions. It looks like this. That whole thing is a def statement, which spans multiple lines. It has a name for the function you're defining, a formal parameter, which is the name you give to the argument of the function. There can be more than one formal parameter, in which case they're separated by commas, one for each argument.

The body of the def statement is everything indented after the first line. And in this case, it's just a single return statement, though it is possible to have more than one line. This return statement has a return expression, which multiplies x and x together. When a def statement is executed, a new function is created. The name, which we see here as square, is bound to that function in the current frame.

Now, when I've defined this function that squares things, I still haven't actually multiplied anything by anything else, because I haven't called that function yet. That happens with a call expression. So later on in my program, I might say square 2 plus 2. That's a call expression. The operator is the name square. Its value is the function that squares, the one that we just defined.

Okay, there's an operand in between parentheses. An operand is an expression, in this case 2 plus 2. It evaluates to a value for, which is the argument of the function. So, when we reach a call expression, we evaluate it by evaluating the operators and operands, and then calling the function on the arguments. Calling or applying a user-defined function is also a process that we need to spell out.

So, I showed you a diagram that looked like this, which was the function signature inside of a little tube. In comes the argument. Out comes the return value. How does this happen? Well, we start by creating a new frame, in which the formal parameters of the function we're calling are bound to the arguments we're passing in. In this case, x would be bound to 4.

And then, the body of the function that we're calling is executed in that new environment. So, we would, in this case, compute the multiplication of x and x, where x is bound to 4. 4 times 4 is 16. Okay.

So, that's the simplest possible example. A slightly more complicated one is when we import mul, we define square just as we did before. But now, we're going to square the square of 3. This diagram indicates that we've already executed the def statement, which bound the name square to a newly created square function. And we're about to square the square of 3. How do we square the square of 3?

It's a call expression. So, we just use our rule for evaluating call expressions, which means the operator is evaluated. It means the function that squares. The operand is also a call expression. So, we need to apply that procedure again. Square is the function that squares. 3 is the number 3. And now, we can apply our user-defined function square to the number 3.

How do we do that? Well, it has three steps. First, I create a new frame. Then, I bind the formal parameter, x, to the argument value 3. And there's the binding right there. Finally, I execute the body of the function, which in this case says return mol xx. So, I have to multiply x and x together. I get a return value of 9.

And that's how I get the value of this call expression. Now that I know what the value of this operand expression is, I can apply this function square to the argument 9 and repeat the process again. Okay.

So, that means introducing a frame, binding the formal parameter x to the argument value 9, and then executing the body, which multiplies 9 times 9 and gives me 81. So, let's look around here for a second. We have one square function. We created two frames from that function by calling the same function twice. Each of those frames is different, which is why we gave it a different frame label, f1 or f2.

It's also different because we passed in different arguments. So, we got different bindings from the formal parameter to the argument. And that led to different return values. An environment is a sequence of frames. So far, we've had an environment which was just the global frame alone. We had those before we ever even had def statements. But once we started calling user-defined functions, we started getting multi-frame environments, ones that have a local frame and then a global frame.

Let's try to find all the different environments in this diagram. There's one, just the global frame alone. There's another, f1 followed by the global frame. And there's a third, the frame f2 followed by the global frame. So, there's three different environments here. None of them include all three frames, but there's one environment per frame. If you start with a particular frame, you can always find the whole environment just by following the parents of the frames.

So, let's say we're interested in the environment that starts with the frame f2. Well, we know the next frame is the parent of this frame, which is the global frame, says right there. Global frames don't have any parents. They're always the last frame in an environment. A very important point is that names have no meaning without these environments. These are the things that endow mol and x and square with some sort of meaning, some value.

Every expression is evaluated in the context of an environment, which allows us to figure out what names mean. And a name evaluates to the value bound to that name in the earliest frame of the current environment in which that name is found. In this case, when we evaluate mol xx for the second time, it's in an environment that starts with the frame f2 followed by the global frame.

And we have two different names we have to look up, mol and x. So, when we look up x, the first thing we do is look in the first frame of the current environment. And we find x there. So, this is the earliest frame of the environment in which x is found. So, x is 9. When we look up mol, we first look in f2 to see if mol is there.

It's not. So, then we look in the next frame of the environment. And lo and behold, there is mol bound to the function that multiplies. So, that's another case where we found a name in the earliest frame of the current environment in which that name was found. It just happened to be the global frame. But we did check f2 first. Names can have different meanings in different environments.

Because each frame can have a different binding for the same name. In particular, a call expression and the body of the function being called are evaluated in different environments. Here's an example where we use the name square for both the name of a function and the name of the formal parameter. Def square square return mol square square. Now, I'm not recommending you do this.

But if you square 4 in this case, you really do get 16. Why is that? Well, in the environment diagram for this example, there's a global frame in which square is bound to the squaring function. There's a local frame in which square is bound to 4. Because we call the squaring function on 4. So, the difference is that when we evaluate square 4's operator, we're evaluating that expression in the global frame.

That's the call expression. It's not indented at all, which indicates that it gets evaluated in the global frame. On the other hand, this line is indented. It's part of the body of the square function. And so, it's always going to be executed in an environment that starts with a square frame. Because we create this frame and then we execute the body. So, this square is evaluated in an environment that starts with F1 followed by the global frame.

But when we go looking for what square means, we always look in F1 first. There it is. And we found four. So, we never find this binding because we're only interested in the earliest frame of the current environment. Our next topic is just a bunch of different Python features that will help you in developing your projects and doing your homework. Okay, so I'm going to start up Python.

Now, one thing we haven't really discussed much since the first day is how operators work, such as plus or times. Well, the truth is that exactly how they work is kind of complicated and so we're going to delay that discussion until later in the course. For now, just think of them as being shorthand for calling built-in functions such as add and mall.

So, this is the same thing as from operator import add mall. And using infix operators like this does obey the precedence rule. So, times comes before addition. If we want to translate that into a call expression, we have to work it out ourselves. So, we have to know that this is equivalent to adding 2 to the result of multiplying 3 and 4 and then adding 5 at the end.

Now, you can use parentheses if you want in expressions that include infix operators in order to change the precedence or override the standard precedence. So, this would do the addition first and then multiply together the two results, 5 and 9. And you can likewise express that by saying multiply add 2 and 3 and add 4 and 5. Okay, so operators just behave like built-in function calls.

Enough of this addition multiplication stuff. Let's get serious. Let's talk about division. So, there are two kinds of division. You can divide. This is called true division and it uses the slash. Or we can do what's called integer division, which only gives the number of times that the divisor goes into the dividend, not including any remainder. So, we lost a 0.3. So, we lost a 0.3.

These have corresponding functions from operator import true div and floor div. The first and the second. So, I can true div 2013 10 and I'll get 201.3 or I can floor div 2013 and I'll get the 201.1. What about the 3? Well, we can get the 3 as well with what's called the mod operator. So, this says what's the remainder of dividing 2013 by 10 and that will be 3.

And, there's a corresponding function. Okay, why do we want these integer, division, and mod operators? Well, they are exact. Whereas, you only get an approximation. If I say 5 divided by 3, I get 1.6667. When really, I should have 6's forever. But, it's more exact to say that if I divide 5 by 3, well, 3 only goes into 5 once and the remainder is 2.

Oh, sorry, the remainder of dividing 5 by 3 is 2. Okay.

So, we'll use those occasionally in the course to break apart numbers. So, it's good to know how they work. Here's another feature of Python. Is that just as I can assign multiple values to multiple names using one assignment statement, I can also return multiple values from a function. And, you'll do this once in your project. So, let's say I want both the quotient and the remainder to come back.

When I divide n by d, then I can define a function divide exact n by d, which will return not only the result of dividing n by d, but also the remainder. Then, I can assign to the quotient and the remainder, the result of dividing exactly 2013 by 10. And now, quotient is bound to 201 and remainder is bound to 3. Okay. Cool. Okay.

So, far throughout the lectures, I've only been using the interactive Python interpreter. It's a really nice way to play with ideas. But, if you want to write something permanent, you usually do it in a file. So, I have a file over here edited with the vim editor. There are several different editors that you can use. Look at lab1 and it will give you an overview of the different options. Okay.

So, what happens here is I start typing Python source code and it won't get evaluated or executed until I ask Python to do so. So, let's see. It's a good idea to put some text at the top saying what this file is, our first Python source file. Next, you can just start defining functions with def statements. Divide exact n by d is going to be return.

We want floor div and d and then we want mod and d. Oh, I just noticed that I forgot to import these things. Well, I can just do that now. Now, none of this has been executed yet. The way we execute it is that we go back into our shell. We type Python 3 and then the name of the file, this file, is called ex.py.

Ex.py and it gets executed. Nothing really happened. So, why is that? Well, we have just a def statement which binds the name divide exact to a newly created function but otherwise doesn't give us any output. Okay.

So, if instead I go over here and I say q comma r equals divide exact 2013 by 10 and I save that and I execute it and I execute it, still nothing happens. But, if I finally print something out, the quotient is q, the remainder is r. I save that and I execute it and I'll actually get some useful output. Okay.

So, what have we learned? Well, we've learned that we can type Python into files and we can execute it in this way. Now, a more typical thing is not to have a bunch of print statements in our Python file but instead run Python 3 in the interactive mode, first executing some file. So, now we've executed this entire file and then we have an interactive prompt which means we can now look at q and look at r or call divide exact.

Now, when you write functions in a Python source file, you don't typically just give them a name and a return statement. In addition, you give them some documentation about what they do. Return the quotient and remainder of dividing n by d. So, there's a convention of using capital, all caps, letters to refer to the formal parameters. You don't have to follow this but we do it in our projects. Okay.

So, we give some documentation. That's called a doc string. It's the first line below the def line in a def statement. In addition to just describing for humans what this does, we can also show some examples of how it works. I'm going to get rid of this too. And I'm going to put it up here so I can say, here's what would happen.

If you call divide exact on 2013 and 10 and you bound those to q and r respectively and then you looked up q, you should get 201. And when you look up r, you should get 3. Now, this is still just documentation. Everything in here is not Python code. It's just one big string that tells you how this is supposed to work.

But within it, I have an example interactive session and I can simulate that session by typing Python 3 dash m doc test and then the name of the file. Now, if everything does what it's supposed to do, you'll see no output. If you'd like to see more output, you can pass the dash v option which will tell you everything that happened. So, it actually did all of these things that I told it to do.

It tried to assign q and r to the result of divide exact. It expected nothing to follow that and that was true. And then we evaluated q, got 201. We evaluated r and we got 3. And if, for instance, I put some error in here, then if I run the same thing, I will see a lot of stars telling us that something went wrong.

Failed example r is expected to be 2. Instead, I got 3. So, these are called doc tests and they're run by invoking the doc test module on a particular file. It's a good idea to try that when you're doing your homework. Okay, one last feature. When you're defining a function, you can give what are called default values. This is not an assignment statement.

This is instead a placeholder for a default value that I put after a formal parameter. And what this says is, if there's no argument passed in to be bound to d, then I'll bind 10 to d instead. Which means I can, let's python3-i x.py run this interactively. If I qr equals divide exact 2013 with no second argument, then it will fill in 10 as the second argument.

And I'll get q is 201 and r is 3. We'll use these in our project a little bit as well. Next, we'll talk about conditional statements. So, first, let's talk about statements. We saw assignment statements and def statements. In general, a statement is something executed by the interpreter to perform some action, like bind a name to a value or define a new function.

Now, statements can span more than one line. So, a compound statement has the following structure. It starts with some header, has some statements indented, sometimes there's a separating header to continue the compound statement, and that has statements indented after it, etc. This whole thing can be a statement. Within it, a clause is a single header followed by some indented statements. And those indented statements are called the suite of the clause.

The first header determines a statement's type. So, you can always tell what sort of statement you're dealing with. And the header of a clause controls the suite that follows. Def statements, as we saw, are a type of compound statement, meaning they have a suite, which we call the body of the function being defined. Okay, so that's a statement. When you look at a compound statement and you're interested in the suite, oftentimes you execute that suite because it's a sequence of statements.

To execute a suite means to execute a sequence of statements in order, one after the other. So, if we want to write down a rule for that, it's execute the first statement. And then, unless directed otherwise, execute the rest. Now we can turn to a particular type of statement that we haven't seen before, the conditional statement. Okay.

So, we'll get out of the Python interpreter and we'll actually just define a new function in our file that allows us to use a conditional statement to compute absolute values. Return the absolute value of x. And the way we're going to do that is we're going to look at whether x is smaller than, larger than, or equal to 0. So, if x is less than 0, then the absolute value of x is negative x.

Otherwise, we write ELIF, that's ELSE IF, an abbreviation for that. This means otherwise, if it's the case that x equals 0, then we'll return 0. And finally, if neither of those are true, that means x is greater than 0, we will return x itself. Okay.

This is an absolute value function. We can load it by starting an interactive session and first reading in EX.py. So, now we have absolute value defined. When I take the absolute value of negative 2, I get 2. Or if 0, I get 0. Or if 3, I get 3. Now, of course, there was a built-in ABS function all along, but I just wanted to give you an example.

Okay, let's understand how that works. So, here's the code that I wrote. What is in the body of this function is one statement that includes three clauses. One, two, three. Three headers, that's the first line of each clause. And three suites, each of which just includes a return statement. Okay, so there's an execution rule for conditional statements. It goes, consider each clause in order.

Evaluate the header's expression. If it is a true value, execute the suite for that clause, and skip the remaining clauses. So, conditional statements are interesting because only one of the suites ever gets executed. Now, about the syntax of a conditional statement, you always start with an if clause. You can have 0 or more elif clauses, and then 0 or 1 else clause, but it has to be at the end.

So, the simplest version just has an if clause. You can have if and then else, or you can have some elifs in the middle. Okay, let's understand this execution rule more deeply by introducing our friend George Boole. George Boole was a logician. He was, in fact, an important logician, and an early founder of computer science. He's really important, so let's make him big.

George is going to be interested in what are called Boolean contexts. So, those are places in Python code, where you place an expression, but all that matters about that expression is whether it's true or false. In this conditional statement, there are two Boolean contexts, one in each header except for the else header, which doesn't have one. So, here we have expressions where we don't really care about the value itself, but only whether that value is a true value or a false value.

That's all George Boole cares about. Now, there are false values in Python, such as false, zero, the empty string, or none. And there are some more to come, but that's a good start. And then there are true values in Python, which are anything that's not a false value. So, George watches over these and sees whether they're true or false, and that allows us to execute this statement correctly.

There are some more details about Boolean contexts that you should probably read about, because I'm not going to go over all their details in this lecture. So, here's a link to the reading. Iteration means repeating things. One way we can repeat the same statement many, many times is with a while statement. Okay, so a while statement is a compound statement that contains within its body something that we want to execute multiple times.

Let me show you a demonstration. I start up Python, and I'm going to set the names i and total to both be zero. And what I'm going to do is I'm going to add up the numbers, one, two, and three, to get a total of six, in the following way. I'll say, while it's the case that i is less than three, I will change i to be one more than it was before.

And I will change total to be whatever total was, plus whatever i is now. In a flash, we've actually done quite a bit of computation. Now it's the case that i is three, and total is six, which is what you get when you add one, two, and three together. How did that happen? Well, to understand exactly what happened, we need to look at the execution rule for a while statement.

So here's the code that I typed in. Here's the execution rule. First thing we do when we have a compound while statement, which is this whole last three lines, is to evaluate the header's expression, i less than three. If it's a true value, we execute the whole suite, both lines. Then, at the end, we return back to step one, which means we evaluate the header's expression again.

Okay, here we have true value, which means we must have a Boolean context. So George is going to watch that spot and see if i less than three evaluates to a true value or a false value each time we reach that line. We start at the top as always. After executing that assignment statement, we have a global frame where i and total are both bound to zero.

Next, we execute the while statement, which means evaluating the header's expression. i is bound to zero, which is less than three, so i less than three gives us a true value. George is happy, and we now execute the whole suite. i is bound to i plus one, so now i is bound to the number one. Remember, when we evaluated i plus one, i was still zero, which is why we got the number one, which is what we bound i to.

And now, we bind total to whatever total is, that's zero, and i is, that's one, and total is now one. According to the execution rule, we now return to step one and evaluate the header expression again. Is i now less than three? Yes, it is. George is still happy, so we execute the whole suite. i is now two, and the total is whatever the total is now, one, plus i is two, is three.

So now, total is bound to three. We return to step one, and we see if two is less than three, which it is. If George is happy, we then execute the whole suite again. And here's the really important part. When we first execute this assignment statement, i equals i plus one, i is now three. But we don't go back and check this, because we haven't finished executing the whole suite yet.

The next thing we do is execute the next line in the suite. Updating total to be total, three, plus i, three, is six. And then, we return to step one. In step one, we evaluate the header's expression and find that three is not less than three. And so, this is a false value. And so, when we get to step two, we're not going to execute the suite, and we're not going to return to step one.

We're just finished. And that's why i is bound to three, and total is bound to six, after we execute this while statement, which involved repeating the same body many, many times.

## 4. Part p04 - Lecture 4 - Higher-Order Functions

61A lecture number four, announcements. We have homework due on Thursday, and then project one is released. It's not due until after midterm one, but it's important to get started, and that's what the checkpoint is about. So make sure you finish the checkpoint by the checkpoint date, which you can see is September 5th, that's next Tuesday, because then you'll have gotten started with the project, and we don't have to worry that you'll leave it all to the last minute.

Now the checkpoint is just one point out of many points on the project, so if for some reason you missed that deadline, it's not really going to affect your grade very much, but you might as well get every point that you can, and this point is just for finishing phase one, on time, so that you're on track to finish the whole thing after the midterm.

The midterm's coming up on September 11th, it's held in the evening, we don't hold a lecture on the midterm days, so you get some time back in order to prepare, and the reason we hold it in the evening is that both offerings of the course will have the same midterm spread in rooms all over campus, you'll get an assigned seat, and you'll just show up to the room that you're told to go to, and take a paper-based exam.

We'll tell you more information about the exam in coming announcement videos, but for now it's important to just mark your calendar, finish that homework, and get started on the project. If you get stuck, remember that there are drop-in office hours available that you can come to for help, and members of the course staff will be there. Let's look at a famous example of iteration.

We're going to study the Fibonacci sequence. That's Fibonacci, a mathematician from long ago, and here is this sequence. It starts with zero, and then one, and then every element after that is the sum of the previous two elements. So, zero and one make one, one and one make two, one and two make three, et cetera. And you can see that it starts getting fairly large before too long.

Now Fibonacci did not invent this sequence. It was discussed and described by mathematicians long before him, but he made it popular in the West. And so, we still refer to him every time we see this sequence of numbers. Every Fibonacci number is associated with its index, the position in the Fibonacci sequence. So, we usually call this the zeroth Fibonacci number, the first, the second, the third, the fourth, and the fifth, et cetera.

So, the fifth Fibonacci number is five. Now, it might appear in position six in this sequence, but we call this one the zeroth Fibonacci number since it's zero. That's just a convention. Now, who cares about the Fibonacci sequence? Well, it certainly has interesting properties. You can make what's called the golden spiral by tiling together squares whose side lengths are Fibonacci numbers. So here's a square of side one, one, two, three, five, eight, 13, 21, 34, et cetera.

And then if you draw a spiral going through the intersection points of these squares, you get an ever-expanding spiral that looks particularly well-balanced to the human eye. It's also a spiral that people like to look for in nature. Here is a cabbage where somebody thinks they've discovered the golden spiral. Okay.

Enough about the Fibonacci sequence. Let's figure out how to compute it using a while statement. Here's a function that takes n, the position or index, in the Fibonacci sequence where we want that Fibonacci number. And it computes the nth Fibonacci number for n greater than or equal to one. It does that by keeping track of various values and then executing a while statement.

So when you're designing an iterative function, one of the most important things to think about is what information you need to keep track of in order to perform the iteration. In this case, in order to compute that the next Fibonacci number is the sum of the previous and the current one, we need to keep track of what those Fibonacci numbers are. So we start out at the beginning of the sequence.

The zeroth and first Fibonacci numbers are 0 and 1. And then we also need to keep track of where we are in the sequence. So that's how we use k here. K keeps track of the index. And throughout the execution of this while statement, k will be telling us what Fibonacci number is bound to the name cur for current. Now the current Fibonacci number at the moment is the first one, this one, zeroth first.

But as we execute this while statement, k will change and cur will change. And k will tell us which Fibonacci number is cur. Okay, this says k less than n. We're going to rebind pred and cur to be the next numbers in the sequence. So the predecessor is bound to the current one and a new current value is computed. And here we use the definition of the Fibonacci sequence.

The next Fibonacci number is the sum of the current one and its predecessor. And we bind that to be the new current, Fibonacci number, which has an index one larger than before. So that's why we bind k to be k plus 1. Now the structure of the while statement allows us to perform this computation many times until we've found the nth Fibonacci number.

So we keep doing it until k is less than n. And that means at the end, k equals n because we're just adding 1 to k each time. So we found the nth Fibonacci number. We've bound it to cur and we return it. In the environment diagram for this example, we're keeping track of the names pred, cur, n, and k in a local frame for calling the fib function.

n never changes. So if we're trying to find the fifth Fibonacci number, which is 5, then n would be 5 at the beginning, pred and cur would be 0 and 1, and k would be 1. Now we'll track which values are bound to these names every time we finish executing k equals k plus 1. So the first time through, we'll rebind pred and cur to be the next two numbers in the sequence.

And say now cur points to the kth Fibonacci number where that is the second Fibonacci number. There it is. And then we execute the body of the while statement again, marching pred and cur up the sequence and changing k at the same time. We're going to do that four times. Now k equals n, so it's not the case that k is less than n, we're finished executing the while statement and we return cur, which is the fifth Fibonacci number, 5.

Here's a discussion question. What if in the body of fib I had made the following change? I had bound pred and cur to 1 and 0 and k equals 0. Is this alternative definition of fib the same or different from the original one? Pause the video and think about that for a moment, then we'll discuss together. So this is still a correct implementation of fib for every n greater than or equal to 1, just like our old definition.

But it's even better because it can compute the 0th Fibonacci number correctly. So we found a particular input value where this does a better job than the old one. So in particular, if n is 0, then cur is 0, which is the 0th Fibonacci number. By the time we reach the while statement, k will be 0, n will be 0, and so the body will never be executed and we'll return 0, which is the 0th Fibonacci number.

Excellent. Our old version didn't do that. But what about with n equals 5? Well, we start out with cur 0 and then we're actually going to execute the body of the while statement five times instead of 4 because we started with k equals 0 instead of k equals 1. So cur will be 0 and then 1, 1, 2, 3, 5 will still get the fifth Fibonacci number.

Let's talk about the role of control statements in a programming language. Control statements, such as if and while, are different from functions in that they control which parts of the code get executed and how many times. But maybe we could have that same control just using functions. Well, let's explore. Let's try to write a function that does the same thing as an if statement.

Here is a particular format of an if statement and the execution rule for conditional statements is each clause is considered in order. Then what we do when we consider a clause is to evaluate the header's expression if it's there. And if it's a true value, or we're in else, then we execute the suite and skip the rest of the clauses. So here's the if clause and the else clause.

If this is true, then we execute this and skip this. If this is false, then we don't execute this, find out that we're in the else condition and execute this. So the if header expression controls whether the if suite or the else suite is executed. But we always pick one or the other, and we never do both. If we were to write a function, let's say there was an if function that took a header expression and if suite and an else suite, couldn't we just write our code like this?

Well, first of all, this doesn't exist in Python, but I think we could try to implement something like this. And what it would do is if this were true, it would return whatever the if suite value is, and if it were false, then it would return whatever the else suite value is. So how might we implement that? Well, let's just implement it using the conditional statement that we already discussed.

If c is true, we return the t value, otherwise return the f value, or we pass c, t, and f in. That's great. Now, instead of having to write ifs and colons and remember what to indent, we could just use this if function wherever we want and write all our code that way. But there's a problem. The problem is that the evaluation rule for call expressions is quite different than for conditional statements.

This call expression is evaluated by evaluating the operator and operand sub-expressions, then applying the function if underscore to the arguments that are the values of the operands. In what case might we see a difference between using an if statement and using an if call expression? Well, let me show you. Here's my if function. We're not going to use it at first. We're just going to focus on writing a function that computes the real square root of x, where x can be a negative number or a positive number.

The real part of the square root of x only is non-zero if x is positive. And for positive x, the built-in square root function will give us the square root. For a negative x, like a what's the real square root of negative 4, well, the square root of negative 4 is 2i. And i is imaginary number, 2 is the imaginary part, and the real part is 0.

So we write a simple function. If x is greater than or equal to 0, return square root of x, otherwise we have a negative number. We're not going to call square root on x at all. Instead, we're just going to say that the real part is 0 because the whole square root is imaginary. So let's run this. And you know, we're letting the built-in square root function tell us that the square root of 16 is 4.

But the built-in function would tell us that the square root of negative 16 is an error. We don't want that behavior. Instead, we want to know that for positive numbers, the real component of the square root is 4, and for negative numbers, it's 0 because the whole square root is imaginary. And this implementation works just fine because in the case when x is 0, it computes the square root.

In the other case, it just skips over that and returns 0. What if instead we took the components of this if statement and converted it to a call to our if function? If x is greater than or equal to 0, then we want to take the square root of x. Otherwise, we want to return 0. We could return the result of this and replace this conditional statement with a call.

What's going to happen here is that it's going to call if on these three things, which come in as c, t, and f. If c, then I need to return t. Otherwise, I return f. And now I have a very convenient implementation of real square root that all fits on one line. Let's watch it work. It's still the case that the built-in square root works only on positive numbers.

But my function, real square root, gives me the for and the error. What happened? Well, when we replaced the conditional statement with a call expression, we had a different evaluation rule. For evaluating this, we figure out what function we're going to call and all three arguments that we're calling it on before we ever execute the body. And so we found out that x was not greater than 0.

We attempted to compute the square root, and before we ever got to the 0 or got to this, we reached an error because the square root of a negative number was taken. Call expressions don't allow you to skip evaluating parts of the call expression. Instead, all the parts are always evaluated before the function is called. And that's different from control statements, which actually pick which parts of the statement are executed and which parts are skipped.

And that's why they exist in a programming language instead of just having functions. There are expressions that allow the Python interpreter to skip evaluating some sub-expressions. Let's take a quick look at examples of those. The logical operators and and or exhibit a behavior called short-circuiting. Here's how you evaluate some expression and some other expression, where we'll call them left and right, but these are just placeholders.

You evaluate the sub-expression to the left of and. If it's a false value, then the whole expression evaluates to that false value. Otherwise, you evaluate the expression on the right. And the whole expression has the value of the right expression. So if this is false, the whole thing is false. If this is true and this is false, the whole thing is false.

If this is true and this is true, then the whole thing is true. And these values need not be just true and false, but they could be any values in Python, because every Python value is either a true value or a false value. So two and three would evaluate to three according to this evaluation rule. Evaluating some expression or some other expression is similar.

Evaluate the sub-expression to the left. If it's a true value, then you know the whole disjunction is true, and so you're done. The whole expression just evaluates to v. Otherwise, you evaluate this expression on the right, and that's the value of the whole expression. Why is this useful? Let's look at a couple of examples. Let's say I want to write a function has big square root that tells me whether some x has a really large square root.

Return square root of x is greater than 10. I chose 10 arbitrarily, but that's just because I want a simple example. Now let's say this is part of the program where I'm interested in the real parts of square roots. So I don't want this to crash if x is a negative number. I just want to know whether the real part of the square root of x is big.

I could write x is greater than zero and square root of x is greater than 10. When I run this code, has big square root tells me that 1 does not, 1,000 does, and negative 1,000 does not because its real part of its square root is zero. And the important part is that this didn't crash. Even though I have an expression whose sub-expression takes the square root of a negative number, this never gets evaluated because of the way and works, once it's figured out that x is not bigger than zero, it's done evaluating the whole and expression.

Let's do an example with or. You can divide. You can even divide a really big number. But if a number gets too big, then you can't divide one by it anymore. So 10 times 100 isn't that big, but 10 to the hundredth power, now that's getting big. But it's still not too big. I could divide one by that. But what about 10 to the thousandth power?

That's a really, really big number, and I can't divide one by that without just getting zero and losing all of the precision of what's really going on. It should be a decimal point with a thousand zeros and then a one, but Python doesn't work that way, as do most other programming languages. There's only so small a number that you can represent without it being rounded to zero.

So let's say I have a definition of whether some number is reasonable, meaning it's not so big that you can't divide one by it and still get a non-zero number. Well, I could just say, is it the case that one divided by n is not equal to zero? But this will crash if I pass n equals zero. And zero is a perfectly reasonable number, it's just not something that I can run this particular test on.

So I might write that n is reasonable if n equals zero or if one over n is not zero, meaning it's not so big that it gets rounded off to zero. So here, is zero reasonable? Well, sure. And ten is reasonable? And you know, this big number is still reasonable. The only unreasonable numbers are when I exponentiate and get ten to the ten-thousandth power.

That's just like a ridiculous number, not a reasonable number. And the important thing is that none of these crashed, including this one. We passed in n is zero. We didn't compute one divided by n because we checked this first. And since this was true, the whole expression was true. And that's why this short-circuiting behavior, which is a form of control, is useful in Python and exists in many other programming languages as well.

Higher order functions are a feature of a programming language that allow us to design functions, as we should, as I just described, by expressing very general methods of computation. Let me show you what I mean. So what we'd like to do is to generalize patterns by defining functions that take arguments that give us back the specific instances of those patterns. So as just a general example, let's look at how we compute the area of geometric shapes based on their length.

So here are three shapes, square, circle, hexagon, and the relevant length for each is the side length for the square, the radius for the circle, and the side length for the hexagon. And the area of each of these can be expressed simply as r squared, pi r squared, and 3 squared of 3 over 2 r squared. So what we're going to do is look at these three formulas and find out what they have in common and what makes them specific to a particular shape.

So it's these constants, 1, pi, and 3 squared of 3 over 2, that are specific to the shape we're interested in. The rest is just how you compute the area of a shape. So if we find this common structure among similar related problems, we could share the implementation. All right, let's actually do that. So here we are. We're going to write some code about generalization.

So we can define a function, the area of square of side length r, by returning r times r. And we can define the area of a circle with radius r as returning r times r times pi. And what's pi? Well from math we can import the constant pi. And then we can come up with the area of a hexagon with side length r, which is r.

Return r times r times 3 times the square root of 3 divided by 2. So now we're in business. We can take the area of a hexagon with side length 10 and it will tell us it's a little bit less than 260. Which is great. It will also tell us that the area of a hexagon with side length negative 10 is the same thing.

Which is not quite right. So what are we going to do about this? Well, let me show you something. It's called an assert statement. It starts with the keyword assert and then is followed by an expression, which is a boolean context. If that expression evaluates to a false value, then an error message is printed to the user whenever they run the Python program.

So 3 greater than 2, that should always be true. If it's not, then math is broken somehow. So when this assert statement executes and this is a true value, then nothing happens. But if I said something that is in fact false is false, then I will get an assertion error and the message that I printed out. So we can put an assert statement in here, assert r is greater than 0, and then a message if that's not true, a length must be positive.

Now that fixes the case for area square and we also need to make sure that r is positive in area circle and r is positive in area hexagon. So I could copy this line and I could paste it in here and I could paste it in here, but then I would be repeating myself and I'm not supposed to repeat myself. John told me so.

Okay, so what do we do about that? Well, we can generalize these three examples by factoring out the part that they have in common, r times r, and also this assert statement that a length must be positive. So we're going to define a function called area, which takes a length and then it also takes a shape constant that gives us the area of the shape that we're interested in.

We're going to assert that the length is positive. And then we're going to return r times r times the shape constant provided. Now this function isn't necessarily that intuitive. It certainly requires some documentation, which I'll skip for now. But what it is useful for is for defining all of these area square, area circle, and area hexagon functions that we already have. So to take advantage of a common implementation, we can just call area with the appropriate shape constant.

So finally, we have area r and then three square root of three over two. So if I now execute this file and then start an interactive session, I should be able to compute the area of a hexagon with side length 10 and get the same result that I had before. But if I pass in a negative number, well, I'll get an assertion error that a length must be positive.

We can also generalize not just over numbers, but over computational processes. So the common structure among functions might not be just a number like we saw with the shape constant. It could be something more complicated. Here are three different mathematical equations. One is the formula for summing up natural numbers. So the sum for k equals 1 to 5 of k is shorthand for 1 plus 2 plus 3 plus 4 plus 5 which is 15.

And the sum for k equals 1 to 5 of k cubed is a bunch of cubes, 225. And here's the third formula. The sum for k equals 1 to 5 of this expression is these terms, which sum to 3.04. Well that's interesting. We'll look at this formula with more terms and we'll see that it eventually converges to the number pi. Okay, so we have three formulas.

They do seem to share something in common. So they only differ in that this has a k, this has a k cubed, and this has something complicated. Other than that, they're all summing from 1 to 5. So it seems that we have some general computational process going on, and then something specific about it. The thing that's specific about it isn't just a number, it's an expression.

Okay, we can write code to generalize this as well. All right, I don't think we need all this anymore. So let's try to function some naturals, which takes in an argument, the number of natural numbers turns to sum, and it sums the first n natural numbers. So how would we use this? We'd call sum naturals on, for instance, 5, and we'd get back 1 plus 2 plus 3 plus 4 plus 5 is 15.

So we can implement this via iteration by writing total nk is 0 and 1, where total is the sum that we're going to return, and k is which natural number we're going to sum next. So while k is less than or equal to n, the last number that we want to sum, we are going to rebind the names total and k to total plus k and k plus 1, respectively.

And then we will return total. Okay, now I have a function that sums natural numbers, let's make sure that it works. Yes it does. Next, we'll write a function that sums cubes, def, sum cubes. Sum the first n cubes of natural numbers. How are we going to call this? Well, it would look like sum cubes, and then I would pass in some number, such as 5, and I would get back 1 cubed plus 2 cubed plus 3 cubed plus 4 cubed plus 5 cubed is 225.

The implementation starts by binding the names total and k to 0 and 1, respectively. And then, while k is less than or equal to n, the last number that we want to sum the cube of, we will rebind the names total and k to total plus the cube of k and k plus 1. And then we return total. See how we did.

See how we did. Okay, so our tests pass, which means some naturals and some cubes do in fact do what we'd like. Notice that there are some similarities between these two implementations. They're basically entirely the same, except for this has a k, and this has a pow k, 3, cubing the number k. So maybe we can do better. Maybe we don't have to repeat ourselves.

That is in fact the case. Let's start out by defining functions that represent the specific aspects of some naturals versus some cubes. So I'll define a function identity, which takes in a number k and returns it right back. So the expression, which is a function of k that we sum here, is just k itself. Whereas down here, to cube k, we will return k raised to the third power.

Now we need to write the generalization over some naturals and some cubes. We do that by writing a function summation, which takes in the number of natural numbers that we're going to sum over. And we're also going to take in a term, which is a function that tells us how to compute each term of the summation. Okay, so sum the first n terms of a sequence.

And how's this going to work? Well, we'll call summation, we'll sum five terms, and we have to then pass in how to compute each term. For instance, if we want to cube each term to get 225, we use the name cube, which is bound to a function that raises k to the third power. All right, for the last time, we will repeat this logic in its most general form.

So we bind total and k to zero and one respectively. And then while k is less than or equal to n, we re-bind total and k to total plus something, and then k plus one. Now how do we get this something? Well, we have to defer to the particular argument that we passed in, the function that computes terms. So a term needs to be a function that takes in k and returns the term that's the kth term of this sequence.

So if we pass in cube, we'll get k cubed, and we pass in identity, we'll just get k. And then finally, we return total. All right, let's run our doc test and see how we do. So it appears that we've implemented this correctly, so summation five cube gives us back 225, which means we don't need this implementation at all. We could just return the summation of n with identity.

And likewise, we don't need any of this. We just return summation of n with the cube function. And does everything work as it's supposed to work? Hmm, that's not what I wanted. It certainly does. So it tries to sum cubes, it tries to sum naturals, it runs summation with the cube function, and all tests pass. Ta-da! All right, let's take a look at actually what happened there.

So we tried to generalize over all of these things. We did it, for example, by defining a cube function, and then defining a general method of computation called summation, which takes in some number of terms to sum, and then a function, which we'll call term, which does the summing. Okay, so this is a function of a single argument. Notice that this function is not called term, it's called cube.

It cubes numbers. There is a formal parameter of the summation function that will be bound to the cube function, the function that cubes. So that within the body of summation, we can refer to whatever computes each term. Okay, so term k, this call expression, actually calls the function that's passed in. And here, in the call expression for summation, do we decide what function to apply to k each time we want to compute a term.

The cube function is passed in as an argument value, and that is a higher order function. It's a function that takes another function as an argument. So, we went through all this work to come up with a general version of summation, and we used it to sum natural numbers and cubes. But what about the summation of those terms that converge to pi?

Well, let's do that too, interactively. From operator, import, mo. Step two, we'll define a function that computes each term of the sequence that converges to pi. Let's call it a pi term, which is a function of k and returns 8 divided by 4 times k minus 1. So, we call summation, let's sum a million terms of these pi terms, and what do we get?

3.141592, and then it's wrong. It's an approximation, but it got us pretty close. Okay, one more example for the day. We're done with this, we'll clear this out. I'm going to show you how to define a function that returns a function as a value. This will be called makeAdder, takes an argument, which is a number, we'll call it n, and it's going to return a function.

This function will take one argument, we'll call it k, and return k plus n. So what does that mean? That means we can create new functions on the fly, like we'll create one called add3, which we'll get by calling makeAdder on the number 3. Once I have this function add3, I can call it on some other argument, such as 4, and it will add 3 and 4 together to get 7.

So part of this function that we create called add3 is that it remembers that 3 was the thing that it adds. Now how do we define this? Well we define adder a function with formal parameter k, which returns k plus n, just as I said in the doc string. Now let me, oh excuse me, let me tell you the structure of this.

We have one def statement here, which within it has another def statement. This return line is part of the body of adder, whereas this return line, as you can see, is part of the body of makeAdder. So makeAdder returns a function, adder just returns a number. And the interesting thing is that adder can use names that are its formal parameter and the formal parameter of makeAdder the surrounding function.

So that was an example of functions as return values. When a function is defined within another function's body, and the function that's created is bound to a name in the local frame. So here's the code for makeAdder, which we just saw. makeAdder is a function that returns a function. In the doc test that I wrote, add3 was bound to that function that was returned.

Now we have a local def statement here, def adder k, which can refer to names in the enclosing function. So n is bound here, k is bound here, and both k and n are available in the body of adder. What happens if I type something like makeAdder1, 2? These spaces are just here as extra space. What you're looking at now is a call expression.

With an operator, that's also a call expression, and an operand, which is just a numeral. So an operator is any expression that evaluates to a function, which is exactly what we get back from makeAdder. And an operand is an expression that can evaluate to anything. So how do we evaluate this? Well, we evaluate the operator, which is a call expression, which means we have to evaluate its operator, getting our makeAdder function, its operand giving us 1, and then we call makeAdder on 1.

And what we get back is the adder function. So we have the adder function available to us. What's it going to be called on? That's 2. So this adder function is going to add together 1 and 2 to give us a value of 3. So let's see this in action. Python 3-i x.py makeAdder1, 2 gives us 3. MakeAdder2013 gives us 2013. But I can also do this in two separate steps.

So I can say make_adder_2000. Now I have a function, which I can call on 13. So what's the point of all this? Well, first of all, we've shown that functions are first class values, meaning they can be passed as arguments. They can be returned as return values, just like any other value in our programming language. A higher order function is a function that does these things, takes another function as an argument, or returns a function.

Now higher order functions are useful because they can express general methods of computation. How to sum things together without worrying about what I'm summing together. They remove repetition from our programs because we only needed to define the active summation once. Finally, we can separate concerns among functions. We want each function to have exactly one job, and having higher order functions allows those jobs to be very general methods of computation, or their functions which they take as arguments or return as values can be much more specific.

## 5. Part p05 - Lecture 5 - Environments

61A Lecture Number 5 Announcements The Hog project is out! The Checkpoint's due next Tuesday, and we're releasing Homework 2, due next Thursday. Between these two, you should get some practice with higher-order functions, which you learned about in Wednesday's lecture. Now we're going to talk more about environment diagrams, and environment diagrams really exist in order to describe how higher-order functions work. And here's where the examples get pretty interesting.

Monday's a holiday, but I'll post just one video of optional content. It's just a long example to show you why you might use a higher-order function in a longer program. But if you don't watch it at all, you'll be fine. It's not going to help you with the exam. It's just for fun. And then Wednesday and Friday next week, we have lecture where we're going to help you process all the information you've already learned.

But the content for the midterm is actually just the set of videos that you've seen so far, plus the ones for today. And then you know everything you need to know to take the midterm. We'll do some review next week to help you get ready. And then the exam comes up on the 11th. And yes, we'll try to grade it all on the 12th, because the 13th is the add-drop deadline, and some students like to know how things are going in the course before that deadline comes up.

So our goal is to give you that information by returning your midterm on Tuesday the 12th. I'll tell you more about how to prep for the midterm next week. For now, you have plenty of assignments to work on, and that's actually the best way to prepare for the midterm right now. Good luck. Let's talk more about higher order functions and how they interact with these environments we've been talking about in diagramming.

So a higher order function is a function that takes another function as an argument value, or returns a function as a return value, or both. Here's the good news. Our environment diagrams actually already handle the case of higher order functions, meaning the rules I taught you already work, even if we're passing functions around instead of just numbers. So now you know the big secret.

The whole reason I told you about environments and environment diagrams is so that we could explain exactly how higher order functions work. Let's have a demonstration. Let's have a demonstration. So let's say I write a function called apply twice, which takes a function and a single argument, and what it's going to do is apply that function twice by calling f of f of x.

Apply twice is a higher order function. Why? Because it's going to take another function as an argument. You better create such a function. How about our friend square? Now we're going to run Python starting with this file. So we can square things of course, but we can also apply twice the square function on the number 3. And it will square it once to get 9, square it again to get 81.

Notice the syntax that I've used. I have apply twice as a function that calls on two arguments, one of which is the value of square and the other is the value of 3. Those are the two arguments passed into the apply twice function, which then squares and squares again. Let's look at this environment diagram. So the first thing I do is define apply twice.

I define square. Notice nothing's been squared yet. But now I'm going to call apply twice on square and 2. Okay.

So apply twice gets called. Introducing a new frame. The formal parameters f and x are bound to the argument values, the square function and the number 2, at which point the body is executed. And the body is f of f of x. So in order to evaluate f of f of x, I first have to evaluate both the operator f and the operand expression f of x.

So f of x requires a call, 2f, which is currently bound to square. So I call the square function on the number 2, which is what x is bound to. By squaring 2, I end up with a return value of 4. So this inner f of x right there evaluates to 4, and then I'm going to call f on 4. And what's f again?

Well, that's the function that squares. So I call square on 4, and that returns 16, which is eventually bound to the name result. 16 is what you get when you square 2 twice. Okay.

Let's look a little bit deeper at what happened right there. After executing the first two def statements, all I have are names for some functions bound to those functions. I haven't called either one yet. Now I apply twice square and 2, which means I figure out what apply is, I figure out what square is, and then I actually apply that function to the two arguments, the square function and the number 2.

So applying a user-defined function involves three steps, creating a new frame, binding the formal parameters f and x to the arguments, and then executing the body, which in this case is just return f of f of x. So when I actually apply this function in the next step, I end up with this environment diagram. I kept the old one around just so you can see the difference.

So when you apply a user-defined function, we've created a new frame. This one's called f1. It was created for executing the body of the apply twice function. And it has the formal parameters f and x bound to the two arguments. The arguments that were passed in were the square function and the number 2. There's the square function. There's the number 2. You can see the bindings right there.

At this point, we can execute f of f of x. And how do we figure out what f even means? Well, this is our current environment, which is a local frame followed by the global frame. And when we try to look up a name in the current environment, we look in the first frame. If it's not there, we look in the second frame, et cetera, until we find it.

But f is actually in the first frame. It's right here. We see the name f is a name given to the function that squares things. That's how the squaring actually happens. Let's talk about environments for nested definitions. Last time, I showed you the following example. I can create a make adder function, which takes informal parameter n. It creates another function within it, make adder k, which returns k plus n.

Now the make adder function returns the adder function, which was defined within its body. So make adder, what it does is it creates a new function and returns it. It doesn't actually add things. If I load this function into Python, what happens? Well I can create new functions on the fly. I can create a function add three by calling make adder on three.

And now I have a function that adds three to things. I could add three to four. I could add three to five. I could add three to six. And somehow part of this function add three is the number three that gets added in. How is it that we have a function that has data within it? Well, let's look at the environment diagram and we'll understand exactly what's going on.

So here's the example. I define make adder, which doesn't execute its body, it just defines a new function. Then I call make adder on the argument three, which does introduce a new frame with the formal parameter n bound to the argument three. Next I define the adder function. That's the first step in the body of make adder. When I define the adder function, I create a new function value and then I bind the name of the function adder to that value in the current frame, which notice is not the global frame.

So the make adder frame and its environment have access to this adder function, but so far there's no way to refer to it from the global frame. But that all changes when we return. So what a return statement does is it brings information from a local frame back into the frame that was the current frame when we called this function in the first place.

So we return back to a particular point. We were evaluating this call expression. And so when we return, we're going to go right back to the point where we evaluated this and we were about to bind it to the name add three. So what is the return value that we're going to bind to the name add three? Well, here it is, the return value for this function that we got by figuring out what adder meant in the current environment and returning that value.

And that value is this adder function. So in the next step, I return right back to where I was before, which was in the global frame, having evaluated make adder three. And the value of that was this function adder, which I bind to the name add three using regular assignment. Remember, we can give multiple names to the same function. Okay.

Now we have add three, which is a function that adds three to things. How does it do that? Its body is just k plus n. Well, let's call add three on four and find out. So we introduce a new frame with k bound to four. Its parent is actually F1, the frame here. So even though we returned from make adder, we still have access to its contents because we have frames that we've created whose parent is the make adder frame, which contains the name n.

I'll go through this in detail in a moment. But what happens here is that we evaluate the expression k plus n in an environment that starts with F2, followed by F1, followed by the global frame. We find k equals four right there. We find n equals three right there. And that's how we get the number seven, which is bound to result. And then we're done.

So this right here is the environment diagram for the example I just showed you. Let's talk about it for a moment. Here we have a nested def statement. And we also have something we've never seen before, a parent of a function that's not the global frame. So what happens is that you set the parent of a function to be whatever the current frame is when that function was created.

And how did this adder function get created in the first place? Well, it's part of the body of make adder. So make adder was the first frame of the current environment when this adder function was created. That's why its parent is F1. So when the parent is F1, then we call the function adder. We copy the name down into the new frame.

We copy the formal parameters down and bind them to the argument values. And we also copy the parent of the function as the parent of the frame. So here's an explanation for why we have parents of functions in the first place. It's so that when we call those functions, we can write down the correct parent for the frame. Now why do we need parents for frames?

Well, that tells us how to find the current environment. So the current environment when we actually evaluate K plus N starts with the adder frame, and then is followed by its parent, which is F1, followed by its parent, which is the global frame. I've abbreviated as G, just so I could fit everything on the screen. It's fine if you evaluate it as G as well.

Okay, so now we have a three-frame environment. If we look up the name K in that environment, we look here first that K is 4 and we're done. If we look up N in that environment, we look first in the first frame of the current environment, but there's no N there. So then we have to look at the second frame, which is the parent of the first frame.

That's N is bound to 3. So we can get K plus N is 4 plus 3 is 7, and we're done. Okay, so what are the key points? Every user-defined function has a parent frame. In all the other examples we've seen, it's the global frame. But when you have a nested def statement, it won't be. The inner def is going to have the frame of the outer def's function call.

The parent of a function is the frame in which it was defined or created. Every local frame has a parent frame, as we've seen. The parent of a frame is the parent of the function called. That is supposed to explain what I did here. When I created this adder frame, I copied its name. I also copied its parent annotation and bound its formal parameter to its argument.

So all the information that you need in order to create this frame correctly, adder parent f1k, is right here in the function value. So if you know which function you're calling, you know how to write down its frame correctly. So here's a little guide to how to draw environment diagrams so that you can draw them on your own without using Python Tutor.

And that's really helpful because then you can understand even complicated examples. When a function is defined, you'll always create a function value that looks like this. Its parent is the current frame. So that's why when we created the adder function, we were in the make adder frame. And so we wrote down that the parent was f1, which was the label for this frame.

Now we don't write down make adder because there might be multiple different frames called make adder, but each one will have a unique label, so that's why we use those. We bind the name to the function value in the current frame. So that's when we had the name adder referring to this function. When a function is called, we create a new frame.

So we add a local frame titled with the name of the function being called. We copy the parent of the function to the local frame, and then we bind the formal parameters to the arguments in that local frame. Finally, we can execute the body of the function in the environment that starts with that local frame. If we need to look up names in that environment, we follow the parent to the parent to the parent until we reach the global frame.

And wherever we find the name first, that's the value that we use. Local names. Formal parameters of functions have local scope. Let me show you what that means. Let's imagine we try to do away with this nested definition business and instead just write two different functions. Def f is going to call a function g on x. g takes some argument and returns that argument a plus y.

And now I call f of 1 comma 2. This is going to cause an error. The error says global name y is not defined. Now, what it's really trying to tell you is that in g, meaning while it was trying to evaluate this return expression, it was unable to find any value for the name y. Here's the example. We define f. We define g.

We call f, x is bound to 1, y is bound to 2. We call g because we're executing the body of f. Now in g, a is bound to 1. We have various bindings for various names and values. And here we see that error. Why is it an error even though y is right here? Well, it's because this frame is not in the current environment.

Here's the code. Here's the moment when the error was caused. Here are the frames that I just showed you. The current environment consists of this local frame followed by the global frame. So when we go to look up the name y, we look for it here and it's not found. We look for it there and it's not found. And so we get an error that y is not in the global frame.

Error. An environment is a sequence of frames. The environment created by calling a top-level function defined here with no def within def consists of one local frame followed by the global frame. You cannot refer to this y, which is local to the body of this function, from the body of this function. Now contrast that with what we saw with make adder where the body of adder could in fact refer to n because it was nested.

We'll conclude the day with a big example. Function composition. Okay.

So what I'm going to do is I'm going to define square and I'm going to define triple, which just returns 3 times x. So here are some simple functions. But now I'm going to define a higher order function called compose1, which takes in two different functions, each of which takes one argument. And it defines a new function h, also over an argument, which returns the result of calling f on the result of calling g on x.

So this is composing the functions f and g into one new function h, which will return. Okay.

So how does this work? We can square 5, we can triple 5. Now we're going to define a new hybrid function called squipple, which involves composing square and triple together. Okay.

So squipple is a function where when I call it on 5, 5 first gets tripled and then that gets squared. 15 times 15 is 225. So compose1 is very general. It takes any two functions and composes them together. For instance, we can also make tripair, which we create by composing triple with square. So if we prepare 5, we get 75. Because we square 5, that's 25, and then we triple that, we get 75.

We can even squatter. What's squatter? Well, that's a function that is created by composing square with make adder of 2. So this gives us a function that adds 2 to things. This squares and if I want to squatter, let's say, 3, then 3 plus 2 is 5 and that squared is 25. By the way, you can write one call expression that does all of this together.

Let's look at the environment diagram for that one. Okay.

We have square. We have make adder. We have compose1. We call compose1, which defines the adder function and returns it. Now we've passed that into compose. So compose has f bound to square and g bound to adder, at which point it will define h and return it. So I made everything smaller so that it's going to fit. So what happens? Well, h is going to call f of g of x.

f is square. First, we need to compute g of x, which involves calling the adder function, where k is bound to 3 and n is 2. So that gives a return value of 5, which gets passed into square, which returns 25. The answer to h is 25. And therefore, that's what you get for this whole expression. Whew. Let's take a look at that image.

This is the same thing you just saw, but I'll annotate it a little bit. So when we evaluated this whole call expression, first we evaluated the operator. Compose1 is easy to evaluate. Square is easy to evaluate, but this is a call expression that involves some work. So we called make adder on 2, and the result was an adder function. Then we called compose1 on square and make adder, and the result was this h function.

And the return value of make adder, the adder function, was passed as an argument to compose. You can see that here. Compose is here. It has one of its arguments. Is g the adder function? Okay.

So now we have h. Now we can call h. What happens when we call h? Well, first we evaluate f of g of x, which involves evaluating g of x. In this environment. So what's f? Here. What's g? It's there. What's x? It's there. And in order to get g of x, well, I have to call adder. And so k plus n, the body of adder, gets evaluated in this environment, which has three frames as well.

What's k? It's there. What's n? It's there. So there are two different environments, each of which has a length of three, and together can't they help us compute the number 25? Lambda expressions are expressions that evaluate two functions. Let's have a demonstration. We already know that I can bind some value to a name, x equals 10. Wouldn't it be nice if somehow I could bind a function to a name using the same syntax, an assignment statement?

Now I know I can bind a name to a function by having something that evaluates to a function over here. But what if I want it to be a new function that I've never written down before? How do I do that? Well, one might think that I can just write down what I want the body of that function to be. I want square to be that function that computes x times x.

So so far I have x bound to 10. And what's square bound to? Well it's not a function at all. It's just a number 100. And why is that? That's because I evaluated x times x in order to get its value, and that's what I bound to square. Now, what a lambda expression allows you to do is achieve what we wanted in the first place.

Bind to the name square using an assignment statement, a function that takes in some argument we'll call x, and computes x times x as its return value. Now this time, when I look at what square is, I find that it is a function, excellent. And what does that function do? Well, let's try it out and see. Oh, it squares things, excellent. So a lambda expression looks like this.

This whole thing is a lambda expression, and it's used to evaluate to functions. I can either take that function and bind a name to it so that I can refer to it later, or I could even apply that function straight away in a call expression where the operator here is a lambda expression, and then I call it on some argument. Let's see what happened right there.

I wrote x is 10. I wrote square equals x times x. What happened when I had that assignment statement was that I wrote down an expression that evaluates to a number, and then square was equal to 100. But the second time I tried it, the one that actually worked, I wrote down an expression that evaluates to a function. That lambda keyword introduces a new function in the form of a lambda expression.

The way to read a lambda expression is as a function with formal parameter x that returns the value of x times x. So eventually, people will start to use the word lambda in casual conversation around you. But what they're meaning is an expression that evaluates to a function that can be interpreted in this way. It's important to note that there's no return keyword in a lambda expression.

This is a quirk of the expression, that you just write down the return expression directly after the colon without the word return. This limits you to having just a single expression be the body of the lambda function that you create. So lambda expressions create functions, but they always create simple functions that do nothing but evaluate a single expression. Once I've done this, I can square 4 and get 16, and square anything I want.

Now lambda expressions are not particularly common in Python. It's more common to use a def statement. But they are really important in general. And in some programming languages, they're totally fundamental. In other programming languages that didn't have them for a long time, they're starting to appear because people have realized just how wonderful a lambda expression is. Lambda expressions in Python cannot contain statements.

And so they are limited relative to their close cousin, the def statement. So just be aware that if you want to put a while statement inside the body of a function, you can't use lambda. You have to use def. What else is different between a lambda expression versus a def statement? Let's figure it out. Face-off time. Over on the left, we've got lambda x is x times x bound to the name square.

On the right, we have the def statement version of square. How are these different and how are they the same? Well, it turns out they're almost exactly the same. Both create a function with the same domain, range, and behavior. Both functions have as their parent the frame in which they were defined. So the rules for creating functions is exactly the same whether you use lambda or you use def.

Both bind that function to the name square. Well they do it in very different ways. So this first creates the function with no name at all. And then it's the assignment statement here that binds that function value to the name square. Whereas, in a def statement, both of those things happen automatically. This creates a square function and binds it to the name square, all as a byproduct of executing the def statement.

Aha! We've found a difference. Only the def statement gives the function an intrinsic name. What's an intrinsic name? Well it's the name that you see if you actually display what the function is. So if I type in square, it tells me this is a function called, well, lambda. It's not called square. Which is different than what I used to get when I type in def square x, return x times x, and then I would look at what square was, and this said function square.

So there's this one little place where you'll see a difference, which is what happens when you try to look at the function value, and it has a name. That's called the intrinsic name of the function. Now they're both referred to by the name square in the same way. When you put them inside of an expression, all the same rules apply. So they're virtually the same.

But this one difference does change a bit how we draw our environment diagrams. So an environment diagram for this example, including the case where I define square equals lambda x, x times x, and then I call square on the number 4, will look like this. We have the name square bound to a function. We introduce a new frame to call that function on 4, and we get a return value of 16.

The name square appears in the frame, and these are the names that we actually use in order to evaluate expressions. These are the important ones. In here, we don't write square, but instead write the Greek letter lambda. And that means that when I call this function and I copy all the information over to a frame, well, the name lambda sticks around. But that name isn't really important either.

It just helps us keep track of which frame is rich. By contrast, when I def square, x, return x times x, and then I call square on the number 4, we get this familiar picture, where square is bound to a function that's called square intrinsically. And when I call square on some value, like 4, then I get a frame that says square in it.

Okay, so a tiny difference, really insignificant. But it comes with the fact that this thing had a name when it was created. Whereas the lambda didn't have a name until the assignment statement finished giving it one. Currying. Function currying is a way of manipulating functions. So, for the last two lectures, I've implemented make adder for you. It's becoming a bit of a tradition, so let's do it again.

Def make adder takes an argument n, returns a function which takes an argument k, and returns n plus k. Notice that I have now used a lambda expression rather than defining a function called adder, but the effect is the same. So once I have make adder, I can write a call expression where the operator is itself a call expression. Make adder 2 gives me back a function that adds 2 to things.

I pass in 3 to that function, and I add 2 to it to get 5. So I call make adder this way. Two calls are required to actually get a number out. And that's by contrast, we have add, which is a function that just takes two arguments and gives you back their sum. Now, the relationship between make adder and add is a general one.

It's between functions that take one argument and give you back functions, and a function that takes multiple arguments and just gives you back the eventual answer. So we can express this general relationship in code. I'll define a function called curry 2. 2 means that the function I pass in takes two arguments. And what it does is it defines a function g, which takes one argument.

Add defines a function h, which also takes one argument, a different argument. What h actually does is it returns f called on x and y. G returns h, and curry 2 returns g. Now what have I done? Well, I've created a function, curry 2, that turns two argument functions, such as add, into higher order functions, such as make adder. Here's the add function.

If I want to create an equivalent to make adder, all I have to do is curry the add function. Okay, now I have something that behaves just as make adder behaves, which means I can create add 3 by calling m on the number 3. And now I have a function that adds 3 to things. It is the case that I could express curry 2 as a nested lambda expression.

It is a function that takes f, returns a function that takes x, which returns a function that takes y, and returns f of x, y. Just as before, I can apply my new curry 2 to add, and then add things with it via a higher order function. So that's the general relationship. Currying is the act of transforming a multi-argument function into a single argument, higher order function that returns a function that takes the rest of the arguments.

Currying was discovered not by Haskell Curry, but by Moses Schoenfinkel. And then it was rediscovered and made more popular by Haskell Curry. So, some people think it should be cultured and finkling.

## 6. Part p06 - Lecture 6 - Sound (Optional)

Students often ask, what's the point of higher order functions? Make adder is cute, but why don't we just add x and y directly instead of building a higher order function? So I've constructed a slightly longer example that tries to illustrate why you might want to define a bunch of functions and work in the space of functions until the very end of the program.

And the example is generating sounds. So what we're going to do is write down a wave file. That's a standard format for encoding sounds. It's not used much these days because it takes a lot of space. It's a really simple format that doesn't involve any compression at all. But it's really simple to generate a wave file, so that's why we'll use it.

All a wave file does is encode samples of a sound wave directly. Sound comes in waves. The wave has amplitudes at any moment. And what sampling does is allow us to digitize this wave by just recording the height or amplitude of the wave at particular moments. So that's what these dots are. Thanks, Wikipedia, for this cool picture. So the wave itself looks like this.

We take lots of samples at particular moments in time, and we're going to take, for example, 11,000 different samples every minute in order to get as close an approximation to this structure of this wave as we need so that it sounds cool to the human ear. And usually these waves are created by recording sounds in the real world. But you can also generate waves from scratch according to mathematical functions.

And there are several standard simple waves, one of which is called the triangle wave. So there's a sine wave that you can generate mathematically, or a square wave, or a triangle, or a sawtooth wave. All of these are used in various forms of electronic music. I think the triangle wave sounds better than the other three, so that's why we're going to use it in this demo.

Since this example is a little longer than usual, I'm not going to type out every line, but I'll show you what I've done. I've used some of the built-in modules in Python in order to construct the wave file. There's a whole module about waves. You can read about it. There's a module about encoding integers in the format that wave files require. That's called struct.

And then we'll need the floor function, which takes a number and rounds it to the greatest integer that's less than that value. Now we pick a frame rate. That's the sampling rate. How many times per second do we want to have some value that tells us how high or low is the wave form of the sound? And here's the part that I don't think you should read.

You're welcome to. Here's how you encode a value according to what the wave file requires. You can read about how this works on the Python docs, but just trust me that this is one way to get the value you need. And here's the function that actually writes the wave file. So we pick some name for the file. The standard way to write this is some name dot w a v. We pick the length of the sound that we're generating.

And then we have a function that's going to describe the wave form for the song that we're trying to generate. And this is the function that we're going to write later. Whatever this function is, it's a function of t, the time into the song that has elapsed so far. So we start out at the beginning of the song. And then we go through all of the t's that are the number of seconds in the song times the frame rate.

So we're going to do 22,000 times call our wave form sampler on t. And then we'll write that out to the file in order to generate the wave file that our computer will actually be able to play. So sampler is some function that we're going to need to generate that gives us numbers between negative one and one and describes the samples of the wave.

So if we were trying to generate this sound, then the sampler would have to give us zero and then a half and then one and then three quarters and then that's about a half again and then two thirds or whatever these values are at each sampling point. Now how do you come up with the samples for a triangle wave? Well, you have to know the frequency of the wave that determines the pitch and the amplitude that determines the volume.

And then there's this fairly straightforward equation, which is that you figure out how many time steps are required before the triangle wave repeats. So in order to draw one triangle shape like that. Once you have the period, then you can write down a function that takes in the value t, builds a saw wave, computes the absolute value of the saw wave, multiplies by the amplitude, and then you have a triangle wave.

And one more line I'll add here is that the frequency for the note c is 261.63. That's just a fact about how instruments are tuned in the modern world. Okay, let's see what happens when I create a triangle wave at the frequency of c. Let's set t equal to zero. While it's the case that t is less than 100, I'm going to print out what I get when I call c on t, and then I'm going to increase t by one, and we'll see the shape of the triangle wave.

Okay, so it starts out at negative 0.3, because that's my amplitude, works its way up to zero, and then all the way up to positive 0.3, then works its way down to negative 0.3, and it works its way up to positive 0.3. That's our triangle wave. If we play c, what I've done now is write a file. I'm going to open it up using my operating system.

Here's the file, song.wave, and if I play it, I heard a triangle wave for c. Okay, so things are getting interesting. Now I can play a sound, and the sound just sounds like a flat tune, but that's something I can work with. I can take a function, like what comes out from tri, and combine it with other functions in order to make music.

So next, let's write down the frequencies for three different notes, c, e, and g together. And what would it mean to play two at the same time? Well, I'd need a function that plays both, some f and some g, which are both functions, and that's a function of t that just returns f of t plus g of t. Now I think I can construct a two-note chord just by playing both a triangle wave at c's frequency and a triangle wave at e's frequency.

Don't forget to return a function, and then we'll run our code, and hear what we got. Ah, a c and an e together. Let's add some rhythm. I'm going to define a function that takes in some particular sound, f, and only plays it from start to end, where start and end are measured in seconds. To do that, I need to create a new function.

A sampler function that first expresses t in seconds. That's t divided by the frame rate. Then checks to see whether those seconds are between start and end. If seconds are less than start, return zero. If seconds are greater than end, return zero. Otherwise just play the sound. And the sound in this case is a function, where we just call that function on t in order to get it to play.

So let's create c and e as triangle waves at c frequency and e frequency, and we can play a note. The c note from the beginning, and let's make it a quarter note. All right, mostly silence with a little beep at the beginning. And what if we want two beeps? Well, then we'd play both. The c, which is a quarter note at the beginning, and an e, which starts after a half a second, and lasts for a half a second.

I run my code again and listen to the song. Now we're getting somewhere. But notice it sounded a little harsh at the beginning and end of each note. Almost a little scratchy. I don't know if that comes through in the video. But it's an important part of making music that you make each note sound right. The way we'll fix that is just to add a little fade at the beginning and the end.

And for a hundredth of a second, we'll have the amplitude increase and then decrease. So if it's the case that seconds is less than start plus the fade in time, then what we're going to do is compute the difference between seconds and the start. So that's how far into the sound we're in. And we'll divide by the fade length to get a percentage of the fade, and we'll multiply that by f of t.

If it's time to fade out, that's when seconds is greater than n minus the fade. We can figure out how much is left, n minus seconds. Slide that by the fade time and multiply by the amplitude. So that means we'll fade in and then we'll fade back out. In order to hear the effect, maybe we'll make our fade length a little bit longer.

How about 0.1 seconds? But to make it sound as natural as possible, we'll do a really short fade. So it's like the note is starting up right away, but we don't get any weird artifacts in the sound. Two nice clean beeps. Let's add some more. I'm going to keep track of how far we are into the song, starting with 0. My first note will be starting right there at C. I'll play an E. And I'll play it for just an eighth of a second.

Okay, now I'll move forward in time by an eighth of a second. And then I'll keep the song that I have already and add another note. How about another E starting where I am now? This time it's an eighth note. But after it, I'm not going to play another note for a quarter of a second. That means I have an eighth note followed by an eighth rest.

I'll do that again and then have an eighth note that has no rest after it. And now I think it's time for another note. Let's make this one a C followed by an E. How much time have we used up in total? Well, there's three quarters and two more eighths makes a whole second. We have two seconds according to the length of the song that we defined in the beginning.

So let's add a couple more notes. How about a G for a quarter and have a little bit of rest after that and then another G. But this time let's make a low G. The way you reach a low G is just to define the frequency in half. So I'll make a triangle wave for G's frequency and then a triangle wave for G's frequency divided by two.

And instead of playing these two notes, we're going to play our whole song. All right.

So we have the beginning of the Mario theme just as one note at a time. But remember, we could play chords. Here's a way to make chords. I'm going to put all of this into a function. The Mario function needs to know which C, E, G, and low G it's going to use. And then it will return the song that's generated. Instead of committing to a particular C, E, G, and low G, we'll play Mario at a particular octave.

And the way you set the octave is just to multiply the octave by the frequency. So if the octave says go one octave above, we'll write that as two which multiplies all the frequencies by two. Or if we want to drop an octave, then we'll just divide by two or multiply by one half. So how do we make a song? Well, we have local names C, E, G, and low G.

We'll call Mario on those, which might be different depending on what octave was passed in. And now we can play Mario at different octaves. Mario at one is what we heard before. Mario at one half plays it an octave down. And of course, since we're representing these as functions and we can combine functions in any way we want, we can play both Mario at one and Mario at one half together.

And that's how you make music using your computer. All by defining functions, building some elaborate function built out of both and tri combined together in lots of interesting ways. And then we pass that function into play and it just calls that function on every value of T, writes out the result to a file, and that's how we have a song.

## 7. Part p07 - Lecture 7 - Functional Abstraction

61A Lecture Number 7 Announcements Homework 2 is due on Thursday. Hog project is not due until next Wednesday, but you get an early submission point for finishing by next Tuesday, and you're meant to complete Phase 1 this week, this Tuesday, in order to earn the Check Point. The Check Point is just one point out of many, but it's worth getting, so I would try to finish Phase 1 by today.

Midterm 1 is coming up next Monday. The format of the exam is a paper exam. You can see past exams here, we list them all, and you can expect the format of the exam to be similar to past exams, especially past fall semester exams. We will provide, on paper, the Midterm 1 Study Guide, which looks like this. It's just a bunch of slides from the videos so that you can refer back to the evaluation and execution rules of different kinds of expressions and statements, see an example of an environment diagram, and look at how various built-in functions work, like min and max and abs and pow.

There are also some examples, and here's a larger environment diagram. I do recommend looking over the study guide in advance so that you know what's there and you can use it more effectively during the exam. You're also welcome to bring a one-page, two-sided sheet of notes. I recommend putting some examples there that you found helpful. Please arrive by 8 p.m. to find your seat and receive your exam so that you can start right at 8 p.m. And the exam will cover material through Lecture 5, which is already past.

The lectures this week will just provide some practice of that material so that you understand it better. And next Monday there's no lecture, and next week there's no lab, but there is lab this week. And I think the lab this week, discussion this week, the homework too, and the hog project are all really good ways to prepare for the exam. Once you've made it through all of that, it's not a bad idea to try to take a practice exam from one of the recent past exams, and then you should be prepared.

Good luck. Let's look at an example of an environment diagram that includes lambda expressions and lambda functions. A lambda function's parent is the current frame in which the corresponding lambda expression is evaluated. So here's an example where we set a equal to 1. We define a new function f, which takes a function g, assigns a to 2. This will be a local assignment within an f frame.

Then it returns a function. In this case, a function that's created through a lambda expression lambda y a times g of y. So here we see how g is used as it's called within the body of the lambda. Now we call f, f takes a function and we create one here, a function that adds a to whatever's passed in y. Now this call to f actually returns another function, which means we can call that on a.

Now, the key question here is, which a is used in each of these cases? This expression, lambda y a plus y, is evaluated in the global frame. I know that because it's not part of the body of some function. Everything that is not indented at all is going to be evaluated in the global frame. So I know that this will create a function whose parent is global and therefore a will be the global a, 1.

The rest of this expression where we call whatever is returned on a is also part of a global expression, not part of the body of a function, and so this a is the global a as well. By contrast, any lambda expression that appears within the body of f is going to have as its parent the f frame. In that frame, a will be assigned to 2.

This lambda expression will be evaluated in that frame and therefore will have the parent f, and so when it is called, a will be 2. Now we're ready to look at the environment diagram. A is assigned to 1, f is bound to the f function. Then we try to evaluate this expression. In order to do so, we have to evaluate its operator to figure out what function we're going to call.

And that operator is itself a call expression where we evaluate f, okay, so we're calling this function, and we evaluate the operand sub-expression which creates a new function. Here we are on line 5, a lambda function, and notice the parent is global because this lambda expression is part of a global expression, not part of the body of any function. Even though the way that this gets used is that it's immediately passed in as an argument to f and therefore only can be referred to from within the f frame.

So f has the name g, which is the formal parameter g, but it's bound to a lambda function whose parent is global, meaning that when it gets called, it's going to use the global a instead of the local a. A gets bound to 2, and we return a function. This function, even though it will be called later, will have as its parent f1 because it gets its parent when it's created, and it gets created and then returned.

Where does it get returned to? Well, it's the value of this expression. So now we know what function we're calling on a, and we need to look up what a is. That's 1, and we're ready to call this lambda function on 1, which we do here, creating a lambda frame with parent f1 for the lambda on line 4 with its formal parameter y bound to the argument 1.

What does it do? Well, we have to go look up its body. This one, a times g. Let's say, we look here, and there's no a, so we look in the parent, a is 2. And what's g times y? Well, we have to figure out what g is. There's no g here, so we look in the parent. There's g. We're going to call g on the number 1, and that's what leads to this additional frame.

This frame is for evaluating a plus y. When I look for a, I find that it's not here, and so I look in the parent, which is global. It was the 1, y was 1, and I add those together to get 2. This 2 is the value of g of y. We already looked up a. It was 2, which is why we get a return value of 4.

Returning from a function call means ending the function call and determining what is the value of the call expression. So return statements we've seen, but we haven't talked a lot about. A return statement is there to complete the evaluation of a call expression. When you evaluate a call expression for a user-defined function, you have to execute the body of that function in a new environment, and you keep doing that until you reach a return statement, or you reach the end of the body.

So when you reach a call expression like f of x for some user-defined function f, that's when you switch to a new environment, and it's time to execute f's body. Why are we doing all this work? In order to figure out what's the value of f of x. When the return statement within f is reached, we switch back to the previous environment, the one in which f of x was being evaluated, and now f of x has a value, and that value typically determines what happens next in the original expression.

We're maybe assigning the value of f of x to a name, or passing it in as an argument to some other function. Whatever it is, when we reach the return statement, f of x now has a value, and that value is the value of the return expression in that statement. Only one return statement is ever executed while executing the body of a function.

Once that return is reached, we're done. So for example, let's write a function that prints the final digits of an integer n in reverse order until d is found. Let's assume n is non-negative. Here's an example of what we're doing. End of 3, 4, 5, 6, 7 is all the digits starting from the end of 3, 4, 5, 6, 7 until we reach a 5, and then we're done.

So we start with 7, and then 6, and then 5. We found a 5, so we're done. How would we write this function? Well, one simple way to do it is to write a while statement that just prints all of the digits, 7, 6, 5, 4, 3. The approach here is to say that while n is greater than 0, we split n up into its last digit and everything but the last digit, print the last one out.

Now we need to make sure that when d is found, we're done, and we can do that with a conditional statement containing a return statement. If I find d as the last digit in whatever piece of n we're currently looking at, then we return none as a way of ending the process of the while statement. Once you return, nothing else gets executed within the body of this function, end.

Let's look at some more examples of one we might return from within the suite of a while statement. I'm going to write a function, search, which is a higher order function. It takes another f, and it keeps trying all of the integers starting at 0 and working its way up until it finds one for which f of x is a true value.

Now what's a true value? True is a true value, or a number that's not 0 is a true value. So we'll start with x equals 0, and I want to keep trying x's just as long as it takes to find one where f of x is a true value. One way to do that is to purposefully construct an infinite loop. This while statement will run forever unless a return statement within it tells us that we're done.

While true, if it's the case that f of x is a true value, I want to return x. If that's not the case, I want to try a different x. I could write this as x equals x plus 1, or the shorthand x plus equals 1, which will have the same effect if x is a number. Here's a simple function to search called is3, which will return true just when x equals 3.

Putting these together interactively, we can see what happens. I want to search for an x such that when I pass it into is3, I get a true value. That's because when I call it is3 on 3, I got true. But when I called it on 2, I got it on false, 1, I got it on false, etc. So far, this brute force search seems pretty useless, but let's get a more complicated example.

Here's the square function. Here's a version of the square function that is always non-negative because it takes a max of 0, and then we'll square x and subtract 100. So, this positive function, when I pass in 2, I get 0, and 3, I get 0, and 4, I get 0, and 10, I get 0 because x squared minus 100 is 0. But if I pass in 11, I'll get 21 because 121 is the square of 11.

So, the goal of search is to find the smallest number x for which x gave a positive value. Now there were no trues and falses here or comparisons. We're just using the fact that 0 is a false value and that any other number is a true value in order to reach this return statement. And what's cool here is that 11 is related to the square root of 100.

So, so far we've come up with a scheme for finding a number that's one more than the square root of whatever I put there. A method for computing square roots just by trying a bunch of numbers until I find it. This is a general strategy for computing inverse functions. The inverse of s is to return a g such that it's the case that f of x passed into g gives us back x.

And how do we find such a g? Well, it's a function that takes in y and then we'll just search for an x that satisfies f of x equals y. So notice the square root is not built into Python, but I can define it now by saying it's the inverse of square. Now just like I can square 16 to get 256, I can take the square root of 256 to get 16 back.

Or the square root of 16 is 4 and the square root of 4 is 2. Now this version of square root will only work for perfect squares. Right now it's searching for an integer that when you square it gives you 2 and there is no such integer. So it's not the most ideal implementation of square root. If you want to see a better version, take a look at the Newton's method section of the textbook.

But for perfect squares it works just fine and it's pretty simple. As a final question, is there a way to write an even shorter version of search? Well, sure. I could say while it's not the case that f of x is a true value, I want to add 1. And then I want to return x once I've found a true f of x.

And this version also allows us to compute square roots just like before. So I think once you've written down an implementation for a function, it can't hurt to stare at it for a little while and see if there's some way to simplify the logic. Abstraction. So functional abstraction is giving a name to some computational process and then referring to that process as a whole without worrying about its implementation details.

So here's a function, square, and here's another function, sum squares, that calls square in its body. And the question is, what do sum squares really need to know about square in order to use it correctly? So for each of these, try to answer it yourself before I show you my opinion. Does sum squares need to know that square takes exactly one argument?

Yes it does, otherwise it can't call it. Does it need to know that square has the intrinsic name square? No.

An intrinsic name is only there so that humans can inspect the name of a function. Any function with any intrinsic name, as long as it's bound to the name square in the current environment, will suffice. Do we need to know the behavior of square, that it computes the square of a number? Yes.

In order to use a functional abstraction effectively, you need to know what it's supposed to do, its behavior. Do we need to know that square computes square by calling the mul function? No.

It can compute the square any way it wants, and will still have a correct implementation of sum squares, which relies on square. So we could compute square like this, with the built-in pow function. Or I could invent some strange way of computing squares, such as this. If the name square were bound to a built-in function, in fact, then sum squares would still work identically.

It doesn't matter whether a square is user-defined, or built-in, for some squares to use it. Now let's talk a little bit about choosing names. Names are there to help people. Names that you choose typically don't matter for the correctness of a program, but they do matter a lot for composition, or for how you write your program in such a way that other humans can read it.

So here are some guidelines. Names should try to convey the meaning, or the purpose, of a value to which they are bound, so that it's easy to see why we've created this value and what we're going to do with it next. The type of value bound to the name, whether it's a number or a string, is best documented in a function stock string, as opposed to the name that you bind to the value itself.

Function names, the names that we give to our functions that we define, typically convey either their effect, such as printing, their behavior, such as tripling, or the value returned, the absolute value of a number. All of these are reasonable ways to name a function. So here are just some suggestions, the stuff on the left is not such a good idea, the stuff on the right is preferred.

Instead of calling some value true-false, just because it's either true or false, try to say what it's supposed to represent, such as the fact that a player rolled a 1 in the game of hog. Instead of just single letters, such as d, in the context of a larger program, it's very helpful to use a whole name, such as dice. When you're naming a function, you can describe what that function does, what it's behavior is, as opposed to just who calls it.

So when you're defining play, we had a functional abstraction for taking an individual turn, and instead of calling it play helper, or play subfunction, just because it was called by play, we called it take turn, because that's what it does, it simulates taking a turn. And then, not just play, but some other function could use it as well. We don't want to name values just by their type.

So instead of my int, to say that something is an integer, we want to say what the purpose of storing that integer is, and what it represents, the number of roles, for instance. And finally, there are some names that are just extremely hard to read, depending on your font, such as the lowercase l, the capital I, the capital O, can be confused for numbers 1 and 0.

It's much more typical if you're going to use just a single letter to use something else, like k, i, or m. And then you have to wonder about which values deserve a name at all. We don't have to give every intermediate value in our program a name, because we can have compound expressions. But if you have the same repeated compound expression over and over again, it's often better to give it a name.

That way if you want to change it, it will change everywhere. So if I write something like this, where I've computed the square root of a squared plus b squared, both in a conditional statement and in the assignment statement in its suite, it's probably better to give that thing a name, and then use it twice, here and there. So that if we need to change how we compute the hypotenuse in some way, we can do that all in one place.

So don't repeat yourself. And also, don't make your expressions too complex, so complex that it's hard for a human to read them. Even though a computer has no problem with this long line, it can take a human quite some time to understand what's going on. It might be better to pull out some meaningful subpart of it, such as the discriminant of this quadratic formula, and give that a name so that both this equation and this equation are easier to read for a human than trying to understand this whole nested thing.

I have a couple more naming tips. Names can be long, that's okay, especially if they help you document what your code does. So an assignment statement that takes the average of the age of some students and calls that at the average age is a fine way to explain what's going on, because it's kind of clear what every piece of this is going to do.

And I think that's preferable to including a comment about what is going on, and then a more cryptic expression. And finally, I think it's okay if names are short, even single letters. If they're representing generic quantities, such as you can take the absolute value of any real number, or you're using just a count or an argument to a mathematical operation, or you're wrapping some generic function.

But there are conventions that are worth learning because programmers use them in many different programming languages. Certain letters are used to represent integers, others often represent real numbers, and others are used to represent functions. These are all just practical guidelines. You don't have to memorize them all. You don't even have to obey them. Writing programs is a creative act, and if you want to do something else, that's fine, as long as your program is understandable by other people.

So having conventions makes everybody understand a little bit better. Let's talk about errors and tracebacks. Errors come in three forms. The kind that Python can detect before it even starts executing your program. Those are called syntax errors. And they're caused by having expressions that aren't formed well. The syntax of a language is its form, which requires that every opening parenthesis has a closing parenthesis, and that a plus sign has to come between two expressions.

It can't come at the beginning. These kinds of things. The second variety is runtime errors. These are errors that are detected by the Python interpreter while your program is executing. And when those occur, you see a traceback, which is a report that describes what was going on in your program when the error occurred and what line to look at in order to fix the error.

And the third kind of error, a logical or behavior error, wouldn't be detected by Python at all. The program runs. It just does the wrong thing. The way to check for those is to write tests and check to see that those tests correctly describe the behavior of your program. So let's take a look at some of these and talk about how to interpret the traceback that it is shown by Python when a runtime error occurs.

So I'm going to write some code def of x returns some function g of x minus one. And what is g? Well how about it's a function that does something slightly more complicated. It calls another function h on y, and then it subtracts out the result of calling h on one divided by y. But here I'm going to introduce a syntax error.

You're not allowed to divide times. You have to either divide or multiply. You can't do both. Okay, and then h of z, let's keep that simple, just square z. Okay, then we'll print the result of calling f on 12 and see what we get. It should be the case that Python notices the mistake that I've made, and it does. It tells me what line of what file was incorrectly formatted, a syntax error, and it even shows me exactly where in the line that happened.

That's what this little caret is. So I just delete that, and then my program will run. Oh, it didn't run. It says there's a syntax error on line seven. Syntax error, line seven of my example.py file. And here is line seven, and it looks just fine to me. Basically the problem is that I opened a parenthesis and never closed it up here.

So Python was expecting that whatever appeared on this line was part of the abs expression that I had never finished. And you can't have a def in the middle of a call to abs. So sometimes when you see a syntax error, in fact, the error is nearby. And this is just the first place that Python, the interpreter, was able to detect the error.

That's what it tells you about. And now we're done. Well, now we're done with syntax errors. We've now encountered a type error, which is a kind of runtime error. And so we see a traceback for the first time. A traceback tells you what was happening in your program when the error was detected. The error that was detected is a type error, which usually occurs when you try to perform arithmetic on things that you cannot perform arithmetic on, things that aren't numbers.

So in this case, we try to subtract something that's a none type and something that's a none type. It turns out there's only one thing that's a none type, and that's the value none. This is the same error you'd get if you wrote none minus none. Except this one has a traceback that says it happened on line one of some mysterious file called stdin.

This is normally read as stdin, but that's not an important topic for today. Here we got a much more useful traceback because we were running code within a file. It tells us which file, which line the error occurred in, but it also tells us what was in the process of being executed when this happened. So we were in g, the g function was being called, but it's also the case that the f function was being called and it hadn't completed yet.

It was in the process of executing f's body and this line in f's body, which said call g of x minus one, when the error occurred. And in fact, that's not the only thing that was going on. Python was also trying to find the value of print f of 12. In order to do that, it had to evaluate f of 12, which means it had to call f, which means it had to call g, which means it had to call h.

And then once it had called h twice, it needed to subtract, and that's where the error happened. That's where Python noticed that something had gone wrong. Something had actually gone wrong before then, which was that h had returned none instead of the square of z because we never wrote return. So again, this is the position where the Python interpreter noticed a problem.

That doesn't necessarily mean it's the line of code that needs to be updated to fix the problem. The problem might have occurred earlier and only been detected by Python at this point, which is the case here. But this is still useful output because it tells us where to look on line 5 of the file ex.py. And if we think about what might have caused none to be subtracted from none, well, it would be natural to look at h and we found our problem.

And now our program works. If we change the argument, now we have an error again. It tells us where it was. It turns out it's on that same line, but this time it's a different kind of error. A zero division error was caused by some division here. Well, it must be that one. Must be that we divided by zero. So in this case, the problem wasn't here.

The problem was actually here, where we called f in the first place. We called it on an argument that eventually allowed us to divide by zero, which you can't do. So I'd say this is a useful starting point. But in this case, it's quite helpful to have the rest of the traceback because you can see how we got to a y value of zero.

Oh, it was from a x value of one, which came from this original expression, which needs to be fixed. So that's a little bit about how to use a traceback in order to find the problem in your program. So that will help you debug something one day. That will help you debug something one day. That will help you debug something one day.

## 8. Part p08 - Lecture 8 - Function Examples

61A, Lecture number 8, Announcements. There is an exam on Monday. There's no lecture on Monday, and there's no lab next week. There's just the exam in the evening. It starts at 8 p.m., and please try to arrive then, although the exam itself will not begin until 8.10. It usually takes about 10 minutes to get everybody in their seats and distribute the paper exams and everything like that.

The reason we're having the exam so early in the semester is to try to get you your graded exam score before the add-drop deadline in case you want to consider changes to your class schedule and so that you have some early feedback about how things are going. But I'll point out that because of the exam recovery policy in this course, if you do well on the final, you can get up to 90% of the points back on midterm one, and midterm one is not worth as many points as midterm two or the final, so this is not a particularly high-stakes exam, but it should give you a sense of whether you're understanding the material so far.

The exam balances some understanding of the programming language and how it works with some problem-solving using the tools that you've learned. Midterm one questions do generally restrict students to using only the topics that we've covered in the course, so knowing more of Python than we've covered really isn't going to help you. You do need to know how to draw an environment diagram, you need to be able to predict what Python will do, and you need to be able to implement some functions.

A great way to practice is to do the optional questions that appeared on lab, go through the discussion questions to make sure you understand those, and likewise for the homework and project questions. And perhaps most important of all, get some rest before the exam because problem-solving is a lot easier if you've had some sleep. Okay, today's lecture videos are mostly just review questions from past exams that we'll walk through together.

There is one little piece of content, which is about decorators, which will not appear on the exam, but it's really just a small extension beyond what you already know about higher-order functions. It's a cute little feature of Python that you might see people use in the world, and now seems like a good time to talk about it, but it's not something you'll be tested on.

Let's look at a few review examples. These examples are taken from past midterm ones. One of my favorite types of questions is what would Python print, where you tell me what output you would see on the interactive interpreter when entering some Python code. So one of the most important things to remember is that the print function always returns none. It also displays its arguments separated by spaces when it's called.

So often I'll put something like this, a small definition such as the square function, maybe import, add, and mol from operator. And then I'll start asking questions like, given an expression, what does it evaluate to? Or what interactive output would you see if you entered that expression in the interactive interpreter? So if you enter five, it evaluates to five. The interactive output is also five.

If the expression is print five, it evaluates to none, but the interactive output does display the number five. Now what about the value none? Well, that value is computed for print five, but remember the interactive output does not include none if it's just the value of an expression. To ever see none here, you have to explicitly print it out. Now if you see a nested expression, print, print five, call expressions are evaluated by evaluating the operator, evaluating the operand.

In this case, evaluating the operand prints the number five and evaluates to none. And then we apply the print function to this value, none, which actually prints that out in the interactive output. Now the whole thing also evaluates to none, but by printing five here, I get a five, and by printing none, I get a none. So the full interactive output looks like five, none, and the whole expression evaluates to none.

Okay, then oftentimes I'll define some other simple function and ask you what it does by giving you expressions that include calls to that function. So let's look at this one. def delay arg, print delayed, def g, return arg, return g. This is a very common pattern where you have a def statement within a def statement. I define a function g and then I return it.

What happens is when I call delay, a new function is created and that function g has as its parent frame, the delay frame, that was the first frame of the current environment when g was created or when it was defined. So that means whenever I call g, then the body of g gets executed and it can refer to names that are in its enclosing scope.

That means names that are bound in the delay frame that was the first frame of the current environment when g was defined. So this arg refers to whatever arg was within delay when g was defined. So if I call delay on delay and then call that and then call that on six and then call that, what's going on here? Now remember, this is one big call expression.

So all the parts need to be evaluated before we can evaluate the whole thing. We talked about this, that names in nested def statements can refer to their enclosing scope. So that arg will mean something. It will mean whatever it was bound to when we call delay. And so delay is a function that takes any argument and returns a function that returns that argument.

Okay, so we have some idea of what delay does. Let's just go through and figure out exactly what it means to call this call expression. So this call expression has a complex operator, which is this whole thing up to but not including the final set of parentheses. So we have to evaluate everything that's underlined here first and then we'll apply that function to no arguments at the very end.

Now what's that? Well, that's actually a call expression with a compound operator. So we now have everything up to but not including this parenthesis as something we need to evaluate and then we'll apply that to the number six. Okay.

Now what's that? Well, that's a call expression as well. And here's the compound operator, delay, delay, which will apply to no arguments. Okay, so what's delay, delay? Well, that's a call expression where I'm calling delay on itself. So what happens when I call delay on itself? Well, I get back a function of no arguments that will return whatever delay was called on.

And delay was called on delay. So it will return the delay function. So we get a function that returns the delay function. But by the way, when I call delay here, it prints out delayed. So that's why we have one printed delayed. Then I'm going to call g, which is going to return to me the delay function. Then I'm going to call that function on the number six.

Calling delay on the number six prints delayed again and returns a function that will return six when I call it. Here's where I call it. So the whole thing evaluates to six. And since that's not none, it gets printed out in the interactive output. So the value of the whole expression is six. And what we see is delayed delayed six. What about print delay?

Print four. Well, we have to go through a similar process. This is a call to print with an argument. That's the value of delay, print, call that, and then call that on four. So before we can figure out what we're printing, we have to figure out what this call expression evaluates to. So we're going to call delay on print. And that will print out delayed and will give me a function that returns the print function.

I call that. That's fine. So now I get back the print function. I call print on four and I see the number four. And then this whole thing evaluates to exactly what print four would evaluate to, which is none. And that's what I print out. And the value of the whole expression is none. Let's do another one. The more practice, the better.

So same format, same from operator, import, added, mul, and define square. But here's a new function. Define pirate of arg, which prints matey, and then defines plunder arg and returns arg. And then that returns plunder. We have the same basic structure here, but this is a different function with different behavior. Not because the names are different, but because of what the inner def statement says.

So the inner def statement says, whenever I call plunder, I will return its argument. Now this is not delayed in any way. This just says, I call plunder on something, I get back that thing right away. Plunder two is two. And in fact, because plunder uses the name arg, we're never going to be able to refer to this arg in an enclosing scope.

Because the process for looking up a name always looks in the first frame of the current environment. So if we look up the name arg, we'll find it immediately, without ever looking in the parent frame. Okay, so what happens if we add pirate three, square four, one? Well, we're going to add whatever this evaluates to, to the number one. And let's see.

So we have pirate three, square four. So we're going to apply something to the number four. In order to figure out what that is, we apply something to square. And what we apply to square is what we get back from calling pirate on three. So our first task is to figure out what pirate three returns. Now, as I said, a name evaluates to the value bound to the name in the earliest frame of the current environment in which that name is found.

And in particular, the name arg will always evaluate to the value bound to it in the plunder frame. So whenever plunder is called, we get back whatever it's called on. And we'll never get to this arg up here. So what the pirate function really does is it just always returns the identity function or the function that returns whatever argument is passed into it.

So if I call pirate three, I get back a function that will just evaluate to whatever I pass in. So if I pass in square, then this whole thing evaluates to the square function. And what happens when I square four? I get 16. I add that to one and I get 17. So that's the identity function. This whole thing evaluates to square.

And square four is 16. Now, I do print out matey whenever I call pirate. So that's why we have matey here and then 17. But the whole thing evaluates to 17. Okay, what about pirate, pirate, pirate five, seven? Well, let's take a look. First of all, we're going to apply something to seven. Whatever it is, we first have to get it by applying something else to five.

And what is this thing we're going to apply? Well, first we want to, we're going to apply pirate. But what are we applying it to? Well, whatever we get by calling pirate on pirate. So this is the innermost thing that I'm going to evaluate first. Calling pirate on pirate gives me the identity function and prints out matey, of course. Because every time I call pirate, I get matey printed out in the interactive output.

So this gives me an identity function. I call pirate again. And that gives me another identity function. And another matey. I then call that on five. And that means I get five back. So, so far I have matey, matey. And then the whole operator expression here evaluated to the number five. I tried to call five on seven. Now, five isn't the kind of thing that you can call.

You can only call functions. You can't call integers. And that's why we get an error. So this whole thing doesn't have a value because that whole thing evaluated to five. Okay, one last example. One of my favorites that I ever came up with. The horse mask. So it says I'm going to define horse mask as a function that sets horse equal to mask and defines mask of horse, which returns horse.

And finally, it returns horse, called on mask. What is mask anyway? Well, mask is a function that takes in an argument horse and calls horse on two. And then we evaluate horse on mask. So the whole point here is that we're going to have how the words horse and mask mean different things in different environments. We have to remember where we are, where we return to every time we return a value, and make sure that we're calling the right function in each step.

Now, provided we have horse bound to a function called horse, which takes mask as an argument. And we also have mask bound to a lambda function, that was created right here, which takes an argument horse. Both of these have as their parent the global frame. Now, we call horse on mask, which means we're calling this function with this as an argument. So calling horse means that we introduce a new frame where we copy over the name of the function.

We also give the new frame a label, and we bind the formal parameters of that function to the arguments that were passed in. So we're giving the name mask, which came from here, to the argument that was passed in. And we passed in whatever mask was in the global frame. Oh, it was this lambda function. So that's bound to mask here. So now we have mask meaning this lambda function in the first frame of the current environment.

Now we execute the body of the function, which says figure out what mask means, and bind the name horse to it. Now, an assignment statement always changes something in the current frame, which is this right now. So we bind horse to whatever mask is currently equal to. Next, we define the mask function. And the mask and a def statement, remember, has two different steps.

It creates a new function whose parent is the current frame. And then as a second step, it rebinds the name mask to that function. And that binding always happens in the current frame as well. So we create a new function called mask. Argument is horse. Parent is f1 because we're currently in f1. And we bind the name mask in the current frame to that function.

So mask is now that function called mask, the one we defined in here. And we can't have the same name mean two different things in the same frame. So we have to get rid of the old binding. Now it's gone. So, so far we've done everything except for the return statement, which says return horse of mask. Now in order to do that, we have to figure out what horse of mask evaluates to.

So we have to figure out what happens when we call the horse function on the mask. Argument. Now which horse function? And which mask argument? We have to remember we're in this frame, the horse frame. We're in the middle of evaluating the horse function. And so we're in a horse frame. And so we figure out that currently horse means this lambda function.

And mask means this mask function. So we call this lambda function with this as an argument. Calling a lambda function means that we introduce a new frame. That frame has name lambda. And its parent is global because the lambda function's parent is global. We bind the formal parameter horse to the argument that we passed in. So whenever we use horse within the body of this lambda function, we're going to be talking about this.

And this is the lambda function that we passed in. So what happens when we execute its body? Well, we just return the value of horse with argument 2. Which horse? Well, this is the current frame. It's this horse, which is this function. So we call this function on the argument 2, which means creating a new frame. The mask frame has parent f1 because whenever we call the mask function, this is the parent.

And its argument horse is bound to 2, just like I said. And what does the mask function do? Well, the mask function just returns horse. Horse is 2. So we return 2. Now, where do we return it to? Well, the last thing that we called from was this lambda function, which was trying to figure out what horse 2 was and return that value.

We just figured out that horse 2 in that context evaluated to the number 2. And so now we need to return that. And where do we return this number 2 to? Well, we were in the middle of evaluating the body of horse mask. And we were trying to return whatever it was that we got when we called horse on mask, which we now know is the number 2.

And so we can return that. And we're finished. We've figured out that calling horse mask in this way doesn't cause any errors. It generates this environment and it evaluates to the number 2. My exams often ask you to implement a function. So let's talk about some strategies for implementing functions. These are good strategies even if you have a computer and can test out your work, but also apply to solving exam problems on paper.

Here's an example that's similar to an old midterm. Remove from n some digit, which returns all digits of non-negative n that are not digit for some non-negative digit less than 10. And what does it mean to return the digits? Well, this question originally had a longer text description, which said that you should return an integer that's got all the digits of n, but without the 3s.

So 2, 3, 1 becomes 2, 1, and 2, 4, 3, 1, 3, 2, you get rid of the 2s and you're left with only 4, 3, 1, 3 in the order that they appeared in n. And then it says kept digits equals 0, 0 while something if something returns something else. You're welcome to pause now and try to solve this problem. It's good practice.

But I'm going to move on and talk about how to approach a problem like this. First, read the description and try to understand what you're supposed to be implementing. And then look at these examples. You should ask yourself, what should remove 2, 3, 1, 3 return? And I think it should return 21. And it does, so that's good. But often you might realize you think it should do something else.

And that's why you're verifying the examples, to check your understanding of the description that was given. Because understanding technical descriptions is hard. A lot of things can go wrong. We try to make them unambiguous. But at the same time, these examples are supposed to help make sure that you're implementing the function we want you to implement. And do that for all the examples, or at least several, to check your understanding.

Then pick a simple example that you're going to focus on when you go to implement the function. Now it's not a bad idea to read the template. This says we're going to initialize kept and digits. And the goal is to keep some digits and get rid of some other digits. So maybe kept is involved in that. We're going to go through all of the digits.

Here's a familiar pattern. Every time I make a pass through the while statement, I assign last to the last digit of n. And then I get rid of the last digit of n. So last will be assigned to one, then three, then two. If something kept and digits, then return something else. Now, when you read a template like this, you'll either discover one of two things.

The template's kind of helpful. It seems like a reasonable approach, so you should use it. Or the template's just confusing, at which point I would recommend just trying to write your implementation on your own and then worry about the template later. Because if you have a working implementation that doesn't match the template, you can almost always change it around a little bit so that it does match the template once you figure out how to implement the function.

I find this template pretty helpful, so I'm going to try to use it. Before writing any code, I will often annotate the names with some values of a chosen example. So I'll say, okay, in order to figure out how to remove this 3 from 2, 3, 1, I'll have n b 2, 3, 1 and digit b 3, and I need to return 21.

Once you do that annotation, then you can start working through the problem. Write the code, try to compute the result, make sure you actually return to the right thing, and check your solution with some other examples. But focus on one at first. So, if we pick this one, then we're going to just label this as 231 and this as 3, and then kept and digits are 0 and 0, while I haven't gone through all the digits of n yet.

I need to go through the digits and keep the ones that are different from digit. That's my general strategy, but it's always good to keep track of where we're going, that we're going to try to return the number 21 at the end. So, I'd say we should keep going as long as there are more digits of n, and I should check and see if the last digit of n, which is the one I'm looking at right now, is different from the digit that I'm supposed to be removing.

Different from because I want to keep the ones that aren't 3. So, 1 is last, and 1 is not 3. So, I somehow want to keep 1, and then I'll keep all the digits that aren't 3, and then I'll return that. That seems like a reasonable strategy. So, how do I set kept to be all the digits that aren't 3? Well, I have to handle one digit at a time.

Maybe I'll add it to kept. That seems reasonable. Let's see what happens. So, 2, 31, and 3 come in. Now, n is bound to 23. Last is bound to 1. 1 is not 3. So, I now kept isn't 0 anymore. It's 1. Then I go through again, skip the 3, go through again, and the 2, which is bound to last, is added to the 1, which is bound to kept.

And I'm supposed to get 21, but I didn't. I added 2 and 1 together, and I got 3. Okay, so this is wrong. Something's wrong because I need to take the 2 and the 1 and make 21 instead of 3. So, what if I multiply kept by 10? Well, go through the example to see if it's right. In this example, kept was 0, last was 1.

So, we'd get kept equals 1. Then, in the next iteration, 3, we skip. The next iteration, kept is still 1, last is 2. This would compute 12. 12 is not 21. That's backwards. So, this is not right. But working through an example, let's you try. What if I multiply last by 10? Well, let's see if it works. The first time through, kept is 0, last is 1.

So, kept is now 10. And then we go through again, we skip the 3. Last is now 2. Kept is 10. And this gives us 10 plus 20 is 30. Well, that's not 21. I've got to try something else. What I really want is to add 20 and 1 to get 21. So, when last equals 1, I want to multiply by 1.

And when last equals 2, I want to multiply by 10 to get 20. How might I do that? And then you have to invent a strategy. So, one way to do that is to raise 10 to the power of how many digits are already in kept. So, that means you would keep track of how many digits are in kept. And you would multiply last by 10 to the digits.

This works for this case. The first time through, last is 1. Digits is 0. Kept is now 1. That's good. The next time through is 3. We skip it. The next time through, kept is 1. Last is 2. Digits is 1. This term is 20. So, we add 20 and 1 together to get 21. Well, it works. Next, check on a slightly more complicated example.

What if digit were 4? Then we'd want 2, 3, 1. We'd want it by getting 1 plus 30 plus 200. Well, we're not skipping the 3 anymore. Does it do it? Well, sure. First comes in 1 times 1. And then 3 times 10. And then 2 times 100 gives me 231. Now, there was a moment of creation that got us to this point.

We had to think about a strategy for building up a sequence of digits by multiplying in some powers of 10. And all of these problems have some element of invention in them. But if you start with a reasonable structure, then you're just playing around with a couple of lines that do all the work. And that, you can just think through examples in order to solve it.

Now, once you solve it, make sure you're returning the right kind of thing. Kept really is 20 or 231. And make sure that the other examples work too. So, it would be worth tracing through step by step with this longer example to verify that you didn't miss an importing case. And that's one strategy for implementing a function. Now, you might come up with a totally different solution, and that's okay.

If you were here, and you didn't know what to do next, but you thought, well, instead of 21, I could get 2.1 just by dividing what I have so far by 10 each time. Then at the end, I have to figure out how to change 2.1 back into 21. And you could do that by multiplying by 10. That only works for the simplest example.

In general, you have to multiply by 10 raised to the power of digits minus 1 in order to shift the decimal place in the right place. And then you have a float value, so you have to round that. And this would solve the problem as well. So, it's not the case that there's always only one solution to a problem, and there's always going to be a hard moment where you have to invent a strategy for doing the work.

But at least you have a structure here to make sure that your thinking time is productive thinking time, because you're working on the right problem, you're focused on an example that's simple enough to keep your head around, and you're checking your work. I hope that helps. Decorators are a feature of Python that utilizes higher order functions. Here's the idea. Let's start out with some just regular functions.

Let's just square and sum squares up to n that starts with k at 1. And total at 0. And while k is less than or equal to n, it adds to total and changes k. So we're going to square the current k, and then bind k to k plus 1. And then we'll return the total. So we can square 12, and we can sum squares up to 5 to get 55. Okay.

So I told you about this trace decorator. And a decorator is a name for this thing that looks like at and then a name. And when I use that, and I square something, then I see something gets printed before the value returns. So the first line gets printed when it gets called, and another line gets printed when it returns. So let's actually implement trace, or a simpler version.

So we're going to implement a function called trace1, which takes another function in. And what it does is it returns a version of fun, a function, that first prints before it is called. And fun is a function of one argument, which is why we call this trace1. Okay.

So what's going to happen? Well, I'll define a traced version of the function, which will first print calling this function on argument, and then the argument. And then it will actually return the value of calling fun on x. And then we'll return that traced function. So traced is just like fun, except for it also prints. And now I can annotate square with the trace1 function that I just wrote.

We're not using the one that's built in anymore, which means that when I square 12, it will say calling the square function on argument 12. Moreover, I can trace multiple different functions. And then when I sum squares up to 5, I can see all the work that happened. We called sum squares up to on the argument 5, which involved calling square on 1, and then 2, and then 3, and then 4, and then 5, and then returning 55.

Neat. So trace is the same thing. Decorating a function with trace is exactly the same thing as if I had written down here, square is the result of calling trace1 on square. I'll get the same behavior. So if you want a shortcut for transforming a function into another function, you can just put an annotation, which is called a decorator. So if I trace a function, that's called the decorator.

What you get back is a decorated function, and it's bound to the name of the function that's given. So this is identical to first defining the function, and then rebinding the name of the function to a traced version of that function. Why not just use that? Well, it's a little bit extra to type, and it's nice to know up front what decorations you apply to a function.

It's just a more natural place to put them. Probably most of all, it's like that because not all Python programmers understand higher-order functions. But it's easy for everybody to understand the magic of a decorator. So for you, it's not magic, but for other people, it may be.

## 9. Part p09 - Lecture 9 - Recursion

61A lecture number nine. Announcements. The Hog project is due on Wednesday. You get an early submission bonus point for completing today. That's Tuesday. If you need more time, you can ask for an extension. Extension requests for up to 24 hours are approved automatically. The rest we have to review manually. So, I do recommend just completing it by the deadline or preferably before the deadline to get that early submission bonus point, but if you need more time, ask for it. You just took a midterm, and so I'll just make a few.

Comments about that. One, I think as a class, you did really well. Two, remember that there is a policy in this course called exam recovery that you can read about on the syllabus, where if you do well on the final, you can get up to 90% of the points on the midterm one back. So, even if you're not totally happy with your score, you have an opportunity to try again just by learning the material by the end of the course. And three, sometimes taking an exam does give people useful information.

That they need to change the way they're approaching the course, that things aren't going that well, or maybe that this isn't the right course for them after all. Everybody's on a different journey in their education. This is not the only good course at the University of California, Berkeley, and it's totally fine to make schedule changes, or it's fine to stay in the course and just change the way you approach it. Both of these are up to you, but I just wanted to tell you your options. If you do decide that.

You want a different course, recall that there's one that overlaps a lot with 61A. It's basically like three out of the four units of 61A, but spread over the course of a semester. It's called Data C88C. It currently looks almost full, but I think it would expand if there were a waitlist, because in general we want students to be able to choose which of 61A or Data C88C they take.

And I believe it is possible to switch at this point. I know it's possible to switch into CS10 at this point if there's space. It appears there are a few open seats right now. And sometimes taking one of these courses before 61A or even instead of 61A can better serve students. It's up to you to investigate that. And if you have questions, go ahead and post on it or talk to the course staff or send me an email and I can do my best to help you out. And if you.

Decide to stay in CS61A, which most of you will, then that's great. If you're not happy with your exam score, the best thing I can recommend is that you stay up with or ahead of the class. Make sure that you're following along with lecture videos that you're really doing your best to get the most out of lab and discussion section and that you're using homework and projects in order to practice the concepts you've learned so far so that by the time you get to the exam, you're good at problem solving,.

You know the rules of the language, and there aren't too many surprises. TLDR, don't fall behind. Also, if you did well on the exam and you're really happy with your score, don't check out now because most of the content in this course is yet to come. It comes fast and there's a long history of students looking at their midterm one score saying, oh, I'm doing fine in this course and taking a break for a while and then getting caught by surprise when midterm two comes around and there's a lot of.

Content that they need to know. For all students, it's a good idea to stay up with the course, complete the assignments on time and start things when they get released as opposed to the day they're due. Okay, enough of the pep talk. Today we start a new topic called recursion and it's really central to this course.

Once we start talking about recursion, we will not stop for weeks and weeks because this is a key technique that is relevant to a lot of the other things that we'll study in this course later. An interesting consequence of the way environments work is that a function can refer to its own name within its body. Let's look at a couple of examples. If I write a function print all that takes some argument and prints it, I can have it return print all. This isn't surprising actually. When you define this function, all that happens is that the body is squirreled away waiting for a call. By the time it's called, the name print all already exists and is already bound to a function. So if I print all one, it will print one and then this expression will evaluate to the print all function, which I could call again. And that expression will evaluate to the print all function, so I could call it again.

Let's see what happens. Print all is defined. By the time I call print all, notice the print all is already bound in the global frame. I call print all on the first argument one. One gets printed out. In this environment diagram, we also show the print output. And then the function print all is returned. Same function. We looked it up by name and we returned it. Returning it means that it's the value of print all one. So that's exactly the function that gets called on the argument three. When I call print all on three, three gets printed. Print all is returned. Now I'm going to call that on five.

Five gets printed. Print all gets returned. And execution is finished. So even though this refers to itself, since it doesn't call itself, it's not going to run forever. It's up to this call expression to figure out exactly how many times print all gets called. And we see the output are the arguments of the separate calls. Here's a slightly more involved example. Okay. I'm going to write a function that sums all of the arguments so far. So we'll call it print sums instead. And it's not going to return print all because print all doesn't exist anymore. It will return a function. It's going to return a function that I define within the body of print sums called next sum, which takes an argument y and immediately calls print sums on x plus y. That's exactly where the summing is happening.

So x is the sum so far, y is the next number, and print sums just returns next sum. Let's see how it works. First print sums is defined and then called on the number one. The sum so far as one. And so that's exactly what gets printed out. Next, we define a new function and return it. We return it as the value of this call expression. So we'll call it on the number three. So next sum has just been called on the number three. Three is not a sum. It's just the argument here. Where we get a sum is that we're going to add x, which is here in the current environment, in the parent frame of f2, to y and get 4. Now what happens to that 4 is it gets passed into another call to print sums.

So there's another call to print sums. Here the argument is 4, which is the sum of 1 and 3. And what does print sums do? Well, it just prints out the sum that it receives and then defines a new function. That new function gets returned. And where does it get returned to? Oh, it's the value of print sums 1, 3. Notice that the function we're returning, which has parent f3, knows the sum so far of 4. And so if it wants to compute the sum of the whole thing, 1 plus 3 plus 5, it needs that 4 along with the 5 that I'm about to pass in. So I've just called next sum for the second time. Notice that now I'm passing in 5. The parent is f3, which contains 4, which means I can compute the total sum 9. And what do I do with it? Well, I compute it here, 4 plus 5. I pass it into a third call to print sums and print sums prints out 9, which is the sum of 1 and 3 and 5. So by having print sums defined an inner function and this inner function returning a call to print sums, I'm able to use the arguments here to memorize values that get computed along the way. Those values are passed in as arguments. They appear inside the frame, which is the parent frame of the local frame for next sum.

Next sum does the summing in this case and print sums just prints out whatever it gets. So here's the same picture and it's important to notice what goes where. When you actually have the call expression print sums 1, 3, 5, the first call is to print sums, but the other two are to the function that print sums returns, which is the next sum function. So the next sum function just tells Python what to do next in the next call. The next call first gets 3. The call after that gets 5.

So we see that in the print sum frames, we see sums 1, 4, and 9. In the next sum frames, we just see the individual arguments that get passed in directly, which are 3 and 5. Recursive functions. One of my favorite topics in this course. So a recursive function is a function whose body calls itself either directly or indirectly. We'll see both cases today.

So what does that mean? Well, it means that sometimes when you're executing the body of a function, and it's a recursive function, that might require you to apply that same function again. And recursion doesn't show up in computer science alone. It shows up in art and nature and mathematics. So for instance, Sierpinski's triangle is defined as three different Sierpinski triangles. One, two, three. Each of those, like this one, is made up of three Sierpinski triangles.

As a starting example, we'll sum the digits of a number. 2013 is a number. Positive integer. 2 plus 0 plus 1 plus 3 is 6. Why would we do this? Well, there are interesting properties of digit sums, such as a number A is divisible by 9, if and only if its digit sum is also divisible by 9. And summing up digits is very useful for typo detection. So here's a credit card. Now, the problem with credit card numbers is that they're very long, and humans type them in all the time, and humans are prone to error.

So what exists in every credit card is called a checksum digit. So that 16th digit isn't really part of your account number. Instead, it's computed from all of the other digits. And the point of that is that if the checksum digit doesn't match the computation of all the other digits, that's an indication that the number was typed in wrong. It's an invalid credit card number.

Now, the checksum digit is actually not just the sum of the other digits. It's something slightly more complicated, which we will compute later in this class, but we're going to start out with digit sums, and then we'll look at the actual algorithm that's used in order to compute checksums for credit cards. So we're going to sum digits without actually using a while statement. You can probably figure out how to sum digits on your own already, but without using a while statement will require recursion.

Okay, so first a building block. We'll define the split function to take in a positive integer n and split it into two parts, all but its last digit and its last digit. And we'll do that through integer division by 10 and by taking the remainder of n divided by 10. Okay, so let's write down that split function. And we can understand what it does. It breaks up a number into all but the last digit and the last digit.

So for 2013 we get the 201, and then the last digit is 3. So if I can sum up the digits of 201, and I can add 3 to that, then I'll get the sum for 2013. Let's write that in code. In order to sum the digits of n, well if n is less than 10, meaning it's a single digit, we'll just return n. The sum of the digits of 7 is just 7. Otherwise, we're going to split up n into all but its last digit and its last digit. And then we'll return the sum of digits computed from those two parts. Well, what is that sum? We're going to sum up the digits of all but the last, and then we'll add in the last digit. So for 2013, this would have 201 and 3. I would sum the digits of 201 to get 3. I'd add 3 more to that, and I'll get 6. The answer I'm looking for.

This is a recursive function. Why? Because I call some digits from within some digits. This really does run. So let's look at the anatomy of a recursive function, and then we can try it out. So the way it works is that the def statement header is similar to any other function. You just give the function a name and some formal parameters. Then, typically, a recursive function will start with a conditional statement that checks for base cases.

Base cases are very simple versions of the problem I'm trying to solve. In this case, the base case is a really simple case where you only have one digit, so summing it up is trivial. You just return n. So base cases are evaluated without recursive calls. They can usually be computed directly, such as just returning n in this case. Now, if we're not in a base case, meaning this is not a very simple problem but something more complex, where n has multiple digits, then we'll have a recursive case.

And recursive cases are evaluated with recursive calls. So we split up the number that we're trying to sum the digits of, and then we make a recursive call to some digits. Now, notice we don't try to sum digits of n. Instead, we sum digits of a simpler problem than we had before. So if we started with 2013, now we only have 201 to sum the digits of, which is simpler because it has fewer digits to sum, getting us closer to the base case.

Okay, before we move on, let's just type it in and make sure it really does work. Def, sum digits of n. If n is less than 10, that's a test for the base case, then I'll just return n. Otherwise, I'm going to break up and by calling my split function into two parts, all but the last digit and then the last digit.

And then I'll return some digits of the simpler problem, just all but the last, and then I have to add in the last digit. So we can sum the digits of 2013 or whatever number we wish. Let's talk about recursion in environment diagrams. The nice thing is that environment diagrams are useful for understanding recursive functions. So we're going to look at a new example, the factorial function, which computes the factorial of n, or n times n minus 1 times n minus 2 times n minus 3, all the way down until you get to 1.

We'll start out by looking at the Python tutor itself. So here is an implementation. Define the factorial of n to be, well, if n is 0, we return 1. That's part of the definition of factorial, that 0 factorial is 1. Otherwise, return n times the factorial of n minus 1. There's our recursive call. And finally, we're going to call factorial on 3, which should give us 3 times 2 times 1, and we'll be done.

Okay, so first I define the function and then I call it on the argument 3. 3 is not 0, so I evaluate n times factorial of n minus 1. So we need to figure out what are these two things we're multiplying together, which involves computing factorial of n minus 1, where n minus 1 is 2. So I make another call to factorial, this time with n being bound to 2, because that's the argument that I pass in.

And I execute the body again, this time in a new environment where n is bound to 2. 2 is not 0, and so we evaluate n times factorial of n minus 1 again. But in this environment, n minus 1 is the number 1, which means our next call to factorial will have a different number bound to n. So now we have 1, 2, 3 calls to factorial.

Might we get another? Well, let's see. That involves executing the body of factorial or fact one more time. Okay, so we execute fact. We see if 1 equals 0. It doesn't, so we have to execute this return statement one more time, which means evaluating fact n minus 1. What's n minus 1 at this point? Well, it's 0, and so we call fact on 0.

One more time, we execute the body of this function and see if 0 equals 0. Aha, it does. And so we return the number 1. And now, finally, we have a return value. Now, what happens when we return? Well, we return back to the line that we were evaluating when we made this function call in the first place, which was this factorial n minus 1 back when f3 was the first frame of the current environment.

And what we found out is that fact n minus 1 in that frame had a return value of 1. Okay, now we find that there's a return value of 1 for this frame as well, because n is 1, and this evaluated to 1, and 1 times 1 is 1. So we return that to wherever we were when we called this function in the first place, which, by the way, was in the middle of executing the return statement in the f2 frame, which was, again, inside the same body.

And it was, again, evaluating this expression that I have highlighted, which now has a return value of 1. We multiplied n equals 2 times the return value of fact n minus 1, which was 1, and 2 times 1 is 2. So that's our return value. So we return 2 exactly to the same place, but in a different frame, back when we were executing the return statement of the original call to fact.

In that case, we're multiplying 3 times whatever we got here, which was this return value, and 3 times 2 is 6. And so we get 6 for the entire return value of fact 3, which is actually the right answer. 3 times 2 times 1 is 6. So somewhere in the middle of execution, our environment diagram looked like this. At this point, we're returning from the last call to fact, but we haven't returned from these yet.

Let's just analyze some properties of what happens when you call a recursive function. Well, the same function is called multiple times, as we can see. One call is from here. Several different calls came from here. So this one was from here. But all of these, f2, f3, and f4 frames, came from calling fact from within fact. Different frames are there in order to keep track of the different arguments in each call.

So this is why we're able to call a function multiple times, with multiple different arguments, even one within the other, and the computer doesn't get confused because it has this model of evaluation where we have different frames holding the different argument values that were passed in. What n evaluates to depends upon which is the current environment. So there are all these different ns, each corresponding to a different call to the fact function.

And that means that every expression that has an n in it might evaluate to a different thing, depending on which environment I'm in. And each call to fact solves a simpler problem than the last. In this case, because n keeps decreasing. Now, once n gets to zero, then we have a really simple computation. We just return one. So there's less work to do when we have n is to zero than there is when we have n is one.

And that's less work than when n is two. That's less work than when n is three. Now we can compare what happens when you have iteration versus recursion. So iteration is a special case of recursion. And here's our factorial function. Here's what it does. And here's another implementation. Using a while statement instead of recursion. So I could say, I can compute the factorial of n by keeping track of the total factorial and what number I'm about to multiply in.

And as long as k is less than or equal to n, I change total to be total times the next number that I multiply in. And I change k to be one more than it was before. And when I'm finished with this while statement, then total will be bound to n factorial. So k was one and then two and then three and then four.

And we multiplied all those in. Using recursion, we say something a little bit simpler. We say the factorial of n is one if n is zero. Otherwise, it's n times factorial n minus one. Now, it not only took me less time to explain that, but it was easier to write in terms of the number of characters. And perhaps the logic is easier to follow if somebody else comes along and reads the function.

So there are certainly cases where recursion just simplifies things. And I think this is one of them. Now, the mathematical formula that corresponds to each of these implementations is a bit different. So the iterative version says I start with k is 1, and then I go up to n, and I multiply in the number k each time. That's how I get n factorial.

That exclamation mark means factorial. The recursive definition corresponds to a mathematical expression that looks like n factorial is one if n is zero or n times n minus one factorial otherwise. Which is also a correct definition of factorial, just looks a little bit different than that. So this one corresponds exactly to that. This one corresponds to this as well. But there's a little bit of extra machinery in here to keep track of the total.

And make sure that we're multiplying in each piece correctly, and then returning the right thing at the end. Now, we can see the extra complexity in fact iter versus our original definition using recursion just by looking at all the names that are involved. So we have the name n, the name total, the name k, and the name fact iter. Whereas in recursion, we only have two names.

And it's up to the frames in the environment diagram to keep track of where we are in the computation. Whereas on the left, we have to do that by keeping track of total and keeping track of k. Next, we'll talk about verifying the correctness of a recursive function. And that requires the recursive leap of faith. There's my friend Kevin sitting on top of a very large cliff.

And that's what it can feel like when you write down a recursive function. So here's factorial. Now, it's easy to see that factorial is going to work when n is 0. Because it just does something simple. It returns 1. But how do we really know that in any other case, this thing is actually going to work? Well, here's a strategy. Ask yourself if fact is implemented correctly through the following steps.

First, verify the base case. That just makes your life easy because you know that you have some cases correct. So if n is 0, this thing behaves correctly. Next, you have to treat fact as a functional abstraction. What that means is, for this call to fact, don't think about how it's implemented. Just think about what it's supposed to do. So its correct behavior is to return n minus 1 factorial.

That's abstracting away the details of its implementation. So, we assume that fact n minus 1 does in fact return n minus 1 factorial. Then, we can verify that n factorial is correct by assuming that n minus 1 factorial is computed correctly and knowing that the result n factorial is n times n minus 1 factorial. So, for a particular value of n, we can do this verification process.

Does this compute 4 factorial correctly? Well, is 4 factorial 4 times 3 factorial? Yes, it is. It's 24, which is 4 times 6. Generally, we assume that a function is correctly defined for the simpler case that we use in our recursive call and then verify that if that's the case, then the whole thing is correctly defined for the problem that we state.

So, we assume that it works correctly for n minus 1 and we show that therefore it works correctly for n. Mutual recursion occurs when two different functions call each other. So, now we're finally going to implement the LUN algorithm, which is actually used to compute the checksum of a credit card number. So, here's the description from Wikipedia. From the rightmost digit, which is the checked digit, moving left, double the value of every second digit.

If product of this doubling operation is greater than 9, then sum the digits of the products. Take the sum of all the digits. So, how does this work? Well, let's compute the LUN sum of 1, 3, 8, 7, 4, 3. We do that by taking each digit, except for every other digit, which I've grayed out, gets doubled. Starting from the rightmost, 3 just becomes 3, 4 gets doubled to 8, 7 is 7, 8 gets doubled to 16.

Since the result of the operation is greater than 9, we then sum 1 and 6 to get 7. 3 is 3 and 1 is 2. So, then 2 plus 3 plus 7 plus 7 plus 8 plus 3 is 30. And a valid credit card number will always have a LUN sum, which is a multiple of 10. So, what's the point? Well, the nice thing about the LUN sum is that if any one digit is incorrect, then the LUN sum will be something other than a multiple of 10.

Moreover, almost all transpositions, so say I switch the 4 and the 7, will be detected by the LUN sum algorithm and give a result that's not a multiple of 10. So, let's write a function that computes this. The LUN sum of n. Well, it's very similar to some digits. If n is less than 10, then we just return n. Otherwise, we get the last digit.

And we're going to return something plus the last digit. But that something will be not a call to LUN sum, but instead a call to LUN sum double. And what the double version will do is it will double the last digit and sum its digits if necessary before adding that digit in, as we specified before. Okay, so a LUN sum just takes the last digit if there's only one.

Otherwise, it does this doubling. So, let's compute that double digit. So, the first thing we'll do is we'll break up n. And then we'll compute the LUN digit, which is the sum of the digits of two times the last. Now, if n is less than 10, we just return the LUN digit. Otherwise, we'll return the LUN sum of all but the last digit, plus the LUN digit that we computed, that one that got doubled.

So, notice that LUN sum calls LUN sum double and LUN sum double calls LUN sum. This is mutual recursion when two functions call each other. Now, base cases can appear in both those functions or in only one. In this case, we see that it appears in both. Okay, so the LUN sum of just the number two is two. But if I look at 32, then the three gets doubled to six, and plus two is eight.

And if I take the LUN sum of a valid credit card number, so here's a valid MasterCard number. It doesn't work, but it's within the range of numbers that MasterCard uses. Then we'll get a LUN sum, which is a multiple of 10, such as 20. So, if you want to try this out on your own credit card, you can check to make sure that it's valid by making sure that its LUN sum is a multiple of 10.

Or if that's too much work, you can just send your credit card number to me. I'll check it for you. Now we'll talk about the relationship between recursion and iteration. So, there are cases when you want to convert a recursive function into an iterative implementation. And that can be tricky, because iteration is a special case of recursion. But for many functions, there is a straightforward conversion into iteration.

And the example we looked at before is one of those. So, the idea is that you have to figure out what state needs to be maintained by the iterative function across each pass through the while statements. And so, if we look at the sum digits function that we implemented earlier, we can look at what gets passed into some digits in each recursive call and what gets returned.

And those are clues as to what we might need to give names to when we write an iterative version. So, what gets passed in is what's left to sum, which we call n here as a formal parameter. And what gets returned is a partial sum, the sum of the digits so far. So, let's try to write an iterative version. Sum digits iter of n.

Well, we're going to store the partial sum so far. And then, while n is greater than zero, meaning there are digits left of sum, we will rebind n and last to the split up version of n. So, n will become smaller than it was before. It will contain all but the last digit of what n was. And last will contain the last digit.

Then, we can update digit sum to be whatever it was before plus last. And we'll eventually return digit sum. So, we can still sum digits and we can now sum digits iter and get the same answer. So, by inspection, we figured out how to do that. It turns out that converting an iterative implementation using a while statement to recursion is quite a bit more straightforward, precisely because iteration is a special case of recursion.

So, here's the story. When you look at an iterative implementation, you look for the state that is maintained across different iterations and you just pass those in as arguments. So, here's our iterative implementation of some digits. And the state that's maintained across each pass through the while suite here is n, which changes to be all but the last digit of n, and the digit sum, which contains the partial sum of digits so far.

So, when we write a recursive version of the same thing, we pass in exactly that n and the digit sum so far. Instead of a while statement that says while n is greater than 0, we now have a base case that is exactly the opposite. When n equals 0, then we just return the digit sum. Otherwise, we execute the same thing as the suite of the while statement, except that we pass in the new values of n and the updated digit sum as arguments through a recursive call.

So, we make the recursive call sum digits rec on n, which is bound to all but the last digit of what was passed in, and then digit sum plus last is the sum so far. So, updates via assignment become arguments to a recursive call. And this can be done quite generally for every iterative implementation.

## 10. Part p10 - Lecture 10 - Tree Recursion

61A lecture number 10, Announcements. We're going to release the recursion homework on Friday. And it's a pretty substantial homework on a topic that's brand new this week and usually takes students quite a bit of practice to master. So please get started on it early. With recursion, some of the early examples seem trivial and silly. Why not just use a while statement instead?

But today we're going to see examples that are actually quite a bit easier to approach using recursion than without. So it's really effective technique for a certain kind of problem, and that's exactly what we'll look at today. But solving of this kind of problem means coming up with ways of breaking down a complex computation into two or more parts. And building intuition for how to do that tends to take a while and take some real practice.

So if it doesn't click right away, that's totally fine and normal. And just know that many students have struggled with this before and eventually succeeded. And you can be one of those too if you give it the right amount of focus and attention. Understanding the order of recursive calls is important in understanding the behavior of recursive functions. And the thing to remember is that when you make a function call, you have to wait for it to return before you can do anything else.

So if one function calls another function and then does something after that, that function call has to return before whatever else happens next. Let me illustrate what I mean with the cascade function. The cascade function takes in a positive integer n. If n is less than 10, it just prints out n. Otherwise, it first prints n, then makes a recursive call to cascade.

On a smaller number, that's everything except for the last digit of n, or n divided by 10, with the remainder thrown away. And finally, after that recursive call to cascade, it prints n again. Let's take a look at the behavior of this function. So if I cascade just the number five, that's the base case, and I print out the number five. But if I cascade one, two, three, four, five, then I see this beautiful design where one, two, three, four, five is printed.

And then we see a cascade of smaller versions of that. And by the way, the original number is printed again at the very end. Now the first and the last lines all come from this print statement. And in fact, most of the lines that you see here come from either this print statement or this print statement. Only the base case, which is for the number one, comes from this print statement.

What this is supposed to illustrate is that all the cascading that happens recursively happens before the final print. And that's why you get this nice nested structure. Let's take a look at the environment diagram so that we can see exactly what's happening. So we defined cascade and then call it on one, two, three. The original call checks for the base case, doesn't find it, and so prints out one, two, three.

In the Python tutor, you can see that the program output generated so far is just the number one, two, three. We still have to generate all the rest. And how do we generate everything smaller than one, two, three? Well that involves a recursive call to cascade, in this case, where we've thrown away the last digit and we're left with just one, two.

So the important thing is that this call to cascade will complete before we ever go back and finish the original one. So what do I mean by complete? Well, it's going to print 12, make a recursive call on n equals one, which is the base case, which gets printed out. So now we've cascaded all the way down. How is it that we cascade all the way back up?

Well, our third call to cascade returns. What does it return? None. Why? Because there's no return statement at all. And if, when executing the body of a function, you reach the end of the body without ever seeing a return statement, you always return none. Okay.

Now we have to ask ourselves, where do we return to? Well, we were in the middle of this call to cascade, which involved this line. Finally, we figured out that that had a value of none. And then we go on and finish printing n is 12, right there. And when we print that, we actually see that 12 appear. And we have a return value of none from this call, which means that we can finally return to our original call to cascade and finish up.

So we've evaluated this. And in the course of evaluating that, we've generated all this output. And finally, we're going to print n at the very end. And now we're done. Okay.

So a critical moment in the environment diagram was when we had returned from the second call to cascade, but we hadn't yet finished the first call. So the first call had printed n. It had cascaded all the way down to get 12, 1, and 12, but it hadn't printed n yet. And that's the very last step of cascade. So each cascade frame comes from a different call to cascade.

And until the return value appears, that call has not yet completed. And so any work that happens after that call hasn't happened yet. Any statement can appear before or after a recursive call. There's the one before and there's the one after. It was the third call to cascade that printed out the number one. It was the second call to cascade that printed out both of those 12s, one before and one after printing the number one.

And finally, this first call printed the one, two, three and is about to print one, two, three at the very end. Now that's not the only way to define cascade. An even shorter version would say, well, in the base case or in the recursive case, I always print n first. So why not just put that at the very top? And then there's actually nothing left to do in the base case.

So I could just change this if statement to be all about the recursive case, which is when n is greater than 10. I will cascade and then print again. So now if I cascade one, two, three, four, five, it still works. And I have a slightly shorter function definition. By the way, this works even if I add more numbers and it only becomes more beautiful.

But which version of cascade is better? So we have one that breaks out the base case and the recursive case and tells you what to do in each. We have this other one that finds what's similar between the two and tries not to repeat itself. The two implementations are equally clear, then I think it's usually better to prefer the shorter one just because it takes other people less time to read it.

In this case, the longer implementation is more clear, at least to me, because it clearly breaks out what's the base case and what's the recursive case in that order. And that's the way I'm used to reading recursive functions. So when learning to write recursive functions, I recommend doing that as well, but you don't have to. But both of these are recursive functions, even if only the one on the left has a typical structure.

If you're trying to choose between one and the other, remember that when you write programs, they should be written for somebody else to read, and only incidentally for a computer to execute them. So think about which one you'd like to read if you were reading somebody else's program and make your choice there. Let's let you try one. Now we want to write a function that computes an inverse cascade.

What's that? Well, if we pass in the number 1, 2, 3, 4, we want it to print out the following lines. 1, 1, 2, 1, 2, 3, 1, 2, 3, 4, and then get smaller on the way down. Now if you want, you can try to implement this from scratch. I'm going to give you some structure right now so that you can implement it in a particular way, using higher order functions.

First, here's the implementation we'll use. We'll call grow to print the 1, the 1, 2, and the 1, 2, 3. We'll call print n in order to print the longest line of all, and we'll call shrink. Now what are grow and shrink? Well, they're both going to be related to the following higher order function, which takes in two functions f and g, and a number n.

And if n, meaning if n is not 0, 0 is the only false value of a number. So if n is not 0, then we'll call f and then we'll call g in that order. So here's the challenge to you. Define grow and shrink, which are both functions of a single argument we'll call n that involve calling f and g on some arguments.

So your goal now is to figure out what arguments we could pass in in order to complete the implementation of inverse cascade. Pause the video and think about it. I'll show you the answer in 3, 2, 1. One way to implement inverse cascade is with a grow function that first grows and then prints. So why does grow grow and then print? Well, because we want to do the small stuff first, and then the big stuff, and we're calling it first on n, and then passing in n divided by 10, passing in n divided by 10 there, etc.

And so by growing first and then printing, we get from smallest to largest. Shrink prints first and then shrinks some more so that when we pass in the large number, we first print it out and then we print out the rest of the smaller ones in decreasing order. Tree recursion happens when one function makes more than one recursive call. Tree recursion creates tree-shaped processes that arise whenever executing the body of a recursive function makes more than one call to that function.

And there's one example that almost every class that includes tree recursion covers at some point. The Fibonacci numbers. There's our friend Fibonacci. He indexes his numbers starting at zero. So the zeroth number is zero. The first Fibonacci number is one. The second is one as well. The third is two. And then one and two make three, and two and three make five, and three and five make eight, and five and eight make thirteen.

So each is the sum of the previous two. Except for the base cases zero and one, which are just defined as zero and one. Now growth is slow at the early stages of the Fibonacci sequence. But as you can see, the numbers start to grow a little bit faster when you get around to n is eight. But what happens if we get all the way out to n is thirty-five?

Well it turns out that the Fibonacci sequence grows quite quickly. All the way up to 9,227,465 is Fibonacci number 35. So let's look at a tree recursive way of computing Fibonacci numbers. We'll define Fib to take in n. If n is zero, return zero. If n is one, we'll return one. Those are two base cases. What's the recursive case? Well, each Fibonacci number is the sum of the previous two, which we can write as Fib n minus two plus Fib n minus one.

This is a tree recursive function because to compute Fib, I have to call Fib and Fib again. So there's more than one call to Fib in the body of Fib. The computational process of computing a Fibonacci number in this way evolves into a tree structure. Computing Fib 5 involves computing both Fib 3 and Fib 4. Fib 3 involves computing Fib 1 and Fib 2.

Fib 2 involves computing Fib 0 and Fib 1. These are all base cases where the value of the function is returned directly without any recursive calls. Okay, what about computing Fib 4? We're not done with that yet. That involves computing Fib 2 and Fib 3. Each of those has a very small structured process to compute that. And this whole diagram is tree structured.

If you flip it upside down, then you can see there's a root and then some branches. And those branches have their own smaller branches, etc. So computing Fib 5 actually traverses this tree structured computation in the following way. In order to compute Fib 5, we compute Fib 3 first. That's n minus 2. In order to compute Fib 3, we compute Fib 1.

That gives us the number 1. So I put a blue dot here to say that this is the first return value that we ever reach when we're computing Fib 5. We then find a return value for Fib 0 and Fib 1. And finally, this call to Fib 2 can return. Now we have the values 1 and 1 that we can sum together to get 2.

And this call to Fib 3 returns. So within Fib 5, we now have computed Fib n minus 2 or Fib 3, but we still have to compute Fib 4 or Fib n minus 1 in order to sum those two values together and finally reach the answer that we want. And that is another tree structured process where we return from this and this and then we can finally use those return values in order to compute Fib 2.

In order to compute Fib 3, we have to compute Fib 1 and Fib 0 and Fib 1 to get Fib 2. And then using those, we get Fib 3. And now finally with Fib 2 and Fib 3 computed, we can get Fib 4 and ultimately Fib 5. Okay, so I've told you a story about how this recursive process makes its computations. Let's see if we can illustrate that using a program.

So first thing I'll do is I'll define Fib just like I told you. The recursive case returns Fib n minus 2 plus Fib n minus 1. And if we now compute Fibonacci numbers, the base cases are what we expect. The next one is 1, the next one is 2, the fifth one is 5. What about number 8? That's 21. What about 10?

That's 55. What about 20? That's 6,000 already. The 30th one is 832,000 and the 35th one is still computing. Well, it's really working hard. I thought computers were fast. What's going on? Well, in a moment, we'll try to illustrate the computation to try to understand why it takes so long to compute 9,227,465. Now, let me just stop and say there are faster ways of computing Fibonacci numbers.

So it's not that we have to wait that long. But this particular implementation with this particular tree-structured process for computation does take a little while. Okay.

What is it doing? Well, let me show you a function that I've given you as part of your project. And perhaps you want to use it on future projects as well. It's called trace. It's imported from the UCB module, which I provided with your project. Trace is called a decorator. You place it with an at sign just before the function that you want to define, and it changes the behavior of the function to print out when it gets called and when it returns so that we can see exactly what's happening and in what order as we execute the body of the function.

So now, if I call Fib0, what trace does is it prints out when Fib0 gets called, and then when it returns, it shows the return value. So Fib0 and Fib1, since they reach the base case immediately, have very simple traces. But Fib2 involves calling Fib0 and calling Fib1, which returns 0 and 1 respectively. Those two are added together, and then Fib2 returns 1.

And this 1 at the end is the 1 that was always there. That's the return value of Fib2. If we call Fib3, we see even more structure, where Fib3 involves calling Fib1 and Fib2, and calling Fib2 involves some internal computation as well. Okay, so now we can call Fib5 and see a tree-structured process unfold before our eyes. So calling Fib5 involves calling both Fib3 and Fib4, each of which has some internal work.

So Fib3 returns 2, Fib4 returns 3 down here, and by the way, calling Fib4 is quite a bit of work. So now we can see why calling Fib10 is just a much bigger process than calling Fib5. Because within it, we're calling Fib9, which went all the way up to here, and Fib8, which goes all the way up to the top. And within Fib8, there's Fib6 and Fib4 and Fib2, and all of those have recursive structures within them as well.

And if we call Fib15, all of a sudden we have really long lines that are extending off the end of the page, and we can see that this trace just goes on forever. And so when we computed Fib35, well, there was just a tremendous amount of work to do in order to compute all of these intermediate values in order to sum up what we wanted to sum up.

Now, let's be clear. This is not an efficient way to compute Fibonacci numbers. In particular, because there's a great amount of repetition within this tree recursive computation. Fib is called on the same arguments multiple times, and the same values are computed each time. So in particular, for Fib5, we can see that the Fib3 computation is repeated twice. And wouldn't it be nice if we could just do that once, remember the value that came out, and not try to recompute it.

And in fact, we can speed up this computation dramatically by doing exactly that, and we'll do it in a few weeks. So don't think that tree recursive processes have to be slow. They certainly don't, but just for the moment, this one is pretty slow. Now we'll look at a very important example called counting partitions. And this example is important because it's a tree recursive process that's actually quite hard to write without tree recursion.

So one of the reasons we learn about recursion in this course is to solve problems like this one, like counting the partitions of an integer. What is that? Well, the number of partitions of a positive integer n using parts up to size m is the number of different ways in which n can be expressed as the sum of parts up to m in increasing order.

Let me show you an example. Say we want to count the partitions of n equals 6 using parts up to size m equals 4. Here are all of those partitions. And this is an exhaustive list of everything that counts as a partition of 6 using parts up to size 4. So each line is a sum of different parts where the parts are in increasing order.

So we have 2 plus 4, but we don't have 4 plus 2 because that's decreasing order. Okay.

Now notice that each part is always up to 4 but never bigger. So we don't include 1 plus 5. That doesn't count as a partition of 6 using parts up to size 4. But we do include 2 plus 4 and 1 plus 1 plus 4 as different ways of partitioning up the number 6. The idea here is we're counting the number of different ways that we can break 6 into groups.

Now we can illustrate these different partitions by showing what we're grouping. So we have 2 here and 4 here, or we have 1 and 1 and 4 here. And all of the other options can be illustrated on a line as well. And the purpose of the count partitions function is just to tell us how many different partitions there are, not necessarily to tell us what they are.

So in this case there are 1, 2, 3, 4, 5, 6, 7, 8, 9 different options. So count partitions 6 comma 4 should return the number 9. Okay, let's understand how we would compute this value 9. And we need a strategy that will compute partitions for any n and any m that we pass in. So let me tell you the strategy first, then we'll work on the implementation afterwards.

We're going to look for a recursive decomposition of the problem, meaning that we need to express this problem in terms of simpler instances of the same kind of problem. And we're going to do that by exploring two different possibilities. One is that we'll include at least one group of 4, or one 4, in the sum of parts that we use in the partition.

And the other option, which is everything that doesn't include a 4, says that we're never going to include a 4 in the partition. We're only going to use parts up to size 3 or less. Now splitting these two possibilities actually splits the set of all things that we want to count into two disjoint subsets. The ones that include a group of 4 and the ones that don't.

Another observation is that everything that includes a group of 4 really just has to partition what's left over after we subtract 4. So in both of these cases, we're actually just partitioning the number 2. We can get it by just the number 2 or by 1 plus 1 using groups up to size 4 still. And what about the bottom half? Well the bottom half is all the ways of partitioning 6, but using parts up to size only 3.

So we're really solving two simpler instances of the same problem, meaning we'll make two recursive calls to count partitions. When we're trying to compute count partition 6, 4, using at least one 4 means that we then have to count the partitions of 2, again using parts up to size 4. So there's the simpler instance of the problem that we solve above this line, assuming that we use at least one 4.

The other simpler instance is that we count the partitions of the whole number 6 using parts that are 1 smaller than the one we had before. So we're assuming we're not going to use any 4s, so we'll use parts up to size 3, and we need to count up all of those. So if we count up these 2 and we count up these 7, we'll get the 9 in total that we want in order to solve the problem.

And that's the recursive decomposition that we'll use in order to count the partitions of a positive integer n. So tree recursion can be thought of as a technique for exploring different choices or different possibilities. These are the two possibilities we explore in this case. And what do we do with the result? Well, we sum the results together because we actually want all the different alternatives.

And these two possibilities split that set evenly right here. Now, when we make one of these recursive calls, that's going to involve further decomposition in the same way. To count partitions of 6 using parts up to size 3, we'll divide that set of 7 up into two groups, those that use a 3 and those that don't. And here we have to count partitions of the 3 that remain.

Here we have to count partitions of all 6 using parts up to size only 2. And each of those has recursive decompositions as well. Sometimes here and sometimes here. And in this way, we explore all the different possibilities and can compute the final result that we want. Hooray! So we're finally ready to write some code. Once we have a recursive plan in place, we just need to write an implementation that executes that plan.

So we define count partitions of a number n using parts up to size m. And let's start with the recursive case because that's what we've been talking about. We count the partitions of n minus m using parts up to size m, which is all the cases in which we use at least one part of size m. We also count the partitions of n using parts that are smaller than m or m minus 1.

And then we sum together the cases in which we used an m and the cases in which we didn't. And that should give us all the different cases that we're interested in and the total ways of partitioning n. So for the case of 6 comma 4 as our inputs, this with m is count partitions 2 comma 4. And without m is count partitions 6 comma 3.

Now we just need base cases. If we're partitioning 0, well let's just say there's one way to do that, which is to add nothing together. If we're partitioning non-positive number, we've done something wrong along the way. There's no way to do that. And so we return 0 because we're not allowed to use negative parts. And if the maximum part size m gets to be 0 or less, well there's no way to build anything out of parts of size 0.

So we return 0 there as well. And that's our complete implementation of count partitions. Let's watch it work. So I'm going to define count partitions. I'll count partitions of a slightly simpler instance than we talked about before. We're going to count partitions of 5 using parts up to size 3. And here are all the different alternatives that we want to sum up.

1, 1, 1, 1, 1, 1, or 1, 1, 1, 2, or 1, 2, 2, or 1, 1, 1, 3, or 2, 3. So the original call to count partitions with n of 5 and m is 3 involves two recursive calls, one of which is partitioning the number 2 using parts up to size 3, which if we do some computation eventually returns the number 2.

So if we try to use an m, like if we try to use a part of size 3 in order to partition 2, that's impossible. So that's why we get a 0 there. If we try to partition the number 2 with things smaller than 3, then we find there are two different ways, 1 plus 1 and just the number 2 alone. So those are the two different alternatives.

And we've computed what we get when we count the partitions of 2. Now what happens when we count the partitions of 5 using parts of size 2 or smaller? Well, those are these three alternatives that we have left over. So if we run through the computation, we see many recursive calls. And after some amount of work, we compute that using m, which is the number of 2, we find two different ways of summing up the number 5.

So here are the two different options that involve using the number 2 with parts size 2 or less. And the only thing we haven't accounted for is the sum of all 1s. So without m should include the sum of all 1s. We run some computation, try some different alternatives. And right here, we found that without using m, so using only 5, so computing 5 with only parts 1, there is a way to do that.

We return that one way. So we return it here. We sum 2 and 1 together. We find out that without m we get 3. We sum 2 and 3 together and we get the actual value we want, which is all 5 ways of counting partitions of 5 using parts up to size 3.

## 11. Part p11 - Lecture 11 - Sequences

Lists are a built-in data type in Python that are used everywhere. To create a list, we write a list literal. To bind that list value to a name, we just use an assignment statement. Here are some odd numbers. I can get the element at index 0 or 1 or 2 or 3. I can also get the number of elements. Now notice that the index of the last element is 1 less than the length of the elements.

The right way to think about this index is the offset from the beginning. Offset of 0 from the beginning is just the beginning. Then this is 1 after that and 2 after that and 3 after that. This is just a call expression. This is an element selection expression where you have some expression that gets evaluated that gives you a list and then you have to evaluate the index.

It is possible to put arbitrary expressions in either of these places and also to combine the results in any way that I want. I could say odds 3 minus odds 2 and that gives me the number 2. I could then use that as an index into odds. That means you can put an arbitrary expression here, which gets evaluated first, an arbitrary expression there, which gets evaluated second.

Then once you have the value here, which is a list, and the value here, which is an integer, you can look up the particular element in the list. When working with lists, we use list literals. We can also write expressions to describe each element in the list. In this case, digits would be bound to the lists that were equal, regardless of whether we wrote down the numbers or expressions that evaluate to those numbers.

To get the number of elements, we ask for the len of the list. Len is a built-in function. If I want to find an element selected by its index, I can use element selection syntax or I can use the getItem function in the operator module, which has the same effect. In order to combine two lists together or form repetitions of lists, I actually just add and multiply.

If I say the list plus the digits list times 2, multiplying the digits list times 2 just replicates its elements twice. Adding those to the end of list 2, 7 gives me one long list with 10 elements. I could also use the add and mul functions from the operator module. Finally, the elements of a list need not be integers. They could be anything, including other lists.

So here I have a list literal with two other nested list literals. What I create is a list with two elements, each of which are lists with two elements, which are integers. Asking for element number 1 of pairs gives me this element, which is a list with 30 and 40. Here you see that there is a combined expression, in this case an element selection expression, giving me a list, which I then select an element from in order to get the number 30.

Lists contain other values. They're values that represent collections of other values. When you have one value that contains another, you might ask the question, does an element appear in a list? There are actually built-in operators for testing whether an element appears in a compound value such as a container. Let's say I have digits, which is 1, 8, 2, and 8. I can ask, is 1 in digits?

Python will return true. Python is an operator that evaluates both 1 and digits and then determines whether 1 appears in digits. 8 is in digits. The fact that it's in there twice doesn't matter. It's in there. 5 is not in digits. If I said 5 in digits, I'd get false, but since I said 5 not in digits, this is another operator that's equivalent to saying not 5 in digits.

Let's look at a few other examples. Here's digits. 1 in digits is true. 5 in digits is false. Now, it has to be the value. Since 1 doesn't equal 1, if I say 1 in digits, the string 1 is not there, only the integer. Also, we're looking for an individual element. If I say, is the sequence 1, 8 in digits, it says false.

But there it is, 1 and 8. That's not what the in operator does. It doesn't look for subsequences. Instead, it looks for individual elements. If I had said, is 1, 2 in the nested list that contains 1 and 2? That would be true because there it is right there as an element of this list. But if it's nested too deeply, then it's not there anymore.

This is a simple operator that doesn't search through a structure trying to find anything that matches. Instead, it just goes element by element and sees whether it's equal to the element that you're looking for. Since sequences are fundamental to computing, people have developed new kinds of statements that help us manipulate or iterate over sequences. One of them is the for statement. The for statement is a way of iterating over sequences.

I'll show you an example, and then I'll tell you exactly how it works. I'll write a function that computes the count of the number of times in a sequence s that some value appears. And the number of times that value occurs in sequence s. And using a while statement, I might write something like total index equals 0, 0. While it's the case that index is less than the length of the sequence, I'm going to look at the element at index of s.

So now I've selected one particular element of the index. And if I start out with index 0, I'll pick the zeroth element. And if I change index later, then I'll get another element later on. So at some point down the line, I will rebind index to index plus 1. And in this way, I'll march through all of the elements of the list.

And what do I do with this element? Well, I want to figure out if element is equal to this value that I'm looking for. And if so, then I'll change total to be total plus 1. And at the end, I can return total. So what have I done so far? I've defined a function called count that takes in some sequence and counts the number of times that, say, 1 appears in that sequence.

Oh, there it is, three times. One, two, three. Okay, so that's a useful doc test. Let's just paste that in right there. And then we'll talk about this implementation. Well, let's try to make it shorter. One thing we see here is that total is rebound to total plus 1. There's actually shorthand in Python for doing that. I can just say total plus equals 1.

This is a different assignment operator that assigns total to be whatever total was before and then one more. I can do the same thing here and simplify that. Okay, so we've made some progress, but I think we can do better. The meat of this implementation is here. And the rest of this is just doing the work of iterating over all the elements in a sequence, which is such a common thing that we have a special statement for it called the for statement.

And a for statement allows us to just forget about the index entirely. And instead of saying while index less than len s, I just say for every element in s. And that replaces both of these lines and allows me to get rid of the index increment at the bottom. So now if I read out what this implementation says, it says I'm going to keep track of the total number of times I've seen value in s.

And for every element in s, if element is that value, then I'll increase the total by 1. If I run the doc tests, I'll see that it tried to count 1 in this sequence. It was expecting 3, and that's exactly what it got back. One test passed. Okay, so that was an example of sequence iteration where we used a for statement. And how does it work?

Well, what happens is that the name element is bound in the first frame of the current environment. Not the new frame, by the way. No new frames are introduced with a for statement. But the name element is bound, and then the suite of the for statement is executed. And then the name element is bound to the next thing in s, and we execute this again.

So when you have a for statement, it's going to execute the suite of the statement a number of times, which is the number of elements in s. An element will be bound to a different element of s each time. So here's the execution procedure spelled out. The syntax of the statement looks like this. You need a name, you need an expression, and you need a suite.

The first thing that happens is you evaluate the header expression, which must yield an iterable value. Now, I said we're doing iteration, and iterable values are related to that. But this is a term that I won't define precisely for several weeks. But for now, just think, this expression needs to evaluate to a sequence. Later on, we'll see that there are other things that we can put in there besides sequences, and iterate over those as well.

But for now, just think, I need an expression that gives me a sequence. I need a name to give to each element in that sequence. And then for each element in the sequence, we'll bind that name to the element in the current frame and then execute the suite. One more cool feature about for statements is that you can actually do sequence unpacking right inside the header of the for statement.

So let's say I had a list of lists. I call it pairs here. And I want to count the number of pairs that are just the same element twice. So I'm going to go through each pair. And I'm going to say, is one the same as two? No. Is two the same as two? Yes.

One count will be one more than it was before. Three and two are different, but four and four are the same. So we'll increment same count again. Now what does the for statement look like that can do that? This is something that only works for a sequence of fixed length sequences, such as a sequence of pairs. But in that case, then you can unpack each pair into separate names.

So you can say for x comma y in pairs, pairs is a sequence of pairs. x and y are actually now bound to the elements in each pair, as opposed to the pair itself, at which point you can check if x equals y. And if that's true, then change same count to be same count plus one. So you're giving a name for each element in a fixed length sequence here.

And that's called sequence unpacking. And this looks just like multiple assignment when you'd say x comma y equals some pair. Each name here, x and y, is bound to some particular value in a pair. Ranges are another sequence type. That means they're sequences, but they're not lists. Ranges are there to represent sequences of consecutive integers. Actually, they can represent all kinds of integer sequences, but we're just going to focus on the ones that have consecutive integers, so counting upwards.

Imagine an infinite number line full of integers. Here's a small slice. What a range does is it picks out a finite length within this long number line by giving us a starting value and an ending value, and selecting all of the integers in between in increasing order. Now the way that I've drawn this is important. Both of these point to just before the number indicated in the number line.

So that means that negative 2 is actually included in the range from negative 2 to 2. But the number 2 is outside of the range. So it's including this starting value, but excluding the ending value. Now what a quirky thing. Well it actually makes a lot of things simpler to do it exactly that way. You can compute the length of a range just by subtracting the starting value from the ending value.

So 2 minus negative 2 is 4, and there are 4 elements here as you can see. Element selection is also easy. You just take the starting value and add the index. Indexes start at 0, so the element at index 0 is negative 2. And the element at index 3 is negative 2 plus 3 is 1. Okay.

So it has length and element selection, so it must be a sequence, even though it's not a list. Now how do you convert to a list if you want to see the elements? Well, you can use what's called the list constructor, which is a built-in function just called list. And when you call it on any other sequence, it gives you back a list full of the elements of that sequence.

So a range isn't a list itself, but calling list on it does give you a list of all those elements. That's the list constructor. Now one special feature of ranges is that if you leave out one of the numbers, so you only specify one number, that's treated as the ending value with an implicit starting value of 0. So listing range 4 is 0, 1, 2, 3, including 0, but excluding 4. Okay.

So if I create a range from 5 to 8, let's say, it's not a list, it's a range. If I wanted a list, I'd have to call list on that value, at which point I'd see exactly what elements are in there. Now if I know what a range is, I already knew that it was 5, 6, and 7. Well, if I ever wanted to check and make sure that it included the starting value, but did not include the ending value, I could call list and find out that for sure.

Now a range up to 4 is a range starting at 0 and going up to 4. And if I list out those values, I'll see that it's 0, 1, 2, and 3. So what might we do with the range? Well, there are lots of cases when the sequence you want is exactly a sequence of increasing integers. So if I wanted to sum all the integers below sum number n, I could do that by keeping track of the total, grabbing each element i in the range up to, but not including n, and changing total to be total plus i, and then returning the total.

At which point if I sum below 5, I'll be adding 1, and 2, and 3, and 4, and 0, and that will give me 10. Now there are cases when you actually don't care about the integers themselves. You just want to do something a fixed number of times. So if, for instance, I wanted to say, go bears, three times, a typical way to write that is a for statement like this.

Or if I now cheer, it will say, go bears, go bears, go bears. Now range three means that there are three elements in range. And we are giving a name to each element, but we don't actually care what that name is, because we're not using it anywhere. So one convention is that you use a single underscore character, or a blank, just to let other programmers know that you're not actually going to use this name anywhere.

It's okay if I put x there instead, but I'd never use that x, so it really doesn't matter what I put there at all. This is an indication that you just don't care. List comprehensions are a powerful form of combination in the Python language. In a list comprehension, like the one that you see here on this second line, takes an existing list, in this case a list of numbers, and computes a new list from it according to some expression.

This one builds a list out of the letters i for every i in 3, 4, 6, and 8, where letters is the sequence of letters, which gives me DEMO. Time for a demo. Let's start simple. I'll create a list called odds, with 1, 3, 5, 7, and 9 in it. Now a list comprehension can state, I want to compute a list that is x plus 1 for every x in odds.

That will give me 2, 4, 6, 8, 10, where 1 became 2 and 3 became 4, etc. This happens by evaluating the x plus 1 expression over and over again, with x bound to each of these in turn. There's a more complicated form of a list comprehension that includes not only an expression of how to compute each element, a name, and then the sequence that you want to compute over, but also the word if, followed by some condition, such as saying 25% x equals 0, which means I only want to keep an element to x if it's the case that x divides evenly into the number 25.

So 25 divided by x has a remainder of 0, using the remainder operator or modulo operator. So 1 goes into 25 25 times, 5 goes into 25 5 times, but 3, 7, and 9 don't evenly divide 25 25. So this part of the list comprehension lets me select only part of the list that I want to keep around. And I can have interesting combinations of these.

So I could say I want x plus 1 for these elements that evenly divide 25, and then I won't get 1 and 5, but instead I'll get 2 and 6. So those are list comprehensions. I can certainly put them inside of a function. So for example, I might have a function that computes the divisors of some number n. And how would it do it?

Well, it would just return 1, which divides everything, and then x for x in the range from 2 all the way up to but not including n if it's the case that n divided by x equals 0. So what are the divisors of 1? Well, just 1. That's kind of a special case. How about 4? Well, you have 1 and 2. What about 9?

You have 1 and 3. What about 8? 1, 2, and 4. 12 has even more. 18 has several divisors, and these are all the integers that evenly divide some number n. That's all from the Gets checked into m. MaFundi And then the Gets checked into half about the Gets code and a hand up and down.

## 12. Part p12 - Lecture 12 - Containers

Box and pointer notation is a way to represent lists within our environment diagrams. So the reason why we need a notation is that sequential data can actually become quite complicated, and that's because of the closure property. A method for combining data values satisfies this closure property if it's the case that the result of combination can itself be combined using the same method.

If I can put items within a list, I should be able to take that list and put it into a list. Closure is powerful because it permits us to create hierarchical structures. Hierarchical structures are made up of parts, which themselves are made up of parts, and so on. And that is an extremely useful way to represent all sorts of things in the world.

So the important point here is that lists can contain other lists as elements in addition to anything else. And that means that we need a way to keep track of what's inside of what. That's where we use box and pointer notation. Lists are represented in environment diagrams as a row of index-labeled adjacent boxes, one per element. Each box either contains a primitive value or points to a compound value.

So if I just say pair equals the list 1, 2, I'll write that in my environment diagram by binding the name pair to a list that contains 1 and 2. These small numbers in the corner are just indices of the list. And so since the list has two elements, we see two adjacent boxes. Now for a more complex example, nested list is bound to a list that contains a list, a list, and another list.

And this third list contains lists itself. And within it are all sorts of things, even a function. So let's walk through everything that's on the screen. Nested list is a three-element list. And so we see it bound to three adjacent rectangles. Now each element of nested list is actually another list. And so that's why we see pointers to compound values. Lists are compound values.

Functions are compound values. Anything that has multiple parts is going to be represented using an arrow to some depiction of that thing. OK, so here we see that the element at index 0 is just a list containing 1 and 2. The element at index 1 is the empty list. Here we see the empty list. And the element at index 3 is itself a list that contains two other lists.

And so that's why we see this hierarchical structure where this is made up of parts, which are made up of parts. The primitive values 3, false, and none can be written directly into the box. So can 4, the function we write as we've always written functions before. And we use a small arrow to say that it's contained as this element at index 1 of the list that's within this list that's within this list.

Slicing is an operation that you can perform on sequences such as lists and ranges. Let's say I have a sequence already, 3, 5, 7, 9, 11. And what I'd like to get out is just the 5 and the 7. So these are elements at index 1 and 2. Well, I could get myself the indices 1 and 2. And then I could use that in a list comprehension.

I want odds i for i in range 1 to 3. And remember, range 1 to 3 gives me 1 and 2 but not 3. OK.

So that's one way to select out the 5 and the 7, a sublist of this list. Slicing is a notation for doing this more compactly. It does the same thing but without you typing so much. You just write odds. And then in square brackets, you say I want to go from 1 to 3. So it has the same rules as ranges. The indices include the lower bound but exclude the upper bound.

Now there's some additional flexibility. Just like if you leave out one of the boundaries in a range, if you leave out the beginning number, it's going to start from the very beginning of the list. So odds up to 3 gives me indices 0, 1, and 2. I can also leave out the end and it will go all the way to the end.

So if I want to start at index 1, then I'll skip the 3 at index 0 and get all of 5, 7, 9, and 11. And you can even skip the beginning and the end and you get back all of the elements in the original list. So these square brackets with a colon inside are called a slicing operator. Slicing always creates new values.

So here are some examples. I have digits, which is a list, and then I slice it three different times. The environment diagram that I get includes four different lists. Notice the digits is unchanged by the slicing. But when I sliced the 1 out, saying that I want to go from the beginning all the way up but not including index 1, I got a new list with the value 1 in it.

Asking for the middle gave me a third list with 8 and 2, and asking for everything from index 2 to the end gave me a fourth list with 2 and 8. Processing container values often involves iterating over all of the values contained in the list or dictionary that you're interested in. But there are some functions built in that help us do this more efficiently.

In particular, there are several functions that perform sequence aggregation. So these are functions that take iterable arguments and aggregate them into a single value. I'm just going to show you the actual documentation in Python 3 and help you understand how it works. So there's a built-in function called sum, which takes an iterable argument such as a list. Now this notation doesn't actually mean you write square brackets when you call it.

Instead, this is something that's used in Python docs to say that the second argument is optional. So you can call sum with just one argument, a list, and it will sum the values. Or you can call it with two arguments, a list of values, and then sum start value. And it will go through all of the values in the iterable and add them to the start. Okay.

So here it says, return the sum of an iterable of numbers, not strings, plus the value of parameter start, which defaults to zero. When the iterable is empty, return start. Sum, sum, two, three, four is nine. Sum, two, three, four. It doesn't work with strings. Now what's this starting value about? Well, if I started with five, then it would add five and two and three and four.

Now why is that useful? Well, let's say you're adding together values that aren't just numbers. You have to provide a value of that type in order to get started. So remember that I can add two and three, the list, to four, the list, and I get a longer list. Well, in the same way, I can sum a list containing two and three as well as four as long as it's the case that I start with a list in the first place.

If I hadn't started with a list, I'd try to add this list to the number zero, and that's not possible. That's what would have happened if I had summed without that starting value, but since I provided an empty list to begin with, and then I added in two and three, and then I added in four, I ended up with a list two, three, four.

Max takes two forms. You can pass it an iterable, such as a list, as well as an optional key function, and it returns the maximum value. Or you can pass it multiple different arguments, such as a bunch of numbers, along with a key function, and then it will take the max of the arguments. So it says, with a single argument, return its largest item.

That is an element of the list that you pass in. With two or more arguments, return the largest argument. So the max of a range going up to five is four. Or I could have said max one, two, three, four with a zero at the beginning, and that would have done the same thing. Now what's going on with this key function? Well, the documentation didn't tell me, but what happens is that it applies a function to every element that you're considering, and actually computes the maximum based on the return values of calling those functions.

So you can ask things like, what's the max value in the range from zero through nine if what I care about is some algebraic expression like seven minus x minus four times x minus two. Now that's some parabola where the maximum is right at three. If I designate this as my key function, then it's going to tell me the maximum value in this range as an output of calling this function is three.

So if I take this function and I apply it to the number three, then I get eight. But if I applied it to two, I'd get something less. If I applied it to four or five or six or seven, I'd get something less as well. So that's why it's giving me the return value of three. Here's a third one called all. All takes an iterable and returns true if you get a true value when calling bool on every element in the iterable.

If the iterable is empty, return true. What's this bool function? Well, bool tells me whether a value is true or false. So five is a true value, true of course is a true value as well. Even negative one is a true value, but zero is not a true value. It's a false value. Likewise, hello is a true value and an empty string is a false value.

We learned about these when we talked about boolean contexts back when we introduced conditional statements. So what about all? Well, let's say I have a range five and I want to ask, is it the case that x is less than five for x in range five? I'd get true, true, true, true, true. The goal of all is to aggregate those together and tell me whether they're all true or not.

I don't have to pass it a list of boolean values. I could pass it the list of numbers 0, 1, 2, 3, and 4 and it would tell me that since zero is false, these are not all true values. So those are three built-in functions that operate on sequences. There's also min and there's any which are complements to max and all. Strings are my favorite.

Strings are an abstraction, a representation of textual data. I call them an abstraction because we don't care about the details of exactly how they're encoded. But they do represent information. They can represent numbers and the way we write numbers can all be represented with a string. Here we have scientific notation. Here we have some point. And all of these are just strings that somehow tell us information.

They can represent language and as imagination bodies forth the forms of things to unknown and the poet's pen turns them to shapes and gives to airy nothing a local habitation and a name. I think when Shakespeare wrote Midsummer Night's Dream, he was talking about computer science and abstraction. You can also use strings to represent programs. So here's a string that defines the curry function.

And Python source files are just strings. So if I put this in a source file and executed it, then I would have defined the curry function. And by the way, if I start up Python and create exactly that string, curry lambda f lambda x lambda y f of x comma y, it's just a string. But if I execute that string, well then, I've just defined curry.

And if I curry the add function using what was just a string before, I can, in fact, add numbers together. So some details about strings that you may have discovered already throughout the course, but I'll go through them now. There's three different ways to write down a string. I can use single quotes. I can use double quotes. And they're the same, except for that if you put an apostrophe in the middle of a double quoted string, it works out fine.

But if you do that in the middle of a single quoted string, well then it would end the string. You don't have to just put English characters in the string. Ni hao is fine. Single quoted and double quoted strings are equivalent. A triple quoted string can span multiple lines. So I use those a lot for doc strings because a lot of times doc strings will extend to multiple lines when you add doc tests.

Now when I evaluate this multiple line string, what it shows me at the end all fits on one line. And what's happened is it's used a special symbol to encode the end of one line and the beginning of another. This is called a line feed. So whenever you see a backslash inside of a line, that escapes the following character. And what that means is that the two characters together, this backslash and the following character, really are just one thing in the sequence of letters that is the string.

And this backslash n means line feed, which means start a new line. Strings are sequences. The length and element selection operations are similar to what you'd expect. So the length of the city of Berkeley is eight, which means there are eight letters. Each letter is called a character. Now actually element selection has the same indexing scheme 0, 1, 2, 3, but the result is not quite what you might think.

So what you get back is an string, even though what you selected from was a string. Now lists don't work like this. If you had a list of numbers and you selected the element and indexed three, you would get a number, not a list. But for strings, you get a string, but with only one element, only one character in it. In and not in are a little bit different for strings than they are with other sequence types.

So instead of looking for only individual letters inside this sequence of letters, you can look for whole words. So if I say is here in where's Waddle, though, it will tell me true. But if I said if 2, 3, 4, and it's in here, even though 2, 3, and 4 are next to each other, it would say false. And if I looked for the list in here, that would be false as well.

So lists, you can only look for one element at a time. But in strings, you can look for consecutive letters. And that's because most of the time when you're working with strings, you actually care about whole words, more than just individual letters. So strings are a special abstraction, which are like sequences in many ways, but they behave in a way that's slightly different from other sequences.

These are a built-in data type in Python that hold pairs of a key, which is what you use to look something up, which is what you use to look up a value, and the corresponding value. The way they're written, both in code and displayed as values, uses curly braces and colons to separate the key and the value. Let's take a look. This assignment statement of the name numerals to a dictionary is building a new dictionary out of three pairs separated by commas, and the commas are separating this key value pair from this one from this one.

In this particular dictionary, all the keys are strings, all the values are numbers, but it didn't have to be that way. You could use numbers or strings as keys or values. Once I've created numerals, the most common operation I'll perform is to look up a particular value based on its key. Now with dictionaries, we're using the same item lookup syntax as we would for a list, but we can't just put an index in there.

Like I want the element at index zero. That will give me a key error. For a dictionary, the only values that I can put in the square brackets in order to look them up are keys. I can look up v, which gives me the number five, which corresponds to v. And I can look up x, but I can't look up x-ray because it's not in there.

I also can't look up keys by their values. You might want to look up the key for the number five, but that doesn't work either. Dictionaries go only one way. Dictionaries are also sequences. In particular, they're sequences of keys. So if I build a list out of numerals, I can see all of the keys, and that means I could use numerals inside of a for statement to go through all of the keys.

What if instead I wanted to go through all of the values? Well, it turns out that's possible too, using the following syntax. Numerals dot values, and then you need these parentheses. What you get back is a strange looking beast. It says dict values 1, 5, 10. This is a type of sequence, although it is not a list. So you can't do everything with this that you could with a list, but you can do many things.

Like for example, you could sum them up, or you could iterate through each one using a for statement. If for some reason you really need a list, you could call lists on numerals dot values, and that would give you a regular old list instead of a dict values, which is a special kind of sequence only related to dictionaries. Much like a range is a special kind of sequence only related to integers.

Dictionaries can be constructed with no elements, one item, or multiple items, as we've seen. It's also the case that the values themselves can be arbitrarily complicated. Just like the element of a list could be another list, the value in a dictionary could be a list. Like so. Oh, except I need to actually put a quotation mark there. And you could have one value be a list and another value be a string, that would work just fine.

Now, if we call this thing D, I could get the element for key one, I could get the element for key three, I could also figure out how many elements there are, two, and that describes the fact that there are two keys. The length of the values corresponding to those keys might vary. This value has two elements because it's a list. This value has how many elements?

Well, it's a string with five letters. Now there are two important restrictions about the keys of a dictionary. One you can't repeat a key. If I said one is first and one is also second, what I would get back is a dictionary with the key one only once. So if I want to associate a key to two different values, I should have one key associated with a list of those values.

And the second restriction is that the key itself cannot be a list or a dictionary. This gives me an error, unhashable type list. A rule is a technical term in computer science that I wish I could teach you about, but I have to leave something for 61B so you'll learn about it there, or you can read about it on the internet. The reason I reached this error is that I tried to use a list as a key, which is not allowed in Python.

Similarly, I cannot use a dictionary as a key. I'll get the same error. But it's totally fine to have a dictionary be a value. Anything can be a value. These restrictions only apply to the keys. So the limitations, again, are the dictionaries are collections of key-value pairs where a key of a dictionary cannot be a list or a dictionary. Even two keys cannot be equal, it can be at most one value for any given key.

The first restriction is tied to Python's underlying implementation of dictionaries, and the second restriction is part of the dictionary abstraction, which is that it's supposed to give you the value for a key. If a key were repeated, then there wouldn't be the value for a key because there would be two. So, dictionaries are all about finding the one value for a particular key.

If you want to associate multiple values with a key, store them in a sequence such as a list. You can also build a dictionary using a dictionary comprehension, which is a compound expression in which you write down what the keys look like, what the values look like, and as a source, you write down some iteration expression which gives you a sequence from which to build key-value pairs.

You can filter some of them out, and in order to refer to how to construct the keys and values, you can give a name to each element in this iter expression. The final part about the filter expression is optional, so there is a short version of this that leaves that out. This is an expression that evaluates to a new dictionary using the evaluation procedure of adding a frame with the current frame as its parent, creating an empty result dictionary that is the value of the expression, and then we fill up this dictionary before the expression is fully evaluated.

For each element in the iterable value that you get by evaluating this iteration expression, you bind the name to the element in the new frame from step one. So name now has a value, one of the values in this sequence. And then if filter expression evaluates to a true value, add to the result dictionary an entry that pairs the value of the key expression to the value of the value expression.

Let's take a look at a dictionary comprehension. This says x squared is associated with x for every x in 1, 2, 3, 4, 5, if x is greater than 2. X is going to be bound to 1, x is not greater than 2, so that one gets skipped, so does this one. But this one is greater than 2, and so we add a key value pair from 3 squared to 3, and that's what we see in the output.

We also do this for 4 and 5, and we end up with a dictionary that maps various numbers to their square roots by evaluating this large dictionary comprehension. I think it's worth trying to use one of these in an example, so here we go. Let's implement the index function, which takes a sequence of keys, a sequence of values, and a two-argument match function.

It returns a dictionary from keys to lists in which the list for every key k contains all values v for which match k v is a true value. When you say a dictionary from keys to lists, that means each entry in the dictionary is going to have one of the keys, and the associated value will be a list. So what this is saying is build a dictionary with all these keys, 7, 9, and 11, and that's what we see here in the example.

The values are drawn from the list that's provided, a range from 30 to 50, but the list for each key is just the elements of this range for which this function returns a true value. This function says for a key and a value only return true if the key evenly divides into the value, so if value is a multiple of the key.

So this is meant to return a dictionary in which 7 the key corresponds to a list of all the multiples of 7 within this range, and so on for 9 and 11. This is a natural application of a dictionary comprehension, where in fact the keys we want are just provided to us in the keys list, so there isn't actually a whole lot of work to do in order to figure out the key expression.

It's just k. This k has to match this k, but I could have used a different letter. It just seemed like k was a good one based on this description. Now how do we construct a list of all the values within this list of values that match the key k? Well, that's an example of a list comprehension. Give me all the v for v and values if it's the case that match kv.

Notice that since this list comprehension is within this dictionary comprehension, this expression right here can refer both to v, the value, and k, the key, and do the matching. And now we're done implementing this function.

## 13. Part p13 - Lecture 13 - Data Abstraction

The purpose of maintaining abstraction barriers is so that you can change your data representation without having to rewrite your entire program. Let's poke a little bit deeper into this idea of data representation. What is data? What does it mean for something to represent a rational number? Well, we need to guarantee that the constructor and selector functions work together to specify the right behavior.

You don't have a representation of a rational number unless it behaves like a rational number. A behavior condition would read something like, if we construct rational number x from numerator n and denominator t, then it should be the case that numer x divided by denom x equals n divided by d. Here we relate the constructor, called on n and d, to the selectors and an operation between them.

Data abstraction uses selectors and constructors to define behavior. That's the whole idea of data abstraction. If the behavior conditions are met, then the representation is valid. The key underlying idea related to data abstraction is that you can recognize what sort of data something is by its behavior, not necessarily by how you constructed it or how you implemented the constructor and selectors. Let's look back at our example.

We have add, mull, an equality measurement, and a way of printing rational numbers. All of this doesn't assume anything about the representation itself, only that the constructor and selectors exist. The constructor and selectors below this abstraction barrier are implementing rational numbers in terms of lists. So it's the case that I can say x and y are the rational number one, two, and the rational number three-eighths.

I should say one-half and three-eighths. So what happens when I print the result of multiplying together x and y? I get 3 over 16. It should be the case that I can change my representation, and all of this will still work. So here we go. Instead of using a list to couple together n and d into one thing, we're going to use a function.

We're going to find a function called select, which takes in some name. If that name is n, then it's going to return the numerator. Otherwise, if the name is d, it will return the denominator. And what else? Well, we're not going to worry about those other cases. We'll just return the select function from the rational function. Now, it must be the case that the constructor and the selectors are complements of each other.

That when you construct something with the rational constructor, you can then select its numerator using the numer function. So if x is the result of calling rational, then it's a select function, which I can call on n to get the numerator. And likewise, I call x on d to get the denominator. Let's try our example again. I set x and y to be one half and three eighths.

I then printed the result of multiplying x and y together, and I got three sixteenths. Did we really change anything? Well, certainly we did, because x is now a function. So that's a change in representation that led to another valid representation of rational numbers that works just as well with our old code as what we had before, but uses an entirely different mechanism to keep track of the numerator and the denominator.

And notice that we did this with just functions. We didn't actually need that built-in list data type at all. So what exactly happened when we implemented rational numbers as functions? Well, we defined the constructor and selectors, and it was this function, the select function, that represented the rational number. It was returned by the constructor, which was a higher order function. And the selector just called the function that resulted from calling rational in order to get the numerator back.

By defining a function within another function, we were able to refer to the n and the d in the enclosing scope. And so this select function that we returned did have carrying with it the numerator and denominator that we wanted to access later as part of its parent frame. So let's say a simpler example. We set x equal to rational 3 eighths, and then we ask for the numerator of x, which should be 3.

The environment diagram looks like this. Rational numerator and denom are defined, and then we call rational on 3 and 8, which creates a select function whose parent is the f1 frame where n and d are bound. That's returned and bound to x. x equals rational 3 eighths. Once we have x, we can ask for its numerator, which creates a new frame in which x is bound to the select function.

The body of numer says that we're supposed to call x on n, so that's exactly what happens in this third frame, f3, where name is bound to n. The body of select is executed. Name is n, and so it returns n. Looking here, we see that the name n is not defined, but if we look in the parent f1, n is bound to 3.

And so that's what's returned. Data abstraction. A new method of abstraction. Here we go. So, most values are compound values, in the sense that they combine different objects together in order to create some object with multiple parts, such as a date, which has a year, a month, and a day, all combined together into one thing. Or a geographic position would have a latitude and a longitude.

An abstract data type lets us manipulate compound objects as units. That's a form of abstraction. What it does is it allows us to isolate two parts of any program that uses data. We want to separate how data are represented and how data are manipulated. By doing this, we separate the concerns within our program among two different areas, and we can change one without affecting the other.

So data abstraction is a methodology by which functions enforce an abstraction barrier between representation of data and the use of that data. Now, all programmers work with compound data at some point, but only great programmers embrace data abstraction in order to make their programs more modular. And you, too, will be a great programmer very soon. Let's take a look at an example, rational numbers, and we'll see what we mean by data abstraction.

So a rational number can be expressed as a numerator divided by a denominator, where both numerator and denominators are integers. And since we can represent integers exactly, this gives us an exact representation of fractions. So a pair of integers lets us tell you exactly what fraction we have, such as 1 divided by 3. But as soon as we actually divide 1 by 3, then we'll get back a float, which is not an exact representation, but a finite approximation of it through a binary expansion.

So we want to separate the numerator and the denominator, not divide one by the other, but instead have a compound data type. So we assume that we can compose and decompose rational numbers as follows. We have a function rational, which takes n and d, a numerator and a denominator, which are integers, and returns a compound data type, a rational number x. We have another function, numer x, which returns the numerator of a rational number x.

And likewise, we have a denom x function, which returns the denominator. So we have a way of combining together a numerator and a denominator, and then we have a way of selecting those two parts. This is called a constructor. It builds a new value, which is an instance of an abstract data type. And then these are selectors, which are the functions that get back those parts of the whole rational number.

What we can do then is we can start writing other functions that manipulate rational numbers, such as adding them together or multiplying them. Let's take a look. So just to refresh your memory, if we want to multiply 3 halves and 3 fifths, we get 9 tenths. And why is that? Well, the general formula for multiplying together two rational numbers is that the numerator of the result is the product of the numerators of the first and the second, and the denominator is the product of the denominators.

Adding together two rational numbers is slightly more complicated. 3 halves plus 3 fifths gives you 21 tenths. How do we get that? Well, in general, if we have two rational numbers, then we multiply the numerator of the first by the denominator of the second. Add that to the numerator of the second times the denominator of the first. And that's our new numerator, and our new denominator is the product of the denominators of the first and second rational number that we're adding together.

So now we have formulas for how to multiply and add rational numbers. How do we write code that does that? Well, we'll write it in terms of our constructor and selectors. So here's a function which multiplies together two rational numbers, x and y. It returns a new rational number, the numerator of which is the product of the numerators of the inputs, and the denominator is the product of the denominators of the inputs, just like our formula says.

We see that we've used the constructor to create a new rational number, and we've used the selectors to select out the parts of x and y that we need in order to complete this formula. Likewise, we can write a function that adds together two rational numbers. We give names to their numerator and denominator because we use those multiple times in our expression, and then we return a rational which follows the formula on the right.

One more function lets us really work with rational numbers, and that is equal rational, which returns true if x and y are the same number. Now, we can't just compare their parts because 1 half is the same rational number as 2 fourths. So, in order to resolve whether x and y are equal, we multiply the numerator of the first by the denominator of the second and check and see if that's equal to the numerator of the second times the denominator of the first. Tongue twister. Okay.

So, what you see here is that we've defined all of the ways in which we will manipulate rational numbers in terms of three functions, and these functions implement an abstract data type for rational numbers. What that means is all of our manipulation of the numbers is written in terms of these functions. We haven't even defined these functions yet, but since we know that these are the tools we use to access the parts of rational numbers or create new rational numbers, we can write functions in terms of these and then implement them later.

Abstraction barriers separate different parts of a program so that each part only needs to know so much about the rest of the program. Now, these separations are important because they allow you to make changes to one part of your program and have other parts take advantage of those changes without breaking in any way or creating inconsistencies. So, let's talk about the abstraction barriers in the development of a rational arithmetic system that we've been working on for this lecture.

So, there's a part of the program that uses rational numbers to perform computation. So, I actually want to know what's 1 half times 1 third. In those cases, we're actually treating rationals as whole data values. They just represent some number. We don't care how. We just want to know what happens when you multiply these things together. And in order to do that, we use certain functions that are part of the data abstraction for rational numbers.

Add rational, mul rational, rationals are equal, et cetera, are all things that take in rational numbers and do things with them, perhaps returning new ones. But, using these functions doesn't mean you need to know much at all about how rational numbers are represented. In the next layer down, where we look at the implementation, instead of just the use, of these arithmetic operators, we find parts of the program that create rationals or implement rational operations.

And they treat rationals as a numerator and a denominator paired together. Now, they may not need to know exactly how that pairing happens, but they do need to know that a rational number has a numerator and a denominator. These two things can be selected. And they need to know that you create a new rational number by combining a numerator and a denominator together.

And these all happen using the functions called rational, numer, and denom. So, I drew a really thick line right there to represent an abstraction barrier. That barrier says anything that's using rational numbers to perform computation should only do it in terms of these functions and should not be using functions of a different layer. In this way, the programs that we write make as few assumptions as possible about exactly what representations we're using and instead obey the abstraction that has been set out by the programmer.

So, what if we go one layer down from that? Well, there are parts of the program that implement selectors and constructors for rationals. And those implementations of rational, numer, and denom treat rational numbers as two-element lists. So, they do understand their whole data values, that they're consisting of numerators and denominators, and then we have a further detail that the numerator and denominator are glued together using a list.

So, for this, we use list literals and element selection. And again, there's an abstraction barrier. If we're in the business of creating rationals or implementing rational operations, we shouldn't need to know that we're using lists under the hood, and we shouldn't cross this abstraction barrier and use a list literal or element selection directly. Instead, if we write our programs in terms of just rational, numer, and denom, then changes to those functions later will be propagated throughout our program.

And we could, for instance, start expressing every fraction in lowest terms. Now, is that it? Well, actually, there are many layers of abstraction in a program, and there is stuff that's even lower detail than what we've seen so far. So, lists are somehow implemented in the Python language. We don't really need to know exactly how that implementation works. All we need to know is that lists can be created with list literals and taken apart using element selection.

And so, any place where we're implementing selectors and constructors for rationals shouldn't worry about the implementation of lists. It should just know that lists can be created and selected from. So, each big line is an abstraction barrier, and you should know that when you're writing one part of a large program, that it should use the level of abstraction appropriate to what you're trying to do.

And the higher you stay up without crossing these boundaries, the easier it will be to change your program in the future. So, let's look at an example of violating abstraction barriers. So, I've said add rational one, two, and one, four. So, a half plus a fourth should give me three fourths. And under the code we've written, this will work just fine. I have a definition of dividing a rational, which returns a list of whatever is the zeroth element of x times the first element of y, and then we have the first element of x and the zeroth element of y.

Again, in our current implementation, this will work. No errors will be raised. And yet, we've done something terribly wrong. We've violated abstraction barriers. So, for instance here, we've assumed in our use of add rational, that a rational is represented as a list of two integers. Which means if we went and changed the rational constructor, it wouldn't be used in this block of code because I didn't actually call rational here.

So, I did not use constructors. Is that so bad? Well, it's pretty bad, but it gets really bad when you see that it happened twice in a row. Okay, now I'm getting angry. That's unacceptable, that you would just violate abstraction barriers like that. I hope we're done. Uh-oh. Down here, we're dividing rational numbers, which should treat rationals as numerators and denominators, but not necessarily assume that they're lists.

So, instead of using the numer selector function, instead I've used the element selection that works for lists, thereby assuming that x is a list. Instead of saying, oh, it's something that has a numerator and a denominator, but I don't know exactly what it is. So, I've gone down to too low of a level. And, oh look, I did that four times, and then I returned a rational number, but again, I did not use the constructor called rational to do it.

This is not okay. This, you know, if I saw somebody's computer with this code on it, I think I would honestly just light it on fire and just watch it burn. Because code that violates abstraction barriers should burn. A pair consists of two values that are joined together, bundled together in such a way that you can treat them as a unit, as a whole, even though there are two parts.

Now, there's lots of different ways to represent a pair of things, but we're going to use a built-in data type first called the list. So, I can write the line of code pair equals open bracket, one comma two close bracket. And what we have here is what's called a list literal, which creates a new list that contains one and two as two values.

And since we have two values in the list, we'll call it a pair. And when I display this pair, I see its contents written just like the literal. So, a list literal is a comma-separated expression in brackets. Once I have a list, which is the value of a list literal, I can access the elements within the list through what's called unpacking that list into different values.

So, by saying x comma y equals pair, I'll bind x to the zeroth element and y to the first element. After which, if I look at what x is bound to, I'll see one, and what y is bound to, I'll see two. That's because that's the contents of the list that I've created. So, we now have a way to bundle together values and split them apart again.

This is called unpacking a list. Another way to access the elements of a list is through the element selection operator, which again uses square brackets. So, these square brackets are different from this one, although they're certainly related. But this is just square brackets without anything before it, whereas this has some expression before it. So, when you have square brackets after an expression, that involves selecting an element from the value, which is to the left of the brackets.

So, pair is a list value and its zeroth element is one. Its first element is two. So, element selection using the selection operator is another way to access the elements in a list. There's also a function that does the same thing. As we've seen many times over in Python, each operator has some function, most of which are within the module called operator.

So, the element selection operator is called getItem, all one word. It's okay to say it fast because it's all one word. GetItemPair, zero, gives me the zeroth element of the pair list, and that's one. GetItemPair1 will give me the value two. This is an element selection function, or the getItem function. Okay, we now have a basic introduction to what lists are, and so far we've used them to create pairs.

And why is that useful? Well, a rational number is a pair of integers, the numerator and the denominator. So, here's a definition of the constructor of the abstract data type for rational numbers. It's a function that takes in the numerator and denominator, and we need some way of representing that pair of things. We'll use a list, so we construct a rational number that represents n over d just by returning the list of n comma d.

So, this constructs a list, and the list we're using as a rational number. Now, lists can contain anything. They don't necessarily just contain integers, but we're using it to represent a rational number in which both n and d should be integers. Now, how do we get the numerator out, assuming that x is what was created by the rational constructor? Well, we just access the zeroth element, and the denominator is element at index 1.

So, we're going to select an item from a list here in order to implement what we want, which is selecting the denominator of a rational number. So, let me show you the first example of why data abstraction can be useful. Recall that we implemented multiplication among rational numbers. Here's an example, 3 halves times 5 thirds. What do you get? Well, you multiply the numerators together to get 15.

You multiply the denominators together to get 6. The answer is not 15 sixths, but 5 halves. Why is that? Well, we had 15 sixths, but those were not relatively prime integers. We can reduce the fraction to lowest terms by multiplying both the numerator and the denominator by 1 third, and that gives us an equivalent fraction 5 halves that's simpler. Now, the reason we do this is in order to keep the integers small so that they're easier to look at and understand.

What about 2 fifths plus 1 tenth? Well, we can apply the same procedure we had before for adding together rational numbers, and we'll get 1 half. Now, why is it 1 half? It's because through the cross-multiplying and addition, we got 25 over 50. And so there's the 20, there's the 5. We add those together to get 25. 50 is 5 times 10.

But then we can reduce that to lowest terms by multiplying both the numerator and denominator by 1 over 25, leaving us with 1 half. So how would we change our implementation to do that? Well, here's the idea. Addition and multiplication actually were correct in the first place. What was wrong was our definition of rational. A rational number should be something that's always represented in lowest terms or with two relatively prime integers.

So one thing I can do is import a function that computes the greatest common divisor. In a previous lecture, I showed you how to write a function that does this, but it also happens to be built into Python. And then what I'm going to do is redefine the rational constructor to take any numerator and any denominator, and then constructs a rational number that represents n over d, but does it in a way such that the numerator and denominator that are accessed later are always relatively prime, which you can achieve by computing the greatest common divisor of both the numerator and denominator.

That's 3 in this case or 25 in this case. And then returning a pair that contains the numerator and denominator, each divided by the greatest common divisor so that they're guaranteed to be relatively prime. And we use integer division here because we know that g evenly divides both n and d. That's a property of a greatest common divisor is it's a divisor.

It evenly divides those numbers. Okay, so we computed the greatest common divisor. We changed the constructor. We don't have to make any changes to add rational or mo rational or print or anything like that because we've been using data abstraction, which means that everything was defined in terms of this constructor. So changing this constructor changes the behavior of all the other functions as well. And that's a good thing.

## 14. Part p14 - Lecture 14 - Trees

61A, lecture number 14, Announcements. The only assignment currently posted is Project 2, the CATS project. And this one is about as long as the HOG project. It's broken up into several phases. Phases 1 and 2A have a checkpoint that's due this Thursday. I recommend finishing even more than that by this Thursday. It would be great to finish the whole project or at least all the way through Phase 2 by this Thursday.

But the only thing you need to do in order to get the checkpoint is get through Phase 1 and Phase 2A. The reason I'm suggesting that you complete the whole project this week, if you can, is that we'll have homework assigned this Friday that's due next week. And it's a pretty long homework. So even though the CATS project, which was released last week, is not due until next Tuesday, you'll get an early submission bonus point for completing it by next Monday.

And you'll be in a great position to do that if you finish most of it by Thursday. Then you can enjoy your weekend, finish it on Monday, and then have the rest of the week to finish homework for. Today's lecture is one of the most important ones in the course. Trees show up in many other courses later on, so learning how to work with them now will serve you well if you continue studying computer science.

And even if you don't, there are useful ways of representing things in the world. And then, Wednesday's lecture on mutability is also fundamental and introduces some features of Python that are used very, very widely, and so is practical knowledge. In the first part of this course, we learned all there was to know about functions. Now we're learning all there is to know about built-in data structures like lists and dictionaries.

And then we're going to move on to generating our own types of values. So it's a pretty exciting time in 61A, but the content from this week is really important. And we've got a project going on that helps you practice recursion and working with lists. So I'll share the most important piece of advice for this course, which is try not to fall behind.

Work on it every day so that you're keeping up with lecture and assignments both. Trees are an important data abstraction for representing hierarchical relationships. We've drawn pictures of trees before and discussed how in computer science they grow upside down. Now we'll talk about the common vocabulary used to describe trees. There are in fact two different metaphors used regularly. The first is the recursive description of trees, where a tree is like a wooden tree, like an apple tree.

In this description, a tree has a root label and a list of branches. There's the root label, there's a branch, there are only two branches to this tree, and the other branch is here to the right. By the way, each branch is a tree. That means the branch has a root label as well. A tree with zero branches is called a leaf.

So there's a leaf with no branches. It does have a root label of its own. Now once you've constructed a tree recursively, you might want to describe certain locations within the tree. And so we say in the relative description about family trees that each location in a tree is called a node. So here are all the nodes. I've circled them. And this is the root or the root node at the top.

Each node has a label that can be any value. Most of the data stored within the tree are stored at the labels. Now the reason I call this a family tree relative description is that one node can be the parent or child of another. So we can say that this node containing two is the child of that root node containing three. And you can also describe other familial relationships such as ancestors and descendants and siblings.

By the way, people often refer to the label values themselves by their locations. So something like each parent is the sum of its children, which is true of a Fibonacci tree. Now that we can talk about trees, we can talk about implementing the tree abstraction. A tree has a root label and a list of branches and the constructor is going to take those two values.

Each branch must be a tree. So if I want to construct a representation for this small tree, I would write the following code. It's a tree where the root label is three and the branches are a tree with one and a tree with two, one, one. In this case, I'm using the constructor as I've described it so that I can change representations however I wish.

Now you might say, aren't I violating an abstraction barrier because I'm using a list? No, it's part of the abstraction that a tree has a list of branches. So it's totally fine that I'm using a list here because that's part of the abstraction. It's not part of the representation. Now let's come up with a representation. I could come up with anything I want and that will determine what actually gets printed out by Python when I evaluate this constructor expression.

Here's what we'll get. It's just some lists within lists with the label values embedded within them. The way we construct this is to define a constructor tree which takes a label and a list of branches. By default, the list of branches is empty. So by default, I'll get a leaf which is why I'm able to call just tree on one in order to construct this leaf node here.

I put the label into a list. Branches is already a list and so I sum them together. The label of a tree is a selector that returns the element at index zero in the list representation of the tree and the branches are the rest of the list elements as a list. Now in order to make sure that while I'm using the tree constructor, I don't build something that's not a tree, I'm going to add some checks.

The first check here says for branch and branches assert that the branch is a tree. That's part of the abstraction and my code is going to make sure that I obey that abstraction as I construct the tree. I'm also going to call list on branches instead of just saying label in a list plus branches in order to make sure that if I pass in some other kind of sequence, it gets converted to a list before adding to another list.

So these two lines are really just there to verify that the tree definition is being respected within the body of whatever program I write. How do we know if a branch is a tree? Well, for anything to be a tree, it has to be a list. It has to have at least one element for the label. So if that's not true, we'll return false.

And it has to be the case that all the branches are trees. So in fact, isTree is a tree recursive function itself that goes through every branch and the branches of the tree. If it's not a tree, that branch, then the whole thing can't possibly be a tree. If these two checks pass, then it must be a tree because it has a label and it has branches that are trees.

Finally, I'll add one more function to my tree abstraction, which is a check to see if a tree is in fact just a leaf, which checks that the branches are empty. If I call branches on tree and get back an empty list, that's a false value. So not branches tree will be a true value just as long as this tree has no branches.

Now that we have the code for our data abstraction, we can use it. We can create a tree that's just a leaf. Is it a leaf? Oh yes, it is. If I want to create a tree with branches, then I specify those branches in a list because every tree should have a list of branches, which by default is empty. Now if I just put a single value in here, I'm going to get an error that says branches must be trees.

It must be the case that when I construct this, everything I put in the branches list is itself a tree. If I want a tree with branches to be one of my branches, then I give branches to that tree. And in this case, we'll just put a leaf. So I've finished the tree rooted at five. I want another branch, which is a single leaf rooted by six.

Now I've listed all the branches for the tree and there's the tree. Notice that when I evaluated this constructor expression, there were no errors because I've built a well-formed tree. Now it happens to be that it has this complicated nested representation. But that's not how I will access it. Instead I'll just ask, what's the label of T? It's one. What's the branches of T?

Well, a bunch of trees. If I want to get the branch at index zero and I just write that, that's a tree. And I can get the root label of that branch just by asking for the label of the index zero branch. By treating branches as a list, I'm not violating any abstraction barrier because I said in my abstraction that a tree has a list of branches.

Functions that take trees as input or return trees as output are often tree recursive themselves. Let's look at some examples. In practice, one does not often create trees using the tree constructor and a set of explicit labels, but instead generates the tree programmatically. For example, if I want to create a function that builds a Fibonacci tree, then I would write it in the following way.

If n is less than or equal to 1, that means the fib tree for that n is just a leaf. I create the leaf using my tree constructor. Otherwise, I need to build the two branches of a Fibonacci tree. The left branch and the right branch are both going to be constructed with recursive calls to FibTree. Finally, I want to return a tree.

That means calling the tree constructor on some label value and the branches. The branches are placed into a list, and what about the label value? Well here, I apply the Fibonacci recurrence. I get the label of the left tree and add it to the label of the right tree. The base case of FibTree 1 or FibTree 0 is just a leaf. FibTree 2 has structure within it.

It's the label and has two branches, which are both leaves. FibTree 4 is the Fibonacci tree that we've been looking at in examples so far. Its label is 3, and then it has how many leaves? One, two, three, four, five different leaves. Oftentimes we'll write functions that take in trees and do interesting things with them. Here's a not-so-interesting thing as a simple example.

If I want to count the leaves in a tree t, I'm going to write a tree recursive function. Processing a leaf of a tree is often the base case of a tree processing function. Here if t is only a leaf and I count the leaves, there's one leaf. The recursive case typically makes a recursive call on each branch, then aggregates the results.

In this case, what we're going to do is take each branch in the branches of the tree and count the leaves in each branch. The leaves in the total tree are just all the leaves in the branches summed up. Here's our first tree processing function. Let's walk through it one more time. The t comes in. I don't know if it's a large tree or a small tree.

If in the simplest case, it's just a leaf, then I know what to do. I just say there's one leaf. Otherwise, I sum up all of the results of making recursive calls on each of the branches. Count leaves b or b in the branches of the tree. What's particular about the count leaves function is what it returns in the base case and how it aggregates its recursive calls.

Of course, don't forget to return that result. We saw before that fib tree 4 has 5 leaves. Let's make sure that our count leaves function returns 5. It does. By the way, fib trees get pretty large. Fib tree 10, which has Fibonacci number 10 at the top, has lots of leaves. How many leaves? Let's count. 89 leaves. An interesting fact is that 89 is Fibonacci number 11.

Here's a discussion question. Implement leaves, which returns a list of the leaf labels of a tree. So how does it work? It takes in some tree and you call leaves on it and it gives you all the values of the leaves. So notice that the root label 3 is not in here, only the leaf labels. In order to implement this function, we're going to use a fact about sum, which is that if you sum a list of lists, you get a list containing the elements of all of the lists in the input.

Let me show you some examples. If you sum the lists 1, 2, 3, and 4, you get one list containing 1, 2, 3, and 4. In order to call sum on a list of lists and have it aggregate all of the values in those lists, you have to provide a starting value of an empty list. If I sum a list with 1, I get a list with 1.

If I sum a list that has two elements and the first element is a list within a list, then what I'm going to get is still a list within a list in the output. Notice the difference between this structure and that structure. 1 was a value in the output. In this case, a list containing 1 is a value here. So it's not enough just to sum the whole tree and get all the labels within it because sum doesn't remove all of the nested structure.

It just gets rid of one level. Okay, here is the implementation of the tree processing function that takes in some tree and returns a list of the leaf labels. If it's a leaf, then we get the label and put it in a list. Otherwise, we sum up something. Here are 8 alternatives. I recommend that you pause and think about it. I'm going to show you the answer in 3, 2, 1.

Our goal is to get a list of leaf labels for each branch and then put them all into one long list of all the leaf labels. We get that by summing a recursive call to the leaves of B for every B in the branches of the tree. So this is almost identical to count leaves, except for we have a different base case and a different use of sum, meaning a different way of aggregating the return values of the recursive calls.

A function that creates a tree from another tree is typically also recursive. So for example, if I have a tree, maybe it's a Fibonacci tree, maybe it's something different, and what I'd like to do is return a new tree that has exactly the same structure, but the leaf labels have been incremented, then I'll write a tree recursive function to build the new tree.

If I'm building a tree that's only a leaf, I get the label, I add 1 to it, and then I need to return a tree because that's what increment leaves does. So a quick check is that I do have the right range here. I'm returning trees just like I should. In this case, we return a leaf because we got a leaf in.

If I've been given a tree that is not a leaf, then I need to increment the leaves in all the branches of that tree, and then build a new tree with those new branches. Notice that I keep the label the same, and that's because this function doesn't do anything with the labels of the nodes that aren't leaves. Here's another tree processing function, increment t, which returns a tree like t, but with all labels incremented.

I'll show you a trick. You don't always need to have a separate base case for the leaves if every tree is treated the same way. This is a one-liner that says, return a tree where I've incremented the label, and I've incremented all of the labels in all of the branches. This is tree recursive. How do we ever reach a base case? Well when there are no branches, such as in a leaf, this is an empty list, and we're done.

We don't make any recursive calls when we reach a leaf. We didn't need to use an if statement to say that because that's built into list comprehensions that if this list is empty, then the whole comprehension is empty and doesn't require any work to construct. Here's an example of one more tree processing function. I'll write a function that prints out a tree.

It will first print the label of that tree, and then for every branch, it will call print tree on the branch. I don't return anything. Instead, this function exists in order to display a tree value so that we don't have to look at nested lists all the time. If I call print tree on fib tree 4, I can see all the values, but I can't see the structure.

Let's write a better print tree that uses indentation in order to show the structure. If I wanted to indent by five pairs of spaces and then write the number five after that, I would build the string using multiplication and addition, and if I print that out, then I get five indented. By default, I don't want the root label to be indented at all, but I want the possibility of indentation to happen later, where I'm going to take those two spaces, multiply them by the indentation level, and then add a string representation of the label of t.

The way that indentation occurs is that I'm going to indent all the branches, and since this is defined in terms of indent, if I get a branch of a branch, it will be indented twice. So now, when I print tree fib tree 4, I can clearly see the structure. Even for a larger tree, I can clearly see that there's fib tree 4, there's fib tree 4 again as one of the branches, here's the other branch of fib tree 5.

The indentation level of a label corresponds to its depth in the tree. Let's work through one more example about summing all the labels along a path from the root to the leaf of a tree, and then printing out that sum. Some recursive functions build up their result by manipulating the return value of a recursive call, where other recursive functions build up their result by passing information into the recursive call as an argument.

And both of these strategies are useful when processing trees, so let's look at an example of both ways of doing things. Before working with trees, let's go back to our old friend factorial. One way to write it is if n equals 0, we return 1, otherwise we return n times the result of calling fact on n minus 1. And if we run this example on, say, 4, then we'll get 4 times 3 times 2 times 1 is 24.

And this is an example of taking the return value of a recursive call and manipulating it. In this case, we're multiplying in n. But there's another way. Instead I could define fact times, which takes in both n and k. And instead of returning just n times n minus 1 times n minus 2, this returns k times n times n minus 1 times n minus 2 times n minus 3 all the way down to 1.

And we'll do it as follows. If n is 0, we'll return k. Because n factorial is just 1. Otherwise, we're going to return the result of calling effect times on n minus 1 and k times n. And I think what's interesting about this example is that we're not manipulating the return value of this recursive called effect times at all. Instead we're just returning it.

Which means that the result of the recursive call better be the result of the current call. And extending this reasoning, it means the result of the base case needs to be the same result as the original recursive call. And that turns out to be true in this case. So if we're trying to compute k times n factorial, here's the expression. It turns out that's identical to k times n times n minus 1 factorial.

Here's the k times n. And here's the n minus 1 factorial. So here the result is being built up. And by the time you hit the base case, you're done with all the multiplying. Whereas in this version, you haven't done any multiplying at all. When you hit the base case, that all happens after you return. And in fact if we wanted to define fact in terms of fact times, that wouldn't be too hard.

We'd just return the result of calling fact times on n and 1. Fact 4 is still 24. Okay, now let's work on an example with trees. So I have a file with all of the tree constructor and selector functions in it already called tree.py. So if I want to be able to use all those, I can write an import statement that imports them all.

And now I could build a tree. A number tree might look like 3 is at the root. And then we have a branch that's a leaf with 4. Then we have another branch that's not a leaf with 5 and 6. And let's have another tree. One with letters in it instead. We'll put H at the root, which has a branch rooted at A.

And this will have two leaves, the S leaf and the T leaf. And then we'll also have an E, which is its own leaf under the H root. So haste is a tree that has the underlying representation of a bunch of lists within lists within lists. But I can get its label and that will be H and I can get its branches.

Alright, let's say we want to write a function that takes in a tree, finds all the leaves, and for each leaf prints out the sum of all the labels from the root to that leaf. Much like the fact times function, I'm going to add a second argument. The sum so far. So that I can build up the sum as I go. And then when I get to the leaf, I just print it out.

So whether this is a leaf or not, there's going to be a label, and we should add that to so far. But then we'll figure out if we're at a leaf or not. If we are, then we print out the sum so far, which includes the leaf label and everything above it. Otherwise we go through all the branches. T is a tree, so I can call branches on it.

I get a list of trees, so each B is a tree. And print sums is a function that I can call on trees. So if I call print sums on numbers, starting with zero, I'll see seven. And the seven came from the three at the root, followed by the four, which is directly below the root and is a leaf. The other thing that should be printed out is the sum along the path from three to five.

Oh, but five is not a leaf, so we don't print yet, to six. Three plus five plus six is 14, which is the 14 we got down here. And what happens when we call print sums on the haste tree instead is that I think we should start with an empty string so that we can add more strings to it, at which point we print out has, that came from h a s, and we reached a leaf, or hat h a t, we reached a leaf, or he, which is this leaf below this root.

And the structure of this function is that we're building up the sum as we go, always passing a new value into so far. I could have written so far plus label t here instead of this assignment statement. And that would have been fine too. Or we could just update so far and then use the new value either to print or to pass in to all of the recursive calls.

Here's an example for you to try. Count the paths from the root of a tree where the total sum of the labels along the path are some total number that you pass in. So the input to this function is a tree t and some total number. And the goal is to return the number of paths from the root to any node in tree t for which the labels along the path sum to total.

Any node in tree t means that this doesn't have to go all the way to a leaf. It still counts as a path if it starts from the top and meanders for a while without getting all the way to a leaf of a tree. So here's an example tree. For a problem like this, it's always a good idea to look at an example and draw that example out as a tree.

So here we have three branches. One of the branch has two branches. One of its branches has a branch. And we're looking for path sums. So for example, how do we sum to seven? Well, here's one way, three plus one plus two plus one. And there's another way to sum to seven right next to it, three plus one plus three. That's two different paths that total seven.

How about four? How do you get to four? Well, here are two different ways. And notice that neither of them go all the way to a leaf. But we still get an answer of two. And what about paths that total three? Well, it turns out that here's one, a really short path that goes from the root to the node, which is at the root.

That's any node in the tree. And along this path, there's only one node label, which is the number three, which is the total we're looking for. And there's another path, three plus one minus one gives us three. What's interesting about this example is that we see we can detect a path with the total, sometimes just by looking at the label of the root.

And the other interesting thing is, once we've found a path, we might have to continue looking. Within the tree where we found a path to see if there are any more paths. For this reason, we won't have a structure that just says, if I find a path, return one. Otherwise, count the paths below, because I might find a path and need to look for more paths that also total whatever the total is.

That's the kind of thought process that I think you have to go through in order to solve a problem like this. And once you understand that structure, you can start thinking about a strategy for solving it and how to write that in code. So I'll stop there. I would encourage you to pause the video and try to solve it yourself. And then I'll go through the solution in three, two, one.

Here we go. The return statement here says, I've found some number of paths and then I need to add up some recursive, some about the other paths that I've found. How might we come up with a solution to this problem using recursion that has that structure? Well here's one way to do it. We'll consider two cases. Paths that end at the root t that I've seen and paths that end somewhere below it in one of the branches.

How many paths could there be that end at the root of t? Well, there could be one or there could be zero. One if including this label at the root reaches the total and zero if it doesn't. In the case that we haven't found a path that ends at this node, there might still be paths that continue on below this node. So one way to structure that logic is to check and see if we've found a path that ends at the root.

And the only way that we'll reach the total is if the label of the root is in fact the total. At which point we've found one path. Our goal is to count paths. Otherwise, I'm going to refer to found down here, but I haven't assigned it to anything. If I haven't executed this line, so I do need to assign it to something otherwise, I'll set it to zero.

So either I found a path that ended at the root label or I didn't, but I also need to count all the paths that end in one of the nodes of the branches. My goal is to count how many such paths there are in each branch B for all the branches in T. I'll do that with a recursive call to count paths.

And once I find out how many paths there are in each branch, I want to sum them up. All right, we're finally to the heart of the problem. How do we make the recursive call? We're going to make a recursive call on each branch. That's a typical structure. We're also going to account for the fact that we're considering paths through the current node.

And therefore, to get the total, we're going to have to consider the label at the current node. If I was originally looking for seven, I would have to subtract out this three and look for a path down here that adds up to four. And here's the logic to do it, take the total, subtract the current labels value. And that's the total that remains in order to reach a full path sum of total by considering a path through the current node at the root and then followed by some path through one of the branches.

Thank you. Thank you. Thank you.

## 15. Part p15 - Lecture 15 - Mutability

Objects are an important concept in software engineering. An object is a value that behaves like what it's supposed to represent. Let me show you an example. There's a module called DateTime, which represents things like dates and times. And from that, we can import date. Now, date is what's called a class. And when I create an instance of a date, I do that by calling the class.

So if I create a date, 2015, February 20th, that's a date. Another date is the date of your freedom, which in this course in this semester is on May the 12th when you take your final exam. Now, an object is supposed to behave like the value that it represents. So it should be the case that if I combine today and freedom, for instance, by computing how long it is between freedom and today, I should get a reasonable representation, something that tells me these things are dates that I'm subtracting from one or another.

There are 81 days left until you're free of this course. The primary mechanism by which objects have behavior is through their attributes. And you access the attribute of an object through a dot expression. So you can get the year of today or the month of today by asking for its year or its month attribute using a dot expression. And we'll talk exactly about how dot expressions get evaluated when we do a deeper introduction of the object system in Python.

But for now, you should realize what one of these expressions means. This is a name. It could be any expression that evaluates to an object. And then you have a dot and then the name of the attribute that you want to look up. In addition to attributes that are bound to values, you can have attributes that are bound to functions. Those are called methods.

So a method is anything that you access using a dot expression and then called like a function. The strftime method of a date is a way of formatting that date as a string. Why is it called strftime? Well, that's a historical accident. Somebody named this strftime long ago. And so we still use that name today. What strftime does is it takes in a string that describes how I want to display this date.

Today is what's being displayed. And so this method is invoked on today in order to give me a string representation that says Friday, February 20, where the percent A corresponded to Friday, percent B corresponded to February, percent D corresponded to 20. Now notice that up here, I never said that this was a Friday. I never even said that the way you say February is F-E-B-R-U-A-R-Y.

It's just part of what it means to be a date, to be able to generate things like the name of the weekday or the name of the month. And so that's what I mean when I talk about objects behaving like the things they represent. So objects represent information. They consist of data and behavior bundled together to create abstractions. Objects can represent things, but also properties of things or interactions or processes.

They're an extremely general concept. Anything that has attributes can be represented as an object. A type of object is called a class. Classes are first class values in Python. They can be passed in as arguments to functions. And objects are the heart of object-oriented programming, which is an approach to programming that allows us to organize large programs using a central metaphor, that a large program isn't just one big thing.

It's a bunch of individual objects communicating with each other by sending messages back and forth. Now in order to convincingly use this metaphor throughout the large program, we have a special syntax. And the dot expression is part of that special syntax. That helps us improve the readability or composition of our programs. In Python, every value is an object. Every value has attributes, including numbers and strings.

A lot of data manipulation actually happens through object methods. And we're going to look at several of those today. Functions are meant to do one thing. So the well-designed function has a single purpose. You pass in some arguments. You get some return value. Objects are different. They represent something that may have lots of different behavior bundled together. Dates don't just do one thing.

They're used in many different ways. So objects do many related things. And they can have multiple methods, each one of which is like a function. So strings are objects. And so strings have attributes. The string hello has a method called upper, which makes it uppercase. That's part of the behavior of being a string. You can lowercase it. You can even swapcase it.

Now none of these things have changed s. S is still hello. Each of these method invocations has returned a new string based on the old string. But it does something very string-like. So these aren't general functions. These are things that are just particular to strings. And that's why they're methods as opposed to functions that are built into the language. Now strings are an abstraction that allows us to represent text.

But there is an encoding of those strings as numbers. And actually this encoding is not specific to Python. It's shared among many programming languages. So I'll just tell you a little bit about it for fun. An original encoding, not the first one ever invented, but one of the first standards to take hold in computing, was called ASCII, the American Standard Code for Information Interchange.

This was a table that laid out which numbers corresponded to which letters and symbols. There are eight rows. And eight is important because that's how many different rows you can represent using three bits. Three ones and zeros. And there are 16 columns, which you can represent using four bits. The layout was chosen to support sorting by character code. So if you've ever used a computer and found that it sorts capital letters before lowercase letters, and puts things with an exclamation mark at the top, and things with a tilde at the end, that's because of the order in the ASCII code chart.

It was also designed so that if you didn't have enough bits to represent the entire table, there would be a useful subset right there in the middle. It meant you had to type in all caps, but that's better than nothing. The control characters at the top, here in red, were designed for transmission or information interchange. They have original meanings, most of which aren't used today, but some of them still are.

So the line feed called LF was supposed to tell the printer on the other end to go to the next line. And if you wanted to get somebody's attention after some information interchange, you might ring the bell on their printer. And these things still exist today. So if I say A is the capital letter A, I can figure out what number corresponds to that A.

It's number 65, which in hexadecimal format is 41. 41 tells me the row and column of the capital letter A in my ASCII table. Oh, there it is. Row 4, column 1. If I print the line feed character many times, I'll get multiple lines. And if I print the bell character many times, I should get a sound coming out of my computer.

Now there are more characters than just these. The ASCII standard was English specific. But the Unicode standard was designed in order to have one character set that would be used for all different languages. So it's the case that for every character in every language, in every script that's being used anywhere in the world, there's meant to be a Unicode code point for it, or a number ascribed to it, that lets us refer to that character as a number and use that for any kind of information interchange among computers, among different programming languages, etc.

There are currently 109,000 characters, at least last time I checked, in 93 different scripts. And they're organized by script. So it's more than just enumerating all of the different symbols that people use in language. They're also marked with what's capitalized, what's not capitalized, what language they're used in, etc. And it even supports bi-directional display order. English is written left to right, but Arabic is written right to left.

And every character has a name. The letter X is called Latin capital letter X. Now there are a lot of different characters, 109,000 of them, including a smiling face and a frowning face, which are just letters in some alphabet. And most programming languages support Unicode, and so you can access these characters directly. So I type from Unicode data, import name, and lookup.

Name gives you the name of a Unicode character. That's Latin capital letter A. And that's a Latin small letter A. Lookup does the opposite. I start with the name and it gives me the character. So if I look up the smiling face, there's that smiling face. We can make it even bigger so you can see just how smiley it is. And there are many more characters that are a little bit quirky.

There's a snowman. There's a soccer ball. There's even a baby. Hello baby. Now depending on the font on your computer, these will be displayed in different ways. So I think only on the Mac do you see a baby that looks in this particular way with this haircut. But it could exist on other operating systems as well. The point is there's a character representing baby.

How exactly it's displayed might vary from machine to machine. But the idea that there is a baby out there with a particular encoding is universal to lots of different programming languages. And you can look at that encoding by encoding it in bytes. And you see these are the four bytes that it takes to represent a baby. Whereas the letter A is encoded just as the letter A.

The big new idea for today is that an object can actually change its value over time. So in particular we'll look at lists. Lists can change their contents. That same list can contain different things as time goes on. So I'm going to demonstrate how that works by telling you a story. A story of the history of suits in playing cards. So we think that playing cards were invented in Asia.

And they began with three suits. The coin, the string, and the myriad. And these were representing different denominations of money. Because what are cards good for? Well, of course, gambling. Okay.

So those are our suits. And we're going to try to keep track of these original suits by using this assignment statement. And then we're going to tell a story about how those suits changed over time. So playing cards migrated over to Europe, through Egypt we think. And in the process, this myriad suit was lost. And it was also the case that the string suit was lost.

Leaving only the coin. By the time playing cards reached Spain, there was a need for some new suits. So in the Spanish deck, you have the suit of cups. You also have the suits of swords and clubs. So the coin, the cup, the sword, and the club, I believe exist in Spanish decks today. And we've seen so far that you can pop off one element.

You can remove an element that might be anywhere in the list. Pop always removes and returns the last element in the list. You can append a single element or you can extend a list by adding multiple elements in a sequence. The Italians adopted playing cards, of course. And in Italy, the way you say sword, which is element number two, is you say spada.

So we have the spade. And then the French decided to change some of the suits. And so the coin and the cup went away. And they were replaced by the heart and the diamond. So here are the suits that appear in a modern American deck, heart, diamond, spade, and club. I believe they're also used in France. Okay.

Way up at the beginning, we bound original suits to suits. Let's see what original suits is now. It's the same as suits. And that's interesting because we bound it way up here and then we made a bunch of changes. But it turns out these were just two different names for the same object. And so changes to one were reflected in the other.

This is the first example in this course of an object changing state. So something big just happened right now. The same object can change in value throughout the course of computation. If I bind the name same person to some baby. By the way, this is a Unicode character called baby. Then if that baby grows up, same person is still bound to the same person.

But changes appear in that object. If I bind two different names to the same object and that object changes, well those changes will be reflected regardless of which change I use. Okay, so all names that refer to an object are affected by a mutation. Now becoming an older woman isn't necessarily called a mutation out there in the real world. But in computer science, mutation is a word that's used whenever there's a change to an object.

Only objects of mutable types can change in their values. And lists and dictionaries are examples of that that we've seen so far. So let's look at how to change the contents of a dictionary. If I create a dictionary called numerals with i bound to 1 and v bound to 5 and x bound to 10, I can look at the contents of the whole dictionary or I can look at a value bound to a particular key.

I can also change the value bound to a key. At which point if I look it up again, I'll get a different answer. And the numerals dictionary has changed. Notice that the binding between x and 10 is just gone completely. And it's been replaced by x paired with 11. Now I can also make new entries to a dictionary just using this element assignment statement.

So now numerals has more in it than it used to. And I can look up what l is bound to. I can also get rid of a binding by using the pop method, which takes a key and removes the key value pair for that. So now if I try to get the value for the key x, there's nothing there because numerals has changed.

By the way, mutation can happen within a function call. So a function can change the value of any object that's in its scope that's a mutable value. So if I say 4 is 1, 2, 3, 4 and the length of 4 is 4, some mystery function could be called on 4, at which point the length of 4 would be only 2. What sort of mystery function might do that?

Here's one. So this one takes in an argument we'll call s and then pops it twice. So invoking the method pop removes the last element. So we define the function, we create the list, we call mystery. Mystery introduces a new frame in which s is bound to the same object that 4 is bound to. So that when I pop that, I'm actually removing the last element, which forever changes the value to which 4 is bound.

Now 4 isn't bound to anything different than it was before. It's just that this list is different. It has different contents. Popping again means that it will be even shorter. Here's a different function that would do the same thing. Remove every element after index 2, and that would mean removing the 3 and the 4, and replacing that slice of the list with just no elements at all.

Now, what happens when we create 4, and then we call a mystery function that doesn't take any arguments? Does it still have access to 4? Can it change it? Sure. How does it do that? Well, it just refers to the 4 list, which is within its scope. It's in the global frame. Anything can refer to something in the global frame. And so it just starts popping stuff off of 4.

Tuples are sequences, but they are immutable sequences, meaning that they cannot be changed. Now before I go on, I will mention that some people call these tuples, and some people call these tuples. And while there is no established convention for the pronunciation of this word, the two groups can at least agree that the other group must be wrong. I'll let you decide how you want to pronounce this word, but I'll say tuple most of the time, though occasionally you'll probably catch me saying tuple.

So, tuples are sequence values. 3, 4, 5, 6 is a tuple. See how we've not used square brackets, but instead parentheses. Though in fact, you don't need those parentheses at all in order to have a tuple literal. Anything separated by commas is evaluated as a tuple. A lot of people always put the parentheses around them just to be clear about what's going on.

You can make an empty tuple. You can call tuple on nothing to make an empty tuple. Or you could call tuple on a list, or any sequence for that matter, and it will give you a tuple back with the same contents as that list. Now, what if you wanted to have a tuple with only one element? Well, it is possible to do that, and the syntax is just terrible.

You have to put a comma at the end. And you can put that in parentheses as well, if you want. So, that's different from the number 2 in that this is a tuple containing 2, and this is just a number 2. Now, you can add together tuples in order to get bigger tuples. You can use the membership operator to figure out whether an element is in a tuple.

And you can slice tuples as well. Now, tuples are immutable values, which means it is possible to use them as the keys in a dictionary. Remember that it was not allowed to use a list as a key in a dictionary because you get this error on hashable type list. Now, even though you can use a tuple, you can't have a tuple with a list in it somewhere.

That will cause an error as well. So, tuples are immutable sequences, and immutable values actually have some benefits. One is that they're protected, in a way, from mutation. If I have a turtle, which is a sequence 1, 2, 3, and then I call some function called ooze, the turtle is going to still be 1, 2, 3, because this sequence cannot be changed.

Numbers are immutable values as well, so are strings. The only mutable values, the ones that can change, are lists. So, if I have this list, turtle 1, 2, 3, and I call ooze, just like we saw before, we might have anything in turtle at this point. Now, it's not strictly true that ooze cannot affect turtle. It can't change this value, but in next lecture, we'll see that a function could change what the name turtle is bound to.

So, you get some protection, but not full protection in the language, from having functions make changes to your current environment. The value of an expression can change because of changes in names or objects. So, a name change we've seen for a long time. If I have the same expression twice, x plus x and x plus x, we might get different values because the name x has been used for something else.

So, if I said x equals 2, then this would be 4, but if I said x equals 3, then x plus x would be 6. 6. So, those are name changes, and we've seen them throughout the course. Object mutation is different, but it can also have the same effect of changing what an expression evaluates to. So, if x used to be the list, 1, 2, then x plus x would be 1, 2, 1, 2.

But if I append 3 to the end, then I'll get 1, 2, 3, 1, 2, 3 for x plus x. So, these are two different ways in which the same expression can have a different value. And with immutable objects, this one doesn't apply. But this one always applies. You can always change the names of things. An immutable sequence may still change if it contains a mutable value as an element.

So, let's say I have a tuple that contains a list. Then I can't change the tuple. That's what I mean by immutable. But I could change the list within the tuple. So, the tuple still contains the same stuff, but the list within it is different than it was before because this one was changed to a 4. So, as you can see, that's not that.

So, mutation. Let's talk about what it means for something to be the same and what it means for something to change. Once upon a time, we never modified objects. And at those times, a compound object was just the totality of its pieces. There was nothing more to being a rational number than just what was your numerator, what's your denominator. But this view, that the whole is nothing but the sum of its parts, is no longer valid in the presence of change.

A compound data object, such as a list, has an identity in addition to the pieces of which it is composed of its elements. So, a list might still be the same list even if we change its contents. So, if I have A bound to 10 and B then bound to that same list A. So, what happens here? A gets evaluated to the list containing 10 and then B is bound to that list.

A is equal to B. If I A dot append 20, A is still equal to B because A is 10 and 20 and B is 10 and 20. B and A were bound to the same list even though we changed its contents. However, we could have two lists that happen to have the same contents but are different in their identity. They are not the same.

They just might be equal. So, if I say A is the list 10 and B is another list 10, A equals B is true. So far, not too different. But if I append 20 to B, A is now 10. B is 10 comma 20 and these two are no longer equal. They were equal before. We never reassigned A or B to anything.

So, there's no A equals this or B equals that statements. But, it's just that these happen to have the same contents before. So, they were equal but they were never the same. And so, when one changed, the other didn't. Now, how do you figure out whether two things are the same? Well, there's something called an identity operator which looks like the word is.

And the opposite of is is called is not. So, one expression is another expression if both of those expressions evaluate to the same object. Equality is true if both expressions evaluate to equal values. So, any list containing 10 is equal to any other list containing 10. But, they may or may not be the same list. Identical objects are always equal values. But, not the other way around.

So, it will always be that 10 is 10. And if A is 10 and B is a list containing 10, then A and B will be equal but they won't be the same list. When two things aren't the same, changes to one don't affect the other. But, C being bound to B means that C really is B. They're just two different names for the same thing.

So, if I pop something off of C, I've also popped it off of B. But, nothing has changed about A. Now, one lesson, something to look out for, is that mutable default arguments are very dangerous. So, as soon as you learn about mutation, you have to learn about its risks. A default argument value when you define a function is part of that function value, not generated anew every time you call the function.

So, let's say I define a function F, which takes some sequence S, and by default it takes the empty sequence. And what it does is it appends 5 to that and then returns the length of the sequence S, after that 5 has been appended. So, you call F, it uses the default argument value, which is an empty list, appends 5 to it, and returns the length of that list, which contains 5.

And you get 1. If you call it again, you get 2. If you call it again, you get 3. And that's because, every time you call it, S will be bound to the same value. That's how default arguments work. And if that default argument value is mutable, and you mutate it in the middle of your function, then that change will still be around the next time you call the function and you get that same default argument value.

So, something that looks pretty simple will actually have strange behavior, where it's different every time you call the function. And that's definitely something to look out for. In the first call, S is bound to an empty list, and that list is then mutated to contain 3. The next time I call F, S is bound to that same list, which is mutated again to add another 3.

And the third time, you get the third 3. There it is. And that's why we get different return values each time. 1, then 2, then 3. Mutable values can be used to define mutable functions. So, here's a function with behavior that varies over time. That's what makes it mutable. Every time you call it, you get a different result, even with the same argument.

Let's say we want to have a function that represents a bank account that has an initial balance of $100. And then I want to be able to withdraw money from my bank account, so I call it on the amount I want to withdraw. And what is the bank account here? Well, it's just the withdraw function that's representing the bank account. When we withdraw 25, how much would be left over? $75.

So the argument is the amount to withdraw, and the return value is the remaining balance. If I withdraw another 25, then the remaining balance should be 50. A second withdrawal of the same amount leads to a different return value. This is a mutable function. It is not a pure function because something is changing as a side effect of calling the function. The withdraw function's behavior is the thing that's changing.

Somehow, this withdraw function is representing some information, some state we call it, which is the balance of the bank account from which we are withdrawing. And we describe that state as local to the function because I didn't write it down anywhere else. Instead, it's just part of the function and therefore defines its behavior. If I withdraw 60 and I only have 50 left, I might get a return value like, oh, there aren't enough dollars in your bank account for you to do that.

But if you withdraw 15, that's fine, and it deducts it from 50. Where is this balance stored? It's within the withdraw function, which we create using a higher order function, makeWithdrawList, that takes in the initial balance. The place that we will store the balance is within a list referenced in the parent frame of the withdraw function, that is the makeWithdrawList frame. And since it's a mutable list, we can change the value contained within it every time we call withdraw.

So what you're supposed to appreciate from this example is that we have created a function that bundles together some behavior and some data. But unlike previous examples, the data is changing every time I call withdraw. And that's just a natural consequence of having mutable values in my programming language is that I can have behavior change over time as well. So how do we achieve persistent local state?

Meaning that there is a balance associated with the withdraw function that persists across multiple calls to withdraw. So if I call it multiple times, I'm accumulating information. Well, I do it with a mutable value. Here's the implementation. I define makeWithdrawList, which takes the initial balance, creates a list with the balance contained within it. The contents of B can change because B is a list.

And in fact, the contents of B can be changed even from within the body of the withdraw function. As long as a function can refer to this list, it can change it. So withdraw is a function that takes the amount to be withdrawn, checks to make sure that there's enough money. And where does it check? Well, it actually doesn't check the balance, which will remain unchanged.

That was the original balance. It will check the element at index zero of the mutable list B. The amount is too large. Then we're done. But if not, then I reduce that value by assigning a new value. And that's the new balance, which I can return. MakeWithdrawList returns the withdraw function whose parent frame is the MakeWithdrawList frame, which has a B referring to a mutable list containing the updated balance, which was originally the balance passed in, but later will be reduced by the amount that was withdrawn.

If I call withdraw twice, I'll always use the new value for B0, which was updated from the previous call. So here the name is bound outside of the withdraw def, but element assignment changes the list by referring to that name, and you get an environment diagram that looks like this. MakeWithdrawList was called with a balance of 100. It defined a B, which is a list, which originally contained 100, and then defined a withdraw, which is a function whose parent is F1, the MakeWithdrawList frame, which means that the body of withdraw can refer to this B.

It can also change that B. Withdraw was returned bound to the name withdraw, then called on the amount 25, which checked to make sure that 25 was not greater than what was in this list originally, which was 100. Then it reassigned the contents of the list to be 100 minus 25 is 75. Withdraw doesn't reassign any of the names within the parent, because that's actually not how assignment works.

Assignment statements like B equals always assign the local frame. That's actually not strictly true. In Python, there are ways to assign to non-local or global frames using statements called non-local and global statements. You can read about them if you want, but we're not using any of those here. Instead, what we're doing is referring to B, which is always the same B. It's always the same list.

It's just the contents of the list is changing over time. So withdraw doesn't change what these are bound to. Instead, it changes the value of B itself. And as a result, I used the mutable value, something built into Python, in order to create a mutable function. And in and largest space-front with regard to the text, where to give in... It's not as normal...

It's like, we can talk about thess. One journal statement.

## 16. Part p16 - Lecture 16 - Iterators

Sequential data can be represented implicitly using an iterator. Iterators are a common interface in many programming languages, and they're used in Python as a way to access the elements of lots of different containers. A container can provide an iterator, which in turn provides access to its elements in some order. The built-in functions iter and next create and advance iterators, respectively. So iter takes anything iterable, which could be a container or something you create yourself, and it returns an iterator over the elements of an iterable value.

Next is a built-in function that returns the next element in an iterator. Let's say I have a container, a list containing three, four, and five. If I call iter on that list s, I get an iterator t. That iterator knows the contents of the list, and it also has a marker for what's next. So you can think of an iterator as a position in some sequence.

It gives you access to the element at that position and everything after it. If I call next on t, I'd get the number three. As a consequence of calling next, the marker here is going to advance, which means the next time I call next, I'll get four instead of three. And since I've called next twice, I've advanced twice, and now the marker's set to five.

If I create a second iterator for the same container, that means I have a second marker into the same list. So u is an iterator that hasn't been advanced at all. If I call next on u, I'll get the number three. Now t doesn't forget where it was just because I created u. So if I ask what's next in t, I'll get the number five, and the iterator will advance past the last element, saying that it's at the end of this list.

It's still the case that I can ask for elements in u, so if I ask what's the next thing in u, it'll say four. So t and u are iterating over the same values, but they're otherwise independent in the position that they're going to give you next. Okay, let's build ourselves a list that's slightly more complicated than the one you saw before.

This one's a nested list. If I ask for the next value in a list, I get an error. That's not what next does. Next first expects you to have created an iterator over the contents of some container, at which point then I can ask for the next value of t, which will give me the sublist 1, 2. So all it does is give me the element at index 0 of the list that I'm iterating over.

And if I ask for the next t again, I'll get a different value. If you ever want all the values in an iterator, you can just list them out. Now here, you see that we only get the values that are left. We already used up the list 1, 2, and the number 3. So when I build a list of the remaining contents in an iterator, I just get the numbers 4 and 5.

Now if I ask for the next element in t at this point, I get an error. A special kind of error called stop iteration. And that's how you tell you're at the end, is that Python will raise a stop iteration exception. Let's talk about dictionary iteration. You can get multiple views of the contents of a dictionary, which are different objects that are all iterable.

An iterable value is any value that can be passed to iter, the built-in function, to produce an iterator. And an iterator is returned from iter and can be passed to the built-in next function. All iterators are mutable objects, and when you call next on them, they mutate to point to the next element. A dictionary, and its keys, and its values, and its items, are all iterable values.

All can be passed into iter, and the resulting iterators can be passed into next. The order of items in a dictionary is the order in which they were added. This is true of the most recent versions of Python, starting at Python 3.6. However, in older versions of Python, items in a dictionary appeared in an arbitrary order. Dictionaries were called unordered collections of key value pairs as a result.

But now they are ordered. Although when you write Python code, it's a good idea to keep in mind that depending on the version of Python that people use to run your program, ordering of dictionaries may not be reliable. But I'll assume in my examples that we're using a recent version of Python, and therefore dictionaries will end up ordered according to how they were constructed.

So if I have a dictionary with three keys and three values, one is bound to one, two to two, three to three, and then I add a fourth value, zero is bound to zero, then I would expect that iterating over the keys would give me one, two, three, and then zero, because zero was added last. And here's how I iterate over the keys.

I say I want an iterator by calling the iter function over the keys. If you don't say d.keys, but instead just say d, you get the same effect. You iterate over the keys. And this k is an iterator over keys, which means if I ask for the next one, I'll get one, then two, then three, then zero. If instead I wanted to iterate over the values in a dictionary, I would ask for the values.

This object is an iterable object that provides access to all of the values in the order that the dictionary was constructed. So the next value is one, then two, then three, then zero. And finally, I can ask for items in the dictionary. Those are key value pairs represented as tuples. So the first one is one, where we get both the key and the value in a two element tuple, and then two, then three, then zero.

So there are many ways to iterate over the contents of a dictionary. In the way that Python is designed, there's only one dictionary, d. I can access different views of it by asking for the keys, values, or items, and I can get an iterator for any of those. Now one interesting thing to note is that if I have a dictionary, and I've already constructed an iterator over the keys, and I'm in the middle of iterating over those keys, and I change the dictionary.

Now it's the case that the iterator is invalid. And so I see this error, dictionary changed size during iteration, which says that I cannot use k anymore because the dictionary has been mutated while I was using k. So our dictionary now looks like this. If I just change the value for one of the keys while I'm iterating through the keys, so here's one, two, and then I change zero to five, I can continue to iterate because I haven't changed the shape or the structure of the dictionary.

I've just changed one of the values for the keys. But if the dictionary changes size, then I can't use any of the iterators I've constructed. Instead, I need to make new ones, and that's true for keys, values, or items. Four statements iterate over iterable values. They can also iterate over iterators themselves. Let's say I have a range from three to six. The contents of that range are the numbers three, four, and five.

If I iterate over that range, I see all of the elements. And if I do it again, I see all the elements again because I haven't changed the range. Iterators are a little different. So if I get a range iterator from my range, this has a particular position in the range associated with it, which changes every time I call next. So I can ask for each element in the rest of the iterator.

But it will not print out three because three is passed. Instead it will just print out four and five. Now four statements also move the marker within the iterator, advancing it all the way to the end of the sequence. So I still have my range, I'm going to build a new range iterator that starts at the very beginning. And for every element in ri, I'm going to print out i.

So I've passed a range iterator to the for statement to be processed. Now there's nothing left in the range iterator. If I iterate over it again, I see nothing because I'm already at the end of ri. That's another consequence of using an iterator in a for statement. So to summarize, if I use an iterator in a for statement, I can still go through all of the elements until I reach the end.

But that will advance the iterator so that I can't use it again. On the other hand, if I'm working with an iterable object like the range itself, every time I use that in a for statement, I'm able to go through the entire contents from beginning to end without worrying about anything changing as I do so. A great deal of processing of sequences and other iterable values uses built-in functions that take in one iterable value and give you back an iterator.

So many built-in Python sequence operations return iterators that compute results lazily. What lazy computation means is that a result is only computed when it has been requested. So the interpreter gets ready to compute whatever is desired, but doesn't actually compute it unless that value is going to be used. Let me show you some examples. There's a function called map that takes in another function and an iterable, and it applies that function to each element in the iterable.

But instead of applying it immediately, it returns an iterator, an iterator that iterates over the values func x for every x in the iterable. There's another built-in function, filter, which takes a predicate function and an iterable, and it iterates over x an iterable if it's the case that func x returns a true value. Zip takes two iterables. It iterates over co-indexed x-y pairs.

Reversed iterates over x in a sequence in reverse order. All of these return iterators, and those iterators produce these values each time you call next on them. If you ever want to view the contents of an iterator in its entirety, you can place the resulting elements into a new container by calling list or tuple or sorted. Sorted creates a sorted list containing all of the elements in the iterable.

Let's do some demos. So if I create a list B, C, D, I could uppercase all of those elements by invoking the upper method for x in BCD. I could get a similar effect by calling a map on a lambda function that computes the uppercase version of every element in BCD. But what I get is not the list, capital B, capital C, capital D, but instead a map object, which is an iterator.

So if I give it the name M, then I can ask for the next uppercase letter, which is B, and then C, and then D, and then we're done. Now, how those results computed is quite interesting. Let's define a function double, which takes an x and prints out exactly when x got doubled. X is doubled into 2 times x right now, 2 times x.

If I map double over the list 3, 5, 7, I get a map object, and you notice nothing was printed. So I'll give this thing the name M, and then I'll ask for the next element in M. And at that very moment, it doubles 3 to get the number 6. Not until I ask for the next element will it double 5 to get the number 10, and then finally, if I ask for the next element after that, it computes the number 14.

So the point here is that double is not applied to 3 and then 5 and then 7 immediately, but instead applied lazily. Only when we ask for the next element is the function applied and the result computed. The map object that's returned when I call map can be passed into another sequence processing function. So for instance, let's say I take the range from 3 to 7.

I map double over that range, and I call that M. Then I create a filter function that takes in a value y and returns true as long as y is greater than or equal to 10. I could filter using f the map object and build a new iterator from the result. Notice I still haven't doubled anything at all. If I ask for what's the next doubled element in the range from 3 to 7 that's at least 10, then it will double 3 to find that the result is 6, which is false according to our filter function.

So it doubles 4 to get 8, which is also false. Then it doubles 5 to get 10, and 10 is greater than or equal to 10, so that gets returned. So you can see that it did exactly as much work as it needed to do in order to return the next element of the sequence of doubled values that are greater than or equal to 10.

But it didn't do any more work than that. If I ask for the next element, then it'll just double one of them, find out it's greater than or equal to 10, and return it. And if I list the contents of t, well, it finds that there's nothing left, because this range only goes 3, 4, 5, 6. 6 doubled is 12, and then we're done.

So starting from scratch, if I want to filter all of the elements of the result of mapping double over the range 3 to 7, I'll get an iterator over the values 10 and 12, which I could place in a list. And placing them in a list means that it's going to run this process to exhaustion until I reach an empty iterator at the end, and that returns the values 10 and 12, and it had to do all of the work in order to get there.

It had to double every number 3, 4, 5, and 6. So it's possible to use these iterators to compute the exhaustive answer, but if you don't ask for the list of values, and you only ask for elements one at a time, then they will be computed lazily. Lazy computation is mostly convenient because it allows you to specify how to compute lots of values, but if you don't actually need all those values, then you don't bother computing them.

However, there are some things to be careful of. For example, if I create a list that's the same, forward or backward, and I ask what's the reversed version of that list, what I get is a list-reverse-iterator object. So just saying, is the reverse of t equal to t will give me the result false. Now, if I list out all of the contents of the reversed iterator, that's equal to t.

But you want to avoid applying equality to a list and an iterator because you'll get false. You'd have to compare a list and a list. Let's work through an example using zip. First of all, some details about the built-in zip function. It returns an iterator over co-indexed tuples. So, if you had a list of 1-2 and a list of 3-4 and zip them together, you'd get 1-3, that co-indexed pair, and 2-4, that co-indexed pair.

If one iterable in the original input is longer than the other, zip only iterates over matches and skips the extras. So, 1-2 zipped with 3-4-5 gives you the same result. The 5 is lost. You can even zip together more than two iterables. 1-2, 3-4-5, and 6-7 gives you triples. One from here, one from here, one from here, all co-indexed. Okay, let's work on a problem together.

Implement the palindrome function, which returns whether its input s is the same forward and backward, meaning that if you read the sequence s backwards, you get elements that are equal to the elements you would have had reading it forward. So, 3-1-4-1-3 is a palindrome, 3-1-4-1-3, but 3-1-4-1-5 is not, because 3 isn't equal to 5. And we'd like this to work not just on lists, but on any kind of sequence.

So, here's the title of a book I like, which happens to be a palindrome, though not if you add a space in it. Alright, how would we implement this? You might think it's as simple as returning whether s is equal to what you get when you reverse s. And if we try this out, we'll find that the tests don't pass. Instead, this always returns false.

Why is that? Well, if I have a list 1, 2, 3, and I reverse it, I get a list reverse iterator object. This thing is not equal to 3, 2, 1. It's an iterator over those values. I could try to get those values out by calling list, though I have to be careful. Doing it twice will leave me with an empty list, because once you go through the elements in reverse order, you've used up the iterator t.

But, one way to solve this problem is to build a list out of s, build a list out of the reversed elements of s, and then use list comparison in order to tell whether they have the same elements or not, meaning equal elements. Okay, so that passes the tests. But here's a second way. We could start with our list and zip it with a reversed version of itself.

That gives me co-indexed pairs of 1 and 3, 2 and 2, and 3 and 1. If this were a palindrome, all of these would be equal. So, we can write a list comprehension that computes whether each one of these is equal and see if they're all true. All a equals b for a comma b in the result of zipping together s and s in reverse.

And that works too. Which one's better? I think they're both fine. The nice thing about this version is that it allows you to generalize the way in which you're comparing two elements. Right now we're using equality, but if we wanted to make sure they were close together or were the same after lower casing or something like that, it would be easy to extend this version of the program.

Let's talk about when one would use iterators. Code that processes an iterator via next or an iterable, usually via a for statement or occasionally with iter, makes very few assumptions about the data representation, which means that changing the data representation from a list to something else, a tuple or a map object or a dict keys object or something like that, doesn't require rewriting any code.

So this is really a data abstraction idea. If you just treat something as iterable or an iterator without worrying about exactly what it is, then your code will work even when the way in which the data is represented has changed. That means other people are more likely to be able to use your code on their data if they have some strange format.

An iterator also bundles together a sequence and a position within that sequence as one object, which can be quite convenient when passing that object around to other functions, because you'll always retain the position. This is useful for ensuring, for example, that each element of a sequence is processed only once, because even if you're passing that sequence around, if it's an iterator, whoever calls next on it is advancing the iterator for any other function that calls next again.

So a particular value will only be returned by next once. Finally, passing around an iterator limits the operations that can be performed on a sequence to only requesting the next value, which I imagine could be convenient, because then you don't have to worry about some function changing the sequence, aside from just advancing the iterator. Let's work through an example. The game here is Casino Blackjack.

The way that works is that you try to get close to 21 without going over by drawing cards one at a time, where the numbered cards are worth their face value, face cards are worth 10, and aces are worth either 1 or 11, depending on your preference. The way Casino Blackjack is dealt is to give one card to each player, then one card to the dealer, which is shown face up.

Then each player gets a second card, and the dealer gets a second card, but this one is face down, called the whole card. Then the player has to decide whether to get more cards or not, before the dealer does. The player can choose when to ask for more cards and when to stop, called holding. The dealer follows a set formula, which sometimes varies a little bit depending on the casino, but always the details are announced, so the dealer is not really making decisions, they just have some fixed policy.

So the player goes first, sees that they have 16, wants more points than 16, because it might be that the dealer has 20, so asks for another card and now has 21, which is good, because it's not over 21, and it's the highest score you can get. Once the player decides they have enough cards, they say, I hold. Now the dealer flips over their whole card, sees they have 13, and dealers have to hit as long as they have less than 17. They get an ace, so now they either have 24 or 14. 24 would be bad, because that's over 21, so we'll count this as a 1. 14 is still not up to 17, so we take one more card, hit 24. That's over 21, so the dealer loses, and the player would win a dollar.

I'm not going to type all of this out because it's kind of long, but here's the part about jacks, queens, and kings being worth 10, aces are 1 or 11, and the way that's handled in this program is by taking in a handful of cards, summing up the points for each card, where if the card isn't in the dictionary, like the number of 7, then we just use that card itself as the number. And if it turns out the total is less than or equal to 11, then you want your ace to be worth 11 instead of 1, so that you can, for example, go from 11 to 21. Okay, how do you play blackjack? Well, you shuffle the cards. Now you have a deck of cards. You deal, as I said, the first two cards for the player and the dealer, and the player gets a turn. They might go over 21, then they lose a dollar. Then the dealer gets a turn. They might go over 21. Then the player gains a dollar. And if nobody goes over 21, then you compare their scores. And here's some tricky logic to say that if you tie, you get zero. If you have fewer than the dealer, then you get negative one. And if you have more than the dealer, then you get one.

Okay, but what is the deck, and how do we deal cards? Well, we shuffle the cards by putting together a list with all 52 cards, calling the built-in random.shuffle, and then returning an iterator over that deck. Which means that people can call next on the deck of cards and get the next card, but there won't be any repeated cards in there. Instead, you keep drawing from the top until you run out. In a game of blackjack, you never run out of cards, so we'll just deal off the top few.

The player cards is a list that starts with whatever is next in the deck. Then comes the up card, which is whatever is next in the deck after that. Then the player gets another card. And finally, the dealer gets another card, but we're not going to let the player look at this one. When it's the player's turn, they only get to see the dealer's up card, not their whole card. And these are just like conventional terms for the cards. This is the one that's showing, and this is the one that's hidden among the dealer's cards. The player gets to look at their own cards, and then they're going to go execute their strategy, which might involve getting more cards from the deck. While they haven't gone bust, and they want another card, we append the next card from the deck. And their strategy has to be a function that returns true for wanting another card or false for being ready to stop based on the dealer's up card and the cards they have in their hand.

Okay, then it's the dealer's turn, and the dealer follows an algorithm. They don't get to decide based on a strategy. It's just that when they haven't scored 17 yet, then they have to get another card. Actual casinos have slightly more complicated rules around this, but I'm not going to worry about that. Okay, so what's a good strategy? Well, one strategy is, if you don't have 11 points yet, you might as well get another card. If the dealer is showing something small, then oftentimes you'll just wait and see what they get. If they're showing something large, like a 7, 8, 9, or 10, then check and see if you're at 17 yet. If you're still at 15, get another card.

Okay, so let's play some blackjack and see what happens using my basic strategy. I grabbed 15, the dealer had 17, and so I lost a dollar. I had 18, they had 21, oh, I lost a dollar again. But this time, I didn't hit because they had a 3 showing, and they ended up going over 21. So I got a dollar. This time I lost. That time I won. I'm feeling pretty good.

What happens if I keep going for a while, play a thousand hands? Well, I wrote a function to do that, so I didn't have to show you what happens. The only thing here is that I'm replacing the print function with something that doesn't print, so that I don't have to see the outcome of each individual game. I just sum up the negative ones and the ones and the zeros for a thousand hands. And I'm sure that when I gamble a thousand times, I will make piles of money. Oh, in fact, I lost 67 more times than I won. Or 75. Or 9. Or 10. Oh, this time I won more than I lost. So it is possible every once in a while to win more than you lose in a game of blackjack casino rules, but it doesn't happen very often.

And that's how casinos make money, even though you feel like you might be winning.

## 17. Part p17 - Lecture 17 - Generators

61A Lecture Number 17, Announcements. Project 2 is due Tuesday, but you get an early submission bonus point for finishing Monday. We will have office hours on Monday and Tuesday to help you out. Homework 4 is pretty short. It's about mutation and trees, which were the big topics from last week, and it's due on Thursday. A generator is a special kind of iterator.

Just like a map object is a special kind of iterator. The thing that's special about a generator is that it's returned from a generator function. A generator function looks like a regular function. Here's an example. The difference is that it uses the yield keyword instead of return in order to return values. So I know this is a generator function because it has yields in it somewhere.

When I call plus-minus on the value 3, I get back a generator t. This generator is an iterator, meaning I can iterate through the values yielded by plus-minus. So if I call next on t, I get 3, but I can call next t again to get negative 3. So you can see that both of these yield statements are being executed. t itself is a generator object, and its job is to help iterate through all of the yielded values of the function that was called.

So a generator function is a function that yields values instead of returning them. A normal function returns just once, but a generator function can yield multiple times. A generator is an iterator created automatically whenever you call a generator function. So here's the call expression where we called plus-minus and got back a generator. When a generator function is called, it returns a generator, and that generator iterates over the yields of the function.

Here's another example. Let's say I want to return iterators that go over even numbers only. I give integer start and end points, but I want to make sure that I actually start at the even number that's greater than or equal to start. So the next even number is start plus either 0 or 1, depending on whether start is even or odd. While it's the case that this even number is less than end, I'm going to yield it, and then I'll increase even by 2 to get the next even number.

So when I call evens, and I go from 2 up to 10, I get a generator object that's going to give me 2 and then 4 and then 6 and then 8, and then stop iteration, meaning we're done. And if I list all the evens between 1 and 10, it still starts at 2, goes up through, but not including 10. So what's actually happening here?

When I create a generator by calling a generator function, I haven't even begun executing the body of this function yet. It's not until next is called that the body begins to be executed, and it keeps executing until a yield statement is reached, at which point that number is yielded as the next element in this iterator t. And in that case, execution pauses at that yield but remembers all of the environment of the function execution so that the next time next is called, it can continue where it left off.

So the next thing I would do is add 2 to even, continue back up into the while statement, see that even is less than end, and yield the next even number. And what's powerful about generators is that you can set up any computation you want, and that computation will be executed lazily. So when somebody asks for the next element, then you continue until you reach the next yield, but if nobody asks for all of the elements, then you don't have to continue computing everything.

You just pause there until the next value is needed. Generator functions return generators, but they often process iterators in the course of their execution. And this happens so often that in Python 3.3, released back in 2012, they added a new statement, yield from, that just has a generator yield all the elements in some other iterator. So a yield from statement yields all values from an iterator or iterable.

For instance, let's say I want to define a then b, which is a function that takes in two iterables or iterators and returns all the elements in the first followed by all the elements in the second. One way I could write this is to say for x in a, yield x, and then for x in b, yield x. But there's a simpler way.

I could just write yield from a, then yield from b. These are completely equivalent. So you can think of yield from as just shorthand for writing down a for statement where you go through all the elements in a and yield them. But it does allow you to avoid giving a name to each item in this sequence, which just cleans up your code.

Here's another example. Let's say we want to define a generator function that counts down from 5. Well, one way I could do it is recursively. If k is greater than 0, then I yield k. Then I yield all of the values in countdown k minus 1 by calling yield from countdown k minus 1. So if I'm counting down from k, if k is greater than 0, I definitely want to yield k first.

If I wrote this wrong and just wrote yield to count down k minus 1, the second element in the iterator that I got back would actually just be another iterator. So counting down from 3 would start out well, but the next thing I'd get back is a generator object, which is not what I expected. I expected the number 2. So to get the numbers 2 and 1, I'd have to write a 4 statement and yield each element in the 4 statement.

Then if I count down, I get 3 and then 2 and then 1. And the shorthand way to do that is instead of writing a 4 statement, I just write yield from everything in countdown. And I get 3, 2, 1, blast off. Wouldn't it be cool if it said blast off at the end? Well, we could change that. We could just say else yield blast off.

Okay, so now we can go for every k in countdown. 3, print k. And it gives me the whole countdown sequence and something exciting at the end. Let's finish with a slightly more involved example. I can yield all the prefixes of s, or I'm going to assume s is a string, but it really could be any iterable. If it's non-empty, then I'm going to yield from the prefixes of all of s up and to, but not including the last element.

And then I'll yield s itself. So the prefixes of both is a generator object. If I list them out, then I get b, bo, bot, and both. And I get them in this order because I yield from prefixes before I yield s itself. Once I can generate prefixes, I can also generate substrings. If s is not empty, then some of the substrings are just the prefixes.

So I'll yield all of those. And then I'll yield from the substrings of the rest of the string. So substrings of tops, for instance, is a generator. If I list its contents, then I see t, to, top, and tops. Those are all the prefixes of tops. But then I get all the prefixes of ops. O, O, P, ops. And then P, P, S, and S.

And together, those are all of the substrings of tops. Let's work through an example. An old example. The partitions of a number. A partition of a positive integer n using parts up to size m is a way in which n can be expressed as the sum of positive integer parts up to size m in increasing order. So if I want all the partitions of the number 6 with parts up to size 4, then I get all of these different options.

I can add 2 and 4 together or 3 and 3 together or 1, 2, and 3. But I don't use any 5s because I said the maximum size of a part was 4. And all of these sum up to 6. Once upon a time, we counted the partitions of n using parts up to size m. But now we're going to construct the partitions themselves, which sounds more interesting.

So the structure I have here, which lists out three different base cases, where the first one says that if I subtracted m from n and got exactly 0, then that counts as one of the ways of partitioning n, which basically means that if n was 3 and I used a part of size 3, then I would get 0 because one way to make 3 is just the number 3.

Well, we can write it this way. But there's another perfectly good way to write it, which is to look for an exact match between n and m. We're counting up the number of ways of partitioning. So by default, it's 0. But if it's the case that m exactly equals m, then we have an exact match. So that's one of the ways of partitioning n.

And we'll just add it in here. And then since both of these cases return the same thing, let's just put them together. If n is less than 0 or m equals 0, then there's no more work to do. And let's just make sure this still works. It does. At least for this example. So now we want to talk about not counting the partitions, but listing them out.

If I list the partitions, I want lists like 2, 4 is one way to make 6. And it's going to return a list of lists. If we can't partition n, then that list would be empty. The list of ways of building this using an exact match would be empty, unless it's the case that I found an exact match, in which case I want to have a one element partition of n.

With m means that my partition actually includes m, so I need to make sure that the result actually has the right format. This is a list of lists. I go through every element in that list, and what I want to construct is that element with an m on it. Without m, I need to call list partitions because I changed the name of my function, but since none of these partitions include m, I don't think I need to change them at all.

Then I sum these three up in order to build one long list, and let's see what I got. I got a list of lists of partitions. Let's write this out in a way that is easier to read. For p in the list of partitions, print p, and we get all of the partitions. I have yet to use yield. Instead, I've used a list containing a list with one element or an empty list.

And here I've built a list comprehension where I had the old list and I put in another list. It's a lot of list manipulation. And what if what I really wanted was a list of strings? Where instead of two comma four, it would say two plus four, et cetera. How would I do that? Well, there's still a base case that says there's no such string.

But here, instead of building a list with m in it, I'll build a string with m in it. And when I want to append m on to an existing partition, well, that would involve building the right string. And what do we get? A nicer formatting for the same result. So all of this is possible using lists, but I think it's simpler using yield.

Let me show you. If I want to yield all of the partitions and get exactly the same result, instead of building up a bunch of small lists, I just yield their elements. If n equals m, I yield not a list containing strm, but just strm itself. I just think about the elements as opposed to how to put them into lists and combine lists, I just say one of the ways of partitioning n using parts up to size m is just m if n equals m.

In fact, I don't even need this anymore. Now, there's a lot going on in this line. Part of it is that I want to go through all of the partitions of n minus m. But, when I'm writing a generator function, I just think about what to do with each one. No list comprehension necessary. I just want to build a longer partition. What do I want to do with all the partitions of n using parts of m minus 1 or smaller?

Well, those are all partitions of n using parts up to size m. So, I'll go ahead and yield from that. And what do I return? Nothing at all. I'm finished. And, in fact, this return value isn't doing anything at all. I don't even need this base case. I could just say if n is greater than 0 and m is greater than 0, so there's some hope of making progress here, then I yield a one-element partition if that makes sense.

Otherwise, I build up longer partitions by subtracting m from n and, in addition, keep all the partitions of n using parts up to size m minus 1. And this is the result that I get. I think this version is not only more elegant and easy to read once you get your head around what yield means, which is to contribute one element, and what yield from means, which is to contribute a whole group of elements to the final output.

It's also very efficient in that it's doing the same computation, but if you only needed to do part of that computation, this would stop early. So let's say I wanted to partition some big number like 60 using parts up to size 50. Assuming I could spell, this would take a while because it's considering lots of different possibilities. Almost a million of them.

But if I didn't want them all, I just wanted, you know, an example, then that would happen really fast. If I wanted 10 examples, that would happen really fast. That's only true of the version of this implementation that uses yield. The previous version, which had lots of different list manipulations, was forced to build the whole list of 966,000 options before I ever had a chance to look at the first 10.

So if you're ever writing a program where there are many possibilities and you only want a few of them, sometimes this generator function approach can not only be easier to write, easier to read, but also dramatically faster to run.

## 18. Part p18 - Lecture 18 - Objects

Object-oriented programming is the dominant paradigm for organizing programs used today when developing large pieces of software. It has had a huge influence on the design of programming languages, including Python and many others, and it builds on the ideas of data abstraction and mutation that we've talked about already. So here's the story. We need to organize large programs that are very complex into small modular components that can individually be written and tested and thought about all at once because humans can only think about so much complexity at a time.

We do this with data abstraction, but object-oriented programming takes that idea one step further by bundling together multiple pieces of information like with data abstraction and also related behavior. So that an object which represents something in the world, such as a date, not only stores all the information necessary to represent that date, but also can perform date-like things, such as determining what day of the week that date falls on.

The idea behind object-oriented programming is that you think about your program and all of the computation that it performs not as one long list of information and then functions operating on that list, but instead a bunch of different objects that interact with each other, where each object keeps track of its own information. So each object has its own local state, which may change over time, so mutation is often involved in object-oriented programming, although that's not necessary.

But when mutation happens, it doesn't happen in some global list that keeps track of all the information in the program. Instead, the information that's changing belongs to a particular object. Each object should know how to manage its local state, meaning that it keeps track of what changes are allowed, and the way in which you interact with an object is using what's called a method, which is a function that's particular to that kind of object.

Several objects may all be instances of a common class, which is a type of object, so you can have many different lists that all behave the same. Different classes may relate to each other. Built into Python and many other programming languages are specialized syntax and vocabulary to support this metaphor. A class defines how objects of a particular type behave. An object is an instance of a class, meaning that each object has a type, which is its class.

And when an object is created, it has that class for all time. And then there's this concept of a method. A method is a function called on an object using a dot expression, such as if I have a list s, I can write s dot append 5. Append is the method. It's invoked on the list s with the argument 5, and that puts 5 into the list s.

And what makes methods different from functions is that a function is typically defined in the global frame, and it can be called on any value, whereas a method is specific to a particular object. So I can't just call append on anything, but I can invoke it on s, because s knows how to append. Let's look at a built-in class, the list class.

In fact, we've been calling list like it's a function, but it is a class instead. When calling list on an iterable creates a new list object, this is true in general in Python that if you have a class and you call it like it's a function, then you're creating a new instance of that class. So an instance of a list is a list.

In this case, a list containing 0, 1, and 2. If I ask what the type of s is, I see that it's the list class, the same result that I would have seen if I had just typed list. And it's not the list itself, but its class that describes all of the possible behavior related to lists. The list class defines how everything about how lists work, such as the methods, how addition and multiplication work on lists, and how item assignment and lookup work on lists.

So it's up to the list class to know that the element at the beginning is element 0 instead of element 1. In addition to using built-in classes, we can define our own classes and then create instances of those classes to build new types of objects. A class describes the behavior of its instances. Let's say we want to represent bank accounts. And we want to bundle together the information related to a bank account, such as having an account balance and an account holder, with behavior related to a bank account, such as depositing money into it and withdrawing money out.

The way this works is that all bank accounts need to have a balance and a holder, which means that it needs to be up to the account class, which we will define on the next slide. To create these attributes to each newly created account instance. This line uses the account class, which we're about to define, but let's assume we've defined it already, to create a new account instance.

So here's the class. I call it like it's a function, and that creates a new instance, A. This instance, A, has as its holder, John. So if I look up its holder attribute, I see John. How do I know it's called holder? Well, that's part of the class definition that we're about to look at. But the abstraction is that I can access the holder and I can access the balance of any account using dot expressions where holder and balance are called attributes of the A object, which is an instance of the account class.

All bank accounts should share a withdraw method and a deposit method, meaning that they behave in the same way. They might have different balances and different holders, but what it means to deposit into a bank account is the same regardless of which bank account it is. Here we invoke the deposit method on A and deposit 15 into it, and that leaves us with the remaining balance of 15 since it was 0 before.

After we withdraw 10, that withdraws 10 of the balance, leaving us with 5. So both the deposit and the withdraw method change the balance and return whatever it is after the change. Now we can see that the balance has been updated. So withdrawing and depositing use the balance, which is an attribute, in order to keep all of these things in sync. This is an example of a local state.

What do I mean by local? I mean this balance is particular to the A object. It's not something that I could refer to without a dot expression. A method can have arbitrarily complicated behavior associated with it. You can write any function you want. So maybe it's the case that when you withdraw, it first checks to make sure that you have enough money, and if not, then it returns the string insufficient funds and does not update the balance.

Deposit and withdraw are methods, and methods are defined within the class of the object, in this case, the account class. In order to achieve this behavior, we have to write a fair amount of code. So I'm just going to walk through all of it now so that you can see it, and then we'll talk about the details of why it is the way it is.

Methods are functions defined in a class statement. So a class statement starts with the keyword class, then you have to name the class. Then you have to define what happens when you create a new instance of this class, which is the first line here. And you do that using the special method name init, which is always written this way, even with these underscores, because that's the function that automatically gets called when you create a new account.

Here we refer to this new account as self, and assign attributes to it, balance and holder, where balance is always set to zero, and holder is assigned to whatever gets passed in, which gets a name from the function definition, and notice that the name of the attribute can be different than the name used inside of this init function. So now we've provided attributes to the object, but we also need to provide behavior, and so we define methods.

Methods look like functions, but they're defined within a class. And here, the deposit method takes two arguments. The first one is self, and self is the instance of the account class on which deposit was invoked when I write a dot expression using deposit. So notice that I call deposit on only one argument, but I define it in terms of two, so that I have access to all the attributes of the account that I'm depositing into.

It's as if a is assigned to self. Now we can look at the code within deposit. It changes the balance attribute by looking up the balance attribute and adding the amount, and then returns the balance attribute. The return statement is why we see some output when we write a dot deposit. If we didn't have a return statement, that would be okay. It would just return none, and could still change the balance.

The withdraw method is a little bit more complicated. It takes in an account called self and a number called amount, checks to see if the amount is greater than self.balance. Notice that each time I want to refer to balance, I have to use a dot expression because it's an attribute. I can return whatever I want, and I can also update attributes of self or return them.

This definition of an account enables us to use an account like this, and that's how you create a new type of object. Let's look at a little more detail about what happens when you try to create an instance of a class that you defined. Object construction implements this idea that all bank accounts should have a balance and an account holder. It's got to be up to the account class to add those attributes.

And what happens when you define and then call a class is that a new instance of that class is created. And it knows it's an account, but it's a blank slate in terms of attributes. Those need to be added using an init method. And the init method of a class is called with the new object as its first argument, which we always name self, along with any additional arguments provided in the call expression.

For example, Allen here is provided as the account holder. So here's the definition from the class that we showed earlier. And what happens is that first an instance is created that doesn't have any attributes, and then init is called on this new account instance and Allen. The account instance is empty for now, but as soon as I start assigning attributes, since self refers to the account instance, self.balance equals zero, we'll add a balance attribute bound to zero to the instance, at which point we could later look it up.

Likewise, self.holder will add a holder attribute. And now this instance has two attributes. It's ready to be used like an account. The init method is sometimes called a constructor method, and that vocabulary is used in other programming languages as well. This one call expression does all that work, one and two, at which point we can now refer to the attributes of a.

An object's attributes are accessed and modified using dot expressions. So if I've already created an account, I can look up its balance. I can also change its balance using an attribute assignment statement. The value of an existing attribute can be changed at any time. And now there's $12 in this bank account. An attribute can be assigned a value even if that attribute did not exist before.

Let me give you a more complicated example. B is a separate account for a different account holder. It has a balance of zero. Here we set it to 20. Here I'm creating an attribute called backup on the A account, which I created earlier, and assigning it the value of the B account, which I also created earlier. It's okay to have the value of an attribute be another object, such as an account.

It doesn't have to be a number. And it's also okay to introduce a new attribute that wasn't named before. A new attribute can be added at any time in Python. And now we can refer to it. And here's an interesting expression. A dot backup refers to B, and its balance is 20. So we have two different ways of referring to the same account, either B or A dot backup.

Let's talk about object identity. This is important because objects' attributes can change. So the objects can mutate, and so you have to know whether you happen to have two objects that are different with the same attributes or whether they are in fact the same object. Every object that is an instance of a user-defined class has a unique identity. So A account and B account are different accounts because I called account twice.

Every call to account creates a new account instance. There's only one account class, but many instances. A has a balance and a holder. B has a balance and a holder. The identity operators, is and is not, test to see if two expressions evaluate to the same object. A is A is true because both of these are expressions that evaluate to the John account.

A is not B because even though they have the same balance, and even if they had the same holder, they would be different accounts because we called account twice. Binding an object to a new name using assignment does not create a new object. If I say C equals A, it's still the case that C is A. They're just two different names for the same account.

The last part of that original class statement that we need to discuss is the method definition. Invoking methods means using a dot expression to call one of the methods defined in the class. All invoked methods have access to the object via the self parameter, and so they can all access and manipulate the object's attributes. And this is the mechanism by which an object manages its own local state.

Because the class of the object describes how the state changes, like how the balance gets updated. So inside of our account class definition, we had a deposit method, which took two arguments, combine them together to get a new balance, and assign that to self.balance. This is defined with two parameters, but dot notation automatically supplies the first argument to a method. And so if I create an account for Tom and I use deposit, even though it's defined with two parameters, it's called with one because the other parameter is TomAccount.

So it's invoked with one argument, but TomAccount is also passed into deposit and bound to self. So you might wonder, what's the point? Why don't we just define a deposit function? And the answer is that different types of objects might deposit in different ways. And so this deposit is specific to the account class. But if you have some other kind of class, like an investment fund, depositing into that might have different behavior, different code.

Hence you define a separate deposit method for that other class, and which one you use will depend on the type of the object that you invoke deposit on.

## 19. Part p19 - Lecture 19 - Attributes

Class attributes are attributes of a class. When executing a class statement, a new class is created. It's given a name in the first frame of the current environment, and then assignment statements and def statements within the suite of the class statement create class attributes, attributes of the class. Normally assignment and def would create names in frames, but that's not the case here.

Instead, they all go in the class as class attributes. And it's really possible to write any code that you want inside of a class statement. Now this code is not helpful at all, but it's just here to illustrate what's possible. You can write assignment statements and def statements, and that will create class attributes, meaning that these are values you can access via the class.

Knows is a class attribute whose value is big and red. Dance is a class attribute, which is a function that you could call. Now you would never write such a function because when you instantiate this class, you'll run into a problem. But the point of this example is just to show what happens when you execute a class statement. It puts a bunch of class attributes in the class.

Now there is a good reason to create a class attribute. Class attributes are shared across all instances of a class because they're attributes of the class, not the instance. So for example, if all accounts had the same interest rate, instead of using an instance attribute to represent the interest rate, we could use a class attribute. And that means that instead of storing this value in every instance that gets created, we just store it once in the class.

After creating two instances of the class, we can use either one to access the interest rate. The fact that it's a class attribute is not really apparent when you access it. It just looks like it's an attribute of TomAccount. And it is an attribute of TomAccount, but it's a class attribute, meaning the same value is held for every instance of the class.

It's important that the interest attribute is not part of the instance. It's part of the class. It's just the lookup procedure that gave us access to it, even though it was part of the class. As a result, JimAccount has the same interest rate. Each time a dot expression is evaluated, an attribute must be looked up for an object. The expression gives you the object, and name gives you the name of the attribute to look up.

But looking up an attribute by its name is actually a process that looks in multiple places. Both instances and their classes have attributes that can both be accessed using dot expressions. And here's how a dot expression gets evaluated. First, the expression to the left of the dot gets evaluated. Now we have an object. Name is matched against the instance attributes of that object.

If an attribute with that name exists, its value is returned. So we look first in the instance itself. In the account example, the instance attributes are the balance and the holder. However, there are other names that you can put after the dot. You can put a class attribute name there as well. And so, if no instance attribute is found with that name, then the name is looked up in the class of that object.

At which point we find a class attribute value. That value is the value of the whole expression, unless it is a function, in which case a bound method is returned instead, for which the object of the dot expression is already filled in as the argument self. So this process is just one of those things that you need to memorize, kind of like looking up names in environments looks in multiple frames.

Here we have a process for looking up a name that first looks in the instance and then in its class. In addition to dot expressions, there's a built-in function called getAtter, which can also look up an attribute by its name. So in addition to writing tomAccount.balance for an account object called tomAccount, we could also write get the attribute balance for tomAccount, which does exactly the same thing.

There's also a hasAtter built-in function, which will tell you whether an attribute of this name exists, either for tomAccount the instance or its class. GetAtter and dot expressions look up a name in the same way. And looking up an attribute name in an object may return either one of its instance attributes or one of the attributes of its class. Attribute assignment statements change the values that are bound to attribute names within an object or a class.

So you can assign to attributes. Assignment statements with a dot expression on their left-hand side are attribute assignment statements. So they affect the attributes of the object of that dot expression. If that object is an instance, then assignment sets an instance attribute. If the object is a class, assignment sets a class attribute. So let's say I have the account class. Here I've just shown you part of it.

Interest in this definition is already a class attribute because it's defined directly within the class. Whereas holder and balance are instance attributes because they're set on the new instance that's created and passed to init. So account is a class and tom account is an instance of the class. If I say tom account dot interest equals 0.08, that's setting an instance attribute because the object of the dot expression is an instance.

So this expression evaluates to an object. This whole thing doesn't look up interest on that object and go find it in the class. Instead we just directly assign to the attribute of the object that's here. So this is attribute assignment that adds or modifies the attribute named interest to the tom account. In this case, the instance didn't have an interest attribute before and so the assignment statement will add one.

That's an example of instance attribute assignment. Class attribute assignment arises when you have an attribute assignment statement, meaning there's some expression with a dot on the left, and the object of that dot expression is a class. So this will go and change the interest attribute of the account class, which in this case already existed. And so we go change it. Okay.

So here's an extended example of how attribute assignment statements affect classes and objects. Let's say I say JimAccount is an account with Jim. Then I'm going to introduce this new object, which has a balance and a holder. And this instance is an instance of this class. Now the account class has interest. And that's accessible from all the instances, but it's part of the class.

It also has withdraw and deposit methods and an init method. So here we see the instance attributes of a JimAccount are just the balance and the holder. And if I create TomAccount, well then it will have its own balance and its own holder. The balances happen to be the same, but they could change later on. Here we've looked up interest on TomAccount, which means looking in TomAccount to see if there's an interest attribute, there's not, so then you look in the class.

There it's found, 0.02, and so that's the value we see. JimAccount has an interest of 0.02 as well. Next, I can set account.interest to 0.04. That changes a class attribute for the account class. So we can see that change reflected up here. That interest is not bound to 0.02 anymore, but the attribute value is now 0.04. If I look up the interest on Tom's account, I'll find that 0.04.

And on Jim's account, I'll find the same. Even though these were created back when the account class had a different interest rate. So it's not the case that an instance has its class attributes locked in when it's created. Instead, they can change over time, and the instances will reflect those changes. Next we see JimAccount.interest set to 0.08. This is an instance attribute assignment that adds an interest attribute to the JimAccount.

Okay, so now we see interest reflected in two places, both in an instance and in the class. If we look up JimAccountsinterest, we'll see 0.08, which is what we just said. If we look up TomAccountsinterest, we first look in TomAccount, it has no interest, and so we look in its class, and it's currently set to 0.04. So now we see that we're able to specialize a particular instance of the account class, giving it its own special interest rate, which you know might happen in a bank.

Somebody gets a higher interest rate than somebody else. Let's say now we change account.interest to 0.05. Well that's a class attribute assignment statement that will change this to 0.05. Finally we can check the interest rate for each instance. Tom's account has an interest rate of 0.05, which just changed because of this class attribute assignment statement. Jim still has an interest rate that's a special case, 0.08.

So by assigning to the class, you don't erase all the special cases. They're still there. Calling or invoking a method on an object is the primary way to interact with an object. Method calls are different from function calls because they involve a dot expression. Methods are invoked using dot notation, which looks like this. We write some expression, then a dot, and then a name.

The expression can be any valid Python expression, so you might write something complicated to pick what object you're looking up the method for, but then the name just has to be a simple name like deposit or withdraw or append or something like that. This expression evaluates to the value of the attribute. Looked up by name. In the object, that's the value of the expression.

So first thing you have to evaluate this expression to get the object of the dot expression. Then you can look up the attribute name. And then you can call this method TomAccount.Deposit10. Now, actually, the structure of this call expression is that there is a dot expression in the operator position. The whole thing is just a regular call expression, but the dot expression gets evaluated first because it's the operator sub-expression, which gives you a method that knows it's depositing into TomAccount, and then you can pass 10 as the argument.

So here on the right, I have the account class that we defined last time and some examples of how to use it. It has only three methods, init deposit and withdraw. init is not called directly typically, but instead happens automatically whenever you create an instance of the account class, whereas deposit and withdraw are invoked using method call expressions, just like the one we looked at on the slide.

If I create an account for Alan, I can, of course, deposit into it like this. And if I deposit twice, the effect is cumulative. But I said that a dot deposit is itself an expression. So when we evaluate it, we find a bound method, account dot deposit. What does it mean to be a bound method? That means that the self argument's already filled in.

This is a method that's going to be depositing money into Alan's account. So just to see how this works, let me create a second account. And it has a balance of 0, whereas a now has a balance of 10 after my two deposits. If I assign the name F to A dot deposit, and then I call F, I'm depositing into Alan's account, A. If I deposit twice, we see that our original balance of 10 has gone to 30, and it is in fact the balance of the balance of the A account that has increased, whereas the balance of the B account has not changed at all because we've been depositing into A.

Even though this call expression didn't refer to A, it did implicitly because F is a bound method that deposits into A. This can occasionally be useful in the context of a longer program because, for example, I could create a map object where the function I'm mapping is to deposit into A's account, and then I can decide what I want to deposit. How about 10 through 20?

So so far, I haven't made any deposits because map objects are iterators that are only evaluated lazily, but if I ask for the next M, then it is in fact going to deposit 10, the first element in this range, into A's account. So now there's 40, next we would deposit 11, and then 12, and then 13, etc. By mapping this A.deposit function, which is a bound method, it behaves like a function except we've already filled in the self, and so when we call it, we only have to pass in an amount.

Bound methods are functions that are also class attributes where the self argument has already been filled in with an instance of the class. Let's review all the terminology. All objects have attributes, which are name value pairs that can be looked up by name. A class is a type, it's a category of objects. Classes are objects as well, so they have attributes. An instance attribute is an attribute of an instance of a class, whereas a class attribute is an attribute of the class itself, which can still be accessed from an instance.

A class attribute, which is also a function, is a method. In the Python object system, functions are objects, and bound methods are also objects. They are just a function that was a class attribute and has had its first parameter self already bound to an instance of the class. Dot expressions evaluate to bound methods for class attributes that are functions. If I write instance dot method name, I get a bound method where the method was looked up by its name.

It started out as a function, but then the instance was filled in as the first argument, and so when calling this bound method, I just have to pass in the rest of the arguments. Python distinguishes between functions, which we've been creating since the start of the course, and bound methods, which couple together a function and the object on which that method will be invoked.

So an object and a function bound together gives you a bound method. If I look up a method using its class, I just get a function. But if I look up a method using an instance of the account class, then I get a bound method. This distinction is important because there are two different ways to call this deposit function. One is to call it as a function wherein I need to pass in both self and amount as the two arguments.

The other and much more common way is to call it as a bound method where tom account.deposit automatically fills in the self argument, and so I only have to pass in the amount. Okay.

## 20. Part p20 - Lecture 20 - Inheritance

On to a new topic, inheritance. This is a new feature of the Python object system, and it's a feature that exists in almost every object system in every programming language. So inheritance is a method for relating multiple classes together. Because not every class exists in isolation, sometimes one is just similar to another one, and we want to express that relationship. So the most common use case you should think about when using inheritance is when you have two similar classes that differ in their degree of specialization.

So the specialized class might have all the same attributes as the general class, along with some special case behavior. The way you express this syntactically in Python is that in addition to having a class statement with a name and a suite, you can also put in parentheses a base class. And the base class is what this class inherits from. So conceptually, what happens is that the subclass, the one that we create with this class statement, shares all the attributes with its base class, up here.

The subclass might override certain inherited attributes in order to change its behavior slightly, but anything that's not changed stays the same. So using inheritance, when we write down a subclass of an existing class, all we do is we specify what's different about this subclass from the base class. Everything else stays the same. Let's do an example. So let's say we have a checking account.

It's like an account, but special in the following way. When you create a checking account, you still give it a holder, but its interest rate is lower than the interest rate that you would get on a normal account. So you get less money every month. When you deposit, it's the same thing as before. You add money to your checking account. When you withdraw money from your checking account, you incur a withdrawal fee.

I mean, the bank has to make some money somehow, right? So when you withdraw $5 from your bank account and there's 20 in there, what's really left over is a balance of 14. Okay, so most of this behavior is shared with the base class account. So all that's different is that we have a lower interest rate and when we withdraw money, we have to pay an extra dollar.

Okay, here's how we write the code for this checking account. We say there's a class called checking account. Its base class is account. Another way of saying the same thing. We'll create a class called checking account that inherits from account. So this is a bank account that charges for withdrawals. We set that withdraw fee to be a dollar. We set the interest rate to be 0.01 instead of the usual 0.02.

And then we also have to change the withdraw method. Because writing down withdraw fee might seem like it's helping us get in the right direction. And it is. But we haven't ever said how to use the withdraw fee. So we have to write down a method that does that. And we'll write down the withdraw method. So the withdraw method takes some amount.

And what it does is it withdraws from the current account the amount that was specified, plus whatever the withdraw fee is for this current account. Now why do I keep saying current account when it says self right there? Well remember that self is the name we use to refer to the object on which this method gets invoked. So when we actually call withdraw right here, self will be bound to this checking account, which is currently called ch and was originally created with this call to checking account. Okay.

So we'll withdraw five dollars. Amount will be five. We'll add in the withdraw fee of one, which is shared among all checking accounts, because this is a class attribute. And then how do we actually do the withdrawing? Well, that's the interesting part. We refer to the method on the base class called account.withdraw. Now since we're looking this up on a class as opposed to on an instance, we're not going to get a bound method back. We have to supply this self ourselves. Okay.

Since we put account here as the base class, we don't need to say anything about depositing. That just stays the same as it was before. So checking accounts start out with zero dollars. Okay.

So let's talk about looking up attribute names on classes. The base class attributes aren't copied into the subclass. Instead, it's part of the process of looking up an attribute by name that gives you the behavior that an attribute of a subclass that isn't changed is just the same as whatever the base class was. So to look up a name in a class, here's what you do.

If it names an attribute that's in that class, then return the attribute value. Remember, attributes are name value pairs. If not, look up that name in the base class, if there is one. Now, the base class is just a class, so we recursively are doing the same thing. We'll look there, see if that attribute's in the class. If so, we'll return its attribute value.

Otherwise, we'll look up in the base class of the base class. Okay.

So let's talk about exactly what's happening. When I create a checking account, I pass in Tom as the holder. Since the checking account class we just defined doesn't have an init method of its own, we look up the name init. We don't find it in checking account, but we do find it in account. And so that's the one that gets called. And that sets the balance to zero and the holder to Tom.

When we look up the interest rate, well, there is a special interest rate for the checking account. So that's where we find it, and it's 0.01. When we deposit, all that depositing happens from the accounts method. So here's what we do. We try to evaluate this operator expression, which is a dot expression, which means we look up deposit on this checking account.

We check in the instance, no deposit attribute there. We check in the checking account class, no attribute deposit there. So then we check in the account class, and it has a method called deposit. So we get back a bound method here, and we call it on 20, depositing $20 in the account. And finally, when we withdraw, well, we find that in the checking account, and that gives us 14.

Okay, let's just write the whole thing down so that we understand what's going on. So on the right, you see the account class from last time. So in addition to the class that we have, we're going to create a class checking account, which inherits from account. It has a different interest rate. It has a fee associated with all withdrawals of $1. And the way that fee gets used is that we write a withdraw method that withdraws not just the amount, but $1 extra.

Okay, now it's reasonable that we could just copy this over, right? Say, okay, the first thing we're going to do is we'll add one to amount, and then we'll go through, and we'll check and see if the amount is too big. If it isn't, we'll say insufficient funds. If we're okay, then we'll change the balance, and we'll return that balance. This would be correct for a while, but the problem is, if we made changes up here, they wouldn't be reflected down here.

So that's why instead, in the example that I showed you, I said, let's actually just use the implementation we have already, account.withdraw. That's this function right here. And what does account.withdraw take? Well, it takes self and account object as a first parameter. And the second parameter is the amount that we want to withdraw, which is whatever amount was passed in here, plus the withdraw fee.

Let's quickly verify that this works. So if I have one account, that's an old kind of account for John. And then another account, which is a checking account for my good friend Jack. So A is an account, B is a checking account. They both have a balance of zero. Let's add a balance to each by depositing into 100 in A and depositing 100 in B.

Now, both of those did the same thing, because they're both using the same deposit function over here. But if I withdraw $10 from A, I have 90 left. Or if I withdraw $10 from B, then I have only $89 left, because I used this withdraw fee. Next, we'll talk about designing object-oriented programs. Some of the choices you'll encounter, and some guidance for how to come to a useful solution.

Okay, here's the checking account class that we just defined. And let me just reiterate why we did certain things that we did. So first of all, it's important to continue following the guidelines that you saw earlier in the course. Don't repeat yourself. Use existing implementations whenever you can, and try to avoid copying and pasting code. Second, attributes that have been overridden should still be accessible via class objects.

What am I talking about? Well, to override an attribute means that in the subclass, you're giving an attribute the same name as exists in the base class. So here we see the checking account class has withdraw, which also exists in the count class. But even though we've overridden that name, meaning the checking accounts will call this withdraw instead of the original withdraw, we can still access them and use them using the class object.

So here's the account class, and account.withdraw will give us the original withdraw method, as opposed to this new one for checking accounts. So we can still defer to the old logic, and we just make this small change of using a withdraw fee. You can also look up attributes on instances whenever possible, and this is a good idea. So what am I talking about there?

Well, when we compute the total amount that we're going to withdraw, amount plus self-withdraw fee, we had several options here. We could just write amount plus one, hard coding with the withdraw fee, but then we could never change it. We could also write amount plus checking account dot withdraw fee, which would get this one, this attribute here. But it wouldn't allow for the fact that some checking accounts might have a special withdraw fee.

So the best way to do this is to look up withdraw fee on the instance itself, which means that if that instance has a particular withdraw fee, we'll use it. If not, we'll use the one from the account. Okay, so here we have attribute lookup on a base class, and here we have looking up an instance attribute, and that's preferred to looking up checking account dot withdraw fee, because it allows for specialized accounts, either through further subclasses or by giving instance attributes to particular accounts.

The other thing you need to think about when designing an object-oriented programming is when to use inheritance versus when to use composition. What's composition? Well, that's when one object has another object as an attribute, and that's a very common pattern as well. So object-oriented programming shines when we follow the metaphor. That is, we treat objects like real things in the world. This helps us think about them clearly.

So inheritance is best to represent is relationships, meaning a checking account is a type of account. So checking out is a specific type of account, so checking account naturally inherits from account, and thereby has all of the attributes of that account. Composition, when one object has another one as an attribute, is best for representing has-a relationships. So for example, a bank has a collection of bank accounts that it manages.

So in that case, a bank has a list of accounts as an attribute, but a bank won't inherit from account, and an account won't inherit from a bank. They're related, and the one has the other as an attribute, but they're not related according to inheritance. So let's design a bank real quick. A bank won't inherit from account because a bank has accounts.

And what will it look like to use a bank? We'll create a bank. So now we have a new bank, and bank is going to do things like create accounts for us. So if I go to the bank, then I might open account, give them my personal identifying information. Hi, I'm John. Here's $10. Please open an account for me. And the bank will remember that it's opened that account, and it will return it.

And my good friend Jack might go to the bank and open an account as well. And Jack only has $5 with him. And the bank manager says, oh, that's fine, but you're going to have to open a checking account. So John has just a normal account, which means John's interest rate, it should be 0.02. Whereas Jack's interest rate with his checking account will be 0.01.

Okay, so what do banks do? Well, banks pay interest on the money that you keep with them. So let's say we just paid that interest, and now we can check and see what John's balance is. And balance has the $10 that he had before, and an extra 20 cents, because he had 2% interest on his $10. Okay, so now we have an interesting problem on our hands.

How do we implement the bank? Well, let's look for some clues about how to implement the bank by this example that we've drawn so far, and we'll write the implementation. So bank is constructed with no arguments. What's going to happen when we open a bank? We're going to have to remember what accounts are held by that bank. When I go to a bank and I open an account, that's a method where self is bound to the bank.

And then we also see that we have a holder, an amount, and some kind of account that we open, which is optional. Let's say by default we open a regular account. What happens when we open an account? Well, we have to create that account. How do we do that? Well, we'll call kind, which is either account or checking account. Pass in the holder, because that's how bank accounts work.

We'll deposit into that new account the amount that was given to us. Next, we have to remember that this is one of our accounts, as opposed to an account in another bank. So we're going to add this account to our list of accounts. And then we can return. Okay, what's the last piece of the implementation? We have to be able to pay interest.

Paying interest takes no arguments beyond the bank itself. So how do we pay interest? Well, we have to go through every account that we have. So we'll call it A. And how do I get all of the accounts that I have? Well, that's called self.accounts. And for each one, I'll deposit some extra money in it, which depends on its current balance and the interest rate for that account.

Let's see if all of our tests pass. And they do. So we've implemented the bank, not using inheritance. So are we finished? Well, not quite yet. We need to provide some protection for our bank, because we don't want our bank to get into trouble if it ends up paying out too much interest. So we should probably write a function about whether it's too big to fail.

And when would that be true? Well, probably whenever we have at least two accounts. So is this bank too big to fail? Certainly is. I mean, it holds both John and Jack's money. Test pass. Let's stress test our understanding of attribute lookup and inheritance by working through a slightly more complex example. Here it is. I suggest that you pause the video and try to figure out what happens after you run all of this code on the left and then evaluate these three expressions on the right.

What are their values? If you finish that, try to answer the question of which evaluates to an integer. b dot z, b dot z, b dot z, b dot z, b dot z, b dot z, b, or none of those. So like I said, please pause and work on it on your own. We're going to go through the solution in three, two, one.

In order to solve a problem like this, you need to figure out what happens when you execute these three class statements and then these three assignment statements. Let's take a look. When you execute class A, you create a new class. A class is like any other value in the sense that it can be assigned a name. And the name that it gets assigned in the global frame is capital A because that's the name that we gave it.

Now the class itself has two class attributes. Z is negative one due to this assignment statement. And f is the function that returns b of x minus one. This function, like any other function, does have a parent frame. All of the functions in this example have parent frame global. So I'm not going to write them in. So this structure was created by executing the first class statement.

The second class statement creates a class b that inherits from A. And forever, this class will know that it inherited from A or that A is the base class. It also has some attributes due to the body of this class statement. So n is bound to four. And init is bound to a function that initializes self. In the global frame, this class is given the name capital B.

Finally, the third class statement creates a class c which inherits from B. Since B inherits from A, any instance of c will have access to the contents of A, except for when it's the case that some name is repeated. So the class c or an instance of the class c will have an f that's different than A's because f is overridden. There's another definition of f, which in this case is the function that just returns x.

This whole class is given the name c, capitalized, in the global frame. And then we execute these three assignment statements. Calling A introduces a new instance of A, and we'll call it A. Since there's no init method within the class definition A, there are no instance attributes that are set. This A instance is just a blank slate. Now we create B of one.

Calling B introduces a new B instance, and the init method for B is called automatically, with self bound to the instance and y bound to one. And then we have some expression about self.z, which depends on y. So since y is a true value, we're going to call self.f on y. Which f does it call? Well, B doesn't have any f, so then it looks in the base class and calls this f, which creates another B.

Oh my goodness, that's complicated. Let's not worry about it just for the moment. And instead, focus on the fact that z is sent, self.z, equal to something. And it's whatever is the return value of this call to f. Whatever the attribute contents of this B instance may be, that instance itself is assigned to the name B in the global frame. And now we have attribute assignment to an attribute of lowercase b.

So I look up B in the current environment. It's this instance setting n equal to 5 means that I add an attribute here. This has no effect on B's class or its base class. Instead, it's just a change to this particular instance. Now I think we're in a good position to review some of these. Eventually, we're going to have to fill in what z was.

But let's solve the first two here before we do that. So c of 2 dot n. Here's an expression that has to evaluate to some object. In this case, it evaluates to an instance of the c class. Here's the c class. So we build a new instance. And what happens when you build an instance of the c class is that you automatically call the init method for the c class.

Since c has no init, we look in its base class. Here's the init, which is this function here. So we're calling this with y bound to 2. If y, which is 2, is a true value, then we'll set self dot z to be self dot f of y. Now what is self in this case? Self is the c instance that we just created.

So we're going to add a z attribute. You can see here in my slide that it's going to be 2. Why is it 2? Well, we look up self dot f. What's the f function for this c instance? There's no f attribute here. So we look in the class. There's the f attribute. It's the identity function. So we call the identity function on 2.

We get back 2, and that gets bound to self dot c. So z is 2 here. But the interesting thing is that c2, having been created, is only used to look up the attribute n. So when we look up the attribute n on this c instance, since n is not an attribute, we look in the class. n is not an attribute here, so we look at its base class.

n is here, so the value of c2n is 4. If we had instead asked what's c2 dot z, we would have gotten 2. All right.

Is it the case that a dot z is equal to c dot z? Let's figure out what a dot z is. a is this instance. It does not have a z attribute, so we look in the class. There's a z attribute. It's negative 1. So the left-hand side of this equality is negative 1. c refers to the c class. c dot z is an attribute which does not appear here, so we look in the base class.

No z here. So we look in the base class, and we see z is negative 1. So these are equal because, in fact, we're referring to the same attribute in two very different ways. Okay, a dot z we already figured out is negative 1, and what's b dot z? Well, b is this b instance, and it has an instance attribute called z.

We never really wrote down what it is, but I'm pretty sure it's not gonna come out negative 1. I think it's time that we figure out what it does equal. So, when this instance was created, we passed in 1 as the value for y. self is bound to the instance itself. We checked that y was true, and so we called self dot f on y.

Since b is an instance of the b class, f refers to this. Because we look here, there's no f, so we look in its class, there's no f, and so we look in the base class, and there's f, which is the function that returns b of x minus 1. b of x minus 1 creates a new instance of the b class. But this time, we call the constructor on whatever x was, that's 1 minus 1 is 0.

So now we're calling this on 0 for the second instance of b. Since 0 is not a true value, we set self dot z equal to a c instance, where we pass in 0 plus 1 is 1 as the argument. So we're about to construct a c instance where we've passed in 1 as the argument of the constructor. c has no constructor, so we look in the base class, and we find this constructor.

y is bound to 1, and 1 is a true value, so we set self dot z for this c instance to be self dot f. Now, since self is bound to the c instance, self dot f is looked up here, and then in the class for c. And there is an f there that just returns whatever was passed in, which in this case is y equals 1.

Ta-da! Okay, so it's quite clear that this is negative 1, and this is some b instance, and those can't be equal. And now we can move on to which of these expressions evaluates to an integer. b dot z is a b instance. b dot z dot z is a c instance. b dot z dot z dot z is 1. And 1 dot z is nothing at all.

That would be an error. So only this expression evaluates to an integer, and that integer is 1. multiple inheritance is when a subclass has multiple base classes. Okay, here we go. Let's decide another kind of bank account. This is called a savings account. It's similar to an account. The only difference is that there is a deposit fee. How does that get used?

Well, every time you deposit, then we'll return account.deposit of the amount minus the deposit fee. So you deposit 10 dollars, you really only get 8 more dollars in your bank account. A class may actually inherit from multiple base classes in python. So, let's say we have a really smart bank executive who thinks, I've got the perfect idea for an account. We'll have a nice low interest rate of 1% so we don't have to pay our customers too much money.

We'll have a dollar fee for withdrawals and a $2 fee for deposits. But, people will come flocking to us because we'll give them a free dollar when they open an account. This is a really good account. They call it the AsSeenOnTV account. And the way we define this account is actually quite simple because we already have checking and savings accounts. So, the AsSeenOnTV account inherits from both the checking account and the savings account.

When it's created, it takes in an account holder, remembers that account holder, but instead of setting the balance to 0, you get a free dollar. And that's actually the whole implementation. Okay, so a class can inherit from multiple base classes. What happens when I create an AsSeenOnTV account? Well, I start out with a balance of 1. That's an instance attribute. When I look up how to deposit money, I'm going to find the deposit method that's in the savings account.

So, that's the savings account method that when I deposit $20, I actually only put in 18 because of the $2 deposit fee. I had one before, so now I have 19 bucks. And when I withdraw $5, well, I pay a checking account withdrawal fee of $1. Such a deal indeed. Okay, so it turns out that there are multiple different withdraws and deposits.

But in this case, it's easy to figure out which one gets looked at first. So, a AsSeenOnTV account will get withdraw from here and deposit from here. And really the only thing that it's inheriting from account is the interest rate. So, because this inherits from this inherits from this, we find the withdraw method here first. There's a particular order in which we look at all of these.

And all you need to know is that you look at the subclass before you look at the base class. So, let's see. Let's see. Let's see. Let's see. Let's see.

## 21. Part p21 - Lecture 21 - Representation

String Representations In the object-oriented programming metaphor, we say that an object should behave like the kind of data it is meant to represent. And one aspect of that is that an object should know how to present itself to the world as a string or to produce a string representation of itself. And strings are important. They're descriptions not only in natural languages that the humans use to communicate with each other, but also in programming languages.

You can put an expression in a string. In Python, this distinction is built right into the language. All objects produce two string representations. One is called the str string, and it's designed to be legible to humans. The repr string, by contrast, is designed to be legible to the Python interpreter. That is, it's supposed to be an expression. An expression in the Python language.

Now, a lot of times, the str and repr string are the same. Because Python was designed to be a language that people could read. And so, a lot of the expressions have exactly the same form as a person might write down when they try to communicate the same idea. You write the number one in either case. But sometimes these differ. Let's look at an example.

First, we'll consider the repr string for an object. There's a built-in function called repr. It returns a Python expression as a string that evaluates to an equal object. If I call help on repr, this is what I see built into the language. Repr can be called on any object. It produces a string. And it's supposed to return the canonical string representation of the object.

For most object types, the documentation says, calling eval on the repr of the object gives you some object that's equivalent to the original. The result of calling repr on a value is exactly what you see in an interactive session. It's what Python prints out right below the expression you evaluated. So if I evaluate this expression, which represents 12 times 10 to the 12th power, the canonical string representation is 1 and then 2 and then 12 zeros and then a decimal point and then a zero.

And that's what gets displayed. Exactly the same thing gets displayed if you call print on the result of calling repr on 12 times 10 to the 12th. Now some objects do not have a simple Python readable string. There's no way to write down an expression that very easily captures everything that some object is, or an expression for how to create something that's equal to the original object.

And this is typically true of compound things, such as functions or classes. The min function that's built in just can't be written in a single expression. So instead what you see when you call repr on min is this proxy, which uses angled brackets to indicate that this is not in fact a Python expression at all. It's just some standard. A human readable description because generating a Python expression just didn't work out.

The str string of an object can be different. Human interpretable strings are useful as well. And so we'd like to have our programs be able to generate them because oftentimes a program wants to communicate something with a user. So here's an example. There's a fractions module, part of the standard library. And it has a fraction class. A fraction is built from a numerator and a denominator.

The ripper of a fraction is just a call to the class itself, exactly how you'd construct the fraction in the first place. But that's not how humans write fractions. Humans write fractions like that. So str is a built-in function that takes any object, gives you back a string, where the string is some human interpretable representation of the original object. The result of calling str on the value of an expression is what Python prints out when you actually call the print function.

So if I print half, I'll see 1 divided by 2. Now, notice this has quotes around it because this is a string. Whereas this is just what happens when you print the string, the contents of the string. Alright, let's try it out. From fractions, import fraction gives me access to this class, which I can bind an instance of to the name half.

Now, half is a fraction. The ripper string of half is just that. If I print half, I see 1 divided by 2. The str string of half is 1 divided by 2. Now, if I evaluate the ripper string of half, I get the fraction. It's a different object. But it's equivalent, right? If I evaluate the str string of half in this case, it turns out that is a valid Python expression.

But that's just kind of coincidence. What you get back is not a fraction. It's a float. 1 divided by 2 is really just there, to be interpretable by humans. We can learn a little bit more about the ripper and str functions just by trying them out on strings. So here's a string. Hello, world. What happens when I evaluate s? I see that string.

That's what happens when I print out the ripper of s. Same thing. Now, what happens if I print out s? The quotes go away. Which is exactly what I see when I get the str of s, because the str of s is just s. Now, what happens if I just call ripper of s? I see quotes within quotes. What's going on there?

Well, what ripper is giving me is a string, where if I evaluated it, I'd get back the original string. And what if I called the ripper of the ripper of the ripper of s? I'd get a mess. What's going on there? Well, this is not just quotes within quotes, but quotes within quotes within quotes within quotes. And Python has to use backslashes in order to indicate what quotes really end a string and what don't.

The details of that are not important. What is important is that if I evaluate the result of evaluating the ripper of the ripper of the ripper of s, I get back s. Now, what if I just evaluated s in the first place? I'd get an error. Hello comma world is not a valid Python expression. When I have quotes around it, it is.

So if I evaluate the ripper of s, everything's fine. But I can't evaluate s, or the str of s, because what I have here is not valid Python. F-strings in Python are a feature that allow you to generate strings out of various expressions inside of a string literal. This is the preferred method of string interpolation in Python. What's that? String interpolation involves evaluating a string literal, that's some text in quotation marks, but which also contains expressions, and those expressions are evaluated and become part of the string.

And string interpolation is used whenever you want to build a string that involves some predefined text and also the result of evaluating some expression. You could already do this through string concatenation. For example, if you wanted to write a string with the digits of pi in it, you might add together the string pi starts with, with a string containing the digits of pi and another string with a dot dot dot.

And of course you could use the result of this expression inside of a larger expression. For example, to print it. String interpolation is an alternative way to generate this string, which is both faster and more concise, using the f-string feature in Python. We call them f-strings because there's an f before the quotation mark. What's special about f-strings is that they can contain other expressions within curly braces, and those are evaluated.

So you write the text you want, and also the expressions you want evaluated and included within the string. And this is a string literal, but has the value of pi rather than the characters pi embedded within it. And again, this is just evaluating to a string, and so I could embed it in a larger expression, for example, to print it. The result of evaluating an f-string literal contains the str string of the value of each sub-expression.

We'll look at some examples in a moment. And the sub-expressions are evaluated in the current environment, which means that anything you could build with concatenation, you could also build with string interpolation. So here's an f-string. This is just contents. 2 plus 2 equals 2 plus 2 would be evaluated just like a normal string. But if I include curly braces around some part of this, now this is treated as a Python expression and is evaluated and then embedded within the resulting string.

You do need the f. If you don't have the f, then you'll just get a regular string, which has curly braces in it. An f-string can have an arbitrary expression here, and it can refer to the current environment. So for example, abs is defined. If for some reason I changed what abs meant, now it's the built-in float function, then evaluating the same expression would use the current value of abs.

And anything that's a legal Python expression can go in here. If I really wanted to, I could write some complicated lambda and get 4 that way. There are some detailed restrictions on how to use quotes because you're inside of a string, and how to use curly braces. Those are up to you to learn if you want. They're not required content in this course, just because those are very low-level details that are specific to Python.

But this general notion of a string literal that includes expressions, called string interpolation, exists in lots of different programming languages. I said that what you get in the result of evaluating an f-string expression is the str-string of the values of the sub-expressions. So if we have an object, half, which has a different str and repr, there's the repr string, there's the str-string.

What happens when you build an f-string? Half of a half is half times half. You get the str-string, not the repr string. If you really wanted the repr string, you could just call repr on this, and then you'd get it. And evaluation of sub-expressions is just like anywhere else in Python. They may have side effects. So if I have a list, 9, 8, 7, and I build a string, because s.pop, s.pop, s, then these expressions are evaluated in order.

This one's a 7, this one's an 8, and all that's left in s now is the number 9. Polymorphic functions. A polymorphic function is a function that applies to many different types of data. And str and repr are great examples, because you can really pass any kind of object you want, just the built-in str and repr functions, and they're always supposed to do the right thing.

How's that possible? Well, the fundamental idea is that repr just asks its argument to display itself. And in Python, this is done using a special method name. Now, it's a special name because it corresponds to a built-in function. But this general idea that you can have a function that just asks the argument what to do certainly applies beyond the Python language. Okay, so repr in particular just invokes a zero-argument method called underscore underscore repr underscore underscore on its argument in order to get the repr string that it returns.

So, I can call repr on half, which was the fraction 1, 2, or I can invoke its method. Invoking the method gets looked up in the class. So, it's really the fraction class that knows how to generate the repr string for a fraction. It's not the repr function. And likewise, str invokes a zero-argument method that is correspondingly called underscore underscore str underscore underscore, another special method name.

And so, I could invoke this method directly if I wanted, and that would generate the str string for a fraction. So, there's a really important idea here. You could write a function, like str or repr, that actually doesn't have much logic at all. It just defers to the argument that comes in to decide what to do, by invoking a method on it with a particular name.

So, let's talk about how repr and str are actually implemented. It turns out that it's slightly more complicated than what I described. Instead of just invoking the repr method on its argument, an instance attribute called repr is ignored. Only a class attribute called repr is invoked by the repr function that's built in. How would I implement that? So, which of the following function definitions corresponds to a function repr that takes in some argument, looks up the class attribute called underscore underscore repr, and invokes it.

Here are five options. Only one does what I described. Think about it for a minute. I'll tell you the answer in three, two, one. This one manages to skip instance attributes or ignore them by looking up the type of the argument. That gets you the class. And therefore, asking for the repr attribute of the class is guaranteed to give you a class attribute.

Now, it's a class attribute that's a function, and that function is not a bound method because it's looked up on the class. So you have to explicitly pass in x in order to have this class attribute invoked on the particular argument x that we're interested in. We'll look at an example in a moment. str is also complicated, even more complicated than repr.

An instance attribute called str is ignored. If there's no str attribute at all on the class, then calling str just returns whatever repr returns. So by default, they're the same. It's only if you explicitly make them different that they differ. We're using an important idea here. It's called an interface. So, when I talked about object-oriented programming in the first place, I said that the central to this metaphor was that objects would pass messages to each other, and that's how they would interact.

Now, the mechanics in the language is that they just look up attributes or methods, and that's how they communicate. So that's the idea of passing messages. Passing messages is the metaphor. Looking up attributes is what we actually do in order to pass messages around. Now, the attribute lookup rules are designed in a special way. They allow different data types to respond to the same message, just by having the same attribute name.

And a shared message, an attribute name, that exists on many different classes and elicits the same behavior from those different classes, is a powerful method of abstraction. That's what we'll call an interface. An interface is a set of shared messages and some specification that tells you what they're supposed to do, what they mean. So as an example, classes that implement repr and str methods and have those methods return Python interpretable and human readable strings respectively, interfaces don't have to be built into the language, although this one is.

If you ever just define that there are a bunch of classes that all have the same method, and all those methods do similar things, then you've created an interface. So let's see if we can build a class that exhibits this interface. We already saw that there was a built-in fraction class. Let's build something similar. I'll call it a ratio so we can tell them apart.

The way you create a ratio is just to pass in a numerator and a denominator. If we want instances of the ratio class to be able to display themselves, we need to define a repr method. It will return a string. The string ratio, followed by parentheses. Here we have two different gaps within our string that we fill in using the format method on strings, self.numer fills into the first, or 0 indexed gap, and self.nidom the second.

Now, if we want a human readable string as well, following the example of fraction, we just write 0 divided by 1, where again, 0 is the numerator, and 1 is the denominator. Now we can create a ratio, half, print out half, and we'll get the human readable version. Just display half directly and we'll get the Python expression. Special method names are a topic particular to the Python language.

Certain names in Python are special, because they have built-in behavior of some sort. And they always look the same. They always start and end with two underscores. So when you see a name with two underscores around it, that's just an indication that it has some particular behavior. It interacts with the built-in object system in some way. For instance, the first one we saw was init.

This method is special because it's invoked automatically, whenever an object is constructed. Other than that, it's just a regular method. Repr was discussed in the previous videos. It's the method that gets invoked in order to produce a string that represents an object, and it's the one that's used in an interactive Python session to display the value. What about add? Well, that's a new one.

This is a true argument method that's invoked to add one object to another. There's one argument method called bool, and another called float. This one is invoked to convert an object to true or false, telling you its Boolean value. And float tries to convert an object to a real number. So, for example, if I set 0, 1, and 2 to 0, 1, and 2, and then I add 1 and 2, I'll get 3.

If I'll call bool, which is a built-in function on 0, I'll get false, and on 1, I'll get true. And this bool function gives you exactly the behavior that you'll get if you place these objects in a Boolean context, such as a conditional statement. Now, it's possible to rewrite this entire sequence of statements. I could say 0, 1, and 2, or 0, 1, and 2, and then add 1 and 2 together using the special method name, or convert 0 and 1 to Boolean values using that special method name.

So there's a correspondence between built-in pieces of syntax and built-in functions and the special method names that actually do the work. It's another example of using an interface in order to allow user-defined objects to interact with the built-in systems within Python. So Python is very extensible. You can create a new class and be able to add instances of that class together using the plus sign, just by overriding the special method name add.

So what happens when you have two instances of user-defined classes added together? Well, what happens is that you invoke either add, or there's another method called radd. I'll tell you about that in a moment. And that actually performs the addition. Again, we're just asking the objects, how do you add yourselves together? So if we want to extend our ratio class, so that we can add ratios, this is certainly possible.

I could add a third and a sixth to get a half, either using the plus sign, or by using the method that actually performs the addition. Both of these expressions are equivalent in Python. Now people almost always use this one, because it's much easier to read. The purpose of this is just to allow ourselves to use the method definition syntax in order to override what happens when you use a plus sign between two objects.

You can also use radd. The difference between radd and add is that this here is the argument on the right side of the plus sign, and this is the argument on the left. Now for numbers, addition is commutative, so it's irrelevant what order they come in. These two functions are equivalent. But you could imagine some cases in which you'd like to invent addition that's not commutative, and so it is possible using radd.

I'm not going to go through every special name and how it corresponds to some built-in feature of Python, but that has been done before you both in the Python docs and in this online textbook called Dive into Python 3. But let's see if we can add addition to our ratio class. We define an add method that takes self and other, and what it does is just computes the numerator and denominator of the result.

So the numerator of two added ratios is the numerator of the first times the denominator of the second plus the denominator of the first times the numerator of the second. The denominator is the product of the denominators. If we want to reduce this ratio to two relatively prime integers, then we have to compute the greatest common divisor of n and d. Then we can return the ratio of n divided by g and d divided by g.

And what's the greatest common divisor? Well, we did talk about this earlier in the course. One way to compute it is to say, while n does not equal d, we rebind n and d to be, in no particular order, the min of n and d and the absolute value of n minus d. So now we can take the gcd of 12 and 8 and get 4.

We can also add together the ratios 1 3rd and 1 6th. Now maybe we're not done. What happens if I add together the ratio 1 3rd and 1? I should get 4 3rds. But I'm assuming that the thing that I'm adding this to is in fact another ratio, as opposed to an integer. One thing I could do is inspect the type of other in order to figure out what action to take.

So I could say, if it's the case that other is an instance of the int class, then instead I have a numerator that's the self.numerator times, well, the other denominator is just 1. And then I add in self.denom times the other, which is the numerator of the other. Here I'm just treating other as a numerator of other and the denominator of 1.

D is the denominator of self. Otherwise, if it's the case that other is an instance of the ratio class, then I use the formula that I had before. I can still take the GCD, and I think I'm back in business. I can add the ratios together, or I can add 1 to the ratio. Now can I add a ratio 3rd to 1 in this order?

Not yet, because I don't have right-side addition defined. But I can just say that right-side addition is the same as addition for this class. At which point, I can add ratios, I can add integers to ratios in either direction, and I've fulfilled the interface for adding addition to a user-defined class in the Python language. Now what happens if we add a floating point value, 0.345?

Well, then this result will not be an integer. So it doesn't seem like we should be building a ratio at all at that point. There's another option. Instead, we could convert our existing ratio into a floating point value as well. By that, I mean I just detect if other is an instance of float. And if so, I return not a ratio at all, but instead what I get when I convert self into a float and add it to other.

Now what does it mean to convert self into a float? Well, I have to define that. I define that using this special method name, where in this case, I'll just return what you get when you divide the numerator by the denominator. So I've extended my system yet further, where now I can add 0.2 to the ratio one-third, and I'll get some reasonable result.

I've actually used two important ideas here in one example. This is called type dispatching, where you inspect the type of an argument to decide what to do. And here, this is called type coercion, which is when you take an object of one type, convert it into another type in order to be able to combine it with some other value. These are two strategies that people use in order to have different classes interact.

You know, add is a two-argument method, and now we have a version of add that operates on two values of different types.

## 22. Part p22 - Lecture 22 - Composition

Linked lists are a fundamental data structure in computer science. They appear everywhere. And now we'll learn how to implement them using Python's object system. So a linked list is either empty because it contains nothing, or it has the first value in some sequence and then the rest of the values in the linked list. So here's how we're going to represent the sequence 3, 4, 5.

We'll use an instance of a class called a link. I haven't defined that yet, but I will soon. And that has two attributes, first, which is 3, and rest, which is some object. Now that object is holding the rest of the values, and it itself is also a linked list or a link instance. So every linked list has a smaller linked list as the rest of the list.

So this link instance has its first value as 4, and the rest of its list is a link instance whose first value is 5. Now we've exhausted everything we're trying to represent, but we still need some rest attribute. In that case, we use a special value called link.empty. Link.empty is the exception to the rule I just said, that every linked list has a rest of the list.

Link.empty doesn't have any first value or any rest of the list. It just represents the fact that there's nothing left. So the right way to think about a linked list is not this particular class with these particular attribute names, but as a pair of values. It's a first element of some sequence and then the rest of that sequence. In this case, we're storing the first, actually the zeroth element, as an attribute value.

I call it the zeroth element because it will correspond to index zero once we come up with a way of indexing into this list. The rest of the list is itself a linked list or link.empty, and that's stored as another attribute. So you can have objects that are values of attributes, and here we're using the idea of composition in order to construct an interesting structure.

So a linked list has a linked list as its attribute value. Finally, there's some class attribute that we use for any linked list that's empty, and we call it link.empty. Now, the way we construct this is not by writing 3, 4, 5. That would make a tuple. Instead, we have to write out the constructor, a link with 3, and the rest of the list is a link with 4, and the rest of that list is a link starting with 5, and the rest of that list is link.empty.

So each one of these calls to link creates a new link instance. This call creates that instance, which must exist in order to make this call, which creates the linked list starting with 4 followed by 5. Now here, the order in which functions are evaluated in Python is important. In order to evaluate link 4, link 5, link.empty, we have to first evaluate this operand sub-expression in order to create the link instance that represents the sequence starting at 5, followed by nothing else.

Once that's created, we can pass it in as an argument to this link, which starts with 4 and is followed by all this other stuff. And then finally, we can evaluate the whole expression and build the whole linked list. Now these structures are so common in computer science that there are some conventions about how they get drawn. Typically, you do draw them as a sequence of pairs with arrows like this, but instead of drawing an arrow to link.empty, it's very common to just put a slash there.

This is not any sort of official notation, but you will see people do this out there in the world, so I thought I'd show you now. In our implementation, we're going to mirror this structure by making link.empty the default value for the rest attribute. And that means you can leave it out when you want to construct a linked list. So, we want this expression to actually evaluate to a link instance representing the sequence 3, 4, 5.

And for that, we need a class statement. In the linked list class, we just have an init method, which takes in the first and the rest. So here's the class, here's the init method. As I mentioned before, we're going to have a default value for the rest, which is link.empty, which I haven't yet defined. The first thing we'll do is make sure that the linked list we're constructing is well formed.

It follows the property that I set, that the rest of the list either has to be the empty list, link.empty, or it's an instance of the link class, meaning it's itself a linked list. So those are the only two things we're allowed to pass in as the rest of the list. And then we store the first element and the rest of the list as attributes of the instance self.

IsInstance is a built-in function in Python that returns whether rest is a link when passed to these two arguments. If you ask for the help from Python on isInstance, it will tell you that it returns whether an object is an instance of a class or of a subclass thereof. So it's a little bit different than just getting the type of rest and seeing if it's exactly equal to link.

This will also be true if rest is an instance of a class that inherits from link. And this is a good idea because now our system is extensible. If we want to build a special kind of linked list by inheriting from link, we can still use this same constructor. And this verification will still work out as we expect. So what is link.empty anyway?

Well, here we have a choice in our implementation. I've chosen to represent it as the empty tuple. Although I could have invented a special class just for the empty linked list. Instead, I just picked some zero length sequence because that's what it is. It's a zero length sequence. Okay.

Let's see how it works. I can create a linked list with 3 followed by 4 followed by 5. If I call this s, I can start inspecting its attributes. s.first is 3, s.rest is 4, 5. Which means if I want to get the element 4, what I need to write is s.rest.first, the first element of the rest of the list. I can access 5 by saying the rest of the list's, rests of the list's first element.

That's 5. And finally, I can ask whether the rests of the rest of the rest of the list is link.empty. And it should be because there's nothing there. So these are the ways in which I'll manipulate a linked list. It is, of course, possible to change the values within the list. I could set s.rest.first to 7. Then, if I look at what s is, I find that it's 3 followed by 7 followed by 5.

However, oftentimes linked lists are used in situations where you're not mutating the values. That's where they're specially designed for. So you can create a list that's similar to another list just by adding a different value onto the front. So if I want to create a linked list that starts with 8 and then is followed by 7 and 5, I would do that just by writing link 8 followed by the rest of the list.

Writing this creates a new list, but it doesn't change the old one. Recursion is very common in linked list processing when constructing a new linked list or taking an existing linked list and doing something with it. Let's look at some examples. Ranges are built in, the map function is built in, and the filter function is built into Python, but they don't operate on linked lists because those are user defined.

So if we want the same functionality, we'll have to implement our own notion of range and map and filter. Let's remember what these things do. If I have two functions like square, which takes an x and squares it, and odd, which takes an x and returns whether it's an odd number, then I could, for example, write the following expression using the built-in map and filter in range.

Get the numbers 1, 2, 3, 4, and 5. Filter for only the odd ones. So now I have 1, 3, and 5. And then map the square function over those. So 1 squared is 1, 3 squared is 9, and 5 squared is 25. Those results we'll place in a list. The same kind of thing could be done with linked lists using the class that we just defined.

But the syntax will be slightly different. We'll have to come up with a map link function, which we'll implement momentarily, which takes a square and squares all the elements of the result of filtering a linked list using the odd function, where we start with a linked list representing the range 1, 2, 3, 4, 5. Filter out the 2 and the 4 to just have 1, 3, and 5, the odd ones.

Square all of those and you get a linked list of 1, 9, and 25. So let's go through and implement range link, which has a starting integer and an ending integer and returns a link containing consecutive integers from start, including the start, to end, not including the end. So the range link from 3 to 6 would be 3, 4, and 5. And we'll also write map link, which returns a new linked list that contains f of x for every x in the original linked list s.

So if we square everything in the range 3 to 6, then we get 3 squared, 4 squared, and 5 squared. And we'll also write filter link, which returns a linked list that contains only the elements of link s, for which f, called on that element, returns a true value. So if we filter for only the odd elements of this range, then we get 3 and 5, leaving out the 4.

Actually, all of these are going to be recursive functions. So here's our linked class. Here's square and odd. And how do we build a range? Well, if it's the case that start is greater than or equal to end, then there's nothing in the range. We return link.empty to represent an empty linked list. Otherwise, there's at least one element in the range, and that is the start element, followed by some other stuff.

Return a link with start as the first element. And what's the rest of the range? Well, that is the range that starts at start plus 1 and goes to the end. How do we take a function and map it over all the elements in s? Calling f on every single element and building a linked list of the result. If it's the case that s is linked.empty, there's really no work to do.

We could return s or return linked.empty. Since those are just two expressions for the same thing, it doesn't matter which one you write. Otherwise, you know there's at least one element, so let's call f on it. And we'll return a new linked list, with its first element being the result of calling f on the first element of s. And then we need to call f on the rest of the elements.

We do that with a recursive call to map link, where we're calling the same function f on everything in s.rest. And what about filtering? Well, if s is linked.empty, again, there's no elements to filter, so we'll return s. Otherwise, I do think that we need to filter everything in the rest of s, so let's get the filtered rest, which is the result of calling filter link using that same f on the rest of s.

But now we have to make a decision. Is it the case that s.first is in the result or not? Well, that depends on what you get when you call f on s.first. If that's a true value, then we need s.first to be in the result. And what's everything else? Well, that's the result of filtering the rest of the list. Otherwise, if this is a false value, then s.first is not supposed to be in the result, so we can just return the filtered rest.

Let's check to see if our doc tests all work. Oh, they do. So it should be the case that if I start with a range from 1 to 6, so that's 1, 2, 3, 4, and 5. I filter it using odd. I map the square function over the result. Then what I get is 1, 9, 16. And there it is. So since linked lists have a recursive structure, a natural way to process them is with recursion, like we've seen here in these examples.

A linked list instance is an object, and all instances of a user-defined class can be changed or mutated. Let's take a look at what happens when you start changing the attributes of a link instance. Linked lists can change. Using attribute assignment statements, you can change the first and rest attributes of a link instance. In fact, an interesting consequence of this is that the rest of a linked list can contain the linked list as a sublist.

So let's say I start with a linked list with three elements, 1, 2, and 3. Here's a sketch of what this might look like. The actual environment diagram is more complicated, but here's the essence of a linked list, is that it's just two attributes, the first and the rest, where the first is, in this case, a number, and the rest is another link instance.

So here's the second one. If I assign s.first equals 5, what I'm left with is 5, 2, 3. But it gets really interesting when you come up with another name for s.rest, like t. So that's the linked list 2, 3. And then we reassign the rest attribute of a link instance. In this case, we're assigning it to s. Then s.first is 5.

And what's s.rest.rest.rest.rest.rest.rest.first? Well, think about it for a minute and see if you can figure it out. This is going to be the number 2. One reasonable reaction is, how did we have so many dot rests when we had a linked list that was only three elements long? Well, back when we created it, it had only three elements. But now it has a different structure.

Because we changed t.rest and t was part of s. What we've created is the following structure. We changed s.first to 5. We never changed s.rest. We did give a name to it, t. And we changed t.rest to refer to s. So when you evaluate s.rest.rest.rest.rest.rest.first, you get the number 2. Here's an example of linked list mutation. Let's say we have an ordered list with no repeated elements.

And we want to maintain the fact that s is an ordered list with no repeated elements. But write a function add that places elements into the list in the appropriate position so that everything stays ordered from least to greatest. So here's the function. Add to a list s a value v which modifies s to make sure that it contains v and then returns that modified s.

However, if v is already in s, then we don't modify s so that we don't have repeats in the list. But we still want to return s from the add function. Now is a good time to pause the video and try to write this function. I'm going to describe how it works in 3, 2, 1. When you add 0 to s, we'll make sure that 0 is the element at the beginning and that 1 comes after that.

Instead of rewriting all of the values in the list, we can do this just by creating a new link instance whose first element is 1, changing s so that its first element is 0, and re-routing so that the rest of s is the link instance whose rest is 3, then 5. Now we have a linked list representing the sequence 0, 1, 3, 5 instead of just 1, 3, 5.

Now, if we add 3, we should look through s until we find the place that 3 goes, and since we discover that 3 is already there, we're not going to modify s at all. We'll just return it. And what if we add 4? Well, we look along here until we figure out where 4 would go between 3 and 5. That means we can change the 5 to a 4, add a new link instance for the 5, and now we have 0, 1, 3, 4, 5.

And what if we add 6? Well, that's actually a little bit different. We keep looking until we find that we've reached the end. So, instead of rest being linked.empty, rest needs to be a new link instance containing the 6. That's how we add v into s. Try to implement it. Add v into s, returning modified s. Don't change s if v is already there, and make sure that s remains ordered.

We assume that s is ordered at the beginning, and we have to place v into s so that the order remains from least to greatest. Here are some examples. If s is 1, 3, 5, and we add 0, then it's 0, 1, 3, 5. We add 3, and it doesn't change. We add 4, and the 4 shows up in the right place.

And we add 6, it ends up at the end. And let's assume that s is not empty to begin with. How can we do it? Well, we'll assert s is not empty. And then, if s.first is greater than v, we mutate s by changing s.first and s.rest. If s.first is less than v and s.rest is empty, then we have to place a value at the end.

If s.rest is less than v, we got to do something, and in the end we return s. Why don't you pause and try to fill in the blanks, and we'll talk about it in 3, 2, 1. If s.first is greater than v, then we place v as s.first and change s.rest to contain the old s.first and the old s.rest. That's building this link instance or building this link instance.

If s.first is less than v and the rest is empty, then we need to build this link instance by setting s.rest to a link where v is the first element and the rest is empty, which is the default second argument for link. Otherwise, we keep looking for the place where we're going to put v, which is just a recursive call to add.

We don't need to return because we're going to return down here. We're always going to return s. The point of this call is not to compute a value to return, but instead to perform the addition on the rest of s. Another recursive computational data structure is the tree, and we've already talked about trees in this class, but they're so important that we should talk about them again.

A tree is a lot like a linked list. A tree has a root label and a list of branches that are trees. A linked list is a first element and the rest of the list. So the main difference is that a tree has multiple trees as branches, whereas a linked list has only one linked list as the rest of the list. Here's vocabulary that we've talked about before, but we'll do it again.

There are two ways of describing trees. The recursive description uses an analogy to wooden trees growing out of the ground, except for that they grow down instead of up. A tree has a root label and a list of branches. Here the root label is three. There's a branch and there's one other branch. Each branch is a tree. A tree with zero branches is called a leaf.

In this diagram there are five leaves. The leaves have labels as well, they just have no branches. A tree starts at the root. There's the root of the whole tree. There's the root of the left branch. There can be multiple branches, or one, or zero. And every single branch is another tree, meaning every single branch has another root. Describing all of the different trees within a tree often involves the term node.

A node is a position or location within a tree. It's always another tree itself, but when using the term node, it's not so interesting to think about the sub-trees, but instead just their relative locations to other nodes. Each node has a label, and each node also has a configuration relative to other nodes. Three is the parent of two. Two is the child of three.

The top node is the root node, and like I did just there, people often use labels to refer to locations. Instead of saying the node with label two is the child of node with label three, it's often the case that people will just casually say two is the child of three. But in fact, it's the nodes that have this family relationship, and their labels are just numbers.

A path is a sequence of nodes where each element is either the parent or the child of the previous node, so they're connected in the tree diagram. And the most common paths are paths from the root to a leaf, but you could have other kinds of paths as well. We were able to work with trees using data abstraction, but we can also use Python's object system.

A tree has a label and a list of branches. Each branch is also a tree. We can state this by defining a tree class with a constructor that takes a label and a list of branches, which by default is empty. We set the label. We check that for every branch, the branch is a tree, and then we assign self.branches. Here we make a list of the branches in order to retain a copy, and also to convert branches to a list if it was something else.

Here was the definition using data abstraction. Very similar, but there are some important differences. Now that we're using the object system, we define how to build a tree, but we don't have to explicitly define how to get the different attributes out of a constructed tree. In data abstraction, we wrote down the constructor and the selectors. Here we write down the constructor, and the selectors are implicit.

Self.label will give the label, and.branches will give the branches. More importantly, when using data abstraction, we had to invent a way of combining together the pieces, the label and the branches. In this case, we decided to put them all in one long list, but we could have done something else, put them in a pair, put them in a dictionary. Whatever we did, we had to come up with a method for extracting those pieces back out using the selector functions.

When we use Python's object system, we don't have to make any decisions about how the pieces are combined into a whole. We always choose the same way. Each part is an attribute, and an object has all of its attributes accessed by their name. So the definition is a little bit simpler using the object system, but using tree instances is just like using the tree data abstraction.

Here's a definition of a function that creates a Fibonacci tree, and it's the same, with slight differences. When I use the object system, I capitalize the word tree, and I access the label using.notation. Under data abstraction, I had a function called tree, and I access to the label using a selector function. But our code doesn't change at all. So the coding style used in object-oriented programming is not terribly different from the coding style used with data abstraction.

Once I've defined the tree class, I can go ahead and use it. So a leaf I can create just by calling tree. If I want to add branches to that tree, I cannot do it just by passing in label values. I have to pass in a list of trees. This creates a tree which I'll call t. Its repr string is an expression that builds an equivalent tree.

Printing it out gives a multiline output where the root label comes first and all of the other labels are indented. It's not a bad idea to take a look at the code that generates the repr string and the str string to understand how it works. And we've added one more method, isLeaf, which returns whether there are no branches. And we've also defined the FibTree function just like it was on the slides.

FibTree4 is a fairly large tree. FibTree5 has Fibonacci number 5 at the root and FibTree6 is looking quite large indeed. Look at all those parentheses and square brackets. But if I print this out, then it's easier to see the structure. Eight at the root, two different branches, one has the root label 3, the other has the root label 5, and 3 plus 5 is 8.

So what are the leaves of this tree? We have 0, 1, 1, 0, 1, 1, 0, 1, etc. Let's write down a function that computes the leaves of a tree as a list. If T is a leaf, then we'll return a list with one element, the label of the tree. Otherwise, we need to build up a list of all the leaves. Let's start with an empty list.

And for every B in T dot branches, we'll make a recursive call to leaves on B. And what do we do with that? Well, we're going to add all of its elements to all leaves, which is one of the built-in methods on a list. Which one? Well, we want to extend the list of all leaves with the new list of leaves that we get by recursively calling leaves on the branch B.

Then we can return all of these leaves. And if we call leaves on fib tree 6, we get a list of leaves that sum to 8, which is Fibonacci number 6. And what's the height of this tree? Well, the height of a leaf is 0. And the height of a tree in general is the number of transitions in its longest path. We go from here to one transition, two transitions, three transitions, four transitions, five.

I think the height of fib tree 6 is 5. How could we compute that? If T is a leaf, then the height is 0. Otherwise, the height is one more than the maximum height of any branch. So let's compute height B for B in T dot branches and take the maximum value. There's fib tree 6. And what's its height? Five. So everything we've learned about processing trees is the same, whether I use data abstraction or I use the tree class.

But we get some nice advantages using the tree class, like a nice way of displaying trees using this simple recursive str function. Here's a tree processing example where we actually change the tree instance. Removing some of the sub-trees of a tree is called pruning. Either you remove some of the branches or remove some branches of the branches, etc. When possible, it makes sense to first prune the branches of the current tree, then recursively prune whichever branches are left over.

You can prune a branch before you remove that branch. But since you're removing the whole branch, why not remove it first and only prune what's left? So here's an example tree. And let's say we want to prune all of the sub-trees whose root label is 1. This 0 goes because it's part of this sub-tree. Here's a template. Pause for a moment and try to fill it in.

And I'll go over the solution in 3, 2, 1. The key here is to modify t.branches by setting it equal to a new list. We could also change the old t.branches list, but we achieve the same effect by building a new list with a list comprehension. For every branch in the tree, I'm going to keep it in t.branches if its label is something other than n.

Now t.branches might not have all the old branches in it, so this says iterate through the branches that remain, calling each one b, and prune that branch using n as the label we're looking to prune. And that's it. We don't need to return because the purpose of the prune function is to remove sub-trees, not to compute a new value.

## 23. Part p23 - Lecture 23 - Efficiency

Measuring efficiency. This is not about objects in particular, but about how to understand how long your program is going to take to run. So let's go back to our first example of tree recursion, which was a way to compute elements of the Fibonacci sequence using tree recursion with the following implementation. Element 0 is 0, element 1 is 1, everything else is the sum of the previous 2.

Thanks Fibonacci for making this sequence so popular. If I want to compute Fib 5, that involves summing up the results of Fib 3 and Fib 4. And Fib 3 means summing up 1 and 2. Here I've marked the base cases with their return values. So to compute Fib 3, I have to do all that work. To compute Fib 4, I have to do all of that work.

And the actual computation proceeds in a pattern that looks like this. So this tree-shaped computation actually begins by calling Fib 5, which calls Fib 3, which calls Fib 1, which actually returns the number 1. The next thing to return is this call to Fib 0. Fib 0 and Fib 1 are sum to give you Fib 2. And then we can finally return from the call to Fib 3.

And we proceed by computing the rest of the values that we need in order to finally return from Fib 5. So we want to understand how long it takes to run this computation. And the first thing we'll do is just count the number of calls to Fib and see how that grows. Fib n. If n equals 0 or n equals 1, return n.

Otherwise, return Fib n minus 2 plus Fib n minus 1. I know this is slightly different from what was on the slide, but it will do the same thing. If I run this code and ask for what Fib 5 is, it will tell me it's 5, Fib 6 is 8, Fib 7 is 13, etc. Now what I'm going to do is define a decorator called count, which takes in a function F, returns a new counted version of F, which when called on n, not only returns the result, but also increments the callCount attribute, which is an attribute that we'll use to keep track of how many times this function was called.

Now, for counted, we have to start out with a callCount of 0, so that we can increment it later, and then we can return that counted function. So we could decorate Fib, you know, at count, but instead we'll just do it here in the interactive session. So Fib is a counted version of Fib. If I call Fib on 5, I can then ask how many times was this call, and it was called 15 times.

Now this is cumulative, so if I call Fib 5 again, the callCount has gone up to 30. Now if I call Fib on some large n, such as 30, it will do quite a bit of computation and come up with 832,000, but the actual number of times I called this function was 2 million times, 2.69 million calls to Fib, just to compute this result.

And many of those calls were returning 0. Some were returning 1, some were returning large numbers until we finally got to the result that we wanted. So we can see why this took a while to call. So the point of this example is to start to understand exactly what happens when you call a function and how that relates to the time that it takes for the function to return.

And we've started out by just counting the number of times that we call something. But over the next two lectures, we'll develop more sophisticated ways of talking about the running time of a program. Memoization is an extremely useful technique for speeding up the running time of a program. Here's the simple idea. Just remember the results that have been computed before. So instead of recomputing things when you need their values again, you just keep them around.

Here's another decorator. It's called memo. It takes in a function, which may take a while to compute. But we also keep a cache of the values that were returned by that function before. In the memoized version of F, we check and see first if the argument that was passed in is in the cache. If it's not in the cache, then we add it to the cache.

Meaning, we make a mapping between the key, n, and the return value, f of n. Now we actually have to call f, which was originally passed in, in order to compute this return value. But once it's in the cache, we're never going to compute it again. Instead, we'll just return the return value that's already in the cache. Once I've returned the memoized version of this function, I will have automatic caching built in.

So we keep a dictionary between keys and values, where the keys are arguments, and the values are return values of f. And this memoized function has the same behavior as f, if f is a pure function. If it's a non-pure function, then we don't actually call f every time we call memoized, so it might have different behavior. So that's something to keep a lookout for.

You can only really memoize pure functions and expect their behavior to stay the same. Let's see what happens when we use memo to speed up bib. So a memoized version of f keeps track of a cache, takes in an argument n. If n not in the cache, then we put it in the cache with the return value of f event. We return what's in the cache every time, and we return memoized.

Fib 30 used to take a while to compute. But what if we change fib to be a memoized version of fib? Then we can compute fib 30 rather quickly. In fact, we can compute fib 50 rather quickly, or fib 300, which is a very large number, but it's not that hard to compute. All we have to do is compute fib 298 and fib 299, which we do almost instantly with this memoized version of fib.

So let's see if we can understand what's going on. I've restarted Python, so fib is slow again. What we're going to do is replace fib with the counted version of fib, so we can see how many times it actually gets called. We'll give another name to that counted version of fib, so we can access its attributes. Now, I'm going to change fib to a memoized counted version of fib.

And we can even count that. And we'll call fib on 30, which completes instantly. There were 59 calls to the memoized version of fib, some of which reached the cache, and some of which actually called the underlying original fib function, which we called counted fib in this example, and its call count was 31. Now, why 31? Well, there are 31 different arguments that we pass in.

30, 29, 28, all the way down to zero. And so that's exactly how many times we call the original function. Now, what about 59? Well, let's take a look at what's going on. Here's our tree-structured recursive process. And we're going to keep track of actual calls to fib, times when we called the memoized version of fib, and found the result in the cache, and times that we just skipped entirely.

There must be lots of times that we skipped it entirely because we made so many fewer calls than we did before. So, we call fib 5, which calls fib 3, which calls fib 1, which returns 1. That's an actual call to the fib function. So is this call to fib 0. But the next time fib 1 is called, we just get the value that we've already computed from the cache.

So this doesn't count as a call to the underlying fib function, but does count as a call to the memoized version. fib 2 returns, and then fib 3 returns. The next thing that happens is that we call fib 4, which calls fib 2, which is already in the cache, which means we can skip over these calls to fib 0 and fib 1 entirely.

They never even happen. And that's because this structure is something that's repeated from what we've already done before. So we find fib 2 immediately, and when we call fib 3, we find that result immediately as well, skipping these recursive calls. So with fib 2 and fib 3, we finally can return from fib 4, and then return from fib 5. So as you can see, for each value of n, fib is called exactly once.

And for many values of n, fib, the memoized version of fib is called a second time in order to finish the computation. But fib 4 is never called a second time, and neither is fib 5. Let's look at an example of a function we can define in two different ways, one of which is much more efficient than the other. Exponentiation is built into Python.

I can raise one number to the power of another. But let's write an exponentiation function recursively. Our goal will be to have it so that one more multiplication lets us double the exponent that we're using in exponentiation. Here's an implementation that does not meet this goal. This says to raise b to the power n, if n is 0, return 1. Otherwise, multiply b to the n minus 1 by b.

This is a correct definition, but if I double n, I have to do twice as many multiplies, because each time I make a recursive call, I'm only reducing n by 1. And this function's implementation corresponds to the following mathematical definition for b to the n. But this is not the only mathematical definition of b to the n. Here's another one. More complicated, but the additional complexity will also give us additional efficiency.

This says that b to the n is 1 if n is 0, and then has two different cases for whether n is even or odd. If n is even, then I can raise b to the 1 half n power and square that result. So if n is 16, I raise b to the 8, and then I square b to the 8 to get b to the 16.

If n is odd, then I use the definition I had before. Here's an implementation. This is a more efficient version of exponentiation that has two different recursive cases, depending on whether n is even, in which case you square the result of exponentiating b and n divided by 2, where I know that n is even, so floor division will give me the exact result.

And if n is odd, then I use my old definition. This is not a tree recursive function. Even though I see two different calls to expfast in the body, only one of them is ever called. So this is an instance of linear recursion. And sometimes the problem size is reduced by half, meaning one more multiplication, in this case by calling square, lets us double the size of the problem that we're handling.

And expfast runs faster. Let's take a look. This environment is called a Jupyter notebook. You can read about them online. It's a common way that people use in order to execute Python code when the output is a graph or a chart. So here's our definition of exp the slow way. And something that's built into this notebook environment is that we can time how long it takes to run something.

So if I raise 2 to the 400th power, the time it took was 2 milliseconds. If I raise 2 to the 100th power, it only took me 100 microseconds. But if I run it again, I'll get a different number each time. So if I run it a bunch of times, I see it hovers around 100 microseconds. 2 to the 400th power tends to hover around 200 microseconds.

Running it a bunch of times this way is inefficient. So I've written some code to run it a bunch of times using the built-in timeit module, which can repeatedly call something. And in this case, we're going to compute the median time that it takes to execute some line of code. And here's the result. 2 to the 200th power takes a little less than half a millisecond.

2 to the 400th power takes a little less than 1 millisecond. This looks like a straight line. The term we use to describe this is linear. The time that it takes to compute 2 to the n under this implementation is linear in n. Now, it's a little bit bumpy because all kinds of interesting things are happening inside of a computer. But the word linear is used even if there are slight deviations from the line to describe the general trend that appears when you plot the time it takes to compute something as a function of the input size.

And here's the fast definition. We can draw the same plot and we'll see that the overall numbers are quite a bit smaller. For 1600, instead of taking 4 milliseconds, it takes only.04 milliseconds. Also, the shape of the curve is different. This shape is called logarithmic. The difference between going from 200 to 400, in this case, is just about.002. And what about the difference between going from 400 to 800?

Well, that's another.002. Going from 800 to 1600 is another.002. Every time we double the input, it just takes a constant amount of extra work. And that's because we're making recursive calls on n that's only half the size. That's called logarithmic time. So, to summarize, a linear time function requires one more unit of work for every one bigger n. That means doubling the input doubles the time.

And 1,000 times the input takes 1,000 times as much time. 1,024 is 2 to the tenth power. Logarithmic time is much better. Doubling the input just increases the time by some constant. And 1,000 times the input just increases the time by 10 times that constant. So, it takes 10 times as long to do 1,000 times as much work. And these terms linear and logarithmic are used to describe the general shape of time as a function of input size, even if there are wiggles and bumps along the way.

There are precise mathematical definitions for the terms linear, constant, quadratic, and so on. And these definitions are useful because they allow you to prove properties of functions without ever running those functions on particular examples. And one important component of the theory of computing is this practice of proving characteristics about functions by reasoning from mathematical definitions. Now, that's not a topic in this course, but it is covered extensively in future courses at Berkeley, and it's a standard part of the computer science curriculum.

So, rather than telling you all the definitions, which you're welcome to look up on your own, I will show you the standard notation that's associated with those definitions because it's used so commonly that it might surprise you if you've never seen it before. So, for these common orders of growth, exponential, quadratic, linear, logarithmic, and constant, the most typical way to describe each order of growth is with either big theta or big O notation.

Big theta notation looks like this, and there's a different expression for each order of growth. So, quadratic growth is big theta of n squared, whereas linear growth is big theta of n. And yes, computer scientists really do wander around saying big theta. Logarithmic is log n, and constant is the tricky one. You write big theta of 1 most commonly. And what happened to the n?

Well, increasing n doesn't affect time in a constant growth function, and so you don't put n there at all. Another common set of notation is big O notation, which is even more fun to say than big theta. And the expressions look the same. So, big theta of b to the n or big O of b to the n. Now, these actually mean something slightly different.

Big O describes the upper bound for the time it takes for a function to run. So, this is like saying at most quadratic, whereas this says something about a lower and upper bound. Both at most quadratic and at least quadratic time is required. Now, to use this mathematical notation effectively, you have to be quite precise about what you're describing. What is n in relation to the problem?

If n is just the input number, then things are simple. But n might be the length of the input sequence, and that means there are lots of sequences all with the same length. So, are you describing how long it takes for a length n sequence in the worst case or best case, in average case, across all different sequences of length n? That's something you'd want to specify if you were going to go prove properties about functions.

And all that will become important in later courses. But I think in this course, the important thing is to recognize that there are different general patterns of growth in the time it takes for a function to complete. The most common are the five that I've shown you here. And when people discuss logarithmic growth, sometimes they don't say logarithmic growth. Instead they say big theta log n or big O log n.

The order of growth of a function's time that it takes to compute its result is a general category that the function falls in, such as linear or logarithmic. Two functions that use linear time might not take exactly the same amount of time to compute their result for the same input, but they both scale in the same way. The general shape of their scaling curve is both a line.

And logarithmic functions all have that same characteristic logarithmic shape. And there are other shapes as well. Quadratic time describes a function that processes all pairs of elements in a linear input, or all pairs of values in a sequence of length n. So, for example, here's a function that computes the overlap between the elements in A and the elements in B, by going through every element in A and every element in B, and checking to see if they're the same.

It adds a count when they are, and returns the count at the end. So, the overlap between 3, 5, 7, 6 and 4, 5, 6, 5 is 3, because 5, 5 are the same, 5, 5 are the same, and 6, 6 are the same. To compute this result, overlap compares all pairs of an element in A and an element in B. And that's a quadratic amount of work based on the input length.

Here, the input length is 4, and the amount of comparisons is 4 times 4, or 16. The amount of extra work required to process a length of 4 versus a length of 3 is this whole row. And therefore, if you compare the input size to the time it takes to compute the result, you get a quadratic shape. So, here's what happens when we pass in ends from the range 20 to 200, and compute the median time required in order to return the result.

75 takes 2 milliseconds, whereas 150 takes nearly 8 milliseconds. And the curve slopes upward in a familiar looking parabola. Another upward sloping order of growth is exponential time. Here, things are even worse. A tree recursive function can take exponential time, because the unmemoized fib function has to do 60% more work just to compute n that's one larger than the previous n. So, computing fib 2 just requires this much work.

Fib 3 requires all this additional work. On top of fib 3, and fib 5 has to compute not only fib 4, but all of this additional work as well, assuming we don't memoize. So, a tree recursive function like this, without memoization, will take what's called exponential time. Here are the common orders of growth that arise when analyzing functions. There are others, and there's also a formal system for analyzing functions and proving what orders of growth they belong to.

But we'll defer all of that for a later course, and instead focus on understanding what these categories are, and what their implications are on the runtime of a program. All of them describe how time scales with input size, and all of them describe general trends, as opposed to the details of exactly how many microseconds it takes for a function call to return.

So, exponential growth is really slow. Quadratic growth is slow but common. Linear growth is very common. Logarithmic growth is great and scales to really large inputs. And constant growth is the best of all. That happens when the input size doesn't affect the time. For example, in Python, the number of elements in a dictionary does not affect how long it takes to look up a value by its key.

How that works is a topic for a later course, but the fact that it is a constant time operation to find a value by its key is an important property of Python dictionaries. Each of these categories can be described by a simple equation where we've written down the general time that it takes to process an input of size n plus 1 in terms of the time that it takes to process an input of size n.

Using some constants a and p to account for the fact that there are many details about how long it takes for something to run that we're glossing over as we talk about the general shape of time as a function of the input size. So for exponential growth, the amount of time it takes to compute the result for an input of size n plus 1 is something like a times b to the n plus 1, which compared to the time it takes for an input of size n requires an additional multiplicative factor of b.

So that's the key characteristic of exponential growth. Incrementing the input size n multiplies the time by some constant. The bigger the constant, the worse this is, but basically for any constant, it's pretty bad. Quadratic growth is not quite so slow. Quadratic growth says that for an input of size n plus 1, it takes something like a times n plus 1 squared in order to compute the result, which in addition to the time it takes to compute the result for size n, also requires an additional additive term.

Now adding to the time is better than multiplying the time, but still the problem with quadratic growth is that the amount you add for just going from n to n plus 1 is a term that depends on n. So incrementing n increases time by n times a constant. Linear growth for a problem of size n plus 1 requires n plus 1 times some a steps, which compared to solving the same problem for size n is just an additive factor that doesn't depend on n.

Incrementing n increases time by a constant. Logarithmic growth is the one that scales to really big n. Here we write down an expression for the time it takes to compute the result for n plus n or 2 times n is some constant times the log of 2n, which compared to the amount of time it takes to compute the result for just n adds some constant.

So doubling n only increments time by a constant. If it's possible to reimplement some function in order to change its order of growth from exponential to linear by memoization or from linear to logarithmic as we did for exponentiation, that can substantially change not only the speed of your program, but the size of problem that your program can handle without seeming like it's taking forever.

Space or memory is another resource that gets consumed by programs as they execute. And so it's something that you need to worry about. Now, the consumption of space is taken up by values. So a long list takes up more space than a short list, but it also gets taken up by frames. So you need to know how many frames exist because of different function calls in your program at the same time.

And this will involve some new concepts. So the new concepts we need to keep track of are which environment frames do we need to keep around during evaluation? And which ones can we just let go? So here's the story. At any moment, there's a set of what are called active environments. And values and frames in those active environments consume memory or space.

Any memory that is used for other values and frames, not in an active environment, can be recycled. And the Python interpreter does this automatically by reclaiming the space that it used before when it knows that that information is no longer needed. So which are these active environments? Well, an active environment is for any function call currently being evaluated, meaning we called it, but it hasn't returned yet.

There's another case, much less common, which is a parent environment of a function that exists in an active environment. So this situation occurs when you've defined a function within another function, and so its parent frame is not the global frame, but some other frame. As long as you need that function, you also need its parent frame, and all of the other frames in its parent environment.

So, fortunately, Python Tutor can visualize which frames are active for us. Here's our definition of fib, which computes Fibonacci number number 6, and there's a setting, which I'll show you, that says don't display exited functions. So in this way, it will actually delete the frames of anything that has already returned. So when we call fib 6, obviously it hasn't returned yet because we have some work to do, and that's going to involve calling fib 4, which has to complete before we ever try to finish fib 6.

And fib 4 involves calling fib 2, and so all of these are active frames at the same time. Fib 2 calls fib 0. Fib 0 actually returns, and once it returns, it's no longer active, and so it's just going to disappear. And in its stead, we have replaced it with a frame for fib 1. So notice, we had F1 and F2 and F3, we created F4, but then got rid of it because we didn't need it anymore, and now we're up to F5.

So if we continue this process, we'll see that once fib 4 was done computing fib 2, the fib 2 frame was removed. And now we have the fib 3 frame, which is the other part of computing fib 4. So that goes on for a while, and eventually the fib 4 frame is gone entirely, and we only have the original F1 frame because we're not finished computing fib 6, and we have the F11 frame that was created for computing fib 5.

That does some work. Eventually that gets deleted, and fib 6 can finally return the value of 8, and then there's no more work to do. In our code, we can also see how many frames are being used. So let's define a higher order function called count frames, which takes in some F and defines a counted version, which takes some argument. And what it's going to do is increment the open frame count.

It's also going to keep track of the maximum number of open frames at any time. So if the open count is actually larger than the max count, we can change the max count to be the open count. Now we'll get the return value by calling F on N. Now it's time to close this frame, which just means subtracting 1 from the open count.

And then we can return the result. The open count starts out at 0. The max count starts out at 0. And we can return the counted function. So if we define fib really quick, we already know that it makes many, many recursive calls. But what we don't know is how many frames are open at any given time. Or what the maximum number of open frames is.

So we can figure that out by calling count frames on fib, then calling fib on some number such as 20. So it's computed the 20th Fibonacci number. And fib dot open count should be 0 because we've returned from every call to fib that we've made. But the max count will tell us the maximum number of frames that were open at one time.

And the answer is 20. So that's an indication of how much space is used by this function. It doesn't need to open 6,000 frames at a time, only a few. Now how can we understand why the number came out 20? Well, here's the tree-shaped process that we use to compute fib 5. And let's say we've done all this work already. We still have to do all this work.

And we're about to return from this call to fib 1. Well, we can figure out which calls have an active environment. It's this one, this one, this one, and this one, which haven't returned yet. The ones over on the left have already been called and returned. So any memory used by these frames can be reclaimed. And then over here, these haven't been called yet.

And so we don't need to worry about that. So the maximum count of frames open is the longest chain you can find in this tree, which in this case goes from fib 5 to 4 to 3 to 2 to 1 is length 5.

## 24. Part p24 - Lecture 24 - Decomposition

Large programs are complex programs. It's hard to think about all of their parts at once. And so, they can benefit from a modular design, which means that the whole program is broken up into small, fairly independent parts. Now they might not be completely independent because different parts of the program have to work together to achieve the behavior of the whole thing. But modular means that there are components that could be switched in and out and are separated by various kinds of abstraction barriers.

The goal of a modular design is to achieve separation of concerns. Different parts of the program are concerned with different parts of the behavior of that program. So this is a general design principle which encourages programmers to isolate different parts of the program that address different concerns so that you don't have to think about all the requirements of the program at once.

A modular component can therefore be developed and tested independently to make sure that it accounts for whatever concern it's meant to address without worrying about the behavior of the rest of the program. And we've tried to illustrate this principle with the course projects. So in the game of hog, there are three different modular components. A hog game simulator is concerned with the game rules, the ordering of events within the game, and whatever state tracking is required to determine who won.

But it knows nothing about commentary. The game commentary functions are concerned with describing different events that happen during the game, and whatever state tracking is necessary to generate that commentary. And neither of these components are concerned with what the players actually do. Those are the concern of the player strategy functions, which have various decision rules and capture information about strategies, like the margin of points that you'll use to decide whether to take advantage of free bacon.

So different aspects of the game state and different pieces of the program's logic are all handled by different parts of the program. Now they interact because commentary functions are passed to the play function and strategy functions are passed to the play function. But the play function doesn't need to know much about how they work. It just needs to call them. The ants project has a similar modular design.

There's an ants game simulator that you didn't have to write, but it handles the order of actions and tracking of the overall food of the colony and figuring out whether the game is over. But this part of the program really has no idea what the ant and bee actions actually do. Those are handled in all of the action functions, each of which is defined independently to describe what's special about an ant or a bee.

And these characteristics make the game interesting. But writing an action function can be done without worrying about the order that actions will occur in or how much food the colony has or whether the game is over. And writing an action also doesn't need to know much about how the game is laid out. There's a separate part of the program that worries about tunnel structures, how many there are, how long they are, and sets up all the entrances and exits.

This part also keeps track of the locations of all the ants and bees. And most interesting programs have some kind of structural decomposition. And by decomposition, I don't just mean that long functions are broken up into smaller functions. I also mean that different aspects of the program, different concerns, are isolated to different parts of the code. And when you build one part of the program, that part should have to know as little as possible about other concerns that aren't its concern.

So the game commentary functions shouldn't be dependent on the rules of the game. In fact, your design is more modular. If changing the rules of the game only changes the hog simulator code, it doesn't change the commentary code at all. Let's apply this idea of modular design to an example, restaurant search. Here are the data, and we'll try to build a program that lets us look up a restaurant by words in its name and also show related restaurants.

For each restaurant, we know its name, the number of stars it got on Yelp, and the price category that Yelp gives it. And these are actual examples from the Yelp database that were released a few years ago for academic use. Here's another entry about La Cascada Taqueria, which has three stars on average and a price category of two. I think in Yelp stars go from one to five and prices go from one to three.

Each business not only has a name, but also some complicated unique string called the business ID. And we'll have a different one of these dictionaries for every restaurant near the border of Berkeley campus. And we also have reviews, which give a business ID, telling us which restaurant the review is about. A user ID, which is a unique indicator of who wrote it.

This doesn't have an email address or anything, but it does tell us whether the same user wrote two different reviews. How many stars they gave the restaurant? And some text. Café 3, or Café Tré, as I like to say, used to be the bomb diggity when I first lived in the dorms. But sadly, quality has dramatically decreased over the years, says user xvocusz, etc.

This review is from 2012. The data I have is a little bit old because Yelp stopped publishing an academic dataset that includes Berkeley restaurants. Their new academic dataset doesn't have anything from Berkeley. So we're going to use some older data because it's more interesting to see cafes and restaurants that actually exist around campus. Here's a review for a different business. This business ID matches the one for La Cascada Taqueria.

And user 84d, etc., gave two stars to La Cascada Taqueria, saying, excuse me for being a snob, but if I wanted a room temperature burrito, I would take one home, stick it in the fridge for a day, throw it in the microwave for 45 seconds, then eat it. Not go to a restaurant and pay like $7 for one, said this user in 2009.

So given that I have a file full of these business names and a file full of these reviews, how can I build a restaurant search application that lets me look up a restaurant by name and show related restaurants? Well there are many questions to be answered in order to finish this application. What does it mean to look something up by name? What does it mean for restaurants to be related?

What should we do with the price and the stars and the business ID? How should we represent businesses and reviews? Well let's dive in and try to focus on modular design. So here's my file of restaurants. And in fact there's more information than even what I said. Longitude, latitude, categories, addresses. Not just for Cafe 3, but also Jasmine Thai, Fondue Fred, and a long list of other ones.

There are 133 restaurants in this data set. And what about the reviews? We have 17,000 reviews. Let's say things like, the pizza is terrible, but if you need a place to watch a game or just down some pictures, this place works. And we have the business ID they're talking about, but we don't know the name of that unless we match it up with one of the businesses in the other file.

Having taken a peek at the data, I think we can dive in and write some code. We need a function that searches so that we can call search on Thai and get back a list of all the Thai restaurants. And then for each restaurant in these results, we should be able to look at the restaurant itself and also what it's similar to.

I think a good way to represent whether something's similar is using a method. Let's get three different similar restaurants for every R. Now for this to work, we need to have a search function. We pass in a query and we need to decide what it means to match a query. Well, I think if the query's in the name, then we should return that restaurant.

Now we haven't defined yet what a restaurant is or how to get all the restaurants, so this code might not work, but it has the right idea. One of the most important concerns of a search engine is always the ranking that it gives to the results. So what order should we return the restaurants in, alphabetical, by location, maybe the most popular one first, maybe the one with the highest star rating?

This decision gives us an opportunity for modular design. We can just pass in a ranking function and return a sorted version of the results that uses the ranking function in order to pick which ones come first. So that nice piece of modular design comes with a consequence. Every time I call search, I need to come up with a ranking function. So it would be helpful to have some default.

How about by default, we order them by their number of stars. Now sorted gives you back the list of results from least to greatest according to the key function. So this would give us the one with the lowest stars first. Unless we put a negation sign here, in which case the lowest by negative stars is actually the one with the most stars.

Okay, we're making progress, but we need to know what all the restaurants are and how a restaurant works. Let's start with the latter. Representing a restaurant is naturally done with a class. We already see some of the attributes we need to track, the name and the stars, which we'll assume we get from the file somehow and are passed in here. I think this is a good opportunity to think about how we're going to keep track of all the restaurants.

Instead of having some global name, we could use a class attribute, which we initialize here and populate here. All.append self puts whatever restaurant I create into the list of all restaurants. So now I think my search function will work, but what about r.similar? That's something we need to define as well. How do I find the k most similar restaurants to some restaurant?

Well, that sounds complicated. I think a good step in the right direction is to write down a doc string. Return the k most similar restaurants to self. And for now, let's leave it blank. I think we've written enough code that we should test our progress. So let's not worry about the file just yet and create some restaurants. Ty Delight has two stars.

Ty Basil has three stars. And Top Dog has five stars. Man, that place is delicious. And we run our program. We found a bug. Instead of referring to all restaurants, I was referring to the built-in all function, which does not have an append method. Another bug is that when I print out a restaurant, I see some nonsense. I can fix that by just adding a rep method.

And now why don't we return angled brackets around the name of the restaurant? Okay.

So when we search for Ty, we find Ty Delight and Ty Basil, but not Top Dog. That looks good. And we just need to finish this notion of similarity. We need to implement the similar method of the restaurant class, which takes in a restaurant and a number of similar restaurants to return and finds the most similar k. There are many notions of similarity.

They're close in distance. They have a similar rating, a similar price. Maybe they're similar because the same people review them, meaning the same people go there. Whatever the case is, I think we have another opportunity to introduce modularity by passing in a similarity function that takes into restaurants and tells us how similar they are. Now the job of the similar function, its concern, is not to determine the similarity, but determine the k most similar restaurants to self.

Why don't you try doing that? Implement similar. A restaurant method that takes a positive integer k and a function similarity that takes two restaurants's arguments and returns a number. Higher similarity values indicate more similar restaurants. And the similar method is supposed to return a list containing the k most similar restaurants according to the similarity function. But this list should not contain the restaurant itself.

It would be silly to say the most similar restaurant to Thai Delight is Thai Delight. So we'll define the similar method, which returns the k most similar restaurants to self using similarity for comparison. And what we'll do is build a list of all the restaurants except for self and then sort it according to some key function. And then there's an opportunity to manipulate the sorted list.

Sorted is a built-in function that takes some iterable and some key function and returns a new list containing all items from the iterable in ascending order according to the custom key function. And you can use a reverse flag, but we didn't use that in our example. Why don't you spend a minute and try to fill in this implementation? Pause the video and I'll go through the answer in three, two, one.

Others is a copy of the list of all restaurants and we need to remove this restaurant, which we do using the remove method. And what do we pass in to tell it what to remove? Self. That's the element of the list of all restaurants that we do not want to include in the list of similar restaurants. The key function for sorted, just like the key function for max and min, must be a one argument function referring to an element of the others list.

So how do we make sure that others is ranked according to its similarity to self? Well we write down a function of one argument that computes the similarity between self and our. I've negated it so that most similar restaurants come first and the least similar restaurants come at the end. Now that we've sorted them all, we don't want to return the list of all other restaurants, but instead just the top K, which we can do with a slice.

Let's finish our restaurant search program by reading in some files. But first, let's pick a default notion of similarity. Let's say that the similarity between two restaurants is the number of people that reviewed them both. So reviewed both takes a restaurant, R, and another restaurant, S, and returns the length of the list of R's reviewers that are also S's reviewers. That's just one notion of similarity.

Two restaurants are similar if the same group of people reviews them both. So now we need to make sure that a restaurant has reviewers, and we'll read those from a file. Instead of creating three restaurants by hand, we'll read all the restaurants. For line in open restaurants dot JSON, we'll iterate through all the lines in the file. Here's the file. This format is called JSON, or JavaScript Object Notation, which can be read by Python just by importing the JSON module and calling JSON dot load string on the line.

That gives us a dictionary with keys open, URL, neighborhoods, etc. In order to construct a restaurant, we need to pass in the name, the stars, and we don't want the number of reviews. Instead, we want the list of reviewers. That's going to be complicated to compute, so let's give it a name. The reviewers is what we get when we look through all the reviews and find the user IDs of the people that reviewed this restaurant.

I think we're going to have to read through all the reviews first and then look up the reviews for the restaurant. And recall that the reviews are each given a business ID, which also appears in restaurants dot JSON. So we'll use that to look up the reviewers. So this dictionary reviewers for a restaurant has to be built by going through every line in the reviews file, constructing a Python dictionary from the JSON line.

Which business is it? Well, we get the business ID. And if we've never seen this business before, then I think we should put that business into this dictionary. And the value associated with that business ID should be a list of all the users that reviewed it. Let's use their user IDs because that's all we know about the users. Otherwise, if we've seen this before, then looking up reviewers for restaurant biz will give us a list to which we can append that same value.

Every time we create a restaurant, it's added to the restaurant dot all list. And that means we should be able to search for Thai food using real businesses. Oh, we had a bug here where I was talking too much and I forgot to assign reviewers. And now it works. This says Thai Basil Cuisine is similar to Gypsy's Trattoria Italiano and Top Dog.

Are those restaurants really similar? Well, they're similar in the sense that students go there. So I think we should change this to something like shares reviewers with. Folks who go to Thai Noodle 2 also go to La Cascada Taqueria. Folks who go to Jasmine Thai, which used to be on the north side before it closed, also review other restaurants on the north side.

Interesting. So it looks like we're done building our restaurant search engine. We finished our restaurant search application, but it's too slow. To find all the Thai restaurants and list all of their similar restaurants doesn't happen instantly. In fact, it takes about.7 seconds. And things are even worse if we look at cafes. Since there are more cafes, it now takes 1.7 seconds in order to list all of the results.

Why is it so slow? We could go through and time each part, or we could just think about what's happening in our program. We go through each restaurant to see if it matches the query. That's linear time. For each restaurant, we call similar on every other restaurant. That's also linear time. And what about computing the similarity itself? Here we go through every reviewer for restaurant R and check if that's a reviewer for restaurant S.

And how does it do that check? Well, it goes through every reviewer in restaurant S to see if it's X. So this operation is actually quadratic time. It's comparing all pairs of a reviewer in R and a reviewer in S to see if they're the same. I think that's what's slow. Which gives rise to the question, could we figure out the number of users that reviewed both R and S in just linear time?

Indeed we could. Here's the trick. Instead of just keeping a list of reviewers for each restaurant, we'll keep a sorted list of reviewers. And then we'll write down a linear time procedure that checks for the amount of overlap between two sorted lists. Given two sorted lists with no repeats, we want to return the number of elements that appear in both lists. Let's start with an example.

If I have this sorted list and that sorted list, the way we'll find all of the elements they have in common is to pass through both of them together, starting at the beginning of each. If one of these elements is smaller than the other, we know it doesn't appear in the other one because it's smaller than this and this is smaller than everything here.

So one must not appear anywhere in this list. Therefore I can advance in the second list because one is smaller than three. Three and three are the same, so I found an element that appears in both, and I can advance both of these positions. Four is smaller than five, so it's also smaller than seven and eight, meaning it doesn't appear anywhere in the other list, so we can discard it and move on.

Likewise, five doesn't appear in six, seven, nine, ten because it's smaller than six and everything after six. So we can move on. Six is smaller than seven, and now we found another pair. So we remember that we found a second element that appears in both, and we advance both. Eight is smaller than nine, which means eight doesn't appear anywhere in the first list, and now I've reached the end of the second list, which means I'm not going to find any more elements that appear in both.

Now that you have a picture, try to implement that procedure. I recommend that you pause, and I'll go over the answer in three, two, one. We'll use i to index into list s, and j to index into list t, and we'll keep going as long as i is less than the length of s, and j is less than the length of t.

If I've found an element that appears in both, then I increment the count and move forward in s and t. If the element I'm considering in list s is smaller than the element in list t, then I know it doesn't appear in list t anywhere, and so I can move forward in s. Otherwise I move forward in t. Let's see if it speeds things up.

It takes one and a half seconds to list out all the cafes and their similar restaurants, but what if we replace reviewed both with a new implementation? Here's the modular way to do it. We should define the overlap between two sorted lists generically for any two lists, whether they're lists of reviewers or lists of something else. And here's the code from the slide.

And then reviewed both should call fast overlap on the particular lists that are needed in order to compute reviewer overlap. Instead of one and a half seconds, now it takes only.7 seconds. So we've made it twice as fast, at least for that one run. And what about Thai food? Is that faster than.7 seconds? Yes, it is. Now it only takes half a second.

And that means that our program is responsive enough to make it interactive. We can do that by saying forever, search for whatever the user types in. And print out the results. In order to indicate that it's time to type something, let's put a little prompt there. So I've started my restaurant search engine, and I can look for Thai food, or I can look for a cafe, or I can look for coffee, and learn all about Berkeley's restaurants that way.

## 25. Part p25 - Lecture 25 - Data Examples

Let's review list mutation and environment diagrams. Names can refer to lists, and assignment statements can change which names refer to which lists. In addition, the contents of a list can change, the length of a list can grow or shrink, even if the names that refer to those lists don't change. And environment diagrams help keep track of all this change as it's happening throughout the course of execution of a program.

So let's work with an example where S is bound to the list 2, 3, T is bound to the list 5, 6, and we perform various mutation operations, have some example calls, and show the result. And we'll start with the append operation, which adds one element to the end of a list. So if I append T to the list S, here's what happens.

I start out with a global frame with S bound to the list 2, 3, and T bound to the list 5, 6. S.append T adds one element to the end of S that refers to this list containing 5 and 6. It's important that this arrow doesn't point to the name T. It has to contain a value. It's the value that you get when you evaluate the name T, which is the list containing 5 and 6.

Now when I assign the name T to something else, like 0, that means T is bound to 0. It's no longer bound to the list 5, 6, but that does not affect S. S is now 2, 3, and a list 5, 6. That's a three element list containing two numbers in a list. And T is bound to 0. Okay, let's start over and take a look at extend.

Extend adds all elements in one list to another list. So S.extend T will add to the end of S the elements 5 and 6. Now, if I assign T1 equal to 0, I will change this element to 0, but that won't affect what's in S because S just contains a bunch of numbers. Let's start over once more and take a look at addition and slicing.

Addition of two lists creates a new list, and slicing creates a new list. These lists contain the elements of the lists that were added or sliced. And here we'll do a longer example. We're going to assign A to S plus a list containing T. We're going to assign B to a slice of A, and then we'll make some changes to A and B and see what happens to S and T.

Starting at the top, if I added S and T together, I'd get a list 2, 3, 5, 6, but this is different. This says build a one-element list containing T. So let's go ahead and do that, even though we're not going to give it a name. Instead, we're going to add this list and this list. Building a new list containing the elements 2, 3, and the list 5, 6.

So the result of this expression S plus list T builds a three-element list with 2, 3, and a list, and we give this the name A. Now, before we move on, we should probably figure out what to do with this floating one-element list that has no name. You could leave it there. You could also erase it because it can't be reached. It was created during evaluation but never given a name. Okay, onto the second line. B is a slice of A starting at element 1 and going to the end. That creates a new list containing 3 and the list 5, 6.

Now we can make some changes. A's element 1 is 9. Here's A. Here's element 1. That changes to 9. B's element 1's element 1 is 0. Here's B. Here's B's element 1. Here's B's element 1's element 1 and we change that to 0. That actually affects T. So the result now is that S is a list 2, 3. T is a list 5, 0. A is a list 2, 9 containing 5, 0. And B is a list 3 containing 5, 0. The fact that this addition and this slice all contained T means that a change to T affects all three of them. And therefore we see three different zeros all referring to the same element of a list. Okay, let's start over. The list function creates a new list containing existing elements. So if I say T equals list S, I get a new list containing 2 and 3. That replaces what T used to refer to. If I set S element 1 equal to 0, then I'm changing S, but I'm not changing T because we copied it. So the result is that S is 2 and 0 and T is 2 and 3.

What about slice assignment? Here is an example. If S is 2 and 3, T is 5 and 6, and I assign to the list S from 0 to 0 equals T, I'm saying that right in here I should have all the elements of T. Since this slice had length 0 and this list had length 2, I had to shift everything else over. Slice assignment from 3 onwards means that this value is going to change, but since I'm replacing a slice of length 1 with a list of length 2, I put the elements 5 and 6 in place.

Now T 1 equals 0 changes this value, but it does not change this value because the last element of S is just a number. So those are ways of extending or changing a list. It's also possible to shrink a list. I'm not going to draw environment diagrams for these because I think they're pretty straightforward, but let's go through the operations. Pop removes and returns the last element. So if I start with S is 2 and 3 and T is 5 and 6 and then assign T to S dot pop, that removes the 3 and changes T to refer to that 3. So the result is that S is a list containing only 2 because I popped off the 3 and the 3 is now the value of the name T. We've lost track of the list 5 and 6.

Starting over with S is 2, 3 and T is 5, 6. What if I remove? Well remove removes the first element equal to the argument. So if I write T dot extend T, that means T is now 5, 6, 5, 6. And if I remove 5, then I'm left with just 6, 5, 6. S has not changed at all. And finally, let's do another example of slice assignment. That's the same as the thing we looked at in the last slide. We can remove elements from a list by assigning empty list to a slice.

So the slice from 0 to 1 is empty means that all those elements in the slice 0 to 1 are removed, leaving only 3 in S. And in fact, if I remove all the elements from 0 to 2 of T, then I'm left with no elements at all. So let's put them together into a couple of more complicated examples. Let's say I assign T to the list 1, 2, 3. And then I perform slice assignment where the slice from 1 to 3, that includes elements 1 and 2, is assigned to a list containing T. So let's build that list containing T. And then we'll replace 2 and 3 with the contents of this list, which is just a reference to the whole list, 1, 2, 3. So we replace that with a reference to this list. Now we have a list that contains itself. That doesn't make Python explode, and so we can keep going. T.extend T says put all the elements of T into T, and all the elements are 1, and then a reference to T. And if you print this out, you'd get something that looks like this.

Okay, let's do one more. T is 1, 2, 3, 4, a list with two elements, which are both lists. If I look at T0, that's this list, and I append to it a slice of T. A slice of T from 1 to 2 is a list containing just 3, 4. And that's what I append. So I build that slice, and I append it, and I've constructed the result, which looks like this. I think it's very challenging to move straight from code to the eventual result without drawing a box and pointer diagram showing what's going on. And so I'd recommend that you get comfortable with this notation so that you can solve these kinds of problems. Let's look at an example of using the object system.

Here's something to remember. When you look up an attribute by name on an instance, you find instance attributes before you find class attributes. And if you don't find the attribute on the instance, you look in the class. If you don't find it in the class, you look in the base class. And in this way, class attributes are inherited. Here's an example. Let's say we have a class of worker. The worker greets others as sir, has a constructor that sets an attribute elf to the class worker, has a method work, which.

Returns a greeting of the object passed in itself, plus I work, and finally has a special method repr. And this repr method is used to display what a worker instance looks like when you're running an interactive session. Now this repr string is very weird. Instead of doing anything with self at all, it takes bourgeoisie and returns its greeting. The bourgeoisie are the landowners, the ones who own the means of production. And so instead of working themselves, they gather wealth by employing their peons. To work, they say, I gather wealth. Jack.

Is a worker. John is a bourgeoisie. And here, we've assigned the greeting attribute of Jack to be man. If you want to work through this problem yourself, from fall 2014, midterm two, here are some of the prompts. Let's go through exactly what happens when we execute all of this code. So the first thing is that when we have a class statement, its body gets executed immediately. And so it creates a new class called worker, where there's a class attribute greeting, which is valued at sir. This isn't an environment diagram. This.

Is just a sketch of what's going on. The bourgeoisie class inherits from worker and has its own greeting, peon.

In this case, you don't change the greeting of the worker. It's just that if we looked up the greeting for a bourgeoisie instance, it would find this before it found that. Then these two lines create a worker instance and a bourgeoisie instance. The worker instance is created and then passed immediately into the constructor, where it gains an attribute ELF, which is bound to whatever the name worker is bound to. And worker is the name of the worker class. So ELF's value is this whole thing, the worker class.

John gets created because bourgeoisie does not have an init method. It inherits the init method from worker. So we look up, is there an init in bourgeoisie? No, there's not. So we look in the base class and we apply this one, which has the same effect. So both Jack and John have the same ELF. Finally, we have the line in Jack.greeting equals ma'am. If we just looked up Jack.greeting, we'd look here and find there was no greeting, so we would look in the class and the answer would be sir. However, attribute assignment has the rule that it always assigns immediately to the object to the left of the dot. So the effect of Jack.greeting is that now Jack will have its own instance attribute greeting bound to ma'am.

Jack greets people as ma'am. Any other worker greets people as sir. Now let's go through these examples. Worker, with parentheses after it, creates a new worker instance. Here we invoke its work method, which gets the self.greeting or the newly created worker. The worker doesn't have a greeting instance attribute, so we look in the class and we find sir. Adding sir to iWork returns sir iWork.

Okay. Jack is a worker. When I just write Jack and then evaluate that expression, it evaluates to this worker instance, but we want to be able to display that as a line of text. That's how interactive sessions work. And the way they work is by computing the repr string for the object that's the value of the expression. So what's the repr string of Jack? Well Jack is a class worker. Worker has this special method name repr, which is exactly what gets invoked every time you want to display an object.

So what does it return? Well, it returns bourgeoisie.greeting. Here's the bourgeoisie class. Its greeting is peon. And so what we'll see here for Jack is peon. What about jack.work? Jack is a worker. The work method returns self.greeting plus iWork. Where self is bound to Jack. Jack's self.greeting is specialized. It's ma'am. So what we get here is that self.greeting evaluates to ma'am, add that to iWork, and you get ma'am iWork.

What about john.work? Well, we look up the work method in john. The instance doesn't have one, but the bourgeoisie class does have a work method, and what it does is it prints the result of calling the work method of worker on self. Self is john. Okay, the work method on worker is this work, and so we're going to print out john's greeting plus iWork. Now what is john's greeting? Well, john doesn't have a greeting instance attribute, but its class does, and that class has the greeting attribute peon. So we print.

Out peon iWork. After that's finished and printed out, this returns iGatherWealth. So what we see is p and iWork, iGatherWealth. Now this one has quotes around it because it's a return value, and so we're trying to write down a repper expression that evaluates to the same string that was returned. Peon iWork does not have quotes around it because it was printed. Printing a string does not print the quotes around the string. It just prints the contents of the string. Finally, we have john.elf.workJohn. What's going on there? Well, we look at.

John's greeting, which is the worker class. The worker class has a function work. So this is the one we're calling, and we're calling it on john. We have to look up john's greeting, which is peon. We looked at that already. Add that to iWork, and we get peon iWork as a string. When you return a string, you see it with quotes around it. That's the representation of a string that evaluates to that string.

Let's look at some examples of manipulating iterables and iterators. And let's just focus on using built-in functions and list comprehensions and dictionary comprehensions in order to perform some like moderately complicated data manipulations. These are things that can be done in a line or two if you use the tools correctly. And manipulations like these often show up as the core part of some larger problem. So I'm just going to lay a bunch out there, and then I would recommend that you pause and just try them out on your own, and then we'll walk through them one by one together. So here's an example. What are the indices of all elements in a list s that have the smallest absolute value? So if I have a list s, the elements with the smallest absolute value are negative two and two, but we want their indices. Indices in a list start at zero, zero, one, two, three, four, five. So here are the smallest elements in absolute value, and their indices are two and four.

So how would we take this list as input and have this list be the output? Or if this list is the input, the smallest element by absolute value is the element at index one. We're trying to list all of the indices corresponding to the smallest elements by absolute value, so we get a list containing zero. There's first exercise. I'm just going to go through them all. What's the largest sum of two adjacent elements in a list, assuming that the length of the list is greater than one? So here's a list. If I sum these two elements, I get negative five. That's not very big. Sum these two, I get one. Well, if I sum these two, I get six. So the answer here is six is the largest sum of two adjacent elements. Here's a similar list, but I've fiddled with the negative signs. And in this case, we don't get six. We get negative two at the end. That's not what we want. We can get a positive number one by summing together three and negative two. So that's the biggest thing we can get, adding together two adjacent elements in that list.

All right, another one. Create a dictionary mapping each digit d to the list of elements in s that end with d, where d is an individual digit. So if I have this list of integers, I'm supposed to create a dictionary that says here's all the elements ending in one. Here's the elements ending in three. Here's the elements ending in four. Here's the elements ending in five. Notice there are two of them, five and 55.

There's only one for eight and one for nine. And finally, does every element equal some other element in s? So given a list, is it the case that every element equals something else? Well, negative four only shows up once. So that's false. But here, four is there twice, and three is there twice, and two is there twice. So every element equals at least one other element. So this would give us true. So if you want to pause the video and work through some of these, I recommend that. Now we're going to go through and solve them. Okay, for the first one, what are the indices of the elements in list s that have the smallest absolute value? We're going to start with this example, try to work it out. So here's s.

Smallest absolute value is not the min of s, but it's actually not the min of s using key equals abs either. That would give me the element in this that has the smallest absolute value. It wouldn't give me the smallest absolute value. So if my goal is to actually get the smallest absolute value, I would need to first call abs on each element and then take the min, which I can do by mapping abs over s. So now I have the min absolute value. What can I do with that? Well, I can find all the indices where the absolute value of the element to that index is equal to this min abs value is equal to 2.

This is different than finding all the elements with that absolute value, which I could do with a list comprehension. If I wanted to know all the elements x for x and s, if the absolute value of x is equal to min abs, that would give me both the 2 and the negative 2. But that's not my goal. My goal is to find the indices. And for that, I need to go through for i in not s, but a range of len s, which gives me all the index values for s.

And we adjust this expression accordingly. We actually want just the index values. And we have to adjust this expression accordingly as well. We want to know if the absolute value of s i is equal to min abs. That will give me the numbers 2 and 4. So there's a two-line solution to this problem. Whenever I use a list comprehension, I could also use the map and filter built-in functions. So I could have rewritten this by first defining a filter function that takes in some index and tells me whether it's one.

Of the indices that I want to keep. Then if I take this same range of indices and I filter it using f, I almost get what I want. But this is a filter object. If what I really wanted was a list, then I would call list on it and I'd get this same correct result. So I could have replaced this expression with this expression and gotten the same thing. Okay, let's go on to the next problem. What's the largest sum of two adjacent elements in a list s? And here we're.

Using the same s that we had before. We're meant to get 6. There are two reasonable ways to do it. One is to think about indices. Range len s will give me all of the indices. But range len s minus 1 will give me almost all the indices. Here it is as a range.

If I go through almost all the indices, just leaving out the last one, and I compute si plus si plus 1, then I'm summing together two adjacent elements for every pair of adjacent elements. And I'm leaving out the last one because there's no i plus 1 for the last element. So that's why I use this shortened range. Okay, this just gives me what all the sum of adjacent elements are. If I want to know the biggest one, then I should just call max on that. So there's another use of an.

Aggregation function in order to do the work. Okay, so we're done with this. You can copy it in there and call it a day. Another way to solve the same problem though is with zip. So if I zip together s with s, I get a zip object. And what are the elements of this zip iterator? Well, let's list them out. They're giving me an element from s along with an element from s. These are not adjacent elements, they're just the same element. But if instead I had zipped all but the.

Last element of s with all but the first element of s, now I have five elements here and five elements here. And when I zip them together, I see all the pairs of adjacent elements. So I had built two sequences, negative four, negative three, negative two, three, two, and negative three, negative two, three, two, four. Zipping them together gives me a list of pairs. What happens if instead of listing out the contents, I add together the elements in each pair, a plus v for a comma b in zip. I get.

Those same sums of which the max is six.

So there's another way to solve the same problem. Okay, let's try another one. Map each digit d to the list of elements in s that end with d. The result is a dictionary, so we're going to use a dictionary comprehension. This one's going to get a little bit long, so I made some space. It's a dictionary where the key is a digit and the value is a list. The list contains all elements of s that end in that digit. So we look at x, figure out its last digit, and see.

If it's equal to d. That's a key value pair in the dictionary. We want one of these for every digit. For d in range 10 would give me all the digits. But notice in this result that there's no 2, because there's no element in here that ends in the digit 2. So I need to filter out some of the d's. We want to keep a d if any of the elements in s ends in d. We can use the built-in any function. Any of the elements in s ends in d.

Is expressed as any element ends in d for all the elements in s. So this is the filter clause. Here's what we're iterating over the digit 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. And for each digit that has this property, here's what we're building. Now to figure out whether this actually works, we need to set s to be this value. And then evaluate our big expression. And look, that's what we get.

So one implementation for this would be just to return that. And while we've solved this problem, this looks like a pretty long expression. So maybe we should be breaking it up in some way. One way to kind of break up this whole process into steps is to get the list of last digits in advance. So what are the last digits of all the numbers in s? Well, that would just be x percent 10 for x in s.

Then we could rewrite this as, is this digit in last digits? And we get the same result. It's only a little bit shorter, but at least it only has one big gnarly expression instead of two. Okay, next question. Does every element equal some other element in s? And here's an example s. One way to solve this problem is to focus on some particular index.

So let's say the index one. S i is three. There it is. We could figure out if three appears anywhere else by building a list containing everything except for this. S up to i gives me everything through four, but not including the three. S i plus one on gives me everything after the three. So if I were to add those together, I'd end up with everything in the list except for that three.

We haven't gotten rid of all the threes. We've just gotten rid of the element at index i. And I could ask whether s i is in this new list that doesn't have element i in it. And it is. That means that three appears somewhere else. So now that we have an expression to check whether the element at index i appears anywhere else within the list. We could just check that for all the i's. Is it the case that all of the following are true? This expression s i is in the rest of s not including i for every i in range len s. Let me just write that all on one line correctly without forgetting the last parenthesis so you can see what's going on. So that's one way to solve this problem. But there are other ways to reason about the same thing. Like let's say we didn't want to do it about indices.

We just wanted to look at the values themselves. Well one useful expression would be y for y in s if y equals three. Tells me how many threes there are. I could get how many threes there are by taking the length of this. Or as an alternative I could collect ones instead of threes and get the sum in order to figure out how many threes there are that way. But we don't care about how many threes there are. We care about how many there are of any particular value. So we could write the same expression as part of a list comprehension. I think this one might get long. Where instead of the three we want every x for x in s. What do these twos mean? This means that there were two fours. That there were two threes. That there were two twos. And then this is kind of redundant. There are two threes.

There are two twos. There are two fours. If we want to make sure that each of these is above two then one way is to say that these are all greater than one. Another way would be to compute them all. Find the minimum value in there and make sure that that minimum value is greater than one. Now you know that they're all greater than one. So just two ways of writing the kind of equivalent idea. And all we're doing here is just counting the number of times that x appears in s. And in fact it turns out that that's built in. I could just say s.count how many threes there are and it will tell me. So I could simplify this a bit by saying I want to know s.count x for every x in s. And it will tell me that the smallest count there is two. And since those are all greater than one we know that every element equals some other element in s. So maybe that's the simplest way to solve this one.

Okay and if we did this right then all of our docpests should pass and they do so it appears that we've solved all four of these problems. Let's do some linked list processing. I'll just show you a few exercises. You can try to solve them on your own and then we'll work on them together. How do we write a function that tells us whether a linked list s is ordered from least to greatest? The elements of this are. The elements of this aren't. How would you tell if a linked list is ordered from least to greatest by absolute value? So these are one, three, four are the absolute values whereas these are not.

And why just absolute value? We could have any key function that tells us whether they're ordered after you call the key function on each element. Here's a classic exercise. Create a sorted link containing all the elements of both sorted links s and t. So if I have sorted s and sorted t, how do I create sorted s and t? And this builds a new linked list out of these two. But what if we wanted to do the same thing but never call link? Instead we could take the original s and t and mutate them in order to create this linked list structure. How would we do it? Well, instead of having the rest of s be five, the rest of s would be one, four, five. You can pause here and try to work these out on your own.

Now we're going to go solve them together. So here's our linked list class down here. Takes a first and a rest. The rest is empty by default. And how do we check whether something's ordered? One, three, four is ordered. One, four, three is not. Well, there we're going to use recursion. Check if the first two elements are ordered and check to make sure that everything after that is ordered as well.

If it's the case that s is linked.empty or s.rest is linked.empty, then this thing is definitely ordered. Because it's only got zero or one elements, there's not enough there to be out of order. If it's the case that s.first is greater than s.rest.first, that's the element at index zero, is greater than the element in index one, then they're not ordered. If you don't know that it's ordered and you don't know that it's not ordered, but you do know that the first two elements are ordered, then you have to just check everything else. Return ordered s.rest.

Now this gets a little bit more interesting if you allow for a key function to tell you what values you really want to think about ordering. So are we ordering the values that are there? Or are we checking the order of the result of calling abs on these? So abs one is one, abs negative three is three, abs four is four, one, three, four are ordered. So this would be true using a key function abs.

We're using this in much the same way that key is used for sorted or min or max. We'd have to add in a second argument. By default, it just has the identity function. But if you pass in abs, then that's the condition we should check. Is it the case that abs s.first is greater than abs s.rest.first? Well that would handle the absolute value case, but we want this to be generic enough to handle any possible key function. So we just replace abs with key.

That means by default it will take the identity function, but if you want it could take the abs function instead and apply that. All right, let's look at the next one. Merge. Return a sorted list with the elements of sorted s and t. So when I merge together a and b, one five and one four, then I get one one four, five. If s is link.empty, then the merged result should just be everything that's in t. If t is link.empty, but s is not, then I think the merged result should be everything that's in s. Now we know that there are elements in both s and t. So we can compare s.first and t.first.

If they're equal, it doesn't really matter what order you put them in. So we'll just put less than or equal, but we'd be equally correct if we put less than. And here we're going to create a new linked list that starts with the smallest element, s.first, and is followed by the merged version of everything else in s and everything in t. This result has everything in s. There's the first and there's the rest, and it has everything in t. Otherwise, if t.first is the smallest element, then that's what should be the first element of the result. We still need all the elements in s, and we need the rest of t as well. And what about merge in place? The idea here was that we started with a and b, we called merge in place, and we got all of the elements in a and b in sorted order, but we never call link. Well, in fact, the implementation is almost the same as this.

The base cases are the same, but instead of calling link, what we need to do is change s, so that s.first is not the same, but s.rest is. What would that look like? Well, instead of returning a new link, we're just going to return s, but we're going to change s.rest to have everything in s.rest and everything in t as part of it. And likewise, if t has the smallest element, then that's the one we're going to return, but we're going to change its rest to make sure that it contains everything in s and everything in t's rest. Let's see how we did. Our doc test passed, and so we've played around a little bit with linked lists.

## 26. Part p26 - Lecture 28 - Scheme

So far, you've learned about functions and data, much the essence of programming. In fact, you've mastered the fundamentals of the Python language. So it's time to move on to a new language, Scheme. And by learning Scheme, we'll see that many of the ideas learned about one programming language easily transfer to another. And Scheme is an older language that was very influential in the creation of Python.

So we understand it for its history, its beauty, and also to see which ideas transfer from one language to another naturally. And we'll find that that's many of them. Scheme is a dialect of a language called Lisp. And Lisp is one of the two oldest programming languages that's still used today. And it's certainly the oldest one that's rapidly growing because more and more people keep getting excited about using Lisp for new applications.

What are people saying about Lisp? Alan Kay, the inventor of object-oriented programming, said that it's the greatest single programming language ever designed. My favorite sci-fi author said that it's the only computer language that is beautiful. And Brian Harvey once told me it's God's programming language. Even XKCD seems to love it. Lisp is over half a century old and it still has perfect timeless air about it.

I wonder if the cycles will continue forever. A few coders from each new generation rediscovering the Lisp arts. These are your father's parentheses. Elegant weapons for a more civilized age. So, hopefully that gets you excited about learning a new programming language. The beauty of Lisp is its simplicity. The entire language can be learned in a day. And yet, it can be used in order to build programs as complex as the ones we've seen throughout this course.

Or much more complex than that. Here are the fundamentals. Scheme programs consist of expressions. Which can be primitive. Such as 2 or 3.3. Or true or plus is a primitive expression. Or quotient, which does division, etc. And there are combinations. So, a combination looks like an open parenthesis. And then some other expressions. And then a close parenthesis. And in this way, we can express the quotient of 10 and 2.

Which is 10 divided by 2 is 5. Or we can express through combination that not true is false, etc. So, numbers are self-evaluating. But symbols are bound to values. Call expressions look like combinations. And they start with an operator. Followed by 0 or more operands. All in parentheses. So, this is a little different than the syntax of Python. Normally, we'd put the operator outside.

But here, we're putting it inside. So, let's look at some examples. If at the Scheme prompt, I type open parenthesis. Quotient 10, 5. Sorry. 10, 2. Close parenthesis. Then I get 5. Quotient names the built-in integer division procedure. In Python, we call things functions. In Scheme, they're called procedures. But they're fundamentally the same thing. You can nest call expressions. I could say, what's the quotient of the result of adding together 8 and 7?

Well, that's 15. Divided by 5 is 3. And if I want to, I can spread these call expressions across multiple lines in any way that I see fit. Here's a typical way to use indentation just to make the expression clearer. So, this says I'm going to add two things. The result of this sub-expression and the result of this sub-expression. And that's why they're indented to the same level.

Now, the Scheme interpreter doesn't care about indentation at all. These are here in order to make the program as readable as possible for people. So, combinations can span multiple lines. Spacing doesn't matter. Going to new lines doesn't matter. All that matters is that you close the parentheses that you open. The way to read this is to say that we're adding together two things.

The first is a product of two things. The first of that is 3. And then we need to add together what you get when you multiply 2 and 4 is 8. And you add 3 and 5, that's 8 again. So, summing that together is 16 times 3 is 48. Okay, what about down here? Well, I subtract 7 from 10 to get 3 and I add that to 6.

So, I've got 9. 9 plus 48 is 57. So, this whole expression would evaluate the 57. Let's do some more demonstrations. Here's a scheme prompt. I can evaluate 2. I can evaluate the sum of 1, 2, 3, and 4 is 10. What happens if I add together nothing at all, do you think? 0. I can multiply 1, 2, 3, and 4 to get 24.

Or I could multiply together nothing at all. 1. Okay.

So, I can multiply together 2 and 2 and 2 and 2 and 3 and 3 and 3. Oops. To get 864. And I can nest this. So, if I then want to, let's say, subtract 1. I would do it by surrounding the whole thing in parentheses. Placing a new operator at the front. And I can not only subtract, but I can also divide, add, or multiply again.

Anything I want to do. And the result will be computed using the normal call expression procedure. Where first I evaluate the operator and operands, and then I apply the procedure to the arguments. So, it's the same story as evaluating Python, but this time we put the parentheses in slightly different places. In addition to these arithmetic procedures that are built in, such as plus, there are also various other procedures built in.

I can ask whether something's a number. 3 is a number. Plus is not a number. I can ask whether some number is 0. 2 is not 0, which is why we get false. But 0 is 0, which is why we get true. So, if I actually subtracted 2 from 2, I would end up with 0, which is true. And we can also evaluate whether something is an integer.

2.2 is not, but 2 is. Now, these question marks are just part of the name. The name is integer question mark. And the reason the question mark is there is that it's supposed to help you figure out what the procedure does. So, just like in any programming language, we'd like to use names that help remind us of what things are going to do.

And this integer question mark name is a good reminder that this is something that returns false or true based on what its arguments are. So, how am I executing all of this scheme code anyway? Did I download something? Well, you certainly can download an interpreter or find an online one embedded into a webpage. We'll give you pointers to both. But in this case, I haven't been using either of those.

Instead, I've just been using the implementation from project 4 of this course. So, in project 4, you'll build a Python program that implements a scheme interpreter. Once you run it, you're able to evaluate scheme. And you'll do that by actually writing the code that executes the different procedures that are required in order to execute scheme procedures. And this is called an evaluator.

So, one of the purposes of learning this new language is to learn a language that we can then understand how to build an interpreter for. We haven't learned all of the scheme language yet. We only know about call expressions so far, but there are other types of expressions. So, they're called special forms. A special form and scheme is any combination. That's not a call expression.

For instance, there's an if expression, which has a particular syntax. So, it looks just like a combination again. Except for it has this special keyword, if, as the first sub-expression. And then it has a predicate, a consequent, and an alternative that are all expressions. In order to evaluate this, we first evaluate the predicate expression, and then we pick, based on whether it's true or false, whether to evaluate either the consequent or the alternative.

So, the consequent is like the suite of the if statement, and the alternative would be the suite of the else clause in a conditional statement in Python. And, and or are also special forms, because while they have a bunch of different expressions that we're going to combine logically, they might not all get evaluated. Because you can figure out whether the and of a bunch of things is true or false without evaluating some of them.

You can look at the details of that when you do your project, which will involve building a scheme interpreter. An important special form is how we bind new values to symbols. And that's with define. So, we define some symbol to be the value of some expression. In order to do that, we evaluate the expression and then bind it to the symbol. So, if I define pi to be 3.14, then I can use pi the symbol in future expressions.

So, the symbol pi is bound to 3.14 in the global frame. Yes, Scheme uses the same model of environments that we've been using in Python. You can also define a new procedure with a define expression that has a slightly different syntax. So, you know you're defining a procedure when after define there are parentheses. And this combination is not a call expression. Instead, it gives the name of the new procedure and then its formal parameters.

And then after that we need the body. So, how does this look? Well, an example is that we can define the absolute value procedure. Which takes in some argument we will call x. And every time abs is called, it evaluates this body expression. Which says, if x is less than 0, then we return negative x. Otherwise, we return x. So, this is the predicate, consequent, and alternative of this if expression.

And if I take the absolute value of 3, I'll get negative 3, I'll get 3. Okay, so this creates a procedure and binds the symbol abs to that procedure in the first frame of the current environment. And since we're in the global environment, that's where it gets bound. Okay, let's define some procedures ourselves. So, we can define what it means to square something is multiply it by itself.

And then we can square 16 to get 256. We can define what it means to average x and y. Remember, it's okay to go to another line. It's totally up to us how we indent or space things out. So, let's say that this involves adding together x and y and then dividing the result by 2. So, you do have to be careful to close your parentheses in scheme.

Because we want to make well-formed combinations. So, that one closes the define. At which point, I can average 5. Oh, let's do 3 and 7 and we'll get 5. Now, in scheme, we already know how to evaluate call expressions. And call expressions can contain other call expressions. And it's okay to define recursive functions in scheme. In fact, they are everywhere. Let's build one.

Let's define how to take the square root of x. Oh, how do we do that again? Well, we have a bunch of updates. So, let's define an update function that takes a guess and then gives us a better guess if we need it. And what will that better guess be? Well, if it's the case that the square of the guess is already equal to the number that we're trying to compute the square root of, then we really don't need a better guess at all.

We better stop the recursion at that point. So, this is a base case. And we'll just return that guess as the value of the update because we're done. Otherwise, we need a better guess. And how do we get a better guess? Well, we'll update something that's even more useful than what we had before using the Babylonian method that was invented many thousands of years ago.

Where you can have a better update to the square root of x by averaging your current guess. And what you get when you define x by your current guess. Okay.

So, we'll close the divide. We'll close the average. We'll close the update. We'll close the if. We'll close the define. And in order to actually take a square root, we'll start with a guess of 1 and update that. And update will update it again until the square of guess is in fact x. Close the define. And now we can take the square root of 256 and get back 16.

So, we've used a lot of features of the language already. We have a square root defined here. Within there, we've defined update. And scheme like Python is lexically scoped. So, within the body of this inner function, we can refer to the name x, which is a formal parameter of the outer function. Lambda expressions create new procedures in scheme. So, lambda expressions evaluate to anonymous procedures.

They have the following special form, syntax. I say lambda, and I write down the formal parameters in parentheses, and then I give the body of the procedure. Lambda is very important in scheme. So, here are two different equivalent expressions that define a plus 4 procedure. And bind it to the name plus 4. I could just use the define procedure syntax that we saw before.

Or, I could just define that the symbol plus 4 is bound to the procedure that takes x and gives us back x plus 4. These combine however we want. Scheme is totally flexible. So, in a call expression, I could have an operator that's a combination itself. For instance, I could write, the procedure that adds x, y, and z squared should be applied to 1, 2, and 3.

To get 1 plus 2 plus 9 is 12. Now, I'll talk about three other special forms. These are going to be covered in lab and discussion. And they'll show up in homeworks in the next project. So, you'll get exposure to them eventually. But, I'll give you a preview now, just so that you know what's coming. First, we'll talk about cond, and then begin.

The cond special form, where cond is short for condition, is like having elif clauses. Or, a big if, elif, elif, elif, elif, else statement in Python. So, in Python, you can have one statement with multiple different clauses. And you can have as many elifs as you want, as long as you start with an if. And then there's this optional else at the end.

And you could achieve this same result, just using if in Scheme, by having that last consequent expression have another if in it. And its consequent have another if in it. So, you don't really need anything new. But, if you have a lot of elifs, then this nested if idea is kind of annoying. Which is why there's cond. So, here's a Scheme example that does the same thing.

Cond has, as the rest of its expression, a bunch of pairs. Where the pairs are the condition. And then, what to do if that condition is true. So, this says if x is greater than 10, then print big. Otherwise, if x is greater than 5, print medium. Otherwise, print small. Much like in Python, the else case is optional. But there can be only one, and it has to be at the end.

Both of these have the same property. That only one thing will be printed, no matter the value of x. So, if x is 12, it's both bigger than 10 and bigger than 5. But only big will be printed because x greater than 5 is the condition of an elif. That comes after the x greater than 10 that gets triggered first. And the same is true over here.

Now, a cond expression does have a value. So, if instead of printing, I just said that I want an expression whose value is either big, medium, or small, depending on the value of x, then I would write it like this. And I could do something with that value. For example, I could print it. Now, these two expressions are equivalent. They'll either print big, medium, or small.

But this one, I think, is shorter because it has only one print instead of three. So, that's cond. You can still use if. And usually what happens in practice is that if you're just choosing among two alternatives, then you use if. And if it's more than two, then you use cond. The begin special form combines multiple expressions into one expression. The value of a begin special form is just the value of its last sub expression.

And the reason begin is used is so that you can do things. For example, printing for a while or defining some symbols as particular values before you compute the result that you want. So, here's a Python case where within the suite for an if clause, I've printed twice. And likewise for the else clause. How do you do that in scheme? Well, you need begin.

You say, here are some conditions. The first of which is that if x is greater than 10, I want to both print big and print guy. But there's only space in scheme for one expression here. So the begin expression allows you to put as many things as you want as sub expressions. And they'll all get evaluated. And by the way, since there are only two alternatives here, it would be a little bit more natural to just do it with an if.

And you can indent however you want or go to new lines however you want. So here's an equivalent expression that just says if x is greater than 10, then print big and print guy. Otherwise, print small and print fry. And finally, we'll talk about let. Let is kind of like define, but it's different in that it only binds symbols to values temporarily just for one expression.

And then those bindings are gone. There isn't really an equivalent in Python. But we can talk about the difference just by showing a Python example and its scheme equivalent using a let expression and how they behave differently. Let's say you wanted to compute the hypotenuse length of a right triangle that has legs three and two plus two is four. So this would be a three, four, five triangle where this expression C should give us five.

Maybe in this program, all I really cared about was making sure that C was bound to five. But if I write this Python code, A and B are still bound down here as well. That could be a good thing. If you're going to use them again, that could kind of be a bad thing. If A was already being used before and now you've overwritten it, or you want to just have as few names as possible.

Here's how to achieve the same thing in scheme. But the difference will be that after we've defined C, A and B are not bound down here. They are only bound temporarily in order to compute the value of C. And then those bindings are gone. Here's how it works. We define C as the result of a whole let expression where the value of the let expression is what comes at the end.

In this case, the square root of A squared plus B squared. But before that, you get a chance to make temporary bindings. There's really just two parts to a let expression. The bindings. So here's where they begin and here's where they end. And then the value expression, which is here. And the bindings themselves are pairs where the first thing needs to be a symbol.

And the second can be any expression that will get evaluated in order to bind that symbol to a value. So it's like having a bunch of little defines here, except for the bindings for A and B go away as soon as you finish computing the value for C. And in scheme code of any like interesting size and complexity, let gets used a lot.

Usually in scheme, define is used for things that are really permanent. Like you want to define a new procedure so that you can call it many times. Or you want to define some constant like pi. Otherwise, most scheme code doesn't make a lot of definitions. Instead, if you need to keep track of some temporary information, you could use let to do that.

And this is mostly a stylistic convention, but it's one that has some nice justification, which is that you don't have to worry about defining anything that you don't need later. You can kind of just say, I want C to persist, but A and B were just temporarily there in order to compute C. And now we don't need them anymore. Let's look at an example of a scheme program that draws Sierpinski's triangle, using lots of the features of scheme that we've seen so far.

When you start scheme, you can immediately start adding numbers together. But there's also some built-in drawing facilities in the version of scheme that we distribute with the homework assignments for this course. So, for example, you can say, move forward 100. And this forward procedure tells a little turtle to walk forward 100 units. Let's rearrange a bit so that we can move the turtle some more.

Other commands include turning right by 90 degrees, going forward again, or in fact, you could also go backward. And the turtle can not only turn right, but also turn left. Now, all of this interacts with the scheme language that we've already defined. So, I could build a procedure to draw a line that moves forward 50. And then I can draw a line and another line and take a right turn.

I could also define a procedure that does something twice by doing it once and doing it again. So, if I twice draw a line, then it'll draw two lines. And all of this could also be stored in a file. Now, typically what you store in the file are the procedure definitions. So, there's what a line is. There's what twice is. Perhaps not just twice.

We'd want to repeat something many times. Repeat k times some procedure means calling that procedure. We're going to do it at least once. And if it's the case that k is greater than one, then we have to keep going. So, we'll repeat k minus one times using that same procedure. I could load all those by naming the file. Then I'll take a right turn to point ourselves down.

And we can repeat three times drawing a line. Or twice more, we could draw a line. Or we could repeat five times some custom procedure that we define using a lambda expression. Repeat takes a procedure of zero arguments. So, I say lambda takes zero arguments. And each time it's called, I'd like to go forward 50 and then take a right turn of 144 degrees.

Cool. Let's quit and start over so we get a fresh canvas. Now that I can repeat, I can draw, for example, a triangle. But I don't want a triangle that's just a boring old triangle that always has a line as its edge. I want an arbitrary edge. So, I'll use a function to define what it means to draw the edge of the triangle.

But the triangle always involves repeating three times, a procedure that first draws the edge and then takes a turn of 120 degrees. So, if I load this file and draw a triangle with lines as the edge, I'll get a regular triangle. But I'd like to draw Sierpinski's triangle. Let me tell you about Sierpinski's triangle. Sierpinski's triangle has some recursive depth, D, and also some side length, K.

It's a triangle, but drawing the edge of this triangle involves making a choice. If D is 1, then we just draw a line of length K. Otherwise, we draw a leg of Sierpinski's triangle with D greater than 1, which is going to be mutually recursive with this procedure Sierpinski that I've just defined. The leg also takes in D and K, but it does the drawing work.

And here's what it looks like. You draw Sierpinski's triangle, but half the size and with a depth of one less. Then without drawing a line, you move to the end of where this leg should go, which means you have to pick your pen up, go forward K, and then put your pen back down so you can draw some more of Sierpinski's triangle.

So, I'll quit so I can start fresh. Start with a 90-degree right turn. Set the speed of the turtle to zero, which is as fast as it goes. And then I can draw Sierpinski's triangle of depth 5 with side length 200, which will work much better if I actually load the file defining what it is. And then it will start to draw.

So, each little triangle you see is the base case. If D equals 1, then it just draws a triangle using a line. Otherwise, it builds a triangle out of Sierpinski's triangles. A Sierpinski's triangle is made up of three Sierpinski's triangles, each of which is made up of three Sierpinski's triangles. Each is made up of three Sierpinski's triangles, each of which is made up of three regular triangles.

We finally hit the base case. And of course, if I went back 200, then I could draw an even bigger one. But it's going to take a while. You're welcome to skip to the next video if you don't want to watch it draw. But some people like watching it draw, and so you're welcome to do that as well. Yes, right now it's redrawing Zerpinski's triangle where I drew it before.

The turtle doesn't keep track of what it's drawn before, and so it doesn't know that it's doing redundant work. But now, finally, it's completing the job. You'll notice after it finishes drawing the last little triangle, it's going to work its way back to where it started by completing all the pen up, forward, pen downs of all the different recursive calls along the way to creating this image.

## 27. Part p27 - Lecture 29 - Scheme Lists

Python has many types of built-in data structures, lists, tuples, dictionaries, sets, and more. Scheme has lists, and lists in Scheme are like the linked list class that we created in Python. Every Scheme list is a linked list. Lisp was created in the late 1950s, and back then, it seems, computer scientists really liked confusing names and acronyms. So, they invented a procedure called CONS, which is a two-argument procedure that creates a linked list.

Creating a linked list is only useful if you can access the first element and the rest of the list, and there are procedures for that as well. CAR is the procedure that returns the first element of a list, in Scheme, and CODR is the procedure that returns the rest of the list. There's also a built-in symbol nil, which evaluates to the empty list.

So, to create a linked list of length 1 containing the value 2, you would write CONS2 nil, which would build a CONS with 2 and the rest of it being nil. Oftentimes, that's drawn in this way, where the slash just means that the rest of this list is empty. Now, Scheme lists are displayed as parentheses with elements separated by spaces. There is this underlying linked list structure, but the standard way of displaying a linked list doesn't show that structure.

Instead, it just shows the elements. So, if I CONS2 nil, I build this CONS, and if I CONS1 and CONS2 nil, then I build this CONS, where the rest of the list is a list containing 2. But evaluating this expression in Scheme doesn't show me this structure. Instead, it just shows a list containing 1 and 2. If I define X to be a list containing 1 and 2, I can look at X and see the whole list.

The CAR of X is the number 1, and the CUDR of X is the list containing 2. If I CONS1, CONS2, CONS3, CONS4 nil, I'm building a structure that looks like this. But displaying it in Scheme looks like a list containing 1, 2, 3, and 4. So, all Scheme lists have a linked list structure. You access their elements using CAR and CUDR, but you display them as a list of elements.

Let's take a look at some more demos. Here, I'm going to load a web-based interpreter that we use for the course, because it will draw the linked list structure of any list that I create. So, if I define S as CONS1, CONS2, nil, S is a list that's displayed like this. But if I draw it, I'll see the linked list structure. And draw is not built into every version of Scheme, but it is built into this one so that we can see what's going on.

What happens if I CONS3 onto S? I'm allowed to do this. When I call CONS, the first argument can be anything. The second argument either needs to be another CONS or nil. CONS3S gives me a list 3, 1, 2. And CONS4 onto CONS3 onto S gives me the list 4, 3, 1, 2. Which, if I draw it, shows me that it has a linked list structure.

So, what if instead I CONS4, CONS3, nil onto S? Think about what this is going to display. I suggest you pause for a moment until you have some idea of the answer. I'm going to show you the answer in 3, 2, 1. CONS creates a list where this is the first element and this is the rest of the list. Since S has length 2, this CONS has length 3.

And the three elements are a list containing 4, 3, and then the number 1, and then the number 2. If I draw that structure, it will show me that it is a 1, 2, 3 element list with a list as its first element, and then a number as its second, and a number as its third. If I build this structure, and I look for its car, I will get the list for 3.

And it has a car, the number 4. Hopefully you're getting the hang of it. Let's try an even trickier one. Remember that S is a list 1, 2. What happens if I CONS S CONS S nil? Think about it for a second. Maybe pause the video. And I'll show you in 3, 2, 1. It's a list containing the list 1, 2, and the list 1, 2 as elements.

Drawing this one shows that they're in fact the same element twice. A list containing the list 1, 2, and the list 1, 2. Let's look at a few built-in functions related to lists. So if S is 1, 2, I can see whether that's a list or not. It is. And remember that sharp T is Scheme's way of saying true. Is 3 a list? No. Is the car of S a list? No.

Because the car of S is the number 1. Is nil a list? Yes.

It's the empty list. How can I tell the difference between the empty list and a non-empty list? I could use the null question mark predicate. And I can also build lists with the list procedure. List 1, 2, 3, 4 builds a list with contents 1, 2, 3, 4. Now it's still a linked list structure underneath. I can, for example, get the cudder of the list 1, 2, 3, 4.

And that will show me the list 2, 3, 4. If I had this cudder and I const 0 onto the front, then I'd have 0, 2, 3, 4. Lisp is well known for introducing the idea of symbolic programming, manipulating lists of symbols which represent things in the world as structured objects. So with Lisp, you could do more than just compute a number.

You could manipulate whole equations. And for this reason, Lisp was the standard language for artificial intelligence for many years, and was also the standard language for any kind of automatic manipulation of mathematical equations, such as symbolic differentiation or automatically verifying proofs. And there's just one feature in the language that makes this all possible, quotation. Symbols normally refer to values, but sometimes you can refer to the symbol itself.

If I define a as 1, then a is the symbol and 1 is the value. If I define b as 2, then I have a second symbol with another value. Now I can use those symbols inside of an expression, but the value that you get by evaluating this expression has no a's and b's in it. It's just a list containing 1 and 2.

So we've lost all notion of what symbols were used to create this value. This value has no symbols in it. But quotation allows the symbols themselves to be values. Quotation is used to refer to symbols directly. If I make a list where I quote the a and I quote the b, always with a single quote, and never with one at the beginning and one at the end, but instead just one at the beginning of whatever I'm quoting.

Then I build a list containing the symbols a and b. If I build a list with the symbol a and the value to which b is bound, I get a list that contains a and the number 2. So as you can see, these quotes weren't necessarily paired. You can have just one quotation mark inside of a larger expression, and it quotes whatever comes directly after it.

The quote is actually shorthand for a special form called quote, and so this would be equivalent to writing list quote, a quote, b. The special form indicates that the expression that is quoted is the value itself, as opposed to needing to evaluate that expression. Quotation can also be applied to combinations in order to form lists. So I can quote the list a, b, c, and that builds a list containing the symbols a, b, and c.

The car of that is the symbol a, and the coder of that is the list containing the symbols b and c. Let's try some more demos. Quoting a is the same as quoting a. I can use the value a in any way that I want. For example, placing it inside of a list, and I could do that using either syntax. The nice thing about the single quote is that it saves you a set of nested parentheses.

When quoting a list, you get a list. But all the expressions within it are quoted as well. Now another way to build that same list would be to say, give me a list of 1 and the symbol a. If I were to attempt to build a list of 1 and a, it would tell me that a is not a known symbol, because I've never defined it to be anything.

I can't evaluate a until I've defined it, but I can refer to a even before I've defined it, because it's just a symbol. It could mean something in the future, it just hasn't been defined yet. It's possible to quote a nested expression in order to build a list that has, as some of its elements, other lists. So perhaps try to figure out what is the car of the cudder of the car of the cudder of this quoted list.

You're welcome to pause the video. I'll show you the answer in 1, 2, 3. It's the number 3. The cudder is a list containing, as its first element, the list 2, 3. The car of that is the list 2, 3. The cudder of that is a list containing 3. And the car of that is the number 3. And we could have told exactly the same story if instead of numbers, these were all symbols themselves.

Let's try out some list processing procedures that are built in. Append lists the elements of two different lists all in one list. Or, if you pass in multiple lists more than two, you get one list with all the elements of each of the list arguments to append. Map calls some procedure f on each element of s, collects the results in a list.

Filter calls some procedure f on each element of list s, and collects in a list all of the elements of s for which f returns a true value. Apply is a little bit different than map. It applies the procedure f to s as if that s were the list of arguments to f. So, f only gets called once on all the elements of s together.

Okay, let's quickly try each of these out, and then we'll work on an example. So, if I have a list s, cons 1, cons 2, nil, then appending s to itself just gives me the elements 1, 2, 1, 2. And I can append s a bunch of times in order to get all of the values in s, s, s, and s, s.

Which is quite different than what you get if you list s four times, then you get a nested structure. If I call map with the even predicate on all the elements of s, then I find out that 1 is not even, but 2 is. And of course, I could map some procedure that I create on the fly. 2 times x has to be written like somebody's programming in scheme.

Go over all the elements of s and you get 1 times 2 is 2, and 2 times 2 is 4. Filtering for only the even values in s gives you just the results in s that are even. So if I said 5, 6, 7, 8, 9, I would get just the 6 and the 8. If I ask which of these elements are lists, the number 5, the list 6, 7, the number 8, and the list containing only 9, then I'll find that the list elements are the list 6, 7, and the list 9.

If I wanted to put 5 on the front of each such list, I could map the following procedure. For each list, I want a cons of 5 onto s, and then I'd get 5, 6, 7, and 5, 9. And then the last list processing procedure I mentioned is apply. When you apply some procedure like quotient to arguments, 10 and 5, then it divides 10 by 5.

Or if you apply plus to 1, 2, 3, 4, then it's as if I had applied plus to 1, 2, 3, and 4. Notice this is quite different than mapping plus over 1, 2, 3, 4, which is the same as making a list of plus 1, plus 2, plus 3, and plus 4, but that doesn't sum them up, whereas applying plus to a list does sum up the elements, and so you don't need a separate sum procedure in scheme because you already have plus.

Let's define a procedure that uses some of these list processing procedures in order to find the even subsets within a list. What are those? Well, let's say that a nonempty subset of a list s is a list containing some of the elements of s. It's nonempty. It could contain all the elements of s, or just a few of them, but not none of them.

And let's say they stay in the same order that they appeared in s. With that definition, we can say what we're after. A procedure that takes in a list s and gives us back the nonempty subsets of that integer list s that have an even sum. So when I call even subsets on 3, 4, 5, 7, it tells me all of the nonempty subsets.

Like here's some of the values in 3, 4, 5, 7, 5, 7. But it only shows me the ones that have an even sum. So 5 and 7 sums to 12, 4, 5, 7 sums to 16, but nowhere here do we see 3, 4, which would sum to 7 because 7 is an odd number. So how are we going to define this procedure?

Well, here's one approach. The even subsets of s include all the even subsets of the rest of s, as well as the first element of s, followed by an even or odd subset of the rest. What do we mean by even or odd? Well, it depends on the first element of s. If the first element of s is even, then you want an even subset, because if you add two even numbers together, you get an even number.

If the first element is odd, you want an odd subset. So that when you add two odds together, you get an even number. And our goal is to find even subsets. There's one more case, which doesn't involve the rest of s at all. It turns out that a subset of s that's even is just the first element of s, if that's even.

Okay, let's try this version out and write some code. The even subsets of s. Well, if it's the case that there are no elements in s and there are certainly no non-empty subsets, with that base case, we can now append together the three different sources of even subsets that we saw on the previous slide. One was the even subsets of the rest of s.

The second was a whole list of subsets where they all start with the first value in s. So what we're going to do is map a procedure which takes some existing subset, let's call it t, and conses on the car of s to t. Now, we said in the slide that what we want to cons it onto is either an even subset or an odd subset, depending on if the car of s is even.

When it's even, we need even subsets. When it's odd, we need odd subsets. So that takes care of the second case, except we're going to have to define odd subsets in a minute. The third case was creating a one element even subset only if the car of s is even. So this last thing we're appending is either going to be nothing if car of s is odd or one thing if it's even.

How do I write that? Well, it's just another if. If even car s, then I need to put that one thing into a list. And what is that one thing? A list with one element, the car of s. Now how do I say append nothing? Well we're already inside an append, so we could just put nil here to say there's nothing left to append.

So that looks great, just as long as I can get the odd subsets, which I'll get by changing all the evens to odds in this code, except we need to look carefully at what happens when we're consing the car of s onto t. If it's odd, then how do I make a new odd subset? By adding an odd number, well I have to add it to an even number.

Otherwise, if it's even, I need to add it to an odd number in order to get another odd subset. So let's see how we do it. What are the even subsets of 3, 4, 5, and 7? That looks even, that looks even, that looks even. I can't think of any that are missing, so maybe we should try something a little longer. And here we see that there's either zero or two odd numbers in any one of these, but there's never just one odd number, because that would give you an odd subset.

We can get all the odd subsets, because we defined that too. How do we know the sums are odd? Well, we could just map a procedure over all of them that applies plus to that s and see whether these sums really are odd. Looks all odd to me. Now the only thing left to do is deal with the fact that I copied and pasted so much code.

In fact, this chunk is identical to this chunk, except for this says even and this says odd. I think a higher order function could fix that. We just define some subset helper that uses even in this case, and I think it needs access to s. And here we want to use a version of subset helper that takes odd instead. Now what is subset helper?

Well, it's just this code that we already defined. Subset helper takes in some f and some s and builds a list that contains everything here, except we call f instead of odd, and everything here, except we call f instead of odd. Let's check our parentheses and see if we got the same result as we did before. Looks good to me. Let's see if we can find a simpler way to list out all the even subsets of an integer list s.

Remember, a non-empty subset of list s is a list containing some of the elements of s, and we're interested in the even ones. Well, we could get a non-empty subset of integer list s that have an even sum just by filtering all of the non-empty subsets of s. So here's a definition of the non-empty subsets of s. It looks a lot like the even subsets code we already wrote.

We're appending together three lists. The rest, what you get when you cons, the first element of s onto everything in the rest, and then a list containing just one element, which is a list containing just one number. What would this rest be, and then how would you filter that list of all non-empty subsets just to get the ones that have a sum, which is even?

Well, starting up here, the non-empty subsets of s include the non-empty subsets of the rest of s. Down here, we need to check whether each element is even, and since each element is a list, we need to first sum it, and then check whether that result is even, which you get by defining a new procedure, which calls even on the result of applying plus 2s.

Treating all of these as arguments to plus gives you the sum, which is either even or odd. You can filter for the even ones and define the same even subsets procedure that we did before using filter, and now the code's a little bit simpler.

## 28. Part p28 - Lecture 30 - Calculator

Programming languages often have some mechanism for indicating that an error, or some kind of exceptional event occurred, and then a mechanism for handling those errors and describing what to do next. In Python and many other languages, those are called exceptions. You can raise an exception to indicate that something exceptional has happened, like an error has occurred. Python exceptions are raised with a raise statement that says raise and then has some expression which evaluates to an exception.

This expression must evaluate either to a class or an instance. The class has to be a subclass of a base exception, which is something built in, and the instance has to be an instance of some kind of exception class. Exceptions are constructed like any other object. So there are different classes, many of them built in, such as type error and name error.

And then to build a particular type error just involves passing in a string that describes what happened. So here's the kind of error that occurred, and here's the specific detail. And there are type errors that aren't commonly raised when a function was passed the wrong number or type of arguments. Name errors are raised when a name wasn't found. A key error when a key wasn't found in a dictionary.

There's even a recursion error when you make too many recursive calls. So all of these error types are built in. These exceptions get raised automatically in certain settings, but we can also raise them ourselves. Let's check it out. So in Python, if I take the absolute value of 3, it's not an error. But if I take the absolute value of hello, a type error has been raised.

It says type error, bad operand type for abs str. It turns out that I can also raise a type error any time I want. Now this type error doesn't have a description, but if I raise a type error with some message, such as, very bad idea, then that's exactly what I'll see in the message. Therefore, I could write my own function, double x, if it's the case that x is a string, then I might want to raise a type error.

And I can describe it however I want. Double takes only numbers, or whatever. And then I'll return 2 times x. Why would I ever write such a thing? Well, 2 times hello does work in Python, but if I want my implementation of double not to work on strings for some reason, then I can double 4 and it works fine, but when I double hello, it doesn't work.

It says double, takes only numbers. The other kind of errors that are raised automatically are, for example, a name error, a key error, and a recursion error. When I call f, it calls f, which calls f, which calls f, and reaches a recursion error, because I have too many recursive calls. The reason that exceptions have types is both to help describe what happened when you see an error message, but also to create the capacity in the language to handle exceptions and continue running the program.

By default, if an exception occurs, the program halts, shows an error message, a traceback, and then it's up to the programmer to figure out what they want to do next, change the program, and run it again. But maybe you want to write a program that keeps going even after an error occurs, and the way to do that is to use a try statement to handle exceptions.

A try statement has try, and then some block of code, anything you want, and then paired with the try is an except line. You can even have more than one except line. And the except describes a particular class of exceptions that are handled by this try statement. You can even give a name to the exception itself. And then there's a suite, which is a block of code describing what to do when this kind of error occurs.

The way try statements work is that the try suite is executed first. If there's no error, it's done. But if during the course of executing the try suite an exception is raised and it's not handled otherwise, and if the class of that exception inherits from the exception class that's described here, then the except suite is executed and the program doesn't necessarily halt.

If the except suite just says, you know, print out an error message but keep running, that's exactly what will happen. And the role of this name is to give a name to the exception object, which sometimes is useful because then you can print it out. Exception handling can prevent a program from terminating. So if, for example, you say try to divide one by zero, but you accept that if a zero division error occurs, you don't want to have the program halt.

You just want to print out that it's handling a zero division error and assigns x equal to zero after that, then x will be bound to zero, even though this line appears later than this line in the program, which raised the zero division error. So this is displayed because of this print call, and this assignment is because of x equals zero, and we never saw any kind of multi-line traceback because the exception was handled.

So let's try out another example. Here's invert, which is a function that takes x. It computes the result, one divided by x. Now if x was zero, then this line will never be printed. Right? Because it'll never get that far. And then let's have it return the result. This program's just fine. I can invert two to get 0.5, and this is printed because x was two, not zero.

But if I invert zero, then an exception is raised. This was never handled, and this line was never printed. But then I can write another function, invert safe. And what invert safe is going to do is take x, but then try to invert it. So it will try to just return the result of inverting x. But in the case that there's a zero division error, we'll give that error a name e, and how about we would just return a string version of e.

With invert, if I say a equals invert two, then a is defined. But if I say b equals invert zero, then b never gets assigned at all. But invert safe is different. If I say a equals invert safe two, then a is bound to one half. If I say b equals invert safe two, sorry, zero, then there was no error displayed. b was instead assigned to the string division by zero.

And why did that happen? Well, that's what the code says. It says try to invert x. If it doesn't work out because the zero division error was raised, then invert safe should not cause an error to be bubbled up until the program halts. Instead, it should handle that error right here and return a string instead. And if instead of returning that string, you had it return the number zero, then we get even different behavior.

a would be bound to one half, and b would be bound to the number zero, because that's exactly what invert safe returns in the case that inverting doesn't work out. That's how exceptions work. And they're particularly useful when your program is handling input from a user or from the internet that might not be the right format or might not have the right properties.

And so errors might occur, but you might not want your program to just halt. You might want it to just, you know, print out the error and keep going or use a default value like in this case. Let's look at an example of where we might use exception handling. This is an important higher order function called reduce. Reduce is there to reduce a whole sequence of values to a single value.

Here is a description of the reduce function. There is a built-in version of reduce in the iter tools module, but we can also write our own. It takes a function, a sequence, and an initial value, and combines the elements of the sequence pairwise using the function, which takes two arguments, starting with the initial value. For example, if we reduce using multiplication 2, 4, and 8 starting with 1, that's the equivalent of multiplying 1 by 2, multiplying that result by 4, and then multiplying that result by 8, which gives us 64.

So f is a two-argument function. S is a sequence of values that can all be the second argument to that function f. An initial has to be a value that can be the first argument. The last constraint is that the return value of f must also be able to be the first argument to f, because when you call f, you're going to pass that value right back into another call to f.

If we reduce pow, 1, 2, 3, 4, starting with an initial value 2, what will happen is that we'll raise 2 to a progressively larger power. So we start out by raising 2 to the power of 1, which gives us 2. We then raise that 2 to the power of 2, giving us 4. We then raise 4 to the power of 3, giving us 64.

And 64 to the power of 4 is all of a sudden a very large number. So that's what it means to reduce. We'll end up getting 16 million just by raising 2 to the first, and then the result to the second, then the result to the third, then the result to the fourth. Let's implement this function. Reduce takes f, a sequence s, and an initial value.

The point is to combine elements of s using f starting with initial. And the example that we looked at was to reduce using mol, 2, 4, and 8, starting with the number 1, and that's supposed to give us 64. Or, for instance, we could reduce using add, 1, 2, 3, and 4, starting with 0, and that would give us 10. From operator, import, add, and mol, the simplest implementation I could think of is to say, for x and s, initial equals f of initial and x, and then we return initial.

That passes the doc tests. We could also write this recursively. So for instance, we'd write if not s, so it's empty, then we'll just return initial, there's no more work to do. Otherwise, we get the first and the rest of s, and we return the result of calling reduce on f, the rest of s, and then updating initial to be f of initial and the first value.

That passes our doc tests as well. Now, how would we use reduce? Well, for instance, let's say we want to write a function divide all, which takes a numerator and a sequence of denominators, and divides the numerator by all the denominators. Let's just reduce, or we reduce with a division function, all of the denominators starting with the numerator. So, we can call divide all on 1024 as our numerator, dividing out 2 and 4 and 8, and the result will be 16.

That's what's left over when you divide by all of these numbers. Now, what if there's a zero in the middle of this? There's a zero division error. And let's say that's not what we want divide all to do. What we want it to do is compute the result of dividing by all the d's, but if there's ever a zero division error, we'd like to instead return infinity.

That's how you get infinity in Python. So, in our new implementation, we get inf, or infinity, in that case, but we still get 16 there. The advantage of using error handling in this way is that our implementation of reduce doesn't need to know anything about zero division errors. Instead, we write a function where we know we're calling reduce with another function that may raise a zero division error, and so it's this function that knows what's getting passed into reduce that handles the error.

Therefore, we've created a separation of concerns. Divide all knows all about dividing. Reduce knows all about reducing, but reduce has no knowledge of what dividing does or what errors it causes, and divide all doesn't really need to know how to combine elements. It just knows it needs to call reduce. We're now going to shift our focus in this course to talking about programming languages and interpreters, where an interpreter is a program that takes as input the code written in a programming language and executes that code in order to create the behavior described by the program.

And there are many different programming languages that have been invented over time. And so far in this course, we've talked about Python a great deal, and Scheme a little bit. I taught you about Scheme for two reasons. One, it's a delightfully useful, simple, and effective programming language that still gets used today, even for new projects. And it's a dialect of Lisp, which is used even more broadly, either as a standalone application development language or as an embedded language that implements part of a program that also uses some other language.

But the second reason is that it is a programming language that's very powerful, but has few rules. And so you will be able to build an interpreter for the Scheme language by writing down a Python program that describes all of the rules of interpretation for the language. And interpreters bring together many ideas in this course. Programs are trees. And the way interpreters work is through tree recursion.

Expressions often have lists of sub-expressions. The input to an interpreter is another program, which is kind of like a higher order function. And interpreters can be modular and extensible. Part of your interpreter program will describe how interpretation works generally, and another part will encapsulate all the details of how the different parts of the language actually execute. So with that introduction, let's talk a little bit about programming languages.

A computer typically executes programs written in many different programming languages. There are what are called machine languages. In machine languages, the statements are interpreted by the hardware itself. Computers have a central processing unit, which can execute a fixed set of instructions, and has a limited availability of its own memory, and then ways to access more memory in the caches and main memory and disks of the computer.

But to extend a machine language, you actually have to change the circuitry of the computer, which does not happen very often. These languages are hard to program in. Operations refer to specific hardware memory addresses, and there's basically no abstraction mechanism, no way to give things names, and no way to implement procedures or functions. That's all left to high-level languages, which have statements and expressions that are interpreted by another program, or they're compiled into another language.

Interpreting involves reading the program and executing its behavior, while compiling involves translating it into another language, such as a machine language, so that it can be executed later. And many modern languages do a mixture of both of these, compiling parts just in time in order to be executed, as if they were being interpreted interactively. But those details you can worry about in a later course.

The important part is to know that high-level languages provide means of abstraction, such as giving names to values and functions and objects and classes. That's all part of high-level languages. Now, people describe different levels of height. Some languages are higher level than others. But those details you could try to study in later classes. The important thing to know is that there isn't a piece of hardware in your computer that was designed for Scheme or Python.

Instead, machine language code needs to actually execute all of the behavior, and an interpreter or compiler in between the high-level language like Python or Scheme and the low-level machine language needs to implement all of these means of abstraction. But it's very common that high-level languages will be built on top of other high-level languages. A machine language might be used to implement a compiler for the C language, which is a high-level language used to build the interpreter for Python, for example.

High-level languages are easy to program in because they provide means of abstraction, and they also abstract away certain system details so that you can write the same program and have it run on different machines made by different hardware manufacturers or run inside different operating systems created by different companies or organizations. In Python, what happens is that it's actually compiled just before it's run into something called Python 3 bytecode.

You can see this bytecode using the DISS module that's built into Python, and then there's an interpreter that runs this lower-level language, which is quite similar to a machine language but also abstracts away some system details. So the story of how a program in a programming language gets executed can be kind of complicated, but the distinction between what your machine can execute and what you as a human tend to write is an important one.

Everything we've learned in this course is about high-level languages that are used to build software today. Sometimes people invent new programming languages. A powerful form of abstraction is to define a new language that is tailored to a particular type of application or a particular problem domain. For example, there's a programming language called Erlang that was designed for concurrent programs. How is it the case that people can use ATMs all around the world and the balance of their bank account is stored in some particular place, but if you try to withdraw money from two different ATMs in two different cities for the same bank account at the same time, there's no way to trick it into paying you twice.

That's the kind of concurrent communication problem that would benefit from having a specialized programming language. And Erlang is also used, for example, to implement chat servers with many simultaneous connections where lots of people are talking to lots of other people and the program has to keep it all straight. Another problem-specific language is the MediaWiki markup language, which was designed for generating static web pages that you see on Wikipedia.

It has built-in elements for formatting text, linking one page to another, and stitching together multiple pages into one so that a large page can be broken out into modular components. It's a programming language, perhaps not as full-featured as Python or Scheme, but it still needs an interpreter or compiler in order to be used to generate the Wikipedia pages that people read. A programming language has a syntax, which is the description of all legal statements and expressions in the language.

So that's the form of the language. And then also the semantics, which is the execution or evaluation rules for all of those statements and expressions. The meaning of the language. And these two together give you a programming language. To create a new programming language, you either need to write down a formal specification as a document that describes the precise syntax and semantics of the language, or you need to build an implementation of an interpreter or compiler for the language, which serves as the reference to describe the syntax and semantics.

Any input into the canonical implementation that doesn't cause it to crash would be legal syntax, and its behavior would define the semantics. Scheme is a language that started with a specification, and an implementation of the interpreter came later. Python began as a canonical implementation, and then a formal description of how it works was developed over time based on that implementation. Most programming languages that are used in practice for large communities have both a specification and an implementation.

To interpret text as a programming language, you first need to parse that text into some structure that makes it easy to perform interpretation. We've seen that scheme code is fundamentally tree-structured. It has expressions within expressions within expressions. But the way it's typed out is with a lot of parentheses in a row. It's just text. And parsing is the process of converting that text into an expression tree so that the code can be evaluated according to the rules of the language.

Since a scheme program just looks like a scheme list, with parentheses and symbols and numbers and such, we're going to write a program that reads scheme lists and converts them into a representation of those lists that has the right structure, the first element and the rest of the list. But we're going to do this in Python. A scheme list is written as elements in parentheses, but the internal structure of this is that there's some first element and the rest of the list.

Each element can be a combination or a primitive, and so I could have a scheme list that looks like this. The symbol plus, another list with the symbol times, with the number 3, with another list, etc., etc. The task of parsing a language involves coursing this string representation, which is just full of spaces and stars and pluses and numerals, into an expression.

And in scheme, an expression is just a scheme list. So there's a Python program called Scheme Reader, which you'll have a chance to implement part of, but let's talk about what it does. It takes in text, like 1, 2, 3, and gives you back an expression. Now that expression can be made out of just numbers, or it can be made out of pairs.

A pair is what you get when you combine the first and the rest of a list. So the pair class is really simple, just has a first and rest attribute, but what's interesting about the pair class is that when you create a nested pair, pair 1, pair 2, nil, like a linked list, and you print it out, you see how Scheme would write it.

So if I write 1, 2, 3, I get an object, which is a pair. Its str string is the scheme representation of this list, 1, 2, 3, but its repr is how we're going to represent it in Python, as a pair with 1, followed by a pair with 2, followed by a pair with 3, and nil. And what is nil? Well, actually there's a nil object, which is just an instance of the nil class, which has a repr string nil, and a few methods defined on it, which you can learn about when you work on your project.

Scheme Reader is a program that takes parentheses and numbers and gives you some nested pairs, but it does it in a very flexible way. So if I want to put 1 and then 2 and 3 into a structure, then it knows that this is a list within a list, which represented using linked lists, which are pairs, means that you have an element 1 and an element which itself is a list.

And therefore we can represent Scheme code. Now you might think the str is always the same as whatever you type in at read, but that's actually not true either. What's happening is that it's going through what might span multiple lines, might have all kinds of crazy spaces in it, and might even have numbers that are multiple characters long, like 4.5, and maybe there's 6, 7, 8.

And if I close the parentheses correctly, like that, it's going to put it all together into one nested pair, and then this str string is just what you get when you print out this nested pair structure. So Scheme read has to know that when you have 4.5, that's really all one number, not two different things. But when you have two parentheses in a row, those really are making two different pairs.

And that process of going from this text to this structure is called parsing. So this thing is a Scheme list with the first and a rest, and that's exactly the structure we're building. Parsing actually has two parts. It takes text, it returns expressions, but it does so by first performing lexical analysis in order to get a sequence of tokens, and then syntactic analysis in order to get an expression.

The original text, for example, can be three different strings on three different lines. But the job of lexical analysis is to convert each line into what are called tokens, which are individual strings and numbers representing atomic units within the programming language. The interesting one here is that two and three are combined together into the number 23, even though there's no... However, even though there's no space here, the closed parenthesis is part of a separate token.

And that's just a fact about Scheme and how it works. Also, the extra white space is discarded in the token representation because it doesn't matter. 5.6, the lexical analysis knows, is another way of writing down a number, and so it becomes its own token. This is an iterative process that checks for malformed tokens, determines types of tokens, and processes one line at a time.

This is not something you'll ever have to write. Instead, we've written it for you. And if you ever want to try out the tokenizer, you can type in some string, one, two, three, four, and it will tell you that those are two different tokens. Or if you have parentheses within parentheses, then it will tell you that each parenthesis is a separate token, but these 1.2 all goes together as part of one number.

Then syntactic analysis puts this into a tree. That's what we just saw. Some pair that has pairs within it that represents the entire Scheme list that is this block of Scheme code. This is a tree recursive process that tries to balance the parentheses and returns a tree structure. Instead of representing it as a Python tree class, we'll represent it as a pair class.

But since pairs represent lists that contain other lists, you can think of it as a kind of tree. And it does process multiple lines by combining things together until it finds a closing parenthesis that matches the opening parenthesis. Syntactic analysis, which is an interesting problem to try to implement, identifies the hierarchical structure of an expression, which may be nested. It does so by calling a function SchemeRead that consumes input tokens for exactly one expression.

It has a base case, which is symbols and numbers, and it has a recursive call, which is that whenever there's a sub-expression, it calls SchemeRead on it to combine it into an expression, which then can be placed into a larger expression. So calling SchemeRead on this sequence of tokens starts at the beginning and isn't going to return until it finds the parenthesis that matches that one.

So it recursively calls SchemeRead to figure out that that's a simple base case of plus, that's a simple base case of one, but the next call to SchemeRead is actually going to read a whole sub-expression. The next call to SchemeRead is going to read a whole sub-expression, and the original call to SchemeRead is done when it finds that the next thing is a closing parenthesis, which matches the opening one at the start.

This is something that you'll have to work out how to write, but there's a long description in the textbook about how to go about it, and I'd encourage you to spend some time learning how to write syntactic analysis for a parser. A Scheme syntax calculator is a Scheme interpreter that does not support many features of Scheme, but does include the arithmetic operators of Scheme, plus, minus, times, and divide, as well as call expressions, which can be nested.

An interpreter for this language is stormed in SchemeCalc.py, which gives me this prompt and allows me to actually add things together, and perform nested arithmetic, including on floats. So more than just reading this expression is happening now, that expression is being evaluated. So we're going to take a look at the contents of this file, which includes some examples and has only two functions, a function to evaluate an expression, and a function to apply a particular procedure to some arguments.

I can apply plus to 1, 2, 3 to get 6, and I could evaluate an expression such as plus 2 times 4, 6 to get 26. The calculator language has only primitive expressions and call expressions. The primitive expressions are always numbers, and the call expressions are combinations that begin with plus, minus, times, or divide. Expressions are represented as SchemeLists, which in Python are pair instances, and they encode the nested structure of each expression.

So an expression that looks like this would be represented using an expression tree and represented in Python as pairs that have the following structure. Now calculator semantics is pretty straightforward and matches exactly what Scheme does. The value of a calculator expression is defined as such. A number evaluates to itself, and a call expression evaluates to its argument values combined by an operator, where plus sums the arguments, times computes the product of the arguments, and minus and divide are a little more complicated.

Minus doesn't work if there's zero arguments. If there's one argument, it negates it, and if there's more than one, it subtracts the rest from the first. Divide, like minus, does something special with one argument, takes one divided by whatever the argument is, and if there's more than one, divides the rest from the first. So for example, I can divide 3, gives me 1 third, but if I divide 2 by 3, I get 2 thirds.

So here's an expression, here's an expression tree, and the evaluation process tells us that 2 times 3 is 6, 2 times 5 times 5 is 50, and the plus adds all of those together to form 61. Okay, enough talk. Let's actually implement this language by creating an interpreter for it. So the eval function evaluates an expression in the language represented as a scheme list.

It computes the value of an expression, and the value of an expression in the calculator language is always a number. The eval function itself is a generic function that dispatches on the type of the expression, whether it's a primitive expression or a call expression. So the implementation, the code, is actually going to be on the left, and then we'll match that up to the language semantics that we just introduced.

So here's the program. It says, calc eval is a function that takes in an expression. That expression will either be primitive or a call expression. If it's primitive, meaning the type is either an int or a float, then we evaluate it by just returning that same number. So a number evaluates to itself according to the language semantics, and here's the lines of code that actually implement that fact.

Otherwise, if it's the case that the expression is a pair, meaning it's a scheme list, then we get the arguments to the call expression by mapping the calc eval function over the rest of the list. Now what is this exp at this point? Well, it should be a list that starts with an operator, such as plus, and is followed by a bunch of other expressions that are the operand sub-expressions.

So evaluating each of those gives us all of the values that are the arguments that will pass in when we evaluate the operator. And then finally, we're going to call another function, calc apply, that takes the plus and applies it to the arguments. So a call expression evaluates to its argument values, and we get those argument values by recursively calling calc eval on each sub-expression, combined by an operator, and this is exp dot first as the operator, that gets combined with its arguments using some other function, calc apply, which we'll look at on the next slide.

So what are the important parts here? We have a recursive call, returns a number for each operand. So an operand sub-expression could be some complex expression, a call expression, but we reduce it to a number by calling calc eval. Calc apply does the work of figuring out whether we should add or multiply or subtract. Exp dot first is a symbol representing what operation to take, and the arguments will be a scheme list of numbers that we get by calling calc eval on each sub-expression.

Okay, the one part we've left out is calc apply. So the apply function applies some operation to a scheme list of argument values. In calculator, all the operations are built-in, and they correspond to these four built-in operators. In other programming languages that allow different kinds of abstraction, we might have to worry about user-defined operations and names for things, and we'll get there.

But for now, there's only these four things we can do. So here's the implementation. It just decides which operator we're looking at, and then carries out the combination method that combines the arguments in that way. So I've removed a bunch of the source code. We can look at the whole thing in a minute. But the basic structure is that calc apply takes in some operator, such as plus, minus, times, or divide, and some arguments, and then it does what it's supposed to do.

So for plus, it adds together all those arguments, starting with zero. For minus, it's either going to subtract all the rest from the first, or negate the first, depending on how many arguments there are, etc. So part of the language semantics says that plus sums the arguments, minus does something else, and times and divide, and all of those have corresponding source code in the implementation of calc apply. Okay.

So let's look at these. Calc eval, we saw almost all of the details of already. The only difference is that we call simplify in order to turn 8.0 into just 8. And we write out a string for the type error. Calc apply has more going on. So let's look at the whole thing. And at the same time, we can run some examples.

So if the operator is not a string, then we should complain. Type error 2 is not a symbol. If the operator is plus, then we reduce starting with zero and adding in everything else. If it's minus, then if there are no arguments at all, we should raise a type error. Otherwise, if there's only one argument, we should negate it. Negative 2. Finally, we reduce by subtracting all of the rest of the arguments from the first one.

So if I start with 10 and then I subtract 1, 2, and 3, I end up with 4. Multiplication just reduces the list of arguments using multiplication as a means of combination. And division is very much like subtraction. We can't divide nothing. We can invert a single argument or we can divide out of 1024 a bunch of numbers. And so dividing out to five different times gives us only 32 remaining.

Otherwise, we should say that something is an unknown operator. Question mark is an unknown operator. So we've covered all the cases here using CalcApply in order to do all the work of figuring out how to apply an operator. So there's just one important piece we have yet to cover, and that's the user interface for the interpreter. How should it behave? So interpreters typically have what's called a read-eval-print loop.

So the user interface for a programming language is this interactive loop where you enter an expression and then it gets evaluated. So here's the process of a read-eval-print loop. Print a prompt telling the user that the computer is ready for its input. Read text input from the user. Parse that text into an expression or statement. Evaluate that expression. If any errors occur, report those errors.

Otherwise, print the value of the expression and repeat printing another prompt. So that read-eval-print loop is a way that a person can interact with a programming language by typing expressions into its interpreter and seeing the values. And that's exactly what we're doing here. So as you can see, we type in an expression and it gets evaluated. What code is actually doing that?

Well, we have a read-eval-print loop which forever tries to read in some text from the user. And while there's more text remaining, it parses the expression using the scheme read function, which gives us back an expression represented as a scheme list, and then calls calc-eval on that expression in order to evaluate it and prints the result. Now, notice that print will only happen if there aren't any exceptions raised during calc-eval.

Because if there are exceptions, then this won't actually have a value. Now, throughout the program, we raise exceptions. Exceptions are raised within all aspects of an interpreter. Lexical analysis, syntactic analysis, eval, and apply. So, for example, when we reach the token 2.3.4, which is not a well-formed number, we might get a value error. Syntactic analysis is in charge of making sure that structurally our expressions are correct.

So having an extra close parenthesis will raise a syntax error saying unexpected token. Eval makes sure that we're only dealing with two types of expressions, primitive and call expressions. And so, for instance, it can detect things like noticing that there's an empty combination, which is not a number or a call expression. And then apply actually does quite a bit of error checking because it actually knows which operator is being applied and what are the rules for those operators.

So it can find that if there are no arguments to minus, we should raise a type error that says minus requires at least one argument. So in the version of calculator that we've built, all of these things apply. We get a value error, we get a syntax error, we can get a type error, and we can get a type error that tells me specifically for this operator that I've chosen, I need at least one argument.

And if you look at the source code, these are raised all over the place. So here's a raising of the type error. Here's another type error. But some of these are even in different files. And some of them will actually be raised by Python itself. So what happens if I divide one by zero? Then I'll get a zero division error, which is something that happens when you use the built-in division function that we're using to implement divide.

So divide is carried out by the built-in division or the built-in tru-div operator. And both of those are able to raise zero division errors when they run into trouble. Now handling exceptions happens all in one place in contrast to raising exceptions, which happens all over the place. So an interactive interpreter should print information about each error so that when those errors occur, the programmer who's generated them can figure out what should change in order to get rid of the error.

And a well-designed interactive interpreter should never really halt. It should stop evaluating the current expression and print out the error, but then give the programmer a chance to revise what they've done. So the user should have the opportunity to try again in the current environment instead of having the whole program crash. And that's exactly what happens here. So as you can see, I'm able to continue entering expressions.

The only way I can quit out of the scheme calculator is by pressing in my system control D, which says this is the end of the file. And then it will say calculation is complete. And finally, the program will end. Now how do we control for all this? Well, we put both the parsing and evaluation within a try statement that knows to look for syntax, type, value, and zero division errors, all the things that can occur, and just print those errors out.

And then since this is all embedded within the suite of a while statement, we'll go back and try again. So the only way to stop is to reach the end of a file or a keyboard interrupt, at which point it will print. Calculation is complete. Calculation is complete.

## 29. Part p29 - Lecture 31 - Interpreters

Let's talk about special forms so in the evaluation of a scheme expression we need to know what sort of expression it is calculator just divided expressions into numbers and call expressions but in scheme there are some other alternatives as well so the scheme eval function dispatches on the expression for meaning that it has just a bunch of different options of what it does depending on what sort of expression it gets symbols are bound to values in the current environment self-evaluating expressions are returned those are things like numbers and the empty.

List everything else is going to be a scheme list called a combination so we call it a combination just to say that it's a well-formed scheme list that's part of some scheme source code and some examples are the if expression the lambda expression the define expression and just our regular old call expression so if you see a combination that starts with if then you know it's an if expression so special forms in general are identified by the first list element if lambda and define and if it's not one of these.

That we know about already such as lambda and define then we know it's a call expression and so we just evaluate the operator which might be a built-in name or a name we've defined that gives us some procedure to apply to the arguments which are the values of these operand sub expressions okay so now we can do something that we couldn't do in calculator we can define a new procedure and call it so here's one called demo takes an s if s is null then it returns the list three otherwise.

It builds a new pair with cons that's first element is the first element of s and the rest is whatever we get back from a recursive call to demo on the rest of the list and we might call that on for instance one two now what does this do think about it for a minute this function demo puts a three at the end of the list that's passed in well actually it constructs an entirely new list with all the elements of the original s one and two as well as the.

Element three because the base case gives us back three and then we just start consing on each element at a time in order to build up a full list that ends in three and starts with whatever elements were in the list that was passed in and does this all recursively so it says we're supposed to do a demo let's do a demo what you see on the right is your project for main file called scheme.py and what does it do well it has eval and apply functions and scheme eval evaluates.

A scheme expression which could be one of a number of types we could have just a number or we could have a combination so let's see what happens when we trace this and then we start up our scheme interpreter so the number two involves a call to the scheme of our function with two is the expression it's evaluated in the global frame and the result is two if instead i negate two then i'm evaluating this whole thing i'm putting this in angle brackets to say that this is a not a.

Python expression but a scheme expression so negative two is evaluated by looking up the thing that negates the number two is evaluated and then we're applying negative to two in order to get negative two and we can do this larger example as well so we'll define demo of s to b a procedure where first you check and see if s is null if it is then just return the list that contains three otherwise let's make this window bigger we will return what we get by building a pair out of the.

First element of s and then calling demo on the rest of s close the coder close the demo close the cons close the if close the define and we're done notice that scheme eval hasn't actually evaluated the body of this procedure yet all it's done is create the demo procedure so now let's see what happens when i call demo on the list one two a lot of work happens let's try to trace through what it is so at the very beginning i called um demo on list one two which means.

I'm evaluating this expression which is a call expression we figure out what demo means demo is a function that has the body that we wrote down before and we figure out what list one two means after a bit of work we find out that it's the list one two so now we're going to do the work of applying this procedure to this argument so that involves evaluating the body of the procedure in a new environment where s the formal parameter of our procedure is bound to the argument one two and.

This frame is followed by the global frame in the environment for this call to scheme eval okay so some work ensues and we're not going to trace through every bit but it involves looking up every name null is the null procedure one s is bound to one two so we look that up etc etc work is done each time we make a recursive call we're making a recursive call for the same procedure but with a different environment so notice here s was bound to one two but in a later recursive.

Call s was bound to two and in a further later recursive call s is bound to the empty list which is the base case case we detect the base case here and we return this base condition of just the list containing three okay so we've returned that we now build a larger list which puts the number two on the front remember this is the case where s is bound to two so the first element of s is two and we put that on three to get two three and then we.

Have a still later case the original recursive call had s bound to one two which constructs the list one two three and eventually we get the result that we want let's talk about quotation so the quote special form evaluates to the quoted expression that expression is not evaluated so if i quote an expression that is a quote special form and for example quoting plus one two evaluates to the scheme list which contains the symbol plus followed by the number one followed by the number two it does not evaluate to three.

Because it's quoted that's the whole point of quote is that we can turn anything we want any expression into data just by quoting it the expression itself is the value of the quote expression and putting a single quote in front of an expression is just a shorthand for the quote special form which involves more parentheses so we're actually saving parentheses when we use this that is quote one two is equivalent to quote one two and this equivalency goes both ways so when we see this this is a special piece of.

Syntactic information which we'd like to actually get rid of by the time our scheme evaluator has to deal with the case of evaluating a quote expression so what actually happens in your project is that the scheme read parser converts this shorthand into a regular old combination that starts with the word quote so what am i talking about well there's a file called scheme reader and what scheme reader does is it just reads expressions it doesn't actually do any sort of summing and we looked at this before this it's called the.

Syntactic analyzer and it's also running the lexical analyzer as well and it can do fancy things like take something that's broken up on multiple lines and has decimal points in it and turn it in to a nested expression understanding that 2.3 is a whole number and that the third element of this list is in fact a list itself now with quotation i can write quote one two or i can write quote one two and it's up to scheme reader to convert them both into an equivalent form since one is just.

A shorthand for the other so when the scheme evaluator actually deals with quotation it never sees this it only sees that next we'll talk about logical forms so logical special forms are things that involve conditions and they only evaluate some sub-expressions so an if expression is one of these its evaluation procedure is that you evaluate the predicate and then you choose one either the consequent or the alternative and an or have an evaluation procedure where they evaluate from left to right each of the sub-expressions until you know whether the entire.

Expression is true or false and there's also one called the con expression which you can read about in your project and it involves not only if and else clauses but also a bunch of elif clauses so it's much more like the conditional statement that's in python and for all of these it may be the case that some sub-expressions are never evaluated so here's what you do if you're going to evaluate an if expression you evaluate the predicate and then you decide which of the sub-expressions you want to evaluate next the.

Consequent or alternative and then it's as simple as evaluating that sub-expression in the place of the whole expression in order to get the result that you want so in your python program this is actually the interpreter there's something called do if form and that's a python function that gets called every time your interpreter encounters an if expression and all it does is it evaluates the predicate and chooses a sub-expression to be evaluated next we already have a function that evaluates a sub-expression and so we just use that scheme eval in.

Order to do the rest of the work so the total effort of evaluating an if expression is broken up into two pieces the thing i'd like to show you in a demonstration is that if you evaluate an if expression say if this is true then one otherwise two it evaluates the entire expression by evaluating the predicate and then evaluating the consequent not the alternative so notice that two is never evaluated here so even if it's the case that i put something that errors as the alternative i won't get an error.

Overall because i'll never evaluate one divided by zero but on the other hand if the predicate were false then i'd get a division by zero error and why did i get that well because i attempted to actually evaluate one divided by zero because that was the alternative of this if expression the most important special form of all is the lambda expression lambda expressions work like this they evaluate to user-defined procedures so you have a whole expression that starts with lambda and when you evaluate it you get a new procedure that.

You didn't have before it has formal parameters and a body so for instance if i write lambda x is x times x x this defines a procedure that squares things now how do we encode this well in python we're actually going to introduce a class called the lambda procedure class which has a formal parameter list a body and an environment so this is a scheme list of symbols that tells us what are the names of the arguments that we pass in a scheme expression which tells us what to evaluate when.

We call or apply this lambda procedure and then a frame that tells us what's the first frame in the environment in which this lambda procedure was originally defined let's talk a little bit about frames and environments a frame represents an environment by having a parent frame so a whole a frame is always the first frame in some environment it has a parent frame and it has a parent frame and eventually you get to the global frame and then you have your whole environment frames are python instances with two important methods.

Look up and define and in project four frames don't actually hold any return values they just hold the name value bindings that are used for lookup so let's do this example in code we're going to have a global frame with y bound to three and z bound to five and then another frame f1 with x bound to two and z bound to four okay so i'm going to start up scheme and then i'm going to quit out of it right away now i'm back in python remember python and in python.

We've loaded up all of the different functions and classes that we've defined for our scheme interpreter so we have a frame we have a function called scheme eval etc okay so let's make g a frame that has no parent so g is the global frame and then let's make f1 a frame a frame that has g as a parent so f1 is a frame which currently has no bindings within it and starts an environment that's followed by the global frame now i believe i had said i was going to bind.

Y to three and z to five so now if i look up y oops if i look up y i'll get three and if i look up z i'll get five okay so now we're going to actually define x to be two in the f1 frame and define c to be four in the f1 frame so what does f1 look like now well it has x bounded to z bound to four and it's followed by the global frame so if i look up x i'll get two if i look up.

Z i'll get four which is interesting because z is also divided to be five in the global frame but remember we look in the local frame before we look in the global frame just like in python and so here we are we can look up z but we can also look up y even though it's not in the local frame we can find it in the global frame so we look here first there's no y so we find it there the manner in which an environment is created by extending the.

Environment in which a procedure was defined which we see in lisp and in python is not the only way to do things so dynamic scope is an alternative the way in which names are looked up in scheme in python is called lexical scope or static scope and remember the rule the parent of a frame is the environment in which a procedure was defined so when you create a new frame for applying a procedure you just look at the procedure figure out what its environment was when it was created and use.

That as the parent of the new frame dynamic scope is different it says that the parent of a frame is the environment in which the procedure was just called so what's the difference well let's say we define f which is a function that takes some x and adds x and y together and then we define some g which is a function that takes x and y and calls f on x plus x doesn't use y and then let's say we call g on three and seven in lexical scope the parent.

Of f's frame when f is called by g is the global frame and so when it tries to figure out what x is it will use its formal parameter which is a local name but when it tries to figure out what y is it will fail the dynamic scope has a different story so the lexical scope version will give us an error unknown identifier y when it tries to evaluate f but in dynamic scope the parent for f's frame is g's frame why well we were in the middle of evaluating.

G when we called f and so in dynamic scope it matters who called you not where you were defined this was defined globally but called inside the body of a local function at which point f's frame will extend g's frame and when we go to look up y we'll find g's y which is bound to seven so we'll pass in three plus three is six y will be bound to seven and we'll get thirteen in project four you're going to build an interpreter for the scheme language and this lecture is.

All about the structure of that interpreter so how all the important pieces fit together in order to achieve the result that we want which is a program that's able to understand other programs so here's the structure of an interpreter it shares a lot with the calculator example that we looked at on monday there is an eval and an apply function an eval evaluates primitive expressions it also evaluates combined expressions but when it finds one of those then it calls apply to actually apply some procedure to some arguments so these are.

Both recursive here's how the base cases of eval are for primitive values such as numbers it just returns that number and for recursive calls that it makes well when it gets a combination which is an operator and some operands it has to evaluate those that operator and evaluate those operands in order to get the pieces that you're going to apply so recall that you apply the procedure that's the value of the operator expression to the arguments that are all the values of the operators so how do you get those values.

Well you just call a eval and you get them and then it makes a call to apply now so far this doesn't look like a recursive call but we'll find that it is so we apply some procedure to its arguments and that's all that we have to write for calculator but i've left some gaps because we're going to add a few more pieces to eval what about apply well in the calculator example everything was a base case it just applied built-in primitive procedures plus minus times and divide but we'd like.

To extend apply to be able to apply procedures that we define too so here are the extensions that we'll talk about today one is that there's a new base case for eval where it will look up a value bound to a symbol so we can define what symbols mean and look up what those mean in an environment another one is that we're going to evaluate sub-expressions of special forms special forms are things like if expressions that aren't the same as call expressions because they have a different semantics a different evaluation.

Procedure but they have sub-expressions and those need to be evaluated so you make recursive calls to eval and then finally we'll talk about how in order to apply a user-defined procedure we just evaluate its body so that's calling eval on the body or eval is up here so eval calls apply in order to apply procedures apply calls eval in order to evaluate the body of those procedures and thus we have two mutually recursive functions and it's also the case that eval calls eval directly in several different instances and both of.

These have base cases so some new aspects that we'll see today are that eval is going to require an environment in order to handle its new base case of looking up a symbol so the environment remembers what names mean and how does that environment get constructed well part of what apply does is it creates a new environment each time a user-defined procedure is applied this is just the same as python every time we call a function we're creating a new environment here every time we apply a procedure we're creating a.

New environment and that environment will be passed to eval so that when we look up a name we get the right value for it in order to support abstraction in our programming language we need to be able to bind symbols to values and we do that with the define expression so let's talk a little bit about how the mechanics of that work in the interpreter that you're going to build so define binds a symbol to a value in the first frame of the current environment and we just saw that frames.

Are objects that behave like dictionaries but they can chain because they have parents and so when you look something up you might find it in the parent frame the define expression just gives a name and an expression we evaluate the expression then bind the name to its value in the current frame so if i define x to be plus one two notice that we evaluate plus one two so we get three and x is then bound to the number three it's forgotten the expression that created three it really just knows.

That it's the value three um procedure definition is shorthand for a define with a lambda expression so when i say i'm going to define a new procedure which has a name and some formal parameters and a body all i'm really saying is i'm going to define a new name that evaluates to a procedure with some formal parameters and a body so these two expressions are completely equivalent in scheme and that means they should be handled in the same way in the interpreter that we built so when a defined expression like.

This is encountered it gets converted into something that looks like this and then we apply our regular procedure for evaluating a lambda expression and then binding that procedure value to a name okay so applying user defined procedures is something we can do we saw a demo of it in the very first video of this lecture to apply a user defined procedure we create a new frame in which formal parameters are bound to argument values whose parent is the environment of the procedure and env here is an attribute of the procedure.

Object that remembers the environment in which the procedure was originally defined okay then we evaluate the body of the procedure in the environment that starts with this new frame so let's return to the demonstration that we started with at the very beginning of this lecture this demo procedure returns a new list taking in an old list and giving us back something with the same elements but also the number three at the end so let's look at the environments that are created when i define this thing then i've bound the name.

Demo to some lambda procedure instance which has its parent as the global frame then when i call it that involves creating a list one two which we can represent as nested pairs creating a new frame in which formal parameters are bound to the argument value the formal parameter s is bound to the argument value which is this list and whose parent is g also the parent of the lambda procedure that was just applied okay now if we look through the body of these things we're evaluating the body and we realize.

S is not null so we have to call demo on the cdr of s which means we introduce yet another frame where s is now bound to the cdr of s which is the rest of s everything except for the first element making another recursive call we find that we're now binding s to whatever is the cdr of this s which is just the empty list called nil and when we evaluate the body of this procedure with s bound to the nil list then we just return three and this one.

Returns two three this one returns one two three but in this environment we're not keeping track of return values that happens elsewhere in the program now this idea that you can evaluate and apply recursively is really old so here's the original definitions of apply and eval in the documentation for lisp 1.5 which was the predecessor to Scheme so this is very old but it has much of the structure that you see today though in a different syntax it kept track of things like car and cutter and cons those were built.

In there was a check of something was atomic that's just a number there was also a built-in notion of equality other than that there were just built-in notions of quotation and conditionals and everything else you had to build from there except for our famous lambda so as you can see eval dispatches on the type of thing and calls apply and apply calls eval.
## 30. Part p30 - Lecture 32 - Tail Calls (Optional)

Tail recursion so functional programming is this idea that you can organize entire programs according to pure functions which are modular can be combined in interesting ways and also have other advantages so functional programming is a very broad term but often refers to the following properties that all functions are pure functions they don't have side effects there's no reassignment no mutable data types when you create something it's there to stay and the name value bindings that you create are permanent as well when you have these things then you gain certain advantages.

First the value of an expression is independent of the order in which sub expressions are evaluated now we could just pick a particular order and that's what we do in python but wouldn't it be nice if we could choose any order we want depending on the circumstances in particular we could evaluate sub expressions in parallel if we had multiple different processing units or we could even wait and see if we really need the value of a sub expression before getting around to evaluating it these things are product of referential transparency.

This idea that the value of an expression doesn't change when you substitute one of its sub expressions with the value of that sub expression which allows you to do things like memoization without ever worrying that you're changing the behavior of your program so these are all good things and so functional programming has a lot of excitement around it especially in this era when computers are having more and more processing units wouldn't it be nice to just parallelize work automatically but one might wonder if there are no for and while statements.

Because we're not allowed to rebind a name to a new value can we really make basic iterative procedures efficient or we just stuck using recursion and recursion is slow and so there's no way these languages could ever be fast well it turns out there's an answer to this question you can make a functional programming language just as efficient as one that's not by using this idea of tail recursion we're going to talk about today so let's look at an example recursion versus iteration in Python in Python recursive calls always create.

New active frames let's see what that means well let's say we're writing a function factorial n k that computes k times n factorial here's a recursive definition if n is zero we just return k because zero factorial is one otherwise we return a recursive call where n is decremented and also multiplied in to the constant so that we've accumulated all of the different terms of the factorial by the time we reach n is zero and here's an iterative definition factorial n k while n is greater than zero rebind n in.

K to n minus one and k times n and then return k so the same logic is being applied in both of these cases but there is a difference the difference in time is only up to a constant factor this is a linear time recursion but linear time recursions take linear amounts of space the iterative version also takes linear time you have to go through the body of this while statement many times once for each n and then it gets decremented each time but we only have a constant amount of.

Space because we have a constant number of names that we have to remember n and k and factorial regardless of how big n is so how do we bridge this gap between the space that's required for a factorial in the recursive sense versus the iterative one that's the whole idea of what we're talking about today if you read the specification of the language Scheme says implementations of scheme are required to be properly tail recursive this allows the execution of an iterative computation in constant space even if the iterative computation is.

Described by a syntactically recursive procedure so remember we have our iterative version in python which takes linear time but constant space the idea is that if you write the same logic as the scheme procedure so this says the way you compute n time k times n factorial is you check and see if n is zero then you return k otherwise you make a recursive call and that should use resources like this but how do we do that well the answer is that we eliminate the middleman we eliminate frames that we.

Don't need anymore when we make recursive calls let me show you which frames those are so we're back in python we're looking at the recursive definition of factorial and as we step through it we see that each call to factorial creates a new frame and here we have n bound to 4 here n bound to 3 n bound to 2 soon we'll have n bound to 1 and n bound to 0 which is the final state now what's going to be returned well this one's going to return 240 we see.

That but notice that each one of these other calls is also just going to return the result of the last one 40 40 240 240 240 240 and we're done now there was no need to keep around this n and this k in order to figure out that we were just going to return whatever we got back from the next call so all these extra frames in the middle they were needed briefly in order to figure out how to make the recursive call but they weren't needed anymore after the recursive.

Call was made we kept them around anyway because that's how python works but our properly tail recursive language will not do that so the fundamental idea here to make these recursive procedures efficient is that some calls are tail calls and some aren't it's a distinction that figures out whether when one procedure is calling another procedure is there more work to do when that called procedure is finished or not if there isn't anything else to do besides just return the value of the expression you call well then that's a tail call.

So tail calls have kind of a long definition so let's go through it let's go through it a procedure call that has not yet returned is active meaning we're still going to return something from it someday some procedure calls are tail calls a scheme interpreter should support an unbounded number that means as many as we want an unbounded number of tail calls using only a constant amount of space and it's going to do that by skipping over all those extra frames that you saw in the environment diagram that shows up.

In python okay so what's a tail call a tail call is a call expression what's a tail call expression in a tail context what's a tail context well there's several one is the last body sub expression in a lambda expression So, it turns out that a lambda expression can have multiple different body expressions.

The last one is the one that determines the return value. And so that expression is in a tail context, meaning it's a description of the last thing that this procedure is going to do before it returns. Now, in addition, you can also have a tail call as sub-expression 2 or 3 in a tail context if-expression. So remember, an if-expression has three sub-expressions, the predicate, the consequent, and the alternative.

Those consequent and alternatives are tail contexts if it's the case that the whole if-expression is in a tail context. So let's look at this factorial definition. The last body sub-expression in the definition of factorial is this whole thing, which is an if-expression. So this if-expression is in a tail context, which means that its sub-expression 2 and 3 are also in a tail context.

That's this k here, and then this call 2 factorial here. So that's a tail context as well. And this is a call expression in a tail context, and so it's a tail call. So that's the kind of thing that should only require a constant amount of space no matter how many times we call it over and over again. The idea is, once you compute factorial of n minus 1 and k times n, you've already done all the work you need to do for factorial n k.

All you have to do is return it. So it doesn't really matter what n and k are anymore once you've done all this work. Now there are other tail contexts. So all non-predicate sub-expressions in a tail context cond, which you'll read about in your project. The last sub-expression in a tail context and or or. And the last sub-expression in a tail context begin.

These aren't terribly important, except that if you're actually sitting down and writing a scheme program, you need to know what the tail contexts are, so you know what's going to be the space efficiency or space usage of your program. So people spend a lot of time making sure that they put all of their recursive calls in tail contexts when possible so that their whole program doesn't use too much space.

But for today, we're just going to focus on these first two cases. Last body sub-expression in a lambda expression or sub-expressions 2 and 3 in a tail context if expression. So we've seen both of these examples right here. Let's do another example. Computing the length of a list. A call expression is not a tail call if more computation is required in the calling procedure.

So if after I finish my recursive call, I still need to combine that value with something else, then I don't have a tail call. But it's the case that linear recursive procedures can often be rewritten to use tail calls. So here's a linear recursive procedure for computing the length of a list s. And it says, if s is null, it's zero. Otherwise, it's one more than the length of the rest of s.

Now, this is a tail context because it's the last expression in length. Since it's a tail context and it's an if expression, both zero and the alternative here are both in tail context. So this is good. This is a call expression in a tail context. So this addition is a tail call. However, this is not. So this is a call expression within a call expression.

And that's exactly when you know you're not in a tail context. After we compute the length of the rest of s, we still have more work to do to add one to it. Now we don't know what work there might be to do left. And so, for instance, maybe there would be a reference to s and so we might need the environment for this function call around because there's more work to do.

So in this case, an implementation of length here would require linear space to keep around all the frames for length in each recursive call. But let's see if we can rewrite length so that it is tail recursive. Here's a common way to do so. We define another procedure, length iter, which takes in the same list that we're computing the length of and also the length that we've computed so far, n.

If s is null, then we've computed the entire length and we return n. Otherwise, we return the value of a recursive call on the rest of s with one more than the length of what we've seen so far. So in the beginning, we haven't seen any length, so we start with zero. Each time we make a recursive call, we add one until we get to the end and then we've computed the length.

Now, this is a very different program in terms of its behavior. This is in a tail context because it's the last expression in a lambda expression or define. Why do I keep calling it a lambda expression? Well, a define of a procedure is implicitly a lambda expression. Remember this is the same as saying define length tail lambda s blah blah blah. So that's in a tail context.

This is in a tail context because this is a separate procedure definition and this is the last thing in the procedure definition. Which means this is in a tail context because when you have an if expression in a tail context, then its alternative is also a tail context. And that's a call expression in a tail context, meaning it's a tail call. Meaning this whole thing is only going to run in constant space.

Now the actual list itself takes up linear space, but the additional space that's used in order to compute the length doesn't have a whole bunch of frames in it. It only has one. So here this recursive call is a tail call, whereas this recursive call was not. So how do I convince you that this really matters? Well, we're going to have to run a demonstration.

So it should be that the return value of the tail call is the return value of the current procedure call. Meaning we can skip keeping around all the frames that we don't need because the return values for the last frame can return straight up to the original call. Tail calls shouldn't increase the environment size. And we can see that by calling this factorial function on a big input.

Okay so here's scheme.py, which is part of your project. And way down below where you implement the extra credit it says uncomment the following line to apply tail call optimization. So right now it's commented out as you can see, which means we're using just a regular scheme eval, which is not optimized for tail calls because we haven't implemented that part yet. That's the extra credit.

Okay, so let's define a function that returns n factorial times k define factorial of n and k times n. Okay, so what sort of state are we in? We have a tail recursive function. We analyze that already. This is a tail context. So this is a tail context. We have an interpreter that is not optimized for tail calls. So it's just going to create a frame every time we make a recursive call.

And that frame will stick around until we return from the call. And that will use a linear amount of space. Which means that if we run scheme.py and load in this factorial, we can compute the factorial of 10. We can compute the factorial of 100. But if we compute the factorial of 1000, we reach an error. It says maximum recursion depth exceeded while calling a python object.

So what happened? We got all the way up, it seems, to computing the factorial of 673. And then it just gave up because it had made too many recursive calls. And so it was using up too much memory. So Python said, sorry, you've reached your limit. We're done. Which is unfortunate because we should be able to compute as much of this as we want using a constant amount of space.

So I have an implementation of the extra credit, which just says, use a different eval function. One that doesn't create an extra frame when it doesn't need to. So let's run this again. Let's load our factorial function. If I compute the factorial of 10, it works fine. 100 works fine. 1000 works fine as well. And if I compute the factorial of 10,000, well sure, it takes a while.

I'm not making anything really faster, but I am saving the extra space. So we computed this huge number, 10,000 factorial. Now eventually this program will run out of space, not because we create extra frames, but because representing this number will just become too big because it has so many digits. But that's going to take a long while. So very efficiently, we've computed factorial of 10,000 using tail recursion to make sure that we don't use any space that we don't need to use.

Let's look at some examples of tail recursion. So here's your task. Figure out which of the four procedures defined below are tail recursive. For a recursive function to be tail recursive, what I mean is that all of the recursive calls are tail calls, and therefore the procedure will be executed in constant space. So which of the following procedures run in constant space?

Take a look yourself, and then I'll go through the answers. Let's first look at length. Length defined here is not tail recursive. The final expression in the procedure definition is a tail context, but the sub-expressions of it aren't. So in particular, this if expression is not in a tail context. And that idea that the consequent and alternative sub-expressions of an if are in tail contexts only works if the whole if is in a tail context.

So this is not either, which means that evaluating length here is going to require linear space in the length of s. Let's look at contains next. Contains is tail recursive because the recursive call to contains is in a tail context. This is a tail context because it's the last expression in a procedure definition. And this is a tail context because it's one of the second or third sub-expressions in an if-expression that's in a tail context.

And therefore, this is in a tail context too, and that's the recursive call. So contains will take in something that's linear size because s is a list, but the amount of additional space required for contains to be called is constant. How about hasRepeat? Well hasRepeat has exactly the same structure as contains. So hasRepeat is a function that figures out whether s has any repeated elements, and it does so by calling contains.

So the entire if-expression, which is the body of this procedure, is in a tail context. Which means this is in a tail context. Which means this is too. So the whole thing runs in constant space. And by the way, when it calls contains, that's not a tail context, but since contains already just runs in constant space because it itself is tail recursive.

We don't have to worry about that taking up a bunch of room. Finally, we have a procedure to compute the nth Fibonacci number. So let's see how this actually works. Fibiter takes the current Fibonacci number, which is Fibonacci number k, and if we're all the way up to the nth one, which is the one we're looking for, then we return current. Otherwise, we call Fibiter on the current plus the k minus one Fibonacci number.

And we increment k when we do that. So starting out, we check and see if we're just looking for the first one, well then we return zero. Otherwise, we call Fibiter starting with the second Fibonacci number, which is one. So this is a tail context, so this is a tail context, so far so good. This whole thing is a tail context, and so that is, so this recursive call is fine.

But the problem is that this sub-expression of a call expression is not a tail context. So this is not a tail call, and it is a recursive function, call to Fib. So this whole thing is not going to run in constant space because it makes a recursive call, even though we have two mutually recursive functions, Fib and Fibiter. For them to run in constant space, both would have to make tail calls to each other.

And in this case, we have something that's not a tail call. There's more work to be done. As soon as we figure out the k minus one Fibonacci number, we still have to combine it with current in order to finish. And then we have to call Fibiter on that. Next we'll look at two higher order functions, MEP and REDUCE. So let's look at REDUCE first.

REDUCE is a procedure that takes another procedure. Some list S, which we're going to iterate over, and then a starting value, and what it does is it combines the starting value with the first element of S, combines that result with the second element, etc., using the procedure to combine them. So if we REDUCE, with the multiplication procedure, the list 3, 4, 5, starting with 2, then we'll get 2 times 3 times 4 times 5 is 120.

And if we REDUCE, using a procedure that takes two things and CONS them together, y first then next. With a starting value of the list containing 2, we'll then CONS on 3, then we'll CONS on 4 to that, then we'll CONS on 5 to that. CONSing a number with a list gives you a longer list with the number in front. So the entire result will be 5, 4, 3, 2.

Ok, let's look at the definition. If S is NULL, then we just use the starting value. Otherwise we reduce, with the procedure, the rest of S, though we need to create a new starting value, which is the procedure that was passed in, called on the starting value we had before, and the first element of S. So in this way we create a new starting value which already INCLUDES not only what we started with before, but also the first element of S.

So in this case we'll start with 2, but in the next recursive call to REDUCE we'll have 2 times 3 is 6. And in the next one after that we'll have multiplied in 4 to get 24 and eventually 120. So let's take a look. This whole thing is a TALE context, which means this is a TALE context. But this is not. So does the whole thing run in constant time?

Well, it really just depends on what the procedure does. So the recursive call to REDUCE is a TALE call. But the other call, in particular the procedure call, is not. And this is a higher order function, so we don't know what procedure will be passed in. So the total space of REDUCE will depend on whether the procedure requires constant space or not.

Hopefully it just requires constant space, in which case the entire REDUCE will require only constant space. Okay, now let's talk about how to MAP with only a constant number of frames. MAP is a function that applies a procedure to every element in a list and constructs a list containing all of the results. So let's come up with the most natural version to define MAP and then we'll kind of come up with the TALE recursive version.

So a natural way to define MAP is to say we take in a procedure and a list S. If S is null we return the empty list. Otherwise we're going to create a new list where the first element is whatever we get by applying the procedure to the CAR of S, the first element of S. And then the rest of this result will be what you get when you map the procedure over the rest of the list.

So for example, if I map a function that takes each element and subtracts it from 5 to the list 1-2 under this definition which is not TALE recursive. We start out with the list 1-2. We bind it to S in the first call to MAP. The second call to MAP takes the rest of S. And the third call takes the rest of that.

Now the final result of returning from the third call is just nil. But the second call returns a list that starts with 3. And the third call starts a list that starts with 4. So 4 is 5-1 and 3 is 2-1 and that's what we're computing here. So this is not TALE recursive because we have a TALE context for all of IF but within CONS which isn't a TALE context we have a sub-expression that's not in a TALE context that calls MAP.

So here is a TALE recursive definition of MAP. Not what you would expect. Define MAP by computing the reverse of the MAP. Meaning exactly what we want but in the reverse order. This first checks if S is NULL. If so, we return the result which is the mapped list in reverse that we've already constructed M. If it's not NULL then we have more work to do.

So we call MAP reverse on the rest of S. So that's everything else we're going to work on. And what we're going to do is we're going to CONS on the next element of the resulting mapped list. So we CONS on the result of calling the procedure on the CAR of S. And what's the rest of that? Well that's the M we've constructed so far.

So we're going to start out with a nil, we're going to add the 4 on first, and then we're going to add the 3 on. Thus giving us our list in reverse order. So finally we need to call reverse on MAP reverse S NIL. Now is this a TALE context? Well, this whole thing is in a TALE context. So the call to reverse is.

This call is not. But notice it's not a recursive call to MAP. It's a call to MAP reverse, which is a TALE recursive procedure that runs in constant space. Now what about reverse? Well, we need to make sure that that's TALE recursive too. So here's the definition of reversing a list. We define reverse iter, which takes S and the reversed list so far.

And what we're going to do is CONS on a reversed version of S to R. So if S is NULL, then we just have R. Otherwise, we call reverse iter on the rest of S, CONS on the first element of S onto R. So think about it for a minute. You'll see that this will reverse the list. If I just start out with nil as my reversed list and S as the thing I'm reversing.

So this is one of the more complex examples of making a procedure TALE recursive. There were two steps we had to figure out how to make sure that we can build up something that maps over the elements of S such that we collect all the results. And then we realized, well, that would build it in the reverse order because as you are building up the recursive list from the back to the front, you're processing the input from the front to the back.

And so then we had to define reverse in order to give us exactly the result that we wanted. Our final thought today is what is it that we're creating when we create an interpreter? Well, we're creating a general computing machine. So here's an analogy. Think of programs as defining little machines by laying out the procedure by which we evaluate some input to give some output.

So the program specifies the logic of some computational device. So if we create a device that computes factorials, well, that might look like this, where it says, if the input is one, then we just have one. Otherwise, we have to multiply the input by one minus the factorial of the input. And factorial here, of course, is just another copy of this computational device.

So five comes in, 120 comes out, five factorial. Well, interpreters are like general computing machines. So the interpreter takes in as input any piece of code that tells it to simulate any particular machine that we want. So the scheme interpreter might take in five as the input, but also the source code that tells us how to compute the factorial. And it uses both of these things together in order to create any sort of computation that we wish.

For instance, computing 120. So our scheme interpreter that we've built, or we are in the process of building as your project, is a universal machine. It can perform any computation we wish, depending on how it's parameterized by the input source code that's given to it. So think of it as a bridge between the data objects that are manipulated by our programming language, and the programming language itself.

It's the thing that puts them together. Internally though, remember that it's just a set of evaluation rules. An interpreter is nothing more than a program. An interpreter?

## 31. Part p31 - Lecture 33 - Programs as Data

Programs are data. Scheme programs consist of expressions. Those expressions can either be primitive expressions, just the number 2, 3.3, true, the symbol plus, the symbol quotient. But everything else is a combination, and each combination is a scheme list. So here we have a list containing the symbol quotient, the number 10, and the number 2. Here we have the symbol not, and the primitive true.

The built-in scheme list data structure that we've discussed before, it's represented as a linked list with a car and a cutter, but it can be used to represent combinations in a scheme program. So if I evaluate the following expression, build a list of quotient, and then 10, and then 2. What I get is a little piece of a scheme program, a combination that says take the quotient of 10 and 2.

Now notice evaluating this doesn't actually divide 10 by 2, instead it just builds a list. But there's a built-in procedure called eval. And eval takes any expression represented as a scheme list, or primitive, and gives you back its value. So eval quotient 10, 2 gives you the number 5. The lesson here is that if I want to write a program that generates scheme code, I just build lists.

If at any point I've constructed code and I want to know what happens when I evaluate it, then I just call eval. Python also has an eval function built in that takes a string and tells you its value. What's special about scheme is that it has all this built-in functionality for working with scheme lists, and all the code is just lists. So it's easier to construct programs by writing things like list quotient 10, 2.

So one of the beautiful things about the scheme language, and this is true of Lisp in general, is that it's straightforward to write a program that writes a program. Let's do that now. So I'll start up scheme, and if I write an expression that evaluates to a value, that's pretty straightforward. If instead I list out all of these things, this is the procedure that pluses the number one and the number two, then I'll get a list of those pieces.

But this is not scheme code. Scheme code looks like that. So the reason I have quotation here is to say that I don't yet want to evaluate the plus. Now that I want to leave it as a symbol, and that symbol will be evaluated just as soon as I ask scheme to evaluate the whole combination, because this is in the operator position, so it gets evaluated to the procedure that adds.

And then we apply that to one and two. Now if I were to list out plus, and then have some more complicated expression here, two plus three, I'd end up with an expression where this part had been evaluated already, because it's just part of scheme, and scheme evaluates the operator and its operands, and gives me back an expression that's already computed the five, but hasn't computed the six yet.

Okay, now let's load this small program on the right. Fact is a procedure that if n is zero just returns one, otherwise it returns n times the factorial of n minus one. So that's a straightforward recursive definition of factorial. If I take fact of three, then I get three times two times one, or fact of five is five times four times three times two times one.

This is just a scheme program that returns a number. But I could also write a scheme procedure that returns an expression that computes the factorial of n. So this variant called FactExp doesn't have the job of returning a number. Instead, it has the job of returning an expression. One is an expression, a perfectly good way of representing the number one. If I want to build an expression out of smaller expressions, I need a list.

A list containing multiply, the number that I'm multiplying, and then the expression for how to compute the rest of the factorial. So now when I compute the factorial of five, I still get 120. But if I ask for an expression that would compute the factorial of five, I now see how the factorial of five is computed. One times two times three times four times five.

So here's a procedure that returns an expression. If I take that expression and I evaluate it, then I get 120. Let's do one more example following the same pattern. First, I'll define Fibonacci number n. If it's the case that n is 0 or 1, any number less than or equal to 1, then Fib n is just n. Otherwise, I have to add together the two previous Fibonacci numbers, Fib n minus 2 and Fib n minus 1.

So Fibonacci number 2 is 1, Fibonacci number 6 is 8. How did it compute 8? Well, using tree recursion. I could also have written a big nested expression. So here we're going to change Fib to Fib x everywhere in order to say that the goal of this procedure is to write down an expression that computes Fibonacci number n. And that expression is constructed by writing down a list of what operation I'm going to perform and then applying that to the result of two smaller expressions that compute Fib n minus 2 and Fib n minus 1.

So Fib 6 is still 8, but the expression that computes Fib 6 is that I add together Fib 4 and Fib 5. Where Fib 4 is an expression that looks like that. And here is the expression for Fib 5. Now if I ever go through and evaluate this nested addition of zeros and ones, I get the result, Fib 6. But this is a procedure that gives me back an expression.

This is a procedure that gives me back a number. So why ski? Do people actually use this language? Well they do, or variants. And why are people drawn to these programming languages based on Lisp? Well because the code looks like just a bunch of symbols and parentheses, you could actually write a program that generates programs. Before we do that, I'm going to teach you one more feature called quasi-quotation, which is a lot like the quotation you already know.

But there's an important difference, which is that you can unquote parts of a quoted expression. So there are two ways to quote an expression. You can use quote, which we saw before. Or you could quasi-quote, which is represented using the back tick symbol, which is in the upper left corner of your keyboard. And in many situations it does the same thing as quote.

But here's the difference. Parts of a quasi-quoted expression can be unquoted using the comma symbol, which is the unquote symbol. So this is quote, this is quasi-quote, this is unquote. Let's say I've already defined b to b4. If I quote ab, I'll get ab, it doesn't matter that I've defined it. If I quote a followed by the result of unquoting b plus 1, well this whole thing is quoted.

So we're not going to use the value for b. We're just going to write out exactly what's here. a followed by the value of unquoting b plus 1. So here we have a list within a list within a list. But writing the same expression started with a quasi-quote will give me something that I think is more useful. A list a5, where 5 is the value of evaluating the expression b plus 1.

Why did this expression get evaluated, whereas a did not? Because of the unquote. So the way to read this quasi-quote a list a followed by unquote plus b1 is that we're going to build a list, that's what we've said here. It's going to start with the symbol a, because that's all quoted. But now this unquoted expression is going to be replaced by its value.

So by using all the same rules of evaluation that we have already for scheme, we evaluate b plus 1, which can depend on the current environment. b is 4, so b plus 1 is 5. And then we get a list of a and 5, mixing together stuff that was quoted and stuff that was evaluated. Quasi-quotation is particularly convenient for generating scheme expressions.

If I want to define a procedure that makes a new procedure, taking in some n, and building a lambda expression that says lambda d plus dn for whatever n is. And then I call make add procedure on 2. What I get back is a list, a list whose first element is the symbol lambda, second element is a list containing just one element d, and the third who's a list containing the symbol plus the symbol d and the number 2.

And quasi-quotation makes it convenient to write new code on the fly. Instead of having it be lambda d plus dn for two different variables d and n, here we have an expression that evaluates to a procedure that takes only one argument, and the n has now been filled in with 2. So here's a procedure that writes code, and it writes code with particular parts filled in.

Okay, let's do a longer example. While statements. Well in scheme there are no while statements. But while statements are awfully convenient. Like let's say you wanted to know what's the sum of the squares of even numbers less than 10, starting with 2. So 2 squared plus 4 squared plus 6 squared plus 8 squared. What would you do in Python? You'd set x equal to 2, total equal to 0, while x is less than 10.

Increase the total, increase x. And at the end, total gives you the answer to this question, which is 120. How do you do this in scheme? Well, you want to iterate, but you're not allowed to use a while statement. So you have to use recursion. You have to write a new procedure that takes in x and total. This is the kind of current value of x as you're going through while, and the current value of total.

If it's the case that you're still iterating, if x is less than 10, then you make a recursive call, updating x to be x plus 2, updating total to be total plus x squared. If on the other hand this is false, that means you're done, well then you should just return total. But after defining this recursive procedure, I need to call it with the right initial values.

Total starts at 0, x starts at 2. And now I've written two expressions instead of one. If I wanted to fit it all into one expression, I would need to use begin. Okay, so it can be done in Python, it can be done in scheme. I find the Python easier to read. There's nothing inherently recursive about this expression. It just happens to be that the way you express it in scheme is through recursion.

And you could do more of these. What's the sum of the numbers whose squares are less than 50? Starting with 1. So 1 plus 2 plus 3 plus 4 plus 5 plus 6 plus 7 is still, 7 squared is still less than 50, not 8. Well, it's basically the same code, except we changed the initial value, we changed the while condition, we changed how we updated total, we changed how we updated x.

And so likewise, those things need to change in the scheme code. But what if there were a bunch of these? And, you know, someone told you, you have to write scheme expressions for all of them. Wouldn't it be nice if you could just get scheme to write this whole thing for you? Well that's exactly what you could do. So I'm going to start us off with that example that you just saw.

Summing numbers whose square is less than 50 starting with 1. But I want to be able to define a procedure that creates one of these sum while expressions out of an initial value for x, a condition for the while statement, what to add to total, and how to update x. And how would I call this? Well, I want to call it on an initial value for x, a while condition.

Like, I want to keep going as long as x squared is less than 50. In this case, I'm just adding x to total. And how am I updating x, well, using the expression x plus 1. I think it should be the case that this call generates this expression. But now we're going to do something interesting. We're going to make this generic. We want to return an expression that starts with begin.

And that expression should always say define f as x in total if something, not always this, but whatever condition is passed in. The reason I unquote this is that I don't want the symbol condition in the result. I want whatever is passed in, this expression, in the result. Likewise, I want this expression as what we update x with. So I'll unquote and write update x.

I always want to add something to total, but what it is depends on what I want to add to the total. Which, in this example, I think should be x. The fact that I return total when I've reached the end of the while condition stays the same. The fact that I call f starting with total equals zero stays the same. But I do want this to have some other value.

So I unquote and put the initial x here. So now I have a quasi-quoted begin expression, which means that the result of evaluating this quasi-quotation will be a begin expression. But I still need to close the parentheses for the procedure that I'm defining. Okay, I've rearranged a bit so that I can load this file and make this call. And look what it did.

It built for me something. Let's give this thing a name. Result of evaluating this expression. This result is a list. It begins with begin. But it's also code. And when I evaluate that result, I get 28, which is the result of adding 1 and 2 and 3 and 4 and 5 and 6 and 7 together. If instead I wanted that other thing, the sum of the squares for even numbers, up to but not including 10, then I would evaluate something else.

The result of starting at 2, having a while condition that says x is less than 10, what I add to total in this case is not x but x squared, and I update x to go to the next even number. So this should give me 2 squared plus 4 squared plus 6 squared plus 8 squared is 120. And the way that it did it was to actually produce the code that results in 120, including defining a new recursive function and calling that.

And then eval actually defined that function and called it and got the number. So this is an additional kind of expressive power in a programming language. To be able to write procedures that write the code for other procedures. And that's one of those things that get people excited about Lisp and Ski. Thank you. Thank you. Thank you. Thank you.

## 32. Part p32 - Lecture 34 - Macros

Let's practice writing procedures that return expressions, which are scheme lists. Here's a discussion question that we'll go through. First, a quick quasi-quotation review. This is the quasi-quote symbol. What it does is quote the next expression, but allow for unquoting. The comma is the unquote symbol. What it does is indicate that even though this whole expression is quoted, this sub-expression should be evaluated.

And so by unquoting this, we multiply 2 by 3 to get 6, and we end up with a list containing the symbol plus the number 6 and the number 1. Okay, so here's what we want to do. We have all the code except for it's missing some quasi-quotation and unquote marks, and we can add those to the blanks below. Here are the blanks.

So that the second expression here evaluates to a squared plus b squared, written out in scheme format as a list containing plus the sub-expression times aa and the sub-expression times bb. So this says we're going to define some procedure square expr, which takes in a term and generates an expression. We're going to call it twice on a and b. So that's going to generate the times aa and the times bb, and then we're going to add in the symbol plus in order to get a squared plus b squared.

So each blank here can either be empty or contain quasi-quote or unquote. I'd recommend that you pause the video now and think about what should go in the blanks. We'll go through the answer in 3, 2, 1. For the first line, we actually do want to define this new procedure. So we don't quote or unquote the whole expression. That's empty. We do want square expr to return something like list times aa, and so we need to quasi-quote this.

But we don't want to return times term term, instead times whatever argument is passed in, such as aa or bb, which requires us to unquote the terms. Now that we have a procedure that can generate the list times aa and the list times bb when called appropriately, we need to call it. What we're generating as the entire result of this expression is a list containing the symbol plus, and so we do need to quasi-quote the whole thing.

Once you're quasi-quoting, you don't need to quote each part, so there's nothing in front of the plus, but we do need to call square expr, which means unquoting this sub-expression so that it gets evaluated. Now when we call square expr, we need to call it on the symbol a, which means we need to quote that. So here's an example where an entire quasi-quoted expression has an unquoted sub-expression, which within it has a quoted expression.

And this could be a regular quote or a quasi-quote, it doesn't matter which because there's no unquoting inside. But since the direction said just use these two, I left it as a quasi-quote. And that's the answer. Let's see what some different answers do. So here's the correct answer as it was on the slide, and we can see that when we run it, we get a squared plus b squared.

What if we hadn't unquoted term here? Well, we'd get term squared plus term squared because every time we called square expr, we would leave in the symbol term instead of whatever term was bound to. So that's why those are there. And if we had left out this quasi-quote entirely, then we would have gotten an error because we'd try to multiply the symbol a by the symbol a, but you can't multiply symbols.

Operand 0, which is a, a symbol, is not a number. So now we have square expr back the way it was, let's take a look at this example. Because we're trying to return a list containing the symbol plus, we do need this here. If you had quoted this as well, you'd get a different kind of wrong answer. Instead of having a plus here, you'd have a quasi-quote plus, which is not what you want.

You want just a regular plus like that. Now if we hadn't unquoted these, then what we'd get in the result is the sub-expression square expr as opposed to what you get when you call square expr. So that's why we unquoted those. So now we're back to the correct answer. We did have to quote a. You could do it with quasi-quote or regular quote.

You get the same answer either way. If you don't quote a, then you're within a context that's being evaluated because it's unquoted. And so Scheme tries to evaluate the symbol a, but this is an unknown identifier and so you get an error, which is why you need that quasi-quote symbol there. Macros are a feature of Scheme that allow you to define new special forms in the language.

In Python, we have a certain inventory of expression and statement types. And the same was true in Scheme. We had define, lambda, if, cond, and, or, etc. Everything else was a procedure. Now macros allow you to extend that inventory by inventing new kinds of special forms. That means that we can change the way the language works, inventing new ways in which the flow of evaluation proceeds through a program.

Sounds fancy. And it is. It's the kind of feature that makes people fall in love with Lisp programming. And the reason it works well in Lisp languages, like Scheme, is that it's easy to view code as data. So the way that we'll invent new special forms is to describe how to take the parts of a special form and construct a regular piece of Scheme code out of them and then evaluate that Scheme code.

So a macro is an operation performed on the source code of a program before that source code is evaluated. Macros do exist in many different programming languages, but they're by far the easiest to define correctly in a language like Lisp where the code is just data. In Scheme there's a special form called define macro that allows you to define a transformation over the source code for the special form that you're trying to invent.

So here's an example of a macro called twice. You can see it looks a lot like a procedure definition. But the way in which a twice expression gets evaluated is quite different. The content says that when you're twice an expression, you build a list that starts with begin and then has that expression twice. Once you've defined this macro, you can twice anything.

And here we're twicing the expression print2. What happens behind the scenes because twice is a macro is that it evaluates the body of the macro on the expression you've typed here before that expression ever gets evaluated. So we construct a new expression, begin, print2, print2. And then this expression gets evaluated, which means that it will print2 twice. Now there's something interesting going on here.

If twice were just a procedure, however it were defined, print2 would have gotten evaluated before twice were ever called. And that means 2 would have been displayed once and that value 2 would be gone because once you print, you can't get back the value. So there is something that twice can do that a regular procedure can't do, which is to take this expression and duplicate it before it gets evaluated and then evaluated twice.

So the evaluation procedure of a macro call expression in general, like this one, is that we evaluate the operator sub-expression. If that evaluates to a macro defined by the defined macro special form, then we proceed a little bit differently than regular procedures. We call the macro procedure on the operand expressions without evaluating them first. Then we evaluate the expression returned from the macro procedure.

So macros take in expressions and return expressions instead of taking in values and returning values. So let's talk a little bit about print. When I print2, I see 2 on the screen, but if I define x as print2 and then I look at x, I see that x is nothing. Once you've printed, the 2 is gone. If I wanted to print2 twice, then I could write print2 and print2.

But in order to put that into one expression, I need to use the begin special form. The begin special form just says do all of these things. Let's say that I was stuck with only procedures and I wanted to define twice. I'm going to write the same body that I had on the slide. Begin the expression and then the expression again. Now twice print2 doesn't work.

I get 2 displayed and then I construct an expression that says begin none none, the value of print2. If I wanted to construct begin print2 print2, I would have to quote this. It's not like it's impossible to do this with the procedure, I just have to think about quotation in order to make sure that this doesn't get evaluated in advance. But even this version hasn't printed anything yet.

The only way to print would be if I evaluate the results of calling twice on the quoted print2. The idea behind macros is that this quotation and evaluation procedure is taken care of for you. So if instead of defining this as a procedure, I define it as a macro, then instead of typing twice quote print2 and evaluating the result, I can just twice print2 and I see 2 displayed twice.

So something simple and something profound has happened at the same time. The simple part is that all it does is make sure that print2 doesn't get evaluated. For example, by quoting it, passing in the expression to twice and then evaluating the result. The profound thing is that we've changed the way the language works. Twice is now the kind of special form that doesn't involve evaluating the arguments first.

And that means we have complete control over when and how things are evaluated inside of a macro. Let's look at how this can be useful. Let's say I want to define a procedure that checks whether something is true or false. If I pass in a value, I can write if the value is true, then I passed the check. Otherwise I failed the check.

And if, for instance, I had x negative 2 and I wanted to check that x is greater than 0, I would have failed that check. So this is a reasonable way to add little tests inside of your scheme program. But unfortunately, it doesn't tell you what failed when something failed. It would be nice if it said, here's what failed. But in order to do that, we need access to the expression that was evaluated instead of just the value itself.

So let's define a macro. First, we'll just name it check in order to be consistent. But this doesn't take in a value. It takes in an expression. Instead of just writing down what gets evaluated, I have to construct this expression piece by piece. You check expressions by building a list which contains if, and then it has the expression that we want to evaluate, and then it says either passed or failed.

Here I've double quoted to say that I want the result of evaluating this to be this, quote passed. And now I've built a macro that behaves just like the procedure that I had before. So if I start scheme, and I load this file, and I define x to be negative 2, and then I check to see is it the case that x is greater than 0, it will say failed.

So I've done all this work to define a macro. It was slightly more complicated than the procedure, and it doesn't do anything new yet. But we could get it to do something new by not only saying failed, but also saying what expression failed. So in the case that this fails, I'm going to build a new list, and it's still going to say failed in it.

But then it's also going to show you the expression. Now we run the whole thing exactly as before, define x to be negative 2. Write down what looks like a procedure call. But in fact, it's not a procedure call, because when it fails, it tells you that it failed. This is a false value. But also the expression that caused it to fail, and that's something that would not be available to a regular procedure.

Before we conclude, let's quickly look at the expression that was constructed by this macro. You can do that by removing the dash macro, and now we just have a regular procedure. This regular procedure can take x as negative 2, but when it's called, we have to explicitly quote the expression as if we were calling a macro. Is x greater than 0 constructs the following expression.

If x is greater than 0, then it just says passed, otherwise it builds this list, failed, and then the expression. If I were to evaluate that, then I would get the fact that it failed. But of course, if instead x were 2, and I evaluated the same thing, then I would see that it passed. So we've built from scratch a macro, a new special form called check, that checks whether an expression evaluates to something that's true or false.

And when it evaluates to false, it shows you the expression. Scheme doesn't have a for statement. Now it will. We're going to create a for macro. We'd like to define a macro that evaluates an expression for each value in a sequence. For example, if I say 4x in 2, 3, 4, 5 square x, I should get the squares of 2, 3, 4, and 5.

How convenient. We'll build this macro in two steps. First we define what it means to map a function over values. If values is null, there's nothing in the mapped list. Otherwise, we cons applying fun to the car of vowels to whatever we get when we map that function over the coulder of vowels. And in this case, we would be able to produce something like the for statement just using map.

But it requires a little bit more work. I have to say map. And then I have to give a lambda expression in order to capture this body. And then I have to say what I want to apply it to. So having a for expression in the language doesn't mean I can do new things. It just means it's much more straightforward to state what I want because I don't have to explicitly write out the word lambda.

So defining the macro means saying what happens when you have for and then a symbol and then some values and then an expression to evaluate for each of those values. What we do is build this expression. It's a list containing map. It then contains lambda x and then that expression. And finally, it contains the values. Spend a moment and see if you can write out the general macro definition of for that allows us to transform these three expressions into this one long map expression.

I'll show you the answer in three, two, one. There it is. We build a list that starts with lambda and then has the symbol that I'm using as a placeholder for every value. That has to go inside a list because that's how lambda expressions work. Now expr will be bound to this whole thing times xx and so I just place that into the lambda expression that I'm constructing as a list.

And finally, I write down the values and then when I run this here for these three expressions, I will build this map expression and then evaluate it and I'll get the result for 9, 16, 25. So there's another way in which you can extend the syntax of the language mixing together something that gets evaluated. Something that never gets evaluated is just the symbol to use as a placeholder.

And then an expression here that gets evaluated for every element of this list. And now we've discovered that scheme has four statements after all. Let's work through another macro example. This time about tracing the execution of a recursive function or procedure. We've been tracing recursive calls in this course before. In Python, we did it with a decorator. So here's a decorator called trace.

It takes in another function to be traced, defines a version of that function that has the same return value but before returning prints the fact that this function is being called. Now this f string has one component before the parentheses which gets the name of the function being called. And if you haven't seen this before, this is just how you take a function and look up its intrinsic name.

And it's got some parentheses. And another expression which is the argument value that the function is being called on. Here I've defined factorial of n recursively. If n is 0, return 1. Otherwise, return n times n minus 1 factorial. By placing the trace decorator before the def, fact is not actually bound to the factorial function but instead to the return value of calling trace.

So fact is bound to this traced version of factorial which, when called on some number like 5, will print out fact 5 and then call fact on 5. So now we're in here. And when it makes the recursive call to fact 4, it's in fact calling the traced version. So if I were to call fact 5 after tracing it, I would see that fact 5 calls fact 4 calls fact 3, 2, 1, 0.

That all returns eventually and you still get the same result, 120. So the lines that say fact are all printed and this is the return value. Could we achieve something similar in Scheme? Well, there's no decorator syntax in Scheme. And it seems awfully hard. So what can we really do? Well, here's something we can do without using a macro. We could define factorial of n as a procedure that has the same logic as the Python version.

We could then assign the symbol original to this fact procedure and redefine the fact procedure as a function that first prints and then calls the original. It prints a list that contains the symbol fact and the number n. And with this, you get the following output. Pretty similar, right? The thing that's different is that there's a separation of concerns in Python where writing fact doesn't mean I need to know anything about tracing.

Writing trace means I don't need to know anything about factorials. And the only thing that connects them is this nice little decorator syntax, whereas in Scheme, we wrote the same logic of a traced function, but we had to explicitly call it fact in order to make sure that when the original fact function makes its recursive call, it ends up back in the printing version so that you not only print fact 5 but fact 4, 3, 2, 1, and 0.

So could we somehow generalize this in Scheme instead of having to reimplement this print logic for every function that we want to trace? Could we come up with something like the trace decorator where you write it once and use it over and over again? Well let's explore that idea and write a macro. Here's the factorial procedure. And what happens when you call fact 5 is that you get 120 but you don't get any printed output.

In general, the way you would get printed output would be to give some other symbol to the recursive procedure. Then redefine fact as a procedure that first prints and then returns. And now when we call fact 5, we get the traced version. So originally it gave 120 before we traced it, but then when we redefined it and called fact 5 again, we saw all the output.

What we're going to try to achieve is a situation where sometimes when you call fact 5, you're tracing it and sometimes you're not. In order to get back to the situation where we're not tracing it anymore, we would need to define fact as the original, at which point if we called fact 5, 1 the last time, we'd see that before we trace it, it's 120.

After we retrace it, it gives us the printing and 120, but then when we go back to the original, it just shows us 120 without the tracing. In order to build this logic into a generic macro, we're going to have to turn it into one expression instead of four. So that means writing a begin. And this begin is going to first define the original, then define the new version, then call it.

Now, if we want to make sure that this begin expression has a value, we need to capture the result of calling it, then we switch fact back to its original form, and we return the result as the value of the begin. So running this will give us the same output, where this is now one big expression which shows us the traced version of calling fact 5.

And now the trick is to write this down generically. But since it has a bunch of defines in it that are changing the way fact works, I don't think we can write this as a standard procedure. We need it to be a macro, which traces some call expression to a recursive function. We'll call that expr. And this is going to be something like trace fact 5 to give us the traced version.

So if you're tracing fact 5, you're going to have to print out fact. That's the operator symbol. Let's give that a name. Operator is the car of the expression, so that's something like just fact. And then we have to build this begin expression, so that means quasi-quotation. When we define original, we don't want it always to be fact. We want it to be whatever the operator is.

And so we use unquote in order to make sure that the operator gets evaluated. Then we redefine whatever the operator is, such as fact, to be a new lambda that prints out list, instead of always printing fact, we want to print out the operator, and then the argument n. We still need to call the original on n. That's part of the code that we generate.

When we define the result, instead of calling fact 5 every time, we want to call whatever the expression is. That's for example, fact 5. And finally, we set the operator back to whatever it originally was, so that if somebody calls it again, we don't see some different result. And then we return the result. We close the begin. We close the define macro.

And now we can trace fact 5, and we should see a traced version. Now there is one problem with this version. Let's take a look at what it is. We define fact, call it 120. We build our macro, which is a traced macro. When we apply our traced macro to fact 5, we are printing a bunch of stuff before computing 120, which looks good.

But we're not printing fact 5. Instead, we're printing out the fact procedure, which looks like that. But we really just want to print out the fact symbol. We would achieve that by quoting that symbol, which generically is called operator. So if we run this again, now we see what we were looking for. Calling fact 5 gives me 120. Tracing fact 5 shows me what happened and gives me 120.

But if I call fact 5 after that, everything is back to normal because I went back and defined fact as original again. And the nice thing is that this trace macro doesn't refer to the fact procedure at all. It just assumes that expr is a call expression of any procedure that's potentially recursive that takes one argument. The reason it has to take one argument is that we defined this lambda as one argument.

But you could try to write a more general version as well. And now we've achieved the same separation of concerns that we saw in Python. But this version's even better than Python's. Because in Python, you had to decide whether fact was always traced or not, depending on whether it was decorated. Whereas in the scheme version, we can call fact 5 untraced sometimes and traced other times.

We can even switch back. So it's really whether we trace an expression, a call, rather than whether we trace the whole procedure permanently. And that gives additional flexibility. Cool. Cool. Thank you.

## 33. Part p33 - Lecture 35 - SQL

Databases hold data in structured tables. And database management systems are some of the most important, heavily used, and interesting large software applications there are. Organizations spend a lot of money on their database management systems, and there are also wonderful open source projects. And the way a database organizes the data that it contains is through tables, which are collections of records. These records are rows in the table, and they have a value for every column in the table.

So what would be the records in this table? Well, there's one for Berkeley, one for Cambridge, one for Minneapolis. Those are the rows, or records. The columns describe information about those places. So here's a table, columns and rows. A column has a name. So this is not a record at the top, this is just the name of the columns. And the name of the column tells you what attribute of the record is contained within that column.

Simple enough. It's also typically the case that there's some type of value associated with each column, so these are all strings. A row has a value for each column. And the structured query language is perhaps the most widely used programming language. It is a programming language to generate new tables out of existing tables. And then to manipulate their contents, adding and removing rows, things like that.

SQL, or SQL, is a declarative programming language. In SQL, and also in other declarative languages like Prologue, a program is a description of the desired result, and the interpreter figures out how to generate the result. Imperative languages, by contrast, have programs that are descriptions of a computational process, and the interpreter carries out the execution and evaluation rules for that process. And so much of this course has been about anticipating what the interpreter is going to do when you write a program.

But that's actually trickier in declarative languages. In SQL in particular, there may be multiple ways to actually carry out the computation needed to compute the result that's described by a SQL query. And the database management system will often try to choose the fastest one that would work, but that will depend on the data. So that does change the relationship between the programmer and the program evaluation, because things might be less predictable.

But writing the program tends to be less work, because you don't have to describe how execution and evaluation will be carried out. That's up to the database management system. Okay, so here's another example of SQL. How do we get the tables in the first place? Well, normally they are built up through some process, like some other application, logging information, or somebody typing it in.

But it is possible to create a table from scratch using the structured query language. So I'll teach you how to do that, just so we have something to start with. But just creating the table from scratch is not the main event here. The interesting part of SQL is what happens when you already have some tables and you want to compute some novel results.

Okay, so if I want to create a new table from scratch, I can use the createTable statement, which gives the table a name, cities. And then I can write select and some constants. Here, 38 is going to be one of the values in one of the columns, as tells you the name for that column, and the commas separate different columns. So this select 38 as latitude, 122 as longitude, Berkeley as name, would create a one-row table that looks like this.

Notice that Berkeley is in quotes because it's a value, whereas name and longitude are not because they are names of columns. Now, creating a one-row table is not that useful. We'd like multiple rows. You can do that with union, which takes a description of another one-row table and puts that together into a two-row table. And you can union multiple times in order to, for example, get a three-row table.

Like I said, this is an uncommon way of building a table that would only show up if you're really starting with nothing, whereas most databases already have a bunch of data in them that came from somewhere. The interesting part is what happens when you do something with the cities table. Here, we select from cities. That's the cities table. But we only want some of the rows.

Those with a longitude greater than or equal to 115. Those are the ones on the west coast of the United States. And we're going to add a region column with the value west coast for those. And name actually refers to this name. If I union that with a table full of all the other rows, the ones with a lower longitude, I end up with a table that has a region column, a name column, and tells us which are on the west coast.

And by the way, this is the Massachusetts Cambridge, not the England Cambridge. You can tell by the latitude and longitude. So the interesting characteristics of this bottom query are that we selected only twice, but we got three rows. Well, that's because this actually described two different cities. And the data from the cities table was used to construct this new table. All these names came from here.

And these values came from inspecting the longitude of the rows of the original cities table. This might not seem exciting, but being able to manipulate data in this way is incredibly useful. So we will now learn the details of the SQL language so that you can see the breadth of things that it's able to do. Time to learn a new programming language, the structured query language.

SQL is standardized based on a specification except both by Americans and internationally. But the only people who don't accept it is the people who actually build database management systems. So there are lots of different variants of this language, but mostly the language behaves in the same way, regardless of which database management system you're using. Although these different vendors that produce these big software packages are competing with each other, and so they add various features that the other ones don't add.

We'll focus on a part of the language that's universal. A SELECT statement creates a new table, either from scratch or by projecting a table. A CREATE TABLE statement gives a global name to a table. So you can use SELECT in order to create a table, but you need to create a table in order to give it a name that you can reuse.

And that's all we'll really focus on. Lots of other statements exist. Analyze, delete, explain, insert, replace, update, etc. Actually, there are several more. And they're important if you're actually going to use one of these systems in a large industrial application. But they're not too important for understanding the heart of how SQL works. Most of the important action is in the SELECT statement.

So we're going to focus almost exclusively on how SELECT works. The code for executing SELECT statements fits on a single sheet of paper. So you can build an interpreter for this language quite easily using Python. And we'll go over the details of that in the next lecture. But first, we have to learn how to use the language. We're going to take a break from Fibonacci sequences and integer sequences and all of that.

And instead focus on a theme for the day. And that theme is dogs. I love dogs. I don't actually own this many dogs. But I picked this picture off of the internet because that dog right there looks an awful lot like my dog. If you want to follow along, which I highly recommend, you should install SQLite, which is the simplest and free database management system.

You can download it here. There's an online version of SQLite at this address. Or, if you want, you can use the SQL example Python program from the textbook, which you can find here. It's certainly not as feature complete as SQLite because it's only supposed to demonstrate how to interpret the essence of a SELECT statement. But it will run all of the examples that we'll talk about in this lecture and the next.

So that's one option for you to get started. Our first step is to get some data in some tables. And so we'll use a SELECT statement for that using literal expressions in order to declare which data we want. A SELECT statement always includes a comma-separated list of column descriptions. A COLUMN DESCRIPTION is an expression optionally followed by AS and a NAME. So I can say SELECT, expression tells me what I'm selecting, and then AS NAME, name tells me the name of the column.

And if I put a comma there and some more expression AS NAMES, then I'll have multiple columns in the result. So this would create a two-column table. AS and the NAME are optional. You can have more of these. Whenever you're done declaring different columns, you should put a semicolon at the end. All SQL statements end in a semicolon. If you select literals, which are expressions like the number 2 or the string Berkley, that will create a one-row table.

But if you want to create a multi-row table, you can union together two SELECT statements. The union of two SELECT statements is another table, but it contains the rows of both. You can only union together tables that have the same number of columns and the same type of information in each column. But the two SELECT statements that you union together don't need to have the same names for the columns.

It will just use the names of the first SELECT statement in order to name the columns in the final result. Okay, I promised you dogs. Let's pretend I have a lot of dogs. So many that I need to put them in a database. And I like to name my dogs alphabetically, naturally, so that I can keep track of them. And I also really like U.S. presidents.

Then I might have a dog named Abraham and a dog named Barack. And I might put those into a table. So a SELECT statement with literals, Abraham, and Barack will create a one-row table with two columns, a parent column, and a child column. And the values that go in those are the values of the literals, Abraham the string and Barack the string.

Now if I have more dogs, which I do, then I'll need to union, instead of putting the semicolon at the end, and write out the other rows that I want to include in the final result. So if I also select Abraham comma Clinton, that will add another row that says, Abraham is the parent of Clinton. And over here, I'm just drawing the family tree of all my dogs.

Delano is the parent of Herbert, Fillmore is the parent of Abraham, Fillmore is the parent of Delano, Fillmore is the parent of Grover, and Eisenhower is the parent of Fillmore. There is no interesting historical allegory going on here. I just picked this structure arbitrarily, and I picked the names because they go from A to H. So over here on the left is a valid SQL statement, and it will create a table with seven rows, two columns, a parent, and a child column, and these are the data that will be stored in those rows.

Now, SQL is often used as an interactive language. You just want to see what's in the database. And so, by default, the result of a select statement, or a bunch of select statements unioned together, won't be stored. The result of a select statement is displayed to the user instead. If you want to store it, give it a name, and be able to use it later, you need a create table statement.

So create table just says create table, give the name of the table, and then as, and you can write any select statement there you want. So here's one big select statement. If I write create table parents as, conventionally I will indent this, although that's not necessary. Spacing is totally arbitrary. I've only spaced things out in this way so that it's easy to read.

This is also a fully correct SQL statement that creates a table called parents with this data inside. And if we wanted to draw that out explicitly, we might write something like parents with a parent column, and a child column, and all this stuff inside. Now that we know how to create tables from scratch, let's talk about projecting tables. So select statements can project existing tables into new tables.

A select statement can specify an input using a from clause. So I told you that select statements look like this. Expression is name, expression is nays. These together are all just descriptions of the columns of the result. Select statements can have other things than just column descriptions. The from clause says which table we're going to take rows from in order to create these columns.

A subset of the rows of the input table can be selected using a where clause. So I could say from somewhere, where some condition holds, and then I'll only get some of the rows from this table. And in what order, well, an ordering over the remaining rows can be declared using an order by clause. So now we can see that there are lots of different parts to a select statement.

Column descriptions determine how each input row that remains, after you filter it with where and order it with order by, is projected into a result row. So every select statement creates a new table with rows and columns. The columns are described here. The rows that we choose are here. But the input rows get transformed or projected into the output rows. So imagine I have my parents table, which I already told you about.

And then I write another select statement. Select child from parents. Parents is the name of the table that contains these data, where parent equals Abraham. Well, here are all of the different child-parent pairs, where the parent is Abraham. And the children are Barack and Clinton. So by executing this select statement, we'll get a table with a child column with Barack and Clinton as the rows.

If instead I said select parent from parents, where parent is greater than child, comparison of string values will choose their alphabetical order. So this says parent is later in the alphabet than child. What will be created in the output table? We'll have a table with a single column, the parent column, which will contain all of the different parents that come later in the alphabet than their children.

Fillmore comes after Abraham. Fillmore also comes after Delano. There aren't any other cases like that. And so we get Fillmore twice. So here we can see it's possible to have the same row, in terms of its values, repeated multiple times in the table. Let's actually execute these different statements and watch how they work. I'm going to use the online SQL interpreter. Here is the create table statement for parents.

If I execute it, then parents is defined. I could select all of the columns, that's shorthand for all of the columns, from parents in order to see what's in that table. And it says that parent and child are the two columns, and here's all the data within. So if I want to select the child from parents, where the parent is named Abraham, executing that will give me Barack and Clinton.

If instead, I want the parent, where the parent is greater than the child, we see that Fillmore appears twice. It's certainly also possible to investigate all of these examples in SQLite from the command line. I can create the table that I talked about before, and then select star from parents to get the entire table, which is printed out as values separated by vertical bars.

If I only want a child from parents, where the parent is Abraham, I'll get Barack and Clinton. Select statements can perform arithmetic. In a select expression, column names evaluate to row values. And arithmetic expressions can combine row values and constants together to create new values. We're going to do an example based on chairlifts at ski resorts. Let's say that every lift chair has a number, and it also has the number of single riders and the number of couples riding the chair lift.

So this table would describe, for example, that chair 101 has two single riders and two couples here, shown in green and blue, and chair 102 is three different couples, and 103 is mostly single riders. Okay, let's say I wanted to check the total number of people on each chair. I would write select the chair number, and then an arithmetic expression, single plus two times couple, which is going to evaluate, for each row, the total number of people on the chair.

So here's a row, this chair has two plus two times two equals six people in total, matching this picture. And in fact, it turns out that each row has six people in total, just in different configurations, as we can see. Now, at no point in evaluating this select statement did I mix together numbers from different rows. Instead, I computed this output row from this input row, this output row from this input row, etc.

And I used the names of columns to select the values in each row, and then combine them here with a constant and do some multiplication and addition. Here's a discussion question, given the table ints, that describes how to sum powers of two to form various integers. Compute the following. Well, before I show you what to compute, let's take a look at this table.

So this gives the word names of various integers. It turns out that each positive integer can be expressed as a sum of powers of two. And in fact, there's only one way to do so for each integer. This table is just enumerating how to express each of these integers as sums of powers of two, where the first four powers of two are one, two, four, and eight.

So, for example, we can make seven by adding together one and two and four. Or I can make five by adding together one and four. So the four column either has zero, if zero isn't included in building up this number here, or it has a four. And you can probably start to see the pattern of how to construct integers out of powers of two just by scanning what's going on in these columns.

Okay, so on to the questions. Write a select statement for a two-column table of the word and value for each integer. So it should say that the value for three is three. And include this value for every element here. And when you're finished with that, write a different select statement for the word names of the powers of two. So given a table with this structure, how would you build the words one, two, four, and eight, but leave out five and seven because they're not powers of two?

Think about it for a moment. Then we'll go through it together. Here's the table of ints. If I start SQLite, I can load that table and look at it using select star from ints. Notice something quite interesting. These rows don't appear in the order that I wrote them out in the first place. When you union together a bunch of select statements, you get no guarantees about the order of the result.

That's up to the declarative programming engine, which tries to compute the result efficiently. Now, one thing that union does is it discards repeats. And the way that it discards repeats in some cases is to sort all the rows, to look for whether there's repetition. And that's exactly what happened here. So you can see that it's written all of these in alphabetical order according to the word, which is not what I asked for in the first place, but that's what I got.

And this is one of the properties of declarative programming languages. There's no particular procedure that's defined in advance that tells me how to compute the result of unioning together a bunch of select statements. Instead, it's up to the system to create the correct result. And this is the correct result in whatever way it chooses. And that might involve building the table in a different order than you might expect.

Okay, moving on to the question of how to write a select statement that gives the value for each word. Well, I need to sum up all of the numbers in each row, and I do that by using their column names. So 1 plus 2 plus 4 plus 8 as value, and I select these from the ints table. Now, even though these are names that appear in this column, that doesn't matter.

It's always the case that a select statement's expression will be referring to column names. These 1, 2, 4, and 8 appear. The second question was, how do I select only the words from the ints table that are powers of 2? Well, in order to do that, I need to write a where clause that's true only for the rows that are powers of 2.

And I can find those rows by finding rows where one of these numbers is positive, and the rest are 0. One way I thought to compute that was just to add up all of the values in the rows, but divide out 2 here so that it looks more like 0, 0, 1, 1, 0, 0, 1, 1, and divide by 4 here so that these all become 1s as well.

Once I've done that, I can check whether exactly one of them is 1 by computing the sum and checking its equality. And there they are, the powers of 2.

## 34. Part p34 - Lecture 36 - Tables

So far, we've been projecting just one table, but we can do much more powerful operations by joining tables together. Now, if you ask someone what a join is among two tables, they may tell you which kind of join. There are so many. And in fact, database people have been thinking about this problem so long that they have invented many different kinds of joins and some ways of joining two tables together.

I have multiple names, so it's complicated, but we're just going to focus on one fundamental type. Two tables, A and B, are joined using a comma to yield all combinations of a row from A and a row from B. This is the fundamental idea of what it means to join two tables together is to list all the pairs of rows. So back to dogs.

We'll need a second table in order to do anything interesting. Let's create a table called dogs that has a name for each dog and what kind of fur it has. Abraham has long fur. Barack has short fur, which will indicate using dots instead of dashes. Clinton has long fur. Delano has long fur. Eisenhower has short fur. Fillmore has curly fur. Grover has short fur and Herbert also has curly fur.

Now this table called dogs just declares a relationship between each dog and its fur. What about all that information of whose parent was whose? Well, that's in a separate table. So the full data set describes this tree structure, which gives the parent of each dog and the fur. But since they're in two separate tables, we need to join that information together. Let's say I want to select the parents of curly furred dogs.

F and H are the curly ones. Their parents are Eisenhower and Delano. The following select statement will pull those two out. Select the parent from parents joined with dogs, where the child equals name and the fur equals curly. That's the join. What's going on in the where clause? Well, fur equals curly is straightforward. It's matching combinations of a row from A and a row from B that have fur as curly, which will give us this Fillmore curly row and this Herbert curly row.

Child equals name is a relationship between the row that we've chosen from parents and the row we've chosen from dogs. So this says that the name that's given in the dogs table needs to be the same as the child in the parents table. Now, how do we know which of these names came from which table? Right now, we'll just assume that they're unambiguous, that every column name is different across different tables.

We'll deal with ambiguity in a minute. First, let's just play around with what we have. So I've now put the SQL statements for defining dogs and parents into a file called dogs.sql. I can start SQLite and using the init flag, tell it to execute all the statements in dogs.sql. So it's loaded those resources, which means I can select star from dogs and get all the different options.

Now, if I select all of the columns from parents, dogs, that's a join over these two tables, and we'll see many results. These results are all the pairs of rows. So there is an Abraham-Barack row and an Abraham-Long row. Here they are. There's also an Abraham-Clinton row paired with a Delano-Long row. Now, you might think, these have nothing to do with each other.

All it is is exhaustively computing all pairs of rows. It's up to the WHERE clause to define some relationship between them. So let's start using a WHERE clause. Select from parents, dogs, where, let's relate the times when the dog's name is the same as the child. So we'd write just child equals name in order to get those cases. Okay, we still have four columns, two columns from the parents, two columns from the dogs, but it's always the case that the child and the name column have the same value.

So Abraham is Barak's parent and Barak has short fur. Delano is Herbert's parent and Herbert has curly fur. If we add to our WHERE by saying and fur equals curly, we'll restrict ourselves to only the two rows that we're interested in among the join of parents and dogs. Now, we have to decide how to project these rows to get only what we want.

And what we said we wanted was not all of the rows, but instead just the parents of the curly dogs, which are Eisenhower and Delano. Then we're done. Now we'll have to deal with the interesting case when two different tables have the same column name and we want to be able to pick out one column in one particular table. For that, we have aliases and dot expressions.

We can even join a table with itself. Two tables may share a column name in general, and certainly a table shares the same column names with itself. Dot expressions and aliases help disambiguate. So, here's the structure of our select statement. Select columns from table where condition, order by some order. Table is a comma separated list of table names, and I'll tell you that they have optional aliases.

So, if I want to select all the pairs of siblings, like Barack and Clinton here are siblings because they have the same parent, Abraham, I would write the following select statement. Select a dot child as first, b dot child as second, from parents as a, parents as b, where a dot parent is the same as b dot parent, and a dot child is less than b dot child.

Here, we're not only joining parents with parents, but we're also giving an alias. To this parent as a, and this parent as b. Now, what does this mean to join a table with itself and give aliases? What's going on here is we're looking at all pairs of rows in parents. And that's important because if we want to pick out Barack and Clinton together, we're given only a row with Abraham, Barack, and another row with Abraham, Clinton.

So, if we want to couple these together somehow, we need to consider both of those rows at the same time. Now, the as a and as b are the aliases we're giving to these tables in order to refer to them separately. The last piece of the puzzle is dot expressions, where you say which table you're getting this row from, and then dot, and then the column name in that table.

So, a is an alias for the first parents table, which has a child. And what we're doing here is creating a new column in the output, called first, where its contents is the child from a. And the second column, its contents is the child from b. We join together parents with parents in order to get all pairs of parents. And the where clause says that in the first parent's row, I want the parent to be equal to the parent in the second parent's row.

And that makes sure that we only get together a joined row that has Abraham as the parent both times. What about this part, a dot child is less than b dot child? Well, if the children were equal, then you wouldn't have siblings. You'd just have Barack twice. So, we want them to be unequal. If we just said unequal, then we'd get repeats.

It would say, well, Barack is the sibling of Clinton, and Clinton is the sibling of Barack. But by putting an ordering here, we'll only get result rows, where the alphabetically earlier sibling comes first, and the one later in the alphabet comes second. So, here's the result table. Barack and Clinton are siblings. Abraham and Delano are siblings. Abraham and Grover are siblings. And Delano and Grover are siblings as well.

Any time you join a table with itself, you're going to need to use aliases and dot expressions in order to specify which of the rows you're talking about. In the joined row, the sub-rows within there are either from the parents A or the parents B, and you want to know which child column or which parent column you want to compare. You can even join multiple tables together.

And when you join together multiple tables, you get all possible combinations of a row from each table that you're joining. So, let's get another table in the mix, a grandparents table. Here's what it says. Select A's parent and B's child, where A and B are both rows from different parents' tables joined together. They're joined with the restriction that the parent in B is the child in A.

Now, that defines a grandparent. And we'll call the columns in the resulting table the granddog and the grandpup. How does this work? Well, from parents, we'll get Eisenhower Fillmore. And from the other parents, we'll get Fillmore, Abraham. We'll find that Fillmore equals Fillmore. And therefore, that Eisenhower is the granddog and Abraham is the grandpup. Now, this is just a join on two tables.

But let's say we want to select all grandparents that have the same fur as their grandchildren. Take a minute to think about how you would do that. And in particular, which tables do you need to join together in order to get that result? And the answer should be that Fillmore is the grandparent of Herbert and Eisenhower is the grandparent of Grover. Here's a select statement that will do the work.

Select the granddog, the grandparent, from three different tables joined together. The grandparent's table, the dog's table, and the dog's table again. Now, why do we need so many tables? Well, we need to talk about the fur of the granddog and the fur of the grandpup to make sure they're the same. Since we have dogs twice, we need to alias them. I've aliased them as C and D.

The granddog is C.name, meaning we're pulling out the row from C that matches the granddog. The grandpup is D.name, meaning we're pulling out the row from D, a separate table, where it matches the grandpup. And then we make sure that they have the same fur. So let's try it out. We said we were going to create a table grandparents as what you get when you select A.parent and B.child from the join of parents as A and parents as B, where it's the case that the child of the grandfather is the same as the parent of the grandchild.

Let's see how we're doing so far. If I want to select the grandpups from the grandparents' table, where it's the case that the granddog is Eisenhower, we should get all of Eisenhower's grandchildren, which are all of Fillmore's children, Abraham Delano and Grover. So far, so good. Next, we wanted to join three tables together, which involves selecting the granddog from. The first table is the grandparents' table.

The second is the dogs. And the third is more dogs. And the reason why we joined all three together is so that we could express that the fur was the same for a dog named granddog and another dog named the grandpup. Loading resources will execute the select statement and tell us that Eisenhower and Fillmore are the only two dogs that are grandparents of a grandpup with the same fur.

Numerical expressions in SQL are very similar to numerical expressions in Python. Expressions can contain function calls to built-in functions. They can also use arithmetic operators such as plus and minus and times. Now, these can occur in any expression within a select statement. There's a where expression. There's an order by expression. And within the columns description, which is a comma separated list, there are expressions there as well.

And in all of these expressions, you can add, subtract, multiply, et cetera. You can take the absolute value or round a number or negate it. You can compare different values together. One thing to note is that there are two different ways of expressing not equals and equal. One looks like that. One looks like that. Equality is expressed with a single equals. And why not?

There's no notion of assignment in what we're doing. So the single equals isn't used for anything else. Just to get warmed up for the day, let's do some examples. So let's say I have a table of cities with their latitude, longitude, and name. Berkeley, Cambridge, Minneapolis, San Diego, Miami. And the North Pole isn't really a city, but we'll go with it anyway.

If I want, I can say select name from cities where the latitude is greater than or equal to 43. Now 43 is pretty northern. Northern than that, you start getting to pretty cold places. So if we wanted to give a name for this select statement, I would probably call it cold. So if I start SQLite, initializing with this file, I've loaded those resources and I can select name from cold and find that Minneapolis and the North Pole are both cold.

But that's not every place that's cold. Chicago is also cold. So I can use a union in order to get Minneapolis, North Pole, and Chicago all in one table. Now what about arithmetic? Well, let's say I want to compute the north-south distance between cities. North and south really matters because that affects climate more than east and west. Well, I'd say something like create table distances as selecting the names of two cities.

Let's call this first and this second. And then what we want to select is some expression that computes the number of nautical miles north that you have to go to get the second city from the first city. There are 60 nautical miles in a degree of latitude and we have the latitude degrees right here. So I could say 60 times the difference between B dot latitude and A dot latitude.

And we'll call that the distance. Now, we have our column descriptions but we still have to say what we're selecting from. We've referred to A and B so far. Those are different versions of the cities table which we have to join with itself in order to compute the latitude difference among two different cities. Cities as A joined with cities as B. So now, let's say I'm in Minneapolis and I think I want to get somewhere far away from here.

I would say select the second from distances where first is Minneapolis and we want to order the results by the distance. So a negative distance will come first and that means going south as far as possible. People from Minneapolis really like to go to Miami and San Diego, not so much the North Pole. So here's an expression that does some sort of manipulation of numerical values and that's very typical in a SQL expression.

There are also combinations involving string values, string expressions. So string values can be combined to form longer strings through the concatenation operator which looks like two vertical bars. So if I want to put together hello comma and space world to get hello world, I just write it like that. And this is a very common thing to do. So I've given it the green light.

There's also ways to do basic string manipulation that are built into SQL. They're different from Python and honestly, the language doesn't have the best support for string manipulation. So let's say you have a table already called freeze, which has hello world in it as a column s. People do write expressions like these. The substring of s that goes from position four and has length two.

Concatenated with the substring of s that starts at the place in s where you find the first space plus one and has a length of one. Selecting that from the phrase table gives you one row back, which gets this l and the o for the first half and the w for the second half. If you want to learn more about these string manipulation functions, of course, I recommend that you do so on your own.

But I won't go over the details because I don't think they should be used as much as they are. Strings can even be used to represent structured values. But doing so is rarely a good idea. So for example, you could think each row is actually going to represent a linked list in a table called lists. I'll have one column for the car or the first element in the linked list.

And in this case, it's just a string one. And then the cutter column will have comma separated elements for the rest of the list. So in this way, I'm using a string but putting in some delimiting character to try to remind myself where one element ends and the next one begins. And that's what I mean by using a string to represent a structured value.

This is supposed to represent a list with three things in it. And then people will do things like, oh, let's get the cutter by looking in the cutter, finding the first comma, and then getting the first element there. And that would return me the two from this two, three, four. So it's certainly possible to do structured manipulation like this, but typically it's not a good idea.

There are certainly better ways to manipulate data structures than by trying to put them all inside of a string in a table in a database. But anyway, let's take a look at combining strings together. I could create a table called nouns, which will have dog in it. Dog is a noun. How about a cat? And why not a bird? Okay.

Now that we have some nouns, we can select a whole sentence by getting the subject, phrase, concatenated with chaste, and concatenated with the object phrase. Where are we getting these subjects and objects? Well, those are just nouns. We'll need to join two nouns together in order to build up different sentences. You don't want dogs just chasing dogs. We like dogs to be chasing cats.

And maybe we'll put in a requirement that the subject phrase is different from the object phrase. Let's see what we get. The bird chased the cat. The bird chased the dog. The cat chased the bird. The cat chased the dog. The dog chased the bird. And the dog chased the cat. But can we build more sentences? Well, sure. We're going to create a table called ands, which is just a dog and a cat.

We'll get this by selecting from the nouns as first and nouns as second. And I like this idea of saying where we don't want the first phrase to be the same as the second phrase. Now I can make this even more interesting by selecting not from nouns but from the ands. We can give a name to this column. And then we can run it to see that the dog and the bird chased the cat and the dog.

And the dog and the bird chased the dog and the cat. Et cetera. All the different ways that language can combine.

## 35. Part p35 - Lecture 37 - Aggregation

In the SQL language, you can perform aggregation over multiple rows using aggregate functions. So, so far, all SQL expressions have referred to the values in a single row at a time. What do I mean by that? Well, if we look at the structure of a SELECT statement, we see that there are expressions in the column descriptions, also in the WHERE clause and the ORDER BY clause.

Each one of these expressions can refer to column names in this table. But what they actually are referring to is the value in a particular row for that column. So, when you use an expression here in order to filter the rows of the table, using an expression such as the latitude of some city is greater than 38, what you're evaluating is whether the value of the latitude column for a particular row is above some number, 38.

And if so, you keep that row. Otherwise, you get rid of that row. But the expression itself is evaluated per row. Everything we've seen has looked like that so far. But now we're going to look at what's called an aggregate function, which can appear in the expressions in the column descriptions. And it computes a value from a group of rows. For instance, by summing together all of the different values for a particular column.

So, we're going to introduce a new data set in order to study this problem. Here's a table of animals. A dog is a kind of animal with four legs and weighs about 20 pounds. A cat has four legs and weighs about 10 pounds. A ferret has four legs and weighs about 10 pounds. That's pretty big for a ferret actually, but let's just go with it.

A parrot has two legs because it's a bird. And it weighs about six pounds. A larger bird would be a penguin, which has two legs and weighs 10 pounds. And then I was trying to think, what's something with two legs and weighs a lot? You might think an ostrich, but I chose a T-Rex, which weighs about six tons. So, here's my table of animals.

And now, I can write select statements that refer to the animals table. Here is a select statement that contains an aggregate function in its column description. Select max legs from animals. Legs refers to a particular column in this table. And max legs is a computation over multiple rows. So, we haven't included a where clause. We haven't included any filtering. And yet, instead of having a six row output from this six row input, we get only one output row, which takes the maximum value over every value that appears in the legs column.

So, this thing is called an aggregate function, max. And you can also take the min and the sum and some others. So, let's try it out. First, I'm going to load the same table that you saw before. Now, I can select the max number of legs from animals. And I'll get four. I could also select the sum of the weight of every kind of animals.

And I'll get 12,056, which is what you get when you sum up all of these weight numbers. The argument that I pass to max can be an arbitrary combination. I can ask, what is the maximum value of the legs minus the weight? Six is negative four, which is the biggest value I can get from any row, plus five gives me one. Okay.

It's also possible to combine multiple different aggregations. I could select the maximum legs and the min weight from animals, which would be four and six. Now, there's no animal that has four legs and six weight. So, these are computed independently of each other. I can even combine them. I can take the maximum legs and subtract out the minimum weight, and I'll get negative two.

Now, all of this can be combined with a where clause. So, I could say, select the min legs and the maximum weight from animals. But perhaps, I don't want to include the big guy, the T-Rex. So, I could say, I'm only interested in rows where the name does not equal T-Rex. Sorry, where the kind does not equal T-Rex. And then, I'll get the maximum weight is actually 20, which came from the dog.

Now, in addition to min and max and sum, you can also compute the average value. So, the average number of legs from animals takes an aggregation over all six rows and comes up with 3.0. You can also count the number of legs. Now, what does count do? Well, it just tells you how many different rows there are. So, there are six rows in animals.

It doesn't matter whether I count the legs, or I count the kind, or I count the weight. I'll get the same thing. Which is why a more typical syntax uses this special form, count star. And count star just counts the rows. Now, there is a reason why you would put a particular column name inside count. And that reason is that there is a special keyword called distinct, which you can place before a column name.

And then, it will count the number of different distinct legs. So, there's four legs, or there's two legs. What about the distinct values for weight? Well, there's four of them. There's 20, 10, 6, and 12,000. This distinct keyword can also be applied to the sum. So, this sums up 12,000, 10, 6, and 20, leaving out the repeats. Now, it's possible to come up with column descriptions that mix aggregate functions and single values that don't include aggregate functions.

What you get is the number of rows that you would get from aggregating. So, an aggregate function also selects a particular row in the table, along with aggregating the value that you ask it to aggregate. And that row may be meaningful. So, what do I mean by may be meaningful? Well, if you ask, what's the max weight as one column, and then the kind as another column from animals, you end up getting one row.

And the row you get has a maximum weight of 12,000. And what kind do you get? Well, you get the kind T-Rex. How does that work? Well, what happens is that when you maximize the weight, it selects this weight, but it also selects this whole row. So, they're referring to kind, or legs at this point, will tell you about the maximal value.

Who is the animal that weighs 12,000 pounds? Well, that would be the T-Rex. Now, what if you ask, what's min kind comma kind from animals? Well, min kind will compute the minimum in alphabetical order. That would be cat. And it will select this whole row. So, if you pick out the kind from that, you'll get cat again. Now, you don't always get something so sensible.

If I say select max legs comma kind from animals, what should I get? Well, there's actually four different animals that all have maximal legs. So, you'll get something arbitrary. Or if you say select average weight comma kind from animals, then there's all these different weights. Which one should you pick? Which one is the average? Well, none of them are the average. So, we can try this out.

And you'll see sometimes you get a meaningful value, sometimes you don't. So, what we'll do is we'll select the maximum weight from animals. We get 12,000. If we ask for the kind as well, we'll find out it's the T-Rex. The minimum weight and the kind is six and it's the parrot. If we ask for the minimum kind, then that will check lexicographic order or alphabetical order and pick cat.

And then it picks out that whole row. So, a cat is a cat and it has how many legs and how much weight? Well, four and ten. Now, when you select out the average weight from animals, that gives you something meaningful. So, you can select the average weight from animals. So, if you also try to select what kind is that? It tells you it's the T-Rex.

And what does that mean? T-Rex is not average in any way. So, you have to be careful about selecting single values in conjunction with aggregations. Some aggregations give you a meaningful value, like min and max. Others don't, like average. And that last example we talked about, what's the maximum legs? Well, that's four. If I ask for what kind is that, there's no clear answer because there are three different things that have that many legs.

And it gives us cat. But cat isn't really the right answer. I mean, a cat or a dog or a ferret all have four legs. An aggregate function takes all values of some expression, such as a column name, from all the rows in a group and does something with them. It takes the max or the sum. Now, by default, all rows that are used to compute the final table, meaning the ones that passed the filter in the where clause, are all in the same group, one big group.

And so, the result, when you apply an aggregate function, only has one row. But it's actually possible to define a SELECT statement with multiple groups. So, rows in a table can be grouped together. An aggregation is actually performed on each group individually. So, here's another form of a SELECT statement. It says SELECT. Still has column descriptions. Remember, these expressions can contain aggregate functions.

From some table, where I group by some expression. And I keep the groups having some property. Group by and having are both new. Let's focus on group by. The number of groups is the number of unique values of some expression, which you place here. So, here's our animals table. And here's a SELECT statement that says SELECT the number of legs and the maximum weight.

From animals, group by legs. What group by does, is it partitions all of the rows from the animals table by the unique values of what value is in the legs column. So, we have four here. We have two here. Those form two different groups. The legs equals four group and the legs equals two group. Each of those is going to result in a different row in the table that we get by selecting legs comma max weight.

Now, legs here, because it matches the group by, will give us the value of the legs for that group. It's really giving us the legs value for some arbitrary row, but they're all the same. So, we get four. And then, it computes the maximal weight by maximizing over all the rows in this group. So, the maximum weight for a four-legged animal is 20.

And the maximum weight for a two-legged animal is 12,000. This notion of grouping together rows and then aggregating those groups is actually quite powerful. So, let's look at some more examples. I can select the number of legs in each group from animals where I group by the number of legs. That will give me four and two, which are the unique values of the expression legs.

Now, I can also compute the count of the number of rows that have those many legs. Okay. So, there are three different animals with two legs and three different animals with four legs. And like I said, I could also compute the maximum weight in each of those categories. 12,000 pounds for a two-legged beast, 20 pounds for a four-legged beast. It is possible to group by more than one column at a time.

So, I could get the legs and the weight from animals where I group by both the legs and the weight. So, here's all the unique combinations of a value for legs and a value for weight. Notice there are only five, whereas we had six rows in the beginning, because ferret and cat have both the same attributes. I can actually group by any expression I want.

So, I could get the maximum kind along with the value of dividing weight by legs from animals where I group by the value that I get dividing weight by legs. Now, SQL performs integer division when it divides two integers by default. So, what I'm dividing is 20 by 4 to get 5 or 10 by 4 to get 2 or 6 by 2 to get 3 or 10 by 2 to get 5.

And I see that there's various values that I get. And here, it's picking the alphabetically last kind of an animal for each ratio of weight to legs that I can possibly get within the animals table. So, here we've seen grouping by a particular column value, multiple column values, or an arbitrary expression. Now, sometimes when you group rows together, you want to keep some of those groups around and get rid of others.

A having clause filters the set of groups that we keep for aggregation. Now, we also have a where clause to filter individual rows. But a having clause can even include aggregation itself. So, here is a select statement where we've said we want to keep the result of weight divided by legs and the count of the number of rows that have that weight to leg ratio from the animals table.

Where I group by this arbitrary expression, weight divided by legs, but I only keep the groups that have a count greater than 1. So, how does this work? Well, it computes weight divided by legs for each row. Weight divided by legs can be 5 or 2 or 3 or 5 or 6,000. We group by this value. So, the unique values are 5 or 2 or 3 or 6,000.

And then, we apply the having clause to filter any group that doesn't have a true value for this expression. So, the count has to be 1, which means that we need weight divided by legs to be 5, which has a count of 2. Or, weight divided by legs is 2, which has a count of 2. But, both of these groups are discarded.

## 36. Part p36 - Lecture 38 - Databases (Optional)

A table can be given a name with create table and that name can be forgotten using drop table. We've already seen create table statements but there is an alternative version that we haven't looked at yet. Here from the SQLite documentation is the complete syntax for a create table expression. You can write create table or create temp table or create temporary table. You can optionally include if not exists.

After that you can write down schema names, table names, column definitions, table constraints, etc. Some of these are in fact compound expressions. For example, a column def means writing down a column name, a type name, and a column constraint. You can have multiple column constraints and the type name is optional. A column constraint is one of many forms. You could give the constraint a name, say it's a primary key, not null, unique, check, default, collate, foreign key clauses.

There's really a lot to a create table expression but we're not going to focus on all of it. That's for a databases course. Instead, we'll just focus on the version we've already seen where you say create table, give it a name, and as select statement, or a version where you create an empty table. We're going to ignore all of these parts of the syntax and instead just focus on what's left over in black.

You can write create table. If you want to make sure you're creating a table that doesn't exist already, create table, if not exists, creates a table only if that name doesn't exist already. You give the table a name and then you can either write as followed by a select statement, we've seen that before, or you can specify the columns directly by enclosing in parentheses a list of column definitions.

A column definition involves naming the column and applying zero or more column constraints. The only column constraints we'll worry about for this course are that you can say the values are unique and then an error will be raised if you try to put the same value twice in the column. And you can give a default value to a column and this default value is used when we insert new values into a column.

So, here are some examples. You could create a table of numbers with a column n and a note about each number n. I could alternatively create a table of numbers where I specify that n is unique. So, I can only have one note per unique number n. If I want to make sure there's always a note, I might set a default value such as no comment.

Now, you might wonder what's the use of an empty table. Well, soon we'll see that you can add new rows to an existing table and so it won't be empty forever. Drop table is simpler. That just removes the name that exists already from a table. So, you write drop table and then the table name. We won't worry about this detail of the syntax.

And if you want to only run this if the table already exists, then you can write drop table if exists. Now, if without this if exists clause, if you run drop table on a name that doesn't exist, you'll reach an error. Creating an empty table is only useful if we're able to modify it. And in fact, any table can be modified by inserting, deleting, or changing the rows.

Here, from the SQLite documentation, you see that there are many different variants of how you might insert rows into a table. We're only going to focus on certain paths such as writing insert into the table name specifying the column names or you can skip specifying the column names. And then, you either write down a select statement that adds all of the rows in that select statement to the table or you specify values directly by including those values in comma separated lists.

Each set of parentheses will create one new row. And what you separate by the commas are the values for the columns in that row. For a table that has two columns. If you want to insert into just one of the columns, then you write insert into t. You say which column you want to insert into, then the keyword values, and then in parentheses, you'd put only the one value for that one column.

A whole row will be inserted and default values will be used for the other column. If you want to insert into both columns, then you can say insert into t. You don't specify which columns, so that means all of them, and then you get the values that you're inserting into each of the columns. Both of these insert into statements would insert one row.

If you want to insert more rows, then you just follow these parentheses by comma and more parenthetical row descriptions. Let's take a look at a demonstration. I'll start up SQLite and create a table that keeps track of positive integers and whether or not they are prime. Let's call it primes. And now I'll specify that there are two columns, n and whether or not it's prime.

Now I didn't apply any column constraints there, but I could have. One way to change what I've done is to just drop the table and start over. Now that table is gone. I cannot select star from primes because primes doesn't exist, but if I create it again, then it will exist. So let's make sure that each of these is unique and that prime has a default value.

Now there are no Boolean values in SQLite, so you can't have true and false, but it's conventional to use one for true and zero for false. And let's assume things are prime unless proven otherwise. So by default, we'll have prime be one, meaning yes, I think this number is prime. Now I can select star from primes. I see no contents, but I don't see an error because the table does exist.

Now I can insert into primes the following values. Two is prime and three is prime. And now if I look at what's in primes, I see two and three. Both of them are prime, so that's why we have ones in the prime column. Now prime is default one. That means if I insert into just the primes end column, then I'll get the default value for the other column.

So if I insert the values four, five, six, and seven, now I have two, three, four, five, six, and seven in my table. This claims they're all prime. That's not quite true. Four and six are not. We're going to clean that up later. What's a quick way to get even more integers into my table? Well, I could insert into primes end the result of selecting all the values in primes.

So let's put n plus six from primes into my table. And now I've got two, three, four, five, six, seven, eight, nine, 10, 11, 12, and 13. Now that primes is different, if I insert again, I'll have an even different effect. So here's what we get when we add 12 to each result that's in there now and add all those rows as well.

It's also possible to update the contents of existing rows. We write update, a table name, set, which column names you're going to change, followed by an equal sign, and the expression that computes the new value for what you're going to put in that column. Now you may not want to update all rows in a table, but only a subset, and so you can include a where clause in order to say which rows you want to change.

Let's use update to fix the prime column in the table we've already constructed. So far, we have a primes table with an end column and a prime column. We'd like these to be zero for all composite numbers such as four and six. Aside from two itself, all the multiples of two are not prime. So I could update. We're updating the primes table.

We're setting prime, that's a column name, to zero. That's a value to place in the prime column. Now I need to say which rows I want to make this change for. I want to make it for all the rows for n greater than two, where two evenly divides n. Now if I run the same select statement, I see that the multiples of two aren't prime anymore.

If I apply the same logic for multiples of three and multiples of five, then I have correctly marked for the values between two and 25, which ones are prime and which ones are not. So sometimes it's easier to build a table, not just all in one go, but by manipulating the values after constructing it initially. And that's what we've done here in order to list out some numbers and whether or not they're prime.

Finally, it's possible to delete rows. You say delete from and then what table to delete from. You don't have to delete all rows. Instead you can provide a where expression in order to delete just some of the rows. But without a where expression, you will delete all of the rows in the table. The table will still exist, so this is not equivalent to drop table.

But that table will have no rows, only empty columns after you delete from it. So for example, I could delete from primes where prime equals zero. And then if I select star from primes, I see only the prime numbers remaining. Python and SQL can be used together. In particular, a Python program can construct and then execute SQL statements. Let's take a look.

Here's a Python program. There's a built-in module called SQLite3. SQLite3 has a class called connection. To construct a connection, I pass in the name of a database file. It could be anything. How about n.db? And this connection object can be used to execute SQL statements. So for example, I can execute select two union select three, which would give me a two row, one column table, semicolon.

Now just constructing this table won't allow me to do anything with it. If I want to give it a name within the database, then I write create table. These are numbers, so I'll call it nums. So here we see how Python and SQL work together is that within Python, I can construct a string that is a SQL statement and execute it on some database.

Now I haven't run the program yet, so nothing's happened, but let's execute one more. Let's execute an insert into statement. I could explicitly write out the values four, five, six. Or I could write a Python expression that computes the values four, five, six. For example, the range four through seven, not including seven. And then I can include in my SQL statement some holes that get filled in by the data passed in as the second argument to execute.

So in this way, we can construct any sequence we want using Python and then integrate that into a SQL statement. So here we've created a table, changed that table. We can also read from the table by executing select star from nums. Oh, and I forgot a semicolon up here, I'll need those too. When I select star from nums, execute returns what's called a cursor object.

And this cursor has a method called fetch all, which will fetch the contents of the resulting table as a list of tuples. Let's print those out so we can see what happened. And finally, let's clean up the syntax of our SQL statements. Everything else looks okay. Let's see what happens when we run it. All right, here's what Python printed out. Five tuples, each one has one element, and that element is the contents of the row.

When you modify a table to ensure that the file representing this database stores all of the changes, there's one more method you need to use, which is called db.commit. If committing is successful, then this file contains all the contents of the database just as you constructed it by executing this series of SQL statements. Every time I run this program, a file called n.db is constructed.

Let's run it again. There's n.db. If I start SQLite using n.db as my database, then in fact, all of the contents that Python put into that database are there. There's a table called nums, and it has two, three, four, five, six as its contents. So that's how you can write a Python program that interacts with a SQLite database. And similarly, you can write Python programs that interact with lots of different kinds of databases.

It tends to be that this one is built into the standard library, whereas other ones you have to install the connections. Multiple programs can be connected to the same database at the same time. They can all be inserting values and reading values from the same tables. And one of the interesting things about database management systems is that they can handle the fact that multiple different connections are made to the same database and that multiple different clients are trying to change the same table.

Let's look at an example of this by simulating a game of blackjack. In casino blackjack, the player is dealt two cards and the dealer is dealt one card face-up and another card face-down. So if I'm the player, I might get a seven, and then the dealer gets a jack, and then I get a nine, and the dealer gets some face-down card that I don't get to see.

The goal in blackjack is to have more points than the dealer. But if you go over 21 points, then you lose the game. You can request additional cards in order to get more points. The suits of the cards don't matter, so I've just used spades everywhere. All that matters are the numbers. And the cards two through ten just count for their point values that are written on the card.

All of the face cards, jack, queen, king, count for ten. And aces are special. You can choose whether to count them for one point or eleven points. So, if seven and nine make 16, I might worry that the dealer is going to have more points than me, so I might request an additional card. Oh, I got a five. Now my total is 21.

That's very good because I haven't gone over 21, but I'm likely to have more points than the dealer. Once the player has finished requesting cards, then it's the dealer's turn. In casino blackjack, the dealer first flips over the card that isn't shown and then must continue to draw cards until reaching a number between 17 and 21. So, 13 is not between 17 and 21, so it draws an additional card.

This can either be worth one, making 14, or 11, making 24. But 24 goes over 21, and that would cause the dealer to lose. So, the natural choice is to count it as only one. So, now the dealer has only 14 points, draws another card. If it comes out as 10, now the dealer has 24 points and is over 21. That's called going bust, and that means that the dealer loses this hand of blackjack.

If instead of a 10, it had been a 7, the total would have been 21, and they would have tied. Alright, let's use Python and SQL together to play some blackjack. This is a longer program, but not too long, so I think we can read it together. First, we store the points for each card in a dictionary. Where aces are worth 1, or 11, we'll handle that fact later.

Jacks, queens, and kings are all worth 10, and then 2 through 10 are just worth that many points. So, a 2 is worth 2, a 3 is worth 3, etc. Points.update just takes a dictionary and adds more elements to it from another dictionary. Here we have a way of scoring a hand. A hand is a sequence of cards. We get the points for each card using the points dictionary, and we sum them up.

If it turns out that the total is less than or equal to 11, and I have an ace, then I should count that ace as 11 points instead of 1 point, which gives me an extra 10 points. So, in this way, if I have, for example, a jack and an ace, total will come out to 11, but the ace would let me get 21 instead, which is a better score.

Alright, so those are the rules of blackjack encoded as a Python function. Now we're going to create a database, cards.db. We're going to assign SQL to the function db.execute, just so I don't have to type db.execute over and over again. Every time you see this, think db.execute, because they're the same thing. I'll drop table if it exists cards, so I can start fresh and then create a table cards with two columns.

The card, which would be 2, 3, 4, 5, 6, 7, 8, 9, 10, or jack, queen, king, ace. And then who has it, the dealer or the player, or has it been discarded? To deal a card, we insert that card into the cards table. And then we commit the result to make sure that it's reflected in cards.db. To compute the score of any player, we get all the cards for that player.

Select star from cards where who equals either the player or the dealer. That's a Python value that we pass in. And then we compute the hand score for every card that we get by fetching all the cards. You go bust when you have a score greater than 21. The two players are the player and the dealer. And here's what it means to play a hand of blackjack.

You have to have a deck of cards. You pop off the first card and deal it to the player. The second card goes to the dealer. The third card goes to the player. And then there's a hidden card. We're going to pop it off right away, but we're not going to deal it because we haven't shown what it is yet. Now, we're going to use the built-in input function in Python to ask the user what they want to do.

If they say, yes, I want to hit, hit means get another card, at which point we'll deal another card. If that makes the player go bust, then the player loses and the hand is over. If at some point the player decides not to hit but to stay, then it's time to flip over the dealer's hidden card. So we deal that to the dealer.

And then we keep dealing cards to the dealer until the score is greater than or equal to 17. Deal, deal, deal. If at any point the dealer goes bust by going over 21, then we say so and the hand is over. Otherwise, now there's a player score and a dealer score and we compare them. And that's how we know who won the hand.

A deck of cards has four copies of each card, one for each suit. We put them in a list. They are the keys of the dictionary called points, which we constructed earlier. We'll shuffle the deck using the built-in shuffle function of the random module. And then we'll just start playing hands. So we'll deal, play a hand, and then at the end of the hand, we'll move all of the cards that are in players' hands into the discard pile.

And now we have a fully functional game of blackjack. We've dealt a hand. Shall we hit or stay? Well, that really depends on what cards I have. How do I know what cards I have? I can make a second connection to the database and take a look. I just need to know the name of the database file, cards.db. I can connect to it with SQLite.

And then I can take a look. Select star from the cards table. I see the player has a three and a four and the dealer is showing a seven. Well, I only have seven points, so I better hit. What did I get? Oh, I got a jack. Now I have 17 points and the dealer has seven. I think I'll stay. A python simulator played out the hand and the dealer ended up with 17 points.

If we want to see exactly what happened, we can look and see that in the last game, the dealer had seven and then the dealer also had a queen that was hidden. And when that queen was shown, the game ended 17 to 17. All right.

We've dealt a new hand. The player has a jack and a six. That's 16 points. The dealer has a six. Even though I have a low score, I'm nervous about taking another card because I might go bust. So let's stay where we are and see what happens. Oh, I had 16. The dealer had 18. And so I lost the hand. It's dealt another hand.

So let's try again. At this point, it's hard to see what's going on because there are so many discards. So let's simplify that by saying where who does not equal discard. And now I see that as a player, I have a four and an ace. That's either five or 15 points. Either way, I need more. Now I have a nine, an ace, and a four.

In total, that's 14 points. I think I should take another one. Oh, I went bust. So I lost that hand too. And we've dealt another hand. Let's see what I've got now. I've got a five and an ace. That's either six or 16. I think I'll take a hit and see where I am. Now I have five, ace, and ace. That's either seven or 17.

I'm curious what will happen next. But I could actually predict what might happen by looking at all the cards. What's gone by already? Since I have access to all of the discarded cards, I can see that very few tens have been played. In fact, if I really want to see what's going on, I should look at what card there is and its count from the cards table where I group by the card.

So I can see that there's been one 10 played, three jacks, one queen, but no kings. So there's a lot of kings left. There's a lot of tens left. There's a queen left. There's a reasonable chance that I'll draw a 10 on the next hit. Let's take another look at what I have. Well, I have 17. The dealer has six. There's a chance the dealer's going to get a couple of tens in a row and go bust.

So I think I'm not going to hit and see what happens. Ah, that dealer went bust just as I predicted by counting the cards. Now, in a casino, counting cards like we did by remembering what was in the discard pile is against the rules, but it can help you win. All right, let's look at one more hand. We've got a four and a queen.

14 is really not a good hand because the dealer has a nine. That means they could have 19 points with that hidden card. Wouldn't it be nice if instead of a queen and a four, I had a queen and an ace? Well, then I'd have 21 points. So something else that's against the rules in casino blackjack is to just change the cards.

Let's see what hand I have now. Ah, an ace and a queen. I don't think I need to hit after all because I already have 21 points and I've won the hand. So here's an example of two programs connecting to the same database, manipulating it together. One of those programs is a Python simulator for blackjack and one is the interactive SQLite, read, eval, print, loop.

## 37. Part p37 - Lecture 39 - Final Examples

In this course, we've discussed trees many times. Tree structured data could be represented either using a list using the tree data abstraction, which has this constructor and these selectors, and a helper function isleaf that tells you whether or not a tree is a leaf, or later in the course, we discussed how you could represent the same thing using a class. In the case of a class, you use attributes in order to record the components of a tree, the label and its branches.

No selectors are needed because we just have the attribute names, and the helper function is instead a method, which you call onself to tell whether there are any branches. A leaf is a tree with no branches. But these aren't the only kinds of trees, and neither of these are built into Python. That's because the notion of a tree in computer science is an abstract one that generalizes over anything that has component parts that are also trees.

The key characteristic of a tree is that a tree contains other trees, and importantly, a tree can contain more than one other tree. We see examples when we look at nested lists. That's like a tree structure, where this nested list contains other nested lists. An expression in Scheme or in Python is also a tree structure. This call expression has operand sub-expressions, which themselves are call expressions.

Here is a syntactic analysis of an English sentence. A sentence has a noun phrase, a verb phrase, and a punctuation mark. So that's a whole phrase that decomposes into smaller phrases, which decompose into smaller phrases still. Again, tree structure data. The way in which the layout of a web page is stored is using a programming language called HTML. The hypertext markup language is tree structured as well.

Here we see a tag describing an unordered list, which has within it tags that describe list items, and those tags have tags within them as well. Here this is how you indicate that the one is supposed to be bold. So trees appear anywhere. There's hierarchical structure in the data that we try to represent. And tree processing often involves recursive calls on subtrees.

So one of the primary reasons to learn about recursion is in order to manipulate tree structured data. Let's work through an example tree processing problem together. In this example, I'm going to focus in great detail on a problem solving process. You've solved a lot of problems in this course already, and so hopefully you've developed your own process. But now is a great time to really think about what the process is that you go through when you read a problem and you don't know how to solve it right away.

Because let's be honest, for most problems, it's not obvious how to solve them right away. What's true on exams, that's also true when you're building software for independent projects. Even so, you need some method to get yourself unstuck after reading the problem description and work your way incrementally toward a solution. Now I don't expect everybody's problem solving process to be the same, so I'm not going to be very prescriptive about how you go about it.

But I do want to talk through some possible elements in an effective process for problem solving. First, we need a problem. Implement bigs, which takes a tree instance t containing integer labels. It returns the number of nodes in t whose labels are larger than any labels of their ancestor nodes. And here's an example. I would recommend that you follow the same process, whether you have a template giving you a hint about the structure of a solution, or whether you're writing the program from scratch.

That you don't start writing code right away, or even think about what code might be there already. But instead, think about the problem you're trying to solve. Step one, understand the question. The first sentence looks pretty straightforward, but the second one, it returns the number of nodes in t whose labels are larger than any labels of their ancestor nodes. That's the heart of the question, and it's less straightforward.

It's very abstract to talk about labels and ancestor nodes without focusing on a concrete example. Unfortunately, one's presented to us. So after reading the problem carefully, perhaps making notes that t is a tree, that bigs should return a number, it's time to work through an example and study it for a while before ever trying to write code. Now here, we have a tree and a drawing of that tree.

If this drawing were not here, you should draw it yourself, whether you're trying to solve an exam problem or implement something on your own. A diagram is almost always helpful. And now we need to figure out an example of this notion of a node that has a label that's larger than the labels of the ancestor nodes. So let's pick a node. Every one of these numbers is a location in the tree.

And a node is just a location in the tree. Now each location in the tree is the root of a subtree. So here's one, five. Is a node, what are its ancestors? Well, that's its parent, or its parent's parent, or its parent's parent's parent. Especially on an exam, I would define that for you. And then we can check this property. Is it the case that five is larger than four and one? Yes.

So that's actually one of the nodes in this tree that we're looking for. Knowing that the answer is four is really not that helpful. We need to figure out which four nodes have this property. So let's go through and check them all. How about we start at the top? One, is it larger than all of its ancestors? Well, it doesn't have any ancestors.

So let's say yes. And we'll check later and make sure that matches with the example that's provided. Four is larger than its only ancestor one. So that counts two. But this four is not larger than four. And so it's not one of the nodes whose label's larger than the ancestor labels. Okay.

Three. Three is larger than one. Notice that three has nothing to do with four or four or five because those are not ancestors. That observation might help me write the function when I go about that in a moment. Zero is not larger than three, so it doesn't count. Two is larger than zero. But it's not larger than three, which is an ancestor.

And so it doesn't count either. So this example helped me find something to be careful about. I can't just look at the parent. I have to look at all of the parent's parents and parent's parents' parents in order to figure out whether it's one of the nodes I'm trying to count. Okay.

So we got the number four. And that means that I correctly classified the top node. And so I've discovered something about the problem. The root label is always larger than all of its ancestors because it doesn't have any ancestors to be smaller than. Now, before trying to just write out the implementation, it's worth thinking about what I expect to appear somewhere within the implementation.

I might expect typical tree processing patterns. Like maybe this is one of those problems where you see if T is a leaf, you do one thing. Otherwise, you aggregate recursive calls applied to each of the branches. Well, if I knew how many nodes with this property appeared in all of the branches, then I could just worry about the root node and I'd be done.

So this seems pretty good. But I think the problem with this structure is that if I've made a recursive call and then another recursive call and I've reached a leaf, it's hard to tell whether that leaf is a node whose label is larger than the ancestor nodes. Because at this point, I only know about the leaf itself and some of these leaves have the property and some of them don't.

So I can't figure out a way to make this typical structure fit. Instead, I'll have to try something else. If you think about an option for implementing and it doesn't work out, I don't think that's a problem as long as you work through that option quickly. Notice what's wrong with it and then move on. So now we want to enumerate what the solution should have.

It should have some way of incrementing the total count. That's what I did when I worked through an example. I looked at each node and either added it in as one of the elements that I'm counting or not. I also need to check for a particular node whether it has this property. And so I'm going to need a line something like, if some node's label is greater than the max of its ancestor labels, then it's larger than all of its ancestor nodes.

And so I would need some way to track the list of ancestor labels that I've seen so far. Or maybe there's a more efficient way. Maybe I'll just track the largest ancestor I've seen so far. Then I can check and see if the node's label is greater than the max ancestors. Now if I were solving this problem, I would recognize that as a useful hook.

And I would try to figure out whether I can build the rest of the implementation around this idea of tracking the largest ancestor so far, comparing that with the node's label, and somehow incrementing the total account whenever that occurs. Now it's time to read the template. Here it is. I do recommend pausing the video and trying to solve it yourself. And then I'll walk through one solution process in three, two, one.

So the first thing I would look for is how are we going to track the largest ancestor? Here we see a helper function, f, defined as a two-argument function. So that could tell me which node I'm looking at. And also, what's the maximum label of any ancestor for that node? And that seems to get around the problem I noticed earlier, which is that when I'm looking at a leaf, I don't know whether it's one of the leaves that I want to count or not, because I didn't know what the maximum ancestor value was.

But now I have a two-argument function, so I can keep track of that second piece of critical information. Now this is a common pattern in recursive functions. We're writing a recursive function that doesn't track all the information we need, so we define another function. Biggs is going to call f, and then f is going to call f. f will eventually return exactly what biggs was meant to return.

And then, biggs can just return whatever f gave it. I had made a note earlier that I was going to compare a node's label to the maximum ancestors. Now one thing that's artificial about taking an exam is that sometimes I force you to use particular names that are different than what you might choose. So instead of writing node.label greater than max ancestors, you should write a.label is greater than x.

As soon as I write down a.label greater than x, I would write a note to myself to remember what a and x represent. This is a node in t, so some tree. And x is an integer representing the maximum label of any ancestor seen so far. If these abstract descriptions don't work for you, then write down an example. a is this subtree, 4, 4, 5.

And max ancestor is 1, the largest ancestor of this subtree. Alright. Now we need to implement the pattern where biggs calls f and then f computes the answer. And that means biggs is going to call f on the whole tree so that the entire thing gets analyzed to find all the nodes we're looking for. But I do need to call f with two arguments.

So I need some initial value for the largest ancestor so far. I might not even fill that in right away. I just know that I need it at some point, and so let's worry about it later. But having the right formatting means that we're on our way to writing correct code. Alright. What other notes did I make along the way? I needed to somehow increment the total count.

Biggs returns the total count. So f returns the total count. So the total count is 1 plus. And here, I need to write down an expression that tells me the total number of nodes in A aside from the root node that have the property I'm looking for. And here's where we apply that classic pattern of recursively calling f on each of the branches and then aggregating the results.

And since I'm counting, I'll aggregate with a sum. So sum of f applied to each b for the b and a dot branches is a common pattern. Why a instead of t? Well, we want to walk through the tree. Biggs calls f on the whole tree, which calls f on its branches, which calls f on its branches, et cetera. And that way, we can analyze the whole tree.

Now one challenge with writing recursive functions is to figure out what arguments to pass into the recursive call. But since I've made notes, there's hope. I know that I need to call f with some value that represents the maximum ancestor label I've seen so far. X was the maximum ancestor label before I looked at A. And A's label was even bigger. So that means A's label is the largest ancestor label I've seen so far because it's bigger than whatever was the largest before looking at A. So by understanding what these names X and A represent, I'm able to figure out what argument to pass in when I analyze the next branch.

And what if I haven't found a node whose labels are larger than all the other labels of the ancestor nodes? Well then I still have to look in the branches. Maybe there will be another node there. Imagine that down here somewhere there was a 12. Well, it would certainly be larger than the 1 and the 3 and the 0 and the 2 that were above it.

And so you have to keep looking even if the node you're looking at isn't the one that has the property you want. And so again, we follow this pattern of summing over recursive calls. But this time we have to think about what's the maximum ancestor value. A dot label is not greater than X and X was the max ancestor before so X is still the max ancestor now.

We've filled in almost the whole implementation except for that one fact that I noted very early on. The root label is always larger than its ancestors. So we want it to be the case that when F is called on the root of the whole tree, this expression is always true. Now I could pass in a third argument telling me whether it's the root or not, or I could just make it work.

For example, I could make it work by passing in some maximal value that's not actually the maximal value but instead is just something that's less than T dot label. That's one way to solve this problem that the root is different than everything else because we haven't seen any ancestors so far. Okay, we're done. And what are the useful tips? Work through an example.

Draw it out. If you're ever at risk of forgetting what A and X mean, then label them, either with a description or with an explicit example of what values it might take. When you make recursive calls, make sure you're making recursive calls with the right kind of value and with values that make sense based on what these names actually mean. And finally, check your work.

Here I would go through every node and try to trace through my code in order to make sure that I get the number four at the end. So the first thing I would do is call F on zero. That's T dot label minus one. And since one is greater than zero, I would return one plus something else. And what is this something else?

Well, I would call F on this node, this subtree with a label of four. And I would pass in a dot label, the number one, as the max ancestor. Okay, four is greater than one. And then I'll call F on this node and four. But that doesn't add one. And I would call F on this node and four, and that would add one.

Now it's worth thinking about what happens with this sum when you're at a leaf. Well there are no branches in a leaf, and so the sum will come out zero. Okay, so I've got one so far and zero here. And that means I'm adding one to the sum of zero and one. So I've counted up two. And then I make a recursive call on the other branch of the original tree T.

In this case, I call F with the max ancestor as one. And that will increase it by one again. Here we have the max ancestor of three. Zero is not bigger than three. I still make the recursive call, but two is not bigger than three. And so I count up four in total. And now you see the whole reason why I emphasize what would Python display in environment diagrams.

Because you do have to be able to go through and trace what your program would do in order to check your work. And you might think that with a computer, you don't have to do this because the computer will do it for you. But figuring out why a function is not doing what it's supposed to be doing almost always involves you manually tracing through what it's doing by understanding exactly how expressions and statements are evaluated and executed in a programming language.

And checking your work is a critical step in solving problems. One thing we've discovered in this course is that there can be multiple ways to solve the same problem. But it's often the case that there are only a few different reasonable ways to deal with an issue that pops up again and again. For example, accumulating a result during tree recursion can be achieved just like we saw in the last video by returning the accumulation for one part of the tree.

And then the job of the recursive function is to combine the different values from the branches to complete the accumulation. But there's another way, which is to initialize some value to, for example, 0 or an empty list, and then write a recursive function that traverses the tree and updates that accumulated value appropriately whenever it's time to add to it. So let's look at the same problem we already solved, but with a different template.

This one forces the implementation to take that second approach of accumulating by adding to some existing variable. So the specification is the same, but now the implementation that we've already worked out won't work. What I'd like to show you here is both illustrate how we would solve this problem in a different way, but show that the same process that we went through and the same intermediate steps to getting to the solution apply equally well to this version of the problem.

We still need to focus on an example in order to understand what we're trying to achieve, and we need to identify different sub-goals related to computing the final result. And in fact, the sub-goals are identical, they just get expressed in different ways. So the code ends up different, but a lot of the ideas are the same. So looking at the template, it takes in a tree t, initializes a list containing the number 0, and we will return, not necessarily the number 0, but whatever is at index 0 of the list n, which is currently 0.

But since n is bound to a mutable value, we would be able to change the contents of this list during our call to this recursive function f. And so it might be that instead of n being a list containing 0, it's a list containing 5 or 7. The only important thing in this list is the element at index 0, that's what gets returned.

Why is there a list at all? Well, we need a mutable value in order to be able to change it from within f. And a one element list is the simplest mutable value around. So just glancing at the template, I see I'm defining f. It calls itself in some circumstances, however, it never would get called unless I call it on this line.

So this is going to be a call to f. And what is f going to do? It's going to correctly set this element at index 0 of n to the number of nodes in t that are larger than all their ancestors. We will need to somehow track the largest ancestor so far, just like we did before. And we'll need to compare the current node label to the max ancestor we've seen.

Now the code node.label is not going to work because there's nothing called node. And there's also nothing called max ancestor. So we have an idea here, but in order to write down the correct answer, we're going to have to use the names that are available. If it's the case that we've found such a node, we need to increment the total count, which is the element at index 0 of n.

And once upon a time, we had this idea that the root label is always larger than its ancestors. So when we initialize things, we need to take that into account. So how can we use f, a, x in order to track what we need? Well, we need to know where we are in the tree. How about a? And we need to know the max ancestor so far.

Let's use x for that. Then translating node.label greater than max ancestor into a line of code that will actually work is just using the names that we have available. How do we increment the total count? Well, we just change the element at index 0 to be one larger than it was before. And what's left to do is to traverse the tree. But now I think it's a good idea to figure out our initial call, which is that we have to call f on the whole tree, the root node, with some max ancestor that's smaller than the root label. Okay.

If a is a node in the tree, then a is a tree. It has branches. We can go through a.branches. Let's give each a name b. We want to call f on b. And now the question is, how do we compute the new max ancestor? I know I'm computing a max ancestor because that's how I'm using x throughout my implementation of f.

And I know that x currently represents the max ancestor I've seen so far. But when I go into a branch, there might be a new max ancestor, which is the parent of b. So we have to take the max of whatever the biggest ancestor we saw already and a.label. That's our new maximum ancestor. We then call f on the branch b. And here's a working implementation of bigs.

There are many different approaches to teaching computer science. Some first courses focus on applications. Some focus on a programming language. This one focuses on programming paradigms and also programming languages, but with a strong emphasis on problem solving. There's one textbook called How to Design Programs that actually just focuses on the process of correctly defining a function. It's a great textbook. It doesn't cover nearly as much technical material as 61A.

But the authors have thought carefully about how to teach the process of problem solving. So I thought I would do something unusual and share with you what they wrote about a effective process for solving a problem, meaning defining a function that has a particular behavior or achieve some particular goal. Here's what they wrote. And here's a link to the textbook in case you want to read it.

It's free online. They say that there are six steps in designing a function. First, you have to set up your data definitions. You specify information that must be represented and how to represent it. On an exam, you rarely have to do this. But it has shown up in all of your projects. Information would be a description of a restaurant. And how it's represented, well, that's where we use data abstraction in order to build a dictionary or a list or whatever data actually represents the information that we want to manipulate.

So they say in this stage, you formulate data definitions and illustrate them with examples. Next, write the documentation for the function you're going to define. Signature, purpose statement, header. State what kind of data the desired function consumes and produces. We've talked about that in this course. It's domain and range. Formulate a concise answer to the question what the function computes. That's the one-sentence doc string that describes the behavior of the function.

And they say define a stub that lives up to this signature. That's writing the def statement's header that shows how many arguments the function takes and gives them appropriate names. Step three, functional examples. Work through examples that illustrate the function's purpose. An important step, not to be omitted, that comes before writing any code. Step four, function template. Translate the data definitions into an outline of the function.

Their suggestion of a template involves writing down the control structures you're going to use. Is the body of the function an if-else statement? And if so, what's the if condition? They also suggest writing down what function calls you're going to make within the body of the function. Even if you don't know exactly where, they're going to fit into the final code. Which is quite similar to what we did in the previous example when we wrote down the key expressions that were going to be used somewhere in our implementation.

Finally, the function definition. Fill in the gaps in the function template. Write the purpose statement and the examples. And step six is testing. Use the examples as tests and ensure that the function passes all the tests. Doing so discovers mistakes. And they supplement the examples in that they help others read and understand the definition when the need arises, and it will arise for any serious program.

So they're making the point here that you write programs not just to be executed, but for other people to read. A key feature of the process they describe is that it's example driven. You don't decide what function you're going to write and then write the code for that function. Instead, you figure out early on what the data represents. This number is the length of the side of a rectangle.

This list contains all the numbers that I'm allowed to add together when I build a partition, whatever it is, for solving the problem you want to solve. Then, when you think about your implementation, don't just think about it generally, but instead focus on examples that you've worked through in order to illustrate the function's purpose. Want to know what function calls to make and exactly how to make them?

Think about an example. Now, I don't think this is the one perfect way to solve all problems, but I do think that it's a thoughtful description of how you might go about solving a problem that when you first think about it, you don't know how to solve. And so I thought I would share. Let's try applying this design process to another tree problem.

Here's the problem. Implement smalls, which takes a tree instance t containing integer labels. It returns the non-leaf nodes in t whose labels are smaller than any labels of their descendant nodes. And here's a one-line description of the behavior. We're sharing the non-leaf nodes in t that are smaller than all their descendants, and an example. First the data definitions. This works directly with trees.

We don't know in this case what they represent, so there's not much to do in step one. Step two is to write down the documentation. Well, some of it's provided for us, but an important piece of the documentation is to know the signature of the function and the types of what arguments it takes and what it returns. Smalls takes a tree. I know that because it says so.

And I also see an example. Smalls a is called on a tree. What does it return? That's an important thing to think about and take note of if you want to implement this function correctly. It returns the non-leaf nodes in t, but in what format? Well here we see a call to smalls a is some iterable, and each element in that iterable has a label.

So that tells me that smalls needs to return some kind of list or iterable over trees. So we're representing these non-leaf nodes as the tree instances themselves that live within the tree t that's passed in as input. Step three. Work through an example. Here we would draw the diagram and try to figure out for each node whether it's a non-leaf node in t whose label is smaller than any of the labels of its descendant nodes.

How about the root? One is not smaller than all of its descendants because it has a descendant zero. How about two? It is smaller than all of its descendants. How about four? How about four? That's a leaf. I'm looking for non-leaf nodes. Five is a leaf as well. Three is not smaller than zero. Zero is smaller than all of its descendants. And six is a leaf.

One important thing to note is that one is smaller than two and three. It's just not smaller than zero. So somehow when I'm writing down the implementation of this function, I'm going to have to make sure that I know the smallest value anywhere within the subtree rooted at a particular node, as opposed to just looking at the direct children. But I'm not done working through this example.

I should explicitly write down what gets returned when I call smalls on a. Let's build a list. What's in that list? Trees. So the list I'm meant to be building is the tree rooted at two and the tree rooted at zero. And the doc test example doesn't show me those whole trees. Instead it just shows me the root label for each of these subtrees.

In sorted order. So I see there's a zero and there's a two. Okay.

Now I try to develop a template. The template is create a list, use some recursive function called process in order to populate that list and then return the list. But notice that now I've introduced a new function. And so I should go through the process again. Data definition? There's not much to do there. But what's the signature of this process function? Well, I have to figure out what it's supposed to do.

I think what process should do is take in each node of the tree and figure out what's the smallest label in that tree. Why do I want to do this? Well, in order to figure out whether one is one of the nodes I'm looking for, I need to know what's the smallest label here and what's the smallest label here. Because one has to be smaller than all of its descendant labels.

So the goal of process, which I've discovered just by thinking about how I'm going to implement smalls, is that I need a function that tells me what's the smallest label in a tree. So the signature of process should be that it takes in a tree and tells me the number which is the smallest label. And then I need a concise description of its behavior.

Find the smallest label in t. Now it's possible for a function to do two things. And in this case, while we're processing this node to find its smallest label, we can also figure out whether to add it to the resulting list or not. Because when we find its smallest label, that means we're going to find the smallest labels in its branches. And then we'll know whether it's one of those labels that's smaller than all of the descendant node labels.

And if so, we can add it to the result. Now in the process that I shared with you earlier, I would actually start writing down snippets of code. But let's try to follow their process instead. Their process would be to work through an example. So here's an example taking in 2, 4, 5 as the input to process. We would compute the minimum label in each of its branches.

Find the minimum of all of those in order to figure out the minimum descendant label. Decide if that's less than or not less than the root label, 2. In this case, 2 was the smallest thing. And then we have to find the smallest label in the whole subtree. Which means taking a minimum between the root label and the smallest value that we've seen in any of the branches.

As I worked through this problem further, every time I used the name T, I would just think about this particular example that I worked through. Now I think we're ready to write a template. The template's going to be something like, if this is a leaf, then it's easy to find the smallest label in the whole tree because there's only one label, so we'll return it.

Otherwise, we need to compute the minimum of the smallest label in the branches and the root label itself. Now would be a fine time if you weren't taking an exam to look at the template in the question. Here it is. And feel free to pause the video at this point and try to solve it. The good news is that the template given to us is just like the template we invented when we were thinking about the problem in the first place.

And so we already know what to do here. If T is a leaf, then we'll just return T.label. Now we should check this against our signature immediately. This is a number, which is what we're supposed to be returning. It's the smallest label in T. Have we accounted for the fact that maybe we should add T to the result? Well, if T is a leaf, then it can't be a non-leaf node, so we don't need to add it to the result.

Otherwise, we know a T has branches, so we need to find the smallest label in those branches. If the root of T is even smaller than the smallest descendant label, then we need to add it to result. And here we see a confirmation of what we described earlier, that the return value should be the smallest label in T, which is either T's label or the smallest label in its descendants.

So here I think I would do the following. I would note that I need to append something to result under some condition. And what do I append? Well, here I look at the signature of smalls and know that result has to have trees in it. So what's the name for a tree? T itself is the tree that I would add. The next thing I would do is write down what I've learned about smallest.

Smallest is going to be the name for the smallest label in any branch of T or any descendant of T. Once I know what it is, I can figure out how to use it even if I haven't written down how to compute it yet. The condition under which I append T to the result is that T.label is less than the smallest thing in any descendant node.

And finally, I have to compute that smallest thing, which is a minimization over a recursive call to process for every branch of T. Here's a familiar pattern of aggregating the results of recursive calls. And this is what allows us to process all of the nodes in the tree. We process the root. That processes the branches, which processes the branches of the branches.

And so process is going to be called once for every node in the tree. And for each node, if it's a leaf, we will compute the smallest label in that leaf, which is just T.label. Otherwise, we will compute the smallest label in the whole tree and maybe add T to result as well.
