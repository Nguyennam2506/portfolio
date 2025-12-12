l = list(map(int, input().split()))
s = set()
l.sort()
for x in l:
    if x not in s:
        s.add(x)
if len(s) == len(l) : print('YES')
else: print('NO')