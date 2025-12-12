#include <bits/stdc++.h>
using namespace std;

string IPAdress(string s){
    string t;
    for (int  = s.begin(); it != s.end(); ++it){
        if(*it == '.') t += "[.]";
        else t += s;
    }
    return s;
}

int main(){
    string n;
    cin >> n;
    n = IPAdress(n);
    cout << n;
}



