#include <bits/stdc++.h>
using namespace std;

int product(int n){
    int pro = 1;
    while (n > 0){
        pro *= (n%10);
        n /= 10;
    }
    return pro;
}
int sum(int n){
    int sum = 0;
    while (n > 0){
        sum += (n%10);
        n /= 10;
    }
    return sum;
}
int main(){
    int num;
    cin >> num;
    int sub = product(num) - sum(num);
    cout << sub;
}