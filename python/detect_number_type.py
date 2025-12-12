def detect_number_type(s: str) -> str:
    if not s:
        return 'neither'
    i = 0
    if s[0] in ['+', '-']:
        i = 1
    
    if i >= len(s):
        return 'neither'
    
    if '.' not in s:
        return 'int' if s[i:].isdigit() else 'neither'
    
    parts = s[i:].split('.')
    if len(parts) != 2:
        return 'neither'
    
    left, right = parts
    
    if not left or not right:
        return 'neither'
    
    if left.isdigit() and right.isdigit():
        return 'float'
    
    return 'neither'


if __name__ == '__main__':
    test_cases = [
        ('100', 'int'),
        ('-5', 'int'),
        ('+100', 'int'),
        ('100.0', 'float'),
        ('-3.14', 'float'),
        ('+1.5', 'float'),
        ('.5', 'neither'),
        ('5.', 'neither'),
        ('1e3', 'neither'),
        ('-', 'neither'),
        ('', 'neither'),
        ('0', 'int'),
        ('0.0', 'float'),
    ]
    
    print("Testing detect_number_type():")
    all_pass = True
    for s, expected in test_cases:
        result = detect_number_type(s)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_pass = False
        print(f"[{status}] detect_number_type('{s}') = '{result}' (expected '{expected}')")
    
    print("\nAll tests passed!" if all_pass else "\nSome tests failed!")
