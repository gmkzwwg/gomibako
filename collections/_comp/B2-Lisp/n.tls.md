---
category: Notes
title: The Little Schemer
tags: Lisp
---

1. The five rules of Scheme
  1. The primitive car is defined only for non-empty lists.
  2. The primitive cdr is defined only for non-empty lists.The cdr of any non-empty list is always another list.
  3. The primitive cons takes two arguments. The second argument to cons must be a list. The result is a list.
  4. The primitive null? is defined ONLY FOR LISTS.
  5. The primitive eq? takes two arguments.Each must be a non-numeric atom.

2. The ten commandments
  1. Recurring
    * When recurring on a list of atoms, lat, ask two questions about it: (null? lat) and else.
    * When recurring on a number, n, ask two questions about it: (zero? n) and else.
    * When recurring on a list of S-expressions, l, ask three questions about it: (null? l), (atom? (car l)), and else.
  2. Use cons to build lists.
  3. When building a list, describe the first typical elemetn, and then cons it onto the nutural recursion.
  4. Always change at least one argument while recurring.
    * When recurring on a list of atoms, lat, use (cdr lat).
    * When recurring on an number, n, use (sub1 n).
    * When recurring on a list of S-expressions, l, use (car l) and (cdr l) if neither (null? l) nor (atom? (car l)) are ture.
  5. It must be changed to be closer to termination.The changing argument must be tested in termination condition:
    * When using car, test termination with null?
    * When using sub1, test termination with zero?.
  6. Building a value:
    * When building a value with +, always use 0 for the value of the terminating lien, for adding 0 does not change the value of an addition.
    * When building a value with *, always use 1 for the value of the terminating line, for multiplying by 1 does not change the value of a multiplication.
    * When building a value with cons, always consider () for the value of the terminating line.
  7. Simplify only after the function is correct.
  8. Recur on the subparts that are of the same nature:
    * On the sublist of a list.
    * On the subexpression of an arithmetic expression.
  9. Use help functions to abstract from representations.
  10. Abstract common patterns with a new function.
  11. Build functions to collect more than one values at a time.



## Chapter 2 Do It Again

```scheme
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

(define lat?
  (lambda (l)
    (cond
      ((null? l) #t)
      ((atom? (car l)) (lat? (cdr l)))
      (else #f))))

(define member?
  (lambda (a lat)
    (cond
      ((null? lat) #f)
      (else (or (eq? (car lat) a)
                (member? a (cdr lat)))))))
```
## Chapter 3 Cons The Magnificents

```scheme
;; Remove Member

(define rember
  (lambda (a lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) a) (cdr lat))
      (else (cons (car lat)
                  (rember a (cdr lat)))))))

(define firsts
  (lambda (l)
    (cond
      ((null? l) '())
      (else
        (cons (car (car l)) (firsts (cdr l)))))))

(firsts '((apple peach pumpkin)
          (plum pear cherry)
          (grape raisin pea)
          (bean carrot eggplant)))      ; Returns: '(apple plum grape bean)

(define insertR
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old)
       (cons old (cons new (cdr lat))))
      (else
        (cons (car lat) (insertR new old (cdr lat)))))))

(define insertL
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old)
       (cons new (cons old (cdr lat))))
      (else
        (cons (car lat) (insertL new old (cdr lat)))))))

;; Substitute

(define subst
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old)
       (cons new (cdr lat)))
      (else
        (cons (car lat) (subst new old (cdr lat)))))))

(define subst2
  (lambda (new o1 o2 lat)
    (cond
      ((null? lat) '())
      ((or (eq? (car lat) o1) (eq? (car lat) o2))
       (cons new (cdr lat)))
      (else
        (cons (car lat) (subst new o1 o2 (cdr lat)))))))

(define multirember
  (lambda (a lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) a)
       (multirember a (cdr lat)))
      (else
        (cons (car lat) (multirember a (cdr lat)))))))

(define multiinsertR
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old)
       (cons old (cons new (multiinsertR new old (cdr lat)))))
      (else
        (cons (car lat) (multiinsertR new old (cdr lat)))))))

(define multiinsertL
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old)
       (cons new (cons old (multiinsertL new old (cdr lat)))))
      (else
        (cons (car lat) (multiinsertL new old (cdr lat)))))))

(define multisubst
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old)
       (cons new (multisubst new old (cdr lat))))
      (else
        (cons (car lat) (multisubst new old (cdr lat)))))))
```

## Chapter 4 Numbers Games

