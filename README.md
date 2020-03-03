# Russian Maths

This small application is inspired from an old russian method for calculating multiplication of two numbers.

## Methodology

1. The number on the left is halfed untill it reaches 1.
2. The number on the right is doubled at every iteration.
3. All the iteration where left number is even are removed from calculation.
4. All the right hand side numbers for remaining iterations are added togather and the result is the answer for the multiplication.

| Left Number | Right Number |  Removed |
| --- | --- | --- |
| 9 | 13 | |
| 4 | 26 | :white_check_mark: |
| 2 | 52 |  :white_check_mark: |
| 1 | 104 | |
| **Answer** | **117** | Add 13 + 104. |


Referenced Numberphile Video: https://www.youtube.com/watch?v=HJ_PP5rqLg0
