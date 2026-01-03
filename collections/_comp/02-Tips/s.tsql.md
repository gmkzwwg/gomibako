---
category: Sheet
title: T-SQL Quick Reference and Usage
tags: Tips
---

## Basic Syntax

| syntax                                 | syntax name            | description                        | example                                                                                            |
| -------------------------------------- | ---------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `-- …`                                 | single-line comment    | `→` comment to end of line         | `-- note: nightly job`                                                                             |
| `/* … */`                              | block comment          | `→` multi-line comment             | `/* backfill 2024Q4 */`                                                                            |
| `GO`                                   | batch separator (SSMS) | `→` ends batch (client-side)       | `CREATE VIEW…\nGO\nSELECT…`                                                                        |
| `;`                                    | statement terminator   | `→` explicit end (best practice)   | `SELECT 1;`                                                                                        |
| `[]`                                   | delimited identifier   | `→` escape reserved/space          | `SELECT [order], [User Name] FROM [dbo].[t];`                                                      |
| `dbo.Table`                            | schema-qualified name  | `→` avoid ambiguity                | `SELECT * FROM dbo.Sales;`                                                                         |
| `@x`                                   | variable               | `→` scalar variable                | `DECLARE @n int=10; SELECT @n;`                                                                    |
| `@@SPID`                               | global variable        | `→` session/server metadata        | `SELECT @@SPID AS spid;`                                                                           |
| `#t` / `##t`                           | temp table             | `→` session/global temp            | `SELECT * INTO #t FROM dbo.Sales;`                                                                 |
| `WITH cte AS (…)`                      | CTE                    | `→` named subquery                 | `WITH c AS (SELECT * FROM dbo.Sales) SELECT * FROM c;`                                             |
| `SELECT …`                             | query                  | `→` return rows                    | `SELECT col1,col2 FROM dbo.T;`                                                                     |
| `SELECT DISTINCT …`                    | distinct               | `→` dedupe rows                    | `SELECT DISTINCT customer_id FROM dbo.Sales;`                                                      |
| `TOP (n)`                              | limit                  | `→` first n rows                   | `SELECT TOP (10) * FROM dbo.Sales ORDER BY amount DESC;`                                           |
| `TOP (n) WITH TIES`                    | limit + ties           | `→` include equal sort keys        | `SELECT TOP(3) WITH TIES * FROM dbo.Sales ORDER BY amount DESC;`                                   |
| `SELECT … INTO newTable`               | select-into            | `→` create+fill table              | `SELECT * INTO dbo.Sales_2025 FROM dbo.Sales WHERE year=2025;`                                     |
| `FROM a AS x`                          | alias                  | `→` rename table/expr              | `FROM dbo.Sales AS s`                                                                              |
| `JOIN`                                 | inner join             | `→` matching rows                  | `FROM A a JOIN B b ON a.id=b.id`                                                                   |
| `LEFT JOIN`                            | left join              | `→` keep left rows                 | `FROM A a LEFT JOIN B b ON a.id=b.id`                                                              |
| `RIGHT JOIN`                           | right join             | `→` keep right rows                | `FROM A a RIGHT JOIN B b ON a.id=b.id`                                                             |
| `FULL OUTER JOIN`                      | full join              | `→` keep both sides                | `FROM A a FULL OUTER JOIN B b ON a.id=b.id`                                                        |
| `CROSS JOIN`                           | cross join             | `→` cartesian product              | `FROM A a CROSS JOIN B b`                                                                          |
| `CROSS APPLY`                          | apply (correlated)     | `→` per-row table expr             | `FROM Orders o CROSS APPLY (SELECT TOP(1)* FROM Items i WHERE i.oid=o.id) x`                       |
| `OUTER APPLY`                          | apply (nullable)       | `→` like left apply                | `FROM Orders o OUTER APPLY (…) x`                                                                  |
| `WHERE …`                              | filter                 | `→` row predicate                  | `WHERE amount>=100 AND status='PAID'`                                                              |
| `AND / OR / NOT`                       | boolean ops            | `→` combine predicates             | `WHERE a=1 OR (b=2 AND NOT c=3)`                                                                   |
| `IN (…)`                               | membership             | `→` set match                      | `WHERE status IN ('NEW','PAID')`                                                                   |
| `BETWEEN a AND b`                      | range                  | `→` inclusive bounds               | `WHERE dt BETWEEN '2025-01-01' AND '2025-12-31'`                                                   |
| `LIKE`                                 | pattern match          | `→` `%` any, `_` one               | `WHERE email LIKE '%@cmu.edu'`                                                                     |
| `ESCAPE`                               | like escape            | `→` custom escape char             | `WHERE txt LIKE '%\_%' ESCAPE '\'`                                                                 |
| `IS NULL`                              | null test              | `→` null predicate                 | `WHERE deleted_at IS NULL`                                                                         |
| `ORDER BY …`                           | sort                   | `→` ordering                       | `ORDER BY created_at DESC, id ASC`                                                                 |
| `GROUP BY …`                           | grouping               | `→` aggregate groups               | `SELECT cust, SUM(amt) FROM Sales GROUP BY cust;`                                                  |
| `HAVING …`                             | post-aggregate filter  | `→` filter groups                  | `HAVING SUM(amt) > 1000`                                                                           |
| `UNION / UNION ALL`                    | set union              | `→` distinct vs keep dup           | `SELECT id FROM A UNION ALL SELECT id FROM B;`                                                     |
| `INTERSECT`                            | set intersect          | `→` common rows                    | `SELECT id FROM A INTERSECT SELECT id FROM B;`                                                     |
| `EXCEPT`                               | set difference         | `→` A minus B                      | `SELECT id FROM A EXCEPT SELECT id FROM B;`                                                        |
| `CASE WHEN … THEN … ELSE … END`        | case expr              | `→` conditional value              | `SELECT CASE WHEN amt>0 THEN 'CR' ELSE 'DR' END AS t FROM Tx;`                                     |
| `COALESCE(a,b,…)`                      | coalesce               | `→` first non-NULL                 | `SELECT COALESCE(nickname, fullname) FROM Users;`                                                  |
| `NULLIF(a,b)`                          | nullif                 | `→` NULL when equal                | `SELECT price/NULLIF(qty,0) FROM Lines;`                                                           |
| `IIF(cond,a,b)`                        | iif                    | `→` inline if                      | `SELECT IIF(active=1,'Y','N') FROM Users;`                                                         |
| `CAST(x AS t)`                         | cast                   | `→` convert type                   | `SELECT CAST('123' AS int);`                                                                       |
| `CONVERT(t, x, style)`                 | convert                | `→` typed convert + style          | `SELECT CONVERT(date,'2025-12-30',23);`                                                            |
| `TRY_CAST` / `TRY_CONVERT`             | safe convert           | `→` NULL on failure                | `SELECT TRY_CONVERT(int,'12x');`                                                                   |
| `ISNULL(a,b)`                          | isnull                 | `→` replace NULL                   | `SELECT ISNULL(middle_name,'') FROM People;`                                                       |
| `LEN(x)`                               | length                 | `→` string length                  | `SELECT LEN(name) FROM Users;`                                                                     |
| `LEFT/RIGHT(x,n)`                      | substring ends         | `→` take from ends                 | `SELECT RIGHT(phone,4) FROM Contacts;`                                                             |
| `SUBSTRING(x, s, n)`                   | substring              | `→` slice                          | `SELECT SUBSTRING(code,1,3) FROM Items;`                                                           |
| `CHARINDEX(pat,x)`                     | find index             | `→` 1-based position               | `SELECT CHARINDEX('@', email) FROM Users;`                                                         |
| `REPLACE(x,a,b)`                       | replace                | `→` substitute                     | `SELECT REPLACE(path,'\','/')`                                                                     |
| `CONCAT(a,b,…)`                        | concat                 | `→` NULL-safe concat               | `SELECT CONCAT(first,' ',last) FROM People;`                                                       |
| `STRING_AGG(x, sep)`                   | string aggregate       | `→` join values                    | `SELECT dept, STRING_AGG(name,', ') FROM Emp GROUP BY dept;`                                       |
| `DATEADD(part,n,dt)`                   | date add               | `→` shift date/time                | `SELECT DATEADD(day,-7,GETDATE());`                                                                |
| `DATEDIFF(part,a,b)`                   | date diff              | `→` difference in units            | `SELECT DATEDIFF(day, start_dt, end_dt) FROM Jobs;`                                                |
| `GETDATE()`                            | current datetime       | `→` server local time              | `SELECT GETDATE();`                                                                                |
| `SYSUTCDATETIME()`                     | current UTC            | `→` UTC datetime2                  | `SELECT SYSUTCDATETIME();`                                                                         |
| `NEWID()`                              | GUID                   | `→` random uniqueidentifier        | `INSERT dbo.T(id) VALUES (NEWID());`                                                               |
| `ISNUMERIC(x)`                         | numeric-ish test       | `→` legacy heuristic               | `SELECT ISNUMERIC('1e3');`                                                                         |
| `EXISTS (subquery)`                    | existence              | `→` true if any row                | `WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.cust=c.id)`                                          |
| `IN (subquery)`                        | subquery set           | `→` match in result set            | `WHERE id IN (SELECT user_id FROM Admins)`                                                         |
| `ANY / ALL`                            | quantifiers            | `→` compare to set                 | `WHERE amt > ALL (SELECT amt FROM Refunds)`                                                        |
| `OFFSET n ROWS FETCH NEXT m ROWS ONLY` | paging                 | `→` pagination                     | `ORDER BY id OFFSET 100 ROWS FETCH NEXT 50 ROWS ONLY;`                                             |
| `WITH (NOLOCK)`                        | table hint             | `→` read uncommitted (risk)        | `SELECT * FROM Sales WITH (NOLOCK);`                                                               |
| `OPTION (RECOMPILE)`                   | query hint             | `→` compile per exec               | `SELECT … OPTION (RECOMPILE);`                                                                     |
| `BEGIN TRAN … COMMIT/ROLLBACK`         | transaction            | `→` atomic changes                 | `BEGIN TRAN; UPDATE…; COMMIT;`                                                                     |
| `TRY … CATCH`                          | error handling         | `→` catch exceptions               | `BEGIN TRY … END TRY BEGIN CATCH SELECT ERROR_MESSAGE(); END CATCH`                                |
| `THROW`                                | raise error            | `→` throw exception                | `IF @x<0 THROW 50000,'bad x',1;`                                                                   |
| `PRINT`                                | message                | `→` print text                     | `PRINT 'done';`                                                                                    |
| `DECLARE CURSOR …`                     | cursor                 | `→` row-by-row (avoid if possible) | `DECLARE c CURSOR FOR SELECT id FROM T;`                                                           |
| `INSERT INTO t(cols) VALUES (…)`       | insert values          | `→` add row                        | `INSERT dbo.Users(name) VALUES ('A');`                                                             |
| `INSERT … SELECT …`                    | insert-select          | `→` bulk insert from query         | `INSERT dbo.Archive SELECT * FROM dbo.Live WHERE dt<@cut;`                                         |
| `UPDATE t SET … WHERE …`               | update                 | `→` modify rows                    | `UPDATE u SET active=0 WHERE last_login<@d;`                                                       |
| `UPDATE … FROM … JOIN …`               | update join            | `→` update via join                | `UPDATE t SET t.x=s.x FROM T t JOIN S s ON …;`                                                     |
| `DELETE FROM t WHERE …`                | delete                 | `→` remove rows                    | `DELETE FROM Logs WHERE dt<@cut;`                                                                  |
| `MERGE … WHEN MATCHED …`               | merge/upsert           | `→` sync sets                      | `MERGE T USING S ON … WHEN MATCHED THEN UPDATE SET … WHEN NOT MATCHED THEN INSERT (…) VALUES (…);` |
| `CREATE TABLE …`                       | create table           | `→` define schema                  | `CREATE TABLE dbo.T(id int PRIMARY KEY, v nvarchar(50));`                                          |
| `ALTER TABLE …`                        | alter table            | `→` change schema                  | `ALTER TABLE dbo.T ADD created_at datetime2;`                                                      |
| `DROP TABLE …`                         | drop table             | `→` remove table                   | `DROP TABLE dbo.T;`                                                                                |
| `PRIMARY KEY`                          | primary key            | `→` uniqueness + index             | `id int PRIMARY KEY`                                                                               |
| `UNIQUE`                               | unique constraint      | `→` enforce uniqueness             | `email nvarchar(320) UNIQUE`                                                                       |
| `FOREIGN KEY … REFERENCES …`           | foreign key            | `→` referential integrity          | `FOREIGN KEY (cust_id) REFERENCES dbo.Customer(id)`                                                |
| `CHECK (…)`                            | check constraint       | `→` value rule                     | `CHECK (qty>=0)`                                                                                   |
| `DEFAULT (…)`                          | default                | `→` default value                  | `created_at datetime2 DEFAULT SYSUTCDATETIME()`                                                    |
| `IDENTITY(1,1)`                        | identity               | `→` auto-increment                 | `id int IDENTITY(1,1)`                                                                             |
| `CREATE INDEX … ON …`                  | index                  | `→` performance access path        | `CREATE INDEX IX_Sales_dt ON dbo.Sales(dt);`                                                       |
| `INCLUDE (… )`                         | covering index         | `→` add payload cols               | `CREATE INDEX IX ON T(k) INCLUDE (a,b);`                                                           |
| `CREATE VIEW … AS SELECT …`            | view                   | `→` named query                    | `CREATE VIEW dbo.v AS SELECT …;`                                                                   |
| `CREATE OR ALTER VIEW`                 | idempotent view        | `→` create/update                  | `CREATE OR ALTER VIEW dbo.v AS …;`                                                                 |
| `CREATE PROCEDURE … AS …`              | stored proc            | `→` encapsulate logic              | `CREATE PROC dbo.p @id int AS SELECT * FROM T WHERE id=@id;`                                       |
| `CREATE FUNCTION … RETURNS …`          | UDF                    | `→` scalar/table function          | `CREATE FUNCTION dbo.f(@x int) RETURNS int AS BEGIN RETURN @x+1; END;`                             |
| `EXEC / EXECUTE`                       | execute proc           | `→` run procedure                  | `EXEC dbo.p @id=1;`                                                                                |
| `sp_executesql`                        | dynamic SQL            | `→` parameterized dynamic          | `EXEC sp_executesql N'SELECT * FROM T WHERE id=@id', N'@id int', @id=1;`                           |
| `GRANT / DENY / REVOKE`                | permissions            | `→` access control                 | `GRANT SELECT ON dbo.Sales TO analyst;`                                                            |
| `CREATE USER / LOGIN`                  | principals             | `→` security objects               | `CREATE USER alice FOR LOGIN alice;`                                                               |
| `BEGIN … END`                          | block                  | `→` scope statements               | `IF @x=1 BEGIN … END`                                                                              |
| `IF … ELSE …`                          | branching              | `→` control flow                   | `IF EXISTS(…) SELECT 'Y' ELSE SELECT 'N';`                                                         |
| `WHILE …`                              | loop                   | `→` iterate                        | `WHILE @i<=10 BEGIN SET @i+=1; END;`                                                               |
| `RETURN`                               | return code            | `→` exit proc with int             | `IF @bad=1 RETURN 1;`                                                                              |
| `DECLARE @t TABLE (…)`                 | table variable         | `→` in-memory-ish table            | `DECLARE @t TABLE(id int); INSERT @t VALUES(1);`                                                   |
| `BEGIN…END` + `SET NOCOUNT ON`         | rowcount suppress      | `→` reduce chatter                 | `CREATE PROC p AS SET NOCOUNT ON; …;`                                                              |
| `WITH (INDEX(…))`                      | index hint             | `→` force index (risk)             | `SELECT … FROM T WITH (INDEX(IX_T_k));`                                                            |
| `WITH (UPDLOCK, HOLDLOCK)`             | locking hints          | `→` serialize read/claim           | `SELECT … FROM T WITH (UPDLOCK, HOLDLOCK) WHERE …;`                                                |
| `ROW_NUMBER() OVER (…)`                | window rank            | `→` numbered rows                  | `ROW_NUMBER() OVER(PARTITION BY cust ORDER BY dt DESC)`                                            |
| `RANK()/DENSE_RANK()`                  | window rank            | `→` ranking                        | `DENSE_RANK() OVER(ORDER BY score DESC)`                                                           |
| `LAG/LEAD()`                           | window offset          | `→` prev/next row value            | `LAG(amt) OVER(PARTITION BY cust ORDER BY dt)`                                                     |
| `SUM()/AVG()/COUNT() OVER (…)`         | window aggregate       | `→` running/group calc             | `SUM(amt) OVER(PARTITION BY cust)`                                                                 |
| `PIVOT (…)`                            | pivot                  | `→` rows → columns                 | `SELECT * FROM (SELECT …) d PIVOT (SUM(amt) FOR mon IN ([Jan],[Feb])) p;`                          |
| `UNPIVOT (…)`                          | unpivot                | `→` columns → rows                 | `… UNPIVOT (amt FOR mon IN ([Jan],[Feb])) u;`                                                      |
| `JSON_VALUE(x,'$.p')`                  | JSON scalar            | `→` read scalar from JSON          | `SELECT JSON_VALUE(doc,'$.id') FROM T;`                                                            |
| `OPENJSON(x)`                          | JSON table             | `→` shred JSON array/object        | `SELECT * FROM OPENJSON(@j) WITH (id int '$.id');`                                                 |
| `FOR JSON PATH`                        | JSON output            | `→` emit JSON                      | `SELECT id,name FROM T FOR JSON PATH;`                                                             |
| `OPENROWSET(BULK…)`                    | bulk read              | `→` import file (cfg)              | `SELECT * FROM OPENROWSET(BULK 'c:\x.csv', SINGLE_CLOB) x;`                                        |

