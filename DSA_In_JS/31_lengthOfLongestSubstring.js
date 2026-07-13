// brute force
function lengthOfLongestSubstring(s) {
    let maxlen = 0;

    for (let i = 0; i < s.length; i++) {
        let set = new Set();

        for (let j = i; j < s.length; j++) {
            if (set.has(s[j])) {
                break;
            }
            set.add(s[j]);
            maxlen = Math.max(maxlen, j - i + 1);
        }
    }
    return maxlen;
}

// For debugging
console.log(lengthOfLongestSubstring("abcabcbb")); // 34

// Solution (Sliding Window)
function lengthOfLongestSubstring(s) {
    const set = new Set();

    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {

        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }

        set.add(s[right]);

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// For debugging
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
