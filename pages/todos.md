---
layout: default
title: TODO List
author: 垃圾残渣
show_date: false
categories: false
subclass: TODO
post_list: date
toc: false
toc_depth: 6
home_btn: true
btn_text: true
footer: true
permalink: /todos
---

<h1>List Articles with Non-empty TODO</h1>

<table class="link_table">
    <tr>
        <td>
            <ul>
                {% if page.collections_to_show %}
                    {% for col_in_order in page.collections_to_show %}
                        {% for collection in site.collections %}
                            {% if collection.label == col_in_order %}
                                <h5 class="h_collection_label">
                                    {% if collection.alias %}
                                        {{ collection.alias }}
                                    {% else %}
                                        {{ collection.label }}
                                    {% endif %}
                                <hr>
                                </h5>

                                {% for post in collection.docs %}
                                    {% if post.publish != false %}
                                        {% assign todo_is_present = false %}

                                        {% if post.todos %}
                                            {% if post.todos != "" %}
                                                {% assign todo_is_present = true %}
                                            {% endif %}
                                        {% endif %}

                                        {% if todo_is_present %}
                                            <li>
                                                <a class="a_title" href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>

                                                {% if post.todos.first %}
                                                    <ol style="margin-left: 4ch; font-size: 0.85em; color: white;">
                                                        {% for item in post.todos %}
                                                            {% if item and item != "" %}
                                                                <li>{{ item }}</li>
                                                            {% endif %}
                                                        {% endfor %}
                                                    </ol>
                                                {% else %}
                                                    <ol style="margin-left: 4ch; font-size: 0.85em; color: white;">
                                                        <li>{{ post.todos }}</li>
                                                    </ol>
                                                {% endif %}
                                            </li>
                                        {% endif %}
                                    {% endif %}
                                {% endfor %}
                            {% endif %}
                        {% endfor %}
                    {% endfor %}

                {% else %}
                    {% if site.collection_order %}
                        {% for col_in_order in site.collection_order %}
                            {% for collection in site.collections %}
                                {% if collection.label == col_in_order %}
                                    <h5 class="h_collection_label">
                                        {% if collection.alias %}
                                            {{ collection.alias }}
                                        {% else %}
                                            {{ collection.label }}
                                        {% endif %}
                                    <hr>
                                    </h5>

                                    {% for post in collection.docs %}
                                        {% if post.publish != false %}
                                            {% assign todo_is_present = false %}

                                            {% if post.todos %}
                                                {% if post.todos != "" %}
                                                    {% assign todo_is_present = true %}
                                                {% endif %}
                                            {% endif %}

                                            {% if todo_is_present %}
                                                <li>
                                                    <a class="a_title" href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>

                                                    {% if post.todos.first %}
                                                        <ol style="margin-left: 4ch; font-size: 0.85em; color: white;">
                                                            {% for item in post.todos %}
                                                                {% if item and item != "" %}
                                                                    <li>{{ item }}</li>
                                                                {% endif %}
                                                            {% endfor %}
                                                        </ol>
                                                    {% else %}
                                                        <ol style="margin-left: 4ch; font-size: 0.85em; color: white;">
                                                            <li>{{ post.todos }}</li>
                                                        </ol>
                                                    {% endif %}
                                                </li>
                                            {% endif %}
                                        {% endif %}
                                    {% endfor %}
                                {% endif %}
                            {% endfor %}
                        {% endfor %}

                    {% else %}
                        {% for collection in site.collections %}
                            <p class="h_collection_label">
                                {% if collection.alias %}
                                    {{ collection.alias }}
                                {% else %}
                                    {{ collection.label }}
                                {% endif %}
                            <hr>
                            </p>

                            {% for post in collection.docs %}
                                {% if post.publish != false %}
                                    {% assign todo_is_present = false %}

                                    {% if post.todos %}
                                        {% if post.todos != "" %}
                                            {% assign todo_is_present = true %}
                                        {% endif %}
                                    {% endif %}

                                    {% if todo_is_present %}
                                        <li>
                                            <a class="a_title" href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>

                                            {% if post.todos.first %}
                                                <ol style="margin-left: 4ch; font-size: 0.85em; color: white;">
                                                    {% for item in post.todos %}
                                                        {% if item and item != "" %}
                                                            <li>{{ item }}</li>
                                                        {% endif %}
                                                    {% endfor %}
                                                </ol>
                                            {% else %}
                                                <ol style="margin-left: 4ch; font-size: 0.85em; color: white;">
                                                    <li>{{ post.todos }}</li>
                                                </ol>
                                            {% endif %}
                                        </li>
                                    {% endif %}
                                {% endif %}
                            {% endfor %}
                            <br/>
                        {% endfor %}
                    {% endif %}
                {% endif %}
            </ul>
        </td>
    </tr>
</table>