```scheme
(define add1
  (lambda (n) (+ n 1)))

(define sub1
  (lambda (n) (- n 1)))

(define o+
  (lambda (n m)
    (cond
      ((zero? m) n)
      (else (add1 (o+ n (sub1 m)))))))

(define o-
  (lambda (n m)
    (cond
      ((zero? m) n)
      (else (sub1 (o- n (sub1 m)))))))

(define addtup
  (lambda (tup)
    (cond
      ((null? tup) 0)
      (else (o+ (car tup) (addtup (cdr tup)))))))

(define o*
  (lambda (n m)
    (cond
      ((zero? m) 0)
      (else (o+ n (o* n (sub1 m)))))))

(define tup+
  (lambda (tup1 tup2)
    (cond
     ((null? tup1) tup2)
     ((null? tup2) tup1)
     (else
      (cons (o+ (car tup1) (car tup2))
            (tup+ (cdr tup1) (cdr tup2)))))))

(tup+ '(3 7) '(4 6 8 1))            ; '(7 13 8 1)

(define o>
  (lambda (n m)
    (cond
      ((zero? n) #f)
      ((zero? m) #t)
      (else
        (o> (sub1 n) (sub1 m))))))

(define o<
  (lambda (n m)
    (cond
      ((zero? m) #f)
      ((zero? n) #t)
      (else
        (o< (sub1 n) (sub1 m))))))

(define o=
  (lambda (n m)
    (cond
      ((o> n m) #f)
      ((o< n m) #f)
      (else #t))))

(define o^
  (lambda (n m)
    (cond
      ((zero? m) 1)
      (else (o* n (o^ n (sub1 m)))))))

(define o/
  (lambda (n m)
    (cond
      ((o< n m) 0)
      (else (add1 (o/ (o- n m) m))))))

(define olength
  (lambda (lat)
    (cond
      ((null? lat) 0)
      (else (add1 (olength (cdr lat)))))))

(define pick
  (lambda (n lat)
    (cond
      ((zero? (sub1 n)) (car lat))
      (else
        (pick (sub1 n) (cdr lat))))))

(define rempick
  (lambda (n lat)
    (cond
      ((zero? (sub1 n)) (cdr lat))
      (else
        (cons (car lat) (rempick (sub1 n) (cdr lat)))))))

(define no-nums
  (lambda (lat)
    (cond
      ((null? lat) '())
      ((number? (car lat)) (no-nums (cdr lat)))
      (else
        (cons (car lat) (no-nums (cdr lat)))))))

(define all-nums
  (lambda (lat)
    (cond
      ((null? lat) '())
      ((number? (car lat)) (cons (car lat) (all-nums (cdr lat))))
      (else
        (all-nums (cdr lat))))))

(define eqan?
  (lambda (a1 a2)
    (cond
      ((and (number? a1) (number? a2)) (= a1 a2))
      ((or  (number? a1) (number? a2)) #f)
      (else
        (eq? a1 a2)))))

(define occur
  (lambda (a lat)
    (cond
      ((null? lat) 0)
      ((eq? (car lat) a)
       (add1 (occur a (cdr lat))))
      (else
        (occur a (cdr lat))))))

(define one?
  (lambda (n) (= n 1)))

(define rempick-one
  (lambda (n lat)
    (cond
      ((one? n) (cdr lat))
      (else
        (cons (car lat) (rempick-one (sub1 n) (cdr lat)))))))

(rempick-one 4 '(hotdogs with hot mustard))     ; '(hotdogs with mustard)

```
## Chapter 5 It's Full of Stars

```scheme
; * means can delete things in parathesis
(define rember*
  (lambda (a l)
    (cond
      ((null? l) '())
      ((atom? (car l))
       (cond
         ((eq? (car l) a)
          (rember* a (cdr l)))
         (else
           (cons (car l) (rember* a (cdr l))))))
      (else
        (cons (rember* a (car l)) (rember* a (cdr l)))))))

(define insertR*
  (lambda (new old l)
    (cond
      ((null? l) '())
      ((atom? (car l))
       (cond
         ((eq? (car l) old)
          (cons old (cons new (insertR* new old (cdr l)))))
         (else
           (cons (car l) (insertR* new old (cdr l))))))
      (else
        (cons (insertR* new old (car l)) (insertR* new old (cdr l)))))))

(define occur*
  (lambda (a l)
    (cond
      ((null? l) 0)
      ((atom? (car l))
       (cond
         ((eq? (car l) a)
          (add1 (occur* a (cdr l))))
         (else
           (occur* a (cdr l)))))
      (else
        (+ (occur* a (car l))
           (occur* a (cdr l)))))))

(define insertL*
  (lambda (new old l)
    (cond
      ((null? l) '())
      ((atom? (car l))
       (cond
         ((eq? (car l) old)
          (cons new (cons old (insertL* new old (cdr l)))))
         (else
           (cons (car l) (insertL* new old (cdr l))))))
      (else
        (cons (insertL* new old (car l)) (insertL* new old (cdr l)))))))

(define member*
  (lambda (a l)
    (cond
      ((null? l) #f)
      ((atom? (car l))
       (or (eq? (car l) a)
           (member* a (cdr l))))
      (else
        (or (member* a (car l))
            (member* a (cdr l)))))))

(define leftmost
  (lambda (l)
    (cond
      ((atom? (car l)) (car l))
      (else (leftmost (car l))))))

(define eqlist?
  (lambda (l1 l2)
    (cond
      ; case 1: l1 is empty, l2 is empty, atom, list
      ((and (null? l1) (null? l2)) #t)
      ((and (null? l1) (atom? (car l2))) #f)
      ((null? l1) #f)
      ; case 2: l1 is atom, l2 is empty, atom, list
      ((and (atom? (car l1)) (null? l2)) #f)
      ((and (atom? (car l1)) (atom? (car l2)))
       (and (eq? (car l1) (car l2))
            (eqlist? (cdr l1) (cdr l2))))
      ((atom? (car l1)) #f)
      ; case 3: l1 is a list, l2 is empty, atom, list
      ((null? l2) #f)
      ((atom? (car l2)) #f)
      (else
        (and (eqlist? (car l1) (car l2))
             (eqlist? (cdr l1) (cdr l2)))))))

(define eqlist2?
  (lambda (l1 l2)
    (cond
      ; case 1: l1 is empty, l2 is empty, atom, list
      ((and (null? l1) (null? l2)) #t)
      ((or (null? l1) (null? l2)) #f)
      ; case 2: l1 is atom, l2 is empty, atom, list
      ((and (atom? (car l1)) (atom? (car l2)))
       (and (eq? (car l1) (car l2))
            (eqlist2? (cdr l1) (cdr l2))))
      ((or (atom? (car l1)) (atom? (car l2)))
       #f)
      ; case 3: l1 is a list, l2 is empty, atom, list
      (else
        (and (eqlist2? (car l1) (car l2))
             (eqlist2? (cdr l1) (cdr l2)))))))

(define equal??
  (lambda (s1 s2)
    (cond
     ((and (atom? s1) (atom? s2))
      (eq? s1 s2))
     ((atom? s1) #f)
     ((atom? s2) #f)
     (else (eqlist? s1 s2)))))

(define equal2??
  (lambda (s1 s2)
    (cond
      ((and (atom? s1) (atom? s2))
       (eq? s1 s2))
      ((or (atom? s1) (atom? s2)) #f)
      (else (eqlist? s1 s2)))))

(define eqlist3?
  (lambda (l1 l2)
    (cond
      ((and (null? l1) (null? l2)) #t)
      ((or (null? l1) (null? l2)) #f)
      (else
        (and (equal2?? (car l1) (car l2))
             (equal2?? (cdr l1) (cdr l2)))))))

(define rember
  (lambda (s l)
    (cond
     ((null? l) '())
     ((equal2?? (car l) s) (cdr l))
     (else (cons (car l) (rember s (cdr l)))))))
```

