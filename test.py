def longest_substring(s : str, k: int) -> int:
    left = 0
    ans = 0
    dic = {}

    for right in range(len(s)):
        char = s[right]
        dic[char] = dic.get(char, 0) + 1
        while len(dic) > k:
            remove = s[left]
            dic[remove] = dic.get(remove, 0) - 1
            if dic[remove] == 0:
                dic.pop(remove)
            left += 1
        
        ans = max(ans, right - left + 1)

    return ans

print(longest_substring('hchzvfrkmlnozjk', 6))