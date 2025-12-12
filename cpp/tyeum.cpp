#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
        int n = s.size();
        int max = 0;
        for(int i = 0; i < n; i++){
            string v;
            for(int j = 0; j < n; j++){
                if(v.find(s[j]) == string::npos){
                    v += s[j];
                } else{
                    if(v.size() > max) max = v.size();
                    break;
                } if(v.size() > max) max = v.size();
            }
        } return max;
}

int main(){
    string s = "jbpnbwwd";
    int n = lengthOfLongestSubstring(s);
    cout << n;
}