## Chapter 6 Shadows

```scheme
(define numbered?
  (lambda (aexp)
    (cond
      ((atom? aexp) (number? aexp))
      ((eq? (car (cdr aexp)) 'o+)
       (and (numbered? (car aexp))
            (numbered? (car (cdr (cdr aexp))))))
      ((eq? (car (cdr aexp)) 'ox)
       (and (numbered? (car aexp))
            (numbered? (car (cdr (cdr aexp))))))
      ((eq? (car (cdr aexp)) 'o^)
       (and (numbered? (car aexp))
            (numbered? (car (cdr (cdr aexp))))))
      (else #f))))

(define numbered?
  (lambda (aexp)
    (cond
      ((atom? aexp) (number? aexp))
      (else
        (and (numbered? (car aexp))
             (numbered? (car (cdr (cdr aexp)))))))))

(define value
  (lambda (nexp)
    (cond
      ((atom? nexp) nexp)
      ((eq? (car (cdr nexp)) 'o+)
       (+ (value (car nexp))
          (value (car (cdr (cdr nexp))))))
      ((eq? (car (cdr nexp)) 'o*)
       (* (value (car nexp))
          (value (car (cdr (cdr nexp))))))
      ((eq? (car (cdr nexp)) 'o^)
       (expt (value (car nexp))
             (value (car (cdr (cdr nexp))))))
      (else #f))))

; Examples of value
;
(value 13)                                   ; 13
(value '(1 o+ 3))                            ; 4
(value '(1 o+ (3 o^ 4)))                     ; 82

; The value function for prefix notation
;
(define value-prefix
  (lambda (nexp)
    (cond
      ((atom? nexp) nexp)
      ((eq? (car nexp) 'o+)
       (+ (value-prefix (car (cdr nexp)))
          (value-prefix (car (cdr (cdr nexp))))))
      ((eq? (car nexp) 'o*)
       (* (value-prefix (car (cdr nexp)))
          (value-prefix (car (cdr (cdr nexp))))))
      ((eq? (car nexp) 'o^)
       (expt (value-prefix (car (cdr nexp)))
             (value-prefix (car (cdr (cdr nexp))))))
      (else #f))))

(define 1st-sub-exp
  (lambda (aexp)
    (car (cdr aexp))))

(define 2nd-sub-exp
  (lambda (aexp)
    (car (cdr (cdr aexp)))))

(define operator
  (lambda (aexp)
    (car aexp)))

(define value-prefix-helper
  (lambda (nexp)
    (cond
      ((atom? nexp) nexp)
      ((eq? (operator nexp) 'o+)
       (+ (value-prefix (1st-sub-exp nexp))
          (value-prefix (2nd-sub-exp nexp))))
      ((eq? (car nexp) 'o*)
       (* (value-prefix (1st-sub-exp nexp))
          (value-prefix (2nd-sub-exp nexp))))
      ((eq? (car nexp) 'o^)
       (expt (value-prefix (1st-sub-exp nexp))
             (value-prefix (2nd-sub-exp nexp))))
      (else #f))))

(define 1st-sub-exp
  (lambda (aexp)
    (car aexp)))

(define 2nd-sub-exp
  (lambda (aexp)
    (car (cdr (cdr aexp)))))

(define operator
  (lambda (aexp)
    (car (cdr aexp))))

(define sero?
  (lambda (n)
    (null? n)))

(define edd1
  (lambda (n)
    (cons '() n)))

(define zub1
  (lambda (n)
    (cdr n)))

(define .+
  (lambda (n m)
    (cond
      ((sero? m) n)
      (else
        (edd1 (.+ n (zub1 m)))))))

(define tat?
  (lambda (l)
    (cond
      ((null? l) #t)
      ((atom? (car l))
       (tat? (cdr l)))
      (else #f))))
```