## Practical Usage

| practical task       | T-SQL pattern (common)                                                                                               | → does                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| quick inspect        | `SELECT TOP (100) * FROM dbo.T ORDER BY id DESC;`                                                                    | → sample latest rows             |
| dedupe rows          | `SELECT DISTINCT col FROM dbo.T;`                                                                                    | → unique values                  |
| find duplicates      | `SELECT col, COUNT(*) c FROM dbo.T GROUP BY col HAVING COUNT(*)>1;`                                                  | → duplicate keys                 |
| latest per group     | `SELECT * FROM (SELECT *, ROW_NUMBER() OVER(PARTITION BY k ORDER BY dt DESC) rn FROM dbo.T) x WHERE rn=1;`           | → last record per k              |
| top-N per group      | `… ROW_NUMBER() OVER(PARTITION BY k ORDER BY metric DESC) rn … WHERE rn<=N;`                                         | → leaderboard per group          |
| pagination           | `ORDER BY id OFFSET @o ROWS FETCH NEXT @n ROWS ONLY;`                                                                | → page query                     |
| search text          | `WHERE col LIKE '%' + @q + '%';`                                                                                     | → contains filter                |
| safe dynamic sort    | `ORDER BY CASE WHEN @sort='dt' THEN CONVERT(sql_variant,dt) END DESC, id;`                                           | → param sort (avoid dynamic SQL) |
| range filter (date)  | `WHERE dt >= @from AND dt < DATEADD(day,1,@to);`                                                                     | → inclusive day window           |
| anti-join            | `WHERE NOT EXISTS (SELECT 1 FROM dbo.B b WHERE b.id=a.id);`                                                          | → rows missing in B              |
| set reconciliation   | `SELECT id FROM A EXCEPT SELECT id FROM B;`                                                                          | → A not in B                     |
| staging → fact load  | `INSERT dbo.Fact(cols…) SELECT … FROM dbo.Stage WHERE batch_id=@b;`                                                  | → batch load                     |
| upsert (safe-ish)    | `MERGE dbo.T AS t USING dbo.S AS s ON … WHEN MATCHED THEN UPDATE SET … WHEN NOT MATCHED THEN INSERT (…) VALUES (…);` | → sync changes                   |
| update via join      | `UPDATE t SET t.x=s.x FROM dbo.T t JOIN dbo.S s ON …;`                                                               | → bulk update                    |
| soft delete          | `UPDATE dbo.T SET deleted_at=SYSUTCDATETIME() WHERE …;`                                                              | → logical delete                 |
| hard delete old      | `DELETE FROM dbo.Log WHERE dt < DATEADD(day,-30,SYSUTCDATETIME());`                                                  | → retention purge                |
| idempotent DDL       | `CREATE OR ALTER VIEW dbo.v AS …;`                                                                                   | → deploy repeatedly              |
| transactional change | `BEGIN TRAN; …; COMMIT;`                                                                                             | → atomic writes                  |
| rollback on error    | `BEGIN TRY BEGIN TRAN; …; COMMIT; END TRY BEGIN CATCH IF @@TRANCOUNT>0 ROLLBACK; THROW; END CATCH;`                  | → safe failure                   |
| concurrency “claim”  | `SELECT TOP(1) … FROM Q WITH (UPDLOCK, READPAST, ROWLOCK) WHERE status='NEW' ORDER BY created_at;`                   | → take next job                  |
| avoid dirty reads    | `SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`                                                                    | → default consistency            |
| high-throughput read | `SELECT … FROM T WITH (NOLOCK);`                                                                                     | → faster but dirty/phantom risk  |
| rowcount silence     | `SET NOCOUNT ON;`                                                                                                    | → less client chatter            |
| perf hotspot find    | `SET STATISTICS IO, TIME ON;`                                                                                        | → IO/time hints in SSMS          |
| explain plan         | `SET SHOWPLAN_XML ON;`                                                                                               | → plan w/o executing             |
| index create         | `CREATE INDEX IX_T_k ON dbo.T(k) INCLUDE (a,b);`                                                                     | → speed seeks + cover            |
| data type cleanup    | `SELECT TRY_CONVERT(int, col) FROM dbo.T;`                                                                           | → parse w/ NULL on bad           |
| null handling        | `SELECT COALESCE(a,b,'') FROM dbo.T;`                                                                                | → first non-NULL                 |
| running total        | `SUM(amt) OVER(PARTITION BY cust ORDER BY dt ROWS UNBOUNDED PRECEDING)`                                              | → cumulative sum                 |
| delta vs prior       | `amt - LAG(amt) OVER(PARTITION BY k ORDER BY dt)`                                                                    | → day-over-day change            |
| pivot report         | `… PIVOT (SUM(amt) FOR mon IN ([Jan],[Feb],…)) p;`                                                                   | → columns by category            |
| unpivot import       | `… UNPIVOT (v FOR k IN ([c1],[c2],…)) u;`                                                                            | → normalize columns              |
| string list          | `STRING_AGG(name, ', ') WITHIN GROUP (ORDER BY name)`                                                                | → join strings                   |
| JSON extract         | `JSON_VALUE(doc,'$.id')`                                                                                             | → scalar from JSON               |
| JSON shred           | `OPENJSON(@j) WITH (id int '$.id', v nvarchar(50) '$.v')`                                                            | → rows from JSON                 |
| produce JSON         | `SELECT … FOR JSON PATH;`                                                                                            | → API payload                    |
| basic auditing       | `INSERT dbo.Audit(user_id, action, at) VALUES (@u, @a, SYSUTCDATETIME());`                                           | → change log                     |
| permissions          | `GRANT SELECT ON dbo.Sales TO analyst;`                                                                              | → least privilege                |

