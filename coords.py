
inp = input()
i = 0
arr = []
while(inp != "s"):
    inp = inp.split(", ")
    arr.append("latitude: " + inp[0] + ", longitude: " + inp[1])
    inp = input()
    i += 1
result = "["
for coords in arr:
    if coords == arr[len(arr) - 1]:
        result += "{" + coords + "}"
    else:
        result += "{" + coords + "}, "
result += "]"
print(result)