## Chapter 8 Lambda the Ultimate

```scheme
(define atom?
 (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

(define eq?-c
  (lambda (a)
    (lambda (x)
      (eq? a x))))

(define rember-f
  (lambda (test?)
    (lambda (a l)
      (cond
        ((null? l) '())
        ((test? (car l) a) (cdr l))
        (else
          (cons (car l) ((rember-f test?) a (cdr l))))))))

(define rember-eq? (rember-f eq?))

(define insertL-f
  (lambda (test?)
    (lambda (new old l)
      (cond
        ((null? l) '())
        ((test? (car l) old)
         (cons new (cons old (cdr l))))
        (else
          (cons (car l) ((insertL-f test?) new old (cdr l))))))))

(define insertR-f
  (lambda (test?)
    (lambda (new old l)
      (cond
        ((null? l) '())
        ((test? (car l) old)
         (cons old (cons new (cdr l))))
        (else
          (cons (car l) ((insertR-f test?) new old (cdr l))))))))

(define seqR
  (lambda (new old l)
    (cons old (cons new l))))

(define insert-g
  (lambda (seq)
    (lambda (new old l)
      (cond
        ((null? l) '())
        ((eq? (car l) old)
         (seq new old (cdr l)))
        (else
          (cons (car l) ((insert-g seq) new old (cdr l))))))))
(define seqL 'TODO)

(define insertL (insert-g seqL))

(define insertR (insert-g seqR))

(define insertL
  (insert-g
    (lambda (new old l)
      (cons new (cons old l)))))

(define subst-f
  (lambda (new old l)
    (cond
      ((null? l) '())
      ((eq? (car l) old)
       (cons new (cdr l)))
      (else
        (cons (car l) (subst new old (cdr l)))))))

(define seqS
  (lambda (new old l)
    (cons new l)))

(define subst (insert-g seqS))

(define yyy
  (lambda (a l)
    ((insert-g seqrem) #f a l)))

(define seqrem
  (lambda (new old l)
    l))

(define value
  (lambda (nexp)
    (cond
      ((atom? nexp) nexp)
      ((eq? (car (cdr nexp)) 'o+)
       (+ (value (car nexp))
          (value (car (cdr (cdr nexp))))))
      ((eq? (car (cdr nexp)) 'o*)
       (* (value (car nexp))
          (value (car (cdr (cdr nexp))))))
      ((eq? (car (cdr nexp)) 'o^)
       (expt (value (car nexp))
             (value (car (cdr (cdr nexp))))))
      (else #f))))

(define atom-to-function
  (lambda (atom)
    (cond
      ((eq? atom 'o+) +)
      ((eq? atom 'o*) *)
      ((eq? atom 'o^) expt)
      (else #f))))

(define operator
  (lambda (aexp)
    (car aexp)))

(define value
  (lambda (nexp)
    (cond
      ((atom? nexp) nexp)
      (else
        ((atom-to-function (operator nexp))
         (value (1st-sub-exp nexp))
         (value (2nd-sub-exp nexp)))))))

(define 1st-sub-exp
  (lambda (aexp)
    (car (cdr aexp))))

(define 2nd-sub-exp
  (lambda (aexp)
    (car (cdr (cdr aexp)))))

(define multirember
  (lambda (a lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) a)
       (multirember a (cdr lat)))
      (else
        (cons (car lat) (multirember a (cdr lat)))))))

(define multirember-f
  (lambda (test?)
    (lambda (a lat)
      (cond
        ((null? lat) '())
        ((test? (car lat) a)
         ((multirember-f test?) a (cdr lat)))
        (else
          (cons (car lat) ((multirember-f test?) a (cdr lat))))))))

(define multirember-eq? (multirember-f eq?))

(define multiremberT
  (lambda (test? lat)
    (cond
      ((null? lat) '())
      ((test? (car lat))
       (multiremberT test? (cdr lat)))
      (else
        (cons (car lat)
              (multiremberT test? (cdr lat)))))))

(define eq?-tuna
  (eq?-c 'tuna))

(define multiremember&co
  (lambda (a lat col)
    (cond
      ((null? lat)
       (col '() '()))
      ((eq? (car lat) a)
       (multiremember&co a (cdr lat)
       (lambda (newlat seen)
         (col newlat (cons (car lat) seen)))))
      (else
        (multiremember&co a (cdr lat)
                          (lambda (newlat seen)
                            (col (cons (car lat) newlat) seen)))))))

(define a-friend
  (lambda (x y)
    (null? y)))


(define new-friend
  (lambda (newlat seen)
    (a-friend newlat (cons 'tuna seen))))

(define last-friend
  (lambda (x y)
    (length x)))

(define multiinsertLR
  (lambda (new oldL oldR lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) oldL)
       (cons new
             (cons oldL
                   (multiinsertLR new oldL oldR (cdr lat)))))
      ((eq? (car lat) oldR)
       (cons oldR
             (cons new
                   (multiinsertLR new oldL oldR (cdr lat)))))
      (else
        (cons
          (car lat)
          (multiinsertLR new oldL oldR (cdr lat)))))))

(define multiinsertLR&co
  (lambda (new oldL oldR lat col)
    (cond
      ((null? lat)
       (col '() 0 0))
      ((eq? (car lat) oldL)
       (multiinsertLR&co new oldL oldR (cdr lat)
                         (lambda (newlat L R)
                           (col (cons new (cons oldL newlat))
                                (+ 1 L) R))))
      ((eq? (car lat) oldR)
       (multiinsertLR&co new oldL oldR (cdr lat)
                         (lambda (newlat L R)
                           (col (cons oldR (cons new newlat))
                                L (+ 1 R)))))
      (else
        (multiinsertLR&co new oldL oldR (cdr lat)
                          (lambda (newlat L R)
                            (col (cons (car lat) newlat)
                                 L R)))))))

(define col1
  (lambda (lat L R)
    lat))
(define col2
  (lambda (lat L R)
    L))
(define col3
  (lambda (lat L R)
    R))

; Examples of multiinsertLR&co
;
(multiinsertLR&co
  'salty
  'fish
  'chips
  '(chips and fish or fish and chips)
  col1)
; ==> '(chips salty and salty fish or salty fish and chips salty)
(multiinsertLR&co
  'salty
  'fish
  'chips
  '(chips and fish or fish and chips)
  col2)
; ==> 2
(multiinsertLR&co
  'salty
  'fish
  'chips
  '(chips and fish or fish and chips)
  col3)
; ==> 2

(define evens-only*
  (lambda (l)
    (cond
      ((null? l) '())
      ((atom? (car l))
       (cond
         ((even? (car l))
          (cons (car l)
                (evens-only* (cdr l))))
         (else
           (evens-only* (cdr l)))))
      (else
        (cons (evens-only* (car l))
              (evens-only* (cdr l)))))))

(define evens-only*&co
  (lambda (l col)
    (cond
      ((null? l)
       (col '() 1 0))
      ((atom? (car l))
       (cond
         ((even? (car l))
          (evens-only*&co (cdr l)
                          (lambda (newl p s)
                            (col (cons (car l) newl) (* (car l) p) s))))
         (else
           (evens-only*&co (cdr l)
                           (lambda (newl p s)
                             (col newl p (+ (car l) s)))))))
      (else
        (evens-only*&co (car l)
                        (lambda (al ap as)
                          (evens-only*&co (cdr l)
                                          (lambda (dl dp ds)
                                            (col (cons al dl)
                                                 (* ap dp)
                                                 (+ as ds))))))))))

; evens-friend returns collected evens
;
(define evens-friend
  (lambda (e p s)
    e))

; Example of evens-friend used
;
(evens-only*&co
  '((9 1 2 8) 3 10 ((9 9) 7 6) 2)
  evens-friend)
; ==> '((2 8) 10 (() 6) 2)

; evens-product-friend returns the product of evens
;
(define evens-product-friend
  (lambda (e p s)
    p))

; Example of evens-product-friend used
;
(evens-only*&co
  '((9 1 2 8) 3 10 ((9 9) 7 6) 2)
  evens-product-friend)
; ==> 1920

; evens-sum-friend returns the sum of odds
;
(define evens-sum-friend
  (lambda (e p s)
    s))

; Example of evens-sum-friend used
;
(evens-only*&co
  '((9 1 2 8) 3 10 ((9 9) 7 6) 2)
  evens-sum-friend)
; ==> 38

; the-last-friend returns sum, product and the list of evens consed together
;
(define the-last-friend
  (lambda (e p s)
    (cons s (cons p e))))

; Example of the-last-friend
;
(evens-only*&co
  '((9 1 2 8) 3 10 ((9 9) 7 6) 2)
  the-last-friend)
; ==> '(38 1920 (2 8) 10 (() 6) 2)

```
### explaination-of-continuation-in-chapter-8

