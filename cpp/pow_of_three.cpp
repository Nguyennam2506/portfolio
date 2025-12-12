#include <iostream>
using namespace std;

int powofthree(int k){
    int res = 1;
    for (int i = 0; i < k; i++) {
        res *= 3;
    } return res;
}
int main(){
    int n;
    int m = 1;
    int res = 0;
    cin >> n;
    while (n >= powofthree(m)) {
        if (n == powofthree(m)){
            res =1;
            break;
        } 
        else {m += 1;}
    } 
    if(res == 0) cout<<"false";
    else cout<<"true";
}


