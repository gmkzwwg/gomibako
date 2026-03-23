---
category: Notes
title: Outdated Java Notes
tags: Java
---

<!-- TOC -->

- [Other Notes](#other-notes)
  - [@Override](#override)
  - [Interface](#interface)
  - [java 泛型详解](#java-泛型详解)
  - [迭代器（Iterator）](#迭代器iterator)
  - [Class对象的获取](#class对象的获取)
  - [GetInstance()](#getinstance)
  - [Reflection](#reflection)
  - [enum](#enum)
  - [transient and serialization](#transient-and-serialization)
  - [Making .jar files](#making-jar-files)

<!-- /TOC -->

## Other Notes

### @Override

"@Override" in java is used before the override of method,so that Eclipse can check the written error in that method.
```java
Example:
  parent class ToString()
SITUATION1:
  @Override
  public String tostring(){...} // error occured and IDE tells you.
SITUATION2:
  public String tostring(){...} // error occured but no message about it
```
widget:窗口小部件，控件

preferences：n.参数选择；较喜欢的东西( preference的名词复数 )；优待；偏爱的事物；最喜爱的东西

layout：n.布局，安排，设计；布置图，规划图

### Interface

Java中在接口的应用中，要注意一下几点：

<1>接口一般定义的是常量和一些抽象方法。抽象类中可以包含抽象方法，也可以有非抽象方法，但是有抽象方法的类一定是抽象类。抽象方法不能有方法体。

<2>在引用接口时，接口的引用指向实现的对象，尽量定义为接口或父类的引用。这其中有可能用到多态的知识。引用接口用implements。

<3>接口（interface）只能定义抽象方法而且默认为是Public。常量是public static final 修饰的

<4>通过implements来引用接口。例：Class runnrtmp inplements runner.

<5>多个无关类可以实现一个接口，!!!!接口的引用指向实现的对象。

<6>一个类可以实现多个无关的接口（这点和继承要有所区别）

<7>和继承一样，接口与实现类之间存在多态性。

<8>接口可以继承其他的接口，并添加新的属性和抽象方法。

<9>在类中实现接口的方法时必须加上public修饰符

### java 泛型详解

```Java
普通泛型
Java代码 
    1. class Point<T>{       // 此处可以随便写标识符号，T是type的简称  
    2.     private T var ; // var的类型由T指定，即：由外部指定  
    3.     public T getVar(){  // 返回值的类型由外部决定  
    4.         return var ;  
    5.     }  
    6.     public void setVar(T var){  // 设置的类型也由外部决定  
    7.         this.var = var ;  
    8.     }  
    9. };  
    10. public class GenericsDemo06{  
    11.     public static void main(String args[]){  
    12.         Point<String> p = new Point<String>() ; // 里面的var类型为String类型  
    13.         p.setVar("it") ;        // 设置字符串  
    14.         System.out.println(p.getVar().length()) ;   // 取得字符串的长度  
    15.     }  
    16. };  
    17. ----------------------------------------------------------  
    18. class Notepad<K,V>{       // 此处指定了两个泛型类型  
    19.     private K key ;     // 此变量的类型由外部决定  
    20.     private V value ;   // 此变量的类型由外部决定  
    21.     public K getKey(){  
    22.         return this.key ;  
    23.     }  
    24.     public V getValue(){  
    25.         return this.value ;  
    26.     }  
    27.     public void setKey(K key){  
    28.         this.key = key ;  
    29.     }  
    30.     public void setValue(V value){  
    31.         this.value = value ;  
    32.     }  
    33. };  
    34. public class GenericsDemo09{  
    35.     public static void main(String args[]){  
    36.         Notepad<String,Integer> t = null ;        // 定义两个泛型类型的对象  
    37.         t = new Notepad<String,Integer>() ;       // 里面的key为String，value为Integer  
    38.         t.setKey("汤姆") ;        // 设置第一个内容  
    39.         t.setValue(20) ;            // 设置第二个内容  
    40.         System.out.print("姓名；" + t.getKey()) ;      // 取得信息  
    41.         System.out.print("，年龄；" + t.getValue()) ;       // 取得信息  
    42.   
    43.     }  
    44. };  
 通配符
Java代码 
    1. class Info<T>{  
    2.     private T var ;     // 定义泛型变量  
    3.     public void setVar(T var){  
    4.         this.var = var ;  
    5.     }  
    6.     public T getVar(){  
    7.         return this.var ;  
    8.     }  
    9.     public String toString(){   // 直接打印  
    10.         return this.var.toString() ;  
    11.     }  
    12. };  
    13. public class GenericsDemo14{  
    14.     public static void main(String args[]){  
    15.         Info<String> i = new Info<String>() ;       // 使用String为泛型类型  
    16.         i.setVar("it") ;                            // 设置内容  
    17.         fun(i) ;  
    18.     }  
    19.     public static void fun(Info<?> temp){     // 可以接收任意的泛型对象  
    20.         System.out.println("内容：" + temp) ;  
    21.     }  
    22. };  
 受限泛型
Java代码 
    1. class Info<T>{  
    2.     private T var ;     // 定义泛型变量  
    3.     public void setVar(T var){  
    4.         this.var = var ;  
    5.     }  
    6.     public T getVar(){  
    7.         return this.var ;  
    8.     }  
    9.     public String toString(){   // 直接打印  
    10.         return this.var.toString() ;  
    11.     }  
    12. };  
    13. public class GenericsDemo17{  
    14.     public static void main(String args[]){  
    15.         Info<Integer> i1 = new Info<Integer>() ;        // 声明Integer的泛型对象  
    16.         Info<Float> i2 = new Info<Float>() ;            // 声明Float的泛型对象  
    17.         i1.setVar(30) ;                                 // 设置整数，自动装箱  
    18.         i2.setVar(30.1f) ;                              // 设置小数，自动装箱  
    19.         fun(i1) ;  
    20.         fun(i2) ;  
    21.     }  
    22.     public static void fun(Info<? extends Number> temp){  // 只能接收Number及其Number的子类  
    23.         System.out.print(temp + "、") ;  
    24.     }  
    25. };  
    26. ----------------------------------------------------------  
    27. class Info<T>{  
    28.     private T var ;     // 定义泛型变量  
    29.     public void setVar(T var){  
    30.         this.var = var ;  
    31.     }  
    32.     public T getVar(){  
    33.         return this.var ;  
    34.     }  
    35.     public String toString(){   // 直接打印  
    36.         return this.var.toString() ;  
    37.     }  
    38. };  
    39. public class GenericsDemo21{  
    40.     public static void main(String args[]){  
    41.         Info<String> i1 = new Info<String>() ;      // 声明String的泛型对象  
    42.         Info<Object> i2 = new Info<Object>() ;      // 声明Object的泛型对象  
    43.         i1.setVar("hello") ;  
    44.         i2.setVar(new Object()) ;  
    45.         fun(i1) ;  
    46.         fun(i2) ;  
    47.     }  
    48.     public static void fun(Info<? super String> temp){    // 只能接收String或Object类型的泛型  
    49.         System.out.print(temp + "、") ;  
    50.     }  
    51. };  
 泛型无法向上转型
Java代码 
    1. class Info<T>{  
    2.     private T var ;     // 定义泛型变量  
    3.     public void setVar(T var){  
    4.         this.var = var ;  
    5.     }  
    6.     public T getVar(){  
    7.         return this.var ;  
    8.     }  
    9.     public String toString(){   // 直接打印  
    10.         return this.var.toString() ;  
    11.     }  
    12. };  
    13. public class GenericsDemo23{  
    14.     public static void main(String args[]){  
    15.         Info<String> i1 = new Info<String>() ;      // 泛型类型为String  
    16.         Info<Object> i2 = null ;  
    17.         i2 = i1 ;                               //这句会出错 incompatible types  
    18.     }  
    19. };  
 泛型接口
Java代码 
    1. interface Info<T>{        // 在接口上定义泛型  
    2.     public T getVar() ; // 定义抽象方法，抽象方法的返回值就是泛型类型  
    3. }  
    4. class InfoImpl<T> implements Info<T>{   // 定义泛型接口的子类  
    5.     private T var ;             // 定义属性  
    6.     public InfoImpl(T var){     // 通过构造方法设置属性内容  
    7.         this.setVar(var) ;    
    8.     }  
    9.     public void setVar(T var){  
    10.         this.var = var ;  
    11.     }  
    12.     public T getVar(){  
    13.         return this.var ;  
    14.     }  
    15. };  
    16. public class GenericsDemo24{  
    17.     public static void main(String arsg[]){  
    18.         Info<String> i = null;        // 声明接口对象  
    19.         i = new InfoImpl<String>("汤姆") ;  // 通过子类实例化对象  
    20.         System.out.println("内容：" + i.getVar()) ;  
    21.     }  
    22. };  
    23. ----------------------------------------------------------  
    24. interface Info<T>{        // 在接口上定义泛型  
    25.     public T getVar() ; // 定义抽象方法，抽象方法的返回值就是泛型类型  
    26. }  
    27. class InfoImpl implements Info<String>{   // 定义泛型接口的子类  
    28.     private String var ;                // 定义属性  
    29.     public InfoImpl(String var){        // 通过构造方法设置属性内容  
    30.         this.setVar(var) ;    
    31.     }  
    32.     public void setVar(String var){  
    33.         this.var = var ;  
    34.     }  
    35.     public String getVar(){  
    36.         return this.var ;  
    37.     }  
    38. };  
    39. public class GenericsDemo25{  
    40.     public static void main(String arsg[]){  
    41.         Info i = null;      // 声明接口对象  
    42.         i = new InfoImpl("汤姆") ;    // 通过子类实例化对象  
    43.         System.out.println("内容：" + i.getVar()) ;  
    44.     }  
    45. };  
 泛型方法
Java代码 
    1. class Demo{  
    2.     public <T> T fun(T t){            // 可以接收任意类型的数据  
    3.         return t ;                  // 直接把参数返回  
    4.     }  
    5. };  
    6. public class GenericsDemo26{  
    7.     public static void main(String args[]){  
    8.         Demo d = new Demo() ;   // 实例化Demo对象  
    9.         String str = d.fun("汤姆") ; //   传递字符串  
    10.         int i = d.fun(30) ;     // 传递数字，自动装箱  
    11.         System.out.println(str) ;   // 输出内容  
    12.         System.out.println(i) ;     // 输出内容  
    13.     }  
    14. };  
 通过泛型方法返回泛型类型实例
Java代码 
    1. class Info<T extends Number>{ // 指定上限，只能是数字类型  
    2.     private T var ;     // 此类型由外部决定  
    3.     public T getVar(){  
    4.         return this.var ;     
    5.     }  
    6.     public void setVar(T var){  
    7.         this.var = var ;  
    8.     }  
    9.     public String toString(){       // 覆写Object类中的toString()方法  
    10.         return this.var.toString() ;      
    11.     }  
    12. };  
    13. public class GenericsDemo27{  
    14.     public static void main(String args[]){  
    15.         Info<Integer> i = fun(30) ;  
    16.         System.out.println(i.getVar()) ;  
    17.     }  
    18.     public static <T extends Number> Info<T> fun(T param){//方法中传入或返回的泛型类型由调用方法时所设置的参数类型决定  
    19.         Info<T> temp = new Info<T>() ;      // 根据传入的数据类型实例化Info  
    20.         temp.setVar(param) ;        // 将传递的内容设置到Info对象的var属性之中  
    21.         return temp ;   // 返回实例化对象  
    22.     }  
    23. };  
 使用泛型统一传入的参数类型
Java代码 
    1. class Info<T>{    // 指定上限，只能是数字类型  
    2.     private T var ;     // 此类型由外部决定  
    3.     public T getVar(){  
    4.         return this.var ;     
    5.     }  
    6.     public void setVar(T var){  
    7.         this.var = var ;  
    8.     }  
    9.     public String toString(){       // 覆写Object类中的toString()方法  
    10.         return this.var.toString() ;      
    11.     }  
    12. };  
    13. public class GenericsDemo28{  
    14.     public static void main(String args[]){  
    15.         Info<String> i1 = new Info<String>() ;  
    16.         Info<String> i2 = new Info<String>() ;  
    17.         i1.setVar("HELLO") ;        // 设置内容  
    18.         i2.setVar("汤姆") ;       // 设置内容  
    19.         add(i1,i2) ;  
    20.     }  
    21.     public static <T> void add(Info<T> i1,Info<T> i2){  
    22.         System.out.println(i1.getVar() + " " + i2.getVar()) ;  
    23.     }  
    24. };  
 泛型数组
Java代码 
    1. public class GenericsDemo30{  
    2.     public static void main(String args[]){  
    3.         Integer i[] = fun1(1,2,3,4,5,6) ;   // 返回泛型数组  
    4.         fun2(i) ;  
    5.     }  
    6.     public static <T> T[] fun1(T...arg){  // 接收可变参数  
    7.         return arg ;            // 返回泛型数组  
    8.     }  
    9.     public static <T> void fun2(T param[]){   // 输出  
    10.         System.out.print("接收泛型数组：") ;  
    11.         for(T t:param){  
    12.             System.out.print(t + "、") ;  
    13.         }  
    14.     }  
    15. };  
 泛型的嵌套设置
Java代码 
    1. class Info<T,V>{      // 接收两个泛型类型  
    2.     private T var ;  
    3.     private V value ;  
    4.     public Info(T var,V value){  
    5.         this.setVar(var) ;  
    6.         this.setValue(value) ;  
    7.     }  
    8.     public void setVar(T var){  
    9.         this.var = var ;  
    10.     }  
    11.     public void setValue(V value){  
    12.         this.value = value ;  
    13.     }  
    14.     public T getVar(){  
    15.         return this.var ;  
    16.     }  
    17.     public V getValue(){  
    18.         return this.value ;  
    19.     }  
    20. };  
    21. class Demo<S>{  
    22.     private S info ;  
    23.     public Demo(S info){  
    24.         this.setInfo(info) ;  
    25.     }  
    26.     public void setInfo(S info){  
    27.         this.info = info ;  
    28.     }  
    29.     public S getInfo(){  
    30.         return this.info ;  
    31.     }  
    32. };  
    33. public class GenericsDemo31{  
    34.     public static void main(String args[]){  
    35.         Demo<Info<String,Integer>> d = null ;       // 将Info作为Demo的泛型类型  
    36.         Info<String,Integer> i = null ;   // Info指定两个泛型类型  
    37.         i = new Info<String,Integer>("汤姆",30) ;    // 实例化Info对象  
    38.         d = new Demo<Info<String,Integer>>(i) ; // 在Demo类中设置Info类的对象  
    39.         System.out.println("内容一：" + d.getInfo().getVar()) ;  
    40.         System.out.println("内容二：" + d.getInfo().getValue()) ;  
    41.     }  
    42. };  
 
 泛型方法不一定要通过参数来确定泛型准确类型，可以只通过返回值，比如：
 public static <E> ArrayList<E> newArrayList() {
    return new ArrayList<E>();
  }
 
    public List<PrepaidHistory> queryHistories(Long skyid,PrepaidHistoryType type, Date from, Date end) {
　　　　。。。
             return Lists.newArrayList();
    }
 
这样Lists.newArrayList();
智能的知道返回类型为PrepaidHistory




Jdk5.0新特性Generic Types （泛型）
原文 来源: 中国IT实验室 作者: 未知 责编: 宝良 
1. 介绍

2.定义简单Java泛型

  其实Java的泛型就是创建一个用类型作为参数的类。就象我们写类的方法一样，方法是这样的method(String str1,String str2 ),方法中参数str1、str2的值是可变的。而泛型也是一样的，这样写class Java_Generics<K,V>，这里边的K和V就象方法中的参数str1和str2,也是可变。下面看看例子： 

import java.util.Hashtable; 
class TestGen0<K,V>{ 
  public Hashtable<K,V> h=new Hashtable<K,V>(); 
  public void put(K k, V v) { 
   h.put(k,v); 
  } 
  public V get(K k) { 
   return h.get(k); 
  } 
  public static void main(String args[]){ 
   TestGen0<String,String> t=new TestGen0<String,String>(); 
   t.put("key", "value"); 
   String s=t.get("key"); 
   System.out.println(s); 
  } 
} 

正确输出:value 

  这只是个例子，不过看看是不是创建一个用类型作为参数的类，参数是K，V，传入的“值”是String类型。这个类他没有特定的待处理型别，以前我们定义好了一个类，在输入参数有所固定，是什么型别的有要求，但是现在编写程序，完全可以不制定参数的类型，具体用的时候来确定，增加了程序的通用性，像是一个模板。

3. 泛型通配符
首先，下面是一个例子，作用是打印出一个集合中的所有元素，我们首先用老版本jdk1.4的编码规则，代码如下： 

void printColleciton(Collection c){ 
iterator i = c.iterator(); 
for (k = 0; k < c.size();k++){ 
System.out.pritnln(i.next(); 
} 

然后，我们用jdk5.0泛型来重写上面这段代码（循环的语法是新版本的语法）： 
void printCollection(Colleciton<Object> c){ 
for(Object e : c){ 
System.out.print(e); 
} 
} 
      这个新版本并不比老版本的好多少，老版本可以用任意一种集合类型作为参数来调用，而新版本仅仅持有Collection<Object>类型，Colleciton<Object>并不是任意类型的Collection的超类。 
   那么什么是所有Colleciton类型的超类型呢？它是Collection<?>这样一个类型，读作“未知Colleciton”。它的意思是说Colleciton的元素类型可以匹配任意类型，我们把它称作通配符类型，我们这样写： 
    void printCollection(Colleciton<?> c){ 
       for (Object e: c){ 
          System.out.println(e); 
        } 
     } 

   现在我们用任意类型的集合来调用它了，需要注意的是内部方法printColleciton(),我们任可以从c中来读出元素，并且这些元素是Object类型，而且是安全的，因为无论集合中是什么类型，它总包括Object，但是将任意对象加到集合中是不安全的： 
     Colleciton<?> c = new ArrayList<String>(); 
     c.add(new Object());//编译时错误 
   由于我们不知道c持有的是什么类型的元素，我们不能加object到集合中去。add()方法用类型E作为参数，（集合的元素类型）当真正的参数类型是？的时候，它代表的是一些未知类型。任何传递给add()方法的参数必须是这个未知类型的子类型。由于我们不知道未知类型，所以我们传递给它任何东西。主要的例外是null,它是每一个类型的成员。 

   另一方面，假定给一个List<?>，我们调用get()并且充分利用结果。结果类型是未知类型。但是我总是知道它是一个Object，因此分配一个从get()取出来的结果到一个object的变量是安全的，或者作为一个参数传递到一个需要object类型的地方。
3.1有限制的通配符 
考虑一个画图的应用程序，这个程序能够画长方形、圆等类型，为了在程序中表示这样的图形，你可以定义一个类型的层次结构： 
public abstract class Shape{ 
         public abstract void draw(Canvas c); 
 } 
public class Circle extends Shape{ 
         private int x,y,radius; 
        public void draw(Canvas c){} 
} 
public class Rectangle extends Shape{ 
         private int x,y,width,height; 
         public void draw(Canvas c){ 
} 

} 

//这些类能被画在画布上： 
public class Canvas{ 

       public void draw(Shape s){ 
                s.draw(this); 
       } 
} 

任何画图的动作的都包含一些图形，假设他们被表示在一个list中，在Canvas中它将会有一个很方便的方法来画他们： 

   public void drawAll(List<Shape> shapes){ 

             for(Shape s :shapes){ 

               s.draw(this); 
              } 
   } 

    现在类型规则说，方法drawAll()只能在真正的Shape类型的List上被调用，而它的子类无法调用，例如List<Circle>上被调用。这是很不幸的。由于所有的方法确实从List中读出Shape，所以它仅能在List<Object>上被调用，下面我们改后的代码可以在任意类型的Shape上被调用： 

public void drawAll(List< ? extends Shape>{ } 

这里有一个很小的不同是，我们已经用List<? extends Shape>替换了List<Object>，现在drawAll()方法可以接受任意的Shape的子类了，我们当然可以在List<Circle>上调用。   

   <? extends Class>是一种限制通配符类型，它可以接受所有<Class>以及Class的子类型。然而调用代价是，只读访问，无法向shapes中添加元素。像通常一样，使用通配符带来的灵活性将付出代价，例如，下面是不允许的： 

   public void addRectangle(List<? extends Shape> shapes){ 
     shapes.add(0,new Rectangle());//编译时错误 
   } 

    限制性通配符的一个例子是，是一个人口普查的例子，我们假设数据是由一个名字映射一个人，名字是字符串，人（可以是Person,或是它的子类Driver）,Map<k,v>是一个泛型的例子，它拥有两个参数，表示为一个KEY和value的映射MAP 

   再次注意正规参数的命名规则，K代表key,V代表value 
     public class Census{ 
        public static void addRegistry(Map<String ? extends Person> Registry){ } 
     } 
    Map<String,Driver>  allDrivers =; 
    census.addResigtry(allDrivers); 

编写泛型类要注意： 
   1) 在定义一个泛型类的时候，在 “<>”之间定义形式类型参数，例如：“class TestGen<K,V>”，其中“K” , “V”不代表值，而是表示类型。 
   2) 实例化泛型对象的时候，一定要在类名后面指定类型参数的值（类型），一共要有两次书写。例如：
TestGen<String,String> t=new TestGen<String,String>()； 
   3) 泛型中<K extends Object>,extends并不代表继承，它是类型范围限制。 

4.泛型与数据类型转换
4.1. 消除类型转换
  上面的例子大家看到什么了，数据类型转换的代码不见了。在以前我们经常要书写以下代码，如： 

import Java.util.Hashtable; 
class Test { 
  public static void main(String[] args) { 
   Hashtable h = new Hashtable(); 
   h.put("key", "value"); 
   String s = (String)h.get("key"); 
   System.out.println(s); 
  } 
} 
  这个我们做了类型转换，是不是感觉很烦的，并且强制类型转换会带来潜在的危险，系统可能会抛一个ClassCastException异常信息。在JDK5.0中我们完全可以这么做，如： 

import Java.util.Hashtable; 
class Test { 
  public static void main(String[] args) { 
   Hashtable<String,Integer> h = new Hashtable<String,Integer> (); 
   h.put("key", new Integer(123)); 
   int s = h.get("key").intValue(); 
   System.out.println(s); 
  } 
} 

  这里我们使用泛化版本的HashMap,这样就不用我们来编写类型转换的代码了，类型转换的过程交给编译器来处理，是不是很方便，而且很安全。上面是String映射到String，也可以将Integer映射为String，只要写成HashTable<Integer,String> h=new HashTable<Integer,String>();h.get(new Integer(0))返回value。果然很方便。 

4.2 自动解包装与自动包装的功能
  从上面有没有看到有点别扭啊，h.get(new Integer(123))这里的new Integer(123);好烦的，在JDK5.0之前我们只能忍着了，现在这种问题已经解决了，请看下面这个方法。我们传入一个int这一基本型别，然后再将i的值直接添加到List中，其实List是不能储存基本型别的，List中应该存储对象，这里编译器将int包装成Integer，然后添加到List中去。接着我们用List.get(0);来检索数据，并返回对象再将对象解包装成int。恩，JDK5.0给我们带来更多方便与安全。 

public void autoBoxingUnboxing(int i) { 
  ArrayList<Integer> L= new ArrayList<Integer>(); 
  L.add(i); 
  int a = L.get(0); 
  System.out.println("The value of i is " + a); 
} 

4.3 限制泛型中类型参数的范围
  也许你已经发现在TestGen<K,V>这个泛型类,其中K,V可以是任意的型别。也许你有时候呢想限定一下K和V当然范围，怎么做呢？看看如下的代码： 

class TestGen2<K extents String,V extends Number> 
{ 
  private V v=null; 
  private K k=null; 
  public void setV(V v){ 
   this.v=v; 
  } 
  public V getV(){ 
   return this.v; 
  } 
  public void setK(K k){ 
   this.k=k; 
  } 
  public V getK(){ 
   return this.k; 
  } 
  public static void main(String[] args) 
  { 
   TestGen2<String,Integer> t2=new TestGen2<String,Integer>(); 
   t2.setK(new String("String")); 
   t2.setV(new Integer(123)); 
   System.out.println(t2.getK()); 
   System.out.println(t2.getV()); 
  } 
} 

  上边K的范围是<=String ，V的范围是<=Number，注意是“<=”,对于K可以是String的，V当然也可以是Number，也可以是Integer,Float,Double,Byte等。看看下图也许能直观些请看上图A是上图类中的基类，A1，A2分别是A的子类，A2有2个子类分别是A2_1，A2_2。 

  然后我们定义一个受限的泛型类class MyGen<E extends A2>,这个泛型的范围就是上图中兰色部分。 

  这个是单一的限制，你也可以对型别多重限制，如下： 

class C<T extends Comparable<? super T> & Serializable>
  我们来分析以下这句，T extends Comparable这个是对上限的限制，Comparable< super T>这个是下限的限制，Serializable是第2个上限。一个指定的类型参数可以具有一个或多个上限。具有多重限制的类型参数可以用于访问它的每个限制的方法和域。 

5.泛型方法 

考虑写一个持有数组类型对象和一个集合对象的方法，把数组里的所有对象都放到集合里。第一个程序为： 
  static void fromArrayToColleciton(Object[]a,Collection<?> c){ 
     for (Object o : a){ 
        c.add(o);//编译时错误 
        } 
   } 

到现在为止，你可能学会避免开始的错误而去使用Collection<Object>作为集合参数的类型，你可能会意识到使用Colleciton<?>将不会工作。 

解决这个问题的方法是使用泛型方法，GENERIC METHODS，就像类型声明、方法声明一样，就是被一个或更多的类型参数参数化。 

   static <T> void fromArrayToCollection(T[]a,Collection<T> c){ 

        for(T o :a){ 

             c.add(o);//正确 

            } 

   } 

    我们可以用任意类型的集合调用这个方法，他的元素类型是数组元素类型的超类型。 

   Object[] oa = new Object[100]; 

   Collection <Object> co = new ArrayList<Object>(); 

   fromArrayToCollection(oa,co);//T 被认为是Object类型 

   String[] sa = new String[100]; 

   Colleciton<String> cs = new ArrayList<String>(); 

   fromArrayToCollection(sa,cs);//T被认为是String类型 

   fromArrayToCollection(sa,co);//T 被认为是Object类型 

   Integer[] is = new Integer[100]; 

   Float[] fa = new Float[100]; 

   Number[] na = new Number[100]; 

   Collection<Number> cn = new ArrayList<Number>();  

   fromArrayToCollection(is,cn);//Number 

   fromArrayToCollection(fa,cn);//Number 

   fromArrayToCollection(na,cn);//Number 

   fromArrayToCollection(na,co);//Object 

   fromArrayToCollection(na,cs);//编译时错误 

我们不必给一个泛型方法传递一个真正的类型参数,编译器会推断类型参数.一个问题出现了,什么时候使用泛型方法,什么时候使通配符类型,为了回答这些问题,我们从Colleciton库中看一下几个方法： 

interface Collection<E>{ 

           public boolean containsAll(Collection<?> c); 

           public boolean addAll(Collection<? extends E> c); 

    } 

    使用泛型方法的形式为： 

    interface Collection<E>{ 

           public <T> boolean containsAll(Collection<T> c); 

           public <T extends E> boolean addAll(Collection<T> c); 

    }  

   无论如何，在ContainAll和addAll中，类型参数T仅被使用一次。返回类型不依赖于类型参数，也不依赖方法中的任何参数。这告诉我类型参数正被用于多态，它的影响仅仅是允许不同的实参在不同的调用点被使用。 

   泛型方法允许类型参数被用于表达在一个或更多参数之间或者方法中的参数、返回类型的依赖。如果没有如此依赖，泛型方法就不能被使用。可能一前一后来联合使用泛型和通配符，这里有个例子： 

    class Collections{ 

      public static <T> void copy(List<T> dest,List<? extends T> src){ 

    } 

 } 

    注意两个参数之间的依赖，任何从原list的对象复制，必须分配一个目标LIST元素的类型T,于是Src的元素类型可能是任何T的子类型。我们不必在意在COPY的表达中，表示依赖使用一个类型参数，但是是使用一个通配符。 

    下面我们不使用通配符来重写上面的方法： 

     class Collections{ 

      public static <T，S extends T> 

      void copy(List<T> dest,List<S> src){ 

    } 

 }  

    这非常好，但是第一个类型参数既在dst中使用，也在第二个类型参数中使用，S本身就被使用了一次。在类型src中,没有什么类型依赖它。这是一个标志我们可以用通配符来替换它。使用通配符比显示的声明类型参数更加清楚和精确。所以有可能推荐使用通配符。 

   通配符也有优势，可以在方法之外来使用，作为字段类型、局部变量和数组。 

这里有一个例子。 

   返回到我们画图的例子，假设我们要保持一个画图请求的历史，我们可以在Shape类内部用一个静态变量来保持历史。用drawAll()存储它到来的参数到历史字段。 

   static List<List<? extends Shape>> history = 

   new ArrayList<List<? extends Shape>>(); 

   public void drawAll(List<? extends Shape> shapes){ 

    history.addLast(shapes); 

    for (Shape s : shapes){ 

           s.draw(this); 

         } 

   }
```

### 迭代器（Iterator）
```java
　　迭代器是一种设计模式，它是一个对象，它可以遍历并选择序列中的对象，而开发人员不需要了解该序列的底层结构。迭代器通常被称为“轻量级”对象，因为创建它的代价小。
　　Java中的Iterator功能比较简单，并且只能单向移动：
　　(1) 使用方法iterator()要求容器返回一个Iterator。第一次调用Iterator的next()方法时，它返回序列的第一个元素。注意：iterator()方法是java.lang.Iterable接口,被Collection继承。
　　(2) 使用next()获得序列中的下一个元素。
　　(3) 使用hasNext()检查序列中是否还有元素。
　　(4) 使用remove()将迭代器新返回的元素删除。
　　Iterator是Java迭代器最简单的实现，为List设计的ListIterator具有更多的功能，它可以从两个方向遍历List，也可以从List中插入和删除元素。
迭代器应用：
 list l = new ArrayList();
 l.add("aa");
 l.add("bb");
 l.add("cc");
 for (Iterator iter = l.iterator(); iter.hasNext();) {
  String str = (String)iter.next();
  System.out.println(str);
 }
 /*迭代器用于while循环
 Iterator iter = l.iterator();
 while(iter.hasNext()){
  String str = (String) iter.next();
  System.out.println(str);
 }
 */
```
###  Class对象的获取
1. 所有的引用数据类型（类-类型）的类名、基本数据类型都可以通过.class方式获取其 Class对象（对于基本数据类型的封装类还可以通过.TYPE 的方式获取其 Class 对象，但要注意。TYPE 实际上获取的封装类对应的基本类型的 Class 对象的引用，那么你可以判断出int.class==Integer.TYPE 返回 true，int.class==Integer.class 返回 false！），通过这种方式不会初始化静态域，使用.class、.TYPE 的方式获取 Class对象叫做类的字面常量；
2. Class 的 forName(String  name)传入一个类的完整类路径也可以获得 Class 对象，但由于使用的是字符串，必须强制转换才可以获取泛型的Class<T>的 Class对象，并且你必须获取这个方法可能抛出的ClassNotFoundException异常。这种方法可以初始化静态域。
3. 还可通过类的对象实例下的getClass()方法来获取Class对象，即 实例名.getClass()

### GetInstance() 
```java
在java中，可以使用这种方式使用单例模式创建类的实例。
2 GetInstance()的用法 
　　在写程序库代码时，有时有一个类需要被所有的其它类使用，但又要求这个类只能实例化一次，是个服务类，定义一次，其它类使用同一个这个类的实例。
　　例如：
　　class A
　　{
　　public:
　　A(void);
　　…..
　　}
　　如果在每一个需要A的类中都声明一个A类的对象，那么会导致有N个类，每A类的定义都不一样，但是这个A类是服务类，只能定义一次，定义多个N类会导致不同的内存地址。
　　解决这个矛盾的方法：
　　1. 定义一个A的全局类对象，其它类共同使用这个实例化对象，这样保证A只实例化一次，使用extern A a声明一次，在源文件中定义A a即可；
　　但这种方式有一个问题，就是工程之间的访问，例如pro1中有A类，pro2需要使用A类，这样就不能完全保证A类只实例化一次，可能会出现pro1和pro2各实例化一次。
　　2. 定义静态的实例化类(Singleton),如下：
　　class A
　　{
　　public:
　　A(void);
　　static A* GetInstance()
　　{
　　static A* a = NULL;
　　if(!a)
　　{
　　a = new A;
　　};
　　return a;
　　}
　　……
　　}
　　这样只要包含这个头文件，
　　A::GetInstance()->…..
　　这样就保证只实例化一次。
3 GetInstance与new 
　　对象的实例化方法，也是比较多的，最常用的方法是直接使用new，而这是最普通的，如果要考虑到其它的需要，如单实例模式，层次间调用等等。直接使用new就不可以实现好的设计好，这时候需要使用间接使用new，即很多人使用的GetInstance方法。这是一个设计方式的代表，而不仅仅指代一个方法名。
3.1 1. new的使用:
　　如Object _object = new Object()，这时候，就必须要知道有第二个Object的存在，而第二个Object也常常是在当前的应用程序域中的，可以被直接调用的
3.2 2. GetInstance的使用:
　　在主函数开始时调用，返回一个实例化对象，此对象是static的，在内存中保留着它的引用，即内存中有一块区域专门用来存放静态方法和变量，可以直接使用，调用多次返回同一个对象。
3.3 3.两者区别对照:
　　大部分类(非抽象类/接口/屏蔽了constructor的类)都可以用new，new就是通过生产一个新的实例对象，或者在栈上声明一个对象 ，每部分的调用用的都是一个新的对象。
　　getInstance是少部分类才有的一个方法，各自的实现也不同。getInstance在单例模式(保证一个类仅有一个实例，并提供一个访问它的全局访问点)的类中常见，用来生成唯一的实例，getInstance往往是static的。
　　(1) 对象使用之前通过getinstance得到而不需要自己定义，用完之后不需要delete；
　　(2)new 一定要生成一个新对象，分配内存；getInstance() 则不一定要再次创建，它可以把一个已存在的引用给你使用，这在效能上优于new；
　　(3) new创建后只能当次使用，而getInstance()可以跨栈区域使用，或者远程跨区域使用。所以getInstance()通常是创建static静态实例方法的。 
```

### Reflection

```java

Java反射机制深入研究
 
Java 反射是Java语言的一个很重要的特征，它使得Java具体了“动态性”。
 
在Java运行时环境中，对于任意一个类，能否知道这个类有哪些属性和方法？对于任意一个对象，能否调用它的任意一个方法？答案是肯定的。这种动态获取类的信息以及动态调用对象的方法的功能来自于Java 语言的反射（Reflection）机制。
 
Java 反射机制主要提供了以下功能：
在运行时判断任意一个对象所属的类。
在运行时构造任意一个类的对象。
在运行时判断任意一个类所具有的成员变量和方法。
在运行时调用任意一个对象的方法。
 
Reflection 是Java被视为动态（或准动态）语言的一个关键性质。这个机制允许程序在运行时透过Reflection APIs取得任何一个已知名称的class的内部信息，包括其modifiers（诸如public, static 等等）、superclass（例如Object）、实现之interfaces（例如Serializable），也包括fields和methods的所有信息，并可于运行时改变fields内容或调用methods。
 
一般而言，开发者社群说到动态语言，大致认同的一个定义是：“程序运行时，允许改变程序结构或变量类型，这种语言称为动态语言”。从这个观点看，Perl，Python，Ruby是动态语言，C++，Java，C#不是动态语言。
 
尽管在这样的定义与分类下Java不是动态语言，它却有着一个非常突出的动态相关机制：Reflection。这个字的意思是“反射、映象、倒影”，用在Java身上指的是我们可以于运行时加载、探知、使用编译期间完全未知的classes。换句话说，Java程序可以加载一个运行时才得知名称的class，获悉其完整构造（但不包括methods定义），并生成其对象实体、或对其fields设值、或唤起其methods。这种“看透class”的能力（the ability of the program to examine itself）被称为introspection（内省、内观、反省）。Reflection和introspection是常被并提的两个术语。
 
在JDK中，主要由以下类来实现Java反射机制，这些类都位于java.lang.reflect包中：
Class类：代表一个类。
Field 类：代表类的成员变量（成员变量也称为类的属性）。
Method类：代表类的方法。
Constructor 类：代表类的构造方法。
Array类：提供了动态创建数组，以及访问数组的元素的静态方法。
 
下面给出几个例子看看Reflection API的实际运用：
 
一、通过Class类获取成员变量、成员方法、接口、超类、构造方法等
 
在java.lang.Object 类中定义了getClass()方法，因此对于任意一个Java对象，都可以通过此方法获得对象的类型。Class类是Reflection API 中的核心类，它有以下方法
getName()：获得类的完整名字。
getFields()：获得类的public类型的属性。
getDeclaredFields()：获得类的所有属性。
getMethods()：获得类的public类型的方法。
getDeclaredMethods()：获得类的所有方法。
getMethod(String name, Class[] parameterTypes)：获得类的特定方法，name参数指定方法的名字，parameterTypes 参数指定方法的参数类型。
getConstructors()：获得类的public类型的构造方法。
getConstructor(Class[] parameterTypes)：获得类的特定构造方法，parameterTypes 参数指定构造方法的参数类型。
newInstance()：通过类的不带参数的构造方法创建这个类的一个对象。
 
下面给出一个综合运用的例子：
 
public class RefConstructor {
 
    public static void main(String args[]) throws Exception {
        RefConstructor ref = new RefConstructor();
        ref.getConstructor();
 
    }
 
    public void getConstructor() throws Exception {
        Class c = null;
        c = Class.forName("java.lang.Long");
        Class cs[] = {java.lang.String.class};
 
        System.out.println("\n-------------------------------\n");
 
        Constructor cst1 = c.getConstructor(cs);
        System.out.println("1、通过参数获取指定Class对象的构造方法：");
        System.out.println(cst1.toString());
 
        Constructor cst2 = c.getDeclaredConstructor(cs);
        System.out.println("2、通过参数获取指定Class对象所表示的类或接口的构造方法：");
        System.out.println(cst2.toString());
 
        Constructor cst3 = c.getEnclosingConstructor();
        System.out.println("3、获取本地或匿名类Constructor 对象，它表示基础类的立即封闭构造方法。");
        if (cst3 != null) System.out.println(cst3.toString());
        else System.out.println("-- 没有获取到任何构造方法！");
 
        Constructor[] csts = c.getConstructors();
        System.out.println("4、获取指定Class对象的所有构造方法：");
        for (int i = 0; i < csts.length; i++) {
            System.out.println(csts[i].toString());
        }
 
        System.out.println("\n-------------------------------\n");
 
        Type types1[] = c.getGenericInterfaces();
        System.out.println("1、返回直接实现的接口：");
        for (int i = 0; i < types1.length; i++) {
            System.out.println(types1[i].toString());
        }
 
        Type type1 = c.getGenericSuperclass();
        System.out.println("2、返回直接超类：");
        System.out.println(type1.toString());
 
        Class[] cis = c.getClasses();
        System.out.println("3、返回超类和所有实现的接口：");
        for (int i = 0; i < cis.length; i++) {
            System.out.println(cis[i].toString());
        }
 
        Class cs1[] = c.getInterfaces();
        System.out.println("4、实现的接口");
        for (int i = 0; i < cs1.length; i++) {
            System.out.println(cs1[i].toString());
        }
 
        System.out.println("\n-------------------------------\n");
 
        Field fs1[] = c.getFields();
        System.out.println("1、类或接口的所有可访问公共字段：");
        for (int i = 0; i < fs1.length; i++) {
            System.out.println(fs1[i].toString());
        }
 
        Field f1 = c.getField("MIN_VALUE");
        System.out.println("2、类或接口的指定已声明指定公共成员字段：");
        System.out.println(f1.toString());
 
        Field fs2[] = c.getDeclaredFields();
        System.out.println("3、类或接口所声明的所有字段：");
        for (int i = 0; i < fs2.length; i++) {
            System.out.println(fs2[i].toString());
        }
 
        Field f2 = c.getDeclaredField("serialVersionUID");
        System.out.println("4、类或接口的指定已声明指定字段：");
        System.out.println(f2.toString());
 
        System.out.println("\n-------------------------------\n");
 
        Method m1[] = c.getMethods();
        System.out.println("1、返回类所有的公共成员方法：");
        for (int i = 0; i < m1.length; i++) {
            System.out.println(m1[i].toString());
        }
 
        Method m2 = c.getMethod("longValue", new Class[]{});
        System.out.println("2、返回指定公共成员方法：");
        System.out.println(m2.toString());
 
    }
}
输出结果：输出结果很长，这里不再给出。
 
 
二、运行时复制对象
 
例程ReflectTester 类进一步演示了Reflection API的基本使用方法。ReflectTester类有一个copy(Object object)方法，这个方法能够创建一个和参数object 同样类型的对象，然后把object对象中的所有属性拷贝到新建的对象中，并将它返回
这个例子只能复制简单的JavaBean，假定JavaBean 的每个属性都有public 类型的getXXX()和setXXX()方法。
 
public class ReflectTester {
    public Object copy(Object object) throws Exception {
        // 获得对象的类型
        Class<?> classType = object.getClass();
        System.out.println("Class:" + classType.getName());
 
        // 通过默认构造方法创建一个新的对象
        Object objectCopy = classType.getConstructor(new Class[]{}).newInstance(new Object[]{});
 
        // 获得对象的所有属性
        Field fields[] = classType.getDeclaredFields();
 
        for (int i = 0; i < fields.length; i++) {
            Field field = fields[i];
 
            String fieldName = field.getName();
            String firstLetter = fieldName.substring(0, 1).toUpperCase();
            // 获得和属性对应的getXXX()方法的名字
            String getMethodName = "get" + firstLetter + fieldName.substring(1);
            // 获得和属性对应的setXXX()方法的名字
            String setMethodName = "set" + firstLetter + fieldName.substring(1);
 
            // 获得和属性对应的getXXX()方法
            Method getMethod = classType.getMethod(getMethodName, new Class[]{});
            // 获得和属性对应的setXXX()方法
            Method setMethod = classType.getMethod(setMethodName, new Class[]{field.getType()});
 
            // 调用原对象的getXXX()方法
            Object value = getMethod.invoke(object, new Object[]{});
            System.out.println(fieldName + ":" + value);
            // 调用拷贝对象的setXXX()方法
            setMethod.invoke(objectCopy, new Object[]{value});
        }
        return objectCopy;
    }
 
    public static void main(String[] args) throws Exception {
        Customer customer = new Customer("Tom", 21);
        customer.setId(new Long(1));
 
        Customer customerCopy = (Customer) new ReflectTester().copy(customer);
        System.out.println("Copy information:" + customerCopy.getId() + " " + customerCopy.getName() + " "
                + customerCopy.getAge());
    }
}
 
class Customer {
    private Long id;
 
    private String name;
 
    private int age;
 
    public Customer() {
    }
 
    public Customer(String name, int age) {
        this.name = name;
        this.age = age;
    }
 
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public int getAge() {
        return age;
    }
 
    public void setAge(int age) {
        this.age = age;
    }
}
 
输出结果：
 
Class:com.langsin.reflection.Customer
id:1
name:Tom
age:21
Copy information:1 Tom 21
 
Process finished with exit code 0
 
解说：
ReflectTester 类的copy(Object object)方法依次执行以下步骤
（1）获得对象的类型：
Class classType=object.getClass();
System.out.println("Class:"+classType.getName());
 
（2）通过默认构造方法创建一个新对象：
Object objectCopy=classType.getConstructor(new Class[]{}).newInstance(new Object[]{});
以上代码先调用Class类的getConstructor()方法获得一个Constructor 对象，它代表默认的构造方法，然后调用Constructor对象的newInstance()方法构造一个实例。
 
3）获得对象的所有属性：
Field fields[]=classType.getDeclaredFields();
Class 类的getDeclaredFields()方法返回类的所有属性，包括public、protected、默认和private访问级别的属性
 
（4）获得每个属性相应的getXXX()和setXXX()方法，然后执行这些方法，把原来对象的属性拷贝到新的对象中
 
 
三、用反射机制调用对象的方法
 
public class InvokeTester {
    public int add(int param1, int param2) {
        return param1 + param2;
    }
 
    public String echo(String msg) {
        return "echo: " + msg;
    }
 
    public static void main(String[] args) throws Exception {
        Class<?> classType = InvokeTester.class;
        Object invokeTester = classType.newInstance();
 
        // Object invokeTester = classType.getConstructor(new
        // Class[]{}).newInstance(new Object[]{});
 
 
        //获取InvokeTester类的add()方法
        Method addMethod = classType.getMethod("add", new Class[]{int.class, int.class});
        //调用invokeTester对象上的add()方法
        Object result = addMethod.invoke(invokeTester, new Object[]{new Integer(100), new Integer(200)});
        System.out.println((Integer) result);
 
 
        //获取InvokeTester类的echo()方法
        Method echoMethod = classType.getMethod("echo", new Class[]{String.class});
        //调用invokeTester对象的echo()方法
        result = echoMethod.invoke(invokeTester, new Object[]{"Hello"});
        System.out.println((String) result);
    }
}
 
 
在例程InvokeTester类的main()方法中，运用反射机制调用一个InvokeTester对象的add()和echo()方法
 
add()方法的两个参数为int 类型，获得表示add()方法的Method对象的代码如下：
Method addMethod=classType.getMethod("add",new Class[]{int.class,int.class});
Method类的invoke(Object obj,Object args[])方法接收的参数必须为对象，如果参数为基本类型数据，必须转换为相应的包装类型的对象。invoke()方法的返回值总是对象，如果实际被调用的方法的返回类型是基本类型数据，那么invoke()方法会把它转换为相应的包装类型的对象，再将其返回。
 
在本例中，尽管InvokeTester 类的add()方法的两个参数以及返回值都是int类型，调用add Method 对象的invoke()方法时，只能传递Integer 类型的参数，并且invoke()方法的返回类型也是Integer 类型，Integer 类是int 基本类型的包装类：
 
Object result=addMethod.invoke(invokeTester,
new Object[]{new Integer(100),new Integer(200)});
System.out.println((Integer)result); //result 为Integer类型
 
 
四、动态创建和访问数组
 
java.lang.Array 类提供了动态创建和访问数组元素的各种静态方法。
 
例程ArrayTester1 类的main()方法创建了一个长度为10 的字符串数组，接着把索引位置为5 的元素设为“hello”，然后再读取索引位置为5 的元素的值
 
public class ArrayTester1 {
    public static void main(String args[]) throws Exception {
        Class<?> classType = Class.forName("java.lang.String");
        // 创建一个长度为10的字符串数组
        Object array = Array.newInstance(classType, 10);
        // 把索引位置为5的元素设为"hello"
        Array.set(array, 5, "hello");
        // 获得索引位置为5的元素的值
        String s = (String) Array.get(array, 5);
        System.out.println(s);
    }
}
 
 
例程ArrayTester2 类的main()方法创建了一个 5 x 10 x 15 的整型数组，并把索引位置为[3][5][10] 的元素的值为设37。
 
public class ArrayTester2 {
    public static void main(String args[]) {
        int[] dims = new int[]{5, 10, 15};
        //创建一个具有指定的组件类型和维度的新数组。
        Object array = Array.newInstance(Integer.TYPE, dims);
       
        Object arrayObj = Array.get(array, 3);
        Class<?> cls = arrayObj.getClass().getComponentType();
        System.out.println(cls);
 
        arrayObj = Array.get(arrayObj, 5);
        Array.setInt(arrayObj, 10, 37);
        int arrayCast[][][] = (int[][][]) array;
        System.out.println(arrayCast[3][5][10]);
    }
}
 
 
深入认识Class类
 
众所周知Java有个Object类，是所有Java类的继承根源，其内声明了数个应该在所有Java类中被改写的方法：hashCode()、equals()、clone()、toString()、getClass()等。其中getClass()返回一个Class类的对象。
 
Class类十分特殊。它和一般classes一样继承自Object，其实体用以表达Java程序运行时的classes和interfaces，也用来表达enum、array、primitive Java types
（boolean, byte, char, short, int, long, float, double）以及关键词void。当一个class被加载，或当加载器（class loader）的defineClass()被JVM调用，JVM 便自动产生一个Class object。如果您想借由“修改Java标准库源码”来观察Class object的实际生成时机（例如在Class的constructor内添加一个println()），不能够！因为Class并没有public constructor
 
Class是Reflection起源。针对任何您想探勘的class，唯有先为它产生一个Class object，接下来才能经由后者唤起为数十多个的Reflection APIs
 
Java允许我们从多种途径为一个class生成对应的Class对象。参看本人的《 深入研究java.long.Class类 》一文。
 
欲生成对象实体，在Reflection 动态机制中有两种作法，一个针对“无自变量ctor”，一个针对“带参数ctor”。如果欲调用的是“带参数ctor“就比较麻烦些，不再调用Class的newInstance()，而是调用Constructor 的newInstance()。首先准备一个Class[]做为ctor的参数类型（本例指定
为一个double和一个int），然后以此为自变量调用getConstructor()，获得一个专属ctor。接下来再准备一个Object[] 做为ctor实参值（本例指定3.14159和125），调用上述专属ctor的newInstance()。
 
动态生成“Class object 所对应之class”的对象实体；无自变量。
 
这个动作和上述调用“带参数之ctor”相当类似。首先准备一个Class[]做为参数类型（本例指定其中一个是String，另一个是Hashtable），然后以此为自变量调用getMethod()，获得特定的Method object。接下来准备一个Object[]放置自变量，然后调用上述所得之特定Method object的invoke()。
为什么获得Method object时不需指定回返类型？
 
因为method overloading机制要求signature必须唯一，而回返类型并非signature的一个成份。换句话说，只要指定了method名称和参数列，就一定指出了一个独一无二的method。
 
 
四、运行时变更field内容
 
与先前两个动作相比，“变更field内容”轻松多了，因为它不需要参数和自变量。首先调用Class的getField()并指定field名称。获得特定的Field object之后便可直接调用Field的get()和set()。
 
public class RefFiled {
    public double x;
    public Double y;
 
    public static void main(String args[]) throws NoSuchFieldException, IllegalAccessException {
        Class c = RefFiled.class;
        Field xf = c.getField("x");
        Field yf = c.getField("y");
 
        RefFiled obj = new RefFiled();
 
        System.out.println("变更前x=" + xf.get(obj));
        //变更成员x值
        xf.set(obj, 1.1);
        System.out.println("变更后x=" + xf.get(obj));
 
        System.out.println("变更前y=" + yf.get(obj));
        //变更成员y值
        yf.set(obj, 2.1);
        System.out.println("变更后y=" + yf.get(obj));
    }
}
 
运行结果：
 
变更前x=0.0
变更后x=1.1
变更前y=null
变更后y=2.1
 
Process finished with exit code 0
 
 
参考资料：
此例的部分文字解说和源码来自浪曦论坛 http：//bbs.langsin.com。
侯捷的《候捷谈Java反射机制》[url]http://www.j2medev.com/Article/Class3/Class7/200604/1995.html[/url]
think in java
Java核心技术
 
声明：本文是在参考了大量资料基础上，摸索运用，总结的基础上完成的。
由于每次书写间隔非常长，参考的资料不能一一写出来，如有侵权，本人将在第一时间删除侵权的内容。
 
 
特别说明：
 
Java的反射其实内容远远不至这些，这里看到仅仅是冰山一脚，如果你想要更加深入学习和研究Java的反射机制，你可以参考《Java Reflection in Action》一书，网上有免费下载的。
 

```

### enum

```java
枚举其实就是一种类型，跟int, char 这种差不多，就是定义变量时限制输入的，你只能够赋enum里面规定的值。建议大家可以看看，这两篇文章，《java枚举类型入门》和《C++的中的结构体和枚举》，供大家参考。

枚举类型是JDK5.0的新特征。Sun引进了一个全新的关键字enum来定义一个枚举类。下面就是一个典型枚举类型的定义：

Java代码：

    public enum Color{  
    RED，BLUE，BLACK，YELLOW，GREEN  
    } 

显然，enum很像特殊的class，实际上enum声明定义的类型就是一个类。 而这些类都是类库中Enum类的子类（java.lang.Enum）。它们继承了这个Enum中的许多有用的方法。我们对代码编译之后发现，编译器将enum类型单独编译成了一个字节码文件：Color.class。

Color字节码代码

    final enum hr.test.Color {  
    // 所有的枚举值都是类静态常量  
    public static final enum hr.test.Color RED;  
    public static final enum hr.test.Color BLUE;  
    public static final enum hr.test.Color BLACK;  
    public static final enum hr.test.Color YELLOW;  
    public static final enum hr.test.Color GREEN;  
    private static final synthetic hr.test.Color［］ ENUM$VALUES;  
    // 初始化过程，对枚举类的所有枚举值对象进行第一次初始化  
    static {  
    0 new hr.test.Color ［1］  
    3 dup  
    4 ldc ［16］ //把枚举值字符串“RED”压入操作数栈  
    6 iconst_0 // 把整型值0压入操作数栈  
    7 invokespecial hr.test.Color（java.lang.String， int） ［17］ //调用Color类的私有构造器创建Color对象RED  
    10 putstatic hr.test.Color.RED ： hr.test.Color ［21］ //将枚举对象赋给Color的静态常量RED。  
    。..。..。.. 枚举对象BLUE等与上同  
    102 return 
    };  
    // 私有构造器，外部不可能动态创建一个枚举类对象（也就是不可能动态创建一个枚举值）。  
    private Color（java.lang.String arg0， int arg1）{  
    // 调用父类Enum的受保护构造器创建一个枚举对象  
    3 invokespecial java.lang.Enum（java.lang.String， int） ［38］  
    };  
    public static hr.test.Color［］ values（）;  
    // 实现Enum类的抽象方法  
    public static hr.test.Color valueOf（java.lang.String arg0）;  
    } 

下面我们就详细介绍enum定义的枚举类的特征及其用法。（后面均用Color举例）

1、Color枚举类就是class，而且是一个不可以被继承的final类。

其枚举值（RED，BLUE.。.）都是Color类型的类静态常量， 我们可以通过下面的方式来得到Color枚举类的一个实例：

    Color c=Color.RED; 

注意：这些枚举值都是public static final的，也就是我们经常所定义的常量方式，因此枚举类中的枚举值最好全部大写。

2、即然枚举类是class，当然在枚举类型中有构造器，方法和数据域。

但是，枚举类的构造器有很大的不同：

（1） 构造器只是在构造枚举值的时候被调用。

Java代码：

    enum Color{  
    RED（255，0，0），BLUE（0，0，255），BLACK（0，0，0），YELLOW（255，255，0），GREEN（0，255，0）;  
    //构造枚举值，比如RED（255，0，0）  
    private Color（int rv，int gv，int bv）{  
    this.redValue=rv;  
    this.greenValue=gv;  
    this.blueValue=bv;  
    }  
    public String toString（）{ //覆盖了父类Enum的toString（）  
    return super.toString（）+“（”+redValue+“，”+greenValue+“，”+blueValue+“）”;  
    }  
    private int redValue; //自定义数据域，private为了封装。  
    private int greenValue;  
    private int blueValue;  
    } 

（2） 构造器只能私有private，绝对不允许有public构造器。 这样可以保证外部代码无法新构造枚举类的实例。这也是完全符合情理的，因为我们知道枚举值是public static final的常量而已。 但枚举类的方法和数据域可以允许外部访问。

Java代码：

    public static void main（String args［］）  
    {  
    // Color colors=new Color（100，200，300）; //wrong  
    Color color=Color.RED;  
    System.out.println（color）; // 调用了toString（）方法  
    } 

3、所有枚举类都继承了Enum的方法，下面我们详细介绍这些方法。

（1） ordinal（）方法： 返回枚举值在枚举类种的顺序。这个顺序根据枚举值声明的顺序而定。

    Color.RED.ordinal（）; //返回结果：0  
    Color.BLUE.ordinal（）; //返回结果：1 

（2） compareTo（）方法： Enum实现了java.lang.Comparable接口，因此可以比较象与指定对象的顺序。Enum中的compareTo返回的是两个枚举值的顺序之差。当然，前提是两个枚举值必须属于同一个枚举类，否则会抛出ClassCastException（）异常。（具体可见源代码）

    Color.RED.compareTo（Color.BLUE）; //返回结果 -1 

（3） values（）方法： 静态方法，返回一个包含全部枚举值的数组。

    Color［］ colors=Color.values（）;  
    for（Color c:colors）{  
    System.out.print（c+“，”）;  
    }//返回结果：RED，BLUE，BLACK YELLOW，GREEN， 

（4） toString（）方法： 返回枚举常量的名称。

    Color c=Color.RED;  
    System.out.println（c）;//返回结果： RED 

（5） valueOf（）方法： 这个方法和toString方法是相对应的，返回带指定名称的指定枚举类型的枚举常量。

    Color.valueOf（“BLUE”）; //返回结果： Color.BLUE 

（6） equals（）方法： 比较两个枚举类对象的引用。

Java代码：

    //JDK源代码：  
    public final boolean equals（Object other） {  
    return this==other;  
    } 

4、枚举类可以在switch语句中使用。

Java代码：

    Color color=Color.RED;  
    switch（color）{  
    case RED： System.out.println（“it‘s red”）;break;  
    case BLUE： System.out.println（“it’s blue”）;break;  
    case BLACK： System.out.println（“it‘s blue”）;break;  
    } 

希望通过本文对java中枚举的介绍，能够给你到来帮助




 java:使用匿名类直接new接口

java中的匿名类有一个倍儿神奇的用法，见下面代码示例:

1 package contract;
2 
3 public interface ISay {
4     void sayHello();
5 }

上面是一个简单的接口，下面是如何使用：
复制代码

 1 package jimmy;
 2 import contract.ISay;
 3 public class Program {
 4     public static void main(String[] args) {
 5         ISay say = new ISay() {          
 6             public void sayHello() {
 7                 System.out.println("Hello java!");
 8             }
 9         };
10     }
11 }

复制代码

初看上去，就好象在“不提供接口实现的情况下，直接new了一个接口实例”，对于C#er来说，有一种尽毁三观的赶脚。

还好这只是假象，观察bin目录下的class输出，会发现有一个类似Program$1.class的文件，如果反编译观察一下，发现原来是编译器自动生成一个类Program$1:
复制代码

 1 package jimmy;
 2 
 3 import contract.ISay;
 4 import java.io.PrintStream;
 5 
 6 class Program$1
 7   implements ISay
 8 {
 9   public void sayHello()
10   {
11     System.out.println("Hello java!");
12   }
13 }

复制代码

如果有些场合，只需要临时需要创建一个接口的实现类，上面的"技巧"可以用来简化代码.




Cglib 中有个 BeanGenerator 就是专门用于做这个的，可以动态生成 JavaBean，
BeanGenerator 利用了非常底层的 ASM 字节码框架来实现的。

[java] view plaincopy

    import java.lang.reflect.Field;  
    import java.lang.reflect.Method;  
    import java.util.HashMap;  
    import java.util.Iterator;  
    import java.util.Map;  
    import java.util.Set;  
      
    import net.sf.cglib.beans.BeanGenerator;  
    import net.sf.cglib.beans.BeanMap;  
      
    public class DynaBeanCglibTest {  
      
        public static void main(String[] args) throws ClassNotFoundException {  
              
            System.out.println("Generate JavaBean ...");          
            // 设置类成员属性  
            Map properties = new HashMap();  
            properties.put("id", Class.forName("java.lang.Integer"));  
            properties.put("name", Class.forName("java.lang.String"));  
            properties.put("address", Class.forName("java.lang.String"));  
            // 生成动态 Bean  
            CglibDynaBean bean = new CglibDynaBean(properties);  
            System.out.println("  OK!");  
              
            System.out.println("Set values ...");  
            // 给 Bean 设置值  
            bean.setValue("id", new Integer(123));  
            bean.setValue("name", "454");  
            bean.setValue("address", "789");  
            System.out.println("  OK!");  
              
            System.out.println("Get values");  
            // 从 Bean 中获取值，当然了获得值的类型是 Object  
            System.out.println("  >> id      = " + bean.getValue("id"));  
            System.out.println("  >> name    = " + bean.getValue("name"));  
            System.out.println("  >> address = " + bean.getValue("address"));  
      
            System.out.println("Class name");  
            // 查看动态 Bean 的类名  
            Class clazz = bean.getObject().getClass();  
            System.out.println("  >> " + clazz.getName());  
              
            System.out.println("Show all methods");  
            // 查看动态 Bean 中声明的方法  
            Method[] methods = clazz.getDeclaredMethods();  
            for(int i = 0; i < methods.length; i++) {  
                System.out.println("  >> " + methods[i].getName());  
            }  
      
            System.out.println("Show all properties");  
            // 查看动态 Bean 中声明的字段  
            Field[] fields = clazz.getDeclaredFields();  
            for(int i = 0; i < fields.length; i++) {  
                System.out.println("  >> " + fields[i].getName());  
            }   
        }  
    }  
      
    class CglibDynaBean {  
        private Object object = null;  
        private BeanMap beanMap = null;  
          
        public CglibDynaBean(Map properties) {          
            this.object = generateBean(properties);  
            this.beanMap = getBeanMap();  
        }  
          
        public void setValue(String property, Object value) {  
            beanMap.put(property, value);  
        }  
          
        public Object getValue(String property) {  
            return beanMap.get(property);  
        }  
      
        public Object getObject() {  
            return this.object;  
        }    
         
        private Object generateBean(Map properties) {  
            BeanGenerator generator = new BeanGenerator();  
            Set keySet = properties.keySet();  
            for(Iterator i = keySet.iterator(); i.hasNext();) {  
                String key = (String)i.next();  
                generator.addProperty(key, (Class)properties.get(key));  
            }  
            return generator.create();  
        }  
          
        private BeanMap getBeanMap() {  
            return BeanMap.create(this.object);  
        }  
    }  

  
cglib 一般在 Spring、Hibernate 的 lib 目录中会找到。如果不是 nodep 版的 jar 还需要 ASM 的支持。
```
### transient and serialization

transient

java语言的关键字，变量修饰符，如果用transient声明一个实例变量，当对象存储时，它的值不需要维持。
Java的serialization提供了一种持久化对象实例的机制。当持久化对象时，可能有一个特殊的对象数据成员，我们不想用serialization机制来保存它。为了在一个特定对象的一个域上关闭serialization，可以在这个域前加上关键字transient。当一个对象被序列化的时候，transient型变量的值不包括在序列化的表示中，然而非transient型的变量是被包括进去的。

### Making .jar files

```java


Linux下制作可执行的JAR文件包

制作可执行的JAR文件包及jar命令详解

   常常在网上看到有人询问：如何把 java 程序编译成 .exe 文件。通常回答只有两种，一种是制作一个可执行的 JAR 文件包，然后就可以像.chm 文档一样双击运行了；而另一种是使用 JET 来进行
编译。但是 JET 是要用钱买的，而且据说 JET 也不是能把所有的 Java 程序都编译成执行文件，性能也要打些折扣。所以，使用制作可执行 JAR 文件包的方法就是最佳选择了，何况它还能保持 Java 的跨平台特性。

下面就来看看什么是 JAR 文件包吧：

1. JAR 文件包

JAR 文件就是 Java Archive File，顾名思意，它的应用是与 Java 息息相关的，是 Java 的一种文档格式。JAR 文件非常类似 ZIP 文件--准确的说，它就是 ZIP 文件，所以叫它文件包。JAR 文件与 ZIP 文件唯一的区别就是在 JAR 文件的内容中，包含了一个 META-INF/MANIFEST.MF 文件，这个文件是在生成 JAR 文件的时候自动创建的。举个例子，如果我们具有如下目录结构的一些文件：

　　==

　　`-- test

　　　 `-- Test.class

把它压缩成 ZIP 文件 test.zip，则这个 ZIP 文件的内部目录结构为：

　　test.zip

　　`-- test

　　　 `-- Test.class

如果我们使用 JDK 的 jar 命令把它打成 JAR 文件包 test.jar，则这个 JAR 文件的内部目录结构为：

　　test.jar

　　|-- META-INF

　　|　 `-- MANIFEST.MF

　　`-- test

　　　　`--Test.class

2. 创建可执行的 JAR 文件包

制作一个可执行的 JAR 文件包来发布你的程序是 JAR 文件包最典型的用法。

Java 程序是由若干个 .class 文件组成的。这些 .class 文件必须根据它们所属的包不同而分级分目录存放；运行前需要把所有用到的包的根目录指定给 CLASSPATH 环境变量或者 java 命令的 -cp 参数；运行时还要到控制台下去使用 java 命令来运行，如果需要直接双击运行必须写 Windows 的批处理文件 (.bat) 或者 Linux 的 Shell 程序。因此，许多人说，Java 是一种方便开发者苦了用户的程序设计语言。

其实不然，如果开发者能够制作一个可执行的 JAR 文件包交给用户，那么用户使用起来就方便了。在 Windows 下安装 JRE (Java Runtime Environment) 的时候，安装文件会将 .jar 文件映射给 javaw.exe 打开。那么，对于一个可执行的 JAR 文件包，用户只需要双击它就可以运行程序了，和阅读 .chm 文档一样方便 (.chm 文档默认是由 hh.exe 打开的)。那么，现在的关键，就是如何来创建这个可执行的 JAR 文件包。

创建可执行的 JAR 文件包，需要使用带 cvfm 参数的 jar 命令，同样以上述 test 目录为例，命令如下：

jar cvfm test.jar manifest.mf test

这里 test.jar 和 manifest.mf 两个文件，分别是对应的参数 f 和 m，其重头戏在 manifest.mf。因为要创建可执行的 JAR 文件包，光靠指定一个 manifest.mf 文件是不够的，因为 MANIFEST 是 JAR 文件包的特征，可执行的 JAR 文件包和不可执行的 JAR 文件包都包含 MANIFEST。关键在于可执行 JAR 文件包的 MANIFEST，其内容包含了 Main-Class 一项。这在 MANIFEST 中书写格式如下：

Main-Class: 可执行主类全名(包含包名)

例如，假设上例中的 Test.class 是属于 test 包的，而且是可执行的类 (定义了 public static void main(String[]) 方法)，那么这个 manifest.mf 可以编辑如下：

Main-Class: test.Test <回车>

这个 manifest.mf 可以放在任何位置，也可以是其它的文件名，只需要有 Main-Class: test.Test 一行，且该行以一个回车符结束即可。创建了 manifest.mf 文件之后，我们的目录结构变为：

　　==

　　|-- test

　　|　 `-- Test.class

　　`-- manifest.mf

这时候，需要到 test 目录的上级目录中去使用 jar 命令来创建 JAR 文件包。也就是在目录树中使用“==”表示的那个目录中，使用如下命令：

jar cvfm test.jar manifest.mf test

之后在“==”目录中创建了 test.jar，这个 test.jar 就是执行的 JAR 文件包。运行时只需要使用 java -jar test.jar 命令即可。

需要注意的是，创建的 JAR 文件包中需要包含完整的、与 Java 程序的包结构对应的目录结构，就像上例一样。而 Main-Class 指定的类，也必须是完整的、包含包路径的类名，如上例的 test.Test；而且在没有打成 JAR 文件包之前可以使用 java <类名> 来运行这个类，即在上例中 java test.Test 是可以正确运行的 (当然要在 CLASSPATH 正确的情况下)。

3. jar 命令详解

jar 是随 JDK 安装的，在 JDK 安装目录下的 bin 目录中，Windows 下文件名为 jar.exe，Linux 下文件名为 jar。它的运行需要用到 JDK 安装目录下 lib 目录中的 tools.jar 文件。不过我们除了安装 JDK 什么也不需要做，因为 SUN 已经帮我们做好了。我们甚至不需要将 tools.jar 放到 CLASSPATH 中。

使用不带任何的 jar 命令我们可以看到 jar 命令的用法如下：

jar {ctxu}[vfm0M] [jar-文件] [manifest-文件] [-C 目录] 文件名 ...

其中 {ctxu} 是 jar 命令的子命令，每次 jar 命令只能包含 ctxu 中的一个，它们分别表示：

-c　创建新的 JAR 文件包

-t　列出 JAR 文件包的内容列表

-x　展开 JAR 文件包的指定文件或者所有文件

-u　更新已存在的 JAR 文件包 (添加文件到 JAR 文件包中)

[vfm0M] 中的选项可以任选，也可以不选，它们是 jar 命令的选项参数

-v　生成详细报告并打印到标准输出

-f　指定 JAR 文件名，通常这个参数是必须的

-m　指定需要包含的 MANIFEST 清单文件

-0　只存储，不压缩，这样产生的 JAR 文件包会比不用该参数产生的体积大，但速度更快

-M　不产生所有项的清单（MANIFEST〕文件，此参数会忽略 -m 参数

[jar-文件] 即需要生成、查看、更新或者解开的 JAR 文件包，它是 -f 参数的附属参数

[manifest-文件] 即 MANIFEST 清单文件，它是 -m 参数的附属参数

[-C 目录] 表示转到指定目录下去执行这个 jar 命令的操作。它相当于先使用 cd 命令转该目录下再执行不带 -C 参数的 jar 命令，它只能在创建和更新 JAR 文件包的时候可用。　　

文件名 ... 指定一个文件/目录列表，这些文件/目录就是要添加到 JAR 文件包中的文件/目录。如果指定了目录，那么 jar 命令打包的时候会自动把该目录中的所有文件和子目录打入包中。

下面举一些例子来说明 jar 命令的用法：

1) jar cf test.jar test

该命令没有执行过程的显示，执行结果是在当前目录生成了 test.jar 文件。如果当前目录已经存在 test.jar，那么该文件将被覆盖。

2) jar cvf test.jar test

该命令与上例中的结果相同，但是由于 v 参数的作用，显示出了打包过程，如下：

标明清单(manifest)

增加：test/(读入= 0) (写出= 0)(存储了 0%)

增加：test/Test.class(读入= 7) (写出= 6)(压缩了 14%)

3) jar cvfM test.jar test

该命令与 2) 结果类似，但在生成的 test.jar 中没有包含 META-INF/MANIFEST 文件，打包过程的信息也略有差别：

增加：test/(读入= 0) (写出= 0)(存储了 0%)

增加：test/Test.class(读入= 7) (写出= 6)(压缩了 14%)

4) jar cvfm test.jar manifest.mf test

运行结果与 2) 相似，显示信息也相同，只是生成 JAR 包中的 META-INF/MANIFEST 内容不同，是包含了 manifest.mf 的内容

5) jar tf test.jar

在 test.jar 已经存在的情况下，可以查看 test.jar 中的内容，如对于 2) 和 3) 生成的 test.jar 分别应该此命令，结果如下；

对于 2)

META-INF/

META-INF/MANIFEST.MF

test/

test/Test.class

对于 3)