Let's step through an example; maybe that will help. :-) For simplicity, I'm just going to use listas the collector/continuation, which will just return a list with the arguments to the continuation.

```scheme
(multirember&co 'foo '(foo bar) list)
At the start,a = 'foo
lat = '(foo bar)
col = list
At the first iteration, the (eq? (car lat) a) condition matches, since lat is not empty, and the first element of lat is 'foo. This sets up the next recursion to multirember&co thusly:a = 'foo
lat = '(bar)
col = (lambda (newlat seen)
        (list newlat (cons 'foo seen))
At the next iteration, the else matches: since lat is not empty, and the first element of lat is 'bar (and not 'foo). Thus, for the next recursion, we then have:a = 'foo
lat = '()
col = (lambda (newlat seen)
        ((lambda (newlat seen)
           (list newlat (cons 'foo seen)))
         (cons 'bar newlat)
         seen))
For ease of human reading (and avoid confusion), we can rename the parameters (due to lexical scoping), without any change to the program's semantics:col = (lambda (newlat1 seen1)
        ((lambda (newlat2 seen2)
           (list newlat2 (cons 'foo seen2)))
         (cons 'bar newlat1)
         seen1))
Finally, the (null? lat) clause matches, since lat is now empty. So we call(col '() '())
which expands to:((lambda (newlat1 seen1)
   ((lambda (newlat2 seen2)
      (list newlat2 (cons 'foo seen2)))
    (cons 'bar newlat1)
    seen1))
 '() '())
which (when substituting newlat1 = '() and seen1 = '()) becomes((lambda (newlat2 seen2)
   (list newlat2 (cons 'foo seen2)))
 (cons 'bar '())
 '())
or (evaluating (cons 'bar '()))((lambda (newlat2 seen2)
   (list newlat2 (cons 'foo seen2)))
 '(bar)
 '())
Now, substituting the values newlat2 = '(bar) and seen2 = '(), we get(list '(bar) (cons 'foo '()))
or, in other words,(list '(bar) '(foo))
to give our final result of'((bar) (foo))
```