## Tips

To understand what T-SQL is and use it effectively, you need a small set of concepts that form a coherent mental model of how SQL Server works and how queries behave.

First, understand the relational view of data. SQL Server stores data in tables made of rows and columns, and most work is “set-based”: you describe what set of rows you want, not how to loop through them. This implies that thinking in terms of filtering, matching, and aggregating sets is more important than thinking in step-by-step iteration.

Next, know the basic structure of the SQL Server world. Data lives inside a database, objects are organized under schemas (often `dbo`), and you interact mainly with tables and views for reading, plus stored procedures and functions for reusable logic. Indexes are separate objects that exist to make reads faster, and they strongly influence performance.

You also need a working grasp of SQL Server data types, because types determine comparisons, sorting, and function behavior. In practice, you should be comfortable with integers (`int`, `bigint`), decimals (`decimal(p,s)`), strings (`varchar`/`nvarchar`), dates and times (`date`, `datetime2`), and identifiers (`uniqueidentifier`). Related to this is NULL: in SQL, NULL means “unknown or missing,” and it behaves differently from `0` or empty string. You must be able to test it with `IS NULL`, substitute values with `COALESCE` or `ISNULL`, and remember that predicates can evaluate to “unknown,” not only true/false.

For reading data, you need the core query pipeline: you select columns with `SELECT`, choose sources with `FROM`, filter rows with `WHERE`, and combine tables with joins. You should be fluent with inner joins and left joins, and you should understand that joining is fundamentally matching keys (often primary key to foreign key). When you want summaries, you group rows with `GROUP BY` and compute aggregates like `COUNT`, `SUM`, or `AVG`, and you use `HAVING` only when you need to filter the grouped results. When you need ordered results, you use `ORDER BY`, and when you need only a portion of the results you use `TOP` or paging with `OFFSET … FETCH`. You should also be able to read queries that use subqueries, especially `EXISTS` (common for “does a related row exist?”) and common table expressions (CTEs) introduced with `WITH`, which are a way to name a subquery for clarity.

