---
title: Generative AI for Everyone Course Transcripts
layout: print
categories: Notes
subclass: AI
---

## P1. Welcome

Welcome to Generative AI for Everyone. Since the release of ChatGPT, generative AI has attracted the attention of individuals, companies, and governments. It is already changing how people learn and work. Many developers expect it to empower people, improve productivity, and contribute to economic growth. There are also concerns about downsides, including job losses.

In this course, you will learn what generative AI is, what it can and cannot do, and how to use it in your work or business. Because the technology is new, there is considerable misinformation. I hope to provide an accurate, nontechnical understanding and help you think through how to make use of it. **The course assumes NO technical or AI background.** It is intended for people in business, science, engineering, the humanities, the arts, and other fields.

Generative AI reached mainstream attention around November 2022, when OpenAI released ChatGPT. Its momentum has continued since then. McKinsey estimates that it could add $2.6–4.4 trillion annually to the economy, while Goldman Sachs estimates that it could raise global GDP by 7% over the following decade. A study by OpenAI and the University of Pennsylvania estimates that the technology could affect at least 10% of work tasks for more than 80% of U.S. workers, and more than half the tasks for about 20% of workers. These projections create both hopes for productivity gains and concerns about automation.

What is generative AI? **The term refers to AI systems that can produce content, especially text, images, and audio.** One well-known example is ChatGPT. You can ask it to write three captions for a social media post about a new line of sunglasses for robots, and it will produce several creative suggestions.

Many people encounter the technology through websites and consumer applications. Other examples discussed in this course include Google's Bard and Microsoft's Bing Chat. These interfaces let you enter instructions, called a prompt, and receive a generated response.

Beyond consumer applications, another use may become even more significant over time: generative AI as a developer tool. AI is already part of everyday life. Search engines use it, payment systems use it to check for suspicious transactions, and services such as Amazon and Netflix use it for recommendations.

Historically, many AI systems have been complex and expensive to build. Generative AI makes some applications much easier to create, allowing a wider variety of products to emerge. Throughout the course, we will discuss how businesses can identify useful applications and build them less expensively.

Of the content types I mentioned, text generation has had the largest impact so far. But models can also turn descriptions into illustrations or photorealistic images. They can generate audio, including a voice clone. In the demonstration, an artificial version of my voice says, “Hi, I'm an AI-generated voice clone of Andrew. Andrew never actually said these words.” Combining generated audio with images or video can also produce a video clone.

In the first week, we will examine how the technology works, what it can and cannot do, and common use cases that may spark ideas for your own work. In the second week, we will explore generative AI projects: identifying useful applications, building them, and choosing among technical approaches.

In the final week, we will look beyond individual projects to the effects on businesses and society. We will discuss how teams can use the technology, the risks involved, and how to use it responsibly.

*Understanding both the capabilities and the limitations will help you find useful applications.* Let's begin with a nontechnical explanation of how generative AI works.

## P2. How Generative AI Works

The ability of systems such as ChatGPT and Bard to generate text can seem almost magical. They represent a significant advance, but how do they work? Understanding the underlying idea can help you decide when to use them and when not to rely on them.

Think of AI as a collection of tools. One important tool is supervised learning, which is particularly good at labeling things. Another is generative AI. There are other approaches, including unsupervised learning and reinforcement learning, but we will focus on these first two because they are especially relevant to many business applications.

Before explaining generative AI, let's look at supervised learning, which helps provide its foundation. **Supervised learning learns to map an input A to a corresponding output B.** For a spam filter, A is an email and B is a label, such as zero for not spam and one for spam.

Online advertising is another example, and one of the most lucrative applications I have worked on. Given an advertisement and information about a user, a system predicts whether that person is likely to click. Showing more relevant ads can generate substantial revenue.

In driver-assistance and self-driving systems, the input might be a camera image and radar information, while the output identifies the positions of other cars. A medical application might map an X-ray to a possible diagnosis. In manufacturing, a system can inspect a picture of a phone rolling off an assembly line and identify scratches or other defects.

Speech recognition maps audio to a transcript. A business can also use supervised learning to label customer reviews as positive or negative, helping monitor its reputation. Each example involves identifying the desired output for a given input.

The decade from roughly 2010 to 2020 saw substantial progress in large-scale supervised learning. For many applications, data was plentiful, but smaller models stopped improving after a point. A speech system might listen to tens or hundreds of thousands of hours of audio without becoming much more accurate than one trained on less data.

Researchers increasingly found that **larger models could continue improving when given more data**. Powerful computers with substantial memory made it possible to train them. When I started and led the Google Brain team, one of our early goals was simply to build very large models and feed them a lot of data. Fortunately, that approach worked and helped drive progress at Google.

Large-scale supervised learning remains important. Its success also helped lead to generative AI and large language models, or LLMs.

Suppose you enter the prompt “I love eating.” A model might continue with “bagels with cream cheese.” Another time, it might write “my mother's meatloaf” or “out with friends.” How does it generate these continuations?

**At the heart of an LLM is a model trained to repeatedly predict the next word.** If the training text contains “My favorite food is a bagel with cream cheese,” that sentence can supply several input-output examples. Given “My favorite food is a,” the desired next word is “bagel.” Given “My favorite food is a bagel,” the next word is “with,” and so on.

A single sentence therefore provides multiple examples. Training on hundreds of billions, or even more than a trillion, words lets a large model learn to generate plausible continuations for many prompts.

This explanation leaves out some details. Next week, we will discuss additional training that helps models follow instructions instead of merely continuing text, and that helps reduce inappropriate outputs. But next-word prediction is the central idea we need for now.

*Learning from many examples of text allows a model to generate new text one step at a time.* People already use these systems to write, find basic information, and think through ideas. Let's examine some examples in the next video.

## P3. LLMs as Thought Partners

There are several web interfaces for large language models, including ChatGPT, Google's Bard, and Microsoft's Bing. Whether you already use them regularly or are just beginning, I hope these examples suggest useful ways to work with them.

An LLM offers a new way to find information. If you ask for the capital of South Africa, it may correctly explain that the country has three capitals. However, a model can also make up facts, a behavior called hallucination. **When accuracy matters, check the answer against an authoritative source.**

A conversation can help clarify the context. Asked what “LLM” stands for, a model might initially describe the Master of Laws degree, a common meaning of the abbreviation. If you add “in the context of AI,” it can explain that you mean a large language model. Giving the right context helps the system answer the question you intended.

An LLM can also help refine writing. I often ask one to rewrite a passage for clarity, such as a paragraph about students realizing that learning must continue throughout life. Leading models can be quite effective at improving the wording.

For a more playful example, ask for a 300-word story involving trucks that encourages a child to brush their teeth. My son loves trucks, and a model can create an entertaining story around that interest. It may not rival a great novelist, but it can be useful for a quick, personalized activity.

When should you use an LLM, and when should you search the web? Suppose you sprain an ankle while playing a sport and want information about what to do. Web search can lead to sources such as the Mayo Clinic or Harvard Health. An LLM can answer too, but it may sound confident even when it is wrong. I would want to verify medical suggestions before following them.

A less consequential example is finding a pineapple-pie recipe. The internet contains many recipes from established cooking websites or chefs. An LLM can invent one, but the result may be unusual or less reliable. For a standard recipe, I would probably use a trustworthy website.

Now suppose a friend challenges you to make a coffee-infused pineapple pie. I could not find a page providing a ready-made recipe for that combination. In that situation, an LLM can be a useful partner for thinking through an unfamiliar idea.

*Use a model as a thought partner, while distinguishing creative suggestions from information that needs verification.* We will explore more examples, limitations, and prompting practices this week. Next, we will organize the possibilities into three broad types of work: writing, reading, and chatting.

## P4. AI as a General-Purpose Technology

What is generative AI good for? One of the reasons that question is a bit hard to answer is because **AI is a general purpose technology.** Unlike a lot of technologies, like a car, which is good for transportation, or a microwave oven, good for heating up food, AI is **NOT** useful for just one thing. It's useful for a lot of things, and that almost makes it harder to talk about. But let's take a look at what a general purpose technology really means.

Similar to electricity, AI is useful for many tasks. If we were to ask you what is electricity good for? Or what is the internet good for? These are other general purpose technologies, and it's almost difficult to think what is electricity good for? Because it's so pervasive, and it's used around us for so many different things.

In fact, as you saw earlier, supervised learning is useful for many tasks, like spam filtering, advertising, speech recognition, and many others. And generative AI is like this too. In the last video, you saw a few of the tasks that an LLM can carry out, answering certain questions and helping with writing, for example. Let's discuss more broadly a framework for what kinds of tasks LLMs can do.

First off, generative AI generates text. So, perhaps not surprisingly, it is useful for writing. I routinely use generative AI tools as a brainstorming companion. So if you're trying to name a product, you can ask it to brainstorm some names, and it comes up with some creative suggestions.

LLMs can also be good at answering questions. And if you give them access to information specific to your company, they can help members of your team find information that they need, in this case, about the availability of parking at the office.

In addition to writing, generative AI is also good for what I'm going to call reading tasks, where you're going to give it a relatively long piece of information and have it generate a short output. For example, if you run an online shopping e-commerce company, and you get a lot of different customer emails, generative AI can read the customer emails and help you very quickly figure out is this email a complaint or not, which can be used for helping to route complaints to the appropriate department to be handled quickly.

So given, I love my new LLM t-shirt, fabric is so soft. That's not a complaint. But if someone emails, I wore my LLM t-shirt to a friend's wedding. Now they're mad at me for stealing the show. Well, maybe that is a complaint. But generative AI can help you route emails to the right department.

And I call this a reading task because it's looking at a relatively long piece of text that is a customer email and then generating a relatively short output, just yes or no, is this a complaint or not.

And while supervised learning can also be used for this particular task, we'll see later that generative AI is allowing these sorts of reading tasks, this and other examples that we'll see later this week, to be built much more quickly and inexpensively.

Lastly, generative AI is also used for many chatbot types of tasks. Whereas ChatGPT, Bard, and Bing Chat are general purpose chatbots, generative AI technology, large language models, is also enabling many special purpose chatbots to be built.

In this example, here's what a chatbot might be like for taking online orders where a user can say, I would like a cheeseburger for delivery, and the chatbot acknowledges and puts the order through for the user.

Now, in talking through these tasks, I find that it's sometimes useful to distinguish between two different types of LLM-based applications. One is examples like this brainstorming one, where it'd be quite natural for you to type a prompt like this into ChatGPT, Bard, or Bing Chat or one of the other free or paid large language models on the internet and get a result back. So I'm going to call an application like this a web interface-based application.

In contrast, in the example of recognizing that an email is a customer complaint, this fits more into a company's email routing workflow, and it doesn't really make sense for anyone to cut and paste customer emails one at a time into a web interface to get back answers as to which ones are actually complaint emails. So this is an example of an LLM that would make sense when it's built into a larger software automation that in this case, helps with a company's automated email routing. So I'm going to call this an LLM-based software application.

For the second writing example, answering HR questions, it turns out this also will make more sense as a software-based LLM application because it'll need access to information about your specific company's parking policy for employees, whereas a general large language model on the internet probably doesn't have that information. We'll talk more later in this course about how this technology is built.

And most of the specialized chatbots will also be software-based LLM applications.

So in the rest of this course, I'm going to use these two symbols to distinguish between web interface use cases and software-based LLM applications. And for many people, it may be easier to get started with some of the web interface use cases because you can just go to a website like ChatGPT, Bard, or Bing and type in a prompt and get the result back. But I think *both the web interface-based applications and the software-based LLM applications are important and will be very useful for individuals and for companies.*

I found the framework of writing, reading, and chatting to be a useful way to think about the many different tasks that a large language model can do. In the next three videos, we'll dive more deeply into many different examples of writing, reading, and chatting tasks. And I hope that you find some of them potentially useful for your own work. So I look forward to seeing you in the next video where we'll talk more about writing. And until then, I look forward to enjoying my burger.

## P5. Writing

We have identified writing, reading, and chatting as three broad categories of LLM tasks. Since these models learn to predict words, it is perhaps unsurprising that they are useful for writing. Many writing tasks can be performed directly through a web interface, so these examples may be useful to you immediately.

For a writing task, we often start with a relatively short prompt and ask the model to produce a longer text. I frequently use a model as a brainstorming partner. Asked for five creative names for peanut-butter cookies, it might suggest “Nutty Nirvana Nibbles.” I would eat those! You can also ask for ideas to increase cookie sales and examine which suggestions might be useful.

Models can draft copy as well. Suppose you ask for a press release announcing a new chief operating officer. Without further information, the model produces something generic, with placeholders for the company and the new COO's name.

**More relevant context usually allows a model to write more specific, useful copy.** The model does not automatically know your company, the new executive's name, or their qualifications. If the first draft is too generic, provide a biography and background about the company, then ask again.

It is normal not to get the prompt right on the first attempt. I often start with an incomplete instruction, inspect the output, and revise the prompt. You do **NOT** need a perfect prompt before beginning. We will discuss that iterative process later this week.

Translation is another writing application. Some models available through web interfaces are competitive with dedicated translation systems, especially for languages with substantial amounts of text online. They tend to perform less well in low-resource languages, where less training text is available.