## Chapter 9 ...and Again, and Again, and Again, ...

```scheme
; The pick function returns the n-th element in a lat
;
(define pick
  (lambda (n lat)
    (cond
      ((zero? (sub1 n)) (car lat))
      (else
        (pick (sub1 n) (cdr lat))))))

; Functions like looking are called partial functions.
;
(define looking
  (lambda (a lat)
    (keep-looking a (pick 1 lat) lat)))

; Example of looking
;
(looking 'caviar '(6 2 4 caviar 5 7 3))         ; #t
(looking 'caviar '(6 2 grits caviar 5 7 3))     ; #f

; It does not recur on a part of lat.
; It is truly unnatural.
;
(define keep-looking
  (lambda (a sorn lat)
    (cond
      ((number? sorn)
       (keep-looking a (pick sorn lat) lat))
      (else (eq? sorn a )))))

; It is the most partial function.
;
(define eternity
  (lambda (x)
    (eternity x)))

; Helper functions for working with pairs
;
(define first
  (lambda (p)
    (car p)))

(define second
  (lambda (p)
    (car (cdr p))))

(define build
  (lambda (s1 s2)
    (cons s1 (cons s2 '()))))

; The function shift takes a pair whose first component is a pair
; and builds a pair by shifting the second part of the first component
; into the second component
;
(define shift
  (lambda (pair)
    (build (first (first pair))
      (build (second (first pair))
        (second pair)))))

; Example of shift
;
(shift '((a b) c))                            ; '(a (b c))
(shift '((a b) (c d)))                        ; '(a (b (c d)))

; The a-pair? function determines if it's a pair
;
(define a-pair?
  (lambda (x)
    (cond
      ((atom? x) #f)
      ((null? x) #f)
      ((null? (cdr x)) #f)
      ((null? (cdr (cdr x))) #t)
      (else #f))))

; We first need to define atom? for Scheme as it's not a primitive
;
(define atom?
 (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

; align is not a partial function, because it yields a value for every argument.
;
(define align
  (lambda (pora)
    (cond
      ((atom? pora) pora)
      ((a-pair? (first pora))
       (align (shift pora)))
      (else (build (first pora)
              (align (second pora)))))))

; counts the number of atoms in align's arguments
;
(define length*
  (lambda (pora)
    (cond
      ((atom? pora) 1)
      (else
        (+ (length* (first pora))
           (length* (second pora)))))))

(define weight*
  (lambda (pora)
    (cond
      ((atom? pora) 1)
      (else
        (+ (* (weight* (first pora)) 2)
           (weight* (second pora)))))))

; Example of weight*
;
(weight* '((a b) c))                          ; 7
(weight* '(a (b c))                           ; 5

; Let's simplify revrel by using inventing revpair that reverses a pair
;
(define revpair
  (lambda (p)
    (build (second p) (first p))))

(define shuffle
  (lambda (pora)
    (cond
      ((atom? pora) pora)
      ((a-pair? (first pora))
       (shuffle (revpair pora)))
      (else
        (build (first pora)
          (shuffle (second pora)))))))

; Example of shuffle
;
(shuffle '(a (b c)))                          ; '(a (b c))
(shuffle '(a b))                              ; '(a b)
(shuffle '((a b) (c d)))                      ; infinite swap pora  Ctrl + c  to break and input q to exit

; The one? function is true when n=1
;
(define one?
  (lambda (n) (= n 1)))

; not total function
(define C
  (lambda (n)
    (cond
      ((one? n) 1)
      (else
        (cond
          ((even? n) (C (/ n 2)))
          (else
            (C (add1 (* 3 n)))))))))

(define A
  (lambda (n m)
    (cond
      ((zero? n) (add1 m))
      ((zero? m) (A (sub1 n) 1))
      (else
        (A (sub1 n)
           (A n (sub1 m)))))))

; Example of A
(A 1 0)                                       ; 2
(A 1 1)                                       ; 3
(A 2 2)                                       ; 7

; length0
;
(lambda (l)
  (cond
    ((null? l) 0)
    (else
      (add1 (eternity (cdr l))))))

; length<=1
;
(lambda (l)
  (cond
    ((null? l) 0)
    (else
      (add1
        ((lambda(l)
           (cond
             ((null? l) 0)
             (else
               (add1 (eternity (cdr l))))))
         (cdr l))))))

; All these programs contain a function that looks like length.
; Perhaps we should abstract out this function.

; rewrite length0
;
((lambda (length)
   (lambda (l)
     (cond
       ((null? l) 0)
       (else (add1 (length (cdr l)))))))
 eternity)

; rewrite length<=1
;
((lambda (f)
   (lambda (l)
     (cond
       ((null? l) 0)
       (else (add1 (f (cdr l)))))))
 ((lambda (g)
    (lambda (l)
      (cond
        ((null? l) 0)
        (else (add1 (g (cdr l)))))))
  eternity))

; make length
;
(lambda (mk-length)
  (mk-length eternity))

; rewrite length<=1
((lambda (mk-length)
   (mk-length mk-length))
 (lambda (mk-length)
   (lambda (l)
     (cond
       ((null? l) 0)
       (else
         (add1
           ((mk-length eternity) (cdr l))))))))

; It's (length '(1 2 3 4 5))
;
(((lambda (mk-length)
   (mk-length mk-length))
 (lambda (mk-length)
   (lambda (l)
     (cond
       ((null? l) 0)
       (else
         (add1
           ((mk-length mk-length) (cdr l))))))))
 '(1 2 3 4 5))

; 5


((lambda (mk-length)
   (mk-length mk-length))
 (lambda (mk-length)
   ((lambda (length)
      (lambda (l)
        (cond
          ((null? l) 0)
          (else
            (add1 (length (cdr l)))))))
    (lambda (x)
      ((mk-length mk-length) x)))))

; move out length function
;
((lambda (le)
   ((lambda (mk-length)
      (mk-length mk-length))
    (lambda (mk-length)
      (le (lambda (x)
            ((mk-length mk-length) x))))))
 (lambda (length)
   (lambda (l)
     (cond
       ((null? l) 0)
       (else (add1 (length (cdr l))))))))

; Y
;
(lambda (le)
  ((lambda (mk-length)
     (mk-length mk-length))
   (lambda (mk-length)
     (le (lambda (x)
           ((mk-length mk-length) x))))))

; it is called the applicative-order Y combinator.
;
(define Y
  (lambda (le)
    ((lambda (f) (f f))
     (lambda (f)
       (le (lambda (x) ((f f) x)))))))

```
## Chapter 10 What Is the Value of All This?