test/

test/Test.class

6) jar tvf test.jar

除显示 5) 中显示的内容外，还包括包内文件的详细信息，如：

0 Wed Jun 19 15:39:06 GMT 2002 META-INF/

86 Wed Jun 19 15:39:06 GMT 2002 META-INF/MANIFEST.MF

0 Wed Jun 19 15:33:04 GMT 2002 test/

7 Wed Jun 19 15:33:04 GMT 2002 test/Test.class

7) jar xf test.jar

解开 test.jar 到当前目录，不显示任何信息，对于 2) 生成的 test.jar，解开后的目录结构如下：

　　==

　　|-- META-INF

　　|　 `-- MANIFEST

　　`-- test

　　　　`--Test.class

8) jar xvf test.jar

运行结果与 7) 相同，对于解压过程有详细信息显示，如：

创建：META-INF/

展开：META-INF/MANIFEST.MF

创建：test/

展开：test/Test.class

9) jar uf test.jar manifest.mf

在 test.jar 中添加了文件 manifest.mf，此使用 jar tf 来查看 test.jar 可以发现 test.jar 中比原来多了一个 manifest。这里顺便提一下，如果使用 -m 参数并指定 manifest.mf 文件，那么 manifest.mf 是作为清单文件 MANIFEST 来使用的，它的内容会被添加到 MANIFEST 中；但是，如果作为一般文件添加到 JAR 文件包中，它跟一般文件无异。

10) jar uvf test.jar manifest.mf

与 9) 结果相同，同时有详细信息显示，如：

增加：manifest.mf(读入= 17) (写出= 19)(压缩了 -11%)

4. 关于 JAR 文件包的一些技巧

1) 使用 unzip 来解压 JAR 文件

在介绍 JAR 文件的时候就已经说过了，JAR 文件实际上就是 ZIP 文件，所以可以使用常见的一些解压 ZIP 文件的工具来解压 JAR 文件，如 Windows 下的 WinZip、WinRAR 等和 Linux 下的 unzip 等。使用 WinZip 和 WinRAR 等来解压是因为它们解压比较直观，方便。而使用 unzip，则是因为它解压时可以使用 -d 参数指定目标目录。

在解压一个 JAR 文件的时候是不能使用 jar 的 -C 参数来指定解压的目标的，因为 -C 参数只在创建或者更新包的时候可用。那么需要将文件解压到某个指定目录下的时候就需要先将这具 JAR 文件拷贝到目标目录下，再进行解压，比较麻烦。如果使用 unzip，就不需要这么麻烦了，只需要指定一个 -d 参数即可。如：

unzip test.jar -d dest/

2) 使用 WinZip 或者 WinRAR 等工具创建 JAR 文件

上面提到 JAR 文件就是包含了 META-INF/MANIFEST 的 ZIP 文件，所以，只需要使用 WinZip、WinRAR 等工具创建所需要 ZIP 压缩包，再往这个 ZIP 压缩包中添加一个包含 MANIFEST 文件的 META-INF 目录即可。对于使用 jar 命令的 -m 参数指定清单文件的情况，只需要将这个 MANIFEST 按需要修改即可。

3) 使用 jar 命令创建 ZIP 文件

有些 Linux 下提供了 unzip 命令，但没有 zip 命令，所以需要可以对 ZIP 文件进行解压，即不能创建 ZIP 文件。如要创建一个 ZIP 文件，使用带 -M 参数的 jar 命令即可，因为 -M 参数表示制作 JAR 包的时候不添加 MANIFEST 清单，那么只需要在指定目标 JAR 文件的地方将 .jar 扩展名改为 .zip 扩展名，创建的就是一个不折不扣的 ZIP 文件了，如将上一节的第 3) 个例子略作改动：

jar cvfM test.zip test

```