Suppose you run a hotel and want to translate a welcome message into formal Hindi. In the example shown, the model produces a translation, but it interprets “front desk” too literally as the desk at the front rather than the hotel's reception.

I do not speak Hindi, but I worked with a Hindi speaker while preparing the slide. They pointed out that the wording was not quite right. Asking for “formal spoken Hindi” led to a better translation that used the intended word for reception. This illustrates how a small change in context can improve an output.

Testing translation can be difficult when members of the team do not speak the target language. Even if one colleague does, others may struggle to assess the behavior. Some teams use a playful test: ask the model to translate into pirate English, a style they can all understand.

For example, a hotel welcome message might become, “Ahoy, matey,” followed by a suitably nautical greeting. It provides an accessible way to experiment with the interaction, although a real translation still needs appropriate language expertise.

*Use writing models to generate and refine drafts, then provide the context and review needed for the particular task.* Next, let's look at reading applications.

## P6. Reading

For writing tasks, a prompt often produces a longer output. For reading tasks, we usually provide a substantial amount of text and ask for an output of similar or shorter length. Examples include proofreading, summarization, classification, and extracting useful information.

Proofreading is something I use regularly. Even after I have read a passage three or four times, a model may find spelling or grammatical errors I missed. A prompt can explain the text's purpose—for example, copy for a website selling children's stuffed toys—and ask the model to check spelling, grammar, and awkward sentences before returning a corrected version.

In the example shown, it fixes a misspelling of “snuggle” and another grammatical error. I use this approach when I want greater confidence that my own writing is free of such mistakes.

Summarization is another useful application. My collaborator Erik Brynjolfsson, a Stanford professor, once sent me his article “The Turing Trap.” I expected it to be good, but it was long and I did not have time to read it before replying. I pasted it into an LLM interface and asked for a summary.

The article argues that, rather than focusing only on replacing human work, we should put more effort into AI that complements or augments people. The summary helped me respond more quickly. I later read the entire article and enjoyed it, but summaries can help when there is not enough time to read everything immediately.

There are also software applications built around summarization. Suppose you manage a customer-service call center. With permission to record calls, you can use speech recognition to obtain transcripts of conversations between agents and customers.

A busy center may produce too much text for a manager to read. An LLM can summarize each conversation, such as noting that a customer reported a broken product. Reviewing short summaries makes it easier to identify recurring issues or trends.

**A repeated, high-volume reading task often fits a software application better than manual copying into a web interface.** It would be inefficient for someone to paste every call transcript into a chatbot individually. Software can automate the process.

Customer email analysis is another example. Earlier, we saw how a model can determine whether an email is a complaint and which department should receive it. A prompt might simply ask the model to read an email and choose a department, but the response could name a “complaints department” that does not exist in the company.

The problem is insufficient context. If we instead provide the actual list of departments and ask the model to choose **ONLY FROM THAT LIST**, it can route the message appropriately—for example, to the apparel department.

Again, the first prompt may not work correctly. Inspecting the result reveals what information was missing, and revising the prompt can fix the behavior. This is a normal part of developing an LLM application.

A final example is reputation monitoring. Suppose customers write reviews of your restaurant or email you about their experiences. You can ask a model to label each message as expressing positive or negative sentiment. A review praising the food and friendly service should be positive.

Software can then count positive and negative reviews over time and display the results on a dashboard. If sentiment shifts toward more negative reviews, the manager can investigate whether something has changed at the restaurant.

We have looked at proofreading, summarization, email routing, and sentiment analysis. *If you wish someone could read a piece of text and give you a brief conclusion about it, that may be a useful reading task for an LLM.* Next, we will examine chatting applications.

## P7. Chatting

In the last two videos, we looked at writing and reading applications. In this video, we'll look at chatting applications. In addition to the general purpose chatbots like ChatGPT, Bard and Bing Chat, many companies are looking at whether they can build specialized chat applications. If you're involved in a company where you have many people interacting with customers or having certain types of conversations of similar nature, this may be a case where you can consider whether or not a specialized chatbot can help with those types of conversations. Let's take a look.

Earlier, we already saw the example of a customer service chatbot that might be able to take orders for a cheeseburger.

Another example of a specialized chatbot would be one that specializes in helping you to plan trips. For example, how can I vacation in Paris inexpensively? And a bot could be built to have specialized knowledge about travel. And today, there are companies exploring a wide range of advice bots. For example, can a bot give you career coaching advice or give advice on cooking a meal? So a large variety of specialized bots that are really good at answering questions about one thing are being developed by different companies today.

Some of these bots are capable of just having a conversation and giving advice. Some of these bots can also interface with the rest of a company's software system and take actions such as to put in an order for a cheeseburger to be delivered.

Another example of a bot that might be able to take action would be a customer service chatbot where it turns out that many IT departments get tons of password reset requests. And if a bot can take care of that, then it may take some of the workload off your IT department. A bot that can send a text message to verify identity and help reset a password would need to be empowered to actually take action in the world, such as to get a text message to be sent to someone. Next week, we'll discuss more how chatbots like these are built that don't just generate text but can actually take action.

Because of the number of customer service organizations exploring the use of chatbots, I want to share with you a spectrum of common designs being used by different businesses. And for this slide, I want to focus on text-based chat rather than voice or phone-based chat.

So at one end of the spectrum would be a customer service center with only humans. So you would have human service agents typing back and forth messages welcoming the customer and offering to place an order.

At the opposite end of the spectrum would be chatbots only, where you just have software responding directly to customers. But between these two ends of the spectrum of humans typing on the keyboard or chatbots only, there are a couple of common design points.

**One common design point would be to have bots support humans, in which a bot will generate a suggested message for a human, but the human service agent will read over the message and either approve it if it looks good, or have a chance to edit the message before it is actually sent back to the customer.**

This type of design is often also called human-in-the-loop because there's a human that's looped in and is part of the process before the message actually gets sent back to your customer. And this is a way to mitigate the risk of the chatbot maybe saying the wrong thing because a human can check over it before it's actually sent back to your customer. In the next video, when we talk about what LLMs can and cannot do, we'll go over some of the mistakes that LLMs can sometimes make. And so this design helps protect against those mistakes of LLMs.

A little bit further on the automation spectrum would be if you have a bot to triage messages for humans. So maybe the bot answered the easy messages, but escalated to a human for the things it is not quite ready to handle yet.

Sometime back, I actually led a team that built a bot that would automatically detect if the customer was asking for a refund request. It turns out that was about 10% of our total chat call volume. And by just detecting that and automatically giving the customer instructions, this routed 10% or so of the traffic away from the human agents. This saved the agents a lot of time and let the humans focus on servicing the harder requests. But this type of triaging is another common design to help your human service agents save time and have to focus only on the harder cases that they're more uniquely qualified to handle.

In many customer service centers, a single human may be simultaneously having chat conversations with four, eight, or in some extreme cases, maybe even 16 customers at the same time. And with bots supporting the humans, it becomes easier for a human to manage a larger number of parallel conversations.

Given that bots sometimes say the wrong thing, I want to share with you what building and deploying a bot often feels like in companies that want to do this in a safe way. Often the companies will start with an internal facing chatbot. So many times I would build a chatbot, but let only my own team use it to say answer the questions about travel or whatever the bot is supposed to do. Your internal team will hopefully be more understanding and forgiving if the bot makes a mistake. This gives you some time to assess the behavior of the bot and also avoid public mistakes that could be embarrassing for the company.

After this looks safe enough, a common next step would be to deploy with a human in the loop, letting the human check messages, where feasible, before they go out to customers.

And after doing this for a while, if it looks like the bot's messages are generally safe to send to customers, then you might allow the bot to communicate directly with customers.

Of course, the details of every business differ and for some applications, it may not be practical to have humans check over every message because of the sheer volume of traffic. But depending on the risk of the bot saying the wrong thing, as well as the volume of traffic and thus whether human review is feasible, these are some of the design patterns I've seen companies use to try to deploy bots safely.

To summarize, we've seen how LLMs can be used for writing, reading and chatting. *These three categories are not meant to be an exhaustive list of what LLMs can do, but they're just a few broad categories of what you might use them for.* And LLMs can do a lot, but they **CANNOT** do everything. In the next video, let's take a look at what LLMs can and cannot do, and better understand their limitations. Let's go on to the next video.

## P8. What LLMs Can and Cannot Do

Generative AI is an amazing technology, but it can't do everything. In this video, we'll take a careful look at what LLMs can and cannot do. We'll start off with what I've found to be a useful mental model for what it can do. And after that, let's look together at some specific limitations of LLMs. I've found that understanding the limitations can lower the chance that you might get tripped up trying to use them for something that they're really not good at. With that, let's dive in.

If you're trying to figure out what prompting an LLM can do, here's one question that I've found to provide a useful mental model for your work, which is, I'll ask myself, **can a fresh college grad following only the instructions in the prompts complete the task you want?**

For example, can a fresh college grad follow instructions to read an email to determine if an email is a complaint? Well, I think a fresh college grad could probably do that. And an LLM can do that pretty well too. Or can a fresh college grad read a restaurant review to determine if it's a positive or negative sentiment? I think they could do that quite well too. And so too can prompting an LLM.

Here's another example. Can a fresh college grad write a press release without any information about the COO or your company? Well, this fresh college grad just graduated from college. They only just met you and don't know anything about you or your business. And so the best it could do is maybe write a really generic and not quite satisfying press release like this.

But on the flip side, if you were to give them more context about your business and about the COO, then we can ask, can this fresh college grad write a press release given the basic relevant context? And I think they may be able to do that decently well. And so too can the large language model.

When you're picturing an LLM as doing many of the things that a fresh college grad might be able to do, think of this fresh college grad as having lots of background knowledge, that they know lots of general knowledge off the internet, but they have to complete this task without access to a web search engine and they don't know anything about you or your business.

For clarity, this mental model, thought experiment, fresh college grad has to complete the task with no training specific to your company or your business. And every time you prompt your LLM, in this setup, the LLM does **NOT** remember earlier conversations. And so it's as if you're getting a different fresh college grad for every single task. So you don't get to train them up over time on the specifics of your business or the style you want them to write.

This rule of thumb of asking what a fresh college grad can do is an imperfect rule of thumb. *There are things college grads can do that LLMs cannot and vice versa.* But I found this to be a useful starting point for thinking through what LLMs can and cannot do. And while we'll focus on this slide on what prompting an LLM can do, next week when we talk about generative AI projects, we'll talk about some slightly more powerful techniques that might be able to expand what you can do with generative AI beyond this fresh college grad concept.

Now let's take a look at some further specific limitations of LLMs.

First is knowledge cutoffs. An LLM's knowledge of the world is frozen at the time of its training. More precisely, a model trained on internet data scraped by January 2022 will have no information about more recent events. So given such a model, if you were to ask it what was the highest grossing film of the year 2022, it would say it doesn't know. Even though now that we are well past 2022, we know that it was the movie Avatar: The Way of Water, that was the highest grossing film.

Around July 2023, there were claims of a research lab having discovered a room temperature superconductor called LK-99. You may have seen this picture in some of the news. This claim turned out not quite to be right. But if you were to ask an LLM about LK-99, even though it was widely covered in the news, if the LLM learned only from text on the internet as of January 2022, it won't know anything about this.

So this is called a knowledge cutoff, where the LLM knows things about the world only up to a certain moment in time, when it was trained or when text from the internet was last downloaded for the LLM's training.

A second limitation of LLMs is that they will sometimes just make things up, and we call these hallucinations. I found that if I ask an LLM to give me some quotes from well-known people in history, it will often make up the quotes. For example, if you ask it, give me three quotes that Shakespeare wrote about Beyoncé. Since Shakespeare lived and died well before Beyoncé, I don't think Shakespeare said anything about Beyoncé. But an LLM will confidently give you back some quotes, in a Shakespeare-like style. So these are hallucinated Shakespearean quotes.

Or if you ask it to list court cases tried in California about AI, it might give authoritative sounding answers like this. And in this case, it turns out the first case is real. There was a Waymo versus Uber case, but I was not able to find an Ingersoll versus Chevron case. And so the second case is a hallucination.

Sometimes LLMs can hallucinate things or make things up in a very confident authoritative sounding tone. And this can mislead people into thinking that this made up thing may actually be real.

Hallucinations can have serious consequences. There was a lawyer that unfortunately used ChatGPT to generate texts for a legal case and actually submitted to the court, not knowing that he was submitting to the court a legal filing with lots of made up court cases. And in this New York Times headline, we see in this cringe inducing court hearing, the lawyer who relied on AI said he did not comprehend that the chatbot could lead him astray. And this lawyer was sanctioned for submitting a court filing containing made-up things. So understanding of limitations is important if you are using this for documents of real consequence.

LLMs also have a technical limitation in that the input length, that is the length of the prompt, is limited. And so is the output length of the text it can generate. Many LLMs can accept a prompt of up to only a few thousand words. And so the total amount of context you can give it is limited.

So if you were asking it to summarize a paper and the paper's length is much longer than this input length limitation, the LLM may refuse to process that input. In this case, you may have to give it one part of the paper at a time and ask it to summarize parts of the paper at a time. Or sometimes you can also find an LLM with a longer input limit length. Some will go up to many tens of thousands of words.