```scheme
(define atom?
 (lambda (x)
    (and (not (pair? x)) (not (null? x)))))
; An entry is a pair of lists whose first list is a set. The two lists must be
; of equal length.
; Here are some entry examples.
;
'((appetizer entree bevarage)
  (pate boeuf vin))
'((appetizer entree bevarage)
  (beer beer beer))
'((bevarage dessert)
  ((food is) (number one with us)))

; Let's build entries with build from chapter 7 (07-friends-and-relations.ss)
;
(define build
  (lambda (s1 s2)
    (cons s1 (cons s2 '()))))

(define new-entry build)

; Test it out and build the example entries above
;
(build '(appetizer entree bevarage)
       '(pate boeuf vin))
(build '(appetizer entree bevarage)
       '(beer beer beer))
(build '(bevarage dessert)
       '((food is) (number one with us)))

; We'll need first and second functions from chapter 7
;
(define first
  (lambda (p)
    (car p)))

(define second
  (lambda (p)
    (car (cdr p))))

; And also third, later.
;
(define third
  (lambda (l)
    (car (cdr (cdr l)))))

; The lookup-in-entry function looks in an entry to find the value by name
;
(define lookup-in-entry
  (lambda (name entry entry-f)
    (lookup-in-entry-help
      name
      (first entry)
      (second entry)
      entry-f)))

; lookup-in-entry uses lookup-in-entry-help helper function
;
(define lookup-in-entry-help
  (lambda (name names values entry-f)
    (cond
      ((null? names) (entry-f name))
      ((eq? (car names) name) (car values))
      (else
        (lookup-in-entry-help
          name
          (cdr names)
          (cdr values)
          entry-f)))))

; Let's try out lookup-in-entry
;
(lookup-in-entry
  'entree
  '((appetizer entree bevarage) (pate boeuf vin))
  (lambda (n) '()))
; ==> 'boeuf

(lookup-in-entry
  'no-such-item
  '((appetizer entree bevarage) (pate boeuf vin))
  (lambda (n) '()))
; ==> '()

; A table (also called an environment) is a list of entries. Here are some
; examples.
;
'()
'(((appetizer entree beverage) (pate boeuf vin))
  ((beverage dessert) ((food is) (number one with us))))

; The extend-table function takes an entry and a table and adds entry to the
; table
;
(define extend-table cons)

; lookup-in-table finds an entry in a table
;
(define lookup-in-table
  (lambda (name table table-f)
    (cond
      ((null? table) (table-f name))
      (else
        (lookup-in-entry
          name
          (car table)
          (lambda (name)
            (lookup-in-table
              name
              (cdr table)
              table-f)))))))

; Let's try lookup-in-table
;
(lookup-in-table
  'beverage
  '(((entree dessert) (spaghetti spumoni))
    ((appetizer entree beverage) (food tastes good)))
  (lambda (n) '()))
; ==> 'good

; Expressions to actions
;
(define expression-to-action
  (lambda (e)
    (cond
      ((atom? e) (atom-to-action e))
      (else
        (list-to-action e)))))

; Atom to action
;
(define atom-to-action
  (lambda (e)
    (cond
      ((number? e) *const)
      ((eq? e #t) *const)
      ((eq? e #f) *const)
      ((eq? e 'cons) *const)
      ((eq? e 'car) *const)
      ((eq? e 'cdr) *const)
      ((eq? e 'null?) *const)
      ((eq? e 'eq?) *const)
      ((eq? e 'atom?) *const)
      ((eq? e 'zero?) *const)
      ((eq? e 'add1) *const)
      ((eq? e 'sub1) *const)
      ((eq? e 'number?) *const)
      (else *identifier))))

; List to action
;
(define list-to-action
  (lambda (e)
    (cond
      ((atom? (car e))
       (cond
         ((eq? (car e) 'quote) *quote)
         ((eq? (car e) 'lambda) *lambda)
         ((eq? (car e) 'cond) *cond)
         (else *application)))
      (else *application))))

; The value function takes an expression and evaulates it
;
(define value
  (lambda (e)
    (meaning e '())))

; The meaning function translates an expression to its meaning
;
(define meaning
  (lambda (e table)
    ((expression-to-action e) e table)))

; Now the various actions. Let's start with *const
;
(define *const
  (lambda (e table)
    (cond
      ((number? e) e)
      ((eq? e #t) #t)
      ((eq? e #f) #f)
      (else
        (build 'primitive e)))))

; *quote: (quote text)
;
(define *quote
  (lambda (e table)
    (text-of e)))

; text-of
;
(define text-of second)

; *identifier
;
(define *identifier
  (lambda (e table)
    (lookup-in-table e table initial-table)))

; initial-table
;
(define initial-table
  (lambda (name)
    (car '())))    ; let's hope we don't take this path

; *lambda
;
(define *lambda
  (lambda (e table)
    (build 'non-primitive
           (cons table (cdr e)))))

; Let's add helper functions
;
(define table-of first)
(define formals-of second)
(define body-of third)

; cond takes lines, and returns the value for the first true line
;
(define evcon
  (lambda (lines table)
    (cond
      ((else? (question-of (car lines)))
       (meaning (answer-of (car lines)) table))
      ((meaning (question-of (car lines)) table)
       (meaning (answer-of (car lines)) table))
      (else
        (evcon (cdr lines) table)))))    ; we don't ask null?, better one of cond lines be true!

; evcon needs else?, question-of and answer-of
;
(define else?
  (lambda (x)
    (cond
      ((atom? x) (eq? x 'else))
      (else #f))))

(define question-of first)
(define answer-of second)

; Now we can write the real *cond
;
(define *cond
  (lambda (e table)
    (evcon (cond-lines-of e) table)))

(define cond-lines-of cdr)

; evlis finds meaning of arguments
;
(define evlis
  (lambda (args table)
    (cond
      ((null? args) '())
      (else
        (cons (meaning (car args) table)
              (evlis (cdr args) table))))))

; Finally the *application
;
(define *application
  (lambda (e table)
    (applyz
      (meaning (function-of e) table)
      (evlis (arguments-of e) table))))

(define function-of car)
(define arguments-of cdr)

; Is the function a primitive?
;
(define primitive?
  (lambda (l)
    (eq? (first l) 'primitive)))

; Is the function a non-primitive?
;
(define non-primitive?
  (lambda (l)
    (eq? (first l) 'non-primitive)))

; Apply!
;
(define applyz
  (lambda (fun vals)
    (cond
      ((primitive? fun)
       (apply-primitive (second fun) vals))
      ((non-primitive? fun)
       (apply-closure (second fun) vals)))))

; apply-primitive
;
(define apply-primitive
  (lambda (name vals)
    (cond
      ((eq? name 'cons)
       (cons (first vals) (second vals)))
      ((eq? name 'car)
       (car (first vals)))
      ((eq? name 'cdr)
       (cdr (first vals)))
      ((eq? name 'null?)
       (null? (first vals)))
      ((eq? name 'eq?)
       (eq? (first vals) (second vals)))
      ((eq? name 'atom?)
       (:atom? (first vals)))
      ((eq? name 'zero?)
       (zero? (first vals)))
      ((eq? name 'add1)
       (+ 1 (first vals)))
      ((eq? name 'sub1)
       (- 1 (first vals)))
      ((eq? name 'number?)
       (number? (first vals))))))

; :atom?
;
(define :atom?
  (lambda (x)
    (cond
      ((atom? x) #t)
      ((null? x) #f)
      ((eq? (car x) 'primitive) #t)
      ((eq? (car x) 'non-primitive) #t)
      (else #f))))

; apply-closure
;
(define apply-closure
  (lambda (closure vals)
    (meaning
      (body-of closure)
      (extend-table (new-entry
                      (formals-of closure)
                      vals)
                    (table-of closure)))))

;
; Let's try out our brand new Scheme interpreter!
;

(value '(add1 6))                           ; 7
(value '(quote (a b c)))                    ; '(a b c)
(value '(car (quote (a b c))))              ; 'a
(value '(cdr (quote (a b c))))              ; '(b c)
(value
  '((lambda (x)
      (cons x (quote ())))
    (quote (foo bar baz))))                 ; '((foo bar baz))
(value
  '((lambda (x)
      (cond
        (x (quote true))
        (else
          (quote false))))
    #t))                                    ; 'true

;;; Recursion

(define (recur-fib n)
  (if (< n 2)
      n
      (+ (recur-fib (- n 1)) (recur-fib (- n 2)))))

;;; Tail-Recursion (Iteration)
(define (tail-fib n)
  (define (fib-nested n c1 c2)
    (cond [(< n 2) n]
          [(= n 2) (+ c1 c2)]
          ['t (fib-nested (- n 1) (+ c1 c2) c1)]))
  (fib-ex n 1 0))

;;; Continuation-Passing Style Recursion
(define (fib-cps n)
  (define (fib-nested n f)
    (cond [(< n 2) (f n)]
          ['t (fib-nested (- n 2)
                          (lambda (x) (f  (+ (fib-nested (- n 1)
                                                         (lambda (x) x)) x))))]))
  (fib-nested n (lambda (x) x)))
  
```
