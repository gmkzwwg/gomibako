#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

FILE = "/home/deerrider/async/repos/gomibako/collections/_misc/D2-Economy/n.Dankoe.zh.md"

with open(FILE, "r", encoding="utf-8") as f:
    lines = f.readlines()

count = 0

def patch(lineno, old, new):
    global count
    idx = lineno - 1
    line = lines[idx]
    if old not in line:
        print(f"✗ L{lineno}: {old[:50]!r}")
        return
    lines[idx] = line.replace(old, new, 1)
    count += 1
    print(f"✓ L{lineno}")

def patch_re(lineno, pattern, replacement):
    global count
    idx = lineno - 1
    line = lines[idx]
    new_line, n = re.subn(pattern, replacement, line, count=1)
    if n == 0:
        print(f"✗ L{lineno} re: {pattern[:50]!r}")
        return
    lines[idx] = new_line
    count += 1
    print(f"✓ L{lineno}")

# L1712
patch(1712, "材料里有一句很重要的话：", "有一句很重要的话：")

# L2151
patch_re(2151,
    r"材料里反复强调，混乱出现时要回到目标、教育自己、继续建设。 ",
    "混乱出现时要回到目标、教育自己、继续建设。")

# L2780
patch(2780, "材料里有一个很具体的习惯替换思路：", "有一个很具体的习惯替换思路：")

# L2900
patch_re(2900,
    r'材料里不断出现.有时一小时，有时四小时，有时十小时，有时零小时.的表达，这一点很关键。它实际上承认了',
    '"有时一小时，有时四小时，有时十小时，有时零小时"——这个表达很关键，它承认了')

# L2910
patch(2910, "材料里关于四小时工作日和一人公司模式的讨论，反复指向",
      "关于四小时工作日和一人公司模式，反复指向")

# L2962
patch_re(2962,
    r"材料里对达尔文和其他创造者低工作时长、长散步和主动休息的描述，强调的不是",
    "达尔文和其他创造者低工作时长、长散步和主动休息的案例，强调的不是")

# L3248
patch(3248, "材料里的极端故事具有个人传记性质", "这些极端故事具有个人传记性质")

# L4539
patch(4539, "材料里有一个很准确的经验表达：",
      "有一个很准确的描述：")

# L4596
patch_re(4596,
    r'材料里把通才与.能够理解整艘船.的人联系在一起。',
    '通才是"能够理解整艘船"的人。')

# L4644
patch(4644, "材料里有一个更温和的判断：", "有一个更温和的判断：")

# L4699
patch(4699, "材料里有一句值得降噪保留的判断：", "有一个值得保留的判断：")

# L4746
patch_re(4746,
    r'材料里把这种状态描述为.脑子被点亮.，读到某些内容时，',
    '这种状态可以描述为"脑子被点亮"：读到某些内容时，')

# L4987
patch_re(4987,
    r'材料里批评.glorified search engine.式账号，即像搜索引擎一样只输出单一信息，没有故事、信念、经验和人格痕迹。',
    '"glorified search engine"式账号——像搜索引擎一样只输出单一信息，没有故事、信念、经验和人格痕迹——是一个真实的陷阱。')

# L7953
patch_re(7953,
    r'材料里对.真正的怀疑者.有一个重要区分：真正的怀疑者甚至会怀疑自己的怀疑。 这句话可以降噪理解为：',
    '"真正的怀疑者"有一个重要区分：真正的怀疑者甚至会怀疑自己的怀疑。这可以理解为：')

# L8202
patch(8202, "材料里关于学习说服的建议，也强调",
      "关于学习说服，同样强调")

# L8556
patch_re(8556,
    r'材料里把生产率优先描述为一种.窄化心智.的力量：持续压力会让人只关注生存和表现，很难看见新的连接。 这个判断不应被理解成反工作。',
    '生产率优先是一种"窄化心智"的力量：持续压力会让人只关注生存和表现，很难看见新的连接。这个判断不应被理解成反工作。')

# L8608
patch(8608, "材料里对生产率和压力的批评，真正指向的不是",
      "对生产率和压力的批评，真正指向的不是")

# L11235
patch(11235, "材料里提醒，很多创作者", "很多创作者")

print(f"\n完成 {count} 处替换")

with open(FILE, "w", encoding="utf-8") as f:
    f.writelines(lines)

print("文件已写入")
