def deci_to_bina(num: str):
    num = int(num)
    result= ''
    remainder = 0
    while num > 0 :
        remainder = num % 2
        result = str(remainder) + result
        num = num // 2 
    return result

def bina_to_deci(num: str):
    result = 0
    temp = ''
    for i in range(len(num)):
        temp = num[len(num) - 1 - i]
        result = (int(temp) * (2**i)) + result
    return result

def add_bina(num1, num2):
    num3 = bina_to_deci(num1)
    num4 = bina_to_deci(num2)
    return deci_to_bina(str(num3 + num4))
print(add_bina('101', '1'))