And technically LLMs have a limitation on what's called the context length. And the context length is actually **a limit on the total input plus output size.** When I use LLMs, I rarely have it generate so much output that I run into limitation really on the output length. But I do hit input length limits sometimes if I have many, many thousands of words of context that I want to give it.

Lastly, one major limitation of generative AI is that it does **NOT** currently work well with structured data. And by structured data, I mean tabular data. Like the data that you might store in an Excel or Google Sheets spreadsheet.

For example, here is a table of home prices with data on both the size of the house in square feet as well as the price of the house. If you were to feed all of these numbers into an LLM and then ask it, I have a house that's a thousand square feet. What do you think is a good price? LLMs are not really good at that. Instead, if you call the size the input A and the price the output B, then supervised learning would be a better technique with which to estimate the price as a function of the size.

Here's another example of structured data: tabular data showing when different visitors may be visiting your website, how much you offered a product to them and whether or not they purchased it. Then again, supervised learning would be a better technique than trying to copy paste all of this time and price and purchase information into the prompt of a large language model.

In contrast to structured data, generative AI tends to work best with unstructured data. Structured data refers to tabular data of the sort you would store in a spreadsheet, whereas unstructured data refers to text, images, audio, video. And generative AI does apply to all of these types of data, although the impact is largest for text, which is why we focus mostly on text data in this course.

Finally, large language models can produce biased outputs and can sometimes output toxic or other harmful speech. For example, large language models were trained on text off the internet. And unfortunately, text on the internet can reflect biases that exist in society.

So if you were to ask an LLM, complete the sentence, the surgeon walked to the parking lot and took out, the LLM might output his car keys, or you would say the nurse walked to the parking lot and took out, it may say her phone. So in this case, the LLM has assumed that the surgeon is male and the nurse is female. Whereas we know that clearly surgeons and nurses can be any gender.

And so if you're using an LLM in an application where such biases could cause harm, I would use care in how we prompt and apply the LLM to make sure we don't contribute to such undesirable biases.

Finally, some LLMs can also occasionally output toxic or other harmful speech. For example, some LLMs will sometimes teach people how to do undesirable, sometimes even illegal acts.

Fortunately, all the major large language model providers have been working hard on the safety of these models. And so most models have gotten much safer over time. And if you use the web interfaces of the major LLM providers, it's actually been getting much harder over time to get them to output these types of harmful speech.

So that summarizes what prompting an LLM can and cannot do. And as I mentioned, next week, we'll take a look at some techniques for overcoming some of these limitations to make what LLMs can do even broader and more powerful. But first, let's take a look at some tips on prompting LLMs. And I hope that the tips I share in the next video will be useful right away to how you use LLMs. I'll see you in the next video.

## P9. Prompting Tips

I'd like to share with you some tips for prompting large language models. If you're using the web user interface of an LLM provider, hopefully these tips will be useful to you right away. And it turns out that similar tips are also useful if you are ever involved in building a software application that uses LLMs. Let's dive in.

In this video, we'll go through three main tips for prompting. **First is be detailed and specific. Second is guide the model to think through its answer. And third is experiment and iterate.**

Let's start with being detailed and specific. Using the fresh college grad analogy, I would often think about how to make sure the LLM has sufficient context or sufficient background information to complete the task.

So for example, if you were to ask it, help me write an email asking to be assigned to the legal documents project. Well, given only a prompt like this, an LLM doesn't really know how to write a compelling case to advocate for you to be assigned to that project.

But if you give additional context, such as I'm applying for a job in the legal documents project, we check legal documents, I have ample experience on prompting LLMs to get accurate text, in a professional tone, then this gives the LLM more relevant context to write that email to help you ask to be assigned to the project.

Further, describe the desired task in detail. For example, instead of saying help me write an email, if you ask it write a paragraph of text explaining why my background makes me a strong candidate on this project, and advocate for my candidacy, then this type of prompt would not only give the LLM sufficient context, but also tell it quite clearly what you want it to do. And this is more likely to get you the result that you want.

Second tip is to guide the model to think through its answer. So if you were to tell it, brainstorm five names for a new cat toy, it actually could do pretty well.

But if say you have in mind you want a rhyming cat toy name with a relevant emoji, this is what I might try. I might tell it, brainstorm five names and tell it step one, come up with five joyful words related to cats. Then for each word, come up with a rhyming name. And finally, for each toy name add a fun relevant emoji. And with a prompt like this, you might get a result like this, where the LLM follows your instructions. It first comes up with purr, whisker and so on. And then names such as Purr Twirl, Whisker Whisper, and Feline Beeline with fun emojis added to the end. So if you already have in mind a process by which you think the LLM could get to the answer that you want, *giving it clear step-by-step instructions to follow can be quite effective.*

And finally, there have been a bunch of articles that I've seen on social media that say things like, 20 prompts that everyone must know, or 17 prompts that will help you grow your career. I do **NOT** think there is a perfect prompt for everyone. Instead, I find it more useful to have a process by which you can write the prompt that will generate the result for you.

So when I'm prompting an LLM myself, I will often experiment and iterate and try something. Like I might start off, say help me rewrite this. And if I don't like the result, I might clarify and I say, correct any grammatical and spelling errors in this. And if it still doesn't give me exactly the result I want, I might clarify even further to say, correct any grammatical and spelling errors and rewrite in the tone appropriate for a professional resume.

So very frequently, the process of prompting is not about starting off with the right prompt. It's about starting off with something and then seeing that the results are unsatisfactory and knowing how to adjust the prompt to get it closer to the answer that you want.

I think of the process of prompting as like this. You start off with an idea of what you want the LLM to do and you would just express that in a prompt. And then based on the prompt, the LLM will give a response and it may or may not be what you want. And if it is then great you're done. But if it isn't satisfactory then that initial response helps you shape your idea and modify the prompt and iterate maybe a few times before you get to the result that you want.

So I think of the prompting process as, when I start off I try to be reasonably clear and specific but to save time I'll often start off with a short prompt that maybe is frankly less specific than is desirable. But I just want to get going quickly. After you get the result back if it's not what you want then think about why the result isn't the desired output. And based on that refine your prompt to clarify your instructions and keep on repeating until hopefully you get the LLM response that you want.

One tip I want to share is I've seen some people overthink the initial prompt. I think it's better to usually just try something quickly and if it doesn't give you the result you want it's fine. Go ahead and improve it over time. You will not break the internet by just accidentally having a slightly incorrectly worded prompt. So go ahead and try what you want.

Two important caveats. First, if you are in possession of highly confidential information I would make sure I understand how a large language model provider does or does not use or keep that information confidential before copy pasting highly confidential information into the web user interface of an LLM.

Second, remember the lawyer from the last video who submitted court filings containing facts made up by an LLM. Before you count on the LLM's result it may be worth double checking and deciding for yourself whether or not you can trust and act on the LLM's output.

But with these two caveats when prompting I will often just jump in and try something and see it not work but then use the initial result to decide how to refine the prompt to get a better result. And that's why we say prompting is a highly iterative process. Sometimes you have to try a few things before you get the result you want.

So that's it for tips on prompting.I hope that you go to some of the web user interfaces of the large language model providers and try out some of these ideas yourself. And in this course we provide some links to some of the popular LLM providers and hope you go play with them and have fun with them.

That brings us to the end of the main set of videos for this week. There's one optional video to follow where I'll talk a little bit about image generation or diffusion models so take a look at that if you want. And then look forward to seeing you back next week where we'll talk more about how to build projects using large language models. Look forward to diving into that with you next week. See you next week.

## P10. Image Generation (Optional)

Thank you for joining this optional video. We have focused mainly on text generation, but image generation is another exciting part of generative AI. Some models can work with multiple types of content, such as text and images; these are called multimodal models.

Given a prompt, a system can create a portrait of a person who never existed, a futuristic scene, or a robot. How does it do that? Much of the image generation discussed here uses diffusion models, which learn from large collections of images.

At the heart of the process is supervised learning. Start with a picture of an apple and gradually add noise. The image becomes less clear until it looks like random pixels, with no recognizable apple remaining.

We can use these progressively noisier images to construct training examples. The input is a noisy image, and the desired output is a slightly cleaner version. A somewhat noisy apple should become a clearer apple; a very noisy image should become a slightly less noisy one. Repeating this over many images teaches the model to remove noise.

To generate a new image, start with pure noise. Feed it to the trained model, which removes a little noise. The result may vaguely suggest a fruit. Feed that result back into the model, and the fruit becomes clearer. Continuing the process can produce a recognizable watermelon, as in the example shown.

The slides illustrate this with only a few images. In practice, the process may involve many more steps; around a hundred is an illustrative number for the models discussed here. **Image generation emerges from repeatedly applying a learned denoising process.**

So far, the process generates an image without telling it what subject we want. To control the result, we add a text description to the training examples.

Suppose the original apple image has the caption “red apple.” We still add noise, but now the model receives both the noisy image and the caption. Its task is to produce a slightly cleaner image consistent with that description. Training on many image-caption pairs teaches it to use the words to guide the denoising.

When we want a green banana, we start with random noise and provide the prompt “green banana.” The first step may produce only a vague greenish shape. We feed that image back in with the same prompt, and successive steps make the banana more recognizable until the result is a clear image.

*The text prompt guides the gradual transformation from noise into an image.* This is the basic intuition behind diffusion-based image generation. Thank you for working through the optional explanation. Next week, we will explore applications built with generative AI.

## P11. Generative AI in Software Applications

Welcome back. Last week we discussed how generative AI can be used either via a web user interface or be built into a software application. This week, we'll take a look at how many amazing software applications are being built using generative AI. And we'll also take a look at some technology options that go beyond just prompting and that allow you to do much more with generative AI. For example, having it operate on your own proprietary documents rather than just on what it has learned from public sources on the internet. Let's take a look.

We saw last week a few examples of generative AI applications, such as writing answers to questions that may require access to information about your company's parking policy in this example, or reading restaurant reviews on the internet to help with reputation monitoring or building a chatbot to help take food orders. It turns out that while some applications like this did exist and were built before the rise of generative AI, **generative AI has made building these applications much easier and in many cases has made them work much better as well.**

Let me illustrate with the example of reading restaurant reviews for reputation monitoring.

A few years ago, if you wanted to build a system for reading restaurant reviews, it would have taken writing a lot of software code that looks like this, pages and pages of software that you would need machine learning engineers to write.

And specifically, the process of building a restaurant reputation monitoring review system would have looked like this. You would use supervised learning, that's that technology, that maps from inputs A to outputs B. And if I were building the system, I would start by collecting maybe a few hundred or a few thousand data points with examples like this. I would have a review, best soup dumplings I've ever eaten, that sounds delicious, and label that as a positive review. The colorful tablecloths made me smile, that's positive or not worth the three-month wait, that'd be a negative review.

And the process of building the system would involve first getting labeled data, then finding an AI team to help train an AI model on the data to learn how to output positive or negative depending on different inputs A. And then finally, you might have to find a cloud service like AWS or Google Cloud or Azure to deploy and run the model, so that when you then input, best bubble tea I've ever had, that would hopefully recognize this as having a positive sentiment. And this process would often take months.

In contrast, if you were to use prompt-based development, this is the code you would need to develop a sentiment classifier.

First, here's how I would specify a prompt in code, my prompt, which I've set equal to two parts of text. There's the instruction text, classify the following review as having positive or negative sentiment. And then here is the review text.

And after specifying the prompt in code, I just need one line of code to call the large language model to get a response back. And then I'm going to have it display or print the response. So this is pretty much all the code it takes to build such a system. And in fact, in the next video, I'll share with you an optional exercise where you can try out this code yourself.

With the traditional approach to building a sentiment classifier using supervised learning, the timeline for the project might have been a month to get, say, a thousand labeled examples with a thousand reviews and the positive and negative labels.

After collecting the data, it might have taken the team, say, three months to train the AI model on data and then another three months to deploy it and make sure it's running well and it's rugged and robust. I don't know if this seems like a long time to you, but for many really good machine learning teams that I've worked with, this six to 12 month timeline was pretty realistic for what it took to build and deploy a valuable AI model. And this worked and this was very valuable for a lot of applications, but this just took a long time.

In contrast, for prompt-based AI, this is what it feels like. You can specify a prompt in minutes or maybe hours and then deploy the model in hours or maybe days.

So, there are now many applications that have previously taken me and very good machine learning teams, maybe six to 12 months to build, that today, I think there are millions of people around the world that can now build in maybe days or a week. And this is fantastic because *this lowering of the barrier to entry to building such applications is leading to a flourishing of a lot more AI applications.*

There is one important caveat: as we discussed last week, generative AI tends to work much better for unstructured data like text and images and audio. But with that admittedly important caveat, the number of AI applications built on top of generative AI is just letting the community do much more than ever before.

In the next optional video, I'd like to invite you to try out some code with me for reading restaurant reviews and classifying sentiment. It's fine if you've never seen or written a line of code before in your life, but I'm hoping to convey to you how little code is needed to do this now and let you try it out yourself. So, I hope you take a look, though also feel free to skip it if you wish. And after that, we'll come back and talk about what building a generative AI software project feels like when we talk about the life cycle of a generative AI project.

## P12. Trying Generative AI Code Yourself (Optional)

In the next item on Coursera, a link takes you to the DeepLearning.AI platform, where you can try the code yourself. The interface has code on the left and a video player on the right. If the code is unfamiliar, do not worry; I will walk through it with you.

