#Bảng trò chơi 3x3
def printboard(board) :
    for i in range(3):
        for j in range(3) :
            print('|', board[i*3 + j], end=' ')
        print('|')

#Người chơi chọn ví trí để đánh khi pvp
def playingpvp(board) :
    while True :
        try :
            inp = input('Hãy chọn vị trí (1-9): ')
            inp = int(inp) - 1
            if 0<= inp <= 8:
                if board[inp] == ' ' :
                    return inp
                else : print('Vị trí này đã được chọn, vui lòng chọn lại vị trí khác')
            else : print('Hãy nhập vị trí hợp lệ (1-9)')
        except ValueError :
            print('Đây không phải là số, vui lòng nhập lại')

#Người chơi chọn vị trí để đánh khi pve
def playingpve(board, player, computer) :
    if player != computer:
        while True :
            try :
                inp = input('Hãy chọn vị trí (1-9): ')
                inp = int(inp) - 1
                if 0<= inp <= 8:
                    if board[inp] == ' ' :
                        return inp
                    else : print('Vị trí này đã được chọn, vui lòng chọn lại vị trí khác')
                else : print('Hãy nhập vị trí hợp lệ (1-9)')
            except ValueError :
                print('Đây không phải là số, vui lòng nhập lại')
    else :
        print('Máy đã đánh, tới lượt của bạn')
        return computerplaying(board, player)

#Máy đánh trong chế độ pve (cần tối ưu lại)
def computerplaying(board, player) :
    if board[4] == ' ':
        return 4

    for inp in range(9):
        if board[inp] == ' ':
            state = check_win(update_board(board, inp, player))
            if state == 1 or state == -1:
                return inp

    for inp in range(9):
        if board[inp] == ' ':
            state = check_win(update_board(board, inp, 'X' if player == 'O' else 'O'))
            if state == 1 or state == -1:
                return inp
           
    if board[4] == 'X':
        for inp in [0, 2, 6, 8,]:
            if board[inp] == ' ':
                return inp
           
    checkychecky = [
        (3, 2, 6), (3, 0, 8),
        (8, 7, 2), (8, 6, 5),
        (6, 3, 8), (6, 7, 0),
        (2, 1, 8), (2, 0, 5),
        (0, 1, 6), (0, 2, 3),
        (8, 7, 5), (6, 7, 3), (0, 1, 3), (2, 1, 5)
    ]
    for a,b,c in checkychecky:
        if board[a] == ' ' and board[4] == 'O' and board[b] == board[c] == 'X' :
            return a
    for inp in [0, 2, 4, 8, 1, 3, 5, 7] :
        if board[inp] == ' ':
            return inp

#Cập nhật tình trạng trò chơi
def update_board(board, inp, player):
    new_board = board[:inp] + player + board[inp+1:]
    return new_board

#Kiểm tra xem trò chơi đã kết thúc hay chưa
def check_win(board):
    win_lines = [
        (0, 1, 2), (3, 4, 5), (6, 7, 8),
        (0, 3, 6), (1, 4, 7), (2, 5, 8),
        (0, 4, 8), (2, 4, 6)
    ]
    for a, b, c in win_lines:
        if board[a] == board[b] and board[b] == board[c] and board[a] != ' ':
            return 1 if board[a] == 'X' else -1
    return 0 if all([c != ' ' for c in board]) else 2

#Hàm main để khởi động trò chơi ở chế độ pvp
def mainpvp():
    board = ' '*9
    state = 2
    player = 'X'
    while state == 2 :
        printboard(board)
        inp = playingpvp(board)
        board = update_board(board, inp, player)
        state = check_win(board)
        player = 'X' if player == 'O' else 'O'
    printboard(board)
    if state == 1:
        print('X thắng')
    elif state == -1:
        print('O thắng')
    else:
        print('Hòa')
    return

#Hàm main để khởi động trò chơi ở chế độ pve
def mainpve():
    board = ' '*9
    state = 2
    player = 'X'
    computer = 'O'
    while state == 2 :
        printboard(board)
        inp = playingpve(board, player, computer)
        board = update_board(board, inp, player)
        state = check_win(board)
        player = 'X' if player == 'O' else 'O'
    printboard(board)
    if state == 1:
        print('X thắng')
    elif state == -1:
        print('O thắng')
    else:
        print('Hòa')
    return

#Hàm main chung
def main():
    mode = ' '
    while mode not in ['pvp', 'pve']:
        mode = input('Xin mời chọn chế độ (pvp hoặc pve): ')
        if mode not in ['pvp', 'pve']:
            print('Vui lòng chọn lại chế độ pvp hoặc pve')
        else :
            if mode == 'pvp':
                mainpvp()
                break
            else :
                mainpve()
                break
    playagain = ''
    while playagain not in ['y', 'n']:
        playagain = input('Bạn có muốn chơi lại không (y hoặc n): ')
        if playagain not in ['y', 'n']:
            print('Vui lòng chọn y hoặc n')
        if playagain == 'y':
            main()
        else : print('Cảm ơn đã chơi trò chơi')


   
print('Chào mừng đến với trò chơi tic tac toe !')
main()