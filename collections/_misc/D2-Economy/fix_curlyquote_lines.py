#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix the 15 failed patches where curly quotes U+201C/U+201D were
converted to ASCII quotes by the write tool.
Uses direct file line indexing + python string search with explicit unicode escapes."""

import re

FILE = '/home/deerrider/async/repos/gomibako/collections/_misc/D2-Economy/n.Dankoe.zh.md'
LQ = '“'  # left double quotation mark "
RQ = '”'  # right double quotation mark "

with open(FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

count = 0

def patch(lineno, old, new):
    global count
    idx = lineno - 1
    line = lines[idx]
    if old not in line:
        print(f'✗ L{lineno}: {old[:60]!r}')
        return
    lines[idx] = line.replace(old, new, 1)
    count += 1
    print(f'✓ L{lineno}')

# L11588
patch(11588,
      f'这也说明，{LQ}AI 替代不了人类{RQ}这种说法太空。',
      f'{LQ}AI 替代不了人类{RQ}这种说法太空。')

# L11996
patch(11996,
      f'这也说明，AI 输出{LQ}像AI{RQ}并不完全是模型问题。',
      f'AI 输出{LQ}像AI{RQ}并不完全是模型问题。')

# L436
patch(436,
      f'这也是{LQ}主角式个体{RQ}真正的含义。',
      f'{LQ}主角式个体{RQ}的真正含义在于此。')

# L594
patch(594,
      f'这也是{LQ}每天一小时，一个有意义的项目，一个未来愿景{RQ}反复出现的原因。',
      f'{LQ}每天一小时，一个有意义的项目，一个未来愿景{RQ}反复出现，原因即在于此。')

# L2007
patch(2007,
      f'这也是{LQ}加工食品{RQ}类比成立的地方。',
      f'{LQ}加工食品{RQ}类比因此成立。')

# L2043
patch(2043,
      f'这也是{LQ}假思考{RQ}的来源之一。',
      f'{LQ}假思考{RQ}的来源之一也在于此。')

# L2348
patch(2348,
      f'这也是{LQ}每天一小时{RQ}能否有效的关键。',
      f'{LQ}每天一小时{RQ}能否有效，关键即在于此。')

# L3282
patch(3282,
      f'这也是很多人{LQ}逢自己{RQ}失败的原因。',
      f'很多人{LQ}逢自己{RQ}失败，原因正在于此。')

# L5120
patch(5120,
      f'这也是许多{LQ}成功模板{RQ}危险的地方。',
      f'许多{LQ}成功模板{RQ}危险之处也在于此。')

# L5214
patch(5214,
      f'这也是{LQ}自己的路径可以成为产品{RQ}的合理解释。',
      f'{LQ}自己的路径可以成为产品{RQ}，合理解释也在于此。')

# L5324
patch(5324,
      f'这也是{LQ}升级{RQ}的现实含义。',
      f'{LQ}升级{RQ}的现实含义也在于此。')

# L6916
patch(6916,
      f'这也是{LQ}质疑一切{RQ}的真实含义。',
      f'{LQ}质疑一切{RQ}的真实含义也在于此。')

# L9768
patch(9768,
      f'这也是原子公司强调{LQ}先建设受众{RQ}的原因。',
      f'原子公司强调{LQ}先建设受众{RQ}，原因也在于此。')

# L10568
patch(10568,
      f'这也是微型教育业务和{LQ}卖梦想{RQ}的区别。',
      f'微型教育业务和{LQ}卖梦想{RQ}的区别也在于此。')

# L15446
patch(15446,
      f'这也是{LQ}你就是你的细分领域{RQ}这类说法的合理部分。',
      f'{LQ}你就是你的细分领域{RQ}这类说法的合理部分也在于此。')

print(f'\n完成 {count} 处替换')

with open(FILE, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('文件已写入')