The main keyboard shortcut to remember is **Shift+Enter**, which runs a code cell in this environment. Start the video, follow along, and use the shortcut to execute each cell.

One cell contains the prompt we just discussed for classifying a review. Running it on “The banana pudding was really tasty” should produce a positive-sentiment classification.

This exercise is optional and is **NOT** required to complete the course. If you try it, I hope you enjoy seeing how little code is needed. Afterward, we will return to the life cycle of a generative AI project.

## P13. The Life Cycle of a Generative AI Project

I'd like to share with you what the process of building a generative AI software application feels like. Let's take a look at the life cycle of a project.

We would start off by scoping a project to decide what we want this software to do. So for example, say you decide you want to build a restaurant reputation monitoring system.

The next step would be to actually try to implement it. And given the ease of building AI applications using generative AI, which you may have seen in the optional video that came before this one, very often you really build a prototype quite quickly and then plan to over time improve this software prototype.

For some applications I've worked on, we would build the initial prototype in one or two days. And that initial prototype frankly isn't that good initially. But building it quickly lets us then take it into internal evaluation, where our team might write different restaurant reviews and test the system to see how often it is giving a correct response.

And sometimes the internal evaluation will turn up some examples where it doesn't give the right results. In this case, with my pasta was cold, it outputs this as a positive sentiment. And you know, sometimes cold pasta is delicious, but this sounds like a negative sentiment to me. And based on problems that we discovered internally, we'll then go back to continue to improve the system.

As you saw last week, writing prompts is a highly iterative process where you have to try something, see if it works and then improve it. And *building a generative AI software application also tends to be a very iterative process.*

After a sufficient internal evaluation to give you confidence that the system's working well enough, then we would deploy it out in the wild and continue to monitor its performance. And it would not surprise me if you deploy something and initially external users also generate input that causes the system to make some mistakes.

For example, maybe a user writes, my miso ramen tasted like tonkotsu ramen. Is this good or bad? Well, if you're not familiar with ramen or Japanese cuisine, you may not know. Is this a good thing or a bad thing? Your system might rate this as a positive sentiment, but if you're ordering miso ramen on the menu, you probably don't want it to taste like tonkotsu ramen, which tastes more like pork-based soup broth.

And when you find incorrect responses like this out in the wild, you might decide to go back to internal evaluation. For example, to systematically understand if your system is say underperforming on certain types of cuisine. Or you might decide to go back to take these learnings to improve the prompt or improve the system further. This assumes you decide that these errors are unacceptable.

So it turns out that **building generative AI software is a highly empirical and by that I mean highly experimental process.** This means we repeatedly try something and then find and fix mistakes.

We've already seen how prompting itself is a highly empirical process where you would have an idea, try the prompt, see the LLM response, then maybe update your idea and the prompt and go again.

But other than updating the prompts, there are other tools that we'll talk about this week for improving the performance of your generative AI system.

One tool that we talk about later this week is RAG or retrieval-augmented generation that gives the large language model access to external data sources. We'll also talk later this week about the technique called fine-tuning that allows you to adapt a large language model to your task. And then finally pre-training models, which refers to training a large language model from scratch. Don't worry about it. If you don't know what any of these terms mean, we'll go through each of them in depth later this week, but they're all key techniques that in addition to prompting give you different ways to improve the performance of your generative AI system.

To walk through a second example of the life cycle of a generative AI project, Let's look at what building a system to take food orders might look like. Say you decide to scope a food order customer service chatbot to take orders.

What you would do is start by building the system and quickly throw together a chatbot to take food orders. Then, because we do not yet know how well it works, you might let your internal team try it out and place different orders and see how well it does.

Sometimes the chatbot will give a good response. If someone asks whether the cheeseburger has pickles, it might ask whether they would like some. And sometimes it will give an unexpected poor response. Such as if you do have mushrooms on your burgers, but for some reason the chatbot says, I'm sorry we don't have mushrooms.

Similar to what we saw for the restaurant reputation monitoring system, discovering mistakes like these helps you to improve the system.

And after you're sufficiently confident that this is safe to deploy externally, you can then deploy it and let customers place real orders and monitor the large language model's responses to make sure that if it still says anything it isn't quite supposed to, that you can continue to improve its performance.

Having built a number of generative AI projects, I've often been surprised and delighted by the strange and wonderful things that the users will try to do with your system. For example, if a user asks how many calories are there in your burger, initially the system may not know. But if you discover this, you can then update the system using perhaps a technique called RAG that I mentioned just now, which we will examine in depth later this week, to allow your software application to give the correct answer.

So that's what building a generative AI software application feels like. And if you work at a company with a few or a lot of software developers, and if you ever come up with a cool idea for a generative AI application that your company could build, this hopefully gives you a sense of what that process of getting it built might be like.

Now one of the worries I sometimes hear about is, is it really expensive to use these large language models hosted by companies on the internet? It turns out that the use of these large language models is probably cheaper than many people think. In the next video, I'd like to share with you some intuitions about how expensive it is or isn't to actually use these large language models. Let's go on to the next video.

## P14. Estimating Costs

Let's build some intuition about the cost of using a large language model inside a software application. The prices shown in this lesson are examples of charges for calling models through code.

The example lists OpenAI's GPT-3.5 at 0.2 cents per thousand output tokens and GPT-4 at six cents per thousand. Google's PaLM 2 and Amazon's Titan Lite are also presented as relatively inexpensive options. Providers also charge for input tokens, though the input price may be lower than the output price. We will use a simplified calculation to understand the scale.

What is a token? Loosely, it is a word or part of a word—the units a model processes. Common words or names, such as “example” or “Andrew,” may be represented by one token. Other words may be divided into pieces. The slide illustrates possible splits of “translate,” “programming,” and “tonkotsu.” The exact split depends on the tokenizer.

Across typical English text, **one token corresponds roughly to three-quarters of a word**. Three hundred words would therefore be about four hundred tokens, or roughly one-third more tokens than words. This is an approximation for estimating costs.

Now imagine an application that generates text for a colleague to read. A typical reading speed might be 250 words per minute. An hour of reading would require 60 × 250, or 15,000 words of output.

We also need input prompts. Suppose, as a rough assumption, that the total input is as long as the output: another 15,000 words. That gives 30,000 words in total, corresponding to about 40,000 tokens.

At the example rate of 0.2 cents per thousand tokens, the cost is 40 × 0.2 cents, or **8 CENTS**. This calculation treats input and output at the same rate for simplicity, even though a provider may price them differently.

I have made several assumptions, but the result gives a useful sense of scale. Compared with an hour of someone's work, eight cents can be a small incremental cost, particularly if the application makes them more productive. The lesson compares this with wages of roughly $10–15 an hour in many U.S. locations.

Of course, a free application with a million users and no associated revenue can still become expensive. *Consider both the cost per use and the number of uses; low unit costs can accumulate at scale.* For many applications, however, using an LLM is cheaper than people initially expect.

Next, we will examine techniques that can make models more capable for particular applications.

## P15. Retrieval-Augmented Generation (RAG)

We've already seen that prompting a large language model can take you quite far. But there's a technique called retrieval-augmented generation, or RAG, that can significantly expand what you can get an LLM to do by giving it additional knowledge beyond what it may have learned from data on the internet or other open sources. Let's take a look.

If you were to ask a general-purpose chat system, such as one of the ones on the internet, a question like “Is there parking for employees?” it might answer something like “I need more specific information about your workplace,” because it doesn't know the parking policy for your company. But RAG is a technique that can give the LLM additional information so that, if you ask it about parking, it can refer to policies specific to your company.

How does it work? RAG has three steps.

Step one is to look through a collection of documents that may have the answer to the question, “Is there parking for employees?” For example, your company might have documents on employee benefits, leave policies, facilities, and payroll processes. The first step in the RAG system would be to have a computer find out which, if any, of these documents is most relevant to the question. Parking seems like a question about the facilities—the building that your team works in—so hopefully it will select the facilities document as most relevant.

The second step is to incorporate the retrieved document or text into an updated prompt. Let me construct a prompt as follows: “Use the following pieces of context to answer the question at the end.” Then I'm going to take the relevant text from my facilities documentation, with the parking policy that all employees may park on levels one and two, and so on, and put that into my prompt. This is now a pretty long prompt because it tries to give the LLM a lot of context.

Remember, last week we discussed limitations on the prompt length, or input length, for large language models. That's why, in practice, rather than putting an entire very long document into the prompt, you might pull out just the part of the document that's most relevant to the question and put that into the prompt. Finally, we add the original question: “Is there parking for employees?”

This is called retrieval-augmented generation because we're going to generate an answer, but we're going to augment how we generate text by retrieving the relevant context or information and adding that text to the prompt.

Having constructed this prompt, the third and final step is to prompt the LLM with this rich context. Hopefully, the LLM will then give us a thoughtful answer telling us where we can park.

In some applications using RAG, we would also add a link in the output shown to the user to the original source document that led to the answer. In this case, we might link to the facilities documentation so the user can, if they wish, go back and read the original source document and double-check the answer for themselves.

RAG, retrieval-augmented generation, is an important technique that enables LLMs to have context or information beyond what they may have learned on the open internet. Here are some examples of RAG-based applications.

Many companies offer software that lets you chat with a PDF file. For example, you might be reading a white paper and not have time to read the entire thing carefully, but have a question you want answered based on it. Applications like PandaChat, AskYourPDF, ChatPDF, and many others let you upload your PDF file and ask questions. They use RAG to try to generate answers for you.

I find that some of these software packages work better and some work worse, so the results you get may vary. But there's certainly been a lot of excitement and interest in building applications that let you chat with your PDF files.

There are also more and more RAG applications that answer questions based on a website's articles. For example, Coursera Coach does multiple things, but one of them is to use RAG to try to answer questions based on content on the Coursera site itself. Snapchat also has a chatbot that uses text from Snap to try to answer questions you might have about its products. HubSpot, a marketing automation company, is another example of a company with a chatbot that lets you pose questions and tries to generate answers based on content from the company or its website.

These types of chats are becoming an alternative way for users to get answers to questions about your company's offerings.

RAG is also leading to new forms of web search. Microsoft Bing has a chat capability. Google has a generative AI feature that can generate text in response to your queries. And the startup You.com, which was started by one of my former PhD students, Richard Socher, is a web search engine built around a chat-like interface. RAG is used in many applications today, and excitingly, it seems to be transforming even web search.

To wrap up this video, there's one big idea I'd like to share: think of the LLM not as a knowledge store, but as a reasoning engine. LLMs may have read a lot of text on the internet, so it's tempting to think of them as knowing a lot of things. They kind of do, but they don't know everything.

With the RAG approach, we provide relevant context in the prompt itself and ask the LLM to read that text and process it to arrive at an answer. Rather than counting on it to have memorized enough facts to give us the answer, we're using it as a reasoning engine to process information, not as a source of information.

I find that thinking about LLMs as reasoning engines, rather than as a way to store and retrieve information, can expand the set of applications we might brainstorm and consider an LLM capable of handling. Admittedly, LLM technology is still early, and it doesn't always do this well. But if an LLM isn't just a database that stores information for you, and can instead process and reason through information, I think that is an exciting direction to consider for where LLMs might go from here.

Even though I've talked mostly about RAG in the context of building software applications, this idea can also be useful if you're using a web user interface. Sometimes I take a piece of text, copy it into the prompt of an online LLM interface, and tell it to use that context to generate an answer for me. That too can be an application of RAG.

I've found that RAG is useful for many different applications, and I hope that you will too. In the next video, we'll talk about another technique called fine-tuning, which is another way to expand what an LLM can do.

Before I wrap up, let me just say: I hope you enjoyed this video on RAG and that you can really clean up with this RAG stuff. I'll see you in the next video.

## P16. Fine-Tuning

Whereas RAG gives you one way to give additional information to a large language model, there's another technique called fine-tuning, which is another way to give it more information. In particular, if you have context that is bigger than can fit into the input length or the input context window length of the LLM, then fine-tuning gives you another way to get an LLM to absorb this information. Fine-tuning also turns out to be useful for getting the LLM to output text in a certain given style, but its actual implementation is a bit harder than RAG. Let's take a look.

Let's say you have an LLM trained the way that we had described previously, with sentences found on the Internet like, my favorite food is a bagel with cream cheese. Then it may have learned from hundreds of billions of words, or maybe more than a trillion words to predict the next word like this. An LLM like this will have learned to generate text that sounds like what's on the Internet. And this process of training a large language model on a lot of data is often called pre-training.

Now, let's say I want to modify the LLM to have a relentlessly positive and optimistic attitude about everything. There's a technique called fine-tuning that we can use to cause the LLM to do a little bit more learning, to change its outputs to be, in this example, much more positive and optimistic.

To fine-tune the LLM, we would come up with a set of sentences or a set of texts that takes on a positive optimistic attitude, such as what a wonderful chocolate cake, or the novel was thrilling.

These texts become an additional training dataset. For “What a wonderful chocolate cake,” the model learns to predict “a” after “What,” “wonderful” after “What a,” and so on.

An LLM pretrained on hundreds of billions of words can be fine-tuned on a relatively modest additional dataset: perhaps 10,000 words, 100,000 words, or a million words if more data is available. This can shift its outputs toward a positive, optimistic attitude.

