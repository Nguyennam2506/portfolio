#include <bits/stdc++.h>
using namespace std;

int RunningSum(arr a){
    int sum = 0;
    for (int i = 0; i < a.size(); i++){
        sum += a[i];
    } return sum;
}

int main(){
    array a[1000];
    int n;
    for (int i = 0; i < 1000; i++){
        cin >> a[i] >> endl;
    }
    int sum = RunningSum(a);
    cout << sum;
}