Modern SQL work also relies heavily on window functions. You don’t need every one, but you should understand how `OVER (PARTITION BY … ORDER BY …)` lets you compute row-by-row analytics without collapsing rows. The minimal set to know is `ROW_NUMBER` for “latest per group” patterns, and `LAG/LEAD` or `SUM() OVER` for deltas and running totals.

To change data safely, you need the basics of `INSERT`, `UPDATE`, and `DELETE`, and you should understand how constraints protect correctness. Primary keys enforce uniqueness, foreign keys enforce valid references across tables, and `UNIQUE`, `CHECK`, and `DEFAULT` constraints encode business rules at the database level. You should also know the common ways keys are generated in SQL Server, such as identity columns (`IDENTITY`) and GUIDs (`NEWID()`), because these choices affect inserts and indexing.

Because T-SQL is SQL Server’s dialect, it includes programmability features you must recognize even if you don’t write complex code at first. You should understand variables declared with `DECLARE @x`, parameters passed into stored procedures, basic control flow with `IF/ELSE` and `WHILE`, and how blocks are scoped with `BEGIN … END`. You should also know how errors are handled with `TRY … CATCH` and raised with `THROW`, because production scripts must fail predictably.

Transactions are the next minimal pillar. You need to know what `BEGIN TRAN`, `COMMIT`, and `ROLLBACK` mean, and why they matter: they control atomicity and consistency when multiple statements must succeed or fail together. Closely related is concurrency. At minimum, you should know that SQL Server uses locking, that different isolation levels change what you can observe, and that `NOLOCK` can return dirty or inconsistent data even though it may appear faster.

Performance knowledge can be minimal but must be real. You should understand what an index is, the difference between a seek and a scan at a high level, and why a poorly written predicate can prevent index usage. A practical rule is to write “sargable” filters—filters that let SQL Server use indexes—by avoiding unnecessary functions around indexed columns in `WHERE`. Being able to open and roughly interpret an execution plan is enough to diagnose many slow queries.

Finally, adopt a few habits that prevent common failures. Qualify objects with schema names (for example `dbo.Table`), avoid dynamic SQL unless you use `sp_executesql` with parameters, always list columns explicitly in `INSERT`, and prefer set-based updates over cursors. Also know that `GO` is not a T-SQL statement executed by the server; it is a client-side batch separator used by tools like SSMS, which matters when you deploy scripts.

With these pieces, you can correctly read most real-world T-SQL, write safe CRUD queries, and scale up into performance tuning and database programming as needed.