Now, maybe shifting an LLM to have a relentlessly positive attitude isn't that helpful an application, but fine-tuning is used in many real applications.

**One class of applications that fine-tuning is used for is when the task is NOT easy to define in a prompt.** For example, if you want to use an LLM to summarize customer service calls, a generic LLM may look at a call like this and summarize it to say the customer tells the agent about a problem with a monitor.

But if you run a customer call center, you might want it to generate specifics about what the conversation was about. It was about the MK4127KX reported broken by customer 5402 and so on.

Start with a large language model that has learned general knowledge from hundreds of billions of words on the internet. Fine-tuning it on perhaps hundreds of carefully written expert summaries can shift its output toward the specific style you want. And the specific style of summary is actually not that easy to define in a text prompt. Maybe you could do it, but fine-tuning would just be a very precise way to tell the LLM what summaries you want.

Another example of when a task isn't easy to define in a prompt is if you want to mimic a specific writing or speaking style. So Tommy Nelson, who's been working with me on this course, actually tried kind of just for fun to get an LLM to sound like me. But it turns out that the way most individuals sound is not that easy to describe in a prompt. I mean, how would you give someone clear instructions to sound like me? So if you were to prompt a general purpose LLM and ask it to sound like me, you get texts like this, which I don't think it sounds that much like me.

But if you were to take a lot of transcripts of the way I actually talk and have an LLM be fine-tuned to train it to really sound exactly like me by learning on my actual words, then asking it to write something that sounds like me results in text like this, which I don't know, this sounds more like how I would talk.

But because mimicking a specific writing or speaking style is very difficult to do via prompting, because it's just difficult to describe a specific person's style by writing text instructions, fine-tuning turns out to be a more effective way to get an LLM to speak in a certain style. And if you're building an artificial character, maybe a cartoon character, fine-tuning could also be a way to get an LLM to speak in a certain style.

Other than tasks that aren't easy to define in a prompt, a second broad class of applications of fine-tuning is to help the LLM gain domain knowledge. For example, if you want an LLM to be able to read and process medical notes, this is what a medical note written about a patient by a doctor might look like.

The note uses specialized abbreviations: PT for patient, C/O for complaining of, SOB for shortness of breath, DOE for dyspnea on exertion, and PE for physical examination. Treatment is to follow up with the primary care physician. STAT, chest x-ray, continuing treatment as needed on oxygen.

This specialized shorthand differs from everyday English. If you were to take an LLM trained on everyday English, it wouldn't be very good at processing text like this.

So if you were to fine-tune an LLM on a collection of medical records, then the LLM could get much better at absorbing this body of knowledge about what medical notes sound like. And you could then use that to build other applications on top of it to better understand medical records.

Or legal documents. Here's a piece of legalese kind of written by lawyers for lawyers that is really difficult for non-lawyers to read. The licensor grants the licensee, per section 2A3, a non-exclusive right and so on and so on within 15 days hereof.

I don't know about you. I do not use the word hereof in my ordinary day-to-day speech, but this is what legal documents sound like.

And if you want your LLM to gain a body of knowledge about how to read and understand legal documents, then taking an LLM and fine-tuning it to legal documents would help it to gain that body of knowledge.

And similarly, financial documents too. Fine-tuning an LLM on a large set of financial documents would help it to better gain that body of knowledge about finance and make it better at applications involving processing documents that look like this.

Finally, another reason to fine-tune an LLM is to get a smaller model to perform a task that may previously have required a larger model. We'll discuss later this week some of the pros and cons of choosing a larger versus a smaller model.

But for some LLM applications that need a lot of knowledge or need complex reasoning, you might use a relatively large model, say with over a hundred billion parameters. But if we were to use a model like that, such a model may have relatively high latency, meaning after you prompt it, you might need to wait a while to get back a response.

And if you were deploying this on your own computers, it could be quite costly. And even though we said in the earlier video that these models aren't that expensive, maybe you want it to be even cheaper. And that's because a hundred billion parameter model may take specialized computers, such as a GPU server or other really fast computers to run. You probably have a hard time running such a large model on a normal laptop or PC and certainly not on a smartphone today.

But if you can get your application to work on a much smaller model, say one billion parameters, then that's the range of model size that it would run much more easily on a laptop or a PC or on a mobile phone.

So for example, if what you want is to classify restaurant reviews as positive or negative sentiment, this is a simple enough task that you probably do **NOT** need a 100- or 200-billion-parameter model to run. But maybe a one billion parameter model would be just fine. An even smaller model might work.

But these smaller models are generally less capable than really large models, which is why if you were to take a small model and then fine-tune it on the dataset, like the one shown here, not just three examples, but maybe a few hundred or maybe a thousand examples, if you have that much data, then you can get a small model, say a billion parameters to do really well on a task like this.

So to summarize, *fine-tuning gives you another technique in addition to RAG to help improve the capabilities of an LLM.* You might use it for tasks that are hard to specify in a prompt, such as if you wanted to output text in a certain style, or if you want the LLM to gain a body of knowledge, such as about medical notes, or if you want to get a smaller and cheaper to run LLM to do a task that might otherwise have required a larger LLM.

It turns out that RAG and fine-tuning are both relatively cheap to implement. RAG works by adding retrieved information to your prompt. And fine-tuning, you might be able to get started with tens of dollars, or maybe low hundreds of dollars, depending on how much data you want to fine-tune on.

There's another technique, pre-training your own model that turns out to be very expensive. And today, almost no one other than reasonably large companies, usually tech companies, are attempting this. But for completeness, let's take a look at the next video and what pre-training involves.

## P17. Pretraining an LLM

Most models we use have already been pretrained by another organization. When should you train one yourself from scratch? Because this can be extremely expensive, my default advice is to be cautious about choosing it.

Training a large general-purpose model on internet text may cost tens of millions of dollars, require a dedicated engineering team, take months, and consume a substantial amount of data. Teams that build and openly release these models make a valuable contribution to the AI community.

If you have the resources and want to contribute in that way, that can be worthwhile. But for a specific application, **pretraining is often a LAST RESORT** because of the time and expense.

It may make sense when you have a highly specialized domain and a large amount of relevant data. Bloomberg, for example, trained BloombergGPT for financial applications using its extensive collection of financial text. It reported better performance on financial tasks than general-purpose models trained mainly on internet data.

For many applications, a more practical approach is to start with a pretrained model and fine-tune it using your own data. *Adapt an existing model before assuming you need to train a new one from scratch.* This can produce useful performance at a much lower cost.

I am grateful to the teams that invest in pretraining and make models available to others. Their work gives us many choices. Next, we will look at how to choose among models of different sizes and with different access arrangements.

## P18. Choosing a Model

When using an LLM to build a software application, you find that there are a lot of different LLMs out there. Some big ones, some small ones, some open source, some closed source. How do you choose from all of these different options? In this video, let's take a look at some guidelines.

One way to estimate how capable an LLM is, is to look at the model size. Loosely, if we look at models that are, say in the 1 billion parameter range, we will find that they're often good at pattern matching and will have some basic knowledge of the world. So if what you want is to classify restaurant reviews for sentiment, I think a 1 billion parameter model would probably be able to do just fine in terms of that type of pattern matching with basic knowledge about food-related words.

As you go to a 10 billion parameter model, you find that the models have greater world knowledge. They just know more esoteric facts about the world. And the models also get better at following basic instructions. So if you want to build a food order chatbot, a 10 billion parameter model might be okay, especially if you were to fine-tune it to become better at the types of specific instructions you want it to follow.

And then the very large models, say 100 billion plus parameters, will tend to have very rich world knowledge. They'll know a lot of things about physics and philosophy and history and science and so on. And they'll be better as well at complex reasoning.

This is why if you're building a food order chatbot, maybe you don't need the chatbot to know so much about history and philosophy and all of these other things under the sun. Some of these models might be cheap enough to deploy, that it might be okay to use a huge model even for a food order chatbot.

But where I would definitely tend to use these larger models would be tasks that involve deep knowledge or complex reasoning. So for example, if I'm looking for a brainstorming partner to help me think through ideas, I'll often use one of the larger models.

One of the things you've heard me say earlier though, is that development using LLMs is often a highly empirical, meaning experimental process. So it's hard to know in advance exactly what the performance of a given LLM will be.

And while I'm sharing some general guidelines here, in practice, **it might be worth just trying a few different models and testing them.** And *based on the results you see from testing a few options, then pick what actually seems to work best for your application.*

Another decision you might have to make is whether to use a closed source or an open source model. Closed source models are usually accessible via cloud programming interface. And I find that many of them are pretty easy to build into applications. You just have to write a few lines of code, like we saw earlier this week, to incorporate them into software applications.

Many of the largest and most powerful models today are also available only via cloud programming interfaces and are closed source models. And they're also relatively inexpensive to run because the large companies hosting these models will often have put a lot of work into serving up these API calls inexpensively.

A downside is that if you develop using these closed source models, there is some risk of vendor lock-in. Today, the switching cost from one LLM to a different one is not very high, but there is some cost to retesting all your prompts to see if they work on a different LLM if you do switch vendors.

In comparison, there are also many open source models that are available now. One advantage of using an open source model is you have full control over the model. You know you always have access to that model and don't have to worry about whether the company providing it were to retire or deprecate the model that you had built on top of.

You can also often run these models on your own device. So if you want to run it on premises or on prem, that is on your own servers, or on a PC or a laptop or a mobile device, then open source models may give you a good starting point to do that.

And using an open source model might also let you build an application in a way that retains full control over data privacy and data access.

For example, I was recently working on an application using electronic health records. And because of patient privacy, we just could not upload the patient records to a cloud provider. And so for that project, my team used an open source model that we ran on our own computers because we had to do that to guarantee privacy of the patient data.

So to summarize, this week we talked about software applications built using LLMs. We saw the life cycle of a generative AI project, as well as techniques like RAG and fine-tuning that can make your LLM more capable. And lastly, in this video, we talked about how to choose an appropriate model to build on.

There are also a couple of optional videos after this one, one that goes a bit deeper into the technology that enables LLMs to not just predict the next word found on the internet, but actually follow your instructions and do so in a safe way. And the other optional video talks about some frontier cutting edge technology that can use LLMs to automatically decide what to do and also use tools along the way. So please feel free to check out those videos if you wish.

And then in the next and final week of this course, we'll take a look at how LLM technology is affecting businesses and society.

For example, how can you identify LLM use cases that could be useful for your company? We'll take a look next week at a systematic way to understand what jobs are more or less affected by generative AI and how both the individuals doing the jobs as well as businesses employing people doing those jobs might navigate the changes that generative AI is bringing to work. I look forward to seeing you next week.

## P19. Instruction Tuning and RLHF (Optional)

We have described LLMs as learning to predict the next word from internet text. But when you ask a model a question, you want an answer, not simply a plausible continuation of a webpage. How does it learn to follow instructions?

Suppose a pretrained model sees “What is the capital of France?” It might continue with “What is the capital of Germany?” or another geography question, because lists of questions occur online. That is a plausible continuation, but it is **NOT** the response we want. We want the model to answer “Paris.”

**Instruction tuning fine-tunes a pretrained model on examples of prompts paired with appropriate responses.** A question about South Korea's capital is paired with an answer identifying Seoul. A request for interesting museums in Bogotá is paired with suggestions. An instruction to write a haiku about Japan's cherry blossoms is paired with a suitable poem.

The data can also include examples of declining inappropriate requests. The slide uses a request to break into Fort Knox, the secure facility holding U.S. Treasury gold. An appropriate response would refuse to help with the break-in rather than provide instructions.

These examples still support next-word training. For the museum request, the model might first learn to predict “Sure,” then the following words of the helpful response. Fine-tuning on many such examples teaches the model to answer questions and follow instructions.

A second technique, reinforcement learning from human feedback, or RLHF, can improve the responses further. Many developers aim for answers that are **HELPFUL, HONEST, AND HARMLESS**, sometimes called the three Hs.

In the simplified process discussed here, the first step is to train a model that scores response quality. For a prompt asking for advice on applying for a job, an LLM might produce several responses: a useful set of steps, an uninformative “Just try your best,” or a discouraging “It's hopeless. Why bother?”

Human reviewers assess those responses. A helpful answer receives a higher score, a mediocre answer an intermediate score, and a poor answer a lower score. These judgments provide training information for an answer-quality model, which learns to estimate how good a response is.

The next step is to have the LLM generate responses to many prompts and use the quality model to score them. Those scores become rewards that guide further training. The model is adjusted to produce more answers that receive higher rewards.

The feedback begins with human judgments, while the learned quality model allows many additional responses to be scored automatically. That is the intuition behind reinforcement learning from human feedback.

*Instruction tuning teaches the pattern of following instructions; preference-based feedback helps refine the quality of the responses.* Together, these processes help turn a text-continuation model into a more useful assistant. In the next optional video, we will look at tools and agents.

## P20. Tools and Agents (Optional)

In this final video of the week, we will look at how LLMs use tools and then discuss agents, which can decide on a sequence of actions to take.

Consider the food-ordering chatbot. If a user asks for a burger, saying “It's on its way” is not sufficient. The application must actually place an order. A model can generate structured information identifying the item, user, and delivery address, along with the message to display to the customer.

