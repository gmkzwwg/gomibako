---
title: UC Berkeley MATH 135 Intro to Set Theory Transcripts
layout: print
categories: Notes
subclass: Set Theory
---

## 1. Part p01 - Introduction to Mathematical Logic

Welcome everybody. This is the introductory video for both Math 125a and 135. So these two courses are both logic courses but they are independent of each other. They are different topics and they don't need each other. They're both mathematical logic and one of them, as we're gonna see, is about the foundations of logic and formal systems and the other one is more about the axioms to develop other mathematics. I'll get into that in a second, but they have the very basic ideas is common so that's why I'm doing this joint video.

So one of the main goals of mathematical logic is to develop the foundations for mathematics. There are other goals, we do other things in mathematical logic, but one of them is that, to develop the foundations for all of mathematics. So if you imagine mathematics as a big building, that is where things are built on top of each other and a big edifice, then logic, one of the aspects of logic is to look at the foundations of that. What is all this standing on? So the first thing we need to look at is formal systems. This would be a place where we can develop mathematics in a formal way.

What are these formal systems good for? So what do we need them for? So what I mentioned before that they are gonna give us the foundations for the whole edifice of mathematics. So in a way they tell us that we can be, if you're doing something in the formal system, we can be sure that it's gonna be correct and there is no subjectivity to it. There is no, I'm trying to convince this other mathematician about it. It's like, this is a formal system.

But that's in theory, because in practice it's very hard to actually do a proof in the formal system. But it's good to know the foundations are there. I'll get back to this thing about doing it in a second.

For instance, a hundred and thirty, forty years ago, Cantor and Bertrand Russell and other people started to find paradoxes, reasonings that were completely sound, or they look like reasonings mathematicians were doing at the time, and that led to contradictions. Like for instance, the barber paradox, which in set theory becomes considered a set of all the sets that don't contain themselves. I don't know if you heard about this, but once mathematics was becoming more abstract and abstract, and people were doing abstract proofs, then it was easy to fall into the trap of doing something that is not allowed, or that will lead to a contradiction. So it was good to develop something where we can know that we are standing on a strong footing. **A second reason why formal systems are GOOD is that in logic we can study them as mathematical objects themselves, because now a formal system, a proof, a theorem, a construction, they become themselves concrete mathematical objects.** So we can study proofs, theorems, in a mathematical way.

So we can use mathematics to study mathematics itself. So that's why it's called metamathematics. **And that's how we can prove Gödel's theorem that some things are NOT provable.** And for that we need to be able to prove about things being provable or not. And a third application is that computers can play with formal systems. That's a more modern thing, but it's actually becoming more and more popular.

So I was saying that in practice, it's very hard to write a proof in a formal system. Like when you write a proof, you're writing in English, and you're just trying to convince a mathematical reader that your argument has no holes and it's like perfectly logical and sound. But if you want to write your full proof step by step in a formal system, you go crazy. But if you manage to do it and you do it on a computer, computer can go and check step by step that every step you did was correct. You don't need a human to do that because now it's very formal.

So now you have essentially a proof that your proof is 100% correct. And that's actually useful for some things. So it started to be useful for some programs, like to verify that a program is doing what it's supposed to be doing. So to prove that a program is doing what it's supposed to do, which is sometimes very important, if the program is controlling something that is very important, like your heart.

Now, in the last couple decades, people started to actually prove, like write down full detail, proofs in a formal system of some well-known theorems in mathematics. And sometimes these tasks are like huge, because like for big theorems, there are a lot of little things that are not written. But if you want to convince the computer that everything is right, you need to add every step. And now there are programs that help you do the silly, the small steps. And so you don't go too crazy. You still go a bit crazy, I guess.

And so right, having a formal system allows us to now get computers to help us verify proofs, and maybe even write some. To start into these formal systems, one thing we need to think about is, okay, what is a proof?

Here is a definition. A proof is an argument that uses logical steps to show that a mathematical statement follows from certain assumptions.

Let's get deeper into what this actually means. There are a few things here that are important.

First, what we're talking about proving here are concrete mathematical statements. We're not talking about proving an ambiguous statement about the weather. We are talking about concrete mathematical statements. So we need to be explicit about what we mean by a concrete mathematical statement. And for that, we need to define a formal language. A proof is made out of logical steps.

We know in practice, when writing a proof, we can use any reasoning we like, so long as everybody agrees that the steps we are taking are logical. But if we want to talk about proofs as concrete objects, to be able to prove things about them, we need to be explicit about which logical steps we are allowed to use. These logical steps are called rules.

Third, we need assumptions. When you write a proof, you always use previous knowledge. That previous knowledge usually comes in forms of theorems that were proved before. And those theorems use previous knowledge. And if you keep on going backwards, you will eventually reach statements that are so basic that you just cannot prove. But they are basic enough that you don't need to prove them.

Those are the axioms. More than 100 years ago, this man wanted to build a formal system for all of mathematics where all statements could be proved in a purely formal and syntactic way. By that I mean in a way that only involves manipulating symbols, following certain rules in a purely mechanical way, without having to even know what the symbols mean. This way you could be sure about something being true or not in a purely mechanical way that nobody could argue with.

Let's see how that worked out at the end. So let's see what a formal system is. It consists of three things. A language, a set of rules, and a list of axioms. Language. To define a language we need symbols.

They are like the letters of the alphabet. And grammatical rules that tell us how to put these symbols together.

Here is a standard list of symbols. **The first symbols, 0, 1, plus, times, belongs to, form what is called a vocabulary.** And those are variables. You can change them for some other symbols if you want to work with something else. These ones are good enough. The latter ones, equality and or not exist for all.

**The variable symbols and the parentheses are called the logical symbols.** And they are essentially fixed in all first order logic. You can modify them slightly.

For instance, here didn't add the implication symbol, because you can just define it from the other. So you may add it or not. But essentially, these are the logical symbols.

Okay, then we need to put the symbols together. And for that we need grammatical rules. Here's a standard set of rules. But don't worry about the details. I don't want to get into them right now. I just want you to see what they look like.

Essentially, when you see a string of symbols, you're going to be able to tell if it makes sense or doesn't. For instance, this one here obviously doesn't make sense. While this other one, for every x there exists a y such as y plus y equals x or y plus y equals x plus one. It's a sequence of symbols that makes sense.

All right, let's go into the rules. These are the rules of logical thinking, the rules that we use when we write proofs.

For example, there is a rule that says that if you can prove not phi, that is the negation of phi, where phi is a grammatically correct sequence of symbols. And you can prove phi or psi, then you can prove psi.

For instance, if phi was the sentence x equals y, and psi was the sentence z equals one, then this rule will read as follows. We express such rules in the following format. if you can prove the statements on the top, you can prove statements on the bottom. Here's an example of a full set of rules, of course, of the logic. Again, don't worry about the details. I just wanted to show you what they look like.

Axioms. These are the statements that describe the very basic behavior of whatever you're working with. Numbers, sets, groups, rings, whatever you're working with. The axioms don't need to be proved. They are used as basic assumptions within our proofs. if you're going to use them in our proof, they better be true.

So they better be obviously true. And hopefully, we have enough axioms to derive everything we want. As we'll see, this is too much to hope for. Here's an example of a list of axioms. These are the Peano axioms. They are the standard axioms to work with when you're working with the natural numbers.

They start with the very basic properties of zero, one, plus, and times. And then we have the axioms for induction, which allow you to do proofs by induction. There is another list of axioms that is used to axiomatize all of mathematics, called the Zermelo-Fraenkel set theory.

Okay, so now we know what a formal system is. Here come the key points. The language is complete. So all mathematical statements can be expressed in this language. Once you get used to working in this language, you're going to see that every mathematical statement you want to make, you can make it in this formal language using these grammatical rules. So that's good.

All right, then the rules, they're also complete. Okay, this is not a simple observation like the previous ones. There is no reason to believe at first that these few rules are going to be enough to formalize all arguments mathematicians want to make. Arguments come in all shapes and forms, but surprisingly, they are enough. This is another of Gödel's famous terms. **It's called the completeness theorem, and it says that IF you can prove something, you can prove it using ONLY these rules.**

It actually says that if a statement is true in all possible universes, then it can be proved using these rules. Okay, there are some subtleties here that I'm leaving for another time. The axioms though are not complete. **And this is what the incompleteness theorem says.** Gödel proved both the completeness and incompleteness theorems. It's not that he couldn't make up his mind about completeness or incompleteness.

It's just that completeness was about the rules and incompleteness was about the axioms. Okay, so the two courses split right here. So 125 is gonna be about the language part and the rules part of the formal system and also about semantics, about the language and provability and other things. We're gonna prove those completeness theorems that we just mentioned. And the Gödel one is not an easy one. **Gödel completeness theorem, that's gonna be our main theorem at the end of the class.**

And then 135 is gonna be about the axioms part. And in that one, we're gonna develop the axioms for set theory. And set theory, these are the axioms where all mathematics can be done. So these are axioms for all of mathematics and they are kind of now widely accepted as the axioms for mathematics. Which, as I mentioned, they are not complete. I mean, the area of set theory of logic studies, uh, theorems of mathematics or statements that are, that cannot be proved from the axioms that are beyond these axioms.

Uh, well, we're not gonna get into that. Maybe we're gonna mention a couple of those. But, uh, we're not gonna get into those much. We're just gonna go slowly through the axioms to understand the whole development of set theory and how it works as a foundation for mathematics. And we're gonna look at something that follows from this development, which is the study of ordinals and cardinals that are very important in set theory.

Okay, that's it for today. Uh, next time we'll do separate videos. one for 125, one for 135. And we'll go into the different topics. See you next time.



## 2. Part p02 - Basic Concepts

Welcome everybody! Today we're going to start with just developing the very basic notions that I want everybody to be up to speed to. We're going to start with the axioms for set theory next class. So as I was saying, the idea for this class is to develop the axioms for set theory on which we're going to develop or we're going to see how one can develop all of mathematics. But before that I want to just review some very basic notions about sets since these are going to be our building blocks. These are going to be like the main concept out of which we're going to develop all the other concepts.

We're going to look at five things. Sets, empty set, inclusion, power set. At the end we'll talk about a little bit about the universe of sets which I guess that's not going to be new for most of you.

Alright, so let's get into this. Sets. You always know what sets are. So I hope. What is a set? A set is just a collection of objects, right?

That's all there is to it. A set is a collection of objects. You can picture it as a plastic bag where you put a bunch of objects inside. There's a set, alright? And let's start with how we define sets.

Alright, so the most classical way to define a set is to define a set by listing all its elements, okay? So just list all the elements and now you have a set. So for instance, that set A contains the elements 2, 3, 5, 7. That's exactly what this set is.

Another way to describe a set is by describing it. For instance, let's say B is the set of all the prime numbers which are below 10. So that's a description of B by describing what the elements of it look like. Or for instance, more mathematically, we can write that over there which says that B is the set of all x in the natural numbers such that x is prime. So that bar over there means like such that. So x in n, n for the natural numbers, such that x is prime.

So those two lines are exactly the same. One more formally than the other one.

Okay, so we got these two sets, A and B. Are they equal? They were defined differently, but yes, they are equals.

Why are they equal? Well, they have exactly the same elements, right? A has 2, 3, 5, 7. What are the prime numbers below 10? 2, 3, 5 and 7.

All right? **So this is something that we will develop, we'll mention next time, which is the principle of extensionality.** It's actually going to be an axiom that says that if two sets have the same elements, then they are the same set.

Okay? So as things, as objects, these sets are the same. not only the other. Well, they're equal. They are exactly the same thing.

All right? So if you have the same elements, you're the same set.

Okay? So a set is justified essentially by what's inside it.

All right? For example, the sets 2, 3 and 2, 2, 3, 3 and 3 and 2, they are defined differently. Well, you can see the order, but they all have the same elements, right? The elements are 2 and 3 and that's it. Those are the elements in this set. So these two sets, these three sets are actually completely equal.

They have the same set. The order of the elements doesn't matter. How many times the elements show up doesn't matter. The elements don't show up many times inside. They're only there once. So all it matters is which elements are inside.

And in those three cases, 2 and 3 are the only elements that are inside. And therefore, these three sets are the same thing.

Okay. The long symbol is going to be the most important symbol for all the course. We're going to be developing all of mathematics out of just one symbol. That symbol out there. So it's definitely going to be very important for us. I don't think we need to do many examples.

Let's just do one. So for instance, the number 3 belongs to the set in our example up there. Yeah. So that's how we write it. 3 belongs to A. So that means 3 is in the set A up there.

**While 8 is NOT in the set A that we define up there.** Yeah. So belongs does not belong to. And the symbol is sometimes called epsilon because it's a Greek epsilon.

Alright. So let's move on to the second part of this short class. The empty set. The empty set is a set that has no elements at all.

Alright. So that's what it's called empty set. It's a set, but it has nothing inside it. Right. We denote it with the letter phi. It's a Greek letter phi.

Can there be two different empty sets? Do you think you have one empty set here and empty set here? different? No. Because if you have empty sets, we know what the elements are. And the elements are none, nothing.

So two empty sets have the same elements. Meaning both have nothing.

Alright. So same elements. That means they are the same set.

What about these two guys up here? The empty set and the set that contains the empty set. Are these the same set? The answer is no. They are not the same set. They are different things.

This one is the empty set. Has nothing inside. There is nothing inside the set. The other one is the set that contains the empty set.

Alright. So it has one element. The element being the empty set. One has no elements and the other one has one element. Even though the element is the empty set, the empty set is a thing. So you can put it inside other things.

And now you have a set which has one thing inside, namely the empty set. Alright. So the empty set has nothing inside, but itself is a thing. Right. So it's like if you imagine an empty plastic bag. Like just this very thin nylon bag.

Empty. Has nothing inside. It's like the empty bag. But it's still something. It's a bag. It's empty.

But it's still a bag. And if you put this bag inside another bag, then this second bag has something inside, namely an empty plastic bag. So it's one bag inside the other. Right. So that's the difference between the empty set and the set that contains the empty set. You want to take a plastic bag and the other one is a plastic bag with a bag inside.

Okay. Another very important notion is going to be the notion of inclusion.

Okay. A set A is said to be a subset of another set B if... And we write this A inclusion symbol B. not to be confused with belongs. We're going to mention that again. So A is a subset of B if every element of A is also an element of B.

Okay. So every member of A is... if every member of A is a member of B, we say that A is a subset of B.

For example, the set that contains the number 2 alone is a subset of the set that contains 2 and 3. Right. So the only element of A is 2 and that one is also an element of B. And this set is also a subset now of this set that contains 2, 3, 5 and 7. And it's a subset of the set that's 2, 3, 5 and 7. Well, that's because they are the same set.

The last two. The last two over there are the same set. So this is a subset. Every element of the first one is an element of the second one because it's just the same.

Okay. So let's repeat that. We shouldn't get confused between the symbols A included in B and A belongs to B.

Alright. So the top one up there is A included in B and the bottom one down there is A belongs to B. They are very different things.

Let's look at an example. The set that contains the number 2 is a subset of the set that contains 2 and 3. We said that before. But the set that contains number 2 is not a member of the set that contains 2 and 3.

Alright. So it's not a member. The members are only 2 and 3, not the set with 2.

Alright. The same with the plastic bag. One thing is a plastic bag with 2 inside.

Another thing is a number 2 by itself. if you look at the number 2 alone, well, the number 2 alone does belong to the set that has 2 and 3. So that's the difference between those two. And the number 2 alone is not included in the set that contains 2 and 3, right? Because, well, it's not a set itself. It's a number.

Which will become sets later. Let's not get into that.

Let's make a quick observation. And that is that if a set A is included in a set B and B is included in C, then A is included in C.

Alright. The reason for this is that if every element of A is an element of B and every element of B is an element of C, then every element of A is an element of C.

Okay. Let me ask you guys a question. Is there, is it the case that if you have that A belongs to B and that B belongs to C, then A belongs to C? What do you guys think? And the answer is no. That's not the case.

Alright. So again, most examples, that's not going to be the case.

For instance, we have examples. The number 2 belongs to the set 2 that contains 2 and 3. And the set that contains 2 and 3 belongs to a set that contains these two things, empty set and the set that contains 2 and 3.

Alright. Do you guys see that? So the set that contains 2 and 3 is a member of this weird bigger set. But 2 itself is not a member of the weird set, right? The weird set has only two members, empty set and the set with 2 and 3. So 2 is not one of those two elements.

Alright. So transitivity does not hold with B belongs.

Okay, but let me ask you another question. Are there sets A, B and C for which these actually hold? So we say that it doesn't hold for always. But can you find examples A, B and C such as A belongs to B, B belongs to C and also A belongs to C? What do you guys think? Yes, no, yes, no.

Yes, the answer is yes. There are examples like that. They are a bit strange, not too much. But yes, we can build examples like that. It's not always the case, but you can build an example where this is actually the case.

For instance, C is the set that contains 2 on one side and the set with 2 and 3 on the other side. Alright. So both A and B are members of C.

Okay. So let's move on to the next topic. The power set.

Okay. The power set of a set A is going to be the set whose elements are all the subsets of A.

Okay. So we put like all the subsets of A and we put them all inside a single set that we call power set of A. And we denote it with this calligraphic P of A.

Alright. So that's power set of A, set of all x's such as x is a subset of A.

For instance, let's look at a couple very simple examples. if you have our favorite examples so far, the set with 2 and 3, what are the subsets of this guy? Well, you're going to put them right here. So the set which contains only 2, the set that contains only 3, the whole set 2 and 3, and the empty set.

Alright. So those guys, those four guys, are all the subsets of 2 and 3.

Alright. only 2, only 3, the whole set 2 and 3, and the empty set. Yeah. So the empty set is a subset of every other set.

Alright. So that's because to be a subset, you require that every element of the empty set belongs to the set B, and that's trivially true because the empty set has no element. So the empty set is a subset of every other set. It doesn't belong to every other set, but it's a subset of every other set.

Okay. So maybe we just look at a simple example, a set which contains only one element, 2, has two subsets, empty set, and the whole set. What if you look at the power set of the empty set? What are the subsets of the empty set? Well, we said that the empty set is a subset of everything, in particular the empty set. It's a subset of itself.

But everything is a subset of itself. And that's it. That's the only subset of the empty set. So, one question for you guys. if A is a set that has N elements, any sum number, how many elements are there in the power set of A? How many elements does the power set of A have?

What do you guys think? Well, let's take a look at the examples right there. So, empty set has zero, power has one, one element, the power set has two. And the other one, the top one, we have two elements in 2, 3, and the power set has 4. What do you think you can derive a rule from there? Maybe you can try the case for 3.

And the answer is 2 to the N. And that's because if you have a set A with N elements, the way you build a subset is by taking each element, putting some and not others. So, for each element, you either put it in or out. The second element, in or out. The third element, in or out. So, you have 2 to the N possibilities of subsets of A.

Okay. So, another topic for today is going to be the set of all sets. What is that? Is that a set? Well, no. So, the set of all sets is not going to be a set.

So, I shouldn't even say the set of all sets, because that's not a thing. if it was a set, we would get into trouble. So, let's see why. So, suppose it is a set, and we call it V.

Okay. So, in that case, we would have that V belongs to V, right? Because if V is a set, and V is also the set of all sets, V would belong to V. Which, it sounds weird, but so far, so good. But, what if we do this? We consider the set of all members of this guy, V, which don't belong to themselves.

Which is more natural. No sets shouldn't belong to themselves. But, whatever. This V that we had up there seemed to belong to itself. So, some of its members will belong to itself. Some won't.

So, let's consider the ones that don't. And, if you do, then we ask, okay, does the set V belong to itself? Well, what's, oh, that's silly trying to answer. Yes, you can help me with the answer.

Okay, so does V belong to itself? Well, the members of V are the ones that don't belong to themselves. So, to be a member of V, you have to not belong to yourself. So, V is a member of V even if V doesn't belong to V. And, that was obvious contradiction, right? So, this contradiction comes because we assume up there that V was a set.

That we have a set of all sets. So, this is a quick contradiction that we get from assuming that there is a set that contains all sets. V does not exist as a set. We're not going to call it a set anymore. What are we going to do? We're going to call this thing a class.

Okay? So, this is a word that we reserve for collections of things that are so large that we couldn't call them sets themselves. This is an informal word, alright? So, it's not going to be part of our axiomatic system. So, in Z of Z, in this set of axioms, formally what we do about these things is we just do not talk about them.

Okay? We have no way to refer to the set of all sets within Z of Z.

Okay? It's not an object in the universe.

Okay. So, last, let's talk a little bit about the universe of all sets. Maybe that's another I would call this guy.

Okay. And how that's built. And this is going to be very clear at the very end of the course. But, let's just get an intuition of what all the objects in our universe are going to look like.

Let's write down what the universe of sets is going to be like. At least, the beginning. So, we're going to start with very basic elements. I'm going to put them in a set called V0. And these basic elements are going to be called atoms.

Alright? So, 0 is the set of atoms. And the atoms are just things which are no sets.

Alright? So, we start with them. I don't know.

For instance, you could think, maybe you want the numbers to be part of your universe. And you just put the numbers in.

Let's say the natural numbers. 0, 1, 2, 3, 4. You put them in. They are not sets. **They are called atoms because they are indivisible.** They have nothing inside.

Right? So, these are not sets. These are the building blocks. So, you start from them. And then you start building up.

Alright? So, then you define a new set. So, you call V1. That is the power set of V0. So, all the sets of atoms. So, the subset of the set of atoms.

Right? So, this V1 contains sets of atoms and also the atoms. And then V2 is the subsets of V1. And also the elements of V1.

Alright? So, you're putting everything together. By building a subset of subsets of atoms.

Now in V2. Now when you go to V3. You do subsets of subsets of atoms. And everything you build so far. And then you put... You keep on building, keep on building, keep on building.

And then you put everything together in something that we call V Omega. That contains everything we build in any number of steps. And after we build V Omega, we now take the subsets of V Omega. So, V Omega plus 1 is the power set of V Omega. And we add all of V Omega. And we keep on going.

Then we build V Omega plus 2. And that's going to be the subsets of V Omega plus 1. And the elements of V Omega plus 1. And then V Omega plus 3. And so on and so forth. So, we keep on going, keep on going, keep on going.

And then, after infinitely many steps, we find V Omega plus Omega. Which is going to be the union of everything we build so far.

Alright? Including the V0, V1, and V Omega, V Omega plus 1. All of those guys. Is that it? No. Once we're there, now we take the power set of V Omega plus Omega.

So we take all the subsets of V Omega plus Omega. And now we have even more sets. And then we keep on going. V Omega plus Omega plus 2. So on and so forth. And we keep on going through the ordinals.

Which we're going to see later in the course. We're going to talk about ordinals and these types of constructions. Like two thirds of the course.

Okay, so one last question. These atoms that we started with. What should we choose for the atoms? What are these atoms coming from? Who are they? Who are they?

And the answer we're going to choose in ZFC. In this axiomatization we're going to be talking through this course. Is the following. In ZFC we have no atoms.

Okay? So it's going to take a simple solution. Just no atoms at all. And we build everything from scratch. Everything from nothing. So V0 is just going to be the empty set.

No atoms. We start from nothing. V1 is the set that contains only the empty set. And V2 contains the empty set and the set with the empty set. V3 subset of these guys. And so on and so forth.

And that's going to be. And then we continue. V omega. V omega plus omega. So on and so forth. And that's how we're going to get all the sets.

In our universe. And using these guys. We're going to define the numbers. The real numbers. Functions. Everything is going to be defined.

Starting from the empty set. Belina.

Okay. So that's it for today.

Next time we're going to go through. The axioms. Or at least the first few axioms. We're going to see the other axioms. Later in the course. See you next time.



## 3. Part p03 - The First Five Axioms

Welcome everybody! Alright, so today we're gonna start seeing the axioms for Zermelo-Fraenkel set theory. So, usually denoted by ZFC. **Zermelo-Fraenkel, and actually, when we add the axiom of choice, we're gonna call it ZFC.** Zermelo-Fraenkel with the axiom of choice. So, we're not gonna see all the axioms today, we're gonna see them throughout the course.

We're gonna start only with the first five, which are the most simple ones. And we'll discuss what they are. These axioms are supposed to be good enough to develop all of mathematics. And they are, and they are. We, I mean, all mathematicians, or at least, we agree that these axioms are enough, that everything we do in mathematics can be done with these axioms. Well, not everything.

There are some results that you cannot prove within these axioms, but it's not that common to encounter these results that don't fit within the axioms axioms within standard mathematics. But you'll find them sometimes. Logicians are the ones who have the tools to prove that something cannot be proved from the axioms. But we're not gonna be getting into that in this course. Later in the course, we're gonna see how we can develop most of mathematics within the axioms. And you're gonna see, you're gonna be convinced that pretty much everything you want to do, you can do within these axioms.

The axioms are quite simple, as we're gonna see. And we need them to be simple, because we need them to be obviously true. And also, because that's gonna allow us to study the universe of mathematics abstractly from the outside, since all we need to do is to study models that satisfy these axioms that we're here.

Okay, so let's get into this. So, first, the setting of ZF is that everything is a set.

Okay, so all objects in our universe of objects are gonna be sets. Everything is a set. As we said in the last class, we're gonna start with the empty set and build from there. But everything is a set. There are no atoms. Everything is a set.

And from the sets, we're gonna build everything else. We need a formal vocabulary. There's gonna be another video about the language for logic, for first of the logic, where you can see this more formally. But for now, we don't need it. Our formal language is gonna contain one important symbol, which is a symbol of belongs. We mentioned it last time.

And that's gonna be, essentially, the main symbol. And all the axioms are, essentially, describing the behavior of these symbols. Right? I mean, this symbol is the one that you need to define sets, right? To define a set, you need to know what belongs to what. And then, formally, we're gonna have other symbols, which are gonna be equality and if AND only if implies not, for all, and exist.

And I guess we should put all, to, all symbol. We have variable symbols, x, y, z, u, v, a, b, c. These are gonna represent variables for sets. Because all our objects are sets, these variables are always gonna represent sets. Right? So, everything just represents sets.

So, with these symbols alone, we can write down all the formulas and axioms and everything that we need. Of course, there are some rules that will tell you how to define well-formed formulas. Like, formulas actually make sense. Which we're gonna see in another video. But for now, pretty much everything that makes sense is gonna be okay.

Okay? So, that's the language. And the axioms are gonna be written in that particular language.

Okay, let's start with the axioms. axiom number one, extensionality axiom. This is the one we saw in the previous video. It says that if two sets have exactly the same members, they are equal. Right? So, what makes a set is the elements.

That's all that matters about a set. Which elements it has. The way you write the formula, it says, for every a and b. So, given two sets, a and b. You know that if, for every x, x belongs to a, if AND only if x belongs to b. then, a is equal to, now let's correct that, b.

All right? So, two elements, two sets a and b. if, for every x, x belongs to one, if AND only if it is to the other one. That means exactly the same x belongs to both. then, they are equal. And the example that we saw last time.

We saw that if you write a set 2, 3 and 3, 2. The order between these elements that don't matter at all. So, what matters is which elements are inside. And the only elements inside are 2 and 3. So, these two are the same. And also, if you wrote 2, 2, 3, 3, 3, 3.

It doesn't matter how many times you put an element. It's only, this set contains only 2 and 3. And these three things are all the same.

All right? So, equal, equal. They are all equal. They are the same set. Good? So, only matters about a set are its elements.

Second axiom. The empty set axiom. It says, there is a set that has no members.

Okay? So, we mentioned this one last time too. And the way you write it, you say there exists a B. Of course, everything is a set. So, there exists a set B. Such that for every x, x does not belong to B.

And we're going to denote it by the Greek letter phi. That's the empty set. We mentioned that last time. **Essentially, this axiom is just saying there is something.** I mean, you can derive that there is an empty set from other axioms too. But the importance of this axiom is to say there exists something.

And the simplest thing you can say is the empty set. And it's good to start working from that.

Okay. **So, so far, everything is very simple. axiom number 3.** A pairing axiom. This is going to allow us to start building axioms from the bottom up. And it says that if you're given two sets, U and V, then there is a set having as members just U and V.

Alright. So, the way we write it is for every U and V, there exists a set B, which is going to contain only U and V. How do we say that? We say that for every x, x belongs to B, if AND only if either x equals U or x equals B.

Alright. So, we're going to have that. The way we're going to write this is B equals the set that contains U and V.

Okay. So, that's a pair axiom. It allows you to build a set with two objects.

Okay. So far, everything seems pretty much true. Should be true. axiom number 4. It's called a union axiom. We're going to make a more interesting version later in the course.

Let's just start with a simplified version, which is that you can union two sets. For any two sets A and B, there is a set whose members are those sets belonging to either A or B. Or belong to both.

Alright. So, you put the members of A and the members of B together in one big set. So, that's what it says. For every given A and B, you can build a big set that contains them both such that the members of B, So, the X's that belong to B are exactly the ones that belong to either A or B or both.

Okay. So, we're going to write this B here is written as A union B.

Okay. So, that one up here is the symbol for union. You're going to see how to union many sets at once later in the course. And finally, for today, there are more axioms coming later. **The fifth axiom is going to be the power set axiom.** The power set axiom says that for any set A, the power set of A exists.

So, for any set A, there is a set whose members are exactly the subsets of A. And the way we write that is given A, there is a set B which is going to be the power set. Let me write it down here. B is going to be the power set of A such that the members of B are exactly the X's which are subsets of A.

All right. So, here we are using this symbol up here, which is the subset symbol, which is not in our language, right? In our vocabulary. In our vocabulary up there, we have only the belong symbol. And so, what is that symbol up there? Well, we defined it last time, but how are we using this symbol in the formal language?

We're just using it as a shorthand. All right. So, when we write that symbol, what we actually mean is this line up there, okay? So, X included in A is just a shorthand for this longer formula that says for every T, if T belongs to X, then T belongs to A. Right? So, that's the definition of subset.

Every member of X is a member of A. So, essentially, we should just put this formula up here inside that one there to have a real formula in the language.

Okay? **So, that's how the powerset axiom is defined.**

Okay. Let's recapitulate. So, we have five axioms so far out of the ten we're going to define. They're all written in this formal language where the only symbol that is a non-logical symbol is the belong symbol. All the other symbols are the standard logical symbols. And the five axioms so far are extremely basic and I guess nobody is going to discuss that they are obviously true.

There is a first one that tells you what it means for two sets to be equal. Right? So, this one defines what it means for two sets to be equal. And it's essentially a basic property of a set of anything to know when you're equal to something else. And then the other four axioms are just giving you basic operations to build sets from previously defined sets. **And the next axiom, many of them are going to work like that.**

They are telling you what you can build. Alright? So, so far we have one that tells us where to start from, the empty set, and then give us three operations to build sets from it. Putting two together, unioning the elements, and taking the power set. **One thing, NOT to get confused, is pairing axiom and the union axiom.** Right?

So, one thing is a set that contains U and V as members, and the other one is a set that is the union of U and V. So, this is a set whose members are the members of A and the members of B.

Let's do a quick example, just to make sure we're all on the same page. Suppose U is a set that contains 2 and 3, and V is a set that contains 3 and 5. Right?

Okay, so now if we write U union V, what are we going to get? We're going to get this set that has 2, 3, and 5. Right? So, we have all, it's a new set whose members are the members of A and the members of B put together. The three appears in both, but as we said, you only count it once.

Now, if we do U, the pair, U, V, that comes from the pairing axioms, that is not the same set. What we're going to get here is a set that contains the set 2, 3, and the set that contains 3 and 5.

Alright? So, these two are different things. The top one has three elements, and the other numbers 2, 3, and 5. The bottom one contains two elements, and the two elements, one element is a set 2, 3, and the other element is a set 3, 5. **And THEN we have the power set axiom that allow us to build sets from the bottom up, like we saw last time.** We could define the whole universe of sets using the power set axiom by iterating the power set axiom.

And that's going to allow us to build a lot of sets. But this is only the beginning, right? So, it's going to get more interesting.

Alright, so that's it about the basic axioms. See you guys later.



## 4. Part p04 - The Union Axiom

**Alright, so last time we looked at the first five axioms for Zermelo-Fraenkel set theory and one of them, for the union axiom, we used a preliminary version.** A version that was simpler, just so we could list them all.

Let's look at the actual version of the union axiom. **So the union axiom we had before allowed us to union two sets together and forming a set that contains the elements of both of them at the same time.**

**So now we want a union axiom that's going to allow us to union any number of sets that we have.** So this is what the general form says. It says that if you have a set A, think of this set A as a set that contains sets and we want to union those sets together. So the axiom says that given such a set, there is another set whose members are those belonging to the sets inside A.

Okay, so we're unioning all the sets that are inside A. So we're going to write this as follows. So given the set A, we can find the set B that we call the union, whose members are all the x's that belong to some little a that belongs to A, to capital A.

Alright, so these little a's are the sets that are members of A and now we look at the x's that are inside those and we put them all together inside one set that we call B. Alright, so we're going to denote this by union A. So one big capital U for union for a set of sets.

Okay? And so we can say what you just said in different words. Essentially what we said is that the members of union A are exactly the members of the members of A. Right? That's what the union of A is. You take the members of A and then you take the members of those.

Let's do an example. So suppose that A is the set that contains many sets, 2, 3, 1, 3, 1, and 5. A is a set that contains three sets now. And now if you do the union of A, we are unioning all these three sets together. So you're going to get 2, 3, 1, and 5. Essentially it's like removing all those brackets from there, except that the sets can be a bit more complicated.

But it doesn't make sense. We are putting all these sets together, right? So this is the same thing, this set union, this set union, 3, 1, 5.

Alright? So we're just unioning all the sets inside A together into one set. This is going to be interesting when we have an infinite family, an infinite set of sets. And then we want to union all of those together. The operation that we had defined in the previous video doesn't work here because that was only to union two sets. Well, you can use it again to union a third set and a fourth set.

But if you want to go to infinite sets, you need to use this general form. Okay, let's just make another interesting example. What if you take the union of the empty sets? So the empty set has no sets inside and we're putting all of those together. What are we going to get? We're going to get the empty set, of course.

There is nothing inside. There are no members of members of this set.

Okay, so the next step will be to define the intersection. **Now we want to see how we define the intersection.**

Okay, so given a set A, we're going to define the set like a general intersection like we just did. **We define that symbol up there as a big upside down U for intersection.** To be the intersection of all the sets, all the sets in A. So that is, the members of this interception are going to be exactly the X's that belong to all members of A at the same time.

Alright, so the other, the ones that belong to set A for all A's in A. Okay, so we have to put them all together.

Alright, so the union is the ones that belong to some set in A and these ones belong to every set in A. Good? So, questions for you guys. **For the union, we have an axiom that says that this union exists.**

What about the intersection? Can we prove that intersection of A exists? Or do we need an axiom for this? **Well, the answer is that we're NOT going to have an intersection axiom, but we're going to have, but it's going to follow from another axiom called the subset axiom that we're going to see next.** So this needs the subset axiom.

Okay, let's just see a quick example to see how this intersection works. Suppose we're going to take the intersection of the set that contains the following three sets. 2,3 that we have used in every class.

Let's say 2,5 and 3,5,7 and 2. What is the intersection of these three sets together? So the notation is you just put the big intersection up here and then that means the intersection of those three sets that belong there. So these are the members, the things that belong to all of them. 3 doesn't belong to all of them and 5 doesn't belong to all of them. The only one that belongs to all of them is 2.

So we get that this is the set that contains only 2. See you guys next time.



## 5. Part p05 - The Subset Axiom

Alright, what's up everybody? **So today we're gonna be introducing the sixth axiom from our list for ZFC.** It's called the subset axiom and it's gonna allow us to define things like this, like the set of all x that belong to the natural numbers such that let's say x is prime. I mean so far we don't have the natural numbers but suppose we have the natural numbers already, we don't have anything that allow us to define something like this, define a subset of elements with a certain property. And it says the following, for any set A there is a subset B of A whose members are the members of A that satisfy a certain given condition like being prime in the previous example.

Alright, so that's how I write it like that. So the members of B are the ones that are in A and satisfy a given condition.

Alright, so it's very important that this is only to define subsets of something that we have already. So the set A has to be built or we have to know that it exists already and then from it we take a subset of all the things that satisfy a certain property. We cannot take a set of all x's such that x satisfies property. That we cannot do. And we know an example of this already, we saw an example of this because if we could do that we could define a set of all x's such that x doesn't belong to itself. Remember we call this guy the set B in a previous video and we show that this allows, this gives us a contradiction.

We cannot do this. We can only consider the elements that satisfy a certain property that but also that belong to a given set.

Okay, so we just define a subset of something that we have already satisfied a certain property. So this is how we get around this contradiction. So for notation this is how we're gonna write this. The set B here is gonna be written as a set of all x's in A such that x satisfies the given condition, right? So that's how we write that.

For instance like the one we had before was x in the natural numbers such that x is prime, alright? So that's one example.

Another example, y in the natural numbers such that y is even, alright? So those are two good examples. There are two useful examples that the one we mentioned in the last video, we can define the intersection this way. So suppose we have two sets A and B and we want to define the intersection of A intersection B. How do we do this? Well, we can say this is a set of all x's that belong to A which satisfy the property that they also belong to B.

So x belongs to B, right? So a subset axiom tells us that this exists. We can also define A minus B. You know what that means? This is a set of all x's that belong to A but that do not belong to B. So that's x minus B.

What if we wanted to define the intersection of an infinite collection of sets, alright? So now suppose we have A is a collection of sets, a set of sets like we had in the previous video. And we want to define the intersection of A, alright? The big intersection of A. You guys remember what that was? It was a set of all the things, all the elements that belong to all the sets inside A.

**Though the definition that we gave last time is all the x's such that for every a in little a in A, x belongs to little a, right?** But this definition is not using the subset axiom, right? So here we're just taking all the x's and where are we taking them from? Because to use the subset axiom, we have to be able to take them from somewhere. So where are we taking these guys from? An idea?

One thing we can do is to define this. I mean, the intersection is always a subset of the union of A. Right? Because if something belongs to all members of A, it belongs to some member of A. Unless A is empty, that's a weird case.

Let's not get into it. So the intersection, every element of the intersection belongs to the union. **And we know how to define the union because we have the union axiom.**

Alright? So we have the union already.

So now we can define the intersection. Intersection of A is defined to be the set of all x's that belong to the union of A, such that, and then for every a name, x belongs to A.

Okay, so what kind of condition can we use in here? So let's start with an example of a condition and then you tell me if we can use it or not.

Suppose I want to define I want to define the set. I'm going to call it, let's play A. It's going to be the set of all numbers.

Let's call it x in the natural numbers, such that x cannot be defined in less than 20 words. I mean, there are so many words in the English language. So with 20 words, we can define so many numbers. I guess it's a lot of sentences we can write with 20 words, but it's still a finite number. So some numbers you just cannot define in less than 20 words, right? Because only finally many you will be able to define in less than 20 words.

Alright, so what if we do then do then take so let n be the least element of A. Okay, so this is the least number that cannot be defined in less than 20 words. So n, let's write, let's write that down. So n is the least number, let's even write a natural number that cannot be defined in less than 20 words.

Okay, so that's the definition of n that we have so far. **And this is a very precise definition of n, right?** So there is a least number that cannot be defined in 20 words.

Let's see how many words did we use to define n? 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14. We use 14 words to define n. So n does not belong to A because it can be defined with less than 20 words. You only need 14 words to define n. **But THEN we contradict the definition of n which was to be the least element of A.**

So it has to be in A because that's how we chose it. But now we're saying it's not in A because it can be defined in less than 20 words. So this is a contradiction. **And this contradiction comes because the property that we're using here to apply our subset axiom is NOT very mathematical, right?** It cannot be defined in less than 20 words. What does it really mean?

I mean, we need to understand what it means to be defined. I don't know, maybe it's a notion that we can be defined about what it means to be defined. But I guess not if we will get a contradiction here. So we cannot just put any property up here. It has to be a mathematical property. How are we going to do that?

Well, the answer to what kind of conditions can we use is any condition that can be written as a first order formula in the vocabulary that we started with, the one that only contains the belongs symbol. All right? So we can only use formal formulas here for conditions. I'm going to make another video about what are these first order formulas. But as we said before, it's everything that you can write with belongs and all these logical symbols. And that makes mathematical sense.

You have to define the rules to see what it means to make mathematical sense. But once you see the rules, you're going to notice, okay, yes, it's what makes sense. And this one that we have right here is not a first order formula. That cannot be written as first order formula. Otherwise, we will get this contradiction. **So we can now write the subset axiom more formally as follows.**

**For each first order formula psi of x, that is a string of symbols making it a well-formed formula, we have an instance of the subset axiom that says the following.** So given a set A, we can define the subset of A called B, whose members are exactly those that belong to A and satisfy the formula psi.

All right? **So given a formula psi, we have an instance of the subset axiom.** But for each different formula we can write, we have another instance of the subset axiom. And that's why we call it a scheme. Because it actually contains many axioms inside, one for each formula we can write. See you guys next time!



## 6. Part p06 - The Language of First-Order Logic

All right, welcome everybody. So today we're gonna start with first the language of first-order logic. So first-order logic is strong enough to develop all of mathematics. It's much stronger than sentential logic. Still, as we're gonna see, it's not super complicated. This language is not that complicated.

Still, but it's not restrictive at all in the sense that we, one can develop all mathematics. One can write every mathematical statement in this language if you are in the right setting. Like, for instance, the setting of set theory. So today we just start with describing what the language is, and as you see, it's quite simple.

All right, so we need to define two things to develop a language. One is the symbols, and the other one is how to put the symbols together, right? So our expressions are gonna be nothing else but strings of symbols. Like when you write on a computer and you have an email, it's a string of characters. Or a program is a string of characters. So our mathematical expressions are gonna be also strings of symbols, and that we can only put together according to certain rules, like the same as in English.

All right, so let's start with the symbols, okay? So let's slowly go to the symbols that we have, and then we'll move on to explain how you put them together.

Okay, so there are different kinds of symbols. So first come the logical symbols, and there are a few of them. The logical symbols are always included in first of all the logics.

First one is the symbol for equality. Some people don't put it, but yes, we're gonna always consider equality. The equality symbol that you guys, I assume, know very well. then come the connectives, ifs that have the logical meanings.

Let's write down what they are. So this one is and, this one is or, this one is if AND only if, this one is implies, this one is not, for all. And that exists. Those are our logical symbols. then come the variable symbols. So we're gonna be able to use variables in our formulas.

The variables, formally, we call them v0, v1, v2, v3, v4, and we can use as many variables as we want in each formula, finally many in each formula, but overall, it depends. We can choose as many formulas as we want. In general, we are gonna use, visually, it looks better if we use variables x, y, z, instead of v0, v1, v2, it's all like a lot of v's together. But formally, we think that we are using this v0, v1, v2.

Okay, equality, connectives, variable symbols, what else? We have punctuation symbols, and we're only gonna use the parentheses. So the left parentheses and the right parentheses are characters that can show up in our formula, and they are only gonna help us to be able to parse the formula, to read it and understand, and not to get confused about how to read the formula.

Okay, so these are the logical symbols here in all settings, whenever you're in first order logic. And then come the vocabulary symbols. The vocabulary symbols, they vary according to the situation. So it depends what you're working on, you can have different vocabulary symbols, all right? So they are not always the same.

Let's just view a few examples of settings. So, for instance, if you're talking about groups, you have usually three symbols, lambda e for the identity, multiplication or addition or just some operation symbol, here I'm putting star, and a unary operation that takes an inverse, takes an element and maps it to the inverse. In a group, you always must have inverse, right? So you can talk about groups in this vocabulary. if you want to talk about fields, then you might use the vocabulary 0, 1, plus and times. That's appropriate for fields.

If you want to talk about arithmetic, like the natural numbers, for instance, if you're talking about the natural numbers, you might want to add less than or equal, right? So on the natural numbers, you talk about 0, 1, plus, times, less than or equal, and with that, you can pretty much say everything you want about the natural numbers. In set theory, where you can actually develop all of mathematics, you only need one symbol, and that's the symbol for belongs, and from that, you're going to build everything else. So all right, so different settings, we have different vocabularies. In set theory, if you want to develop all of mathematics, then set theory is the place for you, and that's where you only use the symbol and develop all the rest. But sometimes you want to analyze, let's say, the natural numbers and how difficult it is to prove things in the natural numbers, and then you will work in this setting, which is more restrictive than all of mathematics, but still good enough to say quite a bit.

And then if you want to work on these settings in these two settings or many others, in particular algebraic structures, that's not because you want to develop all of mathematics, but essentially because you want to understand the logical properties of certain types of structures, which that's what an area of logical model theory does. You look at particular kind of structures and understand the algebraic properties through the eyes of logic.

Okay, so there are three types of vocabulary symbols. Let's go through them one by one. **So we have these, the C's are called the constant symbols.** The constant symbols, they represent elements. Like for instance, in our examples, like E, the identity in the group, zero, and one, they are constant symbols, right? So they represent constant elements in whatever structure you're working with.

Okay, so then after constant symbols come these function symbols, and the function symbols represent operations. So in these examples, for instance, the multiplication operation for the group and the inverse operation of the group are function symbols, and so are plus for the natural numbers and times for the natural numbers. They are operations. They take elements and give elements out, all right? So for instance, class operation takes two elements and gets one element out. But the inverse operation takes one element and gives you the inverse out, all right?

So functions, they don't need to be from one element to one. They can take many elements and give you one. And there are examples where you may have three inputs and then output one. That's also allowed. And then we have relation symbols. Relation symbols represent properties of tuples.

For instance, in our examples, less than or equal and belong are relation symbols, all right? So relation symbol means like you're given a tuple, like let's say two natural numbers. if you write that a number is less than or equal another one, you're going to get that that's either true or false, okay? So relation symbols don't return objects, but return kind of true or false, right? So you apply two objects, two elements, and then something, and then you see whether this holds or not. The same with belongs, no?

Is this element, a member of this element, true or false, all right? So that's the difference between relation symbols and function symbols. Functions return objects, relations return true or false.

Let's notice that, so both function and relation symbols can take arbitrary numbers of inputs, but each symbol has a fixed addity, all right? So each symbol takes a fixed number of inputs, for instance, plus always takes two inputs, right? You cannot do a plus of 17 inputs. I mean, you have to do many pluses if you want to do 17, so just a symbol plus only takes two. if you do the inverse of an element, that only takes one. So if you're going to do less than or equal, that takes two, and that's called the addity, the addity of the symbol.

Each symbol comes associated to an addity that tells you how many elements you can use it for. **Two things to emphasize, here the dot dot dot dot, it means that we can have an arbitrary number of constant symbols, arbitrary number of function symbols, arbitrary number of relation symbols, we may have zero, one, two, any number.** We may have infinitely many of each of them, then that's fine, that's legal, that's fine. Like as we see in the examples, in all of them we have different numbers of symbols.

Another thing to observe is that all these symbols right here, they are nothing but symbols. So far, they don't have a meaning until we give them a meaning with axioms, right? At the beginning, all they are is symbols, and if you're a binary function symbol, you're going to be applied to two elements, but what you do in those two elements, you don't know. The symbol doesn't tell you anything about what to do with the elements. It's just a symbol that you apply to elements, right? So the symbols at the beginning, they have no meaning, right?

So so far, we're going to formally look at the language without looking at the meaning of the symbols. And then we're going to see how once you have a vocabulary set up, you can assign different meanings to the symbols of the vocabulary. But that comes later. So first, we just look at it, look at them without meaning.

Okay, so let's now take a look at how is that we build these expressions for the language using these symbols, right? So we're going to have two types of expressions that we can build with the language. And there are going to be terms, and there are going to be formulas, all right? So both are going to be strings of symbols, but the terms are going to represent elements. And these formulas are going to represent statements. They could be true or false, all right?

So for instance, a term is going to be something like one plus one. That's a term, it represents an element, all right? And the formula is going to be something of the form one plus one less than or equal zero or x equals y. That's something that is either true or false, all right? So the top ones are terms, they represent elements, bottom one is formulas, they represent statements.

Okay, so let's see how we build them a little bit later. Okay, so a term is going to be everything that can be built according to the following rules.

First, all the constant symbols by themselves, they are terms, okay? So zero, one, by themselves, they are terms, they represent elements, so you can put them by themselves and they are terms, and also, I guess, e in the previous example, also a term. Variable symbols, also, you can put a variable symbol by itself, and it's a term. It's representing an element, we don't know what the element is because it's a variable, but still, it's a term, all right? So it's representing an element, not a truth value.

Okay, so we can just put the variables by themselves, and then we can build from them using the function symbols, okay? So here is a formal way of saying how you do this. if you have built terms already, like t1, tn, these are terms that you have built already, then you can apply, and you have an n-ray function symbol, meaning a function symbol that takes n inputs, like in this case, fi, then you can build a new term by putting the fi, the symbol for fi, then parentheses, then t1, then comma, dot, dot, dot, well, then t2, then t3, put all of them together, then tn, and then close the parentheses, okay? So, that is how you build a symbol.

For instance, suppose we have a variable, if you say a variable symbol is a term, and a constant symbol is also a term, and we can put essentially plus of these two, and we will have a term. That's what we usually write as v2 plus 0, and that's how we can actually write it, but for now, if we're looking at it formally, we write it like that. Plus, apply it to these two elements, v2 and 0, all right? And then once we have that, that's a term already. So, if you have another term by itself, we can apply an operation to these two terms, and then we will have that, okay? And then we can keep on building.

Now we can have, like, times 1, 1, that's another term, and we can put these together with another operation, let's say, times. And then if you have all of these, suppose we have an inverse symbol, we can take all of these and apply the inverse, which one would write there, but the way we are doing it right now, we shouldn't write it there. Oh, let me erase. We should write it negative 1 up here, apply to everything, all right? So again, this is not the way we're going to write it usually, but that's the way, the formal way, okay? So, you can build terms by applying function symbols to previous terms.

By applying here, I don't mean applying anything, because these are just symbols. So, what I mean is just, you put the symbol for f right here, you put the symbol for parentheses, then you put all the symbols that correspond to the first term, and you put a comma, then all the symbols for the second term, put a comma, so on and so forth, up to the nth term, and then you put the symbol for parentheses, and then you end up with a long string, right? So, we are not applying anything, this has no meaning, it's just a string of characters, and that's how we build terms. Later, terms are going to represent elements.

Okay, so then come the formulas. The formulas now represent statements, which are going to be either true or false, when we interpret them later. So far, it's just strings of symbols again. And then there are a simpler kind of formulas called the atomic formulas, which we build first, and then we're going to build all the formulas. So, what are the atomic formulas? Atomic formulas come in two kinds.

The simplest one is a formula of the form T1 equals T2, where T1 and T2 are, these two guys are terms that we built before, right? So, these are terms that they were built before, and now we put an equal between the two terms, and now we have an atomic formula that could be a true or false, depending on how you interpret the terms. So, that's one term, and another term is when you apply a relation symbol. This is a relation symbol from the previous slide to a bunch of terms, okay, that you built before. So, you have an n-ary relation symbol, that means that the relation symbol takes n inputs, and what you do is you put the symbol for the relation, parentheses, then the symbols for the terms, one after the other, and then close parentheses, okay? So, that's how you build atomic formulas.

Let's do an example, let me just cross this out for now because we don't need it. So, an example for this, for instance, let's suppose we have a term 1 plus 0, and another term 1 plus 1, and these are two terms. Well, in reality, these are not terms. Maybe let's write them correctly. What I mean here is plus 1 comma 0 plus 1 comma 1. That should be the right way of doing it.

And then, between these two terms, we can put, let's say, the equality symbol. Or, instead, we could apply a relation symbol.

For instance, we could write 1 minus 1 less than or equal 1 plus 1, right? And now, this is not a, now we have a statement. This is 1 plus 1, 1 minus 1 less than or equal 1 plus 1. The right way of writing this, again, would be, according to this notation, less than or equal, applied to these two terms, first term and second term.

Okay? So, the bottom one, this one is the formal way of doing it, but it's not the right, not the nice way.

Okay? So, that's how you build atomic formulas. From the term, you apply relations to the terms. Essentially, here, equality is like, behaves like a relation, right? So, it's like a binary relation.

Okay? So, from the atomic formulas, now we're going to be, now we're going to build all formulas. So, how do we build the formulas?

First, all the atomic formulas are formulas. We start with those. So, those are formulas. They are just a special kind of formulas.

Okay, and now we're going to start building formulas from previously built formulas. So, if you have a formula fee that we built already, we can put the not symbol up front, and we have a new formula.

Okay? Just put the not symbol up front. This is similar to sentential logic, by the way, that the not and the second line. if you have formulas fee and psi that you have built already, then, from those, you can build a bunch of formulas, fee and psi, fee or psi. fee implies psi, fee if and only is psi.

Okay? And in all of them, we are putting parentheses in the outside, so that it doesn't get confused when we apply another, when we put another connective next to them.

Okay? So, later, people can, some people have rules of when you can omit parentheses and not omit parentheses to simplify reading. Formally, we just put them every single time. But, in reality, we don't need to put them every single time. But for the language, let's put them every single time. And you can also build formulas by putting a FORALL or EXIST up front and a variable.

This here and this here is a variable symbol. For instance, let's look at some examples that we had before. So, because the variable by itself is a term and a constant by itself is a term, we can put a relation symbol and now we have an atomic formula, okay? And then, we can build another atomic formula right here.

Now, we have two atomic formulas. And now, we can put them together and we can write this one and this one. And now, we have a composed formula. And then, maybe we write another formula right here, one less than or equal zero. And then, we put them together, well, when we put this together and we need to put the parentheses before, now we put this together, let's say we put implies. And now, we build a new formula, okay?

And now, we keep on growing by building new formulas like that, all right? So, if AND only if one inverse equals one. But, it just makes no sense. And then, we can put quantifiers up front. So, we can say for every V, this holds. And V is a variable symbol, I should have put like V1, they want a new formula.

Now, we have a more composed formula and then, I can say for every X that exists, V2 such that blah, blah, blah. V2 doesn't show up, it doesn't matter, this is still a legal formula.

Okay, so that's how we build formulas from the bottom up. See you guys next time.



## 7. Part p07 - Ordered Pairs

All right, welcome everybody. So in the next few videos we're going to start developing pairs, relations, functions, equivalence relations, a bunch of things that we need to start building from sets. We say that in set theory everything gets built out just from the notion of sets and that is defined by the belongs relation and we have nothing else. So that means we have to build everything from scratch. So we're going to start with some basic objects.

**So let's start with what are called Ordered Pairs.** So an ordered pair is something of the form x comma y, right? You've seen these guys before and what is the difference between this guy and this guy? This is the ordered pair and this one is the set. What is the difference between these two? The difference between these two is that on the first one the order matters while on the second one the order doesn't matter, right?

So we have that x comma y is equal to a comma b if AND only if what? if AND only if x equals a and y equals b. Right, so in the set when we write the sets the order doesn't matter, but sometimes you want the order to matter, right? So what do we do? So far we only have sets. We don't have ordered pairs.

We need to define them somewhat from the notion of sets. So we're going to do a little trick. So it's just a trick to now to have ordered pairs without having to introduce a new notion to the whole setting. We don't want to introduce any new notion. We want to do everything just from sets and build from scratch. So here is the definition.

**So we define the pair x comma y to be the set that contains two sets.** The first one is a set with only one element. It's called a singleton, only one element, a single element, only one element, a single element, and the pair x comma y.

Okay, so that's how we define the pair. We just define that funny notion. We want to do everything just from sets and build from scratch. So for it to represent the pair, what do we need? We need to show that it satisfies what we want to do. This is a set with only one element.

This is a set with only one element. It's called a singleton, only one element, a single element, and the pair x comma y. Ok, so that's how we define the pair. We just define that funny set over there, and then that funny set is going to represent the pair. So, for it to represent the pair, what do we need? **We need to show that it satisfies what we want to do. what we want them to satisfy, the theorem.**

If the pair x, y is equal to the pair a, b, well, if AND only if x equals a and y equals b. Okay, so that's what we want. We want them to be equal exactly when the first one is equal to the first one and the second one is equal to the second one. So first, let's make a comment before. So when we define this pair like this, do we have, do we know that this guy exists, this ordered pair x, y? Do we know it exists?

**Yes, we know it exists because of the union axiom, right? NO, sorry, the pair axiom.** The pair axiom tells us that if you have two elements, we can build a pair. not an ordered pair, a set pair, right? So it tells us that we can build something like this, the pair axiom. But if you look at this guy that we defined right here, what is that?

I mean, it's a pair of pairs, right? **So applying the pairing axiom a couple times, like three times, we can build that set out of x and y, right?**

Okay, so once we know we can build the set, that funny set using the pair axiom, now we ask, can we prove this theorem from the axiom we have? **And yes, so all we have, the ONLY axiom we have to use here is extensionality, the one that says that two sets are the same, IF AND ONLY IF they contain exactly the same elements, right? IF x equals a and y equals b, THEN these sets are equal, this, right?** So there is nothing to this, to this proof.

What about this, guys? So now suppose this set x, x, y equals a, b, and we want to show, you want to show that x equals a and b equals b.

Okay, so in this case, there is a funny case, which is when x equals y and a or a equals b. Let's start avoiding this funny case.

So let's assume for now that x is different than y and a different than b, just for now. And now we want to show that x equals a and b equals b. So what do we know?

So let's call these guys some names. Let's call this guy c, and this one up here, d.

Okay, so what do we have? So we have that x belongs to c, which is equal to d, and has one element. So that means it has to be, x has to be one of those two guys right here, right here, which have only one element. But the a comma b has two elements. So the only possibility is that x equals a. And those, if those two sets are equal, it's because the members are equal.

So from there, we get that x equals a. And then x comma y belongs to c, which is equal to d. So it has to be one of those two guys, but it has two elements. And therefore, it has to be that x comma y equals a comma b. But we know that y, we're assuming it's different than x, which is equal to a. So if y belongs to the left hand side, it has to belong to the right hand side.

And it cannot be a. So the only way is that y equals b.

Okay, so that's how we get that. What happens if not? So what if x equals y? Well, in that case, in that case, then we have that c, that x comma y is just a set, sorry, is a set x, right? Because x and y are the same thing. And therefore, c, like the set up here, has both elements are x.

So it's going to be the set that contains the set that contains x and nothing else. Yeah, so it has c has one element. So c has one element. And then d has one element. Because they are the same. You assume they are the same.

**So that means that a has to be equal to a comma b.** But if a is equal to a comma b, the only way for that to happen is that because b has to belong to both sets, in that case, is that b equals a. Yeah, and then that means that the set b is equal to the set that contains a. And now we're assuming we're assuming that c equals d. So that means x equals a. But then x equals a.

And then x equals a. And what about y and b? Well, we know, we know that y, we're assuming that x is equal to x, which is equal to a, which we have up here, is equal to b. So also, y equals b. So one way or another, we get that x equals a and y equals b.

Okay, so I went kind of, it's a very simple argument. I went kind of quickly through it. Just like a, pause the video, go through the argument slow by slow. See if you can make sense of each step formally.

Okay, good. We have a pair that behaves the way we want without having to define a new constructor. We just have a set constructor. And from the set, we define what we want.

Alright, so let's define one more thing. Now that we have pairs, we can define the Cartesian product. The Cartesian product of two sets is what? The Cartesian product of a and b is written a times b is defined to be the set of all pairs x comma y such that x belongs to a and y belongs to b. Yeah, so that's how we usually write, like draw us. if you have x, a, put all the elements of a in a line and all the elements of b in another line, all the points in the plane now represents points x comma y and the whole plane will represent a times b.

Right? So it's a set of all pairs, first one from a, second one from b. So a question, does it exist? I mean, can we prove from the axioms that we have so far that a times b exists? I mean, of course it exists. The way we wrote this here, we are just taking x comma y from where?

We need to remember that to apply the subset axioms, we need to take them from somewhere. Yes, and here we're not taking them from anywhere. So we need to say x comma y that belong to where? **To be able to apply the subset axiom, so that THEN we can say x belongs to a and y belongs to b.** Any ideas, any ideas, anybody?

Okay, here's the lemma that is gonna... if you have two elements that belong to a set c, in this case, let's say... then the pair x comma y belongs to the power set of c. No, not really. The power set of the power set of c. Does it make sense?

Well, let's take a look at it. So, we know x belongs to c, so the set that contains only x is a subset of c, right? So this one belongs to the power set of c. And y belongs to c also, so from these two, the set that contains x and y is also a subset of c. Therefore, it belongs to the power set of c. Our set, remember, is a set of all subsets of c, right?

And if these two guys belong to c, then the set that contains them both is a subset of the power set of c. So, this one will belong to the power set of the power set of c. Cool?

Okay, so that means that now we can define the Cartesian product up here as... As x comma y that belong to the power set of the power set of c. Such that satisfying the property that x belongs to a and y belongs to b. Yeah? if you want to be very formal, just for the first couple of lectures, about how is that a first-order formula. How is... because here we're using a construction and this is not the way the form... the set we have...

This is not the way we apply the axiom. So, let's do it again. So, now I'm going to say that a times b is going to be the set of all z's which belong to a certain set. **And the set is going to be power set of power set of c, which we know exists because we have the power set axiom.** Such that... Such that...

Um... There exists an x... And there exists a y... Such that... Such that... X belongs to a...

And... Y belong to b... And... Z... And... Z...

Is equal to the set... X... X... X... Y...

Okay, so now this is something that we can write... In... In...

First order logic... So... So... We have that... **We can define a times b using the subset axiom.**

Okay, so next time we're going to see... Relations. The subset axiom.

Okay, so next time we're going to see... Relations.



## 8. Part p08 - Relations in Set Theory

Okay, so now that we have Ordered Pairs, we are gonna start with relations. So relations are gonna help us then build functions, order relations, equivalence relations. So we're gonna do a bunch of things from them. So what is a relation? So let me just give a couple of silly examples. So for instance, divisibility relation.

We say that A and B are related if A divides B. Okay, so this is a number that you multiply A for and you get B. That's called the divisibility relation. We can talk about the cousin relation among people. A and B are related if, when are they related? if, when are they related?

If, let's say they have a common grandmother. Okay, if two people have a common grandmother, we say they are related by the cousin relation.

Okay, order relation. A and B are related if A is less than or equal B, let's say. So that's an order relation. So that's what I mean by the word relation. It's something that relates different elements in different ways. And there are all kinds of relations.

So the concept is gonna be very loose. **Definition, a subset, well, let's call it R of A cross B.** So remember this is the Cartesian product of A and B. It's a set of pairs of elements of A and elements from B. Just a subset R of A cross B is what is called a relation. From A to B.

So that's it. There is nothing to it. It's just a set of pairs from A and B. And the idea is that imagine you have your set A and your set B and your relation is just a set of pairs. Taking one element from here and one element from there.

Another element from here. Another element from there. So that's a relation. It's just something that connects elements from one set to another. It could be that you have the same set in both sides. That's you can have a relation from a set to itself or just two different sets.

And we're gonna see very different kinds of relations in what's coming next. Okay, but I want to find something a bit more general. Slightly more general. So a relation, if we only say a relation and we don't say from where to where, is just, or referring to, is just a set of pairs.

Okay, so we're being very loose. Whenever you have a set of pairs, we call that a relation. **Where is that going from where to where in the definition?**

Suppose we are given a relation R and we want to define a few things. We want to define the domain of R, range of R, and the field of R. So what are these guys? So the domain of R is the set of all the As such that there exists a B such that the pair A comma B belongs to R. Right? So everything that is associated to something.

Okay, so everything that is associated to something. Everything that is a first coordinate of somebody in the relation. And the range is everything that is a second coordinate of somebody in the relation. Instead of all the B's such that there exists an A such that A comma B belongs to R.

Okay, so that's all the ones in the range. And the field is just the domain of the relation, union the range. **So the union of these two guys is called the field.**

Okay, so question. Here when we wrote domain of R and range of R, we need where is this A taken from? And where is the B taken from? **Right? IF you want to apply a subset axiom to define something, we need to take the elements from somewhere.** Where are we taking these guys from?

Not from R. They don't belong to R. They belong to the tuple that belongs to R. But it doesn't mean, what do they belong to? And you would say, well, from A and B. **But this is, we are using this definition of a relation.**

The relation is just a set of pairs. So we are not, we don't have an A and B beforehand. We want to define the A and B are going to be the domain and the range. So we're kind of going to define the A and the B for the relation. What we have the domain and the range. But so far, we don't have any.

**How do we define them using the subset axiom?** So here is a trick. It's a little trick. And the lemma is, you're going to find it funny, is that the field of R is nothing more than the union of the union of R. Remember that the union, this is the capital union. This is the one that is, you just take all the elements of R and we union them together, right?

So recall that the members of the union of something are the members of the members of that something. Yeah.

So let's see if we can prove why this is the capital union. Okay. So suppose we have a pair X, Y in the relation. Where do X and Y come from? So if they are in the relation, then we know that X, Y belongs to the relation.

Okay. So these two guys up here are members of a member of R, right? That means that X, Y is a member of this guy, of this guy right here, that belongs to R, right? I'm going to just write it down. It's a member of X, Y, which is this one, right? X, Y is exactly that called set.

So the pair, the set X, Y is a member of the pair X, Y, which itself is a member of R. Therefore, X, Y is a member of the union of R, right? Because it belongs to something that belongs to R. And now X and Y themselves belong to something that belongs to Y, namely this set up here. So X belongs to this one and Y belongs to this one. Therefore, X and Y, each of them, belong to the union of the union of R.

Yeah. Cool. The other way around, I leave you guys to try to exercise the other inclusion. That if you belong to the union of the union of R, then you belong to the field of R. **So that means that we can define the domain and the range up there using our field that we just defined.**

Okay. So that's what we're going to do right here. Where do they belong to? They belong to the union of the union of R. Belong to the union of the union of R. **So that's how we define the domain and the range.**

The A and the B that correspond to the relation. **We define them just like that using the union of the union of R.** Which we have from the general union action.

Okay. One more quick thing to mention. An n-ary relation. What do you guys think should be an n-ary relation? It's just a set of n-tuples. Like the same way as a, and the ones that we have already, these are just a binary.

**These ones up here, sometimes are called binary relations.** Because they are set of pairs, right? Binary corresponds to pairs.

Now, if you have an n-ary relation, that's a set of n-tuples. By the way, what is an n-tuple? We didn't define n-tuples. What is an n-tuple? So, how would you guys define?

Let's start with a three-tub. So, how would you define it? Something that x, y, z. The idea is that we want an object that not only contains the set elements x, y, and z, but also the order is important. So there are a few ways of doing that. One way would be to do, take a pair, x, y, z.

Yeah? So, this will do the job. And then you can do the same for n-tuples, extend the tuples.

All right, so next time we'll look at functions. See you next time. Bye. Bye. Bye. Bye.

Bye. Bye. Bye. Bye.



## 9. Part p09 - Functions

Okay, so now that we have relations our next step is to build functions. Okay, so I mean functions are definitely very important for mathematics, but all we have is sets. So we need to build the functions from sets.

So let's start asking what is a function. So for example the square is a function. You input a number and it gives you back the number square. So x square is a function. Hair color is a function. You input a person and it gives you a color.

So for mathematicians a function is not just something that takes a number and you apply square roots and squares and plus and times. There are many kinds of functions. A function is just something that you input something and the function is gonna give you back an output. So that's what a function is in general mathematicians. But we want to model that with sets.

So let's draw for instance here the square function. That's the function x square.

Okay, it's a function. How can we look at it as a set? Do you guys remember what the graph of a function is? So the graph of this function is what? It's a set like what I just draw, right here. This picture I just draw is a subset.

This is r square and what I draw is the graph, right? And the graph, what is the graph? The graph is the set of all pairs x comma y in r square such that y is equal to x square, right? So that's the graph of the function square. And if you have a graph, essentially you have a function. And look, the graph is a set.

It's not only a set, it's a set of pairs, right? So set of pairs, we already know what set of pairs are. We call them relations. So the graph of a function is nothing more than a relation. But not every relation is a function, right? Because if you have a set that looks like that, it doesn't look like the graph of a function, no?

No. So what makes a relation a function?

Okay, let's write it down. So definition. A function is a relation such that, what does relation need to satisfy to be a function? What's wrong with this relation right here that doesn't look like the graph of a function? What's wrong with this one is that if you take an element here, let's say x, and we want to know where is, what's the value of x? Well, there are this value, this value, there are a bunch of points here, here, which one is the value of f of x, right?

So that's the problem with that one. That one, there is no UNIQUE possible value for f of x. While in this one, if you put x when it x, we know this one is the value of f of x, right? So how do we say that? A function is a relation.

Let's call it a function f. It's a relation such that satisfies that every point gets mapped to at most one point. So that for every x that belongs to the domain of the function, and the domain of the relation is the same as the domain of the function. So we know we defined domain already. So for every x that belongs to the domain of the function, there is a UNIQUE y such that x, y belongs to the graph, right? So for every point, there is a UNIQUE y such that x, y belongs to the graph.

So if you take a point here, there's only one value right there. Okay, so that's what makes a relation a function.

Okay, and this is a funny way of writing x, y belongs to f. So this UNIQUE y, so we call this UNIQUE y, the value of f at x. And we denote it by f of x.

Alright, so that UNIQUE, it's a UNIQUE y, so we can put it in the name because it's UNIQUE. We call it f of x, or the value of f at x. I mean, you knew this before, but now we are defining everything from scratch.

Okay, so we can talk about functions using their graphs, which the graphs are set. Okay, what else? So we say, we say that f is a function from a to b, or in other words, that f maps a to b, or we just write f from a to b, if what? if a is equal to the domain of a, of f, of f, which we defined in the previous video, and the range of f is included in b. Notice we don't, to say that the function goes from a to b, we don't require b to be exactly the range, just something that contains the range, the image of all the values of f are going to be inside. Right, so if we have f, we have a right here, and b, and f goes from a to b, then every point in a has an image, but the range is going to be a subset of b.

When the range is actually equal to b, we say that the function is onto. So if range of f equals b, we say that f is onto b. So notice being onto is a property of kind of both f and b, right? I mean, every function is onto its own range, right? But sometimes b is larger than its own range. And we say that f is one to one, if you can never have two values that go to the same value.

If whenever f of x equals f of z, we have it's because x equals z, right? So you can never have two different values going to the same thing. So only one value goes to one value. That's why it's called one to one.

Okay, so let's do a new definition. **Given a set a and relations f and g, which actually we're going to think of them as functions, but this definition is going to work for relations in general.**

So let's assume only that we have relations. So first, a, the inverse of a function or of a relation, f to the minus one is defined to be what?

So now we want the function to take the range to the domain backwards. So it's going to be the set of pairs, y comma x such that f of x equals y, right? So, but this is not a, you're saying these are not functions. This might be, well, they might be functions or not. All we're assuming is that they are relations. So maybe we cannot do f of x, because maybe it's not a function.

What are we going to say here? Instead, we're going to say x comma y belongs to f.

Okay, so the inverse is just flipping all the pairs in the, in the relation. And the composition. So again, you guys know how to compose functions. That means you first apply, in this case, first apply g, and then you apply f, and then you get the composition of g and f. We can compose relations. We don't need to have them to be functions.

And what are we going to get? We're going to get this set of all pairs, x comma z, such that x goes to something through g and that something goes to z through f, right? So we're going to have, this is a set of x comma y such that there exists, h comma z, sorry, there exists a y such that x comma y belongs to f and y comma z belongs to g, right? So x goes to y, y goes to z. Um, the restriction of f to a set a, um, here again, this works for relation. And it's just, we're going to restrict the domain to a.

So we're going to forget about everybody who's, uh, who's not in a, at least in the domain. So instead of all, um, x comma y that belong to f such that x belongs to a. So only, we can see only the ones such as the first, uh, such as the first entry belongs to a. And the image of a set, that's the last one I want to define, of a under f, is the node f, with this, uh, bold double bracket, it's going to be the image of all the elements of a. So instead of all the y's, such that there exists an x in a, such that x comma y belongs to f, all right? So all the y's that are related to somebody in a.

Okay, let's look at an example. Suppose that f is a set of pairs 1 comma 2, 3 comma 1, 1 comma 3, 2 comma 2. I know we don't have numbers yet, but we don't have them later.

So let's just assume we have numbers. Just for example, 1 comma 3, 3 comma 2, 2 comma 1.

Okay, and let's say that a is a set, um, 1 comma 2. Okay, so first, is f a function or not? Well, no, it's not a function, because 1 gets mapped to both 1 and 3. So in a function, every number, every element must be mapped to a most one thing.

Here is mapped to two things. So it's not a function. So no function.

What about g? g, 1 goes to 3, 3 goes to 2, 2 goes to 1. Every element, every element goes to at most one element. So this one, yes, this one is a function.

Okay, but it doesn't matter that f is not a function. We can still apply all these operations.

So let's see what we get. Let's see what we get, um, one at a time. So what is f inverse? Well, you have to just flip all the pairs, right? So we get 2 comma 1, 1 comma 3, 3 comma 1, and 2 comma 2. I just flip each pair one at a time.

What about f composed with g? What do we get? Well, we have to start looking at, um, looking at the y, such as if you apply, you start with g, you get to y, and then through f you get...

What about f composed with g? So let's see.

Okay, so we got to start with g. So let's start with the 1, where 1 can go. Through g, it can only go to 3, and then 3 through f can only go to 1. So we get 1, 1. 2 through g, you can only go to 1. 1 through f, it can go to 2 things, uh, 2 and 3.

So that means we get 2, 2 and 2, 3. And 3 through g can only go to 2, and 2 through f can only go to 2 again. So we get 3 comma 2. And that's the composition of f and g. And again, it's not a function because 2 is going to two different things, uh, 2 and 3. But it's okay.

Composition of relations is only a relation. What about, uh, f restricted to a? So that means we only consider the part of a, um, we only consider the part of f where the first element belongs to a. A we say is one element, a is 1 and 2. Um, so where is 1 and 2 going? So the second, second tuple, this one, is the one that is not, the first component is not in a.

So the other ones are in a, so then we get 1, 2, uh, 1, 3. It doesn't matter that the 3 is not in a. It's the third, the one that it matters. And 2 comma 2.

Okay, so that's the restriction of f to a. And what is the image of f under a? Well, we have to see where everybody, where 1 goes. 1 goes in f to 2 and to 3. So we get 1. No, sorry.

So we get 2 and 3 and 2 goes to 2 again. So we get 2 again, but we already have 2, so we don't need to put it again. That's the image of a.

Okay, here is an observation for you guys. Let f be a function. then what is f inverse composed with f?

Suppose the function goes from a, set a to a set b, and here is your function f, here is your function f inverse. What is f composed with f inverse? It's going to be the identity in a. It's the identity function on a. What is the identity function of a? It's a set of all pairs, x comma x such that x belongs to a.

So every element of a is mapped to itself, right? We all know this.

Okay, let's see some situations where we're going to get like partial inverses for functions. So, so let's again f be a function from a to b, and let's assume that a is not empty just for triviality. So I want to claim two things. Number one, there exists a left inverse, a function g such that g composed with f is identity on a if AND only if f is what?

Let's let's finish the theorem and then let's see if we can figure it out. And b says that there is a right inverse such that f composed with g on the right is the identity on b if AND only if f is what?

Okay, let's start proving whatever with one direction and then we see what we need. Okay, so let's see the proof of this. It's hard to see the proof of something. We don't know what it is, but let's see how it works out.

Let's consider part a and let's consider the direction where our objective is to build such g um like this one where our objective is to build a g like this one and we want to know what do we need to know assume about g to define such a c.

So the idea is as followed right so we have a set a and we have a set b and we have our function f and we would like to define g so that when you compose we get the entity right so suppose we have an element here b and we want to define g but what do we want we want that if you have an element a up here and we apply f and we get to say f of a then when we want the image back we want to get that if you apply the image back we get back to that one right so we would like a to be equal to g of a g of b to be equal to a right so that's what we would like so given given b in b if b belongs to the range of f and b is equal to f of a then we want we let g of b be that a right if you do that then when we do a apply f and then apply g back we get back to a it's good so what is the point here well what if what if this b is also equal to f of a prime for some other a prime that goes also to b well in that case we don't know which one which to use for g of b either a or a prime so in that case we're going to get into trouble because we will get that a prime goes to b and then goes back to a not back to itself

So we cannot let this happen right so the only way for for this to work out is is if um if f if f was one to one in this case there's a UNIQUE such a that maps to b right so that's what we need if f is one to one if f is one to one then we can define this g uh one other thing what is uh if b is not in the range of um f well we let g of b to be any element of a it doesn't matter what it is because it's not coming from anybody so it doesn't affect g compose f so we let a zero and recall that a is different than the empty set so we can take some element let's say a zero belongs to a just fix an element that belongs to a we know that this is one because it's not empty and everybody that is not in range we map it to it so that's how we get this proof what about this side what now now this would make more sense suppose now suppose that suppose that we have a g such a g component f equals the identity in a and suppose also that f of x equals f we want to show that x hat is equal to y well if f of x equals f of x equals f of y if you apply g on both sides these two should still be equal

Because we're applying g to the same thing and g composed with f is by the identity so this one should be x and this one should be y so we get x equals y all right so we get that it has to be one to one there was no other option but but it to be one to one if you wanted to build such g what about the other case in the other case what we need is g to be you guys can guess it onto that's what we need why is that let's do the easy direction first so if you take uh any b that belongs to to b we know that identity b is equal to the identity on b which is equal by our assumption f apply to g of b so that means b is in the image of f right so so so that means b belongs to the range of f because it's the image of g of b right so we get that everything in b is in the range of f so f is on the mountain now let's uh prove the other direction let's do a little picture here is a here is b we are given f we want to define g so that if you're given b right here we want g of b to be something that when you apply f back you get back to p so we want so given b that belongs to b we want g of b to be so that f of g of b equals b so

In other words we want b to belong to the prey image f of b b is something that when you go back to b in f you get there so we are assuming that f is onto so there's always something that goes to b but there could be a bunch of things things that go to b we just have to choose one right so we will say for each b in b let g of b b be an element of f minus one or in other words we want let g be a function such that g is a subset of f inverse g of b is an element of f inverse of b for every b and domain of g we want it to be b u equals b all right so if we do that then we get our inverse question can we find such g given the axioms that we have so far so in the previous case when we defined the inverse for the one to one well it was a UNIQUE element element that uh was used for g of b but here i'm saying uh for each b just choose some some element that belongs to to this guy just choose one i mean we know there is one because it's onto so for every b just choose one element in there and that's going to be your g of b there is one so we can choose for each b we choose one for each b we choose one

But that doesn't follow from the subset axiom right because in the subset axiom we have to explicitly say how we define in this case the graph of g how we explicitly find these elements we need to be explicit how a formula and first of the formula that defines the set so that we can have the set now here we are not having an explicit formula we're just saying choose an element and choosing an element is fine but this set b here might be a huge set and not finite might be infinite or very very infinite and how to choose an element for each element so we have to do like a lot of choices so what do we need here we need a new axiom and what is this axiom called as you may guess is the axiom of choice the action the first we're gonna see various different ways of us expressing the axiom of choice don't worry we're going to talk about the axiom of choice quite a bit um this is the first one and we just when we need it for this very simple observation about this very simple observation of having a left inverse if AND only

If you're onto we need the axiom of choice already and it says like this it says the following for every relation r there is a function let's call it g g included in r so that means a set of pairs including a set of pairs with the same domain okay so in uh in pictures we have a relation and let's call them backwards because in the previous case this is the b this is the a of the previous case and the relation in the previous case was the inverse right so here we wanted g to be a subset of f inverse axiom of choice just works for any any relation in general f inverse is a relation by the way it might not be a function if f is not one to one but uh it's still a relation and all we wanted there is to take a subset of that relation a sub function of that relation so let's do a little picture here so we have every element here here it's related to an element here every element related and maybe some elements are related to two elements and this one comes from here maybe this one is actually related to another element right here and

What we want is to take a function this one right there this relation right there is um um not a function but why is it not a function well because like if you see this guy goes to two elements and this one goes to two elements this one goes to two elements they are not a function each one has to go to one so now we want to define this function g and for that we need to map everybody to a single element so we need to say okay this one well this is only one option this is going to go right here this guy well it's a function they can only go to one guy it could be the same one or not doesn't matter we make it go there and this guy we make it go there okay so now we have that the red is a function each element goes to one it's a subset it's a subset of r as a set of pairs and it's a function and the domain is the same thing it's all the same three points in the domain right

**So this version of the axiom of choice in like in the picture when everything is finite is trivial in the in the finite case we don't need to call the axiom of choice for this when it's interesting it's when you have infinite sets because when you have infinite sets you have to make infinitely many choices and making infinitely many choices well we'll talk about this later all right see you guys next time**



## 10. Part p10 - Equivalence Relations

All right, welcome everybody. So today we're gonna be discussing equivalence relations. So we're gonna continue with building basic mathematical concepts out of sets and today we are on equivalence relations. So they are gonna be very useful for us when we start creating other objects from previously built objects. I imagine many of you have seen equivalence relations before but let's review them and see how we build them out of from scratch.

Let's start with a few examples. One of a few examples. So example, for instance, let's say if you have, we say that two triangles are congruent if their size have the same sizes. Yeah, so they will be an equivalence relation. So we are saying it's a notion of equivalence between triangles. So the triangles, let's say they are represented by three points on the plane, on R square, right?

So a triangle is represented by one point in R6, let's say, three points in R square. So we are saying that three, like two triples of points are equivalent if the sizes are the same, right? So this is a notion of equivalent between triples of points in R2 and it has a meaning of the triangle is the same.

Another one could be modulo. So we say that A is equivalent to B modulo 7 if A minus B is a multiple of 7, right? **So that's an equivalence class and correspond, I mean, IF you're thinking of the numbers between 1 and 31 being EQUIVALENT means that you correspond to the same day of the week.**

So let's define a general notion that encapsulates all these notions of equivalence. So here is a definition. An equivalence relation is what? Is a relation, let's call it R, let's say, let's put a name with a field, let's support the field with A. It's a relation R that satisfies the following properties such that following properties. R is reflexive on A.

So what does this mean? **This means that for every X in A, X is related to X.** So that's reflexive. Everybody is related to X is related to itself. I guess X related. This is just a shorthand right here for the notation, the pair X, X belongs to R.

Okay? So that's what we mean by X, R, X. It's easier to visualize when you have a binary relation to put the relation in the middle. But we mean that the pair belongs to the relation.

Okay, so it needs to be reflexive. What else do we want from the relationship? The relation. We want that is the wrong color. We want that R is symmetric. So that means what?

**That means that for every X, Y, IF X is related to Y, THEN Y is related to X.** Okay? So it's symmetric. if I'm related to you, you're related to me. So symmetric. What else?

R is transitive. And that we set as for every X, Y, and Z. if X is related to Y and Y is related to Z, then what? then X is related to Z.

Okay? So transitive. So these three properties make an equivalent relation. So any relation satisfies this is going to be an equivalent relation.

Okay? Let me ask you a question. Like the casting relation. Remember, we saw a few videos ago, the casting relation to people that are related to their cousins. Is that an equivalent relation?

Okay. I'll leave that for later. Think about it. So right. The ones we have there are definitely, um, definitely transitive.

For instance, uh, being congruent module, module of seven is transitive because everybody is related to itself. Because A minus A is zero. It's a multiple of seven. It's symmetric because A minus B is a multiple of seven. then B minus A is also a multiple of seven. It's transitive because if you add two multiples of seven, then you get a multiple of seven.

Try to work that one out and see if you can figure it out. In the case of the, uh, equivalent module of seven, we know that if the two things are equivalent, there is something representing that equivalent, which, which is, if you divide over seven and you take the reminder, you get the same thing, right? So the reminder module of seven of a number kind of represents everything that is equivalent to that reminder, right? Uh, or the day of the week, for instance, if you're talking about, um, days from one to 31, talking module of seven, the days of the week represent everybody that is equivalent.

Okay. So we would like to have that in general. Whenever you have an equivalence relation, to have something that, an object that represents, uh, when two things are equivalent, we can define the equivalence classes of each element. **So the equivalence classes are defined as follows.** So if you're given an element x, um, so let's say given an element x that belongs to the, the domain of the relation, um, we define the equivalence relate equivalence class of x modulo r to be the set of all the y's in a, such that x is related to y, right? So this is called the equivalence class of x.

So the equivalence class represents everybody that is equivalent to x, x and all its friends, all, all the ones that are like x. So for instance, in the congruence, in the example of the triangle, um, the equivalence class, one equivalence class corresponds to all the triangles that have the same size, exactly the same size. They all belong to the same equivalence class. Um, and sometimes that's what we want to talk about. if you're talking about triangles, we don't care sometimes where they are located in the plane. Like if it corresponds to the point one, one, one, three, one, and four, two, sometimes we don't care.

We just care about talking about a triangle and all we care is about the size of the triangle. So then essentially what we're talking about is the equivalence class among all the triangles in the plane corresponding to the particular size. Um, so the equivalence class has the following property and is that if you have an equivalence relation x, the class of x modulo r is the same as the class of y modulo r if AND only if x is related to y. Right? Because if x and y are related, they have exactly the same equivalence class. Whoever is related to x also equivalent to y, related to y and vice versa.

Um, and conversely, if the class of x is the same as the class of y, well then x belongs to the class of x, y belongs to the class of y. So they belong to each other's classes. So they must be equivalent. So the equivalence class is essentially a concrete object where now equivalent equality of equivalent classes corresponds to equivalence among the elements. right? It's going to be a very useful construct coming up soon. **I'll let you guys try the proof of that lemma.**

It's, um, it's a good exercise. Another way to visualize, um, equivalent relations is using partitions.

So let's define this. A partition of a set A is a set, let's put it a name, uh, pi of subsets of A such that satisfying the following properties.

Okay, so pi is a set of subsets of A. So it's a collection of subsets of A. So we have many subsets of A. And before writing the properties, let's, um, draw a little picture of what, uh, these things look like.

Suppose here is our set A. A partition is going to be a bunch of sets that look like that. Like we're going to partition the set A into, let's say, a few, a few regions. And here we're going to have one, one, two, three, four, five different regions. So this could be a partition of A into five subsets.

Okay? So that's what a partition is. You just break the set into different pieces. So to be a partition, what properties do we want, do we want to have? Um, so first, uh, any two elements of pi are disjoints. Any two sets that belong to pi are disjoint.

Right? So you can see this in the, in the picture, any two of them are disjoint. And B, we want that every, every element belongs to somebody in the partition. Every element of A wants, uh, needs to be inside somebody in the partition. So we say that by saying that the union of the partition, so that means the union of all the sets that belong to the partition has to be everything.

Okay? So a partition is a bunch of subsets of A, such that they are all, the, the intersection of any two of them is empty, but the union of everything, the union is everything. Um, and that pretty much looks like a bunch of equivalence classes, right? So it's no difference than having, so on the one side, so assume R is an equivalence relation when I said A. Well then, how do we build, um, from an equivalent relation, the associated partition? We want to put all the elements that are equivalent inside a single subsets of partition and separate all the equivalent classes.

Well, so exactly, that's exactly what we want. We want the set of all the equivalence classes. then the set of all equivalence classes, um, for x that belongs to A is a partition of A. Right? So essentially it's like, uh, we have, um, our partition of, sorry, our equivalence class modulo 7 of the numbers from 1 to 31. And essentially we can see, we can partition the numbers from 1 to 31 by using the days of the week.

So we put in one element of the partition, all the Mondays. So there's all the numbers congruent to zero, let's say, modulo 7. then in another one we put all the Tuesdays, so that's all the 1 and the 8s and 15, all the ones congruent to 1 modulo 7. And we can partition the date, the numbers from 1 to 31 in seven subsets corresponding to each day of the week. So that would be a partition associated to the equivalence modulo 7. And also, if you're giving a partition, we can be in an equivalence class from it.

If pi is a partition of A, we can define an equivalence class related to it. Right? Like you can see in the picture right there, you imagine all the ones that belong to each piece, you make them equivalent to each other. And then you make so that the equivalence classes are exactly all the pieces. So we can define the set of all pairs x comma y that belong to A squared such that, what, how can we define the relation? So when do we know that two elements are equivalent using the partition?

Well, we have to say that they belong to the same element of the partition. if AND only if there exists a B that belongs to the partition, so this B is a subset of A, such that x belongs to B and y belongs to B. Right? So two things are equivalent if they belong to the same thing. So the proof that the statement here is that if pi is a partition of A, then R is an equivalence relation on A.

Okay, so in a sense equivalence relations and partition are mathematically roughly the same objects. I mean, I guess sometimes the intuition you have for one or for the other is different and you want to use one or the other, but that's what an equivalence relation does. It partitions the whole domain into different equivalence classes.

Okay? Pretty good. **I'll leave you guys the proof of the theorem.** Try it out and see what you guys think. So I want to make another important definition which is the quotient.

Okay, so how do we define the quotient? The quotient of A modulo R, where R is an equivalence relation on A, denoted A quotiented by R, is defined to be what? Nothing more than the corresponding partition, the set of all equivalence relations.

Okay, so the associated partition is essentially called the quotient, but the quotient of a set module and equivalence relation is thought in a different way as a partition. So when we think of the quotients, now we think of each element, each equivalence class, as a single thing, right? And now we have the elements of the quotient have the property that the two are equal, even only if they come from the same, from two things that are equivalent. So essentially, in the quotient, we are forcefully making equal things that on A were equivalent, right? So if you're going to use equality instead of equivalent, we go to the quotients. So here is an example.

Suppose that we have the following relation. So let's, let's say for x and y in, so we have two pairs of natural numbers, x0 and x1, and the other pair, y0 and 1, and then we say that x0, x1 is related to, so let's, is related to y0, y1, and we're going to define them to be related if AND only if the following happens. x0 plus y1 equals y0 plus x1.

Okay, so this is a relation, so some points satisfy this, some pairs of elements, numbers satisfy this relation, some don't. It's not obvious at first glance that it is an equivalent relation. You have to prove the three properties, reflexivity, symmetric, and transitivity. One way to see there is an equivalent relation is to observe that this is exactly the case if AND only if x0 minus x1 is equal to y0 minus y1. So essentially two things are equivalent if the difference between them is the same number. So that's going to satisfy all the, it's easier to see that it satisfies the same properties, the equivalence relation properties, once you have these.

And now what is the quotient? Suppose you believe me, try it at home, proving all these properties.

Suppose you believe me that if you take the natural number squared modulo that r is an equivalent relation on the natural number squared, when we take the quotient, the quotient, what do we get? The quotient under this equivalence relation. Well, we have, we're going to get all the equivalence classes, right? So we are going to get the equivalence class of 0, 0. We are going to, module, no, over r, of the pair 0, 0. We are going to get the equivalence class of 1 of the pair 1, 0.

Wait, this is the same equivalence class as 1, 0, right? 1 minus 0 is the same as 2 minus 1. So we don't want to add this one because it's confusing. These two are exactly the same.

So let's not put that one. What we do get is 2, 0. That's a different one. 2 minus 0 is not in the list yet. And we can also do 0, 1. And the difference is negative 1.

And we can do 0, 2. And the difference is negative 2. So those are all the equivalence classes. We can start, we can start to list them all and try to be different. What is, can you guys see a pattern here? What is this going to look like?

These quotients. This quotient is a set of equivalence classes. How do you represent them? The idea that I want to just, just give you an idea as a hint for what something that is coming is that this is more or less like the integers. Right? Because you have, depending on whether the first one is greater or not than the second one, you might get a positive number or a negative number.

So for instance, you might want to say, okay, look, look, 0, 0 corresponds to 0. 1, 0 corresponds to 1, because it's 1 minus 0. 2, 0 corresponds to 2. The one that we tried, 2, 1 satisfies to, is connected to 1 also. And 3, 2 also is equivalent, so related to 1. And 0, 1 right here, is going to be associated to what?

To negative 1. And 0, 2 is going to be associated to negative 2. Right? So, in essence, the quotient, n squared over r, it looks like the integers. Yeah? So this is, we're going to get to this.

We're going to, this is the way we're going to define integers from the natural numbers later on. Um, okay. So that's how we use equivalence, um, that's how we use quotients. So we have an equivalence relation. We want to make them, the things that are equivalent, we want to make them equal. So we consider the quotients and in there, things that are equivalent become equal now.

Um, one more thing I want to define, I want to, I want to, um, define, uh, suppose we want to define a function, uh, on a quotient, to some set B, uh, using a function that goes from F, that goes from A to B. Yeah. So suppose, for instance, that, um, every day of the month, every number from 1 to 31, you have one particular thing you're going to eat for dinner. I don't know. In the first, you're going to eat rice. On the second, you're going to eat potatoes.

On the third, you're going to eat broccoli. You have a list for each day, a function that tells you what you're going to eat that day. And you want to actually say, well, actually I want to define a function that goes from the day of the week, Monday, rice, Tuesday, potato, Wednesday, broccoli. You can do this only if the original function had the same values on all the same days modulo seven, right? So in one day, day one, day eight, day 15, day 22, if on all those days you're eating the same thing, then you can say, well, now we have a function that goes from the day of the week to the food, right? But if you're eating the only one, you're eating one thing and on the end you're eating another one, it does correspond to the same day of the week.

So you couldn't assign a function that goes from the day of the week to the food, right? So the same happened here. So suppose that now that you want to define an area function for a triangle, and now you have a function that takes three points in the plane, so three points in R square, so that means a point in R6 essentially, and gives you the area of the triangle limited by those three points. Can we quotient that and say, and define a function that takes an equivalence class under congruence? **So that means that takes the class of all triangles of the same size all over the plane and associates an area.** Yes, we can, because whenever you have two congruent triangles, they have the same area.

So it doesn't matter where they are in the plane, you're going to get the same area. So this function, the area function, can be defined on the quotient of the triangle, of all the triplets of points, modulo the congruence relation on triangles. So in general, if you want to define a function that goes from the quotient to a set using a function from A, we need, what do we need? We need the function to be invariant under the equivalence relation. So we want to define a function using F such that F tilde of an equivalence class, the equivalence class of R, right, this is an element of the quotient. So we want to define the function of the quotient, so we have to say what it does on the elements of the quotient is equal to just what F does on the element X, right?

So that's very common that we want to do that. **And I guess it's a lemma that says that such a function F hat exists IF AND ONLY IF we have the property that for every X and Y in our domain A, you have that whenever X is related to Y, their image is the same thing.** F of X equals F of Y.

Okay, so suppose I'm going to give you an example and stop right there. An example for you guys to think. So consider R, so R is, so let R be the similarity relation on R squared, the real squared triples. So okay, so we have three pairs, three points in the plane, and we say two of them are similar, are related, if the angles of the triangle are the same.

Okay, so angles, so what this means is that angles in triangle are the same. So that's what it means for two triangles to be similar. **It means that they have the same angles, and now we take three points in the plane, three points in the plane make a triangle, and THEN three other points in the plane, they make another triangle, and we say they are R related by R, IF the triangles they define are similar.** And now we want to define, we want to define an area function on the equivalence class of a triangle.

Suppose the triangle has three points, let's call it A, B, and C is a triangle. So A is a point in R2, B is a point in R2, and C is a point in R2, to the equivalence class of this one, to be the area of the triangle, A, B, C. Is this correct? Can we define an area function on the equivalence classes and their similarity? Is that going to work?

Okay, I'll let you guys think about that. See you guys next time.



## 11. Part p11 - Infinite Cartesian Products

Okay, let's talk about infinite Cartesian products. So, we know how to do a Cartesian product of two sets. You guys remember how we did that? **We define a times b was a set of all pairs x, y such that x belongs to a and y belongs to b.** Right? And we actually saw we could do this because this guy belongs to the power set of the power set of a union b.

Correct? **We use the subset axiom to define the Cartesian product of two sets. IF you want to define the Cartesian product of four sets, you can probably figure out how to do it.** A times b times c times d. It was a set of quadruples x, y, z, w that belong to the power set of the power set of a union b union c union d such that x belongs to a where this guy over here was defined to be x, y, z, w. Right?

So, we can define Cartesian product between any number of sets we want with the same idea. **Now, I want to ask about how do we define a Cartesian product between infinitely many sets.** So, suppose we want sets, suppose we have sets a sub n where this set here is set all the elements from zero to let's say p to the n minus one where p is a prime number. Make the screen a little bit bigger so you can see that.

Okay, and we want to define the Cartesian product of all these guys. We can want to define a1 times a2 times a3 times a4 times all the way all these sets together. What would that look like? What would it be an object of this guy look like? Well, I guess you say, well, it has to be an infinite tuple. Infinite tuple, something that looks like an element from this one, a1 that is below p and another element a2 that is below p squared and an element a3 that is below p cubed and an element a4 below p to the 4.

Infinite tuple. We would like that to be an element that the Cartesian product of these infinitely many guys, right? But first, what is this thing? **We we haven't, I mean, we're fine extending the definition of pairs to the definition of quadruples by putting pairs together, but infinitely many, that doesn't sound doable.** And what is this infinite product of infinitely many things? How do we define this?

So I guess what we want is this infinite tuple, we can define, we can think of it as a function that given the number n outputs a sub n, right? It's a function that goes from n to where? Well, it's not exactly a function because depending on n, this guy is going to belong to the set a sub n, which changes according to n. So it's not really as of any function. We don't know what the domain is, the range is, but well, functions don't need to have domain.

So let's define this concretely. Let's now move on and let's actually define what we mean right here. So here we go. Definition. So first, how are we going to represent all these infinitely many sets? Well, to represent infinitely many sets, we're going to consider a function that for each, in this case, for each n gives you a set, right?

So these a sub ns are a function that given n output a sub n. So let h be a function with, let's call it something in the domain, domain as set i, such that for every little i in the set i, h of i is a set. So we have a collection of sets, in the previous case i was the natural numbers, so for each natural number n, we had a set h sub n.

So now we have, we generalize instead of n, we just have an infinite set i, it doesn't need to be infinite, but it could be infinite. The idea is that it's interesting when it's infinite, such that for every little i, we have a set h i. So we're assuming it's a set. Wait, so we're assuming that every h i is a set, didn't we say that everything is a set? Everything is a set. Everything so far that we have in our universe is a set.

So this is not needed. Everything is a set. But i wanted to give you the intuition that essentially the h is essentially a function and you have to think of the objects, the image of h is a collection of sets. **And THEN we're going to define, now let's go back to the definition, we define the product, which is a capital A, product for i in i of h i.** So it's an infinite cartesian product of infinitely many things. So this is this symbol up here, it's like a big, like a big cross product.

The same way as when you have plus between two elements, then you define sigma to add, to do an infinite summation of things. Or when you have a multiplication between two elements, you define pi for the product of infinitely many things. Or when you have, in this case, you have cartesian product and we're going to define big cartesian products to an infinite cartesian product. So that's what the symbol means. So what is this guy?

Let's go back to the definition. This is going to be the set of functions. And what do we want about this f? So essentially, let's draw a little picture right here. What kind of f do we want? We want, so here is, let's say, our h.

So here is h i0, h i1, h i2, h i3, right? So here the i's have the elements of i. So in this case, i contains the elements i0, i1, i2, i3. It doesn't need to be countable. I'm just doing countable for the example, but it could be more. And the elements of our products are going to be these functions.

And these functions, what they are doing is picking one element from here. f of i0, f of i1, f of i2, and here f of i3. So each element of our cartesian product is going to be picking one element from each set. And then there are more sets. More sets going on as you go that way, right? So what we want is f to be a function. And what do we want about f again?

Such that with domain of f equals i. So everything in i is going to be associated to something. And for every little i in i, we need to have the property that f of little i belongs to the set h i, okay? So elements of our cartesian products are going to be functions that take each element from the index set. For each element of the index set, pick an element inside the corresponding set, the h i. So we're picking one element from each guy.

We need, we need, what do we need? **We need to get this guy inside somewhere, right? IF you want to apply the subset axiom.**

So let's put this in a side. Question, where is coming from? I let you guys think about this one. It's an interesting question. **Where are we taking this f from so that we can define the cartesian product using the subset axiom?** We need to take them from somewhere that we know how to build already.

Where are we getting these f's from? Good question for you guys.

**Okay so we have a definition for our cartesian product.** So for instance um in the example up here now um our f here our f f n is essentially the element that we say a n. Sorry it is the element a sub n that we put in the list that belongs to a n.

Okay so and it goes from the natural numbers and to where that's the question that we have today. Where is this function going to and why is that we can take them from somewhere.

Okay so that's an infinite cartesian product. Um a trivial observation if some h i is empty then the whole product of the h i's is empty. Right because if one of them has nothing inside we cannot define the whole function. There are no such functions because just on that spot we cannot choose uh any value. Right so if you multiply it's the same as when you multiply. if one of the elements is zero then the whole multiplication is zero.

If you do a cartesian product between a bunch of things and one of them is empty you get empty. But what if um none of them is empty? Could we get an element? Um let's hold that question for a second. Let me ask you another question to you guys. Let me write down here an example.

Consider an equivalence relation. Uh that we defined like we defined in the in the last video. So on the real numbers. So let uh r let's not call it r because we're going to use the real numbers.

Let's e be the following equivalence relation on the real numbers. Again we don't have the real number yet but for the sake of the example we are assuming that we have them and the relation is the following. So we say that x is related to y if AND only if x minus y is a rational number.

Okay so two numbers two real numbers are the same if AND only if the difference between them is a rational number. Okay so if you move the length between them is a rational number. Um so what are the sizes of the equivalence classes here? Think about this. It's a good question for you guys. What are the sizes of the equivalence classes?

Um and now what I want is consider i is a set of uh this is a quotient. I want this to be the quotient r over q.

Okay so for each equivalence class I'm going to define a set and what's it I want to define? the same one. So given i in i so that means i is an equivalence class we let h i be i identity. So that means h of the equivalence class of x under this equivalence relation is just the equivalence class of x under this equivalence relation.

So now the question for you guys is find an element of and let me do this in blue the infinite cartesian product for i in i of h i. Okay so that means i in i is a set of um is a quotient so it's a set of equivalence classes and for each equivalence class we are considering the set of course it sets itself. So essentially you want a function that associates to each equivalence class an element from it. Right? But the single element for each equivalence class we're going to choose one element.

Okay? So the whole equivalence class is going to choose you're going to the function is going to map it to a function an element inside the equivalence class.

Okay? So the task for you is to think about how to find an element from it. And okay so in general let's go back to the previous comment before we had that up here that this observation that if one of the h i's is empty then the whole cartesian product is empty.

Now if none of the h i's is empty then that means in each one there is at least somebody you can pick. Right? Um so the whole cartesian product should shouldn't be empty. But again how do you find how do you pick an element from each guy in general? **And this is actually another version of the axiom of choice second form and it says the following IF h is a function with which maps i to the set of set two sets with uh h of i different let's call it um NOT an empty set for all uh in the domain of h THEN the infinite product of h i's for all the i in the domain of h is non-empty.** So that's what the another form of the axiom of choice is saying um you have you want to do an infinite an infinite cartesian product of a bunch of sets h i's and you know that none of them is empty and then the claim is that the cartesian product is not empty.

I mean usually the cartesian product of things is like much bigger than themselves right you're multiplying one by the other by the other but moreover if it's infinitely many things it grows quite a bit um so it sounds kind of silly to say that it's not empty of course it's not going to be empty but but why? I mean to show that some saying that something is not empty means you have to find an element and to find an element we need to define it.

I mean so far with the subset axiom we can only define elements if you have a a formula that tells us how to define the set we can only define sets with a formula with the first of the formula and the elements of this cartesian product sometimes they are hard to define because we don't have a formula to choose from them right the picture up here we want to define an element the cartesian product so we need to choose an element from here an element from here so it's for to define a single function a single element in the cartesian product we gotta pick an element in each guy right so i need a single function a single element of the cartesian product consists of one element of each how do we pick one element of each if you have infinitely many and we don't have a rule we need sometimes if you have a rule how to define each element then we can use a subset axiom on defining but just randomly what does it mean to randomly define well axiom of choice is telling us that we can that there is a way to choose it doesn't tell us how we choose axiom of choice it tells us there is one element in this partition this because not empty just means there is at least one element that's all it says there's at least one element in this cartesian product that is choosing one element from each hi one time um okay so another question for you guys what about this axiom of choice question is this form equivalent to the other form are the two versions of the axiom of choice we seem so far equivalent okay you let you guys think about it see you next time



## 12. Part p12 - The Model of Hereditarily Finite Sets

Welcome everybody! Alright, so now we continue with our task of developing mathematics within this framework of stem theory. So we have, so far we have functions, relations, equivalence relations, etc. With that we now want to continue going, developing mathematics, now going into developing the numbers, the number systems. And we're gonna start with the natural numbers and then move on to the integers, the rationals, and the reals. So this is gonna happen in the next couple weeks.

And once you have the reals, it should be quite obvious that yes, that we can develop all of mathematics within our axioms. Okay, so for this short video I want to motivate the introduction of the infinity axiom. And for that I want to make the following observation, and it's that v omega, you guys remember v omega? v omega satisfies all the axioms we have so far. **Remember so far we have the axioms for extensionality, pairing, union of two sets, power set, we have the empty set axiom, and the subset axiom.** And the axiom of choice that we mentioned a couple times. So we have seven axioms so far.

And this guy, v omega, v omega was defined like that. **So we define v0 to be the empty set, v1 to be the power set of the power set of v0, meaning the power set of the empty set, v2 with the power set of the power set of the empty set, and v3 with the power set of the power set of the power set of the empty set, so on and so forth.** And we define this guy v omega. I'm gonna define what omega is in the next video. But so far, v omega is a whole thing, and we define it to be the union of all these things.

Okay, so this definition so far, the way I've done it, I mean, these guys up here, we can do one at a time. But v omega, we cannot define v omega so far, because this infinite union, I guess we have to put them all in a set together. How do we put them in a set together? We don't have the axioms to do that yet.

So let's think of this construction as a construction outside, from mathematics, from real mathematics, looking from the outside. And I'm just finding a collection of sets. **And my claim is that this collection, v omega, satisfies all the axioms so far.** And yes, it satisfies, you can union, so this set, by the way, another way to interpret, to think of v omega, v omega is everything that you can build using brackets, brackets, a comma, and the empty set, that makes sense. So everything with infinitely many, only infinitely many steps. So anything you can build, like a bracket, empty set, comma, bracket, bracket, empty set, close, close, comma, empty set, bracket, bracket, empty set.

Anything you can build like this, that makes sense in the sense in the sense of closing and opening parentheses and everything with a finite string of brackets. Yeah, those are exactly the elements of v omega. So v omega are the things that are finite set of finite sets of finite sets with finite depth. So essentially, another way of thinking v omega, going back to the plastic bag analogy, v omega is anything you can build with finitely many plastic bags. You just put them inside each other in different ways. And so whatever you can do with finitely many plastic bags, putting them in whichever way, those are all the possible elements of v omega.

And it's still quite rich, because you have all finite sets of finite sets of finite sets, but it only contains finite sets. And it contains the empty set, two sets are equal if they have the same elements. You can union two sets, you can build a set of two things. The power set of finite sets is still a finite set. The subsets of a set, you can define a set with a subset, whichever subset you want. And you can also pick, if you have a finite set of finite set, you can pick one in each.

So it satisfies all the axioms so far. And it's not that weak. Like actually, what we have so far, you could develop all the theory of natural numbers, and all of arithmetic, Peano arithmetic, the standard arithmetic, and prove most of the theorems from number theory about natural numbers in this theory. So if you're working only with finite objects, and staying with finite objects, like combinatorics or number theory, number theory sometimes goes beyond them.

Let's say basic statements. You can prove them here. But we are going to want to go beyond. We are going to want to go and consider the set of the natural numbers, and the set of the reals. And for that, we need to go beyond these sets.

Okay, more on the next video.



## 13. Part p13 - Natural Numbers

Welcome everybody! Okay so now let's dive into developing the natural numbers one step at a time.

So let's start with what is a number. So so far we only have those guys from the previous videos everything you can build with empty sets and the brackets and we need to somewhat define the natural numbers. So we need to define essentially what zero is, what one is, what two is and we need to do it in a way that we can identify who they are in a nice way. So if I ask you what zero should be you will say well zero should be the empty set so that's quite reasonable. I mean we just have to pick elements and give them names zero one two three and we want to do it in a way that is algebraically easy and combinatorial easy to work on. So and then you say what's what's one and usually when I ask that question people are what about the set that contains the empty set sounds like an obvious choice.

Cool what about two well now for two we have a few more options because you could for instance say the empty set which contains the set which contains the empty set and then for three you could do the empty set of the empty set of the empty set of and so on so forth.

You will get essentially you will have a bunch of different sets they are all different they are you can name them combinatorially this is not the best option and it's not this more standard way so we are not going to do this um just because it's going to work better for our definitions we're going to choose a different a different path and what we're going to do is we're going to say well two is the empty set that contains the empty set and the set with the empty set so the previous two and then three is going to be the previous three empty set set with the empty set and the previous one oh sorry so that's three the previous three guys together and that's the way we continue all the way so we're just essentially picking sets i'm giving them names 0 1 2 3 so then we can define all the natural numbers so here is the more formal definition so each number is going to be the set of all the previous ones all right so the number n is going to be the set 0 1 2 all the way up to n minus 1 yeah where what's n minus 1 n minus 1 is a set 0 1 2 all the way to n minus 2 um okay

So each number is the set of all the previous ones one advantage that has um this way of doing it is that now uh the size of the number n like how many elements are there in the set representing n is exactly n right so the number n has n elements inside so that's also going to be quite useful for for the combinatorics of this thing um all right so that's what we have here no so this is this guy three here that we did before is essentially the set 0 1 2 and 2 is the set 0 1 this is set 0 and empty set is the empty set because the 0 is empty because it has nothing below okay so those are going to be the numbers for us um okay so now we need uh the next step is to find a way to find a formula that defines that tells you what's the number um but the formula it has to be an inside formula from uh first of the logic we cannot say oh a number is something that can be built this way infinitely many steps we still don't even know what finite means in size set theory we know it from the outside but we don't know it from the inside

But how do you talk about finite things a finite many steps built we need a property that these objects are have so that we can say everything that has this property is going to be a natural number um so before that let me take one step back and this is going to be useful actually for the definition uh is how do you define the successor like given a number n how you define a successor meaning n plus one and and this is the property like um we can define um the successor of a when we do it we define we put the plus we're going to use this quite a bit in the next couple videos so a plus is just a very simple definition it's a set a union a itself let me let me give you an example so let's suppose that a is a set that contains let's say two elements b and c all right so it's not a number but it's still we can still talk about the property uh a plus uh this property this operation a plus that you're gonna find it on any set and it's just a plus is gonna be this set bc namely a union the set that contains a set that contains the set bc right so what is that

So that is the set that contains b c comma bc okay so that means you just put the full set inside that's what you do when you do a plus you keep all the elements and you put the full set inside so if you have a number so if you have the number n which is equal one no sorry zero one two all the way up to n minus one when you do n plus you're gonna get the set that contains zero one two all the way up to n minus one so everything that's on n and you put n and you put n inside so let me just really do it in two steps by the definition that's equal to this union the whole set n and then that's the same thing as zero one all the way n minus one n right and that is exactly n plus one we don't have a plus one and minus one yet but i'm just giving you the intuition right so when you have a natural number uh the ways we define them so far if you do this plus you get essentially the next natural number cool okay um so that's a concrete definition for plus so every natural number can be built by iterating this plus essentially starting from the empty set you iterate um finitely many steps we don't know

What that means because i mean we're trying to define natural numbers to understand finite you need to understand the natural numbers but we are going to do it like indirectly so this is what we do so we say that a set is inductive this is a new definition it's a bit abstract it's inductive if it contains zero and is closed under successor and by successor i mean this class operation right so that means so a set s is inductive if zero belongs to s and for every a that belongs to s a plus also belongs to s so for instance the v omega that we had before is inductive because if you have a finite set and you do the successor you still find it so uh so uh so that's inductive even though it's not a set yet for us v omega is still not a set but if it did if it was it would be inductive so everything that is closed under this operation is inductive um there could be more things as the natural numbers uh by one property if you are inductive then what do we know then well zero has to belong to s because that's part of the definition and then it's closed under plus so if zero belongs to s

Then one has zero plus which is equal to one has to belong to s but then if one belongs to s uh one plus which is equal to two has to belong to s and so on and so forth right and then you're gonna get that uh three belongs to s and four belongs to s and so forth so if you're inductive you must contain all the natural numbers so we can take that as a definition okay so this definition so far the way i've done it i mean these guys up here we can do one at a time but v omega we don't we cannot define v omega so far um because like with this infinite union i guess you have to put them all in a set together how do you put them in a set together we don't have it the actions to do that yet so so let's think of this construction as a construction outside from mathematics from real mathematics looking so n is a natural number if it belongs to all inductive sets okay so that's the definition for a natural number you belong to all inductive sets um

So being inductive is a formula we can define very easily close on the successor there are inductive sets that have more stuff than the natural numbers as we said the omega or everything well everything is not a set but there are things that are being closed on their successor doesn't mean that you're exactly natural numbers you can be more but if you're not your number you must belong to all inductive sets and we're going to take that as a definition so it's a kind of a definition from the outside once we know what something is inductive here being if you belong to all of these things the only way is that you're a natural number so that's going to be our definition for the natural numbers and the next question is okay now we want the set of all the natural numbers and um well if according to our definition a natural number is something that belongs to all inductive sets so the set of the natural numbers should be the intersection of all the inductive sets okay so we want to take the intersection of all inductive sets this is a big intersection

Because there are a lot of inductive sets and how are we going to take the intersection of all such a big element well you can say i guess once we have uh one inductive set just take all the sub inductive sets so we could say uh fix an inductive set and then say um omega is a set of all let's call it i all the x's that belong to i such that for every subset of r of r that is inductive then x belongs to b so if you have one inductive set oh if you have one inductive set then we can take all the elements inside that belong to all sub inductive sets and that will follow the definition and then you could show it would require a little proof just a small step that this definition of omega does not depend on the inductive set you take because it's essential this is essentially the intersection of all inductive sets the intersection of two inductive sets by the way is inductive because if both are closed and they're successor then the intersection is still closed and the successor so this is

Essentially the intersection of all inductive sets and we can define this by the subset axiom right this property every inductive set b including i belongs to it um and we don't even need to assume that it's a subset of i for every b inductive x belongs to b so if x belongs to all inductive sets in particular to this first one we are okay so we are applying the the subset axiom so we're taking this from one inductive sets that we started from why is there any why is there any inductive set so actually as we mentioned in the previous video so far v omega the one that only contains finite things or finite things or finite things that's a model of all the actions we have so far all the elements there are finite all the sets there are finite and so there are no inductive sets in there um so we need a new axiom and the new axiom is going to say that there is an inductive set that's it uh inductive sets have to be infinite because you have zero you have plus one plus one so they need to be infinite um and once we have an inductive set we can define omega the way we did

Because once we have an inductive set we can take omega to be all the elements of it that belong to all other inductive sets using this subset axiom and that's exactly the set of natural numbers right so by the way let's write that down right here omega is a set of all the natural numbers all the natural numbers which we usually call in mathematics n but here we gonna call it omega okay um so the axiom says this inductive sets and uh we could the action could say there exists omega there is a least inductive set but we can reduce that from subset axioms you don't even have to say that there is a least one you just say there is one and then you pick an at least one um so that's a way to say that there is something that is not finite so that's that's sometimes called the infinity axiom and it's the action that allow us to move out of the final world but it tells us that something that is not finite exists okay see you in the next video



## 14. Part p14 - Induction on the Natural Numbers

Okay, so now we're going to talk about the induction principle. I mean, it's a basic principle defining the natural numbers, that you can prove things by induction, right? That's what kind of It's kind of the heart of the natural numbers and So the induction principle, the way you're gonna state it is if you have a set A, a subset of the natural numbers, and essentially think of a property, think of you have a property that you want to show about the natural numbers and A is the set of all the things that satisfy this property, right? So you want to show that all natural numbers have a certain property. That's the set A.

So let's write it down. **So A is the set of all the n in omega, such that n satisfies some given property that you have And THEN we, the induction principle says that IF A is inductive, THEN A is everything.**

Let's recall what it means to be inductive. That's right here So a set is inductive if it contains empty set, which is the same as zero and is closed under successor. Successor is a function that goes from A to A plus Which in the natural numbers that's the same as A plus 1 Right? So being inductive This up here can be stated as 0 belongs to A and if n belongs to A, then n plus 1 belongs to A That's what it means to be inductive. And what we are proving is that for every n n belongs to A Right? So that's induction if 0 satisfies the property and whenever you know that n satisfies the property you can prove n plus 1 satisfies the property then from those who think you could use that this property is true for everybody So that's exactly the induction principle that you guys are used to from my previous courses, I hope um, and How can we prove it?

We need to prove it here. We need to prove it from our axioms But there is nothing to prove. I mean omega is defined to be Let's go back. **Omega is the intersection of all inductive sets So that means that it has NO inductive sets inside because it's the intersection.** It's the smallest It's the smallest of all inductive sets So if you are included in omega And you're inductive then you have to be omega. Omega is the only I think the only subset of itself that is inductive because it's the smallest Um, so this is just follows trivially essentially, uh, the definition of omega Is omega is a set that satisfies induction That's essentially the definition because it's the smallest inductive set So it's the smallest the only one that satisfies this property So it's a fine to satisfy induction.

So let's see an example. Let's see here a nice Simple, I don't know if nice Simple example To prove to use induction Every natural number except for zero Is a successor of somebody Okay, so that's what we want to show So every zero is not the successor of anybody But I want to show that all the other ones are the successor of somebody So that's going to allow us to kind of subtract one If you're not zero you can subtract one and you will Get a number.

Okay, so how do we prove this By induction and we want to use induction so we need to define this at a What is the property that we want?

Beans The property is either you're zero or You are A successor so let a be the set of all the things that belong to omega Such that either n equals zero or Or n is a successor There exists an x such that x plus equals n Okay, so it's a subset of the natural numbers and now we want to prove we claim That a is inductive Because we know if we prove is inductive then by the induction principle it has to be everything So that means everything satisfies its property So this proof has two parts I guess part first part Zero belongs to a well as part of the definition of a Zero belongs to a Part two the induction step So suppose n belongs to a And now we want to show That n plus one belongs to a But n plus one or n plus Is of this form Right the previous element a So n plus one Is n plus so it's a successor So n plus one belongs to a So a is inductive So a is Everything so that means everything in omega is either Zero or Is a successor Okay, so that's a very simple proof of how you prove something by induction But essentially that's the way You do it You define the set a of all the things that satisfy the property And then you prove two things One that zero belongs to it And then that if something belongs to it then the successor also belongs to it Okay, here is an important question Which is going to motivate to our next video Is it true That whenever you have that a plus equals b plus then a equals b So it is a successor function One to one different different things cannot go to the same thing And notice one thing We didn't prove this And if it's not then When I say that Inductive sets need to be infinite I was kind of assuming this Right?

You could have an inductive set You could have This is not going to happen But Let's start with zero And then you do You apply plus And you get to one And you apply plus And you get to two And you keep an applying plus And plus And then plus Plus Plus Plus And then maybe you go back to the same thing Maybe after I don't know Two to the one million steps You go back to something If you don't I mean The only way to know that's not true Is to know that every time you apply plus You get to a new element That is not applied before Right? So you need to know That different things Yeah, you cannot go to the plus of a previous element So if So for that if you know that This plus operation is one to one then you can never go back Right? Because every Because this one This guy will be the image of two things You can never go back to zero Because zero is definitely not the plus of anything And if it's in if it's one to one You can never go back So that's what What implies that inductive sets are infinite The fact that this is one to one And if you think about it Well, think about it



## 15. Part p15 - Transitive Sets

Welcome everybody. Okay, so now let's continue with that question and the objective for this video is to show that the function, the successor function, is one-to-one on the natural numbers. So then we make sure that every natural number is built in a UNIQUE way and yet there are no loops. By the way, I say this because the function a to a plus is not necessarily one-to-one in everywhere, at least with the action we have so far. It's gonna be one-to-one at the end but we don't have the action so far. if we had a guy that's satisfied that it's equal to the set that contains itself, we don't like that guy.

We don't want that guy. But so far nothing rules it out and as I was saying in class here it's not that important if it exists or not so we don't have to rule it out. But that guy would satisfy x plus equals. I let you guys work it out.

Okay, let's go on. So right, so to prove that this function is plus is one-to-one the natural numbers we are going to introduce this notion of transit except which is not only for this proof this notion is going to be useful when we do ordinals a lot. It's a bit technical but bear with me because it's going to help us a lot later in the class and for this proof. So here it is. A set a is transitive if the following condition holds. Whenever you have that a number and a number an element x belongs to a to something that belongs to a then x directly belongs to a.

Okay, so this is saying that belongs, the belongs relation is transitive. You guys remember what transitive means for like linear orderings or for ordering, partial orderings means a is less than b and b is less than c then a is less than c. That's not necessarily true for belongs. Usually most of the cases is not true unless you have a transitive set. In the case of transitive set if x belongs to a belongs to capital A then x belongs to capital A directly. So these sets are going to be somewhat strange but not too strange.

If you have your number n that is equal to zero all the numbers up to n minus one and you have that x belongs to a belongs to n. So this that means that a is a number. A can maybe zero maybe is one of these guys. Zero, one, two, one of them. Right? And so that means a is the elements from zero all the way up to a minus one and a is less than n.

So that means that x is one of these guys. So x belongs to this. So x is a number below a. Right? So we don't have less than or equal but this is just for the intuition. So x is a number below a.

So x belongs to a. So if you belong to a number that belongs to a number then you belong to that number. Yep. That's how we define these numbers. So they satisfy this property of being translated. By the way, so this thing can be stated in a few other ways and it's sometimes algebraically easy to remember these things.

These are all equivalent definitions. So union of a is a subset of a. Remember something belongs to the union of a. Some x belongs to the union of a. if it belongs to something that belongs to a. Right?

So this x here belongs to the union. So it's the same thing. Saying x belongs to the union of a. So it belongs to something that is a member of a member of a. then it's a member of a. So this is what this is saying.

So then this is saying that x belongs to a. So all the members of the members of a are members of a. And the next one says exactly the same thing. if you have a that belongs to a then everything in a also is in capital a. same thing. This guy is saying is that um every so a itself is a subset.

Here notice this is a subset not belongs to. This is saying that every mem everything that belongs to every little thing that belongs to here belongs to here. And notice that belonging to the power set that's the same thing as saying that it's a subset of a. So this one here is just a restatement of this one there.

Okay so if that was too fast pause the video and try to prove each of these things uh one one at a time. Um I think that's a good exercise.

Okay so all these four things are equivalent. So that's a transitive thing. And then you can prove that every natural number is uh transitive. **So I did a little picture before but uh this is a theorem.** How do you prove it? Any ideas?

Induction. That's right. And I'm I'm getting uh I'm practicing this video thing. Uh talking to the camera.

Okay so transitive. So how do you show something by induction?

Let's call this let's call it t for transitive. It's going to be the set of all the n's in the natural numbers. Such that uh n is transitive. **And THEN you have you have the claim is that t is inducted.**

Okay and uh so how is that t is inducted? Well uh zero belongs to t. So the empty set belongs to t. Yes the empty set belongs to t uh we can see from here. I guess the union. The union of the empty set is equal to the empty set which is included in the empty set.

So we satisfy uh that property right there. So yes that's good.

Now suppose uh n belongs to omega. We want to show that n plus. Oh sorry.

Suppose that n belongs to t also is transitive. We want to show that n plus is also transitive.

Okay so let's see why n plus is transitive. So suppose that we have an x that belongs to some uh let's say a that belongs to n plus. So that means n union n so that's n plus. Right so then there are two cases uh one is that uh a belongs to the first thing. So a belongs to n or the other one is that a equals n. Right so that's those are essentially the two cases depending on whether a is here or a is here.

In the first case we know that uh n is transitive. Let's call let's say belongs to t. T is a transitive. Since n belongs to t we know that if x belongs to a and a belongs to n then x belongs to n. **Uh in this case a is n and x belongs to a so we also get x belongs to n and THEN um n by definition of n plus is just a subset of n plus.** Right because n plus is n union something.

So therefore x belongs to n plus. Okay so one way or another depending on whether you take your uh your a's here here you still get that x belongs to n and if it belongs to n it belongs to n plus. And if it belongs to n plus that's what we needed to be to be transitive. We started assuming that x belongs to something that belongs to n plus and then we ended up with saying that x belongs to a plus. n plus.

**Okay so that is uh the proof that uh t is transit is inductive and IF it's inductive by the induction principle we know that t equals omega and that's how we know that all numbers are transitive.** Okay so that's a standard induction principle. Again slow it down and check the details.

Okay so um omega is transitive and that's uh not that hard to see um because if you have that x belongs to a and belongs to omega then uh x is a natural number. And therefore x belongs to omega. Right because um uh if you're a member of a natural the natural the members of the natural numbers are the smallest not the smaller natural numbers so they are natural numbers themselves. if you're a member of a member of omega it has to be a natural number too.

Okay so omega is transitive so the natural numbers are not the only transitive things. Omega it's beyond and it's transitive. Um and one property the transitive sets have is that if you take the union of a plus. Uh why is this? Um well there are two inclusions you need to show uh this inclusion and that inclusion and that inclusion. And so why are they?

So for this inclusion suppose that x belongs to a well so for this inclusion well a is a subset of a plus so therefore the union of a is a subset of the union of a plus because there are more sets to union right so a plus is union everything in a and the whole thing a um so that's how you get uh no that's not what i wanted to say a little a is a union of a single set a so remember the big union you take all the elements inside and you union them together if you have only one set you just union it with itself you get itself back and this is a subset of um the union of a plus just because the singleton a is a subset of a plus by the definition of a plus so a plus contains this guy but contains more things more things to union but in particular it's union this guy and that's how we get that um that a is a subset of the union of a plus so that gives us uh this direction uh what about the other direction well for the other direction you have to just do it in step so take x that belongs to the union of a plus

What does that mean that means that uh that that means that two things either x belongs to something that belongs to a or x belongs to a right because i'm just a plus is a union a so the b could be either here or there so those are the two possible ways of taking something from the union either you take it from a set in a or you take it from a second here okay so one way or another a is transitive we are assuming a is transitive so here so a is transitive so we get that x belongs to a so one way or another x belongs to a so we started taking something in the union and we end up that it belongs to a so we get that the union of a is including a plus okay so that's the proof that the union of a plus um is equal to a if a is transitive and that's it that's as a correlative we get that a uh the a plus function is transitive because why is that well because if a plus equals b plus then union of a plus equals union of b plus because they are the same thing but then this one is a and this one is b so a equals b

So the function uh a plus is not only transitive it's not only one to one and omega is one to one on all transitive sets right so whenever you have a transitive set essentially we have an inverse if a is a transitive set you have an inverse operation which is apply the union the big the capital union that's give us an inverse operation for the plus so that's why it's one to one no if you have an inverse operation uh you are one to one um cool so that's so once we know that a plus is one to one omega then yes then that implies in our heads i mean not in not inside the axioms that omega is infinite we don't we don't know what infinite means yet like we haven't defined the word infinite inside set here um that still has no meaning so we only have a meaning from the outside of what something infinite should be uh but okay now we know know if you have a function that starts at zero and then iterates and never goes back that's gonna have to be infinite um whatever that means in set theory so so far like if you if you recall it what i call the infinite axiom infinite axiom

What it says is that there is an inductive set it didn't say there's an infinite set because we don't know what infinite means so but we know what inductive sets and now we know that the one the function this function has to be one to one so so that's gonna be that's the way we kind of uh get into infinity through the inductive sets um and showing that this function is one to one so now we're gonna use this omega to define infinite sets okay so now that we have it well fine okay see you guys next video



## 16. Part p16 - Recursion and Arithmetic

Welcome back everybody. Okay, so now we're going to talk about recursion on the natural numbers. So recursion and inductions always come hand by hand. Induction refers to when you're proving something and you're proving something about a number you're allowed to assume you know you have already proved for the previous numbers. In the case of recursion you're defining a function and when you're defining the value of the function at a certain number you're allowed to use that you know the values at the previous numbers. Right, so recursion is for defining a function, induction is for proving some property and in both cases you're allowed to use the previous cases.

So for instance you can define the factorial function by the property that n plus 1 factorial is equal to n factorial times n plus 1. So if you already know what n factorial is then you can figure out what n plus 1 factorial is and like that you can go through all the numbers and get all the factorials. It's going to be very useful because so far we only have one function on the natural numbers. We have the function n plus which only adds one so we couldn't do factorial yet. We don't know how to multiply for instance.

Let's look at a couple of examples that are going to be very handy in a bit. So let's consider this function. So I'm going to define the function this one a sub k by recursion. So fix the number k, 17 if you want, fix it and now define this following function. At zero it's going to give you k k. And if you apply at n plus, remember n plus is the same as n plus 1, it's going to give you ak plus.

So the previous value. What do you get? What is this function? Can you guys figure it out? What this function does? Well, let's see.

Ak at 1 is going to be ak at 0 plus 1. So that's k plus 1. Ak at 2 is going to be ak at 1 plus 1, which is k plus 1 plus 1, k plus 2. And so and so forth again, we don't have a plus symbol yet. So this is just to understand what it's actually doing. But that's what the function is going to do, right?

So ak at n is going to be k plus n. That's the idea. So it gives you the addition of k and n. That's where the a comes from.

Okay, so that means we can define this ak by a recursion like that. Let's consider these other k's. m, m sub k at 0 is 0. And at n plus 1, it takes the value of the same function. So you're defining m, m sub k at n plus 1. And to figure out the value of n plus 1, we assume we know the value at n. And we apply a sub k to that value.

So what do we get? So mk at 1 is going to be ak of mk at 0, which is ak of 0, because that's what this is. And then that is 0 plus k is k. mk at 2 is going to be ak at mk of 1. That is ak of k, which is equal to k plus k. Or k times 2.

All right. So you guys can guess from now that what you're going to get is that mk at n. Every time you apply one more, we add k. So you're going to get k times n. **So that's a recursive definition of multiplication using addition.** So we can define addition using successor and multiplication using addition recursively.

Good. Okay. So that's how recursion works.

**Now we need to prove it or at least state the theorem that says why it works.** Here's a theorem.

Here is a general theorem. And it says the following. So it's the same setting as before, but now in a general setting. So suppose you have a set a. And you have an element that you call little a. And inside you have a function.

That goes from a to etel. This is a function f. But it says that it is a UNIQUE function from omega to a. Which satisfies that on 0. On 0. It goes to a.

And then. On n plus 1. It goes to f of the previous value. So if this one, if n went here. then you apply f. And that's where this one goes.

Okay. So each one is f applied to the previous one. So this is exactly a setting as the previous case, right? I guess you have it right here. So in the previous case, this one here is a. And this one corresponds to the f.

Right? So you apply it at n plus 1. You apply it at the previous value. And you apply this class function. In this case, this one is a. And this function up here is f.

So general setting is the same as in the previous case. What are you actually going to get? It will be something very simple. h0 equals a. h1 is going to be f of h of 0. which is f of a. h2 is equal f of h of 1. which is equal f of f of a. Right there. So h of n is going to be f of f of f applied n times to a. Right?

That's what we get. So again, this is not. This is just for the intuition of how we actually get.

**The theorem says that there is a function that satisfies this property.** And we know it has to be this function. But essentially that's what it satisfies. Let me give just a quick idea about the proof. We can finish it in class later. The existence of such a function.

You cannot define it as a set before of h of n is just iterate f of n times. Because we don't even know what iterate. How do you say about iterate? How do you say all these things? With the axioms we have. **We need to define h as using the subset axiom.**

That's the only one we have to define complicated things. And we need to do it at once. **We CANNOT use h to define h like in the theorem.** That's why it's recursive. It uses itself in its own definition. We have to give one definition for h.

**And the definition is going to be this one right here.** So we're going to define h. So h is going to be the set of pairs. n comma a that belong to omega times a. Remember this we are defining the graph right? I mean a function is is given by its graph. So a pair the fact that the pair n comma a belongs to h.

The same thing as saying that h of n equals a. That's what we mean. By that. And when is that h of n is going to be a? Such as this. There exists a function g.

That goes from 0 all the way up to n. So meaning. Goes from n plus 1. Meaning that. 2 with the set of 0 to n. 2 a.

Such that. Satisfies the following things. So such that. Satisfies two things. g of 0 equals little a. f of g of i. For every i. In n.

So less than or equal to n. No sorry sorry. For every i in n. Yes. h g of i plus equals f of g of i. So so far we're just saying that g behaves the same way as h should behave. The only difference so far being that g is defined only up to n plus 1.

And it's not defined all the way through. Which is harder to define. Because in this case it's just a finite thing. And we're going to ask for one more thing. And is that g of n equals a. And that's our definition.

Maybe we should do it here too. Okay. So I'm defining the function h very explicitly. Instead of all the pairs. For which there exists a finite function. With a domain that only goes up to n.

Such that it behaves the way it should behave. It behaves the way h should behave. But only up to n plus 1.

Okay. So we can define this h by the subset axiom. Because we have omega times a. So all good. But then we need to claim two things. So then we need to claim two things.

So one is that for every n. There exists a g. Satisfying. All of this.

Let's call this something. Let's call this a star. And the other thing is that there is a UNIQUE suchy. Right. Because we want also h to be a function. So we don't want to have two a's here.

So if you have two different g's. We may have two a's here that satisfy this. So we need to show there's a function. So that the g is UNIQUE. And also that such a g exists. For n.

For every n. So then we can actually have a function with domain. The natural numbers.

Okay. So how are we going to prove these two things? By induction. So we need to sum what device is set. And then show that it's inductive. And we're going to use two inductions.

One for each case. We'll do it. We'll do it in class. if you have time. I would also recommend you guys try it. Try it before class.

Try to do it yourself. And see how it goes. Question for you guys. Can we define. **So we define the function addition and multiplication using recursion.** Can you define the exponent function?

The function that given n outputs k to the power of n. How about that? Exponent. Exponential function. And what about n factorial? Which is shown in the first slide.

Try to do those by recursion. So we define addition. That's a sub k. **We define multiplication and we know they exist.** We can also define order. A number is less than another if it belongs to it.

Because remember. Because of the way we define the numbers. Each one is a set up for the previous one. So this just works. So that defines arithmetic. So this gives us the natural numbers.

That gives us all we want. Right. So we have the natural numbers. We have a zero. We have plus. We have times.

And we have less than. And I guess we have one. That's standard model of the natural numbers. Once you have this. You need to show that it satisfies all the right properties. Because we only define them some way recursively.

But we don't know anything. We know anything because we know the math from before. But we don't know it inside. So you need to prove inside the system. With the actions that we have so far. That we have associativity.

For addition. And for multiplication. Commitativity. For addition. For multiplication. Let me write down what these things are.

So this is an A plus B. Plus C. Where I put the parenthesis. It doesn't matter. Commitativity says that the order of the products. Because the sum of it doesn't matter.

Oh that's distributivity. You all know very well. A times B plus C. Equals B plus. And addition is preserved by order. Order is preserved by addition.

Order is preserved by multiplication. So if A is less than B. then A plus C is less than B plus C. And A times C. And C is less than A times C. This one requires C different than C.

Okay so. To know that you can use these guys. These definitions that we use by recursion. You need to prove all these things. They are there in the textbook. You can see some of these proofs.

They all go by induction. On one of the guys. Sometimes it's in double induction.

First in one and then in the other. So they are all inductive proofs. That is something is true in the previous case. You prove in the next one. They are all quite straightforward. And a bit tedious.

But none of them is particularly difficult. Okay so once we have these. We have all the natural numbers.

So now we know. **That these weird sets that we define. empty set that contains the empty set.** They're representing the numbers. Actually define a structure. That behaves exactly like the natural numbers.

That we all that we already knew. So we can pretty much assume. These are the natural numbers. And just work with them.

So now whenever we talk about the natural numbers. We mean these particular sets. But they behave like the same as the natural numbers. So there's nothing to worry about.

All right. See you guys next week.



## 17. Part p17 - Integers

Welcome everybody. Welcome everybody.

Okay so this week we're gonna continue our construction of the number systems. So last week we developed the natural numbers and we developed something that looks like the natural numbers, behaves like the natural numbers, smells like the natural numbers. So to all purposes we pretty much define something that is the natural numbers. What we have is the natural numbers. And now we need to continue on and the next step is the integers. So in this video we're gonna see how we build the integer numbers from the natural numbers that we already have.

So the natural numbers we're good with them so we're gonna assume we have everything and we know everything we need to know about them and move on to the integers. So how do we define the integers? Well the integers is the natural numbers and the negative natural numbers. I want to define it in a way using equivalence relations because that's gonna help us also understand the next step which we're gonna use in the rationals. So here's what we're gonna do. So we're gonna define this equivalence relation right here.

Little tilde. This little thing. And it's gonna be a relation on omega 2 times omega. That means, as a relation, where does this live? Sim is a subset of omega times omega times omega. Right?

It's a set of pairs and the pairs, each element of the pair comes from omega times omega. And we say that AB is related to CD if this happens. A plus the last one plus D equals B plus C.

Okay. And then we're gonna define Z, which is the set of integers, to be the quotient and their disequivalence relation. So we're gonna take all the pairs and we quotient and the disequivalence relation. Go back to the equivalent relations video if you don't remember exactly what that is. But essentially when we do it when we're doing this we're saying well all the pairs that are equivalent we want to make them to be the same. We want to identify all pairs that are equivalent and now we obtain these quotients where the things that used to be equivalent now are the same, that equal.

On the quotient things that used to be equivalent become equal. The quotient is the set of all equivalence classes.

Let's see how these guys look like. So if omega looks like, let let's write down. 0, 1, 2, 3, that's omega. And then you have omega times omega. You have a grid, right? And that goes on and it goes up.

That's omega times omega. And then this one is 0, 0. And this one is 1, 0. This one is 2, 0. And here is 0, 1. And here is 1, 1.

0, 2. And here is 2, 1, 0, 2. Right? So on and so forth. We have this grid of elements representing the Cartesian product omega times omega. Who's equivalent to whom?

Okay, so let's look at, I don't know, let's look at this guy, 0, 1. Who's equivalent to 0, 1? Well, 0, 1 is equivalent to, for instance, 1, 2. **Yes, IF you look at the definition, you get that 0 plus 2 equals 1 plus 1.** Right? That checks.

So it's equivalent to that one. So 1, 2 is right here. 0, 1 is also equivalent to, let's say, 2, 3. Right? Because 0 plus 3 equals 1 plus 2. Check.

That one is right here. And it's also going to be equivalent to 3, 4. This one up here. So all these guys are equivalent to each other. if you look at, let's say, 2, 2. 2, 2 is going to be equivalent equivalent to this one that is up here.

That is, this one is 3, 1. And equivalent to that one. 0, 0 is going to be equivalent to 1, 1. It's going to be equivalent to 2, 2. All of these are equivalent. All of these are equivalent.

Right? And all these lines are the equivalent relations. So each equivalent relation corresponds to one of these diagonals. Yeah? So do they look like integers at all? Well, if you look, if you think of them, they have kind of like a direction, like it goes like the natural numbers, right?

That's where the natural numbers go when you add one. But then you have the negative direction. Yeah, so essentially you have lines going one way and going the other way. And then, like, if you look, essentially, like, well, the diagonal that way, or, I don't know, I don't know, well, you get the integers, right? And then we're going to want, essentially, this element here, this line, up here to represent 0, this one up here to represent 1, this one 2, this one 3, and then this one is going to be minus 1, minus 2, minus 3, minus 4, and then, well, you have lines that go in both directions. So we're going to end up with all the integers.

Essentially, what's going on, and this is a secret, is that a, b represents the integer a minus b. Why do I say it's a secret? The thing is that we don't have a minus. All we have so far is the natural numbers. The natural numbers are only positive. We don't have negative numbers, right?

**Remember the natural numbers, the natural number n is defined as a set of all the previous elements, and those previous elements were the set of the previous elements, and we get these weird natural numbers.** We don't have anything for the negative things. This is only, we start from 0, we start building up. Nothing for the negative things. We know how to add natural numbers. We will find that last time by recursion.

And this sum right here, this sum here, it represents the sum of the natural numbers, right? Because this, and the natural numbers, we used omega to represent the natural numbers, right? **So this is the addition on the natural numbers that we are using in the definition of the equivalence to define the integers.** So, but we don't, we cannot consider negative natural numbers. So then this thing up here is not something that exists yet. I mean, it's not too hard to define it, but essentially that's what we're doing.

We are defining the integers. So we are kind of talking about these negative guys right now. So that's why I say it's a secret. What I mean is that inside the theory, this doesn't exist. Inside the theory, all that exists is the pair a comma b, and we humans think of it as a minus b, because that's what's going to be at the end. But we don't have a minus b.

All we have is pair a comma b. And then they're going to be different pairs, like 0 minus 1 represents minus 1, and 1, 2 represents also minus 1, right?

Okay, so that's how we represent the integers. then, now let's look at who are the obvious, the usual suspects. So who is the 0 of the integers? Well, it should be the pair 0 comma 0. By the way, these guys here are paired. This is the pair that we defined also in the previous one, right?

By the way, so this is essentially, this guy recall that a b means a a b, yeah? So that's why we made a pair. So 0, 0 should be what's representing the 0 of the integers. But it's not just the pair 0, 0. It's the whole equivalence class, because remember, we are considering z is this quotient, right? So the notation, this bracket here, if you read the textbook, this means the equivalence class.

This is a set of all the y's that belong to the domain of the equivalence class, in this case, omega cross omega, such that y is equivalent to x. So that's what the bracket means. So this is the whole equivalence class. And then this 0 here, are these 0s, we have to use 0 to define 0? No. These 0s that are here, these are the 0s of the natural numbers, right?

So this is essentially what we mean here is the class of the pair, empty set, empty set. Remember that the empty set is the one that represents the 0 of the natural numbers, yeah? Yeah, so 0 of the natural numbers, omega, remember, is the natural numbers, is just the empty set. And this is, essentially, this is the equivalence class. And if you want, you can decode that. So that, that's the pair, is that set that contains this, and contains this, which is the same as the equivalence class of the set, of the set, empty set.

And if you actually want to see exactly what this 0 is, what the 0 of the integer is, 0 of the integer is the whole equivalence class. So this is actually a whole set, that contains the pair 0, 0, but it also contains the pair 1, 1, that's equivalent to it. And also contains the pair 2, 2, that's equivalent to it. And all the ones that are n, n, those are all equivalent to 0, 0. So, that's the equivalence class. And each of them is a pair, it's a pair of natural numbers.

So, this guy up here is what we're using to represent the 0 of the integers. It's a bit different than the 0 of the natural numbers, that was very simple. But, okay, well, it's what we use.

What about 1? 1 is going to be the equivalence class of the pair 1, 0. And again, let me just emphasize, this is the 1 of the natural numbers, and the 0 of the natural numbers, right? Because, remember, we said that we are thinking of 1 minus 0 when we think of this pair. And again, this is a whole equivalence class of pairs. This is a big set, but that's what it represents.

Okay. Good.

What about, we need to define addition, multiplication, order. We need the basic operations of the integers to be able to call this guy the integers. They need to, as we did before, they need to look like and behave like the integers. So, to make them behave like the integers, we need to know how to add them. How do you add them?

Let's do it on a side. Remember, this is the part that, it's not part of the theory, but it's on our intuition. We are thinking of a comma b as representing the element a minus b. And, so this is, and we are thinking of c comma d as representing the pair c minus d, right? So, the addition should represent, if you add these two, we should get, you're going to get a minus b plus c minus d. And, how do you represent that number?

Well, these guys, a, b, c, and d are all natural numbers. They're all non-negative. And, then here we have some negatives and some positives. So, what we need to do is rearrange this and say, well, this is the same as a plus c, that we know is positive, minus b plus d, that we know is positive. Yes, so now we are going to represent this guy with the pair a plus a plus c, comma b plus d, because we know these guys are positive. And, the pair that this represents, that's the one we want.

So, we're going to say, we're going to take a first two coordinates, a plus c, and form the pair with the last, adding the last two coordinates, b plus d. And, then we get the equivalence class of that. Goes from everything, the other integers are equivalence classes.

Okay, so that's intuition and that's how we define it. Can we do that? We can do that. But, to do it, we need to be careful. We need to, we need to lemma that says that this is well-defined, right? Whenever you define something on equivalence classes, you first need to know that it's well-defined.

And, what does it mean? Remember, we said that in the video of equivalence classes, but what does it mean? What does it mean when we say that something, you need to prove that something is well-defined? Well, suppose that you have that a comma b is equivalent to a prime comma b prime, and c comma d is equivalent to c prime comma d prime. Yeah? **So, that means that the equivalence classes of this guy and this guy are the same equivalence class.**

And, the equivalence class of this guy and this guy are the same equivalence class. So, that means if we add these two, or if we add these two, we need to get the same thing. **Otherwise, this definition doesn't work, right?** For this definition to work, here we took a comma b is one representative for the equivalence class, but we could have taken a prime b prime. And, here we took cd, but we could have taken c prime d prime. They are both in the same equivalence class.

So, we would need to know that this implies that a plus c comma b plus d is equivalent to a prime plus c prime. Okay? So, that's what it means to say that this operation is well-defined. Yes? And, this requires a little proof. It's just a two-line proof.

But, let's do it. Let's do this two-line proof to show that this operation is well-defined. Well, so what do we know? We know that a, b is equivalent to a prime plus b prime. So, we know that a plus b prime is equal to a prime plus b. That's from the first thing that we know.

And, then we also know that c plus d prime is equal to c prime plus b. This is what we get from this assumption right here. Cool. So, what can we do now? Well, okay, let's see what we want. We want to show that those two things are equivalent.

**So, that means that we want to show that a plus c plus b prime plus d prime equals b plus d plus a prime plus c prime.** Yeah? Do we get that? Yes. So, adding these equations right here, add these two equations, we get exactly what we want, right? We get a plus b prime plus c plus d prime equals a prime plus b plus c prime plus d.

Right? I just added these two right here. We got this. I'm missing. No, that's fine. Let me just fix this.

Let's see. And now, we see that this thing that we got is exactly what we want, arranging the terms.

Okay? So, if we start from pairs that are equivalent doing this operation, we end up with pairs that are equivalent doing the same operation. And that's what allows us to define this operation on equivalence classes. So, whenever you have an equivalence class for a b, it doesn't matter if you take a b or anything equivalent. Here, it doesn't matter if you take c d or anything equivalent. We always end up with something equivalent to the sum.

Cool. So, that's why we need to be able to define the sum.

Now, next step is multiplication. What's multiplication? Well, again, we can do it. We can just look at it on the little side and see what it should be. So, we know that a b is trying to mean a minus b and c d should mean c minus b. Right?

So, if we multiply these two, what are we going to get? We're going to get a c minus a b minus b c plus b d. Correct? And again, so some of these terms seem to be negative, some positive, but in our pairs, we always have positive elements on both sides. So, we need to arrange them. And the way we arrange them is this is a is equal a c plus b d.

That's positive. Those are all positive. Minus a d plus b c. And those are all positive.

Now, we have one positive term and another positive term. So, that's our guide. So, we're going to get a c plus b d on one side of the pair. On the other side, a d plus b c. And that's our pair. And then we take the equivalence class of that.

**And again, IF you want to make this definition on equivalence classes, we need to check that it's well defined.** Okay? So, the same as we did before, we need to check that if you take different representatives of the same equivalence class, and you multiply them together using this operation, you're going to get things that are equivalent. Right? So, I just copy and paste the beginning of this lemma. So, this operation is well defined on equivalence classes.

**That means that IF you start with two things that a and b is EQUIVALENT to a prime b prime, and cd is EQUIVALENT to cd prime, THEN you need to get from here that the images are EQUIVALENT.** Okay? So, that you need to get from here, and it's this whole mess. You need to get that ac plus bd plus a prime d prime plus b prime c prime is equal to a prime c prime plus b prime d prime plus a d plus bc.

Okay? So, what I'm saying here is that those are equivalent, that images are equivalent. And if you get that the images are equivalent, then you can define this on equivalent relations, and to check that's the case, well, I'm going to let you guys try that one at home. Essentially, you need to do the same as the previous one. You just put that what do we know, and then you need to manipulate what you know. not like this one, it's a bit more complicated.

And the best way to do that is just to figure out what you want and exactly see what you need so you can manipulate it. Try it out.

Okay, so we've got multiplication, now we want order. Okay, so one thing to mention again, let me just repeat. Here, this operation of multiplication, I can do it here. This multiplication, and this plus, and this multiplication, and this multiplication, this plus, that we use to define multiplication of the integers. These are all on omega, right? These are all on the natural numbers.

So these are all, we are using the multiplication and addition of the natural numbers that we know from last week to define it on the integers. What about the ordering? **The ordering is going to be defined as follows.** So we're going to say that a, b is less than that if a plus d is less than, in the natural numbers, to b plus c, right? And again, if you think of a, b as a minus b is less than c minus d, even if a plus d less than b plus c. That's where that comes from.

Yeah? Okay, so, so those definitions come from there, from our intuition of what they should behave. But then, again, so that's our intuitions, though, of what the integers should be. But we don't have, again, we don't have this minus sign. So this intuition is not based on something intrinsic to the theory. So if we don't have this intuition and we're just defining these operations completely abstractly, how do we know that they do what we want them to do without just going to our intuition?

Well, this is all we need to do. We need to show that the integers behave, or this set with these operations, this crazy set with these crazy operations behaves the way the integers behave. And then once we know that, we can treat these guys as we always treated the integers in our other math classes. And the way to do that is to show that, in this case, there is an order commutative ring. So, a ring, you guys learn in algebra what that is. I mean, you need a bunch of properties.

I don't know if you remember the properties. Multiplication and addition have to be commutative, associative. You need distributivity of addition over multiplication. You need a zero, that if you add anything by it, you get the same thing. You need a one, that is identity for multiplication. **And the order means that IF you have positive things and you multiply them, you stay positive.**

All those basic properties, about plus, times, and less than, you need to show that they work. Right? And once you show those properties, then now you have a structure that looks exactly like the natural numbers. Like, sorry, like the integers. So, you might as well treat these guys as the integers. There is one thing you might say, and it's, okay, so we have the integers, but we have the, remember, zero is super weird, guys.

It's a big set equivalence class, I think. While the zero of the naturals, it's just the empty set. And usually in math, zero of the naturals and zero of the reals are the same object. So, what we do here is think of an embedding. So, we're going to put the natural numbers inside the integers. And how do we do it?

Well, the number n, where should the number n go? Well, it should go to the pair n, 0. Right? And then this is the pair. And, of course, this is the equivalence class corresponding to the pair.

Okay? So, we have a map from the natural numbers to the integers. And what do we need to be true about this map? Well, we need it to be a homomorphism. What does it mean? It may mean that it preserves the operation.

Right? **So, it means that IF you do e of n plus m is the same as e of n.** It means that if you do e of n plus this omega m, we should get the same thing as e of n plus e of m. Where this plus up here is the plus of the integer numbers in the image. And this plus up here is the plus on the natural numbers. So, e maps one plus to the other plus.

And the same thing with operations of multiplication. And the same thing with the ordering relation. And, of course, the 0 goes to 0 and the 1 goes to the 1. So, this is what it means to be a homomorphism. It's an embedding. It preserves all the structure of the natural numbers.

It stays the same inside the integers. And once you prove this, now we can say that what we have is something that is really like the integers. And if we want, we can think of the natural numbers as being a subset because we have now this embedding inside. **This theorem over there, each step is just a little proof.** Because probably each step has a line to prove commutativity. Each one requires a little proof.

And the proof uses the fact that we already know that the natural numbers satisfy the properties that we mentioned last week. of commutativity, assertivity. And we had some properties of natural numbers over there. And now we can use them right here to prove these guys.

Alright, so next video will start with the rationals. See you next video.



## 18. Part p18 - Rational Numbers

Welcome back everybody. All right, so now we got the integers. So we just built in the previous video this set with operations plus times and an order and two elements that look like the integers, behave like the integers, taste like the integers. For all purposes those are going to be the integers for us.

Now the next step is the rationals. Okay, so we're going to do a very similar idea. We're going to build the rationals from the integers. So, and again we're going to use an equivalence relation. And here's the definition.

So now we use a different equivalence relation. This one that we call sim right there. Again, the little tilde. And now we say that ab is equivalent to cd if a times d equals b times c. And again, so what is that we are? So again, we don't have division yet.

So this is only what we have in our heads when we are developing this. But so far all we have is addition and multiplication on the integers. And so that's what we are doing, right? So here this we are using multiplication on the integers to define this operation, this equivalence relation. And that's it. We don't have division.

We don't even know what dividing means yet in set theory. One thing to comment is here we are using a z plus. So z plus is the set of all z that belong to z, which we have defined so far, uh, such that z is greater than zero. And of course greater, I mean greater in the order we defined last time of the natural numbers. And by zero, I mean the zero of the integers we defined last time. So positive integers, okay?

Because the quotients, uh, you might as well take them all to be positive to simplify. And then, uh, and then we take the quotients. Um, the quotient, uh, is, uh, we take a set of pairs and we say that, uh, like two pairs that are equivalent, we want to make it equal. And now we got the rational.

Okay. Uh, if you want to do a little picture of what this looks like, let me do it in a, in, um, in a second. So here is, uh, z plus, z plus for you guys. Um, and now which one is equivalent to which? So for instance, this guy here is one, one, he's going to be equivalent to two, two, because it's two over two is one, three, three, these three are these, all of these are equivalent. So we get that everybody on this line is equivalent to each other.

Then, and that's going to correspond in our imagination to the rational one, the rational one. And then for instance, this one here is, uh, two, one, it's going to be equivalent to four, two, and it's going to be equivalent to six, three, and it's going to be everybody on this line. And, uh, everybody on this line is going to be equivalent to everybody. Everybody in this line is one minus one, two, uh, is going to be equivalent to negative two, uh, four, corresponds to that line.

So now we still have that now or our, um, equivalence relations are still, uh, since in a line, but then in the previous case, we had a bunch of parallel lines. They were all the parallel lines given as the integers.

Now we have, well, first we can use, uh, the integers, uh, on the first coordinates or positive or negative. And now we are just considering the angle and the slope is the rational that we are, we are essentially considering, right? So this one is going to be, well, two over one, well, it's the negative, it's the inverse of the slope. This one is going to be one half, negative one half, minus one, negative two. And as you go up in a circle like this, and you go all the different slopes, you're getting all the possible rational, rationales that there is in this. So each rational here is a whole equivalence class.

All the set that contains all these guys, that's going to be the number one. A set that contains all these guys. It's going to be the rational number two.

Okay. So an equivalence relation, that's how we got the rationals. We need to define the usual suspects as you imagine who these guys are going to be. Zero is going to be the pair zero comma one. What zero do we mean? Well, it has to belong to the integers.

And the one of the integers. if we could have chosen zero two, zero three, they are all equivalent to each other, all those pairs. And we take the equivalence class of this guy. And then one zero, one, the one, the one of the rationals is going to be, as you expect, the one of the integers divided by the one, the pair, one of the integers, one of the integers. So that's your, that's your number one. Addition, how we define addition.

So if you want to figure out what this formula should be, you will use intuition that the pair A comma B represents A A over B and the pair C comma D represents the rational A over D, which we don't have yet, but that's what we want in our minds. So if you add these two, you're going to have to do a common denominator. And then on top, you're going to have AD plus BC, right? That's how you add fractions. So then this is going to be represented by the pair AD plus BC comma BD, right? So that's what it is.

**And again, like in the case, uh, when we define, whenever we define something on equivalence classes, we need to make sure that they are well defined, uh, so that the definition doesn't depend on which representative you're taking of the equivalence class.** So we need to prove the same thing that we did in the case of the integers when we did addition and multiplication, except the formula is going to be a bit more complicated than that one. Well, not that much. You have to show that AD plus BC comma BD is equivalent to A prime D prime plus D prime C prime comma B prime D prime. And, and again, this definition right here is going to, no, this, sorry, this lemma right here, I mean, it requires just playing around with what you know and getting what you want. So essentially that the same way we did in the previous video, um, it's just a little bit of a few tricks, uh, but not too hard.

I mean, you know, it's going to be true. This is the thing. Yeah. How to prove this using the absence of set theory. So then, and what we have so far is that we know, we're assuming we know the properties of the integers, so we can use the properties of the integers to prove this. And that's why it takes a few lines to prove it.

But essentially, uh, we know, because we know, um, that this is true from middle school. So we know that's going to be true. Um, so we don't have a doubt that it's going to be true. The only thing, the only reason you need to prove it is because we need to show that we're built, the way we are building this from the axioms and from the integers that we have already, this works, right? So that, that requires a two-line proof. Um, by the way, by the way, again, let's remark that all these operations are addition of the integers, multiplication of the integers, multiplication of the integers, right?

You're using the integer operations to define the rational operations. Cool.

Now for multiplication, again, same deal, exactly the same deal. if you, uh, you can guess now what you're going to get, yeah, on top of the quotient, you should get a c and in the bottom, you should get the d of this fraction. So this is what you should be getting. And again, you need to show this is well defined, the same thing as before. And then once you do that, then you have an operation on equivalence, equivalence classes. And now you have a nice structure, set of rationales with two operations on them, 0 and a 1.

You need the ordering also, which again, you think of the fractions, what this should mean. Do it in a side, a over b less than c over d. That's the same thing as a d less than c d. So that's what it should give you. So then you just pretend you didn't do that. And you just go straight and define, uh, this happens if AND only if a d is less in the integers, uh, c d, because those are integers.

Okay. So you define that. And then, uh, right. So if you didn't have the intuition, these definitions are all like super combinatorial and technical and you're like, okay, I don't know how that works. So then you need to prove it. Um, and what you need to prove is this, you need to prove that the rationals have the property that they should, which is that they are or their field.

I don't know if you remember from your, from your algebra class, a field is like a ring, but with the advantage that every element has an inverse. Well, except for zero, every other element has an inverse. Uh, so, uh, arithmetic on these things is very, it's much easier. Um, um, so the same thing, associativity, commutativity, distributivity, inverse, uh, unity, all those properties you need to, to show. And that is order means that the order behaves well with the operations of addition and multiplication, right? So if you add, if you have two things that you add into things and then you add two things that are bigger, the result is going to be bigger.

If you multiply two things that are bigger and positive, your result of the multiplication should be bigger too. That's what, uh, order means. Check it out on the textbook. And again, the properties each, to prove each of them requires a line or two. Um, so take a look, try to do a few of them before class so you can practice how they are. And again, we need that, we need to see how the integers, uh, fit inside the rationals.

Because now, I mean, they are completely different sets, right? These rationals are sets of pairs of integers, and not set of pairs, equivalence classes, each one contains infinitely many pairs, of pairs of integers. So they are nothing like integers, but we can embed the integers inside the rationals. And, um, um, as you can probably guess, if you map z, you're going to map z to z, comma, one. Right? The equivalence class of this.

Okay, so now we have, we define, uh, these, um, the natural numbers using the sets, each number is a set, the set of the previous numbers. We have this embedding of these into the integers, and now we have an embedding of these into the rationals. So we can think of the integers being inside the rationals and the natural numbers being inside the rationals, even though formally they are not exactly inside. And of course, when, once you define embedding, you have to show that the proper, the, um, operations and the order that we have on, on the integers, uh, stay preserved. So addition on the integers, if you look at the addition of the corresponding rationals, when you go through this map, you should get the same thing. Yeah?

Makes sense. That's what you want. So addition is preserved, multiplication is preserved, order is preserved. So these embeddings right here, if you add two things right here, or if you add two things, the images right there, you should get the same. That's what it means to be a homomorphism. And then once, after you have this, now you can say, safely that yes, so the integers are essentially a substructure of the rationals that we just define. cool.

Next steps, the real numbers. See you in the next video.



## 19. Part p19 - Real Numbers

Welcome back everybody. Okay, so we got the rationals now. Final step is the real numbers. So the real numbers, how do we build the real numbers from the rationals? Do you guys know? So what is the idea for the real numbers?

So the real numbers, we have the rationals, right? Let me draw, it's hard to draw the rationals because you have 0, 1, 2, negative 1. And then you have the fractions in between, the halves, the third, the fourth.

Okay, so I don't know if that looks like the rationals to you guys. Anyways, the rationals are like in a line, but they are full of holes. Like if you want square root of 2, e or pi, they are kind of square root of 2 is somewhere there in between. But it's not a rational, it's a hole there. So to get the reals, we need to fill in all the holes, right? So that's essentially what the reals are.

It's like a completion of the rationals, filling in all the holes and getting the full nice line right there containing all the points. Yeah, so that's why we want to define the reals. So there are a few ways to do this. One of the most common ones is dedicating cuts. Cauchy sequences is another one that maybe you saw in another course. They're equivalent, Cauchy sequences and dedicating cuts.

We're going to use dedicating cuts in this class. Again, we're going to use them for these videos. After that, after this week, you're going to be set with what the rationals, the reals, and the integers are, and we'll just work with them as reals. **We don't know the particular definition that we are giving today.**

Now, so what is dedicating cut? Dedicating cut is a subset of the rationals, the subset of the rationals, which is neither empty nor everything.

Okay, so it's what it's called a proper subset. It's not trivial. It's not empty, and it's not everything. So, okay, the second property is that x is close downwards. What does it mean? That if we have p and q in the rationals, and if p is less than q and q belongs to x, then p also belongs to x.

Okay, so that means if it has something in x, it has everybody that is below it. All right, so that means if you have x, let's say x is something like a set, then it's going to be like that. And if there is a q that belongs to x, then everybody that is below x, below q, also belongs to x. So that means if it has one point, it has all the previous one. if it has this one, it has all the previous one. **So it's what is called an initial segment. x is going to contain from, whenever it has one, all the previous one.**

And it's going to have no largest element. Okay, so there is no element up there. It's not supremum in the rationals for x.

Okay, so that's the three properties that define Adedekin-Cut. And the idea is that Adedekin-Cut is defining that point. So you think of Adedekin-Cut as cutting. It's cutting the reals between the ones that are below the element that we are defining. Those are the ones that are in x. And the ones that are above that are the ones that are not in x.

Okay, so it's cutting the reals. The rationals in two. And so that's what the reals are. So the reals is going to be the set of all the Adedekin-Cuts. So all the places where you can divide the rationals in two pieces, left and right. Cool.

So for instance, the real number, square root of 2, is going to be equal to that. The set of all rationals such that r is less than square root of 2, right?

Okay, so that's, again, that's intuition. Because we don't have square root of 2 yet. So suppose we are trying to define what the real number square root of 2 is. **We CANNOT use square root of 2 in the definition.** So we will have to say, what? We will have to say that r square is less than 2, right?

If we get everybody who r square is less than 2, we are going to get all these guys. All these guys here, all these guys here have r square less than 2. Is that correct? Well, actually, if you do that, we are going to end up, also all these guys here have r square less than 2, but only up to that, up to negative square root of 2. So that's not exactly what we want. We're going to say this union all the rs that belong to q such that r is less in the rationals than 0.

And by the way, that 0 and the q and the 2 are the rational numbers, 0 and 2. Okay, so now if we do that, then now we get all the points, all the rationals that are below what's supposed to be square root of 2. We don't have square root of 2 yet, but if we take all of those that satisfy this property, and by the way, also, let's just clarify, when we say r square here, we mean, what do we mean? We mean r times, using the rational multiplication, r. Good, we have that multiplication. So we get this set, all the things below square root of 2, and that's what we're going to use to represent square root of 2.

So actually, when we say square root of 2 back, if you look at the nuts and bolts of what's going on, we're thinking of that set. Okay, so those are the decking cuts, and that's the idea. So what is going to be our embedding?

Now we want our embedding from the rationals to the reals, so that we can see the rationals being inside the reals, the way we want it before. And so what it's going to be, it's going to be the obvious thing, it's going to be all the r's that belong to the rationals, because the decking cuts are self-rational, such that r is below, according to the rational, to q. So one point to make here is what would have happened, what happens if we consider, why not considering r in q, such that r less than or equal q? That will be the same cut, essentially, right? The q will still be the point that is in between the things to the left and the things to the right, but this one doesn't satisfy the property that has no element, because this one has the largest element. So we don't consider this guy as a valid decking cut.

And why is that we don't consider it a valid decking cut? That is because if we do, then we will have two sets, this one and this one, the two of them representing the same rational q. Like the supremum of this set is q, the supremum of this set is q, and we want just one representation of q, so we have to choose one. And this one makes sense, because when you have an irrational, you're not going to have a supremum. So this one works for rationals and irrationals. By the way, an irrational number is one that is not rational, right?

So that's why we put the no largest element assumption, so that we have only one representation for these guys. Okay, so now that's how we are filling the gaps. So every element, every real number, if you want, let's say now, number e, in this picture, number e is going to be somewhere here, it's going to correspond to all the rationals that are below some point over there. It's a bit harder to define, but you can define it with the formula. You can use the subset axiom to define all the rationals that are below e using some, the serious representation of e, maybe, and write down a formula in first order arithmetic that defines all the rationals that are below e, and then you have the number e. Cool, okay, so we have the reals, and we can see the rationals as being inside the reals.

How do you find order on these guys? It's just inclusion, right? **Because, I mean, x is an initial segment of the rationals, and y is another one, so being less than or equal, it just means that one is inside the other, so there's nothing to it.** It's just inclusion of sets. And what is the property that is of the order? Before going to arithmetic operations, like plus and times, the order in the reals has two main properties.

First, is that the rationals are dense inside the reals. So, what do we mean by that? We mean that for every x and y in the reals, if x is strictly less in the reals than y, then there is a q in the rationals such that x is less than q is less than y, right? So, whenever you have two reals, you have a rational in between. That's what it means that they are dense. There's no statement that you can find which has no rationals inside.

And just let's be very picky, just for today again, about what do we mean here by less than. So, these are reals, so this should be the less than on the reals. This should be the less than on the reals. q is a rational, so it's not a set. **So, we couldn't use this same definition IF q is NOT that real.** So, actually, what we mean here is e of q, the embedding of q inside the reals. And again, this level of pigginess is only for today that we are defining the reals and verifying that it satisfies the right properties.

After we have the reals and we know that the rational is kind of embed inside, we can assume they are a subset. And that's it. Cool. How do we prove this?

Let's do a little proof for today. So, how do we prove this? So, we are given x and y and we know x, so we know that x is less than y. **And what does that mean in terms of definition of less than or equal on the reals?** So, we know that x is a subset of y. And not only we know, we know it's not equal, it's strictly less.

So, that means it's strictly included in y. Otherwise, y would be also less than or equal x. Right? So, if it's strictly included, then there exists a q that belongs to y and not to x. **That's what it means that it's strictly included.** This is one, at least one element in y that is not in x.

Cool. And it has to be a rational because y is a set of rationales itself. So, everything that belongs to y is a rational. And then, what do we have? So, we have two claims. So, no r in x is above q because otherwise we will have q will belong to x, right?

Because x is closed downward. So, if you have somebody in x that is somebody above q in x, then q will have to be in x. **So, that means that the set of r's that belong, so that means x.**

Let's just write that. This just means x. This is a subset of the set of r's in the rationales, such as r is below q. Right? And now, q belongs to y and y is closed downwards, so that's this guy is a subset of y. Because q belongs to y, so everybody below it also belongs to y.

So, that's how we get what we want. x is less than in the reals q less than in the reals y. Cool. So, the rationales are dense, so that means the rationales are everywhere. So, one of the main theorems about the reals is this one. It's called the completeness of the reals. Nothing to do with the completeness of the language or completeness of anything of logic.

It's just in the real numbers. And it's that every subset of the reals that is bounded of all, that has the least upper bound, sorry, every subset of the reals that has an upper bound, has the least upper bound.

Okay? So, maybe let's just do a little picture about what that looks like. **So, IF you have a set A that contains a bunch of things, and, you know, it has an upper bound, meaning that everybody is below that red line, THEN, what the theorem is saying is that there is a list among all the upper bounds on the reals.** That is here. This is the least upper bound. And this one here is just an upper bound, but it's not the least upper bound.

Yeah? So, what is an upper bound? So, an upper bound, it's a B is an upper bound for A. if, for every X that belongs to A, X is less than or equal.

Okay? So, that's an upper bound, it's something that is bigger than, it's a bound, something that is bigger than everybody in the set. And a list one is the one that is least among all the upper bounds. So, what is your guess? What should be the least upper bound of a set A? I'm going to move this up here.

What do you guys think? Well, we have this, remember this is a union operation. So, what happens if we take the union, so, let X be the union of A. A is a set of reals, so each real is a dedicating cut. So, each real corresponds to each real here is everybody below, right? Every real in A looks like this.

There are some reals that are in A, some not, but all of them look like that. if we take the union, we are going to end up with what? We're going to end up with a dedicating cut. And we claim that it is an upper bound. So, why is that? So, I guess we have to do a few claims.

So, first, X is a dedicating cut. And for that, we need to show a few things. It's not empty. So, X is not empty because A is, because A is not empty and all the members of A are not empty. X is not everything because, why is it not everything? Well, because we have a bound, we have this bound B, and the bound B is not in A.

Well, at least above everybody in A. Because, if you have a Q that is an integer and is larger than B, then for every Y in A, Q is not in Y, right? So, whenever you take a Y right here in A, and you took this Q that is right here, something bigger, Q is not in Y, right? So, if you take the union of all these Ys, then it's not going to contain Q. So, let's just remember that this here means the union of all the Ys, such that Y belongs to A. That's essentially A.

So, you're putting all these Ys together. So, if you take some rational bigger than B, it's not going to be in the union, so the union is not everything. So, it's downward closed.

Why is it downward closed? Because every Y that is here is downward closed. Right? So, if somebody belongs to the union, it belongs to some element of A, and then everybody below it will also belong to that same element of A. So, that will belong to the union. And it has no largest element.

Why does it have no largest element? Well, because if it did, the largest element would have to belong to one member of A. Right? Because it's in the union, so it has to belong to some member. But then it will be the largest element of that one. Right?

And that cannot be the case. Because nobody in A has a largest element. So, the union of A is in cats. Because X is a bound for A. So, I'm saying X is greater than or equal Y for all Y in A. And that's just nothing.

That's because Y is a subset of the union of A, which is X. So, Y is a subset of X.

Why is it the least upper bound? **So, suppose Z is below, strictly below X. THEN we claim that Z CANNOT be an upper bound.** And then, so why is that? Well, if this is the case, so here is our X. Right here is our X.

And let's suppose that one is our Z. Well, it's strictly below, so it's strictly included, the same as before. So, then there exists an R in the rationals that belongs to X and not to Z. So, right here. That's our R. if it belongs to X, X is the union of everybody in A.

Right? X is the union of everybody in A. So, something belongs to X, it belongs to somebody in A. There exists a Y in A, such that X, such that R belongs to Y. But R is not in Z. Right?

So, here we have that R is not in Z. So, we cannot have that Y is included in Z because R is in Y and not in Z. So, that means Z is not an upper bound. So, we took something that was smaller than X and we show it's not an upper bound. So, then X and X is an upper bound. So, X is as small as possible.

Nothing below is an upper bound and it's added to an upper bound. So, it's the least upper bound.

Okay? So, that's how we get that every set is bounded above it gets the least upper bound. And that's the way of saying that every hole between the rationals is filled in. that's the way that's the way mathematicians have to say that. That is how it satisfies this property that whenever you have a set there is a maximum a supremum which is not true of the rationals but it's true in the reals. And then we need to define as usual the properties of addition and multiplication. There is a little bit of a trick.

So, if you look at addition it's quite simple. We just take all the rationals that are below T plus S where T is in X and S is in Y. So, each one is a set of here you have X here you have Y you want to add them so you say well take all the ones here and all the ones here add them and then you're going to end up with something X plus Y by adding all these guys this one and this one you add them this one and this one you add them you add all of them and you're going to end up with X plus Y. So, add all the rationals below X all the rationals below Y together. And that's your X plus Y to show that this is close downwards it takes a little takes like a line. not too hard.

What about multiplication? Multiplication we can do the same trick.

Let's try that.

Let's see what happens if we say that the multiplication is the set of all the R's in Q such that there exists a T that belongs I'm going to leave some room here X and there exists an S that belongs to Y such that R is below T times the rationals S. cool, a similar idea like this one I guess you have the numbers below X you have the numbers below Y you multiply them together the rationals are getting very close the ones in X are getting very close to X the ones in Y are getting very close to Y you multiply them together you're getting very close to X times Y sounds wonderful.

There is just a little annoyance and it's that X contains everything below it in particular it contains the numbers that are negative all the numbers are negative or if X is negative from that point on and Y is the same so if you take minus a million that maybe belongs to X and minus a million that maybe belongs to Y now you have positive one trillion that you're claiming it should belong to X times Y and that's not what you want, right? two big negative numbers are going to give you a huge positive number and actually you're going to get all the numbers that doing this so that's not good so let's only multiply the positive numbers right here so I'm going to put in the interval 0x and in the interval 0y I'm going to let you guys try to guess the definition of it what does it mean to belong to the interval 0x and 0y that's quite straightforward and now we don't have the problem with the negative numbers well first this only works if X and Y are positive right so this is if they are positive then this works well not exactly

Because again we're only getting positive numbers and we want to get everybody so I guess we will have to add all the negative reals sorry all the negative rational and now yes now we got what we want in the I guess in the positive case now we have X is here Y is here here is 0 now we're taking all the elements here all the elements here we multiply them together multiply them together and here is X here is Y here is X times Y we multiply them together we get this we're going to get only by multiplying them together we get everybody here below X times Y and now by force we added all the rationals that are negative and we end up with a dedicating cut for X times Y good what would you do if X and Y were not positive so you need to divide by cases for sure you need to divide cases when X positive negative and Y positive both negatives X positive Y negative so they have four cases and in each one you can either directly define this thing or you can use what you expect to be true which is in the definition you say well if X is negative and Y is positive you just take the inverse of X multiply those guys and

Then take the inverse again the inverse is not the negation the minus yeah you need to define what it means to be the negative of a number but it's not that hard so there are a few cases you need to consider look them up they are what you should expect and again it's always it's always good to try to think about what you're going to get before you look them up cool and then the last thing is you need to show that this map that we defined right here is an embedding of fields actually these are these two are fields so well in particular it's an ordering homomorphism that's the same thing but they are both fields so it's a field homomorphism it's one field inside the other one with all the same operations satisfied right now we have all the of the gaps have been filled out and well that's after we show that these guys are filled that the reals are filled but that's the mean to show they are filled associativity committativity distribativity inverse order preserves class order preserves times eight nine properties you need to prove them one at a time using what you know about the rationals to

Now prove this about dedicating cuts of reals it gets a bit messy because multiplication now has these four cases depending on the signs of the x and the y and then when you look at these properties you have to look at all the different cases none of them is hard every proof is aligned but then there are more cases and cases so you need to do that okay so now once all those little proofs are filled in now we have something that looks like the reals and behaves like the reals and flies like the reals and we got the reals and that's it so now we have math like majority great percentage of math is on the reals so wait we have on the reals we have functions we know how to do functions so that means we can do functions from reals to reals we know how to do cartesian products so we can do r square and r cube so now we can do like linear algebra on r cube r square we can define functions we can define continuous functions we can look at what it means we can define limits we can define what it means a differentiable function the complex numbers are just pairs of reals so now by

Now you should be able how to define them so we get all of calculus all of analysis algebra is not too hard to define everything is defined in terms of sets and operations so yes so all of math all of math everything that you learn in all your math courses so far and that you will learn in your undergrad and probably grad school you can do here with this axiom so far and we haven't i haven't even finished with all the axioms but the axioms we have so far are good enough for like 99% of mathematics and you will like rarely go beyond beyond these guys so cool we started only with a a symbol for begins for belongs we began with a symbol for belongs and a few axioms that you all agree in class that they were all basically obviously true we presented no issue at all and now we have a system where we can develop all of mathematics so that's pretty strong so that'll be it for this week so next week we are going to start building cardinals see you next week



## 20. Part p20 - Equinumerosity

Welcome back everybody. All right, so now we're going to change course completely and we're going to start studying cardinality. So, so far we've been concentrating on showing how the axioms are good enough to develop most of mathematics and everything we want, we know from mathematics. And now we're going to start kind of going to the stars, kind of like when physics studies like the regular world and it uses the physics laws of the regular world to study the stars, we're going to be doing that but now with sets.

So now we're going to be studying cardinal sizes of sets. For the first few classes we're going to just consider small or smallish infinite sets. But then we're going to start going to all different kind of sets of sizes of sets. So the first question is, how do we tell that two sets have the same size? So for finite sets there are many ways of doing that and you know many. **For infinite sets that gets a bit, well, you have to figure the side on some definition.**

So we're going to use this definition. So we say that two sets A and B are equinumerous, written A double squiggle B, if there is a bijection between A and B. So that means there is a one-to-one correspondence between each element of A and each element of B. Every element of A you get too much to every element of B. So it has to exist some bijection like that. Whenever you have a bijection like that, you say that they are equinumerous.

Okay, so that makes a lot of sense for finite sets and for infinite sets that's what we're going to use to say that they have the same size. It kind of makes sense. So this is a nice kind of like an equivalence relation. Every set is equinumerous to itself just because the identity is a bijection between a set itself. if A is equinumerous to B, then B is equinumerous to A because the inverse function of a bijection is still a bijection. And if A and B have the same size and B and C have the same size, then you can compose those bijections and get that A and C are equinumerous.

All right, so this is kind of an equivalence relation. Why do I say kind of and I don't say it's an equivalence relations? Because this is a relation on all sets, right? **So remember that to define a set using the subset axiom, we need to take a subset of something that we know already.** And now this relation, we define it among any two sets. Among any two sets, it might or might not be equinumerous.

So we're looking at a class of all sets. So it's not a set. So that's why it's not an equivalence relation, but it kind of behaves like an equivalence relation.

Okay, so let's see some examples, which probably most of you know many of these. The integers and the natural numbers, they have the same size.

Okay, so to show they have the same size, you need to find a matching between the two of them. So we need to find some bijection that goes, let's say, from the integers to the natural numbers. It has to be one to one and onto. So what do we do? Well, we say, we let f of z be, depending on whether z is positive or negative, we let it be 2z or negative 2z minus 1. So that's, so what does it do?

So this map here, if you have the integers right here, I'm going to draw the integers, 0, 1, 2. then these numbers get mapped, this one gets, so this is in the integers, f on omega, 0 is going to be mapped to 0, 1 is going to be mapped to 2. So the positive numbers are being mapped to the even numbers, and minus 1 is being mapped to 1, 3, 5. And the negative numbers are being mapped to the odd numbers, and they just sit inside, and we get a function that is one to one, and it's onto. Right? So that's how you get the rejection between the integers and the natural numbers.

Positive integers, you map to the even numbers. Negative integers, you map to the odd numbers, and you end up mapping, doing a full correspondence between all of them. Right? So, okay, so that means these two guys, despite of one being, like, essentially a subset of the other, well, it's an embedding, but a proper embedding, proper subset, they are still the same size. You can still find the rejection between them. So another important example is the rationals.

So the rationals are also the same size of the natural numbers. And let's do this proof, let's do this a little bit. So recall that the rationals were defined to be the quotient of z times z plus modulo disequivalent relation that we defined a few classes ago, where essentially a pair p comma q is representing the fraction p over q. And then you say that two pairs are equivalent if they represent the same fraction. So that's how you define the rationals.

So now, let me do one thing first. We're going to define a function f from omega, from the natural numbers, to z cross z plus. Remember z plus is just the positive numbers that are here. And we do it as follows. We're going to let this one, let's call it this, this, maybe it's f, f red. This one I'm going to call f of zero.

This one I'm going to call f of one. And I'm going to go here, and then I go here. And then I do f of two. then I do f of three. And then this one is f of four. And this one is f of five.

And then I come here, and I do f of six. then I come here, here, here, here.

Okay, so this way I define a function that is, from the picture, it's obvious that it's one to one and onto. It's like, it's putting a number to each pair from z, comma, z plus, times z plus, zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, and so on and so forth. You get the point. You just go around and making sure you go through all pairs, and you end up with a bijection. So this is a bijection from the natural numbers to z plus, z plus. You may say, well, that's not an actual, how do you define this in set theory?

This is just a little picture. Well, you can do it. I'm not going to do it. But it takes a little bit of work. But then you can find a little formula, depending on how to do a lot of cases. **But you can definitely find a mathematical definition for this formula right here.**

Yeah, it's a bit tedious to find it, and then you have to figure out which way you are, if you're in this arc, or if you're in that arc. A bunch of cases. But yeah, there is a mathematical formula you can write. A bit annoying, but you can write. They're going to give you this bijection. So that gives us a bijection from the natural numbers to z plus times z plus.

But then you say, well, but that's actually not the rationale. Because the rationale are the quotient, right? And if you map each one to the equivalence class, then it's not onto, right? Because what we have is that all these guys, all the guys in the same line, I don't know if you remember, they are representing number one, right? And the same number. So all the ones in the same line represent the same point, the same rational.

This is the equivalence class. So that means each rational is being counted many, many, many times, right? So that's not a bijection if you map it into the rational. if you go into the quotient, it's not a bijection. It's still onto, but it's not a bijection. So you need to fix it a little bit.

So what do we do? So we're saying, so let's define, and we do it by recursion on omega. So we say, okay, so g of zero is going to be, we look at f of zero, and we take the equivalence class of that. The equivalence class in the quotient for the natural numbers, right? Of course, the question that we use to define the rationals. And then what do we do for g of n plus one?

We would like to define it to be the equivalence class of f of n plus one, but that's not what we want because maybe this guy has already been defined, right? So maybe we are, maybe this equivalence class is exactly this point up here, but here is n plus one. But we have previously defined somebody to map to 1, 1, and now we are defining somebody to map to 2, 2. And it's the same rational. So we don't want to repeat. We don't want, so we have to be a bit more careful.

So what we're going to do is we're going to say this is the class of f of k, where k is the least such that for every i less than n, g of i is not equivalent to f of k. So it's the first one such that we haven't yet defined anything that is equivalent to it. So essentially we are kind of, g is kind of following f, but it's skipping the steps that are already equivalent to something. So maybe if I do it, draw it, it's going to take a mess. But essentially we are doing, okay, so here is our zero value. And here's our one value.

And this one. And then zero two is the same as zero one. So we skip it. We go to here. That's our next value. And we have this one.

And then we have this one. And then negative two and negative two and two. And these are the same. These are the same rational. They both correspond to the rational negative one. So we skip it.

And that one is new. I think it's new. And then this one is new. then that one is not new. So we skip it. And then that one new.

And then this one we skip it. So we keep on going like this and skipping the ones we already used. I repeat one and do something else. And this way we get that G is a bijection. It's on two because it's going through all the rationals. We're just here.

We're only skipping the ones that are repeated. And it's one to one because we are skipping the ones that are repeated. So we're not repeating anything. So it's bijected.

All right. So that's how you get that the rationals and the natural numbers are in one to one correspondence. So they have the same size.

Okay. So the rationals, even though they look like there are many, many more rationals than there are natural numbers, same size, same cardinality. That's what we call it. It's a projection between them. And so sometimes when people look at this first, they say, well, that is two sets.

Now we can define any two infinite sets. And so here are another ones.

Another example, the reals and the interval zero, one. So here are the reals, zero, one. And we're talking about that interval right there and all the reals. Is there a bijection between them? Do you guys know a function like this? Well, if you remember your calculus, the function tangent, do you remember tangent?

How it looks? What does tangent look between negative pi over two and pi over two? And it looks like something like this, right? You guys remember that? It goes to infinity when the angle goes to pi over two to 90 degrees. And it goes to negative infinity when it goes to negative 90 degrees and it's zero at zero.

And so, and it's one to one between those two points and it's onto it. So it's one to one and onto it from negative pi over two, pi over two to all the reals.

Okay. So then we get that the reals are equinumerous to the interval negative pi over two and pi over two. Right? So that's the map. It's every real, this real is in correspondence with this real between pi over two and pi over two. And then we are stretching essentially the whole open interval to the whole line.

Right? So you have to imagine you're stretching it. This one go, all these points go there, this point go there and stretch it. And you get every point in the interval in correspondence to one point in the line.

Okay. So now this is for negative pi over two, pi over two. And we started saying, uh, zero, one, it's not exactly the same, but, uh, okay. But then that should be easy, right?

Now we should be able to draw a bijection between the interval negative, um, pi over two, pi over two, two pi over two, to the interval zero, one, right? I mean, just any, any linear bijection, uh, should do a x equals pi x minus pi over two. Right? So that formula right there will map, uh, the interval to the interval zero one. So this one is bijection, pi over two, two zero one. So you get that these two are also, uh, equinumerous.

All right. So all open intervals are equinumerous and they are equinumerous to all the real numbers. Uh, cool. So we have integers, the rationals, and the natural numbers are equinumerous to themselves. The reals and any open interval you choose in there are equinumerous to themselves. What happens between them?

Well, we'll see that in the next video.



## 21. Part p21 - Cantor's Diagonal Argument

All right, so we have that so far that the natural, the integers and the rationals are equinumerous So they are bijections between them. They all have the same size. On the other hand, the reals and the open interval 0, 1 They are equinumerous, too Are those different? And this is very famous Cantor-Zegano argument that He proved this more than 100 years ago, 130 years ago, something like that That the reals and the integers and the natural numbers have different size so there is no bijection between the reals and The natural numbers.

So let's do these two proofs. So first proof Let's do a proof of number one So the proof goes by showing that there are no onto functions from the integers from the natural numbers to the reals, right? So that means we're gonna take any function From the natural numbers to the reals and we're gonna show it cannot be onto So that's why it cannot be any bijection between them So we're gonna do it as follows. So what we have to show that something is not onto, a function is not onto We have to find an element in the image, in this case in R That is not in the image. Oh, sorry. An element in R that is not in the image of S Right, so it is not mapped by anything.

So we need to find at least one real That is not in the image. There are gonna be many, but we're gonna find just one So how are we gonna do it? So let me list an example of how this It's just an example just to get the idea of how the proof goes So let's suppose for instance that F the first few values of F look like this Okay, so that is an example So what we're gonna do is define a number that is gonna be different than all these numbers So everybody in the range in the image of F. So we're gonna let this new value, let's call it I don't know, R It's gonna be zero comma, zero dot. We're gonna start with zero What we're gonna do later is consider the Digits in the diagonal right here, and we're gonna define a number that is different That at each digit is different is different than the corresponding one. So here we have a 9 And we're gonna start with putting a 1.

So whenever it's not a 1 we put a 1 if Here we have a 1 so we're gonna put a 0. Here we don't have a 1 so we put a 1 Here we have a 1 so we put a 0 And so on and so forth. Here we have a 5 So We put a 0 Okay, so we make sure that this digit and this digit and this digit and this digit Are always different.

Okay, so we're building a number that is essentially different Than all the numbers in our list right by making sure at least is different at least one digit But to real it's two numbers are different in one One digit they are different Okay, so if you want to write this a bit more formally You can define a number a sub n It's a natural number that's going to be either 0 or 1 and it's going to be 1 If the nth digit of Fn is Not 1 and it's going to be 0 otherwise. So for instance here is a 0 a 0 a 1 a 2 a 3 a 4 and a 3 is 0 because the nth digit of f3 is 1 But a 2 is 1 because the nth digit of F2 is not 1 So Okay, so for a n up here you look at the nth digit of fn and you see if it's 1 if it's 1 then you put a 0 if it's not 1 you put a 1 right and then you define and then you define 0 dots and then these digits a 0 a 1 a 2 So on and so forth Okay, if you want to be very mathematical You can define r to be that number but it's essentially these eights are the digits of Of the number r and they are different than all the ones So whenever we have n the nth digit of this number r is different than ffn all right, so that's That's the whole point.

So the nth digit of r and the nth digit of f of f of n Are different because we just defined nth digit of r to be different than that of f of n So that implies that r is different than f of n plus n this is for all All right, so that means that r is not in the range of f Okay, so that proves our claim that f is not onto Cool, so we can never have an onto function you will say well, we just only found one I mean it shouldn't be the more numbers. It's just one number that is not in the in the range. No, we just found one But there are many more we could have chosen so many other ways to diagonalize against all these numbers And we would have found like Millions well infinitely many numbers that are not in the range of This function but for the proof we just need to show that no function no matter what function you choose From omega to the reals.

It can never be on so That's how they have different size and as we're going to see later you can imagine the r and the reals have a larger size Omega is inside so let's do a proof of The second part the second part of Cantor's theorem is that for every set A and its power set have different sides Okay, so you can never have a set having the same size as its power set So this is going to imply that the power set always increases in size How do we prove this? This is an idea we saw already.

This is Cantor's argument Banner and Russell's argument So the proof goes like this So same as before we're going to consider a function from the set A to the power set of A and we're going to claim that F is not onto Okay, so that again we need to find One set one element of power set of A that is not in the image Okay, so here is the definition of the set That is we're going to prove later is not in the range of this and it's very similar to that Bertrand Russell paradox of the sets that don't belong to the side We're going to take all the elements little a that belong to A Such that A does not belong to F of itself Okay, so F of A is subset of A right it belongs F of A belongs to the power set of A Right, so we always have F of A It's a subset subset of A and now an A is an element of A So we're asking whether this one belongs to that one or not, right?

And for some elements it is going to belong for some elements it's not going to belong So let B capital B be that guy and we're obtaining this subset of A Right, so it's a subset of A belongs to the power set of A Okay, so the claim is that this is not in the range So suppose towards a contradiction that B actually belongs to the range of F Okay, so That's what we're trying to prove it's not true so we can assume that and get a contradiction Okay, so what do we do? So let's if it belongs to the range it has to be some B in A and it's probably little b such that F of B is B, right? So if it's in the range somebody has to map to it So what is going to be the contradiction? So the contradiction is going to come from considering the following question Does B belong to B? **Here's a question for you guys So let's see IF we can answer that question So B belongs to B by definition of B IF AND ONLY IF what?** Well we have it right here So this is the property somebody has to have to belong to capital B So if this is the same as B Does not belong to F of B Right?

So that's exactly what the property is Now what is F of B? Well that's right here So that's right here So that's if AND only if B does not belong to B And that's our contradiction So the contradiction came from assuming that B belongs to the range of F Right? And therefore F is not ont Okay? So you can never have an ont function from a set to its power set Okay, so that way we have a way of building bigger and bigger sets Right? Because now we know that the natural numbers have a certain size and then the reals have a larger size and then we can take the powerset of the reals that's going to be an even larger size it's going to be a set that has larger cardinality than the reals and then we can take the powerset of that and that's going to have even larger cardinality and then the powerset of that is going to have a larger cardinality and the powerset of that and we can build a whole chain of different sizes each one bigger than the previous ones And then even later in the class, we're going to see how we can, after we do this infinitely many times, we can take the union and give them a larger set. So that's going to take a few weeks.

All right. See you guys later.



## 22. Part p22 - Finite Sets

Okay, so now that we know what it means for two sets to have the same size, let's start considering smaller sizes and analyzing dots. So the first thing to study is the finite sets.

Okay, so there are various ways we can define finite versus infinite and none of them is obvious I would say. We're gonna choose this one. So we're gonna say that set is finite if it's equinumerous with a natural number.

Okay, so have a natural number. Remember a natural number n is defined to be the set of all these previous elements. So the number n is itself a set that has n elements and so that's why we're gonna define a set to be finite.

Okay, equinumerous with the natural numbers. **So remember this is I mean intuitively because you know the natural numbers from before it's very clear but remember that IF you did IF you're NOT using what we know from before we are starting from scratch THEN a natural number is just something that belongs to all inductive sets and so it's quite an abstract definition of what a natural number is.** Something that belongs to all inductive sets and so a set is finite if it's equimorphic to something that belongs to all inductive sets. So one has to be a bit careful to make sure that this definition this notion of finite matches our intuition of what finite should mean right because we're defining everything formally not just by intuition.

Okay so finite means equinumerous with the natural numbers and if it's not finite we're gonna say that it's infinite. Okay so infinite means there is no bijection between the set and a natural number. **So one of the most basic principles about natural numbers is the pigeonhole principle which I guess you guys know. IF you have n holes and n plus 1 pigeons you CANNOT put all the pigeons in different holes.** So mathematically it says that no natural number is equinumerous with a proper subset of itself.

Okay so you cannot find a bijection between a number which is a set of an element and a subset of itself. Since we are defining these natural numbers in this abstract way even if this is obvious let's go through at least sketch a proof of how you of this. What do you guys think? Well of course if you're talking about natural numbers induction it should be your first guess. **So the proof is by induction and IF you're going to use induction remember the way we use it is we define the set of all the things that have the property that we want and THEN we need to prove that that set is inductive.** So we consider a set of all n's which are not equinumerous to any proper subset of itself and we want to show that this set is everything all the natural numbers right.

And we do it by induction of course and there are the two steps also 0 belongs to A. Well because 0 is the empty set right and it has no proper subsets so this is trivially true. Since it has no proper subset every proper subset is equinumerous to whatever or is not equinumerous to whatever else. No proper subsets.

Now suppose n belongs to A we want to prove so how do we prove that something is in A we have to show that it's not there is no projection between it and a proper subset so let's consider a projection so let's so let's suppose that we have a function f that is one to one and it's onto a set b that is a proper subset this means the proper subset not this is included but not equal to n plus one okay so suppose this is towards a contradiction we're going to reach a contradiction let's remember let's remind ourselves that this set n plus one is the set zero one all the way up to n okay so we're assuming that there exists a function it's an ejection between n plus one and a proper subset and we want to get a contradiction okay so how are we going to get the contradiction well there are a couple cases one needs to consider case number one is when n does not belong to b so remember n is the largest the largest element in n plus one so in this case uh we if we let g be the restriction of f up to the domain uh n

So that means we remove the element n from the domain and we left only the element from zero to n minus one we are removing um one element from the function then we have then g is one to one and onto the set b minus the the one we removed what we removed we remove f of n which is itself a proper subset of n right because uh b we are assuming that b uh is a proper subset of it's a subset of n right if the number n doesn't belong to it then we not only we get that b is a subset of n plus one but also a subset of n because the last one is not in it but then we're removing one element so now we get that this new set is a proper subset and g uh is one to one and where is it g going to so g goes from n to b minus f which is a proper subset of n and then but then this contradicts that n belongs to a because uh we are assuming that n belongs to a so that means there is no proper there is no bijection between n and a subset of itself and a proper subset of itself very good okay so case two case two is that n actually belongs to b uh so that means um it's in the image of our function uh b

So we're gonna let a little b be such that f of b uh equals n okay so now we have like b little b goes to n so what we're gonna do if this little b was n plus one then what was n itself sorry if little b was n and then the rest of the function will be mapping the element below n to the element below n right so what i'm saying is that uh so if it's not let's just make it lady so so let g be a new function such that uh g uh of a number a is gonna be uh if a equals b then we don't want it to map it to b we might want to map it to f of m and if a is different than b we map it to f of a so essentially we have n here and here is another element n n plus one essentially and then this is being mapped to by f to the same thing but now it's a subset of these guys here is a subset b and then we say that b that um there is an element b up here that can map to n plus one and now when we define um g what we do is so is that we say okay it does map there and this where is this one map this map maybe up here then we change we let all the values be the same the same for g except that we map this one to that one and

Then we continue with the same f okay so we only change the value of f at the point b and we change it to be f of n okay so now what do we have so now we have that g goes from n to the set b but now we remove one of the elements from the image which is n so this is a subset of n itself all right so we remove this guy from the image of this function so now we have a and b is uh b was missing it wasn't it was a proper subset of n and it contains n so we want to remove it it's still a proper subset so this contradicts that n belongs to a okay so essentially it's that we're just looking at the previous case and so we have to essentially the whole idea is we are transforming the fun we're going to see it assuming there is this bijection that it shouldn't exist and then we look at we peel off the last element which there could be a couple cases for the last element to reduce it to the previous case and assume that if you had that bijection before

Now we can get a bijection from the previous case from n instead of m plus one and that contradicts that n belongs to it and to be able to peel off that last element we need to consider a couple of cases and maybe modify our function a tiny bit cool so there are a few colorities for uh this pigeonhole principle the first one is that uh no finite set is equinumerous to a proper set subset of itself and why is that well every finite set is equinumerous to a natural number so it's a bijection between the finite set and the natural number so if that was true for a finite set it would be also true for that natural number and we know it's not so finite sets in terms of bijection we have like the same as the natural numbers so no finite subset is equinumerous to a proper subset of itself and a good idea of that is that omega itself is not finite why is that um we will say well omega is not bijection with with any natural number we know that but why is that well it's because omega is equinumerous to a proper subset of itself right so if you take the function f of n equals n plus one

So this one is a bijection between omega and omega without zero right it's one to one and onto and between omega and a proper subset of itself so if you don't need a set like omega these things exist for a finite set you can never have a bijection with a proper subset of itself so that's um that's why omega is itself not finite that's what one of the proofs um and the third corollary of this is that every finite set is equinumerous to at most to a UNIQUE natural number because if it was equinumerous to two of them then those two will be equinumerous to each other and no natural number can be equinumerous to another one because one of them is a proper subset of the other so no two natural numbers are equinumerous so if you're you're finite you're equinumerous to it to exactly one natural number and we are called that natural number the cardinality of a okay so if a is finite when we know a is finite we define the cardinality of a to be exactly that natural number so we're going to do something different for infinite case uh in the next week oh no next video okay

So that's a uniquely well defined function the cardinality of a um and then there are a few other uh limits that we can prove so for instance a subset of a finite set is always finite okay again you guys have intuition for this so you know this is obviously true but remember this definition of finite is equinumerous with a natural number so you have to show that if a set uh is equinumerous with a natural number every subset of it is also equinumerous to a natural number so essentially you have to show that every subset of a natural number is equinumerous to another natural number and the proof is again by induction um and you have to take your subset of n plus one and then like remove the last element and see consider what what happens with that subset up to n equinumerous to a natural number and then we put the element back so i let you guys read that one in the textbook try it first before reading the proof it's a proof by induction um it's a good practice for you guys try it first and then read the proof in the textbook

So subset of a finite set is finite and as a corollary of that we get um well actually this is this could be useful actually the other way around to prove the previous lemma that a proper subset of a natural number uh there is a smaller natural number that is um equinumerous to it so that's the lemma that you need to prove the previous one okay so these are like the most basic properties of uh finite sets as i was saying they're all like you guys know all these already these are all intuitively intuitively obvious using your previous intuition of finite sets but they require a little proof if you're just using this particular definition of finite which is not the core so i would recommend you guys go to the textbook and see um if you can follow or do actually all the proofs before reading them see you in the next video



## 23. Part p23 - Cardinality

Okay, so now the objective for this video is the following. **So for the natural numbers, for the finite sets, we define the cardinality of a finite set to be the natural number, the UNIQUE natural number that is equimorphic to it.** For the infinite case, so far what we know, how we measure sizes so far, is by an equivalence relation. Again, it's not an equivalence relation because we're talking about all sets, but we know when two things have the same size, but what do we call that size? Well, we call it the cardinality of this set, but what is the cardinality? What object is it?

And if this equivalence relation was actually an equivalence relation, we could say, well, take the quotient, all the things that have the same size, we make them take the quotient, and now this equivalence class of this thing represents that size, right? So that would be good, but there are, we cannot take all the things, let's say all the things that have size omega, this is not a thing, it's not a set, because we cannot use any action to define the set of all the things that have size omega.

So let's say, the set of all the A's that are equimorphic to, let's say, omega, or any other set, it's not a set, this is not a set, this is a class. We cannot use a subset axion to define this because we don't know where we're taking this, this is from everywhere, we're just taking it from everywhere, there are too many of these things that are equimorphic to this, and we cannot consider that set, that's just we cannot do, so we cannot take a quotient of under this kind of relation of being equimorphic. So instead, what we're going to do to talk about cardinals is we're going to pick, for each size, we're going to pick a representative. So somebody, a UNIQUE element, an element we can define that is UNIQUE, that is going to represent everything that has that size.

Okay? So, and those are going to be what we call the cardinal numbers. So the cardinal numbers are going to be these things. **So this definition might NOT make any sense for now.** I mean, you can, you understand the words, but we've seen this before. So a set K is said to be a cardinal, if it satisfies its properties, it's transitive.

Remember what transitive means, that for every x that belongs to K, x subset of K. Right? So, or in other words, if y belongs to x, it belongs to K, then y belongs to K. That's what transitive means.

Second property that belongs is linear in K. Linear means it's a linear ordering. **Linear ordering means that it's NOT a partial ordering, but it's a line.** So all the elements are connected. So for every x and y in K, either x belongs to y or y belongs to x. That's what it means to be linear.

So all the elements are inside, they belong to each other, one way or another. And the last one is every element that is in K is not equimorphic to it. Equinumerous to it, sorry. So they are all essentially smaller. All the members are smaller.

Okay, so this property, this is a definition of cardinal that we're going to see later on. **So for now, let's just assume it's just some definition, some property.** We are not going to use the particular properties of cardinals yet. So it's just, a cardinal is just something that satisfies its properties. And why do we care about them is because they are quite nice and they satisfy this here. For every set A, there is a UNIQUE object that satisfies this property.

So it's a UNIQUE cardinal that is equinumerous to it. That requires a proof using, of course, these properties, which we're going to do later. For now, let's just stay with this. Every set A is a UNIQUE object K satisfying these things that is equinumerous to it. And then we're going to use that UNIQUE element to kind of represent the whole equivalence class of equinumerosity. So we call this K the cardinality of A.

So this UNIQUE K that is equinumerous to A is the cardinality of A. And we write card A equals K.

Okay, so now we kind of have a representative. So when we talk about the cardinality of somebody, it's going to be these objects, whatever the object is. Cool. So examples of cardinals are, first, the natural numbers. It's a cardinal. Actually, this one we can prove because this one we know the natural numbers are transitive.

We proved that on that section. We know the long is linear on the natural number because the natural number contains, as I said, all the previous natural numbers and the previous natural numbers are ordered between each other. And all the members of the natural numbers are strictly smaller, so they are not equinumerous to it. So it's easy to see that every natural number is satisfied in its three properties. And then what else do we know? We know that omega is a cardinal.

Well, again, we know it's transitive. We know it's linear because its elements are the natural numbers and they all belong to each other. And all its elements are finite. And omega is not finite, so none of its elements is equinumerous to itself. And so far, those are the only two cardinals we know, but there are going to be more cardinals, many more cardinals for all the other sizes. For each size, there is a cardinal.

There is a set that satisfies this property. That's a cardinal. Cool. Just a little bit of notation. The cardinality of omega is actually, in reality, from what we have defined, the cardinality of omega is actually itself. It's omega.

So, because omega is a cardinal itself. So this is just notation. **So this thing, this guy here is called Aleph-NOT.** Aleph is a Hebrew letter. That was used, I guess, by Cantor when he defined cardinals. So the knot becomes zero because it's the first infinite cardinal.

So, essentially, the difference between omega and Aleph-not, they are the same thing. Omega and Aleph-not are the same object, but Aleph-not, when we're talking about cardinals, we think of Aleph-not. When we're talking about natural numbers of ordinals, we're going to be thinking of omega. It's just depending on the usage, which one we use, but they are the same object. We're going to denote the cardinality of the reals through to the Aleph-not, and we're going to see that in the next slide, where this comes from. And Aleph-1 is going to be the next cardinal after Aleph-0, which, so far, we don't know why there is a next one, but we're going to see that later.

So there is a next cardinal, a next size up after Aleph-0. It might be this one or not, that we can improve, but let's go Aleph-1. Good. So next video, we're going to see how to add multiply cardinals. i i i



## 24. Part p24 - Cardinal Arithmetic

All right, so cardinals are kind of like an extension of the sizes, the finite sizes, which are the natural numbers, to look at the sizes of the infinite sets. And we can define operations on them, like arithmetic operations essentially, of addition, multiplication, and exponentiation on cardinals.

Here are the definitions. **And again, for the natural numbers we define addition and multiplication using recursion, all nice or GOOD, but we CANNOT do that here because these are, cardinals are just sizes and they are like infinite sizes.** So recursion breaks down this for now. So we need a more direct definition, and this is the definition. And as you see, this is going to make sense. So kappa and lambda be cardinals.

So that means they are sets which have a certain size and they are the particular representatives of these sets. that we call cardinals. So the addition of these two cardinals is going to be the cardinal of the disjoint union of kappa and lambda, okay? Cardinality of the disjoint union. So what do I mean by the disjoint union? So kappa, square union, lambda. **Disjoint union means that we union them, but we force them to be disjoint inside the union.**

We don't want them to overlap. So essentially, usually what you do is you take all the pairs of the form 0, k for k in kappa and your union with the pairs 1, l for l in lambda. So essentially, all right, so we kind of force them to be disjoint by taking them, multiplying 1 times 0 and 1 times 1, and now we have two disjoint sets. The ones that start with 0 correspond to kappa, the ones that start with 1 correspond to lambda. And now, so, so this is essentially these sets. if here is 0, here is 1, and here we have kappa, here we have lambda.

It's the union of these two sets. And the addition of the cardinals is going to be the cardinality of this new set that we build by doing the disjoint union.

Okay? Makes sense. And good. So what about times? For times, we just do the Cartesian product. And so the cardinality of the Cartesian product of kappa and lambda.

So the set of all pairs from kappa and lambda. And again, we have to apply this cardinality function because this setup here is not going to be a cardinal itself. We just need to take a representative for the size. So the size of kappa times lambda. And then we can also define a notion of exponentiation in cardinals. Kappa to the power of lambda is the cardinality of the set of functions from lambda to kappa.

By the way, the textbook uses this notation up here. Kappa to the lambda is the set of all functions from lambda to kappa.

Okay? So kappa to the lambda, if you notice a difference, a subtle difference here, when the lambda is on the left, is the set of all functions. And you have to think of the kind of functions kind of going down from lambda to kappa. And kappa to the lambda with the lambda on the right is the cardinality of that.

Okay? So it represents the size of that. You forget, so in this case, you don't think of them as functions anymore. You're just talking about the number of such functions. The size of the set of such functions.

Okay? So exponentiation is that. One nice observation to make is that if kappa and lambda were just numbers, just finite numbers, these operations correspond to the standard operations on the natural numbers. Right? So we're not doing anything new here. Right?

So if you have like the set of functions, how many functions are there from 0 n-1 to 0 n-1? So this one has n elements and the n has elements. How many functions are there? There are how many functions from here to here? Well, you guys know this, right? This is just m to the power of n, right?

So that's how you define the exponentiation there. And so the basic properties are going to be fine for the natural numbers, but now we're defining these for just sets of any size.

Okay? It's actually quite surprising that these operations on infinite sets have almost the same properties as the operations of natural numbers. not all the same, but many of them are the same. So for instance, the operation, the addition operation is associative. Satisfied associativity law. So it doesn't matter where you, if you add first these two or then these two, you get the same result, right?

It doesn't matter who you add first. And to show that, let me just do one of the cases, because they're all very similar. You need to show that there is a bijection between the sets. So this set up here, this is the cardinality of what? This is the cardinality of kappa square union. So this joint union lambda mu.

And this one is the cardinality of kappa union lambda union mu, right? So what is this set up here? Well, this set up there is zero, the set of pairs zero and something in kappa union, set of pairs one cross, set of pairs zero one, right? That's what that set is. And then if we kind of work with this cross products and unions, we get that we get zero times kappa union one comma zero times lambda union one comma one times mu, right? That's what that set is.

Essentially, these are three sets of the corresponding sizes. And then we're uniting them together. So it's obviously, it's not hard to see that when we look at this one, we're going to get something slightly different, but very similar, right? We're going to get the pair zero zero times kappa union the pair zero one times lambda union just one space times mu. And it's not hard to see that this guy and these guys are equinumerous. So to show these are equinumerous, you need to map this set to that set, and then map this set to this set, and map this set to that set, right?

And then you just define what function it is, mapping these things, and you're going to get the bijection between the two sides, okay? So that's how you prove it there. It's also a commutative addition, essentially you have to just flip the zero and the one in that this joint union requires one line proof. **Multiplication is satisfied associativity law.** And again here, well, we have triples, right? So essentially, when you define this cartesian products in one case, what you're going to get in this case, I'm just going to do a few steps in one.

This is the cardinality of the set of pairs kappa k, l, m. This is the pair of pairs for k in kappa, l in lambda, and m in mu, while the other one over here is going to be the cardinality of the pairs kappa, l, m in mu. And then those two sets are, well, they are different sets as sets, but of course it's an easy bijection mapping these guys, essentially mapping this element to that element, just flipping, moving the pair from one side to the other. Of course, they are in a bijection, so these two are the same size. Commutativity is also, multiplication is also commutative, essentially you have to take the product and flip it and get that. Associativity is also quite easy, here is lambda, here is mu, this is a disjoint union of lambda times mu, and here is kappa, here is kappa times lambda, here is kappa times mu, and everything together is kappa times lambda union square union kappa times mu, but then of course that's the same as lambda union mu times kappa.

So you can see it one way or another and you get this guy is equal to that guy. Exponunciation has some nice interesting properties, and this is interesting how these properties, which I guess we proved by recursion before, and they are these tricky properties of exponentiation, are actually just natural properties that follow from these definitions a set of functions. You have to be careful of how you define these things, right?

So let's do a couple of these. So for instance, we want to define here function f that goes from the space of functions from lambda, the set of functions from lambda plus mu to the kappa, to this space of functions from lambda to the kappa, cartesian product functions from mu to the kappa, okay? So that means we want to transform a function of the first kind into a pair of functions of the other kind. And how are we going to do if you have a function? We're going to find this one. if you have a g that belongs to this guy, we're going to map this.

We're going to let this be the pair. We need to be a pair, right? Because we need one in each. And here we're going to do g restricted to lambda comma g restricted to mu. And then this one belongs to here and this one belongs to here. So see a function whose domain, whose original domain was the union, the disjoint union of lambda and plus, let me just actually write this joint union there, now splits into two functions, one with domain lambda and one with domain mu.

And to show that it's actually a bijection, you need to show that it's an inverse, a given, first, yes, an inverse essentially, that given two functions, one with domain lambda and one with domain mu, you can recover a function whose domain is the disjoint union of lambda times mu. So the inverse operation of this f. And that's how you get that these two sizes are the same. The product's rule for the exponentiation also works.

So now again, we will need to define a function that we're going to define a function from mu to the lambda to the kappa. So we're going to do it in this direction to lambda times mu to the kappa. And so what is this function going to be? So this function f applied to a g.

Now a g that belongs to here is going to be what? So now we have to define, this object should be a function also that belongs to kappa. It's a function that goes from mu times lambda times mu to kappa, right? So how we define a function, we need to say what the function does on its values, okay? So what is this function going to do on its values? When we apply this function that we are we get here to let's say l, m we should get so here is l, m and we are going to get something that belongs so fg applied to l, m has to belong to k, to kappa, right?

So what is this going to be? Well, g, if you apply g to something in mu, what is that going to give us? g applied to something in mu is going to give us a function from lambda to kappa, right? g of m is a function from lambda to kappa. That's what we want. We want an object in kappa, so what we're going to do is apply this now to l. And now we get a function in an element of kappa.

Okay, so this is a bit tricky. It's a bit abstract. So please slow down this part, take a look, try to prove this is a bijection that you can actually go back from the right hand side you can do the other, the inverse function of this. And because it's a function that you're applying the input of this function is a function and you're outputting a function. So that's why it's a bit abstract and it requires actually to sit down with yourself and play it, play down with it a little bit and also look at it on the book.

All right, see you guys next week!



## 25. Part p25 - Ordering Cardinals

Welcome everybody! So last week we saw how to compare cardinals, how to say when two sets have the same size, to compare sizes. We only define how to tell when two sets have the same size.

Now we want to talk about when we can say that one set is larger than another in terms of size. **Okay so the definition we're going to use is this one right here and this definition says the following.** So we said that a set a is dominated by a set b and we write a little squiggly less than or equal b if there is a one-to-one function from a to b.

Okay so that's all we're asking. So essentially here is one-to-one function and the one-to-one function has some image and essentially this one-to-one function f is a bijection a and the image of a which is inside b.

Okay so that kind of makes sense that that would mean that a is a smaller size than b. Okay so that's what it is. It's a one-to-one function from a to b we say that a is dominated by b. So dominated means that b is larger. So a couple of simple well this is notation so we say that and in the case when we're talking about cardinals we say we just write less than or equal instead of this quickly less than or equal if these two guys are cardinals which is right this cardinal is less than or equal that cardinal.

Okay so they remember the cardinals are these particular objects that are representing all the different sizes so when we're talking about one of these sizes we just say less than or equal we don't need to use the dominated by. **And in particular from this definition when we have that a is a subset of b THEN a is dominated by b of course by using the identity function or inclusion function I guess it's called when it's a subset.** So if you're a subset then you're clearly included in the other right. So for instance we have that the natural numbers are a subset and therefore are less than or equal size of the integers less than or equal the rationals less than or equal the reals dominated by the complex numbers. Right?

Okay so actually we know that these three sizes are going to be the same and we saw in class last time these two sizes are also the same but so far yes so we know those are the same. But right that's the inclusion chain that we get right there.

Let's see a few examples. So here is a bunch of inequalities and well inequalities let's say with this domination relation.

So let's see what we got up here. So this the first one we did in the last videos right? Remember it's a video where we show this one so the tangent function gives you a bijection between an open interval in the reals not that interval but some open interval in the reals and the whole real line. And then you get a bijection between those two. This one is clearly a subset of the intervals, the closed interval 0, 1.

Okay so that's an easy one. What about this one? This one is a pretty interesting one.

Why is that I'm saying here that the interval 0, 1 in the reals is dominated by the power set of the natural numbers. So to show this we will need to define a one-to-one function from 0, 1 to the power set of the natural numbers. Right? So a one-to-one function from 0, 1 to the power set of omega. So how do we define this function? And the idea is to look at the binary representation of the number.

Consider this binary representation. So binary representation remember is when you write the number R in base 2. So it's going to be in base 2. So it's going to be of the form 0 dot and usually have all the digits after that.

Let's call them B0, B1, B2, B3, B4. But now these digits are in base 2. So for instance, 0.110011001. This is what it's going to look like, whatever the number is. And the same way we can represent numbers in base 10, using the digital expansion, we can represent them in base 2. And what this means is essentially that it can be represented as a sum of powers of 2.

If bi is 0, then we don't put the power. if bi is 1, we put the power. Right? So that's the binary representation of a number. Yeah? So, okay.

So there is an issue with binary representations. There is an issue with these two cases. Right? So if you have a number that ends with 1, 1, 1, 1, 1, 1, 1, 1, forever, it's the same as the number that has the 1 in this position and then it ends with all zeros. The same way as when the digital expansion, when you have a number that ends with 999999999 from sign point on, that is the same thing as adding 1 to the next digit and then having all zeros. Right?

So number 1 is the same as 0.9999999999 forever. That's the same as number 1. So the same happens in binary. So we have to be careful with these two. So we are going to have to decide. These are two representations for the same number.

Right? They give you the same number. So we have to decide on 1. So choose representation that doesn't end in all ones. Right? So where do we want to eliminate this case?

And we just leave the other one. So whenever you have actually, it's a binary rational that we can write in these two ways.

Let's choose the one that ends with zeros. Well, unless you choose 1. So unless r equals 1, in this case, we choose 0.11111111111111111. That's the one we choose. We choose this one only for the case of r equals 1.

Okay? So you do that.

So now every number has a binary representation. And now how is that we do that map into the set power set of omega? Well, we just say now h of r be the set of all the i's in the natural numbers, such that if you look at the binary representation of r, bi equals 1. So in some cases, we get 0. In some cases, we get 1. For some digits, it's 0.

Some digits are 1. So choose the digits that are 1. So okay, so r, so h is a function that for each number between 0 and 1 is going to give us a subset of the natural numbers. It has to give us a different number, right? Because given if you know which ones are 1s and which ones are 0, we can recover the number back. So h is 1 to 1.

Yeah? So h is 1 to 1. Because if you have different numbers, you're going to have the same binary representation. Is it onto? Well, it's not necessarily onto. And that's why we don't have here the equinumerous sign.

Because since we have to choose between one of the representations, we are leaving out some subsets, right? So we are leaving out the subsets at n with having all the elements in. So having all the elements in one. So those are not in the image of this map because we chose to use this representation and not to use that representation. Well, if you had chosen the other one, we would have left out these ones. So one way or the other, we are leaving something out.

So this map is not onto, but it is a 1 to 1 map. So we do get that this one is dominated by the power set of the natural numbers. So how is that the power set of the natural numbers, the set of all the subsets of the natural numbers, is equinumerous to the set of functions from the natural numbers into 2. So remember, this is the set of functions from the natural numbers into the set that contains 0 and 1. Here, the set of all the functions, f's from omega to 0, 1. So how is that we get this bijection?

So we want to define, let's call it h, from omega to 2 to the power set of omega. So we want to define a function that maps every function from omega to 2 to a subset of the natural numbers and we want it to be a bijection. What is the function? Given a function g that belongs to the set of functions from omega to 2. So let h of g, right? So notice that g belongs to this guy.

And now we want to define h of g that belongs to this guy. So this has to be a subset of the natural numbers. The set of all the i's such that g of i equals 1, right? Which is sometimes we can write this as g inverse of the set 1. So this is 1 to 1 because if you have two different functions, the functions are determined by which numbers go to 1 and which numbers go to 0. So having the set of all the things that go to 1, then we know which ones go to 1, those that go to 1, and then the ones that are not in the set go to 0.

So the function is determined by this set. So it has to be 1 to 1. And it's onto because for every set there's going to be a function whose all the elements in that set go to 1 and all the elements in the complement go to 0, right? So this function is going to be a bijection. So essentially these two guys, power set of omega, subset of the natural numbers, and functions from omega to 2, are almost the same thing. They are not the same object, but in logic we often look at them as the same thing.

Essentially this one for each, so elements of the power set, the subset of the natural number, are for each number you have that the number can be either in or out. When you have a function from the natural numbers into 2, you have that for every number it can be 0 or 1, the image of the function. So in or out, 0, 1, these are two different ways of kind of the same thing, just two possibilities. In or out you use this one, 0, 1 you use this one, right? So those two are the same.

Okay, and what about the last domination over there? Well, what we have in here is, so consider the function from, again, from the set of functions to r be defined by the following formula. So that's giving a function g from omega to 0, 1, that's the same thing as saying g belongs to 2 to the omega. So we let h of g, we are supposed now to get a real number, right? So we took a function here, and now we want to get a real number. So what real number are we going to choose?

We're going to choose the sum, the sum of g of i times 3 to the negative i. So essentially now what we're doing is writing a number in base 3. So h of g is going to look like something of the form 0.011010, because g only contains 0s and 1, but viewed in base 3.

Why do we use base 3 instead of 2 if we only have 0s and 1s? Well, because of the same issue we had before, that we don't want to confuse these two guys. We want our function to be onto. So we don't want the function that gives you all 1s and gives you all 0s at the end to give you the same number. We want them to give you different real numbers, right? So we want our function to be 1 to 1.

So we don't want those two to get confused. So then we use base 3. In base 3 there is no confusion because the ones that are equal here are the ones that end with 2, 2, 2, 2, 2, 2, 2, 2, 2. Those are the ones that get confused with the ones that end with 0, 0, 0, 0, 0, 0, 0, 0, right? So here this one is 1 to 1, and it's the embedding that we want.

Okay, so we have that the real numbers are dominated by 0 to 1, power 0 of omega, functions of omega to 2, and then back to the real numbers, right? **So you would say, well, that means that they are all the same.** Yes, it does, it's going to mean that, but this requires a proof. It's not a trivial proof to show that from this being sandwiched between the reals, we have that they are all equinumerous. So that requires a proof, and we're going to see that in a couple of videos. See you guys later.



## 26. Part p26 - Infinite Sets Dominate Omega

Welcome back everybody! So now we're going to see another example of a set dominating another set. We're going to show that whenever you have an infinite set A, omega, the natural numbers, are dominated by A. So what we want to do is to define a function from omega to A that is 1 to 1. And all that we know about A is that it's infinite. And remember infinite, all that infinite means is that it's not equinumerous to any natural number, right?

So that's all that we know about A. So what is the idea to define this function h? And the idea is to be defined by recursion. So we're going to say, well we're going to define h of 0 to be some element of A, which A is not empty so just an element. And h of 1, some other element of A. And h of 2, some other element of A.

And h of 3, some other element of A. And we go like that, keep on defining. We're never going to get stuck because A is not finite, so there's always something else to choose. And like that, we're going to end up defining our 1 to 1 function. It's 1 to 1 because we always choose a new element that's different from the previous ones.

Okay, so that's essentially the proof, except which ought to be a little bit careful about a couple of things. So okay, we're choosing one element because A is not empty. Fine, we're going to choose one. But here we're choosing infinitely many elements. We're doing a recursion and we're choosing infinitely many elements. So an A could be some huge weird sets that I don't know what its elements look like.

How are we doing the choosing? Who's doing the choosing? **So we do need to use the axiom of choice, actually a weaker version of the axiom of choice.** But the axiom of choice is going to allow us to do the choosing.

So let's do that first. **So we use the axiom of choice to define a function, let's call it C for choice, and that takes every subset of A, well except for the empty set, and picks an element of A such that the image of a set, let's call it B, the subset of A, belongs to B.**

Okay, so we are only choosing sets B, the subsets of A and B are not empty, right? So for every subset of A that is not empty, we can just choose an element of itself. **We are assuming it's NOT empty, so we're just choosing an element of itself. IF you want to say how do we do this using the axiom of choice, so notice that graph C is included in the set of pairs B comma B which belong to the power set of A minus the empty set cross A such that B belongs to B, right?** So this thing on the right, this thing up here, it's a set of pairs, on the left we have subsets of A that are not empty, and on the right we have elements of A, and this is the set of all the pairs which satisfy that B belongs to B. So this is a property, this is this set up here we can define by the subset axiom, and this is a relation, it contains a bunch of pairs, it's just a relation, and what we want is a function, not a relation, but with a particular property that everything here is assigned only one element here, that assigns to each B a UNIQUE B, right?

**And that's exactly what the first form of the axiom of choice says. IF you go look, it says that whenever you have a relation you can take a function whose graph is a subset of the function of the relation, and but it's choosing for each possible thing in the domain ONLY one thing in the range, while here in this function each B is capital B is related to all its elements, right?** So if B has ten elements there's gonna be ten pairs capital B comma something choosing all the elements. if the relation contains all of those pairs, our choice function contains only one, it's choosing one of these little B's for each capital B.

**Here is our slide from a few weeks ago about the first form of the axiom of choice.** Whenever you have a relation from one set to another, which one element can be mapped to many different elements, we are choosing just one of the possible elements in maps, right? So every relation R is a function, it's our choice function, which has the same domain, so all these guys are gonna be related to something, this is the domain, but and the graph of the function is what is a subset of this relation, but now every element is assigned only one. So this is the red line here, means from these two we chose the red one, from these two we chose the red one, yeah? So that's what the axiom of choice said.

Okay, so now that we have a choice function that for every subset of A picks an element from itself, from inside itself, we define h by recursion. h of 0 is going to be just, we just have to pick an element from inside A, so we're going to choose the choice function of the whole set A is going to give us an element that belongs to A. And then in general we're going to define h of n plus 1 to be a member of what set we want. We want something that belongs to A, but it's not equal to any of the previous ones to make it 1 to 1. So we're going to remove the set h 0 h n, right? And now we're going to get that this is going to be a member of A, the choice function is going to choose a number of A, and that is, but that is different from h 0 h n. Right?

And we should, we have to make the observation that this set is not empty because A is not finite, and if it was, if it was empty, we will have a bijection, right, the bijection is right there, h will be a bijection, mapping 0, 1, 2, 3, up to n, to A. So we will have that A, this bijection with the number n plus 1, which we know is not, because it's not finite. So then we can define this function all the way through. So we end up with a function exactly like we wanted from the natural numbers in 2A, that is 1 to 1, okay? So the natural numbers are dominated by any infinite set. As a codularity, we get that a set is finite if AND only if it's not equinumerous to any proper subset of itself.

Right? So we already show one direction, if you guys remember. So we already show that if a set is finite, it's not equinumerous to a proper subset of itself. **And that was essentially the pigeonhole principle that you can map a set properly inside itself.** But now what this lemma gives us is the other way around. if A is infinite, we want to define a bijection, let's call it F, from A to a proper subset of A.

And how are we going to do that? Well, we know already that we have our map here, let's say, the natural numbers, and here is our set A. And we have our map H, so we know we have a 1 to 1 function from omega to A, no? The ghost whose image is somewhere inside A, maybe it's the whole thing, but somewhere there is the image of this function. And now what we can do is the natural numbers, we know how to map the natural numbers to a proper subset of it themselves, right? We just shift them by 1.

We add 1 to every number, then 0 is going to be left out and every other map. And we get this 1 to 1 function from omega to a proper subset of itself. So we can do that inside this part. So shift this one, and then that will give us a shift of this one, leaving 0. 0 is going to be left out, and then here H is going to be left out. And then we leave the rest the same, okay?

So we can do the following. **For A in A, we define F depending on whether A belongs to the range of this function H or is outside.** So if it is not in the range of A, we just let it be itself. So if A is not in the range of H.

Okay, so if A is up here or up here or up here, we let it just stay fixed. And if A is up there, then we just take the pre-image, we add 1, and then we go back. So we are going to define, you know, it would be H of H inverse of A plus 1 if A belongs to the range of H. Remember that H is 1 to 1, so if you belong to the range, we can take the pre-image, right? So what we are saying here is that if you are taking an element from up here, if this is your A, we are mapping, we are going back here, taking the inverse, then adding 1, and then we go back, right? And we get something else, yeah?

So what are we getting right here? F is 1 to 1, and it goes from A to A, and it's leaving out the image of 0, right? Because the image of 0 is never H of something plus 1, because this something plus 1 is never 0.

Okay, so in the infinite case, you can map to a proper subset. In the finite case, you cannot, and this is a characterization of being finite. So we could have used this one as a characterization of what it means to be finite, and then do a proof that this being finite is equivalent to being equinumerous to the natural number. Some people do that, depends on the textbook.

Okay, see you in the next video.



## 27. Part p27 - The Schroeder-Bernstein Theorem

Welcome back everybody! So we saw before that the reals are dominated by the power set of the natural numbers and which is the same as the functions from the natural numbers to two and that the powers of the natural numbers are dominated by the reals and then we say well that does imply that they are equinumerous. Well equinumerous means there is a bijection and what we prove here is that there is a one-to-one map from here to here and there is a one-to-one map from here to here, right? So we have two one-to-one maps but does that imply there is a bijection between them? What we're gonna prove right now is this. if you have that there is a one-to-one that A is dominated by B, it's a one-to-one map from A to B, and that B is dominated by A, it's a one-to-one map from B to A, then there actually there is a bijection between them.

So you have to build this bijection, okay? So I'm gonna give you the picture proof. I don't want you guys to read the details in the textbook. So here is the proof.

So let's suppose we have a set A and here is our set B, okay? And we know that we have functions and by assumption we have a function that goes from A to B and it's of course one-to-one and we have another function G that goes from B to A and it's also one-to-one. And we want to define A from A to B bijection. So the problem that we have is that F and G might not be onto, right? So they might both be missing some part of the other set and then what do we do.

So let's suppose, so let's draw G up here. So G, let's suppose we arrange the elements in our picture so that G kind of looks like this. So this is G and let's suppose it maps everybody to inside this set and it's gonna leave this set out. Yeah, so the function maps all of B into all this part of A but leaves this part out. So that's what we're missing to get a bijection, okay? So here is the construction that we're gonna do.

Let D0 be the image under F of this set C0 and this is through F. Okay, so that goes somewhere there in B. And now we're gonna go back through G and we're gonna get here some set C1. So let C1 be the image of D0, okay? So that's how we get this one. And this one is disjoint from C0.

Well, because C0 is disjoint from the range of G and C1 is pretty much inside the range of G, right? So this one is disjoint from the range, this one is inside the range. So these two guys are disjoints. And then we're gonna keep on doing the same thing.

Now we're gonna apply F to this guy. F and we're gonna get D1 and then we're gonna apply G. By the way, D1 is disjoint from D0 because F is 1 to 1 and they are coming from disjoint sets. And if you go through a 1 to 1 set, you get different things. And then once these two are disjoint, the images are disjoint because G is also 1 to 1. So they have to go to different sets.

And we keep on doing like this and essentially we are defining these sets C0, C1, C2, C3 and D0, D1, D2, D3 all the way by induction. So essentially we can fix this part up here and say Dn is the image of Cn and Cn plus 1. So essentially we have that Dn is the image of Cn through F and Cn plus 1 is the image of Dn through G, which happens to be disjoint from all the previous ones the same way as the Dns have disjoint from all the previous ones.

Okay, so how are we gonna define RH now? **Well, now the key point here is that IF you look at the spots that we have left open, this one goes, they are in bijection with each other.** Remember G, the image of the range of G is everything but C0. So we can map these blue parts backwards using G inverse and they will stay on the blue parts and then the red parts using G. So we're gonna let F of an element A in A to be depending on which case you are. So if A belongs to some of the CNs, the union of the CNs, so if it belongs to one of these guys, then we use F of A, okay?

So that means if it's like right here, it will go through F there. if it's here, it goes through F there. if it's here, it goes through F there. if it's here, it goes through F over there. And if it's on one of the blue parts, if A is not in the union of the CNs, then what we do is we go backwards using G. Which we can do because C0 is A minus the range of G.

So everything outside C0 is gonna be in the range, so we can apply the inverse. And G is 1 to 1, so we can apply the inverse. So what do we need to do to see that this is 1 to 1 and onto? So what we need to see is that, so observe, so F is a bijection from the union of all the CNs to the union of all the DNs. **Because that's the way we define essentially the DNs.** And the other thing to observe is that G is a bijection from the union of all the DNs to the union of all the CNs for N greater than 1.

Because when we go in the other direction, in the G direction, we are skipping C0, right? So this one is being skipped, but all the Ds go to all the Cs, right?

Now, if you take the complements, this one is not in the range of G. **So that means that we get a bijection from the whole set B minus the union of the DNs.** So if removed, this is the blue part, to the whole set A minus the unions of all the CNs. And here we are including all the CNs because this one is not in the range of G. So G is going to map these parts, the blue ones, to the blue parts. Because it's the complement of the Ds, I'm going to go to the complement of the Cs, except for this one, which is not in the range.

So that's how we divided the sets A and B into two pieces and we have bijections between each other. F between going one way and G going the other way on the other sets. So that's how we get our bijection that proves that A is equinumerous to B. See you guys later! See you guys later!



## 28. Part p28 - Comparability of Cardinals

Welcome back everybody. So right now we know how to compare the size of sets. We can say this set has more elements than that set via this domination relation. But so far we don't know that if you're given two different sets then one has to be larger or let's say equal than the other. Right? So that's what we want to prove today that whenever you have two sets one must be they have to be comparable.

Like either they have the same size or one has a size larger than the other one but it's never the case that they are incomparable. There is no injection from one to the other. **This is NOT a trivial theorem and actually it requires a heavy use of the axiom of choice as we're going to see now.** The version of the axiom of choice that it needs is called Zorn's Lemma. So Zorn's Lemma which we're going to prove when we see ordinals later in the course. So we're not going to prove it for now.

**It's going a combinatorial version of the axiom of choice that is quite useful in applications and we're going to use it actually a bunch of times.** When you read it, it's a bit technical. So the definition is not hard, the statement is not hard, but it takes a little bit to get the intuition of what's going on. The best way to get intuition is just to see examples. So we're going to see an example now with comparability of cardinals.

**So let's start reading the statement of Zorn's Lemma.** So Zorn's Lemma says so suppose you have a set A. So we're just using this calligraphic A to kind of emphasize there is a set of sets. So imagine A is a collection of sets. A set of sets. Everything is a set of sets in set theory, so I'm not saying anything about saying a set of sets, but I just want to put the idea in the head that it's a set of sets.

So that's A and it has this following property. A has the property that whenever you have a subset of A that is a chain, its union belongs to A. So what is a chain? A chain is a collection of sets such that whenever you have two elements inside, one is including the other.

Okay, so if you have C and D that are not including each other, this should not belong to a chain. if you have a chain, in a chain, the elements of the chain need to look like all included in the other.

Okay, and you never have something like this that is not included in the rest, so it doesn't compare to the rest. So whenever you have, you take two elements, let's say we take the red element here and the black element there, one of them has to be a subset of the other. So if you have a collection of sets like this, it's called a chain.

Okay, so the property that we want is that whenever we have a chain, which is a subset of A, so A doesn't need to be a chain, A may have like all kind of sets. But whenever you take a subset that is a chain, the union, which the union in this case is kind of like the bigger sets that we get up here, that's the union of the chain, the biggest one, also belongs to your collection A.

Okay, so the collection A is closed and they're taking unions of chains. That's what this is saying. So if you have that property, then you can deduce that A has a maximal element. So what is a maximal element? So maximal element for set A is one that has no, it's not, it's not a subset of any other element of A. So it's maximal and you cannot add any more elements and also get an element of A.

So within the collection A, this M is maximal because you cannot make a bigger set that is also belongs to A. There could be many maximal sets because you can have incomparable sets that are maximal, and none of them you can increase, but then maybe they are not a subset of each other. So there could be many maximal sets. **Zorn's Lemma tells you that there exists at least one.** How do you use it in practice? Well in practice usually every time when you want to prove something using Zorn's Lemma, you need to define this collection of sets A, which is going to be particular to your particular application.

And then so that what you want is to get a maximal element of A. So you're going to devise A so that if you got a maximal element, then you will get what you want. So essentially you have to figure it out what collection it is that if you get a maximal element, then you get what you want. **But THEN to be able to apply Zorn's Lemma, this collection MUST satisfy the property that whenever you have a chain that is a subset of the whole collection, the union also belongs to the collection.** So the proofs are going to go you define this collection of set A, you prove that it satisfies the property of being closed on the unions of chains, then you use Zorn's Lemma to get a maximal element, and then you prove that the maximal element is the object you were looking for.

Okay, so all the proofs by Zorn's Lemma pretty much go that way. So let's see an example. So we want to show the following, that every two sizes are comparable, so that whenever you have two sets C and D, one is dominated by the other. So one must be bigger than the other, or equal, or they could be equal in size, or one less than or equal the other.

Okay, so let's go with this proof. So from the beginning, let's just start defining what this collection of sets is going to be. **So let A be the set of functions F, the set of all the functions that are one to one, whose domain is a subset of C, and whose range is a subset of D. IF I wanted to be formal and use the subset axiom to define this set, you have to notice that F, F functions remember are just the graphs, right?** So formally a function is its graph. So a function is a relation from C to D.

So this is a set that belongs to the power set of C times D, right? It's a relation from C to D, right? So that's the set that we want.

Okay, so F is a set of functions. And you say, well, didn't you say that we want a collection of sets, and now we have a collection of functions? Well, a function formally is just its graph, right? So a function is a relation, it's a set of pairs. So we are thinking of these functions as their graphs, or their sets. And so that's why they are sets, because they are sets of pairs, they are relations.

So let's start by seeing what it means to have one function included in another as sets. **So the observation, because a function F is a subset of a function G as in as graphs, IF AND ONLY IF, now let me just write down first the obvious definition, it's like for all pairs C comma D that belong to F, C comma D belongs to G, right?** That's what it means to be a subset. And now if we unravel that, we are saying that for all C that belongs to the domain of F, we have that C also belongs to the domain of G, and F of C which is D equals G of C, because C comma D belongs to the graph, right? So in other words, this is the same thing as saying that the domain of F is a subset of the domain of G, every C in the domain of F is in the domain of G, and for all C in the domain of F, F of C equals G of C, okay? So that's what that means.

So another one we can also say, well that's exactly the same as saying that the smallest one F is the same as the biggest one restricted to the domain of F, right? So remember this symbol up here means restricted, so we are kind of restricting that G has a bigger domain, and we restrict the domain to a smaller thing, in this case the domain of this one, and on that domain we get the same values, okay? So that's what it means for a function to be included in another one, that the function is a restriction of the elements, they are compatible, they always give you the same values, though the biggest one can be defined in more elements, while this one is might not be defined in those elements, right? So in that sense is that this one is bigger, but wherever this one is defined, they are compatible and give you the same values. So that's what inclusion of functions is when you think of them as sets.

Okay, so now we want to make a following observation that this set A satisfies hypothesis of Zorn's Lemma. So let's start from like an easier observation. if B is a chain of functions, meaning that all its elements are functions, then a union of B is a function. if you have a chain of functions B, so it's a collection of functions that are all nested, so they are never incompatible, they are all like including each other, then the union of B is also a function. It's a function, okay? So essentially we have, by saying that B only contains functions, they are all relations, they are all set, all the elements are set of pairs, so the union is still going to be a set of pairs, so that's good.

So we still have a relation as a union, but then you have to show that it satisfies the property of being a function, okay? So suppose to show there is a function that c, d belongs to the union of B, and that c, d' also belongs to the union of B, okay? So then you will have, they must belong to some element of B, so there exists an F that belongs to B, such that c, d belongs to F, right? And there here that exists the G that belongs to B, such that c, d' belongs to G. That's what it means to belong to a union. But B is a chain, so that means that whenever you have two elements inside B, they are comparable, right?

So either F is included in G, or G is including F, right? So either F including G, or G including F. But in either case, you will have that F of C equals G of C, right? Because they are comparable. And therefore, notice this one here is D, and this one here is D', right? So we started assuming that taking two pairs, c, d, and c, d' in the union of B, and then we show that the D and the D' have to be the same.

So that's the property that you want for a function. It's like one thing cannot be mapped to two different things. So if one pair is in, the other pair has to be giving the same second coordinate. So that's how we get that the union of B is a function. So whenever you have...

Another observation is that if B is a collection, a chain of one-to-one functions, then the union of B is a one-to-one function, right? So if B all contains one-to-one functions, it's a chain, then their union is going to be a one-to-one function. And the proof is essentially the same as this one, because to prove that something is one-to-one, you have to take C goes to D and C' goes to D' to D, to the same thing. So there are two different things that go to the same, and you want to show that the first ones, the first things are the same thing, right? But then they're both... proof is essentially the same, because this F and G are one-to-one, so if they both go to the same thing, they have to come back from the same thing. Yeah, so essentially I'll let you guys work out the proof, very similar to this idea right here.

Okay, so and yeah, by the way, just about intuition of what it means to have a chain of functions, it means that all the functions there are compatible, right? That's what it means to be compatible. **Compatible means the same as compatible, which means that they define, they get the same value.** So they are maybe defined on different sets of values, but they always give you the same value. So then when you take the union, they always, whatever in the domain, the union of the domain, you get the same value. So this is a thing to note, the domain of the union of B, which is a function, is the unions of the domains of the F for F in B, right?

So the union of this whole chain is going to give you a new function, whose domain is the union of the previous ones, and the value on each element is determined by whatever function has defined on that domain. And they are all consistent, so it doesn't matter which one you pick. So for an A that belongs to the domain of the union of B, if we take the union of B, which is a function, and we apply this function to little a, we are going to get f of A for any f in B, such that A belongs to the domain of F, right? So that means, yeah, so this new function, which is the union, when you apply to a little element A, what you have to do is just take any function in F in the collection B, such that the little a belongs to the domain, which we know exists because the domain of this one is the union of these guys, and take f of that one. And we'll say, well, there are many options, there might be many f's, such that A belongs to the domain of F, well, you always get the same output because of the assumption that B is a chain, so they are compatible.

It doesn't matter which function you choose here, so that A belongs to the domain, you always get the same output here, so that's why this function is well defined. Okay, so now we have that the union, here is our A, let's copy this guy, so remember that we started with this set A, that we had up here, that is the collections of one-to-one functions whose domain is a subset of C, and your range is a subset of D, and with what we have now, we are in a good moment to show that this satisfied the hypothesis of Zorn's Lemma. So if B, the subset of this collection is a chain, then the union of B is going to be a function, it's one-to-one function by this previous observation, and the domain of the union of B is the union, so the domains of the f's that belong to B, which is all of them, all of these domains are included in C, and the same is true for the range, we didn't show it, but I'll let you guys work this out, it's also the union of the range of f for f in B, which is a subset of D, because each of those ranges are subsets of D.

Okay, so the union of this chain that we took is going to be a one-to-one function whose domain is a subset of C, the range is a subset of D, so we get what we want. So the union of B belongs to A, because it's one-to-one, it's a function, and range and domain are on the right spot.

Okay, so that means that we can apply now Zorn's Lemma, it satisfies that for every chain the union belongs to A. **So here's a set A again, so now by Zorn's Lemma, A has a maximal element, which we're going to call f hat.**

Okay, so since f hat belongs to A, so we know that f hat is a one-to-one function. Domain of f hat is a subset of C, and the range of f hat is a subset of D.

So let's see how that looks like. Well, also what we have essentially, so if here is C and here is D, we may have the domains have to be a proper subset, so kind of somewhere here is the domain of f hat, somewhere here is the range of f hat, and then f hat maps that set to that set, right? The blue part to the blue part, that's what f hat is doing. It's mapping one to the other in a one-to-one way, so it's a bijection between these blue parts. This blue part, f hat is a bijection to these blue parts.

Okay, but what do we want? Let's go back to what we want. We want to find either a one-to-one embedding from C to D or a one-to-one embedding from D to C. So essentially a bijection from either C to a a subset of D or from a subset of C to a whole of D. And here we have a bijection between a subset of C and a subset of D, which is not what we want. But this function f hat is maximal, right?

So what does it mean? So this is what we claim. But since it's maximal, either its domain is the whole of C or its range is the whole of D. So that's the claim. It could not be a proper subset in both sides. One of the two has to be maximal.

And the reason is that if not, this requires a proof, but then I'll just do the picture proof. if not, there will be one element outside and one element outside. And we could extend, we can make the function bigger by mapping this guy to that guy. It will still be one-to-one because we're picking it outside the range. And we have a larger domain. **So we can extend f hat to contain this extra point and this extra definition.**

And we will have a larger function. And this function would still be in this set A of functions. But then f hat wouldn't be maximal, right? if you could extend it, it wouldn't be maximal. So to be maximal means you cannot extend it. **And that means that either you already covered all the domain or you covered all the range.**

And that's why you cannot extend it in a one-to-one way. Yeah. So that's what it means. So that means in, so what do we get? So if the domain of f hat equals C, then we have that f hat is an injection from C to D. So C is dominated by D because we have an injection, a one-to-one mark from C to D.

And if the range of f hat is equal to D, well, then if you go back, the inverse is going to show that D is dominated by C using f inverse, right? Going back. So either whichever of the two is the whole thing, we have a bijection with the subset of the other. **And that's how we get our theorem that any two sets are comparable and THEREFORE any two cardinals are comparable.** See you guys next week.



## 29. Part p29 - Determinacy of Infinite Games

Welcome everybody. **In this video, I want to tell you a little bit about the story of this axiom of determinacy which I feel is a pretty cool axiom and has some interesting consequences.**

**So let's take a look at this determinacy axiom for the determinacy of infinite games.** So this axiom that we're going to be talking about, which we're going to denote full determinacy, is going to refer to the following statement. In every infinite game, one of the two players has a winning strategy.

Okay, so I'm going to explain that in more detail, what that means in a few slides. But that's what the kind of statement we're talking about. Every infinite game, one of the two players has a winning strategy. And what kind of games we're referring to, what have to be two-player games of perfect information, countably infinite and not more. There are a few things you have to specify to make this clear. But let's not get into details for now.

Okay, so what's up with this statement? It's pretty elegant, as we're going to see. It has very nice consequences. We're going to see some of the consequences, and they're pretty nice. And it would say it makes the world a better place, the set-theoretic world a better place. So it's great.

But it has one slight problem. It's false. So, full determinacy is just plain false. What does it mean to be false in the world of set theory? It's not that clear what it means.

So let's see what we mean here by false. It contradicts the axiom of choice. That's the problem with it. So, let's take a look at this a bit better. **So, actually, so without assuming the axiom of choice, we wouldn't show that full determinacy is CONSISTENT.** So, of course, it causes no trouble with the rest of the axioms of ZFC.

This is just assuming some hypotheses that are beyond ZFC, let's say. **Well, morally, this is what the theorem says, that it should be CONSISTENT, unless for the axiom of choice.** So, without the axiom of choice, it might be okay to use it. Though the axiom of choice is a quite important axiom.

Okay, so let's see what the axiom of choice says. So, full determinacy is what we have up there, the same thing we mentioned before. **The axiom of choice contradicts full determinacy, as we mentioned before.** That was proved by Gale and Stewart. In the same paper where they introduced full determinacy, they show that it contradicts the axiom of choice. So, they show it, and it's not that good.

**So, the axiom of choice, as we've been seeing so far in other videos, it says that IF you have a non-empty collection of disjoint sets, you can pick one element from each set.** Okay, so, like, here you have all these sets, you can pick just one, it's a function that picks one from each. Of course, for finite sets, this is trivial. It's interesting when you have, like, large continuum-sized sets, let's say, or infinite sets, and you have to pick one from each. As a human, you couldn't just go and pick one from each. Randomly, you need something to pick them from you, and that's what the axiom of choice does, it picks one element from each, in a non-constructive way.

**IF you had a way of constructively say how to pick each element, THEN you don't need the axiom of choice, because you're actually explicitly saying, building your set.** The axiom of choice is useful when you don't know how to choose them in a concrete way, and you need, magically, somebody to choose pick elements from you. So, let's consider a weaker version of choice that actually works, which is called countable choice. And countable choice is the same as the axiom of choice, but the collection of sets that you're taking elements from is assumed to be countable.

Okay, so that's a weaker version of the axiom of choice. In that one, you have a countable collection of sets, you're picking one from each. It's, you can imagine more than how you would do that. Well, I mean, I don't know what do means here, but you're just picking one from each, it's a countable collection. Well, if you have a continuum-sized class of sets, picking one from each, you couldn't even go in order to pick them. I don't know, you know, how you pick them.

**So, Woodin's theorem, actually, is a bit stronger, and says that full determinacy is CONSISTENT NOT ONLY with ZFC, Zermelo-Fraenkel, without choice, actually it's CONSISTENT with Zermelo-Fraenkel and choice ONLY for the countable set.** So, it's consistent with countable choice. Again, assuming these large cardinal assumptions. So, the problem is when you do have a larger choice to make.

Okay, so, for the determinacy, next time of choice, don't play along well. Why do you say that the determinacy was so good?

Let's see how, what are the conclusions that we get from them, like some examples of conclusions we get from them. **So, a very famous result, called the Banach-Tarski paradox, it's NOT a paradox, it's actually a theorem, that you can prove from the axiom of choice, is that you can break the three-dimensional unit ball.** So, imagine this is like a three-dimensional unit ball, like with everything that it has inside. You can break it up into finitely many pieces, which you can rearrange by translations and rotations, but without making them bigger or smaller. So, you just move them apart, translations, rotations, put them back together, and you can build two balls also the same radius, of radius one, the same as you started with a radius, ball of radius one, and then you might make two balls also a radius one. So, the same, these new two balls look exactly the same as the original one, but now you have two instead of one.

And all you did was break it into finitely many pieces, put them back together in the right way, and now you get two balls. You would say, something is odd here, you shouldn't be able to do that. Well, the axiom of choice lets you do that. One reason is that these pieces are not measurable, they couldn't have a measure. if you hadn't measured, the sum of the measure should be the volume of the ball, and you couldn't double the size. **So, you break it in non-measurable sets in this very smart way, using the axiom of choice, and you manage to build two, and actually you can build two, you can build three, you can build as many as you want, just from one ball.**

So, that is a strange theorem. That's why it's called a paradox, even though it's not a paradox. From full determinacy, you can actually prove that this is not possible. that no such a composition exists. So, under full determinacy, there is no such weird thing, and actually, the reason you can prove this is because you can prove that every subset of R3, or three-dimensional space, has volume. This is a measure which you can use to measure all sets of subset of R3, and therefore, if you have a measure, you couldn't just change, break something, and then create more measure out of nothing, which has to be preserved. So, okay, so full determinants seems to have nicer consequences.

Here's another one. **Using the axiom of choice, you can show that the groups, the additive groups of the reals, and the additive groups of the vectors in R2, in the plane, are isomorphic.** So, there is a map from the reals to R2 that preserves addition, and addition in the reals is addition, addition in R2 is as vectors. These two groups are isomorphic. This is a very strange map. It's very hard to solve.

Full determinacy shows that it's not possible. So, there is no such map. These two things are actually different groups. They are non-isomorphic groups. They behave. They are different.

Actually, it proves something more interesting than that. It shows that all group isomorphisms between complete metric groups are actually homeomorphisms. So, they are topological isomorphisms. And, topologically, R and R2 are definitely very different. That's why you can't get an isomorphism between these two.

Okay, so in terms of consequences, full determinants seems quite nice. **And axiom of choice just brings these weird things.** So, am I trying to look for an alternative to the axiom of choice? Is that what I'm hinting at here? What do you guys think? No, no.

That's not what I want to do. And, I don't think many people are trying that. **So, the axiom of choice is very well accepted in all of mathematics.** And, there are many results in mathematics that use it. And, actually, there are in set theory, actually, where this is all developed, axiom of choice is super important. Like, the majority of theory of cardinals use axiom of choice quite a bit.

**So, nobody is trying to get rid of the axiom of choice here.** Full determinacy, on the other hand, has no claim here because, if you think about it, I mean, every infinite game has a winning strategy. I mean, it's nice, but, I don't even know if you have a clear intuition of why that should be true. Every infinite game has a winning strategy. I'll give you some of that intuition in a little bit. So, what are the things we care about?

So, for instance, can we get a partial version of determinacy that is true? So, that could be useful because determinacy is pretty useful. Full determinacy might not be true, but maybe some partial versions are and that's going to be the case. So, there is a recent study, there are studies on set theory of how much determinacy can one actually prove in ZFC, which one can prove some amount of determinacy and can we rescue some of its nice consequences? So, these are interesting questions despite the fact that full determinacy might be too much to assume. So, let's see, let's take a look at this.

So, before going into those results, let me just give you an idea of how determinacy works in finite games before we go to infinite games. So, when I talk about finite games, I'm not talking about the game of soccer or basketball. I'm talking about games like this. Chess, checkers, goal, reverse, connect four, tic-tac-toe, etc, etc, etc. That's the kind of games I'm thinking. So, these games, if you want to formalize what they mean, they are games between two players that play one after the other.

At each point, the player has only finitely many possible moves in the case of finite games. In the case of infinite games, you want to have infinite possible moves. In the case of finite games, each game must end after a finitely many moves. You cannot go forever. And the outcome of the game is fully determined by the moves that the players make. There is no randomness involved.

There is nothing else. There is nothing coming from the outside that's going to affect the winner of the game. It's only 100% determined on what the moves are.

Okay? So, like, in those games, chase and checkers, etc. **So, it's an old theorem that says that in any such game, one of the two players has a non-losing strategy.** So, what's a strategy here? So, by strategy, I mean a function that tells you what to move next given, as an input, what has been moved so far.

Okay? So, that's a strategy. A strategy is a function that it's always saying that it tells you that you input what's been done so far in the game and it's going to tell you the next move. So, that's what I mean by a strategy, a function like that. And, by not losing strategy, just being picky because in some games there are ties, one wins, one wins, there is a tie. if there are no ties, then you have a nicer game that says one of the two players has a winning strategy.

Okay? So, that's the thing. One, always, either the first player or the second player must have a winning strategy. if there are ties, then all you can guarantee is that you have a strategy that is going to allow you not to lose, at least for one of the two players. I mean, they cannot both have winning strategies because, well, one of them has to win. By the way, what is a winning strategy?

So, a strategy is that, it's a function that tells you what to move. Next, a strategy is said to be winning if it doesn't matter what the other player does. if you follow the strategy, you are guaranteed to win.

Okay? So, a winning strategy is a strategy that always wins, doesn't matter what the other guy does. So, for instance, you couldn't have both players have a winning strategy because if they all follow the strategy, well, one of them is going to win. So, one of the two strategies didn't work. So, a winning strategy must work every single time.

Okay? **So, almost one of them can have a winning strategy and this old theorem says that always, at least, one of the two guys has a winning strategy.**

Okay, so, let's give a proof or a sketch of a proof of why this is the case. So, first, we have to make this observation and that every finite game can be viewed as a tree. What do I mean by a tree? Like that. So, here is tic-tac-toe and here is chess. So, here in the game, so, you start with the starting position and then for the next move you have, I guess, nine possible places where you can place it and I guess all these nine moves are equivalent to one of these three.

Either a center, a side, or a corner and then after that the opponent, now, circle, has a bunch of possibilities where to move next and it depends on each case more possibilities and then after that more possibilities for now for the first player and then for the second player and then this is a tree that is branching down and at every step there are only finitely many possibilities and it ends after finitely matching. Right? That's the final game and the same with chess. I guess you start with the starting position. That's not the starting position. You start there and then there are all the possible moves there are many that are a few dozens and then from there you have a few more possible moves and then more possible moves and then more possible moves it gets pretty big.

The size of the size of the tree for chess is pretty huge. 10 to the 80 are around up there pretty huge. Yeah. Around in the scale of the number of atoms that are in the universe that will be the size of the tree for chess is still a finite trick.

Okay.

So every game can be represented as a finite tree so now we can think of a tree and essentially what you're doing in the tree every time you make a move you just go down the tree and then the other one goes down the tree you go down the tree your opponent goes down the tree and then that eventually ends and when you end you look at the position and then you say oh who won so at the end of the tree is called a node a leave when the tree ends at each leave one of the two players is going to win depending it's red and blue and the way so you start up here and then so player red plays first player one is player red then player blue is going to play next one of those four and then player red is going to play and then it's going to end the game when you reach one of these squares and they are painted like this like the red square means that red wins and the blue squares mean that blue wins so for instance suppose so you start up here now let's say player red plays up here and now it's blue's turn blue if he plays to the right he's going to lose so he's going to play to the left now it's red turn and red comes up here and

Then blue comes up here and blue wins alright so there can be many possibilities for this game you play until you end and then that's it okay so now we want to figure out the winning strategy for this game I recommend you guys pause the video right now and try to figure out the winning strategy before you move to the next one so winning strategies how should you play this game to make sure you win and who is going to win red or blue okay okay so if you pause the video welcome back now let's go and try to see solution so okay so let's look at this guy so right here if you ever get to play here if you reach to this point it's blue's turn after that and blue is going to win because blue is going to play here so if you reach here this is blue won already because blue has for sure has this move if you reach here the same thing blue is going to win from there because you can play here from here though blue cannot win because both options both of his moves are red so red is going to win here and if you get up here then blue can win again now we can look at the next level and here blue has the option to win well but red has no option

Because whatever red plays is going to lose right here because they're both so red here now has an option so red can play here it's this red's turn so red this is a red node blue here has no option both are red both are blue so red here has no option both are blue and red here just plays here and wins yeah so you have to see like in this case of these moves is red's turn if she has the option to play to a red node she wins if she has no option to play to a red node she loses and now in red in blue's case you have to look at whether it has the option to play to a blue node like in this one and this one so blue wins and then we end up with blue winning okay so and how is that blue wins well you have to stay within blue so red has no option but to move within blue either here or here now blue turn has option to stay to stay in blue now red has no option but to move to blue and now blue has the option to move to

So you can do this with any tree same thing you start painting all the nodes from the bottom up you're going to end up with the root being either blue or red and that's the winning that's the guy who's going to win and just follow the strategy okay so we have that in all final games one of two pairs has a winning strategy let's now see what happens with infinite games this is where things get a bit more interesting okay so we're going to start with the case of what is called closed games here's an example imagine you a white king against four black knights and the question is can the white king escape forever so the four white the four black knights are going to be trying to checkmate the king and the king can move around and either eventually there is a strategy that is going to make it's going to get the four knights to surround the king or the knight will be able to escape forever which is the case I'm not going to think of a particular case you can think about that one I made it up so it's not that easy to look at though it's quite interesting

So more generally a closed game is played on infinite tree so remember we had the finite trees where every finite game could be seen as finite tree now we're moving to infinite trees so that means they can be infinitely branching so in each move you have infinitely many choices and the length is not finite they can keep on going and keep on going infinitely many steps and a closed game is a tree it's not the full binary tree or it's not the full infinite tree the tree here in this picture is only the part that is colored only the part that is either blue or red and then it ends so the tree may have end nodes like it might stop there and there may stop there or in some positions it might if the game goes forever then player one wins if you ever reach an end node and you cannot move anymore then player two wins okay so such games are called closed games because actually this is a topological reason where there are closed sets showing up here and

Then the example with the knights the knight and the four kings the king and the four knights is such an example in the original paper Galen Stewart showed that in every closed games one of the two players has a winning strategy the proof is not that difficult and I encourage you to pause and read this and try to figure it out if this makes sense and you can come out with a proof out of that it's quite fun it's a nice proof okay so closed games one of two players has winning strategy so the theorem about final games can be extended to closed games what's the general setting the general setting is like this so now we still have an infinite tree and again it's infinitely branching so assume that first move we label the first move 0 1 2 3 there are infinitely many possibilities one for each natural number and then for the second move it's again infinitely branching so forth so again you play a number and so on and so forth every time you have infinity branching you go infinity deep and so this set n to the n is what we call the space of all the infinite sequences of natural numbers okay

So there are functions from the natural numbers to the natural numbers in other words sequences of natural numbers and we start playing by fixing a subset of the set of sequences of natural numbers okay which we denote up here if you notice that if you go down the path from some tree like we do 1 2 3 5 I guess 17 and then you just keep on going down the path choosing number at the end we're going to end up with a sequence of natural numbers and then so each point in here each point represents a sequence of natural numbers at the end of the path of a tree so okay when they play we know players play natural numbers alternatively so they are going down the tree essentially player 1 chooses the first number which might be 1 here then player 2 chooses the second number and 1 and player 1 again a number and so on and they keep on going down the tree like this and then at the end of times after infinitely many steps we end up with an infinite sequence of natural numbers okay we have the sequence and now we ask is the sequence in the set A that we started with if it is

If the sequence is in the set A that we started with we say that player 1 wins if it is not we say that player 2 wins okay so that's the game we fix A ahead of time and then player 1 is going to try to get inside A player 2 is going to try to get outside A and each different set A of sequences is going to give us essentially a different game okay so so the game the particular game you're playing depends on this set because this set is telling you which are the winning positions okay so player 1 wants to stay inside A player 2 outside the set so in this case essentially the red player 1 is the red one the red things here represent the set A so player 1 is trying to fall inside one of these red points player 2 which is blue is trying to fall inside one of these blue points what is a strategy? a strategy is a function from the set of finite strings of natural numbers to the natural numbers and essentially it's because remember a strategy is a function that tells you what to play next given what has been played so far what has been played

So far is a finite sequence of natural numbers the finite it's a string of natural numbers right because so far you only played finitely much of these three so this function tells you what to play next given what's been played so far what do you play next and then okay so that's the same thing again and then we say that a strategy is a winning strategy for player 1 if it doesn't matter what player 2 plays the strategy always wins so formally this is said as for every N1, N3, and N5 look at this is essentially what player 2 plays N1, N3, N5 so for all possible moves like player 2 if we consider the sequence where player 1 is following the strategy so S of N nothing player 2 plays N1 player 1 follows the strategy player 3 plays N3 now player 1 follows the strategy now with the inputs N1 and N2 and so long as player 1 follows the strategy the sequence that you get at the end belongs to the set A meaning that player 1 wins and the same for player 2 so S of winning strategy for player 2 if we're all N0 N0 and N2 and N4 so on and so forth

If player 2 follows the strategy the sequence that you get does not belong to A and therefore player 2 wins okay so that's a strategy it's a function like that we say that a set of sequences is determined if this corresponding game in this corresponding game one of the two players has a winning strategy okay so determined means that so if each set remember each set of sequences determines a game and the set is determined if either player 1 or player 2 have a winning strategy to win the game so the statement of full determinants that you were mentioned before says exactly this all subsets all sets of sequences are determined and what would not happen actually using choice and from the things we saw so far is that some sets of sequences are determined like for instance the closed sets we proved that Gale Stewart proved that if A is a closed subset of N to the N then it is determined and within choice you can show that some other sets of sequences are not determined and neither of the two players has a winning strategy what can we say about that so

Here is let me mention just the main results and in this respect so okay so we said full determinacy is a statement that says all infinite gates undetermined and that one is false if you assume choice so okay that's not that good contradicts X-Miles choice Borel determinacy is a statement that says that all Borel games are determined okay so if your set is A is Borel then the gain that corresponds to this is determined the Borel sets for the ones that people who know are built out of closed sets by using countable unions and countable intersections so anything you can build by taking countable unions and countable intersections and countable unions again and countable intersections again starting from a closed set and I guess you can take compliments too is a Borel set okay so it's a pretty large collection of sets used quite a bit in measure theory and in regular math like the great great great majority of sets that are ever used are Borel in analysis in measure theory and you rarely go beyond Borel sets sometimes you go mostly to see examples of weird things

But a very large majority of sets that you can construct are Borel and a determinacy for Borel sets is actually true you can prove it just with the axioms of Z of Z and you only need I guess countable choice so this is a result proved by Martin very big result and very important because it means that determinacy is actually true for infinite determinacy so for a lot of games so a lot of infinite games are determined so long as it's the Borel and then here's another interesting result this is a bit more technical what L of R means L of R means the class of all constructible sets over the reals everything you can build in a constructive way and there is a very formal definition of what that means which I don't want to get into it but essentially it's everything you can build without using choice so sets that you can just build by I don't know defining things and then using the subset axiom and then using ordinals and transforming recursion and using any real that you want to use it's a parameter so it's everything you can construct

Essentially in set theory and it's actually very general anything you think that I can construct it's going to belong there but if you need to use the axiom of choice at some point and say oh just give me a choice function for this that's not constructible okay so all the sets that are constructible this is a much larger class than Borel the statement that says that all of those are determined may be true so if you take some assumptions that are a bit beyond ZFC but that most set theorists believe should be true whatever that means then you can show this is actually true right so the assumptions go beyond ZFC so it's not obvious what that means that it's true but yeah it's usually believed that yes these guys are true so essentially every game that you can construct will be determined one of the players can have a winning strategy while there are cases when you can use choice to build games which don't have winning strategies and

Then you get some very nice consequences for these results you get for instance that all constructible sets of the space of Rn n dimensional vector space are measurable you can assign a volume to these things and you can get weird things so long as the sets that you're dealing with are constructible so if you're proof you're building the sets fine you're not going to find any weird things the continuum hypothesis holds for constructible subsets of R so if you take a subset of R it's going to be either countable or have the size of reals so you don't have intermediate things you don't have subsets of R whose size is in between the natural numbers and the real if you restrict yourself to constructible subsets of the reals you also don't get no group isomorphism between these two spaces like the line and the plane which is constructible so these are essentially you can prove these things depending on what your assumptions are what constructible what you let constructible be but these are things you can somewhat prove so you can use these things

So even though full determinacy we cannot adopt that as an axiom if you want to assume choice we still get pretty nice results out of it all of these guys and by the way let me just mention sometimes it is used as an axiom like people say what happens in the case when you have full determinacy and you only have countable choice and not the full axiom of choice and yeah there is some work down there and it's some interesting space that he gets I mean just in world universe see you guys later



## 30. Part p30 - Versions of the Axiom of Choice

Welcome everybody. **So this week we're going to be talking about the axiom of choice.** We were talking about cardinals and we are still in the middle of the cardinals but to be able to move forward we need some results that really use the axiom of choice. So it's a good point to kind of stop and look at the axiom of choice more deeply. So we have seen a couple of statements so far for the axiom of choice which we showed there were equivalent and now we're going to see a few more. So here are all the statements we're going to see.

**We're actually going to see six statements for the axiom of choice and we're going to prove now that most of them are EQUIVALENT and THEN we're going to leave a few for later.** Okay, so the first one is axiom of choice form 1 that we saw towards the beginning of the course that says that if you have a relation then there's a function with the same domain, it's a subset of the relation, right? And you guys remember the picture. We have a relation from one set to another, well the domain to the range. And in relation, points are connected to points but one set, one point might be connected to many other points. In a function, a point from the domain can be connected to almost one point from the range.

So for instance, this point is connected to three points in the range and that's not good. if you want a function, you cannot have a function to map one thing to many things, you can only map it to one. **So this version of the axiom of choice tells you that there is a subset, a subrelation, which chooses one of the images for each point.** So for instance, for this one, it has to choose, let's say that one, it could be either. For this one, it can be choose that one. For this one, that one.

And now every point in the domain is still in the domain of the function. not every point in the range is in the range of the function, that doesn't matter. And the function is a subset and now we have a function, okay? So that's form one of the axiom of choice. Form two is the one that we saw also before about infinite Cartesian products. So what it says here, let's rewrite this, you're giving your set i of indices.

And for each i, we have a set. For each element of i, we have a set. Right? So if this one is i, then here is h of i. Right? **And now, what this axiom is saying is that the Cartesian products of the h i is NOT empty.**

So then, in other words, this is saying that there exists a function f with domain i and with the property that f of i belongs to h of i. So the domain of the function is all these points right here. And for each point, it chooses one point in h of i. The Cartesian products right here was defined to be the set of all these functions. All the functions with whose domain is i and they go at each point on the right set. **The definition of the Cartesian product is fine.**

**What the axiom is saying is that this Cartesian product is NOT empty.** So that there is at least one function with domain i in that property.

Okay? So actually, there are going to be many. Once you have one, you can prove that there are lots. **But just choose one requires axiom of choice.**

**Third form of axiom of choice, which we actually used in one of the lemmas.** It says that if you have a set A, you can find a map, capital F.

Now what it does is whenever you take a non-empty subset subset of A. So remember this set up here is a set of non-empty subsets of A. The function is going to give you an element of A. So you input a subset and outputs an element with the property that the element that it outputs belongs to the set. So it's going to be inside here.

Okay? So whenever you choose another set, C, here is going to be F of C. And whenever you choose another set, D, F of D might be anywhere inside. Somewhere there. Of course, you need to take non-empty sets because you cannot choose an element of the empty set. But for all the other ones, you can pick an element inside.

Okay? So that's the other form. Whenever you have a subset, just choose an element within that set. And the way you use it usually is you can put all the sets you're working with. Just put them all in a single set. And then those are the subsets.

And then for every set, we can pick an element inside. Form number four says that if we have a collection A of non-empty sets of disjoints. So it's what is called... Well, if you take the union of all A. This is a partition. There are all disjoints.

And what it says is that you can find this set C, which picks one element from each. Okay? So for each element A of the collection capital A, so like, let's say this one is A. C consists of all the little dots, all the red dots. This is the only one that belongs to both little A, Roman A and C. Right?

So for each one you choose, it intersects each of the elements of the partition only once. That's form number four. Five is the one we saw last week, which says that if you're having two sets, one has to be... There must be a one-to-one embedding a one-to-one map from one to the other, or from the other one to the one. One way or another. It has to be a one-to-one map.

Right? So this is what allows us to conclude that between any two cardinals... if you're given two cardinals, one has to be less than or equal the other one. They cannot be incomparable. They have to be comparable in sizes. And the last is the SORN lemma.

**The SORN lemma, that also we saw last week, says that IF you're given a collection of sets, and by that I mean just a set of sets, and by that I mean a set.** Everything. Everything is a set of sets. Everything. Because everything is a set in our world of set theory. And it satisfies the property that whenever you have a chain included in it, the union of the chain also belongs to the collection.

Okay? So remember a chain is a subset such that all the elements inside are comparable and their inclusion. So B is a chain if whenever you take two elements from it, one must be included in the other as a set.

Okay? So the hypothesis is that whenever you have a chain that is a subset of your collection, if you take the union of all these nested sets, they are all nested. They are all included in each other. So the union is kind of like a supreme thing. if they're all included in each other, take the union, then that one is also in your collection. Right?

So your collection is a property of your collection, being closed under this union. You can think of it as kind of being closed under limits because these kind of unions are if you have a collection of sets that are growing, growing, growing, growing. The union is kind of like the supremum in a sense of these things. Right? **And the property of the collection is that whenever you have such an increasing union, you might think of them as a converging sequence, the limit also belongs to the collection.** Right?

So the collection is closed, undertaking these supremum of chains. then you can conclude that it has a maximum element. It's an element of the collection that has no elements greater than it in the collection. It's maximal within the collection.

Okay. **So these are the six formulations for the axiom of choice.** And let's start looking at how is that they imply each other.

So let's start proving that one implies two. So here I wrote one and two again. We did this already, but we can do it again. Um, so in this one, um, you have to show, so we want to prove two. So that means we have to start assuming we are given such a function H that, um, like this one right here. So we are given a function H like this one.

And we have to now, um, somewhat use number one to build such a function F, right? So this, because this, uh, part two says that exists a function. We have to use that, uh, number one to build such a function. And if you look at number one, it's already about functions existing. So I guess we just have to, uh, create the right setting so we can apply one. So that means we, we need to create the setting for one.

So that means we have to define a relation to which we can apply number one. So we consider the relation that consists of all the i's coma, uh, H such that H belongs to H I.

Okay, so that is a set of pairs. So it is a relation and the domain is I.

Now use one to get a function F including the relation with a domain of F equals domain of R, which is I. And notice that, um, so what do we have? Uh, for each I in I, we know that, um, the pair I comma F of I, which belongs to F. **That's actually the definition of F, NOT the set of pairs.** The, the, the graph is a subset of R. So see, if things, uh, I comma F of I belongs to R, we have that F of I belongs to H of I.

That, that is because these are here. Okay. So that's how we find the relation. We only put the pairs such that the second one component, the second component belongs to H of I, where I is the first component. So you must have this. So this is H.

F is the one that we want. So F belongs to the Cartesian product of H of I, and that's why it's not M.

Okay. Good.

Let's now prove that two, the one about Cartesian product, implies four. Which says that for every node empty set A, which is a collection of sets that are disjoint, I can find a set that intersects each element of the collection exactly once.

Okay. How would you guys think of doing that?

Let's draw the picture again. Well, here is the picture. This is what we have. So we're giving a collection A of disjoint sets like that. I guess the thing that is drawn here is the union of A and the union of A being partitioned by the elements of A. And we want to pick one from each.

And what we're given is that the Cartesian products are never empty. So somewhat we have to build this. What is the function H that we want to apply part to? So that the fact that the Cartesian product is not empty is going to give us the elements that we want. So let A be as in four. We want to define that.

So what is the function H that we are going to define? Essentially, here is a tree. So we let H be the identity of A.

Okay. So what do we mean by this? So domain of H is A itself. Right? The identity of A. So that's the domain.

So those are our indices. And for every A in A, H of A is just A, which is a set.

Okay? So if you input, for instance, this red set A right here, H is going to output the red set A.

Okay. So to be able to apply the part two, we need to know that all the H of I's are not empty. But we know that because these guys are not empty.

Okay? So what is that now? So what is that part two gives us? It gives us a function F with domain of F equals I, which in this case is A. And for all A in A, in the index set, F of A has to belong to H of A. This Roman has to belong to H of A, which is actually equal to A.

Okay? So what our function is doing is, the function takes the set, like the red set here, and picks a point inside.

Okay? So for each of these sets in the partition, picks a point inside. What we want for number four, we don't want a function, we want a set. Right? So what is that we take? Well, take C to be the range of this function F.

Okay? So this is giving us the points that H is picking. Yeah? And then observe that C intersection A is what? Well, it's exactly H of A. That is the only point that belongs to the intersection.

Because H of A belongs to the intersection because it's in the range and it's in A. By, this is the only point that belongs to the intersection. On the one side, it belongs to A. And it belongs to C because it's in the range. And there is no other point in the intersection because all the other points in the range, they come from a different, from a different set of the partition. And they are all outside A.

Right? So if you take another set B, its image is going to be not in A because they are all disjoint. That's where we use the fact that they are disjoint to make sure they intersect in one. if they weren't disjoint, we might not be able to make sure they intersect exactly at one point because maybe they are one inside the other and it gets complicated.

Okay, so that's how we put 4. Now, we want to go back and we want to do that 4 implies 3.

Okay, 3 tells us that for every non-empty subset of A, like the B, the C or the D here, what the function is doing is picking an element of that subset. But now, this is for every subset of A and these guys are pretty much not disjoint. Right? We are taking all the subsets of A and they don't need to be disjoint at all. Right? So, number 4 though, our assumption though works only for disjoint sets.

So, we need to figure out how to make our domain of the function a bunch of disjoint sets. And of course, A has to be non-empty. So, how is that we make these sets not? We need to define our collection of sets A so that we can apply number 4 to it. And this is what we are going to do. We take all the non-empty subsets of A and we do this thing which is kind of force them to be disjoint.

Right? So, when we do this thing up here, essentially what we are doing is we are taking the set of all pairs where the first element is the set B and the second element is a member of B.

Okay? So, if we had our set B up here, we are attaching to each element like a little flag that is B. So, this new set that we get here is very similar to the set B except that all of the elements are attached the same, like a little flag, this capital B, which is the name of the set. All of the elements are attached to the same thing. But the trick now is that if B and C are subsets of A that are not empty and they are different, then B equals B intersection C cross C is empty. Because all the elements here, they are pairs and the first coordinate is B and all the elements pair and the first coordinate is C.

So, they have different pairs. But in this one, if you ignore the first coordinate, we essentially have B. And in this one, if you ignore the first coordinate, we essentially have C.

Okay? So, now all these sets are disjoint. So, now we can apply 4, which intersects each of these in one element.

Okay? And now, for each element of the collection, we have that C intersects B cross B at exactly one point. Yeah? So, that means there is a UNIQUE B in B such that the pair B, B belongs to C. So, that is exactly what we want. So, now we have a function.

Yeah? Okay? So, let F be the set of pairs B comma B such that B belongs to the power set of A minus the empty set and B comma B belongs to C. It's a UNIQUE one. That's the image. That's the one that we want.

I guess we could have said let's F equal C because C is already the graph of a function. But actually, C might not be the graph of a function because C might have extra stuff. I guess number 4 doesn't say that it doesn't have extra stuff. So, here we are removing the extra stuff essentially. But, yeah. So, C is essentially picking you one element from each set.

So, we force them to be these joints and now the C picks one from each subset. One element.

Okay? And finally, we need to show to close the circle at least among the first four that 3 implies 1.

Okay? So, now we know that for every set A there is a function that picks an element from each subset. And now we want to get that every relation has a subset that is a function. So, we are given a relation R. We want to define F. And we want to figure out what this set A is.

Okay? And all we're going to do is we're going to let this to be the range of the relation R.

Okay? And now what we're going to do is the following. So, little a in R. We want to define F of A. Right? But we want it to be such that A comma F of A belongs to the relation.

Right? So that, right? I mean, that's what we want when we say that the function is a subset of the relation. So, in other words, what we want is that A belongs to the set of all the things that are related to A.

Okay? Which we call R A in some earlier video weeks ago. Remember? So, what is this guy? This is the set of all the B's that belong to the range of R such that A comma B such that belongs to the relation. Yeah, it's a set of all the things that are related to little i, the A.

Okay? So, essentially we want to just pick one element from this set or from all the possible ones that we can. So, there are many possible ones that are related to little a. We want to pick one. So, we have our function. So, our function before gave us that.

Let's call it something else. So, let's let H be the function given by 4, by 3, sorry. So, which picks an element from each subset. And then finally, we let F of little a to be the element that H picks off the set A. So, among all the possible ones that they can pick, H is going to pick Q1. And that's the function that we want.

Cool. So, what have we done so far? So, we started proving that 1 implies 2. And then we prove that 2 implies 4. And then we prove that 4 implies 3. And then that 3 implies 1.

So, we now have that all those 4 are equivalent. **So, IF you remember last video, we proved that Zorn's Lemma implies that all cardinals are comparable.** Right? That we did that one last week. So, what we're going to do today now is to finish and prove that Zorn's Lemma implies 1. And therefore, the 4 of them all together.

And we're going to be missing that the 4 of them together, 1, 2, 3, 4, imply 5. Okay? So, we're going to be missing and 6. **And we're going to leave that for a few weeks from today when we see ordinals, which are going to give us the tools to prove Zorn's Lemma and cardinal compatibility.**

Okay. So, let's finish doing 6 implies 1. So, we want to do here 6 implies 1. And this one is actually quite simple. **So, as usual, when we use Zorn's Lemma, what we need to do is define the collection A.** So, let A be the set of all F of functions.

And let's apply it correctly. Let F be the set of all the subsets of the relation. **And IF you want to apply the subset axiom correctly, you have to say belongs to the power set of R. same thing.** But belongs to is the correct way of applying subset axiom such that F is a function.

Okay? So, we have all the subsets. And now, if you want to be able to all the sub-functions of R. So, this is the elements of this collection A are things that are functions and are subsets of R. Those are the two things we're asking. And we're not asking anything about the domain of R being the domain of F.

**So, we're going to want to get that from the maximality, from Zorn's Lemma.** Okay? So, how are we going to do that? Well, first, to apply Zorn's Lemma, we need to know that we are in the hypothesis. So, that if we have a sub-chain of A, then the union of the chain belongs to A. So, we showed last week that the union of functions is a function.

That the union of a nested, called it a chain of functions. Right? So, we know that the union of the chain of functions is a function. And also, if we notice, this is very simple. if, for every F that belongs to B, F is a subset of R, then the union of all B is also a subset of R.

Okay? So, now, if you have a chain, it's a subset of A, then the union of B must be a function, and it must also be a subset of R. So, the union is going to be also an element of A.

Okay? **So, IF you have an increasing collection of functions, increasingly because it's a chain, increasing collection of functions, which are all included in R, the limit, the supremum, the union, is going to be a function, which is also included in R.** So, we satisfy the hypothesis of Storrs' lemma, so we can apply it. A has a maximal element, which we can call F. So, we know F is a function, F is a subset of R, just because it belongs to the collection calligraphic A. And now, the last thing we need to show is that the domain of F is the domain of R.

How are we going to do that? if domain of F was a proper subset of the domain of R, we could increase the function, right? So, let A be any element of the domain of R minus domain of F. Let B, since A is in the domain of R, is connected to something, right? B such that A, B belongs to R. It has to be something like that.

And now, if we let F union the pair A, B will also be a subset of R, and will also be a function. It will be a function and a subset of R, so it will be in our collection. And this will contradict the maximality of F, maximality of F.

Okay, because we are adding one more thing to F, and we are still in the collection. But since it was maximal, we couldn't add anything. **And the fact that it couldn't add anything means that there CANNOT be...** It cannot be that the domain of F is larger than the domain of... A smaller, strictly smaller domain of R, because otherwise you could put something else. So we must have that if you have a maximal element, the domain of F is equal to the domain of R.

And that's how we get that 6 implies 1 and implies all the other ones. Okay, we will continue in the next video.



## 31. Part p31 - Every Vector Space Has a Basis using AC

Welcome back everybody. Okay, so in the next two videos, let's see two applications of the axiom of choice. **The first one is an application using Zorn's Lemma and the idea for this one is to prove a very basic theorem of algebra, I guess of all of math actually, that every vector space has a basis.**

Okay, so please, if you don't remember what this is, stop the video, go back to your notes from algebra to review what this is, because we use vector spaces in this one. So let's start considering a vector space.

So let's V be a let's call it K vector space, where K is a field, right? **For every field, we're gonna have a vector space over that field and let's just recall what the basis was.** A subset B of V is a basis if it is linearly independent and And the span of V is the whole thing. The span is everything you can get by a linear combination of elements of V.

Okay, so our basis was that. **It's linearly independent and every element of the whole space can be written as a linear combination of elements in the base B.** So a basis is a class of set of vectors and another characterization of basis is that every element of the whole vector space V can be written in a UNIQUE way as a linear combination of vectors in the basis and that's because of the linear independence. You get the uniqueness from the linear independence and that's why they are so important because they give you a representation of each vector in terms of the ones in this basis as basis in a UNIQUE way So how is I use Zorn's Lemma to get such a basis? Well, we have to start defining what's our collection of cells. So we start by taking all the sets of vectors such that which are linearly independent Okay, so now we need to show if you want to use Zorn's Lemma that the union of every chain is belongs to the set.

**So we claim that the union belongs to A so that the union of this chain is linearly independent.** So how do we show that? Well, let's prove linear independence. So consider vectors V1, VL that belong to the union and little elements and scalars K1, KL that belongs to the field such that the sum of KI times DI I equals 1 to L equals the zero vector, right? if you want to show that a set is linearly independent, you have to consider a linear combination of the vectors and show that that all the coefficients are zero, right? That's how you prove linear independence.

Okay, so these guys, these vectors belong to the union, right? So each BI belongs to some BI that belongs to B, right? Because if you belong to the union, you must belong to one of its members Now, there are only L of these sets and they're all nested because they copied this collection B is a chain of linear independent sets. So if you have a chain and any two elements are well, one associate of the other one, so it's the largest one. So so let B be the largest of the B sub I's for I between 1 and L, right? So they are all nested.

It's the largest one and that one belongs to to I and I is linear independence and V1 and VL, they all belong to I. **So that means that from here we get that all the KIs have to be zero because they belong to this linear independent set I.**

Okay, so essentially what's going on here is which happens in a lot of cases when you apply Sohn's Lemma. So the property of linear independence is a property about finite subsets, right? So it's a property about finite tuple of vectors, B1 up to VL. So for all finite tuple of vectors, B1 up to VL, everything in a combination satisfies is non-trivial. So what you get is that when you're applying something up to the union of this chain, but since what you care is about finite tuples of vectors, the finite tuples must belong to elements of the chain and they have a maximum because they are all nested. So they all belong to one single element in the chain.

And then since that element is linear independent, then the property you want this vector satisfy the property you want. Right, so this is very common. **And so here we have that the whole union has to be linear independent and THEREFORE we can apply Sohn's Lemma.** There is a maximal, by Sohn's Lemma, there is a maximal linearly independent subset of our vector space as a maximal element of this set calligraphic A of linear independent subsets. And now we claim that B is a basis. Actually, if you remember your linear algebra, another characterization of being a basis is to be a maximal linear independent set.

So we have it right here. **The reason why is that is because IF B wasn't a basis, so IF the span of B was NOT everything, THEN you can add something to B and you will have a B element.** So otherwise, if the span of B wasn't the whole thing and we could choose a vector from it, we will have that B union, this element would also be linear independent. So you could add a new element and have a larger linear independent set contradicting the maximality of B. Right, so it couldn't be that it doesn't span the whole thing. Sorry, because otherwise you can have a bigger basis.

**So the fact that it maximal implies that it spans the whole vector space and that's how you get the basis.** Okay, so this and this actually this theorem is actually equivalent to the axiom of choice. So we can add this one actually to number seven to another equivalent. And it's definitely an important statement in linear algebra, not that every vector space has a basis. So here we're going to use a corollary of these results in our next here, right here. So the corollary is that there exists an isomorphism between R viewed as a group with zero and plus and R squared viewed as a group when you add with additional vectors where plus is additional vectors.

So if you have this vector and this vector and you want to add them, you're going to get the addition of the vectors, which is somewhere there. Yeah, so R squared is also a group if you add in vectors. As groups, they look very different, right? One is just the real, one is flat, it's unidimensional. The other one is a bi-dimensional group of vectors. It's a group, right?

You have inverse vectors and stuff. **And the corollary of the theorem is that they are isomorphic.** So the corollary claims that it's a bijection between R and R squared, which maps zero to zero. That's what it means to be isomorphism of groups. And also, if you have two elements of R and you add them together and then apply F, it's the same thing as first mapping them to the other side and get the corresponding vectors, and then add those. Yeah, that's so those two things is what it means to be an isomorphism of groups.

How do we get these? Well, the trick is to view R and R squared as Q vector spaces. Q is a field, yeah, and R and R squared are both Q vector spaces, right? You can multiply by elements of Q in the obvious way. An addition is the one that just mentioned right there. With that addition and scalar multiplication by elements of Q in an obvious way, you can view them all as vector spaces and they have the same dimension.

What does it mean to be the same dimension? Well, to have a dimension, dimension means the size of the basis, right? **So they both have infinite dimension over Q because there is NO finite basis over Q that is going to give you R or R squared.** So, but to have dimensions in the infinite case, you need to have basis. So the previous theorem is the one that tells us that every two vector spaces have a basis. And then that's why we can say the same dimension.

So we can consider the basis for these two guys and over Q, right? So these are as vector spaces over Q. And now is a claim that we're not going to prove today, which is that the cardinality of the base one is equal to the cardinality of the reals and is equal to the cardinality of the base two, right? So we know that R and R squared, we're going to prove that R and R squared have the same cardinality. Actually, we proved that last time. **But we're now claiming that the basis have the same cardinality.**

**And I guess the dilemma that you need to prove here is that IF your field is countable and your basis is infinite, THEN the cardinality of the span of this basis is equal to the cardinality of the basis.** So when you do a span of an infinite set over a countable field, it doesn't increase the cardinality of the basis. So that lemma we might prove next week. So we don't have the tools yet. But okay. So you can kind of believe that the basis that we need for R and R squared as vector spaces over the rationals have to have the continuum size.

So once we have the same size, we get, we take bijection, F from B1 to B2, any bijection, they are equinumerous, so we can take a bijection, and then extend bilinearity to an isomorphism from R to R squared. **Yeah, remember that whenever you have, since every vector in R is a linear combination over Q of the elements of B1, you map the elements of B1 through the bijection, and THEN you use the same linear combination on the other side, on the square side, and since they're both bases, you're going to get an isomorphism.** And this is an isomorphism of vector spaces. Yeah, the vector space contains zero, contains plus, and contains scalar multiplication. So in particular, it's an isomorphism of groups. So in particular, you have that it satisfies that, actually satisfies more than that.

It even preserves multiplication by rationale, the embedding that we get from here to here, which actually follows from this part up here. So yeah, these two guys, even though they look quite different, are isomorphic as groups. **And actually, we're going to see, and I'll mention later, that it actually requires the axiom of choice to show that these two guys are isomorphic as groups.** So you couldn't actually find an isomorphism, you couldn't build an isomorphism constructively. So there couldn't be a construction, which doesn't use the axiom of choice for that isomorphism. So somewhat in the middle, you have to use the magic of the axiom of choice and say, oh, choose this and this and this, do this infinitely many, continue many choices to get these bases and the isomorphism.

But there is an actual way of describing any of the isomorphism between these two guys. See you in the next video.



## 32. Part p32 - There Is No Measure on All Sets of Reals

Welcome back everybody. So now we're going to look at another application of the external choice. The previous one, showing that every vector space is a basis, is in a sense a positive application, right? **Because it gives us a basis, gives us a useful thing for all vector spaces.** This one is kind of like a negative one. This one it tells us that something is not as good as we would like.

So essentially it says this that I'm saying there, that it's impossible to measure all sets of reals. And let's see what we mean by that. **Four is just the version of the axiom of choice that we're going to use, that I wrote there as a reference.** Here's the theorem.

**The theorem says that there is NO measure for all sets of reals.** So there is no function that is going to assign to each subset of the reals a number. And the number is supposed to give the size of the subset. And the number is going to be a non-negative number, right? You cannot have negative size things. So it's going to be at least zero.

And we're going to allow infinity to be an outcome. Because there are sets like all the reals have size infinity. And we would like this measure, this measure for sets to satisfy a few properties. We would like, for instance, that if you take the interval zero, one, we get one. And actually in general, we're going to want that the interval from a to b has size b minus a, right? That's kind of might make sense.

But okay, so let's just ask for this. The interval between zero and one has size one. So m maps that interval to one. We would like also to have this property, that if you have a set and you translate it, so you move it in a translation, then we get the same size. So here a plus r is the set of all the little elements of the form little a plus r for a in a. So a plus r means take all the elements from from a and move them r much.

Okay, so add r to all the elements and then you get a new set. Okay, so that's what it is. So of course you would like those things to have the same the same measure, the same size. And then we want another property of this m function, m is the m for the measure, that if you take a collection of sets, a one, a one, a two, a three, a four, etc. So countably infinite collection of sets, of subsets of the reals, and they are all disjoints, so they don't intersect each other, then the measure of the union should be the sum of the measures. Yeah, it kind of makes sense.

The measure of the union should be the sum of the measures so long as the sets are disjoints. And this is for sets that we can list in a list, like in an omega length list, so it's a countable collection of sets.

Okay, so those are the properties that we want for a measure. **And the theorem is saying there is NO such thing.** There is no function that's satisfies that. And yeah, so measure theory is a big area of mathematics, and for it to work, you can never take all the subset of the reals. You have to take only some of them, the ones that are nice enough, they're called measurable. And if you restrict yourself to the nice enough sets, the measurable ones, then fine, we can develop a function that satisfies its properties.

But we cannot do it on every set. There is no such a measure. So essentially the proof goes by building a non-measurable set.

Okay, so that's what we're gonna do. We're gonna build a non-measurable set.

So let's start with this proof. We consider this equivalence relation that we considered actually a couple times before. So here's the equivalence relation.

So let's R be equivalent to S if R minus S is a rational number. Okay, so it's easy to check this is an equivalence relation. Essentially, you've got two numbers here and two numbers here. This one is equivalent to this one, and then this one is also equivalent to this one. then these two are equivalent because if the difference between these two is a rational, the difference between these two is a rational, then the difference between the endpoints is a rational too. So it's transitive and, of course, there are properties.

It's an equivalence relation. And now, well, just an observation because we're going to use this. The equivalence class of some real number, what is it going to be? It's a set of all the things equivalent to it, right? Instead of all the S in the reals which are equivalent to it, which is the same as saying that the difference belongs to the rational, which is the same as Q plus R, right? All the things of the form R plus some rational, those are all the things equivalent to R.

Okay, so that's our equivalence relation. **So now you want to apply the axiom of choice.** So consider the following collection of sets. So let A be the set of all equivalence classes intersected with 0, 1. Each equivalence class is dense because each equivalence class consists of R plus all the rational. So each equivalence class is dense, it's all over the place.

So let's consider the part of the equivalence classes just inside the interval 0, 1. Okay, fine. So these sets are destroyed because they are equivalence classes. Right? So all the equivalence classes are these joints, or they are the same. They're the same, well, they are the same set.

So they are counted as the same thing. And if two things are not equivalent, then their equivalence classes are these joints. **So we can apply the axiom of choice part 4, the one that is right there.**

**So let's C be as in the axiom of choice part 4, which we can see up here.** So it means that this C intersects each equivalence class at exactly one point, right? For each member of this class A intersecting one point, and the point belongs to 0, 1. So in other words, what we have, for every real number R, there is a UNIQUE C which belongs to C, in particular belongs to 0, 1, which is equivalent to it. So the difference is a rationale.

Okay? So that's what we have about this set C. It's picking one element from each equivalence class, so for each of these R plus C, Q, copies of Q, translations of Q, you pick only one. **And now we claim that this is the C that causes trouble.** Essentially, when you see measure theory, or if you saw measure theory, what we're gonna prove is that it's not measurable. But for this, you know, the way we're stating this theorem, what we're saying is that the C is the one that doesn't allow you to define M everywhere, because C is gonna cause some trouble.

So how are we gonna see that? So start by considering the sets C plus Q for Q in the ration. Two observations. Number one, they are these joints. So these sets are these joints. So if Q different from Q prime, both rational numbers, then C intersection Q, then C plus Q intersection C plus Q prime is the empty set.

So they are disjoint. And why is that? Well, because otherwise, if you take an element that, if you had an element that belongs to both, then what does it mean? then there exists C and C prime in C, such that the element is of the form C plus Q, just because it belongs to the set capital C plus Q, and also the form C prime plus Q prime, because it belongs to C plus Q prime. Right? But then what do we have?

C minus C prime would be equal to Q prime minus Q, which is a rational, right? So if C minus C prime is a rational and they both belong to C, they have to be the same. That means they are equivalent. But under this relation, this equivalent relation, they would be equivalent. But C contains only one thing from each equivalent class. So therefore, we get that C has to be equal to C prime.

But C minus C prime equals Q minus Q prime. So you get that Q has to be equal to be equal to Q prime, which contradicts that we started with a Q difference from Q prime.

Okay, so that's how we get our contradiction, which comes from here. Okay, so they are these joints. And this second observation is that the union of C plus Q for Q in the rationals is everything. And that is because if R belongs to the reals, let's see being C, the element that is equivalent to it, there is one element in C that is equivalent to it, because it's choosing one from each equivalence class. **So that means that C minus, that means that R minus C is a RATIONAL, call it Q.** So then R belongs to C plus Q.

Okay, so it belongs to one of these. So we started with an R, we end up showing that it belongs to one of these guys. So the union is everything. And let's do one more observation of this sort, which is that the union of Q in Q, but only between C and 1 of C plus Q is contained in the set 0, 2.

Why is that? Well, because the elements of C are between 0 and 1. We are taking only Q's that belong to 0 and 1. So the sum of these two can only be between 0 and 2. Yeah, so that's what it is. So then how, what do we conclude from this?

So 2, what are the conclusions? So from knowing that the union of C plus Q for Q in all Q equals R, we get that the measure, we get that the sum of the measure of C plus Q for Q in the rationals equals the measure of the reals. Which, well, at least, because the interval 0, 1 has measured 1, this has to have measured greater than 1, in particular non-zero, that's all we care. Actually, it's going to have measured infinity because 0, 1 has measured 1, 1, 2 has measured, so translation has measured 1, 2, 3 has measured 1, and all these intervals have measured 1, you put them together, you have the reals, you must have infinite measure. But all we want to conclude, well, is that it has measured more than 0, and then if you look at this guy up here, well, this guy is the same as the measure of C because it's a translation of C. So we're adding the translation of, we're adding the measure of C infinitely many times, so what we conclude is that the measure of C cannot be 0.

That's all we want to conclude for now. if it was 0, if you take the series of 0 plus 0 plus 0 plus 0 plus 0, you will get 0, right? So it cannot be 0 because if this was 0, then the sum would be 0 and it cannot be bigger than 1.

Okay, so you're going to add 0 infinitely many times, well, countably many times, and get something bigger than 1. So measure of C has to be more than 0. And then, from the fact that the union for Q in Q intersection 0, 1 of C plus Q covers is a subset of 0, 2, we get that the sum for Q in Q, Q in 0, 1 of the measure of C plus Q is greater than or equal, is smaller than or equal, the measure of 0, 2. And the measure of 0, 2 is, well, 2, right? Because the measure of 1, 2 has to be 1 because it's a translation of 0, 1 by 1. And therefore, using the sum, you get that the measure of 0, 2 has to be 2, right?

Because it's a translation. And again, this guy up here has measure equal C, but then it cannot be bigger than 0. So if each of these guys has measured more than 0, then the sum would be infinite, right? The sum for Q in this infinite set is infinite. It cannot be 2, right? So from here, you get that the measure of C has to be 0.

And that's the contradiction. Because first we said different than 0, now we say equal to 0, so it cannot be bigger, it cannot be smaller. So here is where we get the contradiction. So this set C cannot be measured, because if you do a countable union of them, you stay infinite union, you stay within this bounded interval 0, 2, but also a countable union gets you to the whole thing of the reals. So the measure couldn't be 0, and it couldn't be positive either. So this is a set that is non-measureable.

**And the construction uses the axiom of choice.** Alright, see you guys in the next video.



## 33. Part p33 - Comparing Cardinals via Onto Functions

Welcome everybody, so this week we'll continue working with cardinals, the next week we're going to switch to ordinals, but we have a few more videos about cardinals, which are some interesting proofs, probably the most interesting proofs we've seen so far, but before that, here's a small video about a small observation that is good to have, and it's the following, which probably most of you thought about before, I guess the week homework, if you have not empty sets a and b, the following are equivalent, one is that there is a one-to-one function from a to b, and that's what we were denoting by a less than, it's dominated by b, right, it's a one-to-one function from a to b, a is dominated from b, and the other one is there is an onto function from b to a backwards, okay, so essentially if here is a and here is a b, so one says there exists an onto, a one-to-one function f, one-to-one from a to b, and we are saying that is the same thing as, let me know this a bit, as having an onto function that goes from a but onto everywhere onto, in a, and those are the same things, I mean this is the same as a is dominated by b, so this is the same thing as saying that cardinality of a is less than or equal the cardinality of b, okay, so you probably expected this to be true, and what is the reason, why is this true, because both of these are equivalent to saying that there exist functions f and g, such that if you compose f with g, you get identity on a, so essentially this picture up here, if this function going back is the red one is g going back, you get an f is the blue one going there, f goes that way, g comes this way, then if you compose f, you get the identity identity of a, right, so you go, if you go from a, go and then come back to this composition, you get the identity in a, right, and then we prove this, I guess in our second week, and essentially, that is the theorem that we prove, I don't know if you guys remember, but it proves the equivalent among these things, right, having a, an inverse on the, on the left was the same thing as being one to one, having an inverse on the right was the same thing as being on two, and you use one or the other, to prove, B's equivalents.

Okay, so you can review that video if you want to see the proof of this, and essentially this makes sense, right, so if A is smaller than B, you can go to B and come back and get the identity and stay the same, but if B is bigger, you shouldn't be able to go to a smaller set and come back and get this identity again, right, so that's also a way of saying that cardinality of A is less than or equal to the cardinality of B. good, this uses the axiom of choice, if you guys remember, the first formulation of the axiom of choice came when it proved that theorem in that class, right, that was the first formulation of the axiom of choice, that we needed to prove that theorem. Cool, just a little comment to make, pay attention to the details, try to figure it out if everything works, make sense. See you guys in the next video.



## 34. Part p34 - Countable Sets

Welcome back everybody! So I wanted to make a quick mention about countable sets. They are of course very important throughout all of math. They are the smallest infinite cardinals of the countable sets and they show up all over the place. And they're also like, a lot of the combinatorics is much easier when you have a countable set, so it's important. They're important when you have them.

**So the definition that we're going to use is that a set A is countable IF AND ONLY IF there is a one-to-one function from A to B.** So equivalent if A is dominated by omega. So notice this allows A may be infinite or finite. Finite or infinite. So we know that if it's a proper, if it's any subset of omega, we show already that if a subset of omega is either equinumerous to omega or is finite. Remember we showed every non-finite subset of omega must be equinumerous to omega.

So in the case it's finite, we get that A is equinumerous with omega. **And in this case we get that A is equinumerous by definition with a natural number that belongs to omega.** So both are called countable. So if you want to talk about the case equinumerous to omega, we usually say infinite countable. This is an infinite countable set to refer to equinumerous to omega.

Okay, so another equivalent definition as we saw in the previous video is the same as saying that there is an onto function. It's the same. There's an onto function from omega to the set A, right? That's by the previous video, those two are the same. Let me write this in a different way. So here say equivalently, this is the same thing as saying that there's a sequence and we think of this as a sequence as an onto function that maps the number n to the element a sub n from omega to a such that it's onto.

So that a is an image. This here I'm saying a is the range of the function little a or the function that maps i to ai, right? So that's exactly the same thing as saying it's an onto function from omega to a that I'm just enumerating the elements of the image of the function. **But this definition makes the name countable more clear, right?** Because you're exactly A here, this is the set A. Here, these are all the elements of the set A.

So essentially you're counting the elements. So a function like this gives you a counting of the elements of A. There's a zero element, one element. So you find a counting of the elements and that's why they are called countable, okay? So if A was finite, you will have to repeat. This sequence doesn't need to be one to one.

So you may have to repeat the same element many, many times. That's allowed by that statement up there. And in the case it's empty, we also call it countable. But in that case, you won't have a sequence A because you have to fall somewhere. That's why I say in the case when it's not empty. But empty set is also a countable set.

Good. So that's the definition of countable. **And this is an important theorem, which might be very obvious, but it requires a proof using the axiom of choice.** So it's worth at least looking at it and figuring out where is that we need the axiom of choice to prove this theorem. It says that a countable union of countable sets is countable.

Okay? So there's one thing that we know already and is that omega times omega is equinumerous to omega. Yeah? So this is the plane, omega times omega. And this is the same proof we did with the rationals saying that the rationals are equinumerous to omega. And we kind of put the rationals in the plane, p over q.

So we had the pairs, p, q. And then we went through all of them and we had a counting of all of them. same thing here.

Okay? And so this is very similar to that, right? So omega times omega is countable in many columns. So each one is omega. **But why did I say we need the axiom of choice to show this?** Well, this here is a proof.

Let me do a proof. **So let's start with a countable collection of countable sets, like what we have in the theorem.** We want to show that the union of this collection is countable.

All right? So what do we know since... So first, let's assume that A is not... its collection is not empty, otherwise the union is empty and is countable. And that none of the sets inside are empty because otherwise you just remove them from the union and they don't add anything. So you might as well think there is no empty sets involved here. That means... what I just said is an argument that we can assume is not empty.

So it's not just a disregard. How do you think about why that argument just made sense?

Okay, so they are all countable and not empty. So for each a that belongs to a, there is an onto function f from omega to a, right? And now what we want to do is put these functions all together into a function from omega times omega to a. So we also have an onto function g from omega to the collection A. So that means g assigns each element in omega, each natural number, a set within the collection A.

Okay, so essentially maybe let me draw a little picture of this. Here is omega and let's draw A. So A is a collection of sets. These are the ones that I'm calling Roman A, but they are different ones. And then this function g maps to each one of them. This one, this one, this one, this one, this one, this one, and it goes to each set, right?

And now, and then we have for each of these sets, we have a function f that goes from another copy of omega and it maps them all onto inside this set. This is f. And then we have another one for this set. And we have another one for each set. We have another function. These are the f's that we have for each set, right?

And now we want to put them all together. Okay, so we define h from omega cross omega to union of A as follows. We define h of a pair n, m that belongs to, and we let it be what?

Okay, so if we say suppose your n is here, this is the first n, the first coordinate that is pointing to this set right up here through, this is the, we say this is g. So we're going to look in g of n. And now in g of n, we're going to, we're going to say, okay, now where is m going? And then suppose n is here, and then m is being mapped to whatever guy inside there. And this is a function f that corresponds to this particular set A, right? We have a different function f for each set.

So we're going to say f of which, which f? The one that corresponds to g of n applied at m. Make sense? So this function here that depends on A, we call it f sub A, right? So we know that for each A in A, there is an onto function from omega to A, call it f sub A. And then that's the one we're using here.

What A are we using? We're using the A that comes from this n up there, okay? So this function is onto, right? Because g is mapping you, is giving you all the possible subset of A. So whenever you have this M, you're going into all the subset of A, of the collection, all the sets of the collection. And then for each set in the collection, we have an onto function from omega, giving you all the things inside.

And this one, all the things inside. So this function is onto. You should double check that. Don't believe me on my side.

Okay, why did I say this was tricky at all? Or anything? It's not tricky. But why did I say needs the axiom of choice? Where is the axiom of choice being used? The axiom of choice being used right here.

Axiom of choice. Why is that? Well, we know that for every A there is an onto function like this, but actually there are many. And we're choosing one for each A, right? So, we have to choose one for each element of the collection. For each of these circles up here, there are anything too many.

We have to choose one onto function, f of A, into it, out of how many. How are we choosing that? It's not the best way to choose that, or it's not a constructible way to choose that. We need to use the axiom of choice. Let me see how we do that. Let me copy this part.

That's what we had in the previous slide. And now, why is that we're going to cut this f of A? **So, essentially, we can use any of the various of the EQUIVALENT definitions of the axiom of choice to use this one.** Let me use the one with relations. So, we can define. So, let R be the set of pairs A, F such that A belongs to the collection.

And F is a function from Omega to A and it's onto. Okay? So, by our previous observation, we get that for every A in the collection, there is such a function. **So, that means that all the A's inside the collection, the domain of this relation is actually everything.** So, all the A's show up. The question is how to choose one such function, right?

**And now, we use the axiom of choice to get a function f subset of the relation with a domain of f equals the domain of the relation, which is A.** And this function satisfies, since, because it's a domain is everything and if it's a subset of the domain, we have that for every A, for every set in the collection, this function, apply to A, is going to output. What is it going to output? It's going to output a f, right? It's going to output this guy. This guy.

Okay? So, that's what that does. And then, what we're doing in the previous slide, this thing or this one up here, we're calling this one f sub A.

Okay? But now, we can call it f sub A because we have a function that, given A, gives us f sub A, right? When you call it something like that, depending on an element, essentially, you have a function that, given A, gives you the function f sub A. Yeah? So, it's a bit abstract in the sense that it's a function which outputs functions. But, functions are objects and a function can output everything it wants.

So, what is this? This is what that this capital f sub A is doing. It gives you, from a member of the collection, outputs an onto function into the member. And that allows you to put together all these functions into one big function.

Okay, are we done? We're almost done. We have a function from omega times omega to A. So, essentially, we proved that the union of A is dominated by omega times omega, right? We have an onto function going, I guess, that way. But, we know omega times omega is equinumerous to omega.

So, that's equinumerous to omega. So, we get that the union of A is countable. Very good.

Okay, so, let me show, let me just quickly mention a couple examples of countable sets. More than anything, just to show you guys how these theorems apply.

First, if you have a countable set A, the collection of finite strings of A is countable. Remember, this guy up here is defined to be, if this is equal, A0 union A1 union A2 union A3. The set of one tuple, the set of two tuples, the set of three tuples, the set of all size tuples from members of A together. Again, with the notation that we developed recently in the class, you can see these as functions from one to A, functions from two to A, functions from three to A, functions from four to A. Here, one tuple, two tuples, three tuples. A to the less than omega is the set of all the tuples of all possible sizes.

Each of those is countable, right? if A is countable, the set of pairs from A is countable, essentially what we saw before. And then once the set of pairs is countable, the set of triples contains one pair and a single element. So that's also countable. So you have to show, and the set of quadruples is countable. And then by induction, you can show each of these guys is countable.

And then a union of countable sets is countable. So the set of all strings of a countable set is countable.

Okay, so in particular you will get that, let's say, the set of all words you can write, or the set of all strings you can write in a computer is countable. Because you have countably many letters, even finitely many letters, even if you have an infinite, countable infinite set of letters you can use. All the things you can write, like all the texts you can write, so long as the text is finite, the set of all those texts is countable.

Okay? So you can't go too far.

Let's say the set of all programs that can never be written in a computer is countable. Another example, the set of algebraic real numbers. You guys remember what an algebraic number is? An algebraic number is, let's recall this, a number r in the reals is algebraic if it is the root of a polynomial with integer coefficients. With proficiency in the integers, or in the rationals is equivalent.

Okay, so all, if you have, if you can write a polynomial, and so this one is the root, then you get the algebraic numbers. Right? So examples are, I don't know, square root of 2 is the root of x squared minus 2. Or, you can write, square root of 5 over 2 plus 1, you'll find a way to make it. I say there is some polynomial that is going to make it. So that's going to be the root of that polynomial.

Fifth root of 3, you have the polynomial x to the 5 minus 3, that's the root of that. So all of these are algebraic numbers, they are not rational, but they are, you can still define them in a nice way as roots of polynomials. And why is that? Well, I guess we have to make two observations. Z, the set of polynomials with integer coefficients is countable. Right?

Why is that? Well, because the set of polynomials of degree n is equinumerous to z to the n plus 1. Right? Because, well, you have the coefficients of x to the n, the coefficients of x to the n minus 1, the coefficients of x to the n minus 2. All the way, the coefficients of x and the free coefficient, the independent term. Right?

So you have n minus 1 terms, and each one has an integer coefficient. So essentially a polynomial of degree n over the integers is given by an n plus 1 type of integers. So there are countably many of those, and you union all the possible degrees, you get countably many polynomials. And now, so that's one observation. And the other observation is that each polynomial has finitely many roots. Right?

Actually, a polynomial of degree n can have at most n different roots. It could have less, but at most n. So if you have countably many polynomials, each of them with countably many roots, finitely countably many roots, the union of all of those is countable. So there are only countably many algebraic real numbers. Algebraic real numbers, they are a very nice bunch of numbers. They form a field.

I don't know if you prove that in algebra. So they form a field, so you can add, multiply, and divide algebraic numbers, and you stay between the algebraic numbers. A field is an extension of the rationals. And it's a field that behaves very much like the reals in many, many senses. In many algebraic, algebraically it behaves very much like the reals. It's countable, so it's still going to be full of holes.

It's like the rationals are full of holes. It's still going to be full of holes, it's not going to be complete inside the reals. So in that sense, for calculus it's not that good, but for algebra, it's very close to what the reals are.

Alright, see you guys in the next video.



## 35. Part p35 - Absorption Law of Cardinal Arithmetic

Welcome back everybody. So now we're gonna prove a couple theorems with some complicated proofs, but they're going to simplify cardinal arithmetic quite a bit. So remember we defined addition of cardinals and multiplication of cardinals a few weeks ago. Addition is the cardinality of the disjoint union and product is the cardinality of the cardesian product. And we proved very basic properties about cardinals and all of those have like very constructive proofs. So it was important actually to see their proofs because you see kind of how product and addition works.

**But in the case, in the presence of the axiom of choice, we get this very strong theorem, which says that IF you have infinite cardinals, actually you ONLY need one of them to be infinite, THEN the addition of two cardinals and the multiplication of two cardinals always gives you the maximum of the two.** Okay, so there isn't too much to this. You always get the maximum when you don't increase, in the case when they are infinite. So in particular in these cases up here, if these cardinals are infinite, you get that these both of these things, these things is equal to the maximum of kappa lambda mu. In the case when the cardinals kappa lambda and mu are infinite, you get that all these equations up here are just equal to the maximum of the cardinals. So they are kind of all like trivially result in the sense they're just the maximum, they're just the maximum of the two of them.

**So, it was still interesting to see this theorem, even in the case, well, on the one side, because you can prove this without the axiom of choice, and on the other side, because these constructed proofs that don't use the axiom of choice really show you what's going on with additional multiplication, while this one, since it's using the axiom of choice, doesn't really show you what's going on.** There is, every time you use the axiom of choice in a proof, it's kind of like a magic spinning, it's been involved in the proof, and it obscures a little bit what's going on. But, still true.

Okay, so let me make a little comment about how we're gonna go into the proof of this. Suppose that lambda is less than or equal to kappa, so I mean kappa is the max of kappa and lambda, then we get that kappa, which, well, we know so far, we're not proving anything, less than or equal to kappa plus lambda, which is, well, assume that lambda is at least two, because, otherwise it's trivial, so this is less than or equal to kappa times lambda. You just need lambda to be larger than two for that to be true, but if lambda is two, or one, or zero, this is trivial. And then, this is less than or equal kappa times kappa, right, because lambda is less than kappa. So, it would be enough for us to show that kappa times kappa is less than or equal kappa. And then, we will get that all of them are the same, right?

That proves the whole equivalence up there. We're still gonna do two steps, and we're gonna first prove that kappa plus kappa is less than equal kappa. And then, we are gonna show that kappa times kappa, just because the proof, one is easier than the other one, and, so in the easier case, we get to see some of the ideas, without getting too confused by the whole thing. And then, once we use those ideas, we can add more things to the mix, okay? So, let's start proving that kappa plus kappa equals kappa for any infinite cardinal kappa, okay? For a finite cardinal, we know that's not true, unless it's zero.

But, for an infinite, that's gonna be true. **And, as well, we're gonna use the axiom of choice, as I've already said, and we're gonna use this format, the Zorn's Lemma, to prove it.** So, how do we use Zorn's Lemma? Remember, we need to define a collection of sets, prove that it satisfies the chain property, and then obtain a maximal element, and then see how this maximal element is being used. So, let's do that.

All right, so let's do this proof. Okay, so we need to start defining our collection of sets, where we're gonna use Zorn's Lemma, no? **We're gonna apply a Zorn's Lemma to this collection of sets.** So, what is the collection we're gonna use? We used this collection, this similar collection before. So, A is gonna be a collection of functions, first of all, these functions.

And, the range of the collection, we are gonna make it, sorry, the range of these functions, they have to be subsets of kappa. They don't need to be equal to kappa, it's just a subset. The domains have to be equal to the range times the union of the range. So, we're gonna let A be this guy.

Okay, so we're gonna let A be this range, which depends on the function. So, each function in the collection will have a different range, so a different A. And, but we ask the domain to be the disjoint union of the range twice, right? So, it has two copies of the range in the union, right? Because what we are looking for, essentially, is a bijection between kappa and kappa plus kappa and kappa, or kappa disjoint union kappa, two copies of kappas to one copy of kappa, right? That's what we're looking for.

So, we're gonna start with, like, sub functions which do that. So, these functions go, these functions F go from A, disjoint union A, to A, right? And then this one is a subset of kappa times kappa, and this one is a subset of kappa for the ones in the collection. And F needs to be one-to-one. So, that means this is actually a bijection between these guys, because that's the range. The range is everything that is used.

So, this is a bijection between these two guys. So, they are equinumerous A union A and A.

Okay, if you want to apply the subset axiom to make this, to define this, if you want to apply the subset axiom to make this definition concrete, and to know where this is coming from, we need to say where this F is coming from. F is coming from, well, F is a relation, I mean it's a function, so in particular it's a relation, a set of pairs, and the pair, so that means a subset, it's a set of relations, it's a subset of this set of pairs. What are the pairs coming from? So, pairs are coming from first A union A, which is a subset of kappa union kappa, and they go to kappa. So, this belongs to the power set of kappa union kappa times kappa. Right?

It's a function from kappa union kappa to kappa, it's a subset of the set of pairs. Cool. So, we're going to define this using the set of axioms. **The first step is to show that it satisfies the hypothesis of Zorn's Lemma.** So, that means you have to verify this chain property. By the chain property, I mean the fact that for every chain B, which is a subset of A, the union of the chain belongs to the collection.

Okay? So, that means if you have a, if you take a chain inside A, which means, what does it mean? Chain is a subset of A, so it's a set of functions, and all the ones in, all these collections, all these functions in the set B are, they have to have the right properties. Right? All the one to one, and the domain of each function is the union of the ranges twice. And what we need to show is that with the union all these functions together, we're going to get another function that satisfies the same properties.

It's important to use the fact that these functions inside B are in a chain. The ones inside A are not a chain, they are like all over the place. But we are just, we just need to prove this for chains, where they are like just nested functions, one bigger than the other, in like a nested collection. It might not be a countable collection, and that's why this is not completely trivial. These functions might be like huge, huge, like super big cardinal size chain, but they are still nested. We never have two of them, one is bigger than the other one.

That's what it means to have a chain. Right? **Review Zorn's Lemma IF you don't remember that.**

Okay, so let's check on these properties. **First, we proved before already in another application of Zorn's Lemma, so we don't need to do it again.** That if you have a chain of functions, the union is still a function. Right? Because the chain means that all the functions kind of are compatible with each other. different functions don't give you different values on the same input.

So you can put them together, and it works fine. And we also prove, or I guess we just mentioned, but it's the same proof, that we also get it to be one to one. same argument. So the union of a chain is a function. What else? The range of a union is the union of the ranges.

Yeah? So that's easy to see. And if each of these ranges are in the collection, they are all subsets of kappa. So the union of a bunch of subsets of kappa is still a subset of kappa. So that's fine.

What about the domain? Well, the domain, we know that the domain is going to be the union of the domains also. And we know each of these domains is equal to the range, union, the range of each of the functions in the chain. And a union of a bunch of disjoint unions essentially is a disjoint union of the things in the bunch. Right? So we're going to get that the union of all these disjoint unions is exactly the disjoint union of the union of these guys, which is the range of the union of B, and the union of these guys, which is also the range of the union of B.

So we get that the domain of the union of B is equal to the disjoint union of the range with itself, which is what we need. That's this property up here. So we got all the properties that we need to be a member of A. So we get that the union of B is a member of A, because it satisfies all the properties that you need to be a member of this collection A. **So that means that we have verified, that we have verified the chain property.**

Okay? Cool.

**So now IF we verify the chain property, we can apply Sohn's lemma.** Right? Because we're in the hypothesis of Sohn's lemma, so we can apply it. And what does it buy us? It buy us a maximal element in this collection, calligraphic A. Right?

So that's our maximal element, let's call it F, let's call it capital F, to this maximal element. And now we have to see what do we do with this maximal element. It would be good if we had that this maximal element was a function from the kappa union kappa to kappa. But let's see what we actually get. What we get, because we know it belongs to the collection, is that the range is a subset of kappa. Right?

Because every member of the collection satisfies that. Let's call it A.

Let's call it Roman A, to this range of F. And also we know that since it's the collection, the domain of F is equal to the disjoint union of A with itself. Right? And if we knew that A was the whole of kappa, then we would be done. **Because in that case we'll have our bijection between kappa union kappa and kappa as we want to prove the lemma.**

Okay? We know this function is maximal among all the possible functions. Does that imply that the union has to be kappa?

So let's think about that for a little bit. Or could there be much left? Let me show you an example.

Suppose here is kappa and A is just all of kappa without, so this one also is in kappa, without one element. And then here we have kappa disjoint union kappa and it has two copies of A and it has two left elements.

Okay? So kappa has this thing. This one also belongs to kappa. And then we have two on the other side. Could we extend this function to a bijection between these two guys? But if you want to extend the function, you want to keep, we have our function F from here to here.

We cannot change the values that it has so far if you can extend. Extend means preserve all the values that you defined already and add a few more. We can add one more. I don't know. We can map one of these guys to this one. But we couldn't map the two of them in a one-to-one way to this single element.

Right? So if you want to extend this function, keeping this fixed, just adding new things, we cannot increase A because if we increase A, we have to add two elements on this side. But we only add one element on this side. And we're not going to get a bijection between this guy and this guy.

Okay? So, no. This is just wishful thinking. The maximal element need not have, or A maximal element, need not have that A is all of kappa. I mean, after we prove this, of course, there is a maximal element where A is kappa. But Soros might not give you that maximal element.

It gives you some maximal element. That's all it says. There exists some maximal element, and that one might not satisfy that A is kappa. It might miss a few things.

Okay, well, two points. First, what A is missing is just finitely many elements.

Let's say you're missing a few more. Let's say you're missing three elements up here, and on the kappa union kappa you're missing six elements, which you cannot match in any way. And you couldn't, no? if you add n elements on one side, you're adding two n elements on the other side, so you're not going to be able to do the bijection. You're always going to get stuck, and you couldn't increase anymore. It's not an issue, though, right?

Because this set A here, if it's finite but we're missing, this set A will have the same cardinality of kappa, right? Because it's only missing finitely much stuff. So we prove already that if you have an infinite cardinal, you're always equinumerous to a proper subset of yourself, right? And then that's equinumerous to a proper subset of itself and to a proper subset of itself. So if you just remove finitely many elements, it's the same. You're always going to be equinumerous to u minus finitely many elements.

Essentially, it comes from that proof. Again, this requires a little argument. Check it out or think about it. But, yes, so essentially what, well, maybe what I'm saying here is that observation, if n is finite and, I don't know, alpha is infinite, then n plus alpha as cardinals is equal to alpha. So this property about addition being the maximal is very easy when one of them is finite, right? You can just absorb it.

And essentially, remember that proof that inside alpha we put an omega chain and then we move it, all the elements, and we leave n elements blank. Okay, so I'm not going to go into details on that one, but essentially what I'm saying here is that if kappa without a is finite, then we must have that a is equinumerous to kappa, and then we will have that kappa, this joint union kappa, is equinumerous to a, this joint union a, because they are equinumerous, and that's our function f is a bijection between this and a by itself, which will be equinumerous to kappa, okay? So in that case, if it's finite, it's not a big problem.

**So now the claim is that this has to be finite.** So let's prove that claim. So for that, we're going to assume towards a contradiction that kappa minus a is infinite, and we are going to get a contradiction from that. So what do we have?

Let's draw the same picture we had before again, but now with infinite k. So now we have, let's say here is kappa, and now here is a, and what's left is infinite, and on the other side we have kappa union kappa, and here is a, and here is a again, and we have our function f that maps a union a to a, but leaves the rest untouched, right? And now, how is that we're going to get a contradiction? And it's always the same. **When you're using the Zorn's Lemma, the contradiction comes because we have to contradict the fact that f was maximum.** How do you contradict that something is maximum?

Well, you have to build, or exhibit, or show that there exists something that is bigger than this f. So we need to find an f that satisfies the properties of being in this collection, find all these properties that is larger than this f right here, that is extensive, okay? So how are we going to do that? Well, here's the trick. Since kappa minus a is infinite, we can pick an infinite subset that is countable and infinite. So in other words, d is equinumerous to omega, right?

So we've done this before. We showed that if you have an infinite set, you can always have a one-to-one mapping from omega to it, right? So every infinite set is dominated by omega, we showed that before. So here is our set d, let's say, and it's twice because it's in the union, it appears twice, and in this side it appears once, right? But we know that d union disjoint union d is equinumerous to omega disjoint union omega, which we know because omega disjoint union omega is two copies of omega, which is like the integers going omega both sides. That's equinumerous to omega.

It's used events and odds to make the equinumerous to d. And then that's equinumerous to d. So there is a bijection between d and d union d, right? Because of the equinumerous to d. And then now how are we going to extend f? Well, we know we have f defined already here, and now we have h that goes from these two guys to this one.

So we put them together and we get an extension of f. The domain is now a union d, disjoint union, a union d to a union d. So how do we define this g of x? Well, if x belongs to a union a, you use f, and if x belongs to d union d, you use g, right? And you get from this case you go through f, and in this case you go through h.

So now that f is extended by g. And also that g belongs to our collection of sets because it's one to one, because both f and h are one to one, the range and the domain have the right properties. So we made a bigger function, right? So this contradicts the fact that f was maximum, right? So it contradicts this. We get a contradiction because the assumption that k plus minus a was finite, infinite, and then therefore it has to be finite.

And we proved before that in the case when it's finite, then we still get a bijection between kappa union kappa and kappa. Cool. So that's the end of the proof. Let me just review the main steps. Main step was to apply Zorn's Lemma. We need to define collection of families.

And we are trying to find a bijection between kappa union kappa to kappa. But we're not going to ask that. We don't know if there is any because we're trying to prove. So instead, we just take functions from whose range is a subset of kappa and domain is the range union itself, but it has to be one-to-one. One comment to make here. We have to make sure this collection is not empty.

Why is it not empty? Well, the trivial function. The empty function is a function. Domain is empty. The empty times empty is empty. And it's one-to-one.

Empty function is a member of here. So this is not empty class. And then there are two steps.

First, verify the chain property. And then the next step is apply. **Once you verify this chain property, you can apply Zorn's Lemma.** You get a maximum element. And then you have to show that the maximum element gives you what you want. Well, it doesn't give us exactly what we want because we may have a few elements left that are not in the range of this function.

But then the last proof we show that, well, if the elements that are left are infinite, then we could extend the function and show that it's not maximal. So the ones that are left need to be finite. And we observe that in the case when the ones that are left are finite, it's not an issue because at least said that we are, the function that we are getting still has a domain and a range of size kappa. So we can use that one. So that's the proof. See you in the next video.

We're going to show the same thing for times now.



## 36. Part p36 - Multiplication of Infinite Cardinals

Okay, welcome back everybody. So now we're gonna do the proof that we wanted, which is that kappa times kappa equals kappa for all infinite cardinal kappa, okay? And the proof is gonna be somewhat similar to the one we saw before with kappa plus kappa So please review that and make sure you understood what did it play on that one before moving to this one And so before we don't need the previous one, but actually we're gonna use the previous result here. So we need it But most importantly the ideas from the previous one are gonna be repeated here And I'm gonna be go a bit quicker through those and just pay attention to the new things Okay, so we need to apply Sons-Lemang again, and we're gonna consider a similar class of collection of functions, so let me copy what we had from the previous proof and Put it for this new proof, but we need to modify it a little bit So what are the modifications only modification?

We're gonna take I make is that The domain of the function instead of in the union is gonna be of course the Cartesian product Okay, and here the functions are gonna be have to be taken from the set of subsets of kappa times kappa to kappa And that's the only change Okay, so right now so our functions these functions are gonna be now a bijection from some set A which is subset of kappa times itself to a and they are all bijection. So those are our Our functions.

Yeah, so it sounds like that's an appropriate approach First step verify that we are in the conditions to apply Sons-Lemang and it's very similar to the proof we had before Let's take a look again Let me copy what we had in the case for a union and let's see if everything is the same Well, um, again we take a chain the union of chains of a chain of functions of function the union of change of one-to-one functions is one-to-one The range of the union is going to be the union of the range supposed to be a subset of kappa because they're all subsets of kappa same as before the domain is the union of the domains and each domain now is not The division union of the ranges but the ranges times themselves and the same thing applies the union of Something and something is the something the union of the something times the union of something. Make sense? **So that's what we get so it satisfies all the properties that we need to be in the in the collection so we get that the union belongs to the collection because it satisfies all the properties so that is The chain property so that's exactly the same Now we need to apply in Zorn's Lemma.**

Okay, let's copy that too. **We're copying this from the previous slide Okay, we apply Zorn's Lemma.** We get a Function that is maximal within this collection a and we know the range is called the range Calligraphic a and then what we know is that the domain is a times a in this case Yeah, so that's all good and now we want we want to see if the maximal Is good again, we have the same observation we had before that if this set a was all of kappa So in that case it will be done because we get a projection between kappa times kappa and kappa which is what we are trying to prove Good actually we had a better observation after that Which we made it's the following if cardinality of a equals kappa then we're done right because we will have that kappa times kappa Is the same cardinality as a cross a?

Which is the same cardinality as a by our maximal function that we have up here F and then that will be the same cardinality as kappa By the same argument we didn't before so if we don't need well if it was everything is very good If it's the same cardinality, that's enough to show what we want What we did before is to show that all the a that did not did not need to be all of kappa and still the case We showed that if what is missing is finite will be done Because what because the cardinality of a will be the cardinality of kappa is we thought if it's only finite many things missing That's not gonna be the case here. So let's let me draw a little picture So now here is Kappa times kappa and our function F It's a bijection from there to kappa, okay, let's see where a is let's say this setup here say this setup here is a So that means it must be up here to here is a and then here is a and then here is a cross a So our function F is mapping a cross a to a Yeah, if It was missing finitely much. Well, if you have a We want to increase this function.

Let's see what happens suppose we want to increase this function And to a set here that we call D which is the extra thing we're going to add, right? So the D will be I guess here too And then it is here too So in one side, we have only D and in the other side. How much are we adding? Where are we adding these sets? A cross D D cross D and B cross A right? So what I'm saying here is that A union D times A union D Is equal to A times A Union A times D union D times A Union D times D Right and then this is the part part That we had before And the rest is new.

So even if D is Countable, let's say D times A might not be countable. So we will have This going to be countable like we did before And then this D times A is not countable. This is not countable So we wouldn't be able to map D to D So the argument that we did before assuming that D had cardinality of omega Didn't really work Or it's not going to work Okay, but we don't need to be D have cardinality of omega. This is what we need to do So Let's observe first Let's observe first that if D has cardinality less than A We are done Okay, if cardinality of kappa minus A of everything that is missing is strictly less strictly less Then the cardinality of kappa Then the cardinality of kappa Then cardinality of A will have to be equal to the cardinality of kappa Why is that? Well, we proved already that when you add cardinality you get the maximum essentially, right? Because we proved that it essentially follows from the previous case We're going to observe that the cardinality of what's missing kappa minus A has to be less than the cardinality of I want to say of A And the reason for that is that The cardinality of so kappa is the cardinality of kappa minus A Union the cardinality of A, right?

Because these are disjoint and they make a kappa And then this is the maximum of these two Right? Because we proved already that for unions Essentially we proved that when union two sets The cardinality is going to be the maximum if they are infinite So that's the lemma we had right before So that would be the cardinality of A Right? So if cardinality of kappa minus A actually less than or equal cardinality of A We already get that cardinality of A equals kappa So that will get us what we want Which is this part up there Yeah?

So let's show that what's missing has cardinality Kind of have cardinality larger than A So I brought some of these things we wrote before back here So assume towards a contradiction That the cardinality of kappa minus without A Is larger than or equal the cardinality of A And we want to get a contradiction just from that Okay? So Suppose that's the case So that means that this part here This part that we are leaving out of A Has size at least that of A Yeah?

So now we can do What we can do Is we can define the D that we want So what are we going to define? So let D Be a subset of kappa minus A Of size same as A Which is equinumerous to A Okay? So if you're assuming the cardinality is at least that of A We can find a subset of equinumerous to A Okay? Remember that we know from this bijection that we have We know from here That A times A is equinumerous to A Cool? So okay So we want to extend our function So we have this F And what we want to do Is essentially define our function that extends F So essentially we want to map all these three guys to D Right? So what's missing is this thing that we wrote up here We need to define a function now Whose domain is A union D Times A union D And that's equal to A times A Union all these other three guys Right?

So we need the function from there to A union D To A And it has to extend the F So that means on the red part It cannot do anything else than what F does So F maps this guy to that guy This is F So what we're going to define This extension that's called H Is going to map the rest to D Why is that we can't do that? Well, let's see what the cardinality of D is So we know B Or what is the cardinality of these things that we are missing? We are missing A times D union D times A union D times D All of these guys have cardinality A The same as A, right? Because D is equinumerous to A So let's just This is equinumerous to A times A Union A times A Union A times A And A times A we know is equinumerous to A So that's equinumerous to A union This is disjoint union now A disjoint union A Three times But A is infinite So we already know if you add it twice You get the same as A You add A once more You get the same as A again That's equinumerous to A Which is equinumerous to D, right?

So by this fact that we know about A And D being the same size We get that all this blue part Is also equinumerous to D So that's how we get our projection Because now we have an equinumerousity Between all these three blue squares And D up here So that's our H And then we define H Extending F And then we do the same as we did before in the other video So F together with H Form an extension of F Which belongs to our collection A So this contradicts That A was maximum That F was maximum, okay? And that contradiction comes From this assumption That assumption cannot be true Because it's going to lead us To contradict the maximality of F And from there we get That the cardinality of Kappa must The Kappa minus A Must be less than the cardinality of A And therefore the cardinality of A Has to be the same as Kappa And we are done Good! See you guys next video! See you guys next video!



## 37. Part p37 - The Continuum Hypothesis

Okay, welcome back everybody to our last video on cardinal. So for arithmetic, we saw that we get a pretty trivial result, that addition and multiplication of cardinals always gives you the maximal of the two. Exponentiation, we get some trivialities sometimes, but it's a bit more tricky in general. So this is what we can say. **So this part behaves somewhat easily and it says the following, we claim the following, that IF you take 2 to the kappa or lambda to the kappa for a lambda less than kappa or kappa to the kappa or 2 to the kappa to the kappa, you always get the same thing.** And you get a cardinal that is strictly larger than kappa.

Why is that? Well, the strictly larger we know, because we know that 2 to the kappa, which is the same as the power set of kappa, has to be strictly larger than kappa, right? We prove that the power set is always larger than the set. So the larger we know, why is that these two are, all of these are equal? Well, we know 2 to the kappa must be less than or equal to lambda to the kappa, I guess assuming lambda is at least 2. And then lambda is less than kappa, so that has to be less than kappa to the kappa.

And of course, kappa is less than or equal 2 to the kappa, so that's less than or equal 2 to the kappa times kappa. And now by the properties of exponentiation, we get that this is the same thing as 2 to the kappa times kappa. Those are very important properties of exponentiation. And then kappa times kappa, by our previous result from the previous video, that's the same as 2 to the kappa. And that closes the circle, less than or equal 2 to the kappa. **So all of these guys, by the Schroeder-Berenstein theorem, they MUST be all equinumerous to each other.**

Okay, so that's quite simple cardinality in that case. There are situations where you, of course, if the base of this pronunciation was larger than 2 to the kappa, you will get a larger cardinal than all these guys. So whenever you take something larger here, you will get something even larger. So this equality only works from 2 all the way to the kappa, but it doesn't work beyond. So I mentioned before the continuum hypothesis.

Now we can formalize it better. So the continuum hypothesis was postulated by Cantor more than 100 years ago, 130 years ago or something. And it says that every uncountable subset of the reals must be equinumerous to r. So in other words, it says that if you take a subset of the reals, it must be either finite, countable infinite, those are the possible countable sets, or equinumerous to r. So maybe let's write that down. In terms of cardinality, we are saying that if lambda is a cardinality that is less than or equal to the cardinality of the reals, 2 to the aleph naught is how we denote the cardinality of the reals.

Remember, aleph naught is the cardinality of omega, of the countable things. 2 to the aleph naught is the one for the reals. then we have three possibilities. Lambda is finite, or lambda is infinite and countable. Lambda is aleph naught is the cardinality of the natural numbers, or lambda is the same as 2 to the aleph naught, right? This is the cardinality of omega, this is the cardinality of the reals, right?

So it's saying essentially there is nothing, no cardinality in between that of the natural numbers and that of the reals. Every subset in between will have to be equinumerous to one of the two, but there cannot be a size in between, okay? That's what it states, this hypothesis. And it's a very simple statement, right? So it feels like if somebody conjectured this 130 years ago, it should have been resolved by now. Well, it's been somewhat resolved.

So this is what happened. In the middle of the century, Gödel showed that the continuum hypothesis, so CH is the continuum hypothesis, cannot be refuted in Z of C. So that means Z of C, so the axioms that we have seen in this course, similar to Frankl, cannot show that CH is false. They cannot prove the continuum hypothesis is false, right? So it doesn't, you cannot prove it's false. Gödel showed that by building essentially a model of C of C where CH holds.

In the 60s came Cohen, and this called him the Fizz Metal. He showed that CH cannot be proved to be true either in C of C. So essentially he built another model of C of C where CH is not true. And this is, by the way, assuming C of C is consistent. And I want to get into those details. The consistency of C of C doesn't follow from Z of C, so these proofs are not in Z of C.

They are assuming something more. Of course, nobody doubts C of C is consistent, so... But yeah, just mention that it's beyond C of C.

Okay, so Gödel proved that he cannot prove it to be false. CH cannot be proved to be false. Cohen proved it cannot be proved to be true. So, somewhat this says that at least if you, if you're only doing work in C of C, the continuum hypothesis has no answer. You cannot prove it true, you cannot prove it false. There's nothing to do.

There's a lot of work still on this because you still believe, well, it has to be either true or false. C of C is some set of axioms, but who's telling you that this is all the axioms? Maybe there are other natural axioms that we haven't found yet. Or maybe some other way of thinking about this that will kind of argue that CH should be true or should be false. So, there is a work in set theory trying to analyze that. But, for now, C of C is kind of still kind of the more solid basic axiomotization for math.

And with that, you can prove or refute CH. **You say, well, that means that we can add CH to the axioms or the negation of CH to the axioms.** Well, this theorem tells you that if you add CH to the axioms or you allow the negation of CH to the axioms, you stay consistent. It's fine. Either way, it's fine because you won't get a contradiction because neither of them is contradictory with C of C. But, how do you decide which one you add?

Because, is it obvious that there is no sizing between the natural numbers and the reals? I don't see why that would be the case. Or, is it obvious that there is one? Well, we definitely don't know any. And, you cannot even prove there is any in C of C. So, most likely, well, I don't know.

So, you couldn't add, like, there is no reason to add or CH or the negation. Because, you don't know which one to add. There are many terms that people prove and publish which are of the form, if you assume CH, blah, blah, blah. Or, if you assume the rejection of CH, blah, blah, blah. So, we can work one side or the other. But, which one is true?

We don't know. then, there's another hypothesis that I should mention, which is the generalized continuum hypothesis. The generalized continuum hypothesis says, it's more general, because this is only for essentially 2 to the aleph naught. And, it says that if you are between aleph naught and 2 to the aleph naught, then, well, you have to be either one of the two. So, the generalized continuum hypothesis tells you that for every infinite cardinal kappa, not just aleph naught, for every infinite cardinal kappa, 2 to the kappa is the smallest cardinal larger than kappa. So, there's nothing in between kappa and 2 to the kappa.

That's what the generalized continuum. So, all the way, for all the cardinals, 2 to the kappa is kind of the next cardinal up after kappa. Again, this is, well, this is a generalization of this one, right? This is for the case kappa equals aleph naught. And, the same story works. Actually, when Gödel and Cohen prove these results, they both work for the generalized continuum hypothesis.

So, it still cannot be proved or refuted. And, actually, very free. You can do, you can let 2 to the kappa be whatever you want. In this model that Cohen builds, even 2 to the aleph naught, like this size of the reals, I don't know, there can be, like, infinitely many cardinals in between the naturals and the reals, and that will still be consistent. So, yes, there's not much to say about this. Could be true or not.

See you guys next week.



## 38. Part p38 - Well Orderings

Welcome everybody. So now we're going to start a new chapter now on ordinals. Before we did cardinals and ordinals. They sound similar but they are a different thing. They're related. And before going into ordinals themselves we're going to go into well-orderings and which is kind of the base for ordinals.

Okay and before going to well-orderings let's review some basic definitions. First a partial ordering is a structure with domain some set and a relation on it. So this is a binary relation so that means it takes two elements and tells you whether the relation holds or not of those two elements. And the relation must be transitive and irreflexive.

So let's review what those are. **So transitive means that you have x, y and z and you have the x less than y and y less than z THEN x less than z.** Right so that's transitive. Irreflexive means that for every x, x is not strictly below x. Yeah so something that satisfies those two properties is called a partial ordering. One thing to comment here is that whenever you have a partial ordering you can define a relation like less than or equal as x less than y or x equals y.

Right so we use that a lot whenever it is. And sometimes partial orderings are defined using this as the basic notion the less than or equal as the basic notion and in this case you gotta require that this relation is transitive reflexive and anti-symmetric. And then you define the strict notion from it. So yeah you could go either way defining one or the other. I guess it depends on what you're working on. Something is easier but usually one goes defines it one way but then uses both notations this one and that one.

Okay Examples. Let's see a couple of examples. You guys know a lot of examples. So for instance if you take the power set of any set and as the binary relation you take inclusion. Inclusion is transitive, right? A is including B, B is including C, then A is including C.

Oh that's not good because every set is including itself. So we need to take a proper inclusion. Proper inclusion means you are included but then you are equal. **And that's IF you want this proper definition, proper ordering.** You'll get that.

What about Power set of A together with the belongs relation. Well, no, that's not a partial order because you might have A belong to B, B belong to C, but A doesn't belong to C, right? Unless the set C is transitive. No, we don't get that. That's not a partial order.

Another one, we're going to take the natural numbers with the divisor relation. Let's call it like this. Where the relation that a host of two elements if the first one divides the second one. And if the second one is a multiple of the first one. So that's the partial ordering, right? So you have in this case you have 2 divides 6, 3 divides 6, 2 does not divide 3, 3 does not divide 2.

It's a partial ordering. Cool. And so that's it. So an ordering is a partial ordering. It's an ordering of elements where not all elements need to be related. Like in this case, 2 and 3 are not related.

And also in the case of inclusion, we may have subsets of A which are not subsets of each other. When you want that to happen, when that happens, what you have is a linear ordering. In a linear ordering, you have that for every two elements, they have to be related. Either they are equal, or x is below y, or y is below x. So they are called linear orderings because they have to be ordered kind of in a line, right? So the natural numbers, let's say, or the integers with a usual less than or equal.

That's the linear ordering, or the reals with the usual less than or equal. That's the linear orderings. They look like a line. You can have more complicated linear orderings. You can have like a copy of the integers, less than or equal, and then when that's done, you take another copy of the integers, and you put it right here. And you get a new linear ordering that we call z plus z.

And it's longer than, it's just two z chains, one after the other. That's the linear ordering. That satisfies the properties.

Okay, so those are linear orderings. What we're going to be discussing is a particular case of linear orderings, a particular class of linear orderings. And they are called well orderings. So they are, I guess, better than linear orderings in some sense. So a well ordering on a domain A is a linear ordering with a property that every subset has the least element.

Okay, every subset has the least element. So what are the examples of things like that that we know? Well, we know the natural numbers with the usual ordering. That's the standard property of the natural numbers that every subset has only selected, right? While if you take, for instance, the integers with the usual ordering, that's not the case, right? if you take, say, the negative integers, there is no least among all the negative integers.

If you go to minus infinity, there is no least one, right? Do we know other examples? What if we take something like we did before, we do n plus n. This is an operation of linear orderings. This one looks like copy of the natural numbers. And when that ends, we put another copy of the natural numbers.

And essentially, we say all the ones on the right copy are larger than all the ones in the left copy. And then, among themselves, they order in the right ordering. Yeah. So the domain of this is kind of the disjoint union of two copies of the natural numbers. And the order is defined. The ones in the first copy are larger than the ones in the second copy.

Or the other way around. Yeah. In this one, every subset has a least element, right? Because if you have a subset that contains some of the first copy, it's going to have a least element there. if you have a subset that is only in this part, it's going to have a least element in there. So that one is a well-ordering.

We're going to be talking more about this guy later. We can do, for instance, n cross n with the lexicographic ordering, where n, m is less than a, b. if you first look at the first coordinate and compare just the first coordinate, if n is less than a, or n is equal to a, and in that case, when they are equal, you look at the second coordinate.

Okay? This is kind of like lexicographic ordering, right? You first look at the first coordinate, n and a, compare those. if you get a comparison, that's it. if those are equal, then you look at the second coordinate. So that's an ordering.

And that is a well-ordering in the natural number, in that n cross n. Why is that?

Let's prove that. So to prove that it's a well-ordering, we have to take a subset of the whole set, and we've got to show that it has a least element. So what is going to be the least element? So first, just look at the first coordinate. So let me see it with the projection of b into the first coordinate. The set of all n's, such that there exists, and m, such that n, m belongs to b, right?

Just the projections on the first coordinate. So this is a subset of the natural numbers, right? So it has the least element.

Let's call it b , all right? So now, among all the elements that are in b, they all start either with b , or they start with the larger elements. Because among all the possible first coordinates, b is the least one, right? And now we have to look at the second coordinates.

Now let's b be the set of all m's in the natural numbers, such that b , m belongs to b, right? So this set b may have many elements that have first coordinate b , those are going to be the smallest ones, right? Because if you have a larger first coordinate, you're bigger. So look at the ones that have first coordinate b , consider those sets that have the least element, because the subset of the natural numbers.

Let's call it b , yeah? So now what do we get to finish? Well, we get that the pair b , b is the least of b. Great, so we started with a subset b of n cross n, and we found the least element, first by looking at the first coordinate and then the second coordinate. Cool, let me tell you about another example. I give you, I let you guys think about this one.

So consider the set of polynomials with natural number coefficients. Okay, this is a polynomial with natural number coefficients and ordered by this relation where we have a polynomial we define it to be less than another. **The limit as x goes to plus infinity of qx minus p of x is much greater than zero.**

Okay, so it's an interesting definition. I'll let you guys think about this one. **I claim that, well, even showing that this is a linear ordering is NOT immediate.** But, yeah, it's actually even a well-order. Yeah, you guys think about it.

Okay, so we have a bunch of examples of well-orderings. Well, essentially we have not that many. We have the natural numbers, the natural numbers plus the natural numbers, the natural numbers times the natural numbers, and these polynomials, and actually there are many, many more. Of course, if you have a subset of a sub-linear ordering of a well-ordering, if you restrict it to a smaller set, you still have the property that every subset has a least element because a subset of a subset is still a subset. So, and here we get kind of like the natural numbers are smaller than n plus n. They're getting larger in terms of well-orderings in here.

Here's another property that will help us visualize more this property of being a well-ordering. **So, this theorem says that being a well-ordering is exactly EQUIVALENT to the following.** It's exactly equivalent to containing no infinite descending chains.

Okay, so let's put an infinite descending chain. What is an infinite descending chain on a linear ordering? It's a sequence a0, greater than a1, greater than a2, greater than a3, greater than a4, greater than a5, dot, dot, dot, all the way to infinity.

Okay, so I guess, formally, you would say it's a function from the natural numbers to a, such that a n is greater than a n plus 1 for all n. Okay, so that's the decreasing sequence. The sequence goes down. And we're claiming that being a well-ordering is the same as having no such descending sequences. So, let's see why this is the case.

Let's prove this one first. Suppose, towards a contradiction, that b subset of a has no least element.

Now, define a sequence as follows. So, let b0 be a member of b. Of course, you need here, when we say every subset has a least element, of course, we mean every non-empty subset has a least element. empty subsets, yes, I guess, have no least element. So, non-empty. **That's what you need for the definition of well-ordering.**

So, there must be some element inside. And now, we're going to define a chain. b0 is not the least element, so there is a smaller element of b that is inside. b0 is not the least element of b, so there is another element b1 in b that is below it. b has no least element, so b1 is not the least one, so there must be a smallest element in b that's not the least one, so there must be a smallest element in b it's not the least one, so there must be a smallest element in b And we continue like that. And since there are no least elements, we always are able to find another element below, right? So that's how we build our descending chain from a set with no least element. We just stay inside the set and we keep on going down. To define this formally, you need to define the sequence by a recursion of the natural numbers, right?

So you're defining each value using the previous one. **And you need to use the choice axiom to pick some element below each one.** So I'll let you guys work on the details for that. For the other direction, suppose now that we have a descending sequence, and now we wanna show that there is a set with no least elements. So what is that set?

Okay, so we just take all these guys, the set of all these guys. You put them on in a set, that set has no least elements, right? Because each of these guys, bn has a smaller element, bn plus one, and a smaller one has no smaller element, has no least element.

Okay, so those two things are equivalents. No infinite descending sequences, and every set has the least element. So those are well-ordered for you.

Let's prove a few properties about them.



## 39. Part p39 - Transfinite Induction

Welcome back everybody. So now we're going to prove transfinite induction. **So remember induction was a principle in the natural numbers that allowed you to prove things by showing, IF you wanted to show that every natural number had a property, what you did was consider all the sets that have the property, all the elements that have the property, and THEN prove that this set is inductive. IF an element is inside, THEN the next one is also inside.** So ordinals, well-orderings actually, have a principle that is a version of this induction that is called transfinite induction. In a sense, the ordinals are kind of like, they go beyond the natural number, they go beyond the finite numbers, and that's why they are called transfinite.

And the induction for natural numbers is going to be a particular case of this induction. Let's see what it looks like. Before saying this statement, we need this notation. So seg t is going to denote the initial segment of a up to t. So essentially, if we have a link here, a is a linear ordering, like say here is a as a linear ordering, and somewhere here is an element t of the linear ordering, then seg t is the segment of everything that is below. This is seg t.

All the x's that are below t. Okay, it's called initial segment because you can also consider the final segments. That's why you clarify that it's initial instead of final.

Okay, nothing about this definition. It's just all the elements strictly below t.

Here is the transfinite induction principle. So we have to start with the well-ordering. It only works for well-ordering. And it says the following. if you have a subset of the well-ordering which satisfies this property, which is essentially what we would be used to call b is inductive. And it says that whenever you have an element, like for every t in a, if the segment, the initial segment below t is included in b, then t is also included in b.

Notice the initial segment below t doesn't include t, right? So t does not belong to the initial segment below t. The property says that if the whole segment is inside included in b, then so is t. So we only consider b is without properties. And what transfinite induction is telling you is that if b has this property, then b has to be the whole thing.

Okay? Let's see what this is in the case of the natural numbers. In the case of the natural numbers, what is say? So suppose we are working the natural numbers with the standard ordering of the natural numbers, and we take a natural number n and we consider the c of n. What is that going to be? **Well, that is exactly 0, 1, n-1, which according to our definition of natural numbers, that's the same as n.**

Okay? So what's that? That's what segment means in that case. In the case of the natural numbers, this is saying, so if a is ordering of the natural numbers, it's saying that if b is a subset of the natural numbers such that for every n, whenever we have that 0 up to n-1 is included in b, then n belongs to b, then we have, then we know that b must be all of the natural numbers. Right? **This is kind of like, this is essentially the induction principle for the natural numbers.**

You may ask, what happens with the base case? So that sounds pretty much like the inductive case, no, if you have the numbers up to n-1, then you have n, then you have n plus 1, so on. What happens with the inductive case? Well, the empty set is a subset of b of every set, just because, and so the initial segment of 0 is the empty set, which is a subset of b. Therefore, that property over there, this property will imply that 0 belongs to b, right? So this property kind of has inside both the base case and the index and the successor case.

Cool. But this is a bit more general, right? Because this works for every well-ordering. That's the idea of this induction principle. How do we prove this? Well, suppose this is not the case.

This will prove by contradiction. So suppose b is not all of a. So there must be some element that belongs to a and not b. So a minus b is not empty, right? There is some element that belongs to a and doesn't belong to b. Since a is our ordering, we can take the least element.

Let's call it t0, be the least element of a minus b. The least element that belongs to a and doesn't belong to b. The well-ordered property tells us that that always exists for every subset of a. Where is the contradiction? Well, but then, every, let's call it a little a, that belongs to the segment of t0 is not in a minus b. Well, because t0 was the least one, the least element of a minus b.

So if you take something that is below, it's not in a minus b, or therefore, or in other words, it's in b, right? if it's not in a minus b, it must belong to b, right? So that means that the initial segment below t0 is a subset of b, right? It means it's kind of directly, right? We are choosing the least element that is not in b. So everybody below must be in b.

And then this, um, by our assumption on b, we get that t0 must belong to b, that t0 belongs to a minus b. So that's how we get that if you start assuming that b satisfies the inductive set property, then b must be all of a.

Okay. Cool. So that's the induction principle. Um, we're going to see examples, uh, when we start doing constructions and proofs. Um, so we need to wait a little bit more to see a few examples, examples, but, uh, we'll see them soon enough. See you guys later.



## 40. Part p40 - Transfinite Recursion

Welcome back everybody. So we saw transfinite induction, now we're going to see transfinite recursion. Remember for the natural numbers we have those two things. Induction is to prove things and recursion is to build functions. Induction is to prove things assuming you know that all the previous values satisfy your property. You want to use that to prove the property for the next value.

In transfinite recursion you want to define a function, you assume you have already defined the function for the previous value and you define it for the next value, right? So that's the same idea in both cases. Natural numbers are ordinal and well ordinal. So we need this piece of notation. Remember b to the a is a set of all the functions from a to b and we here we're defining less than a to the b and this is a set of all the functions whose domain is of the form seg t. So the initial segments of some t, below some t and the range is included in in b, right?

So I guess this is equal to the union of seg t to the b. So meaning the function from seg t to b for t in a, right? So it's all all of those possible sets together. So just as an example, if you take less than omega to b, what is this? This is the set b0 union b, union b1, union b2. So it's a set of finite, it's a set of finite tuples from b, if you take omega.

But here we're taking a larger, I guess, orderings a than omega or smaller, either way. Okay, so that's what that notation means and here is a recursion principle. Again, the idea before we read this is that suppose you have a procedure to the, you want to define a function and at each point when you want to define it, you have a way to define it using the values of the function at the previous values. And you want to use those to define the new one. **And the transient recursion principle tells you that IF a is a well-ordering, THEN yes, you can do this.** So here's the statement.

So suppose you have this function g, which here is just a function you have to imagine this is the procedure. This is a procedure that tells you, given what's been defined so far, how you define the next step. And it goes from the set of functions from initial segments of b to b. And given that, what you get, this is the object you're building, is this function f from a to b, that's what you want to build, which satisfies that at t is equal to what you get by applying this procedure g to the restriction of f to the previous values, right? So remember this means f restricted to the previous values. So you forget about the values of f below.

So the graph of this is essentially, if you guys remember, this is, if you see it as a graph, this is the set of all pairs a comma b, such that a is below t, or belongs to the segment of t, and b equals a of a. So there's the restriction of the graph only to the things below t. And this g is kind of this procedure that if you know what f does in the previous cases, it tells you what to do next, right? So this is essentially what we did for the natural numbers. And it's a bit more complicated for a general well-ordering because yeah, this well-ordering can be anything. **All we know is that they satisfy this property that every subset has the least element is definitely this is NOT the definition of f right away.**

**You need the principle because here you're using f on one side and on the other side of the equation.** So you're using f to define f. And that shouldn't be good. *The point is that you're using smaller values of f to define the new bigger value of f.* And why is that you know that's going to be okay? Because for the for the finest value using the previous value and to define that one is the previous value to define that one is the previous value.

**So the fact that there is a well-ordering means that this process is going to be finite and it's going to end eventually and you're going to be able to define your value.** The proof is a bit tricky and we're going to do it in a minute. But before, well, maybe in a couple of videos. But before, let's look at just a simple example.

So let's consider a to be the linear ordering that corresponds to a omega times omega. Order lexicographically like we did in the example in the previous video. So you first look at the first coordinate, compare that one, and if those are equal, then you look at the second coordinates. if the first one are not equal, you're done. And let's define this function like this. **And I claim that this definition kind of fits the transfinite recursion.**

Let's see what this is doing. So here we have a picture of omega times omega. And the order again is first look at the first coordinate and then look at the second coordinate.

Let's start figuring out the first few values. So first, f is not well defined there. So we need to add it here. So let f be 0. Sure, 0 real now. What is f ?

So this one here is 0, 0, here is 0, 1, here is 0, 2, here is 0, 3, 1, 1, 0, 1, 2. So what if f of 0, 1? Well, if the supremum of the set, well, it's only one element below 0, 1, which is 0, 0. So f of 0, 0 essentially plus 2 to the minus 0, and that is equal to 2 to the minus 0 is 1. And f of 0 is 0, 0 is 0, so that's 1. So this one is 1, right?

Now, what is the next one? So f 0, 2 is the supremum of the things below 0, 2 right there. So it's equal to, I guess the case, let's write it down, f of 0, 0 plus 1 comma f of 0, 1 plus 1 half, 2 to the minus 1, which is equal to 1.5. So f of 0, 0,0, 3 is equal to the supremum now of this guy and f of 0, 2 plus 2 to the minus 2, which is equal now 1.75. And you can probably guess where we are going with this, f of 0, n it's gonna be equal, well I'll let you guys calculate it, but essentially it's gonna be equal to 2 minus 2 to the n minus 1.

Okay, that's what you get. So it's getting closer and closer to 2, and now when we do this guy, the next one, who comes next? Well this is the guy that comes next in the order, right? 1, 0 is the one that comes next. So dot, dot, dot, dot, dot, dot, f of 1, 0 is gonna be the supremum of f of 0 n plus 2 to the minus n for any of the natural numbers. **So it's the limit of that, and that is equal to 2.**

And then the next one you're gonna have, you're gonna get here 3, 3.5, 3.75, dot, dot, dot. **And THEN you're gonna get the limit and you're gonna go up here, it's gonna be 4, 5, 5.5, 5.75, dot, dot, dot.** You take a limit, you're gonna go up to here 6, 6. And then you get 7, 7.5, 7.75, 8. And so on and so forth. So you guys see how this is built by recursion?

So work it out, try to work out those numbers that I just did, and see if it makes sense. Remember the ordering on these guys come like this one is less than this one is less than that one is less than that one, and once you're done it comes up and it continues up here. then you continue going up, going up, going up, and then it continues That's the order. You go infinity and then you go to the next level, and then you go to infinity in the next level, so you go to infinity, the next level. So that's the ordinal, that's the well ordering omega times omega. And that's how you define this thing by recursion.

Let's work a little bit more with this example. How is that we can write this example in the setting of the Transfinite Recursion Principle? So what is G up here? So I claim that G is this function. So G of G is just supposed to go from less than A into the reals to the reals, right? In this case, we're talking about functions to the reals.

And what so G does when it takes a function H, so remember, it has to take something from here. What G does when it takes a function H is to take the supremum of H of X plus two to the minus by two of X. What G does, when it takes a function H that comes from the set of initials, from a set of initial segments, from initial segment of A to the reals, is the following. It takes the supremum among all the Hs in the domain, all the X in the domain of H, of H of X plus two to the minus pi two of X, where this pi two is the projection into the second coordinate, right? Pi two of AB equals B. So that's what H does.

So your input of function, whose domain is only an initial segment of A, what it does is take the supremum of all those values, plus these two to the minus second coordinates, right? And then that is exactly what this is doing. We have to always add, well, always add. In this case, the case zero doesn't work because you get the empty set. So you need to add that to the definition. **And THEN you see how this definition up there is a particular case of the Transfinite Recursion case.**

Yeah? You get that that's exactly an application of Transfinite Recursion. Good.



## 41. Part p41 - Replacement Axiom

Welcome back everybody! **So now I want to look at another application of Transfinite Recursion Theorem and I want this application is going to lead us into our last, well NOT the last, the one before last axiom in our list, the replacement axiom.** So here is the idea that I want to go through. So consider this, it's a well-ordering, omega plus omega. I was calling it before natural numbers plus the natural numbers. I'm gonna draw here what it looks like.

It has the first element that we call 0 and another element that we call 1 and another element that we call 2, another element that we call 3. And then it starts like omega and then after all these elements comes another element that we call omega. And notice omega is actually equal, like they said the elements below omega are actually equal to omega. And then comes another one that we're gonna call omega plus 1 and then comes another one that we're gonna call omega plus 2, and omega plus 3, omega plus 4. And this goes on. And here we have like another copy of omega.

All right, so that's how this guy here looks like. So now we want to do the following. You will define the extensions of this. Remember the V0, V1, V2 that we had at the beginning of the class. We started with V0 being the empty set, and the power set, and the power set, and we would iterate the power set, and consider all these, and build these finite sets of finite sets of finite sets of finite sets. Remember that part?

So we want to extend these now, not only on the finite sets, like the finite levels, but go to omega plus omega levels. So let's first review what that was, if you remember. So V0 was the empty set, and V1 was the power set of the empty set, which is just that. V2 was the power set of the power set of the empty set, which contains the empty set, and the set with the empty set, and so on and so forth. And we got Vn plus 1 was the power set of Vn, right? Which essentially, this is contains all the sets that you can write, I mean, with brackets and empty sets of kind of depth n.

And then we kept on going. And then, I don't know if you remember, we define at some point V omega to be the union of all these Vn's for n in omega, right? You guys remember this? if you notice, it happened, if you start with the empty set, if you start with something else, it's not true, but if you start with the empty set, you get that V0 is a subset of V1, well, just because the empty set is a subset of everything. And then if you have something, a subset of something, and you take power sets, this preserves being a subset. This preserves being a subset.

So we actually get a chain of bigger and bigger subsets, and then here we get the union, okay? So actually, Vn plus 1 is not only equals to Vn, it's also equal to power set of V0, union power set of V1, union, union power set of Vn. This is kind of trivial, and what I'm saying here is because, well, they aren't including each other, and the last one is the biggest one. So the last one is when you take the union of a nested chain, you just get the biggest one, right? All including each other. **So this is a bit trivial, but I just want to put this in the, in the format of this definition here, right?**

So this is exactly the union of power set of VI for i less than n plus 1, which is what we are defining right here. This is just the, this is exactly the union of the power set of VI for i less than n plus 1, which is exactly what we are defining right here, right? And then that has the form that we want up there, right? And then this one is the union of the power set of VI for i less than omega. Correct? So that's what we have up there.

So what do, what comes next? Let's see what comes next. Well then comes V omega plus 1, and is going to be essentially the power set of this guy, right? **Well, it's going to be, IF you follow the definition, it's going to be the union of the power set of all these previous guys, right?** It's a union of the power set of all the previous guys, but the union of the power sets of these guys is already this one, which is transitive. So we are actually going to get right here, if you apply the definition, the power set of V omega.

Okay? So we get the power set of V zero, union the power set of V one, union all the way, and then you get the power set of the last one, V omega. And again, they are all nested, including each other, so you end up with the power set of V omega. And then again, since they are nested, V omega plus two, you get the power set of the power set of V omega. And so on and so forth. Right?

Then you get, essentially, V omega plus n is n iterations of the power set. Okay, so question for you guys. What is the cardinality of V omega plus n? I mean, what we did, there is something and not completely right in what we do, what we just did, but we'll get into that in a minute.

Let's look at this. Well, so let's start with cardinality of V omega. Well, V omega is a union of finite sets. It's a countable union of finite sets, right? Each of these V n's is finite, has size two to the two to the two to the two, n times. And the other part is still finite.

And you say countable union of finite sets, this is countable. So countable means it has cardinality, aleph not. Aleph not means countable. And then we decided taking the power sets, right? So then cardinality of V omega plus one is two to the two to the two to the two to the two to the two to the two to the two to the two to the if not. And then this chain has n many twos.

So it's a pretty large set, right, that we get up there. So do you guys see what when I said that there's something fishy up here? What is fishy up here? **Well first let's see IF we are IF we are defining this according to the recursion, transforming recursion principle in the right way.** Well we are, right? So we are essentially taking, I mean we are using the previous values of the value of the function v to define the new value, right?

So that's just that's just fine. So here the function g that we need, this function g, what is it? g of a function h, where h is kind of the restriction of v up to segment of t, is equal to the union of h of power set of h of t h of v for v in the domain of h. So if you apply this h, we get exactly what we want, right? We get that vt is equal to g applied to v up to the segment of t, correct? **So THEN this is definition is by recursion. THEN the issue here is, so I move this to the corner so we can work up here.**

So the issue here is this function g, where does it go to? How we define, how can we define this function g? **Because this function g is taking, like these images are the power sets of the power set, so g is supposed to go, according to our Transfinite Recursion Theorem, g goes from some sets b to the less than a to b, right?** And then you, when you iterate, you end up with this function v. But what is b here? b is like, I don't know what the b should be here, no? Like, I mean, the image of our function v is going to be all these bigger and bigger sets with larger and larger cardinality.

Where are we getting this function g from? Because we need to define g before I define f.

Let's take a look back. **In the Transfinite Recursion Principle, we are given a function g and THEN we obtain our function f using it.** But we have to be given this function g and if we have the function, we have the range. But then here we would have that all these guys, v omega plus n for n in the natural numbers, this is going to be inside the range, right? This is a subset of the range of the v that we are going to be able to define. So it should be a subset of v.

But we don't have this. We have each of these guys separately, right? **We can build, IF you give me n, n17, I can apply the power set axiom 17 times and build v omega plus 17.** Fine. n equals 174, I can define v omega plus 174. But how do we put them all together in a set? Like this set up here.

How do we build this set up here? **We need to build this set before we define the v's actually.** Because we need to have this function g, right? And so far the axioms that we have do not allow us to do that. The axioms that we have, they only allow us to take subsets of axioms that we had before. The only way to go up is by applying the power set.

So we can apply the power set once. We can apply the power set axiom twice. We can apply it. And then, but after we apply, like in this case, omega many times, how do we, I mean, we have each of these sets isolated, but how do we take the union? I mean, to take a union of a set, you first have to have them all together in a single set, right? if you want to do, for instance, that, if you want to do the union of all the v omegas plus n, n in the natural numbers, we need to have this set first, which contains all of them together.

Where do we get this from? So the answer is that the axioms that we have so far do not give us this set, right? **So IF you want, like, cardinality up that comes after taking the limit of all these guys, so the cardinality of what we should call v omega plus omega, we need a new axiom.** And the axiom that we need is called replacement. So here is the replacement axiom. So before stating the axiom, we need this definition.

So suppose you're given a formula, phi, of first order logic, in the language of set theory, and it has two variables, but it's called two free variables, x and y. And if the formula satisfies the following property, we're going to say the formula is function-like, okay? So I'm defining this property of the formula. And the property is that for every x in a, and for every y1 and y2, if phi holds of x together with y1, and phi holds together with y2, then it's because y1 and y2 were already equal to begin with. So, okay, so then it's essentially this is saying that if phi of x holds with something, there is a UNIQUE something that it holds with. So in other way, this will be the same thing as saying if there exists a y such as phi , then there exists a UNIQUE y such as phi .

And that's why it's function-like, because for every x, if there exists a y, then there exists a UNIQUE y that is related to x according to this function, okay? So this is, so for instance, for example, if f is a function from, let's say, a set a to b, and we let phi of x be the function f equals y, then this formula would be a function-like, okay? It will have f as a parameter, that's fine, but it will be function-like for each x that it will be a UNIQUE y, if there is one. So not all formulas are going to be function-like, but some are going to be function-like. So essentially it's a formula defining a function. The difference is that maybe we cannot define a function directly from the formula, right?

Because a function needs to be a set, essentially, and this formula maybe doesn't define a set. It kind of behaves like a function, but it's not a set in itself. **So the replacement axiom scheme says the following.** It's a scheme. So for each formula, we have a different instance of the replacement axiom. So we have infinitely many instances of the replacement axiom.

And it says the following. **So for each formula, phi, IF the formula is function-like, which is like this definition that we have up there, THEN the following holds.** For every set a, there exists a b, such that you belong to b, if AND only if there exists an x in a, such that phi is white. So essentially, what it's saying is that if here you have an a, there is going to exist a set b, such that something belongs to b, if AND only if is related to some x in here, via phi.

Okay, and this phi is supposed to be function-like, so the elements here are related to different elements here. Some elements here might not be related to anybody, but every element is related to almost one thing. And then the function is telling you essentially is that this range exists.

Okay, so that's kind of what replacement tells you that this range exists. And once you have b, you can now define f to be the set of pairs a, b that belong to a times b, such that phi ab holds. We can define now this by a subset axiom. And essentially what you have is that f is a function with domain of f, a subset of a, and the range of f is actually equal to b. **Yes, so the replacement axiom implies that IF you're given a formula that is function like phi, and you want to restrict this function to a particular set a, and now a is given as a set, THEN you actually get a function as an object.** This function f, that is essentially the one that we have here, is the function f, it exists as an object in our universe of sets, right?

So the formula, like kind of like many x's get mapped to some y's, but maybe it's like all sets get mapped to things. if you restrict the domain to an actual set, something that you know is a set, replacement is telling you what, then you actually get a function whose range is an actual set. Yeah, makes sense?

So let's consider an example of this. For instance, suppose the formula phi of xy is a formula that says that y is equal to the power set of x.

Okay? This is a function like because for every x there is a UNIQUE power set. So this function is function like. And, but it's not, it's not a function, it doesn't give you a function because the domain will be like all of all sets. I mean essentially it's like, it's like a function whose domain is all sets. And for the old sets it gives you an image, the power set.

But yeah, we cannot have the domain to be all sets because all sets is not a set. So itself is not a function, but we can restrict it to a fixed set. So if you let, I don't know, take a set B, what this does is that, we take a set A, and what the replacement tells us is that there is a B, which is an actual set, which is essentially a set of all the power sets of all x for x in A.

All right? **So that is something we couldn't do before, because before we didn't know, I mean, IF you wanted to do this, use the subset axiom, we need to say, well, where are we taking these guys from to use subset axiom?** So we cannot do this using subset axiom, because where are we taking all these power sets from before we have them? I mean, I guess in this case, we could have because it's the power set. In this case, we could have figured it out in some other way in this particular case. But so the replacement axiom tells us that in situations like this, when you have a function like thing, you don't need to apply the subset axiom.

You can get it directly. So you get that this B exists, and then we're going to find this function of all the maps A to the power set, but only for the little a's that belong to capital A, right? So essentially, the restriction of phi of this function like formula to A, it is a function. So it is a function. And this one has domain A and range B. So going back to this case, when we have all these B omega plus one, B omega plus two, all of these, is it takes a little bit of work.

But you can define a function phi of n comma let's say w that holds if AND only if w is v omega plus n. So essentially, if w is the power set of the power set of the power set of the omega n times. It's not immediate how you find how you find this formula phi, but you can define it. And we're going to see that in the next video. And once you have this, what replacement is doing is telling us that the image of omega, so we will first, we can show that for every n there exists a UNIQUE w, namely v omega plus n, such as phi n w, and that UNIQUE w is phi omega plus n. So once you have that, you get that this formula is function-like and you can take the image of the image of omega.

So by replacement, there exists a set B, which such that for every n there exists the set v omega plus n, which is the image belongs to B. All right, so essentially we get this set up here. So replacement gives us this set. So of all these guys. Yeah. Again, there is a bit of a bit of a technicality here to prove this thing that we need to do.

So once you have this v, then you can keep on going, right? then you can take the union of all these guys and then you can consider v omega plus omega to be the union of v omega plus n for n in the natural numbers. And this one is going to have cardinality 2 to the 2 to the 2, the limit of this 2 to the 2 to the 2 to the f0 at the end, and you can keep on going. then you can do v omega plus omega plus omega plus 1 to be the power set of the omega plus omega and then all the way and then v omega plus omega plus omega to be the union of the omega plus omega plus n for n in the natural numbers, which again you need to use replacement to get this very large set. But just and then you can even keep on going and the omega times omega down there and you can keep on going. We'll get to that later.

See you guys in the next video.



## 42. Part p42 - A Proof of Transfinite Recursion

Welcome everybody! So in this video I want to do something a bit different and since I think it's very important that everybody is very used to reading math and I think for upper division courses is the best way to study math. It's just to read math but really well and as opposed to in lower division classes when you just do exercise and practice some technique over and over there are no techniques here that you need to practice over and over you need to understand what's going on and for that exercises are good because they force you to think about what's going on but also just thinking through a proof but but reading in an active way in a way that you're actually thinking about what's going on helps you understand what's going on directly so you don't need to kind of look for more exercises or anything you just need to read carefully what's in the textbook and maybe if you want other textbooks and then that's going to help you get the understanding that then you need to understand what's going on in the class.

**So here is the Transfinery Recursion Theorem but the general form and this is directly from Endertons and what I'm going to do is read Endertons slowly the way I read math usually.** Well I guess I know this already so I'm going to go a bit faster than usual but again if I want to make the point how is that you need to stop at every little line every time you read something and ask yourself why is this why is this why is this why is this all the time why is this why is this that's the way you read math.

Okay so here is the Transfinite recursion theorem scheme so it says for every formula gamma we have the following suppose that we have a well ordering on a set a okay and assume the following assume that for any f there is a UNIQUE y such as gamma f y so this is essentially saying that gamma is function-like because it's a UNIQUE y but it's saying a bit more it's saying that for every f there exists a y so you know that there's always a y and there's a UNIQUE y okay so essentially you have this is a function that given f that it's not a function it's a gamma it's like a because it's not a set but for every f it gives you a y it's a UNIQUE one that satisfies this formula gamma and the conclusion of the theorem is that there exists a UNIQUE function f with domain a which satisfies uh this thing okay so if we compare this to the other version of replacement that we had in the other one we had f of t equals g applied to f restricted to this segment the initial segment below t and what what what's going on here essentially the gamma that we're using here gamma of little f y is

Essentially the um the same as t of little f equals y right so that's what uh gamma is gamma is saying um this is little f and this is y equals g of little f but this is more general because it doesn't assume that such a g exists because in the previous case the g was a function essentially a set of pairs like a graph of a fun set of pairs while in this case uh g is just g doesn't need to exist all that needs to exist is the formula that given f there is a UNIQUE y and that's going to be enough to prove the recursion theorem of course we have to use replacements along along the way at some point so here is the proof of the dilemma let's read together and let's see how how it goes so okay so that's the lemma we want to show the proof is similar to that of the recursion theorem for omega so when when you read this it means that means probably you want to go back and read that proof if you don't remember it because omega is a very as much simpler case than the general transfinite recursion and if you understand that proof well it's gonna get you like half the way through this proof

So whenever you read that i it's usually recommended to go and read the the other one which is probably easier before so again we construct the desired function f as the union of many approximating functions okay so that's telling us essentially what it's gonna do it doesn't mean anything yet um for t in a now we're ordering uh we say that a function v so now v is used to denote a function is gamma constructed up to t and okay so that's a new concept what does it mean it means the domain uh is everything less than or equal t so it's not exactly the segment of t is it has less than or equal so you have to pay it observe that and for every x in the domain it satisfies this property up here which if you remember mean this the state what are we trying to do we are trying to define f so that for every t in a we use gamma f right so that's what we are trying to do and if you see this is actually exactly the same thing um for the function v so the only difference with f is the domain of this one is only up to t so that was important to notice so to understand

What's going on when you define this new notion where is it coming from okay so we know this is the same thing that we want with only difference that the domain is not all of a but just initial segments okay let's go so first we claim that if we have two t1 and t2 two elements v1 is gamma constructed up to t1 and v2 is gamma constructed up to t2 then they are equal for all x below t1 okay let's see what it means so it's good to have always like a piece of paper next to you when you're doing this kind of argument and to draw the little pictures if we have the ordering a right there growing to the right and we have two points uh t1 and t2 then v1 is defined up to here and v2 is defined up to there and what does it say this is that for all x below t1 uh v1 and v2 are the same so for all x up somewhere here these two are the same right and uh v1 is a function from all the x's such like x less than or equal t1 to what we don't know and v2 is a function

So remember that domain of v1 is the set of all x's such as x less than or equal t1 and domain of v2 is a set of all x's such as x is less than or equal t2 right that's what we have and what this is saying is that essentially it's good to kind of rewrite what what you read here in different terms so then you get a better idea what you're saying is that v2 restricted to the domain of v1 is v1 right that's what we're saying that for all all the x's there we get the same the same value which as functions that is the same thing as saying that a set of pairs v1 is a subset as v2 is a set of pairs okay good so we understand what that sentence says okay so let's see what is true well should this fail there is at least x less than or equal t1 which makes a difference always stop and say why is that well why is that well because if there is somewhere where they are different and we are now well ordering there has to be a least one okay so there's a least one by the leastness of x we have that v1 restricted to the segment below x is equal to v2 restricted to the segment below x again stop why is that well because

So x was the least one where they are different so that means they are equal all the way below so they are equal on the segments of the things below we also have that v1 up to segment of x uh satisfies gamma together with v1 of x and the same for v2 uh this is because that's what it meant to be gamma constructed so you have to satisfy that and then by our assumption on gamma the gamma was function like that whenever you input something there is only one possible second coordinate we must have that the second coordinates are the same because the same coordinate the first coordinates are the same and then the second coordinates have to be the same uh but then after all meaning we started saying that they are different and now we get that they are equal after all so that's because we are assuming that there is some place should this fail that there is some place where they are different okay so then that proves the claim that

If uh we have yeah whenever we have two things v1 and v2 functions that are gamma constructed up to some point they have to be compatible uh in particular taking t1 equals t2 we see that for every t there is at most one function v that is gamma constructed up to t right because they have to be we need one to form the set k of all functions v that are for some t in a gamma constructed up to t so that is right there okay so that's the set of all these functions and so okay what do we let's just i mean always when you define this just spend a second of thinking about what this is so these are functions that uh gamma constructed means that they satisfy the the our objective our final objective but only up to a certain t and they could be up to any t along the way in a and we know what our previous claim that if there are whenever you have two functions in these sets they have to be compatible one has to extend the other or they're equal and now comes this part that has this line on the on the left remember in this book in the next book this means that we're going now into just justifying

Why using the axioms why is that we can do this yeah so here is saying k is provided by the replacement axiom um why is that yeah because here the k mean we're not taking you're not using the subset axiom right where is the v coming from well it says um take the formula phi uh of tv that says that v is a function that is gamma constructed up to t so it's a function that satisfies kind of the transfinite the recursion property up to t and we already shown that uh if for each t you can have at most one function v gamma constructed up to it right because well that's what we showed in the previous claim uh so that means that this function phi is gamma like okay so essentially uh we are taking the image of this phi for all the possible t's that belong to a so for all t for which they exist such a gamma constructed function uh we are taking it so k is putting together all these gamma constructed functions cool um so here is exactly what i just said uh by replacement there is a set k such that something belongs to k if AND only

If uh you order image for something in there is something in t in a such as the formula holds of it which is equivalent to saying there exists a t in a such as v is gamma is a UNIQUE thing that is gamma constructed up to t cool um so now what's up with this k well let's see what's going on so it says let f be the union of k so the union of all these v's that we have here so okay this is a bit strange let's see what's going on so k what was k and let's see what k was again for a second k is a set of all these v's which are functions constructed up to t so k is a set of functions not really a set of sets but okay we've been taking unions of sets of functions before so they might be okay um so we have that essentially that what this means since it's a set of functions that are pair x comma y belongs to this union if AND only if it belongs to one of the members so v of x equals y for some of the members first we observe that f is a function okay and then this is essentially uh we know this already

Because k we know that all the functions in k are nested right we know we prove in the claim one that whenever you have two functions in k if one is a larger domain than the other one it had to be equivalent on the domain so one has to extend the other so we know that our next we have a nested collection of functions the union is a function anderton gompson goes and does the proof uh again um so i let you guys read the proof because it's essentially this thing that we did before that a union collection a union of nested collection of functions is a function okay and next we claim that for every x in the domain of f we have the property that we want right that's exactly the property that we're trying to get for the function that's the recursion property that we're trying to get so how is that we get that f is that's what we want okay for if you take an x in the domain so take one okay wait so we have to say one one observation this is only for the x's in the domain of f and what we want is this to be true for all of a

So this is not claiming that the domain of f is all of a yet it's only saying that this works whenever x belongs to the domain of f and then it's going to be let's see how that goes so you take x in the domain of f there must exist some v in the class the collection k with x in the domain of v why is that well because k was f is the union of k so if something belongs to the domain of f must belong to the domain of something in k then we have that gamma satisfies uh that we have the recursion property for v well because v is in k cool and then we have that v up to the segment of x equals f up to the segment of x why is this test by star and part one star says this right so that means that f is equal like if something belongs to s it belongs to b but part one is the one that we proved before and is that we never had two functions they go inside so it doesn't matter which function you take here that satisfies this any function will give you the same the same value so that's how we get that and therefore you get that these two are equal uh again by this the same thing and therefore you get

If you replace since these two are equal and these two are equal you might have a this this must hold uh for f that's how you conclude this okay so slowly slowly each line you need to know uh why is through each line and sometimes it takes some time to figure out okay so the point is so we prove these two we are not fully there because we would like this to be true for all x in the domain which is we want the domain to be everything so let's see what's coming next now we claim that dom f equals a okay so that will give us that f is the kind of what we want right so always stop and see what is it what was why do we want that well because that was our assumption we want f with domain a why is this true well if it fails then there is a least element in a minus dom f why is that well because a is a well-ordering so every subset has a least element so if this is not not equal then this is not empty so there is a least element okay then the segment the segment of t must be a subset of domain f why is that well t is the least one that is not in the domain f

So everybody below is in fact segment of t equals dom f and that's you can see why because everything all the domain of f has to be kind of downward closed because if it has something it has everybody below um but here it's saying that it's not saying well how is it going to use it so but yeah so if uh if something is outside the domain of f nothing above can be out inside either because otherwise everything below would be okay so let's see how it does this so it says take the UNIQUE y such a gamma holes of f and y so why that exists that exists uh if you don't remember go back to the statement uh we assume that for every f there is a UNIQUE y such that f uh we assume that for every any f there is a UNIQUE y such that gamma holes of f and y so that's what we are doing here so we're good and then we let f be not v be f together with t and y so let's see what's happening so sometimes before continuing just see what's going on so what we are doing what is the domain of this new thing v well it's the domain of f union um t right because we're adding a one new pair t the domain of f was um the set of things below t

So actually this is the same as uh all the x's that are less than or equal t of course we have a segment and t okay and we also added y so that means that f of v of t um is y okay so that's how we define the new function we added a new value to it we want to show the v is gamma constructed up to t okay clearly v is a function that's what we're saying and the domain is this guy that's what we're saying good now for x strictly less than t we have that v up to the segment of x equal to v of f to the segment of t because they are equal right okay and also v and f of x are the same because we're equal so by part two here we get that this is true for v because it's true for f and they are equal up to there good for the case uh x equals t we have that v up to the segment of t is equal to f up to the segment of t and the v of t equals y correct so by our choice of y means that what what's that that means this or y satisfies that we obtain that gamma satisfies this and what is there is a parenthesis uh right there which you are saying what is that saying and you might want to say uh that's probably a typo

Okay no more brains right so we get that and then that that implies hence gamma is the v is gamma constructed up to t right we prove it for the one below and for the one exactly t so remember that gamma constructed up to t this had to be true for all x in the domain of the less than or equal to t remember the less than or equal is something that you might forget you can check back but this implies that t belongs to the domain of f after all um why is that well f was defined to be uh the union of all this collection k this collection k was the class of all the v's that are gamma constructed so it should include this particular v that we did so if it includes v and t is in domain of v it should be the domain of f okay so that makes sense and why is the problem well because uh we started saying um if this fails there is at least t that is in a and not in domain of f so that means this doesn't fail so what is that the claim domain of f equals a and that if we look back at the theorem how we are doing so far uh it says there exists a function f with domain f such that these holes

So we show that that such a function exists with domain a satisfies this for all t in a good what are we missing uh that is UNIQUE part four finally we claim that f is UNIQUE good four suppose f that f1 and f2 both satisfy the conclusion of the theorem why is that well we're gonna prove it's UNIQUE so you just take two things satisfy the conclusion of the theorem and then you prove they are with the objective of proving they are equal we can apply to and find the induction okay we can uh it's not saying how so let's see let b be the set of the be the set on which f1 and f2 agree so it's a set of all t's in a such that f1 of t equals f2 equals t okay that's where they agree it suffices to show that for any t in a if the segment of t is including b then t belongs to b why is that always thought well that's because by transfinite induction this property here implies that b equals a right that's what transfinite induction says and then that by definition of b that implies that f1 equals f2 everywhere in a so that's what and that's what we're trying to show that and those two are equal so therefore f is UNIQUE okay

So suppose to show that so i'm guessing that's what it's going to start doing now but this is easy never trust when somebody says this is easy if the segment of t is including b which i guess that's what we're assuming we're trying to prove this right so the segments including b then we have the f up to this f1 up to the segment equals f2 up to the segment right by definition of b b and we also have that gamma satisfies this property for f1 and the same for f2 because that's the property of the theorem the conclusion of the theorem that we're talking about right that's why and then from that you get that by our assumption on gamma we conclude that f1 equals f2 yes because if they both satisfy this gamma thing gamma was a is a UNIQUE element that satisfies these things and hence t belongs to b and we are done you can just like look at that back again uh this one is equal to this one right that's what we are assuming we have right here so therefore by our assumption on gamma uh this one is equal to that one and therefore t belongs to b and we are done in the sense that yeah we got this and

If you get this we get this and if you get this we get the uniqueness if we get the uniqueness we get what we are missing to prove the theorem so that proves the theorem good um so that's the end of the proof so that's a check by a line by line check which is always important that helps you understand what's going on but always after you've finished reading a proof and you got the line by line you understood each line sometimes that doesn't mean you understand what the whole picture so it's worth to kind of step back and now see if you can see the whole picture in the proof or at least the main steps can you just describe the proof in a few words and if you want to describe the proof in a few words essentially the way i would describe it what are the main points the main point is first define this notion of gamma constructed up to t which is has it is a property that we want f to have but only on a domain up to a certain point so we don't do it like all of the domain of a but only half the way and we look at that property okay and

Then we want to consider this collection k of everything that satisfies that property being gamma constructed along the way so what do we need to do we need to show first that any two functions uh in k are compatible so that if you have two functions in k one is an extension of the other one and they match and they give you the same values on their on their intersection of the domains and that also implies that for each t there is a UNIQUE v that is gamma constructed so it allow us to define k using replacements otherwise we couldn't define use prove this theorem without replacement axiom so replacement axiom is used there but also now we have that the case a collection of functions that are nested so since they are nested we can take the union and that's going to give us a function and they can prove that the function satisfies also essentially the gamma constructed property on the union which is what we want then you prove that the domain is everything of this union and then you prove that it is UNIQUE and those uh both in both cases the proofs are going by are by showing okay so

If it is not the domain is not everything or it is not UNIQUE there is a least element where this fails and then you play with that element and get your contradiction so yes that's how you prove replacement see you guys next week



## 43. Part p43 - Epsilon Images

Welcome everybody. So this week we're going to be talking about ordinals. So we talked about well-orderings last week. So well-orderings are this special kind of linear orderings that satisfy this property that every subset has a least element or equivalently that there is no infinite descending sequence on them. So those are the well-orderings and we saw how special they are because they satisfy, we can apply transfinite induction and transfinite recursion. So that allows you to apply these two techniques that are very useful in many things.

As we see, they are kind of a nice extension of the natural numbers to the trans-finite, to beyond the infinite, beyond the finite, I would say. So we saw ordinals and these are the well-orderings.

Now what we want to do, similar to what we did with cardinals, is we want to be able to have for each type of well-ordering a canonical representative, right? I guess there are many orderings that are isomorphic that are exactly the same and then kind of they represent the same ordering. We want to find a canonical representative for each. So we're going to start this with these epsilon images, which are going to give us this representative that we want. So here's the definition.

Suppose we start with a well-ordering a, okay, and now I'm going to write a as having domain a zero. Well, so I'm going to suppose a zero is a least element. Every well-ordering must have a least element because every set has a least element.

So let's suppose a zero is the least element. if you remove a zero, then the rest must have a least element. So there must be a next element.

Let's call it a one. if you remove a one, you're going to have a least element.

Let's call it a two. if you remove a zero, a one and a two, you have a least element.

Let's call it a three. And then if you continue like this, you may eventually run out of elements or maybe you go through all the natural numbers and you don't run out of elements. if you remove all of these guys for all the ends and consider the rest, that's going to have a least element too. Every subset has a least element. So that one we might call a omega. And this might go on and might go on for a long time.

All we know is that every subset has a least element. Okay, so that's our A.

Let's define our epsilon function. So we're going to find the epsilon function using transfinite recursion.

Here is the version of transfinite recursion that we saw last week. This is the more general version. In the more general version, you had a function-like formula gamma x phi. And actually, we had the assumption that I didn't write down that is that for every ex there exists a y such that gamma x y. So this function, this formula gamma is a formula personal logic for set in the language of set theory. It says that we know as an assumption that for every x there exists a y such that gamma holds of x y.

And we know that it's function-like. So actually, we know a bit more. We know that there exists for every x there exists a UNIQUE y which satisfies the formula with x. So in a sense, gamma became like a function. So given x is only one y that is related to it. It's not a function in the sense that it's not a set of pairs because it's not a set.

Actually, it is a class of pairs but it's not a set because we cannot have it inside our universe of sets because actually the domain of this gamma is everything. It's all objects, everything. And that's not a set, as we know.

Okay, so given gamma, what does a transfinial recursion tell us is that there is a function f with domain a such that at each point, so if this one is our a at each point t, the value of f f of t is dy, the UNIQUE y, such that gamma holds of f restricted to the segment. So this part up here is a segment of t. Remember, this is the initial segment below t and y. Right, so that's what a transfinial recursion tells us. if we restrict our function to all the previous elements, gamma looks at what the previous values were and it's a UNIQUE y that is going to satisfy gamma with that. It's kind of the image.

So that's the new value. Yeah, so that's what a transfinial recursion allows us to do.

So let's continue reading. So we have our function e defined by recursion and at a point t is equal to the range of e restricted to the previous values.

Okay, so that fits the definition by recursion. We're going to call alpha the range of e, the final range at the end. And that alpha is what we call the epsilon image of a. That, this is the belongs symbol, the belongs symbol, it's an epsilon symbol. It's not the usual, the one you usually see in LaTeX, but it's still an epsilon symbol, like the Greek letter epsilon. So that alpha is the epsilon image of this well-known.

Let's see how, what it looks like. So what is e, let's start with a zero. Well, what is the segment of a zero? It's the empty set, right? There's nothing below it, right? a zero, we chose a zero to be the last one. There is nothing below it.

So the range of e restricted to that should be empty. So the range should be empty. So this is empty.

Okay, what is e of a one? Well, the segment of a one is a zero. So the range, so e, we are looking at a restricted only to the previous and the range of e up to the segment of a zero is essentially the set that contains the image of a at a zero, right? Which is the empty set. It's the range of the previous values. Sorry, the set with the empty set. e at a two, the segment at a two is a zero, a one.

So the range of e restricted to those two sets is essentially a e of a zero, e of a one, which is equal to the set that contains the previous true, two. And then like, every one like that is essentially e at a, n is essentially the set that contains e, a zero, zero, all the way up to e, a, n minus one. Do we know what these guys are? We do, right? So this one is actually what we call the number zero. This one is what we call the number one.

This one is what we call the number two. This one is a set that contains all those numbers up to n minus one, and therefore is exactly the number n. **Yeah, so these numbers are the numbers in omega that we define, each number being the set of all the previous ones.** So the epsilon image of these first few guys in the well-ordering are exactly the natural numbers. So this one gets not zero, this one to one, this one to two, this one to three. What happens when we keep on going?

Well, e at a omega, a omega, remember, a omega was defined to be, let's put that in a scene aside, a omega is the list of all of a minus the set a i, a n for n in the natural numbers. It has to be a least element if you remove all of those from a, that a omega is the first one without all these guys. So we remove all these guys. This is the first one that comes next. And what is this going to be? Well, this is the set of all the previous ones. e, n, e, a, n for n in the natural numbers.

So that is exactly all the n's for n in the natural numbers, which is exactly omega, right? **The definition in general, again, you can write it up here, e of t, this is another way of writing this same thing here, is just a set of e of i for i less than t, right?** Each one is a set of the image on the previous one, that's what that means. And this goes on, we can go on with the other elements, beyond, and each one is a set, each image, each element corresponds to this, is mapped to the set of all the previous ones, right? So we get these guys, these epsilon images. Cool, okay, that sounds like a strange definition, except that it kind of works kind of nicely with the natural numbers and omega, right?

Like the first element is mapped to zero, the second element is mapped to one. **So it's a weird definition, kind of abstract, but IF you look at it, it works kind of very well.** After all the finite numbers, the next element gets mapped to omega, and then the set that contains omega and all the previous ones, and so on and so forth.

Let's prove a few properties about these guys. First, you cannot have any et, for any t you cannot have et belonging to et.

Okay, so we talked about this before. It's weird to have a set belonging to itself, and we said that. We didn't say anything more than that. We didn't say that it's impossible, we just said it's weird. I guess we all agree. **We're going to have an axiom, it's going to come at the very end of the course, which essentially is going to rule out this possibility.**

**But since it comes at the end of the course, and we want to play with the axioms that we have so far, let's prove this without using that axiom.** Even though we know it's weird, let's just prove it's impossible, at least for epsilon images. This is not saying that it's impossible in general. This is just saying that if you have an epsilon image of an ordinal, then it's not possible. How do you do it? Well, with ordinals, there's always kind of induction over the fact that everything has a list, everything has a least element.

So if there is one, if that's not true, so let's consider the list t with et belonging to et. Okay, there has to be a list one because a is well-ordering, so everything has a list one. And now, well, et, you're assuming that et belongs to et, and et will be the set the set of all the Es's for s less than t, right? **That's the definition of this function, of the epsilon function.** Therefore, there exists an s less than t such that et is equal to et, but then we have that Es belongs to Es, because it's equal to et, contradicting the minimality of t.

Okay, so you couldn't have, without using the regularity axiom or foundation axiom that we're going to see later, you can right away rule out this possibility. Cool. E is one to one. Well, we kind of show that kind of follows from the case before, right? Essentially in the proof before, so because for s less than t, well, any two elements in a, one is below the other one, remember a is in the ordering, we have that Es belongs to et. So by the previous cases, so by the previous case, we must have that s is different.

Sorry. Es is different than et. Cool. So E is one to one. **This property follows just immediately from this definition that we say that this is exactly the set of all the s's such that s is less than t.** So we get exactly that.

I guess we have to use the property that the Es is a one to one, right? So if you're equal, if you belong to, if Es belongs to et, it must, well, this follows from the fact that E is defined like this, the set of all the s's for s below t and that the E is one to one. So then the only way to belong to et is to be is s for s less than t. Alpha is a transitive set. You guys remember what this means? Here, this is a slide from like a month ago or more than a month ago.

We're going to start using this notion again quite a bit. So let's review what this says. So we say that a set a is transitive if one of the following equivalence conditions holds. So these are four conditions, but they are all equivalent. So if you satisfy one, you satisfy them all. I just put them all so just to help your intuition to understand what they are.

Any of these conditions are implies that you're transitive. So the first one is that if x belongs to little a, which belongs to capital A, then x belongs to capital A. So this is kind of the transitivity property of belongs, which in general doesn't need to work, right? Actually, it's a kind of strange set in the sense you belong to something. So it's equivalent to saying that the union of A is a subset of all of A and it's equivalent to saying that if something belongs to capital A, then it's included in capital A. It's the same thing as saying that A is a subset of the power set of A.

A is a member of the power set of A. That's always the case. Here we're saying a subset.

Okay, so that's what transitive means. **And we saw that all the natural numbers, the way we define them, like each one being the set of all the previous ones, those are all transitive.** And omega is also transitive, which meaning the set of all those particular natural numbers, right? So if you belong to a natural number, then you are a natural number.

Okay, so that's what transitive means. Let's see now in the case of epsilon functions.

Why is this? Well, if x belongs to A, which belongs to alpha, and alpha is an epsilon image, right? So alpha is an epsilon image. So instead of all t's, sorry, et for t for t in A. **So that means that A is equal to et for some t.** So, and we have an x must belong to lead to this A.

And this A is equal to essentially all the es's essentially exactly for s less than t. So it follows from here that x must be equal to es for some s below t. And in particular, x belongs to alpha, right? So we started with x belongs to A, A belongs to alpha, and we concluded that x belongs to alpha. So it's transitive. Cool.

So those are all the definitions that we're going to use about these epsilon images. We're going to use this definition too. I'm using a closing parenthesis right here. It's, um, epsilon alpha is just the epsilon relation restricted to alpha. Epsilon meaning belongs to the belong relationship, which is kind of a, still an, it's called an epsilon because it's look, it's like a, the Greek epsilon. Uh, it's, um, it's not a relation in the sense it's not a set of pairs, again, because it's not a set, right?

So each pair might satisfy the belongs relation or not, but it's not a relation in the sense it's not a set because it applies to all sets, right? Domain and domain is all sets. But if you restrict it to a set, like in this case, you can see that all, only the x, y in alpha cross alpha, such that x belongs to y, then we get a, a set. And now if you consider the ordering with domain alpha and this relation, epsilon alpha, it's a relation. Uh, what do we get? Well, we get, uh, by looking at this up here, we get that essentially what we have, it's a map from, here is a with the belongs relation, with the less than relation, and here is alpha and e goes from here to here, and here is the epsilon alpha relation, right?

So we get essentially that two things are related according to less, less than in a, if AND only if the images are related to epsilon alpha in alpha, right? So in other words, maybe another notation, would be to say that the ordering, this one is isomorphic to this structure. This is a bijection between a and alpha that were less than or equal, less than gets mapped to epsilon alpha. So alpha with the belongs relation is isomorphic to a with less than, right? As linear orderings, they are isomorphic. They are the same, uh, linear orderings.

So that's the idea for, of these, uh, epsilon images. So we are obtaining an, another well-ordering that is isomorphic to the original, the one we started with. So we started with an A, and we are obtaining something that is the alpha that is isomorphic, where the relation is very canonical. The relation is nothing more than belongs, okay? So this alpha is, uh, ordered by belongs. That's it.

That's the only orderings. That's a very simple relation belongs. And it's isomorphic to, to the original one. So we're going to see in the next video that this is going to be the representative that we want. So among all well-orderedings that are isomorphic to A, they are all going to have the same epsilon image. It's actually exactly the same, not isomorphic, but exactly the same object.

And then this epsilon image is going to be our representative for the whole isomorphism class of A. See you in the next video.



## 44. Part p44 - Ordinals

Okay, so now we are ready to define ordinances. **Before that, let's prove this theorem that we promised from last time, which is that IF you have two well orderings, A and B, with orderings less than A and less than B respectively, and they have the associated epsilon images alpha and beta, THEN these two well orderings are isomorphic IF AND ONLY IF their epsilon images are equal.** By equal I mean exactly equal as the same, exactly the same object, the same thing, the same, not just similar, exactly the same thing.

Let's do this proof. Let's start with the easier direction, which is going this way. Well, in this case, we have from the observation at the end of our last class that every well orderings is isomorphic to its epsilon image, right, with the belongs relation.

So now we have that A less than is isomorphic to its epsilon image alpha with the belongs relation as the relation, which is, I would assume, is equal to beta, which is isomorphic to be less than B. So we get that A is less isomorphic. So that's very easy. The other one is the direction that is a bit more interesting, and it's also not hard, but we're gonna, it's a good application of transplant induction, so let's go through it.

Okay, so we are going this direction. So we assume that these two guys are isomorphic, so we consider an isomorphism. So let F from A to B be an isomorphism. What does isomorphism mean? Maybe we just put it on the side. **It means that F is bijective, and it means that IF A less than A' according to A, that's EQUIVALENT IF AND ONLY IF their images are related the same way, f of A and f of A' are related the same way, but now these images are in B, so this is according to less than in B, where this one is less than in A.**

Okay, so when you go through F, the relation between the elements gets preserved exactly the same way. So the orderings are mapped the same way through F. So it's an isomorphism, meaning it preserves the relation. So they both look exactly, the orderings look exactly the same according to F.

So now what we want to do, we're going to use transplant induction to show that the epsilon image of an element A, according to A, is equal to the epsilon image of f of A, now according to the linear ordering B. For all a, for all little a in A, for every little a, this image is the same. So how do we do this? Well, let's use the standard induction. So let P be the set of all the little a's in A. Remember, when we want to do something in induction, if you're going to do it clearly, let's always do it this way.

P is the set of all the guys to satisfy the property that we want, meaning when we do the epsilon image of little a, according to the linear ordering A, let's put, is equal to the epsilon image of f of A. **This little a and little b that I'm putting down here is because the definition of the epsilon image depends on the while ordering A.** So essentially this function, you will have like two different functions e, one for A and one for B, according to this definition. So that's what that means. This is according to little a, this is according to B.

Now, if you want to apply a transplant induction, induction, let's see what induction says. It says that if you have a subset B, which now we're calling this guy P, right now this guy is P. This one here is our P right now. And we, we want to conclude that B is equal to A. That's exactly what we want. And for that, what we need to show is that if for every T, if the segment below T is a subset of the whole P, then T belongs to P, right?

Okay. So that's what we need to show.

So let's do that. Consider an element T that belongs to A.

Suppose that the segment of all the elements below T is included in our set P, we want to show that T belongs to P, correct? That's what we need to show induction. Well, let's see how that goes. So that means we want to show that this thing up here holds for T.

So let's see what we get. **E according to A of T is equal by definition to E of S for all S that are, that is below T, that belong to the segment according to A of T, correct?** That's what our definition was, right? All the previous ones. And this is, of course, E according to A.

Now, by the induction hypothesis, we are assuming that the segment of T is included in P, right? So all these S's belong to P, right? **And IF it belongs to P, that means that E of them is equal to the same thing on the B side.** So by the induction hypothesis, this is induction hypothesis, we get that this is equal to E according to B of F of S, where for S in the segment A of T, good. But now F is a bijection. So F of those guys exactly, let's call them something else, let's call them, let's say that we use R for F of S.

So this is exactly F of E of R for R below F of T, right? Belonging to the segment of F of T, right? And this is because it's a bijection, right? F of S is below F of T, if only R is below F of T. And that's the same thing as E of F of T, right? So that's how we conclude that T belongs to P.

That's the property that we wanted, right? That E of T equals E of F of T. That's how we conclude that T belongs to P. And that's what we wanted for our induction hypothesis. So we proved that P is everything. And therefore, these E are all the same.

And therefore, we get that alpha, which is the range of E of A, is equal to the range of EB, which is equal to beta, right? Because EA is essentially the same as EB. They give you the same image. The ranges are the same, because that's what we had just proved. Sorry. I meant here, beta.

Okay, so we go to that two wheeler rings are isomorphic, if AND only if their images, epsilon images are equal as objects. So that's exactly what we want, right? That's what we wanted when we said we want a representative.

So now we have for the whole equivalence isomorphism class of a wheel ordering, like we can group all the ones that are isomorphic and use it alpha as the representative for all of them, the epsilon image. So then we're going to say that alpha is an ordinal number if it's the epsilon image of somebody. So everything that is the epsilon image of somebody is going to be called an ordinal number. And they are just representatives for well-ordering in this sense. Cool. So theorem.

We can characterize ordinals this way. So alpha is an ordinal if AND only if it is transitive and the belongs relation is a well-ordering on alpha, right? So it well-orders alpha. This direction is quite direct, right? Because if alpha is epsilon, the epsilon image of A, then we know from our last week's video that alpha must be transitive, right? And we also know that alpha is isomorphic to A.

And A is a well-ordering, so it's isomorphic. I mean the orderings look exactly the same. It's a complete projection between them. same properties. So if A is a well-ordering, then alpha must be a well-ordering too, right? So then that direction we get pretty easily.

The other direction is a bit more interesting, but it's actually quite easy. And to see that this alpha is the epsilon image of alpha, if we know that alpha is transitive and it's a well-ordering. How do you show that? We use induction on epsilon alpha to show, which is a well-ordering, we're assuming it's a well-ordering, to show that for all beta that belongs to alpha, the epsilon image of beta, according to this alpha, is equal to beta, okay? And again, how do you do that? Well, it's just the usual proof.

Let p be said all beta belongs to alpha, such that according to the epsilon function, beta gets mapped to beta. And now we have to show, consider a beta such that with the statement of beta, including p, we want to show that beta belongs to p, right? That's what we need for the induction. So that we need to show that beta satisfies these things. So what happens? What is this?

Well, let's see what e alpha beta is. **Well, this is by definition, the set of all e sub s for s that belongs to alpha, and s epsilon alpha beta, right?** So essentially, all the s's that are below beta according to alpha. And here is where the transitivity comes in. Transitivity comes in because these two properties up here are equivalent to saying that s belongs to beta. if s belongs to, epsilon alpha means belongs, right?

So obviously, epsilon alpha implies that it belongs to beta, right? Because epsilon alpha was essentially belongs by restricted to alpha. The other way around, if s belongs to beta, and beta belongs to alpha, by the transitivity of alpha, that's why we're using the transitivity of alpha, we get that s also belongs to, s epsilon belongs to beta. So that's how we just get here that this is the same thing as e s for s in beta. But then by induction hypothesis, we know all these s's are below beta, right? So then this is exactly the same as s for s in beta.

And s for s in beta is just another word for beta, right? So that's how we get that beta belongs to p, that proves the induction hypothesis, the assumption for transparent induction, and therefore we get that p equals a. And now that implies that e that the range of, that e applied to all the elements of alpha is actually equal to alpha, because it's all the betas for betas inside it. And therefore alpha is an epsilon image. In this case, this implies that under these assumptions that alpha is transitive and well-ordered, alpha is the epsilon image of itself, and therefore it's an original number.

Okay, so that means we, this definition here, your order number, if you're the epsilon image of somebody, is a bit indirect. This one is very direct. You have a concrete property of what it means to be an order number. You have to be transitive, in the sense of this property up here, and you have to be, and the epsilon relation, and the ordering has to be a well-ordering on you. We're going to see later that actually you don't need well-ordering, all you need is clean ordering, if you have the foundation action which we don't have yet. But okay, that's fine.

We have a class. We have a class. Cool. So that's our ordinal numbers. Transitive sets where the belong relation is a well-ordering, and they are, they satisfy the property that if any two well-ordered interacts a morphic and if and only their epsilon images are these guys, and they satisfy the property that the epsilon images themselves is themselves. Just one more thing to comment.

Could you be transitive and not well-ordered? Let's see that in class. See you guys later.



## 45. Part p45 - Comparability of Ordinals

Welcome back everybody. **So now we're gonna prove a very important theorem about ordinals, which may be with examples we've seen so far you were suspecting it, is comparability of ordinals.** And it says the following, whenever you have two well-orderings, which as we know the ordinals are a special type of well-orderings, UNIQUE representatives, one of the following holds. Either they are isomorphic or one is isomorphic to an initial segment of the other.

Okay so the three possibilities here look like either we have A and B and they are completely isomorphic or A is isomorphic to the segment below a certain element B from B and we get the isomorphism right there or B is isomorphic to the segment below some element little a in A. **So this theorem says one of these three things MUST happen.** Like one has to be isomorphic to an initial segment of the other or they're just the same. So in a sense this provides you an ordering among the well-orderings. Any two well-orderings one is larger than the other and we can linearly order all the well-orderings. That's gonna be quite interesting.

Okay so let's prove this theorem. The idea for the proof is as follows.

Let's do the idea first and then the actual proof. Suppose here you have A and here you have B. They don't need to be equal but we don't know how they are. What we're gonna do is we want to define this isomorphism between either the whole thing or one segment or the other and what we do is we take the first element here and the first element there. They have a first element right because every subset has a least element for the whole thing and we match them.

Now we remove those guys look at the least elements of the rest and we get a least element here and a least element here and we match them. Now we remove those least element, least element, match them. So on so forth maybe we go infinitely infinitely much but whenever we are it's always a least element and least element and we match them. Least element, least element, match. And we are going to go all the way until we run out and eventually we will run out and either we run out because these elements run out and we have no more A or we run out because this one goes to here and then we don't know where to map this guy or they just match. Right?

**This is an intuitive definition which, an intuitive proof which ONLY works once you're very used to working with transferring recursion.** Right? Because A is this like infinite, it could be these huge sets. All we know about it is this properties of well-ordering. So this thing about doing things one step at a time intuitively kind of makes sense but formally it doesn't. Right?

Because what does it mean one step at a time when you have a set A that has a size of the power set of reals? In what sense? What's it at one point at a time? So the formality behind is recursion. The intuition behind recursion is you just do one step at a time.

So let's do it. So let's start taking an element. **So we define a function a, f from f from a to b union a top element.**

Let's say another element that is new. Let's call it t for top. And t is a new element that doesn't show up anywhere. Sometimes. We think of it as above by transfinite recursion. And the idea is exactly what we did so far.

Right? So if you want to define, here we have an element t and we want to define f of t, what do we do? And the idea is to do what we did so far.

Suppose we have an element t and we want to define its image f of t. So then we say, well, look at all the previous guys. Where were they mapped? And then we say, well, where do we want to map this new guy? Well, we want to map it to the first position that hasn't been mapped yet. Right?

And that's going to be our f of t. Right? And then you go, every time you take a new one, you look at all the images of the previous ones, and then you say first position that hasn't been mapped yet.

So let's do that. So f of t is going to be the least element of b that has not been mapped yet. So that it doesn't belong to the range of f up to the segment of t. So it's not in the range so far for the elements below t. This is the least element according to b, right? This is the least element according to b.

And there has to be one. Well, there has to be one if that set is not empty. So this is if the range of f up to the segment of t is not everything. It's not everything. Right? And otherwise, we don't have room because otherwise that set is empty.

We don't have room. This would be, and the other case would be a case when we want to define it here and the images of all the previous ones have run out already and we don't know where to go. Because there is nothing else. In that case, we map it to this top element. Otherwise, we let it be t if run f up to segment of t contains all of b.

Okay? So let's see that this works. So what do we need to show? There are a few things.

First, if s is less than t, there are two elements of a and f of t is not top, then f of s is less according to b to f of t. Why is that? Well, when you define t, why is that? Well, when you define s, you define s to be the least element of b minus this range up to s. And when you define t, you did the same thing, but you took a smaller set because by the time you define t, you have removed more things from b, right? The range is larger, right?

So s is a least element of a larger set, right? Every time, so in this, these are the sets, the elements that are left every time there are things, less things left. So if you take the least of a smaller set, you start going up, right? Essentially, that's what does happening over there. So we get that it is one-to-one and order-preserving on the domain.

Another observation is that if we have that element b is less than f of t, according to b, and f of t is not top, that means belongs to b, then there exists an s less than t, such that f of s equals to b. **And the reason is that IF you're below, but you're NOT in the range, IF this wasn't the case, it means that you're NOT in the range up to level t, up to point t, you're still NOT in the range, you're still NOT. IF this was the case, that means you're NOT in this set.** But if you're not in this set, then you would define f of t to be that guy, because you're taking it to be the least one. So if you didn't choose that guy for f of t, it's because that guy was already in the range. So that means it was f of s of some b for s below t.

So this function essentially what this picture shows, what these two things show, is that the function is always preserves ordering, and it doesn't leave gaps. You don't leave any gap in here in the function. Essentially it's defined so that it doesn't leave gaps. You always take the least one that is not in the range, so there's no room to leave gaps. By the way, the fact that this list exists is because you're using the fact that b is well-ordered to do this. We're using the fact that a is well-ordered to use transparent recursion.

Okay, so good so far. Now, we essentially have what we want. We have to show that this function is going to be the isomorphism that we want in at least one of these three cases. Case one is that t belongs to the range of this map f. **In this case, IF you look at the picture, it means that t belongs to the range, somewhere right there.** So there must be some element mapping to it.

Actually, and all the elements later are going to be mapped to it too. There are going to be many elements mapping to t. But there is going to be a least element mapping to t because it's well-ordering, so every subset has a least element. And all the previous ones are going to be in one-to-one correspondence with b. So let a be the list such that the range that maps to t, f-1 of top, the list one that goes to there. So that means all the previous ones do not get mapped to top.

So then we get that f is a bijection from the segment of a to b. Because the reason that a was being mapped to top is that we already had that b belonged to the range of f up to the segment of a. So that's exactly this case up here. And all the elements below get mapped to things that are not top because a was the least one that is mapped to top. So actually we get in that case we have equality right here. So actually equality right here.

So f up to the segment of t is equal. The range of f up to the segment of t is equal to b. And we get a bijection and that's our isomorphism. So that means we are in this case up here.

Okay. Case two is when the range of f is actually equal to b. But in that we already know that it's one to one that it's already preserving. So in this case we get that a less than is isomorphic to b. And therefore we are in this case. Case three is at the range of f is a proper subset of b.

So let b be the least element of b minus the range of f which we are assuming is not empty. But we know from our second condition right here that the range of the function f is closed downwards. if something belongs to the range everybody below it also belongs to the range. That's what that says. So b is the first one that doesn't belong to the range. So what we actually get right here is that the range of f is equal to the segment of all the things below b.

So b is the least one that is not in the range. In the range. Right. And then that gives us. That puts us in case two. Good.

So essentially those are the three cases. Either somebody you run out and you map up there. Or you finish exactly at the same spot. Or maybe you run out you finish a and without running out of b. But in this case those initial segments are isomorphic. Cool.

So that's the proof of the theorem. So now we get that any two well orderings. One must be an initial segment of the other one. And so the well orderings are themselves linear order. We're going to see that in the next video. And actually the well orderings are themselves well ordered by this inclusion relation.

See you guys in the next video.



## 46. Part p46 - The Burali-Forti Paradox

Welcome back everybody. So in this last video I want to mention some properties of ordinals and the classical ordinals. I go through them verbally, but I'd like you guys to go and check all the details, make sure you understand why each of these is true. Using paper and pen and reading like I was reading last week in the textbook, just make sure every little detail is clear.

Okay, so here's a theorem about ordinals. It says that whenever you have ordinals alpha, beta and gamma, a bunch of properties.

First two, I guess, in the textbook here in order. Well, this one essentially is just because we know that an ordinal is a transitive set, right? We prove all ordinals. So you're an ordinal if AND only if you're transitive and the belongs relation is well-ordered. So ordinals are transitive therefore this is the case. Actually, any member of an ordinal must be an ordinal.

Why is that? Well, we have that if you have that X belongs to an ordinal alpha, then alpha is transitive. So you get that X is a subset of alpha. So the ordinal relation as it is transitive, the ordinal relation on X is the same as the ordinal relation on alpha. I mean, the belongs relation on X is the same as the belonging relation on alpha, right? Because if you have that Y belongs to Z and these are two elements of X, then Y belongs to Z as an element.

There are also elements of Y because alpha is transitive, so the same order you have there. And also, if you are a member of a transitive set, you must be transitive too. Because if Z belongs to Y, that belongs to X. Since we know that X belongs to alpha, then we know that Y belongs to alpha. then we know that Z belongs to alpha. And now we know that among the elements of alpha, any two elements are this alpha is well-ordered by the belongs relation.

So you must have either Z belongs to X or X belongs to Z. But you couldn't have X belongs to Z because then X will belong to itself by a transitivity inside alpha. So you must have Z belongs to X. So that's that part. Alpha doesn't belong to alpha, then this is because alpha is a transitive the image of this epsilon function and we already showed that in that case you never belong to yourself. Also because we know that belongs relation in alpha is well-ordering, a strict well-ordering, so nothing inside belongs to itself.

Exactly one of the following holds. Whenever you have two ordinals, alpha and beta, either alpha belongs to beta or alpha equals beta or beta equals alpha. This is an important one.

Okay, so whenever you have two ordinals, either they are equal or one belongs to the other. **And the reason for this is that we know from the previous theorem that either alpha with the ordering epsilon alpha is isomorphic to beta with the ordering epsilon alpha, because they are well-ordering, or alpha epsilon alpha is isomorphic to the segment isomorphic of some b inside beta, epsilon alpha, or b inside beta.** Or we know that the segment of some a inside alpha is isomorphic to beta, right? For a in alpha. But what is the segment of b according to the epsilon relation? Well, it's everything that's below b, so it's everything that in this case belongs to b, because we are using epsilon relation, right?

So being below means belonging to, that's the relation we're using here. So everything that belongs to b, what's everything that belongs to b? Well, that's b, right? And what is everything that belongs to a? Well, in this case, it's a, right? So in the second, in this case, we get that alpha is actually the same as b, right?

I mean, they are isomorphic as well-ordering, so they must be equal. So we get alpha equals b, because they are epsilon, they are both epsilon images of the same thing, which belongs to beta. And in this other case, we get the beta is equal to a that belongs to alpha. To draw this in a different way, what's going on here is that if you have an order of alpha, and you have an initial segment a of all the things below a, then this thing is exactly a, right? Each thing, each element is equal to the set of all the previous ones, right? And when we have ordinals, if you have that beta is isomorphic to this initial segment, then beta actually is equal to the initial segment, because they are both epsilon images.

And if you're equal, then you must be equal to this a, which belongs to alpha, right? So in the case of ordinals, b in an initial segment is the same as belonging, cool. Or in other words, yeah, so the segment of all the things below a in a is actually the same as a, that belongs to a, that's what I'm saying. Cool. And last, every not empty set of ordinals has the least element. Well, this is because if you have a set of ordinals s, set of ordinals, and it has some ordinal inside, let's call it alpha.

Then you do s intersection alpha, then we have a subset of alpha, right? And then that one has the least element, because it's a subset of alpha. But now, every ordinal in s, that is below that, well, every, everything in s, now s doesn't have anything below that least element, because if it was below that least element, it would be in alpha, so it would be in s intersection alpha, right? So essentially, this is a kind of an initial segment of s, so the least element of s intersection alpha is the same as the least element of s. Again, work out the details. As a color, we get the Burali 40 paradox.

I mean, this was originally stated as a paradox before, before 70, before ZFC was developed. People were working on it on ordinals a bit below before ZFC was developed, right at the turn of the century. And here, this is one of the paradoxes, there is no set of all ordinals. if you put all ordinals in a set, we get a contradiction. That's what it's saying. And what's the reason?

Well, if you put all ordinals in a set, by our previous properties, this set would be an ordinal itself, right? Because it's linearly ordered by belongs, it's transitive, it's linear, and it would be well-ordered. Every subset would have a least element, right? So if the class of all well-orderings is kind of well-ordered, so if it was a set itself, it would be an ordinal itself. But then you would have that this ordinal belongs to itself, because we're talking about the class of all ordinals. if it has an ordinal, it belongs to itself, but that cannot be the case for ordinals.

So we get a contradiction right away that the set of all ordinals, well, the class of all ordinals cannot be a set, okay? It's larger than any set, essentially. And we get a bunch of other properties here, just to build some ordinals. Any transitive set of ordinals is itself an ordinal, well, because it's transitive, and because every subset has a least element. So it belongs is linearly ordered and well-founded. So if you're a transitive set of ordinals, you're transitive and belongs is well-founded, well-ordered.

So you must be an epsilon image, so you must be an ordinal. empty set of zero, or the empty set is an ordinal number. We saw that. It's a epsilon image of the empty well-ordering. Whenever you have an alpha, alpha plus, an ordinal alpha, alpha plus is also an ordinal. if you guys remember what this guy was, this is a set alpha union alpha, and essentially this is what you get by, if you have the well-ordering alpha, putting one element on top, bigger than all the other ones, you have to show this guy is transitive.

Well, you have to take an element from it and see that it's included. It's not that hard. And you have to show that belongs relation is well-ordered, but you're adding one thing on top, so that shouldn't be hard. if A is a set of ordinals, then the union of all the elements of A is also an ordinal. Well, this is because all the ordinals are transitive, so every element of an ordinal is also an ordinal, so the union of A will be a set of ordinals. It will be transitive too, because each of these guys is transitive, so if you take the union of all these transitive sets, you get a transitive set.

And if you get a transitive set of ordinals, it must be an ordinal. So the union of a whole class of ordinals is itself an ordinal. And actually, this union is the supremum of all the ordinals in the class. In the terms of this ordering that we have among ordinals, you're going to get that this guy is equal to the supremum of all the ordinals in the class A.

All right, so that's it for this week. All these properties are a bit delicate to look at, so please spend some time trying to understand all the little details behind his proofs, because that's the only way you can get used to working with such an abstract object like ordinals.

All right, see you guys next week!



## 47. Part p47 - Hartogs Theorem

Welcome everybody. So now we are starting to, in these last couple weeks, we're going to start to tie up the last few loose ends that we left throughout the course. **So in this week we're going to finish all the proof, remember, of all the equivalents of the axiom of choice now that we have this tool of the ordinals.** The ordinals are going to be a good tool to talk about many of the things that I've been talking but couldn't fully talk in detail. So we'll see this in the next couple of weeks. So the first theorem I want to show you is Hartog's theorem.

**Hartog's theorem is essentially saying that there are ordinals that are large.** So what it says is that for every set A, so it doesn't matter what the size of this set A, so think of a big set A. There is an ordinal alpha that is not dominated by A.

Okay, so just as a reminder, alpha dominated by A means that there is a one-to-one function from alpha to A, right? That's what it means to be dominated. **Alpha being dominated by A, which we write with this symbol is currently less than or equal means that there is a one-to-one function from alpha to the set A.**

Okay, so here the theorem is saying there is an ordinal that is not dominated by this set. So there cannot be like a set that is so large that dominates all ordinals, essentially. So no set can dominate all ordinals. That's what's hard to say. It's going to be quite useful in the proofs coming up.

So let's prove this. Actually, it's going to be a constructive proof. **This proof is NOT going to use the axiom of choice because, well, we want to use it to prove the EQUIVALENT versions of the axiom of choice.** So we don't want to use it. We use the axiom of choice here. if we were going to use the axiom of choice, we could say that this is dominated would be equivalent to saying there is an ordinal function from A into alpha.

**There are other equivalences, but let's stay with this one so that we don't use the axiom of choice.** So consider the following. The set of all ordinals which are dominated by A. Well, it says set, but we are not using the subset axiom right there. I just put beta into that something. So we have to show this set before we can talk about it as a set, right?

So why is this? Well, I claim the following. **We claim there is a set because alpha is the set of epsilon images of the following set, B, R, such as B is a subset of A, R is a subset of B cross B, R is a well-order.**

Okay, so I'm claiming that if you take the epsilon images of all the pairs B, R with the property that B is an actual subset of A. Okay, so here we are taking these guys, they belong to the power set of A cross power set of A times A, right? Because we are taking B, which is a subset of A and R, which is a subset of B cross B, which is a subset of A times A. So we can use the subset action to define this set and we are considering the pairs B, R, such that R is a well-ordering of B.

Okay, so it's a binary relation. So we're saying it's actually a well-ordering. Some are well-ordering, some are not. Just consider the set of the ones which are well-ordered for B, a subset of A. **And we claim that this thing up here is exactly the set of epsilon images of these guys.** Well, that's kind of clear, right?

Because if you're an ordinal and you're dominated by A, that means there is a bijection between you and a subset of A. So if you have a one-to-one map from an ordinal beta to a set A, then the image of this set, of this ordinal, is a subset of A. **And IF we define R to be the set of all A, B that belong to B squared, such that F inverse of A belongs to F inverse of B.** So here is A, B, and here is F inverse of A, F inverse of B. We will get that this relation is actually isomorphic to belongs, right? So belong here and R here will be an isomorphism.

So we get that every ordinal that is dominated by A is isomorphic to one of this form for a subset of A. And if it is isomorphic and it is an ordinal, then that means a beta is an epsilon image of that well-ordering. And the other way around is quite obvious, right? So if you have the epsilon image of something of this form, well, the epsilon image gives you a bijection between the ordinal and the well-ordering. So if you have the epsilon image of this guy, if the epsilon image of something like this is beta, then beta, of course, you have a one-to-one function from beta to A given by the epsilon image.

Okay, so that's why this is the set. And then what are we using here? then use replacement.

Okay, so use the replacement axiom right there because now we have a set of images. The epsilon image is UNIQUE, right? Given a well-ordering. So that tells you that alpha is a set.

Okay, so it's a set. **So that means that took a while, but it's important to know that it's a set.** And then also, what else do we have? We know that alpha is a transitive set, right? Because if gamma belongs to beta, which belongs to alpha, right? then we have that gamma is a subset of beta, which is dominated by alpha.

Sorry, by A because that's what it means to belong to alpha, to be dominated by A. So we get that gamma is dominated by A2. So it must be also in alpha.

Okay, so it's a transitive set of ordinals. So here's a transitive set of ordinals we proved last week. That means you are an ordinal, right? Remember that every ordinal is a set of all the previous ordinals. So every ordinal is itself not only an ordinal, but it's also a set of ordinals, right? Every ordinal is a set of all the previous ordinals.

**So IF you have a set of ordinals that is transitive, IF you're restricting yourself to ordinals, to sets of ordinals, THEN being transitive means that you're closed downwards, right? IF gamma is less than beta, and beta belongs to alpha, THEN so does gamma.** So you're a downward closed set of ordinals, so you have to be an ordinal too, essentially the next ordinal that is not in the set. No ordinal belongs to themselves, so an alpha does not belong to alpha. We proved that last time. So that means that alpha is an ordinal, and alpha is not dominated by A, because otherwise it would belong to alpha, right?

Alpha is the set of the things that are dominated by A. So this one is not. Cool. So we have constructed an ordinal that is not dominated by A. Actually we found this, we built the least ordinal not dominated by A. And this is going to be very useful in the next videos.

See you guys later. See you guys later. See you guys later.



## 48. Part p48 - A Proof of Zorn's Lemma

Welcome back, everybody. **So now we're finally going to prove Zorn's Lemma using the axiom of choice and using ordinals.** Remember, ordinals don't need the axiom of choice, so the axiom of choice is going to come in a separate part.

**So let's do a quick reminder of what Zorn's Lemma says, since we're going to give the proof right here.** Zorn's Lemma says that if you have a collection of sets, A, so I think it's a bunch of sets, with the property, that whenever you take a subset of this collection, which happens to be a chain, a chain meaning that every two elements in the chain are comparable, like one is including the other one, so every two sets in the chain are either one inside the other or the other inside the one, but they are not incomparable. That's what makes a chain. So this says that whenever you take a chain, the union of the chain, which is like the biggest one, like the chains, they are all nested inside each other, so essentially if you union everything, you still get something that belongs to the collection. This is a property of the collection, right? The collection doesn't need to be a chain, but whenever you take a chain, the union belongs to the collection.

It's kind of closed. This collection is closed under union of chains. if you have this, then the collection has a maximal element. And as we saw before, in previous videos, it's super useful to prove a bunch of things. A maximal element means it's an element of the collection that is not a proper subset of any other element in the collection.

Okay? So it's not properly included in every other subset of the collection. Cool.

Okay. So let's prove this.

Let's start using Hartog's theorem from the previous video to take an order in alpha that is not dominated by the collection A. So there is no one-to-one fraction from alpha to the collection A of sets.

Okay? So the idea now is the following. We are going to use transfinite recursion on alpha to define a very long chain of elements of the collection A, trying to find the maximum element. Essentially, we're trying to find the biggest element we can. And we do it step by step by recursion. Every step, we take a bigger set within the collection.

And then there are two possibilities. Either eventually we reach a maximal element, or we just keep on going up. Keep on finding bigger and bigger elements, right? And the hypothesis about this collection A, that the chains, the units, if every chain belongs to the collection, allow us to keep on doing this recursion defining these sets. **Even when we go through infinite ordinals and limit ordinals and everything, you can always take the union and keep on going and keep on going, unless you reach a maximal element.** And the final punchline of the proof is that if we never find the maximal element, we end up building a one-to-one map from alpha to the collection, which we are assuming we cannot because alpha is, in a sense, larger than the collection.

It has more elements than the collection, so we cannot do a map. So eventually, we have to run out of elements and find a maximal element.

Okay, so let's do that proof. So suppose that A has no maximal elements, okay? So we're going to get a contradiction with that by building, if there are no maximal elements, we're going to be able to build this infinite chain of length alpha, so essentially a map from alpha to A that is one-to-one, contradicting that alpha is not dominated by A. **So how are you going to use the axiom of choice?** So use the axiom of choice, and essentially you're going to use parts one of the axiom of choice to get a function.

Let's call it F from A to A, such that for all Roman A in A, F of A is a proper extension of A. Okay, so the axiom of choice is going to give us such a function.

Why is that? Well, we know that A has no, the collection A has no maximal element, so for every set inside, there is a proper extension, right? That's what it means. Being maximal means there is no bigger set within the collection, right? So the fact that there are no maximum, our assumption that there are no maximal elements means for every set that belongs to the collection, there is one that is strictly bigger. So we have essentially the relation of being strictly bigger, right?

So essentially what we are doing here, let me just put it on the side, so we are taking this relation R to be all the sets A comma B in A cross A such that A is a proper subset of B, and we are taking F to be a subset of R. Essentially what we are doing is we are taking essentially what we are doing is taking this relation R of all the pairs which belong to sets in the collection such that the first one is properly included in the second one, and then we are taking our function F to be a subset of this relation. **And since A has NO maximal element, the domain of F is the domain of R by the axiom of choice, which is all of A because every set in the collection has a proper subset according to our assumption.**

Okay, so that's what the axiom of choice buys it. For every set gives us a bigger set. **Before we put out the axiom of choice, we know there are many proper supersets, bigger sets, but we want a way to choose this in a uniform way.**

Okay, good. **We have the axiom of choice, so we can do this, and now we want to use recursion to define this map.** So I use transfinite recursion to define a function, let's call it H, from alpha into the collection A as follows. For beta in alpha, we want H of beta to be what? We want it to be something that is properly extending all the previous ones. So we are going to take the union of the range of H up to beta.

So we are going to consider all the previous ones, take the union, and then take a set that is strictly bigger than this. So by this, this range is a set of all H gammas for gamma less than beta. So we're getting the union of those and then applying F, which is going to give us a proper superset. You have to make a little case here. This is if the union of the range of H up to beta belongs to the collection. if not, let H beta be some fixed set A for some that belongs to the collection.

Okay, so the thing is that I don't want to claim yet that the union of this range belongs to the collection. Which, for instance, if in the case when beta is zero, this union is empty set. We don't know if the empty set belongs to the collection. So in that case, we know the collection is not empty, right? This is an assumption that I shouldn't make right here. So it has some element and so fix an element in the collection to begin with and you start with that element.

And then if you take any, then I'm saying, then later on, this is not going to happen. **This is always going to belong to the collection, but THEN it's a proof and we want to, the proof comes after the definition, right?** So I want to make a definition without using the fact that this is going to belong to the collection. So I say, well, if it doesn't, I just define it this way, but I know it's going to work. So then we need to show that. That's what we need to show in the next.

Okay, so let's prove that. **So claim for all gamma less than beta, H of gamma is a subset of H of beta.** It's a proper subset of H of beta. So this is showing that this function is defining an increasing sequence of sets bigger and bigger and bigger and bigger. How do we show this? Well, we show this by transfinite induction.

So that means let P be the set of all betas that belong to alphas, such as for every gamma less than beta. H of gamma is a proper subset of H of beta. So let P be the set of all the betas that belong to alpha, such that we satisfy this property that we want to show, that if gamma is less than beta, then H beta, H gamma is properly included in H beta. So to prove this by induction, we have to assume this is true for all the previous ordinals, and we want to show it for beta. So pick a beta, assume that it's true, every previous element belongs to beta, and assume it's beta. So we want to show that if the segment of beta is a subset of P, then beta belongs to P.

That's what you need to show, that's how transfinite induction works. And in the case of ordinals, the segment of P is everything that is below, the segment of beta is everything that is below beta. And what is everything that is below beta? Well, that's exactly beta. So we can change that for beta, right? Because beta is exactly the set of all the elements that are below it.

Now, every ordinals is the set of all the elements that are below it. So we want to show that if beta is a subset of P, then beta belongs to P to get the induction. Beta is a subset of P means that for every ordinals below P, you have this property, right? So beta belongs to P implies that this set H gamma gamma in beta is a chain, right? Because that's what we're trying to prove. So for all the previous ones, we have that they are all nested and including each other, right?

But if it's a chain, then that means that the union of this set of the range of H up to beta belongs to the collection, right? **And IF it belongs to the collection, THEN definition of H beta tells us that the image of H beta is a proper subset of the union of all these guys, H gamma, gamma in beta, right?** And a proper superset because that's what F does. It gives you a proper superset. But then once we have a proper superset, that means that you are, you contain all those guys and you contain them properly. So that gives you that's what we want, right?

So then beta belongs to P. And that's what you need for the transparent induction. So you get that by the transparent induction that P is everything is alpha. And then you get by the transparent induction that P has to be equal to all of alpha and therefore we get the property that we want. So we get from here that H is a chain and whole H, all the elements are bigger and bigger and bigger and they are all different, right? **So that means that H from alpha to A is one to one.**

So they are properly. And then that is a problem? Yes, that is a problem. That is a contradiction because we started assuming that alpha does not, is not dominated by the collection A. Right? This is the collection A.

And we define this long chain size up. Okay, so that's the proof. At every point we are choosing something that is bigger and bigger and bigger. **And IF you have an ordinal that is called a limit ordinal, one of those that after infinitely many steps, the next one just take the union, keep on going up, going up, going up.** So it's not possible to suppose that A has no maximal elements because if you do that you will be able to build this chain of size alpha which is not possible.

Okay, so that's our proof of Zorn's Lemma using axiom of choice part one. **So next we want to finish up all equivalents of the axiom of choice.** See you guys later.



## 49. Part p49 - Finishing the Proof of Equivalent Versions of the Axiom of Choice

Welcome back everybody. **So now finally we're going to pay our debts and finish the proof of this theorem that we started a few weeks ago on the videos, the ones that are called axiom of choice, right?** This is a couple of weeks ago, look for axiom of choice videos. What we had there was this theorem up here.

**The theorem talks about many EQUIVALENT descriptions of the axiom of choice, many EQUIVALENT versions of the axiom of choice.** This is a new one, so before we only had six versions, and we're going to add one more, which is this one called WO, WO for well-ordering principle, and well-ordering principle says that every set can be well-ordered. What does it mean? That for every set A, there is a relation, a binary relation, so a subset of A times A, which is a well-ordering on A, okay? So every set can be viewed as a domain of some well-ordering. There's some way of taking the element and put them in a well-ordering chain.

**That's what the well-ordering principle says.** So we're adding that one to the list. We had all these ones before, right? And we proved many of these implications.

Let's see what we have proved so far. **So these are the implications we proved a couple weeks ago when we had that theorem, IF you remember.** We proved 1, 2, 3, and 4 are all equivalent, and they were all kind of choice versions of axiom of choice in the sense that there is some way of picking elements, of choosing elements within a certain setting. They were all kind of similar ways of saying how you can pick elements within a certain setting. then 5 and 6 were of a different sort, right? So 5, cardinal comparability, says that whenever you have two sets, one has to be dominated by the other, and Zorn's Lemma was number 6.

So today we added, in the last video, we added one more implication, which was this implication, right? **So now we have the EQUIVALENT with Zorn's Lemma with the rest of the axiom of choice, and now we're adding one more statement.**

Let's add it right here. **So we have the well-ordering principle, and the goal for today is to show how comparability, comparability of ordinals implies the well-ordering principle, but the comparability of cardinals implies the well-ordering principle, and how the well-ordering principle implies the rest of the axiom of choice.** And doing this, we close the circle of all equivalences, right? With that, we'll get all equivalences. By the way, the textbook does different directions than here, so you can read for getting a new proof, a different proof, a different perspective. But I like these implications.

So, okay, so 5 implies well-ordering. So let's prove this, that cardinal comparability implies well-ordering. The statements, I wrote them right there. cardinal comparability says that for every two sets, one is dominated by the other one, and well-ordering says that every set A can be well-ordered. You can define a relation on it that is well-ordered. How are we going to do this?

**Well, this is a direct application of Hartog's theorem.** So we're giving a set A, and by Hartog's theorem, we know there is an ordinal alpha which is not dominated by A, right? That's exactly what Hartog's theorem says. then, by our assumption on cardinal comparability, we have that A must be dominated by alpha. Because either alpha is dominated by A or A by alpha, according to cardinal comparability. And since alpha is not dominated by A, A has to be dominated by alpha.

**And that means that there is a one-to-one function from A to alpha.** So let's F from A to alpha be one-to-one. And now we want to define this relation on A. I'm going to call it R here just to not conflict with the other definition, with the other notation, sorry.

So let's say A is related to B. For two elements in A, let's say that A is related to B if AND only if F belongs to F . So then we get an isomorphism between A, R and the image of F inside alpha and belongs relation. So it's an isomorphism between A and a subset of alpha. But we know from before that if you have a subset of a well-ordering, then you're still in the ordering and still every subset has a least element. So this one is a well-ordering just because it's a subset of the ordinary alpha, which is a well-ordering.

Okay, so that means that R is a well-ordering and we get a well-ordering of A. Okay, so that means the whole idea of this proof is once you have a one-to-one map from F to an ordinal, then you can kind of pull back the well-ordering relation on alpha to get a well-ordering relation on A. Cool.

Okay, so that's why every set can be well-ordered if you assume cardinal comparability. **And now the last direction that we were missing was that the well-ordering principle implies the axiom of choice, like one of these choice versions of the axiom of choice.** And we're going to use number three. Number three is the one that says that whenever you have a set, this is a one-to-one function from the collection of subsets of A, the collection of non-empty subsets of A to A, with the property that F always maps a subset B of A to a member of B.

Okay, F of B is always a member of B. How are we going to do this? Well, we have the well-ordering principle. So all we have to do is we'll order A. Once you have a well-order A, we have a way of choosing this element F of B. It's going to be just the least element, right?

Remember, a well-orderings have the property that every subset has a least element. So that gives us a way of choosing, right? Just choose the least element.

So let's do that. So let's curvy A be a well-ordering of the set A. **And now we want to define this function F without using the axiom of choice, right?** Because we are proving the axiom of choice. So we need to define it using the other axioms.

So let's be careful. And let's define it using the subset axiom. So let F, remember a function is equivalent to its graph. It's a set of pairs. So it's going to be the set of pairs B comma little b, which satisfy the following property. Well, which belong to power set of A.

Well, B cannot be the empty set. empty set without the empty set. Times A such that, and what is the property that we want? B is the least element of B.

Okay, so it's an application of a subset axiom to give us this set of pairs. And what do we have to observe here? Well, for every subset B, capital B of A, belongs to the domain of this F. What else do we have? Well, F is a function because for every set B, there is a UNIQUE least element. Right?

This is a well-ordering. So it's a UNIQUE least element. So for every B, there is a UNIQUE little B corresponding to it. So F is a function. And also, F of B belongs to B because it's the least element of B. Right?

So that's it. That's the proof of choice principle. **So the well-ordering essentially gives you a way of defining a choice function without having to appeal to the axiom of choice.** You just define it as the least element in your subset. That finishes the proof of all the equivalents of the axiom of choice. We went around in a couple of different ways.

Now we know that all of these statements are equivalent. **So whenever we say we're going to use the axiom of choice, we can meet any of these.** We have to be specific about which one. But if we assume the rest of the axioms, all of these are equivalent.

All right. See you guys in the next video.



## 50. Part p50 - The V Hierarchy

Welcome everybody. So one last thing for this week is the developing of these V alphas. We've been talking about these V alphas since the very first day of classes pretty much. And now we want to define them for all ordinals alpha. **So here is essentially the definition by recursion.** And this is for, let's write that down.

**And it's a definition that is going to work for all ordinals alpha.** Let's go back to the intuition, which we did many times, but we might as well write it again. So the way we start, V0 is going to be the union of an empty set. So that's going to be the empty set itself. V1 is the set that contains the empty set. V2 is the set.

It's the empty set and the empty set. V3 is the set and so on and so forth. And then we had V omega, which was the union of all these guys. V omega plus 1, which was the power set of V omega. V omega plus 2 is the power set of the power set of V omega. Right?

And that's what we get from that definition. You notice that this union up there, that all these sets are including each other. You always get this inclusion, which you can prove by the infinite induction, that you always get inclusion. And then when you take the power sets of a nested sequence, you still get a nested sequence. So they are all included in each other. So this is a chain of sets.

**So the union is just taking essentially the largest, IF there is a last element, the union is just that element, the largest. IF there is NO last element, IF you have kind of like a limit situation, like in the case of V omega and we have to union all these guys, THEN we get kind of the supremum, the union of all these guys.** That's the V omega. And then this is going to have another limit situation when you do V omega plus omega, which is the union of all the V omega plus n's, right? For n in omega. There's going to be a V omega plus omega plus omega, which is also going to be a finite union.

And these guys grow and grow and grow. Right. And usually the picture one draws for, and this is where the V comes from, this guy. **So here, down here we have V zero and here we have V one and here you have V two, V three, and THEN you go on and THEN you go on and THEN you end up with a limit and THEN you get V omega, which is all the one below and THEN V omega plus one.** And then you get to a limit, V omega plus omega, omega plus one, omega plus two, next limit. And then you get a limit of limits and you get V omega times omega.

It's a limit of infinitely many limits. And this picture keeps on going up. It looks like a V. That's where you get the V hierarchy of sets. Each one is a power set of the previous one and starting from nothing, start building like that. And you get a lot of these sets.

These are sets that are very special. We'll get to do more about them in a minute. **Before, okay, so this is the definition you can see by transforming recursion.** And we're using just the union of the power sets of the range. So what we're doing here is nothing that than the union of the power sets of let's call it A for A that belongs to the range of V restricted to alpha, right? So this is essentially just, this is just something that depends on V out to alpha, right?

Which is exactly what we have when we do transferring recursion. Let's look for that slide. Here's a slide from a few videos ago, from last week, I think, about transferring recursion. So essentially, you start with a while ordering and you have this function gamma that is function-like. And actually, it satisfies even that for every x that exists a y such that this formula is true. So it's gamma kind of gives you like the graph of a function.

And then you get that there is a UNIQUE function f, which in this case is a v function, the sequence of the v's, with domain a, in this case it's the ordinal alpha, such that f of t is what you get when you apply this gamma to f of the previous values, right? So this is essentially kind of what we are doing here, right? So our function gamma is this one. That is the formula gamma, we have to spell that out in first order, but essentially that's what that's what it is, where x here is essentially v restricted up to alpha, and this is v at alpha, right? So that's how you use transfinite induction to get these v's, except there is some little problem, which is we are defining this for all ordinal alpha, right? **So IF you look back at transfinite recursion, we have fixed a well-ordering a, and THEN we define this function on the well-ordering a.**

So essentially what we could do here is fix, let's say, a large ordinal, let's call it sigma, large ordinal, and then if alpha is up here, we can define a v alpha, right? So for each beta below you can define, and you can define this function v from sigma, I guess, with domain sigma, which satisfies this property, right? Transfinite induction allows us to define this function v up to any fixed sigma, right? But we need this to make it an ordinal, so it's a well-ordering, so it's a set. But now we want to define this v on all ordinals. For every ordinal alpha, we want to have a v.

So this v is not really a function, the one that we want. Well, one thing that we had is that if you have this sigma, it's an ordinal, and then if we take another ordinal, but much larger, I don't know, tau is a larger ordinal, and inside we still have alpha and beta inside, we can define v alpha and v beta the same way, and we can now define it actually for all, like if we have a gamma up there, we can define v gamma for that one up there using transfinite recursion. So we can go even further, and we are going to get the same thing. This one is going to be the same as that one, this is going to be the same as that one, because of the uniqueness that we get from transfinite induction, right? if we have this function and we truncate at sigma, this v up to sigma, that's the UNIQUE function that satisfies this transfinite recursion, so it should be the same if you look up to sigma or up to sigma as the initial segment of tau, you still get the same thing. So these two are the same, these two are the same.

So we can always kind of, if we want to define v alpha as some ordinal, we can always look at some larger ordinal and define v alpha for all those ordinals up to the larger ordinal, including the one that you want, and by the uniqueness that we had a few classes ago, we get always the same value, okay? So essentially we are getting a function, but again v is not a function because we wanted to define for all ordinals, and we mentioned last week that there is no set of all ordinals, right? So we cannot have all ordinals in one set, so the domain, the domain of the function cannot be all ordinals, and actually even like this week, a few years ago, we show that there are ordinals that for every set, there's no set that dominates all ordinals, right? So you couldn't have all the ordinals in a single set, so this is another version of the, a stronger version of the Burali-40 paradox. So okay, so we don't have, so the domain of this v is not, it's not a set because we want it to be all ordinals, so we are not going to treat v as a function, okay?

**So this theorem up here, it's been up there for a bit now, uh, it formalizes, uh, the way we want to treat this, this thing v, uh, and this is what it says.** There is a formula, a first order formula in the language of set theory, such that for each ordinal alpha, there is a UNIQUE y, uh, satisfying phi alpha y, okay? So essentially this is a formula, you can write down a formula, and is function-like, and it works well whenever the first input is an ordinal, you always get a UNIQUE y that satisfies the formula with this, and if we call this y v alpha, it's a UNIQUE y, so we can put in a name, for each alpha there is this UNIQUE y, call it v alpha, then we get, okay, so this formula phi is kind of defining uniquely your v alpha for each alpha, and it's going to satisfy the recursion definition that we want, so actually we're going to get the right thing, okay? So this v is not a function, but essentially for each alpha there is a UNIQUE one, so we can treat them like that. Uh, what is this formula? phi alpha y, what does it say? Well, it says this is this same thing that we kind of did up here. here.

It says, uh, there is a, so if the formula is true of alpha and y, if there is a function, function f, with a domain of f being equal to sigma, for some ordinand sigma that is, uh, larger than alpha, so that contains alpha as a member, uh, such that, and this function f, we want to satisfy, uh, this, that f of beta is equal to the union of the power set of f delta, for delta less than beta, for all beta in the domain, right? So we want f to satisfy v, so that means that f is going to be essentially the same as the v that we want, all the way up to sigma, and, uh, y equals f of alpha, right? So that's what the formula says, that there is a function that satisfies what v should satisfy, but not all the way for all ordinals, because that's too much, but at least it does it up to some ordinal sigma, which is, uh, larger than alpha, that contains alpha as a member, and this function at alpha gives you, uh, what you want, the v alpha.

Um, well, so you have to show this function is UNIQUE, it is a UNIQUE value, it doesn't matter what, if you go for a longer sigma, for a longer ordinal or a shorter ordinal, you're going to get the same value for v alpha, because of the transfine and recursion, they are defined exactly the same all the way up, up to alpha, it doesn't matter how far you go, so this is a UNIQUE, it's a UNIQUE y that you get here, independent of how far you go and which function you take, it's a UNIQUE function, it's a UNIQUE, UNIQUE value of f of alpha, so that's what the formula says, okay? So that's how, how we are going to interpret this v as, as a formula that says, given alpha, it's the alpha, so it's not really a function itself, but almost like a UNIQUE function. Um, okay, so formally that's what it is, and we're gonna, so we have this picture, and then I guess, uh, so we are saying, who are in this, who are, who, which sets belong to this picture, and we say that I said it grounded, if it belongs to this picture, okay? **So the sets that are in here are called grounded.**

So if grounded, if you belong, there exists an alpha such that you belong to phi alpha, and then remember, this is still a first-order formula, right? So this is saying that exists alpha, alpha is an ordinal, meaning it's transitive, and belongs, the belongs relation is well-ordered, on alpha, and there exists y phi alpha y, and a belongs to y, right?

Okay, so, so grounded means that you belong to b alpha for some alpha, good. Um, so these are gonna be the nice sets, and if you're grounded, you must show up somewhere along the way, on this b alpha. So, uh, we let the rank of a with this ordinal, which is the least alpha, such that you are a subset of b alpha. So in this picture up here, uh, if you have a set a that is kind of elements all over there, there is gonna be a first point here that, uh, you belong, you're completely contained in that one, and that's gonna be the rank of the set, the first thing that completely contains you, right? Um, so notice that, um, that's b alpha plus one is the power set of b alpha, right? So that means that a is a subset of b alpha if AND only if a belongs to b alpha plus one, right?

So actually, this is the same thing as saying you're the least alpha, such that a, such that a belongs to b alpha plus one. **That's, that would be the same, the same definition, okay?** So it's the first one that you belong to the next, okay? Exactly the ones that are grounded, the ones that belong to some, some b alpha are the same ones that are, the same ones that are included in some b alpha, um, the ones that have rank. So having a rank is the same thing as being grounded. Um, one observation about these ranks that we're going to use later is that if a belongs to b, then the rank of a has to be strictly below the rank of b.

Um, so this tells you that the rank is kind of a, a different, um, measure of your size, it's not your size, but it's kind of your level in the hierarchy, kind of how late you appear in the hierarchy, which is how many nested, uh, you belong to, you belong to, belongs to, belongs to, are there inside you? Like some, if somebody inside, inside a set that is inside a set that is inside, how, um, how deep that nestedness goes. And that's kind of what the rank is, um, is measuring. Um, so why is this?

Let's do a proof of this. Well, uh, if a, so we know that b is a subset of the rank b, right? And we are assuming that a belongs to this set. And on the other hand, we know that rank of a is the least alpha such that a belongs to b alpha plus one, right? So in particular, we know that rank of a plus one is going to be less than the rank of b because a belongs to the rank, to b of rank of b, right? So we get rank of a is below rank of b.

So essentially, uh, this is one of the main properties of this rank, uh, it's kind of, it's a least function unto the ordinals that satisfies, uh, this property. Um, good. So this is going to give us a way of painting, kind of imagining all sets that exist there in the universe of sets, the, in, in the Vs. Um, the obvious question now is, are there sets that don't belong to any of these, um, of these Vs? That they don't get built along the way at any, at any point? **And the question to the answer to that is going to come next week when we introduce the foundation axiom or regularity axiom that says that essentially the act, we have to actually add an axiom that essentially says that everything belongs, everything is grounded, everything belongs to one of these Vs.**

**Without that axiom, it doesn't necessarily the case.** Um, okay. See you guys in the next video and we talk more about that.



## 51. Part p51 - Regularity Axiom

Welcome everybody. So we have a few last videos for you guys. **So this one, the regularity axiom, is our ninth axiom scheme.** So we're gonna finish the whole list of axioms with these ones. So far we've seen nine axiom schemes, right? Two of them are not single axioms or schemes.

We have, let's see if we can list them all, extensionality, empty set, pairing, union. **Those are the basic ones. THEN a subset axiom, infinite set, axiom of choice, replacement, and now we're gonna see regularity.** And out of these axioms, replacement and subset axiom were schemes. They were not a single axiom, but we had one for each sentence or one for each formula in those cases.

Okay, so let's see what the regularity axiom says. **This is kind of usually considered kind of the least important axiom, but makes things work nicely.** And yeah, as well, it's always considered part of ZF. Yeah, we haven't used it so far, so I guess it gets more important later. Its statement might look a bit obscure at first, but we'll analyze it and see what it means. So it says, every non-empty set A has a member which has empty intersection with A.

Okay, so it's essentially saying, I want to say it in other words. So just rewriting, it says that for every set A, there is an epsilon-minimal element inside A. But epsilon-minimal, I mean, this is an epsilon-minimal element.

So let's call it M. This minimal element M is such that for every other element in A, A does not belong to M.

Okay? So that is the same thing. I mean, I'm just rewriting, essentially. This thing here is exactly the same as saying that A intersection M is empty. But it's a different way to see, you know, it's like among all the elements of A, there is one, probably many, maybe most, or not, I don't know, but at least one, which doesn't contain any other member of A. Right?

So it's a least in terms of this relation. This is not an ordinary relation, actually. It's not transitive. But it's at least in that sense that for any other element of A, A is not in M. Right? That's what this says.

So let's analyze it a bit further. **This theorem is essentially the one that explicitly shows what it means.** So these are three different variations of the regularity action. These three statements are equivalent over the other axioms of ZFC. And so one is the regularity axiom that we just stated. then this one.

There is no function with domain denatural numbers such that F of n plus 1 belongs to F of n for all n. So in other words, this is saying no function F such that F of 0 contains F of 1, which contains F of 2. Right? That's what number 2 is saying. There is no descending sequence like that on the belong relation. You're going to have something that belongs to something, that belongs to something, and all the way down in that direction.

And number 3, it says that every set is grounded. You guys remember what that is? That's from the video, the last video that we did last week. **Remember the definition of the V hierarchy, where it's a hierarchy defined on all ordinals, NOT just up to an ordinal.** Last week we saw how to define it on all ordinals. And the idea is that each one is the power set of the previous ones.

And because we started with empty sets, they're all containing each other. It's a nested sequence growing and growing and growing of more and more and more sets. And it grows all the way through all the ordinals. And then we defined a set to be grounded if it belongs to one of these V alphas. Or equivalent is a subset of one of these V alphas, the same thing as belonging to the next one essentially. So that's what it meant for a set to be grounded, that it belongs somewhere in this V-shaped hierarchy, right?

So a non-grounded element would be up here. This would be not, right? An element outside that hierarchy that is never built using this power set. **What regularity axiom, the third EQUIVALENT says every set is grounded, right?** So it says for every set A, there exists alpha and ordinal such that A belongs to V alpha. That's what number three says.

Okay, so let's prove these three are equivalents. To prove that one implies two, let's do it by contradiction. So suppose there is a function. And then what do we do? Well, we want to contradict number one. So we want to find a set A that has no belongs least element.

What is that going to be? Well, the range of F, namely the set F0, F1, F2, F3, F4, all the way, all of those guys. So is that what we want? Right. Yeah. So then this has no least element, right?

So for every M that belongs to A, say M equals F of N for some N in the natural numbers. And F and F plus one belongs to M and belongs to A. Right. **Contradicting the regularity axiom that there has to be some M such that the intersection is empty, right?** So we get that this is for every M is not empty. And the regularity axiom said that there has to be some that is a list, right?

So there is no list in this case. Okay. So that proves one implies two. if A is not grounded, whenever you have a set that is not grounded, there must be an element inside which is also not grounded.

Why is that? Because otherwise, if we let alpha be the supremum of the ranks of M for M in A. Remember that if a set is grounded, then all its elements have a rank. Well, it has a rank, which is the least alpha that belongs to V alpha, but it's a subset of V alpha. So it belongs to V alpha plus one, right? **So IF we define, actually let's put rank of M plus one, the supremum of all these guys for N in A.**

So then you will get that every M in A, for every M in A, M belongs to V alpha because we put the rank plus one, but then we get that A is a subset of V alpha and therefore A is grounded, right? So if all your elements are grounded, they all belong to some V alpha. This is the supremum of all the ranks of all the elements, like in the picture right here. if you have these green sets right here, all the elements have some rank. In here, if you take the supremum of all these elements, of all these ranks, you get this V alpha and then A belongs to a subset of V alpha.

Okay, so if all the elements inside are grounded, then A has to be grounded. So the other way around, if A is not grounded, then one of its elements must be non-grounded. So the idea for the proof is now to build a descending sequence of non-grounded elements going down.

So let's first define it and then fix the details. So let f of 0 be A and let f n plus 1 be a member, a non-grounded element of f of n. **So we manage, so the idea is we define the sequence at every time we choose elements that are non-grounded.** And every element that is non-grounded has an element inside that is non-grounded. So that's our next f. And since that one is not grounded, it has an element inside that is non-grounded.

We choose that one. And we keep on going like that, always choosing an element inside, not grounded. There's an obvious user detection of choice here, because we have to choose one of these non-grounded elements. So if you want to be careful of where we're choosing these guys, we have to do just a little trick.

Okay, to apply the axiom of choice carefully, we need to do this little trick. We do how to define t with the transitive closure of the sets of A, which I guess you did in the homework.

Okay, so this t is the union of all these guys, a sub n, where a sub n is the union of the union of the union of a n times. So what is the union of the union of a n times, it is all the elements that belong to something, that belong to something, that belong to something, that belong to something, that belong to something that belong to a. What does n belong to in the chain of length n? And your union is for all n's.

All right, so we are taking anything that belongs to something, belongs to something any number of times until you reach a, right? And if you see these functions that we are defining right here, they are of that form, right? We always, we start with something in a, and then we take something that belongs to a, and then we take something that belongs to that, and something that belongs to that, okay? **So, now IF we use the axiom of choice on the subset of t, and for each subset of t we can choose an element, these fn's are always chosen here.** They are always chosen in between the non-grounded elements of f sub n, which is a member of, which is a subset of t, right? Or a subset of essentially a n, if you want.

Okay, so the axiom of choice can be used correctly if you consider this transitive closure, but essentially what we are doing is that. Just picking, choosing an element that belongs to the previous one, making sure that they're always non-grounded, so you can always choose a new one, because every non-grounded set has a non-grounded element. Cool, so that's the proof that 2 implies 3.

Let's now prove the 3 implies 1, okay? So now, we are assuming every set is grounded.

Let's put replacement axiom back in so you can see what it says. So we have to take a set A.

Now, let alpha be the minimum of the ranks of M for M that belongs to A. Right? if every set is grounded, every set has a rank. That's the assumption. That every set has a rank. A rank is the first alpha set that you belong to V alpha.

It is a subset of V alpha. So among all the elements of A, you'll have a rank. So by a replacement, this set exists. It's a set of ordinals, so it has to have a least element, because every set of ordinals has a least element. So that's the alpha. And now, take M in A with minimum rank.

Okay? Now, for every A in A, we have that rank of M is less than or equal the rank of A. And if you remember from last time, we showed that this observation, that if A as a set belongs to another, then the rank has to be strictly below the other. Right? So in this case, the rank is not strictly below. So this here implies that A does not belong to M.

So M is a minimum element. Okay? So that finishes the proof of these three equivalents. **One corollary of this regularity axiom, of this theorem, I guess, is that NO set is a member of itself.** Remember, we mentioned this in the, at the very beginning, we asked this question and kind of analyzed it intuitively. It follows from the regularity axiom, right?

Because you cannot have, if you had a set that belongs to itself, then you define F. So if A belongs to A, you find, let F of N be A for all A, for all Ns, and then you get a sequence that contradicts two. So you couldn't have that. So no set belongs to itself. And that simplifies also our lives a little bit. So we don't have to worry about strange cases.

So we have proved before that no ordinal belongs to itself because ordinal is of a particular kind of sets. **And for those, we could prove this without using the regularity axiom.** In general, you need to use the regularity axiom. I guess it's easy to show that no grounded set belongs to itself because of the rank. They have to have a rank. But since the regularity says that every set is grounded, no set can belong to itself.

**So the regularity axiom essentially is telling you this.** It's telling you that this V hierarchy is the whole thing. All the sets belong to this V hierarchy, and now we have a good picture of what our universe of sets looks like. Inside this universe of sets, there are the ordinals. And ordinals, usually they are depicted like this. In V0, there is one ordinal, but it is nothing.

Here, this guy here is 0. And here you have 1 and 0. Here you have 0, 1, and 2, and then the other one is nothing. So each one contains 1 in ordinals. Each V also contains 1 in ordinals. And we have kind of like a backbone right there.

That is like all the ordinals, right? And each level has one more ordinals than the previous one, right? Because each ordinal is a set of all the previous ones. So you have to wait until all the previous ones show up before you show up. So you have the ordinals, which go up through all sizes. For every set, there is an ordinal that size.

So they are like super, super big, all possible sizes, all the way up. They are not even a set. There is no set of all ordinals because it goes up all the way. And then we have iterating these power sets and building all kinds of combinations of sets that go all the way up. So that's our universe of sets right there, as implied by regularity. That's why regularity is nice, because it tells us exactly how to build, well, more or less how to build.

What are they, or what's the shape of the universe? Okay, see you guys in the next video. Thank you.



## 52. Part p52 - Alephs

Welcome back everybody! **So in this last video I want to talk about this Aleph hierarchy and it's defined like this by a transparent recursion the same way we define the v's.** Given an ordinal alpha we call Aleph alpha. This letter here is called Aleph, it's a Hebrew letter. It is the least infinite cardinal that is different from all the Aleph betas, beta below alpha.

Okay so it's kind of the next one the next one up the first one that is different from all the previous one. So here we have the picture of all the cardinals last time we say that each cardinal is the first one among all the ones of a fixed size right so remember cardinals among all the ordinals of a fixed size the cardinals are the least ones.

So in this picture up here well Aleph zero we've seen Aleph zero before Aleph zero is the size of the countable of the countable things the cardinality of countable things is called Aleph zero and then comes Aleph one which is the first uncountable cardinal okay that's the next one it's different from Aleph zero the least cardinal that is different from Aleph zero and then comes Aleph two which is the first cardinal bigger than Aleph one and then Aleph three is going to be the first cardinal bigger than Aleph two and we're going to continue this all the way through through the ordinals and we're going to have Aleph omega all the way up there currently many cardinals and then we have a new one and then Aleph omega plus one and then we're going to keep on going Aleph omega plus omega and Aleph omega one is going to show up somewhere there this one is omega one there is going to be somewhere there and Aleph omega one and it's going to keep on going so for each ordinal we have a cardinal that is called Aleph omega one uh formally

If you want to do this definition correctly we have to do something like we did in the case of the V's because this Aleph is not a function it's not a function giving an ordinal gives you the Aleph because the domain is all ordinals for each ordinal we are defining for each ordinal we are defining the Aleph so the domain is all ordinals so we couldn't have a function in the sense of having a set of pairs but essentially what we have is the same thing we have a formula first order formula in the language of set theory such that for each ordinal alpha there is a UNIQUE y satisfying this formula so the formula is kind of a function-like formula for each alpha it's a UNIQUE y satisfying the formula and if we call this y in this case Aleph instead of V we get exactly this definition okay so the Alephs are essentially a formula that the formula that's for every alpha is a UNIQUE y that we call Aleph alpha and these Aleph satisfy two basic properties one is that if alpha less than beta and Aleph alpha less than Aleph beta strictly less and why is that well

Because you're choosing every time you're choosing the new element to be the least one that is bigger than all well here i just say different than all the previous ones but when i chose in this case when i chose Aleph alpha i have more options than when i chose Aleph beta right because i'm choosing the least one that is that hasn't shown up so far so in the case of alpha i had more options so therefore the least one is smaller and then we cannot repeat because they are always different so it has to be strictly less and second uh every infinite cardinal is of the form Aleph alpha for some alpha so this hierarchy of the Alephs goes through all the possible cardinals and well you can see that kind of from the picture because the cardinals are kind of in a line and we are going through all of them okay so to prove this uh let's consider a cardinal kappa and now define um define this set alpha to be the set of all the betas such that uh Aleph beta is less than kappa and remember these guys are ordinals right so here i just mean uh belongs to okay and uh this set

So the betas are UNIQUE given the the Aleph beta is a one-to-one function so by replacement this guy is a set uh since the Alephs are monotone function if something is below beta it also belongs to the set right so all the members of beta are also in here so if gamma is inside beta Aleph gamma is less than Aleph beta which is less than kappa so it's a transitive and it's a set of ordinals so alpha is an ordinal itself if you consider uh Aleph alpha you will get that you have to get something that is at least less than or equal kappa because um for all the all the other things inside inside alpha they all go inside kappa but then that would mean that you couldn't have something strictly less than kappa because if alpha Aleph alpha was inside kappa it would be then alpha will be inside alpha right so actually if Aleph alpha was less than kappa then alpha would belong to alpha which we know it doesn't so we have Aleph alpha has to be equal to the cardinal kappa okay so every um every cardinal shows up in the hierarchy every cardinal is eventually one of these guys

So that means uh we have listed all the cardinals using ordinals as indices okay so the sequence of cardinals behaves like the sequence of ordinals except there are fewer cardinals because well i guess in fewer is a strange word here um cardinals are a proper subset of the ordinals um but they can be listed alone like the ordinals um and a good idea of this is that there are more different infinite cardinal sizes like Alephs than the size of any set right because for any set there is an ordinal that has that size and take Aleph of that ordinal and you get so many cardinals all the Alephs that you get up to there is more than the size of any set right and if you remember very very

First day of classes i asked this question how many different um infinite cardinal sizes are there and the answer is that larger than the set of any size uh there are a lot of uh sizes of infinity in that sense uh as many as you want all right guys uh this is it for the course uh it's been interesting uh developing all these videos i really hope uh you enjoy them and learned something out of them um uh the material has been fun it's good to end in the with the same question we started at the beginning and as you see it's a fascinating universe uh this one of sets um which we're starting to see how it looks like um from here on set theory starts getting like way way more interesting uh now studying uh super large cardinals they are called these large cardinals that are cardinals you cannot prove they exist in uh in ZFC but they're still believed to be true the study of the relation between the large cardinals cardinals and uh determinacy of games there's a lot out there are the proofs that things are not proven or provable from ZFC it's a lot out there all right have a good one guys



## 53. Part p53 - Cardinals as Ordinals

Welcome back, everybody. **So now, it's another thing that we let untied from a few weeks ago, which was the definition of cardinals.** And this is what we had by then. We had this definition. So, we said that a set is a cardinal. if it's transitive, the belongs relation as a binary relation inside a set is linear, meaning a linear ordering.

And for every member of K, the member X is not equinumerous to K. So, these are the three properties that we had.

Okay, so, according to regularity, the regularity axiom tells us that there is no descending sequence according to the belongs relation, ever. There is no descending sequence according to the belongs relation, ever, anywhere.

Okay? So, this thing up here is equivalent to saying that the belongs relation, I guess, restricted to K, will orders. What we are saying is that K is an ordinal. So, that's what we said before. We could have put well order there, I guess. By then, we didn't know what well orders were, but we could have just said well orders, or we could have just said an ordinal.

So, first two lines just say K is an ordinal. And the last line says that every ordinal that belongs, every X that belongs to K, that also must be an ordinal, cannot be equinumerous to it. So, they all have smaller size. So, that's what that's saying, right? So, this one is saying that K is the least of all the ordinals alpha, such that they are equinumerous to K, right? So, there are many ordinals that have the same cardinality, right?

Also, the cardinality of alpha is the same as the cardinality of alpha plus one. if you put them two together, alpha plus alpha, alpha times alpha, they all have the same cardinality. So, there are many ordinals with the same cardinality. So, among all the ones which have a fixed cardinality, what this is saying is that K is the least one, right? All its members have smaller cardinality, right?

Recall that X belongs to K implies that X is a subset of K. So, this implies the cardinality of X is less than or equal to the cardinality of K. And if they are not equinumerous, these two imply that the cardinality of X is strictly less than the cardinality of K. So, all its members have strictly less cardinality. So, okay, it's the least one among all those. **And THEN, so, by THEN, I said, okay, so here's a definition.**

We know what the words mean, but it was hard to visualize what it means because we didn't know what ordinals were. So, forget about visualizing what it means for now. **What's important about this definition is the following theorem that now we can prove.** There is a, for every set A, there is a UNIQUE cardinal, and by cardinal, we mean something satisfying this property. That is equinumerous to K. We can prove this now.

And then, so we said this is important because this is what we wanted, right? **So, that means that for each possible size, for each cardinality, there is a UNIQUE representative for it, which is a UNIQUE thing with this property.** So, it satisfies it so we could use this representative as a member, as a representative for the whole size, for the whole cardinality. The cardinal is, we use it as a name, essentially, for that size. So, okay, so now we can prove this thing. So, how do we show all this?

We know there is a cardinal. There is an ordinal with size A, right? So, how do we do that? **So, let R be A, by the well-ordering principle, the axiom of choice.** Every set has a well-ordering. Let alpha be the epsilon image of this well-ordering AR, which we know, well, the epsilon image is given by this bijection E.

So, we have that alpha is equinumerous to E. So, there is A. So, there is a well-ordering, an out-ordinal, equinumerous to A.

Now, once we know there is one, now we can let K be the least ordinal equinumerous to A. So, once we know there is one, just take the least, every set of ordinals, every non-empty set of ordinals has the least element. And if you are the least, you must also satisfy this property that all your members are actually properly smaller.

Okay? So, essentially, that's what we are doing with these cardinals. I guess, one picture that one can draw is if you draw the ordinals. The ordinals look like 0, 1, 2, dot, dot, dot. Up here, we have omega, omega plus 1, omega plus omega, some, and then if you go far, far, far, far, far, far, far, you get something called omega 1, which is uncountable. You continue going up, and then you get something called omega 2.

So, essentially, all of these guys, the finite ones, are all cardinals because they are all finite. And then you get omega is a cardinal, and then all of these guys are countable. So, there are a lot of countable ordinals, but then only the least one is going to be the one that is considered a cardinal. **And THEN, after that, comes the first uncountable ordinals, and that one is called omega 1, this is uncountable.** And I guess there are a bunch of them that are all, like, equinumerous to each other, omega 1 plus 1, omega 1 plus 2. And then there is the first one that has a larger size, right?

So, every time we fix the size, there are many that have the same size, but then, eventually, you reach one that has a strictly larger size. And those red ones are the cardinals. The cardinals are kind of the first ones to have a new size. And this is the way we represent the cardinals, in this UNIQUE way. Cool. See you guys in the next video.