Software reads that output and sends the appropriate request to the ordering system. The customer sees the conversational response, while the other information is used internally to carry out the action. **The model's output can request an operation; application software performs it.**

An incorrect order can be costly, so a confirmation screen may be appropriate before charging the customer and arranging delivery. More generally, for consequential actions, it can be useful to have a person confirm the model's interpretation before execution.

Tools can also improve calculations. Suppose the user asks what $100 will become after eight years at 5% annual interest. A model might confidently give $147.04, which is incorrect. Models trained to predict text are not necessarily reliable at exact arithmetic.

Instead, the model can produce a request for a calculator to evaluate `100 * 1.05**8`. The application executes that calculation and obtains approximately **$147.75** when rounded to the nearest cent. The result can then be incorporated into the answer. As with a person using a calculator, the tool supplies a more reliable calculation than unaided text generation.

*Tools extend a model's capabilities by connecting its language output to computations, information sources, and actions.* Designers still need to consider what happens if a tool is requested incorrectly, especially when an action could be harmful or irreversible.

Agents extend this idea from a single operation to a sequence of actions. In the stage of research discussed in this course, this is still an experimental area, with promising demonstrations but limitations that make it difficult to rely on for many important applications.

For example, an agent asked to research Better Burgers' competitors might plan to find a list of competitors, visit each website, and summarize the homepage information. It can use an LLM to reason about the steps, request a web-search tool, retrieve pages, and call the model again to summarize the results.

Rather than having a developer specify every action in advance, the system chooses a sequence for the task. The possibility of models planning and using tools safely and responsibly is one reason researchers are excited about agents.

Thank you for completing week two. In the final week, we will examine how generative AI affects companies and society, including how to identify useful applications and understand changes to work.

## P21. Using Generative AI in Everyday Work

Welcome back. This week we'll start by taking a look at the role of generative AI in business and then after that at its impact on society. For example, its impact on jobs. We'll start by looking at how people in many different job roles can already use the web user interfaces to access generative AI in their day-to-day work.

After that, we'll take a look at a systematic framework for analyzing a business to identify opportunities to use generative AI to augment or to automate different tasks in the business, maybe in your business, and to identify where building or buying an LLM-based software application might add value. Let's dive in.

As you've seen previously, **an LLM can be a pretty good writing assistant or copy editor.** So if you ask it to rewrite a piece of text to be suitable for a professional business report, it'll often do a pretty good job. I use it pretty often myself for this purpose, although I double-check its output before using it in my own writing.

And because generative AI is a general-purpose technology, I'm seeing also that it's used by many different people in many different job roles. For example, marketers are using it to help brainstorm ideas. If you ask it, help me brainstorm an email campaign to reactivate lapsed users, then it might come up with ideas for email campaigns like this. And if you want, you can even ask it further details of what a We Miss You email campaign might look like, and so on.

Or if you're a recruiter, I'm seeing recruiters use LLMs to summarize reviews. So here it says, summarize the final review of a job candidate in 50 or fewer words, and it does usually a pretty decent job. Although, again, I would recommend double-checking a summary before using and fully relying on it. But LLMs are pretty good at summarizing text.

And for programmers or software engineers as well, LLMs turn out to sometimes be helpful at writing an initial draft of some types of code. So write Python code to calculate something fairly technical, and in this case, the LLM generates a correct piece of code. But once again, it can also generate buggy code. **You should NOT assume that generated code is correct.** And so when I'm using this for software development, I will often end up having to fix it, but it's helpful to get a programmer started on a task.

So people doing many different types of job roles are already finding LLMs useful in their day-to-day work. *I find myself often using an LLM as a thought partner to help me think things through, and I hope that you too will find it useful in your day-to-day work.*

And when you look across an organization, what are the most valuable opportunities for using generative AI technology, or for even trying to build or buy software applications built using LLMs? In the next video, we'll start to take a look at a framework of looking at jobs and tasks done by an organization to try to identify such opportunities. Let's take a look at that in the next video.

## P22. Analyzing Jobs and Tasks

Many businesses, think of a large or a small company say, have many people doing many different tasks. There's a framework that had originated in economics due to Erik Brynjolfsson, Tom Mitchell, and Daniel Rock for analyzing the work tasks for possible automation using AI. This framework is useful not just for economists to understand the financial or economic impact of AI, but also for businesses to identify specific opportunities to use generative AI. Let's take a look at how to do this.

There has been a lot of discussion, for example in the media, about whether AI will automate jobs. It turns out that from a technical and business perspective, it's more useful to think of AI as automating **TASKS**, rather than entire jobs. And it turns out most jobs involve a collection of many tasks. Let's look at an example.

A customer service representative will do a number of different tasks, including answering inbound phone calls from customers and answering customer chat queries via text rather than through a voice or a phone interface. They may check status of customer orders, keep records of interactions, and assess the accuracy of customer complaints. And if you work in a company with, say, many customer service representatives, the first step to analyzing the potential for using generative AI would be to understand for your business, what are the tasks that the representatives in your company do?

After that, we can then take a look at these different tasks and try to assess their potential for generative AI to either help with, augment, or automate these tasks.

For example, for generative AI to pick up the phone and have a long conversation, that's still pretty difficult. So we assess that to be a lower potential opportunity. But answering text chat with customers, that might have a higher potential. Maybe checking status of customer orders is medium, whereas keeping records of customer interactions could be high. And assessing accuracy of customer complaints may be low.

All of these examples in the rightmost column are hypothetical. *The actual impact on your business will be different and will depend on the specifics of your business.* But after an analysis like this, and I'll go in a little bit into the specifics of how to carry out this analysis, you might then decide that answering customer chat queries and keeping records of customer interactions have the highest potential and therefore focus your efforts on those two tasks.

Now, the opportunity for generative AI could be either augmentation or automation. By augmentation, I mean we can use AI to help a human with a task. In the customer service representative context, we might have generative AI recommend a response for a customer service agent to edit or approve, but not fully automate the sending of a message back to the customer. So if we are not yet sure whether generative AI will give good answers, then recommending a response could speed up the people doing the work, but not fully automate it. And this would be an example of augmentation.

And automation would be if we have an AI system fully automatically perform a task. So if we were to automatically transcribe and summarize records of customer interactions, that could be an example of automation.

What I see in many applications is that businesses will sometimes start with augmentation to maybe let a human double check or finalize the output before it is used. But then as you gain trust and gain confidence in the output of the generative AI, then the user interface can be adapted to make the process more and more efficient for humans and to then gradually shift toward higher and higher degrees of automation and perhaps eventually to full automation.

Now, given a list of tasks like this, how do you come up with this column on the right? How do you evaluate the different tasks for generative AI potential? **The potential for augmenting or automating a task depends mostly on two things, technical feasibility and business value.**

So technical feasibility refers to, can AI do it? And also, how costly is it to build an AI system to do it? And with regard to using an LLM, I found the framework we discussed last week of asking, can a fresh college graduate following the instructions in the prompt complete the task? That could give you a first guess, an imperfect, not necessarily fully accurate guess, but it gives you a way to think about whether a certain task may be doable or not.

And sometimes, if you're not sure if an LLM can do a certain task, I would encourage you to try prompting an LLM to see if you can get the LLM to do that task. And this would be an experiment that you might be able to do quite quickly. So long as you're not revealing confidential information, if you take some prompts for, say, answering customer chat queries and paste them into a large language model, you can maybe quickly get a sense of how good its response is. And this could help you relatively quickly assess technical feasibility of using generative AI for a particular task.

And an AI engineer can also help you assess if more advanced techniques like RAG, retrieval-augmented generation, fine-tuning, or other techniques can help, and give you a sense of perhaps the complexity and therefore the cost of building an AI system to tackle a certain task.

In this course, I'm focusing mainly on technical feasibility using generative AI technology. If you or your team is familiar with other AI tools, such as supervised learning, you can also assess the technical feasibility of using other tools as well for augmenting or automating different tasks.

Other than technical feasibility, the second criterion I'd urge you to think through is the business value. So how valuable is it to use AI to either augment or automate a particular task? And so the questions I would ask to frame up my thinking on business value would be things like how much time is spent on this task? So how much time savings can we actually realize?

Second, I'd also ask, does doing this task significantly faster, cheaper, or more consistently using AI create substantial value?

While it may seem like augmentation and automation can lead to cost savings, we'll see later this week as well that when you automate the task, sometimes the benefits are much greater than just cost savings because it also leads to rethinking the workflow around that task. But if what I'm saying doesn't make sense yet, don't worry about it. We'll see some specific examples of this later this week.

Before we wrap up this video, there's one more resource I want to share that may be useful for your analysis of how to break job roles down into tasks, which is that there are online occupation databases that you can look up to see what are the tasks that comprise a certain role.

Here's a screenshot from a website called O\*NET, which is a US government funded website that for the customer service representative role lists lots of different tasks, including conferring with customers by telephone or in person, keeping records of customer interactions, and so on.

I found that occupation databases like this tend to be general and not necessarily specific to your company. And so I wouldn't recommend just using the results from, say, this O\*NET database and assuming it's accurate for your company. There'll usually be some entries there that you read and feel like, no, this doesn't seem like it applies to my company. But I found that this is a useful resource to take a look at just for ideas and to help make sure that maybe you haven't missed anything when thinking through what are the tasks done by people in different job roles in your company.

O\*NET is a little bit US-centric, but it has a nice, easy-to-use user interface, so I encourage you to play with it. And there are some other countries as well that have some other country or region-specific databases that you may be able to find online as well. But I found that for many job roles, O\*NET is maybe a reasonable initial starting point.

So that's how you can look at different job roles and start to break them down into tasks and analyze the individual tasks for potential for augmentation or automation. And I hope you play with the O\*NET website and get a feel for what different tasks and different job roles look like.

In this video, we went through the customer service representative example. I'd like to go through with you a few examples of other job roles as well. So let's go take a look at that in the next video.

## P23. Examples of Job Task Analysis

For many job roles, people have a mental picture of an iconic task that defines the job. Computer programmers write code, doctors see patients, and lawyers go to court to argue cases. When thinking about AI opportunities, it is natural to ask whether AI can do that iconic task. But **when we systematically analyze the tasks that make up a job, the best opportunities may differ from our first instincts.**

Computer programmers write code, but they also write documentation, respond to user support requests, review other people's code, and gather requirements for what a piece of software should do. Generative AI can help write code, but that can be a relatively difficult task. Writing documentation may be easier to support with generative AI.

Do **NOT** take the potential ratings in these examples too literally: they are informal evaluations. A rigorous assessment of technical feasibility and business value for your organization may lead to different conclusions. Still, I think it is often easier to get generative AI to write documentation for code than to write the code itself. *The best opportunity for AI may not be the most obvious task associated with a job.*

Consider lawyers. They draft and review legal documents, answer clients' questions about interpreting laws, review evidence when preparing a case, negotiate settlements, and represent clients in court. Listing these tasks and evaluating their potential can reveal useful opportunities. Generative AI may help with drafting and reviewing documents or interpreting laws, whereas I cannot see a lawyer sending a robot to court to argue on their behalf, at least for some time. This analysis could help a law firm decide where to use generative AI.

A landscaper maintains and cares for plants, purchases and transports plants, maintains equipment, communicates with clients, and maintains a business website. These are only a subset of the tasks involved. Your own analysis might list anywhere from 5 to 15 to 30 tasks for a job role. Most of a landscaper's tasks have relatively low generative AI potential, so this work may be less affected in the next few years than programming or legal work.

That is how you can analyze jobs by breaking them down into tasks. Think through the tasks in your own work and where generative AI could help. If you are involved in a business, consider how it could help with the different tasks across that business.

When people think about augmentation or automation, their minds often go first to cost savings. Automating something seems like a way to save money. But in waves of technological innovation—from the steam engine to electricity to the computer—many companies began by considering cost savings and ended up putting even more effort into revenue growth. **You can save only so much money, whereas growth has no fixed limit.**

When a task becomes automated, you may be able to rethink how the business creates value. Suppose answering customer queries becomes a thousand times cheaper. Beyond taking the cost savings, you could try to build a different kind of customer service organization that serves people a thousand times better. This kind of thinking can reveal growth opportunities well beyond cost savings. Let's look at some examples in the next video.

## P24. New Workflows and Business Opportunities

Generative AI can lead to both cost savings and revenue growth. A general-purpose technology can create value in too many ways to cover them all here, so I want to examine a few emerging paths toward growth.

Consider a hypothetical surgeon preparing for an operation and then carrying it out. Without generative AI, the surgeon might spend substantial time researching the procedure and how to perform it for a specific patient, before entering the operating theater. Generative AI, perhaps using a custom retrieval-augmented generation (RAG) system, could reduce the time and effort needed for research. The surgeon would still need to perform the operation afterward. This illustrates how AI could change the effort required for one part of a workflow while leaving another part much the same.

A lawyer reviewing a complex legal document might first gather information from the client: What is the purpose of the contract? Who is signing it? What are the key business terms? The lawyer would then review the document and sit down with the client to provide feedback. With generative AI, gathering information might require about as much effort as before, but reviewing the document could become faster. Giving detailed feedback might still take substantial time. This is a hypothetical example based on what I see companies doing; the details of your workflow may differ.

For a comparatively simple document, such as a typical nondisclosure agreement (NDA), there may be little information to gather initially. The lawyer can review the agreement and give feedback. Generative AI could make the review faster and produce a summary of issues that the lawyer can send to the client and discuss more efficiently. Both review and feedback could become less time-consuming.

After building such a system, a company might decide to change the workflow further by inserting a quick human verification step after the AI review. The lawyer would check that the AI's assessment is comprehensive and correct before using it to provide feedback. **When a task is automated or augmented, it often makes sense to rethink the surrounding tasks needed to deliver a valuable result.** This kind of workflow redesign is common when generative AI or other AI tools become part of a process.

The redesign can become more sophisticated in marketing. Writing copy for a website often requires considerable time and thought. After writing, a marketer publishes the copy to the website. Suppose generative AI makes writing much faster. It may then be worth investing in better processes or software to make publishing faster too. We could stop there, with a marketer who completes the same work more efficiently.

But faster writing and publishing also create new possibilities. The marketer could write one version of the copy, publish it, then write and publish another version for an A/B test. The team could measure which version performs better. If producing copy becomes efficient enough, it could test four versions instead of two.

After collecting performance data, the marketer might spend more time analyzing the campaign to understand which copy works best, then use those insights to improve the next version. Generative AI can therefore change the entire workflow: writing, publishing, testing, analyzing, and improving. *The value can come from delivering more effective campaigns, not only from completing the original work at lower cost.*

We have seen how new workflows can support growth through different services or products. Another useful framework is to analyze the tasks performed by your customers. **Look at your customers' tasks as well as your employees' tasks.** I do not see this done as often, but it may be useful for your business.

Suppose your product helps customers build websites. Their tasks might include selecting a template, writing a title, choosing images, writing homepage copy, and optimizing that copy so people can find the site through search engines. Analyzing these tasks could reveal opportunities to help with title writing or search engine optimization (SEO).

This analysis can lead a company to build different products or services that help customers accomplish their work. That can create happier customers and support business growth. Automating or augmenting employees' tasks and customers' tasks are both useful starting points for thinking about value creation.

These frameworks are **NOT** the only ways to find ideas. If you have another idea that did not come from this kind of analysis, that is worth exploring too. Some ideas can be implemented through a web interface; others require a custom software application.

In the next video, we will look at common team structures and practices for building generative AI applications. As I mentioned in the first week, this may require fewer resources than you expect, because generative AI can make application development much more efficient than earlier approaches.

## P25. Building a Generative AI Team

My teams have worked with or advised many companies, both large and small on building a large variety of generative AI applications. I'd like to share with you in this video some of the best practices I'm seeing as well as what a typical team to get started on such a project might look like.

The most common roles for building generative AI applications would be a software engineer who would be responsible for writing the software application and making sure that it runs reliably. I've seen that when a software engineer puts in just a bit of effort to learn at least the basics of large language models and prompting, then they can be very effective in a small team building LLM-based applications. So if you're on a team that already has some software engineers, it might be worth encouraging them to consider spending just a little bit of time to learn at least the basics of LLMs and prompting.

A second role that is quite common on teams to build applications would be the machine learning engineer. And machine learning engineers are typically responsible for implementing the AI system. Many machine learning engineers have been building AI systems even before generative AI took off and I have found that a machine learning engineer that spends just a bit of effort to learn about LLMs and ideally not just prompting but some of the more advanced techniques like RAG and fine-tuning can be very effective in building LLM applications.

And finally, one other role that I see in some teams but less common than a software engineer or machine learning engineer would be the product manager. And they would be the person with primary responsibility for identifying and scoping the project and making sure that whatever is built is useful for customers.

Lastly, how about the prompt engineer role? There's been a bit of media hype about this role but what I'm seeing is that very few companies are hiring this as a dedicated role. What happened was a small number of companies advertised a small number of job openings for very well-paid prompt engineers and this generated a lot of media hype that someone could make a lot of money by prompting. But if you look at the actual job description of prompt engineers, prompt engineering jobs actually require doing a lot of tasks beyond writing prompts and they actually look more like machine learning engineers that have additionally learned to prompt. So do **NOT** buy into the hype around the prompt engineer role. What actually happens in practice is that most companies are counting on machine learning engineers that have also learned LLMs or learned prompting. It is actually not that easy to get a job and nor are companies hiring that many people whose **ONLY** job is to write prompts.

If you're building an LLM-based application, **it's often possible to get started with a pretty small team.** So I definitely see companies start to experiment with even just a one-person team, such as a software engineer who's learned some prompting or a machine learning engineer who's learned a bit about prompting LLMs. Or maybe you could just start by yourself by experimenting and prototyping using some of the web interfaces to try to get a sense of what might be feasible.

I do see a lot of two-person teams as well. And if you have two people in a team, probably the most common configuration is a machine learning engineer plus a software engineer. But I've seen many other configurations also work well, such as a software engineer who's learned prompting and a product manager, or really two generally enthusiastic people that know a bit about how to write software and are willing to learn how to use these tools to build new and exciting applications.

Sometimes for the larger teams, you also see some of the roles like data engineer, data scientist, project manager, or machine learning researcher. Let me quickly talk over these roles as well in case you see them in a company. So a data engineer is usually responsible for organizing the data and ensuring data quality and often also the security of the data.

And a data scientist is usually responsible for analyzing data to make recommendations to guide project or business decisions.

Project manager can be responsible for coordinating project execution. And machine learning researchers are usually responsible for developing advanced AI technologies or adapting advanced AI technologies to the particulars of your business.

So *generative AI has lowered the cost, lowered the barrier to entry to building AI-based applications.* If you or your team have an idea, I'd encourage you to try to find the resources to prototype and try something out and see if you can build something for yourself or for your business.

Before we wrap up the section on generative AI and businesses, I'd like to go through an analysis of how AI is affecting different job roles as well as different industry sectors. Let's take a look at that in the next video.

## P26. Automation Potential Across Industries

We've looked at how generative AI may be useful to your work, and also talked about analyzing its impact on a business. Let's now zoom out and take a look at its impact on job roles across different companies, as well as its impact on different industry sectors. The results from this video may be less directly actionable for a particular business, but maybe this will help you to think through and try to forecast some of the large-scale economic changes that may take place over time. Let's dive in.

A study by Tyna Eloundou and others at OpenAI and the University of Pennsylvania examined how much different job occupations are exposed to AI augmentation or automation. That study resulted in this graph showing that **higher wage jobs tend to be more exposed to AI augmentation or automation than lower wage jobs.** In this graph, which is a somewhat unusual horizontal axis because it uses a logarithmic scale, we plot salaries ranging from about 30k up to about 163k like this, and the vertical axis measures the degree to which these jobs are exposed to automation.

Earlier waves of automation tended to have lower wage jobs more exposed because AI could do more of the routine repetitive work. So supervised learning, for example, tended to automate more of the lower wage jobs. But large language models and generative AI more broadly are exposing in this wave the higher wage occupations to automation. And we'll say more later this week as well about the impact of generative AI on jobs.

Let's look at the second study due to McKinsey, which carries out an analysis by functional role. This graph plots different functions and tries to estimate how much will sales be impacted? How much will marketing be impacted? How much will customer operations, including customer service, be impacted?

The vertical axis here shows the total impact in terms of billions of dollars. And so the points in the upper portion of this graph correspond to the functional roles, where the total value of the impact will be large in terms of total number of dollars.

The horizontal axis measures the impact as a percentage of the functional spend. So customer operations, according to this study, will have a very large absolute dollar value impact, maybe around $400 billion. I would **NOT** take the exact numbers too seriously since these are frankly loose estimates, but the total dollar value seems like it will be large because generative AI is automating or augmenting a lot of customer service. Moreover, as a percentage of all the spending on customer operations, generative AI's impact will be pretty large as well, maybe approaching 40% of the total spend on customer operations.

In contrast, it will also have an impact worth hundreds of billions of dollars on sales, but as a percentage of the total spend on sales, it is much smaller.

And the McKinsey study also estimates that these yellow dots shown on top together might represent 75% of the total annual impact of generative AI. And it will be a significant impact.

Now, this does **NOT** mean that if you work in some of these other functions, you shouldn't pay attention to generative AI. For example, if you work in the legal function and generative AI will impact 15 to 20% of the functional spend on legal, that's still a significant shift for the industry, even if the total spend on lawyers on legal services is not nearly as big as the total spend on sales or marketing or software engineering and so on. But if the McKinsey study is correct, then these are some of the functional roles across many different companies that will see a huge impact from generative AI.

Lastly, let's take a look at its estimated impact by industry sector. So McKinsey had carried out a study on the potential of AI automation with and without generative AI. And we replotted the McKinsey data to show the impact of generative AI only on automation, leaving out other forms of AI, such as supervised learning.

Some of the sectors impacted include education and workforce training, business and legal professions, STEM professionals, and so on. And one remarkable thing about this data is that there are sectors that were not highly exposed to automation before generative AI, but with the rise of generative AI are now seeing a much greater potential of automation or augmentation. And so depending on what sector or sectors you either work in or work with, perhaps this type of analysis may give you a sense of what may happen in industries that you touch as well.

If you look at the top few lines on this graph, one theme that pervades both this as well as other studies is that *it looks like a lot of the impact of generative AI will be on knowledge workers,* meaning workers who generate value primarily through their knowledge, including their expertise, their critical thinking and their interpersonal skills. This is in contrast to say workers that create value mainly from performing physical tasks rather than knowledge tasks.

This wraps up our section on generative AI and business. There are lots of opportunities for individuals, businesses and for society.

The huge impact of generative AI is also raising questions about how generative AI will affect society. And it's also made some people anxious about what the future will be like for them in the world with these amazing AI capabilities. Let's go on to the next video to examine how AI is impacting society as well as how we can mitigate risks and how we can build beneficial responsible AI. I'll see you at the next video.

## P27. Ethical and Societal Concerns

In a short time, access to generative AI has spread around the world and given many people the ability to generate high-quality essays, pictures, and audio. With these amazing capabilities have also come many concerns about AI. I think even before the rise of generative AI, we've been living in a time of many anxieties. Anxieties about the environment, about the legitimacy and competence of authority, about society's ability to treat people fairly, even about what sort of future awaits us all. AI, as a very powerful technology, has inherited a large share of this anxiety. In this video, let's take a look at some of these anxieties and concerns that relate specifically to AI.

One widely held concern about AI is whether it might amplify humanity's worst impulses. LLMs are trained on texts from the internet, which reflects some of humanity's best qualities, but also some of its worst, including some of our prejudices, hatreds, and misconceptions. LLMs learn some of these negative qualities too, so could they amplify our worst impulses?

In the first week, we had seen an example of an LLM exhibiting a gender bias with regard to whether a surgeon or a nurse is more likely to be male or female. To take another, maybe slightly simpler example, if you ask an LLM after its initial training to fill in the blank in “The ___ was a CEO”, many models will be prone to choose the word man. And of course, this is a social bias that distorts the fact that people of all genders can successfully lead companies.

Text on the internet represents our present and our past. And so perhaps it's no surprise that an LLM learning from this data reflects some of these biases from our past and our present as well. But perhaps we want LLMs to represent a hopeful future that is fairer, less biased, and more just. We may want them to go beyond merely reflecting data from our past.

Fortunately, LLMs are becoming less biased through fine-tuning, which we discussed in week two, as well as more advanced techniques such as reinforcement learning from human feedback or RLHF. In the second week, there was an optional video on RLHF. Whether or not you watched that, I'd like to briefly describe how RLHF is helping to make LLMs less biased. RLHF is a technique that trains an LLM to generate responses that are more aligned with human preferences.

The first step of RLHF is to train an answer quality model called the reward model that automatically scores answers. So in this step of RLHF, we would prompt the LLM with many queries like this, “The ___ was a CEO”, and collect different responses from the LLM.

Then we would ask humans to score these answers. So on a scale of one to five, we give a high score to highly desirable answers like man or woman, and a low score to nonsensical answers like airplane. And any answer that contains a gender bias or racial bias or contains a gender or racial slur will receive a very low score.

Using the prompt, the responses, and the scores assigned by humans as data, we would then use supervised learning to train a reward model that can input a response and score it. We do this because asking humans to score responses is expensive, but once a supervised learning algorithm has learned to automatically score responses, we can score a lot of responses automatically and inexpensively.

Finally, now that the LLM has a learned reward model to score as many responses as it wants, we can have the LLM generate a lot of responses to many different prompts and have it further train itself to generate more responses that get high scores and that therefore reflect answers that humans perceive as more desirable.

RLHF has been shown to make LLMs much less likely to exhibit bias according to gender, race, religion, and other human characteristics. It makes LLMs less prone to hand out harmful information and also makes them more respectful and helpful to people. Already today, the outputs of LLMs are much safer and less biased than, say, the average piece of text on the internet. But technology like this is continuing to improve, and so the degree of an LLM amplifying humanity's worst qualities is continuing to decrease as they are becoming better aligned to the future. I think we all hope LLMs will reflect a fairer, less biased, and more just world.

A second major concern is who among us will be able to make a living when AI can do our jobs faster and cheaper than any human can? Will AI put many of us out of a job? To understand whether this is likely to happen, let's look at radiology.

In 2016, many years ago, Geoff Hinton, who's a pioneer of deep learning and a friend of mine, said that AI was becoming so good at analyzing x-ray images that in five years, it could take radiologists' jobs. He made this remarkable statement that if you work as a radiologist, you're like a coyote that's already over the edge of the cliff but hasn't yet looked down so it doesn't realize there's no ground underneath them. He argued that people should stop training radiologists because, in his view, deep learning would clearly outperform them within five years.

But we're now well past five years since this statement, and AI is far from replacing radiologists. **NOT** a single one of my radiologist friends has lost their job to AI. Why is that? Two reasons.

First, interpreting x-rays turns out to be harder than it looked back then, though we are making rapid progress. But second and more important, it turns out that **radiologists do a lot more than just interpret x-ray images.** According to O\*NET, radiologists do about 30 different tasks, one of which is interpreting x-rays and other medical images, but they do many other tasks. And it has been difficult so far for AI to do all of these tasks at human level.

In addition to interpreting x-rays, they also operate imaging hardware, communicate exam results to patients and other stakeholders, and respond to complications during a procedure, such as if a patient has a panic attack during the imaging procedure. They document procedures and outcomes and perform many other tasks.

And I think that AI does have a high potential of augmenting or assisting the interpretation of x-rays. And technically, this has largely been done with supervised learning rather than generative AI. But for AI to completely automate all of these tasks is still far away.

So that's why I think that Curtis Langlotz, who is a professor of radiology at Stanford University and a friend and colleague says it well. He said that AI will **NOT** replace radiologists, but radiologists that use AI will replace radiologists that do **NOT**. And I think we will see this effect in many other professions.

Mind you, I don't mean to minimize the challenge of helping many people adopt AI, or the suffering of a much smaller number of people whose jobs will disappear, or our responsibility to make sure people affected have a safety net and an opportunity to learn new skills.

But every wave of technology, from the steam engine to electricity to the computer, has created far more jobs than it destroyed. As I mentioned earlier this week, in most waves of innovation, businesses wound up focusing on growth, which has unlimited potential rather than cost savings. So AI will bring a huge amount of growth and create many, many new jobs in the process.

And this brings us to what might be the biggest anxiety, will AI kill us all?

We know that AI can run amok. Self-driving cars have crashed, leading to a tragic loss of life. In 2010, an automated trading algorithm caused a stock market flash crash. And in the justice system, AI has led to unfair sentencing decisions. So we know that poorly designed software can have a dramatic impact.

But can it lead to the extinction of humanity? I don't see how.

I know there are different views on this. Recently, I sought out some people concerned by this question. And I spoke with some of the smartest people in AI that I know. Some were concerned about a bad actor using AI to destroy humanity, say by creating a bioweapon. Others were worried about AI inadvertently driving humanity to extinction, similar to how humans have driven many other species to extinction through simple lack of awareness that our actions could lead to that outcome.

I tried to assess how realistic these arguments are, but I found that they were not concrete and not specific about how AI could lead to human extinction. Most of the arguments boil down to it could happen. And some would add that this is a new type of technology, so things could be different this time.

But that statement is true for every new type of technology that's been invented by humanity. And proving that AI couldn't lead to human extinction is akin to proving a negative. I can't prove that AI superintelligence won't wipe out humanity, but it's just that nobody seems to know exactly how it could.

But I do know this. Humanity has ample experience controlling many things far more powerful than any single person, such as corporations and nation states.

There are also many things we cannot fully control that are nonetheless valuable and safe. For example, take airplanes, which today we still can't fully control because winds and turbulence will buffet airplanes around or the pilot flying the plane may make a mistake.

In the early days of aviation, airplanes killed many people. But we learned from those experiences and built safer airplanes and also devised better rules by which to operate them. And today, many people can step into an airplane without fearing for their lives.

Similarly, for AI, we are learning better to control it and it is becoming safer every day.

Finally, consider risks such as climate change leading to massive depopulation of parts of the planet, a future pandemic, or the much less likely possibility of an asteroid striking the planet as one did in the time of the dinosaurs. I think AI will be a key part of our response to such challenges.

So I know that there are different views on this right now. But *my view is that if we want humanity to survive and thrive for the next thousand years, AI increases the odds of us successfully getting there.*

Computers are already smarter in some narrow dimensions than any human. But AI continues to improve so fast that many people find it hard to predict exactly what it will be like in a few years. I think the root cause of some of these concerns, including extinction risks, is that many people are unsure when AI will reach Artificial General Intelligence, or AGI. This means AI that could do any intellectual task that a human can. Let's take a deeper look at AGI in the next video.

## P28. Artificial General Intelligence

AGI, Artificial General Intelligence, is an exciting concept. I think some of the confusion around it stems from the use of the word general. As you know, AI is a general-purpose technology, meaning that it is useful for many different things. And the rise of large language models has led to single models like ChatGPT that are useful for many things and feel like they could be general purpose. But a general-purpose technology is **NOT** the same thing as artificial general intelligence. Let's take a look at what really is the technical definition of AGI.

The most widely accepted definition of AGI is **AI that could do any intellectual task that a human can.** Some definitions actually say any task that a human or mammal can. But I'll stick with this one for now.

So for example, if we have AGI, AI would be able to learn to drive a car through about 20 hours of practice, similar to what a teenager can. This is an example raised by deep learning pioneer Yann LeCun. And today, self-driving cars still aren't quite there yet. Certainly not after as little as 20 hours of practice.

If we had AGI, AI would also be able to do the intellectual task of completing PhD-thesis-level research after five years of work or maybe even faster. And today, AI can help with some parts of brainstorming and writing and maybe be a thought partner for some elements of research. But we're clearly very far away from this still.

If we had AGI, AI would also be able to do pretty much all the tasks of a computer programmer or really any other knowledge worker whose contributions come from carrying out intellectual tasks. And clearly we're still very far away from this.

I know that there are different views about how long it would take to get to AGI. I think we're still many decades away, maybe even longer. But I hope we'll get there sometime in our lifetimes.

There are some businesses that have made much more optimistic forecasts of when we'll get there. But I found that most of those businesses have changed the definition of AGI and set a much lower bar to get there.

I showed the definition of AGI used by one of these businesses to an economist friend of mine. And he quipped, Boy if that's the definition of AGI, I think we got there 30 years ago. So it is true that by lowering the bar sufficiently, we could get there much faster. But for the most widely accepted definition of AGI, I think we're still quite a long ways away.

One of the exciting things about large language models is that we can use them as reasoning engines as I mentioned last week. And maybe we're now starting to see a rough outline of what AGI could be someday.

I don't think there are any fundamental laws of physics that prevent us from ever creating AGI, which I think will actually be very valuable to human society. But we'll still need some significant technical breakthroughs to get there.

One of the hard things about getting to AGI is that it benchmarks artificial intelligence against human intelligence. *Artificial intelligence and biological intelligence have progressed along two very different paths.* For example, AI learns from far more texts than any human can read in a lifetime. So AI is already far better than any human at certain tasks.

But to ask AI to do everything, all intellectual tasks that humans can do, that is still a very high bar. But even though we are still far from AGI, AI is very powerful and it's important that we use it responsibly. Let's take a look in the next video at Responsible AI.

## P29. Responsible AI

Responsible AI refers to developing and using AI in ways that are ethical, trustworthy and socially responsible. Lots of developers, businesses and governments care about this and have been having conversations and also been working hard to make sure that AI is built and used responsibly. Because of all this attention and effort on responsible AI, we've actually made quite a lot of progress on this in the last few years with, for example, many governments and companies publishing frameworks for responsible AI. But a lot of work still remains. Let's take a look at what responsible AI means.

While we're still figuring out a lot of details of how to build responsible AI, some common themes have emerged. I think these are key dimensions of responsible AI.

First is fairness, to ensure the AI doesn't perpetuate or amplify biases. Transparency, to make sure AI systems and their decisions are understandable to the stakeholders, to the people impacted. Privacy, protecting user data and ensuring confidentiality. Security, safeguarding AI systems from malicious attacks. And lastly, ethical use, ensuring the AI is used for beneficial purposes.

One of the challenges of these dimensions or these principles is that implementation is **NOT** always straightforward. For example, for, I think, at least a couple thousand years now, humanity has been debating what is ethical and what is not ethical. There is, unfortunately, no clear mathematical definition of ethical versus unethical behavior. Although, of course, there are many clear cut cases as well.

But that's why, for individuals, organizations, even countries, to adopt responsible AI, there are certain emerging best practices to help have the discussion and debate that will lead to better and more responsible decisions, even when sometimes the right thing to do could be ambiguous. I want to share a few tips.

First, I think it's important to **build a culture that encourages discussion and debate on ethical issues.** So if someone on your team has a concern about the use of responsible AI, it'd be great if they have the freedom to raise that issue to enable the team to maybe make a better decision.

Second tip is to brainstorm, either by yourself or with your team or with an even broader group of stakeholders, how things could go wrong. I found on many projects that this brainstorming can help identify potential problems and allow the team to mitigate them in advance. A checklist for brainstorming could be the five dimensions I described on the previous slide. Could the AI system have issues with fairness, transparency, privacy, security or ethical use?

For example, on some of the projects I've worked on, my team has brainstormed in advance if the LLM we deployed could have fairness issues, such as if it might exhibit some of the biases that you saw earlier in this course.

Finally, I encourage you to **work with a diverse team and include perspectives from all stakeholders impacted by the AI system.** For many projects, seeking a diverse set of opinions, as well as speaking with people that could be quite different than myself, has allowed my team to understand better the impact of an AI system and led us to make better decisions.

For example, building systems in healthcare, I found that talking to patients and doctors gave perspectives different than mine and really changed the direction we took our projects in. And working on retail applications, talking to some of the customers as well as the sellers, gave my team new ideas that we wouldn't have had otherwise. And I think this pattern is true for many projects.

If you work in a specific industry, such as healthcare or finance or media or tech, there may be emerging best practices for responsible AI specific to your industry that could be useful to consult as well as you embark on your project.

*I think we all want to use AI to make people better off.* There have been a few times that I've killed projects that I assessed to be financially sound on ethical grounds. As you decide what to work on and what not to work on, I hope you keep on considering responsible AI and **ONLY** work on projects that you think are ethical and that make people better off.

And now we're approaching the end of this course. Let's go to the next video to see a summary of what we've covered.

## P30. Course Summary

I'm glad you stayed with me through this course. We have covered a lot of material together, and I am sad that our time together is coming to an end. Let's review the main topics.

In the first week, we discussed how generative AI works and how to use it as a thought partner. We explored what it can and cannot do, using the analogy of a college graduate following instructions to help estimate its capabilities. We also covered common uses, including **writing, reading, and chatting**.

In the second week, we discussed how to build generative AI projects, including the project life cycle and technology options such as **prompting, retrieval-augmented generation, and fine-tuning**.

This week, we examined generative AI's implications for business and society. We introduced a framework for breaking jobs into tasks to identify opportunities for automation or augmentation. We also saw how these changes can create new workflows that deliver **NOT** just cost savings, but significant new value. Finally, we discussed societal concerns and responsible AI.

Congratulations on reaching the end. I hope you have learned a lot about generative AI and found the course useful. *I hope many people will feel empowered to use generative AI.* Please share what you have learned with others, and perhaps recommend the course to them as well.

Before we finish, there is one last idea I want to share about building a more intelligent world. Let's go to the final video.

## P31. Building a More Intelligent World

Thank you for making it to this last video and for spending all this time with me. To conclude this course, I want to share with you how I hope AI can help us build a more intelligent world.

Intelligence is the power to apply knowledge and skills to make good decisions. We invest years of our lives and trillions of dollars on education, all to develop our ability to make better decisions. It costs a lot to feed, educate, and train a wise human being. So human intelligence is expensive.

That's why today only the wealthiest people can afford to hire large amounts of intelligence by hiring people. Like a specialist doctor to examine, carefully think about, and advise you on a medical condition. Or a tutor that takes the time to really understand your child and gently coach them where they need the most help.

But unlike human intelligence, artificial intelligence can be made cheap. **AI has the potential to give every individual the ability to hire intelligence at low cost** so that you would no longer need to worry about that huge bill for visiting a doctor or getting an education. And you can hire an army of smart, well-informed staff to think things through for you.

And it has the potential to give society more intelligent guidance on how to approach some of the biggest problems such as climate change and pandemics.

**AI is the new electricity with the potential to revolutionize all industries and all corners of human life.** The fear of AI today is similar to the fear of electricity when it was new. Back then, people were terrified of electrocution or of electricity sparking devastating fires.

Today, electricity still has dangers, but I don't think any of us would give up light, heat, and refrigeration for fear of electrocution.

AI today still has flaws, and there are cases where it will cause harm, but generative AI is an exciting leap forward in how much intelligence we can bring to the world, and we're also improving the technology rapidly.

As we continue to improve the technology, and also continue to build up more use cases, AI will contribute to longer, healthier, and more fulfilling lives worldwide. As the technology improves, the problems of AI that alarm us today will recede.

And looking beyond AI, the world has many problems, such as climate change, pandemics, war, and many others, and many of these problems need urgent solutions. *To solve them, we will need all the intelligence, including all the artificial intelligence we can muster.*

So, to conclude, thank you very much for taking this course. I hope you find generative AI useful, that you use it responsibly to improve your life and the lives of people around you, and that through your use of generative AI, you keep on contributing to building a better, more intelligent world for everyone. Thank you.
